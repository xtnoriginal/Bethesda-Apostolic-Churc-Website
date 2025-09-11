'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { FaYoutube, FaCalendarAlt, FaClock } from 'react-icons/fa';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const sermons = [
  {
    id: 1,
    title: 'Murehwa-Mutoko Passover 2025 || Bishop N Manhango',
    preacher: 'Bishop N Manhango',
    date: 'July 27, 2025',
    duration: '46:11',
    image: '/images/1.jpg',
    video: 'https://youtu.be/HPVrTZjYbPY?si=EyQLsJ9TiJTO41SP',
    description: 'Murehwa-Mutoko Passover 2025'
  },
  {
    id: 2,
    title: 'Marondera Passover 2025 - Mai ArchBishop Manhango',
    preacher: 'Mai ArchBishop Manhango',
    date: 'June 11, 2023',
    duration: '10:12',
    image: '/images/2.jpg',
    video: 'https://youtu.be/HPgtLSWVSnU?si=NJ49NDca3oRhhun7',
    description: 'Marondera Passover 2025'
  },
  {
    id: 3,
    title: 'Zaka Jerera Passover 2025 - Mai ArchBishop Manhango Sermon',
    preacher: 'Mai ArchBishop Manhango',
    date: 'July 20, 2025',
    duration: '10:52',
    image: '/images/3.jpg',
    video: 'https://youtu.be/mwRDA6jkILk?si=WzDzXfFfxjhldyG_',
    description: 'Zaka Jerera Passover 2025'
  },
];

const youtubeChannelUrl = 'https://www.youtube.com/@bethesdaapostolicchurch4090';

export default function Sermons() {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const cardsRef = useRef([]);
  const viewAllButtonRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header elements animation
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      headerTl
        .fromTo(
          badgeRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo(
          descriptionRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.4'
        );

      // Sermon cards staggered animation
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current[0],
            start: 'top 85%',
            once: true,
          },
        }
      );

      // View All button animation
      gsap.fromTo(
        viewAllButtonRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: viewAllButtonRef.current,
            start: 'top 90%',
            once: true,
          },
        }
      );

      // Hover animations for sermon cards
      cardsRef.current.forEach((card) => {
        if (!card) return;

        const image = card.querySelector('.sermon-image');
        const playButton = card.querySelector('.play-button');
        const overlay = card.querySelector('.video-overlay');
        const watchButton = card.querySelector('.watch-button');

        // Card hover animation
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { scale: 1.02, duration: 0.3, ease: 'power2.out' });
          if (image) {
            gsap.to(image, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
          }
          if (overlay) {
            gsap.to(overlay, { opacity: 1, duration: 0.3, ease: 'power2.out' });
          }
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, { scale: 1, duration: 0.3, ease: 'power2.out' });
          if (image) {
            gsap.to(image, { scale: 1, duration: 0.3, ease: 'power2.out' });
          }
          if (overlay) {
            gsap.to(overlay, { opacity: 0, duration: 0.3, ease: 'power2.out' });
          }
        });

        // Play button hover animation
        if (playButton) {
          playButton.addEventListener('mouseenter', () => {
            gsap.to(playButton, { 
              scale: 1.1, 
              backgroundColor: '#dc2626', 
              duration: 0.2, 
              ease: 'power2.out' 
            });
          });

          playButton.addEventListener('mouseleave', () => {
            gsap.to(playButton, { 
              scale: 1, 
              backgroundColor: '#dc2626', 
              duration: 0.2, 
              ease: 'power2.out' 
            });
          });
        }

        // Watch button hover animation
        if (watchButton) {
          watchButton.addEventListener('mouseenter', () => {
            gsap.to(watchButton, { scale: 1.05, duration: 0.2, ease: 'power2.out' });
          });

          watchButton.addEventListener('mouseleave', () => {
            gsap.to(watchButton, { scale: 1, duration: 0.2, ease: 'power2.out' });
          });
        }
      });

      // View All button hover animation
      if (viewAllButtonRef.current) {
        viewAllButtonRef.current.addEventListener('mouseenter', () => {
          gsap.to(viewAllButtonRef.current, { 
            scale: 1.05, 
            duration: 0.3, 
            ease: 'power2.out' 
          });
        });

        viewAllButtonRef.current.addEventListener('mouseleave', () => {
          gsap.to(viewAllButtonRef.current, { 
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
    <section id="sermons" className="section bg-gray-50" ref={sectionRef}>
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div
            ref={badgeRef}
            className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-red-600 bg-red-100 rounded-full"
          >
            Recent Sermons
          </div>
          <h2
            ref={titleRef}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Watch & Listen to <span className="text-red-600">Sermons</span>
          </h2>
          <p
            ref={descriptionRef}
            className="max-w-2xl mx-auto text-gray-600"
          >
            Catch up on our latest messages and be inspired by the Word of God.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sermons.map((sermon, index) => (
            <div
              key={sermon.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-white rounded-xl overflow-hidden shadow-md group"
            >
              <Link href={sermon.video} target="_blank" rel="noopener noreferrer">
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <Image
                    src={sermon.image}
                    alt={sermon.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover sermon-image"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 video-overlay">
                    <button
                      className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white play-button"
                      aria-label={`Play sermon: ${sermon.title}`}
                    >
                      <FaYoutube className="text-4xl" />
                    </button>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 text-red-600 text-xs font-semibold px-2 py-1 rounded">
                    {sermon.duration}
                  </div>
                </div>
              </Link>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-1" />
                    <span>{sermon.date}</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="mr-1" />
                    <span>{sermon.duration}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2 line-clamp-2">{sermon.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{sermon.description}</p>
                <div className="text-sm font-medium text-gray-900 mb-4">Preacher: {sermon.preacher}</div>
                
                <div className="flex justify-center items-center pt-4 border-t border-gray-100">
                  <Link
                    href={sermon.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-red-600 hover:text-red-700 flex items-center watch-button"
                  >
                    <FaYoutube className="mr-1 text-base" /> Watch Sermon
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link
            ref={viewAllButtonRef}
            href={youtubeChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            View All Sermons
          </Link>
        </div>
      </div>
    </section>
  );
}