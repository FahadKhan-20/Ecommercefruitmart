'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import CategorySidebar from '@/components/CategorySidebar';
import Banners from '@/components/Banners';
import Navbar from '@/components/Navbar';
import { useAppStore } from '@/store/useAppStore';
import { Product } from '@/types/product';

const categories = [
  { id: '1', name: 'Fruits', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=400&fit=crop' },
  { id: '2', name: 'Vegetables', image: '/images/categories/vegetables.jpg' },
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('Fruits');
  const { searchQuery, setSearchQuery } = useAppStore();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all products ONCE from Supabase
  useEffect(() => {
    let isMounted = true;
    const getAllProducts = async () => {
      setIsLoading(true);
      const { fetchProducts } = await import('@/lib/services/productService');
      const data = await fetchProducts();
      
      console.log(`[Supabase Fetch] Fetched ${data.length} total products from database.`);
      
      if (isMounted) {
        setAllProducts(data);
        setIsLoading(false);
      }
    };
    getAllProducts();
    return () => { isMounted = false; };
  }, []); // Empty dependency array means it runs once on mount

  // Filter locally for instant tab switching
  const products = allProducts.filter((product) => {
    if (searchQuery) {
      return product.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return product.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-amber-50/50 flex flex-col">
      <Navbar />
      <main className="flex-1 relative z-10">
        <div className="container px-4 py-8 mx-auto md:px-6">
          <div className="flex flex-col gap-8 md:flex-row">
            
            {/* Sidebar (Desktop) */}
            <aside className="hidden md:block w-64 shrink-0">
              <div className="sticky top-28 bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <h2 className="mb-4 text-sm font-black text-green-900 uppercase tracking-widest opacity-80">
                  Categories
                </h2>
                <CategorySidebar
                  categories={categories}
                  selectedCategory={searchQuery ? '' : selectedCategory}
                  onSelectCategory={(cat) => {
                    setSelectedCategory(cat);
                    setSearchQuery(''); // clear search when clicking category
                  }}
                />
              </div>
            </aside>

            {/* Mobile Categories (Horizontal Scroll) */}
            <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
              <div className="flex gap-3 w-max">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.name);
                      setSearchQuery('');
                    }}
                    className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap shadow-sm border ${
                      (!searchQuery && selectedCategory === category.name)
                        ? 'bg-green-600 text-white border-green-600'
                        : 'bg-white/60 backdrop-blur-md text-gray-700 border-white/80 hover:bg-white/90'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {!searchQuery && <Banners />}

              <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                  {searchQuery ? `Search Results for "${searchQuery}"` : selectedCategory}
                </h1>
                <span className="px-3 py-1 bg-white/60 backdrop-blur-md border border-white/60 text-sm font-bold text-green-800 rounded-full shadow-sm">
                  {products.length} items
                </span>
              </div>

              <motion.div 
                layout 
                className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {isLoading ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="col-span-full py-20 flex justify-center items-center"
                    >
                      <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                    </motion.div>
                  ) : products.length > 0 ? (
                    products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="col-span-full py-20 text-center bg-white/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-sm"
                    >
                      <p className="text-lg font-bold text-gray-500">No products found.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}
