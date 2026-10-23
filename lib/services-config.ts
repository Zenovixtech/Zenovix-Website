import { ServiceInterest } from "@/server/models/User";

export interface ServiceDefinition {
  id: string;
  name: string;
  kicker: string;
  tag: string;
  serviceInterest: ServiceInterest;
  href: string;
  shortDescription: string;
  detailedDescription: string;
  highlights: string[];
  ctaLabel: string;
  isExternal?: boolean;
}

/**
 * Centralized service-links configuration.
 *
 * If independent domain deployments are ever introduced in the future:
 * - Replace the internal paths with environment-driven or verified production URLs
 *   (e.g., process.env.NEXT_PUBLIC_TALENT_URL or process.env.NEXT_PUBLIC_SERVICES_URL).
 * - For internal monorepo execution, internal App Router paths are used throughout.
 */
export const SERVICES_CONFIG: Record<'learning' | 'talent' | 'technologyServices', ServiceDefinition> = {
  learning: {
    id: "learning",
    name: "Learning Hub",
    kicker: "01 // Capability Accelerator",
    tag: "LIVE WORKSHOP & AUTOMATION",
    serviceInterest: "Learning Hub",
    href: "/learning",
    shortDescription:
      "Enterprise upskilling, live AI-powered analytics masterclasses, and executive dashboard automation workshops.",
    detailedDescription:
      "A hands-on, practical curriculum designed for business analysts, operations managers, and data leaders to master AI automation in Excel, Power BI, and modern reporting pipelines.",
    highlights: [
      "Live interactive masterclasses with expert instructors",
      "Hands-on AI formula generation and workflow automation",
      "Real-world dashboard case studies and enterprise toolkits",
      "Instant community support and reference repositories",
    ],
    ctaLabel: "Explore Learning Hub",
  },
  talent: {
    id: "talent",
    name: "Talent Deployment",
    kicker: "02 // Specialized Human Capital",
    tag: "ENTERPRISE MANPOWER",
    serviceInterest: "Talent Deployment",
    href: "/talent",
    shortDescription:
      "Elite SAP IS-U, S/4HANA, AI/ML engineers, and data infrastructure specialists deployed directly into your enterprise teams.",
    detailedDescription:
      "India-native enterprise workforce solutions pairing domain fluency with technical rigor. Rapid placement of vetted professionals across utilities, cloud, and AI engineering.",
    highlights: [
      "SAP IS-U deep domain specialists (Billing, FICA, CRM, Device Management)",
      "Applied AI, MLOps, and scalable data platform engineers",
      "Rapid 48-hour specialist shortlisting for urgent delivery roadmaps",
      "Flexible models: contract, contract-to-hire, and managed delivery teams",
    ],
    ctaLabel: "Deploy Talent",
  },
  technologyServices: {
    id: "technologyServices",
    name: "Technology Services",
    kicker: "03 // Systems Transformation",
    tag: "SAP, CLOUD & AI SOLUTIONS",
    serviceInterest: "Technology Services",
    href: "/technology-services",
    shortDescription:
      "End-to-end SAP S/4HANA transformation, multi-cloud architecture, cybersecurity, and applied generative AI systems.",
    detailedDescription:
      "Centres of Excellence delivering robust enterprise software architecture, full-lifecycle ERP migrations, 24/7 managed SOC threat detection, and custom intelligent automation.",
    highlights: [
      "SAP S/4HANA implementation, global rollouts, and managed maintenance",
      "Enterprise AI strategy, custom LLMs, and computer vision systems",
      "DevOps, multi-cloud migration, and sovereign data governance",
      "Cybersecurity assessments and managed SOC threat mitigation",
    ],
    ctaLabel: "Explore Technology Services",
  },
};

export const SERVICES_LIST: ServiceDefinition[] = Object.values(SERVICES_CONFIG);

export function getServiceByRoute(pathname: string): ServiceDefinition | undefined {
  if (pathname.startsWith("/learning")) return SERVICES_CONFIG.learning;
  if (pathname.startsWith("/talent")) return SERVICES_CONFIG.talent;
  if (pathname.startsWith("/technology-services")) return SERVICES_CONFIG.technologyServices;
  return undefined;
}

export function getDefaultServiceInterest(pathname: string): ServiceInterest {
  if (pathname.startsWith("/talent")) return "Talent Deployment";
  if (pathname.startsWith("/technology-services")) return "Technology Services";
  return "Learning Hub";
}
