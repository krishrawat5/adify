import React, { CSSProperties, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

type AnimationMode = 'auto-rotate' | 'rotate-on-hover' | 'stop-rotate-on-hover';

interface BorderRotateProps extends Omit<HTMLMotionProps<"div">, 'className'> {
  children: ReactNode;
  className?: string;
 
  // Animation customization
  animationMode?: AnimationMode;
  animationSpeed?: number; // Duration in seconds
 
  // Color customization
  gradientColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  backgroundColor?: string;
 
  // Border customization
  borderWidth?: number;
  borderRadius?: number;
 
  // Container styling
  style?: CSSProperties;
}

const defaultGradientColors = {
  primary: '#3A0F63',     // Adify Primary
  secondary: '#a855f7',   // Adify Accent
  accent: '#faf5ff'       // Adify Light Purple
};

const BorderRotate: React.FC<BorderRotateProps> = ({
  children,
  className = '',
  animationMode = 'auto-rotate',
  animationSpeed = 4,
  gradientColors = defaultGradientColors,
  backgroundColor = '', 
  borderWidth = 1,
  borderRadius = 32,
  style = {},
  ...props
}) => {
  // Get animation class based on mode
  const getAnimationClass = () => {
    switch (animationMode) {
      case 'auto-rotate':
        return 'gradient-border-auto';
      case 'rotate-on-hover':
        return 'gradient-border-hover';
      case 'stop-rotate-on-hover':
        return 'gradient-border-stop-hover';
      default:
        return '';
    }
  };
 
  const borderStyle: CSSProperties = {
    '--animation-duration': `${animationSpeed}s`,
    position: 'absolute',
    inset: 0,
    padding: `${borderWidth}px`,
    borderRadius: `${borderRadius}px`,
    background: `
      conic-gradient(
        from var(--gradient-angle, 0deg),
        ${gradientColors.primary} 0%,
        ${gradientColors.secondary} 37%,
        ${gradientColors.accent} 30%,
        ${gradientColors.secondary} 33%,
        ${gradientColors.primary} 40%,
        ${gradientColors.primary} 50%,
        ${gradientColors.secondary} 77%,
        ${gradientColors.accent} 80%,
        ${gradientColors.secondary} 83%,
        ${gradientColors.primary} 90%
      )
    `,
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    maskComposite: 'exclude',
    pointerEvents: 'none',
    zIndex: 0,
  } as CSSProperties;
 
  return (
    <motion.div
      className={`relative ${className}`}
      style={{
        ...style,
        borderRadius: `${borderRadius}px`,
        backgroundColor: backgroundColor || undefined,
      }}
      {...props}
    >
      <div 
        className={`${getAnimationClass()}`}
        style={borderStyle}
      />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};

export { BorderRotate };
