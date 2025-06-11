import React, { useState } from 'react';
import type { WeatherData } from '../types/weather';

interface WeatherCardProps {
  weatherData: WeatherData;
  selectedDate?: Date;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData, selectedDate }) => {
  const [activeTab, setActiveTab] = useState<'today' | 'tomorrow'>('today');
  
  const currentTemp = Math.round(weatherData.current.temp_c);
  const locationName = weatherData.location.name;
  const displayDate = selectedDate || new Date();
  
  const isToday = displayDate.toDateString() === new Date().toDateString();
  
  const getWeatherForSelectedDate = () => {
    if (weatherData.forecast?.forecastday?.length > 0) {
      const targetDateStr = displayDate.toISOString().split('T')[0];
      const dayData = weatherData.forecast.forecastday.find(day => day.date === targetDateStr);
      
      if (dayData) {
        return {
          temp: Math.round(dayData.day.avgtemp_c),
          condition: dayData.day.condition
        };
      }
    }
    
    return {
      temp: currentTemp,
      condition: weatherData.current.condition
    };
  };
  
  const selectedDateWeather = getWeatherForSelectedDate();
  
  return (
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-4 sm:p-6 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="30" r="15" fill="currentColor" />
          <circle cx="35" cy="45" r="12" fill="currentColor" opacity="0.8" />
          <circle cx="65" cy="45" r="10" fill="currentColor" opacity="0.6" />
          <circle cx="25" cy="60" r="8" fill="currentColor" opacity="0.4" />
          <circle cx="75" cy="60" r="6" fill="currentColor" opacity="0.3" />
        </svg>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-4">
          <div className="text-4xl sm:text-5xl font-light">{selectedDateWeather.temp}°</div>
          <div className="w-12 h-12 sm:w-16 sm:h-16">
            <img 
              src={`https:${selectedDateWeather.condition.icon}`}
              alt={selectedDateWeather.condition.text}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        
        <div className="mb-4 sm:mb-6">
          <div className="text-base sm:text-lg font-medium">{locationName}</div>
          <div className="text-xs sm:text-sm opacity-75">
            {displayDate.toLocaleDateString('en-US', { 
              weekday: 'long',
              month: 'long', 
              day: 'numeric' 
            })}
            {!isToday && <span className="ml-2 px-2 py-1 bg-white/20 rounded text-xs">Historical</span>}
          </div>
        </div>
        
        <div className="flex gap-2 sm:gap-4">
          <button
            onClick={() => setActiveTab('today')}
            className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'today'
                ? 'bg-white text-blue-600'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setActiveTab('tomorrow')}
            className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'tomorrow'
                ? 'bg-white text-blue-600'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            Tomorrow
          </button>
        </div>
      </div>
    </div>
  );
}; 