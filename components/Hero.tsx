import Image from "next/image";
import RegisterButton from "./RegisterButton";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="kicker" style={{ color: "var(--cyan)" }}>
            Live practical workshop
          </span>
          <h1>
            Stop wrestling with Excel.{" "}
            <span>Start shipping insights with AI.</span>
          </h1>
          <p>
            A hands-on live workshop showing you how to clean data, build clear dashboards, and automate weekly reports—with AI doing the heavy lifting.
          </p>
          <div className="event-meta">
            <span>[Workshop Date]</span>
            <i>·</i>
            <span>[Start Time]</span>
            <i>·</i>
            <span>[Duration]</span>
            <i>·</i>
            <span>Live Online</span>
          </div>
          <div className="hero-actions">
            <RegisterButton>Register free — save your seat</RegisterButton>
            <span className="seat-note">100% free · Limited to 80 seats</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-frame">
            <Image
              src="/images/hero-workspace.jpg"
              alt="Professional working with spreadsheet data on a laptop"
              width={600}
              height={337}
              priority
            />
          </div>
          <div className="float-card">
            <b>6 practical skills</b>
            <span>Built to use the very next workday</span>
          </div>
        </div>
      </div>
    </section>
  );
}
