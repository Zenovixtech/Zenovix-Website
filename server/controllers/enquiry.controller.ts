import { NextRequest, NextResponse } from 'next/server';
import { EnquiryService } from '@/server/services/enquiry.service';
import { ServiceEnquirySchema } from '@/server/validators/enquiry.validator';
import { logger } from '@/server/utils/logger';

export class EnquiryController {
  constructor(private service: EnquiryService) {}

  async handleEnquiry(req: NextRequest) {
    try {
      let body: unknown;
      try {
        body = await req.json();
      } catch {
        logger.warn('Malformed JSON payload in enquiry request');
        return NextResponse.json(
          {
            success: false,
            message: 'We received an invalid request format. Please try submitting again.',
          },
          { status: 400 }
        );
      }

      // Server-side Zod validation with discriminated union
      const validationResult = ServiceEnquirySchema.safeParse(body);

      if (!validationResult.success) {
        const formattedErrors = validationResult.error.format();
        logger.warn(
          { errorCount: validationResult.error.issues.length },
          'Enquiry validation failed'
        );
        return NextResponse.json(
          {
            success: false,
            message: 'Please check your details and try again. Some information seems to be missing or incorrect.',
            errors: formattedErrors,
          },
          { status: 400 }
        );
      }

      const result = await this.service.processEnquiry(validationResult.data);

      return NextResponse.json(result, { status: 201 });
    } catch (error: unknown) {
      if (error instanceof Error && error.message === 'SPAM_DETECTED') {
        return NextResponse.json(
          {
            success: false,
            message: 'Your submission could not be processed. Please try again.',
          },
          { status: 400 }
        );
      }

      logger.error(
        { errorName: error instanceof Error ? error.name : 'UnknownError' },
        'Unexpected error processing service enquiry'
      );

      return NextResponse.json(
        {
          success: false,
          message: 'We are currently experiencing technical difficulties. Please try again shortly.',
        },
        { status: 500 }
      );
    }
  }
}
