'use client';

import { BarChart3 } from 'lucide-react';
import Card from '@/components/ui/DashboardCard';
import { StatusCodeMetrics } from '@/lib/types';
import { formatNumber } from '@/lib/utils';

interface StatusCodesCardProps {
  metrics: StatusCodeMetrics;
}

export default function StatusCodesCard({ metrics }: StatusCodesCardProps) {
  const total = metrics.status2xx + metrics.status3xx + metrics.status4xx + metrics.status5xx;

  return (
    <Card title="Status Codes" icon={<BarChart3 className="w-5 h-5" />}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">2xx</span>
            <span className="font-semibold text-gray-900">{formatNumber(metrics.status2xx)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">3xx</span>
            <span className="font-semibold text-gray-900">{formatNumber(metrics.status3xx)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">4xx</span>
            <span className="font-semibold text-gray-900">{formatNumber(metrics.status4xx)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">5xx</span>
            <span className="font-semibold text-gray-900">{formatNumber(metrics.status5xx)}</span>
          </div>
        </div>

        {total > 0 && (
          <div className="space-y-2 pt-3 border-t border-gray-100">
            <div className="flex h-2 rounded-full overflow-hidden bg-gray-100">
              {metrics.status2xx > 0 && (
                <div className="bg-gray-900" style={{ width: `${(metrics.status2xx / total) * 100}%` }} />
              )}
              {metrics.status3xx > 0 && (
                <div className="bg-gray-700" style={{ width: `${(metrics.status3xx / total) * 100}%` }} />
              )}
              {metrics.status4xx > 0 && (
                <div className="bg-gray-500" style={{ width: `${(metrics.status4xx / total) * 100}%` }} />
              )}
              {metrics.status5xx > 0 && (
                <div className="bg-gray-300" style={{ width: `${(metrics.status5xx / total) * 100}%` }} />
              )}
            </div>
            <div className="text-xs text-gray-600">
              Error rate: {metrics.errorRate.toFixed(2)}%
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}