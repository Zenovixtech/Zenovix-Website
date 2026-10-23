"use client";

import React, { useRef, useEffect, ReactNode } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string; // default cyan/blue
  maxTilt?: number; // max tilt in degrees (default 3.5)
}

/**
 * SpotlightCard
 * Inspired by 21st.dev Spotlight Card and React 3D Components.
 * Features:
 * - Pointer-following radial spotlight and border glow without React state re-rendering
 * - Subtle 3D perspective tilt (3-5 degrees max)
 * - Layered image depth via CSS variables
 * - Zero tilt on scroll, touch, or prefers-reduced-motion
 * - Accessible keyboard focus state without tilt
 */
export default function SpotlightCard({
  children,
  className = "",
  glowColor = "rgba(56, 189, 248, 0.16)",
  maxTilt = 3.5,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Check media queries
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (prefersReducedMotion || isTouch) return;

    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;
    let isInside = false;
    let rafId: number;

    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    const handleScroll = () => {
      isScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const updateTransform = () => {
      if (!card) return;

      // Smooth interpolation back to neutral or target
      const ease = 0.12;
      currentTiltX += (targetTiltX - currentTiltX) * ease;
      currentTiltY += (targetTiltY - currentTiltY) * ease;

      card.style.setProperty("--tilt-x", `${currentTiltX.toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${currentTiltY.toFixed(2)}deg`);

      // Keep RAF running while inside or settling to 0
      if (
        isInside ||
        Math.abs(currentTiltX) > 0.05 ||
        Math.abs(currentTiltY) > 0.05
      ) {
        rafId = requestAnimationFrame(updateTransform);
      } else {
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (isScrolling) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update spotlight coordinates directly on CSS properties
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
      card.style.setProperty("--spotlight-opacity", "1");
      card.style.setProperty("--card-lift", "-4px");

      // Calculate normalized coords (-1 to 1)
      const normX = (x / rect.width) * 2 - 1;
      const normY = (y / rect.height) * 2 - 1;

      // Subtle tilt: rotateX responds to vertical offset, rotateY to horizontal offset
      targetTiltX = -normY * maxTilt;
      targetTiltY = normX * maxTilt;

      if (!isInside) {
        isInside = true;
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(updateTransform);
      }
    };

    const handlePointerLeave = () => {
      isInside = false;
      targetTiltX = 0;
      targetTiltY = 0;
      card.style.setProperty("--spotlight-opacity", "0");
      card.style.setProperty("--card-lift", "0px");
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateTransform);
    };

    card.addEventListener("pointermove", handlePointerMove, { passive: true });
    card.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
      cancelAnimationFrame(rafId);
      card.removeEventListener("pointermove", handlePointerMove);
      card.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [maxTilt]);

  return (
    <div
      ref={cardRef}
      className={`gateway-card spotlight-card-3d ${className}`}
      style={
        {
          "--glow-color": glowColor,
        } as React.CSSProperties
      }
    >
      {/* Spotlight follower overlay */}
      <div className="card-spotlight-layer" aria-hidden="true" />
      {children}
    </div>
  );
}
