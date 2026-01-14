import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  fullHeight?: boolean;
}

const Section = ({
  id,
  title,
  subtitle,
  children,
  className = '',
  fullHeight = true,
}: SectionProps) => {
  return (
    <section
      id={id}
      className={`
        ${fullHeight ? 'min-h-screen' : ''}
        relative py-20 px-4 sm:px-6 lg:px-8
        ${className}
      `}
    >
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            {title && (
              <h2 className="font-space text-4xl md:text-5xl font-bold mb-4">
                <span className="gradient-text">{title}</span>
              </h2>
            )}
            {subtitle && (
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
