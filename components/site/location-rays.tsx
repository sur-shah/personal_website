'use client';

import LightRays from '@/components/LightRays';

export function LocationRays() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-75 [mask-image:linear-gradient(to_right,transparent_18%,black_55%)]"
    >
      <LightRays
        raysOrigin="top-center"
        raysColor="#4fc5bb"
        raysSpeed={0.35}
        lightSpread={1.15}
        rayLength={2.2}
        fadeDistance={1.35}
        mouseInfluence={0.035}
        distortion={0.04}
      />
    </div>
  );
}
