import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const BecomeMentor: React.FC = () => (
    <section className="bg-background text-foreground py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-8 md:px-16">
            <div className="bg-card rounded-lg grid md:grid-cols-2 items-center overflow-hidden border border-border shadow-lg">
                <div className="p-8 md:p-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">Share Your College Journey and Make a Difference :</h2>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Become a Mentor</h2>
                    <ul className="space-y-3 text-muted-foreground list-disc list-inside mb-8">
                        <li>Earn and build your career as a mentor, start from college.</li>
                        <li>Voice your passion, impact the lives of young aspirants.</li>
                        <li>Add mentorship experience to your resume, showcasing your leadership skills.</li>
                    </ul>
                    <Link href="/auth/signup" className="w-full">
                        <Button
                            type="submit"
                            className="w-full rounded-lg bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                        >
                            Get Started
                        </Button>
                    </Link>

                </div>
                <div className="h-64 md:h-full">
                    <Image width={600} height={400} src="/college-activities/act2.jpeg" alt="Group of mentors" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    </section>
);

export default BecomeMentor;
