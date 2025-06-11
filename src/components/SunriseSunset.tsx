import React from 'react';
import type { Astro } from '../types/weather';
import { formatTime } from '../utils/dateUtils';

interface SunriseSunsetProps {
  astro?: Astro;
}

export const SunriseSunset: React.FC<SunriseSunsetProps> = ({ astro }) => {
  const sunriseTime = astro?.sunrise ? formatTime(astro.sunrise) : 'N/A';
  const sunsetTime = astro?.sunset ? formatTime(astro.sunset) : 'N/A';
  const hasValidData = astro?.sunrise && astro?.sunset;

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-yellow-100 flex items-center justify-center">
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-400"></div>
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Sunrise & Sunset</h3>
      </div>
      
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
                />
              </svg>
            </div>
            <div>
              <div className="text-xs sm:text-sm text-gray-500">Sunrise</div>
              <div className={`text-sm sm:text-base font-semibold ${hasValidData ? 'text-gray-900' : 'text-gray-400'}`}>
                {sunriseTime}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
                />
              </svg>
            </div>
            <div>
              <div className="text-xs sm:text-sm text-gray-500">Sunset</div>
              <div className={`text-sm sm:text-base font-semibold ${hasValidData ? 'text-gray-900' : 'text-gray-400'}`}>
                {sunsetTime}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {!hasValidData && (
        <div className="mt-3 p-2 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 text-center">
            Sunrise/sunset data unavailable for selected location or date
          </p>
        </div>
      )}
    </div>
  );
}; 