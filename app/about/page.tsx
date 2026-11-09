import type { Metadata } from 'next';

import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'About',
  description:
    'A little about Sur Shah, a computer science student at UC San Diego who loves music and space.',
};

export default function AboutPage() {
  return (
    <section
      aria-labelledby="about-heading"
      className="px-6 pb-16 pt-28 sm:px-10 sm:pb-24 sm:pt-36"
    >
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 font-mono text-xs text-brand">
          {siteConfig.location}
        </p>
        <h1
          id="about-heading"
          className="text-5xl font-semibold tracking-tight sm:text-6xl"
        >
          About me
        </h1>
        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          I’m Sur, a computer science student at UC San Diego. I build backend
          systems and reliable AI workflows.
        </p>
        <section
          aria-labelledby="interests-heading"
          className="mt-10 border-t border-border pt-7"
        >
          <h2
            id="interests-heading"
            className="text-2xl font-semibold tracking-tight"
          >
            Outside of work
          </h2>
          <p className="mt-3 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Music and space are my two biggest passions. That’s where the vinyl
            record and its orbital label on my homepage came from.
          </p>
        </section>
      </div>
    </section>
  );
}
