"use client";

import { useRef, ReactNode } from "react";
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

  return (
    <button
      ref={buttonRef}
      id={id}
      className={className}
      style={style}
      onClick={() => openModal(buttonRef, serviceInterest)}
    >
      {children}
    </button>
  );
}
