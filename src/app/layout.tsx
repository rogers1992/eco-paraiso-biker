import type { Metadata } from "next";
import { Geist, Geist_Mono, Anton } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartProvider } from "@/context/CartContext";
import { BRAND, SOCIAL_LINKS } from "@/lib/constants";
import { BUSINESS } from "@/lib/business";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const SITE_URL = "https://paraisobiker.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s | ${BRAND.name}`,
  },
  description: `${BRAND.tagline}. Accesorios para motociclistas de alta calidad en Cochabamba, Bolivia. Envíos a todo el país.`,
  keywords: ["motocicletas", "accesorios", "motos", "repuestos", "Paraiso Biker"],
  authors: [{ name: BRAND.name }],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: `${BRAND.tagline}. Accesorios para motociclistas de alta calidad.`,
    type: "website",
    locale: "es_BO",
    siteName: BRAND.name,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: `${BRAND.tagline}. Accesorios para motociclistas de alta calidad.`,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} h-full antialiased`}>
      <body className="flex min-h-screen flex-col bg-background">
        <CartProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-action focus:px-4 focus:py-2 focus:text-white"
          >
            Saltar al contenido principal
          </a>
          <Navbar />
          <main id="main-content" tabIndex={-1} className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
          <ScrollToTop />
          <CartDrawer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MotorcycleStore",
              name: BRAND.name,
              description: BRAND.tagline,
              telephone: `+${BUSINESS.phoneRaw}`,
              email: BUSINESS.email,
              image: `${SITE_URL}/favicon.ico`,
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                streetAddress: BUSINESS.address.street,
                addressLocality: BUSINESS.address.city,
                addressCountry: "BO",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -17.3895,
                longitude: -66.1578,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "09:00",
                  closes: "19:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Saturday"],
                  opens: "09:00",
                  closes: "18:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Sunday"],
                  opens: "10:00",
                  closes: "14:00",
                },
              ],
              url: SITE_URL,
              sameAs: [SOCIAL_LINKS.tiktok],
            }),
          }}
          />
        </CartProvider>
      </body>
    </html>
  );
}
