"use client";

import { useState } from "react";
import Image from "next/image";
import RegisterButton from "./RegisterButton";
import TrackingLink from "./TrackingLink";

export function TalentHero() {
  return (
    <section className="talent-hero-section" aria-labelledby="talent-hero-heading">
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

          <div className="talent-proof-summary">
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

        <div className="talent-hero-visual">
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
              <strong>SAP IS-U Billing & CRM</strong>
              <div className="card-pulse-row">
                <span className="live-indicator"></span>
                <span>Specialists Deployed & Available</span>
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
    <div className="talent-logo-band" aria-label="Core practice disciplines">
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
        <div className="section-head">
          <span className="mono-label">{"// PRACTICE DISCIPLINES"}</span>
          <h2 id="practices-heading">Talent that understands the work before day one.</h2>
          <p className="section-sub">
            We focus on enterprise platforms where domain fluency matters just as much as technical ability.
          </p>
        </div>

        {/* Practice Selection Tabs */}
        <div className="practice-tabs" role="tablist" aria-label="Talent Practice Areas">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "isu"}
            className={`practice-tab-btn ${activeTab === "isu" ? "active" : ""}`}
            onClick={() => setActiveTab("isu")}
          >
            01 / SAP IS-U (Utilities)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "ai"}
            className={`practice-tab-btn ${activeTab === "ai" ? "active" : ""}`}
            onClick={() => setActiveTab("ai")}
          >
            02 / AI & Data Practice
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "sap"}
            className={`practice-tab-btn ${activeTab === "sap" ? "active" : ""}`}
            onClick={() => setActiveTab("sap")}
          >
            03 / Enterprise SAP
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "it"}
            className={`practice-tab-btn ${activeTab === "it" ? "active" : ""}`}
            onClick={() => setActiveTab("it")}
          >
            04 / Non-SAP IT & Cloud
          </button>
        </div>

        {/* Tab 1: SAP IS-U Deep Dive */}
        {activeTab === "isu" && (
          <div className="practice-detail-panel" role="tabpanel">
            <div className="practice-panel-intro">
              <span className="panel-kicker">SAP IS-U UTILITIES PRACTICE</span>
              <h3>SAP IS-U talent for the work that cannot pause.</h3>
              <p>
                From transformation to billing operations, we place specialists who understand the real-world pressures of utility systems in India.
              </p>
            </div>

            <div className="roles-grid">
              <div className="role-box">
                <h4>Billing & Invoicing</h4>
                <p>Configuration, validation, rate categories, billing schemes, and exception management.</p>
              </div>
              <div className="role-box">
                <h4>FICA & Collections</h4>
                <p>Contract accounts receivable, dunning pipelines, installment payments, and GL integration.</p>
              </div>
              <div className="role-box">
                <h4>CRM & Customer Service</h4>
                <p>Customer care interaction centers, move-in/move-out workflows, and service processes.</p>
              </div>
              <div className="role-box">
                <h4>Device Management</h4>
                <p>Smart metering, meter reading orders, device installation, replacement, and field workflows.</p>
              </div>
              <div className="role-box">
                <h4>EDM & Energy Analytics</h4>
                <p>Energy data management, profile settlement, load curves, and real-time consumption insight.</p>
              </div>
              <div className="role-box">
                <h4>Integration & Delivery</h4>
                <p>ABAP, SAP BTP extensions, middleware interfaces, QA test automation, and programme leadership.</p>
              </div>
            </div>

            <div className="panel-action">
              <RegisterButton serviceInterest="Talent Deployment" className="btn btn-primary">
                <span>Discuss an IS-U Brief</span>
                <span className="arrow" aria-hidden="true">→</span>
              </RegisterButton>
            </div>
          </div>
        )}

        {/* Tab 2: AI & Data Practice Deep Dive */}
        {activeTab === "ai" && (
          <div className="practice-detail-panel" role="tabpanel">
            <div className="practice-panel-intro">
              <span className="panel-kicker">AI & DATA ENGINEERING PRACTICE</span>
              <h3>Practical AI capability for enterprise-scale ambition.</h3>
              <p>
                Build teams that can take AI from promising experiment to secure, useful operations alongside the data foundations that sustain it.
              </p>
            </div>

            <div className="roles-grid">
              <div className="role-box">
                <h4>AI Engineers</h4>
                <p>Applied AI, LLM workflows, retrieval-augmented generation (RAG), and model evaluation.</p>
              </div>
              <div className="role-box">
                <h4>ML & MLOps</h4>
                <p>Model development, deployment pipelines, latency optimization, monitoring, and governance.</p>
              </div>
              <div className="role-box">
                <h4>Data Engineering</h4>
                <p>Distributed data platforms, ETL pipelines, streaming architectures, and cloud warehousing.</p>
              </div>
              <div className="role-box">
                <h4>Data Science</h4>
                <p>Statistical forecasting, operations optimization, experimentation, and predictive modeling.</p>
              </div>
              <div className="role-box">
                <h4>Analytics & BI</h4>
                <p>Enterprise BI dashboards, product analytics, and executive decision-support reporting.</p>
              </div>
              <div className="role-box">
                <h4>AI Leadership</h4>
                <p>System architects, product leads, responsible AI compliance, and transformation directorship.</p>
              </div>
            </div>

            <div className="panel-action">
              <RegisterButton serviceInterest="Talent Deployment" className="btn btn-primary">
                <span>Discuss Your AI Team</span>
                <span className="arrow" aria-hidden="true">→</span>
              </RegisterButton>
            </div>
          </div>
        )}

        {/* Tab 3: Enterprise SAP */}
        {activeTab === "sap" && (
          <div className="practice-detail-panel" role="tabpanel">
            <div className="practice-panel-intro">
              <span className="panel-kicker">CORE ENTERPRISE SAP</span>
              <h3>S/4HANA and module specialists for end-to-end ERP excellence.</h3>
              <p>
                Complete coverage of functional, technical, and architectural requirements across modern SAP ecosystems.
              </p>
            </div>

            <div className="roles-grid">
              <div className="role-box">
                <h4>S/4HANA Migration Leads</h4>
                <p>Greenfield, brownfield, and selective data transition architectural specialists.</p>
              </div>
              <div className="role-box">
                <h4>FICO & Treasury</h4>
                <p>Financial accounting, controlling, cash management, and regulatory reporting.</p>
              </div>
              <div className="role-box">
                <h4>Supply Chain (MM / SD / PP)</h4>
                <p>Materials management, sales and distribution, production planning, and logistics.</p>
              </div>
              <div className="role-box">
                <h4>ABAP on HANA & BTP</h4>
                <p>Core Data Services (CDS), RAP/CAP models, Fiori development, and cloud extensions.</p>
              </div>
              <div className="role-box">
                <h4>Basis & Security</h4>
                <p>System administration, kernel patching, user authorization matrices, and disaster recovery.</p>
              </div>
              <div className="role-box">
                <h4>SuccessFactors</h4>
                <p>Employee Central, recruiting, onboarding, performance, and workforce analytics.</p>
              </div>
            </div>

            <div className="panel-action">
              <RegisterButton serviceInterest="Talent Deployment" className="btn btn-primary">
                <span>Request SAP Specialists</span>
                <span className="arrow" aria-hidden="true">→</span>
              </RegisterButton>
            </div>
          </div>
        )}

        {/* Tab 4: Non-SAP IT */}
        {activeTab === "it" && (
          <div className="practice-detail-panel" role="tabpanel">
            <div className="practice-panel-intro">
              <span className="panel-kicker">INFRASTRUCTURE & ENGINEERING</span>
              <h3>Cloud, cybersecurity, product engineering, and digital platforms.</h3>
              <p>
                Bridging core enterprise ERP with modern microservices, cloud fabrics, and resilient security perimeters.
              </p>
            </div>

            <div className="roles-grid">
              <div className="role-box">
                <h4>Cloud Architects</h4>
                <p>AWS, Azure, and Google Cloud platform design, cost governance, and multi-region resilience.</p>
              </div>
              <div className="role-box">
                <h4>DevOps & SRE</h4>
                <p>Kubernetes orchestration, CI/CD pipelines, automated testing, and uptime engineering.</p>
              </div>
              <div className="role-box">
                <h4>Cybersecurity Specialists</h4>
                <p>SOC analysts, threat intelligence, identity & access governance, and penetration testing.</p>
              </div>
              <div className="role-box">
                <h4>Full-Stack Engineers</h4>
                <p>Modern React, TypeScript, Next.js, Python, Node, and Go enterprise application developers.</p>
              </div>
            </div>

            <div className="panel-action">
              <RegisterButton serviceInterest="Talent Deployment" className="btn btn-primary">
                <span>Deploy IT Engineering</span>
                <span className="arrow" aria-hidden="true">→</span>
              </RegisterButton>
            </div>
          </div>
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
        <div className="section-head">
          <span className="mono-label">{"// DELIVERY DISCIPLINE"}</span>
          <h2 id="delivery-heading">Less searching. More certainty.</h2>
          <p className="section-sub">A proven model designed to remove friction from enterprise staffing.</p>
        </div>

        <div className="process-grid">
          {steps.map((s) => (
            <div key={s.num} className="process-step-card">
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
        <div className="industries-media">
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

        <div className="industries-copy">
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
        <div className="section-head">
          <span className="mono-label">{"// QUESTIONS ANSWERED"}</span>
          <h2 id="faq-heading">What businesses usually ask us.</h2>
        </div>

        <div className="faq-list">
          {faqs.map((faq, idx) => (
            <details key={idx} className="faq-item" open={idx === 0}>
              <summary className="faq-question">
                <span>{faq.q}</span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <div className="faq-answer">
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
      <div className="wrap talent-enquiry-box">
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
              <strong>Direct Desk:</strong>
              <a href="tel:+919136224840">+91 91362 24840</a>
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
