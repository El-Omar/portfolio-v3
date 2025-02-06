import { useTranslations } from "next-intl";
import { ReactElement } from "react";
import ProjectsListDetailed from "@/components/projects/ProjectListDetailed";
import Container from "@/components/ui/Container";
import Title from "@/components/ui/Title";
import TitleAccent from "@/components/ui/TitleAccent";

const ProjectsPage = (): ReactElement => {
  const t = useTranslations("projects");

  return (
    <main className="flex flex-col items-center w-full">
      <Container className="space-y-10">
        <Title>
          {t.rich("intro.title", {
            br: () => <br />,
            accent: (chunk) => <TitleAccent>{chunk}</TitleAccent>,
          })}
        </Title>
        <ProjectsListDetailed />
      </Container>
    </main>
  );
};

export default ProjectsPage;
