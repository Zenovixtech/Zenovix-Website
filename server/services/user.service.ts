import { UserRepository } from '@/server/repositories/user.repository';
import { SignupSchema, UserDetailsQuerySchema } from '@/server/validators/user.validator';
import { z } from 'zod';
import UtmCampaign from '@/server/models/UtmCampaign';
import { getDateRangeBounds } from '@/server/utils/timezone';
import { logger } from '@/server/utils/logger';
import mongoose from 'mongoose';

export class UserService {
  constructor(private repository: UserRepository) {}

  async registerUser(data: z.infer<typeof SignupSchema>, clientIp?: string, userAgent?: string) {
    const existingUser = await this.repository.findByEmailOrPhone(data.email, data.phone);

    const campaignData = {
      route: data.route,
      utm_source: data.utm_source,
      utm_medium: data.utm_medium,
      utm_campaign: data.utm_campaign,
      utm_content: data.utm_content,
      platform: data.platform,
      gclid: data.gclid,
      fbclid: data.fbclid,
      fbp: data.fbp,
      fbc: data.fbc,
      utm_term: data.utm_term,
      matchtype: data.matchtype,
      network: data.network,
      device: data.device,
      keyword: data.keyword,
      placement: data.placement,
      campaignid: data.campaignid,
      adgroupid: data.adgroupid,
      clientIp,
      userAgent,
    };

    const userData = {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      role: data.role,
      serviceInterest: data.serviceInterest,
      city: data.city,
      countryCode: data.countryCode,
      timezone: data.timezone,
    };

    if (existingUser) {
      // Multi-Touchpoint Tracking: add new campaign and update demographics
      logger.info('Existing user detected, updating touchpoint and demographics');
      await this.repository.addCampaignToUser(existingUser._id as mongoose.Types.ObjectId, campaignData, userData);
      
      // Return the updated user object for the response
      const updatedUser = {
        ...existingUser.toObject(),
        fullName: userData.fullName,
        role: userData.role,
        city: userData.city,
        serviceInterest: userData.serviceInterest,
      };
      return { user: updatedUser, status: 'existing' };
    }

    logger.info('Creating new user and campaign touchpoint');
    const newUser = await this.repository.createUserWithCampaign(userData, campaignData);
    return { user: newUser, status: 'new' };
  }

  async getUserDetails(query: z.infer<typeof UserDetailsQuerySchema>) {
    const { startDate, endDate, page, limit, range, sort, role, utm_source, utm_campaign, search } = query;
    const skip = (page - 1) * limit;

    // Use timezone utility for accurate range bounding
    const { start, end } = getDateRangeBounds(range, startDate, endDate, 'Asia/Kolkata');

    const filter: Record<string, unknown> = {
      createdAt: {
        $gte: start,
        $lte: end,
      },
    };

    if (utm_source) {
      filter.utm_source = utm_source;
    }
    if (utm_campaign) {
      filter.utm_campaign = utm_campaign;
    }

    const sortDirection = sort === 'oldest' ? 1 : -1;

    logger.info(`Fetching user details for range: ${range}, bounds: [${start.toISOString()} - ${end.toISOString()}]`);

    // Base pipeline for matching date bounds, campaign attributes and joining user
    const basePipeline: mongoose.PipelineStage[] = [
      { $match: filter },
      { $sort: { createdAt: sortDirection } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
    ];

    if (role) {
      basePipeline.push({ $match: { 'user.role': role } });
    }

    if (search && search.trim()) {
      const regex = { $regex: search.trim(), $options: 'i' };
      basePipeline.push({
        $match: {
          $or: [
            { 'user.fullName': regex },
            { 'user.email': regex },
            { 'user.phone': regex },
          ],
        },
      });
    }

    // Accurate count using facets or count pipeline
    const countResult = await UtmCampaign.aggregate([...basePipeline, { $count: 'total' }]);
    const total = countResult.length > 0 ? countResult[0].total : 0;

    const dataPipeline: mongoose.PipelineStage[] = [
      ...basePipeline,
      { $skip: skip },
      { $limit: limit },
      {
        $addFields: {
          userCreatedAt: '$user.createdAt',
          utmCreatedAt: '$createdAt',
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ['$user', '$$ROOT'],
          },
        },
      },
      {
        $project: {
          __v: 0,
          updatedAt: 0,
          createdAt: 0,
          userId: 0,
          user: 0,
          clientIp: 0,
          userAgent: 0,
        },
      },
    ];

    const campaigns = await UtmCampaign.aggregate(dataPipeline);

    // Defensive clientIp and userAgent stripping
    const sanitizedData = campaigns.map((item: Record<string, unknown>) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { clientIp, userAgent, ...safeItem } = item;
      return safeItem;
    });

    return {
      data: sanitizedData,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
