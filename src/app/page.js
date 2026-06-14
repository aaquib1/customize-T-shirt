import HeroSection from "@/sections/hero-section/HeroSection";
import HowItWorks from "@/sections/how-it-works/HowItWorks";
import TemplatesSection from "@/sections/templates/TemplatesSection";
import Testimonials from "@/sections/testimonials/Testimonials";
import FAQ from "@/sections/faq/FAQ";
import ContactSection from "@/sections/contact/ContactSection";
import PrintingMadeEasy from "@/sections/printing-made-easy/PrintingMadeEasy";
import EasyWaySection from "@/sections/easy-way-section/EasyWaySection";

export const metadata = {
  title: "Custom T-Shirt Design Platform",
  description:
    "Create custom T-shirts online. Design your own apparel with our easy-to-use customization studio.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <EasyWaySection />
      <PrintingMadeEasy />
      <TemplatesSection />
      <Testimonials />
      <FAQ />
      <ContactSection />
    </>
  );
}
