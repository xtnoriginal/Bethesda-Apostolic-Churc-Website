'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaCheckCircle, FaMapMarkerAlt, FaPhone, FaEnvelope, FaChurch, FaClock, FaFacebook, FaWhatsapp, FaYoutube } from 'react-icons/fa';

const initialFormState = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      nextErrors.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) nextErrors.message = 'Please enter a message.';
    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('submitting');
    // No backend yet — this simulates a submission so the flow can be reviewed end to end.
    setTimeout(() => {
      setStatus('success');
      setFormData(initialFormState);
    }, 600);
  };
  return (
    <section id="contact" className="section bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.div 
            className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-red-600 bg-red-100 rounded-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Get In Touch
          </motion.div>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            We'd Love to <span className="text-red-600">Hear From You</span>
          </motion.h2>
          <motion.p 
            className="max-w-2xl mx-auto text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Have questions or need more information? Reach out to us through any of these channels.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Contact Info */}
          <motion.div 
            className="bg-white p-8 rounded-xl shadow-md"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
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
                <div className="flex space-x-3">
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
          </motion.div>
          
          {/* Service Times */} 
          <motion.div 
            className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 rounded-xl shadow-md"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
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
          </motion.div>
          
          {/* Contact Form */}
          <motion.div 
            className="bg-white p-8 rounded-xl shadow-md"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-6">Send Us a Message</h3>

            {status === 'success' ? (
              <div className="text-center py-8">
                <FaCheckCircle className="text-4xl text-green-500 mx-auto mb-4" />
                <p className="font-semibold text-gray-900 mb-1">Message sent!</p>
                <p className="text-gray-600 text-sm mb-6">We'll get back to you as soon as we can.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="Theo Madzinga"
                  />
                  {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                  <textarea
                    id="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="Type your message here..."
                  ></textarea>
                  {errors.message && <p className="text-red-600 text-xs mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full btn btn-primary mt-2 disabled:opacity-60"
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
        
        {/* Map */}
        <motion.div 
          className="bg-white rounded-xl overflow-hidden shadow-md"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
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
        </motion.div>
      </div>
    </section>
  );
}