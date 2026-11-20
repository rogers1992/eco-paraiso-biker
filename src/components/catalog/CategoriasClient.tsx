"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCategories, getProducts, type Category } from "@/lib/api";
import { getCategoryIcon } from "@/lib/categoryIcons";

interface CategoryWithCount extends Category {
  productCount: number;
  isPartial: boolean;
}

export default function CategoriasClient() {
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        const [cats, productsPage] = await Promise.all([
          getCategories(),
          getProducts(0, 200),
        ]);

        const items = productsPage.items ?? [];
        const isPartial = items.length < productsPage.total;

        const counts = items.reduce<Record<number, number>>((acc, product) => {
          acc[product.category_id] = (acc[product.category_id] ?? 0) + 1;
          return acc;
        }, {});

        const withCounts = cats.map((category) => ({
          ...category,
          productCount: counts[category.id] ?? 0,
          isPartial,
        }));

        if (!cancelled) setCategories(withCounts);
      } catch (error) {
        if (cancelled) return;
        console.error("No se pudieron cargar las categorías:", error);
        setError("No se pudieron cargar las categorías.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-subtle">
        <div className="container mx-auto px-4 py-8">
          <h1 className="sr-only">Cargando categorías</h1>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="aspect-[4/3] animate-pulse rounded-xl bg-border md:aspect-square"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-surface-subtle">
        <div className="container mx-auto px-4 py-8">
          <div className="rounded-2xl border border-border bg-card px-6 py-12 text-center">
            <h1 className="mb-2 text-3xl text-foreground">Categorías no disponibles</h1>
            <p role="alert" className="mb-6 text-content-muted">
              {error}
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex h-11 items-center justify-center rounded-full bg-action px-6 text-sm font-bold text-white transition-colors hover:bg-action-hover"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-subtle">
      <div className="container mx-auto px-4 py-8 md:py-10">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl text-foreground md:text-5xl">Categorías</h1>
          <p className="font-sans text-content-muted">
            Explora nuestras categorías de productos
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {categories.map((category) => {
            const IconComponent = getCategoryIcon(category.name);

            return (
              <Link
                key={category.id}
                href={`/productos?categoria=${category.id}`}
                className="group relative block aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-brand to-action transition-all duration-300 hover:from-action hover:to-brand md:aspect-square"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <IconComponent
                    aria-hidden="true"
                    className="size-16 text-white/25 transition-transform duration-300 group-hover:scale-110 md:size-24"
                  />
                </div>
                <div className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <ArrowRight aria-hidden="true" className="size-5 text-white" />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6">
                  <h2 className="mb-1 text-lg text-white md:text-2xl">{category.name}</h2>
                  <p className="font-sans text-sm text-white/80">
                    {category.productCount}
                    {category.isPartial ? "+" : ""}{" "}
                    {category.productCount === 1 ? "producto" : "productos"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
