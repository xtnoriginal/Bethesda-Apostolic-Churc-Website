// Single source of truth for everything search engines read: page metadata,
// sitemap.ts, robots.ts, manifest.ts and the Church structured data.
//
// Set SITE_URL to the real production origin before going live. Canonical
// URLs, Open Graph tags and the sitemap are all absolute URLs built from it,
// and search engines will index whatever it says.
//
// IMPORTANT: set this at BUILD time. robots.txt and sitemap.xml are
// prerendered as static routes, so they capture whatever SITE_URL held during
// `npm run build` — changing it only on the running server has no effect.
//
// SITE_URL rather than NEXT_PUBLIC_SITE_URL because every consumer is
// server-side; there is no reason to ship the origin into the client bundle.

export const siteUrl = (
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'http://localhost:3000'
).replace(/\/$/, '');

export const siteName = 'Bethesda Apostolic Church';

export const siteDescription =
  'Bethesda Apostolic Church in Harare, Zimbabwe — Sunday services, sermons, ' +
  'conferences, Bible courses, and the Neniwo building and BACCET education projects.';

export const church = {
  name: siteName,
  email: 'bethesdaapostolicchurch@gmail.com',
  logo: '/logo.png',
  // Plus Code for the Harare property. No street address appears anywhere in
  // the site content, so this is what we can honestly assert.
  address: {
    streetAddress: '5WHM+93M',
    addressLocality: 'Harare',
    addressCountry: 'ZW',
  },
  founder: 'Arch Bishop Loveless Manhango',
  sameAs: [
    'https://www.facebook.com/share/g/1MUa4mMqrp/',
    'https://www.youtube.com/@bethesdaapostolicchurch4090',
    'https://whatsapp.com/channel/0029VbAOqKW3wtbIHDTjK41T',
  ],
  hasMap:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('5WHM+93M, Harare, Zimbabwe'),
};

// schema.org OpeningHoursSpecification wants 24-hour HH:MM.
// Sunday opens at 10:00 for Sunday School and Ruwadzano; the main service
// runs 11:00-13:00.
export const serviceTimes = [
  { day: 'Sunday', opens: '10:00', closes: '13:00', name: 'Sunday Service' },
  { day: 'Wednesday', opens: '18:00', closes: '19:30', name: 'Mid-week Prayer' },
  { day: 'Friday', opens: '18:00', closes: '19:30', name: 'Mid-week Prayer' },
];

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path = '/') {
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}
