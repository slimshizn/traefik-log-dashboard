'use client';

import { useState } from 'react';
import { List, ChevronDown } from 'lucide-react';
import Card from '@/components/ui/DashboardCard';
import { TraefikLog } from '@/lib/types';
import { formatDuration, getStatusColor } from '@/lib/utils';

interface Props {
	logs: TraefikLog[];
}

// Define the columns available in the table
const columnsConfig = [
  { id: 'time', header: 'Time' },
  { id: 'clientIp', header: 'Client IP' },
  { id: 'method', header: 'Method' },
  { id: 'path', header: 'Path' },
  { id: 'status', header: 'Status' },
  { id: 'respTime', header: 'Resp. Time' },
  { id: 'service', header: 'Service' },
  { id: 'router', header: 'Router' },
];

export default function RecentLogsTable({ logs }: Props) {
  // State to manage which columns are visible
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    time: true,
    clientIp: true,
    method: true,
    path: true,
    status: true,
    respTime: true,
    service: true,
router: true,
  });

  const toggleColumn = (id: string) => {
    setVisibleColumns(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const visibleColumnDefs = columnsConfig.filter(c => visibleColumns[c.id]);

  return (
    <Card 
      title="Recent Logs" 
      icon={
        <div className="relative group">
          <details className="relative">
            <summary className="flex items-center gap-1 cursor-pointer text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">
              <span>Columns</span>
              <ChevronDown className="w-4 h-4" />
            </summary>
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10 p-2 space-y-1">
              {columnsConfig.map(col => (
                <label key={col.id} className="flex items-center gap-2 text-sm w-full hover:bg-gray-50 p-1 rounded">
                  <input
                    type="checkbox"
                    checked={visibleColumns[col.id]}
                    onChange={() => toggleColumn(col.id)}
                    className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                  />
                  {col.header}
                </label>
              ))}
            </div>
          </details>
        </div>
      }
    >
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-xs text-muted-foreground">
            <tr className="border-b">
              {visibleColumnDefs.map(col => (
                <th key={col.id} className="py-2 pr-4 text-left font-semibold">{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {logs.slice(0, 100).map((log, idx) => (
              <tr key={idx}>
                {visibleColumns.time && <td className="py-2 pr-4 whitespace-nowrap">{new Date(log.StartUTC || log.StartLocal).toLocaleTimeString()}</td>}
                {visibleColumns.clientIp && <td className="py-2 pr-4 whitespace-nowrap font-mono">{log.ClientHost}</td>}
                {visibleColumns.method && <td className="py-2 pr-4 whitespace-nowrap">{log.RequestMethod}</td>}
                {visibleColumns.path && <td className="py-2 pr-4 truncate max-w-[24rem]" title={log.RequestPath}>{log.RequestPath}</td>}
                {visibleColumns.status && <td className="py-2 pr-4 whitespace-nowrap font-semibold"><span className={getStatusColor(log.DownstreamStatus)}>{log.DownstreamStatus}</span></td>}
                {visibleColumns.respTime && <td className="py-2 pr-4 whitespace-nowrap">{formatDuration(log.Duration)}</td>}
                {visibleColumns.service && <td className="py-2 pr-4 whitespace-nowrap truncate max-w-[12rem]">{log.ServiceName || 'N/A'}</td>}
                {visibleColumns.router && <td className="py-2 pr-4 whitespace-nowrap truncate max-w-[12rem]">{log.RouterName || 'N/A'}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}