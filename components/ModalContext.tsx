"use client";

import React, { createContext, useContext, useState, useRef, ReactNode } from "react";
import RegistrationModal from "./RegistrationModal";

interface ModalContextType {
  isOpen: boolean;
  openModal: (ref?: React.RefObject<HTMLButtonElement | null>) => void;
  closeModal: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const openModal = (ref?: React.RefObject<HTMLButtonElement | null>) => {
    if (ref?.current) {
      triggerRef.current = ref.current;
    }
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal, triggerRef }}>
      {children}
      <RegistrationModal
        isOpen={isOpen}
        onClose={closeModal}
        triggerRef={triggerRef}
      />
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
}
