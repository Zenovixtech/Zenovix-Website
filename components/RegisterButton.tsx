"use client";

import { useRef, ReactNode } from "react";
import { useModalContext } from "./ModalContext";

interface RegisterButtonProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function RegisterButton({
  children,
  className = "btn btn-primary js-register",
  style,
}: RegisterButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { openModal } = useModalContext();

  return (
    <button
      ref={buttonRef}
      className={className}
      style={style}
      onClick={() => openModal(buttonRef)}
    >
      {children}
    </button>
  );
}
