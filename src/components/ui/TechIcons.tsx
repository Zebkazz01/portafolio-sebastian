import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const ReactIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <circle cx="12" cy="12" r="2.5" fill="#61DAFB"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" fill="none"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(60 12 12)"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(120 12 12)"/>
  </svg>
);

export const TypeScriptIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <rect width="24" height="24" rx="2" fill="#3178C6"/>
    <path d="M13.5 16.5v-3h2v-1.5h-6v1.5h2v3h2zm4-4.5h1.5v6h-1.5v-2.5c0-.5-.2-.8-.7-.8s-.7.3-.7.8v2.5h-1.5v-4h1.5v.5c.3-.4.7-.6 1.2-.6.7 0 1.2.5 1.2 1.3v2.8z" fill="white"/>
  </svg>
);

export const JavaScriptIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <rect width="24" height="24" fill="#F7DF1E"/>
    <path d="M6.5 19.5l1.4-.8c.3.5.5.9 1.1.9.6 0 .9-.2.9-.9v-5.2h1.7v5.3c0 1.5-.9 2.2-2.2 2.2-1.2 0-1.9-.6-2.3-1.3l.4-.2zm5.5-.3l1.4-.8c.4.6.9 1.1 1.8 1.1.8 0 1.2-.4 1.2-.9 0-.6-.5-.8-1.3-1.2l-.5-.2c-1.3-.5-2.1-1.2-2.1-2.6 0-1.3 1-2.3 2.5-2.3 1.1 0 1.9.4 2.4 1.4l-1.3.8c-.3-.5-.6-.7-1.1-.7-.5 0-.8.3-.8.7 0 .5.3.7 1.1 1l.5.2c1.5.6 2.3 1.3 2.3 2.7 0 1.6-1.2 2.4-2.9 2.4-1.6 0-2.6-.8-3.1-1.8l-.1.2z" fill="#000"/>
  </svg>
);

export const NodeJSIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" fill="#339933"/>
    <path d="M12 6l-5 2.9v5.8L12 18l5-3.3v-5.8L12 6z" fill="#66CC33"/>
    <text x="12" y="14" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold">N</text>
  </svg>
);

export const NextJSIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <circle cx="12" cy="12" r="11" fill="#000" stroke="#fff" strokeWidth="0.5"/>
    <path d="M9 8v8l6-4-6-4z" fill="#fff"/>
  </svg>
);

export const MongoDBIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <path d="M12 2C11 2 10.5 3 10.5 4v2c0 1-.5 2-1.5 3s-1.5 2.5-1.5 4c0 3.5 2.5 7 4.5 9 .5.5 1 .5 1.5 0 2-2 4.5-5.5 4.5-9 0-1.5-.5-3-1.5-4s-1.5-2-1.5-3V4c0-1-.5-2-1.5-2z" fill="#4FAA41"/>
    <path d="M12 4c-.3 0-.5.2-.5.5v15c0 .3.2.5.5.5s.5-.2.5-.5v-15c0-.3-.2-.5-.5-.5z" fill="#3F9838"/>
  </svg>
);

export const PostgreSQLIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <ellipse cx="12" cy="8" rx="8" ry="5" fill="#336791"/>
    <path d="M4 8v7c0 2.8 3.6 5 8 5s8-2.2 8-5V8" stroke="#336791" strokeWidth="2" fill="none"/>
    <ellipse cx="12" cy="15" rx="8" ry="5" fill="#336791"/>
    <path d="M12 5c2 0 3.5.5 4 1.5.5 1-.5 2-1.5 2.5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </svg>
);

export const PythonIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <path d="M12 2C8.5 2 6 3.5 6 5.5V8h6v1H5c-2 0-3.5 1.5-3.5 4s1.5 4 3.5 4h2v-3c0-1.5 1.5-3 3-3h6c1.5 0 2.5-1 2.5-2.5v-3C18.5 3.5 15.5 2 12 2zM9 4a1 1 0 110 2 1 1 0 010-2z" fill="#3776AB"/>
    <path d="M12 22c3.5 0 6-1.5 6-3.5V16h-6v-1h7c2 0 3.5-1.5 3.5-4s-1.5-4-3.5-4h-2v3c0 1.5-1.5 3-3 3H8c-1.5 0-2.5 1-2.5 2.5v3c0 2 3 3.5 6.5 3.5zm3-2a1 1 0 110-2 1 1 0 010 2z" fill="#FFD43B"/>
  </svg>
);

