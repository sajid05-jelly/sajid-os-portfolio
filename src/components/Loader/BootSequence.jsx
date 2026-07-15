import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BootSequence = ({ onComplete }) => {
  const [staticNoise, setStaticNoise] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Phase 1: Show logo
    setTimeout(() => setPhase(1), 500);
    // Phase 2: Fade out logo, show static
    setTimeout(() => {
      setPhase(2);
      setStaticNoise(true);
      // Complete boot
      setTimeout(() => {
        onComplete();
      }, 600);
    }, 2500);
  }, [onComplete]);

  return (
    <div className="absolute inset-0 z-[100] bg-os-white flex items-center justify-center crt-flicker pointer-events-none">
      
      <AnimatePresence>
        {staticNoise && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="tv-static pointer-events-none z-[101]"
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {phase === 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-6xl font-heading font-black tracking-tighter text-os-black">
              SAJID<span className="font-light italic text-os-accent">OS</span>
            </h1>
            <p className="mt-4 font-mono text-xs uppercase tracking-widest text-os-black/50">
              Initializing Creative Environment
            </p>
            <div className="w-48 h-[1px] bg-os-black/20 mt-8 relative overflow-hidden">
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0 bg-os-black"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
};

export default BootSequence;
