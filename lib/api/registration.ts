import { getEffectiveTracking, clearStoredTracking } from '@/lib/tracking';

export interface RegistrationFormData {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  website_hp?: string; // Honeypot field for bot/spam prevention
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  role?: string;
  form?: string;
}

export const ALLOWED_ROLES = [
  'Analyst / Reporting',
  'Finance / Operations',
  'Founder / Manager',
  'Student / Career switcher',
  'Marketing / Growth',
  'Other',
] as const;

export type RoleType = (typeof ALLOWED_ROLES)[number];

export function validateFullName(value: string): string {
  const normalized = value.trim().replace(/\s+/g, ' ');
  if (!normalized) {
    return 'Full name is required.';
  }
  if (normalized.length < 3 || normalized.length > 100) {
    return 'Full name must be between 3 and 100 characters.';
  }
  // Check for letters, spaces, apostrophes, periods, hyphens (Unicode supported, reject digits)
  const nameRegex = /^[\p{L}][\p{L}\s.'-]*[\p{L}]$/u;
  if (!nameRegex.test(normalized)) {
    return 'Enter a valid full name using letters only.';
  }
  return '';
}

export function validateEmail(value: string): string {
  const trimmed = value.trim().toLowerCase();
  if (!trimmed) {
    return 'Email address is required.';
  }
  if (trimmed.length > 254) {
    return 'Email address must not exceed 254 characters.';
  }
  const emailRegex =
    /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i;
  if (!emailRegex.test(trimmed)) {
    return 'Enter a valid email address, for example name@example.com.';
  }
  return '';
}

export function validatePhone(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) {
    return 'Mobile number is required.';
  }
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(trimmed)) {
    return 'Enter exactly 10 digits starting with 6, 7, 8, or 9.';
  }
  return '';
}

export function validateRole(value: string): string {
  if (!value) {
    return 'Please select a role.';
  }
  if (!ALLOWED_ROLES.includes(value as RoleType)) {
    return 'Please select a valid role.';
  }
  return '';
}

export interface SignupUserDto {
  _id?: string;
  fullName: string;
  email: string;
  phone: string;
  role?: string;
  city?: string;
  countryCode: string;
  timezone: string;
  status: 'ACTIVE' | 'DELETED' | 'ONHOLD';
  createdAt?: string;
  updatedAt?: string;
}

export interface SignupResponseData {
  user: SignupUserDto;
  status: 'new' | 'existing';
}

export interface SignupSuccessEnvelope {
  success: true;
  message: string;
  data: SignupResponseData;
}

export interface SignupErrorEnvelope {
  success: false;
  message: string;
  code: string;
  errors?: Record<string, unknown>;
}

export type SignupApiResponse = SignupSuccessEnvelope | SignupErrorEnvelope;

export type SubmissionResult =
  | { success: true; status: 'SUCCESS'; message: string; data: SignupResponseData }
  | { success: false; status: 'VALIDATION_ERROR'; message: string; errors?: Record<string, unknown> }
  | { success: false; status: 'SERVER_REJECTION'; message: string; code: string; errors?: Record<string, unknown> }
  | { success: false; status: 'TIMEOUT'; message: string }
  | { success: false; status: 'NETWORK_FAILURE'; message: string }
  | { success: false; status: 'MALFORMED_RESPONSE'; message: string }
  | { success: false; status: 'SPAM_DETECTED'; message: string };

export function isSignupSuccessEnvelope(data: unknown): data is SignupSuccessEnvelope {
  if (typeof data !== 'object' || data === null) return false;
  const res = data as Record<string, unknown>;
  if (res.success !== true || typeof res.message !== 'string') return false;
  if (typeof res.data !== 'object' || res.data === null) return false;

  const payload = res.data as Record<string, unknown>;
  const user = payload.user;
  const status = payload.status;

  return (
    (status === 'new' || status === 'existing') &&
    typeof user === 'object' &&
    user !== null &&
    typeof (user as Record<string, unknown>).fullName === 'string' &&
    typeof (user as Record<string, unknown>).email === 'string'
  );
}

export function isSignupErrorEnvelope(data: unknown): data is SignupErrorEnvelope {
  if (typeof data !== 'object' || data === null) return false;
  const res = data as Record<string, unknown>;
  return res.success === false && typeof res.message === 'string';
}

/**
 * Submit registration to the same-origin Next.js POST /signup API.
 * - Honeypot checked locally and never sent to server.
 * - Values trimmed and normalized.
 * - Priority given to live URL query tracking, with sessionStorage fallback.
 * - 15-second request timeout via AbortController.
 * - Attribution storage cleared only upon verified success.
 */
export async function submitRegistration(data: RegistrationFormData): Promise<SubmissionResult> {
  // Check honeypot field
  if (data.website_hp && data.website_hp.length > 0) {
    return {
      success: false,
      status: 'SPAM_DETECTED',
      message: 'Submission failed. Please check your inputs and try again.',
    };
  }

  // Normalize form values
  const cleanedName = data.fullName.trim().replace(/\s+/g, ' ');
  const cleanedEmail = data.email.trim().toLowerCase();
  const cleanedPhone = data.phone.trim();
  const cleanedRole = data.role.trim();

  // Read route path safely
  const route =
    typeof window !== 'undefined' && window.location.pathname
      ? window.location.pathname
      : '/';

  // Read tracking attribution (live URL priority, sessionStorage fallback)
  const tracking = getEffectiveTracking();

  // Construct request payload (honeypot excluded, arbitrary countryCode/timezone omitted)
  const payload: Record<string, string> = {
    fullName: cleanedName,
    email: cleanedEmail,
    phone: cleanedPhone,
    role: cleanedRole,
    route,
    ...tracking,
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Safely parse JSON response
    let responseData: unknown;
    try {
      responseData = await response.json();
    } catch {
      return {
        success: false,
        status: 'MALFORMED_RESPONSE',
        message: 'Received an invalid response from the server. Please try again.',
      };
    }

    if (response.ok && isSignupSuccessEnvelope(responseData)) {
      // Clear stored attribution only after verified success
      clearStoredTracking();
      return {
        success: true,
        status: 'SUCCESS',
        message: responseData.message || 'Registration successful. Your details have been saved.',
        data: responseData.data,
      };
    }

    if (isSignupErrorEnvelope(responseData)) {
      if (responseData.code === 'VALIDATION_ERROR') {
        return {
          success: false,
          status: 'VALIDATION_ERROR',
          message: responseData.message || 'Please check your details and try again.',
          errors: responseData.errors,
        };
      }

      return {
        success: false,
        status: 'SERVER_REJECTION',
        message: responseData.message || 'We could not complete your registration. Please try again.',
        code: responseData.code || 'UNKNOWN_ERROR',
        errors: responseData.errors,
      };
    }

    return {
      success: false,
      status: 'MALFORMED_RESPONSE',
      message: 'Received an unexpected response structure from the server.',
    };
  } catch (err: unknown) {
    clearTimeout(timeoutId);

    if (err instanceof Error && err.name === 'AbortError') {
      return {
        success: false,
        status: 'TIMEOUT',
        message: 'The request timed out. Please check your internet connection and try again.',
      };
    }

    return {
      success: false,
      status: 'NETWORK_FAILURE',
      message: 'Network error occurred. Please check your connection and try again.',
    };
  }
}
