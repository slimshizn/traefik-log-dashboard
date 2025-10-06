'use client';

import { AlertCircle } from 'lucide-react';
import Card from '@/components/ui/DashboardCard';
import { ErrorLog } from '@/lib/types';

interface ErrorsCardProps {
  errors: ErrorLog[];
}

export default function ErrorsCard({ errors }: ErrorsCardProps) {
  if (errors.length === 0) {
    return null;
  }

  return (
    <Card title="Recent Errors" icon={<AlertCircle className="w-5 h-5" />}>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {errors.slice(0, 10).map((error, index) => (
          <div key={index} className="border-l-2 border-gray-900 pl-3 py-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-500 mb-1">
                  {new Date(error.timestamp).toLocaleString()}
                </div>
                <div className="text-sm text-gray-900 font-medium mb-1">
                  {error.level.toUpperCase()}
                </div>
                <div className="text-sm text-gray-600 break-words">
                  {error.message}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}