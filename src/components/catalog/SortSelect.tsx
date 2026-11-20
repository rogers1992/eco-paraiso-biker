"use client";

import { ChevronDown } from "lucide-react";
import { SORT_OPTIONS } from "@/lib/catalogParams";

interface SortSelectProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
  /** Oculta la etiqueta visualmente (la conserva para lectores de pantalla). */
  compact?: boolean;
}

export function SortSelect({
  id,
  value,
  onChange,
  label = "Ordenar por",
  className = "",
  compact = false,
}: SortSelectProps) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className={`mb-2 block text-sm font-semibold text-foreground ${
          compact ? "sr-only" : ""
        }`}
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-11 w-full min-w-0 appearance-none rounded-full border border-border bg-background px-4 pr-10 text-sm text-foreground focus:border-brand-100 focus:outline-none focus:ring-2 focus:ring-brand/40"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-content-muted"
        />
      </div>
    </div>
  );
}
