import React from 'react';
import Image from 'next/image';

const profiles = [
  {
    name: 'Akshay Verma',
    role: 'Mentor',
    college: 'IIT Bombay',
    img: '/profiles/profile1.jpg',
  },
  {
    name: 'Isha Marry',
    role: 'Mentee',
    college: 'IIT Delhi',
    img: '/profiles/profile2.jpg',
  },
  {
    name: 'Sia Sharma',
    role: 'Mentor',
    college: 'AIIMS Delhi',
    img: '/profiles/profile3.jpg',
  },
  {
    name: 'Pujia Regi',
    role: 'Mentee',
    college: 'BITS Pilani',
    img: '/profiles/profile4.jpg',
  },
];

const ProfileCardCarousel: React.FC = () => (
  <div className="flex space-x-6 overflow-x-auto py-4 px-2 scrollbar-hide">
    {profiles.map((profile, idx) => (
      <div
        key={idx}
        className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-md min-w-[220px] max-w-[220px] flex-shrink-0 flex flex-col items-center p-4"
      >
        <div className="w-20 h-20 mb-3 relative">
          <Image
            src={profile.img}
            alt={profile.name}
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
        </div>
        <div className="text-center">
          <h3 className="font-bold text-lg text-white mb-1">{profile.name}</h3>
          <p className="text-blue-400 text-xs font-semibold mb-1">{profile.role}</p>
          <p className="text-zinc-400 text-xs">{profile.college}</p>
        </div>
      </div>
    ))}
  </div>
);

export default ProfileCardCarousel; 