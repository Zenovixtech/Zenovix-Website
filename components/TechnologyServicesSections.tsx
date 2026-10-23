"use client";

import { useState, useRef } from "react";
import RegisterButton from "./RegisterButton";
import TrackingLink from "./TrackingLink";
import InteractiveNetworkHero from "./InteractiveNetworkHero";
import {
  TECHNOLOGY_SERVICES_DATA,
  ServiceCategory,
  ServiceItem,
} from "@/lib/technology-services-data";
import { useModalContext } from "./ModalContext";

export function TechnologyServicesHero() {
  return (
    <section className="tech-hero-section" aria-labelledby="tech-hero-heading">
      <InteractiveNetworkHero />

      <div className="wrap tech-hero-content">
        <div className="hero-status-strip">
          <span className="hero-mono-chip">{"// 03 TECHNOLOGY SERVICES"}</span>
          <span className="hero-pill-status">
            <span className="dot pulse"></span>
            SAP · AI · CLOUD · CYBER
          </span>
        </div>

        <h1 id="tech-hero-heading" className="tech-hero-title">
          Delivering <span className="gradient-text">SAP S/4HANA, AI, Cloud</span> and Cybersecurity Services from Mumbai, India.
        </h1>

        <p className="tech-hero-lead">
          Zenovix Technologies designs, deploys, and manages resilient enterprise architectures.
          From complex ERP conversions to autonomous AI platforms and managed threat mitigation,
          we turn architectural ambition into reliable operational reality.
        </p>

        <div className="tech-hero-actions">
          <a href="#explorer" className="btn btn-primary">
            <span>Explore Solutions Matrix</span>
            <span className="arrow" aria-hidden="true">↓</span>
          </a>

          <RegisterButton serviceInterest="Technology Services" className="btn btn-secondary">
            <span>Request Systems Consultation</span>
            <span className="arrow" aria-hidden="true">→</span>
          </RegisterButton>
        </div>

        <div className="tech-hero-badges">
          <div className="badge-item">
            <span className="badge-dot">✦</span>
            <span>SAP Gold Delivery Standard</span>
          </div>
          <div className="badge-item">
            <span className="badge-dot">✦</span>
            <span>Zero-Trust Cloud Governance</span>
          </div>
          <div className="badge-item">
            <span className="badge-dot">✦</span>
            <span>Autonomous AI Operations</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TechnologyServicesExplorer() {
  const [activeCategory, setActiveCategory] = useState<"services" | "coes" | "solutions">("services");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const { openModal } = useModalContext();
  const askButtonRef = useRef<HTMLButtonElement>(null);

  const category: ServiceCategory = TECHNOLOGY_SERVICES_DATA[activeCategory];
  const currentItem: ServiceItem = category.items[selectedIndex] || category.items[0];

  const handleCategoryChange = (key: "services" | "coes" | "solutions") => {
    setActiveCategory(key);
    setSelectedIndex(0);
  };

  return (
    <section className="tech-explorer-section" id="explorer" aria-labelledby="explorer-heading">
      <div className="wrap">
        <div className="section-head">
          <span className="mono-label">{"// SYSTEM CAPABILITIES"}</span>
          <h2 id="explorer-heading">Comprehensive Enterprise Capabilities Matrix.</h2>
          <p className="section-sub">
            Explore our genuine practice areas, centres of excellence, and industry-tailored solutions.
          </p>
        </div>

        {/* Categories Tab Bar */}
        <div className="explorer-tabs" role="tablist" aria-label="Technology Services Categories">
          {(["services", "coes", "solutions"] as const).map((key) => {
            const cat = TECHNOLOGY_SERVICES_DATA[key];
            const isSelected = activeCategory === key;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`explorer-tab-btn ${isSelected ? "active" : ""}`}
                onClick={() => handleCategoryChange(key)}
              >
                <span>{cat.label}</span>
                <span className="tab-count">({cat.items.length})</span>
              </button>
            );
          })}
        </div>

        {/* Split Grid: List + Live Panel */}
        <div className="explorer-grid">
          {/* Left Column: Interactive List */}
          <div
            className="explorer-list-box"
            role="tablist"
            aria-label={`${category.label} Items`}
          >
            <div className="list-scroll-container">
              {category.items.map((item, idx) => {
                const isActive = idx === selectedIndex;
                return (
                  <button
                    key={item.title}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`explorer-item-btn ${isActive ? "active" : ""}`}
                    onClick={() => setSelectedIndex(idx)}
                  >
                    <div className="item-text">
                      <span className="item-title">{item.title}</span>
                      <span className="item-summary">{item.desc}</span>
                    </div>
                    <span className="item-chevron" aria-hidden="true">›</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Live Interactive Detail Panel */}
          <div className="explorer-detail-panel" role="tabpanel">
            <div className="panel-badge-row">
              <span className="panel-category-tag">{category.label.toUpperCase()}</span>
              <span className="panel-item-num">ITEM // {String(selectedIndex + 1).padStart(2, "0")}</span>
            </div>

            <h3 className="panel-item-title">{currentItem.title}</h3>
            <p className="panel-item-description">{currentItem.desc}</p>

            <div className="panel-features-block">
              <h4 className="features-heading">CORE DELIVERABLES & MODULES:</h4>
              <ul className="features-list">
                {currentItem.features.map((feat, fIdx) => (
                  <li key={fIdx}>
                    <span className="feat-bullet">▹</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="panel-actions-row">
              <button
                ref={askButtonRef}
                type="button"
                className="btn btn-primary"
                onClick={() => openModal(askButtonRef, "Technology Services")}
              >
                <span>Ask about {currentItem.title}</span>
                <span className="arrow" aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TechnologyServicesWhyZenovix() {
  const cards = [
    {
      num: "01",
      title: "Senior-led delivery",
      desc: "Programmes are guided by leaders with decades of SAP, cloud and AI experience at global consulting firms.",
    },
    {
      num: "02",
      title: "Practical AI",
      desc: "We pick use cases with measurable time or cost savings, then take them from pilot to production.",
    },
    {
      num: "03",
      title: "One accountable partner",
      desc: "Implementation, support, security and training under a single engagement team.",
    },
  ];

  return (
    <section className="tech-why-section" aria-labelledby="why-tech-heading">
      <div className="wrap">
        <div className="section-head">
          <span className="mono-label">{"// THE ZENOVIX DIFFERENCE"}</span>
          <h2 id="why-tech-heading">Why enterprise leaders choose Zenovix.</h2>
        </div>

        <div className="why-grid">
          {cards.map((c) => (
            <div key={c.num} className="why-card">
              <span className="why-num">{c.num}</span>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TechnologyServicesContact() {
  return (
    <section className="tech-contact-section" id="contact" aria-labelledby="tech-contact-heading">
      <div className="wrap tech-contact-grid">
        <div className="tech-contact-info">
          <span className="mono-label">{"// START A CONVERSATION"}</span>
          <h2 id="tech-contact-heading">Plan Your Next Transformation with Us.</h2>
          <p>
            Tell us what you want to achieve. A senior technical architect will respond within two business days.
          </p>

          <div className="tech-contact-items">
            <div className="tech-contact-item">
              <strong>Sales & Strategy</strong>
              <a href="mailto:sales@zenovixtechnologies.com">sales@zenovixtechnologies.com</a>
            </div>

            <div className="tech-contact-item">
              <strong>Support Operations</strong>
              <a href="mailto:support@zenovixtechnologies.com">support@zenovixtechnologies.com</a>
            </div>

            <div className="tech-contact-item">
              <strong>Direct Desk</strong>
              <a href="tel:+919136224840">+91 91362 24840</a>
            </div>

            <div className="tech-contact-item">
              <strong>Location</strong>
              <span>Mumbai, Maharashtra, India</span>
            </div>
          </div>
        </div>

        <div className="tech-enquiry-card">
          <h3>Request Technical Discovery</h3>
          <p>Connect directly with our SAP and Cloud architects for a structured discovery session.</p>

          <div className="tech-enquiry-actions">
            <RegisterButton
              serviceInterest="Technology Services"
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              <span>Submit Technology Brief</span>
              <span className="arrow" aria-hidden="true">→</span>
            </RegisterButton>

            <div className="route-back-strip">
              <span>Looking for live workshops?</span>
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
