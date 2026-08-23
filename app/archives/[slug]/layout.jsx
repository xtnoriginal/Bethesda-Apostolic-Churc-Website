import { archiveItems } from '@/data/archives';
import JsonLd from '@/components/JsonLd';
import { articleJsonLd, breadcrumbs } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = archiveItems.find((a) => a.slug === slug);

  if (!item) return { title: 'Archive' };

  return pageMetadata({
    title: item.title,
    description: item.description,
    path: `/archives/${item.slug}`,
    image: item.image,
    type: 'article',
    publishedTime: item.date,
    noindex: Boolean(item.isDraft),
  });
}

export default async function ArchiveDetailLayout({ children, params }) {
  const { slug } = await params;
  const item = archiveItems.find((a) => a.slug === slug);

  return (
    <>
      {item && !item.isDraft && (
        <JsonLd
          data={[
            articleJsonLd(item),
            breadcrumbs([
              { name: 'Home', path: '/' },
              { name: 'Archives', path: '/archives' },
              { name: item.title, path: `/archives/${item.slug}` },
            ]),
          ]}
        />
      )}
      {children}
    </>
  );
}
