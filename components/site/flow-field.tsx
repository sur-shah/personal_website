'use client';

import { useReducedMotion, useScroll } from 'framer-motion';
import { useEffect, useRef } from 'react';

export function FlowField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollProgressRef = useRef(0);
  const reduceMotion = useReducedMotion();
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
    let dpr = 1;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);

      const progress = scrollProgressRef.current;
      const animatedTime = reduceMotion ? 0 : time * 0.00018;
      const centerX = width * (0.83 - progress * 0.08);
      const centerY = height * (0.34 + progress * 0.16);
      const radius = Math.max(width, height) * 0.46;

      const glow = context.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        radius,
      );
      glow.addColorStop(0, 'rgba(126, 238, 118, 0.22)');
      glow.addColorStop(0.32, 'rgba(95, 210, 103, 0.09)');
      glow.addColorStop(1, 'rgba(50, 140, 75, 0)');
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      const lineGradient = context.createLinearGradient(
        width * 0.42,
        0,
        width,
        0,
      );
      lineGradient.addColorStop(0, 'rgba(126, 238, 118, 0)');
      lineGradient.addColorStop(0.42, 'rgba(126, 238, 118, 0.22)');
      lineGradient.addColorStop(1, 'rgba(176, 255, 148, 0.72)');

      context.strokeStyle = lineGradient;
      context.lineWidth = 0.8;

      const lineCount = width < 640 ? 14 : 22;
      for (let line = 0; line < lineCount; line += 1) {
        const normalized = line / Math.max(lineCount - 1, 1);
        const baseY = height * (0.05 + normalized * 0.82);
        const amplitude = 18 + normalized * 52;
        const phase = animatedTime + normalized * 2.8 + progress * 4.5;

        context.beginPath();
        for (let x = width * 0.34; x <= width + 12; x += 10) {
          const xRatio = x / width;
          const envelope = Math.pow(Math.max(0, xRatio - 0.28), 1.35);
          const primaryWave = Math.sin(x * 0.012 + phase) * amplitude;
          const secondaryWave =
            Math.sin(x * 0.0045 - phase * 0.7) * amplitude * 0.55;
          const scrollFold =
            Math.sin(xRatio * Math.PI + progress * Math.PI * 2) * progress * 85;
          const y =
            baseY +
            (primaryWave + secondaryWave + scrollFold) * envelope -
            normalized * progress * 36;

          if (x === width * 0.34) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.stroke();
      }

      if (!reduceMotion) frame = window.requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw();
    });

    observer.observe(canvas);
    resize();
    draw();

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 size-full opacity-70 [mask-image:linear-gradient(to_left,black_0%,black_58%,transparent_90%)] sm:opacity-100"
    />
  );
}
