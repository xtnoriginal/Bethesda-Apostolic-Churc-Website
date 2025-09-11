'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SubscribeModal from './SubscribeModal';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const images = ['/1.jpg', '/2.jpg'];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  
  // Refs for GSAP animations
  const sectionRef = useRef(null);
  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const mobileImageContainerRef = useRef(null);
  const statsCardRef = useRef(null);
  const mobileStatsCardRef = useRef(null);
  const currentImageRef = useRef(null);
  const currentMobileImageRef = useRef(null);
  const featuresRef = useRef([]);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphsRef = useRef([]);
  const buttonRef = useRef(null);
  const subscribeButtonRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 20000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main timeline for coordinated animations
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 25%",
          once: true
        }
      });

      // Badge entrance with bounce
      if (badgeRef.current) {
        mainTimeline.fromTo(badgeRef.current,
          { opacity: 0, scale: 0, rotation: -180 },
          { 
            opacity: 1, 
            scale: 1, 
            rotation: 0,
            duration: 0.8, 
            ease: "back.out(1.7)"
          }
        );
      }

      // Title animation with character reveal
      if (titleRef.current) {
        const titleText = titleRef.current.textContent;
        titleRef.current.innerHTML = titleText.split('').map(char => 
          char === ' ' ? ' ' : `<span style="display:inline-block;opacity:0;transform:translateY(50px)">${char}</span>`
        ).join('');
        
        const titleChars = titleRef.current.querySelectorAll('span');
        
        mainTimeline.to(titleChars, {
          opacity: 1,
          y: 0,
          duration: 0.05,
          stagger: 0.03,
          ease: "power2.out"
        }, "-=0.3");
      }

      // Paragraph animations with stagger
      paragraphsRef.current.forEach((paragraph, index) => {
        if (paragraph) {
          mainTimeline.fromTo(paragraph,
            { opacity: 0, y: 30, rotationX: -15 },
            { 
              opacity: 1, 
              y: 0, 
              rotationX: 0,
              duration: 0.8, 
              ease: "power3.out"
            },
            "-=0.6"
          );
        }
      });

      // Left section (image) entrance with 3D effect
      if (leftSectionRef.current) {
        mainTimeline.fromTo(leftSectionRef.current,
          { 
            opacity: 0, 
            x: -150, 
            rotationY: -45,
            transformPerspective: 1000,
            scale: 0.8
          },
          { 
            opacity: 1, 
            x: 0, 
            rotationY: 0,
            scale: 1,
            duration: 1.4, 
            ease: "power3.out"
          },
          "-=1.2"
        );
      }

      // Features animation with enhanced stagger and 3D effects
      featuresRef.current.forEach((feature, index) => {
        if (feature) {
          mainTimeline.fromTo(feature,
            { 
              opacity: 0, 
              y: 50, 
              x: -30,
              rotationX: -15,
              scale: 0.9
            },
            { 
              opacity: 1, 
              y: 0, 
              x: 0,
              rotationX: 0,
              scale: 1,
              duration: 0.8, 
              ease: "back.out(1.2)"
            },
            "-=0.5"
          );
        }
      });

      // Buttons entrance with magnetic effect
      [buttonRef.current, subscribeButtonRef.current].forEach((button, index) => {
        if (button) {
          mainTimeline.fromTo(button,
            { 
              opacity: 0, 
              y: 40,
              scale: 0.8,
              rotation: -5
            },
            { 
              opacity: 1, 
              y: 0,
              scale: 1,
              rotation: 0,
              duration: 0.8, 
              ease: "elastic.out(1, 0.5)"
            },
            "-=0.4"
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();

    // Enhanced stats card hover animations with 3D effects
    const setupStatsCardAnimation = (cardRef) => {
      if (!cardRef.current) return;
      
      gsap.set(cardRef.current, { transformPerspective: 1000 });
      
      const handleMouseEnter = () => {
        gsap.to(cardRef.current, { 
          scale: 1.15, 
          rotationX: -5,
          rotationY: 5,
          y: -10,
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
          duration: 0.4, 
          ease: "power2.out" 
        });
      };

      const handleMouseMove = (e) => {
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(cardRef.current, {
          rotationY: x * 0.05,
          rotationX: -y * 0.05,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(cardRef.current, { 
          scale: 1, 
          rotationX: 0,
          rotationY: 0,
          y: 0,
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          duration: 0.4, 
          ease: "power2.out" 
        });
      };
      
      cardRef.current.addEventListener('mouseenter', handleMouseEnter);
      cardRef.current.addEventListener('mousemove', handleMouseMove);
      cardRef.current.addEventListener('mouseleave', handleMouseLeave);
    };

    setupStatsCardAnimation(statsCardRef);
    setupStatsCardAnimation(mobileStatsCardRef);

    // Enhanced image container hover effects with parallax
    const setupImageAnimation = (imageRef) => {
      if (!imageRef.current) return;
      
      gsap.set(imageRef.current, { transformPerspective: 1000 });
      
      const handleMouseEnter = () => {
        gsap.to(imageRef.current, { 
          scale: 1.08, 
          rotationX: 2,
          rotationY: 2,
          y: -5,
          boxShadow: "0 30px 60px rgba(0, 0, 0, 0.3)",
          duration: 0.5, 
          ease: "power3.out" 
        });
      };

      const handleMouseMove = (e) => {
        const rect = imageRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        
        gsap.to(imageRef.current, {
          rotationY: x * 8,
          rotationX: -y * 8,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(imageRef.current, { 
          scale: 1, 
          rotationX: 0,
          rotationY: 0,
          y: 0,
          boxShadow: "0 15px 35px rgba(0, 0, 0, 0.15)",
          duration: 0.5, 
          ease: "power3.out" 
        });
      };
      
      imageRef.current.addEventListener('mouseenter', handleMouseEnter);
      imageRef.current.addEventListener('mousemove', handleMouseMove);
      imageRef.current.addEventListener('mouseleave', handleMouseLeave);
    };

    setupImageAnimation(imageContainerRef);
    setupImageAnimation(mobileImageContainerRef);

    // Enhanced feature hover animations
    featuresRef.current.forEach((feature, index) => {
      if (feature) {
        const icon = feature.querySelector('div:first-child');
        const content = feature.querySelector('div:last-child');
        
        const handleMouseEnter = () => {
          gsap.to(feature, {
            x: 10,
            duration: 0.3,
            ease: "power2.out"
          });
          
          if (icon) {
            gsap.to(icon, {
              scale: 1.2,
              rotation: 15,
              backgroundColor: '#0033A0',
              color: '#FFFFFF',
              duration: 0.3,
              ease: "back.out(1.7)"
            });
          }
          
          if (content) {
            gsap.to(content.children, {
              x: 5,
              duration: 0.2,
              stagger: 0.1,
              ease: "power2.out"
            });
          }
        };
        
        const handleMouseLeave = () => {
          gsap.to(feature, {
            x: 0,
            duration: 0.3,
            ease: "power2.out"
          });
          
          if (icon) {
            gsap.to(icon, {
              scale: 1,
              rotation: 0,
              backgroundColor: '#dbeafe',
              color: '#2563eb',
              duration: 0.3,
              ease: "power2.out"
            });
          }
          
          if (content) {
            gsap.to(content.children, {
              x: 0,
              duration: 0.2,
              stagger: 0.05,
              ease: "power2.out"
            });
          }
        };
        
        feature.addEventListener('mouseenter', handleMouseEnter);
        feature.addEventListener('mouseleave', handleMouseLeave);
      }
    });

    // Button hover animations with magnetic effect
    const setupButtonAnimation = (buttonRef, shadowColor = 'rgba(37, 99, 235, 0.3)') => {
      if (!buttonRef.current) return;
      
      const handleMouseEnter = () => {
        gsap.to(buttonRef.current, {
          scale: 1.05,
          y: -3,
          boxShadow: `0 15px 35px ${shadowColor}`,
          duration: 0.3,
          ease: "power2.out"
        });
      };
      
      const handleMouseMove = (e) => {
        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(buttonRef.current, {
          x: x * 0.1,
          y: y * 0.1,
          duration: 0.2,
          ease: "power2.out"
        });
      };
      
      const handleMouseLeave = () => {
        gsap.to(buttonRef.current, {
          scale: 1,
          x: 0,
          y: 0,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          duration: 0.3,
          ease: "power2.out"
        });
      };
      
      buttonRef.current.addEventListener('mouseenter', handleMouseEnter);
      buttonRef.current.addEventListener('mousemove', handleMouseMove);
      buttonRef.current.addEventListener('mouseleave', handleMouseLeave);
    };
    
    setupButtonAnimation(buttonRef, 'rgba(37, 99, 235, 0.3)');
    setupButtonAnimation(subscribeButtonRef, 'rgba(238, 39, 55, 0.3)');

    // Continuous floating animation for stats cards
    gsap.to([statsCardRef.current, mobileStatsCardRef.current].filter(Boolean), {
      y: "-=8",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 2
    });
  }, []);

  // Cleanup function
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Image transition animation
  useEffect(() => {
    if (currentImageRef.current) {
      gsap.fromTo(currentImageRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.inOut" }
      );
    }

    if (currentMobileImageRef.current) {
      gsap.fromTo(currentMobileImageRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.inOut" }
      );
    }
  }, [currentImageIndex]);

  return (
    <section ref={sectionRef} id="about" className="section bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left side - Image Carousel (Desktop only) */}
          <div ref={leftSectionRef} className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12 relative hidden lg:block group">
            <div 
              ref={imageContainerRef}
              className="relative rounded-2xl overflow-hidden shadow-xl w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] transition duration-300 ease-in-out"
            >
              <div
                ref={currentImageRef}
                key={currentImageIndex}
                className="absolute inset-0"
              >
                <Image
                  src={images[currentImageIndex]}
                  alt={`Church image ${currentImageIndex + 1}`}
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
              ref={statsCardRef}
              className="absolute -bottom-6 right-6 bg-blue-600 text-white p-4 sm:p-5 md:p-6 rounded-lg shadow-lg z-10 cursor-pointer"
            >
              <div className="text-3xl font-bold">70+</div>
              <div className="text-xs uppercase tracking-wider">Years of Ministry</div>
            </div>
          </div>

          {/* Right side - Content */}
          <div ref={rightSectionRef} className="lg:w-1/2">
            <div ref={badgeRef} className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
              About Our Church
            </div>
            <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              A Place of Faith, Hope & Love
            </h2>
            <p ref={el => paragraphsRef.current[0] = el} className="text-gray-600 mb-6 leading-relaxed">
              Bethesda Apostolic Church has been a beacon of hope in our community for over 73 years.
              Founded on the principles of faith, love, and service, we strive to create a welcoming
              environment where everyone can experience the transformative power of God's love.
            </p>
            <p ref={el => paragraphsRef.current[1] = el} className="text-gray-600 mb-8 leading-relaxed">
              Our mission is to lead people into a growing relationship with Jesus Christ through
              authentic worship, biblical teaching, and genuine community. We believe in the power of
              the Holy Spirit to change lives and make a difference in our world.
            </p>

            {/* Image Carousel (Mobile only) */}
            <div className="w-full relative block lg:hidden mb-12 group">
              <div 
                ref={mobileImageContainerRef}
                className="relative rounded-2xl overflow-hidden shadow-xl w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] transition duration-300 ease-in-out"
              >
                <div
                  ref={currentMobileImageRef}
                  key={`mobile-${currentImageIndex}`}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[currentImageIndex]}
                    alt={`Church image ${currentImageIndex + 1}`}
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
                ref={mobileStatsCardRef}
                className="absolute -bottom-6 right-6 bg-blue-600 text-white p-4 sm:p-5 md:p-6 rounded-lg shadow-lg z-10 cursor-pointer"
              >
                <div className="text-3xl font-bold">70+</div>
                <div className="text-xs uppercase tracking-wider">Years of Ministry</div>
              </div>
            </div>

            <div className="space-y-4 mt-8 lg:mt-0">
              {[
                {
                  icon: '✝️',
                  title: 'Our Beliefs',
                  description: 'We believe in the Bible as the inspired Word of God and the foundation of our faith.'
                },
                {
                  icon: '🙏',
                  title: 'Our Vision',
                  description: 'To be a church that transforms lives through the power of the Gospel.'
                },
                {
                  icon: '❤️',
                  title: 'Our Values',
                  description: 'Love, faith, integrity, service, and community guide everything we do.'
                }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-start"
                  ref={el => featuresRef.current[index] = el}
                >
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
            
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                ref={buttonRef}
                href="#beliefs"
                className="btn btn-primary transition duration-300 ease-in-out"
              >
                Our Beliefs
              </Link>
              <button
                ref={subscribeButtonRef}
                onClick={() => setShowSubscribeModal(true)}
                className="btn inline-flex items-center justify-center transition-all duration-300 ease-in-out px-6 py-3 text-white font-semibold rounded-lg shadow-lg"
                style={{backgroundColor: '#EE2737'}}
              >
                Subscribe to Newsletter
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Subscribe Modal */}
      {showSubscribeModal && (
        <SubscribeModal onClose={() => setShowSubscribeModal(false)} />
      )}
    </section>
  );
}