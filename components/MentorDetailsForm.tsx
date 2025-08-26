'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronsUpDown } from 'lucide-react';
import universities from '@/lib/universities.json';
import { User } from 'next-auth';

interface CustomUser extends User {
  password?: string | null;
}

export default function MentorDetailsForm() {
  const [collegeEmail, setCollegeEmail] = useState('');
  const [university, setUniversity] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [showOtherFields, setShowOtherFields] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [isSSOUser, setIsSSOUser] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user as CustomUser | undefined;
  const [emailDomainError, setEmailDomainError] = useState('');

  useEffect(() => {
    if (user?.id && !user.password) {
      setIsSSOUser(true);
    }
  }, [user]);

  const handleUniversitySelect = (selectedUniversity: string) => {
    setUniversity(selectedUniversity);
    setCollegeEmail('');
    setEmailDomainError('');
    if (selectedUniversity === 'Other') {
      setShowOtherFields(true);
    } else {
      setShowOtherFields(false);
    }
    setOpen(false);
  };
  
  const handleCollegeEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setCollegeEmail(email);
    
    if (university && university !== 'Other') {
      const selectedUniversity = universities.find(u => u.name === university);
      if (selectedUniversity) {
        const emailDomain = email.split('@')[1];
        if (emailDomain && !selectedUniversity.domains.includes(emailDomain)) {
          setEmailDomainError('The email domain does not match the selected university.');
        } else {
          setEmailDomainError('');
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!user?.id) {
        setError('You must be logged in to continue.');
        setIsSubmitting(false);
        return;
    }

    const payload = {
      userId: user.id,
      university,
      collegeEmail,
      linkedinUrl: showOtherFields ? linkedinUrl : undefined,
    };

    try {
      const response = await fetch('/api/auth/mentor-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to process request.');
      }

      if (showOtherFields) {
        toast.success('Your request has been submitted for review.');
        router.push('/auth/mentor-availability');
      } else {
        toast.success('A verification OTP has been sent to your college email.');
        if (isSSOUser) {
          router.push(`/auth/verify-college-email?collegeEmail=${encodeURIComponent(payload.collegeEmail)}`);
        } else {
          router.push(`/auth/verify-otp?email=${encodeURIComponent(user.email!)}&collegeEmail=${encodeURIComponent(payload.collegeEmail)}`);
        }
      }

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    router.push('/auth/mentor-availability');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="university">School/University</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {university || "Select university..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
            <Command>
              <CommandInput placeholder="Search university..." />
              <CommandEmpty>No university found.</CommandEmpty>
              <CommandGroup>
                {(universities as {name: string, domains: string[]}[]).map((uni, i) => (
                  <CommandItem
                    key={uni.name + i}
                    onSelect={() => handleUniversitySelect(uni.name)}
                  >
                    {uni.name}
                  </CommandItem>
                ))}
                <CommandItem key="other" onSelect={() => handleUniversitySelect('Other')}>
                  Other
                </CommandItem>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      
      {university && !showOtherFields && (
        <div>
            <Label htmlFor="collegeEmail">College Email</Label>
            <Input
              id="collegeEmail"
              name="collegeEmail"
              type="email"
              placeholder="mentor@university.edu"
              required
              value={collegeEmail}
              onChange={handleCollegeEmailChange}
            />
            {emailDomainError && <p className="text-sm text-red-600 mt-1">{emailDomainError}</p>}
        </div>
      )}

      {showOtherFields && (
        <>
          <div>
            <Label htmlFor="unlistedCollegeEmail">Unlisted College Email</Label>
            <Input
              id="unlistedCollegeEmail"
              name="unlistedCollegeEmail"
              type="email"
              placeholder="mentor@university.edu"
              required
              value={collegeEmail}
              onChange={(e) => setCollegeEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="linkedinUrl">LinkedIn Profile URL</Label>
            <Input
              id="linkedinUrl"
              name="linkedinUrl"
              type="url"
              placeholder="https://www.linkedin.com/in/your-profile"
              required
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
            />
          </div>
        </>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex flex-col space-y-2">
        <Button
          type="submit"
          disabled={isSubmitting || !university || !!emailDomainError}
          className="w-full rounded-lg"
        >
          {isSubmitting ? 'Submitting...' : (showOtherFields ? 'Submit for Review' : 'Get OTP')}
        </Button>
        <Button
            type="button"
            variant="ghost"
            onClick={handleSkip}
            className="w-full rounded-lg"
        >
            Skip for now
        </Button>
      </div>
    </form>
  );
}
