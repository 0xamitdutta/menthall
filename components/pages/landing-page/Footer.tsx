import React from 'react';
import { Linkedin, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => (
    <footer className="bg-gray-100 text-card-foreground border-t border-border">
        <div className="container mx-auto px-4 sm:px-8 md:px-16 py-4">
            <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold">MENTHALL</h3>
                    <p className="text-muted-foreground text-sm">Your Gateway to Personalized College Guidance</p>
                </div>
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <h4 className="font-semibold mb-3">Navigate</h4>
                        <ul className="space-y-2 text-muted-foreground">
                            <li><a href="#" className="hover:text-foreground transition-colors">Find mentor</a></li>
                            <li><a href="#" className="hover:text-foreground transition-colors">Become a mentor</a></li>
                            <li><a href="#" className="hover:text-foreground transition-colors">Community</a></li>
                            <li><a href="#" className="hover:text-foreground transition-colors">Blogs</a></li>
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-semibold mb-3">Connect</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Linkedin size={20}/></a>
                            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Twitter size={20}/></a>
                            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Facebook size={20}/></a>
                        </div>
                    </div>
                </div>
                 <div>
                    <h4 className="font-semibold mb-3">Legal</h4>
                    <ul className="space-y-2 text-muted-foreground">
                        <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>
            <div className="mt-2 border-t border-border pt-4 text-center text-muted-foreground text-sm">
                <p>&copy; {new Date().getFullYear()} Menthall. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

export default Footer; 