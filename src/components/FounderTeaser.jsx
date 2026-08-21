'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function FounderTeaser() {
  return (
    <section id="founder" className="section bg-gray-50">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            className="lg:w-1/2 relative w-full h-[350px] sm:h-[400px] lg:h-[480px] rounded-2xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/images/18.jpg"
              alt="Placeholder portrait — to be replaced with a real photo of Arch Bishop Loveless Manhango"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
              Our Founder
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Arch Bishop <span className="text-blue-600">Loveless Manhango</span>
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              In September 1952, while working on a farm in Chegutu, Arch Bishop Loveless
              Manhango was called by God through a voice and fourteen visions — of judgment,
              of mercy, and of a commission to preach. He left his job that same week and
              never turned back.
            </p>
            <Link
              href="/founder"
              className="btn btn-primary inline-flex items-center justify-center transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-700"
            >
              Read His Story
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
