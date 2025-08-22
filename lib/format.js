export const formatPrice = (price) => {
  if (price == null || isNaN(price)) {
    return 'Contact for Price';
  }

  const numPrice = Number(price);

  // Format large numbers in a user-friendly way
  if (numPrice >= 1000000) {
    const millions = numPrice / 1000000;
    return `AED ${millions.toFixed(millions % 1 === 0 ? 0 : 1)}M`;
  } else if (numPrice >= 1000) {
    const thousands = numPrice / 1000;
    return `AED ${thousands.toFixed(thousands % 1 === 0 ? 0 : 0)}K`;
  } else {
    return `AED ${numPrice.toLocaleString('en-AE')}`;
  }
};

export const formatNumber = (number) => {
  if (number == null || isNaN(number)) {
    return '0';
  }
  return new Intl.NumberFormat('en-AE').format(number);
};

// Format price with full amount (for detailed views)
export const formatPriceFull = (price) => {
  if (price == null || isNaN(price)) {
    return 'Contact for Price';
  }

  const numPrice = Number(price);
  return `AED ${numPrice.toLocaleString('en-AE')}`;
};

// Format price for property cards (compact)
export const formatPriceCompact = (price) => {
  if (price == null || isNaN(price)) {
    return 'Contact for Price';
  }

  const numPrice = Number(price);

  if (numPrice >= 1000000) {
    const millions = numPrice / 1000000;
    return `${millions.toFixed(millions % 1 === 0 ? 0 : 1)}M`;
  } else if (numPrice >= 1000) {
    const thousands = numPrice / 1000;
    return `${thousands.toFixed(thousands % 1 === 0 ? 0 : 0)}K`;
  } else {
    return numPrice.toLocaleString('en-AE');
  }
};
