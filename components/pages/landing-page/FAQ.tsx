import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-border py-4 bg-card">
            <button
                className="w-full flex justify-between items-center text-left hover:bg-muted/50 transition-colors p-2 rounded"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="font-semibold text-card-foreground">{question}</h3>
                {isOpen ? <Minus size={20} className="text-muted-foreground" /> : <Plus size={20} className="text-muted-foreground" />}
            </button>
            {isOpen && <p className="text-muted-foreground mt-3 px-2">{answer}</p>}
        </div>
    );
};

const FAQ: React.FC = () => {
    const faqs = [
        { q: "What is Menthall?", a: "Menthall is a platform that connects students with experienced college mentors for guidance on college applications, career choices, and more." },
        { q: "Is Menthall free to use?", a: "Menthall offers both free and paid services. You can start with a free trial session to find the right mentor." },
        { q: "How does the Menthall community work?", a: "Our community is built on trust and shared experiences. Mentors are verified students from top universities who are passionate about helping others." },
        { q: "Is Menthall a safe and secure platform for students?", a: "Absolutely. We verify all our mentors and provide a secure platform for all interactions. Your privacy and safety are our top priorities." },
        { q: "How can I sign up as a mentor?", a: "If you are a current college student or a recent graduate, you can apply to become a mentor through the 'Become a Mentor' section on our website." }
    ];

    return (
        <section className="bg-background text-foreground py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-8 md:px-16 grid md:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently asked questions</h2>
                    <p className="text-muted-foreground">Do you have a similar question?</p>
                </div>
                <div className="bg-card rounded-lg">
                    {faqs.map((faq, index) => (
                        <FaqItem key={index} question={faq.q} answer={faq.a} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ; 