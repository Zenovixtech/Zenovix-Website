"use client";

import React, { useRef, useEffect, ReactNode } from "react";

interface ServiceCardGridProps {
  children: ReactNode;
  className?: string;
}

/**
 * ServiceCardGrid
 * Tracks container visibility and provides viewport gating
 * so card pointer events and RAF loops do not run when outside the viewport.
 */
export default function ServiceCardGrid({ children, className = "gateway-grid" }: ServiceCardGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          grid.classList.remove("grid-paused");
        } else {
          grid.classList.add("grid-paused");
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(grid);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={gridRef} className={className}>
      {children}
    </div>
  );
}
