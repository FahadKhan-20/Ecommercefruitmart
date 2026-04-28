'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Banners() {
  return (
    <div className="w-full mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full h-48 md:h-64 overflow-hidden rounded-3xl bg-gradient-to-r from-green-800 to-emerald-900 shadow-xl"
      >
        <Image
          src="/images/ai/fresh_fruits_banner_1777354303470.png"
          alt="Fresh Fruits Banner"
          fill
          className="object-cover opacity-60 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-md"
          >
            <span className="px-3 py-1 text-xs font-bold tracking-wider text-green-900 uppercase bg-green-400 rounded-full">
              Super Saver
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl font-black text-white leading-tight">
              Farm Fresh <br />
              <span className="text-green-400">Delivered</span>
            </h2>
            <p className="mt-2 text-green-50 font-medium md:text-lg">
              Get 20% off on your first fresh produce order.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
