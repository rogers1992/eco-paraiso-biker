import { Star, Quote } from "lucide-react";
import { getInitials, TESTIMONIALS } from "@/lib/business";

const AVATAR_STYLES = ["bg-action", "bg-surface-dark", "bg-brand"];

export function Testimonials() {
  return (
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
              <Quote aria-hidden="true" className="mb-4 size-8 text-brand" />
              <div
                role="img"
                aria-label={`${testimonial.rating} de 5 estrellas`}
                className="mb-4 flex items-center gap-1"
              >
                {[...Array(testimonial.rating)].map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    aria-hidden="true"
                    className="size-4 fill-yellow-400 text-yellow-400"
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
  );
}
