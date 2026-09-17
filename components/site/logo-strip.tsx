import { CompanyLogo } from '@/components/site/company-logo';
import { ExperienceMap } from '@/components/site/experience-map';
import { MapAmbient } from '@/components/site/map-ambient';
import { Reveal } from '@/components/site/reveal';
import { experience } from '@/lib/resume-data';

export function LogoStrip() {
  return (
    <section
      aria-label="Organizations"
      className="relative isolate overflow-hidden px-6 py-12 sm:px-10 sm:py-14"
      id="locations"
    >
      <MapAmbient />
      <div className="relative z-10">
        <Reveal>
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div className="flex flex-col gap-7">
              <p className="text-sm text-muted-foreground">Experience across</p>
              <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
                {experience.map((entry) => (
                  <div key={entry.org} title={entry.org}>
                    <CompanyLogo logo={entry.logo} accent={entry.accent} />
                  </div>
                ))}
              </div>
            </div>
            <ExperienceMap />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
