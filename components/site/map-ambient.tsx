export function MapAmbient() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="map-ambient-glow absolute -right-[8%] -top-[28%] h-[130%] w-[75%] rounded-full bg-[radial-gradient(ellipse_at_center,rgb(var(--accent-rgb)/0.08),transparent_72%)]" />
    </div>
  );
}
