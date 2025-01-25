import SectionTransition from "@/components/home/SectionTransition";
import ProjectsParallax from "@/components/home/ProjectParallax";
import ParallaxTitleSection from "@/components/ui/ParallaxTitleSection";
import { getProjects } from "../../actions/projects";
import Container from "@/components/ui/Container";

const ProjectsSection = async () => {
  const response = await getProjects({ published: true });
  const projects = response.status === "success" ? response.data : [];

  if (response.status !== "success") {
    return (
      <Container>
        <p>No projects found</p>
      </Container>
    );
  }

  return (
    <ParallaxTitleSection
      className="w-full mt-40 bg-neutral-100 overflow-clip"
      contentClassName="mt-[30vh]"
      title={
        <SectionTransition
          title="Showcasing"
          titleAccent="projects"
          subtitle="I've worked"
          subtitleAccent="on"
          align="center"
          className="py-0"
        />
      }
    >
      <ProjectsParallax projects={projects} />
    </ParallaxTitleSection>
  );
};

export default ProjectsSection;
