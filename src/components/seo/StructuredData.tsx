import { Helmet } from 'react-helmet-async';

const StructuredData = () => {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Juan Sebastian Castillo Parra',
    alternateName: 'Sebastian Castillo',
    url: 'https://sebastiancastillo.dev',
    image: 'https://sebastiancastillo.dev/profile.jpg',
    jobTitle: 'Full Stack Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'PRLCOL S.A.S.',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bogota',
      addressCountry: 'CO',
    },
    email: 'zebkazz01@gmail.com',
    telephone: '+573187226478',
    sameAs: [
      'https://github.com/Zebkazz01',
      'https://linkedin.com/in/sebastian-castillop',
    ],
    knowsAbout: [
      'React',
      'Node.js',
      'TypeScript',
      'Python',
      'PHP',
      'MongoDB',
      'PostgreSQL',
      'MySQL',
      'Docker',
      'Full Stack Development',
    ],
  };

  const portfolioSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Sebastian Castillo Portfolio',
    url: 'https://sebastiancastillo.dev',
    description: 'Full Stack Developer Portfolio',
    inLanguage: ['es', 'en'],
    author: {
      '@type': 'Person',
      name: 'Juan Sebastian Castillo Parra',
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(portfolioSchema)}</script>
    </Helmet>
  );
};

export default StructuredData;
