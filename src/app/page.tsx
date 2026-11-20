import { Hero } from "@/components/sections/Hero";
import { HomeCatalogSections } from "@/components/sections/HomeCatalogSections";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { CTABanner } from "@/components/sections/CTABanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeCatalogSections />
      <CTABanner
        title="Encuentra lo que necesitas"
        subtitle="Explora nuestro catálogo completo de accesorios para motos"
        buttonText="Ver todos los productos"
        buttonHref="/productos"
      />
      <Testimonials />
      <FAQ />
      <AboutSection />
      <ContactSection />
    </>
  );
}
