"use client";

import { X } from "lucide-react";

export interface ActiveFilterChip {
  key: string;
  label: string;
  onRemove: () => void;
}

interface ActiveFilterChipsProps {
  chips: ActiveFilterChip[];
  onClearAll: () => void;
}

export function ActiveFilterChips({ chips, onClearAll }: ActiveFilterChipsProps) {
  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={chip.onRemove}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-border bg-surface-subtle px-3 text-sm font-medium text-foreground transition-colors hover:border-action hover:text-action"
        >
          <span className="max-w-[12rem] truncate">{chip.label}</span>
          <X aria-hidden="true" className="size-3.5 shrink-0" />
          <span className="sr-only">Quitar filtro {chip.label}</span>
        </button>
      ))}
      <button
        type="button"
        onClick={onClearAll}
        className="min-h-9 rounded-full px-2 text-sm font-semibold text-action underline-offset-4 transition-colors hover:underline"
      >
        Limpiar todo
      </button>
    </div>
  );
}
