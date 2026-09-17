export function MapAmbient() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="map-ambient-glow absolute -right-[8%] -top-[28%] h-[130%] w-[75%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(50,145,137,0.16)_0%,rgba(30,86,84,0.07)_42%,transparent_72%)]" />
      <div className="map-ambient-glow-secondary absolute -bottom-[65%] left-[10%] h-[120%] w-[65%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(40,116,113,0.1),transparent_68%)]" />
    </div>
  );
}
