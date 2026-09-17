export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      <div className="motion-safe:animate-drift absolute left-1/2 top-[-24%] h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-brand/[0.14] blur-[140px]" />
      <div className="motion-safe:animate-drift absolute right-[-10%] top-[18%] h-[30rem] w-[30rem] rounded-full bg-brand-violet/[0.1] blur-[130px] [animation-delay:-11s]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,var(--background)_72%)]" />
    </div>
  );
}