export const DockerIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <path d="M13 4h3v3h-3V4zm-4 0h3v3H9V4zM5 4h3v3H5V4zm4 4h3v3H9V8zM5 8h3v3H5V8zm0 4h3v3H5v-3zm17-1c-.5-.4-1.6-.6-2.5-.3-.2-1.4-1.2-2.6-2.4-3.2l-.5-.3-.3.5c-.5.8-.7 2-.6 2.9.1.7.4 1.4.9 1.9-.4.2-1 .5-1.9.5H1.5l-.1.7c-.1 1.8.2 3.7 1 5.2.9 1.6 2.3 2.8 4.3 3.4 1.7.5 3.6.6 5.4.3 1.4-.2 2.8-.6 4-1.3 1-.5 1.9-1.2 2.6-2 1.2-1.3 1.9-2.8 2.4-4.2h.2c1.5 0 2.4-.6 2.9-1.1.4-.3.6-.7.8-1l.1-.4-.7-.5z" fill="#2496ED"/>
  </svg>
);

export const TailwindIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <path d="M12 6c-2.7 0-4.4 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.7 1.9 1.3.9 1 2 2.2 4.3 2.2 2.7 0 4.4-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.7-1.9-1.3-.9-1-2-2.2-4.3-2.2zM7 12c-2.7 0-4.4 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.7 1.9 1.3.9 1 2 2.2 4.3 2.2 2.7 0 4.4-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.7-1.9-1.3-.9-1-2-2.2-4.3-2.2z" fill="#06B6D4"/>
  </svg>
);

export const ExpressIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <circle cx="12" cy="12" r="11" fill="#000" stroke="#fff" strokeWidth="0.5"/>
    <text x="12" y="16" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Ex</text>
  </svg>
);

export const RedisIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <path d="M12 3L3 8v8l9 5 9-5V8l-9-5z" fill="#DC382D"/>
    <ellipse cx="12" cy="12" rx="4" ry="2" fill="#fff"/>
    <ellipse cx="12" cy="10" rx="4" ry="2" fill="#fff"/>
  </svg>
);

export const AWSIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <path d="M6.5 15c-1.4 1-2 1.8-2 2.5 0 1 1.5 1.5 4 1.5 2 0 4-.3 6-1" stroke="#FF9900" strokeWidth="1.5" fill="none"/>
    <path d="M17.5 15c1.4 1 2 1.8 2 2.5 0 1-1.5 1.5-4 1.5" stroke="#FF9900" strokeWidth="1.5" fill="none"/>
    <path d="M4 11l2-4h2l2 4-2 4H6l-2-4zm6 0l2-4h2l2 4-2 4h-2l-2-4zm6 0l2-4h2l2 4-2 4h-2l-2-4z" fill="#232F3E"/>
  </svg>
);

export const GitIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <path d="M23.5 11.5l-10-10c-.7-.7-1.8-.7-2.5 0l-2 2 2.5 2.5c.6-.2 1.3 0 1.8.4.4.4.6 1.1.4 1.7l2.4 2.4c.6-.2 1.3 0 1.8.5.7.7.7 1.8 0 2.5s-1.8.7-2.5 0c-.5-.5-.7-1.2-.4-1.8l-2.2-2.2v5.8c.2.1.3.2.5.4.7.7.7 1.8 0 2.5s-1.8.7-2.5 0-.7-1.8 0-2.5c.2-.2.4-.4.7-.5v-5.9c-.2-.1-.5-.3-.7-.5-.5-.5-.6-1.2-.4-1.8l-2.4-2.4c-.7-.7-1.8-.7-2.5 0l-7 7c-.7.7-.7 1.8 0 2.5l10 10c.7.7 1.8.7 2.5 0l10-10c.7-.7.7-1.8 0-2.5z" fill="#F05032"/>
  </svg>
);

export const JestIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <path d="M12 2l9 5.5v11L12 24l-9-5.5v-11L12 2z" fill="#99425B"/>
    <circle cx="12" cy="12" r="3" fill="#fff"/>
    <path d="M12 17c-2.8 0-5-1.1-5-2.5S9.2 12 12 12s5 1.1 5 2.5S14.8 17 12 17z" fill="#fff"/>
  </svg>
);

export const PrismaIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <path d="M12 2L3 22h18L12 2z" fill="#2D3748" stroke="#5A67D8" strokeWidth="1"/>
    <path d="M12 6l-5 12h10L12 6z" fill="#5A67D8"/>
  </svg>
);

