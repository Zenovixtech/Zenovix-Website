"use client";

import { useRef, useEffect, ReactNode } from "react";
import { useModalContext } from "./ModalContext";
import { ServiceInterest } from "@/server/models/User";

interface RegisterButtonProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  serviceInterest?: ServiceInterest | "SELECT";
  id?: string;
}

export default function RegisterButton({
  children,
  className = "btn btn-primary js-register",
  style,
  serviceInterest,
  id,
}: RegisterButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { openModal } = useModalContext();

  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;

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

      const moveX = Math.max(-1, Math.min(1, normX)) * 3.5;
      const moveY = Math.max(-1, Math.min(1, normY)) * 3.5;

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
  }, []);

  return (
    <button
      ref={buttonRef}
      id={id}
      className={`btn-magnetic ${className}`}
      style={style}
      onClick={() => openModal(buttonRef, serviceInterest)}
    >
      <span className="btn-content-inner">{children}</span>
    </button>
  );
}
