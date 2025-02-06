import { ProjectResponse } from "@portfolio-v3/shared";
import { ArrowLeft, Github, Globe } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import Title from "@/components/ui/Title";
import TitleAccent from "@/components/ui/TitleAccent";
import { Link } from "@/i18n/routing";

type ProjectDetailProps = {
  project: ProjectResponse;
};

const ProjectDetail = ({ project }: ProjectDetailProps) => {
  const t = useTranslations("projects");

  return (
    <main className="flex flex-col items-center">
      {/* Back Navigation */}
      <div className="w-full bg-neutral-100 dark:bg-neutral-900">
        <div className="container px-6 py-4 lg:py-6">
          <Button variant="ghost" asChild className="group -ml-2">
            <Link href="/projects" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              {t("backToProjects")}
            </Link>
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="w-full bg-neutral-100 dark:bg-neutral-900">
        <div className="container px-6 py-12 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20">
            {/* Left: Project Image */}
            <div className="relative order-2 lg:order-1 mt-8 lg:mt-0">
              <div
                className="
                  relative aspect-[4/3] w-full 
                  rounded-lg overflow-hidden
                  border border-neutral-200 dark:border-neutral-800
                  shadow-lg
                "
              >
                {project.imageUrl && (
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                  />
                )}
              </div>
              {/* Project Links */}
              <div
                className="
                  absolute -bottom-6 right-0 flex gap-3
                  w-full lg:w-auto justify-end
                  px-2 lg:px-0
                "
              >
                {project.githubUrl && (
                  <Button variant="fancy" size="sm" asChild>
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whitespace-nowrap"
                    >
                      <Github className="h-4 w-4" />
                      <span className="hidden sm:inline ml-2">
                        {t("viewSource")}
                      </span>
                    </Link>
                  </Button>
                )}
                {project.liveUrl && (
                  <Button variant="fancy" size="sm" asChild>
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whitespace-nowrap"
                    >
                      <Globe className="h-4 w-4" />
                      <span className="hidden sm:inline ml-2">
                        {t("visitSite")}
                      </span>
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            {/* Right: Project Info */}
            <div className="flex flex-col justify-center order-1 lg:order-2 lg:pl-12">
              {/* Year & Title */}
              <div className="space-y-6 lg:space-y-8 mb-8 lg:mb-12">
                <div className="inline-flex items-center gap-2">
                  <span
                    className="
                      text-base lg:text-lg font-medium tracking-wider
                      px-3 py-1 rounded-full
                      bg-neutral-200 dark:bg-neutral-800
                      text-neutral-600 dark:text-neutral-300
                    "
                  >
                    {new Date(project.startDate).getFullYear()}
                  </span>
                </div>
                <Title className="text-3xl lg:text-4xl">
                  {project.title
                    .split(" ")
                    .map((word, i, arr) =>
                      i === arr.length - 1 ? (
                        <TitleAccent key={i}>{word}</TitleAccent>
                      ) : (
                        <span key={i}>{word} </span>
                      ),
                    )}
                </Title>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 -ml-1">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="
                      px-3 py-1 text-sm
                      text-neutral-500 dark:text-neutral-400
                      border border-neutral-200 dark:border-neutral-700
                      rounded-full
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      {project.content && (
        <div className="w-full border-t border-neutral-200 dark:border-neutral-800">
          <div className="container px-6 py-12 lg:py-20">
            <div className="prose dark:prose-invert max-w-3xl mx-auto">
              <div dangerouslySetInnerHTML={{ __html: project.content }} />
            </div>
          </div>
        </div>
      )}

      {/* Image Gallery */}
      {project.additionalImages && project.additionalImages.length > 0 && (
        <div className="w-full bg-neutral-100 dark:bg-neutral-800">
          <div className="container px-6 py-12 lg:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {project.additionalImages.map((image, index) => (
                <div
                  key={index}
                  className="group relative aspect-video rounded-lg overflow-hidden"
                >
                  <Image
                    src={image.url}
                    alt={
                      image.caption ||
                      `${project.title} screenshot ${index + 1}`
                    }
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {image.caption && (
                    <div
                      className="
                        absolute inset-0 bg-gradient-to-t from-black/60 to-transparent
                        flex items-end p-6
                        opacity-0 group-hover:opacity-100
                        transition-opacity duration-300
                      "
                    >
                      <p className="text-white">{image.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProjectDetail;
