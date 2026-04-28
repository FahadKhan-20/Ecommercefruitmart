'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CartDrawer() {
  const { isCartDrawerOpen, setCartDrawerOpen } = useAppStore();
  const { items, updateQuantity, getTotalPrice, removeItem } = useCartStore();
  const router = useRouter();

  if (!isCartDrawerOpen) return null;

  const total = getTotalPrice();
  const deliveryFee = total > 0 ? (total > 500 ? 0 : 40) : 0;
  const finalTotal = total + deliveryFee;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setCartDrawerOpen(false)}
          className="absolute inset-0"
        />
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
            <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
              <ShoppingBag className="w-5 h-5 text-green-600" />
              My Cart
            </h2>
            <button
              onClick={() => setCartDrawerOpen(false)}
              className="p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50/50">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500">
                <ShoppingBag className="w-16 h-16 text-gray-200 mb-4" />
                <p className="text-lg font-medium text-gray-900">Your cart is empty</p>
                <p className="text-sm mt-1">Add items to start building your cart</p>
                <button
                  onClick={() => setCartDrawerOpen(false)}
                  className="mt-6 px-6 py-2 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-colors"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm"
                  >
                    <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden relative border border-gray-100">
                      <Image
                        src={item.product.image || 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=400&fit=crop'}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 line-clamp-1">{item.product.name}</h3>
                        <p className="text-sm text-gray-500">{item.product.unit}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-gray-900">₹{item.product.price}</span>
                        <div className="flex items-center gap-3 bg-green-50 rounded-lg p-1 border border-green-100">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center rounded-md bg-white text-green-700 shadow-sm hover:bg-green-100 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-semibold text-green-800 text-sm w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center rounded-md bg-green-600 text-white shadow-sm hover:bg-green-700 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer / Bill */}
          {items.length > 0 && (
            <div className="p-4 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
              <div className="space-y-3 mb-4 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Item Total</span>
                  <span className="font-medium text-gray-900">₹{total}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  {deliveryFee === 0 ? (
                    <span className="font-medium text-green-600">FREE</span>
                  ) : (
                    <span className="font-medium text-gray-900">₹{deliveryFee}</span>
                  )}
                </div>
                {deliveryFee > 0 && total < 500 && (
                  <p className="text-xs text-green-600 bg-green-50 p-2 rounded-lg">
                    Add ₹{500 - total} more to get free delivery!
                  </p>
                )}
              </div>
              
              <button
                onClick={() => {
                  setCartDrawerOpen(false);
                  router.push('/checkout');
                }}
                className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
              >
                <div className="flex flex-col items-start">
                  <span className="text-xs text-green-100 uppercase tracking-wider font-semibold">Total to pay</span>
                  <span className="text-xl">₹{finalTotal}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl">
                  Checkout
                  <ArrowRight className="w-5 h-5" />
                </div>
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
