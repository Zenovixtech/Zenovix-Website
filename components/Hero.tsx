"use client";

import Image from "next/image";
import RegisterButton from "./RegisterButton";
import InteractiveNetworkHero from "./InteractiveNetworkHero";

export default function Hero() {
  return (
    <section className="corporate-hero-section learning-hero-section" id="top" aria-labelledby="learning-hero-heading">
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
            <span className="hero-mono-chip">{"// 01 LEARNING HUB"}</span>
            <span className="hero-pill-status">
              <span className="dot pulse"></span>
              LIVE PRACTICAL WORKSHOP
            </span>
          </div>

          <h1 id="learning-hero-heading" className="hero-main-title">
            Stop wrestling with Excel. <span className="gradient-text">Start shipping insights with AI.</span>
          </h1>

          <p className="hero-lead-text">
            A hands-on live workshop showing you how to clean data, build clear dashboards, and automate weekly reports—with AI doing the heavy lifting.
          </p>

          <div className="hero-action-group">
            <RegisterButton
              serviceInterest="Learning Hub"
              className="btn btn-primary"
            >
              <span>Register Free — Save Seat</span>
              <span className="btn-icon" aria-hidden="true">→</span>
            </RegisterButton>

            <a href="#skills" className="btn btn-secondary">
              <span>Explore Curriculum</span>
              <span className="btn-icon" aria-hidden="true">↓</span>
            </a>
          </div>

          {/* Technical Specs Strip */}
          <div className="hero-specs-row">
            <div className="spec-card">
              <span className="spec-label">SESSION FORMAT</span>
              <strong className="spec-value">LIVE ONLINE MASTERCLASS</strong>
            </div>
            <div className="spec-card">
              <span className="spec-label">CORE CURRICULUM</span>
              <strong className="spec-value">6 PRACTICAL SKILLS</strong>
            </div>
            <div className="spec-card">
              <span className="spec-label">ADMISSION &amp; SEATS</span>
              <strong className="spec-value">100% FREE · 80 SEATS MAX</strong>
            </div>
          </div>
        </div>

        {/* Right Column: Layered Asymmetric Technical Panel */}
        <div className="hero-panel-col">
          <div className="hero-panel-frame">
            <div className="panel-header-bar">
              <div className="terminal-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="terminal-title">{"ZENOVIX // LEARNING_HUB // AI_EXCEL.MOD"}</span>
              <span className="terminal-live">LIVE WORKSHOP</span>
            </div>

            <div className="panel-media-box">
              <Image
                src="/images/hero-workspace.jpg"
                alt="Professional analyzing data with AI spreadsheet automation"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 540px"
                className="panel-image"
              />
              <div className="panel-overlay-gradient"></div>

              {/* Floating Technical Overlay Chips */}
              <div className="panel-hud-chip top-left">
                <span className="hud-label">6 CORE SKILLS</span>
                <span className="hud-val">Built for Monday Morning</span>
              </div>

              <div className="panel-hud-chip bottom-right">
                <span className="hud-label">AUTOMATION ENGINE</span>
                <span className="hud-val">AI Co-pilot for Spreadsheets</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
