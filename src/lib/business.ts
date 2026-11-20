export interface PhoneEntry {
  display: string;
  raw: string;
  label?: string;
}

export const BUSINESS = {
  name: "Paraiso Biker",
  phone: "+591 639 61429",
  phoneRaw: "59163961429",
  phones: [
    { display: "+591 639 61429", raw: "59163961429", label: "Celular" },
  ] as PhoneEntry[],
  email: "info@paraisobiker.com",
  address: {
    street: "Av Blanco Galindo km 2, Av. D Campos y Sarmiento",
    city: "Cochabamba",
    country: "Bolivia",
  },
  hours: [
    { day: "Lunes a viernes", hours: "9:00 – 19:00" },
    { day: "Sábado", hours: "9:00 – 18:00" },
    { day: "Domingo", hours: "10:00 – 14:00" },
  ],
} as const;

export interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
  date?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Carlos Mendoza",
    text: "Excelente atención y productos de primera calidad. Los accesorios que compré superaron mis expectativas. 100% recomendado.",
    rating: 5,
    date: "Hace 2 semanas",
  },
  {
    id: 2,
    name: "María Fernanda López",
    text: "Llevo años comprando en Paraiso Biker y siempre encuentro lo que necesito. El equipo es muy conocedor y me ayuda a elegir lo mejor para mi moto.",
    rating: 5,
    date: "Hace 1 mes",
  },
  {
    id: 3,
    name: "Roberto Sánchez",
    text: "Precios competitivos y productos originales. El servicio posventa es increíble. Mi taller de confianza para accesorios de moto.",
    rating: 5,
    date: "Hace 3 meses",
  },
];

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
