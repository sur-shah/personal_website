'use client';

import Galaxy from '@/components/Galaxy';

export function GalaxyBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,black_0%,black_72%,transparent_100%)]"
    >
      <div className="absolute inset-0 opacity-70 sm:opacity-85">
        <Galaxy
          focal={[0.48, 0.52]}
          starSpeed={0.12}
          speed={0.45}
          density={1.25}
          glowIntensity={0.23}
          saturation={0}
          twinkleIntensity={0.2}
          rotationSpeed={0.008}
          repulsionStrength={0.45}
          transparent
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--background)_0%,transparent_48%)] sm:bg-[linear-gradient(90deg,var(--background)_0%,transparent_68%)]" />
    </div>
  );
}
