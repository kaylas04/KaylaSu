import { motion } from "motion/react";
import { Link } from "react-router";

export function Intro() {
  return (
    <section id="about" className="pt-28 pb-24 md:pt-40 md:pb-32 px-6 sm:px-12 md:px-24 flex flex-col items-center text-center w-full mx-auto bg-white rounded-t-3xl md:rounded-t-[3rem] shadow-[0_-10px_40px_rgba(10,25,47,0.03)] relative z-10 -mt-8 md:-mt-12">
      {/* Folder Tab Label */}
      <div className="absolute bottom-full left-6 sm:left-12 md:left-24 px-6 py-2 md:px-8 md:py-2.5 bg-[#F8FAFC] rounded-t-lg md:rounded-t-xl border border-b-0 border-[#0A192F]/5 flex items-center justify-center shadow-[0_-4px_10px_rgba(10,25,47,0.01)]">
        <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-[#506680] font-medium">ABOUT</span>
      </div>
      <div className="max-w-5xl mx-auto w-full">
        <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-sm sm:text-base md:text-lg lg:text-xl leading-[2.2] tracking-wide text-[#0A192F] font-serif font-light text-center max-w-3xl mx-auto"
      >
        I bridge{" "}
        <span className="font-display italic text-[#506680] text-[1.1em]">psychology</span>,{" "}
        <span className="font-display italic text-[#506680] text-[1.1em]">design</span>, and{" "}
        <span className="font-display italic text-[#506680] text-[1.1em]">entrepreneurship</span>{" "}
        to craft experiences that are both user-centered and strategically impactful.
        With a mind attuned to behavior and a heart drawn to innovation, I turn empathy into
        businesses and insights into action.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10 md:mt-12"
      >
        <Link
          to="/about"
          className="inline-flex items-center gap-3 px-8 py-4 transition-all duration-500 rounded-full group border border-[#0A192F]/20 hover:border-[#0A192F] hover:bg-white/60 backdrop-blur-sm"
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#0A192F]">
            Discover more about me
          </span>
          <svg
            className="w-3 h-3 transform transition-transform group-hover:translate-x-1 text-[#0A192F]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </motion.div>
      </div>
    </section>
  );
}
