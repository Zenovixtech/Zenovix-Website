import RegisterButton from "./RegisterButton";

export default function FinalCta() {
  return (
    <section className="final-cta">
      <div className="wrap">
        <span className="mono-label">{"// SECURE YOUR SEAT"}</span>
        <h2>Register free — take your seat</h2>
        <p>Free to attend · 80 live seats · Live Online</p>
        <RegisterButton serviceInterest="Learning Hub" className="btn btn-primary">
          <span>Register free — save your seat</span>
          <span className="btn-icon" aria-hidden="true">→</span>
        </RegisterButton>
      </div>
    </section>
  );
}
