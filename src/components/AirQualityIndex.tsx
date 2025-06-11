import React from 'react';

interface AirQualityIndexProps {
  airQualityIndex: number;
  location?: string;
}

const getAirQualityInfo = (index: number) => {
  if (index <= 50) return { label: 'Good', color: 'bg-green-500', textColor: 'text-green-700', bgColor: 'bg-green-50', borderColor: 'border-green-400' };
  if (index <= 100) return { label: 'Moderate', color: 'bg-yellow-500', textColor: 'text-yellow-700', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-400' };
  if (index <= 150) return { label: 'Unhealthy for Sensitive Groups', color: 'bg-orange-500', textColor: 'text-orange-700', bgColor: 'bg-orange-50', borderColor: 'border-orange-400' };
  if (index <= 200) return { label: 'Unhealthy', color: 'bg-red-500', textColor: 'text-red-700', bgColor: 'bg-red-50', borderColor: 'border-red-400' };
  if (index <= 300) return { label: 'Very Unhealthy', color: 'bg-purple-500', textColor: 'text-purple-700', bgColor: 'bg-purple-50', borderColor: 'border-purple-400' };
  return { label: 'Hazardous', color: 'bg-red-900', textColor: 'text-red-900', bgColor: 'bg-red-50', borderColor: 'border-red-900' };
};

const qualityLevels = [
  { min: 0, max: 50, label: 'Good', color: 'bg-green-500' },
  { min: 51, max: 100, label: 'Moderate', color: 'bg-yellow-500' },
  { min: 101, max: 150, label: 'USG', color: 'bg-orange-500' },
  { min: 151, max: 200, label: 'Unhealthy', color: 'bg-red-500' },
  { min: 201, max: 300, label: 'V. Unhealthy', color: 'bg-purple-500' },
  { min: 301, max: 500, label: 'Hazardous', color: 'bg-red-900' },
];

export const AirQualityIndex: React.FC<AirQualityIndexProps> = ({ airQualityIndex, location }) => {
  const currentQuality = getAirQualityInfo(airQualityIndex);
  
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gray-300 flex items-center justify-center">
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white"></div>
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Air Quality Index</h3>
        <button className="ml-auto text-gray-400 hover:text-gray-600">
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
      
      <div className="text-xs sm:text-sm text-gray-600 mb-1">{location || 'Loading location...'}</div>
      <div className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 ${currentQuality.textColor}`}>
        {currentQuality.label}
      </div>
      
      <div className="flex gap-1 mb-3 sm:mb-4">
        {qualityLevels.map((level, index) => (
          <div
            key={index}
            className={`h-2 rounded-full flex-1 ${level.color} ${
              airQualityIndex >= level.min && airQualityIndex <= level.max
                ? 'opacity-100'
                : 'opacity-30'
            }`}
          ></div>
        ))}
      </div>
      
      <div className={`${currentQuality.bgColor} rounded-lg p-3 border-l-4 ${currentQuality.borderColor}`}>
        <div className={`${currentQuality.textColor} text-xs sm:text-sm font-medium`}>{currentQuality.label}</div>
      </div>
    </div>
  );
}; 