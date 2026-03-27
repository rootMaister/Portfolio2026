import { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { motion } from "motion/react";
import { CustomCursor } from "./components/CustomCursor";
import { GalleryGrid } from "./components/GalleryGrid";
import { Nav } from "./components/Nav";
import { ProjectModal } from "./components/ProjectModal";
import About from "./pages/About";

const NAME = "VITOR C. COSTA";

function AnimatedName() {
  return (
    <div
      className="w-full flex items-end overflow-visible select-none"
      style={{ lineHeight: 1 }}
    >
      {NAME.split("").map((char, i) =>
        char === " " ? (
          <span key={i} style={{ flex: "0.6" }} />
        ) : (
          <motion.span
            key={i}
            whileHover={{ y: "-12%" }}
            transition={{ type: "spring", stiffness: 600, damping: 28 }}
            style={{
              flex: 1,
              textAlign: "center",
              letterSpacing: "-0.04em",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 900,
              WebkitTextStroke: "5.5px black",
              fontSize: "clamp(3.5rem, 8.8vw, 9rem)",
              color: "#000",
              display: "block",
              cursor: "default",
            }}
          >
            {char}
          </motion.span>
        )
      )}
    </div>
  );
}

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function Home() {
  const [isHovering, setIsHovering] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  return (
    <div
      className="min-h-screen bg-[#f2f2f2] cursor-none"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <CustomCursor isHovering={isHovering} />

      {/* Header */}
      <header className="px-5 sm:px-10 pt-10 pb-16">
        <Nav />

        {/* Hero name — animated letters */}
        <div className="mt-[9vh] mb-[9vh]">
          <AnimatedName />
        </div>

        {/* Subtitle row — lines + centered text */}
        <div className="flex items-center gap-4">
          {/* <div className="flex-1 h-px bg-black/15" /> */}
          <p className="text-[#6e6e6e] text-[16px] tracking-[0.6px] font-light whitespace-nowrap w-full text-center">
            Há 6 anos transformando pesquisa em interface e interface em resultado.
          </p>
          {/* <div className="flex-1 h-px bg-black/15" /> */}
        </div>
      </header>

      <main className="px-5 sm:px-10 pb-16">
        <GalleryGrid
          onHoverChange={setIsHovering}
          onProjectClick={setSelectedProjectId}
        />
      </main>

      <footer className="mx-5 sm:mx-10 py-8 border-t border-black/10 flex items-center justify-between">
        <span className="text-black/20 text-[14px]">
          © 2026 VITOR C. COSTA. - TODOS OS DIREITOS RESERVADOS.
        </span>
      </footer>

      <ProjectModal
        projectId={selectedProjectId}
        onClose={() => setSelectedProjectId(null)}
      />
    </div>
  );
}

function ScrollSmootherWrapper({ children }: { children: React.ReactNode }) {
  const smootherRef = useRef<ScrollSmoother | null>(null);
  const location = useLocation();

  useEffect(() => {
    smootherRef.current = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5,
      smoothTouch: 0.1,
      normalizeScroll: true,
    });

    return () => {
      smootherRef.current?.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    smootherRef.current?.scrollTo(0, false);
  }, [location.pathname]);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}

export default function App() {
  return (
    <ScrollSmootherWrapper>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </ScrollSmootherWrapper>
  );
}
