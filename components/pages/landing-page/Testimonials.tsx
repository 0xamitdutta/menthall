'use client';
// import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
    { name: "Akshay Verma", course: "B.Tech CSE, IIT Bombay", text: "The conversation with Akshay completely blew me out of the water. Akshay is an amazing mentor and even offered to check some essays and resumes with me. I can't wait to book another session with him. You rock, Akshay!", avatar: "/profiles/profile1.jpg" },
    { name: "Isha Marry", course: "Consulting, IIM Ahmedabad", text: "Great chat with Isha. She helped me rethink about my approach to the college I'm visiting. I liked that she had articles & resources ready for me. The fact that she shared experiences & future conversations is also amazing.", avatar: "/profiles/profile2.jpg" },
    { name: "Sia Sharma", course: "General Medicine, AIIMS Delhi", text: "Great chat with Sia. She helped me rethink about my approach to the college I'm visiting. I liked that she had articles & resources ready for me. The fact that she shared experiences & future conversations is also amazing.", avatar: "/profiles/profile3.jpg" },
];

const Testimonials: React.FC = () => {
    // const [currentIndex, setCurrentIndex] = useState(0);

    // const nextSlide = () => {
    //     setCurrentIndex((prevIndex) =>
    //         prevIndex + 3 >= testimonials.length ? 0 : prevIndex + 1
    //     );
    // };

    // const prevSlide = () => {
    //     setCurrentIndex((prevIndex) =>
    //         prevIndex === 0 ? testimonials.length - 3 : prevIndex - 1
    //     );
    // };

    return (
        <section className="bg-background text-foreground py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-8 md:px-16">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">We value your opinion</h2>
                <div className="relative">
                    <div className="grid md:grid-cols-3 gap-8 justify-center">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-card p-6 rounded-lg border border-border shadow-sm flex flex-col">
                                <div className="flex-grow">
                                    <div className="flex items-center mb-4">
                                        <Image src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 rounded-full mr-4" width={40} height={40} />
                                        <div>
                                            <p className="font-bold text-card-foreground">{testimonial.name}</p>
                                            <p className="text-sm text-muted-foreground">{testimonial.course}</p>
                                        </div>
                                    </div>
                                    <p className="text-muted-foreground">&quot;{testimonial.text}&quot;</p>
                                </div>
                                <div className="flex items-center mt-6 pt-4 border-t border-border">
                                    <Image src={testimonial.avatar} alt="Mentor" className="w-8 h-8 rounded-full mr-3" width={32} height={32} />
                                    <div>
                                        <p className="text-sm font-semibold text-card-foreground">Pujia Regi</p>
                                        <p className="text-xs text-muted-foreground">B.Tech, Computer Science</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="absolute top-1/2 -translate-y-1/2 -left-4 bg-primary text-primary-foreground p-2 rounded-full shadow-lg hidden md:block hover:bg-primary/90 transition-colors"><ChevronLeft /></button>
                    <button className="absolute top-1/2 -translate-y-1/2 -right-4 bg-primary text-primary-foreground p-2 rounded-full shadow-lg hidden md:block hover:bg-primary/90 transition-colors"><ChevronRight /></button>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
