'use client';

import { useEffect, useRef } from 'react';
import { useScroll } from 'framer-motion';

const stars = Array.from({ length: 100 }, (_, index) => {
  const random = (seed: number) => {
    const value = Math.sin(index * 127.1 + seed * 311.7) * 43758.5453;
    return value - Math.floor(value);
  };
  return {
    x: random(1),
    y: random(2),
    size: 0.5 + random(3) * 1.1,
    phase: random(4) * Math.PI * 2,
  };
});

export function GalaxyBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progress = useRef(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  useEffect(
    () =>
      scrollYProgress.on('change', (value) => {
        progress.current = value;
      }),
    [scrollYProgress],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !container || !context) return;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduced = query.matches;
    let frame = 0;
    let width = 0;
    let height = 0;
    let heroHeight = 0;
    let visible = true;
    let accent = '231,154,121';
    let ink = '62,78,121';
    let dark = false;
    const readAccent = () => {
      dark = document.documentElement.classList.contains('dark');
      ink = getComputedStyle(document.documentElement)
        .getPropertyValue('--star-ink')
        .trim()
        .split(/\s+/)
        .join(',');
      accent = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent-rgb')
        .trim()
        .split(/\s+/)
        .join(',');
    };
    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      heroHeight =
        document.getElementById('top')?.clientHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      const t = reduced ? 0 : time * 0.001;
      const alignment = reduced
        ? 0
        : Math.min(1, Math.max(0, progress.current * 2.5));
      const points = stars.map((star, i) => {
        const drift = Math.sin(t * 0.08 + star.phase) * 8;
        const startX = star.x * width;
        const startY = star.y * heroHeight;
        const targetX = width * (0.22 + star.x * 0.7);
        const targetY =
          heroHeight * 0.96 +
          Math.sin(star.x * Math.PI * 1.6) * 70 +
          (i % 3) * 12;
        return {
          x: startX + (targetX - startX) * alignment + drift,
          y:
            startY +
            (targetY - startY) * alignment +
            Math.cos(t * 0.06 + star.phase) * 7,
        };
      });
      // A handful of connections gives the stars a chart-like structure.
      context.lineWidth = 0.6;
      points.forEach((point, i) => {
        if (i % 7 !== 0) return;
        const next = points[(i + 7) % points.length];
        if (
          alignment < 0.5 &&
          (point.x < width * 0.48 || next.x < width * 0.48)
        )
          return;
        if (Math.hypot(point.x - next.x, point.y - next.y) > width * 0.3)
          return;
        context.strokeStyle = `rgba(${accent},${0.08 + alignment * 0.14})`;
        context.beginPath();
        context.moveTo(point.x, point.y);
        context.lineTo(next.x, next.y);
        context.stroke();
      });
      points.forEach((point, i) => {
        const star = stars[i];
        const leftFade =
          width > 900
            ? Math.min(1, Math.max(0.1, (point.x / width - 0.25) * 3))
            : 0.7;
        const opacity =
          (0.35 + (Math.sin(t * 0.45 + star.phase) * 0.5 + 0.5) * 0.4) *
          leftFade;
        const color = i % 4 === 0 ? accent : ink;
        if (dark && i % 9 === 0) {
          const glow = context.createRadialGradient(
            point.x,
            point.y,
            0,
            point.x,
            point.y,
            14,
          );
          glow.addColorStop(0, `rgba(${color},${opacity * 0.4})`);
          glow.addColorStop(1, `rgba(${color},0)`);
          context.fillStyle = glow;
          context.fillRect(point.x - 14, point.y - 14, 28, 28);
        }
        context.fillStyle = `rgba(${color},${opacity})`;
        context.beginPath();
        context.arc(point.x, point.y, star.size, 0, Math.PI * 2);
        context.fill();
      });
      if (visible && !reduced) frame = requestAnimationFrame(draw);
    };
    const redraw = () => {
      readAccent();
      if (reduced) draw(0);
    };
    const motionChange = () => {
      reduced = query.matches;
      cancelAnimationFrame(frame);
      draw(0);
    };
    const observer = new ResizeObserver(() => {
      resize();
      if (reduced) draw(0);
    });
    observer.observe(container);
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible) draw(0);
    });
    visibility.observe(container);
    window.addEventListener('accentchange', redraw);
    window.addEventListener('themechange', redraw);
    query.addEventListener('change', motionChange);
    readAccent();
    resize();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
      window.removeEventListener('accentchange', redraw);
      window.removeEventListener('themechange', redraw);
      query.removeEventListener('change', motionChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden [mask-image:linear-gradient(black_0%,black_80%,transparent_100%)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_45%_at_79%_26%,rgb(var(--accent-rgb)/0.05),transparent_75%)]" />
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
    </div>
  );
}
