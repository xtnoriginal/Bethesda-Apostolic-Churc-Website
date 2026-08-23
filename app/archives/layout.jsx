import { pageMetadata } from '@/lib/seo';

export const metadata = {
  ...pageMetadata({
    title: 'Sermon & Teaching Archives',
    description:
      'Sermons, teachings and articles from Bethesda Apostolic Church in Harare, Zimbabwe.',
    path: '/archives',
  }),
  title: {
    default: 'Sermon & Teaching Archives',
    template: '%s | Bethesda Apostolic Church',
  },
};

export default function ArchivesLayout({ children }) {
  return children;
}
