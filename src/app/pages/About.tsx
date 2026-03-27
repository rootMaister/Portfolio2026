import { motion } from "motion/react";
import { CustomCursor } from "../components/CustomCursor";
import { Nav } from "../components/Nav";
import { useLang } from "../../context/LanguageContext";
import { t } from "../../data/translations";

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

export default function About() {
  const { lang } = useLang();
  const tr = t[lang];
  const about = tr.about;

  return (
    <div
      className="min-h-screen bg-white cursor-none overflow-x-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <CustomCursor isHovering={false} />

      {/* Header / Nav */}
      <header className="px-5 sm:px-10 pt-10 pb-6">
        <Nav />
      </header>

      {/* Hero */}
      <section className="px-5 sm:px-10 lg:px-[120px] pt-[60px] pb-[80px] flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-16">
        <motion.div className="flex flex-col gap-5 max-w-[580px]" {...fadeUp(0)}>
          <p className="text-[#666] text-[14px] tracking-[2.5px] uppercase font-medium">
            {about.role}
          </p>
          <h1
            className="text-[#0a0a0a] text-[40px] leading-[48px] sm:text-[52px] sm:leading-[60px] lg:text-[60px] lg:leading-[68px]"
            style={{ fontFamily: "'Hedvig Letters Serif', serif", fontWeight: 400 }}
          >
            Vitor C. Costa
          </h1>
          <div className="w-[40px] h-px bg-[#ccc]" />
          <p className="text-[#3a3a3a] text-[16px] leading-[28px] font-light text-justify max-w-[540px]">
            {about.bio}
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
          {about.sectionExperience}
        </motion.p>
        <div className="flex flex-col gap-[80px]">
          {tr.experiences.map((exp, i) => (
            <motion.div key={exp.company} className="flex flex-col gap-[10px]" {...inView(i * 0.08)}>
              <div className="flex flex-wrap items-baseline gap-x-[24px] gap-y-1">
                <p className="text-[#111] text-[16px] font-medium">{exp.title}</p>
                <p className="text-[#545454] text-[14px] font-normal">{exp.company}</p>
                <p className="sm:ml-auto text-[#bbb] text-[14px] font-normal">{exp.period}</p>
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
          {about.sectionSkills}
        </motion.p>
        <div className="flex flex-col gap-[40px]">
          {tr.skills.map((skill, i) => (
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
          {about.sectionEducation}
        </motion.p>
        <motion.div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-[56px]" {...inView(0.1)}>
          <p className="text-[#111] text-[16px] font-medium sm:w-[160px] sm:shrink-0">UNIP</p>
          <p className="text-[#666] text-[14px] font-light">{about.educationDesc}</p>
        </motion.div>
      </section>

      {/* Resume */}
      <section className="px-5 sm:px-10 lg:px-[120px] py-[60px]">
        <motion.div className="w-full h-px bg-[#ebebeb] mb-[44px]" {...inView()} />
        <motion.p
          className="text-[#666] text-[14px] tracking-[2.5px] uppercase font-medium mb-[56px]"
          {...inView(0.05)}
        >
          {about.sectionResume}
        </motion.p>
        <motion.div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-[56px]" {...inView(0.1)}>
          <a
            href="https://1drv.ms/b/c/f371275e835eed50/IQCHdKYOzbHGQImj6c6bh2IhAdRqBQvD9ZRAznrUv9IhHtE?e=sbhKse"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#111] text-[16px] font-medium sm:w-[160px] sm:shrink-0 hover:text-black transition-colors"
          >
            {about.resumeLink}
          </a>
          <p className="text-[#666] text-[14px] font-light">{about.resumeDesc}</p>
        </motion.div>
      </section>

      {/* Contact */}
      <section className="px-5 sm:px-10 lg:px-[120px] py-[60px]">
        <motion.div className="w-full h-px bg-[#ebebeb] mb-[44px]" {...inView()} />
        <motion.p
          className="text-[#666] text-[14px] tracking-[2.5px] uppercase font-medium mb-[56px]"
          {...inView(0.05)}
        >
          {about.sectionContact}
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
          {t[lang].footer.rights}
        </span>
      </footer>
    </div>
  );
}
