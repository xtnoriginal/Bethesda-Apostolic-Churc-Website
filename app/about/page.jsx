import About from '@/components/About.jsx';
import WingsSection from '@/components/WingsSection.jsx';
import JsonLd from '@/components/JsonLd';
import { aboutPageJsonLd } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'About Us',
  description:
    'About Bethesda Apostolic Church in Harare, Zimbabwe — our beliefs, vision, values, and church ministries.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={aboutPageJsonLd()} />
      <h1 className="sr-only">About Bethesda Apostolic Church</h1>
      <About />
      <WingsSection />
    </div>
  );
}
