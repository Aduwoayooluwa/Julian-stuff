import React from 'react';
import type { ForecastDay } from '../types/weather';

interface WeatherPredictionProps {
  forecast: ForecastDay[];
}

export const WeatherPrediction: React.FC<WeatherPredictionProps> = ({ forecast }) => {
  const next3Days = forecast.slice(1, 4);
  
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Weather Prediction</h3>
      
      <div className="space-y-3 sm:space-y-4">
        {next3Days.map((day, index) => (
          <div key={day.date} className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8">
                <img
                  src={`https:${day.day.condition.icon}`}
                  alt={day.day.condition.text}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-medium text-gray-900">
                  {index === 0 ? 'Tomorrow' : 
                   index === 1 ? 'Day after' : 
                   new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}
                </div>
                <div className="text-xs text-gray-500 capitalize">
                  {day.day.condition.text.toLowerCase()}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm sm:text-lg font-semibold text-gray-900">
                {Math.round(day.day.maxtemp_c)}°/{Math.round(day.day.mintemp_c)}°
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 sm:mt-6">
        <button className="w-full bg-[#da540d] text-white py-2 sm:py-3 px-4 rounded-lg font-medium hover:bg-[#c44a0c] transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Next 5 Days
        </button>
      </div>
    </div>
  );
}; 