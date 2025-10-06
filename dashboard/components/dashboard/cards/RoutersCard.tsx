'use client';

import { GitBranch } from 'lucide-react';
import Card from '@/components/ui/DashboardCard';
import { RouterMetrics } from '@/lib/types';
import { formatNumber } from '@/lib/utils';

interface RoutersCardProps {
  routers: RouterMetrics[];
}

export default function RoutersCard({ routers }: RoutersCardProps) {
  if (routers.length === 0) {
    return (
      <Card title="Routers" icon={<GitBranch className="w-5 h-5" />}>
        <div className="text-center py-8 text-gray-400">No router data available</div>
      </Card>
    );
  }

  const maxRequests = Math.max(...routers.map(r => r.requests));

  return (
    <Card title="Routers" icon={<GitBranch className="w-5 h-5" />}>
      <div className="space-y-4">
        {routers.map((router, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">{router.name}</div>
                <div className="text-xs text-gray-500 truncate">→ {router.service}</div>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-600 ml-3">
                <span>{formatNumber(router.requests)}</span>
                <span className="text-gray-400">•</span>
                <span>{router.avgDuration.toFixed(0)}ms</span>
              </div>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gray-900 transition-all duration-300" 
                style={{ width: `${(router.requests / maxRequests) * 100}%` }} 
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}