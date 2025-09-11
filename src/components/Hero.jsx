'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

export default function Hero() {
  // Refs for GSAP animations
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const imageDesktopRef = useRef(null);
  const imageMobileRef = useRef(null);
  const scheduleCardsRef = useRef([]);
  const backgroundRef = useRef(null);
  const particlesRef = useRef([]);
  const glowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create floating particles animation
      const createParticles = () => {
        const particlesContainer = backgroundRef.current;
        if (!particlesContainer) return;

        // Create 20 floating particles
        for (let i = 0; i < 20; i++) {
          const particle = document.createElement('div');
          particle.className = 'absolute w-2 h-2 bg-blue-200 rounded-full opacity-30';
          particle.style.left = Math.random() * 100 + '%';
          particle.style.top = Math.random() * 100 + '%';
          particlesContainer.appendChild(particle);
          particlesRef.current.push(particle);

          // Animate particles
          gsap.to(particle, {
            y: -100,
            x: Math.random() * 100 - 50,
            duration: 8 + Math.random() * 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: Math.random() * 2
          });

          // Fade in/out animation
          gsap.to(particle, {
            opacity: 0.6,
            duration: 3 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: Math.random() * 3
          });
        }
      };

      // Create animated background gradient
      if (backgroundRef.current) {
        gsap.to(backgroundRef.current, {
          background: "linear-gradient(135deg, #dbeafe 0%, #ffffff 50%, #e0e7ff 100%)",
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

      // Simple title animation - fast and visible
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            delay: 0.8,
            ease: "power3.out"
          }
        );
      }

      // Simple subtitle animation - fast and visible
      if (subtitleRef.current) {
        gsap.fromTo(subtitleRef.current,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            delay: 1.2,
            ease: "power2.out"
          }
        );
      }

      // Simple buttons animation - fast and visible
      if (buttonsRef.current) {
        const buttons = buttonsRef.current.children;
        
        gsap.fromTo(buttons,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0,
            duration: 0.8, 
            delay: 1.6,
            stagger: 0.2,
            ease: "power2.out"
          }
        );

        // Enhanced button hover effects with magnetic attraction
        Array.from(buttons).forEach(button => {
          const handleMouseMove = (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(button, {
              x: x * 0.1,
              y: y * 0.1,
              duration: 0.3,
              ease: "power2.out"
            });
          };

          button.addEventListener('mouseenter', () => {
            gsap.to(button, { 
              scale: 1.08, 
              y: -5,
              boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2)",
              duration: 0.3, 
              ease: "back.out(1.7)"
            });
            button.addEventListener('mousemove', handleMouseMove);
          });

          button.addEventListener('mouseleave', () => {
            gsap.to(button, { 
              scale: 1, 
              y: 0,
              x: 0,
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              duration: 0.3, 
              ease: "power2.out"
            });
            button.removeEventListener('mousemove', handleMouseMove);
          });
        });
      }

      // Enhanced desktop image animation with 3D effects
      if (imageDesktopRef.current) {
        gsap.fromTo(imageDesktopRef.current,
          { 
            opacity: 0, 
            x: 150, 
            scale: 0.7, 
            rotationY: 45,
            transformPerspective: 1000
          },
          { 
            opacity: 1, 
            x: 0, 
            scale: 1,
            rotationY: 0,
            duration: 1.5, 
            delay: 2.5,
            ease: "power3.out"
          }
        );

        // Enhanced image hover effects with parallax
        const imageContainer = imageDesktopRef.current.querySelector('.image-container');
        if (imageContainer) {
          imageContainer.addEventListener('mousemove', (e) => {
            const rect = imageContainer.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
            const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
            
            gsap.to(imageContainer, { 
              rotationY: x * 15,
              rotationX: -y * 15,
              scale: 1.05,
              duration: 0.3, 
              ease: "power2.out",
              transformPerspective: 1000
            });
          });

          imageContainer.addEventListener('mouseleave', () => {
            gsap.to(imageContainer, { 
              rotationY: 0,
              rotationX: 0,
              scale: 1, 
              duration: 0.5, 
              ease: "power2.out"
            });
          });
        }

        // Continuous subtle float animation
        gsap.to(imageDesktopRef.current, {
          y: -10,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 4
        });
      }

      // Enhanced mobile image animation
      if (imageMobileRef.current) {
        gsap.fromTo(imageMobileRef.current,
          { opacity: 0, y: 100, scale: 0.8, rotation: -10 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            rotation: 0,
            duration: 1.5, 
            delay: 3,
            ease: "back.out(1.7)"
          }
        );

        // Mobile image hover effect
        const imageContainer = imageMobileRef.current.querySelector('.image-container');
        if (imageContainer) {
          imageContainer.addEventListener('mouseenter', () => {
            gsap.to(imageContainer, { 
              scale: 1.03,
              rotation: 2,
              duration: 0.4, 
              ease: "power2.out" 
            });
          });

          imageContainer.addEventListener('mouseleave', () => {
            gsap.to(imageContainer, { 
              scale: 1,
              rotation: 0, 
              duration: 0.4, 
              ease: "power2.out" 
            });
          });
        }
      }

      // Fast schedule cards animation
      scheduleCardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card,
            { 
              opacity: 0, 
              y: 20
            },
            { 
              opacity: 1, 
              y: 0,
              duration: 0.6, 
              delay: 1.5 + (index * 0.1),
              ease: "power2.out"
            }
          );

          // Simple card hover effects
          card.addEventListener('mouseenter', () => {
            gsap.to(card, { 
              y: -5, 
              scale: 1.02,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.15)",
              duration: 0.3, 
              ease: "power2.out"
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, { 
              y: 0, 
              scale: 1,
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              duration: 0.3, 
              ease: "power2.out"
            });
          });
        }
      });

      // Create particles and start continuous animations
      createParticles();

      // Add ambient glow effect
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0.3,
          scale: 1.2,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

    }, heroRef);

    return () => {
      ctx.revert();
      // Clean up particles
      particlesRef.current.forEach(particle => {
        if (particle && particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
      particlesRef.current = [];
    };
  }, []);

  return (
    <section ref={heroRef} id="home" className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 md:pt-40 md:pb-28 overflow-hidden min-h-screen flex items-center">
      {/* Enhanced animated background with particles */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 -z-10"
        style={{background: 'linear-gradient(135deg, #f0f4ff 0%, #ffffff 50%, #faf8f3 100%)'}}
      >
        {/* Ambient glow effect */}
        <div 
          ref={glowRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-10"
        ></div>
        
        {/* Geometric shapes for visual interest */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-100 rounded-full opacity-20"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-100 rounded-lg opacity-15 rotate-45"></div>
        <div className="absolute top-1/3 right-10 w-16 h-16 bg-indigo-100 rounded-full opacity-25"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left side - Content */}
          <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
            <h1 
              ref={titleRef}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-6 opacity-0"
              style={{color: '#0033A0'}}
            >
              Welcome to <span style={{color: '#EE2737'}}>Bethesda</span> Apostolic Church
            </h1>
            
            <p 
              ref={subtitleRef}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed opacity-0 font-medium"
            >
              A vibrant community of believers dedicated to spreading the love of Christ. 
              Join us as we worship, learn, and grow together in faith.
            </p>
            
            <div 
              ref={buttonsRef}
              className="flex flex-row gap-2 sm:gap-4 mb-6 sm:mb-8"
            >
              <Link 
                href="#about" 
                className="btn btn-primary inline-flex items-center justify-center transition-all duration-300 ease-in-out text-xs sm:text-sm md:text-lg px-3 sm:px-6 md:px-8 py-3 sm:py-4 text-white rounded-lg sm:rounded-xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 flex-1"
                style={{backgroundColor: '#0033A0', ':hover': {backgroundColor: '#002d8f'}}}
              >
                <span className="hidden sm:inline">Learn More About Us</span>
                <span className="sm:hidden">Learn More</span>
              </Link>
              <Link 
                href="#sermons" 
                className="btn btn-secondary inline-flex items-center justify-center transition-all duration-300 ease-in-out text-xs sm:text-sm md:text-lg px-3 sm:px-6 md:px-8 py-3 sm:py-4 text-white rounded-lg sm:rounded-xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 flex-1"
                style={{backgroundColor: '#EE2737'}}
              >
                <span className="hidden sm:inline">Watch Sermons</span>
                <span className="sm:hidden">Sermons</span>
              </Link>
            </div>
            
            {/* Mobile image */}
            <div 
              ref={imageMobileRef}
              className="w-full lg:w-1/2 relative mt-6 sm:mt-8 lg:mt-0 lg:pl-4 lg:hidden block group opacity-0 mb-8 sm:mb-12"
            >
              <div className="image-container relative rounded-3xl overflow-hidden shadow-2xl w-full transition duration-300 ease-in-out cursor-pointer">
                <div className="aspect-w-16 aspect-h-9 w-full">
                  <Image
                    src="/2.jpg"
                    alt="Church Service"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-2xl font-bold mb-2 text-white">
                      Join Us This Sunday
                    </h3>
                    <p className="text-base text-white opacity-90">
                      Experience the presence of God with us
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced schedule cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {[
                { label: 'Sunday service', value: 'Sundays 11:30 AM - 01:00 PM', icon: '⛪' },
                { label: 'Mid week prayer', value: 'Wednesdays 05:30 PM', icon: '🙏' },
                { label: 'Mid week prayer', value: 'Fridays 05:30 PM', icon: '✨' },
              ].map((item, index) => (
                <div 
                  key={index}
                  ref={el => scheduleCardsRef.current[index] = el}
                  className="bg-white/80 backdrop-blur-lg p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-xl border border-white/20 cursor-pointer opacity-0 hover:bg-white/90 hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{item.icon}</div>
                  <h4 className="font-bold text-gray-900 text-sm sm:text-base md:text-lg mb-1">{item.label}</h4>
                  <p className="font-semibold text-xs sm:text-sm md:text-base" style={{color: '#0033A0'}}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right side - Image (desktop only) */}
          <div 
            ref={imageDesktopRef}
            className="w-full lg:w-1/2 relative mt-8 lg:mt-0 lg:pl-4 hidden lg:block group opacity-0"
          >
            <div className="image-container relative rounded-3xl overflow-hidden shadow-2xl w-full transition duration-300 ease-in-out cursor-pointer">
              <div className="aspect-w-16 aspect-h-9 w-full">
                <Image
                  src="/2.jpg"
                  alt="Church Service"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div className="text-white">
                  <h3 className="text-3xl font-bold mb-3 text-white">
                    Join Us This Sunday
                  </h3>
                  <p className="text-lg text-white opacity-90">
                    Experience the presence of God with us
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}