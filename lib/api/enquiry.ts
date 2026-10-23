import { getEffectiveTracking, clearStoredTracking } from '@/lib/tracking';
import {
  TALENT_SPECIALISMS,
  TALENT_HIRING_MODELS,
  TalentSpecialism,
  TalentHiringModel,
} from '@/server/validators/enquiry.validator';
import {
  CANONICAL_TECHNOLOGY_TOPICS,
  TECHNOLOGY_CATEGORIES,
  TechnologyCategory,
} from '@/lib/technology-services-data';

export { TALENT_SPECIALISMS, TALENT_HIRING_MODELS, TECHNOLOGY_CATEGORIES };
export type { TalentSpecialism, TalentHiringModel, TechnologyCategory };

export interface TalentEnquiryFormData {
  fullName: string;
  companyName: string;
  workEmail: string;
  phone: string;
  specialism: string;
  hiringModel: string;
  teamSize: string;
  message: string;
  website_hp: string;
}

export interface TechnologyEnquiryFormData {
  fullName: string;
  companyName: string;
  workEmail: string;
  phone: string;
  category: TechnologyCategory | '';
  topic: string;
  scope: string;
  message: string;
  website_hp: string;
}

export interface EnquiryFormErrors {
  fullName?: string;
  companyName?: string;
  workEmail?: string;
  phone?: string;
  specialism?: string;
  hiringModel?: string;
  teamSize?: string;
  category?: string;
  topic?: string;
  scope?: string;
  message?: string;
  serviceInterest?: string;
  general?: string;
}

// ---------------------------------------------------------------------------
// Client-Side Field Validators
// ---------------------------------------------------------------------------

export function validateEnquiryFullName(fullName: string): string | null {
  const trimmed = fullName.trim().replace(/\s+/g, ' ');
  if (!trimmed) return 'Full name is required.';
  if (trimmed.length < 2 || trimmed.length > 100) {
    return 'Full name must be between 2 and 100 characters.';
  }
  const unicodeNameRegex = /^[\p{L}][\p{L}\s.'-]*[\p{L}]$/u;
  if (!unicodeNameRegex.test(trimmed)) {
    return 'Enter a valid full name using letters only.';
  }
  return null;
}

export function validateCompanyName(companyName: string): string | null {
  const trimmed = companyName.trim().replace(/\s+/g, ' ');
  if (!trimmed) return 'Company name is required.';
  if (trimmed.length < 2 || trimmed.length > 150) {
    return 'Company name must be between 2 and 150 characters.';
  }
  return null;
}

export function validateWorkEmail(email: string): string | null {
  const trimmed = email.trim();
  if (!trimmed) return 'Work email is required.';
  if (trimmed.length > 254) return 'Email address must not exceed 254 characters.';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) return 'Enter a valid work email address.';
  return null;
}

export function validateOptionalPhone(phone: string): string | null {
  let clean = phone.trim();
  if (!clean) return null; // Optional

  if (clean.startsWith('+91')) clean = clean.slice(3);
  else if (clean.startsWith('91') && clean.length > 10) clean = clean.slice(2);
  clean = clean.replace(/\D/g, '');

  if (!clean) return null; // Cleaned to empty

  const indianPhoneRegex = /^[6-9]\d{9}$/;
  if (!indianPhoneRegex.test(clean)) {
    return 'Enter a valid 10-digit Indian phone number starting with 6, 7, 8, or 9.';
  }
  return null;
}

export function normalizePhoneForSubmission(phone: string): string | undefined {
  let clean = phone.trim();
  if (!clean) return undefined;
  if (clean.startsWith('+91')) clean = clean.slice(3);
  else if (clean.startsWith('91') && clean.length > 10) clean = clean.slice(2);
  clean = clean.replace(/\D/g, '');
  return clean.length === 10 ? clean : undefined;
}

export function validateTalentSpecialism(specialism: string): string | null {
  if (!specialism) return 'Please select a talent specialism.';
  if (!(TALENT_SPECIALISMS as readonly string[]).includes(specialism)) {
    return 'Please select a valid talent specialism.';
  }
  return null;
}

