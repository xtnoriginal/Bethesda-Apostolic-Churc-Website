import ArchivesContent from './ArchivesContent';
import JsonLd from '@/components/JsonLd';
import { breadcrumbs, collectionPageJsonLd } from '@/lib/jsonld';

export default function ArchivesPage() {
  return (
    <>
      <JsonLd
        data={[
          collectionPageJsonLd({
            name: 'Sermon & Teaching Archives',
            description:
              'Past sermons, teachings and articles from Bethesda Apostolic Church.',
            path: '/archives',
          }),
          breadcrumbs([
            { name: 'Home', path: '/' },
            { name: 'Archives', path: '/archives' },
          ]),
        ]}
      />
      <ArchivesContent />
    </>
  );
}
