'use client';

import { Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { VinylDisc } from '@/components/site/vinyl-disc';
import {
  TurntableLamp,
  TurntableTonearm,
} from '@/components/site/turntable-details';

function pointerAngle(event: PointerEvent<HTMLButtonElement>) {
  const bounds = event.currentTarget.getBoundingClientRect();
  const x = event.clientX - (bounds.left + bounds.width / 2);
  const y = event.clientY - (bounds.top + bounds.height / 2);
  return Math.hypot(x, y) < bounds.width * 0.075 ? null : Math.atan2(y, x);
}

export function VinylRecord() {
  const [paused, setPaused] = useState(false);
  const action = paused ? 'Resume record rotation' : 'Pause record rotation';
  const stage = useRef<HTMLButtonElement>(null);
  const surface = useRef<HTMLSpanElement>(null);
  const offset = useRef(0);
  const frame = useRef(0);
  const drag = useRef<{
    id: number;
    angle: number | null;
    time: number;
    speed: number;
  } | null>(null);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  function rotateBy(radians: number) {
    offset.current = (offset.current + radians) % (Math.PI * 2);
    if (surface.current) surface.current.style.rotate = `${offset.current}rad`;
  }

  function stopGlide() {
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    stage.current?.removeAttribute('data-manual-spin');
  }

  function startDrag(event: PointerEvent<HTMLButtonElement>) {
    if (event.button !== 0 || !event.isPrimary || drag.current) return;
    stopGlide();
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.setAttribute('data-manual-spin', '');
    drag.current = {
      id: event.pointerId,
      angle: pointerAngle(event),
      time: event.timeStamp,
      speed: 0,
    };
  }

  function moveDrag(event: PointerEvent<HTMLButtonElement>) {
    const current = drag.current;
    if (!current || current.id !== event.pointerId) return;
    const angle = pointerAngle(event);
    if (angle !== null && current.angle !== null) {
      const difference = angle - current.angle;
      const step = Math.atan2(Math.sin(difference), Math.cos(difference));
      rotateBy(step);
      const elapsed = Math.max(8, event.timeStamp - current.time);
      const speed = Math.max(-0.016, Math.min(0.016, step / elapsed));
      current.speed = current.speed * 0.35 + speed * 0.65;
    } else {
      current.speed = 0;
    }
    current.angle = angle;
    current.time = event.timeStamp;
  }

  function endDrag(event: PointerEvent<HTMLButtonElement>, fling: boolean) {
    const current = drag.current;
    if (!current || current.id !== event.pointerId) return;
    drag.current = null;
    let speed = current.speed;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (
      !fling ||
      motion.matches ||
      event.timeStamp - current.time > 100 ||
      Math.abs(speed) < 0.001
    ) {
      stopGlide();
      return;
    }

    let previous = performance.now();
    function glide(time: number) {
      const elapsed = Math.max(0, time - previous);
      previous = time;
      const decay = Math.exp(-elapsed / 170);
      if (!motion.matches) rotateBy(speed * 170 * (1 - decay));
      speed *= decay;
      if (motion.matches || Math.abs(speed) < 0.00035) stopGlide();
      else frame.current = requestAnimationFrame(glide);
    }
    frame.current = requestAnimationFrame(glide);
  }

  return (
    <figure
      className="vinyl-record turntable mx-auto w-full max-w-[29rem]"
      aria-label="Interactive turntable"
      data-paused={paused}
    >
      <TurntableLamp />
      <div className="turntable__deck">
        <span className="turntable__platter" aria-hidden="true" />
        <button
          ref={stage}
          type="button"
          className="vinyl-record__stage focus-ring touch-none cursor-grab select-none rounded-full active:cursor-grabbing"
          aria-label="Spin record"
          title="Drag to spin the record"
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={(event) => endDrag(event, true)}
          onPointerCancel={(event) => endDrag(event, false)}
          onLostPointerCapture={(event) => endDrag(event, false)}
          onClick={(event) => {
            if (event.detail !== 0) return;
            stopGlide();
            rotateBy(Math.PI / 3);
          }}
        >
          <VinylDisc surfaceRef={surface} />
        </button>
        <TurntableTonearm />
        <span className="turntable__light" aria-hidden="true" />
        <button
          type="button"
          aria-label={action}
          title={action}
          onClick={() => {
            stopGlide();
            setPaused((current) => !current);
          }}
          className="turntable__control focus-ring grid size-11 place-items-center rounded-full text-[#f1ead4] motion-reduce:hidden"
        >
          {paused ? (
            <Play aria-hidden="true" size={15} />
          ) : (
            <Pause aria-hidden="true" size={15} />
          )}
        </button>
      </div>
    </figure>
  );
}
