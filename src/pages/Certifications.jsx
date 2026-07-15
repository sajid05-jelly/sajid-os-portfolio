import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  const domains = [
    { name: "AI & DATA SCIENCE", count: "07", icon: "🧠" },
    { name: "SOFTWARE DEV & WEB DEV", count: "04", icon: "</>" },
    { name: "CYBERSECURITY", count: "01", icon: "🛡" },
    { name: "PROFESSIONAL & CAREER SKILLS", count: "02", icon: "💼" },
    { name: "QUALITY & BUSINESS PROCESS", count: "01", icon: "⚙" },
    { name: "HACKATHONS & COMPETITIONS", count: "02", icon: "🏆" },
    { name: "SUSTAINABILITY & SOCIAL IMPACT", count: "01", icon: "🌱" },
    { name: "IMAGE PROC & COMPUTER VISION", count: "01", icon: "👁" }
  ];

  // 19 Certificates (Grid row layout: 6 - 6 - 6 - 1)
  const certificates = Array.from({ length: 19 }, (_, i) => ({
    id: String(i + 1).padStart(2, '0'),
    path: `/${i + 1}.png`,
    title: `Certificate ${String(i + 1).padStart(2, '0')}`
  }));

  const bottomStats = [
    { value: "19", label: "CERTIFICATES\nEARNED" },
    { value: "08", label: "DOMAINS\nCOVERED" },
    { value: "900+", label: "HOURS\nINVESTED" },
    { value: "100%", label: "REAL LEARNING\nNO SHORTCUTS" }
  ];

  // Toggle body class 'cert-zoomed' to hide background OSInterface borders/texts when certificate is open
  useEffect(() => {
    if (selectedCert) {
      document.body.classList.add('cert-zoomed');
    } else {
      document.body.classList.remove('cert-zoomed');
    }
    return () => {
      document.body.classList.remove('cert-zoomed');
    };
  }, [selectedCert]);

  // Keyboard navigation when certificate is zoomed
  useEffect(() => {
    if (!selectedCert) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        const currIdx = certificates.findIndex(c => c.id === selectedCert.id);
        const prevIdx = (currIdx - 1 + certificates.length) % certificates.length;
        setSelectedCert(certificates[prevIdx]);
      }
      if (e.key === 'ArrowRight') {
        const currIdx = certificates.findIndex(c => c.id === selectedCert.id);
        const nextIdx = (currIdx + 1) % certificates.length;
        setSelectedCert(certificates[nextIdx]);
      }
      if (e.key === 'Escape') {
        setSelectedCert(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCert]);

  const handlePrev = (e) => {
    e.stopPropagation();
    const currIdx = certificates.findIndex(c => c.id === selectedCert.id);
    const prevIdx = (currIdx - 1 + certificates.length) % certificates.length;
    setSelectedCert(certificates[prevIdx]);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    const currIdx = certificates.findIndex(c => c.id === selectedCert.id);
    const nextIdx = (currIdx + 1) % certificates.length;
    setSelectedCert(certificates[nextIdx]);
  };

  return (
    <div className="relative w-full h-full xl:h-full pt-16 pb-16 px-6 md:px-16 pointer-events-auto overflow-y-auto xl:overflow-y-hidden bg-[#F5F2EA] flex flex-col justify-between select-none">
      
      {/* Giant Background Watermark Outline Text */}
      <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none z-0 opacity-[0.02]">
        <h1 className="text-[12vw] font-heading font-black tracking-tighter leading-none text-os-black">ARCHIVE</h1>
      </div>

      <div className="max-w-[1400px] mx-auto w-full relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-4 items-center flex-1 py-6 xl:py-2">
        
        {/* Left Column: Intro */}
        <div className="xl:col-span-3 flex flex-col justify-between h-auto py-2 text-left xl:pl-10">
          <div className="space-y-4">
            <span className="font-mono text-[11px] text-os-accent font-bold tracking-widest">// CERTIFICATES</span>
            <h2 className="text-4xl md:text-[40px] font-heading font-black leading-[0.95] tracking-tighter text-os-black uppercase">
              CERTIFICATES<br/>
              ARE MILESTONES<br/>
              OF<br/>
              <span className="text-os-accent font-black">CONSISTENT<br/>EVOLUTION.</span>
            </h2>
            <div className="w-12 h-[2px] bg-os-accent" />
            <p className="font-mono text-[11px] text-os-black/75 max-w-xs leading-relaxed">
              A collection of 19 certificates across multiple domains. Each one represents dedication, learning and relentless growth.
            </p>
          </div>

          <div className="space-y-6 pt-6">
            {/* Archive Mode Box with Seal Icon */}
            <div className="border border-os-black/10 bg-[#E8E4D9]/25 rounded p-3 flex gap-3 items-center font-mono text-[10px]">
              <div className="text-os-accent text-xl">
                {/* Custom SVG Ribbons Certificate Seal Icon */}
                <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-os-accent fill-none stroke-[1.5px]">
                  <circle cx="12" cy="10" r="6" />
                  <path d="M9 15l-3 5h6l-3-5z" />
                  <path d="M15 15l3 5h-6l3-5z" />
                  <circle cx="12" cy="10" r="3" strokeDasharray="1 1" />
                </svg>
              </div>
              <div className="space-y-0.5">
                <span className="text-os-accent font-bold block uppercase tracking-wider">ARCHIVE MODE</span>
                <p className="text-os-black/60">19 CERTIFICATES</p>
                <p className="text-os-black/60">ACROSS MULTIPLE DOMAINS</p>
                <p className="text-os-black/40 text-[8px]">VERIFIED & CURATED ⊙</p>
              </div>
            </div>
            
            <button 
              onClick={() => setSelectedCert(certificates[0])}
              className="inline-flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-os-accent font-bold hover:opacity-80 transition-opacity pointer-events-auto group"
            >
              <span>View Certificate Stats</span>
              <span className="w-7 h-7 rounded border border-os-accent/30 flex items-center justify-center text-xs group-hover:bg-os-accent group-hover:text-white transition-colors duration-300">
                →
              </span>
            </button>
          </div>
        </div>

        {/* Center Column: Museum Gallery Wall */}
        <div className="xl:col-span-6 flex flex-col justify-center px-2 xl:px-4">
          <div className="text-left mb-3">
            <span className="font-mono text-[9px] uppercase tracking-widest text-os-black/40">// MUSEUM GALLERY</span>
          </div>

          {/* Museum Exhibition Board: Premium 3D Gallery Alcove Wall */}
          <div className="relative max-w-[560px] mx-0 xl:mx-auto w-full border-4 border-os-beige/50 bg-os-beige shadow-[inset_0_10px_30px_rgba(0,0,0,0.08),0_20px_50px_rgba(0,0,0,0.1)] rounded-lg overflow-hidden flex flex-col items-start">
            
            {/* Top Ceiling Ledge (Moulding casting shadow) */}
            <div className="w-full h-3 bg-os-white border-b border-os-black/10 shadow-[0_2px_5px_rgba(0,0,0,0.08)] relative z-20" />

            {/* Spotlight beams container (hidden on small viewports) */}
            <div className="hidden sm:flex absolute top-3 inset-x-0 h-48 pointer-events-none justify-around opacity-80 mix-blend-screen z-10">
              <div className="w-16 h-full bg-gradient-to-b from-[#FFFDF0]/80 via-[#FFFDF0]/15 to-transparent blur-md transform origin-top scale-x-125" />
              <div className="w-16 h-full bg-gradient-to-b from-[#FFFDF0]/80 via-[#FFFDF0]/15 to-transparent blur-md transform origin-top scale-x-125" />
              <div className="w-16 h-full bg-gradient-to-b from-[#FFFDF0]/80 via-[#FFFDF0]/15 to-transparent blur-md transform origin-top scale-x-125" />
              <div className="w-16 h-full bg-gradient-to-b from-[#FFFDF0]/80 via-[#FFFDF0]/15 to-transparent blur-md transform origin-top scale-x-125" />
              <div className="w-16 h-full bg-gradient-to-b from-[#FFFDF0]/80 via-[#FFFDF0]/15 to-transparent blur-md transform origin-top scale-x-125" />
              <div className="w-16 h-full bg-gradient-to-b from-[#FFFDF0]/80 via-[#FFFDF0]/15 to-transparent blur-md transform origin-top scale-x-125" />
            </div>

            {/* Inner Wall Content Wrapper */}
            <div className="w-full p-4 sm:p-5 pt-6 pb-4 relative z-10 flex flex-col items-start">
              
              {/* Responsive Grid of Certificates */}
              <div className="w-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-x-2 gap-y-3 items-center justify-items-start">
                {certificates.map((cert, idx) => (
                  <div key={idx} className="flex flex-col items-start group pointer-events-auto w-full max-w-[80px]">
                    <div 
                      onClick={() => setSelectedCert(cert)}
                      className="w-full aspect-[4/3] border-2 border-os-black bg-white shadow-[2px_4px_10px_rgba(0,0,0,0.15)] rounded-[2px] p-1 cursor-pointer transform transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-[5px_10px_18px_rgba(0,0,0,0.25)] hover:border-os-accent z-10"
                    >
                      <img 
                        src={cert.path} 
                        alt={cert.title} 
                        className="w-full h-full object-contain bg-white"
                        onError={(e) => {
                          e.target.src = "data:image/svg+xml,%3Csvg viewBox='0 0 100 75' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100' height='75' fill='%23fff'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='6' fill='%23ccc'%3ECERTIFICATE%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                    <span className="font-mono text-[8px] font-bold text-os-black/40 mt-1 group-hover:text-os-accent transition-colors">
                      {cert.id}
                    </span>
                  </div>
                ))}
              </div>

            </div>

            {/* Bottom Floor Ledge (Moulding baseboard shelf) */}
            <div className="w-full h-3 bg-[#E5E0D3] border-t border-os-black/10 shadow-[0_-2px_4px_rgba(0,0,0,0.05)] relative z-20" />

          </div>

          {/* Counter below the board */}
          <div className="flex justify-center items-center gap-3 mt-3 font-mono text-[9px] uppercase tracking-widest text-os-black/50">
            <span>TOTAL CERTIFICATES ARCHIVED:</span>
            <span className="border border-os-accent/30 px-2 py-0.5 text-os-accent font-bold bg-[#E8E4D9]">19</span>
          </div>
        </div>

        {/* Right Column: Domain Filter & Archive Info */}
        <div className="xl:col-span-3 flex flex-col justify-between h-auto text-left space-y-6 xl:pr-10">
          
          {/* Domain Filter Block */}
          <div className="space-y-3">
            <span className="font-mono text-[10px] text-os-accent font-bold tracking-widest">[ DOMAIN FILTER ]</span>
            <div className="divide-y divide-os-black/10 border-t border-b border-os-black/10 font-mono text-[11px]">
              {domains.map((domain, idx) => (
                <div key={idx} className="flex justify-between items-center py-1.5 hover:text-os-accent transition-colors cursor-pointer">
                  <div className="flex items-center gap-2">
                    <span className="text-os-accent/50 text-[9px] font-bold">{domain.icon}</span>
                    <span className="font-bold tracking-wider">{domain.name}</span>
                  </div>
                  <span className="text-os-black/40 text-[9px]">{domain.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Archive Info Block */}
          <div className="space-y-3">
            <span className="font-mono text-[10px] text-os-accent font-bold tracking-widest">[ ARCHIVE INFO ]</span>
            <div className="border border-os-black/10 bg-[#E8E4D9]/20 rounded-md p-3.5 flex items-center justify-between font-mono text-xs relative overflow-hidden">
              <div className="space-y-1 text-left flex-1">
                <p className="text-[9px] text-os-black font-bold uppercase tracking-wider">EVERY CERTIFICATE</p>
                <p className="text-[8px] text-os-black/60 tracking-wider">HAS A STORY.</p>
                <p className="text-[9px] text-os-black font-bold uppercase tracking-wider mt-1.5">EVERY SKILL.</p>
                <p className="text-[8px] text-os-black/60 tracking-wider">BUILDS IMPACT.</p>
                <div className="pt-2 text-[8px] text-os-black/40 uppercase tracking-widest">
                  LAST UPDATED <span className="block font-bold text-os-accent mt-0.5">07 / 13 / 2026</span>
                </div>
              </div>

              {/* Fingerprint branding widget */}
              <div className="w-12 h-12 flex items-center justify-center opacity-70">
                {/* Custom SVG Fingerprint Icon */}
                <svg viewBox="0 0 24 24" className="w-10 h-10 stroke-os-accent fill-none stroke-[1.25px]">
                  <path d="M12 2a10 10 0 0 0-10 10" />
                  <path d="M12 6a6 6 0 0 0-6 6" />
                  <path d="M12 10a2 2 0 0 0-2 2" />
                  <path d="M12 14v4" />
                  <path d="M16 12a4 4 0 0 1-4 4" />
                  <path d="M20 12a8 8 0 0 1-8 8" />
                  <path d="M8 12c0 2 1 3.5 2 4.5" />
                  <path d="M14 8c1.5 0 2.5 1 3 2.5" />
                </svg>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Row Stats Block */}
      <div className="max-w-[1400px] mx-auto w-full border-t border-os-black/15 pt-4 pb-2 flex flex-col sm:flex-row justify-between items-center text-left relative z-10 gap-4">
        
        {/* Left Info Sync */}
        <div className="hidden sm:block font-mono text-[8px] tracking-widest text-os-black/40 min-w-[70px]">
          DATA SYNCD <span className="block mt-1 font-bold text-os-black">07 / 13 / 26</span>
        </div>

        {/* Stats Grid Counters - Flattened as direct children of the flex row container */}
        <div className="grid grid-cols-2 gap-4 w-full sm:flex sm:flex-row sm:flex-1 justify-between">
          {bottomStats.map((stat, idx) => (
            <div key={idx} className="relative flex flex-col justify-center min-h-[50px] flex-1 pl-4 border-l border-os-black/5 sm:first:border-l-0">
              <h3 className="text-2xl md:text-3xl font-heading font-black text-os-accent leading-none">
                {stat.value}
              </h3>
              <p className="font-mono text-[8px] uppercase tracking-widest text-os-black/50 mt-1 leading-relaxed whitespace-pre-line">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Right Info Archive */}
        <div className="hidden sm:block font-mono text-[8px] tracking-widest text-os-black/40 text-right min-w-[90px] border-l border-os-black/5 pl-4">
          ARCHIVE ID <span className="block mt-1 font-bold text-os-black">CRT-01-2026</span>
        </div>

      </div>

      {/* Premium Inspect Zoom Modal */}
      {selectedCert && (
        <div 
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 bg-[#0d0c0c]/95 backdrop-blur-2xl z-[9999] flex items-center justify-center p-4 md:p-10 pointer-events-auto cursor-zoom-out animate-fadeIn"
        >
          {/* Close/Exit button on left side/top-left (positioned below header) */}
          <button 
            onClick={() => setSelectedCert(null)}
            className="absolute top-4 left-4 md:top-8 md:left-8 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/60 hover:text-os-accent hover:scale-105 transition-all duration-300 cursor-pointer pointer-events-auto bg-white/5 border border-white/10 px-3 py-1.5 rounded"
          >
            <span>✕ EXIT</span>
          </button>

          {/* Previous navigation button */}
          <button 
            onClick={handlePrev}
            className="absolute left-4 md:left-12 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-os-accent border border-white/20 text-white font-mono text-sm hover:scale-110 transition-all duration-300 pointer-events-auto cursor-pointer"
          >
            ←
          </button>

          {/* zoomed content frame */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative max-w-4xl w-full aspect-[4/3] bg-white border-2 border-os-black rounded p-2 shadow-2xl animate-scaleUp pointer-events-auto cursor-default"
          >
            <img 
              src={selectedCert.path} 
              alt={selectedCert.title} 
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.src = "data:image/svg+xml,%3Csvg viewBox='0 0 100 75' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100' height='75' fill='%23fff'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='6' fill='%23ccc'%3ECERTIFICATE%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>

          {/* Next navigation button */}
          <button 
            onClick={handleNext}
            className="absolute right-4 md:right-12 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-os-accent border border-white/20 text-white font-mono text-sm hover:scale-110 transition-all duration-300 pointer-events-auto cursor-pointer"
          >
            →
          </button>
        </div>
      )}

    </div>
  );
};

export default Certifications;
