import mongoose, { Schema, Document, Model } from 'mongoose';

export type BusinessServiceInterest = 'Talent Deployment' | 'Technology Services';

export type TalentSpecialism =
  | 'SAP IS-U / Utilities'
  | 'SAP Functional'
  | 'SAP Technical'
  | 'AI & Data'
  | 'Non-SAP IT'
  | 'Managed Team'
  | 'Other';

export type TalentHiringModel =
  | 'Contract'
  | 'Contract to Hire'
  | 'Permanent'
  | 'Managed Service'
  | 'Still Deciding';

export interface ITalentDetails {
  specialism: TalentSpecialism;
  hiringModel: TalentHiringModel;
  teamSize?: string;
}

export interface ITechnologyDetails {
  topic: string;
}

export interface IServiceInquiry extends Document {
  serviceInterest: BusinessServiceInterest;
  fullName: string;
  companyName: string;
  workEmail: string;
  phone?: string;
  message: string;
  talentDetails?: ITalentDetails;
  technologyDetails?: ITechnologyDetails;
  route: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  platform?: string;
  gclid?: string;
  fbclid?: string;
  fbp?: string;
  fbc?: string;
  matchtype?: string;
  network?: string;
  device?: string;
  keyword?: string;
  placement?: string;
  campaignid?: string;
  adgroupid?: string;
  status: 'NEW' | 'CONTACTED' | 'CLOSED';
  createdAt: Date;
  updatedAt: Date;
}

const TalentDetailsSchema = new Schema(
  {
    specialism: {
      type: String,
      required: true,
      enum: [
        'SAP IS-U / Utilities',
        'SAP Functional',
        'SAP Technical',
        'AI & Data',
        'Non-SAP IT',
        'Managed Team',
        'Other',
      ],
      maxlength: 100,
    },
    hiringModel: {
      type: String,
      required: true,
      enum: [
        'Contract',
        'Contract to Hire',
        'Permanent',
        'Managed Service',
        'Still Deciding',
      ],
      maxlength: 100,
    },
    teamSize: {
      type: String,
      maxlength: 200,
    },
  },
  { _id: false }
);

const TechnologyDetailsSchema = new Schema(
  {
    topic: {
      type: String,
      required: true,
      maxlength: 200,
    },
  },
  { _id: false }
);

const ServiceInquirySchema: Schema<IServiceInquiry> = new Schema(
  {
    serviceInterest: {
      type: String,
      required: true,
      enum: ['Talent Deployment', 'Technology Services'],
      maxlength: 50,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 150,
    },
    workEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 20,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 3000,
    },
    talentDetails: {
      type: TalentDetailsSchema,
      required: false,
    },
    technologyDetails: {
      type: TechnologyDetailsSchema,
      required: false,
    },
    route: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2048,
    },
    utm_source: { type: String, maxlength: 200, trim: true },
    utm_medium: { type: String, maxlength: 200, trim: true },
    utm_campaign: { type: String, maxlength: 200, trim: true },
    utm_content: { type: String, maxlength: 200, trim: true },
    utm_term: { type: String, maxlength: 200, trim: true },
    platform: { type: String, maxlength: 200, trim: true },
    gclid: { type: String, maxlength: 200, trim: true },
    fbclid: { type: String, maxlength: 200, trim: true },
    fbp: { type: String, maxlength: 200, trim: true },
    fbc: { type: String, maxlength: 200, trim: true },
    matchtype: { type: String, maxlength: 200, trim: true },
    network: { type: String, maxlength: 200, trim: true },
    device: { type: String, maxlength: 200, trim: true },
    keyword: { type: String, maxlength: 200, trim: true },
    placement: { type: String, maxlength: 200, trim: true },
    campaignid: { type: String, maxlength: 200, trim: true },
    adgroupid: { type: String, maxlength: 200, trim: true },
    status: {
      type: String,
      enum: ['NEW', 'CONTACTED', 'CLOSED'],
      default: 'NEW',
      maxlength: 20,
    },
  },
  {
    timestamps: true,
    collection: 'service_inquiries',
  }
);

ServiceInquirySchema.index({ createdAt: -1 });
ServiceInquirySchema.index({ serviceInterest: 1, createdAt: -1 });

const ServiceInquiry: Model<IServiceInquiry> =
  mongoose.models.ServiceInquiry ||
  mongoose.model<IServiceInquiry>('ServiceInquiry', ServiceInquirySchema, 'service_inquiries');

export default ServiceInquiry;
