import { ReactElement } from "react";
import Design from "@/components/home/Design";
import Develop from "@/components/home/Develop";
import SectionTransition from "@/components/home/SectionTransition";
import Container from "@/components/ui/Container";

const ExpertiseSection = (): ReactElement => {
  return (
    <Container className="mt-20">
      <SectionTransition
        title="Creating an"
        titleAccent="impact"
        subtitle="requires you"
        subtitleAccent="some"
      />
      <div className="pb-0 lg:pb-32 flex flex-col lg:gap-52 gap-32">
        <Design />
        <Develop />
      </div>
    </Container>
  );
};

export default ExpertiseSection;
