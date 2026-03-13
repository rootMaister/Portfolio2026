import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { projects, type ContentBlock } from "../../data/projects";

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
              : "text-[38px] leading-[48px] text-[#0a0a0a]"
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
          {block.body}
        </motion.p>
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
          <img
            src={block.src}
            alt={block.alt ?? ""}
            className={`rounded-[4px] object-cover w-full ${
              block.full ? "max-h-[560px]" : "max-h-[400px]"
            }`}
          />
          {block.caption && (
            <figcaption className="text-[#999] text-[13px] font-light">
              {block.caption}
            </figcaption>
          )}
        </motion.figure>
      );

    case "gallery":
      return (
        <motion.div className="grid grid-cols-2 gap-3" {...inView(delay)}>
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
        <motion.div className="flex gap-[64px]" {...inView(delay)}>
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
  const project = projectId !== null ? projects.find((p) => p.id === projectId) : null;

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
            className="relative w-[85%] max-h-[90vh] bg-white rounded-[8px] overflow-y-auto cursor-none pointer-events-auto modal-scrollbar"
            style={{ fontFamily: "'Inter', sans-serif" } as React.CSSProperties}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
          >
            {/* Close button — sticky, mix-blend-mode:difference para contrastar com qualquer fundo */}
            <button
              onClick={onClose}
              className="sticky top-8 float-right mr-8 w-8 h-8 flex items-center justify-center cursor-none z-10"
              style={{ color: "#fff", mixBlendMode: "difference" }}
              aria-label="Fechar"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {/* Hero image */}
            <motion.div
              className="w-full bg-[#fff] flex items-center justify-center"
              style={{ minHeight: "420px", maxHeight: "60vh" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="max-w-full max-h-[60vh] w-auto h-auto object-contain p-8"
              />
            </motion.div>

            {/* Content blocks */}
            <article className="px-[80px] py-[64px] flex flex-col gap-[40px]">
              {project.blocks.map((block, i) => (
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
