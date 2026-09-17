'use client';

import { useReducedMotion, useScroll } from 'framer-motion';
import { useEffect, useRef } from 'react';

export function NetworkTransition() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const reduceMotion = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end 45%'],
  });

  useEffect(() => {
    return scrollYProgress.on('change', (progress) => {
      progressRef.current = progress;
    });
  }, [scrollYProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let isVisible = true;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);
      const progress = reduceMotion ? 1 : progressRef.current;
      const collapse = Math.max(0.08, 1 - progress * 0.94);
      const centerY = height * 0.5;
      const count = width < 640 ? 22 : 38;
      const points = Array.from({ length: count }, (_, index) => {
        const ratio = index / Math.max(count - 1, 1);
        const x = width * (0.04 + ratio * 0.92);
        const phase = ratio * Math.PI * 5 + time * 0.00045;
        const secondary = Math.sin(ratio * Math.PI * 11 - time * 0.0002);
        const y =
          centerY +
          (Math.sin(phase) * height * 0.26 + secondary * height * 0.08) *
            collapse;
        return { x, y };
      });

      const lineAlpha = 0.2 + progress * 0.38;
      context.strokeStyle = `rgba(64, 190, 181, ${lineAlpha})`;
      context.lineWidth = 0.8;
      context.beginPath();
      points.forEach((point, index) => {
        if (index === 0) context.moveTo(point.x, point.y);
        else context.lineTo(point.x, point.y);
      });
      context.stroke();

      points.forEach((point, index) => {
        const emphasis = index % 3 === 0 ? 1.7 : 1.1;
        context.fillStyle = `rgba(124, 224, 209, ${0.42 + progress * 0.46})`;
        context.beginPath();
        context.arc(point.x, point.y, emphasis, 0, Math.PI * 2);
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
    resize();
    draw();

    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [reduceMotion]);

  return (
    <div
      ref={sectionRef}
      aria-hidden="true"
      className="relative h-32 overflow-hidden border-b border-white/8 sm:h-40"
    >
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
    </div>
  );
}
