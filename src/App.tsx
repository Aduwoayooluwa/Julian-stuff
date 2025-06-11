import React, { useEffect } from 'react';
import { Header } from './components/Header';
import { WeatherCard } from './components/WeatherCard';
import { WeeklyForecast } from './components/WeeklyForecast';
import { AirQualityIndex } from './components/AirQualityIndex';
import { SunriseSunset } from './components/SunriseSunset';
import { Calendar } from './components/Calendar';
import { WeatherPrediction } from './components/WeatherPrediction';
import { 
  WeatherCardSkeleton, 
  WeeklyForecastSkeleton, 
  AirQualityIndexSkeleton, 
  SunriseSunsetSkeleton,
  CalendarSkeleton,
  WeatherPredictionSkeleton
} from './components/SkeletonLoader';
import { useWeather } from './hooks/useWeather';

function App() {
  const { 
    weatherData, 
    airQualityData,
    loading, 
    error, 
    selectedDate,
    setLocation,
    setSelectedDate,
    getUserLocation
  } = useWeather();

  useEffect(() => {
  
    getUserLocation();
  }, [getUserLocation]);

  const handleLocationSelect = (location: string) => {
    setLocation(location);
  };

  const handleCurrentLocation = () => {
    getUserLocation();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <Header 
            location="Loading..."
            currentDay={new Date().toLocaleDateString('en-US', { weekday: 'long' })}
            currentDate={new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
            onLocationSelect={handleLocationSelect}
            onCurrentLocation={handleCurrentLocation}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
            <div className="lg:col-span-8 space-y-4 sm:space-y-6">
              <WeatherCardSkeleton />
              <WeeklyForecastSkeleton />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <AirQualityIndexSkeleton />
                <SunriseSunsetSkeleton />
              </div>
            </div>
            
            <div className="lg:col-span-4 space-y-4 sm:space-y-6">
              <CalendarSkeleton />
              <WeatherPredictionSkeleton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !weatherData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md w-full">
          <div className="mb-6">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Location Access Needed</h2>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">
              {error || 'We need access to your location to show local weather data.'}
            </p>
          </div>
          
          <div className="space-y-4">
            <button 
              onClick={handleCurrentLocation} 
              className="w-full bg-[#da540d] text-white px-6 py-3 rounded-lg hover:bg-[#c44a0c] transition-colors font-medium text-sm sm:text-base"
            >
              📍 Allow Location Access
            </button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">or</span>
              </div>
            </div>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search for a city..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#da540d] focus:border-transparent text-sm sm:text-base"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                    handleLocationSelect(e.currentTarget.value.trim());
                  }
                }}
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <Header 
          location={weatherData.location.name}
          currentDay={selectedDate.toLocaleDateString('en-US', { weekday: 'long' })}
          currentDate={selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
          onLocationSelect={handleLocationSelect}
          onCurrentLocation={handleCurrentLocation}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          <div className="lg:col-span-8 space-y-4 sm:space-y-6">
            <WeatherCard weatherData={weatherData} selectedDate={selectedDate} />
            <WeeklyForecast forecast={weatherData.forecast.forecastday} />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <AirQualityIndex 
                airQualityIndex={airQualityData?.current?.air_quality?.['us-epa-index'] || 0} 
                location={`${weatherData.location.name}, ${weatherData.location.region}`}
              />
              <SunriseSunset astro={weatherData.forecast.forecastday[0]?.astro} />
            </div>
          </div>
          
          <div className="lg:col-span-4 space-y-4 sm:space-y-6">
            <Calendar 
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
            <WeatherPrediction forecast={weatherData.forecast.forecastday} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
