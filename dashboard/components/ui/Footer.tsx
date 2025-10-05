'use client';

import { Github, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-white/10 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-black/60 dark:text-white/70">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-black dark:text-white" />
            <span>for Traefik</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-black/60 dark:text-white/70">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-black dark:hover:text-white transition-colors"
            >
              <Github className="w-4 h-4 text-black dark:text-white" />
              <span>GitHub</span>
            </a>
            <span>TRAEFIK LOG DASHBOARD v2.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}