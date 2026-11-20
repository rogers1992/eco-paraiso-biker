"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Product } from "@/lib/api";
import {
  addToCart as addToCartItem,
  cartItemCount,
  cartSubtotal,
  commitCart,
  getCartSnapshot,
  getServerCartSnapshot,
  removeFromCart as removeCartItem,
  subscribeToCart,
  updateQuantity as updateCartQuantity,
  type CartItem,
} from "@/lib/cart";

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateItemQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(
    subscribeToCart,
    getCartSnapshot,
    getServerCartSnapshot
  );
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((product: Product, quantity = 1) => {
    const maxStock =
      typeof product.stock === "number" ? product.stock : undefined;

    commitCart(
      addToCartItem(
        getCartSnapshot(),
        {
          productId: product.id,
          name: product.name,
          unitPrice: product.unit_price,
          quantity: 1,
          imageUrl: product.image_url,
          categoryName: product.category_name,
          maxStock,
        },
        quantity
      )
    );
  }, []);

  const removeItem = useCallback((productId: number) => {
    commitCart(removeCartItem(getCartSnapshot(), productId));
  }, []);

  const updateItemQuantity = useCallback(
    (productId: number, quantity: number) => {
      commitCart(updateCartQuantity(getCartSnapshot(), productId, quantity));
    },
    []
  );

  const clearCart = useCallback(() => commitCart([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totalItems: cartItemCount(items),
      subtotal: cartSubtotal(items),
      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      updateItemQuantity,
      clearCart,
    }),
    [
      items,
      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      updateItemQuantity,
      clearCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return context;
}
