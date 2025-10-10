'use client';

import { useState } from 'react';
import { MapPin, Globe } from 'lucide-react';
import Card from '@/components/ui/DashboardCard';
import { GeoLocation } from '@/lib/types';
import { formatNumber } from '@/lib/utils';

interface Props {
  locations: GeoLocation[];
}

export default function InteractiveGeoMap({ locations }: Props) {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  if (!locations || locations.length === 0) {
    return (
      <Card title="Interactive Geographic Map" icon={<Globe className="w-5 h-5 text-red-600" />}>
        <div className="text-center py-8 text-gray-500">No geographic data available</div>
      </Card>
    );
  }

  const validLocations = locations.filter(
    loc => loc.country !== 'Unknown' && loc.country !== 'Private Network'
  );
  
  const totalRequests = validLocations.reduce((sum, loc) => sum + loc.count, 0);
  const maxCount = Math.max(...validLocations.map(loc => loc.count));

  const topLocations = validLocations.slice(0, 15);
  const selectedLocation = selectedCountry 
    ? validLocations.find(loc => loc.country === selectedCountry)
    : null;

  const getCountryCode = (country: string): string => {
    const codes: { [key: string]: string } = {
      'United States': 'US',
      'United Kingdom': 'GB',
      'Germany': 'DE',
      'France': 'FR',
      'Japan': 'JP',
      'China': 'CN',
      'India': 'IN',
      'Brazil': 'BR',
      'Canada': 'CA',
      'Australia': 'AU',
      'Russia': 'RU',
      'South Korea': 'KR',
      'Spain': 'ES',
      'Italy': 'IT',
      'Netherlands': 'NL'
    };
    return codes[country] || 'XX';
  };

  const getHeatColor = (count: number): string => {
    const intensity = (count / maxCount) * 100;
    if (intensity > 75) return 'bg-red-600 border-red-700';
    if (intensity > 50) return 'bg-red-500 border-red-600';
    if (intensity > 25) return 'bg-red-400 border-red-500';
    return 'bg-red-300 border-red-400';
  };

  const getTextColor = (count: number): string => {
    const intensity = (count / maxCount) * 100;
    if (intensity > 75) return 'text-red-600';
    if (intensity > 50) return 'text-red-500';
    if (intensity > 25) return 'text-red-400';
    return 'text-red-300';
  };

  return (
    <Card title="Interactive Geographic Map" icon={<Globe className="w-5 h-5 text-red-600" />}>
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-red-50 to-white rounded-lg p-6 border border-red-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-gray-600">Total Locations</div>
              <div className="text-3xl font-bold text-red-600">{validLocations.length}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Total Requests</div>
              <div className="text-3xl font-bold text-gray-900">{formatNumber(totalRequests)}</div>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {topLocations.map((location, idx) => {
              const percentage = (location.count / totalRequests) * 100;
              const isSelected = selectedCountry === location.country;
              
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedCountry(isSelected ? null : location.country)}
                  className={`
                    relative group p-3 rounded-lg border-2 transition-all transform hover:scale-105
                    ${isSelected 
                      ? 'bg-red-600 border-red-700 shadow-lg scale-105' 
                      : `${getHeatColor(location.count)} hover:shadow-md`
                    }
                  `}
                  title={`${location.country}: ${formatNumber(location.count)} requests (${percentage.toFixed(1)}%)`}
                >
                  <div className={`text-xs font-bold mb-1 ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                    {getCountryCode(location.country)}
                  </div>
                  <div className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                    {(percentage).toFixed(0)}%
                  </div>
                  <div className={`text-xs ${isSelected ? 'text-red-100' : 'text-gray-600'}`}>
                    {formatNumber(location.count)}
                  </div>
                  
                  <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity" />
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs">
            <span className="text-gray-600">Heat:</span>
            <div className="flex items-center gap-1 flex-1">
              <div className="w-full h-2 bg-gradient-to-r from-red-300 via-red-500 to-red-600 rounded-full" />
            </div>
            <span className="text-gray-600">Low → High</span>
          </div>
        </div>

        {selectedLocation && (
          <div className="bg-red-50 rounded-lg p-4 border-2 border-red-600 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-lg font-bold text-gray-900 mb-1">
                  {selectedLocation.country}
                </div>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div>
                    <div className="text-xs text-gray-600">Requests</div>
                    <div className="text-xl font-bold text-red-600">
                      {formatNumber(selectedLocation.count)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">Percentage</div>
                    <div className="text-xl font-bold text-red-600">
                      {((selectedLocation.count / totalRequests) * 100).toFixed(2)}%
                    </div>
                  </div>
                </div>
                {selectedLocation.latitude && selectedLocation.longitude && (
                  <div className="mt-2 text-xs text-gray-600">
                    <span className="font-mono">
                      {selectedLocation.latitude.toFixed(4)}°, {selectedLocation.longitude.toFixed(4)}°
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {topLocations.map((location, idx) => {
            const percentage = (location.count / totalRequests) * 100;
            const isSelected = selectedCountry === location.country;
            
            return (
              <button
                key={idx}
                onClick={() => setSelectedCountry(isSelected ? null : location.country)}
                className={`
                  w-full text-left p-3 rounded-lg border transition-all
                  ${isSelected 
                    ? 'bg-red-100 border-red-600 shadow-md' 
                    : 'bg-white border-red-200 hover:bg-red-50 hover:border-red-300'
                  }
                `}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center justify-center w-6 h-6 text-xs font-bold rounded ${
                      isSelected ? 'bg-red-600 text-white' : 'bg-red-50 text-red-600'
                    }`}>
                      {idx + 1}
                    </span>
                    <span className={`font-semibold ${isSelected ? 'text-red-600' : 'text-gray-900'}`}>
                      {location.country}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-gray-600">{formatNumber(location.count)}</span>
                    <span className={`font-bold ${getTextColor(location.count)}`}>
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isSelected ? 'bg-red-600' : 'bg-red-500'
                    }`}
                    style={{ width: `${(location.count / maxCount) * 100}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}