'use client';

import { useReducedMotion, useScroll } from 'framer-motion';
import { useEffect, useRef } from 'react';

type NetworkNode = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  depth: number;
};

function createRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function createNodes(width: number, height: number) {
  const random = createRandom(Math.round(width + height));
  const mobile = width < 640;
  const count = mobile ? 24 : 42;
  const startX = mobile ? 0.08 : 0.32;

  return Array.from({ length: count }, (): NetworkNode => {
    const depth = 0.45 + random() * 0.55;
    return {
      x: width * (startX + random() * (1.04 - startX)),
      y: height * (-0.04 + random() * 1.08),
      vx: (random() - 0.5) * 0.12 * depth,
      vy: (random() - 0.5) * 0.09 * depth,
      depth,
    };
  });
}

export function FlowField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollProgressRef = useRef(0);
  const reduceMotion = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    return scrollYProgress.on('change', (progress) => {
      scrollProgressRef.current = progress;
    });
  }, [scrollYProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let nodes: NetworkNode[] = [];
    let isVisible = true;
    const pointer = { x: 0, y: 0, active: false };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = createNodes(width, height);
      pointer.x = width * 0.82;
      pointer.y = height * 0.38;
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      if (
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom ||
        event.clientX < bounds.left ||
        event.clientX > bounds.right
      ) {
        pointer.active = false;
        return;
      }
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.active = true;
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);
      const progress = scrollProgressRef.current;
      const mobile = width < 640;
      const connectionDistance = mobile ? 145 : 168;
      const points = nodes.map((node, index) => {
        if (!reduceMotion) {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < width * (mobile ? 0.02 : 0.28) || node.x > width * 1.08)
            node.vx *= -1;
          if (node.y < -height * 0.08 || node.y > height * 1.08) node.vy *= -1;
        }

        const drift = reduceMotion ? 0 : time * 0.00022;
        let x =
          node.x +
          Math.sin(drift + index * 0.72) * 9 * node.depth -
          progress * 70 * node.depth;
        let y =
          node.y +
          Math.cos(drift * 0.8 + index * 0.54) * 7 * node.depth +
          progress * (node.x / Math.max(width, 1) - 0.5) * 110;

        if (pointer.active && !reduceMotion) {
          const dx = pointer.x - x;
          const dy = pointer.y - y;
          const distance = Math.hypot(dx, dy);
          const influenceRadius = mobile ? 120 : 210;
          if (distance > 0 && distance < influenceRadius) {
            const pull = (1 - distance / influenceRadius) * 18;
            x += (dx / distance) * pull;
            y += (dy / distance) * pull;
          }
        }
        return { x, y, depth: node.depth };
      });

      for (let first = 0; first < points.length; first += 1) {
        for (let second = first + 1; second < points.length; second += 1) {
          const a = points[first];
          const b = points[second];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance >= connectionDistance) continue;
          const alpha =
            (1 - distance / connectionDistance) *
            0.38 *
            Math.min(a.depth, b.depth);
          context.strokeStyle = `rgba(126, 238, 118, ${alpha})`;
          context.lineWidth = 0.7;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }
      }

      points.forEach((point) => {
        context.fillStyle = `rgba(176, 255, 148, ${0.34 + point.depth * 0.42})`;
        context.beginPath();
        context.arc(
          point.x,
          point.y,
          0.75 + point.depth * 0.85,
          0,
          Math.PI * 2,
        );
        context.fill();
      });

      if (!reduceMotion && isVisible)
        frame = window.requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw();
    });
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      const wasVisible = isVisible;
      isVisible = entry.isIntersecting;
      if (isVisible && !wasVisible && !reduceMotion)
        frame = window.requestAnimationFrame(draw);
    });

    resizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);
    if (!reduceMotion)
      window.addEventListener('pointermove', handlePointerMove);
    resize();
    draw();

    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      window.cancelAnimationFrame(frame);
    };
  }, [reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 size-full opacity-55 [mask-image:linear-gradient(to_left,black_0%,black_64%,transparent_96%)] sm:opacity-90"
    />
  );
}
