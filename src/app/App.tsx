import { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router";
import { gsap, wrap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { CustomCursor } from "./components/CustomCursor";
import { GalleryGrid } from "./components/GalleryGrid";
import { ProjectModal } from "./components/ProjectModal";
import { useLang } from "../context/LanguageContext";
import { t } from "../data/translations";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function Home() {
  const [isHovering, setIsHovering] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const { lang } = useLang();
  const tr = t[lang];
  const about = tr.about;

  return (
    <div
      className="min-h-screen bg-[#f2f2f2] cursor-none"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <CustomCursor isHovering={isHovering} />

      <main className="px-5 sm:px-10 pb-16 max-w-[80%] mx-auto">
        {/* Hero */}
        <div className="pt-[100px] pb-16">
          <h1
            className="text-[#0a0a0a] text-[40px] sm:text-[52px] leading-[1.1] mb-5"
            style={{ fontFamily: "'Hedvig Letters Serif', serif", fontWeight: 400 }}
          >
            Vitor C. Costa
          </h1>
          {/* <h2>UX/UI Designer</h2> */}
          <p className="text-[#555] text-[14px] leading-[24px] font-light w-full lg:w-1/2" style={{textWrap: "balance", WebkitFontSmoothing: "antialiased"}}>
            {about.bio}
          </p>
        </div>

        <p className="text-[#999] text-[12px] tracking-[2px] uppercase font-medium mb-8">
          {tr.home.selectedWorks}
        </p>

        <GalleryGrid
          onHoverChange={setIsHovering}
          onProjectClick={setSelectedProjectId}
        />
      </main>

      <footer className="mx-5 sm:mx-10 py-8 border-t border-black/10 flex items-center justify-between">
        <span className="text-black/20 text-[14px]">
          {tr.footer.rights}
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

  useEffect(() => {
    smootherRef.current?.scrollTo(0, false);
  }, [location.pathname]);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}

function LangToggle() {
  const { lang, toggle } = useLang();
  const tr = t[lang].nav;

  return (
    <header
      className="fixed top-0 right-0 z-50 px-5 sm:px-10 pt-10 pb-4"
      style={{ mixBlendMode: "difference" }}
    >
      {/* <button
        onClick={toggle}
        className="cursor-none text-white text-[14px] tracking-[0.96px] opacity-70 hover:opacity-100 transition-opacity"
      >
        {tr.lang}
      </button> */}
    </header>
  );
}

export default function App() {
  return (
    <>
      <LangToggle />
      <ScrollSmootherWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </ScrollSmootherWrapper>
    </>
  );
}
