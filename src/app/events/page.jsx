'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaMapMarkerAlt, FaArrowLeft } from 'react-icons/fa';
import EventModal from '../../components/EventModal'; 
import { useState } from 'react';


const events = [
  {
    id: 1,
    title: 'Youth Conference',
    date: '7 - 10 August, 2025',
    location: 'Chiwiriri',
    description: 'Join us for our Youth Conference with inspiring music and a powerful message from God\'s Word.',
    images: ['/images/13.jpg', '/images/8.jpg'],
    category: 'Youth'
  },
  {
    id: 2,
    title: 'Ruwadzano Conference',
    date: '28 - 31 August 2025',
    location: 'Chiwiriri',
    description: 'Join us for our Ruwadzano Conference with inspiring music and a powerful message from God\'s Word.',
    images: ['/images/11.jpg', '/images/6.jpg', '/images/15.jpg'],
    category: 'Ruwadzano'
  },
  {
    id: 3,
    title: 'Matumba Conference',
    date: '17 - 19 October, 2025',
    location: 'Chiwiriri',
    description: 'Join us for our Matumba Conference with inspiring music and a powerful message from God\'s Word.',
    images: ['/images/12.jpg', '/images/9.jpg', '/images/7.jpg'],
    category: 'Church'
  },
  {
    id: 4,
    title: 'BMCU Conference',
    date: '14 - 16 November, 2025',
    location: 'Vic Falls',
    description: 'Join us for our BMCU Conference with inspiring music and a powerful message from God\'s Word.',
    images: ['/images/5.jpg', '/images/14.jpg', '/images/16.jpg'],
    category: 'BMCU'
  },
  // You can add more events here as needed
];

export default function EventsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="section bg-white min-h-screen">
      <div className="container mx-auto py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              <FaArrowLeft className="mr-2" />
              Back to Home
            </Link>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            All <span className="text-blue-600">Upcoming Events</span>
          </h1>
          <p className="max-w-2xl mx-auto text-center text-gray-600 mb-12">
            Explore all the exciting conferences and activities happening at our church throughout the year.
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              className="bg-white rounded-xl overflow-hidden shadow-md group hover:shadow-xl transition-shadow duration-300 hover:scale-[1.02] transition-transform"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="md:flex flex-col">
                <div className="bg-gray-200 relative h-48 md:h-64">
                  <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                    {event.category}
                  </div>
                  <Image
                    src={event.images[0]}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">{event.title}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                      <FaCalendarAlt className="mr-2 text-blue-600" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <FaMapMarkerAlt className="mr-2 text-blue-600" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                  
                  <button
                    onClick={() => handleOpenModal(event)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-transform duration-200 hover:scale-105 inline-block"
                  >
                    Learn More →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Event Modal Component */}
      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={handleCloseModal} />
      )}
    </div>
  );
}