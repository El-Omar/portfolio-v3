import { ProjectResponse } from "@portfolio-v3/shared";
import { Github, Globe } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import BackButton from "../layout/BackButton";
import Container from "../ui/Container";
import Paragraph from "../ui/Paragraph";
import { Button } from "@/components/ui/Button";
import Title from "@/components/ui/Title";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils/cn";
import { getYearMonthDay } from "@/lib/utils/dates";
import { fontSpectral } from "@/lib/utils/fonts";

type ProjectDetailProps = {
  project: ProjectResponse;
};

const ProjectDetail = ({ project }: ProjectDetailProps) => {
  const t = useTranslations("projects");
  const index = 0;

  return (
    <Container>
      <div className="py-6 lg:py-12">
        <BackButton />
      </div>
      <article
        className={cn(
          "w-full pb-28 mb-12 lg:mb-24 relative",
          fontSpectral.variable,
        )}
      >
        {/* Hero Section */}
        <article className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 bg-neutral-100 dark:bg-neutral-900 p-6 lg:p-10 rounded-2xl">
          {/* Project Image */}
          <div
            className={`${
              index % 2 === 1 ? "lg:order-2" : ""
            } relative aspect-[16/9] overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800`}
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

          {/* Project Info */}
          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              {/* Year & Title */}
              <div className="space-y-3">
                <span className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                  {getYearMonthDay(project.startDate)[0]}
                </span>
                <Title className="text-3xl lg:text-4xl">{project.title}</Title>
              </div>

              {/* Description */}
              <Paragraph className="ml-0">{project.description}</Paragraph>

              {/* Technologies */}
              <div className="space-y-2 pt-4">
                <h3 className="text-sm font-medium text-neutral-400">
                  {t("technologies")}
                </h3>
                <Paragraph className="md:text-sm flex flex-wrap gap-1">
                  {project.technologies.map((tech, index) => (
                    <span key={tech} className="flex items-center gap-1">
                      <span>{tech}</span>
                      {index < project.technologies.length - 1 && (
                        <span className="text-xs">·</span>
                      )}
                    </span>
                  ))}
                </Paragraph>
              </div>
            </div>

            {/* Project Links */}
            {(project.liveUrl || project.githubUrl) && (
              <div className="flex gap-3 mt-8">
                {project.liveUrl && (
                  <Button variant="default" size="default" asChild>
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full lg:w-auto"
                    >
                      <span className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        {t("visitProject")}
                      </span>
                    </Link>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button variant="outline" size="default" asChild>
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full lg:w-auto"
                    >
                      <span className="flex items-center gap-2">
                        <Github className="h-4 w-4" />
                        {t("viewSource")}
                      </span>
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </div>
        </article>

        {/* Content Section */}
        {project.content && (
          <div className="w-full">
            <div className="container px-6 py-12">
              <div className="prose dark:prose-invert max-w-[728px] mx-auto">
                <div dangerouslySetInnerHTML={{ __html: project.content }} />
              </div>
            </div>
          </div>
        )}

        {/* Project Video */}
        {project.videoUrl && (
          <div className="w-full bg-neutral-100 dark:bg-neutral-800">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              <iframe
                src={`${project.videoUrl}?autoplay=1&loop=1&controls=0&muted=1`}
                allow="autoplay; fullscreen; picture-in-picture"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms autoplay allow-presentation"
                className="absolute top-0 left-0 w-full h-full"
                title={`${project.title} video`}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        )}

        {/* Image Gallery */}
        {project.additionalImages && project.additionalImages.length > 0 && (
          <div className="w-full bg-neutral-100 dark:bg-neutral-800">
            <div className="container px-6 py-12 lg:py-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 auto-rows-auto">
                {project.additionalImages.map((image, index) => {
                  // Determine if image should be full width
                  const isFullWidth = image.className?.includes("w-full");

                  return (
                    <div
                      key={index}
                      className={cn(
                        "relative w-full",
                        isFullWidth && "md:col-span-2",
                      )}
                    >
                      <div className="relative w-full h-auto">
                        <Image
                          src={image.url}
                          alt={
                            image.caption ||
                            `${project.title} screenshot ${index + 1}`
                          }
                          width={1920}
                          height={1080}
                          className={cn(
                            "w-full h-auto rounded-lg",
                            image.className,
                          )}
                        />
                      </div>
                      {image.caption && (
                        <div className="mt-4">
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">
                            {image.caption}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </article>
    </Container>
  );
};

export default ProjectDetail;
