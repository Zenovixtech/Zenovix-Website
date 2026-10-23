"use client";

import RegisterButton from "./RegisterButton";
import TrackingLink from "./TrackingLink";

export default function CorporateCtaSection() {
  return (
    <section className="corporate-cta-section" aria-labelledby="corporate-cta-heading">
      <div className="wrap">
        <div className="corporate-cta-card">
          <div className="cta-grid-bg" aria-hidden="true" />
          <div className="cta-content-box">
            <span className="mono-label">{"// 04 GET STARTED"}</span>
            <h2 id="corporate-cta-heading" className="cta-headline">
              Ready to Accelerate Your Enterprise Roadmap?
            </h2>
            <p className="cta-subtext">
              Connect directly with a Zenovix specialist. Whether discussing an urgent SAP brief,
              exploring workforce deployment, or reserving seats in our AI masterclass, we respond with
              actionable plans.
            </p>

            <div className="cta-button-cluster">
              <RegisterButton
                serviceInterest="SELECT"
                className="btn btn-primary"
              >
                <span>Request Enterprise Consultation</span>
                <span className="arrow" aria-hidden="true">→</span>
              </RegisterButton>

              <TrackingLink href="/learning" className="btn btn-secondary">
                <span>Explore Learning Hub</span>
                <span className="arrow" aria-hidden="true">↗</span>
              </TrackingLink>
            </div>

            <div className="cta-proof-strip">
              <div className="proof-point">
                <strong>48 Hours</strong>
                <span>Specialist Shortlist SLA</span>
              </div>
              <div className="proof-point">
                <strong>Direct Desk</strong>
                <span>+91 91362 24840</span>
              </div>
              <div className="proof-point">
                <strong>HQ & Coverage</strong>
                <span>Mumbai, Serving Pan-India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
