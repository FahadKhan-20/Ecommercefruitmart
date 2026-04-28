'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { useAppStore } from '@/store/useAppStore';
import { MapPin, CreditCard, ChevronLeft, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { location } = useAppStore();

  const total = getTotalPrice();
  const deliveryFee = total > 0 ? (total > 500 ? 0 : 40) : 0;
  const finalTotal = total + deliveryFee;

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      clearCart();
      router.push('/success');
    }, 1000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold"
        >
          Go Back Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 font-medium"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>

        <h1 className="text-3xl font-black text-gray-900 mb-8">Checkout</h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            
            {/* Delivery Address */}
            <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Delivery Address</h2>
              </div>
              <div className="pl-13 border-l-2 border-gray-100 ml-5 py-2">
                <p className="text-gray-900 font-medium">{location || 'Koramangala, Bengaluru'}</p>
                <p className="text-gray-500 text-sm mt-1">Delivery in 10 minutes</p>
                <button className="mt-3 text-sm text-green-600 font-bold">Change</button>
              </div>
            </section>

            {/* Order Items */}
            <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Items ({items.length})</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4 border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                    <div className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden relative">
                       <Image
                          src={item.product.image || 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=400&fit=crop'}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                      <p className="text-sm text-gray-500">{item.product.unit} x {item.quantity}</p>
                    </div>
                    <div className="font-bold text-gray-900">
                      ₹{item.product.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Payment Summary */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-28">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Summary</h2>
              
              <div className="space-y-4 mb-6">
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
                
                <div className="pt-4 border-t border-dashed border-gray-200">
                  <div className="flex justify-between text-lg font-black text-gray-900">
                    <span>Grand Total</span>
                    <span>₹{finalTotal}</span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePayment}
                className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Pay ₹{finalTotal}
              </motion.button>
              
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400 font-medium">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                Safe & Secure Payments
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
