import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
);

export const WeatherCardSkeleton: React.FC = () => (
  <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-6 text-white">
    <div className="flex items-center gap-4 mb-4">
      <Skeleton className="w-20 h-20 bg-white/20" />
      <Skeleton className="w-16 h-16 bg-white/20" />
    </div>
    <div className="mb-6">
      <Skeleton className="w-32 h-6 bg-white/20 mb-2" />
      <Skeleton className="w-48 h-4 bg-white/20" />
    </div>
    <div className="flex gap-4">
      <Skeleton className="w-20 h-10 bg-white/20 rounded-full" />
      <Skeleton className="w-24 h-10 bg-white/20 rounded-full" />
    </div>
  </div>
);

export const WeeklyForecastSkeleton: React.FC = () => (
  <div className="bg-white rounded-2xl p-6 shadow-sm">
    <div className="flex justify-between items-center gap-4">
      {Array.from({ length: 7 }).map((_, index) => (
        <div key={index} className="flex flex-col items-center text-center">
          <Skeleton className="w-8 h-4 mb-2" />
          <Skeleton className="w-12 h-12 mb-2" />
          <Skeleton className="w-6 h-5 mb-1" />
          <Skeleton className="w-6 h-4" />
        </div>
      ))}
    </div>
  </div>
);

export const AirQualityIndexSkeleton: React.FC = () => (
  <div className="bg-white rounded-2xl p-6 shadow-sm">
    <div className="flex items-center gap-2 mb-4">
      <Skeleton className="w-5 h-5 rounded-full" />
      <Skeleton className="w-32 h-6" />
    </div>
    <Skeleton className="w-24 h-4 mb-1" />
    <Skeleton className="w-16 h-6 mb-4" />
    <div className="flex gap-1 mb-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className="h-2 flex-1" />
      ))}
    </div>
    <Skeleton className="w-full h-12 rounded-lg" />
  </div>
);

export const SunriseSunsetSkeleton: React.FC = () => (
  <div className="bg-white rounded-2xl p-6 shadow-sm">
    <div className="flex items-center gap-2 mb-4">
      <Skeleton className="w-5 h-5 rounded-full" />
      <Skeleton className="w-32 h-6" />
    </div>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-16 h-4" />
        </div>
        <Skeleton className="w-16 h-6" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-16 h-4" />
        </div>
        <Skeleton className="w-16 h-6" />
      </div>
    </div>
  </div>
);

export const CalendarSkeleton: React.FC = () => (
  <div className="bg-white rounded-2xl p-6 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <Skeleton className="w-32 h-6" />
      <div className="flex gap-1">
        <Skeleton className="w-6 h-6" />
        <Skeleton className="w-6 h-6" />
      </div>
    </div>
    <div className="grid grid-cols-7 gap-1 mb-2">
      {Array.from({ length: 7 }).map((_, index) => (
        <Skeleton key={index} className="w-6 h-6" />
      ))}
    </div>
    <div className="grid grid-cols-7 gap-1">
      {Array.from({ length: 35 }).map((_, index) => (
        <Skeleton key={index} className="w-8 h-8" />
      ))}
    </div>
  </div>
);

export const WeatherPredictionSkeleton: React.FC = () => (
  <div className="bg-white rounded-2xl p-6 shadow-sm">
    <Skeleton className="w-32 h-6 mb-4" />
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="w-8 h-8" />
            <div>
              <Skeleton className="w-16 h-4 mb-1" />
              <Skeleton className="w-20 h-3" />
            </div>
          </div>
          <Skeleton className="w-12 h-6" />
        </div>
      ))}
    </div>
    <Skeleton className="w-full h-12 rounded-lg mt-6" />
  </div>
); 