'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaEnvelope, FaBell } from 'react-icons/fa';

export default function SubscribeModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubscribing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribing(false);
      setSubscribed(true);
      
      // Auto close after success
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        transition={{ duration: 0.4, ease: "back.out(1.3)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2 z-10"
            aria-label="Close modal"
          >
            <FaTimes className="text-lg" />
          </button>

          {!subscribed ? (
            <div className="p-8">
              <div className="text-center mb-8">
                <div 
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{backgroundColor: '#0033A0'}}
                >
                  <FaEnvelope className="text-2xl text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2" style={{color: '#0033A0'}}>
                  Stay Connected
                </h2>
                <p className="text-gray-600">
                  Subscribe to receive our weekly newsletter, sermon updates, and community announcements.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <FaBell className="text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-800 text-sm">What you'll receive:</h4>
                      <ul className="text-sm text-blue-700 mt-1 space-y-1">
                        <li>• Weekly sermon highlights</li>
                        <li>• Upcoming events and activities</li>
                        <li>• Prayer requests and testimonies</li>
                        <li>• Community updates</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!email || isSubscribing}
                  className="w-full p-4 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: !email || isSubscribing ? '#9CA3AF' : '#0033A0'
                  }}
                >
                  {isSubscribing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Subscribing...
                    </div>
                  ) : (
                    'Subscribe to Newsletter'
                  )}
                </button>

                <p className="text-xs text-center text-gray-500">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </div>
          ) : (
            <div className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{backgroundColor: '#28a745'}}
              >
                <motion.div
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  ✓
                </motion.div>
              </motion.div>
              <h2 className="text-2xl font-bold mb-2" style={{color: '#0033A0'}}>
                Welcome to Our Family!
              </h2>
              <p className="text-gray-600 mb-4">
                Thank you for subscribing! You'll receive our first newsletter soon.
              </p>
              <p className="text-sm text-gray-500">
                This window will close automatically...
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}