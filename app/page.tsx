import { About } from '@/components/site/about';
import { Contact } from '@/components/site/contact';
import { Experience } from '@/components/site/experience';
import { Hero } from '@/components/site/hero';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Contact />
    </>
  );
}
