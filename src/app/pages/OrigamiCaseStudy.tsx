import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

/* ─── Paper palette ────────────────────────────────────────────────
   bg      : #F5F0E8  warm ivory / bone
   ink     : #2A2620  near-black warm charcoal
   body    : #56504A  soft graphite
   dim     : #7A7268  muted warm gray
   accent  : #8C7B62  amber / kraft paper
   rule    : #D9D3C8  light fog divider
   surface : #EDE8DF  slightly darker paper card
──────────────────────────────────────────────────────────────────── */

const P = {
  bg: "#F5F0E8",
  surface: "#EDE8DF",
  ink: "#2A2620",
  body: "#56504A",
  dim: "#7A7268",
  accent: "#8C7B62",
  rule: "#D9D3C8",
  accentFaint: "rgba(140,123,98,0.12)",
  accentBorder: "rgba(140,123,98,0.22)",
};

const meta = [
  { label: "Project Type", value: "Robotics UX\nHardware Interface\nEmbodied Interaction" },
  { label: "Timeline",     value: "Feb 2026 – Present" },
  { label: "Team",         value: "Co-founders\nMechanical Engineers\nSoftware Engineers\nUX Designer" },
  { label: "Role",         value: "UX Designer" },
];


const solutions = [
  {
    index: "01",
    title: "Spatial fold state visualiser",
    body: "A live wireframe view that mirrors the robot's physical configuration in real time, using origami-inspired vector diagrams updated from sensor telemetry. Operators can read state at a glance without interpreting raw data.",
  },
  {
    index: "02",
    title: "Sequence composer",
    body: "A modular, node-based canvas for building fold sequences without touching configuration files. Each step is a named fold state; transitions are drag-connected and preview-able before deployment.",
  },
  {
    index: "03",
    title: "Contextual error cards",
    body: "When a fault occurs mid-sequence, a structured error card surfaces the affected joint, the expected vs actual state, and a plain-language recovery path — eliminating the need to cross-reference raw logs.",
  },
];

/* Decorative technical grid line SVG */
function GridLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: 0.045 }}
      aria-hidden
    >
      <defs>
        <pattern id="techGrid" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#2A2620" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#techGrid)" />
    </svg>
  );
}

/* Inline SVG grain filter ——applied as a pseudo-texture div */
function PaperGrain({ opacity = 0.032 }: { opacity?: number }) {
  return (
    <>
      <svg width="0" height="0" className="absolute" aria-hidden>
        <filter id="pgrain" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="linearRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
          <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="blend" />
          <feComposite in="blend" in2="SourceGraphic" operator="in" />
        </filter>
      </svg>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          opacity,
          mixBlendMode: "multiply",
        }}
      />
    </>
  );
}

/* Thin animated rule */
function AnimRule({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
      className="h-px origin-left"
      style={{ backgroundColor: P.rule }}
    />
  );
}

/* Section label — e.g. "Research" */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-6 h-px" style={{ backgroundColor: P.accent }} />
      <span
        className="font-sans text-[10px] uppercase tracking-[0.3em]"
        style={{ color: P.accent }}
      >
        {children}
      </span>
    </div>
  );
}

/* ── Origami wireframe illustration (SVG) ─────────────────────────
   A minimal geometric origami crane silhouette rendered in hairline strokes
──────────────────────────────────────────────────────────────────── */
function OrigamiDiagram({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 260"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Ground shadow */}
      <ellipse cx="180" cy="248" rx="90" ry="6" fill={P.rule} opacity="0.4" />

      {/* Body polygon */}
      <polygon
        points="180,40 280,160 180,200 80,160"
        fill="none"
        stroke={P.accent}
        strokeWidth="0.8"
      />
      {/* Internal fold lines */}
      <line x1="180" y1="40"  x2="180" y2="200" stroke={P.accent} strokeWidth="0.5" strokeDasharray="4 4" opacity="0.5" />
      <line x1="80"  y1="160" x2="280" y2="160" stroke={P.accent} strokeWidth="0.5" strokeDasharray="4 4" opacity="0.5" />
      <line x1="180" y1="40"  x2="80"  y2="160" stroke={P.body}   strokeWidth="0.4" opacity="0.3" />
      <line x1="180" y1="40"  x2="280" y2="160" stroke={P.body}   strokeWidth="0.4" opacity="0.3" />

      {/* Left wing */}
      <polygon
        points="80,160 20,100 130,80"
        fill="none"
        stroke={P.body}
        strokeWidth="0.7"
        opacity="0.6"
      />
      <line x1="80" y1="160" x2="130" y2="80" stroke={P.body} strokeWidth="0.4" strokeDasharray="3 5" opacity="0.4" />

      {/* Right wing */}
      <polygon
        points="280,160 340,100 230,80"
        fill="none"
        stroke={P.body}
        strokeWidth="0.7"
        opacity="0.6"
      />
      <line x1="280" y1="160" x2="230" y2="80" stroke={P.body} strokeWidth="0.4" strokeDasharray="3 5" opacity="0.4" />

      {/* Head / beak */}
      <polyline
        points="180,200 165,230 148,238"
        fill="none"
        stroke={P.accent}
        strokeWidth="0.8"
      />
      {/* Tail */}
      <polyline
        points="180,200 195,232 214,240"
        fill="none"
        stroke={P.accent}
        strokeWidth="0.8"
      />

      {/* Dimension tick marks */}
      {[
        [80, 160, 80, 152],
        [280, 160, 280, 152],
        [180, 40, 188, 40],
      ].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={P.dim} strokeWidth="0.5" />
      ))}

      {/* Corner registration mark */}
      <g opacity="0.25" stroke={P.ink} strokeWidth="0.5">
        <line x1="8" y1="8"  x2="24" y2="8"  />
        <line x1="8" y1="8"  x2="8"  y2="24" />
        <line x1="352" y1="8"  x2="336" y2="8"  />
        <line x1="352" y1="8"  x2="352" y2="24" />
        <line x1="8" y1="252" x2="24" y2="252" />
        <line x1="8" y1="252" x2="8"  y2="236" />
      </g>
    </svg>
  );
}

