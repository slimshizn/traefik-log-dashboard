'use client';

import { Activity } from 'lucide-react';
import Card from '@/components/ui/DashboardCard';
import { RequestMetrics } from '@/lib/types';
import { formatNumber } from '@/lib/utils';

interface RequestsCardProps {
  metrics: RequestMetrics;
}

export default function RequestsCard({ metrics }: RequestsCardProps) {
  return (
    <Card title="Total Requests" icon={<Activity className="w-5 h-5" />}>
      <div className="space-y-3">
        <div className="text-4xl font-bold text-gray-900">{formatNumber(metrics.total)}</div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">{metrics.perSecond.toFixed(2)} req/s</span>
          {metrics.change !== 0 && (
            <span className={`text-sm font-medium ${metrics.change > 0 ? 'text-gray-900' : 'text-gray-600'}`}>
              {metrics.change > 0 ? '↑' : '↓'} {Math.abs(metrics.change).toFixed(1)}%
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}