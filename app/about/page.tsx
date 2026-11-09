import type { Metadata } from 'next';

import { About } from '@/components/site/about';
import { HeroGreenery } from '@/components/site/hero-greenery';
import { VinylDisc } from '@/components/site/vinyl-disc';
import { VinylRecord } from '@/components/site/vinyl-record';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Sur Shah, a computer science student at UC San Diego with a love of music and space.',
};

export default function AboutPage() {
  return (
    <>
      <div className="vinyl-intro" aria-hidden="true">
        <div className="vinyl-intro__record">
          <VinylDisc />
        </div>
      </div>
      <section
        id="top"
        className="relative isolate overflow-hidden px-6 pb-12 pt-24 sm:px-10 sm:pb-16 sm:pt-32"
      >
        <HeroGreenery />
        <div className="relative mx-auto grid w-full max-w-5xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-xl" data-hero-copy>
            <p className="mb-3 font-mono text-xs font-medium tracking-wide text-brand">
              {siteConfig.location}
            </p>
            <h1 className="text-5xl font-semibold leading-none tracking-[-0.06em] text-foreground sm:text-7xl">
              About me
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              I’m Sur, a computer science student at UC San Diego. I’m
              interested in backend systems, applied machine learning, and
              building software people can rely on.
            </p>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              Outside of software, my two biggest passions are music and space.
              The spinning record and its orbital label are a little nod to
              both.
            </p>
          </div>
          <VinylRecord />
        </div>
      </section>
      <About />
    </>
  );
}
