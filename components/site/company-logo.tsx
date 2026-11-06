import type {
  CompanyAccent,
  CompanyLogo as CompanyLogoData,
} from '@/lib/resume-data';

// Mono-initial fallback only (unused today, kept for future companies without
// an asset). Image logos render as-is below with no card/ring treatment —
// see the note in that branch for why.
const monoClasses: Record<
  CompanyAccent,
  { bg: string; text: string; ring: string }
> = {
  brand: { bg: 'bg-muted', text: 'text-foreground', ring: 'ring-border' },
  violet: { bg: 'bg-muted', text: 'text-foreground', ring: 'ring-border' },
  wine: { bg: 'bg-muted', text: 'text-foreground', ring: 'ring-border' },
  emerald: { bg: 'bg-muted', text: 'text-foreground', ring: 'ring-border' },
};

export function CompanyLogo({
  logo,
  accent,
}: {
  logo: CompanyLogoData;
  accent: CompanyAccent;
}) {
  if (logo.type === 'image') {
    // No card, no background chip, no per-company ring color: each asset is
    // already a finished mark (TSE's SVG is white-on-transparent for this
    // dark page; the others are opaque brand-color lockups). Wrapping them
    // in a colored ring/box just adds a decorative multi-hue "confetti"
    // treatment the page doesn't need elsewhere — a fixed height with
    // object-contain is enough to keep every logo visually level in a row.
    return (
      // eslint-disable-next-line @next/next/no-img-element -- small static brand mark, not worth next/image's optimizer on this Workers deploy target
      <img
        src={logo.src}
        alt={logo.alt}
        width={44}
        height={44}
        loading="lazy"
        className={`size-11 shrink-0 rounded-xl object-contain ${logo.src === '/logos/tse.svg' ? 'invert dark:invert-0' : ''}`}
      />
    );
  }

  const c = monoClasses[accent];
  return (
    <span
      className={`flex size-11 shrink-0 items-center justify-center rounded-xl ring-1 ${c.bg} ${c.ring}`}
    >
      <span className={`text-sm font-semibold ${c.text}`}>{logo.initials}</span>
    </span>
  );
}
