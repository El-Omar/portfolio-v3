import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { ReactElement } from "react";
import PageTransition from "../PageTransition";
import ProjectsListDetailed from "@/components/projects/ProjectListDetailed";
import Container from "@/components/ui/Container";
import Title from "@/components/ui/Title";
import TitleAccent from "@/components/ui/TitleAccent";
import { getMetadata } from "@/config/metadata";

export const metadata: Metadata = getMetadata({
  title: "Projects",
  description:
    "Explore my portfolio of web development and design projects, featuring full-stack applications, websites, and creative solutions.",
});

const ProjectsPage = (): ReactElement => {
  const t = useTranslations("projects");

  return (
    <PageTransition>
      <Container className="py-16 lg:py-32 flex flex-col gap-10">
        <Title>
          {t.rich("intro.title", {
            br: () => <br />,
            accent: (chunk) => <TitleAccent>{chunk}</TitleAccent>,
          })}
        </Title>
        <ProjectsListDetailed />
      </Container>
    </PageTransition>
  );
};

export default ProjectsPage;
