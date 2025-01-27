import { ProjectResponse } from "@portfolio-v3/shared";
import { ArrowLeft, Calendar, Github, Globe } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Link } from "@/i18n/routing";

type ProjectDetailProps = {
  project: ProjectResponse;
};

const ProjectDetail = ({ project }: ProjectDetailProps) => {
  const t = useTranslations("projects");

  return (
    <main className="flex flex-col items-center container">
      <section className="w-full md:py-20 py-10">
        {/* Navigation */}
        <Button variant="ghost" asChild className="mb-8 group">
          <Link href="/projects" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            {t("backToProjects")}
          </Link>
        </Button>

        {/* Hero Section */}
        <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden mb-12">
          {project.imageUrl && (
            <>
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm bg-white/10 backdrop-blur-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <Card className="lg:col-span-2">
            <CardContent className="p-6 md:p-8 space-y-8">
              {/* Description */}
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {project.description}
                </p>
                {project.content && (
                  <div
                    className="mt-8"
                    dangerouslySetInnerHTML={{ __html: project.content }}
                  />
                )}
              </div>

              {/* Additional Images Gallery */}
              {project.additionalImages &&
                project.additionalImages.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
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
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                        {image.caption && (
                          <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/50 backdrop-blur-sm">
                            <p className="text-sm text-white">
                              {image.caption}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
            </CardContent>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Links */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col gap-3">
                  {project.githubUrl && (
                    <Button variant="outline" asChild className="w-full">
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="justify-start"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        {t("viewSource")}
                      </Link>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button asChild className="w-full">
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="justify-start"
                      >
                        <Globe className="mr-2 h-4 w-4" />
                        {t("visitSite")}
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={project.startDate}>
                    {new Date(project.startDate).toLocaleDateString()}
                  </time>
                  {project.endDate && (
                    <>
                      <span>{t("timeline.to")}</span>
                      <time dateTime={project.endDate}>
                        {new Date(project.endDate).toLocaleDateString()}
                      </time>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProjectDetail;
