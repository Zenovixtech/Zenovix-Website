import User, { IUser } from '@/server/models/User';
import UtmCampaign, { IUtmCampaign } from '@/server/models/UtmCampaign';
import mongoose from 'mongoose';

export class UserRepository {
  async findByEmailOrPhone(email: string, phone: string): Promise<IUser | null> {
    return User.findOne({ $or: [{ email }, { phone }] });
  }

  async createUserWithCampaign(userData: Partial<IUser>, campaignData: Partial<IUtmCampaign>): Promise<IUser> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Check again inside transaction to prevent race conditions
      const existingUser = await User.findOne({ 
        $or: [{ email: userData.email }, { phone: userData.phone }] 
      }).session(session);

      if (existingUser) {
        throw new Error('USER_ALREADY_EXISTS');
      }

      const [user] = await User.create([userData], { session });
      
      campaignData.userId = user._id as mongoose.Types.ObjectId;
      await UtmCampaign.create([campaignData], { session });



      await session.commitTransaction();
      return user;
    } catch (error) {
      if (session.inTransaction()) {
        await session.abortTransaction();
      }
      throw error;
    } finally {
      session.endSession();
    }
  }

  async addCampaignToUser(userId: mongoose.Types.ObjectId, campaignData: Partial<IUtmCampaign>, userData?: Partial<IUser>) {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      if (userData) {
        await User.findByIdAndUpdate(userId, {
          $set: {
            fullName: userData.fullName,
            role: userData.role,
            city: userData.city,
            countryCode: userData.countryCode,
            timezone: userData.timezone,
          }
        }, { session });
      }

      campaignData.userId = userId;
      const campaign = await UtmCampaign.create([campaignData], { session });
      

      
      await session.commitTransaction();
      return campaign[0];
    } catch (error) {
      if (session.inTransaction()) {
        await session.abortTransaction();
      }
      throw error;
    } finally {
      session.endSession();
    }
  }
}
