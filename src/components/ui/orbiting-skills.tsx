"use client"
import React, { useEffect, useState, memo } from 'react';
import { 
  Target, 
  Users, 
  Zap, 
  Globe, 
  BarChart3, 
  Sparkles,
} from 'lucide-react';

// --- Type Definitions ---
type ServiceType = 'strategic' | 'social' | 'ads' | 'web' | 'automation' | 'seo';

type GlowColor = 'cyan' | 'purple';

interface ServiceIconProps {
  type: ServiceType;
}

interface ServiceConfig {
  id: string;
  orbitRadius: number;
  size: number;
  speed: number;
  serviceType: ServiceType;
  phaseShift: number;
  glowColor: GlowColor;
  label: string;
}

interface OrbitingServiceProps {
  config: ServiceConfig;
  angle: number;
}

interface GlowingOrbitPathProps {
  radius: number;
  glowColor?: GlowColor;
  animationDelay?: number;
}

// --- Icons Record using Lucide ---
const serviceIcons: Record<ServiceType, { component: React.ElementType; color: string }> = {
  strategic: {
    component: Target,
    color: '#E34F26' // Reddish
  },
  social: {
    component: Users,
    color: '#1572B6' // Blueish
  },
  ads: {
    component: Zap,
    color: '#F7DF1E' // Yellowish
  },
  web: {
    component: Globe,
    color: '#61DAFB' // Cyanish
  },
  automation: {
    component: BarChart3,
    color: '#339933' // Greenish
  },
  seo: {
    component: Sparkles,
    color: '#06B6D4' // Tealish
  }
};

// --- Memoized Icon Component ---
const ServiceIcon = memo(({ type }: ServiceIconProps) => {
  const Icon = serviceIcons[type]?.component;
  return Icon ? <Icon className="w-full h-full" /> : null;
});
ServiceIcon.displayName = 'ServiceIcon';

// --- Configuration for the Orbiting Services ---
const servicesConfig: ServiceConfig[] = [
  // Inner Orbit
  { 
    id: 'strategic',
    orbitRadius: 100, 
    size: 44, 
    speed: 0.8, 
    serviceType: 'strategic', 
    phaseShift: 0, 
    glowColor: 'cyan',
    label: 'Strategic Marketing'
  },
  { 
    id: 'social',
    orbitRadius: 100, 
    size: 44, 
    speed: 0.8, 
    serviceType: 'social', 
    phaseShift: (2 * Math.PI) / 3, 
    glowColor: 'cyan',
    label: 'Social Media'
  },
  { 
    id: 'ads',
    orbitRadius: 100, 
    size: 44, 
    speed: 0.8, 
    serviceType: 'ads', 
    phaseShift: (4 * Math.PI) / 3, 
    glowColor: 'cyan',
    label: 'Paid Ads'
  },
  // Outer Orbit
  { 
    id: 'web',
    orbitRadius: 180, 
    size: 50, 
    speed: -0.5, 
    serviceType: 'web', 
    phaseShift: 0, 
    glowColor: 'purple',
    label: 'Web Development'
  },
  { 
    id: 'automation',
    orbitRadius: 180, 
    size: 50, 
    speed: -0.5, 
    serviceType: 'automation', 
    phaseShift: (2 * Math.PI) / 3, 
    glowColor: 'purple',
    label: 'Automation'
  },
  { 
    id: 'seo',
    orbitRadius: 180, 
    size: 50, 
    speed: -0.5, 
    serviceType: 'seo', 
    phaseShift: (4 * Math.PI) / 3, 
    glowColor: 'purple',
    label: 'SEO'
  },
];

