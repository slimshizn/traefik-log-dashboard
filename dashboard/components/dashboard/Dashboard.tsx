'use client';

import { TraefikLog } from '@/lib/types';
import DashboardGrid from './DashboardGrid';
import { useMemo } from 'react';
import { calculateMetrics } from '@/lib/traefik-parser';

interface DashboardProps {
  logs: TraefikLog[];
  demoMode?: boolean;
}

export default function Dashboard({ logs, demoMode = false }: DashboardProps) {
  const metrics = useMemo(() => calculateMetrics(logs), [logs]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DashboardGrid metrics={metrics} demoMode={demoMode} />
    </div>
  );
}