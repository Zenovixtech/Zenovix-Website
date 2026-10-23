import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { ModalProvider } from "@/components/ModalContext";
import {
  TechnologyServicesHero,
  TechnologyServicesExplorer,
  TechnologyServicesWhyZenovix,
  TechnologyServicesContact,
} from "@/components/TechnologyServicesSections";

export const metadata: Metadata = {
  title: "Technology Services — SAP S/4HANA, AI, Cloud & Cybersecurity | Zenovix Technologies",
  description:
    "Zenovix Technologies delivers SAP S/4HANA, AI, cloud architecture, and cybersecurity services from Mumbai, India.",
  alternates: {
    canonical: "/technology-services",
  },
  openGraph: {
    title: "Technology Services — SAP S/4HANA, AI, Cloud & Cybersecurity | Zenovix Technologies",
    description:
      "Enterprise systems transformation, SAP S/4HANA, AI agent platforms, and managed cybersecurity from Mumbai, India.",
    url: "/technology-services",
  },
};

export default function TechnologyServicesPage() {
  return (
    <ModalProvider>
      <ScrollReveal>
        <Header />
        <main id="main-content">
          <TechnologyServicesHero />
          <TechnologyServicesExplorer />
          <TechnologyServicesWhyZenovix />
          <TechnologyServicesContact />
        </main>
        <Footer />
      </ScrollReveal>
    </ModalProvider>
  );
}
