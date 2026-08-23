import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Donations',
  description:
    'Support the work of Bethesda Apostolic Church — the Neniwo building project and the BACCET education trust.',
  path: '/donations',
});

export default function DonationsLayout({ children }) {
  return children;
}
