// lib/propertyData.js

// Centralized source for featured properties to be used in carousels, lists, etc.
export const featuredProperties = [
  {
    id: '1',
    title: '2BR Apartment in Downtown Dubai',
    slug: '2br-apartment-downtown-dubai-burj-vista',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    address: 'Downtown Dubai, Burj Vista Tower',
    price: 2850000,
    priceDisplay: 'AED 2,850,000',
    beds: 2,
    baths: 3,
    sqft: 1450,
    category: 'buy',
    handover: null,
    type: 'Apartment'
  },
  {
    id: '2',
    title: '1BR Studio in Dubai Marina',
    slug: '1br-studio-dubai-marina-gate',
    image: 'https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?w=800',
    address: 'Dubai Marina, Marina Gate',
    price: 120000,
    priceDisplay: 'AED 120,000/year',
    beds: 1,
    baths: 2,
    sqft: 980,
    category: 'rent',
    handover: null,
    type: 'Studio'
  },
  {
    id: '3',
    title: 'Volta by DAMAC',
    slug: 'volta-by-damac-business-bay',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
    address: 'Business Bay, Dubai',
    price: 1670000,
    priceDisplay: 'Starting AED 1.67M',
    beds: '1, 2, 3, 4',
    baths: null,
    sqft: null,
    category: 'off-plan',
    handover: '2028',
    type: 'Apartment',
    developer: 'DAMAC Properties',
    projectStatus: 'Launched',
    propertyTypes: ['Apartment'],
    paymentPlan: [
      { milestone: 'Down Payment', percentage: 20 },
      { milestone: 'During Construction', percentage: 60 },
      { milestone: 'On Handover', percentage: 20 },
    ],
    floorPlans: [
      { type: '1 Bedroom', size: '750 sqft', image: 'https://via.placeholder.com/800x600.png?text=1-Bed+Floor+Plan' },
      { type: '2 Bedroom', size: '1100 sqft', image: 'https://via.placeholder.com/800x600.png?text=2-Bed+Floor+Plan' },
    ],
    usp: [
        {
          title: 'Iconic Design & Location',
          description: 'A striking architectural masterpiece located centrally on Sheikh Zayed Road.',
          image: 'https://images.unsplash.com/photo-1599911949024-15f70a583338?w=800'
        },
        {
          title: 'Fitness-Focused Living',
          description: 'Dedicated amenities for a healthy lifestyle, including climbing walls and boxing rings.',
          image: 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?w=800'
        },
        {
          title: 'Luxurious Sky Collection',
          description: 'Exclusive sky villas and apartments offering unparalleled luxury and views.',
          image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800'
        }
      ]
  },
  {
    id: '4',
    title: '4BR Villa in Palm Jumeirah',
    slug: '4br-villa-palm-jumeirah-atlantis',
    image: 'https://images.unsplash.com/photo-1505692794403-34d4982f88aa?w=800',
    address: 'Palm Jumeirah, Atlantis Residences',
    price: 8500000,
    priceDisplay: 'AED 8,500,000',
    beds: 4,
    baths: 5,
    sqft: 3200,
    category: 'buy',
    handover: null,
    type: 'Villa'
  },
  {
    id: '7',
    title: 'Nad Al Sheba Gardens',
    slug: 'nad-al-sheba-gardens-by-meraas',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    address: 'Nad Al Sheba, Dubai',
    price: 5100000,
    priceDisplay: 'Starting AED 5.1M',
    beds: '3, 4, 5',
    baths: null,
    sqft: null,
    category: 'off-plan',
    handover: '2027',
    type: 'Villa',
    developer: 'Meraas',
    projectStatus: 'New Phase',
    propertyTypes: ['Townhouse', 'Villa'],
    paymentPlan: [
      { milestone: 'Down Payment', percentage: 25 },
      { milestone: 'During Construction', percentage: 50 },
      { milestone: 'On Handover', percentage: 25 },
    ],
    floorPlans: [
      { type: '3 Bedroom Townhouse', size: '2200 sqft', image: 'https://via.placeholder.com/800x600.png?text=3-Bed+Townhouse' },
      { type: '4 Bedroom Villa', size: '3500 sqft', image: 'https://via.placeholder.com/800x600.png?text=4-Bed+Villa' },
    ]
  },
  {
    id: '5',
    title: '2BR Townhouse in Dubai Hills',
    slug: '2br-townhouse-dubai-hills-parkways',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    address: 'Dubai Hills Estate, Parkways',
    price: 85000,
    priceDisplay: 'AED 85,000/year',
    beds: 2,
    baths: 2,
    sqft: 1200,
    category: 'rent',
    handover: null,
    type: 'Townhouse'
  },
  {
    id: '6',
    title: 'The S Tower by Sobha',
    slug: 'the-s-tower-by-sobha-al-sufouh',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    address: 'Al Sufouh, Dubai',
    price: 23000000,
    priceDisplay: 'Starting AED 23M',
    beds: '4, 5, 6',
    baths: null,
    sqft: null,
    category: 'off-plan',
    handover: '2027',
    type: 'Apartment',
    developer: 'Sobha Realty',
    projectStatus: null,
    propertyTypes: ['Apartment', 'Penthouse'],
    paymentPlan: [
      { milestone: 'Booking', percentage: 10 },
      { milestone: '1st Installment', percentage: 10 },
      { milestone: '2nd Installment', percentage: 10 },
      { milestone: 'On Completion', percentage: 70 },
    ],
    floorPlans: [
      { type: '4 Bedroom Apartment', size: '4500 sqft', image: 'https://via.placeholder.com/800x600.png?text=4-Bed+Apartment' },
      { type: '5 Bedroom Penthouse', size: '7000 sqft', image: 'https://via.placeholder.com/800x600.png?text=5-Bed+Penthouse' },
    ]
  }
];

