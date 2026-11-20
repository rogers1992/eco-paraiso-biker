"use client";

import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_SORT,
  parseCategory,
  parsePage,
  parseSort,
  type CatalogInitialState,
} from "@/lib/catalogParams";

export {
  DEFAULT_SORT,
  SORT_OPTIONS,
  parseCategory,
  parsePage,
  parseSort,
  type CatalogInitialState,
} from "@/lib/catalogParams";

export interface CatalogFilterState extends CatalogInitialState {
  /** Valor del campo de búsqueda mientras se escribe. */
  searchInput: string;
  activeFilterCount: number;
  setSearchInput: (value: string) => void;
  removeSearch: () => void;
  setCategory: (value: number | null) => void;
  setSort: (value: string) => void;
  setPage: (value: number) => void;
  clearAll: () => void;
}

/**
 * Estado del catálogo sincronizado con la URL.
 *
 * El estado inicial llega desde el servidor (para que la página se renderice
 * con contenido en el HTML) y los cambios posteriores se reflejan en la URL
 * con `history.replaceState`, sin provocar navegaciones ni recargas.
 */
export function useCatalogFilters(initial: CatalogInitialState): CatalogFilterState {
  const [search, setSearch] = useState(initial.search);
  const [searchInput, setSearchInputState] = useState(initial.search);
  const [categoryId, setCategoryId] = useState<number | null>(initial.categoryId);
  const [sortValue, setSortValue] = useState(initial.sortValue);
  const [page, setPageState] = useState(initial.page);

  // Búsqueda con retardo: evita una petición por pulsación de teclado.
  useEffect(() => {
    if (searchInput.trim() === search) return;
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
      setPageState(1);
    }, 350);
    return () => clearTimeout(timer);
  }, [searchInput, search]);

  // Refleja el estado en la URL.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (categoryId) params.set("categoria", String(categoryId));
    if (sortValue !== DEFAULT_SORT) {
      const [sort, order] = sortValue.split("-");
      params.set("sort", sort);
      params.set("order", order);
    }
    if (page > 1) params.set("page", String(page));

    const query = params.toString();
    const nextUrl = `${window.location.pathname}${query ? `?${query}` : ""}`;
    const currentUrl = `${window.location.pathname}${window.location.search}`;

    if (nextUrl !== currentUrl) {
      window.history.replaceState(null, "", nextUrl);
    }
  }, [search, categoryId, sortValue, page]);

  // Mantiene el estado sincronizado con el historial del navegador.
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const nextSearch = params.get("search") ?? "";
      setSearch(nextSearch);
      setSearchInputState(nextSearch);
      setCategoryId(parseCategory(params.get("categoria")));
      setSortValue(parseSort(params.get("sort"), params.get("order")));
      setPageState(parsePage(params.get("page")));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const setSearchInput = useCallback((value: string) => {
    setSearchInputState(value);
  }, []);

  const removeSearch = useCallback(() => {
    setSearchInputState("");
    setSearch("");
    setPageState(1);
  }, []);

  const setCategory = useCallback((value: number | null) => {
    setCategoryId(value);
    setPageState(1);
  }, []);

  const setSort = useCallback((value: string) => {
    setSortValue(value);
    setPageState(1);
  }, []);

  const setPage = useCallback((value: number) => {
    setPageState(Math.max(1, value));
  }, []);

  const clearAll = useCallback(() => {
    setSearchInputState("");
    setSearch("");
    setCategoryId(null);
    setSortValue(DEFAULT_SORT);
    setPageState(1);
  }, []);

  const activeFilterCount =
    (categoryId !== null ? 1 : 0) + (sortValue !== DEFAULT_SORT ? 1 : 0) + (search ? 1 : 0);

  return {
    search,
    searchInput,
    categoryId,
    sortValue,
    page,
    activeFilterCount,
    setSearchInput,
    removeSearch,
    setCategory,
    setSort,
    setPage,
    clearAll,
  };
}
