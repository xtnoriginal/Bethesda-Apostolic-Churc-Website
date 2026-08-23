import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Sunday School',
  description:
    'The Bethesda Apostolic Church Sunday School — teaching and leading young people to Christ in Harare, Zimbabwe.',
  path: '/ministries/sunday-school',
  image: '/images/50.jpg',
});

export default function SundaySchoolLayout({ children }) {
  return children;
}
