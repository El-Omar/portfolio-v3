import { useTranslations } from "next-intl";
import { ReactElement } from "react";
import SectionTransition from "../SectionTransition";
import TitleAccent from "@/components/ui/TitleAccent";

const ProjectsHeader = (): ReactElement => {
  const t = useTranslations("home.sections.projects");

  return (
    <SectionTransition
      title={t.rich("title", {
        accent: (chunks) => <TitleAccent>{chunks}</TitleAccent>,
      })}
      subtitle={t.rich("subtitle", {
        accent: (chunks) => <TitleAccent>{chunks}</TitleAccent>,
      })}
      align="center"
      className="py-0 flex flex-col items-center"
    />
  );
};

export default ProjectsHeader;
