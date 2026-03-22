import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export function CustomCursor() {
  const [isHoveringFeatured, setIsHoveringFeatured] = useState(false);
  const [isHoveringNDA, setIsHoveringNDA] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isVisible, setIsVisible] = useState(false);
  const [hasPointer, setHasPointer] = useState(true);

  const smoothX = useSpring(cursorX, { damping: 25, stiffness: 400 });
  const smoothY = useSpring(cursorY, { damping: 25, stiffness: 400 });

  const isExpanded = isHoveringFeatured || isHoveringNDA;

  useEffect(() => {
    const checkPointer = window.matchMedia("(pointer: fine)").matches;
    setHasPointer(checkPointer);

    if (!checkPointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);

      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="nda"]')) {
        setIsHoveringNDA(true);
        setIsHoveringFeatured(false);
      } else if (target.closest('[data-cursor="featured"]')) {
        setIsHoveringFeatured(true);
        setIsHoveringNDA(false);
      } else {
        setIsHoveringFeatured(false);
        setIsHoveringNDA(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const style = document.createElement('style');
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.head.removeChild(style);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!hasPointer || !isVisible) return null;

  return (
    <>
      {/* Small dot */}
      <motion.div
        className="fixed top-0 left-0 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: smoothX, y: smoothY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: isExpanded ? 120 : 24,
          height: isExpanded ? 120 : 24,
          opacity: isExpanded ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />

      {/* Expanded bubble */}
      <motion.div
        className="fixed top-0 left-0 rounded-full flex items-center justify-center overflow-hidden pointer-events-none z-[9998]"
        style={{ x: smoothX, y: smoothY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: isExpanded ? 120 : 24,
          height: isExpanded ? 120 : 24,
          backgroundColor: isExpanded ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0)",
          backdropFilter: isExpanded ? "blur(12px)" : "blur(0px)",
          borderColor: isExpanded ? "rgba(255, 255, 255, 0.4)" : "rgba(255, 255, 255, 0)",
          borderWidth: 1,
          borderStyle: "solid",
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* View Project label */}
        <motion.span
          className="text-white text-sm font-medium drop-shadow-md whitespace-nowrap absolute"
          animate={{
            opacity: isHoveringFeatured ? 1 : 0,
            scale: isHoveringFeatured ? 1 : 0.8,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25, delay: isHoveringFeatured ? 0.05 : 0 }}
        >
          View <span className="font-display italic font-light">Project</span>
        </motion.span>

        {/* Under NDA label */}
        <motion.span
          className="text-white text-[11px] font-sans font-medium drop-shadow-md whitespace-nowrap absolute flex flex-col items-center gap-1"
          animate={{
            opacity: isHoveringNDA ? 1 : 0,
            scale: isHoveringNDA ? 1 : 0.8,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25, delay: isHoveringNDA ? 0.05 : 0 }}
        >
          <LockIcon />
          <span className="uppercase tracking-[0.12em] leading-tight text-center text-[9px]">Under<br />NDA</span>
        </motion.span>
      </motion.div>
    </>
  );
}