/* ── Robot fold-state wireframe ──────────────────────────────────── */
function FoldStateWireframe({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 440 320" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      {/* Panel grid */}
      {[0, 1, 2, 3].map((col) =>
        [0, 1, 2].map((row) => {
          const x = 40 + col * 90;
          const y = 40 + row * 80;
          const active = (col + row) % 3 === 0;
          return (
            <g key={`${col}-${row}`}>
              <rect
                x={x} y={y} width={78} height={68}
                fill={active ? P.accentFaint : "none"}
                stroke={active ? P.accent : P.rule}
                strokeWidth={active ? 0.8 : 0.5}
                rx="1"
              />
              {active && (
                <>
                  <line x1={x} y1={y} x2={x + 78} y2={y + 68}
                    stroke={P.accent} strokeWidth="0.4" strokeDasharray="3 4" />
                  <line x1={x + 78} y1={y} x2={x} y2={y + 68}
                    stroke={P.accent} strokeWidth="0.4" strokeDasharray="3 4" />
                </>
              )}
            </g>
          );
        })
      )}
      {/* Status bar */}
      <rect x="40" y="290" width="360" height="16" rx="2"
        fill="none" stroke={P.rule} strokeWidth="0.5" />
      <rect x="40" y="290" width="220" height="16" rx="2"
        fill={P.accentFaint} stroke="none" />
      <text x="48" y="301" fontFamily="Jost, sans-serif" fontSize="7"
        fill={P.accent} letterSpacing="1">FOLD STATE: ACTIVE — SEQUENCE 3 / 7</text>

      {/* Corner marks */}
      <g opacity="0.2" stroke={P.ink} strokeWidth="0.5">
        <line x1="12" y1="12" x2="28" y2="12" /><line x1="12" y1="12" x2="12" y2="28" />
        <line x1="428" y1="12" x2="412" y2="12" /><line x1="428" y1="12" x2="428" y2="28" />
      </g>
    </svg>
  );
}

/* ── Sequence node diagram ───────────────────────────────────────── */
function SequenceDiagram({ className = "" }: { className?: string }) {
  const nodes = [
    { x: 60,  label: "FLAT" },
    { x: 160, label: "FOLD A" },
    { x: 260, label: "FOLD B" },
    { x: 360, label: "LOCK" },
  ];
  return (
    <svg viewBox="0 0 440 120" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      {/* Connector lines */}
      {nodes.slice(0, -1).map((n, i) => (
        <line key={i}
          x1={n.x + 32} y1="60" x2={nodes[i + 1].x - 32} y2="60"
          stroke={P.rule} strokeWidth="1"
        />
      ))}
      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={n.label}>
          <circle cx={n.x} cy="60" r="28"
            fill={i === 2 ? P.accentFaint : "none"}
            stroke={i === 2 ? P.accent : P.rule}
            strokeWidth={i === 2 ? 0.8 : 0.5}
          />
          <text x={n.x} y="57" textAnchor="middle"
            fontFamily="Jost, sans-serif" fontSize="6.5"
            fill={i === 2 ? P.accent : P.dim}
            letterSpacing="1.2"
          >
            {n.label}
          </text>
          <text x={n.x} y="68" textAnchor="middle"
            fontFamily="Jost, sans-serif" fontSize="5.5"
            fill={P.dim} opacity="0.7"
          >
            {String(i + 1).padStart(2, "0")}
          </text>
          {i === 2 && (
            <circle cx={n.x} cy="60" r="32"
              fill="none" stroke={P.accent} strokeWidth="0.4" strokeDasharray="3 4" />
          )}
        </g>
      ))}
      {/* Arrow */}
      <polygon points="392,57 404,60 392,63" fill={P.rule} />
    </svg>
  );
}

