'use client';

import Link from 'next/link';
import { Activity, Home } from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';

interface HeaderProps {
  title: string;
  connected?: boolean;
  demoMode?: boolean;
  lastUpdate?: Date;
}

export default function Header({ title, connected = false, demoMode = false, lastUpdate }: HeaderProps) {
  return (
    <header className="bg-white border-b border-red-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="w-8 h-8 text-red-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">{title}</h1>
              {demoMode && (
                <Badge variant="secondary" className="mt-0.5 bg-red-100 text-red-700 border-red-300">
                  Demo Mode - Simulated Data
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {connected !== undefined && (
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${connected ? 'bg-red-600' : 'bg-gray-400'} animate-pulse`} />
                <span className="text-sm text-gray-600">
                  {connected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
            )}
            
            {lastUpdate && (
              <div className="text-xs text-gray-500">
                Last update: {lastUpdate.toLocaleTimeString()}
              </div>
            )}

            <Button asChild variant="secondary" className="border-red-300 text-red-700 hover:bg-red-50">
              <Link href="/" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}