import { ReactElement } from "react";
import HeroSection from "./_sections/HeroSection";
import StatsSection from "./_sections/StatsSection";
import ExpertiseSection from "./_sections/ExpertiseSection";
import ProjectsSection from "./_sections/ProjectsSection";
import BlogSection from "./_sections/BlogSection";
import ContactSection from "./_sections/ContactSection";

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
