'use client';

import usa from '@svg-maps/usa';
import { X } from 'lucide-react';
import { useEffect, useRef, useState, type CSSProperties } from 'react';

import { CompanyLogo } from '@/components/site/company-logo';
import { experience } from '@/lib/resume-data';

const locations = [
  {
    name: 'Modesto',
    x: 340,
    y: 270,
    labelX: 14,
    labelY: -10,
    state: 'ca',
    companies: ['E. & J. Gallo', 'Algoverse'],
    side: 'right',
  },
  {
    name: 'San Diego',
    x: 375,
    y: 370,
    labelX: 14,
    labelY: 18,
    state: 'ca',
    companies: ['Triton Software Engineering'],
    side: 'right',
  },
  {
    name: 'New York',
    x: 1138,
    y: 210,
    labelX: -18,
    labelY: -12,
    anchor: 'end',
    state: 'ny',
    companies: ['Attentive'],
    side: 'left',
  },
] as const;

const highlightedStates = new Set(['ca', 'ny']);
const insetStates = new Set(['ak', 'hi']);
const viewBox = { x: 192, y: 9, width: 1028, height: 575 };

type MapState = { id: string; name: string; path: string };
type Location = (typeof locations)[number];

function pinPosition(location: Location) {
  return {
    left: `${((location.x - viewBox.x) / viewBox.width) * 100}%`,
    top: `${((location.y - viewBox.y) / viewBox.height) * 100}%`,
  };
}

export function ExperienceMap() {
  const [activeCity, setActiveCity] = useState<Location['name'] | null>(null);
  const mapRef = useRef<HTMLElement>(null);
  const activeLocation = locations.find(
    (location) => location.name === activeCity,
  );

  useEffect(() => {
    if (!activeCity) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!mapRef.current?.contains(event.target as Node)) setActiveCity(null);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveCity(null);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeCity]);

  return (
    <figure className="relative w-full" ref={mapRef}>
      <div className="relative w-full">
        <svg
          aria-labelledby="experience-map-title experience-map-description"
          className="h-auto w-full"
          viewBox="192 9 1028 575"
        >
          <title id="experience-map-title">
            Experience locations across the United States
          </title>
          <desc id="experience-map-description">
            Hover over a state to light it up. Select Modesto, San Diego, or New
            York to see companies.
          </desc>

          <g>
            {usa.locations
              .filter((state: MapState) => !insetStates.has(state.id))
              .map((state: MapState) => (
                <path
                  className="experience-map-state"
                  d={state.path}
                  data-featured={highlightedStates.has(state.id)}
                  data-lit={activeLocation?.state === state.id}
                  key={state.id}
                  strokeWidth={1.35}
                  vectorEffect="non-scaling-stroke"
                >
                  <title>{state.name}</title>
                </path>
              ))}
          </g>

          {locations.map((location, index) => (
            <g aria-hidden="true" key={location.name}>
              <circle
                className="map-pin-pulse fill-none stroke-brand/60"
                cx={location.x}
                cy={location.y}
                r="13"
                style={{ animationDelay: `${index * 0.55}s` }}
              />
              <circle
                className="fill-brand/20"
                cx={location.x}
                cy={location.y}
                r="8"
              />
              <circle
                className="fill-brand"
                cx={location.x}
                cy={location.y}
                r="4.5"
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

        {locations.map((location) => (
          <button
            aria-controls={
              activeCity === location.name ? 'experience-map-detail' : undefined
            }
            aria-expanded={activeCity === location.name}
            aria-label={`Show experience in ${location.name}`}
            className="experience-map-pin focus-ring absolute z-10 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
            key={location.name}
            onClick={() =>
              setActiveCity((current) =>
                current === location.name ? null : location.name,
              )
            }
            style={pinPosition(location)}
            type="button"
          />
        ))}
      </div>

      {activeLocation && (
        <section
          aria-label={`${activeLocation.name} experience`}
          className="experience-map-detail relative z-20 mt-4 w-full rounded-xl border border-brand/35 bg-[#10191b] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.35)] sm:mt-0 sm:w-64"
          data-side={activeLocation.side}
          id="experience-map-detail"
          style={
            {
              '--pin-left': pinPosition(activeLocation).left,
              '--pin-top': pinPosition(activeLocation).top,
            } as CSSProperties
          }
        >
          <div className="mb-3 flex items-start justify-between gap-3">
            <p className="text-sm font-medium text-foreground">
              {activeLocation.name}
            </p>
            <button
              aria-label="Close location details"
              className="focus-ring -mr-1 -mt-1 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setActiveCity(null)}
              type="button"
            >
              <X aria-hidden="true" size={16} strokeWidth={1.75} />
            </button>
          </div>
          <div className="space-y-3">
            {activeLocation.companies.map((name) => {
              const company = experience.find((entry) => entry.org === name);
              if (!company) return null;

              return (
                <div className="flex items-center gap-3" key={company.org}>
                  <CompanyLogo logo={company.logo} accent={company.accent} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-tight text-foreground">
                      {company.org}
                    </p>
                    <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
                      {company.role}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </figure>
  );
}
