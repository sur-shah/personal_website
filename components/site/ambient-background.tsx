export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      <div className="motion-safe:animate-drift absolute left-1/2 top-[-20%] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-brand/[0.08] blur-[140px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,var(--background)_70%)]" />
    </div>
  );
}
