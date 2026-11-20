import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface-subtle">
      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-lg rounded-2xl border border-border bg-card px-6 py-16 text-center">
          <p className="mb-2 font-heading text-5xl text-brand">404</p>
          <h1 className="mb-3 text-3xl text-foreground">No encontramos esta página</h1>
          <p className="mb-8 font-sans text-content-muted">
            El enlace puede estar desactualizado o el producto ya no está disponible.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button render={<Link href="/productos" />}>Ver productos</Button>
            <Button variant="outline" render={<Link href="/" />}>
              Ir al inicio
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
