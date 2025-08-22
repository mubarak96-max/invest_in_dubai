import { Building, Award, Users, TrendingUp } from 'lucide-react';

export default function ProjectOverview({ project }) {
  const { description, developer, features } = project;

  // Helper function to get bedroom range from floor plans
  const getBedroomRange = () => {
    if (project.floorPlans && project.floorPlans.length > 0) {
      const bedrooms = project.floorPlans.map(plan => plan.bedrooms).filter(Boolean);
      if (bedrooms.length > 0) {
        const min = Math.min(...bedrooms);
        const max = Math.max(...bedrooms);
        return min === max ? `${min} Bedroom` : `${min}-${max} Bedrooms`;
      }
    }

    // Fallback to beds field if it exists and is a string
    if (project.beds && typeof project.beds === 'string') {
      const bedroomArray = project.beds.split(',').map(b => b.trim());
      return `From ${bedroomArray[0]} to ${bedroomArray[bedroomArray.length - 1]} beds`;
    }

    return 'Various Configurations';
  };

  const projectHighlights = [
    {
      icon: Building,
      label: 'Developer',
      value: developer?.name || 'Developer'
    },
    {
      icon: Award,
      label: 'Status',
      value: project.projectStatus || 'In Progress'
    },
    {
      icon: Users,
      label: 'Property Types',
      value: project.propertyTypes && project.propertyTypes.length > 0
        ? project.propertyTypes.join(', ')
        : 'Residential'
    },
    {
      icon: TrendingUp,
      label: 'Bedrooms',
      value: getBedroomRange()
    },
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
      {description && (
        <div className="mt-6 prose max-w-none text-gray-600">
          <p>{description}</p>
        </div>
      )}
      {features && features.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Key Features</h3>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-gray-600">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center">
                <Award className="w-4 h-4 mr-2 text-green-500" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
