'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Search, X } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export default function LocationModal() {
  const { isLocationModalOpen, setLocationModalOpen, setLocation, location } = useAppStore();
  const [search, setSearch] = useState('');

  // Auto-open if no location is set
  useEffect(() => {
    if (!location && !isLocationModalOpen) {
      setLocationModalOpen(true);
    }
  }, [location, isLocationModalOpen, setLocationModalOpen]);

  const handleDetectLocation = () => {
    // In a real app, use Geolocation API
    // For now, simulate detection
    setTimeout(() => {
      setLocation('Koramangala, Bengaluru');
    }, 1000);
  };

  const handleManualSelect = (loc: string) => {
    setLocation(loc);
  };

  if (!isLocationModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-3xl"
        >
          {location && (
            <button
              onClick={() => setLocationModalOpen(false)}
              className="absolute p-2 text-gray-400 transition-colors bg-white rounded-full top-4 right-4 hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="p-6">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">Delivery Location</h2>
            <p className="mb-6 text-gray-500">Select your location to see fresh products available in your area.</p>

            <button
              onClick={handleDetectLocation}
              className="flex items-center justify-center w-full gap-2 p-4 mb-6 font-semibold text-green-700 transition-colors bg-green-50 border border-green-200 rounded-2xl hover:bg-green-100"
            >
              <Navigation className="w-5 h-5" />
              Detect my current location
            </button>

            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for your area..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full py-4 pl-12 pr-4 transition-shadow bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white"
              />
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-400 uppercase">Popular Areas</p>
              {['Indiranagar, Bengaluru', 'HSR Layout, Bengaluru', 'Whitefield, Bengaluru'].map((area) => (
                <button
                  key={area}
                  onClick={() => handleManualSelect(area)}
                  className="flex items-center w-full gap-3 p-3 transition-colors rounded-xl hover:bg-gray-50"
                >
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-left text-gray-700">{area}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
