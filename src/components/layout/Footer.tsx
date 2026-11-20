import Link from "next/link";
import { BRAND, NAV_LINKS, SOCIAL_LINKS, WHATSAPP } from "@/lib/constants";
import { BUSINESS } from "@/lib/business";
import { Phone, Mail } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function Footer() {
  return (
    <footer className="bg-surface-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <p className="mb-2 font-heading text-xl text-brand">{BRAND.name}</p>
            <p className="mb-4 font-sans text-sm text-white/60">{BRAND.tagline}</p>
            <div className="space-y-2">
              {BUSINESS.phones.map((phone) => (
                <a
                  key={phone.raw}
                  href={WHATSAPP.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-2 font-sans text-sm text-white/60 transition-colors hover:text-brand"
                >
                  <Phone aria-hidden="true" className="size-4" />
                  <div>
                    <span>{phone.display}</span>
                    {phone.label && (
                      <span className="block text-xs text-white/40">{phone.label}</span>
                    )}
                  </div>
                </a>
              ))}
              <a
                href={`mailto:${BUSINESS.email}`}
                className="flex min-h-11 items-center gap-2 font-sans text-sm text-white/60 transition-colors hover:text-brand"
              >
                <Mail aria-hidden="true" className="size-4" />
                {BUSINESS.email}
              </a>
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-sans text-sm font-semibold tracking-wide text-white/60">
              Navegación
            </h2>
            <ul className="space-y-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center font-sans text-sm text-white/70 transition-colors hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 font-sans text-sm font-semibold tracking-wide text-white/60">
              Síguenos
            </h2>
            <div className="flex gap-3">
              {SOCIAL_LINKS.tiktok && (
                <a
                  href={SOCIAL_LINKS.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand hover:text-white"
                  aria-label="TikTok de Paraiso Biker"
                >
                  <svg aria-hidden="true" focusable="false" className="size-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-sans text-sm font-semibold tracking-wide text-white/60">
              Contáctanos
            </h2>
            <a
              href={WHATSAPP.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-whatsapp px-6 text-sm font-bold text-white transition-colors hover:bg-whatsapp-hover"
            >
              <WhatsAppIcon className="size-4" />
              Escribir por WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center">
          <p className="font-sans text-sm text-white/60">
            © {new Date().getFullYear()} {BRAND.name}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
