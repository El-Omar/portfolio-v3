import { ReactElement } from "react";
import Design from "@/components/about/Design";
import Development from "@/components/about/Development";
import DownloadResume from "@/components/about/DownloadResume";
import Intro from "@/components/about/Intro";
import Photography from "@/components/about/Photography";
import Testimonials from "@/components/about/Testimonials";
import Container from "@/components/ui/Container";

const About = (): ReactElement => {
  return (
    <Container className="py-16 lg:py-32 relative flex flex-col gap-12 lg:gap-20">
      <Intro />
      <Photography />
      <Design />
      <Development />
      <Testimonials />
      <DownloadResume />
    </Container>
  );
};

export default About;
