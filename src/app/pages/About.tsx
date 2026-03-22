import { useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

/* ─── Orbital card data ─── */
/* depth: 0 = close/heavy parallax, 1 = far/light parallax     */
/* Each cluster: photos tightly grouped + one label card nearby */

type PhotoCard = { id: number; kind: "photo"; image: string; x: number; y: number; w: number; rot: number; depth: number };
type LabelCard = { id: number; kind: "label"; text: string;  x: number; y: number; w: number; rot: number; depth: number };
type Card = PhotoCard | LabelCard;

// Sizes kept in a tight band: L=192, M=164, S=142
const cards: Card[] = [
  // ── Sushi — top-left ─────────────────────────────────────
  { id: 12, kind: "photo", image: "/images/sushi.jpeg",        x: -42, y: -46, w: 186, rot:  3,  depth: 0.18 },
  { id: 13, kind: "photo", image: "/images/suhi_1.jpeg",       x: -26, y: -42, w: 144, rot: -2,  depth: 0.24 },
  { id: 14, kind: "label", text:  "Always down for sushi",     x: -42, y: -28, w: 172, rot:  1,  depth: 0.28 },

  // ── Cats — mid-left ──────────────────────────────────────
  { id: 1,  kind: "photo", image: "/images/cat.jpeg",          x: -40, y: -12, w: 192, rot: -5,  depth: 0.18 },
  { id: 2,  kind: "photo", image: "/images/cat_1.jpeg",        x: -26, y:   6, w: 158, rot:  3,  depth: 0.22 },
  { id: 4,  kind: "label", text:  "Always stopping for cats",  x: -40, y:  22, w: 178, rot:  1,  depth: 0.25 },

  // ── Travel — right ───────────────────────────────────────
  { id: 5,  kind: "photo", image: "/images/travel_2.jpeg",     x:  37, y: -14, w: 192, rot:  4,  depth: 0.18 },
  { id: 6,  kind: "photo", image: "/images/travel_4.jpeg",     x:  46, y:   2, w: 156, rot: -3,  depth: 0.24 },
  { id: 7,  kind: "photo", image: "/images/travel_1.jpeg",     x:  34, y:  10, w: 138, rot:  5,  depth: 0.28 },
  { id: 8,  kind: "label", text:  "Traveler at heart",         x:  46, y:  22, w: 154, rot: -1,  depth: 0.30 },

  // ── Photography — top-right (single photo + label) ───────
  { id: 9,  kind: "photo", image: "/images/photography.jpeg",  x:  16, y: -44, w: 186, rot: -3,  depth: 0.16 },
  { id: 11, kind: "label", text:  "Chasing quiet frames",      x:  33, y: -32, w: 162, rot:  2,  depth: 0.22 },

  // ── Flower — bottom-left ─────────────────────────────────
  { id: 15, kind: "photo", image: "/images/flower.jpeg",       x: -34, y:  32, w: 192, rot:  4,  depth: 0.20 },
  { id: 16, kind: "label", text:  "A love for floral details", x: -20, y:  46, w: 176, rot: -2,  depth: 0.26 },
];

/* ─── Particle config ─── */
const PARTICLE_COUNT   = 45;
const BASE_RADIUS      = 18;
const WANDER_STRENGTH  = 0.4;
const CONNECTION_DIST  = 160;
const TEXT_ATTRACT_RAD = 180;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  angle: number;
}

interface WordCoord {
  x: number;
  y: number;
  w: number;
  element: HTMLElement;
  active: boolean;
}

