import { EnquiryRepository } from '@/server/repositories/enquiry.repository';
import { ServiceEnquiryDto } from '@/server/validators/enquiry.validator';
import { logger } from '@/server/utils/logger';

export class EnquiryService {
  constructor(private repository: EnquiryRepository) {}

  async processEnquiry(dto: ServiceEnquiryDto): Promise<{ success: true; message: string }> {
    // 1. Honeypot check: reject spam before any MongoDB operation
    if (dto.website_hp && dto.website_hp.trim().length > 0) {
      logger.warn(
        { route: dto.route, serviceInterest: dto.serviceInterest },
        'Honeypot triggered in service enquiry submission; rejecting as spam'
      );
      throw new Error('SPAM_DETECTED');
    }

    // 2. Persist to MongoDB service_inquiries collection
    await this.repository.createEnquiry(dto);

    // 3. Log audit event without any PII (no names, emails, phones, companies, or message contents)
    logger.info(
      {
        serviceInterest: dto.serviceInterest,
        route: dto.route,
        hasPhone: !!dto.phone,
        hasUtmSource: !!dto.utm_source,
      },
      'Service enquiry recorded successfully'
    );

    // 4. Return minimal sanitized response
    return {
      success: true,
      message: 'Your enquiry has been received.',
    };
  }
}
