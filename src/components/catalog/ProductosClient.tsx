"use client";

import { useEffect, useMemo, useState } from "react";
import { getCategories, getProducts, type Category, type Product } from "@/lib/api";
import {
  DEFAULT_SORT,
  SORT_OPTIONS,
  type CatalogInitialState,
} from "@/lib/catalogParams";
import { useCatalogFilters } from "@/hooks/useCatalogFilters";
import { FiltersPanel } from "./FiltersPanel";
import { MobileFilterSheet } from "./MobileFilterSheet";
import { CatalogSearch } from "./CatalogSearch";
import { SortSelect } from "./SortSelect";
import { ActiveFilterChips } from "./ActiveFilterChips";
import { ProductPagination } from "./ProductPagination";
import { ProductCard } from "@/components/sections/ProductCard";
import { Button } from "@/components/ui/button";
import { EmptyStateIllustration } from "@/components/ui/EmptyStateIllustration";

const PAGE_SIZE = 12;

interface ProductosClientProps {
  initialState: CatalogInitialState;
}

export function ProductosClient({ initialState }: ProductosClientProps) {
  const filters = useCatalogFilters(initialState);
  const [sheetOpen, setSheetOpen] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [retryCount, setRetryCount] = useState(0);

  const { search, categoryId, sortValue, page } = filters;

  useEffect(() => {
    let cancelled = false;

    async function fetchCategories() {
      try {
        const data = await getCategories();
        if (!cancelled) setCategories(data);
      } catch (error) {
        console.error("No se pudieron cargar las categorías:", error);
      }
    }

    fetchCategories();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function fetchProducts() {
      setIsLoading(true);
      setError(null);

      const [sortBy, order] = sortValue.split("-");
      const skip = (page - 1) * PAGE_SIZE;

      try {
        const data = await getProducts(
          skip,
          PAGE_SIZE,
          search || undefined,
          categoryId ?? undefined,
          sortBy,
          order
        );

        if (cancelled) return;

        // Si la página actual quedó fuera de rango, se ajusta a la última válida.
        if (page > 1 && data.total_pages > 0 && page > data.total_pages) {
          filters.setPage(data.total_pages);
          return;
        }

        setProducts(data.items);
        setTotal(data.total);
        setTotalPages(Math.max(1, data.total_pages));
      } catch (error) {
        if (cancelled) return;
        console.error("No se pudieron cargar los productos:", error);
        setError("No se pudieron cargar los productos. Revisa tu conexión e inténtalo de nuevo.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchProducts();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, categoryId, sortValue, page, retryCount]);

  const categoryName = useMemo(
    () => categories.find((category) => category.id === categoryId)?.name,
    [categories, categoryId]
  );

  const sortLabel = useMemo(
    () => SORT_OPTIONS.find((option) => option.value === sortValue)?.label,
    [sortValue]
  );

  const chips = useMemo(() => {
    const list: { key: string; label: string; onRemove: () => void }[] = [];
    if (search) {
      list.push({ key: "search", label: `“${search}”`, onRemove: () => filters.removeSearch() });
    }
    if (categoryName) {
      list.push({
        key: "category",
        label: categoryName,
        onRemove: () => filters.setCategory(null),
      });
    }
    if (sortValue !== DEFAULT_SORT && sortLabel) {
      list.push({
        key: "sort",
        label: sortLabel,
        onRemove: () => filters.setSort(DEFAULT_SORT),
      });
    }
    return list;
  }, [search, categoryName, sortValue, sortLabel, filters]);

  const hasActiveFilters = chips.length > 0;

  return (
    <div className="min-h-screen bg-surface-subtle">
      <div className="container mx-auto px-4 py-8 md:py-10">
        <div className="mb-6 md:mb-8">
          <h1 className="mb-2 text-4xl text-foreground md:text-5xl">Productos</h1>
          <p role="status" aria-live="polite" className="text-content-muted">
            {isLoading
              ? "Cargando productos..."
              : `${total} ${total === 1 ? "producto encontrado" : "productos encontrados"}`}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          <aside aria-label="Filtros de búsqueda" className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-24">
              <FiltersPanel
                categories={categories}
                categoryId={categoryId}
                onCategoryChange={filters.setCategory}
                sortValue={sortValue}
                onSortChange={filters.setSort}
                searchValue={filters.searchInput}
                onSearchChange={filters.setSearchInput}
              />
            </div>
          </aside>

          <div className="lg:col-span-9">
            {/* Controles móviles: búsqueda visible + filtros en panel inferior */}
            <div className="mb-4 space-y-3 lg:hidden">
              <CatalogSearch
                id="buscar-productos-movil"
                value={filters.searchInput}
                onChange={filters.setSearchInput}
              />
              <div className="flex items-center gap-3">
                <MobileFilterSheet
                  categories={categories}
                  categoryId={categoryId}
                  onCategoryChange={filters.setCategory}
                  sortValue={sortValue}
                  onSortChange={filters.setSort}
                  onClear={filters.clearAll}
                  resultCount={total}
                  activeFilterCount={filters.activeFilterCount}
                  open={sheetOpen}
                  onOpenChange={setSheetOpen}
                />
                <SortSelect
                  id="orden-productos-movil"
                  value={sortValue}
                  onChange={filters.setSort}
                  label="Ordenar por"
                  compact
                  className="min-w-0 flex-1"
                />
              </div>
            </div>

            {hasActiveFilters && (
              <div className="mb-6">
                <ActiveFilterChips chips={chips} onClearAll={filters.clearAll} />
              </div>
            )}

            {isLoading ? (
              <div className="grid grid-cols-1 gap-4 min-[360px]:grid-cols-2 md:grid-cols-3 md:gap-6 2xl:grid-cols-4">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="aspect-square rounded-xl bg-border" />
                    <div className="space-y-2 p-4">
                      <div className="h-4 w-3/4 rounded bg-border" />
                      <div className="h-4 w-1/3 rounded bg-border" />
                      <div className="h-10 w-full rounded-full bg-border" />
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="rounded-2xl border border-border bg-card px-6 py-12 text-center">
                <h2 className="mb-2 text-xl text-foreground">No se pudieron cargar los productos</h2>
                <p className="mx-auto mb-6 max-w-md text-content-muted">{error}</p>
                <Button onClick={() => setRetryCount((count) => count + 1)}>Reintentar</Button>
              </div>
            ) : products.length === 0 ? (
              <div className="rounded-2xl border border-border bg-card px-6 py-12 text-center">
                <EmptyStateIllustration className="mx-auto mb-4 size-32 text-brand" />
                <h2 className="mb-2 text-xl text-foreground">Sin resultados</h2>
                <p className="mx-auto mb-6 max-w-md text-content-muted">
                  No encontramos productos con estos filtros. Prueba con otra búsqueda o
                  quítalos todos.
                </p>
                {hasActiveFilters && (
                  <Button onClick={filters.clearAll}>Limpiar filtros</Button>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-4 min-[360px]:grid-cols-2 md:grid-cols-3 md:gap-6 2xl:grid-cols-4">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                <ProductPagination
                  page={page}
                  totalPages={totalPages}
                  total={total}
                  pageSize={PAGE_SIZE}
                  onPageChange={filters.setPage}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
