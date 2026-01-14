import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t, i18n } = useTranslation();
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Get roles from translations
  const roles = t('hero.roles', { returnObjects: true }) as string[];

  // Reset typewriter when language changes
  useEffect(() => {
    setCurrentRoleIndex(0);
    setDisplayText('');
    setIsDeleting(false);
  }, [i18n.language]);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && displayText === currentRole) {
      // Pause before deleting
      const timeout = setTimeout(() => setIsDeleting(true), 2500);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    // Use requestAnimationFrame for smoother performance
    let animationId: number;
    const timeout = setTimeout(() => {
      animationId = requestAnimationFrame(() => {
        if (isDeleting) {
          setDisplayText(currentRole.substring(0, displayText.length - 1));
        } else {
          setDisplayText(currentRole.substring(0, displayText.length + 1));
        }
      });
    }, typeSpeed);

    return () => {
      clearTimeout(timeout);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [displayText, isDeleting, currentRoleIndex]);

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '2rem',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.3 }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{
              color: '#4d7fff',
              fontSize: '1.25rem',
              marginBottom: '1rem',
              fontWeight: 500,
              letterSpacing: '0.05em',
            }}
          >
            {t('hero.greeting')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.8 }}
            className="font-space"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              fontWeight: 800,
              marginBottom: '1.5rem',
              lineHeight: 1.1,
            }}
          >
            <span style={{ color: '#ffffff' }}>{t('hero.name')}</span>
            <br />
            <span
              className="ai-gradient-text"
              style={{
                display: 'inline-block',
                minWidth: '280px',
                textAlign: 'center',
                filter: 'drop-shadow(0 0 20px rgba(196, 77, 255, 0.4))',
              }}
            >
              {displayText}
              <span
                className="ai-gradient-text"
                style={{
                  opacity: showCursor ? 1 : 0,
                  fontWeight: 300,
                  marginLeft: '2px',
                }}
              >
                |
              </span>
            </span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              color: '#e0e0e0',
              marginBottom: '1rem',
              fontWeight: 300,
            }}
          >
            {t('hero.title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            style={{
              color: '#a0a0a0',
              fontSize: '1.125rem',
              maxWidth: '600px',
              margin: '0 auto 2.5rem auto',
            }}
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'center',
            }}
          >
            <motion.button
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              onClick={scrollToProjects}
              style={{
                padding: '1rem 2rem',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #4d7fff, #c44dff)',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '1rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(77, 127, 255, 0.3)',
              }}
            >
              {t('hero.cta')}
            </motion.button>

            <motion.a
              href="/cv.pdf"
              download
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              style={{
                padding: '1rem 2rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                color: '#ffffff',
                fontWeight: 500,
                fontSize: '1rem',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              {t('hero.downloadCV')}
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          style={{
            position: 'absolute',
            bottom: '3rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            style={{
              width: '24px',
              height: '40px',
              borderRadius: '12px',
              border: '2px solid rgba(255, 255, 255, 0.25)',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '8px',
            }}
          >
            <div
              style={{
                width: '4px',
                height: '8px',
                background: 'rgba(255, 255, 255, 0.4)',
                borderRadius: '2px',
              }}
            />
          </motion.div>
          <motion.span
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            style={{
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            {t('hero.scroll')}
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
