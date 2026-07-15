import React from 'react';

const Artwork = () => {
  return (
    <div className="w-full min-h-full pt-32 pb-24 px-12 md:px-24 pointer-events-auto">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-heading font-bold uppercase tracking-widest text-os-black mb-12">Digital Archive</h2>
        
        {/* Masonry-style asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          <div className="md:col-span-8 aspect-video bg-os-beige flex items-center justify-center relative overflow-hidden group cursor-crosshair">
            <span className="font-mono text-xs text-os-black/40 z-10 group-hover:opacity-0 transition-opacity">FEATURED_01</span>
            <div className="absolute inset-0 bg-os-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          
          <div className="md:col-span-4 aspect-square bg-[#EAE7DF] flex items-center justify-center relative overflow-hidden group cursor-crosshair">
             <span className="font-mono text-xs text-os-black/40 z-10">PORTRAIT_02</span>
          </div>

          <div className="md:col-span-4 aspect-[3/4] bg-[#EAE7DF] flex items-center justify-center relative overflow-hidden group cursor-crosshair">
             <span className="font-mono text-xs text-os-black/40 z-10">SKETCH_03</span>
          </div>

          <div className="md:col-span-4 aspect-square bg-os-beige flex items-center justify-center relative overflow-hidden group cursor-crosshair mt-12">
             <span className="font-mono text-xs text-os-black/40 z-10">CONCEPT_04</span>
          </div>

          <div className="md:col-span-4 aspect-[4/3] bg-[#EAE7DF] flex items-center justify-center relative overflow-hidden group cursor-crosshair mt-24">
             <span className="font-mono text-xs text-os-black/40 z-10">RENDER_05</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Artwork;
