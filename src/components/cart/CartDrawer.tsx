"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { useCart } from "@/context/CartContext";
import { buildWhatsAppMessage } from "@/lib/cart";
import { formatCurrency } from "@/lib/format";
import { getImageUrl } from "@/lib/api";
import { WHATSAPP } from "@/lib/constants";

export function CartDrawer() {
  const {
    items,
    totalItems,
    subtotal,
    isOpen,
    closeCart,
    removeItem,
    updateItemQuantity,
    clearCart,
  } = useCart();

  const whatsappUrl = `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(
    buildWhatsAppMessage(items)
  )}`;

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) closeCart();
      }}
    >
      <SheetContent
        side="right"
        className="w-[min(92vw,26rem)] max-w-[calc(100vw-2rem)] gap-0 p-0"
      >
        <SheetHeader className="border-b border-border p-4 pr-12">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag aria-hidden="true" className="size-5 text-action" />
            Carrito
            {totalItems > 0 && (
              <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-action px-1.5 text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </SheetTitle>
          <SheetDescription>
            {totalItems === 1
              ? "1 producto en tu carrito"
              : `${totalItems} productos en tu carrito`}
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-12 text-center">
            <ShoppingBag
              aria-hidden="true"
              className="size-12 text-content-muted/50"
            />
            <p className="text-content-muted">
              Tu carrito está vacío. Agrega productos para cotizar por WhatsApp.
            </p>
            <Button render={<Link href="/productos" />} onClick={closeCart}>
              Ver productos
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              <ul className="flex flex-col gap-4">
                {items.map((item) => {
                  const imageUrl = getImageUrl(item.imageUrl ?? "");
                  const limit =
                    typeof item.maxStock === "number"
                      ? item.maxStock
                      : Number.POSITIVE_INFINITY;

                  return (
                    <li
                      key={item.productId}
                      className="flex gap-3 border-b border-border pb-4 last:border-b-0 last:pb-0"
                    >
                      <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-surface-subtle">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={item.name}
                            fill
                            sizes="80px"
                            className="object-contain p-1.5"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <ShoppingBag
                              aria-hidden="true"
                              className="size-6 text-content-muted/50"
                            />
                          </div>
                        )}
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col">
                        <p className="mb-1 line-clamp-2 text-sm font-semibold text-foreground">
                          {item.name}
                        </p>
                        <p className="mb-2 text-sm font-bold text-action">
                          {formatCurrency(item.unitPrice)}
                        </p>

                        <div className="mt-auto flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1 rounded-full border border-border">
                            <button
                              type="button"
                              onClick={() =>
                                updateItemQuantity(item.productId, item.quantity - 1)
                              }
                              className="inline-flex size-8 items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface-subtle"
                              aria-label={`Quitar una unidad de ${item.name}`}
                            >
                              <Minus aria-hidden="true" className="size-4" />
                            </button>
                            <span
                              aria-live="polite"
                              className="min-w-6 text-center text-sm font-bold"
                            >
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateItemQuantity(item.productId, item.quantity + 1)
                              }
                              disabled={item.quantity >= limit}
                              className="inline-flex size-8 items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface-subtle disabled:pointer-events-none disabled:opacity-40"
                              aria-label={`Agregar una unidad de ${item.name}`}
                            >
                              <Plus aria-hidden="true" className="size-4" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.productId)}
                            className="inline-flex size-9 items-center justify-center rounded-full text-content-muted transition-colors hover:bg-destructive/10 hover:text-destructive"
                            aria-label={`Eliminar ${item.name} del carrito`}
                          >
                            <Trash2 aria-hidden="true" className="size-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <SheetFooter className="gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-content-muted">Total</span>
                <span className="font-heading text-xl text-action">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <Button
                render={<a href={whatsappUrl} target="_blank" rel="noopener noreferrer" />}
                variant="whatsapp"
                className="w-full"
              >
                <WhatsAppIcon className="size-5" />
                Consultar por WhatsApp
              </Button>
              <button
                type="button"
                onClick={clearCart}
                className="text-center text-sm font-semibold text-action underline-offset-4 hover:underline"
              >
                Vaciar carrito
              </button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
