import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { Project, Language } from '../../types';
import TechBadge from './TechBadge';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Language;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="project-card glass rounded-2xl overflow-hidden group"
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-nebula-purple/30 to-nebula-blue/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl opacity-50">
            {project.technologies[0] === 'React' ? '⚛️' : '💻'}
          </span>
        </div>

        {project.featured && (
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-nebula-pink/80 text-xs font-medium">
            {t('projects.featured')}
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="px-4 py-2 rounded-lg bg-nebula-blue text-white text-sm font-medium"
            >
              {t('projects.viewLive')}
            </motion.a>
          )}
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="px-4 py-2 rounded-lg border border-white/30 text-white text-sm font-medium"
            >
              {t('projects.viewCode')}
            </motion.a>
          )}
        </div>
      </div>

      {/* Project Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-white">
          {project.title[lang] || project.title.es}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {project.description[lang] || project.description.es}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <TechBadge key={tech} name={tech} size="sm" />
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 text-xs text-gray-400">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
