'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { toast } from 'sonner';

export default function RoleSelectionForm() {
  const router = useRouter();
  const { data: session, update } = useSession();

  const handleRoleSelection = async (selectedRole: string) => {
    if (selectedRole === 'mentee') {
      try {
        const response = await fetch('/api/update-role', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ role: 'mentee', userId: session?.user?.id }),
        });

        if (response.ok) {
          await update({ bio: 'mentee', is_mentor: false });
          toast.success("Your role has been set. Welcome!");
          router.push('/search-mentors');
        } else {
          toast.error('Failed to update your role. Please try again.');
        }
      } catch {
        toast.error('An unexpected error occurred. Please try again.');
      }
    } else if (selectedRole === 'mentor') {
      router.push('/auth/mentor-details');
    }
  };

  return (
    <div className="space-y-4">
      <Card
        onClick={() => handleRoleSelection('mentor')}
        className="flex cursor-pointer flex-row items-center gap-4 rounded-4xl border-0 p-6 shadow-xl hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <Image src="/images/mentor.png" alt="Mentor" width={60} height={60} className="rounded-full" />
        <div>
            <h3 className="font-bold text-left">Mentor</h3>
            <p className="text-sm text-gray-500 text-left">Guide and inspire others.</p>
        </div>
      </Card>
      <Card
        onClick={() => handleRoleSelection('mentee')}
        className="flex cursor-pointer flex-row items-center gap-4 rounded-4xl border-0 p-6 shadow-xl hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <Image src="/images/mentee.png" alt="Mentee" width={60} height={60} className="rounded-full" />
        <div>
            <h3 className="font-bold text-left">Mentee</h3>
            <p className="text-sm text-gray-500 text-left">Learn and grow with a mentor.</p>
        </div>
      </Card>
    </div>
  );
}
