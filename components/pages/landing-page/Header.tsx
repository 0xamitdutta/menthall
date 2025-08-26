import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => (
  <header className="bg-blue-50 text-card-foreground py-4 px-4 sm:px-8 md:px-16 flex justify-between items-center border-b border-border shadow-sm">
    <div className="flex items-center">
      <Image
        src="/logos/menthall-logo.png"
        alt="Manthall Logo"
        width={40}
        height={20}
        className="object-contain"
      />
    </div>
    <nav className="flex items-center space-x-4">
      <Link href={'/auth/login'} className='cursor-pointer' passHref={true}>
        <Button className="rounded-lg bg-white hover:bg-gray-100 text-blue-600 font-semibold px-4 py-2 transition-colors shadow-sm cursor-pointer">
          Login
        </Button>
      </Link>

      <Link href={'/auth/signup'} className='cursor-pointer' passHref={true}>
        <Button className="rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 transition-colors shadow-sm cursor-pointer">
          Sign Up
        </Button>
      </Link>
    </nav>
  </header>
);

export default Header; 