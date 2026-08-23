'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import EventModal from '@/components/EventModal';
import { events } from '@/data/events';
import { useState } from 'react';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

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
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                </div>
                
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">{event.title}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                      <Calendar className="mr-2 text-blue-600" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="mr-2 text-blue-600" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                  
                  <button
                    onClick={() => handleOpenModal(event)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-transform duration-200 hover:scale-105 inline-flex items-center gap-1 group/link"
                  >
                    Learn More
                    <ArrowRight
                      className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-0.5"
                      aria-hidden="true"
                    />
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