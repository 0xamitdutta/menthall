'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

export default function MenteeOTPVerificationForm() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get('email');

  const handleResendOTP = async () => {
    setError('');
    setIsResending(true);

    if (!email) {
      setError("Email is not available. Please try again.");
      setIsResending(false);
      return;
    }
    
    try {
      const response = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to resend OTP.');
      }
      toast.success('A new OTP has been sent to your email.');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsResending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError("Missing email details. Please try again.");
      return;
    }

    setIsVerifying(true);

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp, email }),
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Invalid OTP');
      }

      toast.success("Your email has been verified!");
      router.push('/auth/login');

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
          OTP for <span className="font-semibold">{email}</span>
        </label>
        <div className="mt-1">
          <input
            id="otp"
            name="otp"
            type="text"
            placeholder="••••••"
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleResendOTP}
          disabled={isResending}
          className="text-sm font-medium text-blue-600 hover:text-blue-500 disabled:opacity-50"
        >
          {isResending ? 'Sending...' : 'Resend OTP'}
        </button>
      </div>

      <div>
        <button
          type="submit"
          disabled={isVerifying}
          className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg shadow-sm hover:bg-blue-700 disabled:opacity-50"
        >
          {isVerifying ? 'Verifying...' : 'Verify'}
        </button>
      </div>
    </form>
  );
}
