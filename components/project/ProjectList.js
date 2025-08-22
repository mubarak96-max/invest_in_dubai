import ProjectCard from './ProjectCard';

export default function ProjectList({ projects, viewMode = 'grid' }) {
  if (!projects || projects.length === 0) {
    return <p className="text-center text-gray-500 mt-12">No projects found matching your criteria.</p>;
  }

  return (
    <div className={
      viewMode === 'grid'
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
        : 'space-y-6'
    }>
      {projects.map(project => (
        <ProjectCard
          key={project.id || project._id}
          project={project}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
}
