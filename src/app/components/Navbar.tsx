import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Link } from "react-router";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [exploreHovered, setExploreHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const exploreRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: "Work", href: "/#work" },
    { label: "About", href: "/about" },
    { label: "Made to Explore", href: "/#explore" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kayla04", external: true }
  ];

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-sans pointer-events-auto"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Blurred background container */}
        <div 
          className={`absolute inset-0 transition-opacity duration-500 backdrop-blur-md ${
            isScrolled ? "bg-[#F0F8FF]/80 border-b border-[#0A192F]/5 opacity-100 shadow-sm" : "opacity-0"
          }`} 
        />

        <div className={`relative z-10 flex w-full items-center transition-all duration-500 ${isScrolled ? "px-6 py-4" : "p-6 md:p-10"}`}>
          {/* Logo & Portfolio text */}
          <div className="flex-1 flex items-center gap-4">
            <Link to="/" className="group relative flex items-center">
              <span className={`font-sans font-medium uppercase tracking-[0.2em] transition-all duration-500 text-[#0A192F] ${isScrolled ? "text-xs" : "text-sm"}`}>
                KAYLA SU
              </span>
            </Link>
            
            <span className={`hidden lg:inline-block font-sans text-[10px] tracking-[0.2em] uppercase text-[#506680] transition-opacity ${isScrolled ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}>product designer</span>
          </div>

          {/* Desktop Links — centered */}
          <nav className="hidden md:flex items-center gap-12">
            {links.map((item) =>
              item.label === "Made to Explore" ? (
                /* Coming Soon — no navigation, custom cursor bubble */
                <button
                  key={item.label}
                  ref={exploreRef}
                  className={`font-display italic text-[#0A192F]/40 transition-all duration-300 cursor-none relative ${isScrolled ? "text-base" : "text-lg"}`}
                  onMouseEnter={() => setExploreHovered(true)}
                  onMouseLeave={() => setExploreHovered(false)}
                  onMouseMove={(e) => {
                    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                  }}
                  onClick={(e) => e.preventDefault()}
                >
                  {item.label}
                  {/* Bubble cursor */}
                  <AnimatePresence>
                    {exploreHovered && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="pointer-events-none absolute z-[100] flex items-center justify-center rounded-full bg-[#0A192F] text-white"
                        style={{
                          width: 96,
                          height: 96,
                          left: cursorPos.x - 48,
                          top: cursorPos.y - 48,
                        }}
                      >
                        <span className="font-sans text-[10px] uppercase tracking-[0.2em] leading-tight text-center px-2">
                          Coming<br />Soon
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              ) : item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-display italic text-[#0A192F]/60 hover:text-[#0A192F] transition-all duration-300 ${isScrolled ? "text-base" : "text-lg"}`}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`font-display italic text-[#0A192F]/60 hover:text-[#0A192F] transition-all duration-300 ${isScrolled ? "text-base" : "text-lg"}`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Menu Button */}
          <div className="flex-1 flex justify-end">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="group flex flex-col items-end gap-1.5 cursor-pointer"
            >
              <span className="font-sans text-[10px] tracking-widest uppercase mb-1 text-[#0A192F]">
                Menu
              </span>
              <span className={`h-px bg-[#0A192F] transition-all duration-300 group-hover:w-12 ${isScrolled ? "w-6" : "w-8"}`} />
              <span className={`h-px bg-[#0A192F] transition-all duration-300 delay-75 group-hover:w-8 ${isScrolled ? "w-3" : "w-5"}`} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile/Full Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#F0F8FF]/95 backdrop-blur-xl flex flex-col px-6 py-8">
          <div className="flex justify-between items-center mb-16">
            <div className="font-sans font-medium uppercase tracking-[0.2em] text-[13px] text-[#0A192F]">
              KAYLA SU
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 -mr-2 text-[#0A192F] hover:bg-[#0A192F]/5 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="flex flex-col gap-8 text-4xl font-display italic text-[#0A192F] mt-10">
            {links.map((item, i) => (
              item.label === "Made to Explore" ? (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-center gap-4 opacity-40"
                >
                  <span>{item.label}</span>
                  <span className="font-sans text-xs tracking-widest uppercase text-[#506680] not-italic">Coming Soon</span>
                </motion.div>
              ) : item.external ? (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="hover:opacity-60 transition-opacity"
                >
                  {item.label}
                </motion.a>
              ) : (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:opacity-60 transition-opacity inline-block"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              )
            ))}
          </div>
        </div>
      )}
    </>
  );
}