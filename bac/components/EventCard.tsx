import Link from 'next/link';

interface EventCardProps {
  title: string;
  date: string;
  eventUrl: string;
  location: string;
}

export default function EventCard({ title, date, eventUrl, location }: EventCardProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">Date: {date}</p>
        <p className="text-sm text-gray-600 mt-1">Location: {location}</p>
      </div>
      <div className="p-4 text-center">
        <Link href={eventUrl} className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200">
            View Event Details
        </Link>
      </div>
    </div>
  );
}
