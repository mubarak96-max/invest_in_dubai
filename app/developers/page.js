import { developers } from '@/lib/propertyData';
import DeveloperCard from '@/components/developer/DeveloperCard';

export default function DevelopersPage() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-left mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
            Meet Dubai's Top Real Estate Developers
          </h1>
          <p className="mt-3 max-w-2xl text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl">
            Discover the visionaries shaping Dubai's iconic skyline. We partner with the most reputable developers to bring you exclusive access to the city's finest properties.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {developers.map(dev => (
            <DeveloperCard key={dev.id} developer={dev} />
          ))}
        </div>
      </div>
    </div>
  );
}
