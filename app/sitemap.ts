import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site';
import { archiveItems } from '@/data/archives';
import { courses } from '@/data/courses';
import { ministries } from '@/data/ministries';

type Entry = MetadataRoute.Sitemap[number];

const page = (
  path: string,
  priority: number,
  changeFrequency: Entry['changeFrequency'],
  lastModified: Date = new Date(),
  images?: string[],
): Entry => ({
  url: absoluteUrl(path),
  lastModified,
  changeFrequency,
  priority,
  ...(images?.length
    ? { images: images.map((src) => (src.startsWith('http') ? src : absoluteUrl(src))) }
    : {}),
});

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: Entry[] = [
    page('/', 1.0, 'weekly', undefined, ['/images/18.jpg']),
    page('/about', 0.8, 'monthly'),
    page('/founder', 0.8, 'yearly'),
    page('/events', 0.9, 'weekly'),
    page('/archives', 0.7, 'weekly'),
    page('/courses', 0.8, 'weekly'),
    page('/contact', 0.7, 'yearly'),
    page('/projects', 0.6, 'monthly'),
    page('/donations', 0.6, 'monthly'),
    page('/ministries/sunday-school', 0.6, 'monthly', undefined, ['/images/50.jpg']),
  ];

  const archives: Entry[] = archiveItems
    .filter((item: { isDraft?: boolean }) => !item.isDraft)
    .map((item: { slug: string; date?: string; image?: string }) =>
      page(
        `/archives/${item.slug}`,
        0.6,
        'yearly',
        item.date ? new Date(item.date) : new Date(),
        item.image ? [item.image] : undefined,
      ),
    );

  const coursePages: Entry[] = courses.map((course: { slug: string; image?: string }) =>
    page(`/courses/${course.slug}`, 0.7, 'monthly', undefined, course.image ? [course.image] : undefined),
  );

  const ministryPages: Entry[] = ministries
    .filter((m: { isDraft?: boolean; slug?: string }) => !m.isDraft && m.slug !== 'sunday-school')
    .map((m: { slug: string; image?: string }) =>
      page(`/ministries/${m.slug}`, 0.6, 'monthly', undefined, m.image ? [m.image] : undefined),
    );

  return [...staticPages, ...archives, ...coursePages, ...ministryPages];
}
