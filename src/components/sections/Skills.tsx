import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { Technology } from '../../types';
import technologiesData from '../../data/technologies.json';
import { TechIcon } from '../ui/TechIcons';
import { useTheme } from '../../hooks/useTheme';

const Skills = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const technologies = technologiesData as Technology[];

  const categories = [
    { id: 'frontend', label: t('skills.frontend'), iconName: 'React' },
    { id: 'backend', label: t('skills.backend'), iconName: 'Node.js' },
    { id: 'database', label: t('skills.database'), iconName: 'PostgreSQL' },
    { id: 'tools', label: t('skills.tools'), iconName: 'Git' },
  ];

  return (
    <section
      id="skills"
      style={{
        minHeight: '100vh',
        padding: '6rem 1.5rem',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h2
            className="font-space ai-gradient-text"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, marginBottom: '1rem' }}
          >
            {t('skills.title')}
          </h2>
          <p style={{ color: '#909090', fontSize: '1.1rem' }}>{t('skills.subtitle')}</p>
        </motion.div>

        {/* Skills Grid */}
        <div
          className="skills-grid"
          style={{
            display: 'grid',
            gap: '1.5rem',
          }}
        >
          {categories.map((category, categoryIndex) => {
            const categoryTechs = technologies.filter((tech) => tech.category === category.id);

            if (categoryTechs.length === 0) return null;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                className="glass"
                style={{
                  padding: '1.5rem',
                  borderRadius: '16px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  <span className="tech-icon" style={{ display: 'flex', alignItems: 'center' }}>
                    <TechIcon name={category.iconName} size={28} />
                  </span>
                  <h3
                    className="font-space"
                    style={{ fontSize: '1.1rem', fontWeight: 600, color: isDark ? '#ffffff' : '#1a1a2e' }}
                  >
                    {category.label}
                  </h3>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {categoryTechs.map((tech, techIndex) => (
                    <motion.span
                      key={tech.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 20,
                        delay: categoryIndex * 0.08 + techIndex * 0.04,
                      }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.08, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.4rem 0.75rem',
                        borderRadius: '20px',
                        background: `rgba(${parseInt(tech.color.slice(1, 3), 16)}, ${parseInt(tech.color.slice(3, 5), 16)}, ${parseInt(tech.color.slice(5, 7), 16)}, ${isDark ? '0.15' : '0.12'})`,
                        border: `1px solid ${tech.color}${isDark ? '40' : '60'}`,
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        color: isDark ? '#e0e0e0' : '#3a3a4a',
                        cursor: 'default',
                      }}
                    >
                      <span className="tech-icon" style={{ display: 'flex', alignItems: 'center' }}>
                        <TechIcon name={tech.name} size={16} />
                      </span>
                      <span>{tech.name}</span>
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
