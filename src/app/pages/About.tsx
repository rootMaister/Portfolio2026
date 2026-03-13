import { motion } from "motion/react";
import { CustomCursor } from "../components/CustomCursor";
import { Nav } from "../components/Nav";

// Hero (above fold) — fires immediately on load
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

// Sections (below fold) — fires when entering viewport
const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" } as const,
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

const imgSuaFoto = "src/app/components/img/IMG_5913 SMALL.jpg";

const experiences = [
  {
    title: "UX/UI Designer",
    company: "All Easy",
    period: "2025 — Atual",
    description:
      "Criação e manutenção de design system escalável com documentação para múltiplas squads. Uso de IA como otimização no processo de pesquisa. Planejamento e execução de testes de usabilidade e melhorias contínuas.",
  },
  {
    title: "Product Designer",
    company: "apepê",
    period: "2021 — 2025",
    description:
      "Condução de todo o ciclo de design em app B2C com +14k usuários. Crescimento da base de 1.500 para 9.000+ usuários contribuindo com clareza, recorrência e confiança na navegação. Design system para múltiplas squads com handoff técnico e colaboração próxima com engenharia e produto.",
  },
  {
    title: "UX/UI Designer",
    company: "Spaceneedle Tecnologia",
    period: "2020 — 2021",
    description:
      "Liderança em projeto de dashboard analítico com alto impacto operacional, reduzindo tempo de processamento de dados em mais de 90%. Concepção de soluções baseadas em dados e pesquisa com usuários-chave.",
  },
];

const skills = [
  {
    label: "Ferramentas",
    value: "Figma (avançado)  ·  ProtoPie  ·  Framer  ·  Adobe XD  ·  Photoshop  ·  Notion",
  },
  {
    label: "Design",
    value:
      "Wireframing  ·  Prototipação  ·  Design System  ·  UI Design  ·  Design Responsivo  ·  Micro interações  ·  Documentação",
  },
  {
    label: "Pesquisa",
    value:
      "Entrevistas com usuários  ·  Mapeamento de jornada  ·  Benchmark  ·  Testes de usabilidade",
  },
  {
    label: "Gestão & Dev",
    value:
      "Planejamento estratégico  ·  Backlog  ·  Conhecimento técnico em desenvolvimento  ·  Inglês avançado",
  },
];

export default function About() {
  const isHovering = false;

  return (
    <div
      className="min-h-screen bg-white cursor-none overflow-x-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <CustomCursor isHovering={isHovering} />

      {/* Header / Nav */}
      <header className="px-10 pt-10 pb-6">
        <Nav />
      </header>

      {/* Hero */}
      <section className="px-[120px] pt-[60px] pb-[80px] flex items-start justify-between gap-16">
        <motion.div className="flex flex-col gap-5 max-w-[580px]" {...fadeUp(0)}>
          <p className="text-[#666] text-[14px] tracking-[2.5px] uppercase font-medium">
            UX/UI &amp; PRODUCT DESIGNER
          </p>
          <h1
            className="text-[#0a0a0a] text-[60px] leading-[68px]"
            style={{ fontFamily: "'Hedvig Letters Serif', serif", fontWeight: 400 }}
          >
            Vitor C. Costa
          </h1>
          <div className="w-[40px] h-px bg-[#ccc]" />
          <p className="text-[#3a3a3a] text-[16px] leading-[28px] font-light text-justify max-w-[540px]">
            Sou de São Paulo, Brasil. Fora das telas, sou fotógrafo, atleta do
            primeiro time LGBTQIAP+ de Rugby do Brasil e já viajei por 4 países
            — experiências que moldaram minha visão sobre diversidade,
            colaboração e como enxergar o mundo com outros olhos. Designer com 6
            anos de experiência em produtos digitais B2C, B2B e B2B2C, atuando
            em todo o ciclo do produto — da descoberta à entrega. Tenho forte
            atuação em Design System, pesquisa com usuários e colaboração
            próxima com produto e engenharia. Formação técnica em
            desenvolvimento me permite dialogar com clareza com qualquer time.
          </p>
        </motion.div>
        <motion.div
          className="shrink-0 w-[400px] h-[500px] rounded-[4px] overflow-hidden"
          {...fadeUp(0.12)}
        >
          <img
            src={imgSuaFoto}
            alt="Vitor C. Costa"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </section>

      {/* Experience */}
      <section className="px-[120px] py-[60px]">
        <motion.div className="w-full h-px bg-[#ebebeb] mb-[44px]" {...inView()} />
        <motion.p
          className="text-[#666] text-[14px] tracking-[2.5px] uppercase font-medium mb-[56px]"
          {...inView(0.05)}
        >
          EXPERIÊNCIA
        </motion.p>
        <div className="flex flex-col gap-[80px]">
          {experiences.map((exp, i) => (
            <motion.div key={exp.company} className="flex flex-col gap-[10px]" {...inView(i * 0.08)}>
              <div className="flex items-baseline gap-[40px]">
                <p className="text-[#111] text-[16px] font-medium whitespace-nowrap">
                  {exp.title}
                </p>
                <p className="text-[#545454] text-[14px] font-normal whitespace-nowrap">
                  {exp.company}
                </p>
                <p className="ml-auto text-[#bbb] text-[14px] font-normal whitespace-nowrap">
                  {exp.period}
                </p>
              </div>
              <p className="text-[#555] text-[14px] font-light leading-[24px] max-w-[700px]">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="px-[120px] py-[60px]">
        <motion.div className="w-full h-px bg-[#ebebeb] mb-[44px]" {...inView()} />
        <motion.p
          className="text-[#666] text-[14px] tracking-[2.5px] uppercase font-medium mb-[56px]"
          {...inView(0.05)}
        >
          HABILIDADES
        </motion.p>
        <div className="flex flex-col gap-[40px]">
          {skills.map((skill, i) => (
            <motion.div key={skill.label} className="flex items-baseline gap-[56px]" {...inView(i * 0.07)}>
              <p className="text-[#454545] text-[14px] font-normal whitespace-nowrap w-[160px] shrink-0">
                {skill.label}
              </p>
              <p className="text-[#333] text-[14px] font-light leading-[24px]">{skill.value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="px-[120px] py-[60px]">
        <motion.div className="w-full h-px bg-[#ebebeb] mb-[44px]" {...inView()} />
        <motion.p
          className="text-[#666] text-[14px] tracking-[2.5px] uppercase font-medium mb-[56px]"
          {...inView(0.05)}
        >
          FORMAÇÃO
        </motion.p>
        <motion.div className="flex items-baseline gap-[56px]" {...inView(0.1)}>
          <p className="text-[#111] text-[16px] font-medium whitespace-nowrap w-[160px] shrink-0">
            UNIP
          </p>
          <p className="text-[#666] text-[14px] font-light">
            Análise e Desenvolvimento de Sistemas · Tecnólogo
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="mx-10 py-8 border-t border-black/10 flex items-center justify-between mt-8">
        <span className="text-black/20 text-[14px]">© 2026 Galeria Criativa</span>
        <span className="text-[#565656]/60 uppercase tracking-widest text-[14px]">
          Design &amp; Identidade
        </span>
      </footer>
    </div>
  );
}
