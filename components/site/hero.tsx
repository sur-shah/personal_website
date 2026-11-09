import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';

export function Hero() {
  return (
    <section
      id="top"
      className="flex min-h-[min(80svh,52rem)] items-center pb-16 pt-32 sm:pb-20 sm:pt-36"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">
        <div className="max-w-xl">
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
      </div>
    </section>
  );
}
