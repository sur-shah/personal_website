import { About } from '@/components/site/about';
import { Contact } from '@/components/site/contact';
import { Experience } from '@/components/site/experience';
import { Hero } from '@/components/site/hero';
import { LogoStrip } from '@/components/site/logo-strip';

export default function Home() {
  return (
    <>
      <Hero />
      <LogoStrip />
      <About />
      <Experience />
      <Contact />
    </>
  );
}
