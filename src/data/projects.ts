export type ContentBlock =
  | { type: "heading"; text: string; size?: "lg" | "sm" }
  | { type: "text"; body: string }
  | { type: "image"; src: string; alt?: string; caption?: string; full?: boolean }
  | { type: "gallery"; images: { src: string; alt?: string }[] }
  | { type: "label"; text: string }
  | { type: "metrics"; items: { value: string; label: string }[] }
  | { type: "divider" };

export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  image: string;
  size: "normal" | "tall" | "wide";
  blocks: ContentBlock[];
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "interior-warm",
    title: "Interior Warm",
    category: "Design",
    size: "normal",
    image:
      "https://images.unsplash.com/photo-1667312939978-64cf31718a6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwaW50ZXJpb3IlMjBkZXNpZ24lMjB3YXJtJTIwYmVpZ2V8ZW58MXx8fHwxNzczMzUzMjY5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    blocks: [
      { type: "label", text: "Design · 2024" },
      { type: "heading", text: "Interior Warm", size: "lg" },
      { type: "text", body: "Descrição do projeto aqui." },
      { type: "divider" },
      { type: "label", text: "Visão Geral" },
      { type: "text", body: "Conteúdo do case aqui." },
    ],
  },
  {
    id: 2,
    slug: "sand-texture",
    title: "Sand Texture",
    category: "Abstract",
    size: "tall",
    image:
      "https://images.unsplash.com/photo-1595134825328-c82cccaf5f5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRleHR1cmUlMjB3YXJtJTIwc2FuZCUyMGRlc2VydHxlbnwxfHx8fDE3NzMzNTMyNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    blocks: [
      { type: "label", text: "Abstract · 2024" },
      { type: "heading", text: "Sand Texture", size: "lg" },
      { type: "text", body: "Descrição do projeto aqui." },
      { type: "divider" },
      { type: "label", text: "Visão Geral" },
      { type: "text", body: "Conteúdo do case aqui." },
    ],
  },
  {
    id: 3,
    slug: "architecture",
    title: "Architecture",
    category: "Urban",
    size: "normal",
    image:
      "https://images.unsplash.com/photo-1671250056971-49b560c1a3af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmUlMjBtb2Rlcm4lMjBidWlsZGluZyUyMGZhY2FkZXxlbnwxfHx8fDE3NzMzNTMyNzF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    blocks: [
      { type: "label", text: "Urban · 2024" },
      { type: "heading", text: "Architecture", size: "lg" },
      { type: "text", body: "Descrição do projeto aqui." },
      { type: "divider" },
      { type: "label", text: "Visão Geral" },
      { type: "text", body: "Conteúdo do case aqui." },
    ],
  },
  {
    id: 4,
    slug: "luxury-still",
    title: "Luxury Still",
    category: "Editorial",
    size: "tall",
    image:
      "https://images.unsplash.com/photo-1757313239816-9bac11170af8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwcm9kdWN0JTIwc3RpbGwlMjBsaWZlJTIwZWRpdG9yaWFsfGVufDF8fHx8MTc3MzM1MzI3Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    blocks: [
      { type: "label", text: "Editorial · 2024" },
      { type: "heading", text: "Luxury Still", size: "lg" },
      { type: "text", body: "Descrição do projeto aqui." },
      { type: "divider" },
      { type: "label", text: "Visão Geral" },
      { type: "text", body: "Conteúdo do case aqui." },
    ],
  },
  {
    id: 5,
    slug: "botanical",
    title: "Botanical",
    category: "Nature",
    size: "normal",
    image:
      "https://images.unsplash.com/photo-1771024511893-1e08cad8f3b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBtaW5pbWFsJTIwYm90YW5pY2FsJTIwbGVhZnxlbnwxfHx8fDE3NzMzNTMyNzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    blocks: [
      { type: "label", text: "Nature · 2024" },
      { type: "heading", text: "Botanical", size: "lg" },
      { type: "text", body: "Descrição do projeto aqui." },
      { type: "divider" },
      { type: "label", text: "Visão Geral" },
      { type: "text", body: "Conteúdo do case aqui." },
    ],
  },
  {
    id: 6,
    slug: "fashion",
    title: "Fashion",
    category: "Portrait",
    size: "normal",
    image:
      "https://images.unsplash.com/photo-1704915049592-d41831fb93c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwZWRpdG9yaWFsJTIwcG9ydHJhaXQlMjB3YXJtJTIwdG9uZXxlbnwxfHx8fDE3NzMzNTMyNzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    blocks: [
      { type: "label", text: "Portrait · 2024" },
      { type: "heading", text: "Fashion", size: "lg" },
      { type: "text", body: "Descrição do projeto aqui." },
      { type: "divider" },
      { type: "label", text: "Visão Geral" },
      { type: "text", body: "Conteúdo do case aqui." },
    ],
  },
  {
    id: 7,
    slug: "minimal-objects",
    title: "Minimal Objects",
    category: "Abstract",
    size: "normal",
    image:
      "https://plus.unsplash.com/premium_photo-1676955435336-9d22534fc1cf?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    blocks: [
      { type: "label", text: "Abstract · 2024" },
      { type: "heading", text: "Minimal Objects", size: "lg" },
      { type: "text", body: "Descrição do projeto aqui." },
      { type: "divider" },
      { type: "label", text: "Visão Geral" },
      { type: "text", body: "Conteúdo do case aqui." },
    ],
  }
];
