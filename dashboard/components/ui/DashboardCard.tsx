import React from 'react';

interface DashboardCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function DashboardCard({ title, icon, children, className = '' }: DashboardCardProps) {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">{title}</h3>
        {icon && <div className="text-gray-900">{icon}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
}