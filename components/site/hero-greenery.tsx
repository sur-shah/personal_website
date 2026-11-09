'use client';

import { useEffect, useRef } from 'react';

type Sprout = {
  x: number;
  y: number;
  size: number;
  lean: number;
  variant: number;
  born: number;
};

const lifetime = 3000;
const palettes = {
  light: ['#255c3f', '#3b7048', '#648451', '#50763e'],
  dark: ['#90bb98', '#73a77e', '#a8be78', '#8aad73'],
};

function drawSprout(
  ctx: CanvasRenderingContext2D,
  sprout: Sprout,
  age: number,
) {
  const progress = Math.min(1, age / 430);
  const growth = 1 - (1 - progress) ** 3;
  const fade = Math.min(1, (lifetime - age) / 900);
  const colors = document.documentElement.classList.contains('dark')
    ? palettes.dark
    : palettes.light;
  const color = colors[sprout.variant % colors.length];

  ctx.save();
  ctx.translate(sprout.x, sprout.y);
  ctx.rotate(sprout.lean);
  ctx.scale(sprout.size * growth, sprout.size * growth);
  ctx.globalAlpha = Math.min(1, progress * 3) * fade * 0.84;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.2;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(-3, -17, 2, -37);
  ctx.stroke();

  const count = 4 + (sprout.variant % 2);
  for (let i = 0; i < count; i++) {
    const side = (i + sprout.variant) % 2 === 0 ? -1 : 1;
    const y = -8 - i * 6;
    const x = i > 2 ? 0.5 : -0.8;
    const reach = 15 - i * 1.35;
    ctx.fillStyle = colors[(sprout.variant + (i % 2)) % colors.length];
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(
      x + side * 3,
      y - 8,
      x + side * (reach - 3),
      y - 12,
      x + side * reach,
      y - 10,
    );
    ctx.quadraticCurveTo(x + side * (reach - 1), y - 2, x, y);
    ctx.fill();
  }
  ctx.restore();
}

export function HeroGreenery() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const hero = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !hero || !ctx) return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fine = window.matchMedia('(any-pointer: fine)');
    const copy = hero.querySelector('[data-hero-copy]');
    let sprouts: Sprout[] = [];
    let previous: { x: number; y: number; time: number } | undefined;
    let frame = 0;
    let width = 0;
    let height = 0;

    function clear() {
      cancelAnimationFrame(frame);
      frame = 0;
      sprouts = [];
      previous = undefined;
      ctx!.clearRect(0, 0, width, height);
    }

    function resize() {
      clear();
      width = hero!.clientWidth;
      height = hero!.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(width * ratio);
      canvas!.height = Math.round(height * ratio);
      ctx!.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function draw(time: number) {
      ctx!.clearRect(0, 0, width, height);
      sprouts = sprouts.filter((sprout) => time - sprout.born < lifetime);
      for (const sprout of sprouts)
        drawSprout(ctx!, sprout, Math.max(0, time - sprout.born));
      frame = sprouts.length ? requestAnimationFrame(draw) : 0;
    }

    function move(event: PointerEvent) {
      if (motion.matches || !fine.matches || event.pointerType === 'touch')
        return;
      const now = performance.now();
      const { clientX: x, clientY: y } = event;
      if (
        previous &&
        (now - previous.time < 55 ||
          Math.hypot(x - previous.x, y - previous.y) < 39)
      )
        return;
      const text = copy?.getBoundingClientRect();
      if (
        text &&
        x > text.left - 35 &&
        x < text.right + 35 &&
        y > text.top - 12 &&
        y < text.bottom + 56
      )
        return;

      const bounds = canvas!.getBoundingClientRect();
      previous = { x, y, time: now };
      sprouts.push({
        x: x - bounds.left,
        y: y - bounds.top,
        size: 0.75 + Math.random() * 0.55,
        lean: (Math.random() - 0.5) * 1.35,
        variant: Math.floor(Math.random() * 8),
        born: now,
      });
      if (sprouts.length > 25) sprouts.shift();
      if (!frame) frame = requestAnimationFrame(draw);
    }

    const observer = new ResizeObserver(resize);
    observer.observe(hero);
    resize();
    hero.addEventListener('pointermove', move, { passive: true });
    motion.addEventListener('change', clear);
    fine.addEventListener('change', clear);
    return () => {
      clear();
      observer.disconnect();
      hero.removeEventListener('pointermove', move);
      motion.removeEventListener('change', clear);
      fine.removeEventListener('change', clear);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 size-full motion-reduce:hidden"
    />
  );
}
