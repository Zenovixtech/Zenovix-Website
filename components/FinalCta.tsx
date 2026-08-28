import RegisterButton from "./RegisterButton";

export default function FinalCta() {
  return (
    <section className="final-cta">
      <div className="wrap">
        <span className="kicker" style={{ color: "var(--cyan)" }}>
          Ready to work smarter?
        </span>
        <h2>Register free — take your seat</h2>
        <p>Free to attend · 80 live seats · Live Online</p>
        <RegisterButton>Register free — save your seat</RegisterButton>
      </div>
    </section>
  );
}
