import React, { useEffect, useRef, useState } from 'react';
import { CategoryId } from '../types';
import { ChevronRight } from 'lucide-react';

interface HomeScreenProps {
  onEnterMenu: (initialCategory?: CategoryId | null) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onEnterMenu }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Subtle interactive tilt for the logo, no animated shader background
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const normX = (event.clientX / window.innerWidth) * 2 - 1;
      const normY = (event.clientY / window.innerHeight) * 2 - 1;
      setTilt({ x: normX * 6, y: -normY * 6 });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleMainMenuClick = () => {
    onEnterMenu(null);
  };

  return (
    <div
      id="home-landing-screen"
      ref={containerRef}
      className="fixed inset-0 w-screen h-screen overflow-hidden flex flex-col justify-between select-none bg-[#fff8ef] text-[#1e1b13] splatter-bg"
    >
      {/* Textured backdrop: solid warm paper tone + splatter ink pattern, matching the menu screens */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #1e1b13 0, #1e1b13 1px, transparent 1px, transparent 14px)',
          }}
        />
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-[#451ebb] opacity-[0.06] blur-3xl -translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-[#bb0013] opacity-[0.06] blur-3xl translate-x-1/4 translate-y-1/4" />
      </div>

      {/* Decorative Modern-Gothic Framing Accents (Corner Details) */}
      <div className="absolute top-5 left-6 text-xs font-mono text-[#1e1b13]/40 select-none pointer-events-none hidden sm:block font-bold">
        SPOOKY-CUTE +
      </div>
      <div className="absolute bottom-5 right-6 text-xs font-mono text-[#1e1b13]/40 select-none pointer-events-none hidden sm:block font-bold">
        MENU DIGITAL +
      </div>

      {/* Center Main Stage: Logo with dynamic 3D tilt, no soft glow halo */}
      <main className="relative z-20 flex flex-col items-center justify-center text-center px-4 my-auto w-full max-w-5xl mx-auto">
        <div className="relative flex flex-col items-center justify-center group">
          {/* Logo with 3D dynamic tilt */}
          <div
            className="relative cursor-pointer transition-transform duration-300 ease-out flex items-center justify-center"
            style={{
              transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
            }}
            onClick={handleMainMenuClick}
          >
            <img
              src="./logo.png"
              alt="The Creep Zone Logo"
              referrerPolicy="no-referrer"
              className="w-[290px] sm:w-[440px] md:w-[520px] max-w-full select-none hover:scale-[1.03] transition-transform duration-300 drop-shadow-[0_10px_0px_#1e1b13] filter"
            />
          </div>
        </div>

        {/* Primary CTA Button: sharp-edged neo-brutalism, matching the menu's sticker-card language */}
        <div className="mt-8 sm:mt-10 w-full flex items-center justify-center">
          <button
            id="enter-menu-main-btn"
            onClick={handleMainMenuClick}
            className="group relative inline-flex items-center justify-center gap-3.5 bg-[#bb0013] hover:bg-[#d9041a] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[2px_2px_0px_#1e1b13] text-white font-space font-black text-base sm:text-xl md:text-2xl px-8 sm:px-12 py-4 sm:py-5 rounded-md uppercase tracking-wider transition-all duration-150 shadow-[6px_6px_0px_#1e1b13] hover:shadow-[8px_8px_0px_#451ebb] hover:-translate-x-0.5 hover:-translate-y-0.5 border-[3px] border-[#1e1b13] cursor-pointer whitespace-nowrap"
          >
            <span className="whitespace-nowrap">VER MENÚ</span>
            <div className="w-8 h-8 rounded-full bg-white/15 border-2 border-white/40 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3] text-white shrink-0" />
            </div>
          </button>
        </div>
      </main>
    </div>
  );
};
