import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/api";

const SITE_URL = "https://paraisobiker.com";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/productos`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/categorias`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/nosotros`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contacto`, changeFrequency: "monthly", priority: 0.6 },
  ];

  try {
    const productsPage = await getProducts(0, 500);

    const productRoutes: MetadataRoute.Sitemap = productsPage.items.map((product) => ({
      url: `${SITE_URL}/producto/${product.id}`,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [...staticRoutes, ...productRoutes];
  } catch {
    return staticRoutes;
  }
}
