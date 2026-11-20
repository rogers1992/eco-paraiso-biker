"use client";

import { useEffect, useState } from "react";
import { CategoriesGrid } from "./CategoriesGrid";
import { FeaturedProducts } from "./FeaturedProducts";
import { getCategories, getProducts, type Category, type Product } from "@/lib/api";
import { Button } from "@/components/ui/button";

export function HomeCatalogSections() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(0, 8),
          getCategories(),
        ]);
        if (cancelled) return;
        setProducts(productsData.items);
        setCategories(categoriesData);
        setError(null);
      } catch (error) {
        if (cancelled) return;
        console.error("No se pudieron cargar los datos del inicio:", error);
        setError("No se pudieron cargar los productos. Intenta de nuevo más tarde.");
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
      <section className="bg-surface-subtle py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 h-8 w-64 animate-pulse rounded bg-border" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="h-64 animate-pulse rounded-xl bg-border" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-surface-subtle py-16">
        <div className="container mx-auto px-4 text-center">
          <p role="alert" className="mb-4 font-sans text-content-muted">
            {error}
          </p>
          <Button onClick={() => window.location.reload()}>Reintentar</Button>
        </div>
      </section>
    );
  }

  return (
    <>
      <CategoriesGrid categories={categories} />
      <FeaturedProducts products={products} />
    </>
  );
}
