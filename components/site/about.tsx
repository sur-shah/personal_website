import { GraduationCap } from 'lucide-react';

import { Reveal } from '@/components/site/reveal';
import { ScrollWordReveal } from '@/components/site/scroll-word-reveal';
import { education, skills } from '@/lib/resume-data';

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 border-t border-white/8 px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto w-full max-w-5xl">
        <ScrollWordReveal text="I'm a Computer Science student at UC San Diego focused on backend systems, applied machine learning, and full-stack development." />

        <div className="grid gap-12 border-t border-white/8 pt-12 md:grid-cols-2">
          <Reveal delay={0.1}>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-white/8 text-muted-foreground">
                <GraduationCap className="size-4" strokeWidth={1.5} />
              </span>
              <div>
                <p className="font-medium text-foreground">
                  {education.degree}
                </p>
                <p className="text-sm text-muted-foreground">
                  {education.school}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {education.period} / GPA {education.gpa}
                </p>
                <p className="mt-4 text-sm leading-6 text-muted-foreground/90">
                  {education.coursework.join(', ')}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal
            delay={0.18}
            className="md:border-l md:border-white/8 md:pl-12"
          >
            <div className="divide-y divide-white/8">
              {Object.entries(skills).map(([group, items]) => (
                <div
                  key={group}
                  className="grid gap-1 py-4 first:pt-0 last:pb-0 sm:grid-cols-[9rem_1fr] sm:gap-4"
                >
                  <p className="text-sm font-medium text-muted-foreground">
                    {group}
                  </p>
                  <p className="text-sm text-foreground/90">
                    {items.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
