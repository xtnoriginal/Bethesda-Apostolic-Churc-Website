import type { Metadata } from 'next';

import Hero from '@/components/Hero.jsx';
import About from '@/components/About.jsx';
import FounderTeaser from '@/components/FounderTeaser.jsx';
import Neniwo from '@/components/Neniwo.jsx';
import Baccet from '@/components/Baccet.jsx';
import Sermons from '@/components/Sermons.jsx';
import Events from '@/components/Events.jsx';
import Contact from '@/components/Contact.jsx';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Bethesda Apostolic Church | Harare, Zimbabwe',
  description:
    'Bethesda Apostolic Church in Harare, Zimbabwe. Sunday School from 10:00, ' +
    'main service at 11:00, mid-week prayer on Wednesdays and Fridays, sermons, ' +
    'conferences and Bible courses.',
  path: '/',
  absoluteTitle: true,
});

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <About />
      <FounderTeaser />
      <Sermons />
      <Events />
      <Neniwo />
      <Baccet />
      <Contact />
    </div>
  );
}
