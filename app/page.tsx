'use client';

import Hero from '@/components/Hero.jsx';
import About from '@/components/About.jsx';
import FounderTeaser from '@/components/FounderTeaser.jsx';
import Neniwo from '@/components/Neniwo.jsx';
import Baccet from '@/components/Baccet.jsx';
import Sermons from '@/components/Sermons.jsx';
import Events from '@/components/Events.jsx';
import Contact from '@/components/Contact.jsx';


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* About Section */}
        <About />

        {/* Founder Teaser Section */}
        <FounderTeaser />

        {/* Sermons Section */}
        <Sermons />
        
        {/* Events Section */}
        <Events />
        
        {/* Neniwo Project Section */}
        <Neniwo />
        
        {/* BACCET Scholarship Section */}
        <Baccet />
        
        {/* Contact Section */}
        <Contact />
      </main>
    </div>
  );
}