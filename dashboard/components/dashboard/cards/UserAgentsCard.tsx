'use client';

import { Users } from 'lucide-react';
import Card from '@/components/ui/DashboardCard';
import { UserAgentMetrics } from '@/lib/types';

interface UserAgentsCardProps {
  userAgents: UserAgentMetrics[];
}

export default function UserAgentsCard({ userAgents }: UserAgentsCardProps) {
  if (userAgents.length === 0) {
    return (
      <Card title="User Agents" icon={<Users className="w-5 h-5" />}>
        <div className="text-center py-8 text-gray-400">No user agent data available</div>
      </Card>
    );
  }

  return (
    <Card title="User Agents" icon={<Users className="w-5 h-5" />}>
      <div className="space-y-3">
        {userAgents.slice(0, 8).map((ua, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-900">{getBrowserIcon(ua.browser)} {ua.browser}</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">{ua.count}</span>
                <span className="text-xs text-gray-500">({ua.percentage.toFixed(1)}%)</span>
              </div>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gray-900 transition-all duration-300" 
                style={{ width: `${ua.percentage}%` }} 
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function getBrowserIcon(browser: string): string {
  const icons: { [key: string]: string } = {
    'Chrome': '🌐',
    'Firefox': '🦊',
    'Safari': '🧭',
    'Edge': '🔷',
    'Opera': '⭕',
    'Unknown': '❓',
  };
  return icons[browser] || '🌐';
}