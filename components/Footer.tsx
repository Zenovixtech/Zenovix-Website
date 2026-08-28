import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      <div className="wrap footer-inner">
        <a className="brand-logo-link" href="#top" aria-label="Back to top">
          <Image
            className="brand-logo"
            src="/images/zenovix-technologie-logo-white.png"
            alt="Zenovix Technologie"
            width={220}
            height={58}
          />
        </a>
        <p>AI + Excel live workshop</p>
      </div>
    </footer>
  );
}
