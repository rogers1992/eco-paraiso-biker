"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Share2, ShoppingBag } from "lucide-react";
import { getProduct, getProducts, Product, getImageUrl } from "@/lib/api";
import { ProductCard } from "@/components/sections/ProductCard";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { WHATSAPP } from "@/lib/constants";
import { formatCurrency } from "@/lib/format";
import { useCart } from "@/context/CartContext";

const DETAIL_IMAGE_SIZES = "(min-width: 768px) 50vw, 100vw";

interface ProductDetailClientProps {
  productId: number;
}

export default function ProductDetailClient({ productId }: ProductDetailClientProps) {
  const isValidId = Number.isInteger(productId) && productId > 0;
  const { addItem, openCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(isValidId);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [shareStatus, setShareStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!isValidId) return;

    let cancelled = false;

    async function fetchProduct() {
      setIsLoading(true);
      setError(null);

      try {
        const productData = await getProduct(productId);
        if (cancelled) return;
        setProduct(productData);
        setIsLoading(false);

        // Los productos relacionados son un bloque opcional: si falla, el
        // producto principal sigue mostrándose con normalidad.
        if (productData.category_id) {
          try {
            const related = await getProducts(0, 5, undefined, productData.category_id);
            if (cancelled) return;
            setRelatedProducts(related.items.filter((item) => item.id !== productId));
          } catch {
            if (!cancelled) setRelatedProducts([]);
          }
        }
      } catch {
        if (cancelled) return;
        setError("No se pudo cargar el producto.");
        setIsLoading(false);
      }
    }

    fetchProduct();
    return () => {
      cancelled = true;
    };
  }, [productId, isValidId]);

  const stock = typeof product?.stock === "number" ? product.stock : undefined;
  const inStock = product?.in_stock ?? (stock !== undefined ? stock > 0 : true);
  const soldOut = !inStock;

  const handleAddToCart = () => {
    if (!product || soldOut) return;
    addItem(product);
    openCart();
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: product?.name || "Producto",
          text: product?.description || "",
          url,
        });
        return;
      }
      await navigator.clipboard.writeText(url);
      setShareStatus("Enlace copiado al portapapeles.");
    } catch {
      setShareStatus("No se pudo compartir. Copia el enlace desde la barra del navegador.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-subtle">
        <div className="container mx-auto px-4 py-8">
          <h1 className="sr-only">Cargando producto</h1>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="animate-pulse">
                <div className="aspect-square rounded-xl bg-border" />
              <div className="mt-4 grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="aspect-square rounded-lg bg-border" />
                ))}
              </div>
            </div>
            <div className="space-y-4 rounded-xl border border-border bg-card p-6">
              <div className="h-6 w-20 rounded-full bg-border" />
              <div className="h-10 w-3/4 rounded bg-border" />
              <div className="h-4 w-1/4 rounded bg-border" />
              <div className="h-12 w-1/3 rounded bg-border" />
              <div className="h-12 w-full rounded-full bg-border" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-surface-subtle">
        <div className="container mx-auto px-4 py-8">
          <div className="rounded-2xl border border-border bg-card px-6 py-16 text-center">
            <h1 className="mb-2 text-3xl text-foreground">Producto no encontrado</h1>
            <p role="alert" className="mx-auto mb-6 max-w-md text-content-muted">
              {error || "El producto que buscas no existe o ya no está disponible."}
            </p>
            <Button render={<Link href="/productos" />}>Volver a productos</Button>
          </div>
        </div>
      </div>
    );
  }

  const allImages = [
    ...(product.image_url ? [{ image_url: product.image_url, is_primary: true }] : []),
    ...(product.images || []).filter((image) => image.image_url !== product.image_url),
  ];

  const currentImage = allImages[selectedImageIndex]?.image_url || product.image_url;

  return (
    <div className="min-h-screen bg-surface-subtle">
      <div className="container mx-auto px-4 py-8">
        <nav aria-label="Migas de pan" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-content-muted">
            <li>
              <Link href="/" className="transition-colors hover:text-action">
                Inicio
              </Link>
            </li>
            <li aria-hidden="true" className="text-border">
              /
            </li>
            <li>
              <Link href="/productos" className="transition-colors hover:text-action">
                Productos
              </Link>
            </li>
            <li aria-hidden="true" className="text-border">
              /
            </li>
            <li aria-current="page" className="max-w-[200px] truncate text-foreground">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <div className="relative aspect-[1/1.35] overflow-hidden rounded-xl border border-border bg-card">
              {currentImage ? (
                <Image
                  src={getImageUrl(currentImage)}
                  alt={product.name}
                  fill
                  sizes={DETAIL_IMAGE_SIZES}
                  className="object-contain p-4"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center text-content-muted">
                  <span className="font-heading text-8xl text-brand/50">
                    {product.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {allImages.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-2">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedImageIndex(index)}
                    aria-pressed={selectedImageIndex === index}
                    aria-label={`Ver imagen ${index + 1} de ${allImages.length}`}
                    className={`relative aspect-square overflow-hidden rounded-lg border-2 bg-card transition-colors ${
                      selectedImageIndex === index
                        ? "border-action"
                        : "border-transparent hover:border-border"
                    }`}
                  >
                    <Image
                      src={getImageUrl(image.image_url)}
                      alt=""
                      fill
                      sizes="120px"
                      className="object-contain p-1"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="rounded-xl border border-border bg-card p-6 md:sticky md:top-24">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h1 className="mb-2 text-3xl text-foreground md:text-4xl">{product.name}</h1>
                  <p className="font-sans text-sm text-content-muted">SKU: {product.sku}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleShare}
                  aria-label="Compartir producto"
                  className="shrink-0"
                >
                  <Share2 aria-hidden="true" className="size-5" />
                </Button>
              </div>

              {shareStatus && (
                <p role="status" className="mb-4 text-sm text-content-muted">
                  {shareStatus}
                </p>
              )}

              <div className="mb-6">
                <p className="font-sans text-4xl font-bold text-action">
                  {formatCurrency(product.unit_price)}
                </p>
                <span
                  className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
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

              {product.description && (
                <div className="mb-6">
                  <h2 className="mb-2 text-xl text-foreground">Descripción</h2>
                  <p className="leading-relaxed text-content-muted">{product.description}</p>
                </div>
              )}

              <div className="space-y-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={soldOut}
                  className="w-full"
                  size="lg"
                >
                  <ShoppingBag aria-hidden="true" className="size-5" />
                  {soldOut ? "Sin stock" : "Agregar al carrito"}
                </Button>
                <Button
                  render={
                    <a
                      href={`https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(
                        `Hola, me interesa el producto: ${product.name} (${formatCurrency(product.unit_price)})`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                  variant="whatsapp"
                  className="w-full"
                  size="lg"
                >
                  <WhatsAppIcon className="size-5" />
                  Consultar por WhatsApp
                </Button>

                <a
                  href={WHATSAPP.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center font-sans text-sm text-content-muted transition-colors hover:text-action"
                >
                  ¿Tienes preguntas? Contáctanos
                </a>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div>
            <h2 className="mb-6 text-3xl text-foreground">Productos relacionados</h2>
            <div className="grid grid-cols-1 gap-4 min-[360px]:grid-cols-2 md:grid-cols-4 md:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
