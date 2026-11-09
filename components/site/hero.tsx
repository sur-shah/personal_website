import { buttonVariants } from '@/components/ui/button';
import { HeroGreenery } from '@/components/site/hero-greenery';
import { VinylRecord } from '@/components/site/vinyl-record';
import { siteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh items-center overflow-hidden pb-8 pt-24 sm:pb-16 sm:pt-32"
    >
      <HeroGreenery />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-6 px-6 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="max-w-xl" data-hero-copy>
          <p className="mb-5 font-mono text-xs font-medium tracking-wide text-brand">
            {siteConfig.location}
          </p>
          <h1 className="text-6xl font-semibold leading-none tracking-[-0.06em] text-foreground sm:text-8xl">
            {siteConfig.name}
          </h1>
          <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            I study computer science at UC San Diego and build backend systems
            and reliable AI workflows.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
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
