import { getProjects } from "@/app/actions/projects";
import Image from "next/image";
import { ReactElement } from "react";
import { Link } from "@/i18n/routing";

const Projects = async (): Promise<ReactElement> => {
  const response = await getProjects();

  if (response.status === "error") {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Failed to load projects</p>
      </div>
    );
  }

  const projects = response.data;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {projects.map((project, i) => {
          if (i === 0) {
            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="sm:col-span-2 bg-cover bg-center max-md:h-80 rounded-lg flex justify-end flex-col px-7 py-6 relative overflow-hidden hover:opacity-90 transition-opacity"
              >
                {project.imageUrl && (
                  <div className="absolute top-0 left-0 w-full h-full z-0">
                    <Image
                      fill
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full rounded-lg object-cover"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-black/30"></div>
                  </div>
                )}
                <h6 className="font-medium text-xl leading-8 mb-4 z-10 text-white">
                  {project.title}
                </h6>
                <p className="text-base font-normal z-10 text-white/70">
                  {project.description.length > 100 
                    ? `${project.description.substring(0, 100)}...` 
                    : project.description}
                </p>
              </Link>
            );
          }
          return (
            <Link 
              key={project.slug} 
              href={`/projects/${project.slug}`}
              className="block hover:opacity-90 transition-opacity"
            >
              {project.imageUrl && (
                <Image
                  width={300}
                  height={300}
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full rounded-lg object-cover"
                />
              )}
            </Link>
          );
        })}
        <div
          className="sm:col-span-2 bg-cover bg-center max-md:h-80 rounded-lg flex justify-end flex-col px-7 py-6"
          style={{
            backgroundImage:
              "url(https://pagedone.io/asset/uploads/1707712993.png",
          }}
        >
          <h6 className="font-medium text-xl leading-8 text-white mb-4">
            Architecture Designer
          </h6>
          <p className="text-base font-normal text-white/70">
            where knowledge meets innovation, and success is sculpted through a
            blend of skill and vision.
          </p>
        </div>
        <div className="block">
          <img
            src="https://pagedone.io/asset/uploads/1707713007.png"
            alt="Building structure image"
            className="w-full rounded-lg object-cover"
          />
        </div>
        <div className="block">
          <img
            src="https://pagedone.io/asset/uploads/1707713018.png"
            alt="Building structure image"
            className="w-full rounded-lg object-cover"
          />
        </div>
        <div className="block">
          <img
            src="https://pagedone.io/asset/uploads/1707713032.png"
            alt="Building structure image"
            className="w-full rounded-lg object-cover"
          />
        </div>
        <div
          className=" bg-cover rounded-lg max-sm:h-80 flex justify-start flex-col px-7 py-6"
          style={{
            backgroundImage:
              "url(https://pagedone.io/asset/uploads/1707713043.png)",
          }}
        >
          <h6 className="font-medium text-xl leading-8 text-white mb-4">
            Interior Designer
          </h6>
          <p className="text-base font-normal text-white/70">
            Crafting exceptional interiors, where aesthetics meet functionality
            for spaces that inspire and elevate.
          </p>
        </div>
        <div className="block">
          <img
            src="	https://pagedone.io/asset/uploads/1707713055.png"
            alt="Building structure image"
            className="w-full rounded-lg object-cover"
          />
        </div>
        <div
          className=" bg-cover rounded-lg max-sm:h-80 flex justify-end flex-col px-7 py-6"
          style={{
            backgroundImage:
              "url(https://pagedone.io/asset/uploads/1707713066.png)",
          }}
        >
          <h6 className="font-medium text-xl leading-8 text-white mb-4">
            Business Building
          </h6>
          <p className="text-base font-normal text-white/70">
            Architecting business success through innovation, resilience, and
            strategic leadership.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Projects;



/**
 * 
 

import { ReactElement } from "react";
import { getProjects } from "@/app/actions/projects";
import Image from "next/image";
import Link from "next/link";

const Projects = async (): Promise<ReactElement> => {
  const response = await getProjects();
  
  if (response.status === "error") {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Failed to load projects</p>
      </div>
    );
  }

  const projects = response.data;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {projects.map((project) => (
          <div
            key={project.slug}
            className={`bg-cover bg-center rounded-lg flex justify-end flex-col px-7 py-6 min-h-[320px] relative group
              ${project.featured ? 'sm:col-span-2' : ''}`}
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7)), url(${project.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <Link href={`/projects/${project.slug}`} className="absolute inset-0">
              <span className="sr-only">View {project.title}</span>
            </Link>
            
            <div className="relative z-10">
              <h6 className="font-medium text-xl leading-8 text-white mb-4">
                {project.title}
              </h6>
              <p className="text-base font-normal text-white/70">
                {project.description.length > 100 
                  ? `${project.description.substring(0, 100)}...` 
                  : project.description}
              </p>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-black/30 rounded-full text-xs text-white/90"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2 py-1 bg-black/30 rounded-full text-xs text-white/90">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;


 */