export function validateTalentHiringModel(hiringModel: string): string | null {
  if (!hiringModel) return 'Please select a hiring model.';
  if (!(TALENT_HIRING_MODELS as readonly string[]).includes(hiringModel)) {
    return 'Please select a valid hiring model.';
  }
  return null;
}

export function validateTeamSize(teamSize: string): string | null {
  const trimmed = teamSize.trim();
  if (trimmed.length > 200) {
    return 'Team size must not exceed 200 characters.';
  }
  return null;
}

export function validateTechnologyTopic(topic: string): string | null {
  const trimmed = topic.trim();
  if (!trimmed) return 'Please select a technology service or solution.';
  if (!(CANONICAL_TECHNOLOGY_TOPICS as readonly string[]).includes(trimmed)) {
    return 'Please select an approved technology service from the catalogue.';
  }
  return null;
}

export function validateEnquiryMessage(message: string): string | null {
  const trimmed = message.trim();
  if (!trimmed) return 'Requirement details are required.';
  if (trimmed.length < 10) {
    return 'Requirement details must be at least 10 characters.';
  }
  if (trimmed.length > 3000) {
    return 'Requirement details must not exceed 3000 characters.';
  }
  return null;
}

// ---------------------------------------------------------------------------
// Client API Submission
// ---------------------------------------------------------------------------

export type EnquirySubmissionPayload =
  | {
      serviceInterest: 'Talent Deployment';
      fullName: string;
      companyName: string;
      workEmail: string;
      phone?: string;
      message: string;
      talentDetails: {
        specialism: TalentSpecialism;
        hiringModel: TalentHiringModel;
        teamSize?: string;
      };
      website_hp?: string;
    }
  | {
      serviceInterest: 'Technology Services';
      fullName: string;
      companyName: string;
      workEmail: string;
      phone?: string;
      message: string;
      technologyDetails: {
        category: TechnologyCategory;
        topic?: string;
        scope?: string;
      };
      website_hp?: string;
    };

export interface EnquirySubmissionResult {
  success: boolean;
  status: 'SUCCESS' | 'VALIDATION_ERROR' | 'NETWORK_ERROR' | 'SERVER_ERROR' | 'TIMEOUT';
  message: string;
  fieldErrors?: Record<string, string>;
}

export async function submitBusinessEnquiry(
  payload: EnquirySubmissionPayload
): Promise<EnquirySubmissionResult> {
  const route =
    typeof window !== 'undefined'
      ? `${window.location.pathname}${window.location.search}`
      : '/';

  const tracking = getEffectiveTracking();

  const fullPayload = {
    ...payload,
    route,
    ...tracking,
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch('/enquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fullPayload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    let responseData: { success?: boolean; message?: string; errors?: Record<string, { _errors?: string[] }> };
    try {
      responseData = await response.json();
    } catch {
      return {
        success: false,
        status: 'SERVER_ERROR',
        message: 'Received an invalid response from the server. Please try again.',
      };
    }

    if (response.ok && responseData.success) {
      // Clear stored attribution only after confirmed API success
      clearStoredTracking();
      return {
        success: true,
        status: 'SUCCESS',
        message: responseData.message || 'Your enquiry has been received.',
      };
    }

    // Extract field-specific errors if returned
    const fieldErrors: Record<string, string> = {};
    if (responseData.errors && typeof responseData.errors === 'object') {
      for (const [key, val] of Object.entries(responseData.errors)) {
        if (val && typeof val === 'object' && '_errors' in val && Array.isArray(val._errors) && val._errors.length > 0) {
          fieldErrors[key] = val._errors[0];
        }
      }
    }

    return {
      success: false,
      status: response.status === 400 ? 'VALIDATION_ERROR' : 'SERVER_ERROR',
      message:
        responseData.message ||
        'Unable to process your enquiry. Please check your information and try again.',
      fieldErrors: Object.keys(fieldErrors).length > 0 ? fieldErrors : undefined,
    };
  } catch (error: unknown) {
    clearTimeout(timeoutId);

    if (error instanceof DOMException && error.name === 'AbortError') {
      return {
        success: false,
        status: 'TIMEOUT',
        message: 'The request took too long to complete. Please try submitting again.',
      };
    }

    return {
      success: false,
      status: 'NETWORK_ERROR',
      message: 'Unable to connect to the server. Please check your connection and try again.',
    };
  }
}
