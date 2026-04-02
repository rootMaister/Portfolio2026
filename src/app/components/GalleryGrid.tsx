import { useEffect, useRef, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { projects, type Project } from "../../data/projects";
import { useLang } from "../../context/LanguageContext";

interface GalleryGridProps {
  onHoverChange: (isHovering: boolean) => void;
  onProjectClick: (id: number) => void;
}

interface CardProps {
  item: Project;
  index: number;
  onHoverChange: (isHovering: boolean) => void;
  onProjectClick: (id: number) => void;
}

function GalleryCard({ item, index, onHoverChange, onProjectClick }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { lang } = useLang();
  const title = lang === "en" ? item.titleEn : item.title;
  const videoRef = useRef<HTMLVideoElement>(null);
  const gifImgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Draw first frame of GIF to canvas on mount (static placeholder)
  useEffect(() => {
    if (!item.gif || !canvasRef.current) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext("2d")?.drawImage(img, 0, 0);
    };
    img.src = item.gif;
  }, [item.gif]);

  // Show first frame of video on mount (for touch devices where hover never fires)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !item.video) return;
    const show = () => { video.currentTime = 0.001; };
    video.addEventListener("loadeddata", show);
    if (video.readyState >= 2) show();
    return () => video.removeEventListener("loadeddata", show);
  }, [item.video]);

  const handleEnter = () => {
    setIsHovered(true);
    onHoverChange(true);
    // Video
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
    // GIF — set src to trigger play from frame 1
    if (gifImgRef.current && item.gif) {
      gifImgRef.current.src = item.gif;
    }
  };

  const handleLeave = () => {
    setIsHovered(false);
    onHoverChange(false);
    // Video
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    // GIF — clear src so next hover restarts from frame 1
    if (gifImgRef.current) {
      gifImgRef.current.src = "";
    }
  };

  const hasStaticBase = item.image;

  return (
    <motion.div
      className="relative overflow-hidden rounded-[4px] cursor-none"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onTouchStart={handleEnter}
      onClick={() => onProjectClick(item.id)}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Thumbnail */}
      <motion.div
        animate={{ scale: isHovered ? 1.04 : 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative"
      >
        {/* Static image */}
        {item.image && (
          <ImageWithFallback
            src={item.image}
            alt={item.title}
            className="w-full h-auto max-h-[56.25rem] object-contain block"
          />
        )}

        {/* GIF — canvas shows first frame at idle, img plays on hover */}
        {item.gif && (
          <>
            <canvas
              ref={canvasRef}
              className={
                hasStaticBase
                  ? "absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                  : "w-full h-auto block"
              }
              style={hasStaticBase ? { opacity: isHovered ? 0 : 1 } : undefined}
            />
            <img
              ref={gifImgRef}
              alt={item.title}
              className={
                hasStaticBase
                  ? "absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                  : "absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              }
              style={{ opacity: isHovered ? 1 : 0 }}
            />
          </>
        )}

        {/* Video */}
        {item.video && (
          <video
            ref={videoRef}
            src={item.video}
            muted
            playsInline
            preload="metadata"
            className={hasStaticBase ? "absolute inset-0 w-full h-full object-cover transition-opacity duration-500" : "w-full h-auto max-h-[56.25rem] object-contain block"}
            style={hasStaticBase ? { opacity: isHovered ? 1 : 0 } : undefined}
            preload="auto"
          />
        )}
      </motion.div>

      {/* Dark overlay on hover */}
      <motion.div
        className="absolute inset-0 bg-black"
        animate={{ opacity: isHovered ? 0.45 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Info overlay */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-2"
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
          {title}
        </span>
        {item.tags && (
          <div className="flex flex-wrap gap-[6px] pt-1">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-white/80 border border-white/30 rounded-full px-[10px] py-[3px] backdrop-blur-sm"
                style={{ fontSize: "11px", fontWeight: 400 }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </motion.div>

      {/* Corner accent */}
      <motion.div
        className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[#fff]"
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.6 }}
        transition={{ duration: 0.3, delay: 0.05 }}
      />
    </motion.div>
  );
}

export function GalleryGrid({ onHoverChange, onProjectClick }: GalleryGridProps) {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 640: 1, 1024: 2, 1280: 3 }}>
      <Masonry gutter="0px">
        {projects.map((item, index) => (
          <GalleryCard
            key={item.id}
            item={item}
            index={index}
            onHoverChange={onHoverChange}
            onProjectClick={onProjectClick}
          />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}
