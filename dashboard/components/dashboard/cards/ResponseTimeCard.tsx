'use client';

import { Clock } from 'lucide-react';
import Card from '@/components/ui/DashboardCard';
import { ResponseTimeMetrics } from '@/lib/types';

interface ResponseTimeCardProps {
  metrics: ResponseTimeMetrics;
}

export default function ResponseTimeCard({ metrics }: ResponseTimeCardProps) {
  return (
    <Card title="Response Time" icon={<Clock className="w-5 h-5" />}>
      <div className="space-y-3">
        <div className="text-4xl font-bold text-gray-900">{metrics.average.toFixed(0)}ms</div>
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
          <div>
            <div className="text-xs text-gray-500 uppercase">P95</div>
            <div className="text-sm font-semibold text-gray-900">{metrics.p95.toFixed(0)}ms</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase">P99</div>
            <div className="text-sm font-semibold text-gray-900">{metrics.p99.toFixed(0)}ms</div>
          </div>
        </div>
      </div>
    </Card>
  );
}