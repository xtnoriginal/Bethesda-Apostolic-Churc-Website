import EventsContent from './EventsContent';
import JsonLd from '@/components/JsonLd';
import { events } from '@/data/events';
import { breadcrumbs, collectionPageJsonLd, eventJsonLd } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Events',
  description:
    'Youth, Ruwadzano, Matumba and BMCU conferences at Bethesda Apostolic Church in Harare, Zimbabwe.',
  path: '/events',
});

export default function EventsPage() {
  return (
    <>
      <JsonLd
        data={[
          collectionPageJsonLd({
            name: 'Events at Bethesda Apostolic Church',
            description:
              'Conferences and church gatherings of Bethesda Apostolic Church.',
            path: '/events',
          }),
          breadcrumbs([
            { name: 'Home', path: '/' },
            { name: 'Events', path: '/events' },
          ]),
          ...events.map(eventJsonLd),
        ]}
      />
      <EventsContent />
    </>
  );
}
