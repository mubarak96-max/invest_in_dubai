import PropertyCard from './PropertyCard';

export default function PropertyList({ properties }) {
  if (!properties || properties.length === 0) {
    return <p className="text-center text-gray-500">No properties found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