/* ─── Main About page ─── */
export function About() {
  // ── Parallax refs ──
  const containerRef  = useRef<HTMLDivElement>(null);
  const currentRef    = useRef({ x: 0, y: 0 });
  const rafRef        = useRef<number>(0);

  // ── Canvas / particle refs ──
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const textRef        = useRef<HTMLDivElement>(null);
  const particlesRef   = useRef<Particle[]>([]);
  const wordCoordsRef  = useRef<WordCoord[]>([]);
  const canvasRafRef   = useRef<number>(0);
  const dimensionsRef  = useRef({ width: 0, height: 0 });

  // ── Shared mouse ref (raw client coords for particles; normalized for parallax) ──
  // x/y = normalized [-1,1] for parallax (start at center = 0,0)
  // rawX/rawY = client coords for particle attraction (start far off-screen)
  const mouseRef = useRef({ x: 0, y: 0, rawX: -1000, rawY: -1000 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* ────────────────────────────────────────────────
     Parallax RAF loop — lerps mouse → CSS vars
  ──────────────────────────────────────────────── */
  const animateParallax = useCallback(() => {
    const lerp = 0.06;
    currentRef.current.x += (mouseRef.current.x - currentRef.current.x) * lerp;
    currentRef.current.y += (mouseRef.current.y - currentRef.current.y) * lerp;

    if (containerRef.current) {
      containerRef.current.style.setProperty("--mx", String(currentRef.current.x));
      containerRef.current.style.setProperty("--my", String(currentRef.current.y));
    }
    rafRef.current = requestAnimationFrame(animateParallax);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animateParallax);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animateParallax]);

  /* ────────────────────────────────────────────────
     Single mousemove handler — updates both systems
  ──────────────────────────────────────────────── */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Raw coords for particle system
      mouseRef.current.rawX = e.clientX;
      mouseRef.current.rawY = e.clientY;

      // Normalized [-1, 1] relative to container center for parallax
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseRef.current.x = (e.clientX - cx) / (rect.width / 2);
      mouseRef.current.y = (e.clientY - cy) / (rect.height / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  /* ────────────────────────────────────────────────
     Word-coord scanner (reads DOM rects)
  ──────────────────────────────────────────────── */
  const updateWordCoords = useCallback(() => {
    wordCoordsRef.current = [];
    if (!textRef.current) return;
    const spans = textRef.current.querySelectorAll<HTMLElement>(".word-span");
    spans.forEach((span) => {
      const rect = span.getBoundingClientRect();
      wordCoordsRef.current.push({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        w: rect.width,
        element: span,
        active: false,
      });
    });
  }, []);

  /* ────────────────────────────────────────────────
     Build word-span DOM from the narrative text.
     Bold phrases are detected by marker list and
     wrapped in <strong> inside the span.
  ──────────────────────────────────────────────── */
  const buildEditorContent = useCallback(() => {
    if (!textRef.current) return;

    // The four narrative paragraphs — plain text, bold markers embedded with @@bold@@…@@/bold@@
    const paragraphs = [
      `My story started with @@bold@@change@@/bold@@. After moving to the U.S. in high school, I spent a lot of time trying to understand my own emotions, identity, and sense of belonging. During the pandemic, I began drawing on my iPad, and what surprised me most was how addictive it felt to turn @@bold@@inner thoughts into visual stories@@/bold@@.`,
      `I've always been someone who @@bold@@listens deeply@@/bold@@. Hearing other people's stories often gives me new insight into my own life — in my mind, their experiences naturally form into a chain of meaning. When I came to @@bold@@UC Berkeley@@/bold@@, I decided to study @@bold@@psychology@@/bold@@ and better understand the way people think, feel, and relate to the world around them.`,
      `After joining an entrepreneurship bootcamp, I realized how naturally that mindset translated into @@bold@@UX design@@/bold@@. I found I was especially strong at @@bold@@user research, emotional patterns, and understanding why people build attachment@@/bold@@ to certain products. Since then, I've worked in school projects and startup settings — designing in fast-moving environments, alongside cross-functional teams.`,
      `In the future, I hope to create products that bring more @@bold@@care, clarity, and real value to women's lives@@/bold@@.`,
    ];

    textRef.current.innerHTML = "";

    paragraphs.forEach((rawPara, pIdx) => {
      const pEl = document.createElement("p");
      pEl.style.cssText = "margin: 0; padding: 0;";

      // Split on bold markers
      const segments = rawPara.split(/(@@bold@@[\s\S]*?@@\/bold@@)/g);

      segments.forEach((seg) => {
        const boldMatch = seg.match(/^@@bold@@([\s\S]*?)@@\/bold@@$/);
        const text = boldMatch ? boldMatch[1] : seg;
        const isBold = !!boldMatch;

        // Split into words + whitespace tokens
        const tokens = text.split(/(\s+)/);
        tokens.forEach((token) => {
          if (token.trim().length === 0) {
            // Whitespace — plain text node
            pEl.appendChild(document.createTextNode(token));
          } else {
            const span = document.createElement("span");
            span.className = "word-span";
            if (isBold) {
              const strong = document.createElement("strong");
              strong.textContent = token;
              span.appendChild(strong);
            } else {
              span.textContent = token;
            }
            pEl.appendChild(span);
          }
        });
      });

      textRef.current!.appendChild(pEl);
      // Add gap between paragraphs (except last)
      if (pIdx < paragraphs.length - 1) {
        const gap = document.createElement("div");
        gap.style.height = "1.5em";
        textRef.current!.appendChild(gap);
      }
    });

    setTimeout(updateWordCoords, 50);
  }, [updateWordCoords]);

  /* ────────────────────────────────────────────────
     Particle factory
  ──────────────────────────────────────────────── */
  const createParticle = useCallback((x: number, y: number): Particle => {
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      radius: BASE_RADIUS * (0.7 + Math.random() * 0.6),
      angle: Math.random() * Math.PI * 2,
    };
  }, []);

  /* ────────────────────────────────────────────────
     Particle update — wander + mouse attract + word attract
  ──────────────────────────────────────────────── */
  const updateParticle = useCallback((p: Particle, width: number, height: number) => {
    // Wander
    p.angle += (Math.random() - 0.5) * 0.15;
    p.vx += Math.cos(p.angle) * WANDER_STRENGTH;
    p.vy += Math.sin(p.angle) * WANDER_STRENGTH;
    p.vx *= 0.94;
    p.vy *= 0.94;

    // Mouse attraction (raw coords)
    const dx = mouseRef.current.rawX - p.x;
    const dy = mouseRef.current.rawY - p.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 350) {
      p.vx += dx * 0.0015;
      p.vy += dy * 0.0015;
    }

    // Word attraction + activation
    let closestDist = Infinity;
    let closestWord: WordCoord | null = null;

    wordCoordsRef.current.forEach((word) => {
      const wdx = word.x - p.x;
      const wdy = word.y - p.y;
      const wDist = Math.sqrt(wdx * wdx + wdy * wdy);
      if (wDist < closestDist) {
        closestDist = wDist;
        closestWord = word;
      }
    });

    if (closestWord && closestDist < TEXT_ATTRACT_RAD) {
      const cw = closestWord as WordCoord;
      const wdx = cw.x - p.x;
      const wdy = cw.y - p.y;
      p.vx += wdx * 0.008;
      p.vy += wdy * 0.008;

      if (closestDist < 40) {
        if (!cw.active) {
          cw.element.classList.add("active");
          cw.active = true;
        }
      } else if (closestDist > 80) {
        if (cw.active) {
          cw.element.classList.remove("active");
          cw.active = false;
        }
      }
    }

    // Move + wrap
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0)       p.x = width;
    if (p.x > width)   p.x = 0;
    if (p.y < 0)       p.y = height;
    if (p.y > height)  p.y = 0;
  }, []);

  /* ────────────────────────────────────────────────
     Canvas RAF loop
  ──────────────────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width  = w;
      canvas.height = h;
      dimensionsRef.current = { width: w, height: h };
      updateWordCoords();
    };

    resize();
    window.addEventListener("resize", resize);

    // Seed particles
    particlesRef.current = [];
    const { width, height } = dimensionsRef.current;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particlesRef.current.push(
        createParticle(
          width  / 2 + (Math.random() - 0.5) * 200,
          height / 2 + (Math.random() - 0.5) * 200,
        )
      );
    }

    const loop = () => {
      const { width: w, height: h } = dimensionsRef.current;
      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(180, 200, 218, 0.35)";
      ctx.lineWidth   = 0.5;

      const ps = particlesRef.current;
      for (let i = 0; i < ps.length; i++) {
        const p1 = ps[i];
        updateParticle(p1, w, h);

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(196, 212, 228, 0.75)";
        ctx.fill();

        for (let j = i + 1; j < ps.length; j++) {
          const p2 = ps[j];
          const ddx = p1.x - p2.x;
          const ddy = p1.y - p2.y;
          const d   = Math.sqrt(ddx * ddx + ddy * ddy);
          if (d < CONNECTION_DIST) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      canvasRafRef.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("resize", resize);
      if (canvasRafRef.current) cancelAnimationFrame(canvasRafRef.current);
    };
  }, [createParticle, updateParticle, updateWordCoords]);

  /* ────────────────────────────────────────────────
     Build word-span content once on mount
  ──────────────────────────────────────────────── */
  useEffect(() => {
    buildEditorContent();
  }, [buildEditorContent]);

  /* ────────────────────────────────────────────────
     Re-scan word coords on scroll (text moves in viewport)
  ──────────────────────────────────────────────── */
  useEffect(() => {
    window.addEventListener("scroll", updateWordCoords, { passive: true });
    return () => window.removeEventListener("scroll", updateWordCoords);
  }, [updateWordCoords]);

  return (
    <div className="bg-[#F0F8FF] text-[#0A192F] w-full min-h-screen selection:bg-[#0A192F] selection:text-white">
      <Navbar />

      {/* ── CSS parallax + word-span styles ── */}
      <style>{`
        .orbit-container {
          --mx: 0;
          --my: 0;
        }
        .orbit-card {
          will-change: transform;
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease;
        }
        .orbit-card:hover {
          transform: translate(-50%,-50%) translateY(-6px) scale(1.025) !important;
          z-index: 20 !important;
        }
        .orbit-card:hover .card-inner {
          box-shadow: 0 20px 56px rgba(0,0,0,0.13);
        }
        ${cards.map((c) => {
          const strength = (1 - c.depth) * 58;
          const tiltStr  = (1 - c.depth) * 4;
          return `.card-${c.id} {
            left:  calc(50% + ${c.x}%);
            top:   calc(50% + ${c.y}%);
            width: ${c.w}px;
            opacity: ${0.80 + c.depth * 0.18};
            z-index: ${Math.round(c.depth * 10)};
            transform:
              translate(-50%, -50%)
              translate(
                calc(var(--mx) * ${strength}px),
                calc(var(--my) * ${strength}px)
              )
              rotate(${c.rot}deg)
              rotateX(calc(var(--my) * ${tiltStr}deg))
              rotateY(calc(var(--mx) * ${-tiltStr}deg));
          }`;
        }).join("\n")}
        .center-text {
          will-change: transform;
          transform:
            translate(calc(var(--mx) * 5px), calc(var(--my) * 5px));
        }
        /* ── Word-span activation styles ── */
        .word-span {
          position: relative;
          display: inline;
          color: #506680;
          font-weight: 300;
          transition: color 0.6s ease, font-weight 0.3s ease;
          cursor: default;
        }
        .word-span.active {
          color: #0A192F;
          font-weight: 500;
        }
        .word-span strong {
          font-weight: inherit;
          color: inherit;
        }
      `}</style>

      {/* ── Liquid SVG filter (hidden, 0×0) ── */}
      <svg
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
        aria-hidden="true"
      >
        <defs>
          <filter id="liquid-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02"
              numOctaves="2"
              result="noise"
            />
            <feDisplacementMap
              in="goo"
              in2="noise"
              scale="15"
              xChannelSelector="R"
              yChannelSelector="G"
            />
            <feComposite in="SourceGraphic" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* ── Orbital Hero ── */}
      <section
        ref={containerRef}
        className="orbit-container relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-[120px] pb-24"
        style={{ perspective: "900px" }}
      >
        {/* z-index 1 — Canvas particle layer */}
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            filter: "url('#liquid-filter')",
            opacity: 0.5,
            pointerEvents: "none",
          }}
        />

        {/* z-index 2 — Noise texture overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 2,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E\")",
            mixBlendMode: "multiply",
          }}
        />

        {/* Soft radial glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 2 }}>
          <div
            className="w-[600px] h-[600px] rounded-full blur-3xl opacity-30"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.85) 0%, transparent 70%)" }}
          />
        </div>

        {/* z-index 3–15 — Floating orbit cards */}
        {cards.map((card) => (
          <div
            key={card.id}
            className={`orbit-card card-${card.id} absolute select-none cursor-default`}
          >
            {card.kind === "photo" ? (
              <div className="card-inner relative overflow-hidden rounded-2xl bg-white shadow-[0_6px_28px_rgba(0,0,0,0.08)] border border-white/80 transition-shadow duration-300">
                <img
                  src={card.image}
                  alt=""
                  className="w-full block object-cover"
                  style={{ aspectRatio: "4/3" }}
                  loading="lazy"
                  draggable={false}
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5 pointer-events-none" />
              </div>
            ) : (
              <div className="card-inner rounded-2xl bg-white/85 backdrop-blur-md shadow-[0_6px_28px_rgba(0,0,0,0.07)] border border-white/80 px-5 py-4 transition-shadow duration-300">
                <div className="w-4 h-px bg-[#0A192F]/15 mb-2.5" />
                <p className="font-sans text-[11px] text-[#475569] tracking-[0.14em] leading-snug whitespace-nowrap">
                  {card.text}
                </p>
              </div>
            )}
          </div>
        ))}

        {/* z-index 30 — Center narrative text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="center-text relative max-w-xl px-8"
          style={{ zIndex: 30 }}
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-px bg-[#0A192F]/20" />
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#506680]/60">
              About Me
            </span>
            <div className="w-8 h-px bg-[#0A192F]/20" />
          </div>

          {/* Word-span text container — populated imperatively by buildEditorContent */}
          <div
            ref={textRef}
            className="font-sans text-sm md:text-base leading-[2] font-light text-left"
            style={{ color: "#506680" }}
          />
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
