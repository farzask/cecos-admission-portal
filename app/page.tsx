import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { FindMyProgram } from '@/components/FindMyProgram';
import { Stats } from '@/components/Stats';
import { Programs } from '@/components/Programs';
import { Scholarships } from '@/components/Scholarships';
import { Testimonials } from '@/components/Testimonials';
import { Faqs } from '@/components/Faqs';
import { FinalCTA } from '@/components/FinalCTA';

export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <FindMyProgram />
      <Stats />
      <Programs />
      <Scholarships />
      <Testimonials />
      <Faqs />
      <FinalCTA />
    </main>
  );
}
