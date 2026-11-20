"use client";

import { Check } from "lucide-react";

export interface CatalogCategory {
  id: number;
  name: string;
}

interface CategoryRadioGroupProps {
  categories: CatalogCategory[];
  value: number | null;
  onChange: (value: number | null) => void;
  idPrefix: string;
}

/**
 * La categoría es una selección excluyente, por lo que se expone con
 * semántica de radio (una sola opción activa) en lugar de botones alternos.
 */
export function CategoryRadioGroup({
  categories,
  value,
  onChange,
  idPrefix,
}: CategoryRadioGroupProps) {
  const options = [{ id: null, name: "Todas las categorías" }, ...categories];

  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-foreground">Categoría</legend>
      <div className="space-y-1.5">
        {options.map((option) => {
          const optionId = `${idPrefix}-${option.id ?? "todas"}`;
          const checked = value === option.id;
          return (
            <div key={optionId}>
              <input
                type="radio"
                id={optionId}
                name={`${idPrefix}-group`}
                className="peer sr-only"
                checked={checked}
                onChange={() => onChange(option.id)}
              />
              <label
                htmlFor={optionId}
                className="flex min-h-12 cursor-pointer items-center justify-between gap-3 rounded-xl border border-border px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-surface-subtle peer-checked:border-action peer-checked:bg-brand-50 peer-checked:font-semibold peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-white peer-focus-visible:shadow-[0_0_0_4px_#1f2937]"
              >
                <span className="line-clamp-2">{option.name}</span>
                {checked && (
                  <Check aria-hidden="true" className="size-4 shrink-0 text-action" />
                )}
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
