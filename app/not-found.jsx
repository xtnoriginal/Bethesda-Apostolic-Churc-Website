import Link from 'next/link';
import { Home } from 'lucide-react';
export const metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="section bg-white min-h-screen flex items-center">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
          404
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Page <span className="text-blue-600">Not Found</span>
        </h1>
        <p className="max-w-xl mx-auto text-gray-600 mb-8">
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <Link href="/" className="btn btn-primary inline-flex items-center">
          <Home className="mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
