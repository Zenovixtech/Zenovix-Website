"use client";

import React, { useRef, useEffect, ReactNode, ButtonHTMLAttributes } from "react";

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  maxDistance?: number; // max movement in px (default 3.5px)
}

/**
 * MagneticButton
 * Adds a restrained magnetic translation (max 3.5px) and single shine pass
 * to major call-to-actions.
 * Fully accessible, touch-disabled, and reduced-motion compliant.
 */
export default function MagneticButton({
  children,
  className = "",
  maxDistance = 3.5,
  disabled,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn || disabled) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (prefersReducedMotion || isTouch) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (btn.disabled) return;
      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const normX = (e.clientX - centerX) / (rect.width / 2);
      const normY = (e.clientY - centerY) / (rect.height / 2);

      const moveX = Math.max(-1, Math.min(1, normX)) * maxDistance;
      const moveY = Math.max(-1, Math.min(1, normY)) * maxDistance;

      btn.style.setProperty("--mag-x", `${moveX.toFixed(2)}px`);
      btn.style.setProperty("--mag-y", `${moveY.toFixed(2)}px`);
    };

    const handlePointerLeave = () => {
      btn.style.setProperty("--mag-x", "0px");
      btn.style.setProperty("--mag-y", "0px");
    };

    btn.addEventListener("pointermove", handlePointerMove, { passive: true });
    btn.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    return () => {
      btn.removeEventListener("pointermove", handlePointerMove);
      btn.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [disabled, maxDistance]);

  return (
    <button
      ref={buttonRef}
      disabled={disabled}
      className={`btn-magnetic ${className}`}
      {...props}
    >
      <span className="btn-content-inner">{children}</span>
    </button>
  );
}
