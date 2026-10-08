import { bcuContent } from './bcu';

export const ministries = [
  {
    slug: 'sunday-school',
    name: 'Sunday School',
    tagline: 'Grounding our youth in the Word of God.',
    image: '/images/50.jpg',
    href: '/ministries/sunday-school',
  },
  {
    slug: 'ruwadzano',
    name: 'Ruwadzano',
    tagline: "The church's women's fellowship.",
    image: '/images/11.jpg',
    isDraft: true,
  },
  {
    slug: 'bmcu',
    name: 'BMCU',
    tagline: "The church's men's wing.",
    image: '/2.jpg',
    isDraft: true,
  },
  {
    slug: 'bcu',
    name: 'BCU',
    fullName: 'Boys Christian Union',
    tagline: 'The youth wing for young men, raised as an army of the Word of God.',
    image: '/images/bcu/gathering.jpg',
    content: bcuContent,
  },
  {
    slug: 'gcu',
    name: 'GCU',
    tagline: 'One of our church wings.',
    image: '/1.jpg',
    isDraft: true,
  },
];

export function getMinistryBySlug(slug) {
  return ministries.find((m) => m.slug === slug);
}
