'use client';

import { useEffect, useState } from 'react';
import Dashboard from '@/components/dashboard/Dashboard';
import Header from '@/components/ui/Header';
import { TraefikLog } from '@/lib/types';

export default function DashboardPage() {
  const [logs, setLogs] = useState<TraefikLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchLogs = async () => {
    try {
      const response = await fetch('/api/logs/access');
      if (!response.ok) throw new Error('Failed to fetch logs');
      
      const data = await response.json();
      setLogs(data.logs || []);
      setConnected(true);
      setError(null);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setConnected(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    setLoading(false);

    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
        <Header title="TRAEFIK LOG DASHBOARD" connected={false} />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
        <Header title="TRAEFIK LOG DASHBOARD" connected={false} />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚠️</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Connection Error</h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <p className="text-sm text-gray-500">
                Make sure the agent is running and accessible
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      <Header
        title="TRAEFIK LOG DASHBOARD"
        connected={connected}
        lastUpdate={lastUpdate}
      />
      <Dashboard logs={logs} demoMode={false} />
    </div>
  );
}