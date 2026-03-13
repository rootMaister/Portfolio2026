import { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { CustomCursor } from "./components/CustomCursor";
import { GalleryGrid } from "./components/GalleryGrid";
import { Nav } from "./components/Nav";
import { ProjectModal } from "./components/ProjectModal";
import About from "./pages/About";

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
        <div className="content-stretch flex flex-col gap-[64px] items-start leading-[normal] not-italic relative w-full">
          <Nav />
          <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 max-w-[557px]">
            <h1 className="font-['Hedvig_Letters_Serif',sans-serif] relative shrink-0 text-[26px] text-black tracking-[1.04px] w-full">
              Vitor C. Costa
            </h1>
            <p className="font-['Inter',sans-serif] relative shrink-0 text-[#6e6e6e] text-[16px] text-justify tracking-[0.8px] w-full font-light leading-relaxed">
              6 anos transformando pesquisa em interface e interface em resultado. Sou designer com experiência em todo o ciclo de produto — da descoberta à entrega. Trabalho com B2C, B2B e B2B2C, construindo experiências digitais consistentes, escaláveis e centradas nas pessoas que realmente as usam.
            </p>
          </div>
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
