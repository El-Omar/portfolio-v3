import { Image as ImageIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import BlogCard from "@/components/blog/BlogCard";
import Design from "@/components/home/Design";
import Develop from "@/components/home/Develop";
import Intro from "@/components/home/Intro";
import Projects from "@/components/home/Projects";
import SpaceInvaders from "@/components/home/SpaceInvaders";
import { Button } from "@/components/ui/Button";
import Paragraph from "@/components/ui/Paragraph";
import Title from "@/components/ui/Title";
import { Link } from "@/i18n/routing";

const Home = () => {
  const t = useTranslations("home");

  return (
    <main className="flex flex-col items-center container">
      <section className="w-full md:py-20 py-10 xl:mt-6">
        <Intro />
      </section>
      <section className="mt-10 md:mt-20 md:p-20 px-4 py-10 bg-neutral-100 dark:bg-neutral-800 flex flex-col gap-4 w-full">
        <Title className="text-center">
          {t.rich("expertise.title", {
            br: () => <br className="md:block" />,
            accent: (chunk) => (
              <span className="font-baskerville text-cool-red">{chunk}</span>
            ),
          })}
        </Title>
        <section className="flex flex-col gap-12 mt-6">
          <Design />
          <Develop />
          <Button className="self-center" variant="default" asChild>
            <Link href="/about">
              {t("expertise.readMore")} <ImageIcon />
            </Link>
          </Button>
        </section>
      </section>
      <article className="w-full md:px-12 md:py-20 xl:p-20 xl:py-28 px-4 py-10">
        <header>
          <Title>
            {t.rich("work.title", {
              accent: (chunk) => (
                <span className="font-baskerville text-cool-red">{chunk}</span>
              ),
            })}
          </Title>
        </header>
        <section className="flex justify-between gap-8 mt-8 flex-wrap">
          <Projects />
        </section>
      </article>
      <article className="flex flex-col gap-12 mt-20 w-full md:px-12 md:py-20 xl:p-20 px-4 py-10 bg-neutral-100 dark:bg-neutral-800">
        <header>
          <Title className="text-center">{t("blog.title")}</Title>
        </header>
        <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-8">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </section>
        <Button className="self-center" variant="outline">
          {t("blog.readMore")}
        </Button>
      </article>
      <article className="flex flex-col gap-4 items-center w-full md:px-12 md:py-20 xl:p-20 px-4 py-10">
        <header>
          <Title className="text-center">
            {t.rich("contact.title", {
              space: () => <>&nbsp;</>,
              accent: (chunk) => (
                <span className="font-baskerville text-cool-red">{chunk}</span>
              ),
            })}
          </Title>
        </header>
        <Paragraph className="text-center">
          {t("contact.description")}
        </Paragraph>
        <Button className="mt-4">{t("contact.getInTouch")}</Button>
        <div className="mt-8">
          <SpaceInvaders />
        </div>
      </article>
    </main>
  );
};

export default Home;
