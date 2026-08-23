import CoursesContent from './CoursesContent';
import JsonLd from '@/components/JsonLd';
import { breadcrumbs, collectionPageJsonLd } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Teaching & Courses',
  description:
    'Free Bible courses and teaching series from Bethesda Apostolic Church in Harare, Zimbabwe.',
  path: '/courses',
});

export default function CoursesPage() {
  return (
    <>
      <JsonLd
        data={[
          collectionPageJsonLd({
            name: 'Teaching & Courses',
            description:
              'Bible courses and teaching series from Bethesda Apostolic Church.',
            path: '/courses',
          }),
          breadcrumbs([
            { name: 'Home', path: '/' },
            { name: 'Courses', path: '/courses' },
          ]),
        ]}
      />
      <CoursesContent />
    </>
  );
}
