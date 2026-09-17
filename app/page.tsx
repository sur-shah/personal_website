import { About } from '@/components/site/about';
import { Contact } from '@/components/site/contact';
import { Experience } from '@/components/site/experience';
import { FlowField } from '@/components/site/flow-field';
import { Hero } from '@/components/site/hero';
import { LogoStrip } from '@/components/site/logo-strip';
import { NetworkTransition } from '@/components/site/network-transition';

export default function Home() {
  return (
    <>
      <div className="relative isolate overflow-hidden">
        <FlowField />
        <div className="relative z-10">
          <Hero />
          <LogoStrip />
        </div>
      </div>
      <NetworkTransition />
      <About />
      <Experience />
      <Contact />
    </>
  );
}
