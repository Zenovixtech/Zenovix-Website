import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { ModalProvider } from "@/components/ModalContext";
import {
  TalentHero,
  TalentLogoBand,
  TalentSpecialisms,
  TalentDeliveryProcess,
  TalentIndustries,
  TalentFaq,
  TalentEnquiryCta,
} from "@/components/TalentSections";

export const metadata: Metadata = {
  title: "Talent Deployment — Specialized SAP, AI & Cloud Workforce | Zenovix Technologies",
  description:
    "We place specialized SAP IS-U, S/4HANA, AI, data, and enterprise technology professionals with companies running critical infrastructure across India.",
  alternates: {
    canonical: "/talent",
  },
  openGraph: {
    title: "Talent Deployment — Specialized SAP, AI & Cloud Workforce | Zenovix Technologies",
    description:
      "Enterprise manpower solutions for India. Specialists deployed in SAP IS-U, AI, data engineering, and cloud platforms.",
    url: "/talent",
  },
};

export default function TalentDeploymentPage() {
  return (
    <ModalProvider>
      <ScrollReveal>
        <Header />
        <main id="main-content">
          <TalentHero />
          <TalentLogoBand />
          <TalentSpecialisms />
          <TalentDeliveryProcess />
          <TalentIndustries />
          <TalentFaq />
          <TalentEnquiryCta />
        </main>
        <Footer />
      </ScrollReveal>
    </ModalProvider>
  );
}
