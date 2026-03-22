import { motion } from "motion/react";
import { Hero3DScene } from "./Hero3DScene";

export function Hero() {
  return (
    <section className="relative w-full h-[115vh] min-h-[800px] flex flex-col items-center justify-center bg-[#F0F8FF] text-[#0A192F] overflow-hidden selection:bg-[#0A192F] selection:text-white font-sans">
      {/* 3D Centerpiece Background & Ascii Overlay */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <Hero3DScene />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col justify-center p-6 md:p-10 pointer-events-none">
        {/* Main Content (ES SE style) */}
        <main className="absolute top-[45vh] md:top-[50vh] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0">
          <div className="flex justify-between items-center w-full px-[5%] md:px-[10%] opacity-90 mix-blend-multiply">
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-[15vw] leading-none tracking-tighter text-[#475569]"
            >
              KAY
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-[15vw] leading-none tracking-tighter text-[#475569]"
            >
              LA
            </motion.h1>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full mt-40 md:mt-56 mx-[0px] mt-[299px] mb-[0px] px-[35px] py-[0px]">
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="mt-12 md:mt-16 pointer-events-auto"
            >
              <a
                href="https://drive.google.com/file/d/1_iaSjJrndlasNonWrjlrE24g8v7iKCB8/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 transition-all duration-500 rounded-full group border border-[#0A192F]/20 hover:border-[#0A192F] hover:bg-white/60 backdrop-blur-sm"
              >
                <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#0A192F]"><span className="font-bold">VIEW RESUME</span></span>
                <svg
                  className="w-3 h-3 transform transition-transform group-hover:translate-x-1 text-[#0A192F]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </div>
        </main>

        {/* Side Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute left-6 md:left-10 top-[50vh] -translate-y-1/2 hidden md:flex flex-col gap-8 items-center"
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#0A192F]/30 to-transparent" />
          <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-[#506680] [writing-mode:vertical-rl] rotate-180">
            Scroll
          </span>
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#0A192F]/30 to-transparent" />
        </motion.div>


      </div>
    </section>
  );
}
