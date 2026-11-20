import type { Metadata } from "next";
import { MapPin, Phone, Clock, Star } from "lucide-react";
import { BRAND, WHATSAPP } from "@/lib/constants";
import { BUSINESS, getInitials, TESTIMONIALS } from "@/lib/business";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description: `Conoce la historia de ${BRAND.name}, nuestra tienda de accesorios para motociclistas en Cochabamba, Bolivia. Horarios, dirección y contacto.`,
  alternates: { canonical: "/nosotros" },
  openGraph: {
    title: `Sobre nosotros | ${BRAND.name}`,
    description: `Conoce la historia de ${BRAND.name} y encuentra nuestra tienda en Cochabamba, Bolivia.`,
    url: "/nosotros",
    type: "website",
  },
};

const STATS = [
  { label: "Años de experiencia", value: "10+" },
  { label: "Productos disponibles", value: "500+" },
  { label: "Clientes satisfechos", value: "2000+" },
  { label: "Marcas premium", value: "50+" },
];

const AVATAR_STYLES = ["bg-action", "bg-surface-dark", "bg-brand"];

export default function NosotrosPage() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-surface-dark py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-surface-dark via-black to-surface-dark">
          <div className="absolute left-10 top-20 size-64 rounded-full bg-brand opacity-20 blur-[100px]" />
          <div className="absolute bottom-20 right-10 size-96 rounded-full bg-brand opacity-20 blur-[120px]" />
        </div>
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="mb-4 text-5xl text-white md:text-6xl">Sobre nosotros</h1>
          <p className="mx-auto max-w-2xl font-sans text-lg text-brand-cream">
            Conoce la historia detrás de {BRAND.name}
          </p>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-6 text-3xl text-foreground md:text-4xl">Nuestra historia</h2>
            <p className="mb-4 font-sans leading-relaxed text-content-muted">
              {BRAND.name} nació de la pasión por las motocicletas y del deseo de ofrecer a los
              motociclistas los mejores accesorios del mercado. Desde nuestros inicios, nos
              hemos comprometido a proporcionar productos de alta calidad que combinan
              innovación, seguridad y estilo.
            </p>
            <p className="font-sans leading-relaxed text-content-muted">
              Nuestro equipo está formado por entusiastas de las motos que entienden las
              necesidades de quienes andan en dos ruedas. Cada producto que ofrecemos ha sido
              seleccionado cuidadosamente para garantizar la máxima satisfacción de nuestros
              clientes.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-border bg-card p-6 text-center">
                <p className="mb-2 font-heading text-4xl text-brand">{stat.value}</p>
                <p className="font-sans text-sm text-content-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-muted py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl text-foreground md:text-4xl">
              Lo que dicen nuestros clientes
            </h2>
            <p className="font-sans text-content-muted">
              Testimonios de clientes que compran nuestro equipo
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((testimonial, index) => (
              <figure
                key={testimonial.id}
                className="flex h-full flex-col rounded-2xl border border-border bg-card p-6"
              >
                <div
                  role="img"
                  aria-label={`${testimonial.rating} de 5 estrellas`}
                  className="mb-4 flex items-center gap-1"
                >
                  {[...Array(testimonial.rating)].map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      aria-hidden="true"
                      className="size-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <blockquote className="mb-4 flex-1 font-sans leading-relaxed text-content-muted">
                  {`“${testimonial.text}”`}
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <div
                    aria-hidden="true"
                    className={`flex size-10 items-center justify-center rounded-full text-sm font-bold text-white ${AVATAR_STYLES[index % AVATAR_STYLES.length]}`}
                  >
                    {getInitials(testimonial.name)}
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-foreground">{testimonial.name}</p>
                    {testimonial.date && (
                      <p className="font-sans text-sm text-content-muted">{testimonial.date}</p>
                    )}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl text-foreground md:text-4xl">Visítanos</h2>
              <div className="mb-6 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-brand" />
                  <div>
                    <p className="mb-1 font-sans font-semibold text-foreground">Dirección</p>
                    <p className="font-sans text-content-muted">
                      {BUSINESS.address.street}
                      <br />
                      {BUSINESS.address.city}, {BUSINESS.address.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-brand" />
                  <div>
                    <p className="mb-1 font-sans font-semibold text-foreground">Teléfono</p>
                    <a
                      href={WHATSAPP.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-content-muted transition-colors hover:text-action"
                    >
                      {BUSINESS.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-brand" />
                  <div>
                    <p className="mb-1 font-sans font-semibold text-foreground">
                      Horario de atención
                    </p>
                    <div className="space-y-1 font-sans text-content-muted">
                      {BUSINESS.hours.map((schedule) => (
                        <div key={schedule.day} className="flex justify-between gap-4">
                          <span>{schedule.day}</span>
                          <span className="font-medium text-foreground">{schedule.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <a
                href={WHATSAPP.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-whatsapp px-8 text-sm font-bold text-white transition-colors hover:bg-whatsapp-hover"
              >
                <WhatsAppIcon className="size-5" />
                Contáctanos por WhatsApp
              </a>
            </div>

            <div className="h-96 overflow-hidden rounded-xl border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3792.5720174695!2d-66.1578!3d-17.3895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDIzJzIyLjIiUyA2NsKwMDknMjguMSJX!5e0!3m2!1ses!2sbo!4v1609459200000!5m2!1ses!2sbo"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Ubicación de ${BUSINESS.name} - ${BUSINESS.address.street}, ${BUSINESS.address.city}`}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
