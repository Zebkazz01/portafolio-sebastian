import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  const stats = [
    { value: '3+', label: t('about.experience') },
    { value: '20+', label: t('about.projects') },
    { value: '15+', label: t('about.technologies') },
  ];

  return (
    <section
      id="about"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '6rem 1.5rem',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 className="font-space ai-gradient-text" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700 }}>
            {t('about.title')}
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
          }}
        >
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 150, damping: 20 }}
            viewport={{ once: true }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div style={{ position: 'relative', width: '250px', height: '250px' }}>
              {/* Animated ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #4d7fff, #c44dff, #ff6b9d)',
                  padding: '3px',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: '#0a0a12',
                  }}
                />
              </motion.div>

              {/* Avatar content */}
              <div
                style={{
                  position: 'absolute',
                  inset: '12px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '6rem',
                }}
              >
                👨‍💻
              </div>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 150, damping: 20, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <p
              style={{
                color: '#c0c0c0',
                fontSize: '1.05rem',
                lineHeight: 1.8,
                marginBottom: '1rem',
              }}
            >
              {t('about.description')}
            </p>
            <p
              style={{
                color: '#a0a0a0',
                fontSize: '1rem',
                lineHeight: 1.8,
                marginBottom: '2rem',
              }}
            >
              {t('about.description2')}
            </p>

            {/* Stats */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
              }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.25 + index * 0.08 }}
                  viewport={{ once: true }}
                  className="glass"
                  style={{
                    padding: '1.25rem',
                    borderRadius: '12px',
                    textAlign: 'center',
                    cursor: 'default',
                  }}
                >
                  <div
                    className="font-space ai-gradient-text"
                    style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem' }}
                  >
                    {stat.value}
                  </div>
                  <div style={{ color: '#909090', fontSize: '0.8rem' }}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
