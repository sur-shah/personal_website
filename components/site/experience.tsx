import { CompanyLogo } from '@/components/site/company-logo';
import { Reveal } from '@/components/site/reveal';
import { SectionHeading } from '@/components/site/section-heading';
import { experience, leadership } from '@/lib/resume-data';

export function Experience() {
  return (
    <section
      id="experience"
      className="scroll-mt-20 border-t border-white/8 px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto w-full max-w-4xl">
        <SectionHeading title="Experience" />

        <div className="mt-14 divide-y divide-white/8 border-t border-white/8">
          {experience.map((entry, i) => (
            <Reveal key={entry.org} delay={i * 0.06}>
              <div className="grid gap-4 py-8 sm:grid-cols-[9rem_1fr] sm:gap-8">
                <p className="text-sm text-muted-foreground">{entry.period}</p>
                <div className="flex gap-4">
                  <CompanyLogo logo={entry.logo} accent={entry.accent} />
                  <div>
                    <h3 className="text-lg font-medium text-foreground">
                      {entry.role}
                    </h3>
                    <p className="text-sm text-muted-foreground">{entry.org}</p>
                    <ul className="mt-4 space-y-2">
                      {entry.highlights.map((point) => (
                        <li
                          key={point}
                          className="border-l border-brand/50 pl-4 text-sm leading-6 text-foreground/80"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal delay={experience.length * 0.06}>
            <div className="grid gap-4 py-8 sm:grid-cols-[9rem_1fr] sm:gap-8">
              <p className="text-sm text-muted-foreground">
                {leadership.period}
              </p>
              <div className="flex gap-4">
                <CompanyLogo
                  logo={leadership.logo}
                  accent={leadership.accent}
                />
                <div>
                  <h3 className="text-lg font-medium text-foreground">
                    {leadership.role}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {leadership.org}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-foreground/80">
                    {leadership.highlight}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
