import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { Product } from "@/lib/api";

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl text-foreground md:text-4xl">Productos destacados</h2>
          <p className="mx-auto max-w-2xl font-sans text-content-muted">
            Descubre los productos más populares y recomendados
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 min-[360px]:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/productos"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-action px-6 text-sm font-bold text-white transition-colors hover:bg-action-hover"
          >
            Ver todos los productos
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
