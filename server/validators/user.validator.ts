import { z } from 'zod';

export const ALLOWED_ROLES = [
  'Analyst / Reporting',
  'Finance / Operations',
  'Founder / Manager',
  'Student / Career switcher',
  'Marketing / Growth',
  'Other',
] as const;

export type AllowedRole = (typeof ALLOWED_ROLES)[number];

const trackingField = z
  .string()
  .transform((v) => v.trim())
  .pipe(z.string().max(200, 'Tracking parameter exceeds maximum allowed length of 200 characters.'))
  .transform((v) => (v.length === 0 ? undefined : v))
  .optional();

export const SignupSchema = z.object({
  fullName: z
    .string()
    .transform((v) => v.trim().replace(/\s+/g, ' '))
    .pipe(
      z
        .string()
        .min(3, 'Full name must be between 3 and 100 characters.')
        .max(100, 'Full name must be between 3 and 100 characters.')
        .regex(/^[\p{L}][\p{L}\s.'-]*[\p{L}]$/u, 'Enter a valid full name using letters only.')
    ),
  email: z
    .string()
    .transform((v) => v.trim().toLowerCase())
    .pipe(
      z
        .string()
        .email('Enter a valid email address.')
        .max(254, 'Email address must not exceed 254 characters.')
    ),
  phone: z
    .string()
    .transform((v) => {
      let clean = v.trim();
      if (clean.startsWith('+91')) clean = clean.slice(3);
      else if (clean.startsWith('91') && clean.length > 10) clean = clean.slice(2);
      return clean.replace(/\D/g, '');
    })
    .pipe(
      z
        .string()
        .regex(/^[6-9]\d{9}$/, 'Enter exactly 10 digits starting with 6, 7, 8, or 9.')
    ),
  countryCode: z.literal('+91', { message: 'Country code must be +91.' }).default('+91'),
  timezone: z.literal('Asia/Kolkata', { message: 'Timezone must be Asia/Kolkata.' }).default('Asia/Kolkata'),
  role: z.enum(ALLOWED_ROLES, { message: 'Please select a valid role.' }),
  route: z
    .string()
    .transform((v) => v.trim())
    .pipe(
      z.string().min(1, 'Route is required.').max(2048, 'Route exceeds maximum allowed length.')
    ),
  city: z
    .string()
    .transform((v) => v.trim())
    .pipe(z.string().max(100))
    .optional(),
  utm_source: trackingField,
  utm_medium: trackingField,
  utm_campaign: trackingField,
  utm_content: trackingField,
  utm_term: trackingField,
  platform: trackingField,
  gclid: trackingField,
  fbclid: trackingField,
  fbp: trackingField,
  fbc: trackingField,
  matchtype: trackingField,
  network: trackingField,
  device: trackingField,
  keyword: trackingField,
  placement: trackingField,
  campaignid: trackingField,
  adgroupid: trackingField,
});

export const UserDetailsQuerySchema = z.object({
  range: z.enum(['today', 'yesterday', '7days', '1month', 'custom']).default('today'),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  page: z.string().regex(/^\d+$/).default('1').transform(Number),
  limit: z.string().regex(/^\d+$/).default('10').transform(Number),
}).refine(data => {
  if (data.range === 'custom') {
    return !!data.startDate && !!data.endDate;
  }
  return true;
}, {
  message: "startDate and endDate are required when range is 'custom'",
  path: ['range'],
});
