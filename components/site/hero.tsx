import { Download } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { GithubMark } from '@/components/site/icons';
import { Reveal } from '@/components/site/reveal';
import { siteConfig } from '@/lib/site-config';

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] flex-col justify-center px-6 pb-24 pt-32 sm:px-10"
    >
      <div className="mx-auto w-full max-w-3xl">
        <Reveal>
          <span className="inline-flex items-center rounded-full border border-brand/20 bg-brand/[0.06] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-brand">
            UC San Diego &middot; Computer Science
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-foreground sm:text-7xl">
            {siteConfig.name}
          </h1>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="text-gradient-brand mt-3 text-xl font-medium sm:text-2xl">
            {siteConfig.role}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            I build fault-tolerant systems, ML-driven products, and
            full-stack applications. Recent work spans agent runtimes at
            Attentive, entity-matching pipelines at E. &amp; J. Gallo, and
            nonprofit platforms with Triton Software Engineering.
          </p>
        </Reveal>

        <Reveal delay={0.28}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              className="rounded-full px-6"
              render={<a href="#contact" />}
            >
              Get in touch
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 rounded-full px-6"
              render={<a href={siteConfig.resumeUrl} download />}
            >
              Résumé
              <Download className="size-4" strokeWidth={1.5} />
            </Button>
            <Button
              variant="ghost"
              size="icon-lg"
              className="rounded-full"
              render={
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                />
              }
            >
              <GithubMark className="size-4.5" />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
