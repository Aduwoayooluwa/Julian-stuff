import axios from 'axios';
import { API_BASE_URL } from '../config/axios.config';
import { WEATHER_API_KEY } from '../config/key';
import type { WeatherData, WeatherWithAirQuality } from '../types/weather';

const weatherApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

const isHistoricalDate = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  return date < today;
};

const isFutureDate = (date: Date): boolean => {
  const today = new Date();
  const maxForecastDate = new Date(today);
  maxForecastDate.setDate(today.getDate() + 14);
  
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  maxForecastDate.setHours(0, 0, 0, 0);
  
  return date > today && date <= maxForecastDate;
};

const formatDateForAPI = (date: Date): string => {
  return date.toISOString().split('T')[0]; 
};

export const weatherService = {
  getCurrentWeather: async (location: string): Promise<WeatherData> => {
    const response = await weatherApi.get('/current.json', {
      params: {
        key: WEATHER_API_KEY,
        q: location,
        aqi: 'no'
      }
    });
    return response.data;
  },

  getForecast: async (location: string, days: number = 7): Promise<WeatherData> => {
    const response = await weatherApi.get('/forecast.json', {
      params: {
        key: WEATHER_API_KEY,
        q: location,
        days,
        aqi: 'yes',
        alerts: 'no'
      }
    });
    return response.data;
  },

  getHistoricalWeather: async (location: string, date: Date): Promise<WeatherData> => {
    const response = await weatherApi.get('/history.json', {
      params: {
        key: WEATHER_API_KEY,
        q: location,
        dt: formatDateForAPI(date)
      }
    });
    return response.data;
  },

  getWeatherForDate: async (location: string, date: Date): Promise<WeatherData> => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    
    if (date.getTime() === today.getTime()) {

      return await weatherService.getForecast(location, 7);
    } else if (isHistoricalDate(date)) {
  
      return await weatherService.getHistoricalWeather(location, date);
    } else if (isFutureDate(date)) {
    
      const forecastData = await weatherService.getForecast(location, 14);

      const targetDateStr = formatDateForAPI(date);
      const filteredForecast = {
        ...forecastData,
        forecast: {
          ...forecastData.forecast,
          forecastday: forecastData.forecast.forecastday.filter(
            day => day.date === targetDateStr
          )
        }
      };
      
      return filteredForecast;
    } else {
      throw new Error('Date is too far in the future. Weather data is only available up to 14 days ahead.');
    }
  },

  getWeatherWithAirQuality: async (location: string): Promise<WeatherWithAirQuality> => {
    const response = await weatherApi.get('/current.json', {
      params: {
        key: WEATHER_API_KEY,
        q: location,
        aqi: 'yes'
      }
    });
    return response.data;
  },

  searchLocations: async (query: string) => {
    const response = await weatherApi.get('/search.json', {
      params: {
        key: WEATHER_API_KEY,
        q: query
      }
    });
    return response.data;
  }
}; 