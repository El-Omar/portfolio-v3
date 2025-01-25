import { ReactElement } from "react";
import Design from "@/components/home/Design";
import Develop from "@/components/home/Develop";
import SectionTransition from "@/components/home/SectionTransition";
import Container from "@/components/ui/Container";

const ExpertiseSection = (): ReactElement => {
  return (
    <Container>
      <SectionTransition
        title="Creating an"
        titleAccent="impact"
        subtitle="requires you"
        subtitleAccent="to"
      />
      <div className="pb-32 flex flex-col gap-64">
        <div className="w-full">
          <Design />
        </div>
        <div className="w-full">
          <Develop />
        </div>
      </div>
    </Container>
  );
};

export default ExpertiseSection; 