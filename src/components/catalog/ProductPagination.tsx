"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductPaginationProps {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function ProductPagination({
  page,
  totalPages,
  total,
  pageSize,
  onPageChange,
}: ProductPaginationProps) {
  if (totalPages <= 1) return null;

  const first = (page - 1) * pageSize + 1;
  const last = Math.min(page * pageSize, total);

  return (
    <nav
      aria-label="Navegación de páginas"
      className="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row"
    >
      <p className="text-sm text-content-muted">
        Mostrando {first}–{last} de {total}
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Página anterior"
          className="inline-flex h-11 items-center gap-1 rounded-full border border-border bg-background px-4 text-sm font-semibold text-foreground transition-colors hover:bg-surface-subtle disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft aria-hidden="true" className="size-4" />
          Anterior
        </button>

        <span className="min-w-[6.5rem] text-center text-sm font-semibold text-foreground">
          {page} de {totalPages}
        </span>

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Página siguiente"
          className="inline-flex h-11 items-center gap-1 rounded-full border border-border bg-background px-4 text-sm font-semibold text-foreground transition-colors hover:bg-surface-subtle disabled:cursor-not-allowed disabled:opacity-40"
        >
          Siguiente
          <ChevronRight aria-hidden="true" className="size-4" />
        </button>
      </div>
    </nav>
  );
}
