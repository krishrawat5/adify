import React from 'react';
import { motion } from 'motion/react';

const AboutAdify: React.FC = () => {
  return (
    <section id="about" className="py-8 relative overflow-hidden">
      <div className="container-custom">
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="premium-card rounded-3xl md:rounded-[32px] p-6 md:p-[37px] overflow-hidden relative min-h-[400px] lg:min-h-[600px]"
        >
          {/* Empty Box as requested */}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutAdify;
