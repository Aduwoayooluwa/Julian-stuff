export interface CalendarDay {
  day: number;
  isCurrentMonth: boolean;
  isPrevMonth: boolean;
  isNextMonth: boolean;
  date: Date;
}

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatShortDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

export const formatTime = (time: string): string => {
  if (!time || time === 'No sunrise' || time === 'No sunset') {
    return 'N/A';
  }
  
  try {
    if (time.includes('AM') || time.includes('PM')) {
      return time;
    }
    
    const [hours, minutes] = time.split(':');
    const hour24 = parseInt(hours, 10);
    const minute = parseInt(minutes, 10);
    
    if (isNaN(hour24) || isNaN(minute)) {
      return time;
    }
    
    const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
    const ampm = hour24 >= 12 ? 'PM' : 'AM';
    const minuteStr = minute.toString().padStart(2, '0');
    
    return `${hour12}:${minuteStr} ${ampm}`;
  } catch {
    return time || 'N/A';
  }
};

export const getDayName = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
};

export const getCalendarMonth = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  
  const prevMonth = new Date(year, month - 1, 0);
  const daysInPrevMonth = prevMonth.getDate();
  
  const days = [];
  
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    days.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
      isPrevMonth: true,
      isNextMonth: false,
      date: new Date(year, month - 1, daysInPrevMonth - i)
    });
  }
  
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      isCurrentMonth: true,
      isPrevMonth: false,
      isNextMonth: false,
      date: new Date(year, month, i)
    });
  }
  
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      day: i,
      isCurrentMonth: false,
      isPrevMonth: false,
      isNextMonth: true,
      date: new Date(year, month + 1, i)
    });
  }
  
  return days;
};

export const getMonthName = (month: number): string => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[month];
}; 