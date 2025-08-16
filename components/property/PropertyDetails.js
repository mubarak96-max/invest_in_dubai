'use client';

export default function PropertyDetails({ property }) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Details & Amenities</h2>

      {/* Highlights */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Highlights</h3>
        <div className="flex flex-wrap gap-2">
          {property.features?.map((feat, idx) => (
            <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm border border-gray-200">
              {feat}
            </span>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Amenities</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {property.amenities?.map((amen, idx) => (
            <div key={idx} className="text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
              {amen}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
