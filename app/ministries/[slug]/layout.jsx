import { getMinistryBySlug } from '@/data/ministries';
import JsonLd from '@/components/JsonLd';
import { breadcrumbs } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const ministry = getMinistryBySlug(slug);

  if (!ministry) return { title: 'Ministry' };

  return pageMetadata({
    title: ministry.name,
    description: `${ministry.name} — ${ministry.tagline} A ministry of Bethesda Apostolic Church, Harare.`,
    path: `/ministries/${ministry.slug}`,
    image: ministry.image,
    noindex: Boolean(ministry.isDraft),
  });
}

export default async function MinistryLayout({ children, params }) {
  const { slug } = await params;
  const ministry = getMinistryBySlug(slug);

  return (
    <>
      {ministry && !ministry.isDraft && (
        <JsonLd
          data={breadcrumbs([
            { name: 'Home', path: '/' },
            { name: ministry.name, path: `/ministries/${ministry.slug}` },
          ])}
        />
      )}
      {children}
    </>
  );
}
