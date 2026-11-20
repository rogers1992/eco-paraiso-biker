"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-50 flex size-12 items-center justify-center rounded-full bg-action text-white shadow-lg transition-colors hover:bg-action-hover"
      aria-label="Volver arriba"
    >
      <ArrowUp aria-hidden="true" className="size-5" />
    </button>
  );
}
