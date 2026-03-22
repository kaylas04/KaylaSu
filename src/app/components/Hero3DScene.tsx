import { useEffect, useRef } from "react";
import * as THREE from "three";
import { AsciiEffect } from "three/examples/jsm/effects/AsciiEffect.js";

// Monkey-patch to completely prevent InvalidStateError and IndexSizeError from 0-size canvas anywhere in the app
if (typeof window !== "undefined" && typeof CanvasRenderingContext2D !== "undefined") {
  const originalDrawImage = CanvasRenderingContext2D.prototype.drawImage;
  CanvasRenderingContext2D.prototype.drawImage = function (image: any, ...args: any[]) {
    // If the image is a canvas and has 0 width or height, skip drawing to avoid crash
    if (image && typeof image.nodeName === "string" && image.nodeName.toLowerCase() === "canvas") {
      if (image.width === 0 || image.height === 0) {
        return; // Silently skip
      }
    }
    return (originalDrawImage as any).apply(this, [image, ...args]);
  };

  const originalGetImageData = CanvasRenderingContext2D.prototype.getImageData;
  CanvasRenderingContext2D.prototype.getImageData = function (sx: number, sy: number, sw: number, sh: number, ...args: any[]) {
    // Prevent IndexSizeError when trying to get image data with 0 width or height
    if (sw === 0 || sh === 0) {
      return new ImageData(1, 1); // Return dummy empty data to prevent downstream crash
    }
    return (originalGetImageData as any).apply(this, [sx, sy, sw, sh, ...args]);
  };
}

