"use client";

import { useEffect, useState, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
}

export default function ScrollReveal({ children, className = "" }: ScrollRevealProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // 1. Scroll progress tracker for dynamic scroll experience
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        const scrolled = (winScroll / height) * 100;
        setScrollProgress(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // 2. Reduced motion check
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }

    // 3. Robust Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const observeAll = () => {
      const elements = document.querySelectorAll(".reveal:not(.in)");
      elements.forEach((el) => observer.observe(el));
    };

    observeAll();

    // 4. MutationObserver for dynamic tab changes or client transitions
    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <div className={className}>
      {/* Top ambient interactive scroll progress line */}
      <div
        className="scroll-progress-line"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
