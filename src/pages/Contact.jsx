import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [mouseZone, setMouseZone] = useState('center');
  const [menuOpen, setMenuOpen] = useState(false);
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
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const w = window.innerWidth;
      if (e.clientX < w * 0.35) setMouseZone('left');
      else if (e.clientX > w * 0.65) setMouseZone('right');
      else setMouseZone('center');
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleThemeChange = () => {
      setIsDarkMode(document.body.classList.contains('dark-theme'));
    };
    window.addEventListener('themechange', handleThemeChange);
    return () => window.removeEventListener('themechange', handleThemeChange);
  }, []);

  return (
    <div className="relative w-full h-full bg-[#F5F2EA] overflow-y-auto flex flex-col select-none">

      {/* Left side label */}
      <div 
        className="absolute left-3 top-1/2 -translate-y-1/2 z-30 pointer-events-none transition-all duration-500 ease-out origin-center hidden lg:block"
        style={{ 
          writingMode: 'vertical-rl',
          transform: `translateY(-50%) rotate(-180deg) scale(${mouseZone === 'left' ? 1.6 : 1.0})` 
        }}
      >
        <span className="font-heading font-black tracking-[0.25em] uppercase text-os-accent text-base">
          Skills
        </span>
      </div>

      {/* Right side label */}
      <div 
        className="absolute right-3 top-1/2 -translate-y-1/2 z-30 pointer-events-none transition-all duration-500 ease-out origin-center hidden lg:block"
        style={{ 
          writingMode: 'vertical-rl',
          transform: `translateY(-50%) scale(${mouseZone === 'right' ? 1.6 : 1.0})` 
        }}
      >
        <span className="font-heading font-black tracking-[0.25em] uppercase text-os-accent text-base">
          Content Creator
        </span>
      </div>

      {/* Scrollable Content Container */}
      <div className="w-full h-full pt-8 pb-12 px-6 md:px-16 pointer-events-auto overflow-y-auto flex flex-col gap-2 md:gap-5 hide-scrollbar relative z-10">

      {/* Scrollable Header Navigation */}
      <div className="w-full max-w-[1400px] mx-auto flex justify-between items-center mb-2 shrink-0 pointer-events-auto relative z-20 border-b border-os-black/5 pb-4">
        <NavLink to="/" className="group text-left">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold tracking-tighter text-os-black group-hover:opacity-80 transition-opacity">
              SAJID<span className="font-light text-os-accent">OS</span>
            </h1>
            <span className="h-4 w-[1px] bg-os-black/10"></span>
            <span className="font-mono text-xs uppercase tracking-widest text-os-accent font-bold">
              Contact Archive 09
            </span>
          </div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-os-black/50 mt-0.5">
            Vol. 1 — Creative Protocol
          </p>
        </NavLink>

        <nav className="hidden lg:flex items-center gap-7 xl:gap-8 font-mono text-[10px] xl:text-xs uppercase tracking-widest text-os-black/60">
          <NavLink to="/about" className="hover:text-os-accent transition-colors duration-300">About Me</NavLink>
          <NavLink to="/skills" className="hover:text-os-accent transition-colors duration-300">Skills</NavLink>
          <NavLink to="/projects" className="hover:text-os-accent transition-colors duration-300">Projects</NavLink>
          <NavLink to="/certifications" className="hover:text-os-accent transition-colors duration-300">Certifications</NavLink>
          <NavLink to="/artwork" className="hover:text-os-accent transition-colors duration-300">Photography</NavLink>
          <NavLink to="/content-creator" className="hover:text-os-accent transition-colors duration-300">Content Creator</NavLink>
          <NavLink to="/contact" className="text-os-accent font-bold hover:text-os-accent transition-colors duration-300">Contact</NavLink>
        </nav>

        <div className="flex items-center gap-4 font-mono text-xs text-os-black/85">
          <div className="flex items-center gap-2 hidden sm:flex">
            <span className="font-bold">{time}</span>
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-os-accent"></span>
              <span className="w-2 h-2 rounded-full bg-os-black/20"></span>
              <span className="w-2 h-2 rounded-full bg-os-black/20"></span>
            </div>
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

      {/* Giant Background Watermark Text */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0 select-none">
        <h1 className="text-[11vw] font-heading font-black tracking-[0.08em] leading-none text-os-black text-center uppercase" style={{ opacity: 0.03 }}>
          CONTACT ARCHIVE
        </h1>
      </div>

      {/* Main Grid Area */}
      <div className="max-w-[1400px] mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start shrink-0 py-2 md:py-6 lg:py-2">
        
        {/* Left Section (Column Span 7) */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          
          {/* Header Title & Archive Info side-by-side */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-os-black/5 pb-6">
            
            {/* Title Text */}
            <div className="space-y-3">
              <span className="font-mono text-[10px] text-os-accent font-bold tracking-widest uppercase">// LET'S CONNECT</span>
              <h2 className="text-4xl md:text-[46px] font-heading font-black leading-[0.95] tracking-tighter text-os-black uppercase">
                LET'S BUILD<br/>
                SOMETHING<br/>
                <span className="text-os-accent block mt-1">MEMORABLE.</span>
              </h2>
              <div className="w-12 h-[2px] bg-os-accent" />
              <div className="font-mono text-[10px] text-os-black/75 space-y-1 leading-relaxed mt-2">
                <p>Different platforms. Different stories.</p>
                <p>Same purpose — creating impact.</p>
              </div>
            </div>

            {/* Archive Info Sheet (Moved here next to Title) */}
            <div className="w-full md:w-[320px] shrink-0 border border-os-black/12 bg-[#E8E4D9]/15 p-5 rounded-sm flex flex-col justify-between font-mono text-[10px] relative">
              <div className="absolute top-1.5 right-2 text-os-accent/30 text-[13px] select-none">⊕</div>
              <div>
                <div className="flex items-center gap-1.5 mb-3">
                  <span className="text-os-accent font-bold">//</span>
                  <span className="font-bold uppercase tracking-widest text-os-black/85 text-[11px]">ARCHIVE INFO</span>
                </div>
                <div className="space-y-2 border-t border-os-black/5 pt-3">
                  <div className="flex justify-between">
                    <span className="text-os-black/45">FILE ID</span>
                    <span className="text-os-black font-semibold">: CA-09-CONTACT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-os-black/45">STATUS</span>
                    <span className="text-os-accent font-bold">: ACTIVE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-os-black/45">UPDATED AT</span>
                    <span className="text-os-black font-semibold">: {time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-os-black/45">ACCESS</span>
                    <span className="text-os-black font-semibold">: PUBLIC</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-os-black/5 pt-3 mt-3 text-os-accent font-bold text-[9px] tracking-wide animate-pulse">
                &gt; SECURE CONNECTION ESTABLISHED.
              </div>
            </div>

          </div>

          {/* Social Grid (Connect cards) - Expanded Full Width */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[9px] text-os-black/45 tracking-widest uppercase">// CONNECT THROUGH</span>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {/* 01 GITHUB */}
                <a 
                  href="https://github.com/sajid05-jelly" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="border border-os-black/10 bg-[#E8E4D9]/10 p-3 flex flex-col justify-between h-[150px] hover:border-os-accent/30 hover:bg-os-accent/5 transition-all duration-300 rounded-sm"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[9px] text-os-black/40 font-bold">01</span>
                    <svg className="w-5 h-5 fill-os-black/70" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-heading font-black text-xs text-os-black tracking-wider">GITHUB</h4>
                    <p className="font-mono text-[7px] text-os-black/55 mt-1 leading-tight uppercase">CODE. BUILD. IMPACT.</p>
                  </div>
                  <div className="border-t border-os-black/5 pt-2 flex justify-between items-center text-[7px] font-mono mt-2">
                    <span className="text-os-accent font-bold">ACCESS REPO ↗</span>
                    <span className="text-green-600 flex items-center gap-1 font-bold">ACTIVE <span className="w-1 h-1 rounded-full bg-green-500" /></span>
                  </div>
                </a>

                {/* 02 INSTAGRAM */}
                <a 
                  href="https://www.instagram.com/vibe_x_sajii/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="border border-os-black/10 bg-[#E8E4D9]/10 p-3 flex flex-col justify-between h-[150px] hover:border-os-accent/30 hover:bg-os-accent/5 transition-all duration-300 rounded-sm"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[9px] text-os-black/40 font-bold">02</span>
                    <svg className="w-5 h-5 fill-os-black/70" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051c-.058 1.28-.072 1.689-.072 4.949 0 3.26.014 3.669.072 4.948.2 4.361 2.62 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.26 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.26-.014-3.669-.072-4.949-.2-4.357-2.62-6.78-6.979-6.98C15.668.014 15.26 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-heading font-black text-xs text-os-black tracking-wider">INSTAGRAM</h4>
                    <p className="font-mono text-[7px] text-os-black/55 mt-1 leading-tight uppercase">25K+ COMMUNITY. MOMENTS. VIBES.</p>
                  </div>
                  <div className="border-t border-os-black/5 pt-2 flex justify-between items-center text-[7px] font-mono mt-2">
                    <span className="text-os-accent font-bold">OPEN PROFILE ↗</span>
                    <span className="text-green-600 flex items-center gap-1 font-bold">ACTIVE <span className="w-1 h-1 rounded-full bg-green-500" /></span>
                  </div>
                </a>

                {/* 03 YOUTUBE */}
                <a 
                  href="https://www.youtube.com/@Srmvibes05" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="border border-os-black/10 bg-[#E8E4D9]/10 p-3 flex flex-col justify-between h-[150px] hover:border-os-accent/30 hover:bg-os-accent/5 transition-all duration-300 rounded-sm"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[9px] text-os-black/40 font-bold">03</span>
                    <svg className="w-5 h-5 fill-os-black/70" viewBox="0 0 24 24">
                      <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-heading font-black text-xs text-os-black tracking-wider">YOUTUBE</h4>
                    <p className="font-mono text-[7px] text-os-black/55 mt-1 leading-tight uppercase">8.06K SUBSCRIBERS. CREATE. SHARE.</p>
                  </div>
                  <div className="border-t border-os-black/5 pt-2 flex justify-between items-center text-[7px] font-mono mt-2">
                    <span className="text-os-accent font-bold">WATCH CHANNEL ↗</span>
                    <span className="text-green-600 flex items-center gap-1 font-bold">ACTIVE <span className="w-1 h-1 rounded-full bg-green-500" /></span>
                  </div>
                </a>

                {/* 04 EMAIL */}
                <a 
                  href="mailto:mohamedsajid.sa@gmail.com" 
                  className="border border-os-black/10 bg-[#E8E4D9]/10 p-3 flex flex-col justify-between h-[150px] hover:border-os-accent/30 hover:bg-os-accent/5 transition-all duration-300 rounded-sm"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[9px] text-os-black/40 font-bold">04</span>
                    <svg className="w-5 h-5 fill-os-black/70" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-heading font-black text-xs text-os-black tracking-wider">EMAIL</h4>
                    <p className="font-mono text-[7px] text-os-black/55 mt-1 leading-tight uppercase">FOR COLLABS & OPPORTUNITIES.</p>
                  </div>
                  <div className="border-t border-os-black/5 pt-2 flex justify-between items-center text-[7px] font-mono mt-2">
                    <span className="text-os-accent font-bold">OPEN MAIL ↗</span>
                    <span className="text-green-600 flex items-center gap-1 font-bold">ACTIVE <span className="w-1 h-1 rounded-full bg-green-500" /></span>
                  </div>
                </a>
              </div>

          </div>

        </div>

        {/* Right Section / Classified Folder Presentation (Column Span 5) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[480px]">
          
          {/* Main Folder Backplane */}
          <div className="relative w-full max-w-[380px] aspect-[1/1.25] bg-[#D8C7B0] rounded-lg shadow-2xl border border-os-black/15 p-5 flex flex-col justify-between overflow-hidden">
            
            {/* Inner shadows and paper overlays */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/[0.08] to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 w-24 h-full bg-[#C7B59D]/40 transform -skew-x-12 translate-x-12 pointer-events-none" />
            
            {/* Folder Header Tab */}
            <div className="absolute top-0 left-0 bg-[#C7B59D] px-6 py-1.5 rounded-br-lg border-r border-b border-os-black/10 font-mono text-[8px] uppercase tracking-widest text-os-black/60 font-bold">
              CONTACT ARCHIVE
            </div>

            {/* Folder Main Sheet / Document Overlay */}
            <div className="relative z-10 w-full h-[95%] bg-[#F5F2EA] border border-os-black/8 rounded shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 flex flex-col justify-between">
              
              {/* Top document card details */}
              <div className="space-y-4 text-left">
                <div className="flex justify-between items-start border-b border-os-black/10 pb-3">
                  <div className="font-mono text-[8px] uppercase tracking-widest text-os-black/60">
                    <p className="font-bold">CONTACT ARCHIVE</p>
                    <p className="mt-2 text-os-black/35">SAJIDOS</p>
                    <p className="text-[6px] text-os-black/40">DIGITAL IDENTITY FILE</p>
                  </div>
                  
                  {/* Stamp 09 */}
                  <div className="flex flex-col items-end">
                    <span className="font-heading font-black text-os-accent text-3xl leading-none">09</span>
                    <span className="font-mono text-[6px] text-os-black/40 mt-1 uppercase">09A</span>
                  </div>
                </div>

                <div className="font-mono text-[8px] uppercase tracking-wider text-os-black/50 space-y-1">
                  <p>HANDLE WITH PURPOSE.</p>
                </div>
              </div>

              {/* Central Metal-plate connection panel */}
              <div className="border-2 border-os-black/15 bg-[#EFECE3] p-5 rounded flex flex-col justify-center items-center relative shadow-inner select-all">
                {/* 4 Screws in corners */}
                <div className="absolute top-1 left-1 font-mono text-[6px] text-os-black/35 select-none">⊕</div>
                <div className="absolute top-1 right-1 font-mono text-[6px] text-os-black/35 select-none">⊕</div>
                <div className="absolute bottom-1 left-1 font-mono text-[6px] text-os-black/35 select-none">⊕</div>
                <div className="absolute bottom-1 right-1 font-mono text-[6px] text-os-black/35 select-none">⊕</div>

                <h3 className="font-heading font-black text-sm md:text-base text-os-accent tracking-widest text-center leading-snug uppercase">
                  CONNECTIONS<br/>CREATE<br/>OPPORTUNITIES.
                </h3>
                <p className="font-mono text-[8px] uppercase tracking-widest text-os-black/40 mt-3">LET'S CONNECT.</p>
              </div>

              {/* Document footer with signature info */}
              <div className="flex justify-between items-end border-t border-os-black/10 pt-3 text-left">
                <div className="font-mono text-[7px] uppercase tracking-widest text-os-black/30">
                  <span className="border border-os-black/20 px-1 py-0.5 font-bold text-os-accent">CLASSIFIED</span>
                  <p className="mt-1.5">CREATOR LEVEL ACCESS</p>
                </div>
                {/* Stamp label */}
                <span className="font-heading font-black text-xl text-os-black/15 select-none">09</span>
              </div>
            </div>

            {/* Barcode details in background */}
            <div className="absolute bottom-4 right-4 opacity-15 select-none">
              <svg className="w-16 h-8"></svg>
            </div>

          </div>

          {/* Hanging File Tag Decor */}
          <div className="absolute right-[-15px] top-[30%] z-20 w-[65px] aspect-[1/2] bg-[#F5F2EA] border border-os-black/15 shadow-md p-2 rounded-sm flex flex-col justify-between text-left rotate-3 hidden sm:flex">
            <div className="w-1.5 h-1.5 rounded-full bg-os-black/10 mx-auto" />
            <div className="font-mono text-[7px] text-os-black/50 leading-tight tracking-wider uppercase mt-2">
              <p className="text-os-accent font-bold">LET'S</p>
              <p>CREATE</p>
              <p>SOMETHING</p>
              <p className="text-os-accent font-black">LEGENDARY.</p>
            </div>
            <div className="flex justify-between items-center mt-3 pt-1 border-t border-os-black/5 font-mono text-[6px] text-os-black/25">
              <span>TAG</span>
              <span>09</span>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Horizontal strip widgets row */}
      <div className="max-w-[1400px] mx-auto w-full relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4 mt-1 shrink-0 pb-1">
        
        {/* Current Location (Col Span 3) */}
        <div className="md:col-span-3 border border-os-black/10 p-3 rounded-sm flex items-center justify-between bg-[#E8E4D9]/5 font-mono text-[9px] text-left">
          <div className="flex items-center gap-2">
            <span className="text-os-accent text-[11px]">📍</span>
            <span className="text-os-black/60 uppercase leading-snug">SRM IST TRICHY<br/>TAMIL NADU, INDIA</span>
          </div>
          <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="text-os-accent font-bold uppercase hover:underline ml-2">VIEW MAP ↗</a>
        </div>

        {/* Trajectory Quote (Col Span 5) */}
        <div className="md:col-span-5 border border-os-black/10 p-3 rounded-sm flex items-center justify-center gap-1.5 bg-[#E8E4D9]/5">
          <span className="text-os-accent font-serif text-lg leading-none font-bold">“</span>
          <p className="font-mono text-[8px] uppercase tracking-wide text-os-black/75 leading-tight text-center flex-1">
            THE RIGHT CONNECTION CAN CHANGE THE ENTIRE TRAJECTORY.
          </p>
          <span className="text-os-accent font-serif text-lg leading-none font-bold">”</span>
        </div>

        {/* Note Card with Globe Icon (Col Span 4) */}
        <div className="md:col-span-4 border border-os-black/10 p-3 rounded-sm flex items-center justify-between bg-[#E8E4D9]/5 font-mono text-[8px] text-left">
          <div className="space-y-1">
            <div className="flex items-center gap-1 font-bold text-os-accent">
              <span>//</span>
              <span>NOTE</span>
            </div>
            <p className="text-os-black/50 leading-normal uppercase">
              THANK YOU FOR VISITING THE ARCHIVE.<br/>
              LET'S CONNECT. LET'S CREATE. LET'S LEAVE A LEGACY.
            </p>
          </div>
          <div className="w-7 h-7 flex items-center justify-center shrink-0 border border-os-black/8 rounded-full bg-[#E8E4D9]/10 ml-3">
            <svg className="w-4 h-4 fill-none stroke-os-black/45 stroke-[1.5]" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              <path d="M2 12h20" />
            </svg>
          </div>
        </div>

      </div>

      {/* Footer Note and branding */}
      <div className="max-w-[1400px] mx-auto w-full border-t border-os-black/10 pt-4 flex justify-between items-center text-left relative z-10 font-mono text-[8px] uppercase tracking-widest text-os-black/40 shrink-0">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-os-accent" /> SAJIDOS</span>
          <span>CAPTURING MOMENTS. CREATING MEMORIES. BUILDING LEGACY.</span>
        </div>
        
        {/* Centre: Orange accent page marker */}
        <div className="absolute left-1/2 -translate-x-1/2 text-os-accent font-black tracking-[0.25em] hidden md:block">
          YOU ARE IN THE CORRECT PAGE
        </div>

        <div>
          ARCHIVE FOOTER 09A
        </div>
      </div>

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
    </div>
  );
};

export default Contact;
