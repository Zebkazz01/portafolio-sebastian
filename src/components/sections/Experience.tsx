import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';

const Experience = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  const jobs = [
    {
      title: t('experience.jobs.0.title'),
      company: t('experience.jobs.0.company'),
      location: t('experience.jobs.0.location'),
      period: t('experience.jobs.0.period'),
      description: t('experience.jobs.0.description'),
      achievements: t('experience.jobs.0.achievements', { returnObjects: true }) as string[],
    },
    {
      title: t('experience.jobs.1.title'),
      company: t('experience.jobs.1.company'),
      location: t('experience.jobs.1.location'),
      period: t('experience.jobs.1.period'),
      description: t('experience.jobs.1.description'),
      achievements: t('experience.jobs.1.achievements', { returnObjects: true }) as string[],
    },
    {
      title: t('experience.jobs.2.title'),
      company: t('experience.jobs.2.company'),
      location: t('experience.jobs.2.location'),
      period: t('experience.jobs.2.period'),
      description: t('experience.jobs.2.description'),
      achievements: t('experience.jobs.2.achievements', { returnObjects: true }) as string[],
    },
  ];

  return (
    <section
      id="experience"
      style={{
        minHeight: '100vh',
        padding: '6rem 1.5rem',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
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
            {t('experience.title')}
          </h2>
          <p style={{ color: '#909090', fontSize: '1.1rem' }}>{t('experience.subtitle')}</p>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div
            style={{
              position: 'absolute',
              left: '20px',
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'linear-gradient(180deg, #4d7fff, #c44dff)',
              opacity: 0.3,
            }}
          />

          {jobs.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              style={{
                position: 'relative',
                paddingLeft: '50px',
                marginBottom: '2.5rem',
              }}
            >
              {/* Timeline dot */}
              <div
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '8px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #4d7fff, #c44dff)',
                  boxShadow: '0 0 20px rgba(77, 127, 255, 0.4)',
                }}
              />

              <div
                className="glass"
                style={{
                  padding: '1.5rem',
                  borderRadius: '16px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <h3 className="font-space" style={{ fontSize: '1.2rem', fontWeight: 600, color: isDark ? '#ffffff' : '#1a1a2e' }}>
                    {job.title}
                  </h3>
                  <span
                    style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      background: 'rgba(77, 127, 255, 0.15)',
                      color: '#4d7fff',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                    }}
                  >
                    {job.period}
                  </span>
                </div>
                <p style={{ color: '#c44dff', fontSize: '0.95rem', marginBottom: '0.25rem', fontWeight: 500 }}>
                  {job.company}
                </p>
                <p style={{ color: isDark ? '#707070' : '#6a6a7a', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                  {job.location}
                </p>
                <p style={{ color: isDark ? '#a0a0a0' : '#4a4a5a', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                  {job.description}
                </p>

                {/* Achievements */}
                {Array.isArray(job.achievements) && job.achievements.length > 0 && (
                  <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                    {job.achievements.map((achievement, achIndex) => (
                      <li
                        key={achIndex}
                        style={{
                          color: isDark ? '#909090' : '#5a5a6a',
                          fontSize: '0.9rem',
                          lineHeight: 1.6,
                          marginBottom: '0.5rem',
                        }}
                      >
                        {achievement}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
