"use client";

import { Search, X } from "lucide-react";

interface CatalogSearchProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

export function CatalogSearch({
  id,
  value,
  onChange,
  label = "Buscar productos",
  placeholder = "Buscar productos...",
  className = "",
}: CatalogSearchProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-content-muted"
        />
        <input
          id={id}
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          className="h-11 w-full rounded-full border border-border bg-background pl-11 pr-11 text-base text-foreground placeholder:text-content-muted focus:border-brand-100 focus:outline-none focus:ring-2 focus:ring-brand/40 sm:text-sm"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Limpiar búsqueda"
            className="absolute right-1.5 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-content-muted transition-colors hover:bg-muted hover:text-foreground"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
}
