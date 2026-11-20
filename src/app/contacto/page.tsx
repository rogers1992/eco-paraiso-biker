import type { Metadata } from "next";
import ContactoClient from "@/components/contact/ContactoClient";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Escríbenos por WhatsApp o correo electrónico o visita nuestra tienda en Cochabamba, Bolivia. ${BRAND.name} responde rápido.`,
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: `Contacto | ${BRAND.name}`,
    description:
      "Escríbenos por WhatsApp o correo electrónico o visita nuestra tienda en Cochabamba, Bolivia.",
    url: "/contacto",
    type: "website",
  },
};

export default function ContactoPage() {
  return <ContactoClient />;
}
