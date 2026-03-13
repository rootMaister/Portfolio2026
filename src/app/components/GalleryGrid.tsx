import { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { projects } from "../../data/projects";

interface GalleryGridProps {
  onHoverChange: (isHovering: boolean) => void;
  onProjectClick: (id: number) => void;
}

export function GalleryGrid({ onHoverChange, onProjectClick }: GalleryGridProps) {
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
    <ResponsiveMasonry columnsCountBreakPoints={{ 640: 1, 1024: 2, 1280: 3 }}>
      <Masonry gutter="12px">
        {projects.map((item, index) => {
          const isHovered = hoveredId === item.id;

          return (
            <motion.div
              key={item.id}
              className="relative overflow-hidden rounded-[4px] cursor-none"
              onMouseEnter={() => handleEnter(item.id)}
              onMouseLeave={handleLeave}
              onClick={() => onProjectClick(item.id)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Image — natural proportions */}
              <motion.div
                animate={{ scale: isHovered ? 1.04 : 1 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto block"
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
                  className="text-[#fff] uppercase tracking-[0.15em]"
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
                className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[#fff]"
                animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.6 }}
                transition={{ duration: 0.3, delay: 0.05 }}
              />
            </motion.div>
          );
        })}
      </Masonry>
    </ResponsiveMasonry>
  );
}
