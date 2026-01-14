import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useContactForm } from '../../hooks/useContactForm';
import { useTheme } from '../../hooks/useTheme';

const Contact = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const {
    formData,
    errors,
    handleChange,
    handleSubmit,
    isLoading,
    isSuccess,
    isError,
  } = useContactForm();

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.875rem 1rem',
    borderRadius: '10px',
    background: isDark ? 'rgba(20, 20, 40, 0.6)' : 'rgba(255, 255, 255, 0.8)',
    border: `1px solid ${isDark ? 'rgba(100, 100, 150, 0.3)' : 'rgba(0, 0, 0, 0.15)'}`,
    color: isDark ? '#ffffff' : '#1a1a2e',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s ease, background 0.2s ease',
  };

  const inputErrorStyle: React.CSSProperties = {
    ...inputStyle,
    border: '1px solid #ef4444',
  };

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/Zebkazz01',
      icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/sebastian-castillop',
      icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
    },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
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
            id="contact-title"
            className="font-space ai-gradient-text"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, marginBottom: '1rem' }}
          >
            {t('contact.title')}
          </h2>
          <p style={{ color: '#9a9a9a', fontSize: '1.1rem' }}>{t('contact.subtitle')}</p>
        </motion.div>

        <div
          className="contact-container"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            margin: '0 auto',
          }}
        >
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass-contact"
            aria-labelledby="contact-form-title"
            noValidate
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '1.5rem', borderRadius: '16px', width: '100%', boxSizing: 'border-box' }}
          >
            <h3 id="contact-form-title" className="sr-only">Formulario de contacto</h3>

            {/* Name field */}
            <div>
              <label
                htmlFor="contact-name"
                style={{ display: 'block', color: isDark ? '#c0c0c0' : '#3a3a4a', fontSize: '0.9rem', marginBottom: '0.5rem', minWidth: '80px' }}
              >
                {t('contact.name')} <span aria-hidden="true">*</span>
                <span className="sr-only">(requerido)</span>
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                autoComplete="name"
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                disabled={isLoading}
                style={errors.name ? inputErrorStyle : inputStyle}
              />
              <AnimatePresence>
                {errors.name && (
                  <motion.p
                    id="name-error"
                    role="alert"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem' }}
                  >
                    {errors.name}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Email field */}
            <div>
              <label
                htmlFor="contact-email"
                style={{ display: 'block', color: isDark ? '#c0c0c0' : '#3a3a4a', fontSize: '0.9rem', marginBottom: '0.5rem', minWidth: '80px' }}
              >
                {t('contact.email')} <span aria-hidden="true">*</span>
                <span className="sr-only">(requerido)</span>
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                autoComplete="email"
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                disabled={isLoading}
                style={errors.email ? inputErrorStyle : inputStyle}
              />
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    id="email-error"
                    role="alert"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem' }}
                  >
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Message field */}
            <div>
              <label
                htmlFor="contact-message"
                style={{ display: 'block', color: isDark ? '#c0c0c0' : '#3a3a4a', fontSize: '0.9rem', marginBottom: '0.5rem', minWidth: '80px' }}
              >
                {t('contact.message')} <span aria-hidden="true">*</span>
                <span className="sr-only">(requerido)</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Tu mensaje..."
                aria-required="true"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
                disabled={isLoading}
                style={{ ...(errors.message ? inputErrorStyle : inputStyle), resize: 'none' }}
              />
              <AnimatePresence>
                {errors.message && (
                  <motion.p
                    id="message-error"
                    role="alert"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem' }}
                  >
                    {errors.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Submit button */}
            <motion.button
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              type="submit"
              disabled={isLoading}
              aria-busy={isLoading}
              style={{
                padding: '1rem',
                borderRadius: '10px',
                background: isLoading
                  ? 'linear-gradient(135deg, #6b7280, #9ca3af)'
                  : 'linear-gradient(135deg, #4d7fff, #c44dff)',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '1rem',
                border: 'none',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}
            >
              {isLoading && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid transparent',
                    borderTopColor: '#fff',
                    borderRadius: '50%',
                  }}
                  aria-hidden="true"
                />
              )}
              {isLoading ? t('contact.sending', 'Enviando...') : t('contact.send')}
            </motion.button>

            {/* Status messages */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  role="status"
                  aria-live="polite"
                  style={{
                    padding: '1rem',
                    borderRadius: '10px',
                    background: 'rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    color: '#4ade80',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t('contact.success')}
                </motion.div>
              )}
              {isError && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  role="alert"
                  style={{
                    padding: '1rem',
                    borderRadius: '10px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#f87171',
                    textAlign: 'center',
                  }}
                >
                  {t('contact.error', 'Error al enviar. Por favor intenta nuevamente.')}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
          >
            <div
              className="glass-contact"
              style={{ padding: '1.5rem', borderRadius: '16px', marginBottom: '2rem', width: '100%', boxSizing: 'border-box' }}
            >
              <h3 className="font-space" style={{ fontSize: '1.1rem', fontWeight: 600, color: isDark ? '#ffffff' : '#1a1a2e', marginBottom: '1.25rem', minWidth: '150px' }}>
                {t('contact.getInTouch')}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'rgba(77, 127, 255, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    aria-hidden="true"
                  >
                    <svg width="18" height="18" fill="none" stroke="#4d7fff" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div style={{ minWidth: '120px' }}>
                    <p style={{ color: isDark ? '#9a9a9a' : '#6a6a7a', fontSize: '0.8rem', minWidth: '80px' }}>{t('contact.emailLabel')}</p>
                    <a href="mailto:zebkazz01@gmail.com" style={{ color: isDark ? '#e0e0e0' : '#2a2a3a', textDecoration: 'none' }}>
                      zebkazz01@gmail.com
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      minWidth: '40px',
                      borderRadius: '50%',
                      background: 'rgba(77, 255, 127, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    aria-hidden="true"
                  >
                    <svg width="18" height="18" fill="none" stroke="#4dff7f" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div style={{ minWidth: '120px' }}>
                    <p style={{ color: isDark ? '#9a9a9a' : '#6a6a7a', fontSize: '0.8rem', minWidth: '80px' }}>{t('contact.phoneLabel')}</p>
                    <a href="tel:+573187226478" style={{ color: isDark ? '#e0e0e0' : '#2a2a3a', textDecoration: 'none' }}>
                      +57 318 722 6478
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      minWidth: '40px',
                      borderRadius: '50%',
                      background: 'rgba(196, 77, 255, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    aria-hidden="true"
                  >
                    <svg width="18" height="18" fill="none" stroke="#c44dff" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div style={{ minWidth: '120px' }}>
                    <p style={{ color: isDark ? '#9a9a9a' : '#6a6a7a', fontSize: '0.8rem', minWidth: '80px' }}>{t('contact.locationLabel')}</p>
                    <p style={{ color: isDark ? '#e0e0e0' : '#2a2a3a' }}>Bogotá, Colombia</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social */}
            <nav aria-label="Redes sociales">
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visitar perfil de ${link.name} (abre en nueva ventana)`}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    style={{ color: '#9a9a9a', transition: 'color 0.2s ease' }}
                  >
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d={link.icon} />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </nav>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            marginTop: '5rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            textAlign: 'center',
          }}
        >
          <p style={{ color: '#8a8a8a', fontSize: '0.9rem' }}>
            {new Date().getFullYear()} {t('footer.name')}. {t('footer.rights')}.
          </p>
          <p style={{ color: '#7a7a7a', fontSize: '0.8rem', marginTop: '0.5rem' }}>
            {t('footer.madeWith')} React Three Fiber
          </p>
        </motion.footer>
      </div>
    </section>
  );
};

export default Contact;
