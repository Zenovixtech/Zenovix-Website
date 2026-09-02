import Image from "next/image";
import RegisterButton from "./RegisterButton";
import MobileNav, { NavLinkItem } from "./MobileNav";

const NAV_LINKS: NavLinkItem[] = [
  { label: "Workshop", href: "#top" },
  { label: "What You’ll Learn", href: "#skills" },
  { label: "Mentor", href: "#mentor" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="wrap site-header-inner">
        {/* Logo */}
        <a
          className="brand-logo-link"
          href="#top"
          aria-label="Zenovix Technologies home"
        >
          <Image
            className="brand-logo"
            src="/images/zenovix-technologie-logo-white.png"
            alt="Zenovix Technologies"
            width={180}
            height={44}
            priority
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="desktop-nav-list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="desktop-nav-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Controls: Desktop and Mobile CTAs + Hamburger */}
        <div className="header-actions">
          <RegisterButton className="btn btn-primary js-register header-cta-desktop">
            Register free
          </RegisterButton>
          <RegisterButton className="btn btn-primary js-register header-cta-mobile btn-compact">
            Register
          </RegisterButton>
          <MobileNav links={NAV_LINKS} />
        </div>
      </div>
    </header>
  );
}
