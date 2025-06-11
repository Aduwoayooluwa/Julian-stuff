import { useState, useEffect, useCallback } from 'react';
import { weatherService } from '../services/weatherService';
import { geolocationService } from '../services/geolocationService';
import type { WeatherData, WeatherWithAirQuality } from '../types/weather';

interface UseWeatherReturn {
  weatherData: WeatherData | null;
  airQualityData: WeatherWithAirQuality | null;
  loading: boolean;
  error: string | null;
  currentLocation: string;
  selectedDate: Date;
  setLocation: (location: string) => void;
  setSelectedDate: (date: Date) => void;
  getUserLocation: () => Promise<void>;
  refetch: () => Promise<void>;
}

export const useWeather = (initialLocation: string = 'New York'): UseWeatherReturn => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [airQualityData, setAirQualityData] = useState<WeatherWithAirQuality | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState(initialLocation);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const fetchWeatherData = useCallback(async (location: string, date?: Date) => {
    try {
      setLoading(true);
      setError(null);
      
      const [weatherPromise, airQualityPromise] = await Promise.allSettled([
        date 
          ? weatherService.getWeatherForDate(location, date)
          : weatherService.getForecast(location, 7),
        weatherService.getWeatherWithAirQuality(location)
      ]);
      
      if (weatherPromise.status === 'fulfilled') {
        setWeatherData(weatherPromise.value);
        setCurrentLocation(location);
      } else {
        throw weatherPromise.reason;
      }
      
      if (airQualityPromise.status === 'fulfilled') {
        setAirQualityData(airQualityPromise.value);
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  }, []);

  const getUserLocation = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const position = await geolocationService.getCurrentPosition();
      
      const coordinates = geolocationService.formatCoordinates(
        position.latitude, 
        position.longitude
      );
      
      await fetchWeatherData(coordinates);
    } catch (geoError) {
      try {
        await fetchWeatherData('auto:ip');
      } catch {
        let errorMessage = 'Failed to get current location';
        
        if (geoError && typeof geoError === 'object' && 'code' in geoError) {
          switch (geoError.code) {
            case 1:
              errorMessage = 'Location access denied. Please enable location permissions or search for a city.';
              break;
            case 2:
              errorMessage = 'Location unavailable. Please check your connection or search for a city.';
              break;
            case 3:
              errorMessage = 'Location request timed out. Please try again or search for a city.';
              break;
            default:
              errorMessage = ('message' in geoError && typeof geoError.message === 'string') ? geoError.message : errorMessage;
          }
        } else if (geoError instanceof Error) {
          errorMessage = geoError.message;
        }
        
        setError(errorMessage);
        setLoading(false);
      }
    }
  }, [fetchWeatherData]);

  const setLocation = useCallback((location: string) => {
    fetchWeatherData(location, selectedDate);
  }, [fetchWeatherData, selectedDate]);

  const setSelectedDateCallback = useCallback((date: Date) => {
    setSelectedDate(date);
    fetchWeatherData(currentLocation, date);
  }, [fetchWeatherData, currentLocation]);

  const refetch = useCallback(async () => {
    await fetchWeatherData(currentLocation, selectedDate);
  }, [fetchWeatherData, currentLocation, selectedDate]);

  useEffect(() => {
   
  }, []);

  return { 
    weatherData, 
    airQualityData,
    loading, 
    error, 
    currentLocation,
    selectedDate,
    setLocation,
    setSelectedDate: setSelectedDateCallback,
    getUserLocation,
    refetch
  };
}; 