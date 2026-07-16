import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
const Home = () => {
  const containerRef = useRef(null);
  const portraitRef = useRef(null);
  const contourRef = useRef(null);
  const fgTextRef = useRef(null);
  const backdropRef = useRef(null);
  
  const mouseRef = useRef({ x: 0.5, y: 0.5 }); // For WebGL component (normalized 0 to 1)
  const [isDarkMode, setIsDarkMode] = useState(() => document.body.classList.contains('dark-theme'));

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
      window.dispatchEvent(new Event('themechange'));
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
      window.dispatchEvent(new Event('themechange'));
    }
  };

  useEffect(() => {
    const handleThemeChange = () => {
      setIsDarkMode(document.body.classList.contains('dark-theme'));
    };
    window.addEventListener('themechange', handleThemeChange);
    return () => window.removeEventListener('themechange', handleThemeChange);
  }, []);

  // GSAP Mouse Tracking, Entrance & Parallax
  useEffect(() => {
    // Initial states for entrance animation (guaranteeing immediate correct 3D depths)
    gsap.set(portraitRef.current, { z: 80, opacity: 0, scale: 0.95, x: 0, y: 0, rotateX: 0, rotateY: 0 });
    gsap.set(fgTextRef.current, { z: 60, opacity: 0, y: 30, x: 0, rotateX: 0, rotateY: 0 });
    gsap.set(backdropRef.current, { opacity: 0, x: 0, y: 0 });

    // entrance transitions
    gsap.to(portraitRef.current, { opacity: 1, scale: 1, duration: 1.5, delay: 0.2, ease: "power2.out" });
    gsap.to(fgTextRef.current, { opacity: 1, y: 0, duration: 1.0, delay: 0.6, ease: "power2.out" });
    gsap.to(backdropRef.current, { opacity: 1, duration: 1.5, delay: 0.2, ease: "power2.out" });

    const handleMouseMove = (e) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Update normalized mouse for WebGL Liquid Shader
      mouseRef.current = {
        x: e.clientX / width,
        y: e.clientY / height
      };

      // Normalized coordinates (-1 to 1) for Parallax
      const xNorm = (e.clientX / width - 0.5) * 2;
      const yNorm = (e.clientY / height - 0.5) * 2;

      // GSAP Buttery Smooth Parallax
      gsap.to(portraitRef.current, { 
        x: xNorm * 25, 
        y: yNorm * 15, 
        z: 80, // Portrait in front of name block
        rotateY: xNorm * 5,
        rotateX: -yNorm * 5,
        duration: 1.2, 
        ease: "power2.out" 
      });
      
      gsap.to(backdropRef.current, { 
        x: xNorm * 12, 
        y: yNorm * 8, 
        duration: 1.5, 
        ease: "power2.out" 
      });
      
      gsap.to(fgTextRef.current, { 
        x: xNorm * -8, 
        y: yNorm * -6,
        z: 60, // Name block in front of circle but behind portrait
        rotateY: xNorm * -3,
        rotateX: yNorm * 3,
        duration: 1, 
        ease: "power2.out" 
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[100dvh] overflow-hidden pointer-events-auto bg-[#F5F2EA] relative perspective-[1000px]">

      {/* ---------------------------------------------------- */}
      {/* HERO FOREGROUND & PARALLAX */}
      {/* ---------------------------------------------------- */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative w-full h-[100vh] flex items-center justify-between px-8 md:px-24"
        style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
      >
        {/* ---------------------------------------------------- */}
        {/* STATIC BACKGROUND TYPOGRAPHY (MOHAMED SAJID) */}
        {/* ---------------------------------------------------- */}
        {/* Layer 28: Midground Identity Main Heading Behind Portrait but in front of circle */}
        <div 
          ref={fgTextRef} 
          className="hidden md:flex absolute z-28 right-[25vw] md:right-14 bottom-[30%] md:bottom-[27%] flex-col items-end pointer-events-none transform-gpu text-right"
          style={{ transform: 'translateZ(60px)', transformStyle: 'preserve-3d' }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-heading font-black text-os-black/40 leading-none tracking-wider select-none uppercase">
            MOHAMED
          </h2>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-heading font-black text-os-black/40 leading-none italic tracking-wider select-none uppercase mt-2 mr-[4vw] md:mr-[4vw]">
            SAJID
          </h2>
        </div>

        {/* Left Side Content Column: Crafting Digital Experiences (Foreground) */}
        <div className="absolute left-6 md:left-[8vw] top-[115px] md:top-[150px] lg:top-[45%] lg:-translate-y-1/2 z-30 max-w-[280px] sm:max-w-xl text-left pointer-events-none flex flex-col items-start">
          
          {/* Retro Theme Toggle Switch (Homepage Spec) */}
          <div className="flex items-center gap-3 mb-6 pointer-events-auto select-none">
            <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-os-black/45">// THEME SECTOR:</span>
            <button 
              onClick={toggleTheme}
              className="relative w-9 h-4.5 border border-os-black/35 rounded-full flex items-center p-0.5 transition-all duration-300 bg-os-black/5 cursor-pointer"
            >
              <div 
                className="w-3.5 h-3.5 bg-os-accent rounded-full shadow-sm transition-transform duration-300"
                style={{
                  transform: isDarkMode ? 'translateX(16px)' : 'translateX(0)'
                }}
              />
            </button>
            <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-os-accent font-bold">
              {isDarkMode ? 'NIGHT MODE' : 'DAY MODE'}
            </span>
          </div>

          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-os-black/50 block">// DIGITAL CREATOR</span>
          <div className="w-12 h-[1px] bg-os-black/15 mt-2 mb-5" />
          <div className="font-heading font-black text-3xl sm:text-4xl md:text-[62px] uppercase text-os-black select-none flex flex-col gap-1.5 md:gap-3 leading-none tracking-tight">
            <span>CRAFTING</span>
            <span className="text-os-accent">DIGITAL</span>
            <span>EXPERIENCES.</span>
          </div>
          <p className="font-mono text-[10px] md:text-[11px] text-os-black/60 mt-5 max-w-[240px] sm:max-w-[280px] leading-relaxed">
            I turn ideas into impactful digital solutions through design, code and creativity.
          </p>
        </div>

        {/* Bottom-Left Corner Info Frame (Building Digital...) */}
        <div className="absolute left-6 md:left-[8vw] bottom-14 md:bottom-[10vh] border border-os-black/10 bg-[#E8E4D9]/20 px-4 py-3 flex items-center justify-between font-mono text-[8px] md:text-[9px] tracking-widest uppercase min-w-[190px] z-30">
          <div className="space-y-0.5 text-os-black/60 text-left">
            <div>BUILDING DIGITAL.</div>
            <div>DESIGNING IMPACT.</div>
            <div>CREATING FUTURE.</div>
          </div>
          <span className="text-os-accent font-bold text-xs ml-4">+</span>
        </div>

        {/* Bottom Scroll to Explore Indicator */}
        <div className="absolute bottom-6 left-6 md:left-[8vw] right-6 md:right-[8vw] flex justify-between items-center font-mono text-[8px] md:text-[9px] uppercase tracking-widest text-os-black/40 z-30 pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full border border-os-black/40" />
            <span>SCROLL TO EXPLORE</span>
          </div>
          <div className="flex items-center gap-4">
            <span>02 / 06</span>
          </div>
        </div>

        {/* Shared Accent Backdrop Group: Centers both red circle and outer rotating rings */}
        <div 
          ref={backdropRef}
          className="absolute right-[20vw] sm:right-[12vw] md:right-[26vw] bottom-[10vh] md:bottom-[15vh] w-[180px] h-[180px] sm:w-[260px] sm:h-[260px] md:w-[380px] md:h-[380px] flex items-center justify-center pointer-events-none z-10 transform-gpu"
        >
          
          {/* Layer 10: Contour Circles (Sized to medium/large proportions relative to solid circle) */}
          <div 
            className="absolute w-[420px] h-[420px] sm:w-[580px] sm:h-[580px] md:w-[880px] md:h-[880px] flex items-center justify-center opacity-35 pointer-events-none transform-gpu z-10"
            style={{ transform: 'translateZ(20px)' }}
          >
            <svg viewBox="0 0 1000 1000" className="w-full h-full max-w-none">
              <motion.circle 
                cx="500"
                cy="500"
                r="340"
                animate={{ rotate: 360, scale: [1, 1.04, 1] }} 
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "500px 500px" }}
                fill="none" stroke="#D94F30" strokeWidth="1.5" 
              />
              <motion.circle 
                cx="500"
                cy="500"
                r="450"
                animate={{ rotate: -360, scale: [1, 1.06, 1] }} 
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "500px 500px" }}
                fill="none" stroke={isDarkMode ? "#E5E2D9" : "#1A1918"} strokeWidth="1" strokeDasharray="10 20" 
              />
            </svg>
          </div>

          {/* Layer 26: Solid Red Accent Circle */}
          <div 
            className="w-full h-full bg-os-accent rounded-full absolute pointer-events-none transform-gpu z-26"
            style={{ transform: 'translateZ(40px)' }}
          />
        </div>

        {/* Layer 30: Magazine Model Portrait Integration */}
        <img 
          ref={portraitRef}
          src="/portrait.png"
          alt="Digital Artist Portrait"
          className="absolute z-30 right-[8vw] sm:right-[10vw] md:right-[25vw] translate-x-0 sm:translate-x-[20px] bottom-[36px] h-[45vh] sm:h-[65vh] md:h-[75vh] w-auto object-contain object-bottom drop-shadow-sm grayscale pointer-events-none transform-gpu"
          style={{ transformStyle: 'preserve-3d', transform: 'translateZ(80px)' }}
        />
      </motion.div>
    </div>
  );
};

export default Home;
