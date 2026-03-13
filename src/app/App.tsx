import { useState } from "react";
import { Routes, Route } from "react-router";
import { CustomCursor } from "./components/CustomCursor";
import { GalleryGrid } from "./components/GalleryGrid";
import { Nav } from "./components/Nav";
import About from "./pages/About";

function Home() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="min-h-screen bg-[#f2f2f2] cursor-none overflow-x-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <CustomCursor isHovering={isHovering} />

      {/* Header */}
      <header className="px-10 pt-10 pb-16">
        <div className="content-stretch flex flex-col gap-[64px] items-start leading-[normal] not-italic relative w-full">
          {/* Navigation */}
          <Nav
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          />

          {/* Hero Section */}
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

      {/* Gallery */}
      <main className="px-10 pb-16">
        <GalleryGrid onHoverChange={setIsHovering} />
      </main>

      {/* Footer */}
      <footer className="mx-10 py-8 border-t border-black/10 flex items-center justify-between">
        <span className="text-black/20 text-[14px]">
          © 2026 VITOR C. COSTA. - TODOS OS DIREITOS RESERVADOS.
        </span>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}