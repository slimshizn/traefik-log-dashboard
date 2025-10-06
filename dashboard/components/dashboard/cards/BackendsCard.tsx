'use client';

import { Server } from 'lucide-react';
import Card from '@/components/ui/DashboardCard';
import { BackendMetrics } from '@/lib/types';
import { formatNumber } from '@/lib/utils';

interface BackendsCardProps {
  backends: BackendMetrics[];
}

export default function BackendsCard({ backends }: BackendsCardProps) {
  if (backends.length === 0) {
    return (
      <Card title="Backend Services" icon={<Server className="w-5 h-5" />}>
        <div className="text-center py-8 text-gray-400">No backend data available</div>
      </Card>
    );
  }

  const maxRequests = Math.max(...backends.map(b => b.requests));

  return (
    <Card title="Backend Services" icon={<Server className="w-5 h-5" />}>
      <div className="space-y-4">
        {backends.map((backend, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">{backend.name}</div>
                <div className="text-xs text-gray-500 truncate">{backend.url}</div>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-600 ml-3">
                <span>{formatNumber(backend.requests)}</span>
                <span className="text-gray-400">•</span>
                <span>{backend.avgDuration.toFixed(0)}ms</span>
              </div>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gray-900 transition-all duration-300" 
                style={{ width: `${(backend.requests / maxRequests) * 100}%` }} 
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}