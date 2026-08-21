import About from '@/components/About.jsx';

export const metadata = {
  title: 'About Us | Bethesda Apostolic Church',
  description: 'Learn about Bethesda Apostolic Church — our beliefs, vision, and values.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <About />
    </div>
  );
}
