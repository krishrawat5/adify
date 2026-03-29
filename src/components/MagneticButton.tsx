import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // How much it moves (0.1 to 0.5 is usually good)
  key?: React.Key;
}

/**
 * MagneticButton provides a subtle "magnetic" effect where the button
 * follows the cursor slightly when hovered.
 */
const MagneticButton = ({ children, className, strength = 0.2 }: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const boundingRect = ref.current?.getBoundingClientRect();

    if (boundingRect) {
      const { left, top, width, height } = boundingRect;
      
      // Calculate center of the button
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      // Calculate distance from center
      const x = (clientX - centerX) * strength;
      const y = (clientY - centerY) * strength;
      
      // Limit movement to 2px-6px as requested
      const limitedX = Math.max(Math.min(x, 6), -6);
      const limitedY = Math.max(Math.min(y, 6), -6);
      
      setPosition({ x: limitedX, y: limitedY });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className || ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ 
        type: "spring", 
        stiffness: 150, 
        damping: 20, 
        mass: 0.1,
        // Using spring for that "magnetic" snap-back feel, but keeping it tight
      }}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
