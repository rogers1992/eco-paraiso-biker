"use client";

import { CategoryRadioGroup, type CatalogCategory } from "./CategoryRadioGroup";
import { SortSelect } from "./SortSelect";
import { CatalogSearch } from "./CatalogSearch";

interface FiltersPanelProps {
  categories: CatalogCategory[];
  categoryId: number | null;
  onCategoryChange: (value: number | null) => void;
  sortValue: string;
  onSortChange: (value: string) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

/** Panel de filtros de escritorio: búsqueda, categoría y ordenamiento. */
export function FiltersPanel({
  categories,
  categoryId,
  onCategoryChange,
  sortValue,
  onSortChange,
  searchValue,
  onSearchChange,
}: FiltersPanelProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h2 className="mb-4 text-lg text-foreground">Filtros</h2>

      <CatalogSearch
        id="buscar-productos"
        value={searchValue}
        onChange={onSearchChange}
        className="mb-6"
      />

      <div className="mb-6">
        <CategoryRadioGroup
          categories={categories}
          value={categoryId}
          onChange={onCategoryChange}
          idPrefix="panel-categoria"
        />
      </div>

      <SortSelect
        id="orden-productos"
        value={sortValue}
        onChange={onSortChange}
        className="mb-1"
      />
    </div>
  );
}
