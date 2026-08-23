import {
  absoluteUrl,
  church,
  serviceTimes,
  siteDescription,
  siteName,
  siteUrl,
} from './site';

export const churchId = `${siteUrl}/#church`;
export const websiteId = `${siteUrl}/#website`;
export const founderId = `${siteUrl}/founder#person`;

export function churchGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Church',
        '@id': churchId,
        name: church.name,
        alternateName: 'Bethesda',
        description: siteDescription,
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: absoluteUrl(church.logo),
        },
        image: absoluteUrl('/images/18.jpg'),
        email: church.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: church.address.streetAddress,
          addressLocality: church.address.addressLocality,
          addressCountry: church.address.addressCountry,
        },
        areaServed: {
          '@type': 'City',
          name: 'Harare',
          containedInPlace: {
            '@type': 'Country',
            name: 'Zimbabwe',
          },
        },
        hasMap: church.hasMap,
        identifier: {
          '@type': 'PropertyValue',
          name: 'Plus Code',
          value: church.address.streetAddress,
        },
        founder: { '@id': founderId },
        sameAs: church.sameAs,
        isAccessibleForFree: true,
        openingHoursSpecification: serviceTimes.map((s) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: `https://schema.org/${s.day}`,
          opens: s.opens,
          closes: s.closes,
          name: s.name,
        })),
        contactPoint: {
          '@type': 'ContactPoint',
          email: church.email,
          contactType: 'general enquiries',
          availableLanguage: ['en'],
          areaServed: 'ZW',
        },
      },
      {
        '@type': 'Person',
        '@id': founderId,
        name: church.founder,
        jobTitle: 'Founder and Arch Bishop',
        url: absoluteUrl('/founder'),
        affiliation: { '@id': churchId },
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: siteName,
        url: siteUrl,
        publisher: { '@id': churchId },
        inLanguage: 'en-ZW',
      },
    ],
  };
}

export function breadcrumbs(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function aboutPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About ${siteName}`,
    description:
      'Beliefs, vision and values of Bethesda Apostolic Church in Harare, Zimbabwe.',
    url: absoluteUrl('/about'),
    isPartOf: { '@id': websiteId },
    about: { '@id': churchId },
    breadcrumb: breadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
    ]),
  };
}

export function contactPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Contact ${siteName}`,
    description:
      'Service times, email and location for Bethesda Apostolic Church in Harare.',
    url: absoluteUrl('/contact'),
    isPartOf: { '@id': websiteId },
    mainEntity: { '@id': churchId },
    breadcrumb: breadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ]),
  };
}

export function articleJsonLd(item) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: item.title,
    description: item.description,
    image: item.image ? absoluteUrl(item.image) : undefined,
    datePublished: item.date,
    author: { '@id': churchId },
    publisher: { '@id': churchId },
    mainEntityOfPage: absoluteUrl(`/archives/${item.slug}`),
    inLanguage: 'en',
    articleSection: item.type,
  };
}

export function courseJsonLd(course) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    provider: { '@id': churchId },
    url: absoluteUrl(`/courses/${course.slug}`),
    image: course.image ? absoluteUrl(course.image) : undefined,
    inLanguage: 'en',
    isAccessibleForFree: true,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
    },
  };
}

export function eventJsonLd(event) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    image: event.images?.[0] ? absoluteUrl(event.images[0]) : undefined,
    location: {
      '@type': 'Place',
      name: event.location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: event.location,
        addressCountry: 'ZW',
      },
    },
    organizer: { '@id': churchId },
    performer: { '@id': churchId },
  };
}

export function collectionPageJsonLd({ name, description, path }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { '@id': websiteId },
    about: { '@id': churchId },
  };
}
