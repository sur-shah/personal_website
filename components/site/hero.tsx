import { Download } from 'lucide-react';

import { GithubMark } from '@/components/site/icons';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';

export function Hero() {
  return (
    <section
      id="top"
      className="scroll-mt-24 px-6 pb-20 pt-24 sm:px-10 sm:pb-28"
    >
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="text-balance text-6xl font-semibold leading-none tracking-[-0.06em] text-foreground sm:text-8xl lg:text-9xl">
          {siteConfig.name}
        </h1>
        <p className="mt-5 text-xl font-medium tracking-tight text-brand sm:text-2xl">
          {siteConfig.role}
        </p>
        <p className="mt-7 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
          Computer Science at UC San Diego. I build fault-tolerant systems, ML
          pipelines, and full-stack products.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href="#contact"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'h-11 rounded-full px-6',
            )}
          >
            Email me
          </a>
          <a
            href={siteConfig.resumeUrl}
            download
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'h-11 gap-2 rounded-full px-6',
            )}
          >
            Résumé
            <Download className="size-4" strokeWidth={1.5} />
          </a>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'icon-lg' }),
              'size-11 rounded-full',
            )}
          >
            <GithubMark className="size-4.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
