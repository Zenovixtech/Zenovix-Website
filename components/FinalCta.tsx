interface FinalCtaProps {
  onRegisterClick: (ref?: React.RefObject<HTMLButtonElement | null>) => void;
}

export default function FinalCta({ onRegisterClick }: FinalCtaProps) {
  return (
    <section className="final-cta">
      <div className="wrap">
        <span className="kicker" style={{ color: "var(--cyan)" }}>
          Ready to work smarter?
        </span>
        <h2>Register free — take your seat</h2>
        <p>Free to attend · 80 live seats · Live Online</p>
        <button
          className="btn btn-primary js-register"
          onClick={(e) => onRegisterClick({ current: e.currentTarget })}
        >
          Register free — save your seat
        </button>
      </div>
    </section>
  );
}
