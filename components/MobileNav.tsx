"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export interface NavLinkItem {
  label: string;
  href: string;
}

export const DEFAULT_NAV_LINKS: NavLinkItem[] = [
  { label: "Workshop", href: "#top" },
  { label: "What You’ll Learn", href: "#skills" },
  { label: "Mentor", href: "#mentor" },
  { label: "FAQ", href: "#faq" },
];

interface MobileNavProps {
  links?: NavLinkItem[];
}

export default function MobileNav({ links = DEFAULT_NAV_LINKS }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback((restoreFocus = false) => {
    setIsOpen(false);
    if (restoreFocus) {
      triggerRef.current?.focus();
    }
  }, []);

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeMenu]);

  // Close menu automatically if viewport expands to desktop
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(min-width: 851px)");
    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        setIsOpen(false);
      }
    };

    if (mediaQuery.matches) {
      setIsOpen(false);
    }

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleMediaChange);
      return () => mediaQuery.removeEventListener("change", handleMediaChange);
    } else {
      // Legacy Safari fallback
      mediaQuery.addListener(handleMediaChange);
      return () => mediaQuery.removeListener(handleMediaChange);
    }
  }, []);

  return (
    <div className="mobile-nav-container">
      <button
        ref={triggerRef}
        type="button"
        className={`mobile-menu-btn ${isOpen ? "is-open" : ""}`}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-menu"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M3 3L13 13M3 13L13 3"
              stroke="var(--cyan)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg
            width="18"
            height="14"
            viewBox="0 0 18 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M1 2H17M1 7H17M1 12H17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>

      {isOpen && (
        <div
          id="mobile-nav-menu"
          ref={menuRef}
          className="mobile-nav-menu"
          role="region"
          aria-label="Mobile Navigation"
        >
          <nav className="mobile-nav-links" aria-label="Mobile Navigation Links">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="mobile-nav-link"
                onClick={() => closeMenu(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
