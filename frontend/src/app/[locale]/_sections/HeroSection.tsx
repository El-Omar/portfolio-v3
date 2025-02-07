import { ReactElement } from "react";
import Intro from "@/components/home/Intro";
import Container from "@/components/ui/Container";

const HeroSection = (): ReactElement => {
  return (
    <Container className="py-16">
      <Intro />
    </Container>
  );
};

export default HeroSection;
