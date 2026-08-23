import Contact from '@/components/Contact.jsx';
import JsonLd from '@/components/JsonLd';
import { contactPageJsonLd } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Contact Us',
  description:
    'Contact Bethesda Apostolic Church in Harare — Sunday service at 11:00, mid-week prayer, email, and location.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={contactPageJsonLd()} />
      <h1 className="sr-only">Contact Bethesda Apostolic Church</h1>
      <Contact />
    </div>
  );
}
