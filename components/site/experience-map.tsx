import usa from '@svg-maps/usa';

const locations = [
  { name: 'Modesto', x: 340, y: 270, labelX: 14, labelY: -10 },
  { name: 'San Diego', x: 375, y: 370, labelX: 14, labelY: 18 },
  {
    name: 'New York',
    x: 1138,
    y: 210,
    labelX: -18,
    labelY: -12,
    anchor: 'end',
  },
] as const;

const highlightedStates = new Set(['ca', 'ny']);
const insetStates = new Set(['ak', 'hi']);

type MapState = {
  id: string;
  path: string;
};

export function ExperienceMap() {
  return (
    <figure className="w-full">
      <svg
        aria-labelledby="experience-map-title experience-map-description"
        className="h-auto w-full overflow-visible"
        viewBox="192 9 1028 575"
      >
        <title id="experience-map-title">
          Experience locations across the United States
        </title>
        <desc id="experience-map-description">
          Modesto and San Diego, California, and New York, New York.
        </desc>

        <g>
          {usa.locations
            .filter((state: MapState) => !insetStates.has(state.id))
            .map((state: MapState) => {
              const isHighlighted = highlightedStates.has(state.id);

              return (
                <path
                  className={
                    isHighlighted
                      ? 'fill-brand/8 stroke-brand/45'
                      : 'fill-white/[0.018] stroke-white/12'
                  }
                  d={state.path}
                  key={state.id}
                  strokeWidth={1.35}
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
        </g>

        {locations.map((location, index) => (
          <g key={location.name}>
            <circle
              className="map-pin-pulse fill-none stroke-brand/60"
              cx={location.x}
              cy={location.y}
              r="13"
              style={{ animationDelay: `${index * 0.55}s` }}
            />
            <circle
              className="fill-brand"
              cx={location.x}
              cy={location.y}
              r="4.5"
            />
            <circle
              className="fill-brand/20"
              cx={location.x}
              cy={location.y}
              r="8"
            />
            <text
              className="fill-white/75 text-[24px] font-medium tracking-[-0.01em]"
              dominantBaseline="middle"
              textAnchor={'anchor' in location ? location.anchor : 'start'}
              x={location.x + location.labelX}
              y={location.y + location.labelY}
            >
              {location.name}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}
