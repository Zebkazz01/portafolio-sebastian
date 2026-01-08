import { useEffect, Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from './store/useAppStore';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useTheme } from './hooks/useTheme';

// Critical path - load immediately
import Navbar from './components/ui/Navbar';
import Hero from './components/sections/Hero';
import SEOHead from './components/seo/SEOHead';
import StructuredData from './components/seo/StructuredData';

// Lazy load heavy 3D scene
const SpaceScene = lazy(() => import('./components/3d/SpaceScene'));

// Lazy load below-the-fold sections
const About = lazy(() => import('./components/sections/About'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Education = lazy(() => import('./components/sections/Education'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Services = lazy(() => import('./components/sections/Services'));
const Skills = lazy(() => import('./components/sections/Skills'));
const Contact = lazy(() => import('./components/sections/Contact'));

// Section loading skeleton
const SectionSkeleton = () => (
  <div
    className="section-skeleton"
    role="status"
    aria-label="Cargando sección..."
  >
    <div className="skeleton-content">
      <div className="skeleton-pulse skeleton-title" />
      <div className="skeleton-pulse skeleton-text" />
      <div className="skeleton-pulse skeleton-text short" />
    </div>
  </div>
);

// 3D Scene loading placeholder
const SpaceSceneFallback = () => (
  <div
    className="canvas-container"
    style={{ background: 'radial-gradient(ellipse at center, #0a0a1a 0%, #050508 100%)' }}
    role="img"
    aria-label="Escena espacial 3D cargando..."
  />
);

function App() {
  const { i18n } = useTranslation();
  const language = useAppStore((state) => state.language);

  // Initialize scroll tracking
  useScrollProgress();

  // Initialize theme
  useTheme();

  // Sync language with i18n
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <div className="relative min-h-screen">
      {/* SEO */}
      <SEOHead />
      <StructuredData />

      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>

      {/* 3D Space Background */}
      <Suspense fallback={<SpaceSceneFallback />}>
        <SpaceScene />
      </Suspense>

      {/* Navigation */}
      <Navbar />

      {/* Main Content - 8 sections for smooth planet transitions */}
      <main id="main-content" className="content-overlay" role="main">
        <Hero />
        <Suspense fallback={<SectionSkeleton />}>
          <About />
          <Experience />
          <Education />
          <Projects />
          <Services />
          <Skills />
          <Contact />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
