export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/server/config/db';
import { EnquiryRepository } from '@/server/repositories/enquiry.repository';
import { EnquiryService } from '@/server/services/enquiry.service';
import { EnquiryController } from '@/server/controllers/enquiry.controller';
import { logger } from '@/server/utils/logger';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const repository = new EnquiryRepository();
    const service = new EnquiryService(repository);
    const controller = new EnquiryController(service);
    return await controller.handleEnquiry(req);
  } catch (error) {
    logger.error(
      { errorName: error instanceof Error ? error.name : 'UnknownError' },
      'Database connection failed in enquiry route'
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
