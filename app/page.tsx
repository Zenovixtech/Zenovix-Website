"use client";

import { useState, useRef } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import QuickGrid from "@/components/QuickGrid";
import WhySection from "@/components/WhySection";
import SkillsSection from "@/components/SkillsSection";
import AudienceSection from "@/components/AudienceSection";
import ToolkitSection from "@/components/ToolkitSection";
import MentorSection from "@/components/MentorSection";
import OwnerSection from "@/components/OwnerSection";
import OutcomesSection from "@/components/OutcomesSection";
import FaqSection from "@/components/FaqSection";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import RegistrationModal from "@/components/RegistrationModal";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const handleOpenModal = (btnRef?: React.RefObject<HTMLButtonElement | null>) => {
    if (btnRef?.current) {
      triggerRef.current = btnRef.current;
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ScrollReveal>
      <Header onRegisterClick={handleOpenModal} />
      <main>
        <Hero onRegisterClick={handleOpenModal} />
        <Ticker />
        <QuickGrid />
        <WhySection onRegisterClick={handleOpenModal} />
        <SkillsSection />
        <AudienceSection />
        <ToolkitSection onRegisterClick={handleOpenModal} />
        <MentorSection />
        <OwnerSection />
        <OutcomesSection />
        <FaqSection />
        <FinalCta onRegisterClick={handleOpenModal} />
      </main>
      <Footer />
      <RegistrationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        triggerRef={triggerRef}
      />
    </ScrollReveal>
  );
}
