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
}

export const ALLOWED_ROLES = [
  "Analyst / Reporting",
  "Finance / Operations",
  "Founder / Manager",
  "Student / Career switcher",
  "Marketing / Growth",
  "Other",
] as const;

export type RoleType = (typeof ALLOWED_ROLES)[number];

export function validateFullName(value: string): string {
  const normalized = value.trim().replace(/\s+/g, " ");
  if (!normalized) {
    return "Full name is required.";
  }
  if (normalized.length < 3 || normalized.length > 100) {
    return "Full name must be between 3 and 100 characters.";
  }
  // Check for letters, spaces, apostrophes, periods, hyphens (Unicode supported)
  const nameRegex = /^[\p{L}][\p{L}\s.'-]*[\p{L}]$/u;
  if (!nameRegex.test(normalized)) {
    return "Enter a valid full name using letters only.";
  }
  return "";
}

export function validateEmail(value: string): string {
  const trimmed = value.trim().toLowerCase();
  if (!trimmed) {
    return "Email address is required.";
  }
  if (trimmed.length > 254) {
    return "Email address must not exceed 254 characters.";
  }
  const emailRegex = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i;
  if (!emailRegex.test(trimmed)) {
    return "Enter a valid email address, for example name@example.com.";
  }
  return "";
}

export function validatePhone(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) {
    return "Mobile number is required.";
  }
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(trimmed)) {
    return "Enter exactly 10 digits starting with 6, 7, 8, or 9.";
  }
  return "";
}

export function validateRole(value: string): string {
  if (!value) {
    return "Please select a role.";
  }
  if (!ALLOWED_ROLES.includes(value as RoleType)) {
    return "Please select a valid role.";
  }
  return "";
}

export interface SubmissionResult {
  success: boolean;
  status: "BACKEND_NOT_CONFIGURED" | "SPAM_DETECTED" | "SUCCESS";
  message: string;
}

/**
 * Isolated integration module for form submission.
 * Backend API developer documentation:
 * - Expected Endpoint: POST /api/register (or external CRM endpoint)
 * - Headers: Content-Type: application/json
 * - Body: { fullName: string, email: string, phone: string, role: string }
 * Current Status: No backend API exists. Returns local UI demonstration state without making network calls or storing data.
 */
export async function submitRegistration(
  data: RegistrationFormData
): Promise<SubmissionResult> {
  // Check honeypot field
  if (data.website_hp && data.website_hp.length > 0) {
    return {
      success: false,
      status: "SPAM_DETECTED",
      message: "Spam submission detected.",
    };
  }

  // Simulate minimal async delay for realistic UX demonstration
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    success: false, // Backend not connected yet
    status: "BACKEND_NOT_CONFIGURED",
    message: "UI demo verified locally. No backend API is currently connected.",
  };
}
