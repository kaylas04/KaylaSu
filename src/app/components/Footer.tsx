import { Linkedin } from "lucide-react";
import { motion } from "motion/react";

export function Footer() {
  return (
    <footer className="w-full bg-[#E2EAF2] border-t border-[#0A192F]/5 relative z-40 rounded-t-3xl md:rounded-t-[3rem] -mt-8 md:-mt-12 shadow-[0_-10px_40px_rgba(10,25,47,0.03)]">
      <div className="w-full px-6 sm:px-12 md:px-24 pt-20 pb-8">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12 md:gap-8">
          
          {/* Left Side */}
          <div className="flex flex-col items-start gap-8">
            <div className="flex flex-col gap-3">
              <span className="font-sans font-medium uppercase tracking-[0.2em] text-[#0A192F] text-sm md:text-base">
                KAYLA SU
              </span>
              <p className="font-display italic text-[#506680] text-base md:text-lg max-w-sm">
                Building smarter, kinder experiences.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <div className="font-sans text-sm text-[#0A192F]/70">
                <a href="mailto:kaylasu0806@gmail.com" className="hover:text-[#0A192F] transition-colors">
                  kaylasu0806@gmail.com
                </a>
                <span className="text-[#0A192F]/30 mx-2">/</span>
                <a href="mailto:kayla04@berkeley.edu" className="hover:text-[#0A192F] transition-colors">
                  kayla04@berkeley.edu
                </a>
              </div>

              <a 
                href="https://www.linkedin.com/in/kayla04" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-[#0A192F]/20 text-[#0A192F] hover:bg-[#0A192F] hover:text-[#F0F8FF] hover:border-[#0A192F] transition-all duration-500"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col items-start md:items-end gap-3 md:gap-4 mt-2 md:mt-0">
            {[
              { label: 'Work', href: '#work' },
              { label: 'About', href: '#about' },
              { label: 'Made to Explore', href: '#explore' }
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group flex items-center gap-4"
              >
                <span className="font-display italic text-xl md:text-2xl text-[#0A192F]/70 group-hover:text-[#0A192F] transition-colors">
                  {link.label}
                </span>
                <motion.span 
                  className="w-0 h-[1px] bg-[#0A192F]/40 transition-all duration-300 group-hover:w-8 hidden md:block"
                />
              </a>
            ))}
          </div>

        </div>

        {/* Bottom Section */}
        <div className="max-w-[1400px] mx-auto mt-16 pt-6 border-t border-[#0A192F]/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-sans text-[10px] text-[#506680] uppercase tracking-[0.2em] text-center md:text-left">
            Best viewed on desktop
          </span>
          <span className="font-sans text-[10px] text-[#506680] uppercase tracking-[0.2em] text-center md:text-right">
            Designed & built by Kayla Su · 2026
          </span>
        </div>
      </div>
    </footer>
  );
}