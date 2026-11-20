import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WHATSAPP } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function ContactSection() {
  return (
    <section className="bg-surface-subtle py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl text-foreground md:text-4xl">¿Tienes preguntas?</h2>
          <p className="mb-8 font-sans text-content-muted">
            Estamos aquí para ayudarte. Escríbenos por WhatsApp y te atenderemos lo antes
            posible.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={WHATSAPP.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-whatsapp px-6 text-sm font-bold text-white transition-colors hover:bg-whatsapp-hover"
            >
              <WhatsAppIcon className="size-5" />
              Escribir por WhatsApp
            </a>
            <Link
              href="/contacto"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-action px-6 text-sm font-bold text-action transition-colors hover:bg-action hover:text-white"
            >
              Formulario de contacto
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
