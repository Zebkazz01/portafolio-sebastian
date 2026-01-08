import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../store/useAppStore';

const SpainFlag = () => (
  <svg width="24" height="18" viewBox="0 0 24 18" style={{ borderRadius: '3px', flexShrink: 0 }}>
    <rect width="24" height="18" fill="#c60b1e" />
    <rect y="4.5" width="24" height="9" fill="#ffc400" />
  </svg>
);

const USFlag = () => (
  <svg width="24" height="18" viewBox="0 0 24 18" style={{ borderRadius: '3px', flexShrink: 0 }}>
    <rect width="24" height="18" fill="#fff" />
    <rect y="0" width="24" height="1.38" fill="#b22234" />
    <rect y="2.77" width="24" height="1.38" fill="#b22234" />
    <rect y="5.54" width="24" height="1.38" fill="#b22234" />
    <rect y="8.31" width="24" height="1.38" fill="#b22234" />
    <rect y="11.08" width="24" height="1.38" fill="#b22234" />
    <rect y="13.85" width="24" height="1.38" fill="#b22234" />
    <rect y="16.62" width="24" height="1.38" fill="#b22234" />
    <rect width="9.6" height="9.69" fill="#3c3b6e" />
  </svg>
);

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const { language, setLanguage } = useAppStore();

  const toggleLanguage = () => {
    const newLang = language === 'es' ? 'en' : 'es';
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '0.5rem 0.9rem',
        borderRadius: '25px',
        background: 'rgba(255, 255, 255, 0.08)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        color: '#e0e0e0',
        fontSize: '0.85rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
      }}
    >
      {language === 'es' ? <SpainFlag /> : <USFlag />}
      <span style={{ letterSpacing: '0.05em' }}>{language === 'es' ? 'ES' : 'EN'}</span>
    </motion.button>
  );
};

export default LanguageSwitcher;
