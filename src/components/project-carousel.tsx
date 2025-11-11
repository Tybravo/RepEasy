import ProjectCard from "./project-card"


interface Project {
  id: number
  name: string,
  icon:string,
twitterUsername:string,
 banner: string | null,
}

interface ProjectCarouselProps {
  projects: Project[]
  onProjectClick?: (project: Project) => void
}


export default function ProjectCarousel({ projects, onProjectClick }: ProjectCarouselProps) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4 lg:gap-4">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          name={project.name}
          icon={project.icon}
          banner={project.banner}
          twitterUsername={project.twitterUsername}
          onClick={() => onProjectClick?.(project)}
        />
      ))}
    </div>
  )
}
