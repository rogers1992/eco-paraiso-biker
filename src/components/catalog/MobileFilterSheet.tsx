"use client";

import { SlidersHorizontal, X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CategoryRadioGroup, type CatalogCategory } from "./CategoryRadioGroup";
import { SortSelect } from "./SortSelect";

interface MobileFilterSheetProps {
  categories: CatalogCategory[];
  categoryId: number | null;
  onCategoryChange: (value: number | null) => void;
  sortValue: string;
  onSortChange: (value: string) => void;
  onClear: () => void;
  resultCount: number;
  activeFilterCount: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileFilterSheet({
  categories,
  categoryId,
  onCategoryChange,
  sortValue,
  onSortChange,
  onClear,
  resultCount,
  activeFilterCount,
  open,
  onOpenChange,
}: MobileFilterSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-background px-4 text-sm font-semibold text-foreground transition-colors hover:border-brand-100 hover:bg-surface-subtle">
        <SlidersHorizontal aria-hidden="true" className="size-4" />
        Filtros
        {activeFilterCount > 0 && (
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-action px-1.5 text-xs font-bold text-white">
            {activeFilterCount}
          </span>
        )}
      </SheetTrigger>

      <SheetContent side="bottom" className="max-h-[85dvh] gap-0 p-0">
        <SheetHeader className="border-b border-border p-4">
          <SheetTitle className="text-lg">Filtros</SheetTitle>
          <SheetDescription className="text-sm text-content-muted">
            {resultCount} {resultCount === 1 ? "producto" : "productos"} encontrados
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto overscroll-contain p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <div className="space-y-6">
            <CategoryRadioGroup
              categories={categories}
              value={categoryId}
              onChange={onCategoryChange}
              idPrefix="sheet-categoria"
            />
            <SortSelect
              id="sheet-orden"
              value={sortValue}
              onChange={onSortChange}
              className="pb-2"
            />
          </div>
        </div>

        <SheetFooter className="flex-row items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={onClear}
            className="shrink-0"
            disabled={activeFilterCount === 0}
          >
            <X aria-hidden="true" className="size-4" />
            Limpiar
          </Button>
          <SheetClose
            render={
              <Button type="button" className="flex-1">
                {`Ver ${resultCount} ${resultCount === 1 ? "producto" : "productos"}`}
              </Button>
            }
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
