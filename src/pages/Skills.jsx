import React from 'react';
import { NavLink } from 'react-router-dom';

const Skills = () => {
  const coreStack = [
    { name: "REACT", id: "01", icon: "⚛" },
    { name: "FIREBASE", id: "02", icon: "🗄" },
    { name: "PYTHON", id: "03", icon: "⏵" },
    { name: "TAILWIND", id: "04", icon: "≋" },
    { name: "AI TOOLS", id: "05", icon: "✦" },
    { name: "VIDEO EDITING", id: "06", icon: "🎬" }
  ];

  const panels = [
    {
      num: "01",
      title: "CODE",
      img: "/code.png",
      list: ["JavaScript", "Java", "Python", "C++"]
    },
    {
      num: "02",
      title: "DESIGN",
      img: "/design.png",
      list: ["Figma", "UI/UX", "React", "Design Systems"]
    },
    {
      num: "03",
      title: "AI & DATA",
      img: "/ai.png",
      list: ["Python", "TensorFlow", "OpenAI API", "Automation"]
    },
    {
      num: "04",
      title: "CONTENT",
      img: "/content.png",
      list: ["Video Editing", "YouTube Analytics", "YouTube", "ChatGPT"]
    },
    {
      num: "05",
      title: "STRATEGY",
      img: "/str.png",
      list: ["Business Analysis", "Product Strategy", "Growth Strategist", "Planning"]
    }
  ];

  const bottomStats = [
    { value: "6+", label: "PROJECTS\nBUILT" },
    { value: "15+", label: "CERTIFICATIONS\nEARNED" },
    { value: "5+", label: "HACKATHONS\nPARTICIPATED" },
    { value: "1000+", label: "HOURS\nBUILT" }
  ];

  return (
    <div className="relative w-full h-full pt-16 pb-10 px-6 md:px-16 pointer-events-auto overflow-y-auto bg-[#F5F2EA] flex flex-col justify-between select-none">
      
      {/* Giant Background Watermark Outline Text */}
      <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none z-0 opacity-[0.03]">
        <h1 className="text-[12vw] font-heading font-black tracking-tighter leading-none text-os-black">SYSTEM</h1>
      </div>

      <div className="max-w-[1400px] mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center flex-1 py-6 lg:py-2">
        
        {/* Left Column: Intro */}
        <div className="lg:col-span-3 flex flex-col justify-between h-auto py-2 text-left lg:pl-10">
          <div className="space-y-4">
            <span className="font-mono text-[11px] text-os-accent font-bold tracking-widest">// SKILLS</span>
            <h2 className="text-4xl md:text-5xl font-heading font-black leading-none tracking-tighter text-os-black uppercase">
              SKILLS<br/>
              ARE NOT<br/>
              TOOLS.<br/>
              <span className="text-os-accent">THEY ARE<br/>SYSTEMS.</span>
            </h2>
            <div className="w-12 h-[2px] bg-os-accent" />
            <p className="font-mono text-[12px] text-os-black/75 max-w-xs leading-relaxed">
              I design, build and orchestrate digital systems that solve real problems.
            </p>
          </div>

          <div className="pt-6">
            <NavLink 
              to="/projects" 
              className="inline-flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-os-accent font-bold hover:opacity-80 transition-opacity pointer-events-auto group"
            >
              <span>View My Work</span>
              <span className="w-7 h-7 rounded-full border border-os-accent/30 flex items-center justify-center text-xs group-hover:bg-os-accent group-hover:text-white transition-colors duration-300">
                →
              </span>
            </NavLink>
          </div>
        </div>

        {/* Center Column: Matrix Panels */}
        <div className="lg:col-span-6 flex flex-col justify-center px-2 lg:px-4 lg:-ml-12">
          <div className="text-center mb-6">
            <span className="font-mono text-[9px] uppercase tracking-widest text-os-black/40">SKILL MATRIX</span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-10 lg:gap-3 items-start relative">
            {panels.map((panel, idx) => (
              <div key={idx} className="flex flex-col items-center">
                
                {/* 3D Skewed Parallelogram Panel Card */}
                <div 
                  className="w-full aspect-[1/2.2] border border-os-accent/20 bg-[#ECE9E0]/30 backdrop-blur-[2px] rounded-md p-3 flex flex-col justify-between shadow-[0_15px_30px_rgba(0,0,0,0.03)] transform -skew-y-12 transition-all duration-300 hover:border-os-accent hover:-translate-y-2 group relative overflow-hidden"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Full Panel Background Graphic */}
                  <img 
                    src={panel.img} 
                    alt={panel.title} 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-85 transition-opacity duration-300 z-0"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />

                  <div className="flex justify-between items-start relative z-10">
                    <span className="font-mono text-[10px] font-black text-os-accent bg-os-white/95 px-1 rounded-[2px]">{panel.num}</span>
                    <span className="text-[6px] text-os-accent/40 font-bold">●</span>
                  </div>
                  
                  <div className="text-left relative z-10">
                    <span className="font-heading font-black text-xs lg:text-[13px] tracking-tighter text-os-black uppercase block bg-os-white/95 px-1 py-0.5 rounded-[2px] backdrop-blur-[1px] w-fit">
                      {panel.title}
                    </span>
                  </div>
                </div>

                {/* Vertical Divider Line and Bullet Items */}
                <div className="w-[1px] h-8 bg-os-accent/25 my-3" />
                
                <div className="space-y-1.5 text-left w-full pl-1 lg:pl-2 font-mono text-[8px] lg:text-[9px] tracking-wide text-os-black/85">
                  {panel.list.map((item, key) => (
                    <div key={key} className="flex items-center gap-1">
                      <span className="text-os-accent font-bold">+</span>
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Core Stack & Status */}
        <div className="lg:col-span-3 flex flex-col justify-between h-auto text-left space-y-6 lg:pr-10">
          
          {/* Core Stack Block */}
          <div className="space-y-3">
            <span className="font-mono text-[10px] text-os-accent font-bold tracking-widest">// CORE STACK</span>
            <div className="divide-y divide-os-black/10 border-t border-b border-os-black/10 font-mono text-[11px]">
              {coreStack.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-2.5">
                  <div className="flex items-center gap-3">
                    <span className="text-os-accent text-xs font-bold">{item.icon}</span>
                    <span className="font-bold tracking-wider">{item.name}</span>
                  </div>
                  <span className="text-os-black/40 text-[9px]">{item.id}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Status Block */}
          <div className="space-y-3">
            <span className="font-mono text-[10px] text-os-accent font-bold tracking-widest">// STATUS</span>
            <div className="flex justify-between items-center font-mono text-xs">
              <div className="space-y-1.5 text-left">
                <h4 className="text-lg font-heading font-black text-os-black uppercase leading-none">EVOLVING</h4>
                <div className="w-8 h-[2px] bg-os-accent my-1" />
                <p className="text-[8px] text-os-black/50 tracking-widest uppercase">CONSTANTLY LEARNING.</p>
                <p className="text-[8px] text-os-black/50 tracking-widest uppercase">CONSTANTLY BUILDING.</p>
                <p className="text-[8px] text-os-black/50 tracking-widest uppercase">CONSTANTLY EVOLVING.</p>
              </div>

              {/* Minimalist circular radar target graphic */}
              <div className="relative w-12 h-12 flex items-center justify-center opacity-40">
                {/* SVG radar target circle layout */}
                <svg viewBox="0 0 40 40" className="w-full h-full stroke-os-black/20 fill-none stroke-[0.5px]">
                  <circle cx="20" cy="20" r="18" />
                  <circle cx="20" cy="20" r="12" strokeDasharray="2 2" />
                  <circle cx="20" cy="20" r="6" stroke="#E0533C" />
                  <circle cx="20" cy="20" r="1.5" fill="#E0533C" />
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
          DATA SYNCD <span className="block mt-1 font-bold text-os-black">04 / 05 / 24</span>
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
          ARCHIVE ID <span className="block mt-1 font-bold text-os-black">SKL-04-2024</span>
        </div>

      </div>



    </div>
  );
};

export default Skills;
