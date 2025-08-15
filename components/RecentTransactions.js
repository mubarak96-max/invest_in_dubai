'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, MapPin, Clock, DollarSign, Home, Users } from 'lucide-react';

export default function RecentTransactions() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Sample transaction data
  const transactions = [
    {
      id: 1,
      type: 'Sold',
      property: '2BR Apartment',
      location: 'Downtown Dubai, Burj Vista',
      price: 'AED 2,850,000',
      timeAgo: '2 hours ago',
      buyer: 'International Investor',
      status: 'completed'
    },
    {
      id: 2,
      type: 'Rented',
      property: '1BR Studio',
      location: 'Dubai Marina, Marina Gate',
      price: 'AED 120,000/year',
      timeAgo: '4 hours ago',
      buyer: 'Young Professional',
      status: 'completed'
    },
    {
      id: 3,
      type: 'Sold',
      property: '3BR Townhouse',
      location: 'Dubai Hills Estate, Parkways',
      price: 'AED 3,200,000',
      timeAgo: '6 hours ago',
      buyer: 'Local Family',
      status: 'completed'
    },
    {
      id: 4,
      type: 'Reserved',
      property: '4BR Villa',
      location: 'Palm Jumeirah, Atlantis Residences',
      price: 'AED 8,500,000',
      timeAgo: '8 hours ago',
      buyer: 'HNW Individual',
      status: 'pending'
    },
    {
      id: 5,
      type: 'Sold',
      property: '2BR Apartment',
      location: 'Business Bay, Damac Heights',
      price: 'AED 1,650,000',
      timeAgo: '12 hours ago',
      buyer: 'Investment Group',
      status: 'completed'
    },
    {
      id: 6,
      type: 'Rented',
      property: '3BR Penthouse',
      location: 'DIFC, Index Tower',
      price: 'AED 280,000/year',
      timeAgo: '1 day ago',
      buyer: 'Corporate Executive',
      status: 'completed'
    },
    {
      id: 7,
      type: 'Sold',
      property: '1BR Studio',
      location: 'JVC, Green Diamond',
      price: 'AED 850,000',
      timeAgo: '1 day ago',
      buyer: 'First-time Buyer',
      status: 'completed'
    },
    {
      id: 8,
      type: 'Reserved',
      property: '2BR Apartment',
      location: 'Dubai South, Mag 5 Boulevard',
      price: 'AED 950,000',
      timeAgo: '2 days ago',
      buyer: 'Expat Family',
      status: 'pending'
    }
  ];

  // Handle client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Auto-scroll through transactions (only on client)
  useEffect(() => {
    if (!isClient) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % transactions.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [transactions.length, isClient]);

  const getStatusColor = (type, status) => {
    if (status === 'pending') return 'bg-orange-100 text-orange-800 border-orange-200';
    
    switch (type) {
      case 'Sold':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Rented':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Reserved':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'Sold':
        return <DollarSign className="w-4 h-4" />;
      case 'Rented':
        return <Home className="w-4 h-4" />;
      case 'Reserved':
        return <Clock className="w-4 h-4" />;
      default:
        return <TrendingUp className="w-4 h-4" />;
    }
  };

  if (!isVisible || !isClient) return null;

  const currentTransaction = transactions[currentIndex];

  return (
    <section className="py-6 bg-gradient-to-r from-gray-50 to-blue-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Market Activity</h2>
              <p className="text-sm text-gray-600">Recent property transactions</p>
            </div>
          </div>
          
          {/* Live indicator */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-600">LIVE</span>
          </div>
        </div>

        {/* Transaction Ticker */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-6 items-center">
            
            {/* Current Transaction */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(currentTransaction.type, currentTransaction.status)}`}>
                  {getIcon(currentTransaction.type)}
                  <span>{currentTransaction.type}</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-500 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{currentTransaction.timeAgo}</span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {currentTransaction.property}
                </h3>
                <div className="flex items-center space-x-1 text-gray-600 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{currentTransaction.location}</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">
                  {currentTransaction.price}
                </p>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>Buyer: {currentTransaction.buyer}</span>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {transactions.filter(t => t.type === 'Sold' && t.status === 'completed').length}
                </div>
                <div className="text-sm text-gray-600">Properties Sold Today</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {transactions.filter(t => t.type === 'Rented' && t.status === 'completed').length}
                </div>
                <div className="text-sm text-gray-600">Properties Rented Today</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {transactions.filter(t => t.status === 'pending').length}
                </div>
                <div className="text-sm text-gray-600">Under Negotiation</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {Math.round(transactions.length / 2 * 24)}
                </div>
                <div className="text-sm text-gray-600">Inquiries Today</div>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex space-x-1">
              {transactions.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    isClient && index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-gray-600 text-sm"
            >
              Hide
            </button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-4 text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 text-sm">
            View All Recent Transactions
          </button>
        </div>
      </div>
    </section>
  );
}
