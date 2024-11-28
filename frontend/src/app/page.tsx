import Intro from "@/components/home/Intro";
import Design from "@/components/home/Design";
import Develop from "@/components/home/Develop";
import Title from "@/components/ui/Title";
import BlogCard from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/Button";
import Paragraph from "@/components/ui/Paragraph";
import SpaceInvaders from "@/components/home/SpaceInvaders";

const Home = () => {
  return (
    <div className={`flex flex-col items-center relative overflow-x-hidden`}>
      <main className="flex flex-col items-center container">
        <section className="w-full md:py-20 py-10 xl:mt-6">
          <Intro />
        </section>
        <section className="mt-10 md:mt-24 bg-neutral-100 flex flex-col gap-4 w-full md:px-12 md:py-20 xl:p-20 px-4 py-10">
          <Title className="text-center">
            Expertise{" "}
            <span className="font-baskerville text-cool-red">& experience</span>
          </Title>
          <section className="flex flex-col gap-12 mt-20">
            <Design />
            <Develop />
          </section>
        </section>
        <article className="w-full md:px-12 md:py-20 xl:p-20 xl:py-28 px-4 py-10">
          <header>
            <Title>
              Some of my{" "}
              <span className="font-baskerville text-cool-red">projects</span>
            </Title>
          </header>
          <section className="flex justify-between gap-8 mt-8 flex-wrap">
            <figure className="rounded-lg w-60 h-60 bg-neutral-200 text-primary"></figure>
            <figure className="rounded-lg w-60 h-60 bg-neutral-200"></figure>
            <figure className="rounded-lg w-60 h-60 bg-neutral-200"></figure>
            <figure className="rounded-lg w-60 h-60 bg-neutral-200"></figure>
            <figure className="rounded-lg w-60 h-60 bg-neutral-200"></figure>
          </section>
        </article>
        <article className="flex flex-col gap-8 w-full md:px-12 md:py-20 xl:p-20 px-4 py-10 bg-neutral-100">
          <header>
            <Title className="text-center md:text-6xl">Blog articles</Title>
          </header>
          <section className="flex justify-between gap-8">
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </section>
          <Button className="self-center" variant="outline">
            Read more, it&apos;s interesting
          </Button>
        </article>
        <article className="flex flex-col items-center w-full md:px-12 md:py-20 xl:p-20 px-4 py-10">
          <header>
            <Title className="text-center md:text-6xl">
              Thank you
              {/* <span className="font-baskerville text-cool-red">
                Thanks!
              </span> */}
            </Title>
          </header>
          <Paragraph className="text-center mt-2">
            You&apos;ve reached the bottom, thank you for visiting! For any
            inquiries, feel free to click the button down below. Or you can play
            Space Invaders.
          </Paragraph>
          <Button className="mt-4">Get in touch</Button>
          <div className="mt-8">
            <SpaceInvaders />
          </div>
        </article>
      </main>
      <footer className="footer bg-neutral-900 px-6 py-4 w-full"></footer>
    </div>
  );
};

export default Home;
