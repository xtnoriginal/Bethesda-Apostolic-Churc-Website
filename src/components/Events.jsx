'use client';

import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const events = [
  {
    id: 1,
    title: 'Ruwadzano Conference',
    date: 'August 2025',
    time: '***** - *****',
    location: 'Chiwiriri',
    description: 'Join us for our  Ruwadzano Conference with inspiring music and a powerful message from God\'s Word.',
    image: '/images/event-worship.jpg',
    category: 'Ruwadzano'
  },
  {
    id: 2,
    title: 'Matumba Conference',
    date: 'October, 2025',
    time: '***** - *****',
    location: 'Chiwiriri',
    description: 'Join us for our Matumba Conference with inspiring music and a powerful message from God\'s Word.',
    image: '/images/event-bible-study.jpg',
    category: 'Church'
  },
  {
    id: 3,
    title: 'Youth Conference',
    date: 'August, 2025',
    time: '***** - *****',
    location: 'Chiwiriri',
    description: 'Join us for our Youth Conference with inspiring music and a powerful message from God\'s Word.',
    image: '/images/event-youth.jpg',
    category: 'Youth'
  },
  {
    id: 4,
    title: 'BMCU Conference',
    date: 'November, 2025',
    time: '***** - *****',
    location: 'Vic Falls',
    description: 'Join us for our BMCU Conference with inspiring music and a powerful message from God\'s Word.',
    image: '/images/event-outreach.jpg',
    category: 'BMCU'
  },
];

export default function Events() {
  return (
    <section id="events" className="section bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.div 
            className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Upcoming Events
          </motion.div>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Join Us For <span className="text-blue-600">Upcoming Events</span>
          </motion.h2>
          <motion.p 
            className="max-w-2xl mx-auto text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Stay connected with our church community through these upcoming events and activities.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <motion.div 
              key={event.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="md:flex">
                <div className="md:w-1/3 bg-gray-200 relative">
                  <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {event.category}
                  </div>
                  <div className="h-full w-full bg-gray-300">
                    {/* Image would be here */}
                    <div className="h-full w-full flex items-center justify-center text-gray-400">
                      <FaCalendarAlt className="text-4xl" />
                    </div>
                  </div>
                </div>
                
                <div className="p-6 md:w-2/3">
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">{event.title}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                      <FaCalendarAlt className="mr-2 text-blue-600" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <FaClock className="mr-2 text-blue-600" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <FaMapMarkerAlt className="mr-2 text-blue-600" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                  
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                    Learn More →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button className="btn btn-primary">
            View All Events
          </button>
        </motion.div>
      </div>
    </section>
  );
}
