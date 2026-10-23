import ServiceInquiry, { IServiceInquiry } from '@/server/models/ServiceInquiry';
import { ServiceEnquiryDto } from '@/server/validators/enquiry.validator';

export class EnquiryRepository {
  /**
   * Creates a new business enquiry record in service_inquiries collection.
   * Each valid submission produces a distinct record.
   * Does NOT touch users or utm_campaigns collections.
   */
  async createEnquiry(
    data: ServiceEnquiryDto
  ): Promise<IServiceInquiry> {
    const enquiryDoc = new ServiceInquiry({
      serviceInterest: data.serviceInterest,
      fullName: data.fullName,
      companyName: data.companyName,
      workEmail: data.workEmail,
      phone: data.phone,
      message: data.message,
      talentDetails: data.serviceInterest === 'Talent Deployment' ? data.talentDetails : undefined,
      technologyDetails: data.serviceInterest === 'Technology Services' ? data.technologyDetails : undefined,
      route: data.route,
      utm_source: data.utm_source,
      utm_medium: data.utm_medium,
      utm_campaign: data.utm_campaign,
      utm_content: data.utm_content,
      utm_term: data.utm_term,
      platform: data.platform,
      gclid: data.gclid,
      fbclid: data.fbclid,
      fbp: data.fbp,
      fbc: data.fbc,
      matchtype: data.matchtype,
      network: data.network,
      device: data.device,
      keyword: data.keyword,
      placement: data.placement,
      campaignid: data.campaignid,
      adgroupid: data.adgroupid,
      status: 'NEW',
    });

    return await enquiryDoc.save();
  }
}
