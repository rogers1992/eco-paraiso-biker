import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BRAND, WHATSAPP } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function Hero() {
  return (
    <section className="relative flex min-h-[600px] items-center justify-center overflow-hidden bg-surface-dark md:min-h-[700px]">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1920&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-surface-dark/90 via-black/80 to-surface-dark/90" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-10 top-20 size-64 rounded-full bg-brand blur-[100px]" />
          <div className="absolute bottom-20 right-10 size-96 rounded-full bg-brand blur-[120px]" />
        </div>
      </div>

      <div className="container relative mx-auto px-4 py-20 text-center">
        <h1 className="mx-auto mb-6 max-w-4xl text-5xl text-white md:text-7xl lg:text-8xl">
          {BRAND.heroTagline}
        </h1>
        <p className="mx-auto mb-10 max-w-2xl font-sans text-lg text-brand-cream md:text-xl">
          {BRAND.tagline}
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/productos"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-action px-8 text-base font-bold text-white transition-colors hover:bg-action-hover"
          >
            Ver productos
            <ArrowRight aria-hidden="true" className="size-5" />
          </Link>
          <a
            href={WHATSAPP.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-white px-8 text-base font-bold text-white transition-colors hover:bg-white hover:text-surface-dark"
          >
            <WhatsAppIcon className="size-5" />
            Contáctanos
          </a>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface-subtle to-transparent" />
    </section>
  );
}
