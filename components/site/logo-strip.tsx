import { CompanyLogo } from '@/components/site/company-logo';
import { Reveal } from '@/components/site/reveal';
import { experience } from '@/lib/resume-data';

export function LogoStrip() {
  return (
    <section className="border-t border-white/8 px-6 py-12 sm:px-10">
      <Reveal>
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Where I&apos;ve built things
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {experience.map((entry) => (
              <div key={entry.org} className="flex items-center gap-3">
                <CompanyLogo logo={entry.logo} accent={entry.accent} />
                <span className="text-sm font-medium text-foreground/70">
                  {entry.org}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
