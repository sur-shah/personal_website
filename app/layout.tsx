import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Geist_Mono } from 'next/font/google';
import './globals.css';

import { Footer } from '@/components/site/footer';
import { Navbar } from '@/components/site/navbar';
import { VinylDisc } from '@/components/site/vinyl-disc';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Sur Shah · Software Engineer',
    template: '%s | Sur Shah',
  },
  description:
    'Sur Shah is a software engineer studying Computer Science at UC San Diego, building fault-tolerant systems and ML-driven products.',
};

export const viewport: Viewport = { colorScheme: 'light' };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        <div className="vinyl-intro" aria-hidden="true">
          <div className="vinyl-intro__record">
            <VinylDisc />
          </div>
        </div>
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform duration-200 focus-visible:translate-y-0"
        >
          Skip to content
        </a>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
