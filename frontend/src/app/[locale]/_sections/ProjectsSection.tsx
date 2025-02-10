import { getProjects } from "../../actions/projects";
import ProjectParallaxWrapper from "@/components/home/ProjectParallax/ProjectParallaxWrapper";
import ProjectsHeader from "@/components/home/ProjectParallax/ProjectsHeader";
import Container from "@/components/ui/Container";
import ParallaxTitleSection from "@/components/ui/ParallaxTitleSection";

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
      title={<ProjectsHeader />}
    >
      <ProjectParallaxWrapper projects={projects} />
    </ParallaxTitleSection>
  );
};

export default ProjectsSection;
