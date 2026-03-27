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

const imgSuaFoto = "/img/IMG_5913 SMALL.jpg";

const experiences = [
  {
    title: "UX/UI Designer",
    company: "All Easy",
    period: "2025 — Atual",
    description:
      "Criação e manutenção de design system escalável adotado por todos os squads do produto. Redesigns com impacto direto na redução de chamados relacionados à interface e padronização visual consistente em toda a plataforma. Uso de IA como acelerador no processo de pesquisa e testes de usabilidade.",
  },
  {
    title: "Product Designer",
    company: "apepê",
    period: "2021 — 2025",
    description:
      "Condução de todo o ciclo de design em app B2C com +14k usuários. Design que contribuiu para o crescimento da base de 1.500 para 9.000+ usuários — com foco em clareza, recorrência e confiança na navegação. Design system para múltiplas squads com handoff técnico e colaboração próxima com engenharia e produto.",
  },
  {
    title: "UX/UI Designer & Product Owner",
    company: "Spaceneedle Tecnologia",
    period: "2020 — 2021",
    description:
      "Atuação como Product Owner em projeto de dashboard analítico — fazendo a ponte entre o time de desenvolvimento responsável pelo processamento de dados e as necessidades do negócio, além do design das interfaces. O projeto resultou em redução de mais de 90% no tempo de processamento.",
  },
];

