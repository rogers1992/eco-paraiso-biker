"use client";

import { WHATSAPP } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP.url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-50 flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-transform hover:scale-105 hover:bg-whatsapp-hover"
      aria-label="Contactar por WhatsApp"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
