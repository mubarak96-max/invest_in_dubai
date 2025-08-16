import { Building, Calendar, Award } from 'lucide-react';

export default function DeveloperInfo({ developer }) {
  if (!developer || !developer.name) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">About the Developer</h2>
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="flex-shrink-0">
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                <Building className="w-12 h-12 text-blue-600" />
            </div>
        </div>
        <div className="flex-grow">
            <h3 className="text-xl font-bold text-gray-800">{developer.name}</h3>
            <p className="text-gray-600 mt-2">A leading developer known for quality and innovation in the real estate sector. With a portfolio of landmark projects, {developer.name} is committed to creating vibrant communities and exceptional living experiences.</p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {developer.established && (
                    <div className="flex items-center">
                        <Calendar className="w-5 h-5 text-gray-500 mr-2" />
                        <div>
                            <p className="text-sm text-gray-500">Established</p>
                            <p className="font-semibold text-gray-700">{developer.established}</p>
                        </div>
                    </div>
                )}
                {developer.projects && (
                    <div className="flex items-center">
                        <Award className="w-5 h-5 text-gray-500 mr-2" />
                        <div>
                            <p className="text-sm text-gray-500">Projects Delivered</p>
                            <p className="font-semibold text-gray-700">{developer.projects}+</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