/* ── Error card diagram ──────────────────────────────────────────── */
function ErrorCardDiagram({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 440 200" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <rect x="40" y="24" width="360" height="152" rx="3"
        fill={P.surface} stroke={P.rule} strokeWidth="0.7" />
      {/* Header strip */}
      <rect x="40" y="24" width="360" height="32" rx="3"
        fill={P.accentFaint} stroke="none" />
      <rect x="40" y="44" width="360" height="12" rx="0"
        fill={P.accentFaint} stroke="none" />
      <circle cx="64" cy="40" r="7"
        fill="none" stroke={P.accent} strokeWidth="0.8" />
      <line x1="64" y1="35" x2="64" y2="40" stroke={P.accent} strokeWidth="1.2" />
      <circle cx="64" cy="43" r="1" fill={P.accent} />
      <text x="80" y="43" fontFamily="Jost, sans-serif" fontSize="7.5"
        fill={P.accent} letterSpacing="1">JOINT FAULT — AXIS 3 OVERLOAD</text>

      {/* Body rows */}
      {[
        ["EXPECTED STATE", "FOLD B — 42°"],
        ["ACTUAL STATE",   "FOLD B — 38° (Δ4°)"],
        ["AFFECTED JOINT", "Left Lateral Hinge"],
        ["RECOVERY",       "Re-home axis 3 → retry step 06"],
      ].map(([k, v], i) => (
        <g key={k}>
          <text x="60" y={82 + i * 24} fontFamily="Jost, sans-serif" fontSize="6.5"
            fill={P.dim} letterSpacing="0.8">{k}</text>
          <text x="220" y={82 + i * 24} fontFamily="Jost, sans-serif" fontSize="7"
            fill={P.body} letterSpacing="0.4">{v}</text>
          <line x1="60" y1={88 + i * 24} x2="380" y2={88 + i * 24}
            stroke={P.rule} strokeWidth="0.4" />
        </g>
      ))}

      {/* Corner marks */}
      <g opacity="0.15" stroke={P.ink} strokeWidth="0.5">
        <line x1="12" y1="8" x2="26" y2="8" /><line x1="12" y1="8" x2="12" y2="22" />
        <line x1="428" y1="8" x2="414" y2="8" /><line x1="428" y1="8" x2="428" y2="22" />
      </g>
    </svg>
  );
}

