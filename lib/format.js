export const formatPrice = (price) => {
  if (price == null || isNaN(price)) {
    return 'AED 0';
  }
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

export const formatNumber = (number) => {
  if (number == null || isNaN(number)) {
    return '0';
  }
  return new Intl.NumberFormat('en-AE').format(number);
};
