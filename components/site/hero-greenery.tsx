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
  light: ['#284b37', '#3a6446', '#627d49', '#829057'],
  dark: ['#527d5e', '#729971', '#94af7b', '#b1c48c'],
};

function drawLeaf(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  length: number,
  width: number,
  colors: string[],
  shade: number,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  const petiole = length * 0.17;
  ctx.lineWidth = 0.72;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(petiole * 0.55, 0.5, petiole, 0);
  ctx.stroke();
  ctx.translate(petiole, 0);

  const blade = length - petiole;
  const fill = ctx.createLinearGradient(
    blade * 0.2,
    -width,
    blade * 0.65,
    width,
  );
  fill.addColorStop(0, colors[Math.min(3, shade + 2)]);
  fill.addColorStop(0.54, colors[Math.min(3, shade + 1)]);
  fill.addColorStop(1, colors[shade]);
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(
    blade * 0.21,
    -width * 0.92,
    blade * 0.68,
    -width * 1.06,
    blade,
    -width * 0.23,
  );
  ctx.bezierCurveTo(
    blade * 0.76,
    width * 0.05,
    blade * 0.44,
    width * 0.92,
    0,
    0,
  );
  ctx.fill();

  ctx.strokeStyle = 'rgba(224, 233, 188, 0.42)';
  ctx.lineWidth = 0.46;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(
    blade * 0.49,
    -width * 0.11,
    blade * 0.94,
    -width * 0.23,
  );
  for (const at of [0.27, 0.48, 0.65]) {
    ctx.moveTo(blade * at, -width * 0.14);
    ctx.lineTo(blade * (at + 0.14), -width * (0.7 - at * 0.3));
    ctx.moveTo(blade * at, -width * 0.14);
    ctx.lineTo(blade * (at + 0.11), width * (0.35 - at * 0.25));
  }
  ctx.stroke();
  ctx.restore();
}

function drawSprout(
  ctx: CanvasRenderingContext2D,
  sprout: Sprout,
  age: number,
  colors: string[],
) {
  const progress = Math.min(1, age / 430);
  const growth = 1 - (1 - progress) ** 3;
  const fade = Math.min(1, (lifetime - age) / 900);
  const bend = ((sprout.variant % 4) - 1.5) * 3;
  const stemX = (t: number) => bend * t ** 2 - 7 * t * (1 - t);

  ctx.save();
  ctx.translate(sprout.x, sprout.y);
  ctx.rotate(sprout.lean);
  ctx.scale(sprout.size * growth, sprout.size * growth);
  ctx.globalAlpha = Math.min(1, progress * 3) * fade * 0.84;
  ctx.strokeStyle = colors[1];
  ctx.lineWidth = 0.95;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(-3.5, -20, bend, -40);
  ctx.stroke();

  const count = 4 + (sprout.variant % 2);
  for (let i = 0; i < count; i++) {
    const side = (i + sprout.variant) % 2 === 0 ? -1 : 1;
    const at = 0.24 + i * 0.145 + ((i + sprout.variant) % 3) * 0.014;
    const angle = -0.38 - ((sprout.variant + i * 2) % 5) * 0.13;
    const length = 21 - i * 1.8 + ((i + sprout.variant) % 3);
    drawLeaf(
      ctx,
      stemX(at),
      -40 * at,
      side === 1 ? angle : -Math.PI - angle,
      length,
      length * (0.27 + (sprout.variant % 3) * 0.045),
      colors,
      i % 2,
    );
  }
  drawLeaf(ctx, bend, -40, -1.45 + bend * 0.055, 11, 3.1, colors, 1);
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
    const recordControl = hero.querySelector('.vinyl-record button');
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
      const colors = document.documentElement.classList.contains('dark')
        ? palettes.dark
        : palettes.light;
      for (const sprout of sprouts)
        drawSprout(ctx!, sprout, Math.max(0, time - sprout.born), colors);
      frame = sprouts.length ? requestAnimationFrame(draw) : 0;
    }

    function move(event: PointerEvent) {
      if (motion.matches || !fine.matches || event.pointerType === 'touch')
        return;
      if (
        event.buttons !== 0 &&
        event.target instanceof Element &&
        event.target.closest('.vinyl-record__stage')
      )
        return;
      const now = performance.now();
      const { clientX: x, clientY: y } = event;
      if (
        previous &&
        (now - previous.time < 55 ||
          Math.hypot(x - previous.x, y - previous.y) < 39)
      )
        return;
      for (const protectedElement of [copy, recordControl]) {
        const area = protectedElement?.getBoundingClientRect();
        if (
          area?.width &&
          x > area.left - 35 &&
          x < area.right + 35 &&
          y > area.top - 12 &&
          y < area.bottom + 70
        )
          return;
      }

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
