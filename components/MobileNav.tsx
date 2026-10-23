"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import TrackingLink from "./TrackingLink";
import RegisterButton from "./RegisterButton";
import { SERVICES_CONFIG, getDefaultServiceInterest } from "@/lib/services-config";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname() || "/";

  const closeMenu = useCallback((restoreFocus = false) => {
    setIsOpen(false);
    document.body.classList.remove("lock");
    if (restoreFocus) {
      triggerRef.current?.focus();
    }
  }, []);

  // Manage body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("lock");
    } else {
      document.body.classList.remove("lock");
    }
    return () => {
      document.body.classList.remove("lock");
    };
  }, [isOpen]);

  // Handle Escape key & Focus Trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu(true);
        return;
      }

      if (e.key === "Tab" && menuRef.current) {
        const focusables = menuRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const firstEl = focusables[0];
        const lastEl = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl?.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl?.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeMenu]);

  // Close on resize if viewport expands to desktop
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(min-width: 900px)");
    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        closeMenu(false);
      }
    };

    if (mediaQuery.matches) {
      closeMenu(false);
    }

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleMediaChange);
      return () => mediaQuery.removeEventListener("change", handleMediaChange);
    } else {
      mediaQuery.addListener(handleMediaChange);
      return () => mediaQuery.removeListener(handleMediaChange);
    }
  }, [closeMenu]);

  // Close on navigation
  useEffect(() => {
    closeMenu(false);
  }, [pathname, closeMenu]);

  const activeService = getDefaultServiceInterest(pathname);

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
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M4 4L16 16M4 16L16 4"
              stroke="var(--cyan)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg
            width="22"
            height="18"
            viewBox="0 0 22 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M2 3H20M2 9H20M2 15H20"
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
          className="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Site Navigation"
        >
          <div className="mobile-drawer-header">
            <span className="mono-label">{"// SYSTEM NAVIGATION"}</span>
            <button
              type="button"
              className="drawer-close-btn"
              onClick={() => closeMenu(true)}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <nav className="mobile-nav-links" aria-label="Mobile Navigation">
            <TrackingLink
              href="/"
              className={`mobile-nav-link ${pathname === "/" ? "active" : ""}`}
              onClick={() => closeMenu(false)}
            >
              <span className="nav-num">00</span>
              <span>Home Overview</span>
            </TrackingLink>

            <div className="mobile-nav-group">
              <span className="mobile-group-title">ENTERPRISE SERVICES</span>

              {/* Service 1: Learning Hub */}
              <TrackingLink
                href={SERVICES_CONFIG.learning.href}
                className={`mobile-service-item ${pathname.startsWith("/learning") ? "active" : ""}`}
                onClick={() => closeMenu(false)}
              >
                <div className="item-meta">
                  <span className="item-badge">WORKSHOP</span>
                  <span className="nav-num">01</span>
                </div>
                <strong>{SERVICES_CONFIG.learning.name}</strong>
                <p>{SERVICES_CONFIG.learning.shortDescription}</p>
              </TrackingLink>

              {/* Service 2: Talent Deployment */}
              <TrackingLink
                href={SERVICES_CONFIG.talent.href}
                className={`mobile-service-item ${pathname.startsWith("/talent") ? "active" : ""}`}
                onClick={() => closeMenu(false)}
              >
                <div className="item-meta">
                  <span className="item-badge">SPECIALISTS</span>
                  <span className="nav-num">02</span>
                </div>
                <strong>{SERVICES_CONFIG.talent.name}</strong>
                <p>{SERVICES_CONFIG.talent.shortDescription}</p>
              </TrackingLink>

              {/* Service 3: Technology Services */}
              <TrackingLink
                href={SERVICES_CONFIG.technologyServices.href}
                className={`mobile-service-item ${pathname.startsWith("/technology-services") ? "active" : ""}`}
                onClick={() => closeMenu(false)}
              >
                <div className="item-meta">
                  <span className="item-badge">SOLUTIONS</span>
                  <span className="nav-num">03</span>
                </div>
                <strong>{SERVICES_CONFIG.technologyServices.name}</strong>
                <p>{SERVICES_CONFIG.technologyServices.shortDescription}</p>
              </TrackingLink>
            </div>
          </nav>

          <div className="mobile-drawer-footer">
            <RegisterButton
              serviceInterest={activeService}
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              {pathname.startsWith("/learning") ? "Reserve Free Seat" : "Connect with Specialists"}
            </RegisterButton>

            <p className="mobile-contact-line">
              Direct Enquiry: <a href="mailto:sales@zenovixtechnologies.com">sales@zenovixtechnologies.com</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
