import { Building, Award, Users, TrendingUp } from 'lucide-react';

export default function ProjectOverview({ project }) {
  const { description, developer, features } = project;

  const projectHighlights = [
    { icon: Building, label: 'Developer', value: developer.name },
    { icon: Award, label: 'Status', value: project.projectStatus || 'In Progress' },
    { icon: Users, label: 'Property Types', value: project.propertyTypes.join(', ') },
    { icon: TrendingUp, label: 'Bedrooms', value: `From ${project.beds.split(',')[0]} to ${project.beds.split(',').pop().trim()} beds` },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-900">Project Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 text-center">
        {projectHighlights.map((item, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <item.icon className="w-8 h-8 mx-auto text-blue-600 mb-2" />
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="font-semibold text-gray-800">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 prose max-w-none text-gray-600">
        <p>{description}</p>
      </div>
      {features && features.length > 0 && (
        <div className="mt-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Key Features</h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-gray-600">
                {features.map((feature, i) => <li key={i} className="flex items-center"><Award className="w-4 h-4 mr-2 text-green-500"/>{feature}</li>)}
            </ul>
        </div>
      )}
    </div>
  );
}
