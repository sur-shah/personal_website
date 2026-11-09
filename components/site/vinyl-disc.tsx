import { Orbit } from 'lucide-react';

export function VinylDisc() {
  return (
    <div className="vinyl-record__disc" aria-hidden="true">
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
  );
}
