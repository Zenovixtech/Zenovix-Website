export interface ServiceItem {
  title: string;
  desc: string;
  features: string[];
}

export interface ServiceCategory {
  key: "services" | "coes" | "solutions";
  label: string;
  items: ServiceItem[];
}

export const TECHNOLOGY_SERVICES_DATA: Record<"services" | "coes" | "solutions", ServiceCategory> = {
  services: {
    key: "services",
    label: "Services",
    items: [
      {
        title: "SAP S/4HANA implementation",
        desc: "Greenfield, brownfield and selective-transition programmes for public and private cloud editions.",
        features: ["Fit-to-standard workshops", "Data migration and cutover", "Testing and hypercare", "Change management"],
      },
      {
        title: "SAP ERP implementation",
        desc: "Design and rollout of core finance, supply chain, HR and utilities processes on SAP.",
        features: ["Blueprint and design", "Localisation", "Integration build", "Rollout support"],
      },
      {
        title: "Upgrades and migration",
        desc: "Low-risk moves to current SAP releases and cloud platforms.",
        features: ["Readiness assessment", "Custom code remediation", "System conversion", "Post-go-live tuning"],
      },
      {
        title: "Data volume management",
        desc: "Reduce data growth, speed up systems and lower storage cost through archiving and clean-up.",
        features: ["Archiving strategy", "Data quality rules", "Performance baselines", "Retention policies"],
      },
      {
        title: "Resource deployment and training",
        desc: "Skilled SAP and AI professionals on demand, plus corporate and online training programmes.",
        features: ["Contract and project staffing", "Role-based curricula", "Hands-on labs", "Certification support"],
      },
      {
        title: "AI Services",
        desc: "Take AI from idea to production, with every initiative tied to a measurable business return.",
        features: ["ROI with AI", "AI Solutions", "AI Life Cycle Management", "Trusted AI", "Agent Foundry", "AI Labs", "Agentic AI Platform"],
      },
      {
        title: "AI-Led Managed Services",
        desc: "Run applications and operations with AI doing the routine work, so your people focus on improvement.",
        features: ["AI-assisted ticket triage", "Automated monitoring and fixes", "Outcome-based service levels", "Continuous improvement reviews"],
      },
      {
        title: "Shared AMS for MSMEs",
        desc: "Affordable SAP application support for small and mid-sized businesses, shared across clients.",
        features: ["Shared support desk", "Fixed monthly pricing", "SAP expertise on demand", "Scalable as you grow"],
      },
      {
        title: "Global Capability Centers (GCCs)",
        desc: "Set up and run your own offshore centre, from location choice to a stable, self-sufficient team.",
        features: ["Setup and governance", "Talent hiring", "Operations and transition", "Build-operate-transfer"],
      },
      {
        title: "Data Analytics",
        desc: "Turn scattered data into trusted, ready-to-use insight.",
        features: ["Enterprise Data Advisory Services", "Data Modernization Services", "Data Management Services", "Analytics & AI", "Data Engineering Services"],
      },
      {
        title: "Connected Convergence Platform",
        desc: "Connect applications and data so systems share information reliably.",
        features: ["API Enablement and Integration Services", "Data Lifecycle Management Services"],
      },
      {
        title: "Embedded & Internet of Things (IoT)",
        desc: "Build connected devices and smart factories, from firmware to cloud dashboards.",
        features: ["Embedded Systems", "Factory Automation", "Smart IoT"],
      },
      {
        title: "Cloud & Infrastructure Management Services",
        desc: "Design, run and optimise cloud and data-centre infrastructure with clear cost control.",
        features: [
          "Cloud Infrastructure Services",
          "Core Infrastructure Support Services",
          "DevXOps",
          "Digital Workplace Services",
          "Intelligent Business Services Monitoring",
          "Unified IT Experience Desk",
          "FinOps Services",
          "Digital Operations Platform",
          "Well-Architected Framework Assessment",
        ],
      },
      {
        title: "Intelligence Services",
        desc: "Use AI, analytics and automation to improve decisions and remove manual work.",
        features: ["Artificial Intelligence Services", "Business Intelligence Solutions", "Cognitive 3D Services", "Conversational AI", "Data Visualization", "Robotic Process Automation Services"],
      },
      {
        title: "Cyber Security Services",
        desc: "Detect, prevent and respond to threats, and show clearly how exposed you are.",
        features: [
          "NexGen SOC",
          "Managed Detection and Response (MDR)",
          "Vulnerability Management Services (VMS)",
          "Penetration Testing",
          "360° Cyber Posture Management",
          "Breach & Attack Simulation (BAS) Service",
          "Third Party Risk Management",
          "On-demand vCISO Services",
          "Know Your Attack Surface (KYAS)",
        ],
      },
      {
        title: "Modernization",
        desc: "Move legacy applications to modern architectures without disrupting the business.",
        features: ["Application Migration and Modernization Services", "Cloud Transformation Services", "Enterprise Mobile Transformation"],
      },
      {
        title: "Digitalization",
        desc: "Introduce new digital capabilities that change how work gets done.",
        features: ["AI & Automation", "AR / VR / MR", "Blockchain", "Mobility"],
      },
      {
        title: "Customer Centric Ecosystem",
        desc: "Understand customers and serve them consistently across every channel.",
        features: ["Customer Experience", "Digital Marketing", "Digital Experience", "Social Listening"],
      },
      {
        title: "Sustainability",
        desc: "Measure, report and reduce environmental impact using your existing business data.",
        features: ["Emissions tracking", "ESG reporting", "Supply chain visibility", "Energy efficiency analytics"],
      },
      {
        title: "Product Compliance",
        desc: "Keep products and materials compliant with regulations, built into your SAP processes.",
        features: ["Regulatory content management", "Substance and material tracking", "Compliance reporting", "Audit readiness"],
      },
      {
        title: "Integration Services",
        desc: "Join enterprise applications, partners and cloud services through reliable interfaces.",
        features: ["Interface design", "Prebuilt connectors", "Monitoring and error handling", "Migration of legacy interfaces"],
      },
      {
        title: "Mobility",
        desc: "Mobile apps for field teams, customers and employees that work with your core systems.",
        features: ["Native and cross-platform apps", "Offline-first design", "Secure device management", "Backend integration"],
      },
      {
        title: "ZenovixTech Testing Services",
        desc: "Test enterprise changes faster and with fewer defects, from unit tests to full regression.",
        features: ["Test strategy", "Test automation", "Performance testing", "Release and UAT support"],
      },
    ],
  },
  coes: {
    key: "coes",
    label: "Expertise & CoEs",
    items: [
      {
        title: "SAP",
        desc: "Our deepest CoE: SAP S/4HANA, cloud, HR, supply chain, planning, data and testing, with reusable methods and accelerators.",
        features: [
          "SAP S/4HANA",
          "RISE with SAP",
          "SAP on Cloud",
          "SAP SuccessFactors",
          "SAP Technical",
          "SAP Infrastructure",
          "SAP Solution Manager",
          "SAP Higher Education & Research",
          "SAP Integrated Business Planning (IBP)",
          "SAP Digital Manufacturing (DM)",
          "SAP Digital Asset Reliability Management (DARM)",
          "SAP Data & Analytics",
          "SAP Business Data Cloud (BDC)",
          "SAP Testing",
        ],
      },
      {
        title: "Oracle",
        desc: "Implement, integrate and support Oracle cloud and on-premises applications.",
        features: ["Cloud Transformation", "Managed Services", "Oracle Application Services", "Enterprise Digital Transformation", "Integration Services", "Oracle Advisory & Consulting", "Oracle E-Business Suite Services"],
      },
      {
        title: "Microsoft",
        desc: "Azure, Microsoft 365, Dynamics and data platforms delivered as one connected stack.",
        features: ["Azure Infrastructure Services", "Collaboration: Microsoft Teams and SharePoint", "Modern Workplace: Microsoft 365", "Enterprise Modernization: Azure", "Rapid Application Development", "Zero Code Applications", "Microsoft Dynamics 365", "Microsoft Fabric", "Data and AI"],
      },
      {
        title: "Salesforce",
        desc: "Customer platforms linked to the rest of your business through modern integration tools.",
        features: ["Dell Boomi", "MuleSoft Services", "Informatica IDMC"],
      },
      {
        title: "Workday",
        desc: "Implementation and support for Workday HR and finance, with integrations to your wider landscape.",
        features: ["Implementation and deployment", "Integration and reporting", "Release management", "Ongoing support"],
      },
      {
        title: "ServiceNow",
        desc: "Digital workflows for IT, HR, risk, security and customer operations on the ServiceNow platform.",
        features: [
          "Integrated Risk Management (IRM)",
          "HR Service Delivery",
          "Intelligent Application Development",
          "Strategic Portfolio Management",
          "IT Operations Management",
          "IT Service Management",
          "Security Operations",
          "Financial Services Institute",
          "ServiceNow Managed Services",
          "Field Service Management",
          "Vendor Risk Management",
          "Legal Service Delivery",
        ],
      },
      {
        title: "AWS",
        desc: "Migrate, modernise and run workloads on AWS, including SAP, Microsoft and GenAI.",
        features: ["Migration & Modernization Services", "Data & Advanced Analytics", "GenAI on AWS", "SAP on AWS", "Managed Services", "DevOps on AWS", "Microsoft on AWS"],
      },
      {
        title: "GCP",
        desc: "Google Cloud data platforms and SAP hosting for analytics-led organisations.",
        features: ["Data and Analytics on GCP", "SAP on GCP"],
      },
      {
        title: "Databricks",
        desc: "Lakehouse engineering for data science, analytics and AI at scale.",
        features: ["Lakehouse design", "Data engineering pipelines", "Machine learning operations", "Governance and cost control"],
      },
      {
        title: "Snowflake",
        desc: "Cloud data warehouse design, migration and applications built on Snowflake.",
        features: ["AI-Powered Procure-to-Pay Intelligence"],
      },
      {
        title: "Hyperautomation",
        desc: "Combine RPA, AI and process insight to automate work end to end.",
        features: ["UiPath"],
      },
      {
        title: "Testing Services",
        desc: "Platform-led testing to speed up releases and cut production defects.",
        features: ["Tricentis solution", "Panaya solution"],
      },
      {
        title: "AI and GenAI CoE",
        desc: "Guides use-case selection, model choice, prompt and agent patterns, and responsible-AI controls.",
        features: ["Reference architectures", "Evaluation frameworks", "Guardrails", "Business case templates"],
      },
      {
        title: "Industrial AI CoE",
        desc: "Applies machine learning to plant, fleet and asset data for predictive maintenance and quality.",
        features: ["Sensor data pipelines", "Anomaly detection", "Condition-based maintenance", "Edge deployment"],
      },
      {
        title: "Cloud and cybersecurity CoE",
        desc: "Landing zones, identity, monitoring and security baselines for Azure and hybrid estates.",
        features: ["Architecture reviews", "Zero-trust design", "Threat monitoring", "Compliance mapping"],
      },
      {
        title: "Data and analytics CoE",
        desc: "Standards for data platforms, governance and reporting across client programmes.",
        features: ["Lakehouse patterns", "Master data governance", "Metric definitions", "BI standards"],
      },
      {
        title: "Learning academy",
        desc: "Builds client and Zenovix teams through structured, project-based learning.",
        features: ["Corporate training", "Online courses", "Bootcamps", "Skills assessments"],
      },
    ],
  },
  solutions: {
    key: "solutions",
    label: "Industry Solutions",
    items: [
      {
        title: "SAP S/4HANA Public Cloud",
        desc: "Standardised cloud ERP with ready processes for HR and finance.",
        features: ["HRMS", "Finance and controlling (FICO)", "Quarterly upgrades", "Fast time to value"],
      },
      {
        title: "SAP S/4HANA Private Cloud",
        desc: "Flexible ERP for complex enterprises and utilities needing deeper tailoring.",
        features: ["ERP core", "Utilities industry processes", "Custom extensions", "Managed hosting options"],
      },
      {
        title: "SAP BTP",
        desc: "Extend and integrate SAP with side-by-side apps, automation and AI.",
        features: ["Cyber security services", "Joule AI copilot", "Integration suite", "Low-code extensions"],
      },
      {
        title: "Industrial AI",
        desc: "Ready-to-configure models for asset health, quality and energy optimisation.",
        features: ["Predictive maintenance", "Visual inspection", "Energy analytics", "Operator copilots"],
      },
      {
        title: "SAP accelerators",
        desc: "Pre-built tools that speed migration, testing and reporting.",
        features: ["Data load templates", "Test automation packs", "Report libraries", "Cutover checklists"],
      },
      {
        title: "AI products",
        desc: "Productised assistants for documents, support and knowledge search.",
        features: ["Document summariser", "Enterprise search", "Support copilot", "Time-savings calculator"],
      },
      {
        title: "Agentic AI Platform",
        desc: "A platform for building, governing and running AI agents that complete multi-step business tasks.",
        features: ["Agent builder and templates", "Connectors to enterprise systems", "Human approval steps", "Usage and cost monitoring"],
      },
      {
        title: "Digital Shop Floor",
        desc: "Give operators live work instructions, status and quality checks on the shop floor.",
        features: ["Digital work instructions", "Real-time production status", "In-line quality checks", "Links to SAP and MES"],
      },
      {
        title: "E-Commerce",
        desc: "Online stores and B2B portals connected to inventory, pricing and order management.",
        features: ["Storefront and catalogue", "Live stock and pricing", "Order tracking", "Payment integration"],
      },
      {
        title: "Factory Process Automation",
        desc: "Automate repeatable factory processes, from material movement to reporting.",
        features: ["Process mapping", "Machine and system integration", "Exception alerts", "Performance dashboards"],
      },
      {
        title: "E-Learning",
        desc: "Course delivery and learner tracking for companies, schools and training providers.",
        features: ["Course authoring", "Progress tracking", "Assessments and certificates", "Mobile access"],
      },
      {
        title: "Healthcare & Tele-medicine",
        desc: "Remote consultation and patient workflow tools for clinics and hospitals.",
        features: ["Video consultation", "Appointment scheduling", "Patient records access", "Prescription workflow"],
      },
      {
        title: "Mobile Inventory Manager",
        desc: "Scan, count and move stock from a phone or handheld device, posting straight to SAP.",
        features: ["Goods receipt and issue", "Cycle counting", "Barcode scanning", "Offline mode"],
      },
      {
        title: "Workplace Safety",
        desc: "Report incidents, run safety checks and keep people and sites compliant.",
        features: ["Incident reporting", "Inspection checklists", "Corrective action tracking", "Safety dashboards"],
      },
      {
        title: "Data and Analytics Platform",
        desc: "One governed platform for data ingestion, modelling and self-service reporting.",
        features: ["Data pipelines", "Governed data models", "Self-service dashboards", "Machine learning ready"],
      },
      {
        title: "Insurance Industry Solution",
        desc: "Digital policy, claims and customer service processes for insurers, built on SAP and integrated with your core systems.",
        features: ["Policy administration", "Claims management", "Premium billing and collections", "Customer and agent portals"],
      },
      {
        title: "Professional Services Solution",
        desc: "SAP for project-based service firms, from staffing to billing.",
        features: ["Project and resource planning", "Time and expense", "Milestone billing", "Profitability reporting"],
      },
      {
        title: "Manufacturing Solution",
        desc: "Industry-ready SAP for discrete and process manufacturers.",
        features: ["Production planning", "Shop-floor execution", "Quality and traceability", "Cost control"],
      },
      {
        title: "Wholesale Distribution Solution",
        desc: "SAP for distributors managing high order volumes and thin margins.",
        features: ["Pricing and rebates", "Warehouse management", "Order fulfilment", "Customer credit control"],
      },
      {
        title: "High Tech Solution",
        desc: "SAP for technology companies with fast product cycles and complex channels.",
        features: ["Product lifecycle support", "Channel and partner management", "Subscription and usage billing", "Global trade"],
      },
      {
        title: "Finance Solution",
        desc: "Faster close, clearer reporting and tighter control in SAP finance.",
        features: ["Financial close", "Accounts payable and receivable", "Treasury and cash", "Management reporting"],
      },
      {
        title: "Consumer Products Solution",
        desc: "SAP for consumer goods firms managing brands, trade promotions and retail demand.",
        features: ["Trade promotion management", "Demand planning", "Retail execution", "Batch and expiry tracking"],
      },
      {
        title: "SuccessFactors Quick Start",
        desc: "Pre-configured SAP SuccessFactors for a faster HR cloud rollout.",
        features: ["Core HR", "Recruiting and onboarding", "Performance and goals", "Learning"],
      },
      {
        title: "People and HR Solution",
        desc: "Employee records, payroll and self-service built on SAP HR.",
        features: ["Employee self-service", "Payroll", "Time management", "HR analytics"],
      },
      {
        title: "Digital Onboarding Solution",
        desc: "Bring new customers, vendors or employees on board online, with checks built in.",
        features: ["Document capture and verification", "Approval workflows", "Status tracking", "Audit trail"],
      },
    ],
  },
};
