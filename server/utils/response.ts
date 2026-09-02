import { NextResponse } from 'next/server';

export const sendSuccess = <T = unknown>(data: T, message = 'Success', status = 200) => {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status }
  );
};

export const sendError = (
  message = 'Error',
  code = 'UNKNOWN_ERROR',
  status = 500,
  errors?: Record<string, unknown> | unknown
) => {
  return NextResponse.json(
    {
      success: false,
      message,
      code,
      errors,
    },
    { status }
  );
};
