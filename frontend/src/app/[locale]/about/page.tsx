import { ReactElement } from "react";
import Design from "@/components/about/Design";
import Development from "@/components/about/Development";
import DownloadResume from "@/components/about/DownloadResume";
import Intro from "@/components/about/Intro";
import Photography from "@/components/about/Photography";
import Testimonials from "@/components/about/Testimonials";

const About = (): ReactElement => {
  return (
    <main className="flex flex-col items-center container">
      <article className="flex flex-col gap-6 lg:gap-20 items-center w-full md:px-12 md:py-20 xl:p-20 px-4 py-10">
        <Intro />
        <Photography />
        <Design />
        <Development />
        <Testimonials />
        <DownloadResume />
      </article>
    </main>
  );
};

export default About;
