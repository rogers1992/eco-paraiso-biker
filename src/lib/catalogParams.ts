export const SORT_OPTIONS = [
  { value: "created_at-desc", label: "Más recientes" },
  { value: "created_at-asc", label: "Más antiguos" },
  { value: "name-asc", label: "Nombre (A-Z)" },
  { value: "name-desc", label: "Nombre (Z-A)" },
  { value: "price-asc", label: "Precio (menor a mayor)" },
  { value: "price-desc", label: "Precio (mayor a menor)" },
] as const;

export const DEFAULT_SORT = "created_at-desc";

const SORT_VALUES = new Set<string>(SORT_OPTIONS.map((option) => option.value));

export interface CatalogInitialState {
  search: string;
  categoryId: number | null;
  sortValue: string;
  page: number;
}

export function parseCategory(value: string | null | undefined): number | null {
  const parsed = value ? Number.parseInt(value, 10) : NaN;
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

export function parseSort(sort: string | null | undefined, order: string | null | undefined): string {
  if (!sort) return DEFAULT_SORT;
  const candidate = `${sort}-${order ?? "desc"}`;
  return SORT_VALUES.has(candidate) ? candidate : DEFAULT_SORT;
}

export function parsePage(value: string | null | undefined): number {
  const parsed = value ? Number.parseInt(value, 10) : 1;
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}
