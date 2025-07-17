import { useState, useEffect } from 'react';

/**
 * @param {object} 
 * @param {string} 
 * @param {string} 
 * @param {string} 
 */

export default function Banner({ imageUrl, title, subtitle }) {
    const [offsetY, setOffsetY] = useState(0);
    const handleScroll = () => setOffsetY(window.pageYOffset);
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
      <section 
        className="relative flex h-[60vh] items-center justify-center overflow-hidden [clip-path:polygon(0%_0%,_100%_0%,_100%_85%,_0%_100%)]"
      >
        <img
          src={imageUrl}
          alt="Banner background"
          className="absolute left-0 top-0 h-full w-full object-cover"
        />
        <div className="absolute left-0 top-0 h-full w-full bg-black/50"></div>
        <div
          className="relative z-10 text-center text-white"
          style={{ transform: `translateY(${offsetY * 0.4}px)` }}
        >
          <h1 className="text-4xl font-bold md:text-5xl">{title}</h1>
          <p className="mt-3 text-lg">{subtitle}</p>
        </div>
      </section>
    );
}