import { ReactElement, Suspense } from "react";
import { useTranslations } from "next-intl";
import Title from "@/components/ui/Title";
import ProjectList from "@/components/projects/ProjectList";

const ProjectsPage = (): ReactElement => {
  const t = useTranslations("projects");

  return (
    <main className="flex flex-col items-center container">
      <section className="w-full md:py-20 py-10">
        <Title className="mb-12 text-center md:text-6xl">
          {t.rich("title", {
            accent: (chunk) => <>{chunk}</>,
          })}
        </Title>

        <Suspense
          fallback={
            <div className="text-center py-8">
              <p>Loading projects...</p>
            </div>
          }
        >
          <ProjectList />
        </Suspense>
      </section>
    </main>
  );
};

export default ProjectsPage;
