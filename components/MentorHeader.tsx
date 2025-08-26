import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MoreHorizontal } from 'lucide-react';

export const MentorHeader = () => (
    <div className="bg-white  shadow-sm">
      <div className="relative h-48  bg-gradient-to-r from-blue-400 to-indigo-500">
        <Image
          src="/mentor_dashboard_cover.jpeg"
          alt="Abstract blue banner"
          layout="fill"
          objectFit="cover"
          className=""
        />
      </div>
      <div className="relative p-6">
        <div className="absolute -top-16 left-22">
          <Avatar className="w-28 h-28 sm:w-32 sm:h-32 border-4 border-white shadow-lg">
            <AvatarImage src="https://i.pravatar.cc/150?u=rohan" alt="Rohan Mehta" />
            <AvatarFallback>RM</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex justify-end items-center space-x-2 pt-2">
          <Button variant="outline" size="icon">
            <Heart className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-4  ml-16 -top-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Rohan Mehta</h1>
          <p className="text-gray-600">IIT Bombay | Computer Science</p>
        </div>
      </div>
    </div>
);