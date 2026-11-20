"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, ShoppingBag } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { BRAND, NAV_LINKS } from "@/lib/constants";
import { useCart } from "@/context/CartContext";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <nav aria-label="Navegación principal" className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-heading text-xl text-action">{BRAND.name}</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm font-medium transition-colors ${
                  active
                    ? "font-semibold text-action underline underline-offset-4"
                    : "text-content-muted hover:text-action"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <button
            type="button"
            onClick={openCart}
            className="relative inline-flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-surface-subtle"
          >
            <ShoppingBag aria-hidden="true" className="size-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-action px-1 text-[11px] font-bold text-white">
                {totalItems}
              </span>
            )}
            <span className="sr-only">
              Abrir carrito{totalItems > 0 ? `, ${totalItems} productos` : ""}
            </span>
          </button>
          <Link
            href="/productos"
            className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-action px-5 text-sm font-bold text-white transition-colors hover:bg-action-hover"
          >
            <ShoppingBag aria-hidden="true" className="size-4" />
            Ver tienda
          </Link>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <button
            type="button"
            onClick={openCart}
            className="relative inline-flex size-11 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-surface-subtle"
          >
            <ShoppingBag aria-hidden="true" className="size-6" />
            {totalItems > 0 && (
              <span className="absolute top-1 right-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-action px-1 text-[11px] font-bold text-white">
                {totalItems}
              </span>
            )}
            <span className="sr-only">
              Abrir carrito{totalItems > 0 ? `, ${totalItems} productos` : ""}
            </span>
          </button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-surface-subtle">
              <Menu aria-hidden="true" className="size-6" />
              <span className="sr-only">Abrir menú de navegación</span>
            </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
              <SheetDescription className="sr-only">{BRAND.tagline}</SheetDescription>
              <p className="font-heading text-xl text-action">{BRAND.name}</p>
              <p className="-mt-2 text-xs text-content-muted">{BRAND.tagline}</p>
            </SheetHeader>
            <div className="mt-6 flex flex-col gap-1 overflow-y-auto">
              {NAV_LINKS.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-11 items-center rounded-lg px-3 text-base font-medium transition-colors ${
                      active
                        ? "font-semibold text-action"
                        : "text-content-muted hover:bg-surface-subtle hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="mt-4 border-t border-border pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    openCart();
                  }}
                  className="flex min-h-11 w-full items-center justify-between rounded-lg px-3 text-base font-medium transition-colors hover:bg-surface-subtle"
                >
                  <span className="flex items-center gap-2">
                    <ShoppingBag aria-hidden="true" className="size-5" />
                    Carrito
                  </span>
                  {totalItems > 0 && (
                    <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-action px-1.5 text-xs font-bold text-white">
                      {totalItems}
                    </span>
                  )}
                </button>
              </div>
              <div className="mt-2 border-t border-border pt-4">
                <Link
                  href="/productos"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-action px-4 text-sm font-bold text-white transition-colors hover:bg-action-hover"
                >
                  <ShoppingBag aria-hidden="true" className="size-4" />
                  Ver tienda
                </Link>
              </div>
            </div>
          </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
