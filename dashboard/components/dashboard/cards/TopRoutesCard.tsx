'use client';

import { TrendingUp } from 'lucide-react';
import Card from '@/components/ui/DashboardCard';
import { RouteMetrics } from '@/lib/types';
import { formatNumber, truncate } from '@/lib/utils';

interface TopRoutesCardProps {
  routes: RouteMetrics[];
}

export default function TopRoutesCard({ routes }: TopRoutesCardProps) {
  if (routes.length === 0) {
    return (
      <Card title="Top Routes" icon={<TrendingUp className="w-5 h-5" />}>
        <div className="text-center py-8 text-gray-400">No route data available</div>
      </Card>
    );
  }

  const maxCount = Math.max(...routes.map(r => r.count));

  return (
    <Card title="Top Routes" icon={<TrendingUp className="w-5 h-5" />}>
      <div className="space-y-4">
        {routes.map((route, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="px-2 py-0.5 bg-gray-100 text-gray-900 text-xs font-medium rounded">
                  {route.method}
                </span>
                <span className="truncate font-medium text-gray-900" title={route.path}>
                  {truncate(route.path, 35)}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-600 ml-3">
                <span>{formatNumber(route.count)}</span>
                <span className="text-gray-400">•</span>
                <span>{route.avgDuration.toFixed(0)}ms</span>
              </div>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gray-900 transition-all duration-300" 
                style={{ width: `${(route.count / maxCount) * 100}%` }} 
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}