'use client';

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useRef, type ReactNode } from 'react';

const grooves = [
  'M1 10 C170 10 222 42 365 42 S538 10 639 10',
  'M1 17 C170 17 222 49 365 49 S538 17 639 17',
  'M1 24 C170 24 222 56 365 56 S538 24 639 24',
];

export function LocationsHandoff({ children }: { children: ReactNode }) {
  const seam = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: seam,
    offset: ['start end', 'start 66%'],
  });
  const offset = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [20, 0]);

  return (
    <>
      <div
        ref={seam}
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-20 w-4/5 sm:w-3/5"
      >
        <svg
          className="locations-grooves size-full"
          viewBox="0 0 640 80"
          preserveAspectRatio="none"
        >
          {grooves.map((path) => (
            <motion.path
              key={path}
              pathLength="1"
              d={path}
              style={{ strokeDashoffset: reducedMotion ? 0 : offset }}
            />
          ))}
        </svg>
      </div>
      <motion.div
        className="locations-content relative mx-auto grid w-full max-w-6xl items-center gap-12 px-6 sm:px-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16"
        style={{ y: reducedMotion ? 0 : y }}
      >
        {children}
      </motion.div>
    </>
  );
}
