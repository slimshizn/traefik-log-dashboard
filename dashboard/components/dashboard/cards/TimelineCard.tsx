'use client';

import { LineChart } from 'lucide-react';
import Card from '@/components/ui/DashboardCard';
import { TimeSeriesPoint } from '@/lib/types';

interface TimelineCardProps {
  timeline: TimeSeriesPoint[];
}

export default function TimelineCard({ timeline }: TimelineCardProps) {
  if (timeline.length === 0) {
    return (
      <Card title="Request Timeline" icon={<LineChart className="w-5 h-5" />}>
        <div className="text-center py-8 text-gray-400">No timeline data available</div>
      </Card>
    );
  }

  const maxValue = Math.max(...timeline.map(t => t.value));

  return (
    <Card title="Request Timeline" icon={<LineChart className="w-5 h-5" />}>
      <div className="space-y-4">
        <div className="flex items-end justify-between h-32 gap-1">
          {timeline.map((point, index) => (
            <div key={index} className="flex-1 flex flex-col justify-end group relative">
              <div 
                className="bg-gray-900 hover:bg-gray-700 transition-colors rounded-t"
                style={{ height: `${(point.value / maxValue) * 100}%` }}
              />
              <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap left-1/2 transform -translate-x-1/2">
                {point.label || new Date(point.timestamp).toLocaleTimeString()}: {point.value}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>{timeline[0]?.label || 'Start'}</span>
          <span>{timeline[timeline.length - 1]?.label || 'Now'}</span>
        </div>
      </div>
    </Card>
  );
}