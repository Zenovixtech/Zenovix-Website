import { z } from 'zod';
import { CANONICAL_TECHNOLOGY_TOPICS } from '@/lib/technology-services-data';

export const TALENT_SPECIALISMS = [
  'SAP IS-U / Utilities',
  'SAP Functional',
  'SAP Technical',
  'AI & Data',
  'Non-SAP IT',
  'Managed Team',
  'Other',
] as const;

export type TalentSpecialism = (typeof TALENT_SPECIALISMS)[number];

export const TALENT_HIRING_MODELS = [
  'Contract',
  'Contract to Hire',
  'Permanent',
  'Managed Service',
  'Still Deciding',
] as const;

export type TalentHiringModel = (typeof TALENT_HIRING_MODELS)[number];

const trackingField = z
  .string()
  .transform((v) => v.trim())
  .pipe(z.string().max(200, 'Tracking parameter exceeds maximum allowed length of 200 characters.'))
  .transform((v) => (v.length === 0 ? undefined : v))
  .optional();

const phoneField = z
  .string()
  .transform((v) => {
    let clean = v.trim();
    if (clean.length === 0) return undefined;
    if (clean.startsWith('+91')) clean = clean.slice(3);
    else if (clean.startsWith('91') && clean.length > 10) clean = clean.slice(2);
    clean = clean.replace(/\D/g, '');
    return clean.length === 0 ? undefined : clean;
  })
  .pipe(
    z
      .string()
      .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian phone number starting with 6, 7, 8, or 9.')
      .optional()
  )
  .optional();

const baseEnquiryFields = {
  fullName: z
    .string()
    .transform((v) => v.trim().replace(/\s+/g, ' '))
    .pipe(
      z
        .string()
        .min(2, 'Full name must be between 2 and 100 characters.')
        .max(100, 'Full name must be between 2 and 100 characters.')
        .regex(/^[\p{L}][\p{L}\s.'-]*[\p{L}]$/u, 'Enter a valid full name using letters only.')
    ),
  companyName: z
    .string()
    .transform((v) => v.trim().replace(/\s+/g, ' '))
    .pipe(
      z
        .string()
        .min(2, 'Company name must be between 2 and 150 characters.')
        .max(150, 'Company name must be between 2 and 150 characters.')
    ),
  workEmail: z
    .string()
    .transform((v) => v.trim().toLowerCase())
    .pipe(
      z
        .string()
        .email('Enter a valid work email address.')
        .max(254, 'Email address must not exceed 254 characters.')
    ),
  phone: phoneField,
  message: z
    .string()
    .transform((v) => v.trim())
    .pipe(
      z
        .string()
        .min(10, 'Requirement details must be at least 10 characters.')
        .max(3000, 'Requirement details must not exceed 3000 characters.')
    ),
  route: z
    .string()
    .transform((v) => v.trim())
    .pipe(
      z.string().min(1, 'Route is required.').max(2048, 'Route exceeds maximum allowed length.')
    ),
  website_hp: z
    .string()
    .max(100, 'Honeypot value exceeds maximum length.')
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
};

const TalentDetailsSchema = z.object({
  specialism: z.enum(TALENT_SPECIALISMS, {
    message: 'Please select a valid talent specialism.',
  }),
  hiringModel: z.enum(TALENT_HIRING_MODELS, {
    message: 'Please select a valid hiring model.',
  }),
  teamSize: z
    .string()
    .transform((v) => v.trim())
    .pipe(z.string().max(200, 'Team size must not exceed 200 characters.'))
    .transform((v) => (v.length === 0 ? undefined : v))
    .optional(),
});

const TechnologyDetailsSchema = z.object({
  topic: z
    .string()
    .transform((v) => v.trim())
    .pipe(
      z.string().min(1, 'Please select a technology service or solution.').max(200)
    )
    .refine(
      (topic) => (CANONICAL_TECHNOLOGY_TOPICS as readonly string[]).includes(topic),
      {
        message: 'Please select an approved technology service from the catalogue.',
      }
    ),
});

export const TalentEnquirySchema = z.object({
  ...baseEnquiryFields,
  serviceInterest: z.literal('Talent Deployment'),
  talentDetails: TalentDetailsSchema,
  technologyDetails: z.undefined({ message: 'Technology details not permitted for talent enquiry.' }).optional(),
});

export const TechnologyEnquirySchema = z.object({
  ...baseEnquiryFields,
  serviceInterest: z.literal('Technology Services'),
  technologyDetails: TechnologyDetailsSchema,
  talentDetails: z.undefined({ message: 'Talent details not permitted for technology enquiry.' }).optional(),
});

export const ServiceEnquirySchema = z.discriminatedUnion('serviceInterest', [
  TalentEnquirySchema,
  TechnologyEnquirySchema,
]);

export type ServiceEnquiryDto = z.infer<typeof ServiceEnquirySchema>;
export type TalentEnquiryDto = z.infer<typeof TalentEnquirySchema>;
export type TechnologyEnquiryDto = z.infer<typeof TechnologyEnquirySchema>;
