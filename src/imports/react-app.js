import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const customStyles = {
  body: {
    backgroundColor: '#F0F8FF',
    color: '#0A192F',
    overflow: 'hidden',
    cursor: 'none',
  },
  cursorDot: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '8px',
    height: '8px',
    backgroundColor: '#0A192F',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 9999,
    transform: 'translate(-50%, -50%)',
  },
  cursorCircle: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '40px',
    height: '40px',
    border: '1px solid rgba(10, 25, 47, 0.4)',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 9999,
    transform: 'translate(-50%, -50%)',
    transition: 'width 0.3s, height 0.3s, background-color 0.3s',
  },
  cursorCircleHovered: {
    width: '80px',
    height: '80px',
    backgroundColor: 'rgba(224, 242, 254, 0.4)',
    borderColor: '#A5B4C4',
    backdropFilter: 'blur(2px)',
  },
  ambientBg: {
    position: 'fixed',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,1) 0%, rgba(224, 242, 254, 0.2) 60%)',
    zIndex: -1,
    animation: 'breathe 12s ease-in-out infinite',
  },
  webglContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  verticalText: {
    writingMode: 'vertical-rl',
    textOrientation: 'mixed',
  },
};

const HomePage = () => {
  const webglRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorCircleRef = useRef(null);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorCirclePos, setCursorCirclePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let timeoutId;
    const handleMouseMove = (e) => {
      const posX = e.clientX;
      const posY = e.clientY;
      setCursorPos({ x: posX, y: posY });
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setCursorCirclePos({ x: posX, y: posY });
      }, 60);
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    let animFrameId;
    let threeModule = null;

    const initThree = async () => {
      try {
        const THREE = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js');
        const { OrbitControls } = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js');

        const container = webglRef.current;
        if (!container) return;

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0xF0F8FF, 0.02);

        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.set(0, 0, 8);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.0;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.03;
        controls.enableZoom = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1.2;
        controls.maxPolarAngle = Math.PI / 1.5;
        controls.minPolarAngle = Math.PI / 3;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const mainSpot = new THREE.SpotLight(0xE0F2FE, 20);
        mainSpot.position.set(5, 5, 5);
        mainSpot.angle = 0.4;
        mainSpot.penumbra = 0.3;
        mainSpot.castShadow = true;
        scene.add(mainSpot);

        const fillLight = new THREE.PointLight(0x7DD3FC, 12);
        fillLight.position.set(-5, 0, 2);
        scene.add(fillLight);

        const backLight = new THREE.DirectionalLight(0xffffff, 5);
        backLight.position.set(0, 5, -5);
        scene.add(backLight);

        const heroGroup = new THREE.Group();
        scene.add(heroGroup);

        const glassMaterial = new THREE.MeshPhysicalMaterial({
          color: 0xE0F2FE,
          metalness: 0.2,
          roughness: 0.01,
          transmission: 0.95,
          thickness: 2.5,
          ior: 1.55,
          clearcoat: 1.0,
          clearcoatRoughness: 0.02,
        });

        const steelMaterial = new THREE.MeshStandardMaterial({
          color: 0xE2E8F0,
          metalness: 1.0,
          roughness: 0.05,
        });

        const geometry = new THREE.TorusKnotGeometry(1.2, 0.3, 150, 20, 2, 3);
        const mainMesh = new THREE.Mesh(geometry, glassMaterial);
        mainMesh.castShadow = true;
        mainMesh.receiveShadow = true;
        heroGroup.add(mainMesh);

        const ringGeo = new THREE.TorusGeometry(2.5, 0.012, 16, 100);
        const ring1 = new THREE.Mesh(ringGeo, steelMaterial);
        ring1.rotation.x = Math.PI / 1.8;
        heroGroup.add(ring1);

        const ring2 = new THREE.Mesh(ringGeo, steelMaterial);
        ring2.rotation.x = Math.PI / 2.2;
        ring2.rotation.y = Math.PI / 4;
        ring2.scale.set(0.8, 0.8, 0.8);
        heroGroup.add(ring2);

        const particleGeo = new THREE.IcosahedronGeometry(0.04, 0);
        for (let i = 0; i < 30; i++) {
          const particle = new THREE.Mesh(particleGeo, steelMaterial);
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(Math.random() * 2 - 1);
          const radius = 2 + Math.random() * 2;
          particle.position.set(
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.sin(phi) * Math.sin(theta),
            radius * Math.cos(phi)
          );
          particle.userData = {
            angle: theta,
            radius: radius,
            speed: 0.003 + Math.random() * 0.008,
            yOffset: Math.random() * Math.PI,
          };
          heroGroup.add(particle);
        }

        let mouseX = 0;
        let mouseY = 0;
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        const onMouseMove = (event) => {
          mouseX = (event.clientX - windowHalfX) * 0.0004;
          mouseY = (event.clientY - windowHalfY) * 0.0004;
        };
        document.addEventListener('mousemove', onMouseMove);

        const clock = new THREE.Clock();

        const animate = () => {
          animFrameId = requestAnimationFrame(animate);
          const time = clock.getElapsedTime();
          controls.update();

          heroGroup.rotation.y += (mouseX - heroGroup.rotation.y) * 0.05;
          heroGroup.rotation.x += (mouseY - heroGroup.rotation.x) * 0.05;

          mainMesh.rotation.z = Math.sin(time * 0.15) * 0.08;

          ring1.rotation.z += 0.001;
          ring2.rotation.z -= 0.002;

          heroGroup.children.forEach((child) => {
            if (child.userData.speed) {
              child.userData.angle += child.userData.speed;
              child.position.x = child.userData.radius * Math.cos(child.userData.angle);
              child.position.z = child.userData.radius * Math.sin(child.userData.angle);
              child.position.y += Math.sin(time + child.userData.yOffset) * 0.0015;
              child.rotation.x += 0.01;
              child.rotation.y += 0.01;
            }
          });

          renderer.render(scene, camera);
        };

        animate();

        const onResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', onResize);

        threeModule = { renderer, container, onMouseMove, onResize };
      } catch (e) {
        console.warn('Three.js could not be loaded:', e);
      }
    };

    initThree();

    return () => {
      cancelAnimationFrame(animFrameId);
      if (threeModule) {
        document.removeEventListener('mousemove', threeModule.onMouseMove);
        window.removeEventListener('resize', threeModule.onResize);
        if (threeModule.container && threeModule.renderer) {
          try {
            threeModule.container.removeChild(threeModule.renderer.domElement);
          } catch (_) {}
          threeModule.renderer.dispose();
        }
      }
    };
  }, []);

  const dotStyle = {
    ...customStyles.cursorDot,
    transform: `translate(${cursorPos.x}px, ${cursorPos.y}px) translate(-50%, -50%)`,
  };

  const circleStyle = {
    ...customStyles.cursorCircle,
    ...(isHovered ? customStyles.cursorCircleHovered : {}),
    transform: `translate(${cursorCirclePos.x}px, ${cursorCirclePos.y}px) translate(-50%, -50%)`,
  };

  const interactiveProps = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };

  return (
    <div
      className="h-screen w-screen relative font-sans overflow-hidden"
      style={{ backgroundColor: '#F0F8FF', color: '#0A192F', cursor: 'none' }}
    >
      <div style={customStyles.ambientBg} />
      <div className="absolute inset-0 z-10 pointer-events-none opacity-30 mix-blend-overlay" />
      <div ref={webglRef} style={customStyles.webglContainer} />
      <div ref={cursorDotRef} style={dotStyle} />
      <div ref={cursorCircleRef} style={circleStyle} />

      <div className="relative z-20 h-full w-full flex flex-col justify-between p-6 md:p-10 pointer-events-none">
        <header className="flex justify-between items-start pointer-events-auto w-full">
          <div
            className="flex items-center gap-4 animate-in"
            style={{ animationDelay: '0.1s', opacity: 1 }}
          >
            <a href="#" className="group relative" {...interactiveProps}>
              <span
                className="font-serif text-3xl font-semibold tracking-tighter"
                style={{ color: '#0A192F', fontFamily: '"Bodoni Moda", serif' }}
              >
                LUMO
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-obsidian transition-all duration-300 group-hover:w-full" />
            </a>
            <span className="hidden md:inline-block h-px w-8" style={{ backgroundColor: 'rgba(10,25,47,0.1)' }} />
            <span
              className="hidden md:inline-block font-sans text-[10px] tracking-[0.2em] uppercase"
              style={{ color: '#506680' }}
            >
              Essence N°5
            </span>
          </div>

          <nav className="hidden md:flex gap-12" style={{ animationDelay: '0.2s' }}>
            {['Catalog', 'Atelier', 'Journal'].map((item) => (
              <a
                key={item}
                href="#"
                className="font-display text-lg italic transition-colors"
                style={{ color: 'rgba(10,25,47,0.6)', fontFamily: '"Cormorant Garamond", serif' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#0A192F';
                  setIsHovered(true);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(10,25,47,0.6)';
                  setIsHovered(false);
                }}
              >
                {item}
              </a>
            ))}
          </nav>

          <button
            className="group flex flex-col items-end gap-1.5"
            style={{ animationDelay: '0.3s' }}
            {...interactiveProps}
          >
            <span
              className="font-sans text-[10px] tracking-widest uppercase mb-1"
              style={{ color: '#0A192F' }}
            >
              Menu
            </span>
            <span className="w-8 h-px transition-all duration-300 group-hover:w-12" style={{ backgroundColor: '#0A192F' }} />
            <span className="w-5 h-px transition-all duration-300 delay-75 group-hover:w-8" style={{ backgroundColor: '#0A192F' }} />
          </button>
        </header>

        <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0">
          <div className="flex justify-between items-center w-full px-[5%] md:px-[10%] opacity-80">
            <h1
              className="font-serif text-[12vw] leading-none tracking-tighter mix-blend-overlay"
              style={{ color: '#0A192F', fontFamily: '"Bodoni Moda", serif', animationDelay: '0.5s' }}
            >
              ES
            </h1>
            <h1
              className="font-serif text-[12vw] leading-none tracking-tighter mix-blend-overlay"
              style={{ color: '#0A192F', fontFamily: '"Bodoni Moda", serif', animationDelay: '0.6s' }}
            >
              SE
            </h1>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full mt-32 md:mt-48">
            <p
              className="text-xl md:text-2xl tracking-wide"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontStyle: 'italic',
                color: 'rgba(10,25,47,0.4)',
                animationDelay: '0.8s',
              }}
            >
              The geometry of light
            </p>
            <div className="mt-8 pointer-events-auto" style={{ animationDelay: '1s' }}>
              <a
                href="#"
                className="inline-flex items-center gap-3 px-6 py-3 transition-all duration-500 rounded-full group"
                style={{
                  border: '1px solid rgba(10,25,47,0.2)',
                  backdropFilter: 'blur(4px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#0A192F';
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.6)';
                  setIsHovered(true);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(10,25,47,0.2)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                  setIsHovered(false);
                }}
              >
                <span
                  className="font-sans text-[10px] uppercase tracking-[0.25em]"
                  style={{ color: '#0A192F' }}
                >
                  Explore Collection
                </span>
                <svg
                  className="w-3 h-3 transform transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: '#0A192F' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </main>

        <div
          className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-8"
          style={{ animationDelay: '1.2s' }}
        >
          <div
            className="w-px h-16"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(10,25,47,0.3), transparent)' }}
          />
          <span
            className="font-sans text-[9px] uppercase tracking-[0.3em]"
            style={{ ...customStyles.verticalText, color: '#506680' }}
          >
            Scroll
          </span>
          <div
            className="w-px h-16"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(10,25,47,0.3), transparent)' }}
          />
        </div>

        <div
          className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4"
          style={{ animationDelay: '1.3s' }}
        >
          {[true, false, false, false].map((active, i) => (
            <button
              key={i}
              className="rounded-full transition-all hover:scale-150"
              style={{
                width: active ? '8px' : '6px',
                height: active ? '8px' : '6px',
                backgroundColor: active ? '#0A192F' : 'rgba(10,25,47,0.2)',
                marginBottom: active ? '8px' : '0',
                border: 'none',
                cursor: 'none',
              }}
              {...interactiveProps}
            />
          ))}
        </div>

        <footer
          className="flex justify-between items-end pointer-events-auto w-full"
          style={{ animationDelay: '0.4s' }}
        >
          <div className="hidden md:block">
            <div
              className="flex items-center gap-3 font-sans text-[10px] uppercase tracking-widest"
              style={{ color: '#506680' }}
            >
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span>Paris Showroom Open</span>
            </div>
          </div>

          <div className="flex-1 md:flex-none text-center md:text-right">
            <div
              className="inline-block text-left p-5 rounded-lg max-w-[280px] transition-colors cursor-pointer group"
              style={{
                backgroundColor: 'rgba(255,255,255,0.4)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.6)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.7)';
                setIsHovered(true);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.4)';
                setIsHovered(false);
              }}
            >
              <div className="flex justify-between items-start mb-2">
                <span
                  className="text-lg italic"
                  style={{ color: '#0A192F', fontFamily: '"Bodoni Moda", serif' }}
                >
                  Nebula Ring
                </span>
                <span
                  className="font-sans text-[10px] rounded px-1.5 py-0.5 ml-4"
                  style={{
                    color: '#0A192F',
                    border: '1px solid rgba(10,25,47,0.1)',
                  }}
                >
                  NEW
                </span>
              </div>
              <div className="w-full h-px my-2" style={{ backgroundColor: 'rgba(10,25,47,0.1)' }} />
              <div className="flex justify-between items-end">
                <span
                  className="font-sans text-[10px] uppercase tracking-wider"
                  style={{ color: '#506680' }}
                >
                  Frosted Silver
                </span>
                <span
                  className="font-sans text-xs font-medium transition-transform group-hover:translate-x-1"
                  style={{ color: '#0A192F' }}
                >
                  View Details →
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

const App = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,600;1,6..96,400&family=Inter:wght@300;400;500&family=Cormorant+Garamond:ital,wght@0,300;0,500;1,400&display=swap');

      * { cursor: none !important; }

      @keyframes breathe {
        0%, 100% { transform: scale(1); opacity: 0.5; }
        50% { transform: scale(1.05); opacity: 0.8; }
      }

      @keyframes fadeInMove {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }

      .animate-in {
        opacity: 0;
        animation: fadeInMove 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
      }

      ::selection {
        background-color: #0A192F;
        color: white;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;