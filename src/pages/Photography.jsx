import React, { useEffect, useRef, useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const Photography = () => {

  // All 51 photography images
  const allImages = Array.from({ length: 51 }, (_, i) => `/pic (${i + 1}).jpg`);

  // Distribute across 4 columns
  const buildColumn = (startIndex, count) => {
    const imgs = [];
    for (let i = 0; i < count; i++) {
      imgs.push(allImages[(startIndex + i) % allImages.length]);
    }
    return imgs;
  };

  const col1Images = buildColumn(0, 13);   // pics 1–13
  const col2Images = buildColumn(13, 13);  // pics 14–26
  const col3Images = buildColumn(26, 13);  // pics 27–39
  const col4Images = buildColumn(39, 12);  // pics 40–51

  const [lightbox, setLightbox] = useState(null); // { src, index }
  const [mouseZone, setMouseZone] = useState('center');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (lightbox) {
      document.body.classList.add('cert-zoomed');
    } else {
      document.body.classList.remove('cert-zoomed');
    }
    return () => {
      document.body.classList.remove('cert-zoomed');
    };
  }, [lightbox]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const width = window.innerWidth;
      if (e.clientX < width * 0.35) setMouseZone('left');
      else if (e.clientX > width * 0.65) setMouseZone('right');
      else setMouseZone('center');
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const openLightbox = useCallback((src, index) => {
    setLightbox({ src, index });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
  }, []);

  const navigateLightbox = useCallback((dir) => {
    if (!lightbox) return;
    const next = (lightbox.index + dir + allImages.length) % allImages.length;
    setLightbox({ src: allImages[next], index: next });
  }, [lightbox, allImages]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigateLightbox(1);
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [closeLightbox, navigateLightbox]);
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

  const renderColumn = (images, animClass, responsiveClass = "") => {
    // Duplicate the images for seamless loop
    const doubled = [...images, ...images];
    return (
      <div className={`relative overflow-hidden flex-1 min-w-0 group select-none ${responsiveClass}`}>
        <div className={`scroll-inner flex flex-col ${animClass} hover:[animation-play-state:paused]`} style={{ backfaceVisibility: 'hidden', willChange: 'transform' }}>
          {doubled.map((src, i) => {
            const realIndex = allImages.indexOf(src);
            return (
              <div
                key={i}
                className="relative mb-3 overflow-hidden border border-os-black/8 hover:border-os-accent/30 transition-colors duration-500 cursor-zoom-in group/card bg-os-black/5"
                style={{ 
                  aspectRatio: i % 3 === 0 ? '3/4' : i % 3 === 1 ? '1/1' : '4/3',
                  transform: 'translate3d(0,0,0)',
                  backfaceVisibility: 'hidden'
                }}
                onClick={() => openLightbox(src, realIndex)}
              >
                <img
                  src={src}
                  alt={`frame-${i}`}
                  className="w-full h-full object-cover grayscale group-hover/card:grayscale-0 transition-all duration-500 group-hover/card:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                {/* hover view hint */}
                <div className="absolute inset-0 bg-os-black/0 group-hover/card:bg-os-black/20 transition-all duration-300 flex items-center justify-center pointer-events-none">
                  <span className="opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 font-mono text-[9px] uppercase tracking-widest text-white bg-os-black/50 px-2 py-1 backdrop-blur-sm">
                    View
                  </span>
                </div>
                {/* Frame number */}
                <span className="absolute bottom-2 right-2 font-mono text-[7px] text-white/70 tracking-widest bg-os-black/50 px-1 py-0.5 backdrop-blur-sm">
                  {String(realIndex + 1).padStart(2, '0')}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full h-full bg-os-white overflow-hidden flex flex-col select-none">

      {/* Scanline texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-30"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(26,25,24,0.03) 3px, rgba(26,25,24,0.03) 4px)',
        }}
      />

      {/* Paper grid texture */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-20"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(26,25,24,0.015) 40px, rgba(26,25,24,0.015) 41px), repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(26,25,24,0.015) 40px, rgba(26,25,24,0.015) 41px)',
        }}
      />

      {/* Scrollable Header Navigation */}
      <div className="relative z-30 w-full px-6 md:px-16 py-5 flex justify-between items-center border-b border-os-black/8 shrink-0 pointer-events-auto bg-os-white/95 backdrop-blur-sm">
        <NavLink to="/" className="group text-left">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold tracking-tighter text-os-black group-hover:opacity-80 transition-opacity">
              SAJID<span className="font-light text-os-accent">OS</span>
            </h1>
            <span className="h-4 w-[1px] bg-os-black/10"></span>
            <span className="font-mono text-xs uppercase tracking-widest text-os-accent font-bold">
              Photography Archive 08
            </span>
          </div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-os-black/50 mt-0.5">
            Vol. 1 — Frame Protocol
          </p>
        </NavLink>

        <nav className="hidden lg:flex items-center gap-7 xl:gap-8 font-mono text-[10px] xl:text-xs uppercase tracking-widest text-os-black/60">
          <NavLink to="/about" className="hover:text-os-accent transition-colors duration-300">About Me</NavLink>
          <NavLink to="/skills" className="hover:text-os-accent transition-colors duration-300">Skills</NavLink>
          <NavLink to="/projects" className="hover:text-os-accent transition-colors duration-300">Projects</NavLink>
          <NavLink to="/certifications" className="hover:text-os-accent transition-colors duration-300">Certifications</NavLink>
          <NavLink to="/artwork" className="text-os-accent font-bold">Photography</NavLink>
          <NavLink to="/content-creator" className="hover:text-os-accent transition-colors duration-300">Content Creator</NavLink>
          <NavLink to="/contact" className="hover:text-os-accent transition-colors duration-300">Contact</NavLink>
        </nav>

        <div className="flex items-center gap-4 font-mono text-xs text-os-black/70">
          <div className="flex items-center gap-1.5 hidden sm:flex">
            <span className="font-heading font-black text-os-accent text-sm">51</span>
            <span className="text-[9px] uppercase tracking-widest">Frames Captured</span>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden pointer-events-auto flex flex-col gap-1 items-center justify-center w-8 h-8 rounded border border-os-black/15 bg-[#E8E4D9]/20 hover:border-os-accent/35 transition-all duration-300 relative z-50 cursor-pointer"
            aria-label="Toggle Menu"
          >
            <span className={`w-4 h-[1.5px] bg-os-black transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
            <span className={`w-4 h-[1.5px] bg-os-black transition-all duration-300 ${menuOpen ? 'opacity-0 my-0' : 'my-[2px]'}`} />
            <span className={`w-4 h-[1.5px] bg-os-black transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Archive Title Bar */}
      <div className="relative z-20 px-6 md:px-16 py-3 border-b border-os-black/5 shrink-0 flex justify-between items-center pointer-events-auto">
        <div className="flex items-center gap-6">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-os-black/35">// Photography Archive</span>
          <span className="h-3 w-[1px] bg-os-black/15 hidden sm:inline" />
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-os-accent/70 hidden sm:inline">Live Feed — Hover to Pause</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-os-accent animate-pulse" />
          <span className="font-mono text-[8px] uppercase tracking-widest text-os-black/40">REC</span>
        </div>
      </div>

      {/* 4 Infinite Scroll Columns */}
      <div className="relative z-20 flex-1 flex gap-3 px-4 md:px-10 py-4 overflow-hidden min-h-0">
        {renderColumn(col1Images, 'animate-marquee-up-fast')}
        {renderColumn(col2Images, 'animate-marquee-down-slow')}
        {renderColumn(col3Images, 'animate-marquee-up-superfast', 'hidden sm:block')}
        {renderColumn(col4Images, 'animate-marquee-down-superslow', 'hidden md:block')}
      </div>

      {/* Bottom Archive Bar */}
      <div className="relative z-30 px-6 md:px-16 py-3 border-t border-os-black/8 shrink-0 flex justify-between items-center bg-os-white/95 pointer-events-auto gap-4">
        <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-os-black/30 truncate max-w-[120px] sm:max-w-none">
          © PHOTOGRAPHY ARCHIVE — SAJID S
        </span>

        {/* Centre: Shot by credit */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.25em]">
          <span className="text-os-black font-bold">Shot by</span>
          <span className="text-os-accent font-black">iPhone 13 Pro Max</span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 font-mono text-[8px] uppercase tracking-widest">
          <span className="text-os-accent font-black">51 FRAMES</span>
          <span className="h-2 w-[1px] bg-os-black/20 hidden sm:inline" />
          <span className="text-os-black font-bold hidden sm:inline">RANDOM</span>
          <span className="h-2 w-[1px] bg-os-black/20" />
          <span className="text-os-accent font-black">2022 — 2026</span>
        </div>
      </div>

      {/* Left side archive label */}
      <div
        className="absolute left-2 top-1/2 -translate-y-1/2 z-30 pointer-events-none transition-all duration-500 ease-out origin-center hidden lg:block"
        style={{ transform: `translateY(-50%) rotate(-180deg) scale(${mouseZone === 'left' ? 1.6 : 1.0})` }}
      >
        <span
          className="font-heading font-black tracking-[0.25em] uppercase text-os-accent text-base"
          style={{ writingMode: 'vertical-rl' }}
        >
          Certifications
        </span>
      </div>

      {/* Right side archive label */}
      <div
        className="absolute right-2 top-1/2 -translate-y-1/2 z-30 pointer-events-none transition-all duration-500 ease-out origin-center hidden lg:block"
        style={{ transform: `translateY(-50%) scale(${mouseZone === 'right' ? 1.6 : 1.0})` }}
      >
        <span
          className="font-heading font-black tracking-[0.25em] uppercase text-os-accent text-base"
          style={{ writingMode: 'vertical-rl' }}
        >
          Contact
        </span>
      </div>

      {/* ── LIGHTBOX MODAL ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/92 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center border border-white/20 text-white/70 hover:text-white hover:border-white/60 transition-all duration-200 font-mono text-sm bg-white/5 hover:bg-white/10 backdrop-blur-sm"
          >
            ✕
          </button>

          {/* Frame counter */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            Frame&nbsp;
            <span className="text-os-accent font-black">{String(lightbox.index + 1).padStart(2, '0')}</span>
            &nbsp;/&nbsp;51
          </div>

          {/* Prev arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center border border-white/15 text-white/60 hover:text-white hover:border-white/50 transition-all duration-200 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-lg"
          >
            ‹
          </button>

          {/* Next arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center border border-white/15 text-white/60 hover:text-white hover:border-white/50 transition-all duration-200 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-lg"
          >
            ›
          </button>

          {/* Image */}
          <div
            className="relative max-w-[88vw] max-h-[88vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={lightbox.src}
              src={lightbox.src}
              alt={`frame-${lightbox.index + 1}`}
              className="max-w-full max-h-[85vh] object-contain shadow-2xl border border-white/8"
              style={{ animation: 'fadeIn 0.25s ease' }}
            />
            {/* Bottom caption */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center px-3 py-2 bg-gradient-to-t from-black/60 to-transparent">
              <span className="font-mono text-[8px] uppercase tracking-widest text-white/50">
                © Photography Archive — Sajid S
              </span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[8px] text-white/40">Shot by</span>
                <span className="font-mono text-[8px] text-os-accent font-black">iPhone 13 Pro Max</span>
              </div>
            </div>
          </div>

          {/* Keyboard hint */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 font-mono text-[8px] uppercase tracking-widest text-white/25">
            <span>← → Navigate</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>Esc Close</span>
          </div>
        </div>
      )}

      {/* Full-screen Mobile Menu Overlay Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 bg-[#F5F2EA] dark:bg-[#0D0C0B] z-40 flex flex-col justify-center items-center pointer-events-auto px-8 py-20"
          >
            {/* Scanline texture overlay */}
            <div
              className="absolute inset-0 pointer-events-none z-10 opacity-30 animate-crt-flicker"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(26,25,24,0.03) 3px, rgba(26,25,24,0.03) 4px)',
              }}
            />
            {/* Paper grid texture */}
            <div
              className="absolute inset-0 pointer-events-none z-10 opacity-20"
              style={{
                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(26,25,24,0.015) 40px, rgba(26,25,24,0.015) 41px), repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(26,25,24,0.015) 40px, rgba(26,25,24,0.015) 41px)',
              }}
            />

            <nav className="flex flex-col gap-6 font-heading font-black text-2xl uppercase tracking-wider text-center text-os-black relative z-20">
              <NavLink to="/about" onClick={() => setMenuOpen(false)} className={({ isActive }) => `hover:text-os-accent transition-colors duration-300 ${isActive ? 'text-os-accent font-bold' : ''}`}>
                About Me
              </NavLink>
              <NavLink to="/skills" onClick={() => setMenuOpen(false)} className={({ isActive }) => `hover:text-os-accent transition-colors duration-300 ${isActive ? 'text-os-accent font-bold' : ''}`}>
                Skills
              </NavLink>
              <NavLink to="/projects" onClick={() => setMenuOpen(false)} className={({ isActive }) => `hover:text-os-accent transition-colors duration-300 ${isActive ? 'text-os-accent font-bold' : ''}`}>
                Projects
              </NavLink>
              <NavLink to="/certifications" onClick={() => setMenuOpen(false)} className={({ isActive }) => `hover:text-os-accent transition-colors duration-300 ${isActive ? 'text-os-accent font-bold' : ''}`}>
                Certifications
              </NavLink>
              <NavLink to="/artwork" onClick={() => setMenuOpen(false)} className={({ isActive }) => `hover:text-os-accent transition-colors duration-300 ${isActive ? 'text-os-accent font-bold' : ''}`}>
                Photography
              </NavLink>
              <NavLink to="/content-creator" onClick={() => setMenuOpen(false)} className={({ isActive }) => `hover:text-os-accent transition-colors duration-300 ${isActive ? 'text-os-accent font-bold' : ''}`}>
                Content Creator
              </NavLink>
              <NavLink to="/contact" onClick={() => setMenuOpen(false)} className={({ isActive }) => `hover:text-os-accent transition-colors duration-300 ${isActive ? 'text-os-accent font-bold' : ''}`}>
                Contact
              </NavLink>
            </nav>

            {/* Mobile Theme Toggle inside Drawer */}
            <div className="mt-12 flex items-center gap-3 select-none relative z-20 pointer-events-auto">
              <span className="font-mono text-xs uppercase tracking-widest text-os-black/55 font-bold">// THEME SECTOR:</span>
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Photography;
