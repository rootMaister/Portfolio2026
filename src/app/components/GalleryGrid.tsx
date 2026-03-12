import { useState } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface GalleryItem {
  id: number;
  image: string;
  title: string;
  category: string;
  size: "normal" | "tall" | "wide";
}

const items: GalleryItem[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1667312939978-64cf31718a6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwaW50ZXJpb3IlMjBkZXNpZ24lMjB3YXJtJTIwYmVpZ2V8ZW58MXx8fHwxNzczMzUzMjY5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Interior Warm",
    category: "Design",
    size: "normal",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1595134825328-c82cccaf5f5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRleHR1cmUlMjB3YXJtJTIwc2FuZCUyMGRlc2VydHxlbnwxfHx8fDE3NzMzNTMyNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Sand Texture",
    category: "Abstract",
    size: "tall",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1671250056971-49b560c1a3af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmUlMjBtb2Rlcm4lMjBidWlsZGluZyUyMGZhY2FkZXxlbnwxfHx8fDE3NzMzNTMyNzF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Architecture",
    category: "Urban",
    size: "normal",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1757313239816-9bac11170af8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwcm9kdWN0JTIwc3RpbGwlMjBsaWZlJTIwZWRpdG9yaWFsfGVufDF8fHx8MTc3MzM1MzI3Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Luxury Still",
    category: "Editorial",
    size: "tall",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1771024511893-1e08cad8f3b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBtaW5pbWFsJTIwYm90YW5pY2FsJTIwbGVhZnxlbnwxfHx8fDE3NzMzNTMyNzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Botanical",
    category: "Nature",
    size: "normal",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1704915049592-d41831fb93c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwZWRpdG9yaWFsJTIwcG9ydHJhaXQlMjB3YXJtJTIwdG9uZXxlbnwxfHx8fDE3NzMzNTMyNzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Fashion",
    category: "Portrait",
    size: "normal",
  },
];

interface GalleryGridProps {
  onHoverChange: (isHovering: boolean) => void;
}

export function GalleryGrid({ onHoverChange }: GalleryGridProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const handleEnter = (id: number) => {
    setHoveredId(id);
    onHoverChange(true);
  };

  const handleLeave = () => {
    setHoveredId(null);
    onHoverChange(false);
  };

  return (
    <div
      className="grid gap-3 w-full"
      style={{
        gridTemplateColumns: "repeat(3, 1fr)",
        gridAutoRows: "260px",
      }}
    >
      {items.map((item, index) => {
        const isHovered = hoveredId === item.id;
        const gridStyle: React.CSSProperties = {};
        if (item.size === "tall") gridStyle.gridRow = "span 2";
        if (item.size === "wide") gridStyle.gridColumn = "span 2";

        return (
          <motion.div
            key={item.id}
            className="relative overflow-hidden rounded-[4px] cursor-none"
            style={gridStyle}
            onMouseEnter={() => handleEnter(item.id)}
            onMouseLeave={handleLeave}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Background Thumbnail fallback color */}
            <div className="absolute inset-0 bg-[#ddbb95]" />

            {/* Image */}
            <motion.div
              className="absolute inset-0"
              animate={{ scale: isHovered ? 1.06 : 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Dark overlay on hover */}
            <motion.div
              className="absolute inset-0 bg-black"
              animate={{ opacity: isHovered ? 0.45 : 0 }}
              transition={{ duration: 0.4 }}
            />

            {/* Info overlay */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-1"
              animate={{ y: isHovered ? 0 : 12, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <span
                className="text-[#ddbb95] uppercase tracking-[0.15em]"
                style={{ fontSize: "10px", fontWeight: 500 }}
              >
                {item.category}
              </span>
              <span className="text-white" style={{ fontSize: "18px", fontWeight: 500 }}>
                {item.title}
              </span>
            </motion.div>

            {/* Corner accent */}
            <motion.div
              className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[#ddbb95]"
              animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.6 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}