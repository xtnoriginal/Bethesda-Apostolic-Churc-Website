'use client';

import dynamic from 'next/dynamic';

// Import components with SSR disabled for better performance
const Header = dynamic(() => import('@/components/Header.jsx'), { ssr: false });
import Hero from '@/components/Hero.jsx';
import About from '@/components/About.jsx';
import Neniwo from '@/components/Neniwo.jsx';
import Baccet from '@/components/Baccet.jsx';
import Sermons from '@/components/Sermons.jsx';
import Events from '@/components/Events.jsx';
import Contact from '@/components/Contact.jsx';
import Footer from '@/components/Footer.jsx';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* About Section */}
        <About />
        
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
      
      {/* Footer */}
      <Footer />
    </div>
  );
}