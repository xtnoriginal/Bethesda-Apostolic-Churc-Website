import Link from 'next/link';

interface SermonCardProps {
  title: string;
  date: string;
  sermonUrl: string;
  speaker: string;
}

export default function SermonCard({ title, date, sermonUrl, speaker }: SermonCardProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">Speaker: {speaker}</p>
        <p className="text-sm text-gray-600 mt-1">Date: {date}</p>
      </div>
      <div className="p-4 text-center">
        <Link href={sermonUrl} className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200">
            Watch Sermon
        </Link>
      </div>
    </div>
  );
}