export function OrigamiCaseStudy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [solutionHovered, setSolutionHovered] = useState(false);
  const [solutionCursorPos, setSolutionCursorPos] = useState({ x: 0, y: 0 });

  return (
    <div
      className="w-full min-h-screen relative overflow-x-hidden"
      style={{ backgroundColor: P.bg, color: P.ink }}
    >
      {/* Global paper grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23g)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.028,
          mixBlendMode: "multiply",
        }}
      />

      {/* Selection colour */}
      <style>{`::selection { background: ${P.accent}; color: #fff; }`}</style>

      <div className="relative z-[2]">
        <Navbar />

        {/* ── Hero ───────────────────────────────────────────────── */}
        <section className="relative w-full pt-[72px] md:pt-[100px]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative"
          >
            <video
              src="/videos/origami_hero.mov?v=2"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto block"
              style={{ filter: "sepia(0.06) brightness(0.98)" }}
            />
            {/* Warm overlay tint — fades into page bg at bottom */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, transparent 60%, rgba(245,240,232,0.6) 100%)",
              }}
            />
          </motion.div>
        </section>

        {/* ── Overview ───────────────────────────────────────────── */}
        <section className="relative pt-24 md:pt-32 pb-24 px-6 sm:px-12 md:px-24 max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              className="font-serif leading-[0.88] tracking-tighter mb-6"
              style={{ fontSize: "clamp(4rem, 10vw, 8rem)", color: P.ink }}
            >
              Origami<br />
              <span className="font-display italic" style={{ color: P.accent }}>
                Robotics
              </span>
            </h1>
          </motion.div>

          <AnimRule delay={0.2} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mt-16 md:mt-24">
            {/* Metadata */}
            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-8 text-sm font-sans">
              {meta.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <h4
                    className="text-[10px] uppercase tracking-[0.22em] mb-2"
                    style={{ color: P.accent }}
                  >
                    {item.label}
                  </h4>
                  <p className="whitespace-pre-line leading-relaxed" style={{ color: P.body }}>
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Overview text */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1 }}
              className="lg:col-span-8 lg:col-start-6 flex flex-col justify-start"
            >
              <p
                className="font-display italic leading-tight mb-8"
                style={{ fontSize: "clamp(1.35rem, 2.8vw, 2.25rem)", color: P.ink }}
              >
                Designing both the internal tooling and external product language for a reconfigurable robotics platform.
              </p>

              <div
                className="font-sans leading-relaxed max-w-2xl text-base md:text-lg flex flex-col gap-6 font-light"
                style={{ color: P.body }}
              >
                <p>
                  Origami Robotics builds soft robotic systems that fold and reconfigure on demand, creating complex workflows across training, simulation, and hardware behavior.
                </p>
                <p>
                  I designed engineer-facing interfaces for internal workflows, while also creating external demos, visual assets, and web experiences that made the system easier to understand and communicate.
                </p>
              </div>
            </motion.div>
          </div>
        </section>


        {/* ── Problem ─────────────────────────────────────────────── */}
        <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-24 py-28 md:py-36">

          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-16 md:mb-20"
          >
            <div className="w-8 h-px" style={{ backgroundColor: P.rule }} />
            <span className="font-sans text-[10px] uppercase tracking-[0.35em]" style={{ color: P.dim }}>
              Problem
            </span>
          </motion.div>

          {/* Two-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">

            {/* ── External ── */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-8"
            >
              {/* Label + copy */}
              <div className="flex flex-col gap-4">
                <span
                  className="font-sans text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: P.accent }}
                >
                  External
                </span>
                <h3
                  className="font-serif leading-snug"
                  style={{ fontSize: "clamp(1.2rem, 2vw, 1.5rem)", color: P.ink }}
                >
                  How do you communicate a highly technical robotics system to investors, partners, and broader audiences?
                </h3>
                <p
                  className="font-sans text-sm leading-relaxed font-light max-w-md"
                  style={{ color: P.body }}
                >
                  Origami's technical depth was difficult to translate into clear external communication, creating friction in how the product was understood by non-specialist audiences.
                </p>
              </div>

              {/* Asset: origami_ex video */}
              <div
                className="relative overflow-hidden w-full"
                style={{
                  border: `0.5px solid ${P.rule}`,
                  background: P.surface,
                }}
              >
                <PaperGrain opacity={0.016} />
                <video
                  src="/videos/origami_ex.mov"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto block relative z-10"
                  style={{ display: "block" }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-px z-20"
                  style={{ backgroundColor: P.rule }}
                />
              </div>
            </motion.div>

            {/* ── Internal ── */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-8"
            >
              {/* Label + copy */}
              <div className="flex flex-col gap-4">
                <span
                  className="font-sans text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: P.accent }}
                >
                  Internal
                </span>
                <h3
                  className="font-serif leading-snug"
                  style={{ fontSize: "clamp(1.2rem, 2vw, 1.5rem)", color: P.ink }}
                >
                  The training experience lacked a unified workflow, leaving engineers scattered across surfaces.
                </h3>
                <p
                  className="font-sans text-sm leading-relaxed font-light max-w-md"
                  style={{ color: P.body }}
                >
                  The internal training experience lacked a unified workflow, leaving engineers to piece together session health, failure causes, and next actions across multiple surfaces.
                </p>
              </div>

              {/* Asset: origami_dash image */}
              <div
                className="relative overflow-hidden w-full"
                style={{
                  border: `0.5px solid ${P.rule}`,
                  background: P.surface,
                }}
              >
                <PaperGrain opacity={0.016} />
                <img
                  src="/images/origami_dash.png"
                  alt="Origami internal dashboard"
                  className="w-full h-auto block relative z-10"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-px z-20"
                  style={{ backgroundColor: P.rule }}
                />
              </div>
            </motion.div>

          </div>
        </section>

        {/* ── HMW Bridge ─────────────────────────────────────────── */}
        <section
          className="py-32 relative overflow-hidden"
          style={{
            backgroundColor: P.surface,
            borderTop: `0.5px solid ${P.rule}`,
            borderBottom: `0.5px solid ${P.rule}`,
          }}
        >
          <PaperGrain opacity={0.022} />
          <GridLines />
          <div className="px-6 sm:px-12 md:px-24 max-w-[900px] mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="font-sans text-[10px] uppercase tracking-[0.4em] mb-8 block"
                style={{ color: P.accent }}
              >
                Design question
              </span>
              <h2
                className="font-serif leading-tight"
                style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", color: P.ink }}
              >
                How might we bring greater clarity to both the{" "}
                <span className="font-display italic" style={{ color: P.accent }}>
                  training workflow
                </span>{" "}
                and the outward communication of a highly technical{" "}
                <span className="font-display italic" style={{ color: P.accent }}>
                  robotics platform
                </span>
                ?
              </h2>
            </motion.div>
          </div>
        </section>

        {/* ── A. Product framing ─────────────────────────────────── */}
        <section
          className="py-28 md:py-36 relative overflow-hidden"
          style={{ borderTop: `0.5px solid ${P.rule}` }}
        >
          <PaperGrain opacity={0.018} />
          <div className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-24 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
              {/* Left: label + heading + bullets */}
              <motion.div
                className="md:col-span-5 flex flex-col gap-8"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div>
                  <SectionLabel>Product framing</SectionLabel>
                  <h2
                    className="font-serif text-3xl md:text-4xl leading-tight tracking-tight mt-4"
                    style={{ color: P.ink }}
                  >
                    Shaping the{" "}
                    <span className="font-display italic" style={{ color: P.accent }}>
                      product direction
                    </span>
                  </h2>
                </div>
                <div className="flex flex-col gap-6">
                  {[
                    "Worked closely with the founder to contribute to early PRD development, helping define product direction, key needs, and overall problem framing.",
                    "Helped identify the most important user surfaces and workflows across both internal tooling and external-facing experiences.",
                    "Clarified what the product needed to communicate internally for technical use versus externally for demos, brand, and investor understanding.",
                  ].map((text, i) => (
                    <motion.div
                      key={i}
                      className="flex gap-4"
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span
                        className="font-sans text-[10px] pt-[3px] shrink-0 tracking-[0.2em]"
                        style={{ color: P.accent }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="font-sans text-sm leading-relaxed font-light" style={{ color: P.body }}>
                        {text}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right: prd.png */}
              <motion.div
                className="md:col-span-7"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className="relative overflow-hidden"
                  style={{ background: P.surface, border: `0.5px solid ${P.rule}` }}
                >
                  <PaperGrain opacity={0.014} />
                  <img
                    src="/images/prd.png"
                    alt="Product requirements document"
                    className="w-full h-auto block relative z-10"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── B. Branding + website direction ────────────────────── */}
        <section
          className="py-28 md:py-36 relative overflow-hidden"
          style={{ backgroundColor: P.surface, borderTop: `0.5px solid ${P.rule}` }}
        >
          <PaperGrain opacity={0.022} />
          <GridLines />
          <div className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-24 relative z-10">
            {/* Header */}
            <motion.div
              className="mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <SectionLabel>Brand direction</SectionLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                <h2
                  className="font-serif text-3xl md:text-4xl leading-tight tracking-tight"
                  style={{ color: P.ink }}
                >
                  Branding &{" "}
                  <span className="font-display italic" style={{ color: P.accent }}>
                    website direction
                  </span>
                </h2>
                <div className="flex flex-col gap-4">
                  <p className="font-sans text-sm leading-relaxed font-light" style={{ color: P.body }}>
                    Established an early brand and visual language that made Origami's technical ambition feel more coherent, credible, and externally legible.
                  </p>
                  <p className="font-sans text-sm leading-relaxed font-light" style={{ color: P.body }}>
                    Shaped how the company presents itself through branding and website direction, helping translate a complex robotics product into a clearer first impression.
                  </p>
                </div>
              </div>
            </motion.div>

            <AnimRule />

            {/* Branch 1: Visual identity — two images */}
            <div className="mt-14">
              <span
                className="font-sans text-[9px] uppercase tracking-[0.3em] block mb-5"
                style={{ color: P.dim }}
              >
                Visual identity
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["branding.png", "branding_1.png"].map((img, i) => (
                  <motion.div
                    key={img}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                    style={{ border: `0.5px solid ${P.rule}` }}
                  >
                    <img
                      src={`/images/${img}`}
                      alt={`Brand identity ${i + 1}`}
                      className="w-full h-auto block"
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Branch 2: Motion direction — three videos */}
            <div className="mt-10">
              <span
                className="font-sans text-[9px] uppercase tracking-[0.3em] block mb-5"
                style={{ color: P.dim }}
              >
                Motion direction
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {["motion_in.mov", "motion_in_1.mov", "motion_in_2.mov"].map((vid, i) => (
                  <motion.div
                    key={vid}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                    style={{ border: `0.5px solid ${P.rule}` }}
                  >
                    <video
                      src={`/videos/${vid}`}
                      autoPlay muted loop playsInline
                      className="w-full h-auto block"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── C. AI-assisted visual systems ──────────────────────── */}
        <section
          className="py-28 md:py-36 relative overflow-hidden"
          style={{ borderTop: `0.5px solid ${P.rule}` }}
        >
          <PaperGrain opacity={0.018} />
          <div className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-24 relative z-10">
            {/* Header */}
            <motion.div
              className="mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <SectionLabel>AI-assisted visual systems</SectionLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                <h2
                  className="font-serif text-3xl md:text-4xl leading-tight tracking-tight"
                  style={{ color: P.ink }}
                >
                  Building{" "}
                  <span className="font-display italic" style={{ color: P.accent }}>
                    visual capability
                  </span>
                </h2>
                <div className="flex flex-col gap-4">
                  <p className="font-sans text-sm leading-relaxed font-light" style={{ color: P.body }}>
                    Built visual assets for robotics component and system storytelling — used across demos, website, and investor-facing materials.
                  </p>
                  <p className="font-sans text-sm leading-relaxed font-light" style={{ color: P.body }}>
                    Helped communicate product capability before the hardware had fully matured, giving the team a way to show what Origami could become.
                  </p>
                </div>
              </div>
            </motion.div>

            <AnimRule />

            {/* Sub 1: Asset showcase */}
            <div className="mt-14">
              <span
                className="font-sans text-[9px] uppercase tracking-[0.3em] block mb-5"
                style={{ color: P.dim }}
              >
                Asset showcase
              </span>

              {/* 4-col grid: image + 3 videos */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                  style={{ border: `0.5px solid ${P.rule}` }}
                >
                  <img
                    src="/images/Image asset.png"
                    alt="Visual asset"
                    className="w-full h-full object-cover block"
                  />
                </motion.div>
                {["origami_product.mp4", "side.mp4", "color_fold (1).mp4"].map((vid, i) => (
                  <motion.div
                    key={vid}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.08 * (i + 1), ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                    style={{ border: `0.5px solid ${P.rule}` }}
                  >
                    <video
                      src={`/videos/${vid}`}
                      autoPlay muted loop playsInline
                      className="w-full h-full object-cover block"
                    />
                  </motion.div>
                ))}
              </div>

              {/* Website showcase */}
              <div className="mt-10">
                <span
                  className="font-sans text-[9px] uppercase tracking-[0.3em] block mb-5"
                  style={{ color: P.dim }}
                >
                  Website showcase
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {["origami_web_1.mov", "origami_web.mov"].map((vid, i) => (
                    <motion.div
                      key={vid}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                      style={{ border: `0.5px solid ${P.rule}` }}
                    >
                      <video
                        src={`/videos/${vid}`}
                        autoPlay muted loop playsInline
                        className="w-full h-auto block"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sub 2: Behind the scenes */}
            <div
              className="mt-14"
              style={{ borderTop: `0.5px solid ${P.rule}`, paddingTop: "3.5rem" }}
            >
              <span
                className="font-sans text-[9px] uppercase tracking-[0.3em] block mb-5"
                style={{ color: P.dim }}
              >
                Behind the scenes
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["people.JPG", "people_1.JPG"].map((img, i) => (
                  <motion.div
                    key={img}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                    style={{ border: `0.5px solid ${P.rule}` }}
                  >
                    <img
                      src={`/images/${img}`}
                      alt={`Behind the scenes ${i + 1}`}
                      className="w-full h-auto block"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── D. Engineer-facing dashboard exploration ─────────────── */}
        <section
          className="py-28 md:py-36 relative overflow-hidden"
          style={{ backgroundColor: P.surface, borderTop: `0.5px solid ${P.rule}` }}
        >
          <PaperGrain opacity={0.018} />
          <div className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-24 relative z-10">

            {/* Header row */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <SectionLabel>Engineer-facing exploration</SectionLabel>
                <h2
                  className="font-serif leading-tight mt-4"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: P.ink }}
                >
                  Dashboard<br />
                  <span className="font-display italic" style={{ color: P.accent }}>research & mapping</span>
                </h2>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans text-sm leading-relaxed max-w-xs"
                style={{ color: P.dim }}
              >
                Adjacent tools reviewed to understand how the industry handles live monitoring, post-run diagnosis, and workflow clarity for technical operators.
              </motion.p>
            </div>

            {/* Axis labels */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative"
            >
              {/* X-axis labels */}
              <div className="flex justify-between mb-2 px-14">
                <span className="font-sans text-[9px] uppercase tracking-[0.28em]" style={{ color: P.dim }}>Live Monitoring</span>
                <span className="font-sans text-[9px] uppercase tracking-[0.28em]" style={{ color: P.dim }}>Post-run Diagnosis</span>
              </div>
              {/* X-axis rule */}
              <div className="h-px mx-14 mb-1" style={{ backgroundColor: P.rule }} />

              <div className="relative flex gap-0" style={{ minHeight: 520 }}>
                {/* Y-axis label + rule */}
                <div className="relative flex-shrink-0 w-14 flex flex-col justify-between items-center py-4">
                  <span
                    className="font-sans text-[9px] uppercase tracking-[0.28em]"
                    style={{ color: P.dim, writingMode: "vertical-rl", transform: "rotate(180deg)", whiteSpace: "nowrap" }}
                  >
                    General-purpose
                  </span>
                  <span
                    className="font-sans text-[9px] uppercase tracking-[0.28em]"
                    style={{ color: P.dim, writingMode: "vertical-rl", transform: "rotate(180deg)", whiteSpace: "nowrap" }}
                  >
                    Robotics-specific
                  </span>
                  {/* Y-axis rule */}
                  <div className="absolute right-0 top-0 bottom-0 w-px" style={{ backgroundColor: P.rule }} />
                </div>

                {/* Grid area — cards positioned absolutely */}
                <div className="relative flex-1">
                  {/* Faint quadrant lines */}
                  <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.35 }}>
                    <div className="absolute top-1/2 left-0 right-0 h-px" style={{ backgroundColor: P.rule }} />
                    <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ backgroundColor: P.rule }} />
                  </div>

                  {[
                    {
                      name: "Datadog",
                      left: "3%", top: "3%",
                      tags: [
                        { label: "Monitoring", color: "#3C3489", bg: "#EEEDFE" },
                        { label: "Logs", color: "#3C3489", bg: "#EEEDFE" },
                        { label: "Error tracking", color: "#3C3489", bg: "#EEEDFE" },
                      ],
                      takeaway: "Best-in-class composable dashboards; no domain-specific robotics support.",
                    },
                    {
                      name: "Scale AI",
                      left: "60%", top: "3%",
                      tags: [
                        { label: "Review flow", color: "#633806", bg: "#FAEEDA" },
                        { label: "Model monitoring", color: "#633806", bg: "#FAEEDA" },
                        { label: "Data ops", color: "#633806", bg: "#FAEEDA" },
                      ],
                      takeaway: "Review-centric workflows for evaluating model outputs at scale.",
                    },
                    {
                      name: "Roboflow",
                      left: "64%", top: "18%",
                      tags: [
                        { label: "Labeling", color: "#27500A", bg: "#EAF3DE" },
                        { label: "Dataset workflow", color: "#27500A", bg: "#EAF3DE" },
                        { label: "AI-assisted", color: "#27500A", bg: "#EAF3DE" },
                      ],
                      takeaway: "Tight dataset iteration loop with inline AI assist for annotation.",
                    },
                    {
                      name: "Foxglove",
                      left: "8%", top: "52%",
                      tags: [
                        { label: "Robotics data", color: "#085041", bg: "#E1F5EE" },
                        { label: "Playback", color: "#085041", bg: "#E1F5EE" },
                        { label: "Multi-panel", color: "#085041", bg: "#E1F5EE" },
                      ],
                      takeaway: "Multi-panel workspace for live and recorded robotics data streams.",
                    },
                    {
                      name: "Intrinsic AI",
                      left: "36%", top: "46%",
                      tags: [
                        { label: "Workflow", color: "#712B13", bg: "#FAECE7" },
                        { label: "Task execution", color: "#712B13", bg: "#FAECE7" },
                        { label: "Orchestration", color: "#712B13", bg: "#FAECE7" },
                      ],
                      takeaway: "Workflow-first orchestration layer for programming industrial robots.",
                    },
                    {
                      name: "Webviz",
                      left: "12%", top: "66%",
                      tags: [
                        { label: "ROS data", color: "#0C447C", bg: "#E6F1FB" },
                        { label: "Multi-panel", color: "#0C447C", bg: "#E6F1FB" },
                        { label: "Camera feeds", color: "#0C447C", bg: "#E6F1FB" },
                      ],
                      takeaway: "Browser-native ROS visualization with flexible panel composition.",
                    },
                    {
                      name: "Rerun.io",
                      left: "56%", top: "62%",
                      tags: [
                        { label: "Replay", color: "#72243E", bg: "#FBEAF0" },
                        { label: "Timeline", color: "#72243E", bg: "#FBEAF0" },
                        { label: "Debugging", color: "#72243E", bg: "#FBEAF0" },
                      ],
                      takeaway: "Timeline-driven replay combining spatial, tabular, and log data.",
                    },
                  ].map((card, i) => (
                    <motion.div
                      key={card.name}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute"
                      style={{
                        left: card.left,
                        top: card.top,
                        width: 158,
                        zIndex: hoveredCard === card.name ? 100 : 1,
                      }}
                      onMouseEnter={() => setHoveredCard(card.name)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div
                        className="p-3 flex flex-col gap-2 transition-shadow duration-200"
                        style={{
                          background: "#FDFAF5",
                          border: `0.5px solid ${P.rule}`,
                          borderRadius: 10,
                          boxShadow: hoveredCard === card.name
                            ? "0 8px 24px rgba(42,38,32,0.13)"
                            : "none",
                        }}
                      >
                        <span className="font-sans text-[12px] font-semibold" style={{ color: P.ink }}>{card.name}</span>
                        <div className="flex flex-wrap gap-1">
                          {card.tags.map(t => (
                            <span
                              key={t.label}
                              className="font-sans text-[9px] font-medium px-1.5 py-0.5 rounded-full"
                              style={{ color: t.color, backgroundColor: t.bg, whiteSpace: "nowrap" }}
                            >
                              {t.label}
                            </span>
                          ))}
                        </div>
                        <p className="font-sans text-[10.5px] leading-relaxed" style={{ color: P.body }}>{card.takeaway}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Synthesis strip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-16"
              style={{ borderTop: `0.5px solid ${P.rule}`, paddingTop: "2rem" }}
            >
              <p
                className="font-sans text-[10px] uppercase tracking-[0.28em] mb-6"
                style={{ color: P.dim }}
              >
                Key patterns for Origami Robotics
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {[
                  { n: "01", text: "Keep related views visible side by side" },
                  { n: "02", text: "Support replay and timeline inspection" },
                  { n: "03", text: "Reduce context switching across tools" },
                  { n: "04", text: "Make failures easier to interpret visually" },
                  { n: "05", text: "Connect monitoring with iteration loops" },
                ].map(item => (
                  <div
                    key={item.n}
                    className="p-3 flex flex-col gap-1.5"
                    style={{
                      background: "#FDFAF5",
                      border: `0.5px solid ${P.rule}`,
                      borderRadius: 8,
                    }}
                  >
                    <span className="font-sans text-[9px] font-bold tracking-[0.06em]" style={{ color: P.rule.replace("C8", "A9") }}>{item.n}</span>
                    <p className="font-sans text-[10.5px] leading-relaxed" style={{ color: P.body }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </section>

        {/* ── Solutions ──────────────────────────────────────────── */}
        <section
          className="py-32 relative overflow-hidden cursor-none"
          onMouseEnter={() => setSolutionHovered(true)}
          onMouseLeave={() => setSolutionHovered(false)}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setSolutionCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
          }}
        >
          {/* Blur overlay */}
          <div
            className="absolute inset-0 z-20 pointer-events-none backdrop-blur-xl"
            style={{ background: `rgba(245,240,232,0.55)` }}
          />

          {/* Coming soon bubble cursor */}
          <AnimatePresence>
            {solutionHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-none absolute z-30 flex items-center justify-center rounded-full"
                style={{
                  width: 108,
                  height: 108,
                  left: solutionCursorPos.x - 54,
                  top: solutionCursorPos.y - 54,
                  backgroundColor: P.ink,
                  color: P.bg,
                }}
              >
                <span className="font-sans text-[9px] uppercase tracking-[0.22em] leading-relaxed text-center px-3">
                  Coming<br />Soon
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Header */}
          <div className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-24 mb-20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
              <div className="md:col-span-4">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif text-4xl md:text-5xl tracking-tight leading-tight"
                  style={{ color: P.ink }}
                >
                  The{" "}
                  <span className="font-display italic" style={{ color: P.accent }}>
                    solution
                  </span>
                </motion.h2>
              </div>
              <div className="md:col-span-8">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="font-sans leading-relaxed text-base md:text-lg font-light max-w-2xl"
                  style={{ color: P.body }}
                >
                  Each feature was designed as a direct response to a specific
                  friction point — turning invisible machine states into readable
                  spatial information, and opaque config workflows into
                  composable visual sequences.
                </motion.p>
              </div>
            </div>
            <div className="mt-16">
              <AnimRule />
            </div>
          </div>

          {/* Solution blocks */}
          <div className="flex flex-col gap-40 max-w-[1400px] mx-auto px-6 sm:px-10 md:px-16">
            {solutions.map((sol, i) => (
              <motion.div
                key={sol.index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-start gap-10 lg:gap-14`}
              >
                {/* Text */}
                <div className="w-full lg:w-[28%] flex flex-col gap-5 lg:sticky lg:top-32 lg:pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-px" style={{ backgroundColor: `rgba(140,123,98,0.4)` }} />
                    <span className="font-sans text-[10px] uppercase tracking-[0.3em]" style={{ color: P.accent }}>
                      Feature {sol.index}
                    </span>
                  </div>
                  <h4 className="font-serif leading-tight" style={{ fontSize: "28px", color: P.ink }}>
                    {sol.title}
                  </h4>
                  <p className="font-sans leading-relaxed text-base font-light" style={{ color: P.body }}>
                    {sol.body}
                  </p>
                </div>

                {/* Artifact */}
                <div className="w-full lg:w-[72%]">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25, duration: 1 }}
                    className="relative overflow-hidden"
                    style={{
                      border: `0.5px solid ${P.rule}`,
                      background: P.surface,
                      padding: "40px",
                    }}
                  >
                    <PaperGrain opacity={0.018} />
                    <GridLines />
                    <div className="flex items-center justify-between mb-6 relative z-10">
                      <span className="font-sans text-[8px] uppercase tracking-[0.3em]" style={{ color: P.dim }}>
                        Design artifact — feature {sol.index}
                      </span>
                      <span className="font-sans text-[8px] uppercase tracking-[0.3em]" style={{ color: P.dim }}>
                        Origami Robotics — Operator Interface
                      </span>
                    </div>
                    <div className="relative z-10">
                      {i === 0 && <FoldStateWireframe className="w-full" />}
                      {i === 1 && <SequenceDiagram className="w-full" />}
                      {i === 2 && <ErrorCardDiagram className="w-full" />}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Current status + Reflection ────────────────────────── */}
        <section
          className="py-28 md:py-36 relative overflow-hidden"
          style={{
            backgroundColor: P.surface,
            borderTop: `0.5px solid ${P.rule}`,
          }}
        >
          <PaperGrain opacity={0.022} />
          <GridLines />
          <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-12 md:px-24">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
              <motion.div
                className="md:col-span-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <SectionLabel>Status &amp; reflection</SectionLabel>
                <h2
                  className="font-serif text-3xl md:text-4xl tracking-tight leading-tight mt-4"
                  style={{ color: P.ink }}
                >
                  Work{" "}
                  <span className="font-display italic" style={{ color: P.accent }}>
                    in progress
                  </span>
                </h2>
              </motion.div>

              <div className="md:col-span-8 flex flex-col gap-10">
                {/* Current status */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="pt-6 pb-2"
                  style={{ borderTop: `0.5px solid ${P.rule}` }}
                >
                  <span
                    className="font-sans text-[10px] uppercase tracking-[0.3em] block mb-4"
                    style={{ color: P.accent }}
                  >
                    Current status
                  </span>
                  <p className="font-sans leading-relaxed text-base font-light" style={{ color: P.body }}>
                    This project is still evolving across multiple surfaces. I have helped establish the visual language, produced AI-assisted assets for product storytelling, and contributed to the website direction — while the internal engineer-facing dashboard is still in research and early concept development.
                  </p>
                </motion.div>

                {/* Reflection */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="pt-6 pb-2"
                  style={{ borderTop: `0.5px solid ${P.rule}` }}
                >
                  <span
                    className="font-sans text-[10px] uppercase tracking-[0.3em] block mb-4"
                    style={{ color: P.accent }}
                  >
                    Reflection
                  </span>
                  <p className="font-sans leading-relaxed text-base font-light" style={{ color: P.body }}>
                    Rather than a fully shipped product story, this work reflects a systems-in-progress design engagement. It taught me how to contribute value in ambiguous environments — by shaping product framing, visual communication, and early workflow thinking in parallel.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Next project ───────────────────────────────────────── */}
        <section
          className="relative py-28 overflow-hidden"
          style={{
            borderTop: `0.5px solid ${P.rule}`,
            backgroundColor: P.bg,
          }}
        >
          <PaperGrain opacity={0.022} />
          <div className="relative z-10 px-6 sm:px-12 md:px-24 max-w-[1200px] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div className="flex flex-col gap-4">
              <span
                className="font-sans text-[10px] uppercase tracking-[0.35em]"
                style={{ color: P.dim }}
              >
                Next case study
              </span>
              <h2
                className="font-serif tracking-tight leading-[0.9]"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: P.ink }}
              >
                Moffitt Status
              </h2>
              <p
                className="font-display italic text-lg max-w-sm"
                style={{ color: P.body }}
              >
                A library availability and space-browsing platform for UC Berkeley students.
              </p>
            </div>

            <Link
              to="/project/moffitt-status"
              className="group flex items-center gap-4 transition-all duration-500"
            >
              <span
                className="font-sans text-[11px] uppercase tracking-[0.3em] group-hover:opacity-70 transition-opacity"
                style={{ color: P.ink }}
              >
                View case study
              </span>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                style={{
                  backgroundColor: P.ink,
                  color: P.bg,
                }}
              >
                <ArrowRight size={16} strokeWidth={1.5} />
              </div>
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