export const StripeIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <rect width="24" height="24" rx="4" fill="#635BFF"/>
    <path d="M12 8c-2 0-3.5.8-3.5 2.2 0 1.7 2.5 2 4 2.3 1 .2 1.5.4 1.5.8 0 .5-.6.8-1.7.8-1.5 0-2.6-.6-3.2-1l-.6 1.5c.8.5 2 1 3.5 1 2.3 0 3.8-.9 3.8-2.4 0-1.8-2.5-2.1-4-2.4-.9-.2-1.5-.4-1.5-.8 0-.4.5-.7 1.5-.7 1.2 0 2.2.4 2.8.8l.6-1.4c-.8-.5-1.8-.9-3.2-.9z" fill="#fff"/>
  </svg>
);

export const MySQLIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <ellipse cx="12" cy="6" rx="9" ry="4" fill="#00758F"/>
    <path d="M3 6v12c0 2.2 4 4 9 4s9-1.8 9-4V6" stroke="#00758F" strokeWidth="2" fill="none"/>
    <ellipse cx="12" cy="12" rx="9" ry="4" fill="#00758F"/>
    <ellipse cx="12" cy="18" rx="9" ry="4" fill="#00758F"/>
    <path d="M14 8l2 4-2 4" stroke="#F29111" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </svg>
);

export const JavaIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <path d="M8.5 19c-2.5-1-4-2.5-4-4.5 0-3 3-5 7-5 .5 0 1 0 1.5.1" stroke="#5382A1" strokeWidth="1.5" fill="none"/>
    <path d="M9 16s-.5.5 1 .5c2 0 3-1 3-1s-.5 1-2 1.5c-2 .5-2 0-2 0zm7-6s.5.5-1 1c-2 .5-5 .5-6 0-1.5-.5-1-1-1-1s1 .5 4 .5 4-.5 4-.5z" fill="#5382A1"/>
    <path d="M12 3c-3 0-5 1.5-5 3 0 2 2.5 3 5 3s5-1 5-3c0-1.5-2-3-5-3z" fill="#E76F00"/>
  </svg>
);

export const SwaggerIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <circle cx="12" cy="12" r="11" fill="#85EA2D"/>
    <path d="M8 8h8M8 12h8M8 16h5" stroke="#173647" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const AngularIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <path d="M12 2L3 6l1.5 12L12 22l7.5-4L21 6l-9-4z" fill="#DD0031"/>
    <path d="M12 2v20l7.5-4L21 6l-9-4z" fill="#C3002F"/>
    <path d="M12 5l-5 11h2l1-2.5h4l1 2.5h2L12 5zm0 4l1.5 3.5h-3L12 9z" fill="#fff"/>
  </svg>
);

export const HTML5Icon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <path d="M4 2l1.5 18L12 22l6.5-2L20 2H4z" fill="#E34F26"/>
    <path d="M12 4v16l5-1.5L18.5 4H12z" fill="#EF652A"/>
    <path d="M7 7h10l-.3 3H9.5l.2 2h7l-.5 5-4.2 1.2-4.2-1.2-.3-3h2l.2 1.5 2.3.6 2.3-.6.3-2.5H7.3L7 7z" fill="#fff"/>
  </svg>
);

export const CSS3Icon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <path d="M4 2l1.5 18L12 22l6.5-2L20 2H4z" fill="#1572B6"/>
    <path d="M12 4v16l5-1.5L18.5 4H12z" fill="#33A9DC"/>
    <path d="M7 7h10l-.2 2H9.3l.2 2h7.2l-.5 5-4.2 1.2-4.2-1.2-.3-3h2l.2 1.5 2.3.6 2.3-.6.2-2.5H7.2L7 7z" fill="#fff"/>
  </svg>
);

export const jQueryIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <circle cx="12" cy="12" r="11" fill="#0769AD"/>
    <text x="12" y="16" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">jQ</text>
  </svg>
);

export const DjangoIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <rect width="24" height="24" rx="2" fill="#092E20"/>
    <path d="M12 4v12c0 1.5-.5 2.5-2 3-1 .3-2 .2-3-.2v-2c.5.2 1 .3 1.5.2.5-.1.8-.4.8-1V4h2.7zm4 0h2.5v2H16V4zm0 4h2.5v8.5c0 2-1 3-3 3.5-1 .3-2 .2-2.5 0v-2c.5.2 1 .2 1.5.1.8-.2 1-.6 1-1.2V8h.5z" fill="#fff"/>
  </svg>
);

export const PHPIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <ellipse cx="12" cy="12" rx="11" ry="7" fill="#777BB4"/>
    <text x="12" y="15" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">php</text>
  </svg>
);

