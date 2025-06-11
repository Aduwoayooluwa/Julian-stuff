import React from 'react';
import { SearchBar } from './SearchBar';

interface HeaderProps {
  userName?: string;
  currentDay?: string;
  currentDate?: string;
  location?: string;
  onLocationSelect: (location: string) => void;
  onCurrentLocation: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userName = "Ayooluwa Aduwo",
  currentDay = "Friday",
  currentDate = "June 10",      
  location = "Nigeria",
  onLocationSelect,
  onCurrentLocation
}) => {
  return (
    <header className="mb-6 sm:mb-8">
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#da540d] rounded-xl flex items-center justify-center text-white font-bold text-lg sm:text-xl">
            M
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-200 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 sm:w-6 sm:h-6 bg-[#da540d] rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="text-base sm:text-lg font-semibold text-gray-900">
                Hello, <span className="hidden sm:inline">{userName}</span><span className="sm:hidden">User</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:gap-6 lg:gap-8">
          <SearchBar 
            onLocationSelect={onLocationSelect}
            onCurrentLocation={onCurrentLocation}
          />
          
          <div className="flex items-center justify-between sm:justify-end sm:gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="text-xs sm:text-sm text-gray-600 truncate max-w-[100px] sm:max-w-none">{location}</span>
            </div>
            
            <div className="text-right">
              <div className="text-base sm:text-lg font-semibold text-gray-900">{currentDay}</div>
              <div className="text-xs sm:text-sm text-gray-600">{currentDate}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}; 