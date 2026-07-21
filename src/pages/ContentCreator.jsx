import React, { useRef, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ContentCreator = () => {
  const momentsContainerRef = useRef(null);

  const [mouseZone, setMouseZone] = useState('center');
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

  const [time, setTime] = useState(new Date().toLocaleTimeString());
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
    const handleThemeChange = () => {
      setIsDarkMode(document.body.classList.contains('dark-theme'));
    };
    window.addEventListener('themechange', handleThemeChange);
    return () => window.removeEventListener('themechange', handleThemeChange);
  }, []);

  const stats = [
    { value: "500+", label: "POSTS", sub: "Across Platforms" },
    { value: "100+", label: "EVENTS", sub: "Documented" },
    { value: "3+", label: "YEARS", sub: "Of Consistency" },
    { value: "1", label: "MISSION", sub: "Capture & Inspire" }
  ];

  const tools = [
    { short: "PA", name: "PICS ART" },
    { short: "Fm", name: "FILMORA" },
    { short: "Cc", name: "CAPCUT" },
    { short: "IS", name: "INSHOT" },
    { short: "SS", name: "SNAPSEED" },
    { short: "Dr", name: "DAVINCI RESOLVE" }
  ];

  const impactMetrics = [
    { label: "REACH", percentage: "92%" },
    { label: "ENGAGEMENT", percentage: "90%" },
    { label: "CONSISTENCY", percentage: "95%" },
    { label: "GROWTH", percentage: "88%" },
    { label: "COMMUNITY LOVE", percentage: "94%" }
  ];

  const moments = [
    { id: "01", title: "FRESHERS DAY", caption: "New Beginnings", img: "/freshers.png", url: "https://youtu.be/Yai6uQwfy5M?si=RT7-wvMCJlC84_h1" },
    { id: "02", title: "RASRANG", caption: "The Madness", img: "/rasrang.png", url: "https://www.youtube.com/watch?v=0E3UJfpq77o&list=PLO7Aot5C526xdoCVdKGvJIhtimUQYTTfp" },
    { id: "03", title: "ETHNIC DAY", caption: "Tradition in Style", img: "/ethnic.png", url: "https://youtu.be/ohkNFwPh2aU?si=Uuyx5IcTsszv7BmQ" },
    { id: "04", title: "DJ NIGHTS", caption: "Lights. Music. Energy.", img: "/dj.png", url: "https://youtu.be/W1FywrTJadI?si=_BiOFkkSgBbRFA0b" },
    { id: "05", title: "FLASH MOBS", caption: "Unexpected Magic", img: "/flashmob.png", url: "https://youtu.be/cUJpm8joTNA?si=dUY_akRjUdm19tZJ" },
    { id: "06", title: "CLUB EVENTS", caption: "Communities Built", img: "/club.png", url: "https://youtu.be/IceLQbfna6o?si=0RGogcvapa9h9pC3" },
    { id: "07", title: "HACKATHONS", caption: "Ideas in Action", img: "/hackathons.png", url: "https://youtu.be/kVwK2GBluJA?si=YVaT6BU5pEp5UXAv" },
    { id: "08", title: "CAMPUS REELS", caption: "Reels that Hit", img: "/reel.png", url: "https://youtu.be/IkbxAFFTmLo?si=96IFeLcJ8S0LpJe5" }
  ];

  const timeline = [
    { year: "2022", title: "Started the", desc: "Journey" },
    { year: "2023", title: "Campus Reels", desc: "& Short Content" },
    { year: "2024", title: "Event Coverage", desc: "& Aftermovies" },
    { year: "2025", title: "SRM Recognition", desc: "& Growth" },
    { year: "2026", title: "Expanding Impact", desc: "& Community" }
  ];

  const scrollMoments = (direction) => {
    if (momentsContainerRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      momentsContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full h-full bg-[#F5F2EA] overflow-y-auto block select-none">

      {/* Left side label */}
      <div 
        className="absolute left-3 top-1/2 -translate-y-1/2 z-30 pointer-events-none transition-all duration-500 ease-out origin-center hidden xl:block"
        style={{ 
          writingMode: 'vertical-rl',
          transform: `translateY(-50%) rotate(-180deg) scale(${mouseZone === 'left' ? 1.6 : 1.0})` 
        }}
      >
        <span className="font-heading font-black tracking-[0.25em] uppercase text-os-accent text-base">
          Projects
        </span>
      </div>

      {/* Right side label */}
      <div 
        className="absolute right-3 top-1/2 -translate-y-1/2 z-30 pointer-events-none transition-all duration-500 ease-out origin-center hidden xl:block"
        style={{ 
          writingMode: 'vertical-rl',
          transform: `translateY(-50%) scale(${mouseZone === 'right' ? 1.6 : 1.0})` 
        }}
      >
        <span className="font-heading font-black tracking-[0.25em] uppercase text-os-accent text-base">
          About
        </span>
      </div>

      {/* Giant Background Watermark Text positioned in the gap below stats */}
      <div className="absolute inset-x-0 flex justify-center items-center pointer-events-none z-0 select-none top-[420px]">
        <h1 className="text-[15vw] font-heading font-black tracking-[0.1em] leading-none text-os-black" style={{ opacity: 0.03 }}>CREATOR</h1>
      </div>

      {/* Scrollable Content Container */}
      <div className="w-full h-fit pt-8 pb-12 px-6 md:px-16 pointer-events-auto flex flex-col gap-6 relative z-10">

      {/* Scrollable Header Navigation */}
      <div className="w-full max-w-[1400px] mx-auto flex justify-between items-center mb-2 md:mb-6 shrink-0 pointer-events-auto relative z-20 border-b border-os-black/5 pb-2 md:pb-6">
        <NavLink to="/" className="group text-left">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold tracking-tighter text-os-black group-hover:opacity-80 transition-opacity">
              SAJID<span className="font-light text-os-accent">OS</span>
            </h1>
          </div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-os-black/50 mt-0.5">
            Vol. 1 — Creative Protocol
          </p>
        </NavLink>

        <nav className="hidden xl:flex items-center gap-7 xl:gap-8 font-mono text-[10px] xl:text-xs uppercase tracking-widest text-os-black/60">
          <NavLink to="/about" className="hover:text-os-accent transition-colors duration-300">About Me</NavLink>
          <NavLink to="/skills" className="hover:text-os-accent transition-colors duration-300">Skills</NavLink>
          <NavLink to="/projects" className="hover:text-os-accent transition-colors duration-300">Projects</NavLink>
          <NavLink to="/certifications" className="hover:text-os-accent transition-colors duration-300">Certifications</NavLink>
          <NavLink to="/artwork" className="hover:text-os-accent transition-colors duration-300">Photography</NavLink>
          <NavLink to="/content-creator" className="text-os-accent font-bold hover:text-os-accent transition-colors duration-300">Content Creator</NavLink>
          <NavLink to="/contact" className="hover:text-os-accent transition-colors duration-300">Contact</NavLink>
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
            className="xl:hidden pointer-events-auto flex flex-col gap-1 items-center justify-center w-8 h-8 rounded border border-os-black/15 bg-[#E8E4D9]/20 hover:border-os-accent/35 transition-all duration-300 relative z-50 cursor-pointer"
            aria-label="Toggle Menu"
          >
            <span className={`w-4 h-[1.5px] bg-os-black transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
            <span className={`w-4 h-[1.5px] bg-os-black transition-all duration-300 ${menuOpen ? 'opacity-0 my-0' : 'my-[2px]'}`} />
            <span className={`w-4 h-[1.5px] bg-os-black transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
          </button>
        </div>
      </div>


      {/* Main Grid: Left, Middle, Right Column Panels */}
      <div className="max-w-[1400px] mx-auto w-full relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-6 items-start shrink-0 py-2 h-fit">
        
        {/* Left Column: Headline & Description */}
        <div className="xl:col-span-3 flex flex-col text-left xl:pl-10 pb-6 xl:pb-0 h-fit">
          <span className="font-mono text-[11px] text-os-accent font-bold tracking-widest">// CREATOR CONCEPT</span>
          <h2 className="text-4xl md:text-5xl xl:text-[54px] font-heading font-black leading-[0.95] tracking-tighter text-os-black uppercase mt-6">
            I DON'T<br/>
            JUST<br/>
            CREATE<br/>
            CONTENT.
            <span className="text-os-accent block mt-3.5">
              I DOCUMENT<br/>
              CAMPUS<br/>
              CULTURE.
            </span>
          </h2>
          <div className="w-12 h-[2px] bg-os-accent mt-6" />
          <p className="font-mono text-[13px] md:text-sm text-os-black/75 max-w-sm leading-relaxed mt-6">
            From dance floors to diverse minds, from fests to friendships, I capture it all and turn it into memories that last forever.
          </p>

          <div className="mt-8">
            {/* Signature Widget */}
            <div className="flex items-center gap-4">
              <span className="font-serif italic text-2xl text-os-black opacity-85 select-none font-semibold tracking-wide">Sajid</span>
              <div className="h-[1px] w-20 bg-os-black/20" />
              <span className="text-os-accent font-bold text-sm">+</span>
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <div 
            onClick={(e) => {
              const scrollContainer = e.currentTarget.closest('.overflow-y-auto');
              if (scrollContainer) scrollContainer.scrollBy({ top: 380, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-os-accent/30 bg-os-accent/5 hover:bg-os-accent hover:text-[#F5F2EA] hover:border-os-accent rounded-full font-mono text-[9px] text-os-accent font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer w-fit mt-6 hover:scale-105 select-none shadow-[0_4px_12px_rgba(196,58,28,0.05)] animate-pulse"
          >
            <span>SCROLL DOWN</span>
            <svg className="w-2.5 h-2.5 fill-current animate-bounce mt-0.5" viewBox="0 0 24 24">
              <path d="M12 21l-12-18h24z"/>
            </svg>
          </div>
        </div>


        {/* Middle Column: Hero Video Frame & Quick Stats */}
        <div className="xl:col-span-5 flex flex-col justify-start items-start relative pt-0 pb-6 xl:pb-0 h-fit">
          
          <div className="w-full flex items-center justify-between mb-2 px-1 max-w-[560px] mx-0 xl:mx-auto">
            <span className="font-mono text-[9px] uppercase tracking-widest text-os-black/40">// CAPTURING. CREATING. CONNECTING.</span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-os-accent font-bold flex items-center gap-1">
              PLAY <span className="text-[7px]">▶</span>
            </span>
          </div>

          {/* Holographic Video Player Mockup */}
          <div className="relative max-w-[560px] mx-0 xl:mx-auto w-full aspect-[16/9] border border-os-black/15 bg-os-black rounded-lg overflow-hidden flex flex-col justify-end group shadow-[0_15px_35px_rgba(0,0,0,0.15)] pointer-events-auto cursor-pointer">
            {/* Video Background Image (Grayscale crowd/camera view) */}
            <img 
              src="/image.png" 
              alt="SRM Vibes Coverage"
              className="absolute inset-0 w-full h-full object-cover opacity-80 filter grayscale contrast-125 scale-105 group-hover:scale-100 transition-all duration-700"
            />
            
            {/* Red Overlay Sticker */}
            <div className="absolute top-4 left-4 bg-os-accent text-white font-mono text-[9px] md:text-[10px] font-bold px-3 py-1 shadow-md uppercase tracking-[0.2em] transform -rotate-2">
              SRM VIBES
            </div>

            {/* Video Title Overlay */}
            <div className="relative z-10 p-5 text-left bg-gradient-to-t from-black/95 to-transparent w-full">
              <p className="font-mono text-[8px] tracking-widest text-white/50 uppercase">ARCHIVE FOOTAGE</p>
              <h3 className="text-white font-heading font-black text-xl md:text-2xl tracking-tight uppercase mt-0.5 leading-none">
                WHERE MOMENTS BECOME MEMORIES.
              </h3>
              <div className="flex justify-between items-center mt-3 font-mono text-[8px] text-white/40 tracking-widest">
                <span>⊙ 07A</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                  REC
                </span>
              </div>
            </div>
          </div>

          {/* Creator Impact Archive — Extended Card: 24px Spacing */}
          <div className="w-full max-w-[560px] mx-0 xl:mx-auto mt-6 border border-os-black/12 bg-os-white hover:border-os-accent/35 hover:shadow-[0_4px_24px_rgba(196,58,28,0.09)] transition-all duration-500 rounded-sm group cursor-default overflow-hidden">
            <div className="flex items-stretch h-[130px]">

              {/* Left: Sample Certificate Photo */}
              <div className="relative w-[120px] shrink-0 overflow-hidden border-r border-os-black/10">
                <img
                  src="/sample.png"
                  alt="Certificate Sample"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                />
                {/* overlay label */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-os-black/30 pointer-events-none" />
                <span className="absolute bottom-2 left-2 font-mono text-[6px] uppercase tracking-widest text-white/70 bg-os-black/50 px-1 py-0.5">
                  SAMPLE
                </span>
              </div>

              {/* Centre: Number block */}
              <div className="flex flex-col justify-center items-start px-5 border-r border-os-black/8 shrink-0 min-w-[88px]">
                <span className="font-heading font-black text-[42px] leading-none text-os-black group-hover:text-os-accent transition-colors duration-300">10+</span>
                <span className="font-mono text-[6px] uppercase tracking-widest text-os-black/40 mt-1 text-left leading-tight">CERTIFICATES<br/>ISSUED</span>
              </div>

              {/* Right: Archive label + description */}
              <div className="flex-1 flex flex-col justify-between px-5 py-3">
                <div>
                  <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-os-accent font-bold">// CREATOR IMPACT ARCHIVE</span>
                  <p className="font-mono text-[9px] text-os-black/60 leading-relaxed tracking-wide mt-2">
                    Recognizing media team members, event volunteers and creative contributors across campus events through official participation certificates.
                  </p>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-os-accent animate-pulse" />
                    <span className="font-mono text-[7px] uppercase tracking-widest text-os-black/30">Active</span>
                  </div>
                  <span className="font-mono text-[7px] text-os-black/20 tracking-widest">ARCH-CC-10</span>
                </div>
              </div>

            </div>
          </div>

          {/* Quick Stats Grid: Positioned below Creator Impact Archive card */}
          <div className="w-full max-w-[560px] mx-0 xl:mx-auto grid grid-cols-4 gap-2 mt-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="border border-os-black/10 bg-[#E8E4D9]/20 p-2 rounded text-center flex flex-col justify-center">
                <span className="text-lg md:text-xl font-heading font-black text-os-accent leading-none">{stat.value}</span>
                <span className="font-mono text-[7px] font-bold text-os-black uppercase mt-1 leading-none tracking-wider">{stat.label}</span>
                <span className="font-mono text-[6px] text-os-black/40 uppercase mt-0.5 leading-none tracking-wider">{stat.sub}</span>
              </div>
            ))}
          </div>


        </div>

        {/* Right Column: Social Metrics & Tools */}
        <div className="xl:col-span-4 flex flex-col justify-start h-fit text-left space-y-6 xl:pr-10 pb-6 xl:pb-0">
          
          {/* Social Stats Block */}
          <div className="space-y-2">
            <span className="font-mono text-[10px] text-os-accent font-bold tracking-widest">// THE NUMBERS</span>
            <div className="grid grid-cols-2 gap-3">
              {/* Instagram followers */}
              <a
                href="https://www.instagram.com/srm_vipers/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-os-black/10 bg-[#E8E4D9]/20 p-3 rounded flex items-center gap-3 hover:border-os-accent/40 hover:bg-os-accent/5 transition-all duration-300 cursor-pointer"
              >
                <div className="w-8 h-8 rounded bg-os-accent/5 flex items-center justify-center border border-os-accent/15">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-os-accent fill-none stroke-[1.5px]">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </div>
                <div className="text-left font-mono">
                  <h4 className="text-lg font-heading font-black text-os-black leading-none">25K+</h4>
                  <span className="text-[7px] text-os-black/50 tracking-wider block mt-0.5">INSTAGRAM FOLLOWERS</span>
                </div>
              </a>

              {/* YouTube subscribers */}
              <a
                href="https://www.youtube.com/@Srmvibes05"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-os-black/10 bg-[#E8E4D9]/20 p-3 rounded flex items-center gap-3 hover:border-os-accent/40 hover:bg-os-accent/5 transition-all duration-300 cursor-pointer"
              >
                <div className="w-8 h-8 rounded bg-os-accent/5 flex items-center justify-center border border-os-accent/15">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-os-accent fill-none stroke-[1.5px]">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                  </svg>
                </div>
                <div className="text-left font-mono">
                  <h4 className="text-lg font-heading font-black text-os-black leading-none">8.06K</h4>
                  <span className="text-[7px] text-os-black/50 tracking-wider block mt-0.5">YOUTUBE SUBSCRIBERS</span>
                </div>
              </a>
            </div>
          </div>

          {/* Progress Impact Bars Block */}
          <div className="space-y-2.5">
            <span className="font-mono text-[10px] text-os-accent font-bold tracking-widest">// CONTENT IMPACT</span>
            <div className="space-y-2 border border-os-black/10 p-3 rounded bg-[#E8E4D9]/10">
              {impactMetrics.map((item, idx) => (
                <div key={idx} className="space-y-1 font-mono text-[9px]">
                  <div className="flex justify-between font-bold text-os-black/75">
                    <span>{item.label}</span>
                    <span className="text-os-accent">{item.percentage}</span>
                  </div>
                  <div className="w-full h-1.5 bg-os-black/5 rounded-full overflow-hidden">
                    <div className="h-full bg-os-accent" style={{ width: item.percentage }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools Grid Block */}
          <div className="space-y-2">
            <span className="font-mono text-[10px] text-os-accent font-bold tracking-widest">// CREATOR TOOLS</span>
            <div className="grid grid-cols-3 gap-2">
              {tools.map((tool, idx) => (
                <div key={idx} className="border border-os-black/10 bg-[#E8E4D9]/25 p-2 rounded flex flex-col items-center justify-center text-center">
                  <div className="w-7 h-7 rounded bg-os-black flex items-center justify-center font-heading font-black text-xs" style={{ color: 'var(--os-white)' }}>
                    {tool.short}
                  </div>
                  <span className="font-mono text-[7px] font-bold text-os-black/70 mt-1.5 uppercase leading-none tracking-wider">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Row 2: Moments Captured (Polaroid Horizontal Scroll list) */}
      <div className="max-w-[1400px] mx-auto w-full relative z-10 border-t border-os-black/10 pt-8 pb-2 shrink-0 mt-8">
        <div className="flex justify-between items-center mb-3">
          <span className="font-mono text-[9px] uppercase tracking-widest text-os-black/40">// MOMENTS CAPTURED</span>
          <div className="flex items-center gap-1.5">
            <button 
              onClick={() => scrollMoments('left')}
              className="w-5 h-5 flex items-center justify-center rounded-full border border-os-black/15 text-[8px] hover:bg-os-accent hover:text-white hover:border-os-accent transition-colors cursor-pointer pointer-events-auto"
            >
              ◀
            </button>
            <button 
              onClick={() => scrollMoments('right')}
              className="w-5 h-5 flex items-center justify-center rounded-full border border-os-black/15 text-[8px] hover:bg-os-accent hover:text-white hover:border-os-accent transition-colors cursor-pointer pointer-events-auto"
            >
              ▶
            </button>
          </div>
        </div>

        {/* Polaroid items container */}
        <div 
          ref={momentsContainerRef}
          className="flex gap-4 overflow-x-auto pb-4 scroll-smooth pointer-events-auto hide-scrollbar"
        >
          {moments.map((moment, idx) => (
            <a 
              key={idx} 
              href={moment.url}
              target="_blank"
              rel="noreferrer"
              className="flex-none w-[170px] relative pt-3 px-3 pb-5 bg-os-white border border-os-black/10 shadow-[0_8px_16px_rgba(0,0,0,0.06)] transform transition-transform duration-300 hover:scale-105 hover:-translate-y-1 hover:border-os-accent/40 block"
            >
              {/* Tape deco */}
              <div className="absolute top-[-4px] left-[35%] w-12 h-2.5 bg-[#D2C5B5]/60 border-t border-b border-os-black/5 -rotate-2" />
              
              {/* Inner Frame */}
              <div className="w-full aspect-[4/3.2] bg-os-black/5 relative overflow-hidden group/img cursor-pointer">
                {/* Actual Photo */}
                <img
                  src={moment.img}
                  alt={moment.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                />
                {/* Hover Play Symbol Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-9 h-9 rounded-full bg-os-accent text-white flex items-center justify-center shadow-lg transform scale-75 group-hover/img:scale-100 transition-transform duration-300">
                    <span className="text-[10px] font-bold font-mono pl-0.5">▶</span>
                  </div>
                </div>
                <span className="absolute top-2 left-2 font-mono text-[8px] font-black text-white bg-os-accent px-1 rounded-[2px] z-10">{moment.id}</span>
              </div>
              
              {/* Polaroid Caption */}
              <div className="text-center pt-3 font-mono">
                <p className="text-[8px] font-bold text-os-black tracking-wider uppercase leading-none">{moment.title}</p>
                <p className="font-serif italic text-[10px] text-os-black/60 mt-1.5 leading-none">{moment.caption}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Row 3: Creator Journey (Timeline) & Quote Box */}
      <div className="max-w-[1400px] mx-auto w-full border-t border-os-black/15 pt-4 pb-2 grid grid-cols-1 xl:grid-cols-12 gap-6 relative z-10 shrink-0">
        
        {/* Left/Center: Timeline Horizontal Node */}
        <div className="xl:col-span-8 flex flex-col xl:flex-row items-start xl:items-center gap-6 xl:border-r border-os-black/5 pr-4 text-left pb-6 xl:pb-0">
          
          <div className="bg-os-accent text-white font-mono text-[9px] font-bold tracking-widest py-2 px-3 rounded uppercase leading-none min-w-[120px] text-center">
            // CREATOR JOURNEY ➔
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-5 gap-4 sm:gap-2 relative w-full">
            <div className="hidden sm:block absolute top-[8px] left-2 right-2 h-[1px] bg-os-black/10 z-0" />
            
            {timeline.map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-row sm:flex-col items-center sm:items-start gap-3 sm:gap-0 text-left">
                <div className="w-3.5 h-3.5 shrink-0 rounded-full border border-os-accent bg-[#F5F2EA] flex items-center justify-center text-[7px] text-os-accent font-bold font-mono">
                  {idx + 1}
                </div>
                <div className="flex flex-col text-left sm:mt-2">
                  <h4 className="font-mono font-bold text-[9px] text-os-accent uppercase tracking-wider">{step.year}</h4>
                  <p className="font-mono text-[8px] text-os-black uppercase tracking-wider leading-relaxed mt-0.5">{step.title}</p>
                  <p className="font-mono text-[7px] text-os-black/40 uppercase tracking-widest leading-none mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right: Quote Box */}
        <div className="xl:col-span-4 bg-[#1A1918] text-white rounded-md p-4 flex items-center justify-between gap-4 relative overflow-hidden text-left shadow-lg">
          <div className="space-y-2 flex-1 pr-2 z-10">
            <span className="text-os-accent text-xl font-black font-serif leading-none block">“</span>
            <p className="font-mono text-[8px] tracking-wider uppercase leading-relaxed text-white/80">
              WE DON'T JUST CREATE CONTENT, WE PRESERVE MEMORIES. WE DON'T FOLLOW TRENDS, WE SET OUR OWN VIBES.
            </p>
            <span className="font-mono text-[7px] font-bold text-os-accent uppercase tracking-widest block mt-1">— SAJID S</span>
          </div>

          {/* Profile Circle Integration */}
          <div className="w-16 h-16 rounded-full border border-white/10 bg-white/5 relative overflow-hidden flex-none z-10">
            <img 
              src="/small.png" 
              alt="Sajid S" 
              className="w-full h-full object-cover filter grayscale contrast-125 scale-[1.7]"
            />
          </div>
        </div>

      </div>

      {/* Footer Branding Bar */}
      <div className="max-w-[1400px] mx-auto w-full border-t border-os-black/10 pt-3 flex flex-col md:flex-row justify-between items-center text-left relative z-10 font-mono text-[8px] uppercase tracking-widest text-os-black/40 shrink-0 gap-2 md:gap-0">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <span className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-os-accent" /> SRM VIBES</span>
          <span className="text-center sm:text-left">CAPTURING MOMENTS. CREATING MEMORIES. BUILDING LEGACY.</span>
        </div>
        <div>
          ARCHIVE ID : CA-07-2024
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

export default ContentCreator;
