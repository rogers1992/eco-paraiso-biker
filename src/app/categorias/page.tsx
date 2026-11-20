import type { Metadata } from "next";
import CategoriasClient from "@/components/catalog/CategoriasClient";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Categorías",
  description: `Explora las categorías de accesorios para motociclistas disponibles en ${BRAND.name}: cascos, protecciones, guantes y más.`,
  alternates: { canonical: "/categorias" },
  openGraph: {
    title: `Categorías | ${BRAND.name}`,
    description:
      "Explora las categorías de accesorios para motociclistas: cascos, protecciones, guantes y más.",
    url: "/categorias",
    type: "website",
  },
};

export default function CategoriasPage() {
  return <CategoriasClient />;
}
