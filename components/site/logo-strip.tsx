import { CompanyLogo } from '@/components/site/company-logo';
import { ExperienceMap } from '@/components/site/experience-map';
import { LocationsHandoff } from '@/components/site/locations-handoff';
import { experience } from '@/lib/resume-data';

export function LogoStrip() {
  return (
    <section
      aria-label="Organizations"
      className="locations-surface relative isolate overflow-hidden border-b border-border py-12 sm:py-14"
      id="locations"
    >
      <LocationsHandoff>
        <div className="flex flex-col gap-7">
          <h2 className="max-w-xs text-3xl font-semibold tracking-tight sm:text-4xl">
            Where I’ve worked
          </h2>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
            {experience.map((entry) => (
              <div key={entry.org} title={entry.org}>
                <CompanyLogo logo={entry.logo} accent={entry.accent} />
              </div>
            ))}
          </div>
        </div>
        <ExperienceMap />
      </LocationsHandoff>
    </section>
  );
}
