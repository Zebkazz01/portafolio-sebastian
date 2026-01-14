import { useState, useEffect } from 'react';
import type { Project } from '../types';
import defaultProjects from '../data/projects.json';

const STORAGE_KEY = 'portfolio-projects';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  // Load projects from localStorage or use defaults
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setProjects(JSON.parse(stored));
      } catch {
        setProjects(defaultProjects as Project[]);
      }
    } else {
      setProjects(defaultProjects as Project[]);
    }
  }, []);

  // Save to localStorage whenever projects change
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    }
  }, [projects]);

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
    };
    setProjects((prev) => [...prev, newProject]);
    return newProject;
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const reorderProjects = (fromIndex: number, toIndex: number) => {
    setProjects((prev) => {
      const result = [...prev];
      const [removed] = result.splice(fromIndex, 1);
      result.splice(toIndex, 0, removed);
      return result;
    });
  };

  const resetToDefaults = () => {
    setProjects(defaultProjects as Project[]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    projects,
    addProject,
    updateProject,
    deleteProject,
    reorderProjects,
    resetToDefaults,
  };
};
