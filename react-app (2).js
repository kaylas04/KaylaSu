import React, { useState, useEffect, useRef, useCallback } from 'react';

const App = () => {
  const canvasRef = useRef(null);
  const editorRef = useRef(null);
  const cursorRef = useRef(null);
  const animFrameRef = useRef(null);
  const particlesRef = useRef([]);
  const wordCoordsRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const dimensionsRef = useRef({ width: 0, height: 0 });

  const [queryValue, setQueryValue] = useState('Why do patterns repeat in isolation?');

  const defaultText = `The silence in this room feels heavy, not empty. I have been thinking about the structure of fungal networks, how they don't just grow; they search. They send out filaments into the dark, gambling energy on the possibility of sustenance.

It feels like my own thoughts are doing the same. Branching out. Retracting.

Yesterday I felt a disconnect between my intent and my action. A gap. The koji mold doesn't have gaps; it is a continuous stream of becoming. If I could map my anxiety like a mycelial network, would it look chaotic? Or would it reveal a geometry I am too close to see?

We speak of "finding meaning" as if it is a hidden object, but perhaps meaning is just the friction of movement. The residue of the search itself.

I am trying to be still. To let the organism settle.`;

  const config = {
    particleCount: 45,
    baseRadius: 18,
    wanderStrength: 0.4,
    connectionDist: 160,
    textAttractionRadius: 180
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      body, html {
        margin: 0;
        padding: 0;
        overflow: hidden;
        cursor: none;
      }
      .word-span {
        position: relative;
        transition: color 0.8s ease, opacity 0.8s ease;
        cursor: text;
        z-index: 2;
        font-weight: 300;
        color: #1a1a1a;
      }
      .word-span.active {
        color: #000000;
        font-weight: 500;
      }
      .word-span.connected {
        color: #666;
      }
      #editor-area::-webkit-scrollbar {
        display: none;
      }
      #editor-area {
        scrollbar-width: none;
      }
      @keyframes pulse {
        0% { opacity: 0.1; }
        50% { opacity: 1; }
        100% { opacity: 0.1; }
      }
      .status-dot {
        display: inline-block;
        width: 6px;
        height: 6px;
        background-color: #000;
        border-radius: 50%;
        margin-left: 8px;
        animation: pulse 4s infinite;
        vertical-align: middle;
      }
      .query-input-el {
        width: 100%;
        background: transparent;
        border: none;
        border-bottom: 1px solid #eee;
        color: #000000;
        font-size: 1.5rem;
        font-weight: 400;
        padding: 0.5rem 0;
        outline: none;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        transition: border-color 0.5s ease;
        box-sizing: border-box;
      }
      .query-input-el:focus {
        border-bottom: 1px solid #000;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const updateWordCoords = useCallback(() => {
    wordCoordsRef.current = [];
    if (!editorRef.current) return;
    const spans = editorRef.current.querySelectorAll('.word-span');
    spans.forEach(span => {
      const rect = span.getBoundingClientRect();
      wordCoordsRef.current.push({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        w: rect.width,
        element: span,
        active: false
      });
    });
  }, []);

  const buildEditorContent = useCallback(() => {
    if (!editorRef.current) return;
    const text = defaultText;
    const words = text.split(/(\s+)/);
    editorRef.current.innerHTML = '';
    words.forEach(word => {
      const span = document.createElement('span');
      span.textContent = word;
      if (word.trim().length > 0) {
        span.className = 'word-span';
      }
      editorRef.current.appendChild(span);
    });
    setTimeout(updateWordCoords, 50);
  }, [updateWordCoords]);

  const createParticle = useCallback((x, y, width, height) => {
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      radius: config.baseRadius * (0.7 + Math.random() * 0.6),
      angle: Math.random() * Math.PI * 2
    };
  }, []);

  const updateParticle = useCallback((p, width, height) => {
    p.angle += (Math.random() - 0.5) * 0.15;
    p.vx += Math.cos(p.angle) * config.wanderStrength;
    p.vy += Math.sin(p.angle) * config.wanderStrength;
    p.vx *= 0.94;
    p.vy *= 0.94;

    const dx = mouseRef.current.x - p.x;
    const dy = mouseRef.current.y - p.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 350) {
      p.vx += dx * 0.0015;
      p.vy += dy * 0.0015;
    }

    let closestDist = Infinity;
    let closestWord = null;

    wordCoordsRef.current.forEach(word => {
      const wdx = word.x - p.x;
      const wdy = word.y - p.y;
      const wDist = Math.sqrt(wdx * wdx + wdy * wdy);
      if (wDist < closestDist) {
        closestDist = wDist;
        closestWord = word;
      }
    });

    if (closestWord && closestDist < config.textAttractionRadius) {
      const wdx = closestWord.x - p.x;
      const wdy = closestWord.y - p.y;
      p.vx += wdx * 0.008;
      p.vy += wdy * 0.008;
      if (closestDist < 40) {
        if (!closestWord.active) {
          closestWord.element.classList.add('active');
          closestWord.active = true;
        }
      } else if (closestDist > 80) {
        if (closestWord.active) {
          closestWord.element.classList.remove('active');
          closestWord.active = false;
        }
      }
    }

    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      dimensionsRef.current = { width: w, height: h };
      updateWordCoords();
    };

    resize();
    window.addEventListener('resize', resize);

    particlesRef.current = [];
    const { width, height } = dimensionsRef.current;
    for (let i = 0; i < config.particleCount; i++) {
      particlesRef.current.push(
        createParticle(
          width / 2 + (Math.random() - 0.5) * 200,
          height / 2 + (Math.random() - 0.5) * 200,
          width,
          height
        )
      );
    }

    const animate = () => {
      const { width, height } = dimensionsRef.current;
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = '#e8e8e8';
      ctx.lineWidth = 0.5;

      const ps = particlesRef.current;
      for (let i = 0; i < ps.length; i++) {
        const p1 = ps[i];
        updateParticle(p1, width, height);

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#f0f0f0';
        ctx.fill();

        for (let j = i + 1; j < ps.length; j++) {
          const p2 = ps[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < config.connectionDist) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [createParticle, updateParticle, updateWordCoords]);

  useEffect(() => {
    buildEditorContent();
  }, [buildEditorContent]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerStyle = {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#ffffff',
    color: '#0a0a0a',
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    overflow: 'hidden'
  };

  const canvasStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
    filter: "url('#liquid-filter') contrast(110%) brightness(100%)",
    opacity: 0.6,
    pointerEvents: 'none'
  };

  const noiseOverlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 3,
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E\")",
    mixBlendMode: 'multiply'
  };

  const interfaceLayerStyle = {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    padding: '4rem 15%',
    boxSizing: 'border-box'
  };

  const queryContainerStyle = {
    marginBottom: '4rem',
    position: 'relative'
  };

  const queryLabelStyle = {
    fontFamily: "'Courier Prime', 'Courier New', monospace",
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: '#888',
    marginBottom: '1rem',
    display: 'block'
  };

  const journalAreaStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    fontSize: '1.5rem',
    lineHeight: '1.8',
    fontWeight: 300,
    color: '#1a1a1a',
    whiteSpace: 'pre-wrap',
    outline: 'none',
    border: 'none',
    resize: 'none',
    background: 'transparent',
    overflowY: 'auto'
  };

  const statusHudStyle = {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    fontFamily: "'Courier Prime', 'Courier New', monospace",
    fontSize: '0.7rem',
    color: '#888',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '0.5rem',
    pointerEvents: 'none',
    zIndex: 10
  };

  const cursorFollowerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '24px',
    height: '24px',
    border: '1px solid rgba(0,0,0,0.8)',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 10,
    transform: 'translate(-50%, -50%)',
    transition: 'width 0.3s ease, height 0.3s ease'
  };

  return (
    <div style={containerStyle}>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="liquid-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" result="noise" />
            <feDisplacementMap in="goo" in2="noise" scale="15" xChannelSelector="R" yChannelSelector="G" />
            <feComposite in="SourceGraphic" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div style={noiseOverlayStyle}></div>

      <canvas
        ref={canvasRef}
        id="bio-layer"
        style={canvasStyle}
      />

      <div style={interfaceLayerStyle}>
        <div style={queryContainerStyle}>
          <span style={queryLabelStyle}>Active Organism // Query</span>
          <input
            type="text"
            className="query-input-el"
            value={queryValue}
            onChange={(e) => setQueryValue(e.target.value)}
            placeholder="Enter a theme to explore..."
          />
        </div>

        <div
          ref={editorRef}
          id="editor-area"
          contentEditable="true"
          suppressContentEditableWarning={true}
          spellCheck={false}
          style={journalAreaStyle}
          onInput={updateWordCoords}
        />
      </div>

      <div style={statusHudStyle}>
        <span>SUBSTRATE ANALYSIS: ACTIVE</span>
        <span>
          SEMANTIC DENSITY: 0.84
          <span className="status-dot"></span>
        </span>
      </div>

      <div ref={cursorRef} style={cursorFollowerStyle}></div>
    </div>
  );
};

export default App;