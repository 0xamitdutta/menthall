import React from 'react';
import Image from 'next/image';

const logos = [
  { src: '/logos/iima.svg', alt: 'IIMA' },
  { src: '/logos/iitb.svg', alt: 'IITB' },
  { src: '/logos/aiims.svg', alt: 'AIIMS' },
  { src: '/logos/bits.svg', alt: 'BITS' },
  { src: '/logos/iimb.svg', alt: 'IIMB' },
  { src: '/logos/iimc.svg', alt: 'IIMC' },
  { src: '/logos/iitd.svg', alt: 'IITD' },
  { src: '/logos/iitg.svg', alt: 'IITG' },
  { src: '/logos/nitt.svg', alt: 'NITT' },
  { src: '/logos/vit.svg', alt: 'VIT' },
];

const Partners: React.FC = () => (
  <section className="bg-muted py-8">
    <div className="overflow-x-hidden flex justify-center">
      <div className="relative w-full max-w-3xl">
        <div
          className="flex animate-carousel-reverse"
          style={{
            width: `${logos.length * 3 * 20}%`,
          }}
        >
          {[...logos, ...logos, ...logos].map((logo, idx) => (
            <div
              key={idx}
              style={{ width: `${100 / 5}%` }}
              className="flex items-center justify-center"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                height={80}
                width={160}
                className="object-contain w-full h-20 opacity-80 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
    <style jsx global>{`
      @keyframes carousel-reverse {
        0% { transform: translateX(-66.67%); }
        100% { transform: translateX(0); }
      }
      .animate-carousel-reverse {
        animation: carousel-reverse 30s linear infinite;
        will-change: transform;
      }
    `}</style>
  </section>
);

export default Partners; 