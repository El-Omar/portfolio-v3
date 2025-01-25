import { ReactElement } from "react";
import Intro from "@/components/home/Intro";
import Container from "@/components/ui/Container";

const HeroSection = (): ReactElement => {
  return (
    <Container>
      <section className="w-full md:py-8 py-10">
        <Intro />
      </section>
    </Container>
  );
};

export default HeroSection; 