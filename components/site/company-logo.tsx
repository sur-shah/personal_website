import type { CompanyAccent, CompanyLogo as CompanyLogoData } from '@/lib/resume-data';

const accentClasses: Record<CompanyAccent, { bg: string; text: string; ring: string }> = {
  brand: { bg: 'bg-white', text: 'text-foreground', ring: 'ring-brand/25' },
  violet: {
    bg: 'bg-brand-violet/10',
    text: 'text-brand-violet',
    ring: 'ring-brand-violet/20',
  },
  wine: {
    bg: 'bg-wine-accent/10',
    text: 'text-wine-accent',
    ring: 'ring-wine-accent/20',
  },
  emerald: {
    bg: 'bg-emerald-accent/10',
    text: 'text-emerald-accent',
    ring: 'ring-emerald-accent/20',
  },
};

export function CompanyLogo({
  logo,
  accent,
}: {
  logo: CompanyLogoData;
  accent: CompanyAccent;
}) {
  if (logo.type === 'image') {
    return (
      <span className="flex size-11 shrink-0 overflow-hidden rounded-xl ring-1 ring-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element -- small static brand mark, not worth next/image's optimizer on this Workers deploy target */}
        <img
          src={logo.src}
          alt={logo.alt}
          className="size-full object-cover"
        />
      </span>
    );
  }

  const c = accentClasses[accent];
  return (
    <span
      className={`flex size-11 shrink-0 items-center justify-center rounded-xl ring-1 ${c.bg} ${c.ring}`}
    >
      <span className={`text-sm font-semibold ${c.text}`}>{logo.initials}</span>
    </span>
  );
}
