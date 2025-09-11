'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaCreditCard, FaMobile, FaUniversity } from 'react-icons/fa';

export default function ModernDonateModal({ onClose }) {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    {
      id: 'card',
      name: 'Mastercard',
      icon: FaCreditCard,
      description: 'Secure card payment'
    },
    {
      id: 'paynow',
      name: 'PayNow',
      icon: FaMobile,
      description: 'Instant mobile payment'
    },
    {
      id: 'ecocash',
      name: 'EcoCash',
      icon: FaMobile,
      description: 'Mobile money transfer'
    }
  ];

  const predefinedAmounts = [10, 25, 50, 100, 250, 500];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      alert(`Thank you for your $${amount} donation via ${paymentMethods.find(m => m.id === selectedMethod)?.name}!`);
      onClose();
    }, 2000);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 50 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2"
            aria-label="Close modal"
          >
            <FaTimes className="text-lg" />
          </button>

          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{backgroundColor: '#0033A0'}}>
              <FaUniversity className="text-2xl text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{color: '#0033A0'}}>Support Our Ministry</h2>
            <p className="text-gray-600">Your generosity helps us serve our community and spread God's love.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amount Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Select Amount</label>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {predefinedAmounts.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setAmount(value.toString())}
                    className={`p-3 rounded-lg border-2 font-medium transition-all duration-200 ${
                      amount === value.toString()
                        ? 'border-blue-600 text-white'
                        : 'border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                    style={{
                      backgroundColor: amount === value.toString() ? '#0033A0' : 'white'
                    }}
                  >
                    ${value}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Custom amount"
                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
                min="1"
                required
              />
            </div>

            {/* Payment Method Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Payment Method</label>
              <div className="space-y-2">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selectedMethod === method.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={selectedMethod === method.id}
                      onChange={(e) => setSelectedMethod(e.target.value)}
                      className="sr-only"
                    />
                    <method.icon 
                      className={`text-xl mr-3 ${
                        selectedMethod === method.id ? 'text-blue-600' : 'text-gray-400'
                      }`} 
                    />
                    <div className="flex-grow">
                      <div className={`font-medium ${
                        selectedMethod === method.id ? 'text-blue-600' : 'text-gray-800'
                      }`}>
                        {method.name}
                      </div>
                      <div className="text-sm text-gray-500">{method.description}</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedMethod === method.id 
                        ? 'border-blue-600' 
                        : 'border-gray-300'
                    }`}>
                      {selectedMethod === method.id && (
                        <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: '#0033A0'}}></div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Form based on selected method */}
            {selectedMethod === 'card' && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
                  maxLength="19"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="p-4 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
                    maxLength="5"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="p-4 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
                    maxLength="3"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
                />
              </div>
            )}

            {selectedMethod === 'paynow' && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Mobile Number"
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
                />
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">PayNow Reference:</span> BETHESDA-{Date.now()}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    You'll receive an SMS prompt to complete the payment
                  </p>
                </div>
              </div>
            )}

            {selectedMethod === 'ecocash' && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="EcoCash Number"
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
                />
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Merchant Code:</span> 151515
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Reference:</span> BETHESDA-DONATION
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Dial *151*2*2*151515*{amount || '0'}# to complete payment
                  </p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!amount || isProcessing}
              className="w-full p-4 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: !amount || isProcessing ? '#9CA3AF' : '#0033A0'
              }}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                `Donate $${amount || '0'}`
              )}
            </button>

            <p className="text-xs text-center text-gray-500">
              Your donation is secure and helps support our church ministry. Thank you for your generosity!
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}