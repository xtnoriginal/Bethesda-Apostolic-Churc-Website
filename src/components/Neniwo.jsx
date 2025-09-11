'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import DonateModal from './DonateModal';
import ModernDonateModal from './ModernDonateModal';

gsap.registerPlugin(ScrollTrigger);

export default function Neniwo() {
  const images = ['/images/neniwologo.jpg', '/images/neniwo.jpg'];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const contentRef = useRef(null);
  const capacityCardRef = useRef(null);
  const mobileCapacityCardRef = useRef(null);
  const fadeImageRef = useRef(null);
  const mobileFadeImageRef = useRef(null);
  const featuresRef = useRef(null);
  const buttonsRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphsRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 20000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section entrance animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      });

      // Badge animation
      tl.fromTo(badgeRef.current, 
        { opacity: 0, y: 20, scale: 0.9 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
      );

      // Title animation
      tl.fromTo(titleRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 
        '-=0.3'
      );

      // Image container animation
      tl.fromTo(imageContainerRef.current, 
        { opacity: 0, x: -50, scale: 0.95 }, 
        { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: 'power2.out' }, 
        '-=0.4'
      );

      // Content animation
      tl.fromTo(contentRef.current, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 
        '-=0.6'
      );

      // Paragraphs staggered animation
      tl.fromTo(paragraphsRef.current?.children || [], 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, 
        '-=0.4'
      );

      // Features staggered animation
      if (featuresRef.current) {
        tl.fromTo(featuresRef.current.children, 
          { opacity: 0, x: -30 }, 
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, 
          '-=0.3'
        );
      }

      // Buttons animation
      tl.fromTo(buttonsRef.current?.children || [], 
        { opacity: 0, y: 20, scale: 0.9 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.7)' }, 
        '-=0.2'
      );

      // Capacity cards hover animations
      if (capacityCardRef.current) {
        capacityCardRef.current.addEventListener('mouseenter', () => {
          gsap.to(capacityCardRef.current, { scale: 1.1, duration: 0.3, ease: 'back.out(1.7)' });
        });
        capacityCardRef.current.addEventListener('mouseleave', () => {
          gsap.to(capacityCardRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' });
        });
      }

      if (mobileCapacityCardRef.current) {
        mobileCapacityCardRef.current.addEventListener('mouseenter', () => {
          gsap.to(mobileCapacityCardRef.current, { scale: 1.1, duration: 0.3, ease: 'back.out(1.7)' });
        });
        mobileCapacityCardRef.current.addEventListener('mouseleave', () => {
          gsap.to(mobileCapacityCardRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' });
        });
      }

      // Image container hover animation
      if (imageContainerRef.current) {
        const imageContainer = imageContainerRef.current.querySelector('.image-hover-target');
        if (imageContainer) {
          imageContainer.addEventListener('mouseenter', () => {
            gsap.to(imageContainer, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
          });
          imageContainer.addEventListener('mouseleave', () => {
            gsap.to(imageContainer, { scale: 1, duration: 0.3, ease: 'power2.out' });
          });
        }
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Image fade effect
  useEffect(() => {
    if (fadeImageRef.current) {
      gsap.fromTo(fadeImageRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 1, ease: 'power2.out' }
      );
    }
    if (mobileFadeImageRef.current) {
      gsap.fromTo(mobileFadeImageRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 1, ease: 'power2.out' }
      );
    }
  }, [currentImageIndex]);

  return (
    <section id="neniwo" className="section bg-gray-50" ref={sectionRef}>
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left side - Image Carousel (Desktop only) */}
          <div
            className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12 relative hidden lg:block group"
            ref={imageContainerRef}
          >
            <div className="image-hover-target relative rounded-2xl overflow-hidden shadow-xl w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] transition duration-300 ease-in-out">
                <div
                  key={currentImageIndex}
                  className="absolute inset-0"
                  ref={fadeImageRef}
                >
                  <Image
                    src={images[currentImageIndex]}
                    alt={`Neniwo Project Image ${currentImageIndex + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    priority
                  />
                </div>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'}`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            <div
              className="absolute -bottom-6 right-6 bg-blue-600 text-white p-4 sm:p-5 md:p-6 rounded-lg shadow-lg z-10 cursor-pointer"
              ref={capacityCardRef}
            >
              <div className="text-4xl font-bold">30,000</div>
              <div className="text-sm uppercase tracking-wider">Seater Capacity</div>
            </div>
          </div>

          {/* Right side - Content */}
          <div
            className="lg:w-1/2"
            ref={contentRef}
          >
            <div className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full" ref={badgeRef}>
              Neniwo Project
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" ref={titleRef}>
              <span className="text-blue-600">Neniwo</span> ndinoivaka
            </h2>

            {/* Mobile Image Carousel (Mobile only) - Placed under the title */}
            <div className="w-full relative block lg:hidden mb-8 group">
              <div className="relative rounded-2xl overflow-hidden shadow-xl w-full h-[300px] sm:h-[400px]">
                  <div
                    key={currentImageIndex}
                    className="absolute inset-0"
                    ref={mobileFadeImageRef}
                  >
                    <Image
                      src={images[currentImageIndex]}
                      alt={`Neniwo Project Image ${currentImageIndex + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'}`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              <div
                className="absolute -bottom-6 right-6 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-10 cursor-pointer"
                ref={mobileCapacityCardRef}
              >
                <div className="text-xl font-bold">30,000</div>
                <div className="text-xs uppercase tracking-wider">Seater Capacity</div>
              </div>
            </div>
            
            <div ref={paragraphsRef}>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Join us in our ambitious vision to build a 30,000-seater church in Chivhu Sadza.
                "Neniwo ndinoivaka" (Me too, I am building) is more than a motto—it's a call to
                collective action and faith in God's provision for this monumental project.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                This state-of-the-art worship center will serve as a spiritual home for thousands,
                a beacon of hope for the community, and a testament to what can be achieved through
                faith and unity in Christ.
              </p>
            </div>

            <div className="space-y-4" ref={featuresRef}>
              {[
                {
                  icon: '🏗️',
                  title: 'The Vision',
                  description: 'A 30,000-seater worship center that will serve as a spiritual landmark for generations.'
                },
                {
                  icon: '📍',
                  title: 'Location',
                  description: 'Chivhu Sadza, strategically positioned to serve the surrounding communities.'
                },
                {
                  icon: '🤝',
                  title: 'Be Part of It',
                  description: 'Join us in prayer, giving, and service as we build God\'s house together.'
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4" ref={buttonsRef}>
              <button 
                onClick={() => setIsDonateModalOpen(true)} 
                className="btn btn-primary"
              >
                Donate Now
              </button>
              <Link href="/projects" className="btn bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
                Project Updates
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Donate Modal Component */}
      {isDonateModalOpen && <ModernDonateModal onClose={() => setIsDonateModalOpen(false)} />}
    </section>
  );
}