const skills = [
  {
    label: "Ferramentas",
    value: "Figma (avançado)  ·  ProtoPie  ·  Framer  ·  Photoshop  ·  Notion",
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
    label: "Produto & Gestão",
    value:
      "Planejamento estratégico  ·  Gestão de backlog  ·  Colaboração com engenharia  ·  Handoff técnico",
  },
  {
    label: "Idiomas",
    value: "Português (nativo)  ·  Inglês (avançado)",
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
      <header className="px-5 sm:px-10 pt-10 pb-6">
        <Nav />
      </header>

      {/* Hero */}
      <section className="px-5 sm:px-10 lg:px-[120px] pt-[60px] pb-[80px] flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-16">
        <motion.div className="flex flex-col gap-5 max-w-[580px]" {...fadeUp(0)}>
          <p className="text-[#666] text-[14px] tracking-[2.5px] uppercase font-medium">
            UX/UI &amp; PRODUCT DESIGNER
          </p>
          <h1
            className="text-[#0a0a0a] text-[40px] leading-[48px] sm:text-[52px] sm:leading-[60px] lg:text-[60px] lg:leading-[68px]"
            style={{ fontFamily: "'Hedvig Letters Serif', serif", fontWeight: 400 }}
          >
            Vitor C. Costa
          </h1>
          <div className="w-[40px] h-px bg-[#ccc]" />
          <p className="text-[#3a3a3a] text-[16px] leading-[28px] font-light text-justify max-w-[540px]">
            Designer com 6 anos de experiência em produtos digitais — apps para
            consumidores, plataformas B2B e ecossistemas integrados — atuando em
            todo o ciclo do produto, da descoberta à entrega.
            Forte atuação em Design System, pesquisa com usuários e colaboração
            próxima com produto e engenharia. Formado em Análise e
            Desenvolvimento de Sistemas, o que me permite dialogar com clareza
            com times técnicos. De São Paulo, Brasil — fora das telas, fotógrafo,
            atleta do primeiro time LGBTQIAP+ de Rugby do Brasil e curioso por
            natureza: 4 países visitados e contando.
          </p>
        </motion.div>
        <motion.div
          className="w-full h-[300px] sm:h-[400px] lg:w-[400px] lg:h-[500px] lg:shrink-0 rounded-[4px] overflow-hidden"
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
      <section className="px-5 sm:px-10 lg:px-[120px] py-[60px]">
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
              <div className="flex flex-wrap items-baseline gap-x-[24px] gap-y-1">
                <p className="text-[#111] text-[16px] font-medium">
                  {exp.title}
                </p>
                <p className="text-[#545454] text-[14px] font-normal">
                  {exp.company}
                </p>
                <p className="sm:ml-auto text-[#bbb] text-[14px] font-normal">
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
      <section className="px-5 sm:px-10 lg:px-[120px] py-[60px]">
        <motion.div className="w-full h-px bg-[#ebebeb] mb-[44px]" {...inView()} />
        <motion.p
          className="text-[#666] text-[14px] tracking-[2.5px] uppercase font-medium mb-[56px]"
          {...inView(0.05)}
        >
          HABILIDADES
        </motion.p>
        <div className="flex flex-col gap-[40px]">
          {skills.map((skill, i) => (
            <motion.div key={skill.label} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-[56px]" {...inView(i * 0.07)}>
              <p className="text-[#454545] text-[14px] font-normal sm:w-[160px] sm:shrink-0">
                {skill.label}
              </p>
              <p className="text-[#333] text-[14px] font-light leading-[24px]">{skill.value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="px-5 sm:px-10 lg:px-[120px] py-[60px]">
        <motion.div className="w-full h-px bg-[#ebebeb] mb-[44px]" {...inView()} />
        <motion.p
          className="text-[#666] text-[14px] tracking-[2.5px] uppercase font-medium mb-[56px]"
          {...inView(0.05)}
        >
          FORMAÇÃO
        </motion.p>
        <motion.div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-[56px]" {...inView(0.1)}>
          <p className="text-[#111] text-[16px] font-medium sm:w-[160px] sm:shrink-0">
            UNIP
          </p>
          <p className="text-[#666] text-[14px] font-light">
            Análise e Desenvolvimento de Sistemas · Tecnólogo · 2023
          </p>
        </motion.div>
      </section>

      <section className="px-5 sm:px-10 lg:px-[120px] py-[60px]">
        <motion.div className="w-full h-px bg-[#ebebeb] mb-[44px]" {...inView()} />
        <motion.p
          className="text-[#666] text-[14px] tracking-[2.5px] uppercase font-medium mb-[56px]"
          {...inView(0.05)}
        >
          CURRÍCULO
        </motion.p>
        <motion.div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-[56px]" {...inView(0.1)}>
          <a
            href="https://1drv.ms/b/c/f371275e835eed50/IQCHdKYOzbHGQImj6c6bh2IhAdRqBQvD9ZRAznrUv9IhHtE?e=sbhKse"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#111] text-[16px] font-medium sm:w-[160px] sm:shrink-0 hover:text-black transition-colors"
          >
            Baixar PDF
          </a>
          <p className="text-[#666] text-[14px] font-light">CV completo em português · PDF</p>
        </motion.div>
      </section>

      {/* Contact */}
      <section className="px-5 sm:px-10 lg:px-[120px] py-[60px]">
        <motion.div className="w-full h-px bg-[#ebebeb] mb-[44px]" {...inView()} />
        <motion.p
          className="text-[#666] text-[14px] tracking-[2.5px] uppercase font-medium mb-[56px]"
          {...inView(0.05)}
        >
          CONTATO
        </motion.p>
        <div className="flex flex-col gap-[16px]">
          <motion.a
            href="mailto:vcostastudio@outlook.com"
            className="text-[#111] text-[16px] font-medium hover:text-black transition-colors"
            {...inView(0.08)}
          >
            vcostastudio@outlook.com
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/vitor-costa-288295b4/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#111] text-[16px] font-medium hover:text-black transition-colors"
            {...inView(0.12)}
          >
            LinkedIn
          </motion.a>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-5 sm:mx-10 py-8 border-t border-black/10 flex items-center justify-between mt-8">
        <span className="text-black/20 text-[14px]">
          © 2026 VITOR C. COSTA. - TODOS OS DIREITOS RESERVADOS.
        </span>
      </footer>
    </div>
  );
}
