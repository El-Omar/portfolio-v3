import { useTranslations } from "next-intl";
import { ReactElement } from "react";
import Design from "@/components/home/Design";
import Develop from "@/components/home/Develop";
import SectionTransition from "@/components/home/SectionTransition";
import Container from "@/components/ui/Container";
import TitleAccent from "@/components/ui/TitleAccent";

const ExpertiseSection = (): ReactElement => {
  const t = useTranslations("home.sections.expertise");

  return (
    <Container className="mt-20">
      <SectionTransition
        title={t.rich("title", {
          accent: (chunks) => <TitleAccent>{chunks}</TitleAccent>,
        })}
        subtitle={t.rich("subtitle", {
          accent: (chunks) => <TitleAccent>{chunks}</TitleAccent>,
        })}
        align="left"
      />
      <div className="pb-0 lg:pb-32 flex flex-col lg:gap-52 gap-32">
        <Design />
        <Develop />
      </div>
    </Container>
  );
};

export default ExpertiseSection;
