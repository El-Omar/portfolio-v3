import { ReactElement } from "react";

import Paragraph from "../../ui/Paragraph";
import DesignImage from "./DesignImage";

const endQuote = <span>&#10078;</span>;

const Design = (): ReactElement => {
  return (
    <article className="flex flex-col justify-center gap-2 relative md:flex-row items-center md:gap-4 bg-gradient-to-b">
      <div className="absolute bottom-0 w-screen h-1/3 bg-gradient-to-t from-neutral-800 rounded-3xl overflow-hidden"></div>
      <div
        className="absolute top-1/4 w-screen h-2/3 bg-gradient-to-tr from-sky-400 "
        style={{ clipPath: "url('#wave')" }}
      ></div>
      <svg viewBox="0 0 1440 328" width="0" className="">
        <defs>
          <clipPath
            id="wave"
            clipPathUnits="objectBoundingBox"
            transform="scale(0.00139444444, 0.00354878048)"
          >
            <path d="M504.452 27.7002C163.193 -42.9551 25.9595 38.071 0 87.4161V328H1440V27.7002C1270.34 57.14 845.711 98.3556 504.452 27.7002Z" />
          </clipPath>
        </defs>
      </svg>
      <div className="content z-10 -mb-5 md:mb-0">
        <h1 className="lg:text-5xl text-4xl leading-snug font-khula">
          Impactful Design
        </h1>
        <Paragraph className="bg-red-50 color-white py-3 pr-2 pl-12 md:pl-7 rounded-md lg:mt-4 relative">
          I design with <strong>purpose</strong>; to solve problems and simplify
          experiences. By focusing on core needs and the user experience, I
          craft solutions that are clear, effective, and impactful.
          <strong className="text-6xl md:text-7xl font-baskerville absolute -bottom-10 -right-4 md:-right-5 md:-bottom-12 text-cool">
            {endQuote}
          </strong>
        </Paragraph>
      </div>
      <DesignImage className="relative z-10 max-w-full w-96 md:w-auto md:max-w-[700px]" />
    </article>
  );
};

export default Design;
