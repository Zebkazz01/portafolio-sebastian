import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { Project, Language } from '../../types';
import projectsData from '../../data/projects.json';
import { TechIcon } from '../ui/TechIcons';
import { useTheme } from '../../hooks/useTheme';

const Projects = () => {
  const { t, i18n } = useTranslation();
  const [filter, setFilter] = useState<string>('all');
  const lang = i18n.language as Language;
  const { isDark } = useTheme();

  const projects = projectsData as Project[];

  const allTechnologies = Array.from(
    new Set(projects.flatMap((p) => p.technologies))
  );

  const filteredProjects =
    filter === 'all'
      ? projects
      : filter === 'featured'
      ? projects.filter((p) => p.featured)
      : projects.filter((p) => p.technologies.includes(filter));

  const filterButtonStyle = (active: boolean): React.CSSProperties => ({
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: 500,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    background: active
      ? 'linear-gradient(135deg, #4d7fff, #c44dff)'
      : isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.9)',
    color: active ? '#ffffff' : isDark ? '#a0a0a0' : '#4a4a5a',
    boxShadow: !active && !isDark ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none',
  });

  return (
    <section
      id="projects"
      style={{
        minHeight: '100vh',
        padding: '6rem 1.5rem',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
            {t('projects.title')}
          </h2>
          <p style={{ color: '#909090', fontSize: '1.1rem' }}>{t('projects.subtitle')}</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '3rem',
          }}
        >
          <motion.button
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            onClick={() => setFilter('all')}
            style={filterButtonStyle(filter === 'all')}
          >
            {t('projects.all')}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            onClick={() => setFilter('featured')}
            style={filterButtonStyle(filter === 'featured')}
          >
            {t('projects.featured')}
          </motion.button>
          {allTechnologies.slice(0, 4).map((tech) => (
            <motion.button
              key={tech}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              onClick={() => setFilter(tech)}
              style={filterButtonStyle(filter === tech)}
            >
              {tech}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div
          className="projects-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 25,
                delay: index * 0.08,
              }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="glass project-card"
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
              }}
            >
              {/* Image placeholder */}
              <div
                style={{
                  height: '180px',
                  background: 'linear-gradient(135deg, rgba(77, 127, 255, 0.2), rgba(196, 77, 255, 0.2))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <motion.span
                  className="tech-icon"
                  style={{ opacity: 0.7, display: 'flex' }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <TechIcon
                    name={
                      project.technologies.includes('React') ? 'React' :
                      project.technologies.includes('PHP') ? 'PHP' :
                      project.technologies.includes('MongoDB') ? 'MongoDB' :
                      project.technologies.includes('TypeScript') ? 'TypeScript' :
                      project.technologies[0] || 'React'
                    }
                    size={80}
                  />
                </motion.span>

                {project.featured && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      background: 'rgba(255, 107, 157, 0.8)',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                    }}
                  >
                    {t('projects.featured')}
                  </span>
                )}
              </div>

              {/* Content */}
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem', color: isDark ? '#ffffff' : '#1a1a2e' }}>
                  {project.title[lang] || project.title.es}
                </h3>
                <p style={{ color: isDark ? '#a0a0a0' : '#4a4a5a', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                  {project.description[lang] || project.description.es}
                </p>

                {/* Technologies */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '12px',
                        background: isDark ? 'rgba(77, 127, 255, 0.15)' : 'rgba(77, 127, 255, 0.12)',
                        border: `1px solid ${isDark ? 'rgba(77, 127, 255, 0.3)' : 'rgba(77, 127, 255, 0.4)'}`,
                        fontSize: '0.75rem',
                        color: isDark ? '#a0c0ff' : '#3d5a99',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #4d7fff, #6b8fff)',
                        color: '#ffffff',
                        fontSize: '0.85rem',
                        textDecoration: 'none',
                        fontWeight: 500,
                      }}
                    >
                      {t('projects.viewLive')}
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        background: isDark ? 'transparent' : 'rgba(0, 0, 0, 0.05)',
                        border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)'}`,
                        color: isDark ? '#c0c0c0' : '#4a4a5a',
                        fontSize: '0.85rem',
                        textDecoration: 'none',
                        fontWeight: 500,
                      }}
                    >
                      {t('projects.viewCode')}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
