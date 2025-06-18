// Make sure the path below matches the actual location of SermonCard.tsx or SermonCard/index.tsx
import SermonCard from '../../components/SermonCard';
// If the file does not exist, create it at ../../components/SermonCard.tsx or adjust the path accordingly.

export default function Sermons() {
  return (
    <div className="p-4">
      <h1 className="text-3xl text-center">Sermon Archive</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {/* Replace with dynamic data */}
        <SermonCard title="Sermon Title" date="2025-06-20" sermonUrl='' speaker=''/>
        <SermonCard title="Another Sermon" date="2025-06-13" sermonUrl='' speaker='' />
      </div>
    </div>
  );
}