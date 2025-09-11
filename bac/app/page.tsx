import HeroSection from '../components/HeroSection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <section className="p-4 text-center">
        <h2 className="text-3xl">Join Us for Worship</h2>
        <p className="mt-2">Every Sunday at 10 AM</p>
      </section>
    </div>
  );
}
