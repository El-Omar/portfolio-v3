import { Metadata } from "next";
import { ReactElement } from "react";
import BlogSection from "./_sections/BlogSection";
import ContactSection from "./_sections/ContactSection";
import ExpertiseSection from "./_sections/ExpertiseSection";
import HeroSection from "./_sections/HeroSection";
import ProjectsSection from "./_sections/ProjectsSection";
import StatsSection from "./_sections/StatsSection";
import { getMetadata } from "@/config/metadata";

export const metadata: Metadata = getMetadata();

const Home = (): ReactElement => {
  return (
    <main className="flex flex-col items-center w-full">
      <HeroSection />
      <StatsSection />
      <ExpertiseSection />
      <ProjectsSection />
      <BlogSection />
      <ContactSection />
    </main>
  );
};

export default Home;
