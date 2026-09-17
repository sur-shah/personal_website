import { Reveal } from '@/components/site/reveal';

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal>
      <div className="max-w-2xl">
        {eyebrow && (
          <span className="inline-flex items-center rounded-full border border-brand/20 bg-brand/[0.06] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-brand">
            {eyebrow}
          </span>
        )}
        <h2
          className={`text-3xl font-semibold tracking-tight text-foreground sm:text-4xl ${eyebrow ? 'mt-4' : ''}`}
        >
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}
