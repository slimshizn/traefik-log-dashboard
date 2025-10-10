import { Activity, Github, Heart } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-red-200 bg-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-6 h-6 text-red-600" />
              <span className="font-bold text-gray-900">Traefik Log Dashboard</span>
            </div>
            <p className="text-sm text-gray-600">
              Real-time analytics and monitoring for Traefik access logs. Open source and built with modern technologies.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-red-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-600 hover:text-red-600 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/demo" className="text-gray-600 hover:text-red-600 transition-colors">
                  Demo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-red-600 transition-colors flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  GitHub Repository
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">
                  API Reference
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-red-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <p>© 2025 Traefik Log Dashboard. Open Source Project.</p>
            <p className="flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-600 fill-red-600" /> for the community
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}