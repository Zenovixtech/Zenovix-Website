import Image from "next/image";
import RegisterButton from "./RegisterButton";

export default function Header() {
  return (
    <header>
      <div className="wrap nav">
        <a
          className="brand-logo-link"
          href="#top"
          aria-label="Zenovix Technologies workshop home"
        >
          <Image
            className="brand-logo"
            src="/images/zenovix-technologies-logo-white.png"
            alt="Zenovix Technologies"
            width={220}
            height={58}
            priority
          />
        </a>
        <RegisterButton>Register free</RegisterButton>
      </div>
    </header>
  );
}
