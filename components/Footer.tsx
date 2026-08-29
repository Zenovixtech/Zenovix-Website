import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      <div className="wrap footer-inner">
        <a className="brand-logo-link" href="#top" aria-label="Back to top">
          <Image
            className="brand-logo"
            src="/images/zenovix-technologies-final-logo.png"
            alt="Zenovix Technologies"
            width={220}
            height={58}
          />
        </a>
        <p>AI + Excel live workshop</p>
      </div>
    </footer>
  );
}
