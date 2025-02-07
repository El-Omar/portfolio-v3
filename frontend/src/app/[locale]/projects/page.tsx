import { useTranslations } from "next-intl";
import { ReactElement } from "react";
import ProjectsListDetailed from "@/components/projects/ProjectListDetailed";
import Container from "@/components/ui/Container";
import Title from "@/components/ui/Title";
import TitleAccent from "@/components/ui/TitleAccent";

const ProjectsPage = (): ReactElement => {
  const t = useTranslations("projects");

  return (
    <Container className="py-16 lg:py-32 flex flex-col gap-10">
      <Title>
        {t.rich("intro.title", {
          br: () => <br />,
          accent: (chunk) => <TitleAccent>{chunk}</TitleAccent>,
        })}
      </Title>
      <ProjectsListDetailed />
    </Container>
  );
};

export default ProjectsPage;
