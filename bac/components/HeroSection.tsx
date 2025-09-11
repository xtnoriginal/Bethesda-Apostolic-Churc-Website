import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative h-[60vh] bg-gray-800 text-white flex items-center justify-center">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/church-hero.jpg" // Replace with your image
          alt="Church Hero Image"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      {/* Hero Content */}
      <div className="z-10 text-center px-4">
        <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
          Welcome to Our Church
        </h1>
        <p className="mt-4 text-lg sm:text-xl max-w-3xl mx-auto">
          Join us every Sunday at 10 AM for worship, fellowship, and spiritual growth.
        </p>
        <a href="#services" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-medium transition hover:bg-blue-500">
          Join Us This Sunday
        </a>
      </div>
    </section>
  );
}
