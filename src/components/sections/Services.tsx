import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { ReactElement } from 'react';
import { useTheme } from '../../hooks/useTheme';

const serviceIcons: Record<string, ReactElement> = {
  web: (
    <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
  frontend: (
    <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  backend: (
    <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
    </svg>
  ),
  api: (
    <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  erp: (
    <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
    </svg>
  ),
  database: (
    <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
  ),
};

const Services = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  const services = [
    {
      title: t('services.items.0.title'),
      description: t('services.items.0.description'),
      icon: 'web',
      color: '#4d7fff',
    },
    {
      title: t('services.items.1.title'),
      description: t('services.items.1.description'),
      icon: 'frontend',
      color: '#00d4aa',
    },
    {
      title: t('services.items.2.title'),
      description: t('services.items.2.description'),
      icon: 'backend',
      color: '#c44dff',
    },
    {
      title: t('services.items.3.title'),
      description: t('services.items.3.description'),
      icon: 'api',
      color: '#ff6b9d',
    },
    {
      title: t('services.items.4.title'),
      description: t('services.items.4.description'),
      icon: 'erp',
      color: '#ffcc00',
    },
    {
      title: t('services.items.5.title'),
      description: t('services.items.5.description'),
      icon: 'database',
      color: '#ff8c42',
    },
  ];

  return (
    <section
      id="services"
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
            {t('services.title')}
          </h2>
          <p style={{ color: '#909090', fontSize: '1.1rem' }}>{t('services.subtitle')}</p>
        </motion.div>

        {/* Services Grid */}
        <div
          className="services-grid"
          style={{
            display: 'grid',
            gap: '1.5rem',
          }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass"
              style={{
                padding: '2rem',
                borderRadius: '20px',
                textAlign: 'center',
                cursor: 'default',
              }}
            >
              <div
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  background: `rgba(${parseInt(service.color.slice(1, 3), 16)}, ${parseInt(service.color.slice(3, 5), 16)}, ${parseInt(service.color.slice(5, 7), 16)}, 0.15)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                  color: service.color,
                }}
              >
                {serviceIcons[service.icon]}
              </div>
              <h3
                className="font-space"
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  color: isDark ? '#ffffff' : '#1a1a2e',
                  marginBottom: '0.75rem',
                }}
              >
                {service.title}
              </h3>
              <p style={{ color: isDark ? '#a0a0a0' : '#4a4a5a', fontSize: '0.9rem', lineHeight: 1.6 }}>
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
