import Image from "next/image";
import TrackingLink from "./TrackingLink";

export default function Footer() {
  return (
    <footer className="site-footer-global" role="contentinfo">
      <div className="wrap">
        <div className="footer-grid">
          {/* Brand info */}
          <div className="footer-col brand-col">
            <TrackingLink href="/" className="brand-logo-link" aria-label="Zenovix Technologies Home">
              <Image
                className="brand-logo"
                src="/images/zenovix-technologie-logo-white.png"
                alt="Zenovix Technologies"
                width={180}
                height={44}
              />
            </TrackingLink>
            <p className="footer-tagline">
              Enterprise technology systems, SAP S/4HANA transformations, specialized workforce deployment, and executive AI automation masterclasses.
            </p>
            <div className="footer-badge">
              <span className="dot"></span>
              <span>Headquartered in Mumbai, India — Delivering Nationwide</span>
            </div>
          </div>

          {/* Service Links */}
          <div className="footer-col">
            <h4>Enterprise Services</h4>
            <ul className="footer-links">
              <li>
                <TrackingLink href="/learning">Learning Hub (AI Workshop)</TrackingLink>
              </li>
              <li>
                <TrackingLink href="/talent">Talent Deployment (SAP & AI)</TrackingLink>
              </li>
              <li>
                <TrackingLink href="/technology-services">Technology Services (SAP & Cloud)</TrackingLink>
              </li>
              <li>
                <TrackingLink href="/technology-services#explorer">Centres of Excellence</TrackingLink>
              </li>
            </ul>
          </div>

          {/* Capabilities */}
          <div className="footer-col">
            <h4>Domain Specialisms</h4>
            <ul className="footer-links">
              <li>
                <TrackingLink href="/talent#expertise">SAP IS-U & Billing</TrackingLink>
              </li>
              <li>
                <TrackingLink href="/talent#ai-practice">Applied AI & MLOps</TrackingLink>
              </li>
              <li>
                <TrackingLink href="/technology-services#cloud">Multi-Cloud & DevOps</TrackingLink>
              </li>
              <li>
                <TrackingLink href="/technology-services#cyber">Enterprise Cybersecurity</TrackingLink>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-col">
            <h4>Direct Desk</h4>
            <p className="footer-contact-item">
              <strong>Sales & Enquiries:</strong>
              <a href="mailto:sales@zenovixtechnologies.com">sales@zenovixtechnologies.com</a>
            </p>
            <p className="footer-contact-item">
              <strong>Support:</strong>
              <a href="mailto:support@zenovixtechnologies.com">support@zenovixtechnologies.com</a>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Zenovix Technologies. All rights reserved.</p>
          <div className="footer-meta-tags">
            <span>Enterprise SLA</span>
            <span>ISO Compliant Protocols</span>
            <span>Domain-First Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
