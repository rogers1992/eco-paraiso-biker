import {
  Bike,
  Cog,
  Gauge,
  Shield,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  helmets: Shield,
  cascos: Shield,
  accesorios: Wrench,
  accessories: Wrench,
  motorcycles: Bike,
  motos: Bike,
  parts: Cog,
  repuestos: Cog,
  proteccion: Shield,
  protección: Shield,
  instrumentos: Gauge,
};

export function getCategoryIcon(name: string): LucideIcon {
  return CATEGORY_ICONS[name.trim().toLowerCase()] ?? Bike;
}
