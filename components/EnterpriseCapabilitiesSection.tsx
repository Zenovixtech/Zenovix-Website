import TrackingLink from "./TrackingLink";

export default function EnterpriseCapabilitiesSection() {
  const pillars = [
    {
      index: "01",
      title: "SAP Enterprise Systems",
      desc: "Full-lifecycle implementation, cloud migration, and operations management across S/4HANA, FICO, MM, SD, and niche SAP IS-Utilities for energy and water distributors.",
      link: "/technology-services",
      linkText: "View SAP Services",
      tags: ["S/4HANA", "SAP IS-U", "BTP", "SuccessFactors"],
    },
    {
      index: "02",
      title: "Applied AI & Automation",
      desc: "Moving beyond demonstrations into secure, production-grade retrieval architectures, predictive forecasting models, and automated business workflows.",
      link: "/learning",
      linkText: "Explore AI Training",
      tags: ["LLM Workflows", "Computer Vision", "Predictive ML", "Data Pipelines"],
    },
    {
      index: "03",
      title: "Domain-First Talent Deployment",
      desc: "India-native talent network curated by enterprise recruiters who understand system architectures, placing specialists within 48 hours for immediate roadmap traction.",
      link: "/talent",
      linkText: "Deploy Specialists",
      tags: ["IS-U Billing", "AI Engineers", "DevOps Leads", "Managed Teams"],
    },
    {
      index: "04",
      title: "Cloud Governance & SOC Defense",
      desc: "High-security multi-cloud infrastructure, continuous compliance monitoring, identity management, and threat mitigation built to enterprise governance standards.",
      link: "/technology-services",
      linkText: "Explore Cloud Architecture",
      tags: ["Multi-Cloud", "Managed SOC", "Zero Trust", "ISO Protocols"],
    },
  ];

  return (
    <section className="corporate-capabilities-section" aria-labelledby="capabilities-heading">
      <div className="wrap">
        <div className="capabilities-header">
          <div className="header-meta">
            <span className="section-label">{"// 03 CORE PILLARS"}</span>
            <span className="header-status">INFRASTRUCTURE READY</span>
          </div>
          <h2 id="capabilities-heading" className="capabilities-title">
            Built for Operational Complexity and Modern Speed.
          </h2>
          <p className="capabilities-sub">
            Enterprise change requires both deep system stability and modern technological agility.
            Our four pillars work harmoniously to de-risk transformation.
          </p>
        </div>

        <div className="capabilities-grid">
          {pillars.map((pillar) => (
            <div key={pillar.index} className="capability-card">
              <div className="capability-card-top">
                <span className="pillar-num">{pillar.index}</span>
                <div className="pillar-tags">
                  {pillar.tags.map((tag) => (
                    <span key={tag} className="pillar-tag">{tag}</span>
                  ))}
                </div>
              </div>

              <h3 className="pillar-title">{pillar.title}</h3>
              <p className="pillar-desc">{pillar.desc}</p>

              <div className="pillar-footer">
                <TrackingLink href={pillar.link} className="pillar-link">
                  <span>{pillar.linkText}</span>
                  <span className="arrow" aria-hidden="true">→</span>
                </TrackingLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
