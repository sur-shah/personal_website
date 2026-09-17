import { CompanyLogo } from '@/components/site/company-logo';
import { Reveal } from '@/components/site/reveal';
import { experience } from '@/lib/resume-data';

export function LogoStrip() {
  return (
    <section
      aria-label="Organizations"
      className="border-t border-white/8 bg-background/30 px-6 py-10 backdrop-blur-[2px] sm:px-10"
    >
      <Reveal>
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-7">
          <p className="text-sm text-muted-foreground">Experience across</p>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
            {experience.map((entry) => (
              <div key={entry.org} title={entry.org}>
                <CompanyLogo logo={entry.logo} accent={entry.accent} />
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
