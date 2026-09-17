import { ArrowUpRight, Mail } from 'lucide-react';

import { GithubMark, LinkedinMark } from '@/components/site/icons';
import { Reveal } from '@/components/site/reveal';
import { SectionHeading } from '@/components/site/section-heading';
import { siteConfig } from '@/lib/site-config';

const links = [
  {
    label: 'Email',
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
  },
  {
    label: 'GitHub',
    value: 'Repositories',
    href: siteConfig.github,
    icon: GithubMark,
  },
  {
    label: 'LinkedIn',
    value: 'Profile',
    href: siteConfig.linkedin,
    icon: LinkedinMark,
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-white/8 px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto w-full max-w-4xl">
        <SectionHeading
          title="Get in touch"
          description="I'm open to software engineering opportunities and conversations about backend systems, applied ML, and full-stack development."
        />

        <Reveal delay={0.1}>
          <a
            href={`mailto:${siteConfig.email}`}
            className="focus-ring group mt-10 inline-flex rounded-md text-3xl font-medium tracking-tight text-foreground transition-colors duration-200 hover:text-brand sm:text-4xl"
          >
            {siteConfig.email}
            <ArrowUpRight
              className="size-6 text-muted-foreground transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand"
              strokeWidth={1.5}
            />
          </a>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-14 divide-y divide-white/8 border-t border-white/8">
            {links.map(({ label, value, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                className="focus-ring group flex items-center justify-between gap-4 rounded-sm py-4"
              >
                <span className="flex items-center gap-3">
                  <Icon
                    className="size-4 text-muted-foreground"
                    strokeWidth={1.5}
                  />
                  <span className="text-sm font-medium text-foreground">
                    {label}
                  </span>
                </span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                  {value}
                  <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
                </span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
