"use client";

import { useState } from "react";
import Image from "next/image";
import RegisterButton from "./RegisterButton";
import TrackingLink from "./TrackingLink";
import InteractivePanel from "./interactive/InteractivePanel";
import InteractiveNetworkHero from "./InteractiveNetworkHero";

export function TalentHero() {
  return (
    <section className="talent-hero-section" aria-labelledby="talent-hero-heading">
      {/* Dynamic network particle canvas background */}
      <InteractiveNetworkHero />

      {/* Grid overlay decorations */}
      <div className="hero-grid-lines" aria-hidden="true">
        <div className="grid-line horizontal top"></div>
        <div className="grid-line horizontal bottom"></div>
        <div className="grid-line vertical left"></div>
        <div className="grid-line vertical right"></div>
      </div>

      <div className="wrap talent-hero-grid">
        <div className="talent-hero-copy">
          <div className="hero-status-strip">
            <span className="hero-mono-chip">{"// 02 TALENT DEPLOYMENT"}</span>
            <span className="hero-pill-status">
              <span className="dot pulse"></span>
              ACTIVE SPECIALISTS AVAILABLE
            </span>
          </div>

          <h1 id="talent-hero-heading" className="talent-title">
            The people you need for the systems that <span className="gradient-text">cannot fail.</span>
          </h1>

          <p className="talent-lead">
            We place specialised SAP IS-U, SAP, AI, data and enterprise technology professionals with companies running critical infrastructure across India.
          </p>

          <div className="talent-cta-row">
            <RegisterButton serviceInterest="Talent Deployment" className="btn btn-primary">
              <span>Deploy Specialists</span>
              <span className="arrow" aria-hidden="true">→</span>
            </RegisterButton>

            <a href="#specialisms" className="btn btn-secondary">
              <span>Explore Practices</span>
              <span className="arrow" aria-hidden="true">↓</span>
            </a>
          </div>

          <div className="talent-proof-summary reveal">
            <div className="proof-metric">
              <strong>48-HR</strong>
              <span>Target Shortlist</span>
            </div>
            <div className="proof-metric">
              <strong>Domain-First</strong>
              <span>Interview Vetting</span>
            </div>
            <div className="proof-metric">
              <strong>Pan-India</strong>
              <span>Enterprise Delivery</span>
            </div>
          </div>
        </div>

        <div className="talent-hero-visual reveal reveal-stagger-2">
          <div className="talent-visual-frame">
            <Image
              src="/images/zenovix-agile-team.jpg"
              alt="Zenovix agile enterprise delivery team"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 520px"
              className="talent-visual-img"
            />
            <div className="talent-visual-scrim" />

            {/* Active Specialism Floating Card */}
            <div className="talent-status-card">
              <span className="card-micro-label">ACTIVE SPECIALISM</span>
              <strong>SAP IS-U Billing &amp; CRM</strong>
              <div className="card-pulse-row">
                <span className="live-indicator"></span>
                <span>Specialists Deployed &amp; Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TalentLogoBand() {
  const logos = ["SAP IS-U", "S/4HANA", "DATA & AI", "CLOUD INFRASTRUCTURE", "ENTERPRISE WORKFORCE"];
  return (
    <div className="talent-logo-band reveal" aria-label="Core practice disciplines">
      <div className="wrap">
        <div className="band-items">
          {logos.map((logo, i) => (
            <span key={i} className="band-item">
              <span className="band-dot">✦</span>
              {logo}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TalentSpecialisms() {
  const [activeTab, setActiveTab] = useState<"isu" | "ai" | "sap" | "it">("isu");

  return (
    <section className="talent-practices-section" id="specialisms" aria-labelledby="practices-heading">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="mono-label">{"// PRACTICE DISCIPLINES"}</span>
          <h2 id="practices-heading">Talent that understands the work before day one.</h2>
          <p className="section-sub">
            We focus on enterprise platforms where domain fluency matters just as much as technical ability.
          </p>
        </div>

        {/* Practice Selection Tabs */}
        <div className="practice-tabs reveal" role="tablist" aria-label="Talent Practice Areas">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "isu"}
            className={`practice-tab-btn ${activeTab === "isu" ? "active" : ""}`}
            onClick={() => setActiveTab("isu")}
          >
            <span className="tab-pill">DOMAIN</span>
            <span>SAP IS-U / Utilities</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "ai"}
            className={`practice-tab-btn ${activeTab === "ai" ? "active" : ""}`}
            onClick={() => setActiveTab("ai")}
          >
            <span className="tab-pill">MODERN</span>
            <span>AI &amp; Data Engineering</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "sap"}
            className={`practice-tab-btn ${activeTab === "sap" ? "active" : ""}`}
            onClick={() => setActiveTab("sap")}
          >
            <span className="tab-pill">CORE</span>
            <span>Enterprise SAP</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "it"}
            className={`practice-tab-btn ${activeTab === "it" ? "active" : ""}`}
            onClick={() => setActiveTab("it")}
          >
            <span className="tab-pill">ENGINEERING</span>
            <span>Non-SAP IT</span>
          </button>
        </div>

        {/* Tab 1: SAP IS-U */}
        {activeTab === "isu" && (
          <InteractivePanel className="practice-detail-panel reveal" role="tabpanel" keyTrigger={activeTab}>
            <div className="practice-panel-intro">
              <span className="panel-kicker">FLAGSHIP SPECIALISM</span>
              <h3>Deep expertise for India&apos;s power, gas, and water distribution networks.</h3>
              <p>
                Our consultants bring hands-on experience in tariff structures, billing schemes, smart metering rollouts, and multi-channel customer workflows.
              </p>
            </div>

            <div className="roles-grid">
              {[
                { title: "Billing & Invoicing", desc: "Tariff rates, billing schemas, budget billing, and cross-system reconciliation." },
                { title: "Device Management", desc: "Meter reading data imports, AMI integration, device lifecycle, and asset tracking." },
                { title: "Customer Service (CS / CRM)", desc: "Customer interaction center, contract accounts, disconnections, and payments." },
                { title: "FICA (Contract Accounts)", desc: "Subledger accounting, dunning runs, payment lots, and banking interfaces." },
                { title: "Intercompany Data Exchange", desc: "Deregulated market messaging, data sync, and market communication protocols." },
                { title: "IS-U ABAP & Extensions", desc: "Enhancements, BAdIs, user exits, print workbenches, and S/4HANA utilities conversion." },
              ].map((role, idx) => (
                <div key={role.title} className={`role-box reveal reveal-stagger-${(idx % 3) + 1}`}>
                  <h4>{role.title}</h4>
                  <p>{role.desc}</p>
                </div>
              ))}
            </div>

            <div className="panel-action">
              <RegisterButton serviceInterest="Talent Deployment" className="btn btn-primary">
                <span>Discuss an IS-U Brief</span>
                <span className="arrow" aria-hidden="true">→</span>
              </RegisterButton>
            </div>
          </InteractivePanel>
        )}

        {/* Tab 2: AI & Data */}
        {activeTab === "ai" && (
          <InteractivePanel className="practice-detail-panel reveal" role="tabpanel" keyTrigger={activeTab}>
            <div className="practice-panel-intro">
              <span className="panel-kicker">APPLIED CAPABILITY</span>
              <h3>Engineers who turn data and machine learning into production systems.</h3>
              <p>
                From clean data infrastructure to LLM agents and predictive models integrated directly into your existing enterprise stack.
              </p>
            </div>

            <div className="roles-grid">
              {[
                { title: "LLM & GenAI Engineers", desc: "RAG architectures, prompt engineering, agent frameworks, and enterprise fine-tuning." },
                { title: "Data Engineers", desc: "Databricks, Snowflake, PySpark pipelines, lakehouse architectures, and DBT transformations." },
                { title: "Computer Vision & OCR", desc: "Document understanding, invoice extraction, defect detection, and edge deployment." },
                { title: "Predictive Analytics", desc: "Demand forecasting, predictive maintenance, customer churn, and anomaly detection." },
                { title: "BI & Dashboard Architects", desc: "Power BI, Tableau, executive data models, and automated reporting pipelines." },
                { title: "AI Governance & MLOps", desc: "Model monitoring, evaluation frameworks, security guardrails, and compliance." },
              ].map((role, idx) => (
                <div key={role.title} className={`role-box reveal reveal-stagger-${(idx % 3) + 1}`}>
                  <h4>{role.title}</h4>
                  <p>{role.desc}</p>
                </div>
              ))}
            </div>

            <div className="panel-action">
              <RegisterButton serviceInterest="Talent Deployment" className="btn btn-primary">
                <span>Deploy AI &amp; Data Leads</span>
                <span className="arrow" aria-hidden="true">→</span>
              </RegisterButton>
            </div>
          </InteractivePanel>
        )}

        {/* Tab 3: Enterprise SAP */}
        {activeTab === "sap" && (
          <InteractivePanel className="practice-detail-panel reveal" role="tabpanel" keyTrigger={activeTab}>
            <div className="practice-panel-intro">
              <span className="panel-kicker">CORE ENTERPRISE SAP</span>
              <h3>S/4HANA and module specialists for end-to-end ERP excellence.</h3>
              <p>
                Complete coverage of functional, technical, and architectural requirements across modern SAP ecosystems.
              </p>
            </div>

            <div className="roles-grid">
              {[
                { title: "S/4HANA Migration Leads", desc: "Greenfield, brownfield, and selective data transition architectural specialists." },
                { title: "FICO & Treasury", desc: "Financial accounting, controlling, cash management, and regulatory reporting." },
                { title: "Supply Chain (MM / SD / PP)", desc: "Materials management, sales and distribution, production planning, and logistics." },
                { title: "ABAP on HANA & BTP", desc: "Core Data Services (CDS), RAP/CAP models, Fiori development, and cloud extensions." },
                { title: "Basis & Security", desc: "System administration, kernel patching, user authorization matrices, and disaster recovery." },
                { title: "SuccessFactors", desc: "Employee Central, recruiting, onboarding, performance, and workforce analytics." },
              ].map((role, idx) => (
                <div key={role.title} className={`role-box reveal reveal-stagger-${(idx % 3) + 1}`}>
                  <h4>{role.title}</h4>
                  <p>{role.desc}</p>
                </div>
              ))}
            </div>

            <div className="panel-action">
              <RegisterButton serviceInterest="Talent Deployment" className="btn btn-primary">
                <span>Request SAP Specialists</span>
                <span className="arrow" aria-hidden="true">→</span>
              </RegisterButton>
            </div>
          </InteractivePanel>
        )}

        {/* Tab 4: Non-SAP IT */}
        {activeTab === "it" && (
          <InteractivePanel className="practice-detail-panel reveal" role="tabpanel" keyTrigger={activeTab}>
            <div className="practice-panel-intro">
              <span className="panel-kicker">INFRASTRUCTURE &amp; ENGINEERING</span>
              <h3>Cloud, cybersecurity, product engineering, and digital platforms.</h3>
              <p>
                Bridging core enterprise ERP with modern microservices, cloud fabrics, and resilient security perimeters.
              </p>
            </div>

            <div className="roles-grid">
              {[
                { title: "Cloud Architects", desc: "AWS, Azure, and Google Cloud platform design, cost governance, and multi-region resilience." },
                { title: "DevOps & SRE", desc: "Kubernetes orchestration, CI/CD pipelines, automated testing, and uptime engineering." },
                { title: "Cybersecurity Specialists", desc: "SOC analysts, threat intelligence, identity & access governance, and penetration testing." },
                { title: "Full-Stack Engineers", desc: "Modern React, TypeScript, Next.js, Python, Node, and Go enterprise application developers." },
              ].map((role, idx) => (
                <div key={role.title} className={`role-box reveal reveal-stagger-${(idx % 2) + 1}`}>
                  <h4>{role.title}</h4>
                  <p>{role.desc}</p>
                </div>
              ))}
            </div>

            <div className="panel-action">
              <RegisterButton serviceInterest="Talent Deployment" className="btn btn-primary">
                <span>Deploy IT Engineering</span>
                <span className="arrow" aria-hidden="true">→</span>
              </RegisterButton>
            </div>
          </InteractivePanel>
        )}
      </div>
    </section>
  );
}

export function TalentDeliveryProcess() {
  const steps = [
    {
      num: "01",
      title: "Frame the need",
      desc: "We translate your business outcome into skills, domain context, team shape and delivery timeline.",
    },
    {
      num: "02",
      title: "Curate the shortlist",
      desc: "Get a relevant, vetted group of specialists within 48 hours rather than a stack of loosely matched CVs.",
    },
    {
      num: "03",
      title: "Deploy with care",
      desc: "From contracting through onboarding, we keep the delivery line clear, accountable, and SLA-governed.",
    },
  ];

  return (
    <section className="talent-process-section" id="delivery" aria-labelledby="delivery-heading">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="mono-label">{"// DELIVERY DISCIPLINE"}</span>
          <h2 id="delivery-heading">Less searching. More certainty.</h2>
          <p className="section-sub">A proven model designed to remove friction from enterprise staffing.</p>
        </div>

        <div className="process-grid">
          {steps.map((s, idx) => (
            <div key={s.num} className={`process-step-card reveal reveal-stagger-${idx + 1}`}>
              <span className="process-num">{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TalentIndustries() {
  const industries = [
    "Utilities & Energy",
    "Public Sector & Governance",
    "Financial Services & Banking",
    "Manufacturing & Discrete Operations",
    "Retail & Consumer Products",
    "Technology & Professional Services",
  ];

  return (
    <section className="talent-industries-section" id="industries" aria-labelledby="industries-heading">
      <div className="wrap talent-industries-grid">
        <div className="industries-media reveal">
          <div className="industries-frame">
            <Image
              src="/images/zenovix-data-operations.jpg"
              alt="Zenovix enterprise operations centre"
              fill
              sizes="(max-width: 900px) 100vw, 500px"
              className="industries-img"
            />
            <div className="industries-scrim" />
          </div>
        </div>

        <div className="industries-copy reveal reveal-stagger-2">
          <span className="mono-label">{"// SECTOR FLUENCY"}</span>
          <h2 id="industries-heading">Where operational complexity meets new possibility.</h2>
          <p className="industries-lead">
            Enterprise platforms require teams that understand industry workflows, regulatory guardrails, and customer SLA demands.
          </p>

          <div className="industry-tag-cloud">
            {industries.map((ind, i) => (
              <span key={i} className="industry-tag">
                <span className="tag-dot">✦</span>
                {ind}
              </span>
            ))}
          </div>

          <div className="industries-cta-box">
            <RegisterButton serviceInterest="Talent Deployment" className="btn btn-primary">
              <span>Discuss Your Workforce Plan</span>
              <span className="arrow" aria-hidden="true">→</span>
            </RegisterButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TalentFaq() {
  const faqs = [
    {
      q: "How quickly can you share profiles?",
      a: "For common and urgent requirements, we aim to share an initial specialist shortlist within 48 hours. Niche SAP IS-U and leadership searches are planned around the brief.",
    },
    {
      q: "Can you support an entire programme team?",
      a: "Yes. We can structure blended teams across SAP functional, technical, data, QA, integration and delivery roles.",
    },
    {
      q: "Do you support both contract and permanent hiring?",
      a: "Yes. Our engagement model is shaped around your roadmap, governance and need for flexibility.",
    },
  ];

  return (
    <section className="talent-faq-section" id="faq" aria-labelledby="faq-heading">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="mono-label">{"// QUESTIONS ANSWERED"}</span>
          <h2 id="faq-heading">What businesses usually ask us.</h2>
        </div>

        <div className="talent-faq-list">
          {faqs.map((faq, idx) => (
            <details key={idx} className={`talent-faq-item reveal reveal-stagger-${(idx % 3) + 1}`} open={idx === 0}>
              <summary className="talent-faq-question">
                <span>{faq.q}</span>
                <span className="talent-faq-icon" aria-hidden="true">+</span>
              </summary>
              <div className="talent-faq-answer">
                <p>{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TalentEnquiryCta() {
  return (
    <section className="talent-enquiry-section" id="contact" aria-labelledby="enquiry-heading">
      <div className="wrap talent-enquiry-box reveal">
        <div className="enquiry-info">
          <span className="mono-label">{"// GET IN TOUCH"}</span>
          <h2 id="enquiry-heading">Your next critical hire can start here.</h2>
          <p>
            Tell us what the programme needs. A Zenovix specialist will respond with a focused plan, not a generic sales pitch.
          </p>

          <div className="contact-details-list">
            <div className="contact-detail-row">
              <strong>Email:</strong>
              <a href="mailto:sales@zenovixtechnologies.com">sales@zenovixtechnologies.com</a>
            </div>
            <div className="contact-detail-row">
              <strong>Response SLA:</strong>
              <span>Within 48 hours with candidate profiles</span>
            </div>
            <div className="contact-detail-row">
              <strong>Support:</strong>
              <a href="mailto:support@zenovixtechnologies.com">support@zenovixtechnologies.com</a>
            </div>
            <div className="contact-detail-row">
              <strong>Coverage:</strong>
              <span>Enterprise businesses across India</span>
            </div>
          </div>
        </div>

        <div className="enquiry-form-card">
          <h3>Deploy Specialists with Zenovix</h3>
          <p>Open our verified submission form to request consultants, interview shortlists, or managed teams.</p>

          <div className="enquiry-card-action">
            <RegisterButton
              serviceInterest="Talent Deployment"
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              <span>Launch Talent Request</span>
              <span className="arrow" aria-hidden="true">→</span>
            </RegisterButton>

            <div className="route-back-strip">
              <span>Looking for corporate workshops?</span>
              <TrackingLink href="/learning" className="back-link">
                Explore Learning Hub →
              </TrackingLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
