import React from 'react';
import Image from 'next/image';

interface ProfileCardProps {
  name: string;
  description: string;
  img: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, description, img }) => (
  <div className="relative rounded-2xl overflow-hidden shadow-lg bg-card w-full max-w-md">
    <Image
      src={img}
      alt={name}
      width={500}
      height={350}
      className="object-cover w-full h-72"
    />
    <div className="absolute bottom-0 left-0 w-full bg-card/90 px-6 py-4 backdrop-blur-sm">
      <div className="font-semibold text-card-foreground">{name}</div>
      <div className="text-muted-foreground text-sm">{description}</div>
    </div>
  </div>
);

export default ProfileCard; 