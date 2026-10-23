import type { Metadata } from "next";
import Header from "@/components/Header";
import CorporateHero from "@/components/CorporateHero";
import ServiceGatewayCards from "@/components/ServiceGatewayCards";
import EnterpriseCapabilitiesSection from "@/components/EnterpriseCapabilitiesSection";
import CorporateCtaSection from "@/components/CorporateCtaSection";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { ModalProvider } from "@/components/ModalContext";

export const metadata: Metadata = {
  title: "Zenovix Technologies — Enterprise Systems, Specialized Talent & AI Capability",
  description:
    "Zenovix Technologies delivers SAP S/4HANA transformations, cloud architectures, specialized workforce deployment, and AI automation masterclasses across India.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Zenovix Technologies — Enterprise Systems, Specialized Talent & AI Capability",
    description:
      "Enterprise technology systems, SAP S/4HANA migrations, specialized workforce deployment, and AI masterclasses.",
    url: "/",
  },
};

export default function CorporateHomePage() {
  return (
    <ModalProvider>
      <ScrollReveal>
        <Header />
        <main id="main-content">
          <CorporateHero />
          <ServiceGatewayCards />
          <EnterpriseCapabilitiesSection />
          <CorporateCtaSection />
        </main>
        <Footer />
      </ScrollReveal>
    </ModalProvider>
  );
}
