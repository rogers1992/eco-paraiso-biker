import Link from "next/link";
import { ArrowRight, Bike } from "lucide-react";
import { Card } from "@/components/ui/card";

interface CategoryItem {
  id: number;
  name: string;
  description?: string;
}

interface CategoriesGridProps {
  categories: CategoryItem[];
}

export function CategoriesGrid({ categories }: CategoriesGridProps) {
  return (
    <section className="bg-surface-subtle py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl text-foreground md:text-4xl">Categorías</h2>
          <p className="mx-auto max-w-2xl font-sans text-content-muted">
            Explora nuestra gama de accesorios para motociclistas
          </p>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {categories.slice(0, 8).map((category) => (
            <Link key={category.id} href={`/productos?categoria=${category.id}`} className="group">
              <Card className="h-full p-6 text-center transition-colors duration-200 hover:border-brand hover:bg-brand-50">
                <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-brand/10 transition-colors group-hover:bg-brand">
                  <Bike
                    aria-hidden="true"
                    className="size-6 text-brand transition-colors group-hover:text-white"
                  />
                </div>
                <h3 className="line-clamp-1 font-sans text-sm font-semibold text-foreground transition-colors group-hover:text-action">
                  {category.name}
                </h3>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/categorias"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-action px-6 text-sm font-bold text-action transition-colors hover:bg-action hover:text-white"
          >
            Ver todas las categorías
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
