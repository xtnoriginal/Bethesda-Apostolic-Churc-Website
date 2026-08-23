import SignupForm from './SignupForm';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Sign Up',
  description: 'Create an account to access teaching and courses at Bethesda Apostolic Church.',
  path: '/signup',
  noindex: true,
});

export default function SignupPage() {
  return <SignupForm />;
}
