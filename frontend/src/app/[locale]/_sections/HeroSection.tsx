import { ReactElement } from "react";
import Intro from "@/components/home/Intro";
import Container from "@/components/ui/Container";

const HeroSection = (): ReactElement => {
  return (
    <Container className="pt-0 pb-16 lg:pb-16 lg:pt-20">
      <Intro />
    </Container>
  );
};

export default HeroSection;
