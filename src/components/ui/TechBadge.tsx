import { motion } from 'framer-motion';
import { TechIcon } from './TechIcons';

interface TechBadgeProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

const techColors: Record<string, string> = {
  React: 'from-cyan-500/20 to-cyan-400/10 border-cyan-500/30',
  TypeScript: 'from-blue-600/20 to-blue-500/10 border-blue-500/30',
  JavaScript: 'from-yellow-500/20 to-yellow-400/10 border-yellow-500/30',
  'Node.js': 'from-green-600/20 to-green-500/10 border-green-500/30',
  'Next.js': 'from-gray-600/20 to-gray-500/10 border-gray-500/30',
  MongoDB: 'from-green-500/20 to-green-400/10 border-green-400/30',
  PostgreSQL: 'from-blue-700/20 to-blue-600/10 border-blue-600/30',
  Python: 'from-blue-500/20 to-yellow-500/10 border-blue-500/30',
  Docker: 'from-blue-500/20 to-blue-400/10 border-blue-400/30',
  TailwindCSS: 'from-teal-500/20 to-teal-400/10 border-teal-400/30',
  Express: 'from-gray-500/20 to-gray-400/10 border-gray-400/30',
  Redis: 'from-red-600/20 to-red-500/10 border-red-500/30',
  AWS: 'from-orange-500/20 to-orange-400/10 border-orange-400/30',
  Git: 'from-orange-600/20 to-orange-500/10 border-orange-500/30',
};

const iconSizes = {
  sm: 14,
  md: 18,
  lg: 22,
};

const TechBadge = ({ name, size = 'md', showIcon = true }: TechBadgeProps) => {
  const colorClass = techColors[name] || 'from-purple-500/20 to-purple-400/10 border-purple-400/30';

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <motion.span
      whileHover={{ scale: 1.08, y: -3 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 17,
      }}
      className={`
        tech-badge inline-flex items-center gap-1.5 rounded-full
        bg-gradient-to-r ${colorClass} border
        font-medium text-white/90
        ${sizeClasses[size]}
      `}
    >
      {showIcon && (
        <span className="tech-icon flex items-center justify-center">
          <TechIcon name={name} size={iconSizes[size]} />
        </span>
      )}
      <span>{name}</span>
    </motion.span>
  );
};

export default TechBadge;
