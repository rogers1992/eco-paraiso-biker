import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BRAND } from "@/lib/constants";

export function AboutSection() {
  return (
    <section className="bg-surface-dark py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl text-white md:text-4xl">Sobre nosotros</h2>
            <p className="mb-6 font-sans leading-relaxed text-white/70">
              {BRAND.name} es tu destino definitivo para accesorios de motociclistas de alta
              calidad. Desde nuestra fundación, nos hemos comprometido a ofrecer productos que
              combinan innovación, seguridad y estilo.
            </p>
            <p className="mb-8 font-sans leading-relaxed text-white/70">
              Nuestra misión es proporcionar a los motociclistas los mejores accesorios del
              mercado, con atención personalizada y precios competitivos. Cada producto que
              ofrecemos ha sido seleccionado cuidadosamente para garantizar la máxima
              satisfacción.
            </p>
            <Link
              href="/nosotros"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-action px-6 text-sm font-bold text-white transition-colors hover:bg-action-hover"
            >
              Conoce más
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>

          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-brand to-action">
              <Image
                src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80"
                alt="Motociclista con equipo de protección"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover opacity-90"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 size-32 rounded-full bg-brand opacity-40 blur-[60px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
