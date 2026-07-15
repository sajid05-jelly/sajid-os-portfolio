import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const OSInterface = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [isDetailView, setIsDetailView] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => document.body.classList.contains('dark-theme'));
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = (e) => {
      const target = e.target;
      if (target && target.classList && target.classList.contains('overflow-y-auto')) {
        const currentScrollY = target.scrollTop;
        if (currentScrollY > 20) {
          setShowHeader(false);
        } else {
          setShowHeader(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
      // Dispatch custom event to notify other page widgets
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
    const handleThemeChange = () => {
      setIsDarkMode(document.body.classList.contains('dark-theme'));
    };
    window.addEventListener('themechange', handleThemeChange);

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
      setIsDarkMode(true);
    } else if (savedTheme === 'light') {
      document.body.classList.remove('dark-theme');
      setIsDarkMode(false);
    }

    const observer = new MutationObserver(() => {
      setIsDetailView(document.body.classList.contains('project-detail-active'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    setIsDetailView(document.body.classList.contains('project-detail-active'));
    return () => {
      window.removeEventListener('themechange', handleThemeChange);
      observer.disconnect();
    };
  }, []);

  const [mouseZone, setMouseZone] = useState('center');

  useEffect(() => {
    const handleMouseMove = (e) => {
      const width = window.innerWidth;
      if (e.clientX < width * 0.35) {
        setMouseZone('left');
      } else if (e.clientX > width * 0.65) {
        setMouseZone('right');
      } else {
        setMouseZone('center');
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getChannelNumber = () => {
    switch (location.pathname) {
      case '/': return { left: '07', right: '09' };
      case '/projects': return { left: '03', right: '04' };
      case '/artwork': return { left: '05', right: '06' };
      case '/about': return { left: '07', right: '08' };
      default: return { left: '00', right: '00' };
    }
  };

  const getVerticalNav = () => {
    switch (location.pathname) {
      case '/projects':
        return {
          leftText: 'About',
          leftNum: '',
          leftLink: '/about',
          rightText: 'Skills',
          rightNum: '',
          rightLink: '/skills',
          rightTop: 'top-[38%]'
        };
      case '/about':
        return {
          leftText: 'Certifications',
          leftNum: '',
          leftLink: '/certifications',
          rightText: 'Photography',
          rightNum: '',
          rightLink: '/artwork',
          rightTop: 'top-1/2'
        };
      case '/skills':
        return {
          leftText: 'Projects',
          leftNum: 'dot',
          leftLink: '/projects',
          rightText: 'About',
          rightNum: 'dot',
          rightLink: '/about',
          rightTop: 'top-1/2'
        };
      case '/certifications':
        return {
          leftText: 'Projects',
          leftNum: 'dot',
          leftLink: '/projects',
          rightText: 'Photography',
          rightNum: 'dot',
          rightLink: '/artwork',
          rightTop: 'top-1/2'
        };
      case '/content-creator':
        return {
          leftText: 'Selected Works 03',
          leftNum: 'dot',
          leftLink: '/projects',
          rightText: 'Creator Archive 07',
          rightNum: 'dot',
          rightLink: '/content-creator',
          rightTop: 'top-1/2'
        };
      default: // Home page (/) or artwork page
        return {
          leftText: 'Content Creator',
          leftNum: '',
          leftLink: '/content-creator',
          rightText: 'Contact',
          rightNum: '',
          rightLink: '/contact',
          rightTop: 'top-1/2'
        };
    }
  };

  if (location.pathname === '/artwork' || location.pathname === '/content-creator' || location.pathname === '/contact' || isDetailView) {
    return null;
  }

  return (
    <div className="os-interface-frame absolute inset-0 pointer-events-none z-[90] flex flex-col justify-between p-6">
      
      {/* Top Details (Minimalist Header Menu) */}
      {location.pathname !== '/content-creator' && (
        <div className={`absolute top-8 left-6 md:left-12 right-6 md:right-12 flex justify-between items-center pointer-events-auto transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-24'}`}>
        <NavLink to="/" className="group">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold tracking-tighter text-os-black group-hover:opacity-80 transition-opacity">
              SAJID<span className="font-light text-os-accent">OS</span>
            </h1>
            {location.pathname === '/skills' && (
              <>
                <span className="h-4 w-[1px] bg-os-black/10 hidden sm:inline xl:hidden"></span>
                <span className="font-mono text-xs uppercase tracking-widest text-os-accent font-bold hidden sm:inline xl:hidden">
                  Skill Archive 04
                </span>
              </>
            )}
            {location.pathname === '/about' && (
              <>
                <span className="h-4 w-[1px] bg-os-black/10 hidden sm:inline xl:hidden"></span>
                <span className="font-mono text-xs uppercase tracking-widest text-os-accent font-bold hidden sm:inline xl:hidden">
                  About Archive 03
                </span>
              </>
            )}
            {location.pathname === '/certifications' && (
              <>
                <span className="h-4 w-[1px] bg-os-black/10 hidden sm:inline xl:hidden"></span>
                <span className="font-mono text-xs uppercase tracking-widest text-os-accent font-bold hidden sm:inline xl:hidden">
                  Cert_Archive 01
                </span>
              </>
            )}
            {location.pathname === '/content-creator' && (
              <>
                <span className="h-4 w-[1px] bg-os-black/10 hidden sm:inline xl:hidden"></span>
                <span className="font-mono text-xs uppercase tracking-widest text-os-accent font-bold hidden sm:inline xl:hidden">
                  Content Archive 07
                </span>
              </>
            )}
          </div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-os-black/50 mt-0.5">
            Vol. 1 — Creative Protocol
          </p>
        </NavLink>

        {/* Center Navigation Menu */}
        <nav className="hidden xl:flex items-center gap-7 xl:gap-8 font-mono text-[10px] xl:text-xs uppercase tracking-widest text-os-black/60">
          <NavLink to="/about" className={({ isActive }) => `hover:text-os-accent transition-colors duration-300 ${isActive ? 'text-os-accent font-bold' : ''}`}>
            About Me
          </NavLink>
          <NavLink to="/skills" className={({ isActive }) => `hover:text-os-accent transition-colors duration-300 ${isActive ? 'text-os-accent font-bold' : ''}`}>
            Skills
          </NavLink>
          <NavLink to="/projects" className={({ isActive }) => `hover:text-os-accent transition-colors duration-300 ${isActive ? 'text-os-accent font-bold' : ''}`}>
            Projects
          </NavLink>
          <NavLink to="/certifications" className={({ isActive }) => `hover:text-os-accent transition-colors duration-300 ${isActive ? 'text-os-accent font-bold' : ''}`}>
            Certifications
          </NavLink>
          <NavLink to="/artwork" className={({ isActive }) => `hover:text-os-accent transition-colors duration-300 ${isActive ? 'text-os-accent font-bold' : ''}`}>
            Photography
          </NavLink>
          <NavLink to="/content-creator" className={({ isActive }) => `hover:text-os-accent transition-colors duration-300 ${isActive ? 'text-os-accent font-bold' : ''}`}>
            Content Creator
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `hover:text-os-accent transition-colors duration-300 ${isActive ? 'text-os-accent font-bold' : ''}`}>
            Contact
          </NavLink>
        </nav>
        
        <div className="flex items-center gap-6">
          {/* Retro Theme Toggle Button */}
          <div className="hidden sm:flex items-center gap-2 select-none pointer-events-auto">
            <button 
              onClick={toggleTheme}
              className="relative w-8 h-4 border border-os-black/35 rounded-full flex items-center p-0.5 transition-all duration-300 bg-os-black/5"
            >
              <div 
                className="w-2.5 h-2.5 bg-os-accent rounded-full shadow-sm transition-transform duration-300"
                style={{
                  transform: isDarkMode ? 'translateX(16px)' : 'translateX(0)'
                }}
              />
            </button>
            <span className="font-mono text-[8px] uppercase tracking-widest text-os-black/40 font-bold min-w-[30px]">
              {isDarkMode ? 'NIGHT' : 'DAY'}
            </span>
          </div>

          <div className="text-right flex flex-col items-end">
            <p className="text-[10px] font-mono text-os-black/60 uppercase tracking-widest">
              {time}
            </p>
            <div className="flex gap-1.5 mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-os-accent animate-pulse"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-os-black/30"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-os-black/30"></span>
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
      )}

      {/* Vertical Navigation (Left and Right) — Hidden on mobile / tablet */}
      {location.pathname !== '/content-creator' && location.pathname !== '/artwork' && (
        <>
          <div 
            className="absolute left-8 top-1/2 transition-all duration-500 ease-out origin-center pointer-events-auto hidden xl:block" 
            style={{ 
              writingMode: 'vertical-rl',
              transform: `translateY(-50%) rotate(-180deg) scale(${mouseZone === 'left' ? 1.6 : 1.0})`,
            }}
          >
            <NavLink to={getVerticalNav().leftLink} className="flex items-center gap-2 group">
              {getVerticalNav().leftNum === 'dot' ? (
                <span className="w-2 h-2 rounded-full bg-os-accent my-2"></span>
              ) : (
                <span className="font-heading font-black text-os-accent text-lg tracking-wider">
                  {getVerticalNav().leftNum}
                </span>
              )}
              <span className="font-heading font-bold tracking-[0.2em] uppercase text-os-accent text-lg transition-colors duration-300">
                {getVerticalNav().leftText}
              </span>
            </NavLink>
          </div>

          {location.pathname !== '/projects' && (
            <div 
              className={`absolute right-8 ${getVerticalNav().rightTop} transition-all duration-500 ease-out origin-center pointer-events-auto hidden xl:block`}
              style={{ 
                writingMode: 'vertical-rl',
                transform: `translateY(-50%) scale(${mouseZone === 'right' ? 1.6 : 1.0})`,
              }}
            >
              <NavLink to={getVerticalNav().rightLink} className="flex items-center gap-2 group">
              <span className="font-heading font-bold tracking-[0.2em] uppercase text-os-accent text-lg transition-colors duration-300">
                {getVerticalNav().rightText}
              </span>
              {getVerticalNav().rightNum === 'dot' ? (
                <span className="w-2 h-2 rounded-full bg-os-accent my-2"></span>
              ) : (
                <span className="font-heading font-black text-os-accent text-lg tracking-wider">
                  {getVerticalNav().rightNum}
                </span>
              )}
            </NavLink>
          </div>
          )}
        </>
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

export default OSInterface;
