import React from 'react';
import { motion } from 'motion/react';

const ImpactStatement = () => {
  return (
    <section className="w-full pt-[200px] pb-[140px] flex flex-col items-center justify-center relative bg-[#0B0B0F] px-[37px] overflow-hidden">
      {/* Inline styles for pulse animation */}
      <style>
        {`
          @keyframes text-glow-pulse {
            0% { text-shadow: 0 0 10px rgba(255,255,255,0.2), 0 0 20px rgba(255,255,255,0.1), 0 0 40px rgba(58,15,99,0.2); }
            50% { text-shadow: 0 0 15px rgba(255,255,255,0.4), 0 0 30px rgba(255,255,255,0.2), 0 0 60px rgba(58,15,99,0.4); }
            100% { text-shadow: 0 0 10px rgba(255,255,255,0.2), 0 0 20px rgba(255,255,255,0.1), 0 0 40px rgba(58,15,99,0.2); }
          }
          .animate-text-glow {
            animation: text-glow-pulse 4s ease-in-out infinite;
          }
        `}
      </style>

      {/* Dark premium background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3A0F63]/15 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none z-0" />
      
      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10 text-center">
        
        {/* Caption */}
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[#a085b5] text-[12px] md:text-[14px] font-bold uppercase tracking-[0.25em] mb-8 block"
        >
          BASED IN INDIA • OPERATING WORLDWIDE
        </motion.span>

        {/* Impact Heading */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <h2 className="text-white text-[28px] md:text-[44px] lg:text-[64px] font-[900] leading-[1.15] tracking-tight animate-text-glow">
            We build scalable growth systems for brands that want real results.
          </h2>
        </motion.div>

      </div>
    </section>
  );
};

export default ImpactStatement;
