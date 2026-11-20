import { BUSINESS } from "./business";

export const BRAND = {
  name: "Paraiso Biker",
  tagline: "Accesorios que marcan la diferencia",
  heroTagline: "Innovación sobre dos ruedas",
  colors: {
    orange: "#fc5c06",
    orangeStrong: "#c24500",
    dark: "#2a2f29",
    cream: "#fffff3",
    whatsapp: "#12874a",
    whatsappHover: "#0f6b38",
  },
} as const;

export const WHATSAPP = {
  number: BUSINESS.phoneRaw,
  message: "Hola, me interesa información sobre sus productos",
  get url() {
    return `https://wa.me/${this.number}?text=${encodeURIComponent(this.message)}`;
  },
};

export const SOCIAL_LINKS = {
  tiktok: "https://www.tiktok.com/@paraiso.biker",
} as const;

export const IMAGE_BASE_URL =
  "https://edcsmiayfqbmsdgqxdjv.supabase.co/storage/v1/object/public/paraiso_biker/products/";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://fastapi-backend-pb.onrender.com/api";

export const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/productos", label: "Productos" },
  { href: "/categorias", label: "Categorías" },
  { href: "/contacto", label: "Contacto" },
] as const;
