import type { Metadata } from "next";
import ProductDetailClient from "@/components/product/ProductDetailClient";
import { getProduct, getImageUrl } from "@/lib/api";
import { BRAND } from "@/lib/constants";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const productId = Number.parseInt(id, 10);

  if (!Number.isInteger(productId) || productId <= 0) {
    return {
      title: "Producto no encontrado",
      robots: { index: false, follow: false },
    };
  }

  try {
    const product = await getProduct(productId);
    const description =
      product.description?.slice(0, 160) ??
      `${product.name} en ${BRAND.name}. Accesorios para motociclistas con envío a todo el país.`;
    const image = product.image_url ? getImageUrl(product.image_url) : undefined;

    return {
      title: `${product.name}`,
      description,
      alternates: { canonical: `/producto/${product.id}` },
      openGraph: {
        title: `${product.name} | ${BRAND.name}`,
        description,
        url: `/producto/${product.id}`,
        type: "website",
        images: image ? [{ url: image }] : undefined,
      },
    };
  } catch {
    return {
      title: "Producto",
      robots: { index: false, follow: false },
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = Number.parseInt(id, 10);

  return <ProductDetailClient productId={productId} />;
}
