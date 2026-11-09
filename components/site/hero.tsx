import { buttonVariants } from '@/components/ui/button';
import { HeroGreenery } from '@/components/site/hero-greenery';
import { VinylRecord } from '@/components/site/vinyl-record';
import { siteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden px-6 pb-10 pt-24 sm:px-10 sm:pb-12 sm:pt-28"
    >
      <HeroGreenery />
      <div className="relative mx-auto grid w-full max-w-5xl items-center gap-7 md:grid-cols-[1.15fr_0.85fr]">
        <div className="max-w-xl" data-hero-copy>
          <p className="mb-3 font-mono text-xs font-medium tracking-wide text-brand">
            {siteConfig.location}
          </p>
          <h1 className="text-5xl font-semibold leading-none tracking-[-0.06em] text-foreground sm:text-7xl">
            {siteConfig.name}
          </h1>
          <p className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {siteConfig.role}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${siteConfig.email}`}
              className={cn(
                buttonVariants({ size: 'lg' }),
                'h-11 rounded-full px-5',
              )}
            >
              Email
            </a>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'h-11 rounded-full px-5',
              )}
            >
              GitHub
            </a>
          </div>
        </div>
        <VinylRecord />
      </div>
    </section>
  );
}
