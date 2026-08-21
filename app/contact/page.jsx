import Contact from '@/components/Contact.jsx';

export const metadata = {
  title: 'Contact Us | Bethesda Apostolic Church',
  description: 'Get in touch with Bethesda Apostolic Church — location, service times, and contact details.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Contact />
    </div>
  );
}
