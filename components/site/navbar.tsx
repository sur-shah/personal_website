'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import { useState } from 'react';

import { GithubMark } from '@/components/site/icons';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-background/85 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6 sm:px-10">
          <a
            href="#top"
            className="focus-ring rounded-md text-sm font-semibold tracking-tight text-foreground"
          >
            Sur Shah
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {siteConfig.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="focus-ring rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon-lg' }),
                'rounded-full',
              )}
            >
              <GithubMark className="size-4" />
            </a>
            <a
              href={siteConfig.resumeUrl}
              download
              className={cn(
                buttonVariants({ size: 'sm' }),
                'h-9 gap-1.5 rounded-full px-4',
              )}
            >
              Résumé
              <Download className="size-3.5" strokeWidth={1.5} />
            </a>
          </div>

          <button
            type="button"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((v) => !v)}
            className="focus-ring flex size-11 items-center justify-center rounded-full text-foreground md:hidden"
          >
            <Menu className="size-4.5" strokeWidth={1.5} />
          </button>
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
              className="focus-ring absolute right-6 top-3 flex size-11 items-center justify-center rounded-full border border-white/10 text-foreground"
            >
              <X className="size-4.5" strokeWidth={1.5} />
            </button>

            {siteConfig.nav.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: 0.1 + i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="focus-ring rounded-md text-3xl font-medium tracking-tight text-foreground"
              >
                {item.label}
              </motion.a>
            ))}

            <motion.a
              href={siteConfig.resumeUrl}
              download
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: 0.1 + siteConfig.nav.length * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="focus-ring mt-4 flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
            >
              Download résumé
              <Download className="size-3.5" strokeWidth={1.5} />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
