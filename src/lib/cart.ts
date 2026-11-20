import { formatCurrency } from "./format";

export interface CartItem {
  productId: number;
  name: string;
  unitPrice: number;
  quantity: number;
  imageUrl?: string;
  categoryName?: string | null;
  maxStock?: number;
}

const STORAGE_KEY = "paraiso-biker-cart";
const EMPTY_CART: CartItem[] = [];

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function isValidItem(value: unknown): value is CartItem {
  if (typeof value !== "object" || value === null) return false;
  const item = value as Partial<CartItem>;
  return (
    typeof item.productId === "number" &&
    Number.isFinite(item.productId) &&
    typeof item.name === "string" &&
    typeof item.unitPrice === "number" &&
    Number.isFinite(item.unitPrice) &&
    typeof item.quantity === "number" &&
    Number.isFinite(item.quantity) &&
    item.quantity > 0
  );
}

function readStoredCart(): CartItem[] {
  if (!isBrowser()) return EMPTY_CART;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_CART;

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY_CART;

    return parsed.filter(isValidItem).map((item) => ({
      ...item,
      quantity: Math.max(1, Math.floor(item.quantity)),
      maxStock:
        typeof item.maxStock === "number" && item.maxStock >= 0
          ? item.maxStock
          : undefined,
    }));
  } catch {
    return EMPTY_CART;
  }
}

function writeStoredCart(items: CartItem[]): void {
  if (!isBrowser()) return;

  try {
    if (items.length === 0) {
      window.localStorage.removeItem(STORAGE_KEY);
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Cuota excedida o modo privado: el carrito sigue funcionando en memoria.
  }
}

/* -------------------------------------------------------------------------- */
/* Store externo: el carrito vive en localStorage y se notifica a React.      */
/* -------------------------------------------------------------------------- */

let cache: CartItem[] | null = null;
const listeners = new Set<() => void>();

function emitChange(): void {
  listeners.forEach((listener) => listener());
}

export function getCartSnapshot(): CartItem[] {
  if (!isBrowser()) return EMPTY_CART;
  if (cache === null) cache = readStoredCart();
  return cache;
}

export function getServerCartSnapshot(): CartItem[] {
  return EMPTY_CART;
}

export function subscribeToCart(listener: () => void): () => void {
  listeners.add(listener);

  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      cache = null;
      emitChange();
    }
  };

  window.addEventListener("storage", handleStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

export function commitCart(items: CartItem[]): void {
  cache = items;
  writeStoredCart(items);
  emitChange();
}

/* -------------------------------------------------------------------------- */
/* Operaciones del carrito                                                     */
/* -------------------------------------------------------------------------- */

export function addToCart(
  items: CartItem[],
  item: CartItem,
  amount = 1
): CartItem[] {
  const step = Math.max(1, Math.floor(amount));
  const existing = items.find((entry) => entry.productId === item.productId);

  if (!existing) {
    const limit =
      typeof item.maxStock === "number" ? item.maxStock : Number.POSITIVE_INFINITY;
    const quantity = Math.min(step, limit);
    return quantity <= 0 ? items : [...items, { ...item, quantity }];
  }

  const limit =
    typeof item.maxStock === "number"
      ? item.maxStock
      : typeof existing.maxStock === "number"
        ? existing.maxStock
        : Number.POSITIVE_INFINITY;

  const quantity = Math.min(existing.quantity + step, limit);
  if (quantity === existing.quantity) return items;

  return items.map((entry) =>
    entry.productId === item.productId ? { ...entry, quantity } : entry
  );
}

export function removeFromCart(items: CartItem[], productId: number): CartItem[] {
  return items.filter((item) => item.productId !== productId);
}

export function updateQuantity(
  items: CartItem[],
  productId: number,
  quantity: number
): CartItem[] {
  if (quantity <= 0) return removeFromCart(items, productId);

  return items.map((item) => {
    if (item.productId !== productId) return item;
    const limit =
      typeof item.maxStock === "number" ? item.maxStock : Number.POSITIVE_INFINITY;
    return { ...item, quantity: Math.min(Math.floor(quantity), limit) };
  });
}

export function cartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
}

export function cartItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function buildWhatsAppMessage(items: CartItem[]): string {
  const lines = items.map((item, index) => {
    const unit = `${item.quantity} x ${formatCurrency(item.unitPrice)}`;
    const subtotal = formatCurrency(item.unitPrice * item.quantity);
    return `${index + 1}. ${item.name} — ${unit} — ${subtotal}`;
  });

  return [
    "Hola, quiero confirmar el siguiente pedido:",
    "",
    ...lines,
    "",
    `Total: ${formatCurrency(cartSubtotal(items))}`,
  ].join("\n");
}
