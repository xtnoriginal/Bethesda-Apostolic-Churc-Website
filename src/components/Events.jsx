'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import EventModal from './EventModal';

gsap.registerPlugin(ScrollTrigger); 

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
    images: ['/images/11.jpg', '/images/6.jpg', '/images/15.jpg', '/images/32.jpg'],
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
];

export default function Events() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  // GSAP refs
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const eventsGridRef = useRef(null);
  const viewAllButtonRef = useRef(null);

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none none',
        }
      });

      // Header elements animation with stagger
      tl.fromTo(badgeRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      )
      .fromTo(titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(descriptionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.4'
      );

      // Event cards staggered animation
      const eventCards = eventsGridRef.current?.children || [];
      if (eventCards.length > 0) {
        gsap.fromTo(eventCards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: eventsGridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          }
        );
      }

      // View All Events button animation
      gsap.fromTo(viewAllButtonRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: viewAllButtonRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          }
        }
      );

      // Hover animations for event cards
      Array.from(eventCards).forEach((card) => {
        const image = card.querySelector('img');
        const learnMoreButton = card.querySelector('button');
        
        // Card hover animation
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.02,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            duration: 0.3,
            ease: 'power2.out'
          });
          
          // Image scale on hover
          if (image) {
            gsap.to(image, {
              scale: 1.05,
              duration: 0.3,
              ease: 'power2.out'
            });
          }
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            duration: 0.3,
            ease: 'power2.out'
          });
          
          // Reset image scale
          if (image) {
            gsap.to(image, {
              scale: 1,
              duration: 0.3,
              ease: 'power2.out'
            });
          }
        });

        // Learn More button hover animation
        if (learnMoreButton) {
          learnMoreButton.addEventListener('mouseenter', () => {
            gsap.to(learnMoreButton, {
              scale: 1.05,
              duration: 0.2,
              ease: 'power2.out'
            });
          });

          learnMoreButton.addEventListener('mouseleave', () => {
            gsap.to(learnMoreButton, {
              scale: 1,
              duration: 0.2,
              ease: 'power2.out'
            });
          });
        }
      });

      // View All Events button hover animation
      const viewAllButton = viewAllButtonRef.current?.querySelector('a');
      if (viewAllButton) {
        viewAllButton.addEventListener('mouseenter', () => {
          gsap.to(viewAllButton, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        viewAllButton.addEventListener('mouseleave', () => {
          gsap.to(viewAllButton, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="events" className="section bg-white">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            ref={badgeRef}
            className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full"
          >
            Upcoming Events
          </div>
          <h2
            ref={titleRef}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Join Us For <span className="text-blue-600">Upcoming Events</span>
          </h2>
          <p
            ref={descriptionRef}
            className="max-w-2xl mx-auto text-gray-600"
          >
            Stay connected with our church community through these upcoming events and activities.
          </p>
        </div>

        {/* Events Grid */}
        <div ref={eventsGridRef} className="grid md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <div
              key={event.id}
              className="bg-white rounded-xl overflow-hidden shadow-md group"
            >
              <div className="md:flex">
                <div className="md:w-1/3 bg-gray-200 relative h-72 md:h-auto">
                  <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                    {event.category}
                  </div>
                  <Image
                    src={event.images[0]} // Use the first image as the thumbnail
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                
                <div className="p-6 md:w-2/3">
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
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-block"
                  >
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* View All Events Button */}
        <div
          ref={viewAllButtonRef}
          className="text-center mt-12"
        >
          <Link
            href="/events" 
            className="btn btn-primary"
          >
            View All Events
          </Link>
        </div>
      </div>

      {/* Event Modal Component */}
      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={handleCloseModal} />
      )}
    </section>
  );
}