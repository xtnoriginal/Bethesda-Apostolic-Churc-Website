import LoginForm from './LoginForm';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Log In',
  description: 'Log in to access teaching and courses at Bethesda Apostolic Church.',
  path: '/login',
  noindex: true,
});

export default function LoginPage() {
  return <LoginForm />;
}
