'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';

export default function MentorOTPVerificationForm() {
  const [personalOtp, setPersonalOtp] = useState('');
  const [collegeOtp, setCollegeOtp] = useState('');
  const [error, setError] = useState('');
  const [isVerifyingPersonal, setIsVerifyingPersonal] = useState(false);
  const [isVerifyingCollege, setIsVerifyingCollege] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [personalOtpVerified, setPersonalOtpVerified] = useState(false);
  const [collegeOtpVerified, setCollegeOtpVerified] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get('email');
  const collegeEmail = searchParams?.get('collegeEmail');
  const { data: session } = useSession();

  useEffect(() => {
    // Fetch user's verification status when the component mounts
    const fetchStatus = async () => {
      if (session) {
        try {
          const response = await fetch('/api/auth/user-status');
          const data = await response.json();
          if (response.ok) {
            setPersonalOtpVerified(data.is_email_verified);
            setCollegeOtpVerified(data.is_college_email_verified);
          }
        } catch (error) {
          console.error("Failed to fetch user status:", error);
        }
      }
    };
    fetchStatus();
  }, [session]);

  const handleResendOTP = async (otpType: 'personal' | 'college') => {
    setError('');
    setIsResending(true);

    const targetEmail = otpType === 'personal' ? email : collegeEmail;

    if (!targetEmail) {
      setError("Email is not available. Please try again.");
      setIsResending(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: targetEmail }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to resend OTP.');
      }
      toast.success(`A new OTP has been sent to your ${otpType} email.`);
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

  const handleSubmit = async (otpType: 'personal' | 'college') => {
    setError('');

    const targetEmail = otpType === 'personal' ? email : collegeEmail;
    const otp = otpType === 'personal' ? personalOtp : collegeOtp;

    if (!targetEmail) {
      setError("Missing email details. Please try again.");
      return;
    }

    if (otpType === 'personal') setIsVerifyingPersonal(true);
    else setIsVerifyingCollege(true);

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp, email: targetEmail }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Invalid OTP');
      }

      toast.success(`Your ${otpType} email has been verified!`);
      if (otpType === 'personal') {
        setPersonalOtpVerified(true);
      }
      else {
        setCollegeOtpVerified(true);
        router.push('/auth/mentor-availability');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      if (otpType === 'personal') setIsVerifyingPersonal(false);
      else setIsVerifyingCollege(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {email && (
          <div>
            <label htmlFor="personal-otp" className="block text-sm font-medium text-gray-700">
              Personal Email OTP for <span className="font-semibold">{email}</span>
            </label>
            <div className="mt-1 flex items-center space-x-2">
              <input
                id="personal-otp"
                name="personal-otp"
                type="text"
                placeholder="••••••"
                required
                value={personalOtp}
                onChange={(e) => setPersonalOtp(e.target.value)}
                className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-lg shadow-sm"
                disabled={personalOtpVerified}
              />
              <button
                type="button"
                onClick={() => handleSubmit('personal')}
                disabled={isVerifyingPersonal || personalOtpVerified}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg shadow-sm hover:bg-blue-700 disabled:opacity-50"
              >
                {isVerifyingPersonal ? '...' : (personalOtpVerified ? 'Verified' : 'Verify')}
              </button>
            </div>
            {!personalOtpVerified && (
              <div className="flex items-center justify-end mt-2">
                <button
                  type="button"
                  onClick={() => handleResendOTP('personal')}
                  disabled={isResending}
                  className="text-sm font-medium text-blue-600 hover:text-blue-500 disabled:opacity-50"
                >
                  {isResending ? 'Sending...' : 'Resend OTP'}
                </button>
              </div>
            )}
          </div>
        )}

        {collegeEmail && (
          <div>
            <label htmlFor="college-otp" className="block text-sm font-medium text-gray-700">
              College Email OTP for <span className="font-semibold">{collegeEmail}</span>
            </label>
            <div className="mt-1 flex items-center space-x-2">
              <input
                id="college-otp"
                name="college-otp"
                type="text"
                placeholder="••••••"
                required
                value={collegeOtp}
                onChange={(e) => setCollegeOtp(e.target.value)}
                className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-lg shadow-sm"
                disabled={collegeOtpVerified}
              />
              <button
                type="button"
                onClick={() => handleSubmit('college')}
                disabled={isVerifyingCollege || collegeOtpVerified}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg shadow-sm hover:bg-blue-700 disabled:opacity-50"
              >
                {isVerifyingCollege ? '...' : (collegeOtpVerified ? 'Verified' : 'Verify')}
              </button>
            </div>
            {!collegeOtpVerified && (
                <div className="flex items-center justify-end mt-2">
                <button
                    type="button"
                    onClick={() => handleResendOTP('college')}
                    disabled={isResending}
                    className="text-sm font-medium text-blue-600 hover:text-blue-500 disabled:opacity-50"
                >
                    {isResending ? 'Sending...' : 'Resend OTP'}
                </button>
                </div>
            )}
          </div>
        )}
      </div>
      
      {error && <p className="text-sm text-red-600 text-center">{error}</p>}
      
      {(personalOtpVerified || collegeOtpVerified) && !collegeEmail && (
        <Button
            onClick={() => router.push('/dashboard')}
            className="w-full rounded-lg bg-green-600 hover:bg-green-700 text-white"
        >
            Continue to Dashboard
        </Button>
      )}
    </div>
  );
}
