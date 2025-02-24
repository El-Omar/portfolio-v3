import { Metadata } from "next";
import { ReactElement } from "react";
import PageTransition from "../PageTransition";
import Design from "@/components/about/Design";
import Development from "@/components/about/Development";
import DownloadResume from "@/components/about/DownloadResume";
import Intro from "@/components/about/Intro";
import Photography from "@/components/about/Photography";
import Testimonials from "@/components/about/Testimonials";
import Container from "@/components/ui/Container";
import { getMetadata } from "@/config/metadata";

export const metadata: Metadata = getMetadata({
  title: "About",
  description:
    "Learn more about my journey, skills, and experience in web development and design.",
});

const About = (): ReactElement => {
  return (
    <PageTransition>
      <Container className="py-16 lg:py-32 relative flex flex-col gap-12 lg:gap-20">
        <Intro />
        <Photography />
        <Design />
        <Development />
        <Testimonials />
        <DownloadResume />
      </Container>
    </PageTransition>
  );
};

export default About;
