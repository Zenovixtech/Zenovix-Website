import { z } from 'zod';

export const SignupSchema = z.object({
  fullName: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  countryCode: z.string().default('+91'),
  timezone: z.string().default('Asia/Kolkata'),
  role: z.string().optional(),
  city: z.string().optional(),
  route: z.string().min(1, 'Route is required'),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_content: z.string().optional(),
  platform: z.string().optional(),
  gclid: z.string().optional(),
  fbclid: z.string().optional(),
  fbp: z.string().optional(),
  fbc: z.string().optional(),
  utm_term: z.string().optional(),
  matchtype: z.string().optional(),
  network: z.string().optional(),
  device: z.string().optional(),
  keyword: z.string().optional(),
  placement: z.string().optional(),
  campaignid: z.string().optional(),
  adgroupid: z.string().optional(),
}).transform(data => {
  // 1. Strip the country code from the start of the phone number if the user accidentally included it
  if (data.phone.startsWith(data.countryCode)) {
    data.phone = data.phone.slice(data.countryCode.length);
  }
  // 2. Strip any leftover non-numeric characters (spaces, dashes, etc)
  data.phone = data.phone.replace(/\D/g, '');
  
  return data;
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
