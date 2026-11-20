import { API_URL, IMAGE_BASE_URL } from "./constants";

export { API_URL, IMAGE_BASE_URL };

export function getImageUrl(filename: string): string {
  if (!filename) return "";
  if (filename.startsWith("http")) return filename;
  return `${IMAGE_BASE_URL}${filename}`;
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  barcode?: string;
  description?: string;
  unit_price: number;
  weight?: number;
  image_url?: string;
  category_id: number;
  category_name?: string | null;
  supplier_id?: number;
  is_active: boolean;
  stock?: number;
  in_stock?: boolean;
  created_at: string;
  updated_at?: string;
  current_cost?: number | null;
  images?: ProductImage[];
}

export interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
  is_primary: boolean;
  sort_order: number;
  created_at?: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  created_at: string;
}

export interface PaginatedProductsResponse {
  items: Product[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface ContactFormResponse {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

const FETCH_TIMEOUT = 15000;

async function fetchWithTimeout(url: string, options: RequestInit = {}): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return res;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function getProducts(
  skip = 0,
  limit = 20,
  search?: string,
  categoryId?: number,
  sortBy?: string,
  order?: string
): Promise<PaginatedProductsResponse> {
  const params = new URLSearchParams({
    skip: String(skip),
    limit: String(limit),
  });
  if (search) params.set("search", search);
  if (categoryId !== undefined) params.set("category_id", String(categoryId));
  if (sortBy) params.set("sort_by", sortBy);
  if (order) params.set("order", order);

  let res: Response;
  try {
    res = await fetchWithTimeout(`${API_URL}/public/products?${params}`);
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("La solicitud tardó demasiado. El servidor puede estar inactivo.");
    }
    throw new Error("No se pudo conectar al servidor.");
  }

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  return res.json();
}

export async function getProduct(id: number): Promise<Product> {
  let res: Response;
  try {
    res = await fetchWithTimeout(`${API_URL}/public/products/${id}`);
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("La solicitud tardó demasiado. El servidor puede estar inactivo.");
    }
    throw new Error("No se pudo conectar al servidor.");
  }

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  return res.json();
}

export async function getCategories(): Promise<Category[]> {
  let res: Response;
  try {
    res = await fetchWithTimeout(`${API_URL}/public/categories`);
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("La solicitud tardó demasiado. El servidor puede estar inactivo.");
    }
    throw new Error("No se pudo conectar al servidor.");
  }

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  return res.json();
}

export async function submitContactForm(data: ContactFormData): Promise<ContactFormResponse> {
  let res: Response;
  try {
    res = await fetchWithTimeout(`${API_URL}/public/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("La solicitud tardó demasiado. El servidor puede estar inactivo.");
    }
    throw new Error("No se pudo conectar al servidor.");
  }

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  return res.json();
}
