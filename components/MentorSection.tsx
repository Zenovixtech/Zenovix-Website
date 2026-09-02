import Image from "next/image";

export default function MentorSection() {
  return (
    <section className="section" id="mentor">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="kicker">Mentor profile</span>
          <h2>Learn from a global technology transformation leader</h2>
          <p>
            Strategic guidance shaped by enterprise transformation, emerging technology, and executive leadership across four global regions.
          </p>
        </div>
        <article className="mentor-card reveal">
          <Image
            className="mentor-photo"
            src="/images/devesh-dubey.png"
            alt="Devesh Dubey, Technology Leadership and Digital Transformation Mentor"
            width={190}
            height={230}
          />
          <div>
            <h3>Devesh Dubey</h3>
            <div className="role">Technology Leadership &amp; Digital Transformation Mentor</div>
            <div className="mentor-facts">
              <span>28+ years of experience</span>
              <span>India, Middle East, Europe &amp; USA</span>
              <span>US$50M+ transformation portfolios</span>
            </div>
            <p>
              Devesh has worked with leading organizations including Deloitte, Accenture, IBM, TCS, Nakilat, Qatar Shipyard Technology Solutions, MDSap Tech LLC, Saudi Intelligent Solution, and Sapcle Technologies. He mentors CXOs, founders, technology leaders, and delivery teams on digital strategy, enterprise transformation, innovation, and scalable growth.
            </p>
          </div>
        </article>
        <div className="mentor-highlights reveal">
          <article className="mentor-highlight">
            <h3>Digital &amp; SAP Transformation</h3>
            <p>
              Enterprise modernization and SAP expertise spanning S/4HANA, IS-U, BTP, CRM, BI, Fiori, C4C, Signavio, SAC Predictive Analytics, and Clean Core strategies.
            </p>
          </article>
          <article className="mentor-highlight">
            <h3>AI, Automation &amp; Emerging Technology</h3>
            <p>
              Hands-on guidance in Generative AI, Agentic AI, machine learning, RPA, robotics, AI agents, SAP Joule AI, TensorFlow, Keras, AR/VR, and intelligent process automation.
            </p>
          </article>
          <article className="mentor-highlight">
            <h3>Cloud, Architecture &amp; Innovation</h3>
            <p>
              Strategic advice on cloud adoption, enterprise integration, scalable digital platforms, PoCs, OCR solutions, analytics platforms, and enterprise AI roadmaps.
            </p>
          </article>
          <article className="mentor-highlight">
            <h3>Program &amp; PMO Governance</h3>
            <p>
              Leadership of multi-million-dollar transformation portfolios exceeding US$50 million, supported by strong governance and delivery excellence frameworks.
            </p>
          </article>
          <article className="mentor-highlight">
            <h3>Cybersecurity, Risk &amp; Compliance</h3>
            <p>
              Mentorship on governance models, security frameworks, technology policies, incident response, and enterprise risk-management practices.
            </p>
          </article>
          <article className="mentor-highlight">
            <h3>Business Growth &amp; Executive Mentorship</h3>
            <p>
              A record of improving operational efficiency by up to 40%, reducing technology costs by 25%, and guiding leaders through technology-led organizational change.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
