import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'clients', label: 'Clients' },
  { id: 'about', label: 'About' },
  { id: 'global', label: 'Why Adify' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'faqs', label: 'FAQs' }
];

const ScrollIndicator = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observers = new Map();

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Trigger when section is in the middle of the screen
      threshold: 0
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
        observers.set(id, element);
      }
    });

    // Check again after a slight delay to ensure elements are mounted
    setTimeout(() => {
        sections.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element && !observers.has(id)) {
              observer.observe(element);
              observers.set(id, element);
            }
          });
    }, 1000);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="fixed right-[20px] md:right-[30px] top-1/2 -translate-y-1/2 z-[100] hidden sm:flex flex-col items-center justify-center pointer-events-auto">
      <div className="px-3 py-6 bg-white/10 backdrop-blur-md rounded-full border border-white/5 shadow-2xl flex flex-col items-center gap-6">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <div
              key={section.id}
              onClick={() => handleScrollTo(section.id)}
              className="relative group cursor-pointer flex items-center justify-center w-6 h-6"
              title={section.label}
            >
              {/* Tooltip */}
              <div className="absolute right-full mr-4 px-3 py-1.5 bg-[#3A0F63] text-white text-[11px] font-bold rounded-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-[0_0_15px_rgba(58,15,99,0.5)]">
                {section.label}
              </div>

              {/* Dot */}
              <motion.div
                layout
                animate={{
                  width: isActive ? 12 : 6,
                  height: isActive ? 12 : 6,
                  backgroundColor: isActive ? '#3A0F63' : 'rgba(255, 255, 255, 0.3)',
                }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
                className={`rounded-full shadow-sm ${isActive ? 'shadow-[0_0_15px_#a855f7]' : ''}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollIndicator;
