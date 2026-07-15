import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [displayPath, setDisplayPath] = useState(location.pathname);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionStage, setTransitionStage] = useState('idle'); // 'idle', 'closing', 'loading', 'opening'
  const isFirstRender = React.useRef(true);

  // Map paths to cool system messages
  const getSystemMessage = (path) => {
    switch (path) {
      case '/': return 'RETURNING TO SYSTEM ROOT INDEX...';
      case '/about': return 'RETURING ARCHIVE FOR MOHAMED SAJID...';
      case '/skills': return 'DECOMPRESSING SKILLS MATRIX SYSTEM...';
      case '/projects': return 'MOUNTING ARCHIVE VOL. 1 SECTOR...';
      case '/certifications': return 'VERIFYING CERTIFICATE HASH LEDGER...';
      case '/artwork': return 'STREAMING DIGITAL FRAMES FEED...';
      case '/content-creator': return 'ACCESSING CREATOR PIPELINE DATA...';
      case '/contact': return 'ESTABLISHING SECURE PROTOCOL LINK...';
      default: return 'OPENING DIRECTORY RECORD...';
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setIsTransitioning(true);
    setTransitionStage('closing');

    // Phase 1: Collapse CRT Screen (150ms)
    const t1 = setTimeout(() => {
      setDisplayPath(location.pathname);
      setTransitionStage('loading');
    }, 150);

    // Phase 2: Show simulated logs / loading (400ms)
    const t2 = setTimeout(() => {
      setTransitionStage('opening');
    }, 550);

    // Phase 3: Open CRT Screen back up (150ms)
    const t3 = setTimeout(() => {
      setIsTransitioning(false);
      setTransitionStage('idle');
    }, 700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [location.pathname]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Target Content */}
      <div 
        className={`w-full h-full transition-all duration-300 ${
          isTransitioning && transitionStage === 'closing' 
            ? 'scale-y-[0.005] scale-x-[0.8] opacity-50 blur-[2px]' 
            : isTransitioning && transitionStage === 'loading'
            ? 'hidden'
            : 'scale-100 opacity-100 blur-0'
        }`}
      >
        {children}
      </div>

      {/* Retro CRT Glitch Defragmenter Overlay */}
      {isTransitioning && transitionStage !== 'idle' && (
        <div className="absolute inset-0 bg-os-white z-[99999] flex flex-col justify-center items-center font-mono select-none px-12 md:px-24">
          
          {/* CRT scanline simulation */}
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,var(--os-black-5)_3px,var(--os-black-5)_4px)]" />

          {/* Collapsing screen lines */}
          <div className="w-full max-w-xl text-left space-y-3.5 relative z-10 text-os-accent">
            
            {/* Terminal log logs */}
            <div className="space-y-1 text-[9px] md:text-xs">
              <p className="opacity-40 text-os-black">SAJIDOS [VERSION 1.0.4]</p>
              <p className="opacity-40 text-os-black">© 2026 SAJID CORE SYSTEMS INC.</p>
              <div className="h-2" />
              <p className="font-bold flex items-center gap-2 text-os-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-os-accent animate-ping" />
                <span>&gt;&gt; ACCESSING NODE DIRECTORY: {displayPath.toUpperCase()}</span>
              </p>
              <p className="opacity-75 font-bold tracking-wider text-os-black">&gt;&gt; {getSystemMessage(displayPath)}</p>
            </div>

            {/* Matrix style block visualizer progress bar */}
            <div className="w-full h-6 border border-os-accent/20 bg-os-beige rounded-sm p-0.5 flex gap-0.5 relative overflow-hidden">
              {/* animated block sweeper */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-os-accent/10 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
              
              {/* Loading registers grid blocks */}
              {Array.from({ length: 24 }).map((_, i) => {
                const isLit = transitionStage === 'loading' || transitionStage === 'opening';
                const delay = (i * 0.015).toFixed(3);
                return (
                  <div 
                    key={i} 
                    className={`flex-1 h-full rounded-[1px] transition-all duration-300 ${isLit ? 'bg-os-accent' : 'bg-os-accent/5'}`}
                    style={{ 
                      transitionDelay: `${delay}s`,
                      boxShadow: isLit ? '0 0 6px rgba(217, 79, 48, 0.4)' : 'none'
                    }}
                  />
                );
              })}
            </div>

            <div className="flex justify-between items-center text-[8px] opacity-40 text-os-black">
              <span>SYSTEM MEMORY BLOCK ALLOCATION: SECURE</span>
              <span>200 OK</span>
            </div>

          </div>

          {/* Quick flickering flash glow */}
          <div className="absolute inset-0 bg-os-accent/5 pointer-events-none animate-flicker" />

        </div>
      )}
    </div>
  );
};

export default PageTransition;
