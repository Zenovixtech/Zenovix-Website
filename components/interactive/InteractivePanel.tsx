"use client";

import React, { useRef, useEffect, ReactNode } from "react";

interface InteractivePanelProps {
  children: ReactNode;
  className?: string;
  role?: string;
  id?: string;
  "aria-labelledby"?: string;
  spotlightColor?: string;
  keyTrigger?: string | number; // triggers subtle perspective entrance when key changes
}

/**
 * InteractivePanel
 * Used on /talent practice panels and /technology-services capability explorer.
 * Features:
 * - Subtle pointer-following spotlight bounded within panel
 * - Background technical grid pattern
 * - Restrained depth on supporting visual elements (badges, kickers, bullets)
 * - Text content remains stable and non-moving
 * - Smooth perspective fade entrance on keyTrigger change
 * - Disabled on touch and prefers-reduced-motion
 */
export default function InteractivePanel({
  children,
  className = "",
  role,
  id,
  "aria-labelledby": ariaLabelledBy,
  spotlightColor = "rgba(56, 189, 248, 0.12)",
  keyTrigger,
}: InteractivePanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (prefersReducedMotion || isTouch) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = panel.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      panel.style.setProperty("--panel-mouse-x", `${x}px`);
      panel.style.setProperty("--panel-mouse-y", `${y}px`);
      panel.style.setProperty("--panel-spotlight-opacity", "1");

      // Subtle parallax offset for background technical grid (-6px to +6px)
      const normX = (x / rect.width) * 2 - 1;
      const normY = (y / rect.height) * 2 - 1;
      panel.style.setProperty("--grid-shift-x", `${(normX * 6).toFixed(1)}px`);
      panel.style.setProperty("--grid-shift-y", `${(normY * 6).toFixed(1)}px`);
    };

    const handlePointerLeave = () => {
      panel.style.setProperty("--panel-spotlight-opacity", "0");
      panel.style.setProperty("--grid-shift-x", "0px");
      panel.style.setProperty("--grid-shift-y", "0px");
    };

    panel.addEventListener("pointermove", handlePointerMove, { passive: true });
    panel.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    return () => {
      panel.removeEventListener("pointermove", handlePointerMove);
      panel.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div
      key={keyTrigger}
      ref={panelRef}
      id={id}
      role={role}
      aria-labelledby={ariaLabelledBy}
      className={`interactive-depth-panel ${keyTrigger !== undefined ? "perspective-panel-entrance" : ""} ${className}`}
      style={
        {
          "--panel-glow": spotlightColor,
        } as React.CSSProperties
      }
    >
      {/* Background technical grid */}
      <div className="panel-tech-grid" aria-hidden="true" />

      {/* Pointer spotlight layer */}
      <div className="panel-spotlight-follower" aria-hidden="true" />

      {/* Foreground content layer */}
      <div className="panel-content-layer">{children}</div>
    </div>
  );
}
