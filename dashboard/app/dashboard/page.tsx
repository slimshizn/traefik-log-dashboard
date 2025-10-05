'use client';

import { useEffect, useState, useRef } from 'react';
import Dashboard from '@/components/dashboard/Dashboard';
import Header from '@/components/ui/Header';
import { apiClient } from '@/lib/api-client';
import { parseTraefikLogs } from '@/lib/traefik-parser';
import { TraefikLog } from '@/lib/types';
import { AlertCircle } from 'lucide-react';

export default function DashboardPage() {
  const [logs, setLogs] = useState<TraefikLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [logCount, setLogCount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchLogs = async () => {
    try {
      // Check agent status first
      const status = await apiClient.getStatus();
      
      if (!status.access_path_exists) {
        setError('Access log file not found. Please check agent configuration.');
        setLoading(false);
        setConnected(false);
        return;
      }

      setConnected(true);

      // Fetch access logs - always get fresh data from position 0
      const response = await apiClient.getAccessLogs(0, 1000);
      
      // Debug: Log raw response
      console.log('Fetched logs count:', response.logs.length);
      if (response.logs.length > 0) {
        console.log('First log sample:', response.logs[0]);
      }

      // Parse the logs
      const parsedLogs = parseTraefikLogs(response.logs);
      
      // Debug: Log parsed results
      console.log('Parsed logs count:', parsedLogs.length);
      if (parsedLogs.length > 0) {
        console.log('First parsed log:', parsedLogs[0]);
      }

      // Only update if we have new data
      if (parsedLogs.length > 0) {
        // Sort by timestamp (newest first)
        const sortedLogs = parsedLogs.sort((a, b) => {
          const timeA = new Date(a.StartUTC || a.StartLocal || 0).getTime();
          const timeB = new Date(b.StartUTC || b.StartLocal || 0).getTime();
          return timeB - timeA;
        });

        setLogs(sortedLogs);
        setLogCount(sortedLogs.length);
        setLastUpdate(new Date());
        setError(null);
      } else if (logs.length === 0) {
        // Only set error if we don't have any logs yet
        setError('No logs found. Waiting for Traefik to generate access logs...');
      }
    } catch (err) {
      console.error('Failed to fetch logs:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'Failed to connect to agent. Please ensure the agent is running.'
      );
      setConnected(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchLogs();

    // Set up polling interval (5 seconds)
    intervalRef.current = setInterval(fetchLogs, 5000);

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []); // Empty dependency array - only run once on mount

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header title="TRAEFIK LOG DASHBOARD" connected={false} />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && logs.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header title="TRAEFIK LOG DASHBOARD" connected={connected} />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center max-w-md">
              <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Connection Issue</h2>
              <p className="text-muted-foreground mb-4">{error}</p>
              <p className="text-sm text-muted-foreground">
                {connected 
                  ? 'The agent is connected but no logs are available yet.'
                  : 'Please check that the agent is running and accessible.'}
              </p>
              <button
                onClick={fetchLogs}
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header title="TRAEFIK LOG DASHBOARD" connected={connected} />
      {/* Status bar */}
      <div className="bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-2">
        <div className="container mx-auto flex items-center justify-between text-sm text-muted-foreground">
          <div>
            Showing {logCount} logs
          </div>
          <div className="flex items-center gap-4">
            {lastUpdate && (
              <span>Last update: {lastUpdate.toLocaleTimeString()}</span>
            )}
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Auto-refreshing every 5s
            </span>
          </div>
        </div>
      </div>
      <Dashboard logs={logs} demoMode={false} />
    </div>
  );
}