import { About } from '@/components/site/about';
import { Contact } from '@/components/site/contact';
import { Experience } from '@/components/site/experience';
import { GalaxyBackground } from '@/components/site/galaxy-background';
import { Hero } from '@/components/site/hero';
import { LogoStrip } from '@/components/site/logo-strip';
import { NetworkTransition } from '@/components/site/network-transition';

export default function Home() {
  return (
    <>
      <div className="relative isolate overflow-hidden">
        <GalaxyBackground />
        <div className="relative z-10">
          <Hero />
        </div>
      </div>
      <LogoStrip />
      <NetworkTransition />
      <About />
      <Experience />
      <Contact />
    </>
  );
}
