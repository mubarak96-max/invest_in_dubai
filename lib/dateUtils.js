// Simple date formatting utilities
export function formatDate(date, format = 'MMM d, yyyy') {
  const d = new Date(date);
  
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  const monthsLong = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const day = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();
  
  switch (format) {
    case 'MMM d, yyyy':
      return `${months[month]} ${day}, ${year}`;
    case 'MMMM d, yyyy':
      return `${monthsLong[month]} ${day}, ${year}`;
    case 'yyyy-MM-dd':
      return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    default:
      return `${months[month]} ${day}, ${year}`;
  }
}

export const format = formatDate;
