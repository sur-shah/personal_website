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
          <span className="text-sm font-medium text-brand">{eyebrow}</span>
        )}
        <h2
          className={`text-balance text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-5xl ${eyebrow ? 'mt-4' : ''}`}
        >
          {title}
        </h2>
        {description && (
          <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}
