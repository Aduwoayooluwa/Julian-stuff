import React, { useState } from 'react';
import { getCalendarMonth, getMonthName, type CalendarDay } from '../utils/dateUtils';

interface CalendarProps {
  className?: string;
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ 
  className, 
  selectedDate: propSelectedDate, 
  onDateSelect 
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const selectedDate = propSelectedDate || new Date();
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();
  
  const calendarDays = getCalendarMonth(year, month);
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };
  
  const isToday = (calendarDay: CalendarDay): boolean => {
    return calendarDay.date.toDateString() === today.toDateString();
  };
  
  const isSelected = (calendarDay: CalendarDay): boolean => {
    return selectedDate ? calendarDay.date.toDateString() === selectedDate.toDateString() : false;
  };
  
  const handleDateClick = (calendarDay: CalendarDay) => {
    if (onDateSelect) {
      onDateSelect(calendarDay.date);
    }
    
    if (calendarDay.isPrevMonth) {
      navigateMonth('prev');
    } else if (calendarDay.isNextMonth) {
      navigateMonth('next');
    }
  };
  
  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    if (onDateSelect) {
      onDateSelect(today);
    }
  };
  
  return (
    <div className={`bg-white rounded-2xl p-4 sm:p-6 shadow-sm ${className || ''}`}>
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
          {getMonthName(month)} {year}
        </h3>
        <div className="flex gap-1">
          <button 
            onClick={goToToday}
            className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors mr-1 sm:mr-2"
            title="Go to today"
          >
            Today
          </button>
          <button 
            onClick={() => navigateMonth('prev')}
            className="p-1 rounded hover:bg-gray-100 transition-colors"
            title="Previous month"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={() => navigateMonth('next')}
            className="p-1 rounded hover:bg-gray-100 transition-colors"
            title="Next month"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-1 sm:py-2">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((calendarDay, index) => {
          const isCurrentDay = isToday(calendarDay);
          const isSelectedDay = isSelected(calendarDay);
          
          return (
            <button
              key={index}
              onClick={() => handleDateClick(calendarDay)}
              className={`
                h-7 sm:h-8 flex items-center justify-center text-xs sm:text-sm rounded transition-all duration-200
                hover:bg-gray-100 cursor-pointer relative
                ${!calendarDay.isCurrentMonth ? 'text-gray-400' : 'text-gray-700'}
                ${isCurrentDay ? 'bg-[#da540d] text-white font-medium hover:bg-[#c44a0c]' : ''}
                ${isSelectedDay && !isCurrentDay ? 'bg-blue-100 text-blue-700 font-medium' : ''}
                ${calendarDay.isCurrentMonth ? 'hover:bg-gray-100' : 'hover:bg-gray-50'}
              `}
              title={calendarDay.date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            >
              {calendarDay.day}
              {isCurrentDay && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}; 