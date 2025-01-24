import { ArrowRight } from "lucide-react";
import BlogCard from "@/components/blog/BlogCard";
import Design from "@/components/home/Design";
import Develop from "@/components/home/Develop";
import Intro from "@/components/home/Intro";
import Stats from "@/components/home/Stats";
import { Button } from "@/components/ui/Button";
import Title from "@/components/ui/Title";
import TitleAccent from "@/components/ui/TitleAccent";
import { Link } from "@/i18n/routing";
import ContactWithSpaceInvaders from "@/components/home/ContactWithSpaceInvaders";
import SectionTransition from "@/components/home/SectionTransition";
import Paragraph from "@/components/ui/Paragraph";
import { getProjects } from "../actions/projects";
import ProjectsSection from "@/components/home/ProjectsSection";
import Container from "@/components/ui/Container";

const Home = async () => {
  const response = await getProjects({ published: true });
  const projects = response.status === "success" ? response.data : [];

  return (
    <main className="flex flex-col items-center">
      <Container>
        <section className="w-full md:py-8 py-10">
          <Intro />
        </section>
      </Container>
      <Container>
        <Stats />
      </Container>
      <Container>
        <SectionTransition
          title="Crafting"
          titleAccent="digital experiences"
          subtitle="that leave an"
          subtitleAccent="impact"
        />
      </Container>
      <Container>
        <div className="pb-32 flex flex-col gap-64">
          <div className="w-full">
            <Design />
          </div>
          <div className="w-full">
            <Develop />
          </div>
        </div>
      </Container>
      <ProjectsSection projects={projects} />
      <Container>
        <article className="w-full py-32">
          <div className="px-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-20 mb-16">
              <div className="flex-1 space-y-6">
                <Title>
                  Writing about <br />
                  <TitleAccent>nothing & everything</TitleAccent>
                </Title>
                <Paragraph className="text-neutral-600 dark:text-neutral-400 max-w-xl">
                  Here's where I explore storytelling and share some fragments
                  of random thoughts; sometimes about tech, mostly about life.
                </Paragraph>
              </div>
              <div className="flex-1 flex justify-end">
                <Button variant="fancy" asChild>
                  <Link href="/blog">
                    View all posts <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <BlogCard />
              <BlogCard />
              <BlogCard />
            </div>
          </div>
        </article>
      </Container>
      <Container>
        <ContactWithSpaceInvaders />
      </Container>
    </main>
  );
};

export default Home;
