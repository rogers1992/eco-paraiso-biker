"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bike, ShoppingBag } from "lucide-react";
import { Product, getImageUrl } from "@/lib/api";
import { formatCurrency } from "@/lib/format";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

const IMAGE_SIZES =
  "(min-width: 1536px) 280px, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 360px) 48vw, 100vw";

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = getImageUrl(product.image_url || "");
  const { addItem } = useCart();

  const stock = typeof product.stock === "number" ? product.stock : undefined;
  const inStock = product.in_stock ?? (stock !== undefined ? stock > 0 : true);
  const soldOut = !inStock;

  function handleAdd() {
    if (soldOut) return;
    addItem(product);
  }

  return (
    <Card className="group h-full min-w-0 overflow-hidden transition-shadow duration-200 hover:shadow-lg">
      <Link
        href={`/producto/${product.id}`}
        className="relative block aspect-square overflow-hidden bg-surface-subtle"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            sizes={IMAGE_SIZES}
            className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-content-muted">
            <Bike aria-hidden="true" className="size-14 text-brand/40" />
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        {product.category_name && (
          <p className="mb-1 text-xs text-content-muted">{product.category_name}</p>
        )}

        <h3 className="mb-2 line-clamp-2 min-h-[2.5rem] font-sans text-sm font-semibold leading-snug text-foreground">
          <Link href={`/producto/${product.id}`}>{product.name}</Link>
        </h3>

        <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
          <p className="font-sans text-lg font-bold text-action">
            {formatCurrency(product.unit_price)}
          </p>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-semibold ${
              soldOut
                ? "bg-surface-muted text-content-muted"
                : "bg-success-100 text-success-700"
            }`}
          >
            <span
              aria-hidden="true"
              className={`size-1.5 rounded-full ${
                soldOut ? "bg-content-muted" : "bg-success-700"
              }`}
            />
            {soldOut ? "Sin stock" : "En stock"}
          </span>
        </div>

        <Button
          onClick={handleAdd}
          disabled={soldOut}
          className="mt-auto w-full"
        >
          <ShoppingBag aria-hidden="true" className="size-4" />
          {soldOut ? "Sin stock" : "Agregar"}
        </Button>
      </div>
    </Card>
  );
}
