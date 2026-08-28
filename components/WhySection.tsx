import RegisterButton from "./RegisterButton";

export default function WhySection() {
  return (
    <section className="section why">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="kicker">Why join</span>
          <h2>A workshop designed for how work actually happens</h2>
          <p>
            Less theory theatre. More guided practice on the messy spreadsheets you already work with.
          </p>
        </div>
        <div className="check-grid reveal">
          <div className="check">
            <i>✓</i>
            <span>Learn a practical AI + Excel workflow, not disconnected tips</span>
          </div>
          <div className="check">
            <i>✓</i>
            <span>Practice on realistic business datasets during the live session</span>
          </div>
          <div className="check">
            <i>✓</i>
            <span>Leave with templates you can reuse on Monday morning</span>
          </div>
          <div className="check">
            <i>✓</i>
            <span>Ask questions live and get unstuck in real time</span>
          </div>
          <div className="check">
            <i>✓</i>
            <span>Earn a completion certificate you can share</span>
          </div>
          <div className="check">
            <i>✓</i>
            <span>Join professionals who are leveling up with data</span>
          </div>
        </div>
        <div className="center-cta">
          <RegisterButton>Register free — save your seat</RegisterButton>
          <p>Free live workshop · Limited to 80 seats</p>
        </div>
      </div>
    </section>
  );
}
