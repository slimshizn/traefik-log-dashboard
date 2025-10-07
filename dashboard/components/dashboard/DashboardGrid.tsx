'use client';

import { DashboardMetrics } from '@/lib/types';
import RequestsCard from './cards/RequestsCard';
import ResponseTimeCard from './cards/ResponseTimeCard';
import StatusCodesCard from './cards/StatusCodesCard';
import TopRoutesCard from './cards/TopRoutesCard';
import BackendsCard from './cards/BackendsCard'; // This is used for "Top Services"
import RoutersCard from './cards/RoutersCard';
import GeographicDistributionCard from './cards/GeographicDistributionCard';
import TopRequestAddressesCard from './cards/TopRequestAddressesCard';
import TopRequestHostsCard from './cards/TopRequestHostsCard';
import TopClientIPsCard from './cards/TopClientIPsCard';
import RecentLogsTable from './cards/RecentLogsTable';
import StatusCodeDistributionCard from './cards/StatusCodeDistributionCard';
import TimelineCard from './cards/TimelineCard';


interface DashboardGridProps {
  metrics: DashboardMetrics;
  demoMode?: boolean;
}

export default function DashboardGrid({ metrics, demoMode = false }: DashboardGridProps) {
  return (
    <div className="space-y-6">
      {/* Top Row: Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <RequestsCard metrics={metrics.requests} />
        <ResponseTimeCard metrics={metrics.responseTime} />
        {/* The following are conceptual cards from your image, mapped to existing components */}
        <Card title="Avg Response Time" icon={<div />} className="text-center">
            <div className="text-4xl font-bold">{metrics.responseTime.average.toFixed(0)}ms</div>
        </Card>
        <Card title="Error Rate" icon={<div />} className="text-center">
            <div className="text-4xl font-bold">{metrics.statusCodes.errorRate.toFixed(1)}%</div>
        </Card>
        <Card title="Active Services" icon={<div />} className="text-center">
            <div className="text-4xl font-bold">{metrics.backends.length}</div>
        </Card>
      </div>

      {/* Second Row: Status, Services */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <StatusCodeDistributionCard metrics={metrics.statusCodes} />
        </div>
        <div className="lg:col-span-2">
          <BackendsCard backends={metrics.backends} />
        </div>
      </div>
      
      {/* Third Row: Routers, Addresses, Hosts, IPs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <TopRoutesCard routes={metrics.topRoutes} />
        <TopRequestAddressesCard addresses={metrics.topRequestAddresses} />
        <TopRequestHostsCard hosts={metrics.topRequestHosts} />
        <TopClientIPsCard clients={metrics.topClientIPs} />
      </div>

      {/* Fourth Row: Geographic Distribution */}
      <GeographicDistributionCard locations={metrics.geoLocations} />

      {/* Final Row: Recent Logs Table */}
      <div className="col-span-1 lg:col-span-full">
        <RecentLogsTable logs={metrics.logs} />
      </div>

    </div>
  );
}

// A simple placeholder Card component to make the layout work like in the image
const Card = ({ title, children, className }: { title: string, icon: React.ReactNode, children: React.ReactNode, className?: string }) => (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}>
        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">{title}</h3>
        {children}
    </div>
);