'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaChurch, FaClock, FaFacebook, FaWhatsapp, FaYoutube } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const cardsRef = useRef(null);
  const mapRef = useRef(null);
  const socialLinksRef = useRef(null);
  const formRef = useRef(null);

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

      // Header animations
      tl.fromTo(badgeRef.current, 
        { opacity: 0, y: 20, scale: 0.9 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
      )
      .fromTo(titleRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 
        '-=0.3'
      )
      .fromTo(descriptionRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 
        '-=0.2'
      );

      // Cards staggered animation
      tl.fromTo(cardsRef.current.children, 
        { opacity: 0, y: 50, scale: 0.9 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' }, 
        '-=0.3'
      );

      // Map animation
      tl.fromTo(mapRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 
        '-=0.2'
      );

      // Social links hover animations
      if (socialLinksRef.current) {
        const socialLinks = socialLinksRef.current.querySelectorAll('a');
        socialLinks.forEach(link => {
          link.addEventListener('mouseenter', () => {
            gsap.to(link, { scale: 1.1, duration: 0.3, ease: 'back.out(1.7)' });
          });
          link.addEventListener('mouseleave', () => {
            gsap.to(link, { scale: 1, duration: 0.3, ease: 'power2.out' });
          });
        });
      }

      // Form inputs focus animations
      if (formRef.current) {
        const inputs = formRef.current.querySelectorAll('input, textarea');
        const button = formRef.current.querySelector('button');
        
        inputs.forEach(input => {
          input.addEventListener('focus', () => {
            gsap.to(input, { scale: 1.02, duration: 0.2, ease: 'power2.out' });
          });
          input.addEventListener('blur', () => {
            gsap.to(input, { scale: 1, duration: 0.2, ease: 'power2.out' });
          });
        });

        if (button) {
          button.addEventListener('mouseenter', () => {
            gsap.to(button, { scale: 1.05, duration: 0.3, ease: 'back.out(1.7)' });
          });
          button.addEventListener('mouseleave', () => {
            gsap.to(button, { scale: 1, duration: 0.3, ease: 'power2.out' });
          });
        }
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);
  return (
    <section id="contact" className="section bg-gray-50" ref={sectionRef}>
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div 
            className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-red-600 bg-red-100 rounded-full"
            ref={badgeRef}
          >
            Get In Touch
          </div>
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            ref={titleRef}
          >
            We'd Love to <span className="text-red-600">Hear From You</span>
          </h2>
          <p 
            className="max-w-2xl mx-auto text-gray-600"
            ref={descriptionRef}
          >
            Have questions or need more information? Reach out to us through any of these channels.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16" ref={cardsRef}>
          {/* Contact Info */}
          <div 
            className="bg-white p-8 rounded-xl shadow-md"
          >
            <h3 className="text-xl font-bold mb-6">Contact Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600 mr-4">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Our Location</h4>
                  <p className="text-gray-600">5WHM+93M, Harare, Zimbabwe</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600 mr-4">
                  <FaPhone />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Phone Number</h4>
                  <p className="text-gray-600">+263 71 565 7*6*</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600 mr-4">
                  <FaEnvelope />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Email Address</h4>
                  <p className="text-gray-600">bethesdaapostolicchurch@gmail.com</p>
                </div>
              </div>
              
              <div className="pt-4 mt-4 border-t border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-3">Follow Us</h4>
                <div className="flex space-x-3" ref={socialLinksRef}>
                  <a href="https://www.facebook.com/share/g/1MUa4mMqrp/" className="w-10 h-10 bg-[#3b5998] text-white rounded-full flex items-center justify-center hover:bg-[#2d4373] transition-colors">
                    <FaFacebook />
                  </a>
                  <a href="https://whatsapp.com/channel/0029VbAOqKW3wtbIHDTjK41T" className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                    <FaWhatsapp />
                  </a>
                  <a href="https://www.youtube.com/@bethesdaapostolicchurch4090" className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                    <FaYoutube />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Service Times */} 
          <div 
            className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 rounded-xl shadow-md"
          >
            <h3 className="text-xl font-bold mb-6">Service Times</h3>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="bg-white/20 p-3 rounded-xl mr-4">
                  <FaChurch className="text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold">Sunday Service</h4>
                  <p className="text-blue-100">11:00 AM - 13:00 PM</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-white/20 p-3 rounded-xl mr-4">
                  <FaClock className="text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold">Mid week prayer</h4>
                  <p className="text-blue-100">Wednesday, 6:00 PM </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-white/20 p-3 rounded-xl mr-4">
                  <FaClock className="text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold">Mid week prayer</h4>
                  <p className="text-blue-100">Friday, 6:00 PM </p>
                </div>
              </div>
              
              <div className="pt-4 mt-4 border-t border-blue-500">
                <p className="text-blue-100 text-sm">* please come at 10:00am during Sundays for sunday school and Ruwadzano </p>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div 
            className="bg-white p-8 rounded-xl shadow-md"
          >
            <h3 className="text-xl font-bold mb-6">Send Us a Message</h3>
            
            <form className="space-y-4" ref={formRef}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Theo Madzinga"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="you@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="How can we help you?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                <textarea 
                  id="message" 
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Type your message here..."
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full btn btn-primary mt-2"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
        
        {/* Map */}
        <div 
          className="bg-white rounded-xl overflow-hidden shadow-md"
          ref={mapRef}
        >
          <div className="h-96 w-full">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3799.869754014423!2d31.0569!3d-17.8136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDQ4JzQ5LjAiUyAzMcKwMDMnMjQuOCJF!5e0!3m2!1sen!2szw!4v1620000000000!5m2!1sen!2szw"
            >
            </iframe>
          </div>
        </div>
      </div>
    </section>
  );
}