'use client';

import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

export default function DonateModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
            aria-label="Close modal"
          >
            <FaTimes className="text-xl" />
          </button>

          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Donate to the Neniwo Project</h2>
            <p className="text-gray-600">Your generosity will help build the Temple of God.</p>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Bank Details</h4>
              <p className="text-sm text-gray-700">
                <span className="font-bold block">Bank Name:</span> CBZ Bank
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-bold block">Account Name:</span> Bethesda Apostolic Church Chiwiriri
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-bold block">Account No:</span> 03326669640020
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-bold block">Branch Code:</span> Sapphire
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-bold block">Swift Code:</span> COBZZWHA
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-bold block">Reference:</span> Neniwo Project
              </p>
            </div>

            <p className="text-sm text-center text-gray-500">
              Thank you for your support! For any queries, please contact us.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
