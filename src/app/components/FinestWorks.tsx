import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

const finestProjects = [
  {
    id: "flexi",
    title: "Flexi",
    subtitle: "Cal Hacks 11.0",
    tags: ["Hackathon", "UX Design", "Mobile App"],
    image: "/images/flexi.png",
  },
  {
    id: "teachtech",
    title: "TeachTech",
    subtitle: "Challenge Lab",
    tags: ["EdTech", "Product Design", "Research"],
    image: "/images/teach_tech.png",
  },
  {
    id: "recyclehub",
    title: "RecycleHub",
    subtitle: "HackDavis 2024",
    tags: ["Hackathon", "Sustainability", "Mobile App"],
    image: "/images/re.png",
  },
  {
    id: "cloudrush",
    title: "CloudRush",
    subtitle: "Class Project",
    tags: ["UX Design", "Web App"],
    image: "/images/cloud_rush.png",
  },
  {
    id: "cartology",
    title: "Cartology",
    subtitle: "Class Project",
    tags: ["Data Viz", "UX Research"],
    image: "/images/cartology.png",
  },
];

function ProjectCard({ project }: { project: typeof finestProjects[0] }) {
  const [hovered, setHovered] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative cursor-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      {/* Image container — full image visible */}
      <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] bg-[#f0f0f5] mb-6 shadow-sm">
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-contain"
          draggable={false}
        />
        {/* Edge blend — inset shadow paints bg colour over all 4 edges */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[2rem]"
          style={{ boxShadow: "inset 0 0 48px 28px #f0f0f5" }}
        />
      </div>

      {/* Text below */}
      <div className="flex flex-col gap-3 px-2">
        <div>
          <h3 className="text-2xl md:text-[1.75rem] text-[#0A192F] font-serif tracking-tight leading-tight">
            {project.title}
          </h3>
          <p className="font-sans text-[#506680] text-sm tracking-wide mt-0.5">
            {project.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full border border-[#0A192F]/10 text-[#506680] text-[11px] tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Coming Soon bubble cursor */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute z-50 flex items-center justify-center rounded-full bg-[#0A192F] text-white"
            style={{
              width: 96,
              height: 96,
              left: cursor.x - 48,
              top: cursor.y - 48,
            }}
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] leading-tight text-center px-2">
              Coming<br />Soon
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FinestWorks() {
  return (
    <section id="explore" className="w-full bg-white rounded-t-3xl md:rounded-t-[3rem] pt-28 md:pt-40 pb-24 md:pb-32 shadow-[0_-10px_40px_rgba(10,25,47,0.03)] relative z-30 -mt-8 md:-mt-12">
      {/* Folder Tab Label */}
      <div className="absolute bottom-full left-6 sm:left-12 md:left-24 px-6 py-2 md:px-8 md:py-2.5 bg-[#F8FAFC] rounded-t-lg md:rounded-t-xl border border-b-0 border-[#0A192F]/5 flex items-center justify-center shadow-[0_-4px_10px_rgba(10,25,47,0.01)]">
        <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-[#506680] font-medium">MADE TO EXPLORE</span>
      </div>

      <div className="px-6 sm:px-12 md:px-24 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl md:text-6xl lg:text-[5rem] leading-none tracking-tighter text-[#475569] mb-6"
          >
            Made to <span className="font-display italic">Explore</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#506680] max-w-lg text-lg sm:text-xl font-display italic leading-relaxed"
          >
            Projects built fast, under pressure, and with intention.
            More details coming soon.
          </motion.p>
        </div>

        {/* 2-column grid — larger cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-16">
          {finestProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
