import { Plus } from "lucide-react";
import Link from "next/link";
import { ReactElement } from "react";
import { getProjects } from "@/app/actions/projects";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import ProjectActions from "@/components/projects/ProjectActions";

const ProjectsPage = async (): Promise<ReactElement> => {
  const projectsData = await getProjects();

  if (projectsData.status === "error") {
    return (
      <div className="p-6 text-center">
        <div className="text-red-600 mb-2">Failed to load projects</div>
        <div className="text-gray-600">{projectsData.message}</div>
      </div>
    );
  }
  const projects = projectsData.data ?? [];

  if (projects.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Projects</h1>
          <Link href="/admin/dashboard/projects/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-600">No projects found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Projects ({projects.length})</h1>
        <Link href="/admin/dashboard/projects/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            <span className="hidden md:block pointer-events-none">
              Add Project
            </span>
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-4 text-left">Image</th>
                <th className="px-6 py-4 text-left">Title</th>
                <th className="px-6 py-4 text-left">Technologies</th>
                <th className="px-6 py-4 text-left">Featured</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Display Order</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    {project.imageUrl ? (
                      <div className="relative w-16 h-16">
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No image</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium">{project.title}</div>
                    <div className="text-sm text-gray-500">{project.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech: string) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs bg-gray-100 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-gray-100 rounded">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        project.featured
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {project.featured ? "Featured" : "Standard"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded`}>
                      {new Date(project.startDate).getFullYear()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs rounded bg-gray-100">
                      {project.order || "Not set"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <ProjectActions project={project} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
