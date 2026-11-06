'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createMineralTextures } from '@/components/site/mineral-texture';

export function PlanetScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduced = motionQuery.matches;
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
    renderer.toneMappingExposure = 1.3;
    renderer.domElement.setAttribute('aria-hidden', 'true');
    container.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40);
    camera.position.z = 7.4;
    scene.add(new THREE.AmbientLight(0xa5aecb, 0.85));
    const key = new THREE.DirectionalLight(0xe4eaff, 3.8);
    key.position.set(-3, 4, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xe79a79, 3.3);
    rim.position.set(4, 0.3, -1);
    scene.add(rim);
    const maps = createMineralTextures();
    const geometry = new THREE.SphereGeometry(1.32, 128, 96);
    const material = new THREE.MeshPhysicalMaterial({
      map: maps?.colorMap ?? null,
      bumpMap: maps?.heightMap ?? null,
      bumpScale: 0.075,
      displacementMap: maps?.heightMap ?? null,
      displacementScale: 0.065,
      displacementBias: -0.03,
      roughness: 0.66,
      metalness: 0.1,
      clearcoat: 0.22,
      clearcoatRoughness: 0.55,
    });
    const world = new THREE.Mesh(geometry, material);
    world.rotation.set(0.18, 2.6, -0.26);
    const group = new THREE.Group();
    group.add(world);
    scene.add(group);
    const orbitGeometry = new THREE.BufferGeometry().setFromPoints(
      Array.from({ length: 161 }, (_, i) => {
        const angle = (i / 160) * Math.PI * 2;
        return new THREE.Vector3(
          Math.cos(angle) * 1.93,
          Math.sin(angle) * 1.93,
          0,
        );
      }),
    );
    const orbitMaterial = new THREE.LineBasicMaterial({
      color: 0xe79a79,
      transparent: true,
      opacity: 0.18,
    });
    const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
    orbit.rotation.set(1.15, 0.3, -0.32);
    group.add(orbit);
    const targetColor = new THREE.Color();
    const readAccent = () =>
      targetColor.set(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--accent-hex')
          .trim() || '#e79a79',
      );
    readAccent();
    window.addEventListener('accentchange', readAccent);
    let frame = 0;
    let visible = true;
    let previous = 0;
    const draw = (time: number) => {
      const delta = Math.min((time - previous) / 1000 || 0, 0.05);
      previous = time;
      if (!reduced && !pausedRef.current) world.rotation.y += delta * 0.065;
      const ease = reduced ? 1 : 1 - Math.exp(-delta * 3);
      group.rotation.y +=
        ((reduced ? 0 : pointer.current.x * 0.17) - group.rotation.y) * ease;
      group.rotation.x +=
        ((reduced ? 0 : -pointer.current.y * 0.12) - group.rotation.x) * ease;
      rim.color.lerp(targetColor, reduced ? 1 : 0.06);
      orbitMaterial.color.copy(rim.color);
      renderer.render(scene, camera);
      if (visible && !reduced) frame = requestAnimationFrame(draw);
    };
    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      if (reduced) draw(0);
    };
    const motionChange = () => {
      reduced = motionQuery.matches;
      cancelAnimationFrame(frame);
      previous = 0;
      draw(0);
    };
    const accentRender = () => {
      if (reduced) draw(0);
    };
    window.addEventListener('accentchange', accentRender);
    motionQuery.addEventListener('change', motionChange);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      previous = 0;
      if (visible) draw(0);
    });
    observer.observe(container);
    resize();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      motionQuery.removeEventListener('change', motionChange);
      window.removeEventListener('accentchange', readAccent);
      window.removeEventListener('accentchange', accentRender);
      geometry.dispose();
      material.dispose();
      orbitGeometry.dispose();
      orbitMaterial.dispose();
      maps?.colorMap.dispose();
      maps?.heightMap.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <figure className="planet-stage relative h-[270px] w-full sm:h-[410px] lg:h-[min(62dvh,560px)]">
      <div className="planet-halo pointer-events-none absolute inset-0" />
      <div
        ref={containerRef}
        className="absolute inset-0 [&>canvas]:size-full"
      />
      <button
        type="button"
        aria-label={paused ? 'Resume planet rotation' : 'Pause planet rotation'}
        aria-pressed={paused}
        onClick={() => setPaused((value) => !value)}
        onPointerMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          pointer.current = {
            x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
            y: ((event.clientY - rect.top) / rect.height) * 2 - 1,
          };
        }}
        onPointerLeave={() => {
          pointer.current = { x: 0, y: 0 };
        }}
        className="focus-ring absolute left-1/2 top-1/2 size-[66%] -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full active:cursor-grabbing"
      />
      <figcaption
        aria-live="polite"
        className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center gap-2 px-3 py-2 font-mono text-[10px] text-muted-foreground sm:text-xs"
      >
        <span>{paused ? 'Rotation paused' : 'Select to pause'}</span>
      </figcaption>
    </figure>
  );
}
