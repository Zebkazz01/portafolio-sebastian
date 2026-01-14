import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';

const Education = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  const degrees = t('education.degrees', { returnObjects: true }) as Array<{
    title: string;
    institution: string;
    location: string;
    period: string;
    status: string;
  }>;

  const courses = [
    { name: 'Angular, JavaScript, TypeScript', platform: 'Udemy', year: '2023' },
    { name: 'Node.js, JavaScript', platform: 'LinkedIn, Udemy, Alura', year: '2022' },
    { name: 'PHP y MySQL', platform: 'Itoo', year: '2021' },
    { name: 'Python & Django', platform: 'Alura Latam', year: '2022' },
    { name: 'React & Redux', platform: 'Udemy', year: '2023' },
    { name: 'Docker & DevOps', platform: 'Udemy', year: '2024' },
  ];

  return (
    <section
      id="education"
      style={{
        minHeight: '100vh',
        padding: '6rem 1.5rem',
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
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
            {t('education.title')}
          </h2>
          <p style={{ color: '#909090', fontSize: '1.1rem' }}>{t('education.subtitle')}</p>
        </motion.div>

        <div
          className="education-grid"
          style={{
            display: 'grid',
            gap: '2rem',
            alignItems: 'start',
          }}
        >
          {/* Degrees */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3
              className="font-space"
              style={{
                fontSize: '1.3rem',
                fontWeight: 600,
                color: '#ffffff',
                marginBottom: '1.5rem',
              }}
            >
              {t('education.degreesTitle')}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {Array.isArray(degrees) && degrees.map((degree, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass"
                  style={{
                    padding: '1.25rem',
                    borderRadius: '12px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 600, color: isDark ? '#ffffff' : '#1a1a2e', flex: 1 }}>
                      {degree.title}
                    </h4>
                    <span
                      style={{
                        padding: '0.2rem 0.6rem',
                        borderRadius: '12px',
                        background: degree.status === 'Graduado' || degree.status === 'Graduated'
                          ? 'rgba(77, 255, 127, 0.15)'
                          : 'rgba(77, 127, 255, 0.15)',
                        color: degree.status === 'Graduado' || degree.status === 'Graduated'
                          ? '#4dff7f'
                          : '#4d7fff',
                        fontSize: '0.7rem',
                        fontWeight: 500,
                      }}
                    >
                      {degree.status}
                    </span>
                  </div>
                  <p style={{ color: '#c44dff', fontSize: '0.85rem', marginBottom: '0.25rem', fontWeight: 500 }}>
                    {degree.institution}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: isDark ? '#707070' : '#6a6a7a', fontSize: '0.8rem' }}>
                    <span>{degree.location}</span>
                    <span>{degree.period}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Courses & Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3
              className="font-space"
              style={{
                fontSize: '1.3rem',
                fontWeight: 600,
                color: '#ffffff',
                marginBottom: '1.5rem',
              }}
            >
              {t('education.coursesTitle')}
            </h3>

            <div
              className="glass"
              style={{
                padding: '1.25rem',
                borderRadius: '12px',
                marginBottom: '1rem',
              }}
            >
              <p style={{ color: isDark ? '#a0a0a0' : '#5a5a6a', fontSize: '0.9rem', marginBottom: '1rem' }}>
                {t('education.coursesDescription')}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {courses.map((course, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)',
                      border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.08)'}`,
                    }}
                  >
                    <div>
                      <p style={{ color: isDark ? '#e0e0e0' : '#2a2a3a', fontSize: '0.9rem', fontWeight: 500 }}>
                        {course.name}
                      </p>
                      <p style={{ color: isDark ? '#707070' : '#6a6a7a', fontSize: '0.75rem' }}>
                        {course.platform}
                      </p>
                    </div>
                    <span
                      style={{
                        padding: '0.2rem 0.5rem',
                        borderRadius: '8px',
                        background: 'rgba(196, 77, 255, 0.15)',
                        color: '#c44dff',
                        fontSize: '0.7rem',
                        fontWeight: 500,
                      }}
                    >
                      {course.year}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Extra certifications note */}
            <a
              href="https://drive.google.com/drive/folders/1mHiaK99Q65geglh8QIBTwHpCNvZg-h7K"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                padding: '1rem',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(77, 127, 255, 0.1), rgba(196, 77, 255, 0.1))',
                border: '1px solid rgba(77, 127, 255, 0.2)',
                textAlign: 'center',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(77, 127, 255, 0.2), rgba(196, 77, 255, 0.2))';
                e.currentTarget.style.borderColor = 'rgba(77, 127, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(77, 127, 255, 0.1), rgba(196, 77, 255, 0.1))';
                e.currentTarget.style.borderColor = 'rgba(77, 127, 255, 0.2)';
              }}
            >
              <p style={{ color: '#a0a0a0', fontSize: '0.85rem' }}>
                <span style={{ color: '#4d7fff', fontWeight: 600 }}>+45</span> {t('education.moreCertifications')}
              </p>
              <p style={{ color: '#707070', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                Alura Latam, Udemy, Es-ciber, Google Actívate
              </p>
              <p style={{ color: '#4d7fff', fontSize: '0.75rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                Ver certificados →
              </p>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Add responsive styles
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  .education-grid {
    grid-template-columns: 1fr;
  }
  @media (min-width: 768px) {
    .education-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;
if (!document.getElementById('education-styles')) {
  styleSheet.id = 'education-styles';
  document.head.appendChild(styleSheet);
}

export default Education;
