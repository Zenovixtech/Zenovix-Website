export const dynamic = 'force-dynamic';
import { UserController } from '@/server/controllers/user.controller';
import { UserService } from '@/server/services/user.service';
import { UserRepository } from '@/server/repositories/user.repository';
import connectToDatabase from '@/server/config/db';
import { NextRequest } from 'next/server';

import { sendError } from '@/server/utils/response';
import { ERROR_CODES, HTTP_STATUS } from '@/server/config/constants';
import { logger } from '@/server/utils/logger';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const secret = process.env.LEADS_API_SECRET;

    if (!secret || !authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError('Unauthorized', ERROR_CODES.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
    }

    const token = authHeader.slice(7).trim();
    if (token !== secret) {
      return sendError('Unauthorized', ERROR_CODES.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
    }

    await connectToDatabase();
    const repository = new UserRepository();
    const service = new UserService(repository);
    const controller = new UserController(service);
    return await controller.getUserDetails(req);
  } catch (error) {
    logger.error(
      { errorName: error instanceof Error ? error.name : 'UnknownError' },
      'Database connection failed in user-details route'
    );
    return sendError(
      'We are currently experiencing technical difficulties. Please try again shortly.',
      ERROR_CODES.DATABASE_ERROR,
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
}
