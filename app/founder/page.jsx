import FounderContent from './FounderContent';
import JsonLd from '@/components/JsonLd';
import { breadcrumbs, founderId, churchId } from '@/lib/jsonld';
import { absoluteUrl } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Our Founder',
  description:
    "Arch Bishop Loveless Manhango — founder of Bethesda Apostolic Church. The 1952 calling, the fourteen visions that form our Statement of Faith, and his missionary journeys.",
  path: '/founder',
});

export default function FounderPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'ProfilePage',
            name: 'Arch Bishop Loveless Manhango',
            url: absoluteUrl('/founder'),
            mainEntity: { '@id': founderId },
            about: { '@id': churchId },
          },
          breadcrumbs([
            { name: 'Home', path: '/' },
            { name: 'Our Founder', path: '/founder' },
          ]),
        ]}
      />
      <FounderContent />
    </>
  );
}
