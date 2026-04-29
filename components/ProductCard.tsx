'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Plus, Minus } from 'lucide-react';
import { Product } from '@/types/product';
import { useCartStore } from '@/store/cartStore';

export default function ProductCard({ product }: { product: Product }) {
  const { items, addItem, updateQuantity } = useCartStore();
  
  // Find if this product is in cart
  const cartItem = items.find((item) => item.product.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const isOutOfStock = product.status === 'Out of Stock' || product.stock === 0;

  // Image source logic
  const imageSrc = product.image;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group relative flex flex-col h-full bg-white/60 backdrop-blur-xl rounded-[2rem] border border-white/80 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] hover:bg-white/80 overflow-hidden"
    >
      <div className="relative w-full aspect-square p-3">
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="px-2.5 py-1 text-[10px] font-black tracking-wider text-white bg-green-600 rounded-lg shadow-sm">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </span>
          )}
        </div>

        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-50">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 pt-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-black tracking-widest text-green-700/60 uppercase">
            {product.category}
          </span>
          <span className="text-xs font-bold text-gray-400 bg-white/50 px-2 py-0.5 rounded-full">
            {product.unit}
          </span>
        </div>

        <h3 className="text-lg font-black text-gray-900 leading-tight mb-1 group-hover:text-green-800 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4 flex-1">
          {product.description}
        </p>

        <div className="mt-auto pt-3 flex items-center justify-between border-t border-gray-100/50">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through font-semibold mb-0.5">
                ₹{product.originalPrice}
              </span>
            )}
            <span className="text-xl font-black text-gray-900 tracking-tight">
              ₹{product.price}
            </span>
          </div>

          <div className="relative z-10">
            {isOutOfStock ? (
              <div className="flex items-center justify-center px-4 h-10 text-xs font-bold text-gray-500 bg-gray-100 rounded-2xl border border-gray-200 cursor-not-allowed">
                Out of Stock
              </div>
            ) : quantity === 0 ? (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={(e) => { e.preventDefault(); addItem(product); }}
                className="flex items-center justify-center w-10 h-10 text-green-700 transition-all bg-green-50 rounded-2xl hover:bg-green-600 border border-green-200 hover:border-green-600 group/btn shadow-sm hover:shadow-md"
              >
                <Plus className="w-5 h-5 transition-colors group-hover/btn:text-white" />
              </motion.button>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 bg-green-600 text-white rounded-2xl p-1 shadow-lg shadow-green-600/20"
              >
                <button
                  onClick={(e) => { e.preventDefault(); updateQuantity(product.id, quantity - 1); }}
                  className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-bold text-sm min-w-[1.5ch] text-center">
                  {quantity}
                </span>
                <button
                  onClick={(e) => { e.preventDefault(); updateQuantity(product.id, quantity + 1); }}
                  className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
