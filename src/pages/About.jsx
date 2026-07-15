import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const stats = [
    { value: "03+", label: "Years of\nExperience" },
    { value: "6+", label: "Successful\nProjects" },
    { value: "15+", label: "Certifications\nEarned" },
    { value: "05+", label: "Hackathons\nParticipated" }
  ];

  const infoItems = [
    { label: "NAME", value: "MOHAMED SAJID" },
    { label: "ROLE", value: "AUGMENTED FULL STACK DEVELOPER" },
    { label: "FOCUS", value: "AI + WEB EXPERIENCES" },
    { label: "LOCATION", value: "INDIA" }
  ];

  const connectLinks = [
    { label: "GITHUB", url: "https://github.com/sajid05-jelly" },
    { label: "INSTAGRAM", url: "https://www.instagram.com/vibe_x_sajii/" },
    { label: "EMAIL", url: "mailto:mohamedsajid.sa@gmail.com" },
    { label: "LINKEDIN", url: "https://www.linkedin.com/in/s-mohamed-sajid-50397933b/" }
  ];

  return (
    <div className="relative w-full h-full pt-16 pb-10 px-6 md:px-16 pointer-events-auto overflow-y-auto bg-[#F5F2EA] flex flex-col justify-between select-none">
      
      {/* Giant Background Watermark Outline Text */}
      <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none z-0 opacity-[0.03]">
        <h1 className="text-[12vw] font-heading font-black tracking-tighter leading-none text-os-black">MOHAMED</h1>
        <h1 className="text-[12vw] font-heading font-black tracking-tighter leading-none text-os-black mt-[-2vw]">SAJID</h1>
      </div>

      <div className="max-w-[1400px] mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 py-6 lg:py-2">
        
        {/* Left Column: Intro */}
        <div className="lg:col-span-4 flex flex-col justify-between h-auto py-2 text-left lg:pl-10">
          <div className="space-y-4">
            <span className="font-mono text-[11px] text-os-accent font-bold tracking-widest">// INTRO</span>
            <h2 className="text-4xl md:text-5xl font-heading font-black leading-none tracking-tighter text-os-black uppercase">
              I BUILD<br/>
              DIGITAL<br/>
              EXPERIENCES<br/>
              <span className="text-os-accent">THAT FEEL<br/>ALIVE.</span>
            </h2>
            <div className="w-12 h-[2px] bg-os-accent" />
            <p className="font-mono text-[13px] text-os-black/75 max-w-xs leading-relaxed">
              I blend creativity, code and strategy to craft meaningful digital experiences that connect brands with people.
            </p>
          </div>

          <div className="pt-6 flex items-center gap-3">
            <a 
              href="/resume.pdf" 
              download 
              className="inline-flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-os-accent font-bold hover:opacity-80 transition-opacity pointer-events-auto group"
            >
              <span>Download Resume</span>
              <span className="w-7 h-7 rounded border border-os-accent/30 flex items-center justify-center text-xs group-hover:bg-os-accent group-hover:text-white transition-colors duration-300">
                ↓
              </span>
            </a>
            <a 
              href="/resume.pdf" 
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-os-black/60 hover:text-os-accent transition-colors pointer-events-auto group"
              title="Preview Resume"
            >
              <span className="w-7 h-7 rounded border border-os-black/20 group-hover:border-os-accent/30 flex items-center justify-center text-xs group-hover:bg-os-accent group-hover:text-white transition-colors duration-300">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current fill-none stroke-[1.8px]">
                  <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </span>
            </a>
          </div>
        </div>

        {/* Center Column: 4-Point Cycle Circle Graphic */}
        <div className="lg:col-span-4 flex items-center justify-center pt-6 pb-28 lg:py-0">
          <div className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-[330px] md:h-[330px] flex items-center justify-center">
            
            {/* 1. Giant Circular Profile Image (Base Layer) */}
            <div className="absolute w-[170px] h-[170px] sm:w-[210px] sm:h-[210px] rounded-full border border-os-black/8 overflow-hidden bg-[#F5F2EA]/40 shadow-inner flex items-center justify-center p-1 pointer-events-auto hover:scale-[1.03] transition-transform duration-300">
              <img 
                src="/about.png" 
                alt="Sajid Portrait" 
                className="w-full h-full rounded-full object-cover filter grayscale contrast-[1.08] scale-[1.7] origin-[44%_72%]"
              />
            </div>

            {/* 2. SVG Connecting Tracks & Curving Arrows (Overlay Layer) */}
            <svg viewBox="0 0 200 200" className="w-full h-full absolute inset-0 z-10 pointer-events-none">
              {/* Inner Double Circles - Recolored to Accent Orange and bolded */}
              <circle cx="100" cy="100" r="18" fill="#F5F2EA" fillOpacity="0.8" stroke="#E0533C" strokeWidth="1.5" />
              <circle cx="100" cy="100" r="22" fill="none" stroke="#E0533C" strokeWidth="1.2" />
              
              {/* Outer Track Circle */}
              <circle cx="100" cy="100" r="64" fill="none" stroke="#E5E2D9" strokeWidth="1" strokeDasharray="3 3" />
              
              {/* Curved Connecting Arrows */}
              {/* Top to Right */}
              <path d="M 100 36 A 64 64 0 0 1 164 100" fill="none" stroke="#E0533C" strokeWidth="1.2" markerEnd="url(#arrow)" />
              {/* Right to Bottom */}
              <path d="M 164 100 A 64 64 0 0 1 100 164" fill="none" stroke="#E0533C" strokeWidth="1.2" markerEnd="url(#arrow)" />
              {/* Bottom to Left */}
              <path d="M 100 164 A 64 64 0 0 1 36 100" fill="none" stroke="#E0533C" strokeWidth="1.2" markerEnd="url(#arrow)" />
              {/* Left to Top */}
              <path d="M 36 100 A 64 64 0 0 1 100 36" fill="none" stroke="#E0533C" strokeWidth="1.2" markerEnd="url(#arrow)" />

              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 2 L 8 5 L 0 8 z" fill="#E0533C" />
                </marker>
              </defs>
            </svg>

            {/* 3. Central Red "S" Logo (Top Layer) */}
            <div className="absolute font-heading font-black text-3xl text-os-accent select-none mt-[-2px] z-20">
              S
            </div>

            {/* Top Label (DESIGN) */}
            <div className="absolute top-[4%] font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-os-black flex flex-col items-center">
              <span>DESIGN</span>
              <span className="text-os-accent text-sm font-bold mt-[-2px]">×</span>
            </div>

            {/* Right Label (CODE) */}
            <div className="absolute right-[4%] font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-os-black flex flex-col items-center">
              <span>CODE</span>
              <span className="text-os-accent text-sm font-bold mt-[-2px]">×</span>
            </div>

            {/* Bottom Label (AI) */}
            <div className="absolute bottom-[4%] font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-os-black flex flex-col items-center">
              <span>AI</span>
              <span className="text-os-accent text-sm font-bold mt-[-2px]">×</span>
            </div>

            {/* Left Label (CONTENT) */}
            <div className="absolute left-[4%] font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-os-black flex flex-col items-center">
              <span>CONTENT</span>
              <span className="text-os-accent text-sm font-bold mt-[-2px]">×</span>
            </div>

          </div>
        </div>

        {/* Right Column: Info & Connect */}
        <div className="lg:col-span-4 flex flex-col justify-between h-auto text-left space-y-6 lg:pr-10">
          
          {/* Info Block */}
          <div className="space-y-3">
            <span className="font-mono text-[10px] text-os-accent font-bold tracking-widest">// INFO</span>
            <div className="space-y-2 font-mono text-[11px]">
              {infoItems.map((item, idx) => (
                <div key={idx} className="flex items-start">
                  <span className="w-20 text-os-black/50">{item.label}</span>
                  <span className="text-os-black/30 mr-2">:</span>
                  <span className="text-os-accent font-bold">{item.value}</span>
                </div>
              ))}
              <div className="flex items-center pt-1">
                <span className="w-20 text-os-black/50">STATUS</span>
                <span className="text-os-black/30 mr-2">:</span>
                <span className="border border-os-accent text-[#E0533C] text-[8px] font-bold px-1.5 py-0.5 tracking-wider uppercase rounded bg-os-accent/5">
                  AVAILABLE FOR PROJECTS
                </span>
              </div>
            </div>
          </div>

          {/* Connect Block */}
          <div className="space-y-3">
            <span className="font-mono text-[10px] text-os-accent font-bold tracking-widest">// CONNECT</span>
            <div className="border-t border-os-black/10 divide-y divide-os-black/10 font-mono text-[11px]">
              {connectLinks.map((link, idx) => (
                <a 
                  key={idx} 
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-between items-center py-2 hover:text-os-accent transition-colors duration-300 pointer-events-auto"
                >
                  <span className="font-bold tracking-wider">{link.label}</span>
                  <span className="text-xs">↗</span>
                </a>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Row Stats Block */}
      <div className="max-w-[1400px] mx-auto w-full border-t border-os-black/15 pt-4 pb-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-left relative z-10">
        {stats.map((stat, idx) => (
          <div key={idx} className="relative flex flex-col justify-center min-h-[50px]">
            <h3 className="text-3xl md:text-4xl font-heading font-black text-os-accent leading-none">
              {stat.value}
            </h3>
            <p className="font-mono text-[9px] uppercase tracking-widest text-os-black/50 mt-1.5 leading-relaxed whitespace-pre-line">
              {stat.label}
            </p>
            {idx < 3 && (
              <div className="hidden md:block absolute right-0 top-1 bottom-1 w-[1px] bg-[#E5E2D9]" />
            )}
          </div>
        ))}
      </div>

      <div className="relative lg:absolute bottom-0 left-0 w-full bg-[#E5E2D9] py-1 overflow-hidden pointer-events-none select-none z-0 border-t border-os-black/5 mt-8 lg:mt-0">
        <div className="flex gap-4 items-center whitespace-nowrap animate-[marquee_6s_linear_infinite] font-mono text-[8px] font-bold uppercase tracking-[0.25em] text-os-accent">
          <span>✦ CREATIVE THINKER</span>
          <span>— PROBLEM SOLVER</span>
          <span>— FULL STACK DEVELOPER</span>
          <span>— CONTENT CREATOR</span>
          <span>— AI BUILDER</span>
          <span>✦ CREATIVE THINKER</span>
          <span>— PROBLEM SOLVER</span>
          <span>— FULL STACK DEVELOPER</span>
          <span>— CONTENT CREATOR</span>
          <span>— AI BUILDER</span>
          <span>✦ CREATIVE THINKER</span>
          <span>— PROBLEM SOLVER</span>
          <span>— FULL STACK DEVELOPER</span>
          <span>— CONTENT CREATOR</span>
          <span>— AI BUILDER</span>
        </div>
      </div>

    </div>
  );
};

export default About;
