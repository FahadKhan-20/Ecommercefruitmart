'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ArrowRight, Loader2, Leaf } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) return;

    setLoading(true);
    setError(null);

    const fullPhoneNumber = `+91${phone}`;

    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: fullPhoneNumber,
      });

      if (error) {
        throw error;
      }

      // Store phone number in sessionStorage to use on the verify page
      sessionStorage.setItem('verifyPhone', fullPhoneNumber);
      
      // Redirect to verification page
      router.push('/verify');
    } catch (err: any) {
      console.error('Error sending OTP:', err);
      setError(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-amber-50/50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-white/40">
        
        {/* Premium Header Graphic */}
        <div className="relative h-40 bg-gradient-to-br from-green-600 to-emerald-700 p-8 flex flex-col justify-end overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl -ml-10 -mb-10"></div>
          
          <div className="relative z-10 flex items-center gap-3 mb-2">
            <div className="bg-white p-2 rounded-xl shadow-sm">
              <Image src="/images/logo.png" alt="Logo" width={28} height={28} className="object-contain" />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">MD FRESH</h2>
          </div>
          <p className="text-green-50 relative z-10 opacity-90 text-sm font-medium">
            Sign in for premium farm-fresh deliveries.
          </p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-bold text-gray-700">Mobile Number</label>
              <div className="relative flex items-center shadow-sm rounded-2xl group">
                <div className="absolute left-0 pl-4 flex items-center gap-2 pointer-events-none">
                  <span className="text-gray-500 font-bold border-r border-gray-200 pr-3">+91</span>
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 10 digit number"
                  className="w-full py-4 pl-16 pr-4 transition-all bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 focus:bg-white text-lg tracking-wide font-medium text-gray-900 placeholder:font-normal placeholder:text-gray-400"
                  autoFocus
                  disabled={loading}
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-500 font-medium">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={phone.length < 10 || loading}
              className="relative flex items-center justify-center w-full py-4 font-bold text-white transition-all duration-300 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl hover:shadow-[0_8px_20px_-6px_rgba(5,150,105,0.5)] disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  <>
                    Get OTP
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </span>
              <div className="absolute inset-0 h-full w-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:animate-shimmer" />
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs font-medium text-gray-500 flex items-center justify-center gap-1">
              <Leaf className="w-3 h-3 text-green-500" />
              100% Farm Fresh Guarantee
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
