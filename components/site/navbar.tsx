'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { GithubMark } from '@/components/site/icons';
import { LocalClock } from '@/components/site/local-clock';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';

const MotionLink = motion.create(Link);

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95">
        <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6 sm:px-10 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          <div className="flex shrink-0 items-center gap-3">
            <Link
              href="/#top"
              onClick={() => setOpen(false)}
              className="focus-ring whitespace-nowrap rounded-md text-sm font-semibold tracking-tight text-foreground"
            >
              Sur Shah
            </Link>
            <span aria-hidden="true" className="h-3 w-px bg-border" />
            <LocalClock />
          </div>

          <div className="hidden items-center gap-1 md:flex">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? 'page' : undefined}
                className="focus-ring rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground aria-[current=page]:text-brand"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 md:justify-self-end">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon-lg' }),
                'hidden rounded-md md:inline-flex',
              )}
            >
              <GithubMark className="size-4" />
            </a>
            <button
              type="button"
              aria-label={
                open ? 'Close navigation menu' : 'Open navigation menu'
              }
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen((v) => !v)}
              className="focus-ring flex size-11 items-center justify-center rounded-full text-foreground md:hidden"
            >
              {open ? (
                <X className="size-4.5" strokeWidth={1.5} />
              ) : (
                <Menu className="size-4.5" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-40 flex overscroll-contain flex-col items-center justify-center gap-8 bg-background md:hidden"
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="focus-ring absolute right-6 top-3 flex size-11 items-center justify-center rounded-full border border-border text-foreground"
            >
              <X className="size-4.5" strokeWidth={1.5} />
            </button>

            {siteConfig.nav.map((item, i) => (
              <MotionLink
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? 'page' : undefined}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: 0.1 + i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="focus-ring rounded-md text-3xl font-medium tracking-tight text-foreground aria-[current=page]:text-brand"
              >
                {item.label}
              </MotionLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
