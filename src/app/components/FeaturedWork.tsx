import { motion, useInView } from "motion/react";
import { Link } from "react-router";
import { useRef, useState, useEffect } from "react";
import silicanMockup from "@/assets/c863579f248b8548ab658513c4420d778adc3160.png";

const featuredProjects = [
  {
    id: "silican",
    title: "SiLican",
    description: "Transforming complex deep-tech information into a clear, credible B2B website experience.",
    image: silicanMockup,
    tags: ["Product Design", "Web Design & Development"],
    link: "/project/silican",
    objectFit: "cover" as const,
    imageBg: "transparent",
  },
  {
    id: "quotr",
    title: "Quotr",
    description: "An AI-powered estimation workflow for contractors, designed to streamline takeoff, cost review, and project comparison in one workspace.",
    image: "/images/preview.png",
    tags: ["AI PRODUCT DESIGN", "B2B WORKFLOW"],
    link: "/project/quotr",
    objectFit: "cover" as const,
    imageBg: "transparent",
  },
  {
    id: "origami-robotics",
    title: "Origami Robotics",
    description: "A product design project spanning both a public-facing website and an internal engineering dashboard, built to communicate complex manipulation systems with greater clarity, credibility, and usability.",
    image: "/images/origami_preview.png",
    tags: ["PRODUCT DESIGN", "SYSTEM EXPERIENCE"],
    link: "/project/origami-robotics",
    objectFit: "cover" as const,
    imageBg: "transparent",
  },
  {
    id: "moffitt-status",
    title: "Moffitt Status",
    description: "A library availability and space-browsing platform designed to help students quickly find open, less crowded study spaces and access booking information with less friction.",
    image: "/images/moffitt_preview.png",
    tags: ["UI/UX DESIGN", "CAMPUS PRODUCT"],
    link: "/project/moffitt-status",
    objectFit: "cover" as const,
    imageBg: "transparent",
    cursorType: "nda" as const,
  },
];

export function FeaturedWork() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isInView = useInView(sectionRef, { once: true, margin: "-120px" });

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const handleScroll = () => {
      const scrollWidth = element.scrollWidth - element.clientWidth;
      const scrolled = element.scrollLeft;
      const progress = scrollWidth > 0 ? scrolled / scrollWidth : 0;
      setScrollProgress(progress);
    };

    element.addEventListener('scroll', handleScroll);
    return () => element.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} id="work" className="pt-28 md:pt-40 pb-24 md:pb-32 w-full bg-[#F0F8FF] rounded-t-3xl md:rounded-t-[3rem] relative z-20 shadow-[0_-10px_40px_rgba(10,25,47,0.03)] -mt-8 md:-mt-12">
      {/* Folder Tab Label */}
      <div className="absolute bottom-full left-6 sm:left-12 md:left-24 px-6 py-2 md:px-8 md:py-2.5 bg-[#E2EAF2] rounded-t-lg md:rounded-t-xl border border-b-0 border-[#0A192F]/5 flex items-center justify-center shadow-[0_-4px_10px_rgba(10,25,47,0.01)]">
        <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-[#475569] font-medium">FEATURED WORK</span>
      </div>
      <div className="px-6 sm:px-12 md:px-24 max-w-[1400px] mx-auto mb-16">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-6xl md:text-8xl leading-none tracking-tighter text-[#475569]"
          >
            Featured <span className="font-display italic">Work</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#506680] max-w-sm text-lg sm:text-xl font-display italic leading-relaxed"
          >
            Dive into a world of creativity and inspiration with our portfolio. Explore our
            work and imagine the possibilities for your brand.
          </motion.p>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="w-full relative pb-8 overflow-hidden">
        <style dangerouslySetInnerHTML={{__html: `
          .featured-scroll {
            padding-left: 0.75rem;
            scroll-padding-left: 0.75rem;
          }
          .last-card { margin-right: 0.75rem; }
          @media (min-width: 640px) {
            .featured-scroll {
              padding-left: 1.5rem;
              scroll-padding-left: 1.5rem;
            }
            .last-card { margin-right: 1.5rem; }
          }
          @media (min-width: 768px) {
            .featured-scroll {
              padding-left: max(3rem, calc((100vw - 1400px) / 2 + 3rem));
              scroll-padding-left: max(3rem, calc((100vw - 1400px) / 2 + 3rem));
            }
            .last-card { margin-right: max(3rem, calc((100vw - 1400px) / 2 + 3rem)); }
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}} />
        <div 
          ref={scrollRef}
          className="featured-scroll flex overflow-x-auto gap-4 md:gap-8 snap-x snap-mandatory hide-scrollbar pb-6 md:pb-8 w-full"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch' 
          }}
        >
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 36 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
              transition={{ duration: 0.9, delay: 0.1 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className={`flex-shrink-0 snap-start w-[85vw] md:w-[60vw] lg:w-[45vw] max-w-[800px] group relative flex flex-col md:block h-auto md:aspect-[4/3] ${index === featuredProjects.length - 1 ? 'last-card' : ''}`}
              data-cursor={project.cursorType === "nda" ? "nda" : "featured"}
            >
              {/* Image Container */}
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] md:aspect-auto md:absolute md:inset-0 shadow-sm group-hover:shadow-xl transition-shadow duration-500" style={{ background: project.imageBg }}>
                <img
                  src={project.image}
                  alt={project.title}
                  className={`absolute inset-0 w-full h-full transition-transform duration-1000 group-hover:scale-105 pointer-events-none ${project.objectFit === "contain" ? "object-contain p-6" : "object-cover"}`}
                />
                {/* Gradient Overlay for Desktop Text Readability */}
                <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 pointer-events-none" />
              </div>

              {/* Content */}
              <div className="relative flex flex-col md:justify-between z-40 pointer-events-none mt-5 md:mt-0 md:absolute md:inset-0 md:p-6 lg:p-8">
                {/* Tags Container */}
                <div className="flex flex-wrap justify-start md:justify-end gap-3 mb-4 md:mb-0">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-5 py-2 rounded-full bg-transparent border border-[#0A192F]/30 md:border-white/40 font-sans text-[10px] uppercase tracking-[0.25em] text-[#0A192F] md:text-white transition-all duration-500 hover:bg-[#F0F8FF]/30 hover:backdrop-blur-md hover:border-[#0A192F] hover:text-[#0A192F] pointer-events-auto"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title & Description Container - Bottom Row */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-1 md:gap-4 w-full">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl text-[#0A192F] md:text-white font-serif tracking-tight whitespace-normal sm:whitespace-nowrap">
                    {project.title}
                  </h3>
                  <p className="text-[#506680] md:text-white/80 text-sm md:text-base max-w-[280px] lg:max-w-xs leading-relaxed opacity-90 text-left md:text-right font-sans font-light">
                    {project.description}
                  </p>
                </div>
              </div>

                <Link to={project.link} className="absolute inset-0 z-30 opacity-0 cursor-none" aria-label={`View ${project.title}`}>
                  View Project
                </Link>
            </motion.div>
          ))}
        </div>
        
        {/* Scroll Progress Indicator */}
        <div className="w-full flex justify-center px-6 mt-4 md:mt-6">
          <div className="w-full max-w-[200px] md:max-w-[300px] h-1 md:h-[3px] bg-[#0A192F]/10 relative overflow-hidden rounded-full">
            <motion.div 
              className="absolute inset-y-0 left-0 bg-[#0A192F]/60 w-full origin-left rounded-full"
              style={{ scaleX: scrollProgress }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}