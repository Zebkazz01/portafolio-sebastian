import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const CVUploader = () => {
  const { t } = useTranslation();
  const [cvFile, setCvFile] = useState<string | null>(
    localStorage.getItem('portfolio-cv-url')
  );

  const handleDownload = () => {
    if (cvFile) {
      window.open(cvFile, '_blank');
    }
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        localStorage.setItem('portfolio-cv-url', result);
        setCvFile(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleDownload}
        disabled={!cvFile}
        className={`
          px-6 py-3 rounded-lg font-medium flex items-center gap-2
          ${cvFile
            ? 'bg-gradient-to-r from-nebula-blue to-nebula-purple text-white'
            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }
        `}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        {t('hero.downloadCV')}
      </motion.button>

      {/* Admin upload (hidden in production, can be toggled) */}
      {import.meta.env.DEV && (
        <label className="cursor-pointer">
          <input
            type="file"
            accept=".pdf"
            onChange={handleUpload}
            className="hidden"
          />
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-lg border border-white/20 text-sm text-gray-400 hover:text-white hover:border-white/40 transition-colors inline-block"
          >
            Upload CV
          </motion.span>
        </label>
      )}
    </div>
  );
};

export default CVUploader;
