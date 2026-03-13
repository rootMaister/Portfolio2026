import { useState } from "react";
import { Navigate, useParams } from "react-router";
import { motion } from "motion/react";
import { CustomCursor } from "../components/CustomCursor";
import { Nav } from "../components/Nav";
import { projects, type ContentBlock } from "../../data/projects";

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

function Block({ block, index }: { block: ContentBlock; index: number }) {
  const delay = (index % 4) * 0.07;

  switch (block.type) {
    case "heading":
      return (
        <motion.h2
          className={
            block.size === "sm"
              ? "text-[22px] font-medium text-[#111] leading-snug"
              : "text-[42px] leading-[52px] text-[#0a0a0a]"
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
          className="text-[#3a3a3a] text-[16px] font-light leading-[28px] max-w-[720px]"
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
      return (
        <motion.div
          className="w-full h-px bg-[#ebebeb]"
          {...inView(delay)}
        />
      );

    case "image":
      return (
        <motion.figure className="flex flex-col gap-3" {...inView(delay)}>
          <img
            src={block.src}
            alt={block.alt ?? ""}
            className={`rounded-[4px] object-cover w-full ${block.full ? "max-h-[600px]" : "max-h-[440px]"}`}
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
        <motion.div
          className="grid grid-cols-2 gap-3"
          {...inView(delay)}
        >
          {block.images.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.alt ?? ""}
              className="rounded-[4px] object-cover w-full h-[320px]"
            />
          ))}
        </motion.div>
      );

    case "metrics":
      return (
        <motion.div className="flex gap-[80px]" {...inView(delay)}>
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

export default function Project() {
  const { id } = useParams<{ id: string }>();
  const [isHovering, setIsHovering] = useState(false);

  const project = projects.find((p) => p.id === Number(id));
  if (!project) return <Navigate to="/" replace />;

  return (
    <div
      className="min-h-screen bg-white cursor-none overflow-x-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <CustomCursor isHovering={isHovering} />

      <header className="px-10 pt-10 pb-6">
        <Nav
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        />
      </header>

      {/* Hero thumbnail */}
      <motion.div
        className="px-10 pt-6 pb-0"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="w-full h-[480px] rounded-[4px] overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* Content blocks */}
      <article className="px-[120px] py-[80px] flex flex-col gap-[48px]">
        {project.blocks.map((block, i) => (
          <Block key={i} block={block} index={i} />
        ))}
      </article>

      <footer className="mx-10 py-8 border-t border-black/10 flex items-center justify-between">
        <span className="text-black/20 text-[14px]">
          © 2026 VITOR C. COSTA. - TODOS OS DIREITOS RESERVADOS.
        </span>
      </footer>
    </div>
  );
}
