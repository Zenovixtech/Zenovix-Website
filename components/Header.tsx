"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import TrackingLink from "./TrackingLink";
import RegisterButton from "./RegisterButton";
import MobileNav from "./MobileNav";
import { SERVICES_CONFIG, getDefaultServiceInterest } from "@/lib/services-config";

export default function Header() {
  const pathname = usePathname() || "/";
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesTriggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeService = getDefaultServiceInterest(pathname);

  const closeDropdown = useCallback((restoreFocus = false) => {
    setIsServicesOpen(false);
    if (restoreFocus) {
      servicesTriggerRef.current?.focus();
    }
  }, []);

  // Keyboard navigation & click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isServicesOpen) {
        e.preventDefault();
        closeDropdown(true);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        isServicesOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !servicesTriggerRef.current?.contains(e.target as Node)
      ) {
        closeDropdown(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isServicesOpen, closeDropdown]);

  // Close dropdown on route change
  useEffect(() => {
    setIsServicesOpen(false);
  }, [pathname]);

  const isServicesActive =
    pathname.startsWith("/learning") ||
    pathname.startsWith("/talent") ||
    pathname.startsWith("/technology-services");

  return (
    <header className="site-header" role="banner">
      <div className="wrap site-header-inner">
        {/* Brand Logo */}
        <TrackingLink
          className="brand-logo-link"
          href="/"
          aria-label="Zenovix Technologies Home"
        >
          <Image
            className="brand-logo"
            src="/images/zenovix-technologie-logo-white.png"
            alt="Zenovix Technologies"
            width={180}
            height={44}
            priority
          />
        </TrackingLink>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="desktop-nav-list">
            <li>
              <TrackingLink
                href="/"
                className={`desktop-nav-link ${pathname === "/" ? "active" : ""}`}
                aria-current={pathname === "/" ? "page" : undefined}
              >
                Home
              </TrackingLink>
            </li>

            {/* Services Dropdown */}
            <li className="nav-dropdown-item">
              <button
                ref={servicesTriggerRef}
                type="button"
                className={`desktop-nav-link dropdown-trigger ${isServicesActive ? "active-parent" : ""}`}
                aria-haspopup="menu"
                aria-expanded={isServicesOpen}
                aria-controls="services-dropdown"
                onClick={() => setIsServicesOpen((prev) => !prev)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown" && !isServicesOpen) {
                    e.preventDefault();
                    setIsServicesOpen(true);
                  }
                }}
              >
                Services
                <svg
                  className={`chevron ${isServicesOpen ? "rotate" : ""}`}
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M2.5 4.5L6 8L9.5 4.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {isServicesOpen && (
                <div
                  id="services-dropdown"
                  ref={dropdownRef}
                  className="services-mega-menu"
                  role="menu"
                  aria-label="Services Menu"
                >
                  <div className="mega-menu-inner">
                    <div className="mega-menu-header">
                      <span className="mono-label">{"// ZENOVIX CAPABILITY MATRIX"}</span>
                      <p>Select an enterprise capability to explore specifications</p>
                    </div>

                    <div className="mega-menu-grid">
                      {/* Learning Hub */}
                      <TrackingLink
                        href={SERVICES_CONFIG.learning.href}
                        className={`mega-card ${pathname.startsWith("/learning") ? "active" : ""}`}
                        role="menuitem"
                        onClick={() => closeDropdown(false)}
                      >
                        <div className="card-top">
                          <span className="badge">LIVE TRAINING</span>
                          <span className="card-kicker">01</span>
                        </div>
                        <h3>{SERVICES_CONFIG.learning.name}</h3>
                        <p>{SERVICES_CONFIG.learning.shortDescription}</p>
                        <span className="card-arrow">Explore workshop →</span>
                      </TrackingLink>

                      {/* Talent Deployment */}
                      <TrackingLink
                        href={SERVICES_CONFIG.talent.href}
                        className={`mega-card ${pathname.startsWith("/talent") ? "active" : ""}`}
                        role="menuitem"
                        onClick={() => closeDropdown(false)}
                      >
                        <div className="card-top">
                          <span className="badge">SPECIALISTS</span>
                          <span className="card-kicker">02</span>
                        </div>
                        <h3>{SERVICES_CONFIG.talent.name}</h3>
                        <p>{SERVICES_CONFIG.talent.shortDescription}</p>
                        <span className="card-arrow">Deploy talent →</span>
                      </TrackingLink>

                      {/* Technology Services */}
                      <TrackingLink
                        href={SERVICES_CONFIG.technologyServices.href}
                        className={`mega-card ${pathname.startsWith("/technology-services") ? "active" : ""}`}
                        role="menuitem"
                        onClick={() => closeDropdown(false)}
                      >
                        <div className="card-top">
                          <span className="badge">ENTERPRISE SOLUTIONS</span>
                          <span className="card-kicker">03</span>
                        </div>
                        <h3>{SERVICES_CONFIG.technologyServices.name}</h3>
                        <p>{SERVICES_CONFIG.technologyServices.shortDescription}</p>
                        <span className="card-arrow">View capabilities →</span>
                      </TrackingLink>
                    </div>
                  </div>
                </div>
              )}
            </li>

            {/* Direct Quick Links */}
            <li>
              <TrackingLink
                href="/learning"
                className={`desktop-nav-link ${pathname.startsWith("/learning") ? "active" : ""}`}
              >
                Learning Hub
              </TrackingLink>
            </li>
            <li>
              <TrackingLink
                href="/talent"
                className={`desktop-nav-link ${pathname.startsWith("/talent") ? "active" : ""}`}
              >
                Talent
              </TrackingLink>
            </li>
            <li>
              <TrackingLink
                href="/technology-services"
                className={`desktop-nav-link ${pathname.startsWith("/technology-services") ? "active" : ""}`}
              >
                Tech Services
              </TrackingLink>
            </li>
          </ul>
        </nav>

        {/* Action Controls */}
        <div className="header-actions">
          <RegisterButton
            serviceInterest={activeService}
            className="btn btn-primary js-register header-cta-desktop"
          >
            {pathname.startsWith("/learning") ? "Reserve free seat" : "Get in Touch"}
          </RegisterButton>

          <RegisterButton
            serviceInterest={activeService}
            className="btn btn-primary js-register header-cta-mobile btn-compact"
          >
            {pathname.startsWith("/learning") ? "Register" : "Connect"}
          </RegisterButton>

          {/* Accessible Mobile Nav Drawer */}
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
