'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

type PlanetName = 'Earth' | 'Mars' | 'Saturn';

const planets = [
  { name: 'Earth', texture: '/planets/earth.jpg', x: 47, y: 40, radius: 1.15 },
  { name: 'Mars', texture: '/planets/mars.jpg', x: 22, y: 74, radius: 0.66 },
  {
    name: 'Saturn',
    texture: '/planets/saturn.jpg',
    x: 78,
    y: 68,
    radius: 0.86,
  },
] as const;

export function PlanetScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<PlanetName | null>(null);
  const [active, setActive] = useState<PlanetName | null>(null);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-5, 5, 5, -5, 0.1, 100);
    camera.position.z = 14;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
      });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.45;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.className = 'absolute inset-0 size-full';
    renderer.domElement.setAttribute('aria-hidden', 'true');
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xc9d4d5, 1.4));
    const sun = new THREE.DirectionalLight(0xfff4e3, 3.5);
    sun.position.set(-4, 6, 9);
    scene.add(sun);
    const rim = new THREE.DirectionalLight(0x65c8c3, 1.1);
    rim.position.set(5, -3, -2);
    scene.add(rim);

    const sphereGeometry = new THREE.SphereGeometry(1, 64, 48);
    const ringCanvas = document.createElement('canvas');
    ringCanvas.width = 512;
    ringCanvas.height = 512;
    const ringContext = ringCanvas.getContext('2d');
    if (ringContext) {
      const bands = [
        [121, 8, 'rgba(177,163,137,0.3)'],
        [134, 13, 'rgba(219,202,171,0.66)'],
        [150, 9, 'rgba(151,139,119,0.4)'],
        [166, 10, 'rgba(225,211,181,0.7)'],
        [182, 14, 'rgba(187,171,143,0.6)'],
        [200, 7, 'rgba(231,216,186,0.55)'],
        [213, 6, 'rgba(162,150,127,0.32)'],
      ] as const;
      for (const [radius, width, color] of bands) {
        ringContext.beginPath();
        ringContext.arc(256, 256, radius, 0, Math.PI * 2);
        ringContext.lineWidth = width;
        ringContext.strokeStyle = color;
        ringContext.stroke();
      }
    }
    const ringTexture = new THREE.CanvasTexture(ringCanvas);
    const ringGeometry = new THREE.PlaneGeometry(3.9, 3.9);
    const ringMaterial = new THREE.MeshBasicMaterial({
      map: ringTexture,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    const textureLoader = new THREE.TextureLoader();
    const textures: THREE.Texture[] = [];
    const materials: THREE.MeshStandardMaterial[] = [];
    const groups = new Map<PlanetName, THREE.Group>();
    const spheres = new Map<PlanetName, THREE.Mesh>();
    let disposed = false;
    let visible = true;
    let frame = 0;

    for (const planet of planets) {
      const group = new THREE.Group();
      const texture = textureLoader.load(planet.texture, () => {
        if (!disposed && reducedMotion) renderer.render(scene, camera);
      });
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = Math.min(
        renderer.capabilities.getMaxAnisotropy(),
        4,
      );
      textures.push(texture);
      const material = new THREE.MeshStandardMaterial({
        map: texture,
        color:
          planet.name === 'Mars'
            ? 0xd6a18c
            : planet.name === 'Saturn'
              ? 0xd1c8b4
              : 0xffffff,
        roughness: 0.95,
      });
      materials.push(material);
      const sphere = new THREE.Mesh(sphereGeometry, material);
      sphere.scale.setScalar(planet.radius);
      sphere.rotation.y =
        planet.name === 'Earth' ? 2.6 : planet.name === 'Mars' ? 1.4 : 0.6;
      group.add(sphere);
      if (planet.name === 'Saturn') {
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.set(-1.12, 0.08, -0.28);
        ring.scale.setScalar(planet.radius);
        ring.position.z = -0.06;
        group.add(ring);
      }
      scene.add(group);
      groups.set(planet.name, group);
      spheres.set(planet.name, sphere);
    }

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;
      const halfHeight = width < 640 ? 3.55 : 3.8;
      const halfWidth = halfHeight * (width / height);
      camera.left = -halfWidth;
      camera.right = halfWidth;
      camera.top = halfHeight;
      camera.bottom = -halfHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      for (const planet of planets) {
        const group = groups.get(planet.name);
        if (!group) continue;
        group.position.set(
          ((planet.x - 50) / 50) * halfWidth,
          ((50 - planet.y) / 50) * halfHeight,
          0,
        );
      }
      if (reducedMotion) renderer.render(scene, camera);
    };

    const start = performance.now();
    const draw = () => {
      const elapsed = (performance.now() - start) * 0.001;
      for (const [index, planet] of planets.entries()) {
        const group = groups.get(planet.name);
        const sphere = spheres.get(planet.name);
        if (!group || !sphere) continue;
        const hovering = activeRef.current === planet.name;
        sphere.rotation.y += hovering ? 0.006 : 0.0016;
        group.position.z += ((hovering ? 0.35 : 0) - group.position.z) * 0.045;
        const targetScale = hovering ? 1.08 : 1;
        group.scale.x += (targetScale - group.scale.x) * 0.06;
        group.scale.y += (targetScale - group.scale.y) * 0.06;
        group.rotation.z = Math.sin(elapsed * 0.28 + index * 2) * 0.025;
      }
      renderer.render(scene, camera);
      if (visible) frame = requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      const wasVisible = visible;
      visible = entry.isIntersecting;
      if (!visible) cancelAnimationFrame(frame);
      else if (!wasVisible && !reducedMotion)
        frame = requestAnimationFrame(draw);
    });
    resizeObserver.observe(container);
    visibilityObserver.observe(container);
    resize();
    if (!reducedMotion) frame = requestAnimationFrame(draw);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      sphereGeometry.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      ringTexture.dispose();
      materials.forEach((material) => material.dispose());
      textures.forEach((texture) => texture.dispose());
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[300px] w-full sm:h-[390px] lg:h-[min(70vh,650px)]"
    >
      {planets.map((planet) => (
        <button
          aria-label={`Explore ${planet.name}`}
          aria-pressed={active === planet.name}
          className="planet-hit focus-ring absolute z-10 flex size-24 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-end justify-center rounded-full sm:size-32 lg:size-40"
          key={planet.name}
          onBlur={() => setActive(null)}
          onClick={() => setActive(planet.name)}
          onFocus={() => setActive(planet.name)}
          onPointerEnter={() => setActive(planet.name)}
          onPointerLeave={() => setActive(null)}
          style={{ left: `${planet.x}%`, top: `${planet.y}%` }}
          type="button"
        >
          <span className="planet-label pointer-events-none translate-y-5 rounded-full border border-white/15 bg-background/85 px-3 py-1 text-xs font-medium tracking-wide text-foreground opacity-0 backdrop-blur-md transition-all duration-200">
            {planet.name}
          </span>
        </button>
      ))}
    </div>
  );
}
