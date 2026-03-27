import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { projects, type ContentBlock } from "../../data/projects";
import { useLang } from "../../context/LanguageContext";

// ── Markdown bold parser ───────────────────────────────────────────────────────

function parseBold(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="font-semibold text-[#0a0a0a]">{part}</strong> : part
  );
}

// ── Block renderer ────────────────────────────────────────────────────────────

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" } as const,
  transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

function Block({ block, index }: { block: ContentBlock; index: number }) {
  const delay = (index % 5) * 0.06;

  switch (block.type) {
    case "heading":
      return (
        <motion.h2
          className={
            block.size === "sm"
              ? "text-[20px] font-medium text-[#111] leading-snug"
              : "text-[24px] leading-[32px] sm:text-[38px] sm:leading-[48px] text-[#0a0a0a]"
          }
          style={
            block.size !== "sm"
              ? { fontFamily: "'Hedvig Letters Serif', serif", fontWeight: 400 }
              : undefined
          }
          {...inView(delay)}
        >
          {block.text}
        </motion.h2>
      );

    case "text":
      return (
        <motion.p
          className="text-[#3a3a3a] text-[16px] font-light leading-[28px] max-w-[680px]"
          {...inView(delay)}
        >
          {parseBold(block.body)}
        </motion.p>
      );

    case "highlight":
      return (
        <motion.blockquote
          className="border-l-[3px] border-[#0a0a0a] pl-6 py-1 max-w-[680px]"
          {...inView(delay)}
        >
          <p className="text-[#0a0a0a] text-[20px] leading-[32px] font-light italic">
            {parseBold(block.body)}
          </p>
        </motion.blockquote>
      );

    case "list":
      return (
        <motion.ul className="flex flex-col gap-2 pl-5 list-disc max-w-[680px]" {...inView(delay)}>
          {block.items.map((item, i) => (
            <li key={i} className="text-[#3a3a3a] text-[16px] font-light leading-[28px]">
              {item}
            </li>
          ))}
        </motion.ul>
      );

    case "label":
      return (
        <motion.p
          className="text-[#666] text-[14px] tracking-[2.5px] uppercase font-medium"
          {...inView(delay)}
        >
          {block.text}
        </motion.p>
      );

    case "divider":
      return <motion.div className="w-full h-px bg-[#ebebeb]" {...inView(delay)} />;

    case "image":
      return (
        <motion.figure className="flex flex-col gap-3" {...inView(delay)}>
          {block.src.endsWith(".mp4") ? (
            <video
              src={block.src}
              autoPlay
              loop
              muted
              playsInline
              className="rounded-[4px] w-full h-auto block"
            />
          ) : (
            <img
              src={block.src}
              alt={block.alt ?? ""}
              className="rounded-[4px] w-full h-auto max-h-[900px] object-contain"
            />
          )}
          {block.caption && (
            <figcaption className="text-[#999] text-[13px] font-light text-center">
              {block.caption}
            </figcaption>
          )}
        </motion.figure>
      );

    case "gallery":
      return (
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-3" {...inView(delay)}>
          {block.images.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.alt ?? ""}
              className="rounded-[4px] object-cover w-full h-[280px]"
            />
          ))}
        </motion.div>
      );

    case "metrics":
      return (
        <motion.div className="flex flex-wrap gap-8 sm:gap-[64px]" {...inView(delay)}>
          {block.items.map((m) => (
            <div key={m.label} className="flex flex-col gap-1">
              <span
                className="text-[#0a0a0a] text-[40px] leading-none"
                style={{ fontFamily: "'Hedvig Letters Serif', serif", fontWeight: 400 }}
              >
                {m.value}
              </span>
              <span className="text-[#666] text-[14px] font-light">{m.label}</span>
            </div>
          ))}
        </motion.div>
      );

    case "video":
      return (
        <motion.figure className="flex flex-col gap-3" {...inView(delay)}>
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src={block.src}
              className="absolute inset-0 w-full h-full rounded-[4px]"
              style={{ border: "none" }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
          {block.caption && (
            <figcaption className="text-[#999] text-[13px] font-light text-center">
              {block.caption}
            </figcaption>
          )}
        </motion.figure>
      );

    default:
      return null;
  }
}

// ── Modal ─────────────────────────────────────────────────────────────────────

interface ProjectModalProps {
  projectId: number | null;
  onClose: () => void;
}

export function ProjectModal({ projectId, onClose }: ProjectModalProps) {
  const { lang } = useLang();
  const project = projectId !== null ? projects.find((p) => p.id === projectId) : null;
  const blocks = project ? (lang === "en" ? project.blocksEn : project.blocks) : [];

  // Pause ScrollSmoother + lock body scroll while open
  useEffect(() => {
    const smoother = ScrollSmoother.get();
    if (project) {
      smoother?.paused(true);
    } else {
      smoother?.paused(false);
    }
    return () => {
      smoother?.paused(false);
    };
  }, [project]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return createPortal(
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-md z-40 cursor-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
          <motion.div
            className="relative w-full sm:w-[55%] max-h-[90vh] bg-white rounded-[8px] overflow-y-auto cursor-none pointer-events-auto modal-scrollbar"
            style={{ fontFamily: "'Inter', sans-serif" } as React.CSSProperties}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
          >
            {/* Close button — sticky zero-height row, comes first so it floats over hero */}
            <div className="sticky top-5 h-0 flex justify-end pr-5 z-20">
              <motion.button
                onClick={onClose}
                className="w-9 h-9 rounded-full flex items-center justify-center cursor-none"
                style={{ backgroundColor: "rgba(0,0,0,0.35)", backdropFilter: "blur(6px)", color: "#fff" }}
                aria-label="Fechar"
                whileHover={{ scale: 1.15, rotate: 90, backgroundColor: "rgba(0,0,0,0.55)" }}
                whileTap={{ scale: 0.85 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </motion.button>
            </div>

            {/* Hero */}
            <motion.div
              className="relative w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {project.video && !project.image && !project.banner ? (
                <video
                  src={project.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto block"
                />
              ) : project.banner ? (
                <img
                  src={project.banner}
                  alt={project.title}
                  className="w-full h-auto max-h-[60vh] object-cover block"
                />
              ) : project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto max-h-[60vh] object-cover block"
                />
              ) : null}
            </motion.div>

            {/* Content blocks */}
            <article className="px-5 py-8 sm:px-[40px] sm:py-[48px] md:px-[80px] md:py-[64px] flex flex-col gap-[40px]">
              {blocks.map((block, i) => (
                <Block key={i} block={block} index={i} />
              ))}
            </article>
          </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
