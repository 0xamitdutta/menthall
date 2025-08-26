'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const profiles = [
  {
    name: "Kriti Verma",
    description: "Biotechnology at IIT Guwahati",
    img: "/profiles/profile1.jpg"
  },
  {
    name: "Rahul Singh",
    description: "Medicine at AIIMS Delhi",
    img: "/profiles/profile2.jpg"
  },
  {
    name: "Rahul Singh",
    description: "Computer Science at IIT Bombay",
    img: "/profiles/profile3.jpg"
  }
];

const Hero: React.FC = () => {
  const [currentProfile, setCurrentProfile] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentProfile((prev) => (prev + 1) % profiles.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className='h-[60vh]'>
      <div className="mx-auto flex flex-col md:flex-row items-center justify-between gap-8 bg-blue-50 px-4 py-8 rounded-lg h-full w-full">
        {/* Left Section */}
        <div className="flex-1 text-center">
          <Tabs defaultValue="mentee" className="w-[400px] mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="mentee" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >Mentee</TabsTrigger>
              <TabsTrigger value="mentor" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >Mentor</TabsTrigger>
            </TabsList>
            <TabsContent value="mentee">
              <div className='flex flex-col items-center'>
                <h1 className="mt-8 text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Connect, Learn, and Succeed with Menthall
                </h1>
                <p className="text-muted-foreground mb-8">
                  Chart Your Future with Guidance from Today&apos;s College Stars!
                </p>
              </div>
            </TabsContent>
            <TabsContent value="mentor">
              <div className='flex flex-col items-center'>
                <h1 className="mt-8 text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Turn Your Insights into Impact: Mentor With Comen
                </h1>
                <p className="text-muted-foreground mb-8">
                  Guide Aspiring Students and Shape Future Leaders!
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        {/* Right Section */}
        <div className="flex-1 flex justify-center relative h-[90%] w-[80%]">
          {profiles.map((profile, index) => (
            <div
              key={index}
              className={`absolute transition-all duration-500 ease-in-out h-full w-full ${currentProfile === index
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-[100px]"
                }`}
            >
              <Image
                src={profile.img}
                alt={profile.name}
                fill
                className="object-cover rounded-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent rounded-b-2xl">
                <h3 className="text-white text-xl font-semibold">{profile.name}</h3>
                <p className="text-white/90">{profile.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;