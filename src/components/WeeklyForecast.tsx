import React from 'react';
import type { ForecastDay } from '../types/weather';
import { getDayName } from '../utils/dateUtils';

interface WeeklyForecastProps {
  forecast: ForecastDay[];
}

export const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ forecast }) => {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
      <div className="flex sm:justify-between items-center gap-3 sm:gap-4 overflow-x-auto pb-2 sm:pb-0">
        {forecast.map((day) => (
          <div key={day.date} className="flex flex-col items-center text-center flex-shrink-0 min-w-[60px] sm:min-w-0">
            <div className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">
              {getDayName(day.date)}
            </div>
            <div className="w-8 h-8 sm:w-12 sm:h-12 mb-1 sm:mb-2">
              <img
                src={`https:${day.day.condition.icon}`}
                alt={day.day.condition.text}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-sm sm:text-lg font-semibold text-gray-900">
              {Math.round(day.day.maxtemp_c)}°
            </div>
            <div className="text-xs sm:text-sm text-gray-500">
              {Math.round(day.day.mintemp_c)}°
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 