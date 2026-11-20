"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-surface-subtle">
      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-lg rounded-2xl border border-border bg-card px-6 py-16 text-center">
          <h1 className="mb-3 text-3xl text-foreground">Algo salió mal</h1>
          <p className="mb-8 font-sans text-content-muted">
            No pudimos cargar el contenido. Revisa tu conexión e inténtalo de nuevo.
          </p>
          <Button onClick={reset}>Reintentar</Button>
        </div>
      </div>
    </div>
  );
}
