import { ReactElement } from "react";
import BilingualLogo from "../ui/BilingualLogo";

import IconPen from "@/components/assets/pen.svg";
import IntroImage from "./IntroImage";
import Paragraph from "../ui/Paragraph";

const Intro = (): ReactElement => {
  return (
    <article className="w-full flex flex-col lg:flex-row justify-center items-center gap-12 p-4 pb-6 lg:p-0 bg-gradient-to-b lg:bg-gradient-to-r from-transparent to-neutral-200 dark:to-neutral-900 from-50% min-h-full">
      <figure className="relative flex bg-white dark:bg-neutral-700 opacity-90 justify-center items-end xl:w-[460px] xl:h-[460px] w-[300px] h-[300px]  rounded-full">
        <div className="hidden md:block absolute w-full h-full inset-0 rounded-full border-[14px] xl:border-[20px] border-neutral-950 dark:border-neutral-50 border-x-transparent dark:border-x-transparent border-b-transparent"></div>
        <div className="hidden md:block absolute w-full h-full inset-0 rounded-full border-[14px] xl:border-[20px] z-10 border-neutral-200 dark:border-neutral-800 border-t-transparent dark:border-t-transparent"></div>
        <IntroImage />
      </figure>
      <header className="flex flex-col gap-3">
        <h1 className="md:text-4xl text-2xl leading-loose font-dm-sans">
          Sup! I&apos;m Elomar, and I love <br className=" md:block" />
          designing{" "}
          <span className="font-baskerville text-cool-red leading-3">
            cool experiences
          </span>
          .
        </h1>
        <Paragraph className="ml-1">
          I&apos;m a web developer and UI/UX designer who keeps things simple. I
          also{" "}
          <a className="underline underline-offset-2" href="/blog">
            write
          </a>
          , snap some cool shots with my phone, and stay active with sports.
          Stick around and check out my work!
        </Paragraph>
        <div className="flex items-center">
          <BilingualLogo />
          <IconPen className="dark:fill-neutral-100" />
        </div>
      </header>
    </article>
  );
};

export default Intro;
