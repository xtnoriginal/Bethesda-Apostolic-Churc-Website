import EventCard from '../../components/EventCard';

export default function Events() {
  return (
    <div className="p-4">
      <h1 className="text-3xl text-center">Upcoming Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {/* Replace with dynamic data */}
        <EventCard title="Church Picnic" date="2025-06-30" eventUrl='' location='' />
        <EventCard title="Christmas Service" date="2025-12-24" eventUrl='' location=''/>
      </div>
    </div>
  );
}