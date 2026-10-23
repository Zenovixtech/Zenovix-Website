"use client";

import React, { createContext, useContext, useState, useRef, ReactNode, useCallback } from "react";
import { usePathname } from "next/navigation";
import RegistrationModal from "./RegistrationModal";
import ServiceEnquiryModal, { EnquiryModalMode, CommonEnquiryFields } from "./ServiceEnquiryModal";

export type ServiceInterest = "Learning Hub" | "Talent Deployment" | "Technology Services";

interface ModalContextType {
  openLearningModal: (
    ref?: React.RefObject<HTMLButtonElement | null>,
    prefilled?: { fullName?: string; email?: string; phone?: string }
  ) => void;
  openEnquiryModal: (
    mode?: EnquiryModalMode,
    ref?: React.RefObject<HTMLButtonElement | null>,
    initialTopic?: string,
    prefilledFields?: Partial<CommonEnquiryFields>
  ) => void;
  openModal: (
    ref?: React.RefObject<HTMLButtonElement | null>,
    service?: ServiceInterest | "SELECT",
    initialTopic?: string
  ) => void;
  closeAllModals: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Learning Hub Modal State
  const [isLearningOpen, setIsLearningOpen] = useState(false);
  const [learningPrefilled, setLearningPrefilled] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
  }>({});

  // Business Enquiry Modal State
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryMode, setEnquiryMode] = useState<EnquiryModalMode>("select");
  const [enquiryTopic, setEnquiryTopic] = useState("");
  const [enquiryCommonFields, setEnquiryCommonFields] = useState<Partial<CommonEnquiryFields>>({});

  // Active trigger element reference for accessible focus restoration
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const closeAllModals = useCallback(() => {
    setIsLearningOpen(false);
    setIsEnquiryOpen(false);
  }, []);

  const openLearningModal = useCallback(
    (
      ref?: React.RefObject<HTMLButtonElement | null>,
      prefilled?: { fullName?: string; email?: string; phone?: string }
    ) => {
      if (ref?.current) triggerRef.current = ref.current;
      if (prefilled) setLearningPrefilled(prefilled);
      setIsEnquiryOpen(false);
      setIsLearningOpen(true);
    },
    []
  );

  const openEnquiryModal = useCallback(
    (
      mode: EnquiryModalMode = "select",
      ref?: React.RefObject<HTMLButtonElement | null>,
      initialTopic = "",
      prefilledFields?: Partial<CommonEnquiryFields>
    ) => {
      if (ref?.current) triggerRef.current = ref.current;
      setEnquiryMode(mode);
      setEnquiryTopic(initialTopic);
      if (prefilledFields) setEnquiryCommonFields(prefilledFields);
      setIsLearningOpen(false);
      setIsEnquiryOpen(true);
    },
    []
  );

  const openModal = useCallback(
    (
      ref?: React.RefObject<HTMLButtonElement | null>,
      service?: ServiceInterest | "SELECT",
      initialTopic?: string
    ) => {
      if (ref?.current) {
        triggerRef.current = ref.current;
      }

      // Explicit service mapping
      if (service === "Learning Hub") {
        openLearningModal(ref);
        return;
      }

      if (service === "Talent Deployment") {
        openEnquiryModal("talent", ref);
        return;
      }

      if (service === "Technology Services") {
        openEnquiryModal("technology", ref, initialTopic);
        return;
      }

      if (service === "SELECT") {
        openEnquiryModal("select", ref);
        return;
      }

      // Route-aware context fallback when no explicit service is provided
      if (pathname?.startsWith("/learning")) {
        openLearningModal(ref);
      } else if (pathname?.startsWith("/talent")) {
        openEnquiryModal("talent", ref);
      } else if (pathname?.startsWith("/technology-services")) {
        openEnquiryModal("technology", ref, initialTopic);
      } else {
        // Corporate homepage default for general CTAs (e.g. Header "Connect")
        openEnquiryModal("select", ref);
      }
    },
    [pathname, openLearningModal, openEnquiryModal]
  );

  // Transition from Enquiry service-selection directly into Learning Hub registration
  const handleSelectLearningHub = useCallback(
    (fields: { fullName: string; email: string; phone?: string }) => {
      setIsEnquiryOpen(false);
      setLearningPrefilled(fields);
      // Small timeout ensures clean backdrop transition
      setTimeout(() => {
        setIsLearningOpen(true);
      }, 50);
    },
    []
  );

  return (
    <ModalContext.Provider
      value={{
        openLearningModal,
        openEnquiryModal,
        openModal,
        closeAllModals,
      }}
    >
      {children}

      {/* Learning Hub Registration Modal */}
      <RegistrationModal
        isOpen={isLearningOpen}
        onClose={() => setIsLearningOpen(false)}
        triggerRef={triggerRef}
        prefilledFields={learningPrefilled}
      />

      {/* Business Service Enquiry Modal (Talent, Technology Services, and Service Selection) */}
      <ServiceEnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        triggerRef={triggerRef}
        initialMode={enquiryMode}
        initialTopic={enquiryTopic}
        initialCommonFields={enquiryCommonFields}
        onSelectLearningHub={handleSelectLearningHub}
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
