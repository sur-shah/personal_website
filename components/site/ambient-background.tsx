export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      <div className="motion-safe:animate-drift absolute left-0 top-[-20%] h-[36rem] w-[36rem] max-w-[80vw] -translate-x-1/4 rounded-full bg-brand/[0.16] blur-[140px]" />
      <div className="motion-safe:animate-drift absolute right-0 top-[22%] h-[24rem] w-[24rem] max-w-[70vw] translate-x-1/4 rounded-full bg-brand-violet/[0.1] blur-[130px] [animation-delay:-11s]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,var(--background)_72%)]" />
    </div>
  );
}
