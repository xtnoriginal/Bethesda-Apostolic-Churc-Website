import type { Metadata } from 'next';
import { siteName } from './site';

export const defaultOgImage = {
  url: '/images/18.jpg',
  width: 2048,
  height: 1153,
  alt: `${siteName} worship service in Harare, Zimbabwe`,
};

type PageMetadataInput = {
  title: string;
  description: string;
  path?: string;
  image?: string | { url: string; width?: number; height?: number; alt?: string };
  type?: 'website' | 'article';
  publishedTime?: string;
  authors?: Metadata['authors'];
  noindex?: boolean;
  follow?: boolean;
  absoluteTitle?: boolean;
};

/**
 * One metadata shape for every public page so canonical, Open Graph and
 * Twitter tags cannot drift from each other.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  type = 'website',
  publishedTime,
  authors,
  noindex = false,
  follow = true,
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const documentTitle = absoluteTitle ? title : `${title} | ${siteName}`;
  const ogImage =
    typeof image === 'string'
      ? { url: image, alt: title }
      : image || defaultOgImage;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: path ? { canonical: path } : undefined,
    ...(noindex ? { robots: { index: false, follow } } : {}),
    openGraph: {
      type,
      siteName,
      locale: 'en_ZW',
      url: path || '/',
      title: documentTitle,
      description,
      images: [ogImage],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: documentTitle,
      description,
      images: [ogImage.url],
    },
    ...(authors ? { authors } : {}),
  };
}
