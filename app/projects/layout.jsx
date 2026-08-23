import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Neniwo Project Updates',
  description:
    'Progress on the Neniwo project — a 30,000-seater worship centre at Chivhu Sadza, built by Bethesda Apostolic Church.',
  path: '/projects',
});

export default function ProjectsLayout({ children }) {
  return children;
}
