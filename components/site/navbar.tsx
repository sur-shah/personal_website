'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { GithubMark } from '@/components/site/icons';
import { siteConfig } from '@/lib/site-config';

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-6">
        <nav className="glass-panel flex w-full max-w-xl items-center justify-between gap-2 rounded-full px-3 py-2 sm:gap-4 sm:px-4">
          <a
            href="#top"
            className="rounded-full px-2 text-sm font-medium tracking-tight text-foreground"
          >
            Sur Shah
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {siteConfig.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors duration-300 hover:bg-white/5 hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <Button
              variant="ghost"
              size="icon-lg"
              className="rounded-full"
              render={
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                />
              }
            >
              <GithubMark className="size-4" />
            </Button>
            <Button
              size="sm"
              className="gap-1.5 rounded-full"
              render={<a href={siteConfig.resumeUrl} download />}
            >
              Résumé
              <Download className="size-3.5" strokeWidth={1.5} />
            </Button>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex size-11 items-center justify-center rounded-full text-foreground md:hidden"
          >
            <Menu className="size-4.5" strokeWidth={1.5} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-black/85 backdrop-blur-2xl md:hidden"
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute right-6 top-6 flex size-11 items-center justify-center rounded-full border border-white/10 text-foreground"
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
                  duration: 0.5,
                  delay: 0.1 + i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-3xl font-medium tracking-tight text-foreground"
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
                duration: 0.5,
                delay: 0.1 + siteConfig.nav.length * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-4 flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
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
