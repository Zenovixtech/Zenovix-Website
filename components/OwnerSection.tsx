import Image from "next/image";

export default function OwnerSection() {
  return (
    <section className="section owner-section">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="kicker">Company owner</span>
          <h2>Legal leadership grounded in experience and integrity</h2>
          <p>
            Strategic legal guidance supporting compliant operations, protected business interests, and sustainable organizational growth.
          </p>
        </div>
        <article className="mentor-card reveal">
          <Image
            className="mentor-photo"
            src="/images/meenakshi-dubey.png"
            alt="Meenakshi Dubey, Company Owner and Legal Professional"
            width={190}
            height={230}
          />
          <div>
            <h3>Meenakshi Dubey</h3>
            <div className="role">Company Owner &amp; Legal Professional</div>
            <div className="mentor-facts">
              <span>20+ years of legal experience</span>
              <span>LL.B &amp; B.Ed, Mumbai University</span>
              <span>Corporate, litigation &amp; compliance</span>
            </div>
            <p>
              A seasoned advocate and former Legal Manager with more than 20 years of experience across legal and corporate environments. Meenakshi brings leadership experience from the hospitality, advertising, and insurance sectors, combining ethical business practice with practical legal strategy, regulatory excellence, and risk-aware decision-making.
            </p>
          </div>
        </article>
        <div className="mentor-highlights reveal">
          <article className="mentor-highlight">
            <h3>Litigation &amp; Dispute Resolution</h3>
            <p>
              Management of civil, criminal, labour, consumer, insurance, and property matters, supported by strong stakeholder coordination and negotiation.
            </p>
          </article>
          <article className="mentor-highlight">
            <h3>Contracts &amp; Corporate Documentation</h3>
            <p>
              Expertise in drafting, reviewing, and negotiating contracts, MOUs, agreements, legal notices, and essential corporate documentation.
            </p>
          </article>
          <article className="mentor-highlight">
            <h3>Governance, Compliance &amp; Risk</h3>
            <p>
              Strategic legal advisory across corporate governance, compliance management, risk mitigation, regulatory matters, and organizational policy.
            </p>
          </article>
          <article className="mentor-highlight">
            <h3>Insurance &amp; Regulatory Proceedings</h3>
            <p>
              Hands-on experience with IRDA complaints, Ombudsman matters, consumer grievances, regulatory proceedings, and insurance-sector disputes.
            </p>
          </article>
          <article className="mentor-highlight">
            <h3>IPR, Labour &amp; Property Law</h3>
            <p>
              Specialized knowledge of intellectual property rights, labour laws, property transactions, legal due diligence, and contract law.
            </p>
          </article>
          <article className="mentor-highlight">
            <h3>Strategic Legal Leadership</h3>
            <p>
              A proven ability to resolve disputes, manage stakeholder relationships, protect organizational interests, and guide sustainable business growth.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
