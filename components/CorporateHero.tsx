"use client";

import Image from "next/image";
import RegisterButton from "./RegisterButton";
import InteractiveNetworkHero from "./InteractiveNetworkHero";

export default function CorporateHero() {
  return (
    <section className="corporate-hero-section" aria-labelledby="corporate-hero-heading">
      {/* Dynamic network background */}
      <InteractiveNetworkHero />

      {/* Grid overlay decorations */}
      <div className="hero-grid-lines" aria-hidden="true">
        <div className="grid-line horizontal top"></div>
        <div className="grid-line horizontal bottom"></div>
        <div className="grid-line vertical left"></div>
        <div className="grid-line vertical right"></div>
      </div>

      <div className="wrap corporate-hero-inner">
        {/* Left Column: Asymmetric Editorial Typography */}
        <div className="hero-editorial-col">
          <div className="hero-status-strip">
            <span className="hero-mono-chip">{"// 01 ENTERPRISE ARCHITECTURE"}</span>
            <span className="hero-pill-status">
              <span className="dot pulse"></span>
              DEPLOYED ACROSS INDIA
            </span>
          </div>

          <h1 id="corporate-hero-heading" className="hero-main-title">
            Architecting <span className="gradient-text">Enterprise Scale</span> with Precision.
          </h1>

          <p className="hero-lead-text">
            Zenovix Technologies empowers enterprises across India with mission-critical SAP S/4HANA systems, secure multi-cloud architectures, specialized engineering talent, and AI analytics upskilling.
          </p>

          <div className="hero-action-group">
            <a href="#services" className="btn btn-primary">
              <span>Explore Services</span>
              <span className="btn-icon" aria-hidden="true">↓</span>
            </a>

            <RegisterButton
              serviceInterest="Learning Hub"
              className="btn btn-secondary"
            >
              <span>Join Learning Hub</span>
              <span className="btn-icon" aria-hidden="true">→</span>
            </RegisterButton>
          </div>

          {/* Technical Specs Strip */}
          <div className="hero-specs-row reveal">
            <div className="spec-card">
              <span className="spec-label">PRACTICE DOMAINS</span>
              <strong className="spec-value">SAP · AI · CLOUD</strong>
            </div>
            <div className="spec-card">
              <span className="spec-label">DEPLOYMENT VELOCITY</span>
              <strong className="spec-value">&lt; 48-HR SHORTLIST</strong>
            </div>
            <div className="spec-card">
              <span className="spec-label">OPERATIONS DESK</span>
              <strong className="spec-value">MUMBAI, INDIA</strong>
            </div>
          </div>
        </div>

        {/* Right Column: Layered Asymmetric Technical Panel */}
        <div className="hero-panel-col reveal reveal-stagger-2">
          <div className="hero-panel-frame">
            <div className="panel-header-bar">
              <div className="terminal-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="terminal-title">{"ZENOVIX // ENTERPRISE_NEXUS.SYS"}</span>
              <span className="terminal-live">ACTIVE</span>
            </div>

            <div className="panel-media-box">
              <Image
                src="/images/zenovix-enterprise-hub.png"
                alt="Zenovix Technologies Enterprise Operations Hub"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 540px"
                className="panel-image"
              />
              <div className="panel-overlay-gradient"></div>

              {/* Floating Technical Overlay Chips */}
              <div className="panel-hud-chip top-left">
                <span className="hud-label">SAP S/4HANA & IS-U</span>
                <span className="hud-val">Enterprise Grade</span>
              </div>

              <div className="panel-hud-chip bottom-right">
                <span className="hud-label">TALENT READINESS</span>
                <span className="hud-val">Pre-Vetted Specialists</span>
              </div>
            </div>

            <div className="panel-footer-stats">
              <div className="stat-chunk">
                <span className="chunk-num">3</span>
                <span className="chunk-desc">Integrated Service Portals</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-chunk">
                <span className="chunk-num">100%</span>
                <span className="chunk-desc">Verified Client Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
