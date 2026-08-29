import Image from "next/image";
import RegisterButton from "./RegisterButton";

export default function Header() {
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
            width={180}
            height={44}
            priority
          />
        </a>
        <RegisterButton>Register free</RegisterButton>
      </div>
    </header>
  );
}
