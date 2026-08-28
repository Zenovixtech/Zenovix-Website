import Image from "next/image";

interface ToolkitSectionProps {
  onRegisterClick: (ref?: React.RefObject<HTMLButtonElement | null>) => void;
}

export default function ToolkitSection({ onRegisterClick }: ToolkitSectionProps) {
  return (
    <section className="section toolkit">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="kicker">Included toolkit</span>
          <h2>Free registration includes this toolkit</h2>
          <p>Practical resources designed to keep working after the live session ends.</p>
        </div>
        <div className="tool-grid">
          <article className="tool-card reveal">
            <Image
              src="/images/dashboard.jpg"
              alt="Analytics dashboard displayed on a laptop"
              width={560}
              height={315}
            />
            <div className="tool-body">
              <small>Bonus 1</small>
              <b>Included free</b>
              <h3>Excel Starter Template Pack</h3>
            </div>
          </article>
          <article className="tool-card reveal">
            <Image
              src="/images/laptop.jpg"
              alt="Focused laptop workspace for AI prompt practice"
              width={560}
              height={315}
            />
            <div className="tool-body">
              <small>Bonus 2</small>
              <b>Included free</b>
              <h3>Prompt Library for Excel Workflows</h3>
            </div>
          </article>
          <article className="tool-card reveal">
            <Image
              src="/images/team.jpg"
              alt="Team collaborating around business data"
              width={560}
              height={315}
            />
            <div className="tool-body">
              <small>Bonus 3</small>
              <b>Included free</b>
              <h3>Dashboard Layout Kit</h3>
            </div>
          </article>
          <article className="tool-card reveal">
            <Image
              src="/images/workshop.jpg"
              alt="Professionals learning together in a workshop"
              width={560}
              height={315}
            />
            <div className="tool-body">
              <small>Bonus 4</small>
              <b>Included free</b>
              <h3>Keyboard Shortcuts Cheat Sheet</h3>
            </div>
          </article>
        </div>
        <div className="center-cta">
          <button
            className="btn btn-primary js-register"
            onClick={(e) => onRegisterClick({ current: e.currentTarget })}
          >
            Register free — save your seat
          </button>
          <p style={{ color: "rgba(255, 255, 255, 0.55)" }}>
            Free · Live cohort · 80 seats · Live Online
          </p>
        </div>
      </div>
    </section>
  );
}
