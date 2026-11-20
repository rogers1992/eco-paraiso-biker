import type { Metadata } from "next";
import { ProductosClient } from "@/components/catalog/ProductosClient";
import {
  parseCategory,
  parsePage,
  parseSort,
  type CatalogInitialState,
} from "@/lib/catalogParams";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Catálogo de accesorios para motociclistas: cascos, protecciones, guantes y más. Filtra por categoría y encuentra el equipo ideal para tu moto.",
  alternates: {
    canonical: "/productos",
  },
  openGraph: {
    title: `Productos | ${BRAND.name}`,
    description:
      "Accesorios para motociclistas de alta calidad. Filtra por categoría y encuentra el equipo ideal para tu moto.",
    url: "/productos",
    type: "website",
  },
};

type SearchParams = Record<string, string | string[] | undefined>;

function readParam(params: SearchParams, key: string): string | null {
  const value = params[key];
  if (Array.isArray(value)) return value[0] ?? null;
  return value ?? null;
}

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const initialState: CatalogInitialState = {
    search: readParam(params, "search")?.trim() ?? "",
    categoryId: parseCategory(readParam(params, "categoria")),
    sortValue: parseSort(readParam(params, "sort"), readParam(params, "order")),
    page: parsePage(readParam(params, "page")),
  };

  return <ProductosClient initialState={initialState} />;
}
