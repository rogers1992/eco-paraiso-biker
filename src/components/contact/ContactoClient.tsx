"use client";

import { useState, useRef } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import { submitContactForm, ContactFormData } from "@/lib/api";
import { WHATSAPP, SOCIAL_LINKS } from "@/lib/constants";
import { BUSINESS } from "@/lib/business";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

function validate(data: ContactFormData): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.name.trim()) errors.name = "El nombre es obligatorio";
  if (!data.email.trim()) errors.email = "El correo electrónico es obligatorio";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Correo electrónico inválido";
  if (!data.message.trim()) errors.message = "El mensaje es obligatorio";
  return errors;
}

const FIELD_CLASS =
  "w-full rounded-xl border bg-background px-4 text-base text-foreground placeholder:text-content-muted focus:outline-none focus:ring-2 focus:ring-brand/40";

const ERROR_CLASS = "border-destructive";

export default function ContactoClient() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));

    if (submitted) {
      setFieldErrors((current) => {
        const next = { ...current };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate(formData);
    setFieldErrors(errs);

    if (Object.keys(errs).length > 0) {
      const firstField = Object.keys(errs)[0];
      document.getElementById(firstField)?.focus();
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      await submitContactForm(formData);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setFieldErrors({});
      setTimeout(() => successRef.current?.focus(), 50);
    } catch {
      setSubmitStatus("error");
      setErrorMessage("No se pudo enviar el mensaje. Por favor intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-subtle">
      <div className="container mx-auto px-4 py-8 md:py-10">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl text-foreground md:text-5xl">Contacto</h1>
          <p className="font-sans text-content-muted">
            ¿Tienes preguntas? Estamos aquí para ayudarte
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <div className="mb-6 rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-4 text-2xl text-foreground">Contáctanos</h2>
              <div className="space-y-3">
                {BUSINESS.phones.map((phone) => (
                  <a
                    key={phone.raw}
                    href={`https://wa.me/${phone.raw}?text=${encodeURIComponent(WHATSAPP.message)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-16 items-center gap-3 rounded-xl bg-success-50 p-4 transition-colors hover:bg-success-100 dark:bg-success-950/30"
                  >
                    <WhatsAppIcon className="size-6 shrink-0 text-whatsapp" />
                    <div>
                      <p className="font-sans font-semibold text-foreground">
                        WhatsApp{phone.label ? ` — ${phone.label}` : ""}
                      </p>
                      <p className="font-sans text-sm text-content-muted">{phone.display}</p>
                    </div>
                  </a>
                ))}

                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="flex min-h-16 items-center gap-3 rounded-xl bg-surface-subtle p-4 transition-colors hover:bg-surface-muted"
                >
                  <Mail aria-hidden="true" className="size-6 shrink-0 text-brand" />
                  <div>
                    <p className="font-sans font-semibold text-foreground">Correo electrónico</p>
                    <p className="font-sans text-sm text-content-muted">{BUSINESS.email}</p>
                  </div>
                </a>

                <div className="flex min-h-16 items-center gap-3 rounded-xl bg-surface-subtle p-4">
                  <MapPin aria-hidden="true" className="size-6 shrink-0 text-brand" />
                  <div>
                    <p className="font-sans font-semibold text-foreground">Dirección</p>
                    <p className="font-sans text-sm text-content-muted">{BUSINESS.address.street}</p>
                  </div>
                </div>
              </div>
            </div>

            {SOCIAL_LINKS.tiktok && (
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="mb-4 text-xl text-foreground">Síguenos</h2>
                <div className="flex gap-3">
                  <a
                    href={SOCIAL_LINKS.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-surface-dark px-5 font-sans text-sm font-semibold text-white transition-colors hover:bg-black"
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      className="size-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                    TikTok
                  </a>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-2 text-2xl text-foreground">Envíanos un mensaje</h2>
              <p className="mb-6 font-sans text-sm text-content-muted">
                Los campos marcados con <span aria-hidden="true">*</span> son obligatorios.
              </p>

              {submitStatus === "success" && (
                <div
                  ref={successRef}
                  tabIndex={-1}
                  role="status"
                  aria-live="polite"
                  className="mb-4 rounded-xl border border-success-200 bg-success-50 p-4 focus:outline-none"
                >
                  <p className="font-sans font-medium text-success-700">
                    ¡Mensaje enviado con éxito! Te responderemos pronto.
                  </p>
                </div>
              )}

              {submitStatus === "error" && (
                <div
                  role="alert"
                  className="mb-4 rounded-xl border border-destructive/30 bg-destructive/10 p-4"
                >
                  <p className="font-sans font-medium text-destructive">{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block font-sans text-sm font-semibold text-foreground"
                  >
                    Nombre completo <span aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    aria-invalid={!!fieldErrors.name}
                    aria-describedby={fieldErrors.name ? "name-error" : undefined}
                    className={`${FIELD_CLASS} h-11 ${fieldErrors.name ? ERROR_CLASS : "border-border"}`}
                  />
                  {fieldErrors.name && (
                    <p id="name-error" role="alert" className="mt-1 font-sans text-xs text-destructive">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block font-sans text-sm font-semibold text-foreground"
                  >
                    Correo electrónico <span aria-hidden="true">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    aria-invalid={!!fieldErrors.email}
                    aria-describedby={fieldErrors.email ? "email-error" : undefined}
                    className={`${FIELD_CLASS} h-11 ${fieldErrors.email ? ERROR_CLASS : "border-border"}`}
                  />
                  {fieldErrors.email && (
                    <p id="email-error" role="alert" className="mt-1 font-sans text-xs text-destructive">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block font-sans text-sm font-semibold text-foreground"
                  >
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`${FIELD_CLASS} h-11 border-border`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block font-sans text-sm font-semibold text-foreground"
                  >
                    Asunto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`${FIELD_CLASS} h-11 border-border`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block font-sans text-sm font-semibold text-foreground"
                  >
                    Mensaje <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    aria-invalid={!!fieldErrors.message}
                    aria-describedby={fieldErrors.message ? "message-error" : undefined}
                    className={`${FIELD_CLASS} resize-none py-3 ${fieldErrors.message ? ERROR_CLASS : "border-border"}`}
                  />
                  {fieldErrors.message && (
                    <p
                      id="message-error"
                      role="alert"
                      className="mt-1 font-sans text-xs text-destructive"
                    >
                      {fieldErrors.message}
                    </p>
                  )}
                </div>

                <Button type="submit" disabled={isSubmitting} aria-busy={isSubmitting} size="lg" className="w-full">
                  {isSubmitting ? (
                    "Enviando..."
                  ) : (
                    <>
                      <Send aria-hidden="true" className="size-5" />
                      Enviar mensaje
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
