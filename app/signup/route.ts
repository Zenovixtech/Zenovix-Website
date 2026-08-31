export const dynamic = 'force-dynamic';
import { UserController } from '@/server/controllers/user.controller';
import { UserService } from '@/server/services/user.service';
import { UserRepository } from '@/server/repositories/user.repository';
import connectToDatabase from '@/server/config/db';
import { NextRequest } from 'next/server';

import { sendError } from '@/server/utils/response';
import { ERROR_CODES, HTTP_STATUS } from '@/server/config/constants';
import { logger } from '@/server/utils/logger';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const repository = new UserRepository();
    const service = new UserService(repository);
    const controller = new UserController(service);
    return await controller.signup(req);
  } catch (error) {
    logger.error(error, 'Database connection failed in signup route');
    return sendError('We are currently experiencing technical difficulties. Please try again shortly.', ERROR_CODES.DATABASE_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}
