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
  const labelBlock = item.blocks.find((b): b is { type: "label"; text: string } => b.type === "label");
  const labelText = labelBlock?.text ?? item.category;

  return (
    <motion.div
      className="cursor-none"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onTouchStart={handleEnter}
      onClick={() => onProjectClick(item.id)}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden group">
        <motion.div
          animate={{ scale: isHovered ? 1.04 : 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative"
          style={{ willChange: "transform" }}
        >
          {/* Static image */}
          {item.image && (
            <ImageWithFallback
              src={item.image}
              alt={item.title}
              className="w-full h-auto max-h-[56.25rem] object-contain block"
              style={{ outline: "1px solid rgba(0,0,0,0.06)", outlineOffset: "-1px" }}
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
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
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
              preload="auto"
              className={hasStaticBase ? "absolute inset-0 w-full h-full object-cover transition-opacity duration-500" : "w-full h-auto  max-h-[56.25rem] object-contain block"}
              style={hasStaticBase ? { opacity: isHovered ? 1 : 0 } : undefined }
            />
          )}
        </motion.div>

        

        {/* Corner accent */}
        <motion.div
          className="absolute top-4 right-4 w-6 h-6 border-t border-r border-white pointer-events-none"
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.6 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        />

        {/* Always-visible info overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 px-5 py-4 flex flex-col gap-2"
          style={{ backdropFilter: "blur(12px)", background: "rgba(0,0,0,0.36)" }}
        >
          <span
            className="text-white/100 uppercase tracking-wider"
            style={{ fontSize: "12px", fontWeight: 500 }}
          >
            {labelText}
          </span>
          <span className="text-white leading-snug" style={{ fontSize: "18px", fontWeight: 300 }}>
            {title}
          </span>
          {item.tags && (
            <div className="flex flex-wrap gap-[6px] pt-1">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-white/100 border border-white/100 rounded-full px-[10px] py-[3px]"
                  style={{ fontSize: "11px", fontWeight: 400, backgroundColor: "rgba(255,255,255,0.1)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function GalleryGrid({ onHoverChange, onProjectClick }: GalleryGridProps) {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 640: 1, 1024: 2 }}>
      <Masonry>
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
