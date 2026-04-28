'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { MapPin, Search, ShoppingCart, User, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useAppStore } from '@/store/useAppStore';
import { useCartStore } from '@/store/cartStore';

export default function Navbar() {
  const { location, setLocationModalOpen, isAuthenticated, user, setAuthModalOpen, setCartDrawerOpen, searchQuery, setSearchQuery } = useAppStore();
  const { getTotalItems } = useCartStore();
  const [localQuery, setLocalQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const cartItemCount = getTotalItems();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localQuery);
    if (pathname !== '/') {
      router.push('/');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="container px-4 mx-auto md:px-6">
        <div className="flex items-center justify-between h-20 gap-4 md:gap-8">
          
          {/* Logo & Location (Left) */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Image src="/images/logo.png" alt="MD FRESH Logo" width={64} height={64} className="object-contain" />
              <div className="text-3xl font-black tracking-tight text-transparent bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text">
                MD FRESH
              </div>
            </div>

            <div className="hidden h-8 w-px bg-gray-200 md:block"></div>

            <button
              onClick={() => setLocationModalOpen(true)}
              className="hidden md:flex flex-col items-start hover:bg-gray-50 p-2 rounded-xl transition-colors"
            >
              <div className="flex items-center text-sm font-bold text-gray-900">
                Delivery in 10 minutes
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <span className="truncate max-w-[150px]">
                  {location || 'Select Location'}
                </span>
                <ChevronDown className="w-3 h-3 ml-1" />
              </div>
            </button>
          </div>

          {/* Search Bar (Center) */}
          <div className="flex-1 max-w-2xl hidden md:block">
            <form onSubmit={handleSearch} className="relative group">
              <input
                type="text"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                placeholder="Search 'mango' or 'spinach'..."
                className="w-full py-3 pl-4 pr-14 transition-all bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white text-sm text-gray-900"
              />
              <button 
                type="submit" 
                className="absolute inset-y-1 right-1 flex items-center justify-center w-10 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors shadow-sm"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Actions (Right) */}
          <div className="flex items-center gap-2 md:gap-4">
            {isAuthenticated ? (
              <button className="hidden md:flex items-center gap-2 px-4 py-2 font-medium text-gray-700 transition-colors rounded-xl hover:bg-gray-100">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
                  {user?.name?.[0] || 'U'}
                </div>
                <span className="text-sm">Profile</span>
              </button>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="hidden md:block px-4 py-2 text-sm font-bold text-gray-700 transition-colors rounded-xl hover:bg-gray-100"
              >
                Login
              </button>
            )}

            <button
              onClick={() => setCartDrawerOpen(true)}
              className="flex items-center gap-2 px-4 py-3 font-bold text-white transition-all bg-green-600 rounded-xl hover:bg-green-700 hover:shadow-md"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden md:inline">Cart</span>
              {cartItemCount > 0 && (
                <span className="px-2 py-0.5 text-xs bg-white text-green-700 rounded-md">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search and Location */}
        <div className="pb-4 md:hidden flex flex-col gap-3">
          <button
            onClick={() => setLocationModalOpen(true)}
            className="flex items-center gap-1 text-sm font-bold text-gray-900"
          >
            <MapPin className="w-4 h-4 text-green-600" />
            <span className="truncate max-w-[200px]">
              {location ? `Delivery to ${location}` : 'Select your location'}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="Search..."
              className="w-full py-3 pl-4 pr-14 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
            />
            <button 
              type="submit" 
              className="absolute inset-y-1 right-1 flex items-center justify-center w-10 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-sm"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
