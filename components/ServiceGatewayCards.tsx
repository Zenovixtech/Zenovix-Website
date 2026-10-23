"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import TrackingLink from "./TrackingLink";
import { SERVICES_CONFIG } from "@/lib/services-config";

export default function ServiceGatewayCards() {
  const cards = [
    {
      def: SERVICES_CONFIG.learning,
      number: "01",
      code: "SRV-LRN",
      image: "/images/dashboard.jpg",
      imageAlt: "Executive analytics dashboards and automated spreadsheet workflows",
      tagline: "Live AI-powered masterclasses for corporate analysts and data leaders.",
      metric: "4.9/5 RATED",
    },
    {
      def: SERVICES_CONFIG.talent,
      number: "02",
      code: "SRV-TLN",
      image: "/images/zenovix-agile-team.jpg",
      imageAlt: "Enterprise SAP and AI engineering specialists collaborating on delivery",
      tagline: "Domain-fluent SAP IS-U, S/4HANA, and AI/ML engineers on demand.",
      metric: "48-HR SHORTLIST",
    },
    {
      def: SERVICES_CONFIG.technologyServices,
      number: "03",
      code: "SRV-TCH",
      image: "/images/zenovix-operations-centre.jpg",
      imageAlt: "High-security cloud operations centre and enterprise systems infrastructure",
      tagline: "End-to-end ERP migration, multi-cloud governance, and custom LLM solutions.",
      metric: "99.9% RELIABILITY",
    },
  ];

  return (
    <section className="gateway-section" id="services" aria-labelledby="gateway-heading">
      <div className="wrap">
        <div className="gateway-header reveal">
          <div className="header-meta">
            <span className="section-label">{"// 02 SERVICE ARCHITECTURE"}</span>
            <span className="header-status">STATUS: ONLINE</span>
          </div>
          <h2 id="gateway-heading" className="gateway-title">
            Three Dedicated Engines for Enterprise Excellence.
          </h2>
          <p className="gateway-sub">
            Whether accelerating internal data literacy, deploying specialized technical teams,
            or architecting enterprise-scale cloud and SAP transformations, Zenovix delivers
            disciplined outcomes.
          </p>
        </div>

        <div className="gateway-grid">
          {cards.map((card, i) => (
            <InteractiveCard key={card.def.id} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface CardProps {
  card: {
    def: typeof SERVICES_CONFIG.learning;
    number: string;
    code: string;
    image: string;
    imageAlt: string;
    tagline: string;
    metric: string;
  };
  index?: number;
}

function InteractiveCard({ card, index = 0 }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, active: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y, active: true });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, active: false }));
  };

  return (
    <div
      ref={cardRef}
      className={`gateway-card reveal reveal-stagger-${(index % 3) + 1}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic spotlight overlay on desktop */}
      {mousePos.active && (
        <div
          className="card-spotlight"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56, 189, 248, 0.12), transparent 70%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Card Visual Header */}
      <div className="card-visual-wrapper">
        <Image
          src={card.image}
          alt={card.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
          className="card-image"
        />
        <div className="card-visual-scrim" />
        <div className="card-visual-badge">
          <span className="pulse-dot"></span>
          <span>{card.metric}</span>
        </div>
        <div className="card-sys-code">{card.code}</div>
      </div>

      {/* Card Content */}
      <div className="card-body">
        <div className="card-meta-row">
          <span className="card-tag">{card.def.tag}</span>
          <span className="card-num">{card.number}</span>
        </div>

        <h3 className="card-title">{card.def.name}</h3>
        <p className="card-tagline">{card.tagline}</p>

        <ul className="card-highlights">
          {card.def.highlights.slice(0, 3).map((item, idx) => (
            <li key={idx}>
              <span className="check-icon">▹</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="card-cta-wrapper">
          <TrackingLink
            href={card.def.href}
            className="gateway-card-btn"
            aria-label={`${card.def.ctaLabel}: ${card.def.name}`}
          >
            <span>{card.def.ctaLabel}</span>
            <span className="arrow-icon" aria-hidden="true">→</span>
          </TrackingLink>
        </div>
      </div>
    </div>
  );
}
