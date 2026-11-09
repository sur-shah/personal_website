import { CompanyLogo } from '@/components/site/company-logo';
import { ExperienceMap } from '@/components/site/experience-map';
import { experience } from '@/lib/resume-data';

export function LogoStrip() {
  return (
    <section
      aria-label="Organizations"
      className="relative isolate overflow-hidden border-y border-border py-12 sm:py-14"
      id="locations"
    >
      <div className="relative mx-auto grid w-full max-w-5xl items-center gap-10 px-6 sm:px-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
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
      </div>
    </section>
  );
}
