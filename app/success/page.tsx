'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Check, Package, MapPin, Clock } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export default function SuccessPage() {
  const router = useRouter();
  const { location } = useAppStore();

  useEffect(() => {
    // Basic confetti effect could go here, omitting for simplicity
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="bg-white rounded-[2rem] shadow-2xl p-8 max-w-md w-full text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-green-400/20 to-transparent"></div>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto flex items-center justify-center shadow-lg shadow-green-500/30 mb-6 relative z-10"
        >
          <Check className="w-12 h-12 text-white stroke-[3]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-3xl font-black text-gray-900 mb-2">Order Placed!</h1>
          <p className="text-gray-500 font-medium mb-8">
            Your fresh groceries are being packed and will reach you shortly.
          </p>

          <div className="bg-gray-50 rounded-2xl p-5 mb-8 text-left space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <Clock className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Arriving in</p>
                <p className="font-bold">10 Minutes</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <MapPin className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Delivery Address</p>
                <p className="font-bold truncate max-w-[200px]">{location || 'Your selected location'}</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => router.push('/')}
            className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
          >
            Back to Home
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
