import { GraduationCap } from 'lucide-react';

import { Reveal } from '@/components/site/reveal';
import { SectionHeading } from '@/components/site/section-heading';
import { education, skills } from '@/lib/resume-data';

export function About() {
  return (
    <section id="about" className="px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto w-full max-w-5xl">
        <SectionHeading
          eyebrow="About"
          title="Building reliable systems, end to end."
          description="I'm a Computer Science student at UC San Diego who likes working across the full stack, from fault-tolerant backend runtimes to ML-driven products. I've shipped a checkpointed agent runtime at Attentive, a multi-million-record entity-matching pipeline at E. & J. Gallo, and a nonprofit platform with Triton Software Engineering, plus published sarcasm-detection research at COLING 2025."
        />

        <div className="mt-14 grid gap-12 md:grid-cols-2">
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
                  {education.period} &middot; GPA {education.gpa}
                </p>
                <p className="mt-4 text-sm leading-6 text-muted-foreground/90">
                  {education.coursework.join(', ')}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.18} className="md:border-l md:border-white/8 md:pl-12">
            <div className="divide-y divide-white/8">
              {Object.entries(skills).map(([group, items]) => (
                <div
                  key={group}
                  className="grid gap-1 py-4 first:pt-0 last:pb-0 sm:grid-cols-[9rem_1fr] sm:gap-4"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
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
