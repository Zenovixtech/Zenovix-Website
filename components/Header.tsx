import Image from "next/image";

interface HeaderProps {
  onRegisterClick: (ref?: React.RefObject<HTMLButtonElement | null>) => void;
}

export default function Header({ onRegisterClick }: HeaderProps) {
  return (
    <header>
      <div className="wrap nav">
        <a
          className="brand-logo-link"
          href="#top"
          aria-label="Zenovix Technologie workshop home"
        >
          <Image
            className="brand-logo"
            src="/images/zenovix-technologie-logo-white.png"
            alt="Zenovix Technologie"
            width={220}
            height={58}
            priority
          />
        </a>
        <button
          className="btn btn-primary js-register"
          onClick={(e) => onRegisterClick({ current: e.currentTarget })}
        >
          Register free
        </button>
      </div>
    </header>
  );
}