export const LaravelIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <path d="M4 7l8-4 8 4v10l-8 4-8-4V7z" fill="#FF2D20"/>
    <path d="M12 3l8 4v10l-8 4V3z" fill="#EB4432"/>
    <path d="M8 9l4-2 4 2v4l-4 2-4-2V9z" fill="#fff"/>
  </svg>
);

export const GitHubIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <path d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.8.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.5-1.3.1-2.7 0 0 .8-.3 2.8 1 .8-.2 1.7-.3 2.5-.3s1.7.1 2.5.3c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 4-1.3 6.8-5.1 6.8-9.5 0-5.5-4.5-10-10-10z" fill="#ffffff"/>
  </svg>
);

export const ScrumIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <circle cx="12" cy="12" r="10" fill="#009FDA" stroke="#007ACC" strokeWidth="1"/>
    <path d="M8 8h8v2H8zM8 11h8v2H8zM8 14h5v2H8z" fill="#fff"/>
    <circle cx="17" cy="17" r="3" fill="#28A745"/>
    <path d="M16 17l1 1 2-2" stroke="#fff" strokeWidth="1" fill="none"/>
  </svg>
);

export const TDDIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <circle cx="12" cy="12" r="10" fill="#28A745"/>
    <path d="M8 12l2.5 2.5L16 9" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const RESTIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <rect x="3" y="6" width="18" height="12" rx="2" fill="#6C757D"/>
    <path d="M7 12h10M12 9v6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="7" cy="12" r="2" fill="#28A745"/>
    <circle cx="17" cy="12" r="2" fill="#28A745"/>
  </svg>
);

export const SQLIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <ellipse cx="12" cy="6" rx="8" ry="3" fill="#F29111"/>
    <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6" stroke="#F29111" strokeWidth="2" fill="none"/>
    <ellipse cx="12" cy="12" rx="8" ry="3" fill="none" stroke="#F29111" strokeWidth="2"/>
    <ellipse cx="12" cy="18" rx="8" ry="3" fill="none" stroke="#F29111" strokeWidth="2"/>
  </svg>
);

export const VercelIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <path d="M12 2L22 20H2L12 2z" fill="#fff"/>
  </svg>
);

export const DefaultIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <circle cx="12" cy="12" r="10" fill="#6366F1"/>
    <path d="M12 7v5l3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export type TechIconName =
  | 'React' | 'TypeScript' | 'JavaScript' | 'Node.js' | 'Next.js'
  | 'MongoDB' | 'PostgreSQL' | 'Python' | 'Docker' | 'TailwindCSS'
  | 'Express' | 'Redis' | 'AWS' | 'Git' | 'Jest' | 'Prisma' | 'Stripe'
  | 'MySQL' | 'Java' | 'Swagger' | 'Angular' | 'HTML5' | 'CSS3'
  | 'jQuery' | 'Django' | 'PHP' | 'Laravel' | 'GitHub' | 'Scrum'
  | 'TDD' | 'REST APIs' | 'SQL' | 'Vercel';

const iconMap: Record<string, React.FC<IconProps>> = {
  React: ReactIcon,
  TypeScript: TypeScriptIcon,
  JavaScript: JavaScriptIcon,
  'Node.js': NodeJSIcon,
  'Next.js': NextJSIcon,
  MongoDB: MongoDBIcon,
  PostgreSQL: PostgreSQLIcon,
  Python: PythonIcon,
  Docker: DockerIcon,
  TailwindCSS: TailwindIcon,
  Express: ExpressIcon,
  Redis: RedisIcon,
  AWS: AWSIcon,
  Git: GitIcon,
  Jest: JestIcon,
  Prisma: PrismaIcon,
  Stripe: StripeIcon,
  MySQL: MySQLIcon,
  Java: JavaIcon,
  Swagger: SwaggerIcon,
  Angular: AngularIcon,
  HTML5: HTML5Icon,
  CSS3: CSS3Icon,
  jQuery: jQueryIcon,
  Django: DjangoIcon,
  PHP: PHPIcon,
  Laravel: LaravelIcon,
  GitHub: GitHubIcon,
  Scrum: ScrumIcon,
  TDD: TDDIcon,
  'REST APIs': RESTIcon,
  SQL: SQLIcon,
  Vercel: VercelIcon,
};

interface TechIconProps extends IconProps {
  name: string;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, className, size = 20 }) => {
  const IconComponent = iconMap[name] || DefaultIcon;
  return <IconComponent className={className} size={size} />;
};

export default TechIcon;
