import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const getTechIcon = (techName) => {
  const normalized = techName.toLowerCase().trim();
  if (normalized.includes("react")) return "⚛️";
  if (normalized.includes("tailwind")) return "🎨";
  if (normalized.includes("firestore")) return "🗄️";
  if (normalized.includes("firebase")) return "🔥";
  if (normalized.includes("storage")) return "📦";
  if (normalized.includes("vite")) return "⚡";
  if (normalized.includes("javascript") || normalized === "js") return "🟨";
  if (normalized.includes("html")) return "🌐";
  if (normalized.includes("css")) return "🎨";
  if (normalized.includes("ai")) return "🧠";
  if (normalized.includes("redux")) return "🔄";
  if (normalized.includes("gsap")) return "🎬";
  if (normalized.includes("motion") || normalized.includes("framer")) return "✨";
  if (normalized.includes("d3")) return "📊";
  if (normalized.includes("node")) return "🟢";
  if (normalized.includes("express")) return "🚂";
  if (normalized.includes("mongo")) return "🍃";
  if (normalized.includes("bootstrap")) return "🟪";
  return "⚙️";
};

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragStart, setDragStart] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null); // null means show 3D Carousel, activeIndex means show detail
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [mouseZone, setMouseZone] = useState('center');

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
    if (selectedProject !== null) {
      document.body.classList.add('project-detail-active');
    } else {
      document.body.classList.remove('project-detail-active');
    }
    return () => {
      document.body.classList.remove('project-detail-active');
    };
  }, [selectedProject]);

  const projectsData = [
    { 
      id: "01",
      title: "Paperino SRM Hub",
      fullTitle: "PAPERINO SRM STUDY HUB",
      year: "2026", 
      type: "Educational Web Platform",
      role: "Founder & AI-Augmented Full Stack Developer",
      duration: "4+ Months (Ongoing)",
      status: "LIVE",
      technologies: "React.js, Tailwind CSS, Firebase, Firestore, Firebase Storage, Vite, JavaScript",
      link: "https://paperino-eta.vercel.app/",
      github: "https://github.com/sajid05-jelly/paperino.git",
      desc: "A unified platform for SRM students to access notes, PYQs and resources.",
      longDesc: "Paperino SRM Study Hub is a centralized platform built for SRM students to access subject notes, previous year question papers, important questions and study materials. It also includes tools like CGPA Calculator, ATS Resume Analyzer, and more to support academic and placement growth.",
      quote: "BUILDING RESOURCES TODAY, EMPOWERING STUDENTS TOMORROW.",
      highlights: [
        "Firebase Authentication & Firestore Database",
        "Real-time Material Upload & Management",
        "Advanced Search & Filter System",
        "Responsive Design for All Devices",
        "Built-in PDF Viewer",
        "Performance Optimized"
      ],
      bgClass: "bg-gradient-to-br from-[#302F2C] via-[#22211F] to-[#121110] border-t border-l border-white/20 text-[#F5F2EA] shadow-[0_45px_100px_rgba(0,0,0,0.9)] backdrop-blur-xl",
      image: "/pap.png",
      imgStyle: "absolute bottom-0 right-0 w-full h-[65%] object-cover object-left-top translate-x-[5%] translate-y-[5%] rounded-br-[40px]",
      mockBrowserImg: "/paperino.png",
      mockCards: [
        { title: "DASHBOARD", sub: "User Hub", img: "/dashboard.png" },
        { title: "MATERIALS", sub: "Subject Files", img: "/materials.png" },
        { title: "PYQ SECTION", sub: "Old Papers", img: "/pyq.png" },
        { title: "TOOLS", sub: "Calculators", img: "/tools.png" }
      ]
    },
    { 
      id: "02",
      title: "Paperino school",
      fullTitle: "PAPERINO SCHOOL",
      year: "Ongoing", 
      type: "Educational Technology Platform",
      role: "Founder & AI-Augmented Full Stack Developer",
      duration: "ONGOING",
      status: "ACTIVE",
      technologies: "HTML5, CSS3, JavaScript, Firebase, Firestore, AI Integration, Responsive UI/UX",
      link: "ONGOING",
      github: "ONGOING",
      desc: "A student-focused educational platform to centralize study resources, mock tests and AI tools.",
      longDesc: "Paperino School is a modern educational platform designed for students from 6th to 12th Standard. It brings together textbooks, study materials, previous year question papers, important questions, AI-powered learning tools, mock tests, and exam alerts into a single organized system. The platform helps students learn more effectively, prepare for exams with confidence, and access academic resources anytime, anywhere.",
      quote: "EMPOWERING STUDENTS, SIMPLIFYING EDUCATION.",
      highlights: [
        "Study Materials Repository & Previous Year Question Papers",
        "AI Question Generator & Online Mock Test System",
        "Exam Alert & Countdown System",
        "Firebase Cloud Integration & Multi-Language Support"
      ],
      bgClass: "bg-gradient-to-br from-[#2E2D2A] via-[#1D1C1B] to-[#0D0C0B] border-t border-l border-white/20 text-[#F5F2EA] shadow-[0_45px_100px_rgba(0,0,0,0.9)] backdrop-blur-xl",
      image: "/sch.png",
      imgStyle: "absolute bottom-0 left-0 w-full h-[65%] object-cover rounded-b-[40px]",
      mockBrowserImg: "/app.png",
      mockCards: [
        { title: "DASHBOARD", sub: "Admin Panel", img: "/dash.png" },
        { title: "STANDARDS", sub: "Class Selection", img: "/standards.png" },
        { title: "BEST UI", sub: "Interactive Nodes", img: "/ui.png" },
        { title: "ATTRACTIVE ICONS", sub: "Orbital Navigation", img: "/attractive.png" }
      ]
    },
    { 
      id: "03",
      title: "Digital Ecosystem",
      fullTitle: "ENTERPRISE DIGITAL ECOSYSTEM PLATFORM",
      year: "2026", 
      type: "ENTERPRISE DIGITAL WEB PLATFORM",
      role: "PROJECT-BASED DEVELOPER",
      duration: "3 MONTHS",
      status: "COMPLETED",
      technologies: "React, Tailwind CSS, Framer Motion, Firebase, Responsive Design",
      link: "COMPLETED",
      github: "COMPLETED",
      desc: "Successfully delivered a confidential enterprise-grade digital platform.",
      longDesc: "Successfully delivered a confidential enterprise-grade digital platform for a private client, focusing on premium UI/UX, performance optimization, and scalable architecture.",
      quote: "DESIGNED AND DEVELOPED A PREMIUM MULTI-PAGE ENTERPRISE WEBSITE.",
      highlights: [
        "Custom UI/UX Design",
        "Interactive Animations",
        "Responsive Development",
        "Case Study System",
        "Trust Center Module",
        "Digital Marketing Dashboard",
        "Performance Optimized Architecture"
      ],
      bgClass: "bg-gradient-to-br from-[#2A2926] via-[#1E1D1B] to-[#0E0D0C] border-t border-l border-white/20 text-[#F5F2EA] shadow-[0_45px_100px_rgba(0,0,0,0.9)] backdrop-blur-xl",
      image: "/aura.png",
      imgStyle: "absolute bottom-0 right-0 w-full h-[65%] object-cover rounded-b-[40px]",
      mockBrowserImg: "/core.png",
      mockCards: [
        { title: "SERVICE", sub: "Client Portal", img: "/first.png" },
        { title: "PROJECT", sub: "Case Archive", img: "/second.png" },
        { title: "DESIGN", sub: "Visual System", img: "/first.png" },
        { title: "60FPS", sub: "Performance", img: "/second.png" }
      ]
    },
    { 
      id: "04",
      title: "eBinPay 2.0",
      fullTitle: "EBINPAY 2.0 AI SMART WASTE SYSTEM",
      year: "2025", 
      type: "Academic / Innovation Project",
      role: "Founder & Augmented Full Stack Developer",
      duration: "3 Months",
      status: "Ongoing",
      technologies: "React.js, Vite, Tailwind CSS, JavaScript (ES6+), TensorFlow.js, framer motion, CSS3",
      link: "ONGOING",
      github: "ONGOING",
      desc: "An AI-powered smart waste management platform that automates waste segregation.",
      longDesc: "eBinPay 2.0 is an AI-powered smart waste management platform that automates waste segregation using machine learning. The system identifies waste categories from images, provides disposal guidance, and rewards users for eco-friendly actions.",
      quote: "Technology for smarter and greener waste disposal.",
      highlights: [
        "AI-based waste classification using image recognition",
        "Real-time prediction with TensorFlow.js",
        "Reward points and gamification system",
        "Responsive mobile-first design",
        "Modern UI with smooth animations and transitions",
        "Scalable architecture for future IoT integration"
      ],
      bgClass: "bg-gradient-to-br from-[#292825] via-[#191817] to-[#090807] border-t border-l border-white/20 text-[#F5F2EA] shadow-[0_45px_100px_rgba(0,0,0,0.9)] backdrop-blur-xl",
      image: "/bin.png",
      imgStyle: "absolute bottom-0 right-0 w-full h-[65%] object-cover rounded-b-[40px]",
      mockBrowserImg: "/01.png",
      mockCards: [
        { title: "SCAN ENGINE", sub: "AI Segregation", img: "/02.png" },
        { title: "ECO POINTS", sub: "Wallet Balances", img: "/03.png" },
        { title: "BIN MATRIX", sub: "Waste Categories", img: "/04.png" },
        { title: "HISTORY", sub: "Disposal Records", img: "/05.png" }
      ]
    },
    { 
      id: "05",
      title: "Creative Portfolio",
      fullTitle: "SAJIDOS – CREATIVE PORTFOLIO ARCHIVE",
      year: "2026", 
      type: "Personal Portfolio Website",
      role: "Founder & Augmented Full Stack Developer",
      duration: "2+ Months (Ongoing)",
      status: "LIVE",
      technologies: "React.js, Vite, Tailwind CSS, Framer Motion, GSAP, JavaScript (ES6+), HTML5, CSS3, Vercel Deployment",
      link: "https://sajidos-archive.web.app",
      desc: "An interactive personal portfolio designed to showcase projects and creative works.",
      longDesc: "SAJIDOS is a highly interactive personal portfolio designed to showcase projects, skills, certifications, photography, content creation, and creative works through a unique archive-inspired experience. It combines editorial design, creative storytelling, and modern web interactions to create an immersive digital identity.",
      quote: "Not just a portfolio. A living archive of creativity, technology, and impact.",
      highlights: [
        "Interactive Archive-Based UI",
        "Photography & Creative Showcase",
        "Premium Animations & Micro Interactions",
        "Scroll-Based Animations",
        "Performance Optimized Architecture",
        "Fully Responsive Layout"
      ],
      bgClass: "bg-gradient-to-br from-[#2C2B28] via-[#1C1B1A] to-[#0C0C0B] text-[#F5F2EA] shadow-[0_45px_100px_rgba(0,0,0,0.9)]",
      image: "/portf.png",
      imgStyle: "absolute bottom-0 right-0 w-full h-[65%] object-cover rounded-b-[40px]",
      mockBrowserImg: "/a.png",
      mockCards: [
        { title: "PROJECT", sub: "Case Studies", img: "/b.png" },
        { title: "CERTIFICATIONS", sub: "Credentials", img: "/c.png" },
        { title: "PHOTO ALBUM", sub: "Photography", img: "/d.png" },
        { title: "CONTENT CREATION", sub: "Creative Works", img: "/e.png" }
      ]
    },
    { 
      id: "06",
      title: "NeuroCare Voice",
      fullTitle: "NEUROCARE VOICE ASSISTANCE",
      year: "2025", 
      type: "HEALTHCARE SUPPORT PLATFORM",
      role: "Founder & Augmented Full Stack Developer",
      duration: "1 Month",
      status: "COMPLETED",
      technologies: "React, JavaScript, HTML, CSS, Firebase, Responsive UI",
      link: "COMPLETED",
      github: "COMPLETED",
      desc: "Developed a healthcare platform designed to provide resources for Parkinson's disease.",
      longDesc: "Developed a healthcare-focused web platform designed to provide information, awareness, and support resources for Parkinson's disease patients and caregivers. Built a responsive user interface with optimized performance and accessibility features.",
      quote: "EMPOWERING LIVES THROUGH ACCESSIBLE HEALTHCARE DESIGN.",
      highlights: [
        "Responsive Design",
        "Modern UI/UX",
        "Firebase Integration",
        "Optimized Performance",
        "Cross-device Compatibility",
        "Healthcare Information Management"
      ],
      bgClass: "bg-gradient-to-br from-[#2E2D2A] via-[#1D1C1B] to-[#0D0C0B] border-t border-l border-white/20 text-[#F5F2EA] shadow-[0_45px_100px_rgba(0,0,0,0.9)] backdrop-blur-xl",
      image: "/neuro.png",
      imgStyle: "absolute bottom-0 left-0 w-full h-[65%] object-cover rounded-b-[40px]",
      mockBrowserImg: "/onnu.png",
      mockCards: [
        { title: "VOICE ANALYSIS", sub: "Acoustic Biomarkers", img: "/rendu.png" },
        { title: "NEUROVOICE AI", sub: "Vocal Assessment", img: "/moonu.png" },
        { title: "TREMOR MONITOR", sub: "Patient Metrics", img: "/naalu.png" },
        { title: "DIAGNOSTICS", sub: "Assessment Hub", img: "/anju.png" }
      ]
    }
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? projectsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === projectsData.length - 1 ? 0 : prev + 1));
  };

  const handlePointerDown = (e) => {
    setDragStart(e.clientX);
  };

  const handlePointerUp = (e) => {
    if (dragStart === null) return;
    const dragEnd = e.clientX;
    const diff = dragStart - dragEnd;
    const swipeThreshold = 55;
    
    if (diff > swipeThreshold) {
      handleNext();
    } else if (diff < -swipeThreshold) {
      handlePrev();
    }
    setDragStart(null);
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleThemeChange = () => {
      // Trigger re-render or layout check if needed
    };
    window.addEventListener('themechange', handleThemeChange);
    return () => window.removeEventListener('themechange', handleThemeChange);
  }, []);

  // Keyboard navigation & Esc listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedProject !== null) return;
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape' && selectedProject !== null) {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, selectedProject]);

  // Wheel horizontal scrolling throttle implementation
  useEffect(() => {
    if (selectedProject !== null) return; // Disable scroll hijack on details page
    let lastScroll = 0;
    const handleScroll = (e) => {
      const now = Date.now();
      if (now - lastScroll < 800) return; // Debounce wheel sweeps
      
      if (Math.abs(e.deltaY) > 20 || Math.abs(e.deltaX) > 20) {
        if (e.deltaY > 0 || e.deltaX > 0) {
          handleNext();
        } else {
          handlePrev();
        }
        lastScroll = now;
      }
    };
    window.addEventListener('wheel', handleScroll, { passive: true });
    return () => window.removeEventListener('wheel', handleScroll);
  }, [activeIndex, selectedProject]);

  // Render Project Detail View
  if (selectedProject !== null) {
    const p = projectsData[selectedProject];
    return (
      <div className="relative w-full h-full xl:h-full pt-20 xl:pt-[45px] pb-8 px-6 md:px-16 pointer-events-auto overflow-y-auto overflow-x-hidden xl:overflow-y-hidden bg-[#F5F2EA] flex flex-col gap-2 select-none">
        
        {/* Large Background Watermark Text */}
        <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden opacity-[0.03] select-none">
          <span className="font-heading font-black text-[13vw] leading-none uppercase tracking-tighter text-os-black/80 whitespace-nowrap">
            {p.title}
          </span>
        </div>
        
        {/* Spacer for Global Navigation Header */}
        <div className="w-full h-5 shrink-0 relative z-20 border-b border-os-black/5 flex items-center justify-between pb-1">
          <div 
            onClick={() => setSelectedProject(null)} 
            className="flex items-center gap-2 cursor-pointer font-mono text-[9px] text-os-accent font-bold hover:underline"
          >
            ← BACK TO ARCHIVE
          </div>
          <div className="font-mono text-[9px] text-os-black/40">
            PROJECT ARCHIVE // VOL. 1
          </div>
        </div>

        {/* Main Grid structure exactly as mock 2 */}
        <div className="max-w-[1400px] mx-auto w-full relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-5 items-start py-4 xl:py-0">
          
          {/* Column 1: Left Index Panel (Span 3) */}
          <div className="xl:col-span-3 flex flex-col gap-4 text-left xl:border-r border-os-black/5 xl:pr-4">
            <div>
              <span className="font-mono text-[9px] text-os-black/45 tracking-widest uppercase">// PROJECT INDEX</span>
              <div className="flex items-baseline gap-2 mt-3 mb-2">
                <span className="font-heading font-black text-4xl text-os-accent">{p.id}</span>
                <span className="font-mono text-[11px] text-os-black/35">/ 06</span>
              </div>

              {/* Prev Next Arrows */}
              <div className="flex gap-1.5 mb-3">
                <button 
                  onClick={() => setSelectedProject((selectedProject - 1 + projectsData.length) % projectsData.length)}
                  className="w-7 h-7 rounded-full border border-os-black/20 flex items-center justify-center hover:bg-os-black hover:text-os-white transition-all duration-300 text-xs"
                >
                  ←
                </button>
                <button 
                  onClick={() => setSelectedProject((selectedProject + 1) % projectsData.length)}
                  className="w-7 h-7 rounded-full border border-os-black/20 flex items-center justify-center hover:bg-os-black hover:text-os-white transition-all duration-300 text-xs"
                >
                  →
                </button>
              </div>
            </div>

            {/* Vertical list of projects */}
            <div className="space-y-2.5 font-mono text-[9px] border-t border-os-black/5 pt-3">
              {projectsData.map((proj, idx) => (
                <div 
                  key={proj.id} 
                  onClick={() => setSelectedProject(idx)}
                  className={`flex items-center gap-3 cursor-pointer group py-1.5 ${idx === selectedProject ? 'text-os-accent font-bold' : 'text-os-black/45 hover:text-os-black'}`}
                >
                  <span className="font-bold">{proj.id}</span>
                  <div className="flex flex-col">
                    <span className="uppercase tracking-widest leading-none group-hover:underline">{proj.fullTitle.replace(" GLSL SHADERS", "").replace(" SNEAKER STORE", "").replace(" CREATIVE PORTFOLIO", "").replace(" FINTECH GATEWAY", "").replace(" FURNITURE E-COMMERCE HUB", "")}</span>
                  </div>
                  {idx === selectedProject && (
                    <span className="w-1.5 h-1.5 rounded-full bg-os-accent ml-auto" />
                  )}
                </div>
              ))}
            </div>

            {/* Status indicators */}
            <div className="border border-os-black/10 p-2.5 rounded-sm flex items-center justify-between bg-[#E8E4D9]/5 font-mono text-[8px] mt-1">
              <span className="text-os-black/60 font-bold uppercase">STATUS</span>
              <span className="text-green-600 font-bold flex items-center gap-1">ACTIVE <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" /></span>
            </div>

            {/* Barcode display */}
            <div className="border border-os-black/12 p-3 bg-os-white flex flex-col gap-1.5 font-mono text-[8px] rounded-sm shadow-sm mt-1">
              <div className="h-6 w-full flex justify-between gap-[1px]">
                {Array.from({ length: 45 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="h-full bg-os-black" 
                    style={{ width: i % 5 === 0 ? '3px' : i % 3 === 0 ? '1.5px' : '0.5px', opacity: i % 7 === 0 ? 0.35 : 0.8 }} 
                  />
                ))}
              </div>
              <span className="text-center tracking-widest text-os-black/40 text-[7px] uppercase font-bold">ARCHIVE ID : PA-09-001</span>
              {p.id === "01" && (
                <>
                  <div className="mt-2 border border-os-accent bg-os-accent/5 p-2 rounded-sm flex flex-col items-center gap-1.5 animate-fade-in">
                    <span className="text-[7.5px] text-os-accent font-bold uppercase tracking-widest blink-social">// COMMUNITY RADAR ACTIVE</span>
                    <div className="w-8 h-8 flex justify-center items-center relative my-0.5">
                      <svg className="w-full h-full stroke-os-accent/30 fill-none" viewBox="0 0 32 32">
                        <style>{`
                          @keyframes radar-sweep {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                          }
                          .radar-sweep-line {
                            transform-origin: 16px 16px;
                            animation: radar-sweep 2.5s infinite linear;
                          }
                          .blink-social { animation: blink-orange-black 1.5s infinite; }
                        `}</style>
                        {/* Concentric circles */}
                        <circle cx="16" cy="16" r="14" strokeWidth="0.75" />
                        <circle cx="16" cy="16" r="8" strokeWidth="0.5" />
                        <circle cx="16" cy="16" r="3" strokeWidth="0.5" className="fill-os-accent/10" />
                        {/* Crosshairs */}
                        <line x1="2" y1="16" x2="30" y2="16" strokeWidth="0.5" strokeDasharray="1 1" />
                        <line x1="16" y1="2" x2="16" y2="30" strokeWidth="0.5" strokeDasharray="1 1" />
                        {/* Sweeping line */}
                        <line x1="16" y1="16" x2="28" y2="10" stroke="#E65A33" strokeWidth="1.25" className="radar-sweep-line" />
                      </svg>
                    </div>
                    <span className="text-[6.5px] text-os-black/50 font-bold uppercase tracking-wide">INDEXING USERS : DYNAMIC</span>
                  </div>
                </>
              )}
              {p.id === "02" && (
                <>
                  <div className="mt-2 border border-os-accent bg-os-accent/5 p-2 rounded-sm flex flex-col items-center gap-1.5 animate-fade-in">
                    <span className="text-[7.5px] text-os-accent font-bold uppercase tracking-widest blink-social">// CLASSROOM METRIC ENGINE</span>
                    <div className="flex items-end justify-center gap-2 h-7 py-0.5 w-full max-w-[120px]">
                      <style>{`
                        @keyframes bar-grow {
                          0%, 100% { height: 25%; }
                          50% { height: 95%; }
                        }
                        .bar-node-1 { animation: bar-grow 1.4s infinite ease-in-out 0.1s; }
                        .bar-node-2 { animation: bar-grow 1.8s infinite ease-in-out 0.4s; }
                        .bar-node-3 { animation: bar-grow 1.2s infinite ease-in-out 0.2s; }
                        .bar-node-4 { animation: bar-grow 1.6s infinite ease-in-out 0.5s; }
                        .bar-node-5 { animation: bar-grow 1.5s infinite ease-in-out 0.3s; }
                        .blink-social { animation: blink-orange-black 1.5s infinite; }
                      `}</style>
                      <div className="w-1.5 bg-os-accent/40 rounded-t-sm bar-node-1" />
                      <div className="w-1.5 bg-os-accent rounded-t-sm bar-node-2" />
                      <div className="w-1.5 bg-os-accent/40 rounded-t-sm bar-node-3" />
                      <div className="w-1.5 bg-os-accent rounded-t-sm bar-node-4" />
                      <div className="w-1.5 bg-os-accent/40 rounded-t-sm bar-node-5" />
                    </div>
                    <span className="text-[6.5px] text-os-black/50 font-bold uppercase tracking-wide">METRICS RESPONSE : NORMAL</span>
                  </div>
                </>
              )}
              {p.id === "03" && (
                <>
                  <style>{`
                    @keyframes pipeline-flow {
                      0% { background-position: 0px 0px; }
                      100% { background-position: 40px 0px; }
                    }
                    .flow-line {
                      background: repeating-linear-gradient(90deg, #E65A33 0px, #E65A33 8px, transparent 8px, transparent 16px);
                      background-size: 40px 100%;
                      animation: pipeline-flow 1.5s infinite linear;
                    }
                  `}</style>
                  <div className="mt-2 border border-os-accent bg-os-accent/5 p-2 rounded-sm flex flex-col items-center gap-1.5 animate-fade-in">
                    <span className="text-[7.5px] text-os-accent font-bold uppercase tracking-widest blink-social">// PIPELINE DATA FLOW</span>
                    <div className="w-full h-2 bg-os-black/10 rounded-full overflow-hidden border border-os-black/5 relative py-0.5 px-0.5">
                      <div className="w-full h-full rounded-full flow-line" />
                    </div>
                    <span className="text-[6.5px] text-os-black/50 font-bold uppercase tracking-wide">BUS RATE : ACTIVE STREAMING</span>
                  </div>
                </>
              )}
              {p.id === "04" && (
                <>
                  <style>{`
                    @keyframes sensor-wave {
                      0%, 100% { height: 3px; }
                      50% { height: 14px; }
                    }
                    .wave-bar-1 { animation: sensor-wave 0.8s infinite alternate 0.1s; }
                    .wave-bar-2 { animation: sensor-wave 1.1s infinite alternate 0.3s; }
                    .wave-bar-3 { animation: sensor-wave 0.7s infinite alternate 0.5s; }
                    .wave-bar-4 { animation: sensor-wave 1.3s infinite alternate 0.2s; }
                    .wave-bar-5 { animation: sensor-wave 0.9s infinite alternate 0.4s; }
                  `}</style>
                  <div className="mt-2 border border-os-accent bg-os-accent/5 p-2 rounded-sm flex flex-col items-center gap-1.5 animate-fade-in">
                    <span className="text-[7.5px] text-os-accent font-bold uppercase tracking-widest blink-social">// AI RADAR MODEL STATUS</span>
                    <div className="flex items-end justify-center gap-1.5 h-4 py-0.5">
                      <div className="w-1 bg-[#1D1C1B] rounded-full wave-bar-1" />
                      <div className="w-1 bg-os-accent rounded-full wave-bar-2" />
                      <div className="w-1 bg-[#1D1C1B] rounded-full wave-bar-3" />
                      <div className="w-1 bg-os-accent rounded-full wave-bar-4" />
                      <div className="w-1 bg-[#1D1C1B] rounded-full wave-bar-5" />
                    </div>
                    <span className="text-[6.5px] text-os-black/50 font-bold uppercase tracking-wide">CONFIDENCE LEVEL : 98.4%</span>
                  </div>
                </>
              )}
              {p.id === "05" && (
                <>
                  <style>{`
                    @keyframes block-flicker {
                      0%, 100% { background-color: #1D1C1B; opacity: 0.3; }
                      50% { background-color: #E65A33; opacity: 0.95; }
                    }
                    .block-cell { animation: block-flicker 2s infinite ease-in-out; }
                  `}</style>
                  <div className="mt-2 border border-os-accent bg-os-accent/5 p-2 rounded-sm flex flex-col items-center gap-1.5 animate-fade-in">
                    <span className="text-[7.5px] text-os-accent font-bold uppercase tracking-widest blink-social">// ARCHIVE STORAGE SECTORS</span>
                    <div className="grid grid-cols-8 gap-1 py-1">
                      {Array.from({ length: 16 }).map((_, i) => {
                        const delay = (i * 0.13).toFixed(2);
                        const duration = (1.2 + (i % 3) * 0.4).toFixed(1);
                        return (
                          <div 
                            key={i} 
                            className="w-2.5 h-2.5 rounded-sm border border-os-black/5 block-cell" 
                            style={{ animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
                          />
                        );
                      })}
                    </div>
                    <span className="text-[6.5px] text-os-black/50 font-bold uppercase tracking-wide">INDEXED CORE ARCHIVE : 100%</span>
                  </div>
                </>
              )}
              {p.id === "06" && (
                <>
                  <div className="mt-2 border border-os-accent bg-os-accent/5 p-2 rounded-sm flex flex-col items-center gap-1.5 animate-fade-in">
                    <span className="text-[7.5px] text-os-accent font-bold uppercase tracking-widest blink-social">// BIOMETRIC MONITOR</span>
                    <div className="w-full h-8 flex justify-center items-center py-0.5">
                      <svg className="w-full h-full stroke-os-accent fill-none" viewBox="0 0 100 30">
                        <style>{`
                          @keyframes draw-path {
                            0% { stroke-dashoffset: 200; }
                            100% { stroke-dashoffset: 0; }
                          }
                          .draw-pulse {
                            stroke-dasharray: 200;
                            stroke-dashoffset: 200;
                            animation: draw-path 3s infinite linear;
                          }
                        `}</style>
                        <path 
                          className="draw-pulse" 
                          strokeWidth="1.5" 
                          d="M 0,15 L 30,15 L 35,5 L 40,25 L 45,15 L 50,15 L 55,10 L 60,20 L 65,15 L 100,15" 
                        />
                      </svg>
                    </div>
                    <span className="text-[6.5px] text-os-black/50 font-bold uppercase tracking-wide">SYSTEM LEVEL : DYNAMIC</span>
                  </div>
                </>
              )}
            </div>

          </div>

          {/* Column 2: Selected Project description block (Span 5) */}
          <div className="xl:col-span-5 flex flex-col gap-4 xl:gap-2 text-left xl:border-r border-os-black/5 xl:pr-4">
            
            <div className="space-y-2">
              <span className="font-mono text-[9px] text-os-accent font-bold tracking-widest uppercase">// SELECTED PROJECT</span>
              <h2 className="text-4xl font-heading font-black leading-[0.95] tracking-tighter text-os-black uppercase">
                {p.fullTitle}
              </h2>
              <div className="w-12 h-[2px] bg-os-accent" />
            </div>

            {/* Specifications Matrix Table */}
            <div className="border border-os-black/10 bg-[#E8E4D9]/15 rounded-sm p-2.5 font-mono text-[9px] space-y-1.5">
              <div className="flex justify-between border-b border-os-black/5 pb-1.5">
                <span className="text-os-black/45">PROJECT TYPE</span>
                <span className="text-os-black font-bold uppercase">{p.type}</span>
              </div>
              <div className="flex justify-between border-b border-os-black/5 pb-1.5">
                <span className="text-os-black/45">ROLE</span>
                <span className="text-os-black font-bold uppercase text-right max-w-[340px]">{p.role}</span>
              </div>
              <div className="flex justify-between border-b border-os-black/5 pb-1.5">
                <span className="text-os-black/45">{p.id === "01" ? "TOOLS" : p.id === "02" ? "TOOLS" : (p.id === "03" || p.id === "04" || p.id === "05" || p.id === "06") ? "DESIGN" : "TECHNOLOGIES"}</span>
                <span className="text-os-accent font-bold uppercase text-right max-w-[200px] truncate">
                  {p.id === "01" ? "ATS RESUME ANALYZER, PYQS PREDICTOR" : p.id === "02" ? "PYQ PREDICTOR, MOCK TEST" : p.id === "03" ? "FLUID CONCEPT" : p.id === "04" ? "MORPHISM" : p.id === "05" ? "TV IMMERSIVE" : p.id === "06" ? "VIOLET GLASSMORPHISM" : p.technologies}
                </span>
              </div>
              <div className="flex justify-between border-b border-os-black/5 pb-1.5">
                <span className="text-os-black/45">YEAR</span>
                <span className="text-os-black font-bold">{p.year}</span>
              </div>
              <div className="flex justify-between border-b border-os-black/5 pb-1.5">
                <span className="text-os-black/45">DURATION</span>
                <span className="text-os-black font-bold uppercase">{p.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-os-black/45">STATUS</span>
                <span className="text-green-600 font-bold flex items-center gap-1 uppercase">{p.status} <span className="w-1 h-1 rounded-full bg-green-500" /></span>
              </div>
            </div>

            {/* Project description paragraph */}
            <div className="space-y-1.5">
              <span className="font-mono text-[9px] text-os-black/45 tracking-widest uppercase">// PROJECT DESCRIPTION</span>
              <p className="font-mono text-[10px] text-os-black/75 leading-relaxed max-h-[105px] overflow-y-auto hide-scrollbar">
                {p.longDesc}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-1">
              {p.link === "ONGOING" ? (
                <div className="bg-os-black/10 text-os-black/40 px-5 py-2.5 rounded-sm font-mono text-[10px] font-bold uppercase tracking-wider select-none">
                  ONGOING
                </div>
              ) : p.link === "CONFIDENTIAL" ? (
                <div className="bg-os-black/10 text-os-black/40 px-5 py-2.5 rounded-sm font-mono text-[10px] font-bold uppercase tracking-wider select-none">
                  CONFIDENTIAL
                </div>
              ) : p.link === "COMPLETED" ? (
                <div className="bg-green-600/10 text-green-700 px-5 py-2.5 rounded-sm font-mono text-[10px] font-bold uppercase tracking-wider select-none border border-green-600/20">
                  COMPLETED
                </div>
              ) : (
                <a 
                  href={p.link} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="bg-os-accent text-white px-5 py-2.5 rounded-sm font-mono text-[10px] font-bold uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  LIVE PROJECT ↗
                </a>
              )}
              {p.github === "ONGOING" ? (
                <div className="border border-os-black/10 text-os-black/30 px-5 py-2.5 rounded-sm font-mono text-[10px] font-bold uppercase tracking-wider select-none">
                  ONGOING
                </div>
              ) : p.github === "CONFIDENTIAL" ? (
                <div className="border border-os-black/10 text-os-black/30 px-5 py-2.5 rounded-sm font-mono text-[10px] font-bold uppercase tracking-wider select-none">
                  CONFIDENTIAL
                </div>
              ) : p.github === "COMPLETED" ? (
                <div className="border border-green-600/20 text-green-700 px-5 py-2.5 rounded-sm font-mono text-[10px] font-bold uppercase tracking-wider select-none bg-green-600/10">
                  COMPLETED
                </div>
              ) : (
                <a 
                  href={p.github || "https://github.com"} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="border border-os-black/20 text-os-black px-5 py-2.5 rounded-sm font-mono text-[10px] font-bold uppercase tracking-wider hover:bg-os-black/5 transition-colors flex items-center gap-2"
                >
                  VIEW SOURCE CODE &lt;/&gt;
                </a>
              )}
            </div>

            {/* Tech Stack Section with orange border, placed below Action buttons */}
            <div className="space-y-1 mt-1 p-2 border border-os-accent rounded-sm bg-os-beige/10 text-left">
              <span className="font-mono text-[9.5px] text-os-accent font-bold tracking-widest uppercase">// TECHNOLOGIES INTEGRATED</span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {p.technologies.split(',').map((tech, idx) => {
                  const name = tech.trim();
                  return (
                    <div 
                      key={idx} 
                      className="flex items-center gap-1.5 px-2.5 py-1 bg-os-white/60 border border-os-accent/30 rounded-sm font-mono text-[8px] uppercase tracking-wider text-os-black/85 hover:border-os-accent transition-colors"
                    >
                      <span className="text-os-accent text-[9px]">{getTechIcon(name)}</span>
                      <span>{name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Accent Quote block, placed below Tech Stack */}
            <div className="border border-os-black/10 p-2.5 rounded-sm flex items-start gap-2 bg-[#E8E4D9]/5 mt-2 mb-2">
              <span className="text-os-accent font-serif text-xl leading-none font-bold font-heading">“</span>
              <p className="font-mono text-[9px] uppercase tracking-wide text-os-black/75 leading-relaxed text-center flex-1 font-bold">
                {p.quote}
              </p>
              <span className="text-os-accent font-serif text-xl leading-none font-bold font-heading">”</span>
            </div>

          </div>

          {/* Column 3: Mockup & Tech highlights (Span 4) */}
          <div className="xl:col-span-4 flex flex-col gap-3.5 text-left xl:pl-2 w-full">
            
            {/* Primary Browser Mockup Window */}
            <div className="w-full aspect-[1.45/1] bg-white border border-os-black/12 rounded-lg shadow-md overflow-hidden flex flex-col relative animate-fade-in">
              {/* Browser window header */}
              <div className="bg-[#EFECE3] border-b border-os-black/8 px-4 py-2 flex items-center justify-between shrink-0 font-mono text-[8px] tracking-wider text-os-black/60 select-none">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-os-accent/70" />
                    <span className="w-1.5 h-1.5 rounded-full bg-os-black/15" />
                    <span className="w-1.5 h-1.5 rounded-full bg-os-black/15" />
                  </div>
                  <span className="font-bold uppercase text-[7px] text-os-accent">{p.title}</span>
                </div>
                <div className="bg-[#F5F2EA] px-4 py-0.5 rounded text-[7px] uppercase border border-os-black/5 tracking-wider truncate max-w-[180px]">
                  {p.link}
                </div>
              </div>

              {/* Browser body view (mock representing srm success interface) */}
              {p.mockBrowserImg ? (
                <div className="flex-1 bg-[#F5F2EA] overflow-hidden relative">
                  <img 
                    src={p.mockBrowserImg} 
                    alt={p.title} 
                    className={`w-full h-full object-cover object-top transition-transform duration-300 ${p.id === "03" ? "scale-[1.4] origin-top" : ""}`} 
                  />
                </div>
              ) : (
                <div className="flex-1 bg-[#F5F2EA] p-4 flex flex-col justify-between overflow-hidden relative">
                  <div className="absolute top-1 right-2 opacity-5 select-none text-[80px] font-heading font-black tracking-tighter">OS</div>
                  
                  <div className="flex justify-between items-center relative z-10">
                    <div className="flex items-center gap-1.5 font-heading font-black text-[9px]">
                      <span className="text-os-accent">📕</span> PAPERINO
                    </div>
                    <div className="flex gap-2 font-mono text-[5px] text-os-black/40">
                      <span>HOME</span>
                      <span>MATERIALS</span>
                      <span>PYQS</span>
                      <span>BOOKS</span>
                    </div>
                  </div>

                  {/* Simulated search component */}
                  <div className="space-y-2 mt-4 relative z-10">
                    <p className="font-mono text-[5px] text-os-black/35 font-bold uppercase tracking-widest">// YOUR GATEWAY TO</p>
                    <h3 className="font-heading font-black text-xs md:text-sm text-os-black uppercase leading-tight tracking-tight text-left">
                      SRM Academic<br/><span className="text-os-accent">Success.</span>
                    </h3>
                    <p className="font-mono text-[6px] text-os-black/60 max-w-[140px] leading-relaxed">
                      Access notes, PYQs, important questions and smart tools — all in one place.
                    </p>

                    <div className="flex gap-1 pt-1.5">
                      <div className="border border-os-black/10 bg-[#E8E4D9]/20 px-2 py-1 flex-1 font-mono text-[5px] rounded-sm text-os-black/40">
                        Search subjects, materials...
                      </div>
                      <div className="bg-os-accent text-white px-3 font-mono text-[5px] font-bold rounded-sm uppercase tracking-wide flex items-center">
                        Search
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-3 border-t border-os-black/5 pt-2.5 font-mono text-[5px] text-os-black/40 relative z-10">
                    <span>50+ SUBJECTS</span>
                    <span>1000+ MATERIALS</span>
                    <span>250+ PYQS</span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom 4 Small Grid Mockup Cards */}
            <div className="grid grid-cols-4 gap-2">
              {(p.mockCards || [
                { title: "DASHBOARD", sub: "User Hub" },
                { title: "MATERIALS", sub: "Subject Files" },
                { title: "PYQ SECTION", sub: "Old Papers" },
                { title: "TOOLS", sub: "Calculators" }
              ]).map((gridCard, i) => (
                <div 
                  key={i} 
                  className="border border-os-black/10 bg-[#E8E4D9]/15 rounded-sm flex flex-col justify-between aspect-[1.1/1] text-left hover:border-os-accent/30 transition-colors relative overflow-hidden group/card"
                >
                  {gridCard.img && (
                    <>
                      <img 
                        src={gridCard.img} 
                        alt={gridCard.title} 
                        className="absolute inset-0 w-full h-full object-cover object-top opacity-100 transition-transform duration-300 group-hover/card:scale-[1.04]" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent z-10" />
                    </>
                  )}
                  
                  <span className={`font-mono text-[6px] z-20 relative font-bold p-1 ${gridCard.img ? 'text-white/80' : 'text-os-black/50'}`}>0{i+1}</span>
                  <div className="space-y-0.5 z-20 relative p-1">
                    <h5 className={`font-mono text-[6.5px] font-bold uppercase tracking-wider truncate ${gridCard.img ? 'text-white' : 'text-os-black'}`}>{gridCard.title}</h5>
                    <p className={`font-mono text-[5px] truncate font-semibold ${gridCard.img ? 'text-white/70' : 'text-os-black/50'}`}>{gridCard.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Technical Highlights list */}
            <div className="border border-os-black/8 bg-[#E8E4D9]/5 p-2.5 rounded-sm space-y-1.5 font-mono text-[8.5px] mt-0.5">
              <div className="flex items-center gap-1.5">
                <span className="text-os-accent font-bold">🎯</span>
                <span className="font-bold text-os-black/75 uppercase tracking-wider">TECHNICAL HIGHLIGHTS</span>
              </div>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-os-black/70 uppercase leading-snug">
                {p.highlights.map((high, idx) => (
                  <div key={idx} className="flex items-start gap-1">
                    <span className="text-os-accent font-bold">+</span>
                    <span>{high}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Project URL Widget */}
            <div className="border border-os-black/10 p-2 rounded-sm flex items-center justify-between bg-[#E8E4D9]/5 font-mono text-[8.5px] mt-1">
              <div className="flex items-center gap-2">
                <span className="text-os-accent text-xs">🔗</span>
                <span className="text-os-black/60 uppercase font-bold">PROJECT LINK</span>
              </div>
              {p.link === "ONGOING" ? (
                <span className="text-os-accent font-bold uppercase tracking-wider">ONGOING</span>
              ) : p.link === "CONFIDENTIAL" ? (
                <span className="text-os-accent font-bold uppercase tracking-wider">CONFIDENTIAL</span>
              ) : p.link === "COMPLETED" ? (
                <span className="text-green-600 font-bold uppercase tracking-wider">COMPLETED</span>
              ) : (
                <a href={p.link} target="_blank" rel="noreferrer" className="text-os-accent font-bold hover:underline truncate max-w-[200px]">{p.link}</a>
              )}
            </div>

            {p.id === "06" && (
              <>
                <style>{`
                  @keyframes radar-pulse {
                    0%, 100% { transform: scale(0.95); opacity: 0.8; }
                    50% { transform: scale(1.05); opacity: 1; }
                  }
                  @keyframes pulse-ring {
                    0% { transform: scale(0.6); opacity: 0.9; }
                    100% { transform: scale(2.0); opacity: 0; }
                  }
                  .radar-core { animation: radar-pulse 1.5s infinite ease-in-out; }
                  .radar-wave { animation: pulse-ring 1.5s infinite cubic-bezier(0.215, 0.61, 0.355, 1); }
                `}</style>
                <div className="border border-os-black/10 p-2.5 rounded-sm flex items-center justify-between bg-[#E8E4D9]/5 font-mono text-[8.5px] mt-1.5 animate-fade-in">
                  <div className="flex items-center gap-2">
                    <span className="text-os-accent text-xs">🧬</span>
                    <span className="text-os-black/60 uppercase font-bold">TELEMETRY SENSOR</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end gap-0.5 text-[7.5px] text-os-black/60 font-bold uppercase">
                      <span>STABILITY: OPTIMAL</span>
                      <span className="text-os-accent">ACCESSIBILITY: ACTIVE</span>
                    </div>
                    <div className="relative w-4 h-4 flex items-center justify-center">
                      <div className="absolute w-full h-full rounded-full bg-os-accent/30 radar-wave" />
                      <div className="w-2 h-2 rounded-full bg-os-accent radar-core shadow-sm" />
                    </div>
                  </div>
                </div>
              </>
            )}

            {p.id === "05" && (
              <div className="border border-os-black/10 p-2.5 rounded-sm flex items-center justify-between bg-[#E8E4D9]/5 font-mono text-[8.5px] mt-1.5 animate-fade-in">
                <div className="flex items-center gap-1.5">
                  <span className="text-os-accent text-[10px]">🌐</span>
                  <span className="text-os-black/60 uppercase font-bold">DIRECTORY</span>
                </div>
                <div className="flex items-center gap-4">
                  {/* Instagram */}
                  <a 
                    href="https://www.instagram.com/vibe_x_sajii/" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-1 hover:text-os-accent"
                  >
                    <svg className="w-3.5 h-3.5 fill-current blink-social" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                    </svg>
                  </a>

                  {/* GitHub */}
                  <a 
                    href="https://github.com/sajid05-jelly" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-1 hover:text-os-accent border-l border-os-black/10 pl-3"
                  >
                    <svg className="w-3.5 h-3.5 fill-current blink-social" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.82 1.102.82 2.222v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                  </a>

                  {/* Mail */}
                  <a 
                    href="mailto:mohamedsajid.sa@gmail.com" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-1 hover:text-os-accent border-l border-os-black/10 pl-3"
                  >
                    <svg className="w-3.5 h-3.5 fill-current blink-social" viewBox="0 0 24 24">
                      <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
                    </svg>
                  </a>
                </div>
              </div>
            )}

            {/* Social channels (WhatsApp and Instagram) for Paperino School */}
            {(p.id === "01" || p.id === "02") && (
              <div className="border border-os-black/10 p-2 rounded-sm flex items-center justify-between bg-[#E8E4D9]/5 font-mono text-[8.5px] mt-1.5 animate-fade-in">
                <div className="flex items-center gap-1.5">
                  <span className="text-os-accent text-[10px]">🌐</span>
                  <span className="text-os-black/60 uppercase font-bold">COMMUNITY</span>
                </div>
                <div className="flex items-center gap-3">
                  {/* WhatsApp */}
                  <a 
                    href="https://chat.whatsapp.com/BAu2CuzzE5JC0DPgzgsz6M" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-1.5 hover:underline"
                  >
                    <svg className="w-3.5 h-3.5 fill-current blink-social" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.035-4.22c1.661.987 3.298 1.498 5.922 1.499 5.378-.002 9.75-4.382 9.753-9.768.002-2.585-1.002-5.015-2.83-6.845C17.108 2.837 14.67 1.83 12.007 1.83c-5.385 0-9.757 4.382-9.76 9.768-.001 2.215.58 4.025 1.688 5.942l-.995 3.636 3.738-.98a9.697 9.697 0 0 0 5.379 1.584zM16.52 14.16c-.247-.125-1.47-.724-1.696-.807-.227-.083-.393-.125-.558.125-.165.25-.638.807-.783.973-.145.166-.29.187-.537.062a7.07 7.07 0 0 1-3.342-2.923c-.274-.473-.047-.732.18-.957.203-.203.454-.53.681-.795.228-.266.303-.454.455-.757.15-.303.076-.568-.038-.796-.114-.227-.558-1.347-.765-1.848-.2-.485-.403-.418-.558-.426-.145-.007-.31-.008-.475-.008t-.433.063c-.15.165-.572.56-.572 1.364 0 .804.585 1.58 1.002 2.146.417.566 2.2 3.376 5.33 4.73.745.32 1.327.51 1.782.656.748.237 1.43.203 1.968.122.6-.09 1.47-.6 1.673-1.18.203-.58.203-1.078.142-1.18-.06-.103-.227-.165-.475-.29z"/>
                    </svg>
                    <span className="font-bold text-os-black/75 hover:text-os-accent uppercase">WHATSAPP</span>
                  </a>

                  {/* Instagram */}
                  <a 
                    href="https://www.instagram.com/hi_paperino/" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-1.5 hover:underline border-l border-os-black/10 pl-3"
                  >
                    <svg className="w-3.5 h-3.5 fill-current blink-social" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                    </svg>
                    <span className="font-bold text-os-black/75 hover:text-os-accent uppercase">INSTAGRAM</span>
                  </a>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Footer info branding strip */}
        <div className="max-w-[1400px] mx-auto w-full border-t border-os-black/10 pt-2 flex justify-between items-center text-left relative z-10 font-mono text-[8px] uppercase tracking-widest text-os-black/40 shrink-0 mt-auto">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-os-accent" /> SAJIDOS</span>
            <span>CAPTURING MOMENTS. CREATING MEMORIES. BUILDING LEGACY.</span>
          </div>
          <div>
            ARCHIVE ID : PA-09-001
          </div>
        </div>

      </div>
    );
  }

  return (
    <div className="relative w-full h-full xl:h-full pt-44 md:pt-28 pb-24 px-6 md:px-16 pointer-events-auto overflow-y-auto overflow-x-hidden xl:overflow-y-hidden bg-[#F5F2EA] flex flex-col justify-start xl:justify-center select-none">
      
      {/* Large Background Watermark Text */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden opacity-[0.02] select-none">
        <span className="font-heading font-black text-[18vw] leading-none uppercase tracking-tighter text-os-black/80 whitespace-nowrap">
          {projectsData[activeIndex].title}
        </span>
      </div>
      
      {/* 3D Curved Guide Line */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-10 flex items-center justify-center">
        <svg viewBox="0 0 1000 1000" className="w-[120vw] h-[120vh]">
          <path d="M 100 500 C 300 200, 700 800, 900 500" fill="none" stroke="#1A1918" strokeWidth="1" strokeDasharray="5 10" />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto w-full relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-12 items-center">
        
        {/* Left Column: Heading, Info, and Controls */}
        <div className="xl:col-span-4 flex flex-col gap-6 py-2 z-20 text-left">
          <div className="space-y-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black leading-none tracking-tight text-os-black">
              SELECTED<br/>
              <span className="text-os-accent italic">WORKS</span>
            </h2>
            <p className="font-mono text-xs text-os-black/60 max-w-sm leading-relaxed">
              A curated selection of projects that reflect creativity, strategy, and digital craftsmanship. Click, scroll or use arrow keys.
            </p>
            <div className="pt-2">
              <svg className="w-8 h-8 text-os-black/30" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </div>
          </div>

          <div className="space-y-6 pt-12 xl:pt-0">
            <span 
              onClick={() => setSelectedProject(activeIndex)}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-os-accent font-bold hover:underline cursor-pointer pointer-events-auto"
            >
              View Project Specifications <span className="text-lg">→</span>
            </span>
            
            {/* Custom Carousel Navigation Bar */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex gap-2">
                <button 
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-os-black/20 flex items-center justify-center hover:bg-os-black hover:text-os-white transition-all duration-300 pointer-events-auto"
                >
                  ←
                </button>
                <button 
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-os-black/20 flex items-center justify-center hover:bg-os-black hover:text-os-white transition-all duration-300 pointer-events-auto"
                >
                  →
                </button>
              </div>
              
              <div className="flex items-center gap-3 font-mono text-xs text-os-black font-bold">
                <span>{`0${activeIndex + 1}`}</span>
                <span className="w-16 h-[2px] bg-os-black/10 relative">
                  <motion.span 
                    className="absolute top-0 left-0 h-full bg-os-accent"
                    initial={{ width: "0%" }}
                    animate={{ width: `${((activeIndex + 1) / projectsData.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </span>
                <span className="text-os-black/40">{`0${projectsData.length}`}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Stacked Cover Flow Carousel */}
        <div className="xl:col-span-8 flex items-center justify-center w-full h-[420px] sm:h-[480px] md:h-[580px] relative overflow-visible py-8 z-10">
          <div 
            className="w-full h-full relative flex items-center justify-center overflow-visible pointer-events-auto translate-y-4 md:translate-y-8"
            style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
          >
            {projectsData.map((project, index) => {
              let offset = index - activeIndex;
              const N = projectsData.length;
              
              // Calculate circular offset for infinite carousel
              if (offset > N / 2) {
                offset -= N;
              } else if (offset < -N / 2) {
                offset += N;
              }
              
              const isActive = index === activeIndex;
              
              // Tighter spacing to avoid side border overlaps
              const spacingMultiplier = windowWidth < 480 ? 150 : windowWidth < 640 ? 190 : 240;
              const zMultiplier = windowWidth < 640 ? 90 : 150;
              const translateX = offset * spacingMultiplier; 
              const translateZ = -zMultiplier * Math.abs(offset);
              const rotateY = offset === 0 ? 0 : (offset < 0 ? 25 : -25);
              const scale = offset === 0 ? 1.05 : 0.82;
              const opacity = Math.abs(offset) > 2 ? 0 : (offset === 0 ? 1 : 0.7);
              
              // Calculate zIndex based on offset
              const zIndex = 50 - Math.abs(offset);

              return (
                <motion.div
                  key={project.id}
                  onClick={() => {
                    if (isActive) {
                      setSelectedProject(index);
                    } else {
                      setActiveIndex(index);
                    }
                  }}
                  animate={{
                    x: translateX,
                    z: translateZ,
                    rotateY: rotateY,
                    scale: scale,
                    opacity: opacity,
                    zIndex: zIndex,
                  }}
                  whileHover={{
                    y: isActive ? -8 : 0,
                    scale: isActive ? 1.08 : scale,
                    transition: { duration: 0.3 }
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`absolute rounded-[24px] md:rounded-[40px] p-6 md:p-8 flex flex-col justify-between overflow-hidden cursor-pointer ${project.bgClass}`}
                  style={{ 
                    transformStyle: 'preserve-3d',
                    width: windowWidth < 480 ? '270px' : windowWidth < 640 ? '320px' : '400px',
                    height: windowWidth < 480 ? '380px' : windowWidth < 640 ? '420px' : '480px'
                  }}
                >
                  
                  {/* Card Header */}
                  <div className="flex justify-between items-start w-full relative z-20">
                    <span className="font-mono text-sm font-black text-os-accent">{project.id}</span>
                    <span className="font-mono text-[9px] tracking-widest font-bold border border-white/20 bg-white/5 px-2.5 py-0.5 rounded-full uppercase text-[#ffffff]/60 backdrop-blur-sm">
                      {project.type}
                    </span>
                  </div>

                  {/* Device Showcase Area (Full Bleed Background) */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none select-none rounded-[40px] z-0">
                    {project.hasWatermark && isActive && (
                      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 font-heading font-black text-6xl text-white/[0.02] tracking-wider z-0">
                        {project.hasWatermark}
                      </div>
                    )}
                    <motion.img 
                      src={project.image} 
                      alt={project.title} 
                      className="absolute inset-0 w-full h-full object-cover"
                      animate={{
                        y: isActive ? 0 : 5,
                        scale: isActive ? 1.05 : 1.0,
                        opacity: isActive ? 1 : 0.55
                      }}
                      transition={{ duration: 0.5 }}
                    />
                    {/* Dark gradient mask overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/60 opacity-80 z-10" />
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="w-full flex justify-between items-end relative z-20">
                    <div className="max-w-[75%] text-left">
                      <h4 className="text-3xl font-heading font-black leading-none tracking-tight">
                        {project.title}
                      </h4>
                      <p className="font-mono text-[10px] mt-2 leading-relaxed text-[#ffffff]/50">
                        {project.desc}
                      </p>
                      <span className="inline-block font-mono text-[10px] border border-white/10 text-white/40 px-2 py-0.5 rounded mt-3 bg-white/5 backdrop-blur-sm">
                        {project.year}
                      </span>
                    </div>

                    {/* Circular Action Button */}
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(index);
                      }}
                      className="w-12 h-12 rounded-full border border-[#ffffff]/20 text-os-white hover:border-os-accent hover:bg-os-accent hover:text-os-white flex items-center justify-center transition-all duration-300 shadow-md pointer-events-auto"
                    >
                      <span className="text-xl font-bold">↗</span>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
      
      {/* Bottom Showcase Tag */}
      <div className="absolute bottom-8 right-16 font-mono text-[9px] uppercase tracking-widest text-os-black/40 hidden md:block">
        Building Digital Experiences That Inspire People. <span className="text-os-accent font-bold">+</span>
      </div>
    </div>
  );
};

export default Projects;