// Function to get detailed data for a single property by ID
export const getPropertyData = (id) => {
  const property = featuredProperties.find(p => p.id === id);

  if (property) {
    // Normalize developer data
    const developerInfo = typeof property.developer === 'string' 
      ? { name: property.developer, established: null, projects: null } 
      : property.developer;

    // Enhance the base featured property data with more details
    return {
      ...property,
      developer: developerInfo,
      priceType: property.category === 'rent' ? 'rent' : 'sale',
      status: 'available',
      bedrooms: property.beds,
      bathrooms: property.baths,
      area: property.sqft,
      location: {
        building: property.address.split(', ')[1] || 'Premium Building',
        community: property.address.split(', ')[0] || 'Dubai',
        city: 'Dubai',
        coordinates: { lat: 25.2048, lng: 55.2708 }
      },
      images: property.images || [
        property.image,
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
      ],
      description: property.description || `Modern ${property.type.toLowerCase()} with premium finishes and stunning views. Located in the heart of ${property.address.split(', ')[0]}, this property offers exceptional value for both investment and end-use.`,
      amenities: property.amenities || ['Swimming Pool', 'Gym', 'Security 24/7', 'Covered Parking', 'Children Play Area', 'BBQ Area', 'Concierge', 'Spa'],
      features: property.features || ['High Floor', 'Balcony', 'Built-in Wardrobes', 'Central AC', 'Premium Finishes', 'City Views'],
      nearbyPlaces: property.nearbyPlaces || [
        { name: 'Metro Station', distance: '5 min walk', type: 'transport' },
        { name: 'Shopping Mall', distance: '8 min walk', type: 'shopping' },
        { name: 'International School', distance: '10 min drive', type: 'education' },
        { name: 'Hospital', distance: '12 min drive', type: 'health' }
      ],
      usp: property.usp || [],
      financials: property.financials || {
        serviceCharge: 22,
        annualROI: 7.5,
        rentalYield: 7.1,
        appreciation: 8.0
      },
      agent: property.agent || {
        name: 'John Doe',
        title: 'Senior Consultant',
        phone: '+971 50 987 6543',
        email: 'john.doe@provident.ae',
        image: 'https://images.unsplash.com/photo-1557862921-37829c790f19?w=200',
        rating: 4.9,
        deals: 210
      },
      reraPermit: property.reraPermit || `RERA-${10000 + (Number(id) % 90000)}`,
      completionDate: property.completionDate || '2020',
      listingDate: property.listingDate || '2025-01-20'
    };
  }

  // Fallback for any ID not in the featured list
  const num = Number(id) || 0;
  const communityOptions = ['JVC', 'Dubai Silicon Oasis', 'Al Furjan', 'Sports City', 'Arjan'];
  const buildingOptions = ['Oasis Tower', 'Axis Residence', 'Starz by Danube', 'Elite Sports Residence', 'Vincitore Palacio'];
  const idx = Math.abs(num) % communityOptions.length;

  return {
    id: String(id),
    title: `${1 + (num % 3)}BR Townhouse in ${communityOptions[idx]}`,
    slug: `townhouse-${id}-${communityOptions[idx].toLowerCase().replace(/\s+/g, '-')}`,
    price: 950000 + (num % 5) * 150000,
    priceDisplay: `AED ${(950000 + (num % 5) * 150000).toLocaleString()}`,
    priceType: 'sale',
    status: 'available',
    type: 'Townhouse',
    beds: `${1 + (num % 3)}`,
    baths: 2 + (num % 2),
    sqft: 900 + (num % 8) * 50,
    category: 'buy',
    address: `${buildingOptions[idx]}, ${communityOptions[idx]}, Dubai`,
    location: {
      building: buildingOptions[idx],
      community: communityOptions[idx],
      city: 'Dubai',
      coordinates: { lat: 25.11, lng: 55.23 }
    },
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1605276374104-5de67d18394b?w=800'
    ],
    description: 'A beautiful and spacious home perfect for families, located in a quiet and friendly neighborhood with excellent facilities.',
    amenities: ['Shared Pool', 'Park', 'Community Center', '24/7 Security'],
    features: ['Private Garden', 'Maid\'s Room', 'Modern Kitchen'],
    nearbyPlaces: [
      { name: 'Supermarket', distance: '3 min drive', type: 'shopping' },
      { name: 'Community Park', distance: '5 min walk', type: 'recreation' }
    ],
    financials: { serviceCharge: 15, annualROI: 6.5, rentalYield: 6.0, appreciation: 5.5 },
    agent: { name: 'Jane Smith', title: 'Community Specialist', phone: '+971 55 111 2222', email: 'jane.smith@provident.ae', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200', rating: 4.7, deals: 85 },
    developer: { name: 'Nakheel', established: 2000, projects: 60 },
    reraPermit: `RERA-${20000 + (num % 70000)}`,
    completionDate: '2018',
    listingDate: '2025-02-10',
    // Additions for consistency
    projectStatus: 'Ready',
    handover: 'Ready',
    propertyTypes: ['Townhouse', 'Villa'],
    paymentPlan: [],
    floorPlans: []
  };
};
