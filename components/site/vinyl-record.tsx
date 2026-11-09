'use client';

import { Orbit, Pause, Play } from 'lucide-react';
import { useState } from 'react';

export function VinylRecord() {
  const [paused, setPaused] = useState(false);
  const action = paused ? 'Resume record rotation' : 'Pause record rotation';

  return (
    <figure
      className="vinyl-record mx-auto grid w-full max-w-[26rem] justify-items-center gap-3"
      data-paused={paused}
    >
      <div className="vinyl-record__stage" aria-hidden="true">
        <div className="vinyl-record__disc">
          <div className="vinyl-record__surface">
            <div className="vinyl-record__label">
              <span className="vinyl-record__name">Sur Shah</span>
              <Orbit className="vinyl-record__orbit" strokeWidth={1.1} />
              <span className="vinyl-record__side">Side A</span>
              <span className="vinyl-record__spindle" />
            </div>
          </div>
          <div className="vinyl-record__reflection" />
        </div>
      </div>
      <figcaption className="motion-reduce:hidden">
        <button
          type="button"
          aria-label={action}
          title={action}
          onClick={() => setPaused((current) => !current)}
          className="focus-ring grid size-11 place-items-center rounded-full border border-border text-brand transition-colors hover:bg-accent"
        >
          {paused ? (
            <Play aria-hidden="true" size={15} />
          ) : (
            <Pause aria-hidden="true" size={15} />
          )}
        </button>
      </figcaption>
    </figure>
  );
}
