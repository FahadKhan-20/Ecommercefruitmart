'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Smartphone } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export default function AuthModal() {
  const { isAuthModalOpen, setAuthModalOpen, setAuthenticated } = useAppStore();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setStep('otp');
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 4) {
      setAuthenticated(true, { phone, name: 'Premium User' });
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-3xl"
        >
          <button
            onClick={() => setAuthModalOpen(false)}
            className="absolute z-10 p-2 text-gray-400 transition-colors bg-white rounded-full top-4 right-4 hover:bg-gray-100 hover:text-gray-600 shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Premium Header Graphic */}
          <div className="relative h-32 bg-gradient-to-br from-green-500 to-emerald-700 p-6 flex flex-col justify-end overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <h2 className="text-2xl font-bold text-white relative z-10">
              {step === 'phone' ? 'Welcome to MD FRESH' : 'Verify your number'}
            </h2>
            <p className="text-green-50 relative z-10 opacity-90 text-sm mt-1">
              {step === 'phone' ? 'Sign in to get premium groceries delivered.' : `Code sent to ${phone}`}
            </p>
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              {step === 'phone' ? (
                <motion.form
                  key="phone"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleSendOtp}
                  className="space-y-6"
                >
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
                    <div className="relative flex items-center">
                      <div className="absolute left-0 pl-4 text-gray-500 font-medium">+91</div>
                      <input
                        type="tel"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="Enter 10 digit number"
                        className="w-full py-4 pl-14 pr-4 transition-all bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white text-lg tracking-wide text-gray-900"
                        autoFocus
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={phone.length < 10}
                    className="flex items-center justify-center w-full py-4 font-bold text-white transition-all bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </button>
                </motion.form>
              ) : (
                <motion.form
                  key="otp"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleVerifyOtp}
                  className="space-y-6"
                >
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">One Time Password</label>
                    <input
                      type="text"
                      maxLength={4}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter 4 digit OTP"
                      className="w-full py-4 px-4 text-center text-2xl tracking-[1em] transition-all bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white text-gray-900"
                      autoFocus
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep('phone')}
                      className="px-6 py-4 font-bold text-gray-600 transition-all bg-gray-100 rounded-2xl hover:bg-gray-200"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={otp.length < 4}
                      className="flex-1 py-4 font-bold text-white transition-all bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Verify
                    </button>
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-4">
                    Didn't receive code? <button type="button" className="text-green-600 font-medium hover:underline">Resend OTP</button>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
