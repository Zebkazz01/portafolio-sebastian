import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEOHead = ({
  title,
  description,
  image = '/og-image.jpg',
  url = 'https://sebastiancastillo.dev',
  type = 'website',
}: SEOHeadProps) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const defaultTitle =
    lang === 'es'
      ? 'Sebastian Castillo | Desarrollador Full Stack'
      : 'Sebastian Castillo | Full Stack Developer';

  const defaultDescription =
    lang === 'es'
      ? 'Desarrollador Web Full Stack con +4 años de experiencia en React, Node.js, TypeScript, Python. Creando soluciones digitales innovadoras.'
      : 'Full Stack Web Developer with +4 years experience in React, Node.js, TypeScript, Python. Creating innovative digital solutions.';

  const pageTitle = title || defaultTitle;
  const pageDescription = description || defaultDescription;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={lang} />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="author" content="Juan Sebastian Castillo Parra" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Sebastian Castillo Portfolio" />
      <meta property="og:locale" content={lang === 'es' ? 'es_CO' : 'en_US'} />
      <meta property="og:locale:alternate" content={lang === 'es' ? 'en_US' : 'es_CO'} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="keywords" content="Full Stack Developer, React, Node.js, TypeScript, Python, Web Development, Bogota, Colombia" />
    </Helmet>
  );
};

export default SEOHead;
