import type { Metadata } from 'next';

import { About } from '@/components/site/about';
import { aboutContent } from '@/lib/about-content';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Sur Shah, a computer science student at UC San Diego with a love of music and space.',
};

export default function AboutPage() {
  return (
    <>
      <section id="top" className="px-6 pb-12 pt-24 sm:px-10 sm:pb-16 sm:pt-32">
        <div className="mx-auto w-full max-w-5xl">
          <div className="max-w-2xl">
            <p className="mb-3 font-mono text-xs font-medium tracking-wide text-brand">
              {siteConfig.location}
            </p>
            <h1 className="text-5xl font-semibold leading-none tracking-[-0.06em] text-foreground sm:text-7xl">
              About me
            </h1>
            <div className="mt-5 space-y-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              {aboutContent.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <section
              aria-labelledby="hobbies-title"
              className="mt-9 border-t border-border pt-7"
            >
              <h2
                id="hobbies-title"
                className="text-2xl font-semibold tracking-tight"
              >
                Outside of work
              </h2>
              <div className="mt-3 space-y-4 text-pretty leading-relaxed text-muted-foreground">
                {aboutContent.hobbies.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
      <About />
    </>
  );
}
