import { ReactElement } from "react";
import BlogSection from "./_sections/BlogSection";
import ContactSection from "./_sections/ContactSection";
import ExpertiseSection from "./_sections/ExpertiseSection";
import HeroSection from "./_sections/HeroSection";
import ProjectsSection from "./_sections/ProjectsSection";
import StatsSection from "./_sections/StatsSection";

const Home = (): ReactElement => {
  return (
    <main className="flex flex-col items-center">
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
