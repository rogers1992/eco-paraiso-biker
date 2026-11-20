"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { BUSINESS } from "@/lib/business";

const FAQ_ITEMS = [
  {
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Aceptamos efectivo, transferencias bancarias y tarjetas de crédito o débito. También puedes pagar a través de WhatsApp coordinando con nuestro equipo.",
  },
  {
    question: "¿Hacen envíos a otras ciudades?",
    answer:
      "Sí, realizamos envíos a todo el país a través de empresas de transporte confiables. El costo de envío varía según el destino y el peso del paquete.",
  },
  {
    question: "¿Los productos tienen garantía?",
    answer:
      "Todos nuestros productos cuentan con garantía del fabricante. El período de garantía varía según el tipo de producto, generalmente entre 3 y 12 meses.",
  },
  {
    question: "¿Puedo devolver un producto?",
    answer:
      "Sí, aceptamos devoluciones dentro de los 7 días posteriores a la compra, siempre que el producto esté en condiciones originales y con su embalaje.",
  },
  {
    question: "¿Tienen tienda física?",
    answer: `Sí, nos encontramos en ${BUSINESS.address.street}, ${BUSINESS.address.city}. Atendemos de lunes a viernes de 9:00 a 19:00, los sábados de 9:00 a 18:00 y los domingos de 10:00 a 14:00.`,
  },
  {
    question: "¿Cómo puedo consultar la disponibilidad de un producto?",
    answer: `Puedes consultar disponibilidad por WhatsApp al ${BUSINESS.phone}, por correo electrónico a ${BUSINESS.email} o visitar nuestra tienda física.`,
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl text-foreground md:text-4xl">Preguntas frecuentes</h2>
            <p className="font-sans text-content-muted">
              Respuestas a las preguntas más comunes de nuestros clientes
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              const triggerId = `faq-trigger-${index}`;
              const panelId = `faq-panel-${index}`;
              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-xl border border-border bg-surface-subtle"
                >
                  <h3>
                    <button
                      id={triggerId}
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-surface-muted"
                    >
                      <span className="font-sans text-sm font-semibold text-foreground sm:text-base">
                        {item.question}
                      </span>
                      <ChevronDown
                        aria-hidden="true"
                        className={`size-5 shrink-0 text-action transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    hidden={!isOpen}
                    className="px-5 pb-5"
                  >
                    <p className="font-sans leading-relaxed text-content-muted">{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