// --- Memoized Orbiting Service Component ---
const OrbitingService = memo(({ config, angle }: OrbitingServiceProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { orbitRadius, size, serviceType, label } = config;

  const x = Math.cos(angle) * orbitRadius;
  const y = Math.sin(angle) * orbitRadius;

  return (
    <div
      className="absolute top-1/2 left-1/2 transition-all duration-300 ease-out"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: isHovered ? 20 : 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative w-full h-full p-2.5 bg-slate-900/90 backdrop-blur-sm
          rounded-full flex items-center justify-center
          transition-all duration-300 cursor-pointer border border-white/10
          ${isHovered ? 'scale-125 shadow-2xl' : 'shadow-lg hover:shadow-xl'}
        `}
        style={{
          boxShadow: isHovered
            ? `0 0 30px ${serviceIcons[serviceType]?.color}40, 0 0 60px ${serviceIcons[serviceType]?.color}20`
            : undefined
        }}
      >
        <div className="w-full h-full p-0.5 text-white">
          <ServiceIcon type={serviceType} />
        </div>
        {isHovered && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900/95 backdrop-blur-sm rounded text-xs text-white whitespace-nowrap pointer-events-none border border-white/5">
            {label}
          </div>
        )}
      </div>
    </div>
  );
});
OrbitingService.displayName = 'OrbitingService';

// --- Optimized Orbit Path Component ---
const GlowingOrbitPath = memo(({ radius, glowColor = 'cyan', animationDelay = 0 }: GlowingOrbitPathProps) => {
  const glowColors = {
    cyan: {
      primary: 'rgba(6, 182, 212, 0.4)',
      secondary: 'rgba(6, 182, 212, 0.2)',
      border: 'rgba(6, 182, 212, 0.3)'
    },
    purple: {
      primary: 'rgba(147, 51, 234, 0.4)',
      secondary: 'rgba(147, 51, 234, 0.2)',
      border: 'rgba(147, 51, 234, 0.3)'
    }
  };

  const colors = glowColors[glowColor] || glowColors.cyan;

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        animationDelay: `${animationDelay}s`,
      }}
    >
      {/* Glowing background */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, transparent 30%, ${colors.secondary} 70%, ${colors.primary} 100%)`,
          boxShadow: `0 0 60px ${colors.primary}, inset 0 0 60px ${colors.secondary}`,
          animation: 'pulse 4s ease-in-out infinite',
          animationDelay: `${animationDelay}s`,
        }}
      />

      {/* Static ring for depth */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: `1px solid ${colors.border}`,
          boxShadow: `inset 0 0 20px ${colors.secondary}`,
        }}
      />
    </div>
  );
});
GlowingOrbitPath.displayName = 'GlowingOrbitPath';

// --- Main App Component ---
export default function OrbitingServices() {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setTime(prevTime => prevTime + deltaTime);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const orbitConfigs: Array<{ radius: number; glowColor: GlowColor; delay: number }> = [
    { radius: 100, glowColor: 'cyan', delay: 0 },
    { radius: 180, glowColor: 'purple', delay: 1.5 }
  ];

  return (
    <div className="w-full flex items-center justify-center overflow-hidden py-12">
      <div 
        className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px] flex items-center justify-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        
        {/* Central "Adify" Brand Icon with enhanced glow */}
        <div className="w-20 h-20 bg-gradient-to-br from-slate-800 to-slate-950 rounded-full flex items-center justify-center z-10 relative shadow-2xl border border-white/10">
          <div className="absolute inset-0 rounded-full bg-cyan-500/30 blur-xl animate-pulse"></div>
          <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="relative z-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="url(#orbit-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <defs>
                <linearGradient id="orbit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#9333EA" />
                </linearGradient>
              </defs>
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            </svg>
          </div>
        </div>

        {/* Render glowing orbit paths */}
        {orbitConfigs.map((config) => (
          <GlowingOrbitPath
            key={`path-${config.radius}`}
            radius={config.radius}
            glowColor={config.glowColor}
            animationDelay={config.delay}
          />
        ))}

        {/* Render orbiting service icons */}
        {servicesConfig.map((config) => {
          const angle = time * config.speed + (config.phaseShift || 0);
          return (
            <OrbitingService
              key={config.id}
              config={config}
              angle={angle}
            />
          );
        })}
      </div>
    </div>
  );
}
