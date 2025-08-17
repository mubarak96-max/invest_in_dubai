export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

export const formatNumber = (number) => {
  return new Intl.NumberFormat('en-AE').format(number);
};
