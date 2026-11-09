import { Orbit } from 'lucide-react';
import type { Ref } from 'react';

export function VinylDisc({
  surfaceRef,
}: {
  surfaceRef?: Ref<HTMLSpanElement>;
}) {
  return (
    <span className="vinyl-record__disc" aria-hidden="true">
      <span className="vinyl-record__surface" ref={surfaceRef}>
        <span className="vinyl-record__label">
          <span className="vinyl-record__name">Sur Shah</span>
          <Orbit className="vinyl-record__orbit" strokeWidth={1.1} />
          <span className="vinyl-record__side">Side A</span>
          <span className="vinyl-record__spindle" />
        </span>
      </span>
      <span className="vinyl-record__reflection" />
    </span>
  );
}
