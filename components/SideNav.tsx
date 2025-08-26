"use client"

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { User, Search, Calendar } from 'lucide-react'

const navItems = [
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Find Mentor', href: '/search-mentors', icon: Search },
  { name: 'Bookings', href: '/bookings', icon: Calendar },
]

export default function SideNav() {
  const pathname = usePathname()

  return (
    <nav className="bg-blue-50 min-w-32 max-w-32 min-h-full flex flex-col items-center py-8">
      <div className="mb-8">
        <Link href="/">
          <Image src="/logo.png" alt="menthall_Logo" width={50} height={50} className="rounded-full" />
        </Link>

      </div>
      <ul className="flex-1 w-full space-y-6">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link href={item.href}
              className={`flex flex-col items-center justify-center text-center w-full h-16 text-gray-500 hover:text-blue-500 ${item.href === pathname ? 'bg-white' : 'text-gray-500'}`}
            >
              <item.icon size={24} />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}