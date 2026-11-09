'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
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
    scene.add(new THREE.AmbientLight(0xdbead8, 0.95));
    const key = new THREE.DirectionalLight(0xfff2d9, 3.4);
    key.position.set(-3, 4, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xa9d4b7, 2.8);
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
    let frame = 0;
    let visible = true;
    let previous = 0;
    const draw = (time: number) => {
      const delta = Math.min((time - previous) / 1000 || 0, 0.05);
      previous = time;
      if (!reduced && !pausedRef.current) world.rotation.y += delta * 0.13;
      const ease = reduced ? 1 : 1 - Math.exp(-delta * 3);
      group.rotation.y +=
        ((reduced ? 0 : pointer.current.x * 0.17) - group.rotation.y) * ease;
      group.rotation.x +=
        ((reduced ? 0 : -pointer.current.y * 0.12) - group.rotation.x) * ease;
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
      geometry.dispose();
      material.dispose();
      maps?.colorMap.dispose();
      maps?.heightMap.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <figure className="planet-stage group relative mx-auto h-[280px] w-full max-w-[500px] sm:h-[390px] lg:h-[min(60dvh,520px)]">
      <div className="planet-halo pointer-events-none absolute inset-0" />
      <div
        ref={containerRef}
        className="absolute inset-x-0 bottom-9 top-0 [&>canvas]:size-full"
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
      />
      <figcaption className="absolute inset-x-0 bottom-0 hidden items-center justify-center gap-3 text-sm text-muted-foreground group-has-[canvas]:flex">
        <span>Vinyl study</span>
        <button
          type="button"
          aria-label={
            paused ? 'Resume planet rotation' : 'Pause planet rotation'
          }
          onClick={() => setPaused((value) => !value)}
          className="focus-ring grid size-9 place-items-center rounded-full border border-border text-brand transition-colors hover:bg-accent motion-reduce:hidden"
        >
          {paused ? (
            <Play aria-hidden="true" size={14} />
          ) : (
            <Pause aria-hidden="true" size={14} />
          )}
        </button>
      </figcaption>
    </figure>
  );
}
