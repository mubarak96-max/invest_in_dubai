'use client';

import Link from 'next/link';
import { Bed, Bath, Square, MapPin } from 'lucide-react';

export default function SimilarProperties({ currentProperty }) {
  // Dummy similar properties; in real case filter by community/type/price range
  const similar = [1, 2, 3, 4].map((i) => ({
    id: String(i),
    title: `Similar Property ${i} in ${currentProperty.location.community}`,
    image: 'https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?w=800',
    price: Math.max(500000, Math.round(currentProperty.price * (0.9 + i * 0.03))),
    beds: currentProperty.bedrooms,
    baths: currentProperty.bathrooms,
    sqft: currentProperty.area + i * 50,
    address: `${currentProperty.location.community}, ${currentProperty.location.city}`,
  }));

  const formatAED = (n) => new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED', maximumFractionDigits: 0 }).format(n);

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Similar Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {similar.map((p) => (
          <div key={p.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="h-40 overflow-hidden">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <div className="text-blue-600 font-bold text-xl mb-1">{formatAED(p.price)}</div>
              <div className="flex items-start text-sm text-gray-700 mb-2">
                <MapPin className="w-4 h-4 mr-1 mt-0.5" />
                <span>{p.address}</span>
              </div>
              <div className="flex items-center space-x-4 text-gray-600 mb-4">
                <div className="flex items-center"><Bed className="w-4 h-4 mr-1" />{p.beds}</div>
                <div className="flex items-center"><Bath className="w-4 h-4 mr-1" />{p.baths}</div>
                <div className="flex items-center"><Square className="w-4 h-4 mr-1" />{p.sqft ? p.sqft.toLocaleString() : '0'} sqft</div>
              </div>
              <Link href={`/property/${p.id}`} className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
