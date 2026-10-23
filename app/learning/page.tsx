import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import QuickGrid from "@/components/QuickGrid";
import WhySection from "@/components/WhySection";
import SkillsSection from "@/components/SkillsSection";
import AudienceSection from "@/components/AudienceSection";
import ToolkitSection from "@/components/ToolkitSection";
import OutcomesSection from "@/components/OutcomesSection";
import FaqSection from "@/components/FaqSection";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { ModalProvider } from "@/components/ModalContext";

export const metadata: Metadata = {
  title: "Learning Hub — Master Excel with AI | Zenovix Technologies",
  description:
    "A practical live masterclass to clean data, build executive dashboards, and automate Excel reporting pipelines with AI.",
  alternates: {
    canonical: "/learning",
  },
  openGraph: {
    title: "Learning Hub — Master Excel with AI | Zenovix Technologies",
    description:
      "A practical live workshop to clean data, build dashboards, and automate Excel reporting with AI.",
    url: "/learning",
  },
};

export default function LearningHubPage() {
  return (
    <ModalProvider>
      <ScrollReveal>
        <Header />
        <main id="main-content" className="learning-page">
          <Hero />
          <Ticker />
          <QuickGrid />
          <WhySection />
          <SkillsSection />
          <AudienceSection />
          <ToolkitSection />
          <OutcomesSection />
          <FaqSection />
          <FinalCta />
        </main>
        <Footer />
      </ScrollReveal>
    </ModalProvider>
  );
}
