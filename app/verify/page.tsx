'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAppStore } from '@/store/useAppStore';
import { ArrowRight, Loader2, ArrowLeft, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

export default function VerifyPage() {
  const [otp, setOtp] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(30);
  const router = useRouter();
  
  // Update local Zustand store
  const { setAuthenticated } = useAppStore();

  useEffect(() => {
    // Retrieve phone number from session storage
    const storedPhone = sessionStorage.getItem('verifyPhone');
    if (!storedPhone) {
      router.push('/login');
    } else {
      setPhone(storedPhone);
    }
  }, [router]);

  useEffect(() => {
    // Simple resend timer
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone,
        token: otp,
        type: 'sms',
      });

      if (error) {
        throw error;
      }

      // If successful, update local store and redirect
      if (data.session) {
        setAuthenticated(true, { phone, name: 'Premium User' });
        router.push('/');
      }
    } catch (err: any) {
      console.error('Error verifying OTP:', err);
      setError(err.message || 'Invalid code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone,
      });

      if (error) throw error;
      setResendTimer(30); // Reset timer
    } catch (err: any) {
      setError(err.message || 'Failed to resend OTP.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-amber-50/50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-white/40">
        
        {/* Premium Header Graphic */}
        <div className="relative h-40 bg-gradient-to-br from-green-600 to-emerald-700 p-8 flex flex-col justify-end overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
          <button 
            onClick={() => router.push('/login')}
            className="absolute top-6 left-6 p-2 bg-white/20 hover:bg-white/30 transition-colors rounded-full text-white backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="relative z-10 flex items-center gap-3 mb-2">
            <div className="bg-white p-2 rounded-xl shadow-sm">
               <ShieldCheck className="w-7 h-7 text-green-600" />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">Verify Number</h2>
          </div>
          <p className="text-green-50 relative z-10 opacity-90 text-sm font-medium">
            Code sent to <span className="font-bold">{phone}</span>
          </p>
        </div>

        <div className="p-8">
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-bold text-gray-700">6-Digit Code</label>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="• • • • • •"
                className="w-full py-4 px-4 text-center text-3xl tracking-[0.5em] font-bold text-gray-800 transition-all bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 focus:bg-white placeholder:text-gray-300 placeholder:font-normal placeholder:tracking-[0.2em]"
                autoFocus
                disabled={loading}
              />
              {error && (
                <p className="mt-3 text-sm text-center text-red-500 font-medium">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={otp.length < 6 || loading}
              className="relative flex items-center justify-center w-full py-4 font-bold text-white transition-all duration-300 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl hover:shadow-[0_8px_20px_-6px_rgba(5,150,105,0.5)] disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    Secure Login
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </span>
              <div className="absolute inset-0 h-full w-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:animate-shimmer" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm font-medium text-gray-600">
              Didn't receive the code?{' '}
              <button 
                type="button" 
                onClick={handleResendOtp}
                disabled={resendTimer > 0}
                className={`font-bold transition-colors ${resendTimer > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-green-600 hover:text-green-700'}`}
              >
                {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
