'use client';

import { Pause, Play } from 'lucide-react';
import { useState } from 'react';
import { VinylDisc } from '@/components/site/vinyl-disc';

export function VinylRecord() {
  const [paused, setPaused] = useState(false);
  const action = paused ? 'Resume record rotation' : 'Pause record rotation';

  return (
    <figure
      className="vinyl-record mx-auto grid w-full max-w-[19rem] justify-items-center gap-3 sm:max-w-[26rem]"
      data-paused={paused}
    >
      <div className="vinyl-record__stage" aria-hidden="true">
        <VinylDisc />
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
