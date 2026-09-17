'use client';

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { Fragment, useRef } from 'react';

const START_OPACITY = 0.16;
const REVEAL_SPREAD = 0.82;
const WORD_DURATION = 0.18;

function RevealingWord({
  children,
  index,
  count,
  progress,
  reducedMotion,
}: {
  children: string;
  index: number;
  count: number;
  progress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const start = count <= 1 ? 0 : (index / (count - 1)) * REVEAL_SPREAD;
  const end = Math.min(1, start + WORD_DURATION);
  const opacity = useTransform(progress, [start, end], [START_OPACITY, 1], {
    clamp: true,
  });

  return (
    <motion.span
      aria-hidden="true"
      style={reducedMotion ? undefined : { opacity }}
    >
      {children}
    </motion.span>
  );
}

export function ScrollWordReveal({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 82%', 'center 46%'],
  });
  const words = text.split(' ');

  return (
    <div
      ref={containerRef}
      className="flex min-h-[62vh] items-center py-16 sm:min-h-[72vh] sm:py-24"
    >
      <div className="max-w-5xl">
        <p className="mb-8 text-sm font-medium text-brand">About</p>
        <h2
          aria-label={text}
          className="text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-foreground sm:text-6xl"
        >
          {words.map((word, index) => (
            <Fragment key={`${word}-${index}`}>
              <RevealingWord
                index={index}
                count={words.length}
                progress={scrollYProgress}
                reducedMotion={reducedMotion}
              >
                {word}
              </RevealingWord>
              {index < words.length - 1 ? ' ' : null}
            </Fragment>
          ))}
        </h2>
      </div>
    </div>
  );
}