export function Hero3DScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animFrameId: number;
    let renderer: THREE.WebGLRenderer;
    let effect: AsciiEffect;
    let container = mountRef.current;

    if (!container) return;

    const getWidth = () => Math.max(100, container?.clientWidth || window.innerWidth || 100);
    const getHeight = () => Math.max(100, container?.clientHeight || window.innerHeight || 100);

    // Let's create a light theme background scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf0f8ff, 0.02);

    const camera = new THREE.PerspectiveCamera(
      45,
      getWidth() / getHeight(),
      0.1,
      100
    );
    camera.position.set(0, 0, 8);

    // Renderer for the liquid glass
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.max(1, window.devicePixelRatio || 1));
    renderer.setSize(getWidth(), getHeight());
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    
    // Set the background color to match the light theme
    renderer.setClearColor(0xf0f8ff, 1);
    
    // Position renderer canvas
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.zIndex = "0";
    renderer.domElement.style.pointerEvents = "none";
    container.appendChild(renderer.domElement);

    // Initialize AsciiEffect OVER the renderer
    // invert: false -> dark things become denser chars
    effect = new AsciiEffect(renderer, " .:-=+*#%@", { invert: false });
    effect.setSize(getWidth(), getHeight());
    
    // Style the ASCII DOM output to be a semi-transparent overlay
    effect.domElement.style.color = "#0f172a"; // Dark slate blue chars
    effect.domElement.style.backgroundColor = "transparent";
    effect.domElement.style.position = "absolute";
    effect.domElement.style.top = "0";
    effect.domElement.style.left = "0";
    effect.domElement.style.width = "100%";
    effect.domElement.style.height = "100%";
    effect.domElement.style.pointerEvents = "none";
    effect.domElement.style.zIndex = "1";
    effect.domElement.style.opacity = "0.45"; // Overlay effect!
    effect.domElement.style.mixBlendMode = "multiply";
    
    container.appendChild(effect.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const mainSpot = new THREE.SpotLight(0xffffff, 40);
    mainSpot.position.set(5, 5, 5);
    mainSpot.angle = 0.4;
    mainSpot.penumbra = 0.3;
    scene.add(mainSpot);

    const fillLight = new THREE.PointLight(0x7dd3fc, 20);
    fillLight.position.set(-5, 0, 2);
    scene.add(fillLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 10);
    backLight.position.set(0, 5, -5);
    scene.add(backLight);

    const baseGroup = new THREE.Group();
    scene.add(baseGroup);

    const heroGroup = new THREE.Group();
    baseGroup.add(heroGroup);

    // A solid matte material is best for ASCII because it catches
    // smooth lighting gradients without complex refraction noise.
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xe0f2fe,
      metalness: 0.2,
      roughness: 0.01,
      transmission: 0.95,
      thickness: 2.5,
      ior: 1.55,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
    });

    const darkMetalMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a192f, // Dark navy/black for rings
      metalness: 0.8,
      roughness: 0.2,
    });

    const geometry = new THREE.TorusKnotGeometry(1.2, 0.3, 100, 20, 2, 3);
    const mainMesh = new THREE.Mesh(geometry, glassMaterial);
    heroGroup.add(mainMesh);

    const ringGeo = new THREE.TorusGeometry(2.5, 0.012, 16, 100);
    const ring1 = new THREE.Mesh(ringGeo, darkMetalMaterial);
    ring1.rotation.x = Math.PI / 1.8;
    heroGroup.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, darkMetalMaterial);
    ring2.rotation.x = Math.PI / 2.2;
    ring2.rotation.y = Math.PI / 4;
    ring2.scale.set(0.8, 0.8, 0.8);
    heroGroup.add(ring2);

    const darkMatteMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a192f, // Dark navy particles matching the theme
      roughness: 0.8,
      metalness: 0.1,
    });

    const particleGeo = new THREE.IcosahedronGeometry(0.04, 0);
    for (let i = 0; i < 30; i++) {
      const particle = new THREE.Mesh(particleGeo, darkMatteMaterial);
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
    let windowHalfX = getWidth() / 2;
    let windowHalfY = getHeight() / 2;

    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX) * 0.0004;
      mouseY = (event.clientY - windowHalfY) * 0.0004;
    };
    document.addEventListener("mousemove", onMouseMove);

    const timer = new THREE.Timer();
    timer.connect(document);

    const animate = (timestamp?: number) => {
      animFrameId = requestAnimationFrame(animate);
      if (getWidth() <= 1 || getHeight() <= 1) return;
      
      timer.update(timestamp ?? performance.now());
      const time = timer.getElapsed();

      baseGroup.rotation.y += 0.003;
      baseGroup.rotation.x = Math.sin(time * 0.5) * 0.1;

      heroGroup.rotation.y += (mouseX - heroGroup.rotation.y) * 0.05;
      heroGroup.rotation.x += (mouseY - heroGroup.rotation.x) * 0.05;

      mainMesh.rotation.z = Math.sin(time * 0.15) * 0.08;

      ring1.rotation.z += 0.001;
      ring2.rotation.z -= 0.002;

      heroGroup.children.forEach((child) => {
        if (child.userData?.speed) {
          child.userData.angle += child.userData.speed;
          child.position.x = child.userData.radius * Math.cos(child.userData.angle);
          child.position.z = child.userData.radius * Math.sin(child.userData.angle);
          child.position.y += Math.sin(time + child.userData.yOffset) * 0.0015;
          child.rotation.x += 0.01;
          child.rotation.y += 0.01;
        }
      });

      // Avoid rendering if canvas dimensions are zero to prevent InvalidStateError
      if (!renderer.domElement || renderer.domElement.width === 0 || renderer.domElement.height === 0) return;

      try {
        // Hide the black rings and particles during AsciiEffect render so they don't generate messy text
        ring1.visible = false;
        ring2.visible = false;
        heroGroup.children.forEach(c => {
          if (c !== mainMesh) c.visible = false;
        });

        // Crucial: use the effect's render method, not the renderer's
        effect.render(scene, camera);

        // Show them again
        ring1.visible = true;
        ring2.visible = true;
        heroGroup.children.forEach(c => c.visible = true);

        // Render the full scene with the rings onto the WebGL canvas
        renderer.render(scene, camera);
      } catch (err) {
        // Ignore InvalidStateError that might happen during initialization
        // if canvas dimensions are not yet fully stabilized by the browser
        console.warn("Render skipped this frame:", err);
      }
    };

    animate();

    const onResize = () => {
      const w = getWidth();
      const h = getHeight();
      windowHalfX = w / 2;
      windowHalfY = h / 2;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      effect.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animFrameId);
      timer.dispose();
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (container && effect.domElement) {
        try {
          container.removeChild(effect.domElement);
        } catch (_) {}
        renderer.dispose();
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
