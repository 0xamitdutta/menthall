import React from 'react';
import Image from 'next/image';

const HowItWorks: React.FC = () => {
    const steps = [
        {
            number: "1",
            title: "Create Account",
            description: "Easy sign-up with email or google. Set your profile in seconds and create your own account.",
            imageUrl: "/images/login.png",
            src: "/images/hero-create-account.png"
        },
        {
            number: "2",
            title: "Find Mentor",
            description: "Search for the right mentors and start the trial. All our mentors are 100% verified.",
            imageUrl: "/images/login.png",
            src: "/images/hero-find-mentor.png"
        },
        {
            number: "3",
            title: "Get Connected",
            description: "Book easy free trial sessions with your matched mentor and connect to get the right guidance.",
            imageUrl: "/images/login.png",
            src: "/images/hero-get-connected.png"
        }
    ];

    return (
        <section className="bg-background text-foreground py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-8 md:px-16">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How to get started?</h2>
                <div className="space-y-20">
                    {steps.map((step, index) => (
                        <div key={index} className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'md:grid-flow-col-dense' : ''}`}>
                            <div className={`flex items-start gap-6 ${index % 2 !== 0 ? 'md:col-start-2' : ''}`}>
                                <div className="text-8xl font-bold text-muted/30">{step.number}</div>
                                <div>
                                    <Image
                                        src={step.src}
                                        alt={step.title}
                                        width={700}
                                        height={100}
                                        className="mb-4"
                                    />
                                </div>
                            </div>
                            <div className={`bg-card p-4 rounded-lg border border-border shadow-sm ${index % 2 !== 0 ? 'md:col-start-1' : ''}`}>
                                <Image src={step.imageUrl} alt={step.title} className="w-full rounded-lg" width={400} height={300} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
