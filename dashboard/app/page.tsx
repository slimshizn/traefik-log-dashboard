import Link from 'next/link';
import { Activity, BarChart3, Terminal, Server, Gauge, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-red-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-red-600" />
              <h1 className="text-2xl font-bold text-gray-900">Traefik Log Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button asChild variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                <Link href="/dashboard/demo">Demo</Link>
              </Button>
              <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
                <Link href="/dashboard">Launch Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
            Real-time Traefik Log Analytics
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Monitor and analyze your Traefik access logs with a powerful, modern dashboard featuring
            real-time metrics, interactive charts, and comprehensive insights.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white text-lg px-8">
              <Link href="/dashboard">View Dashboard</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-red-300 text-red-700 hover:bg-red-50 text-lg px-8">
              <Link href="/dashboard/demo">Try Demo</Link>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="border border-red-200 rounded-xl p-8 hover:border-red-400 transition-all hover:shadow-xl bg-white">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
              <Server className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Analytics Agent</h3>
            <p className="text-gray-600 mb-6">
              High-performance backend agent written in Go for parsing and analyzing Traefik logs with minimal resource usage.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                Parses 100k+ lines/second
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                GeoIP lookups included
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                System resource monitoring
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                Bearer token authentication
              </li>
            </ul>
          </div>

          <div className="border border-red-200 rounded-xl p-8 hover:border-red-400 transition-all hover:shadow-xl bg-white">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
              <BarChart3 className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Web Dashboard</h3>
            <p className="text-gray-600 mb-6">
              Modern web-based dashboard with interactive charts and real-time updates built with Next.js 15 and React 19.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                Real-time metrics updates
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                Interactive charts & graphs
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                Geographic distribution maps
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                Demo mode available
              </li>
            </ul>
          </div>

          <div className="border border-red-200 rounded-xl p-8 hover:border-red-400 transition-all hover:shadow-xl bg-white">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
              <Terminal className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">CLI Dashboard</h3>
            <p className="text-gray-600 mb-6">
              Terminal-based dashboard with Bubble Tea UI for monitoring logs directly from your command line.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                Beautiful terminal UI
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                Direct log file reading
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                Agent connection support
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                Lightweight & fast
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-red-50/50 py-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 rounded-3xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Comprehensive Metrics
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <Gauge className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance</h3>
              <p className="text-gray-600">
                Track request rates, response times, and P95/P99 percentiles
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Status Codes</h3>
              <p className="text-gray-600">
                Monitor 2xx/3xx/4xx/5xx status codes and error rates
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <Activity className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Services</h3>
              <p className="text-gray-600">
                Analyze top routes, backends, routers, and geographic data
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-red-200 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600">
          <p>Traefik Log Dashboard - Open Source Monitoring Solution</p>
        </div>
      </footer>
    </div>
  );
}