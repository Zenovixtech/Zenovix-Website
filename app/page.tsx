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
import ScrollReveal from "@/components/ScrollReveal";
import { ModalProvider } from "@/components/ModalContext";

export default function Home() {
  return (
    <ModalProvider>
      <ScrollReveal>
        <Header />
        <main>
          <Hero />
          <Ticker />
          <QuickGrid />
          <WhySection />
          <SkillsSection />
          <AudienceSection />
          <ToolkitSection />
          <MentorSection />
          <OwnerSection />
          <OutcomesSection />
          <FaqSection />
          <FinalCta />
        </main>
        <Footer />
      </ScrollReveal>
    </ModalProvider>
  );
}
