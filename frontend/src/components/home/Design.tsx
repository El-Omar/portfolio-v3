import { ReactElement } from "react";

import Paragraph from "../ui/Paragraph";
import LightbulbImage from "@/components/assets/lightbulb-space.svg";

const Design = (): ReactElement => {
  return (
    <article className="flex bg-white flex-col justify-center gap-2 relative md:flex-row items-center md:gap-4 shadow- rounded-3xl p-4 md:p-8">
      {/* <div className="absolute bottom-0 w-screen h-1/3 bg-gradient-to-t from-neutral-800 rounded-3xl overflow-hidden"></div> */}
      <div
        className="absolute bottom-0 w-full h-2/6 bg-gradient-to-tr from-cool-red rounded-3xl"
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
      <div className="content z-10 pb-6 md:pb-20 pl-0 md:pl-5 md:mb-0 order-1 md:-order-1">
        <h1 className="lg:text-6xl text-4xl leading-snug font-khula">
          Design with intent
        </h1>
        <Paragraph className="rounded-md lg:mt-4">
          I design with <strong>purpose</strong> - solving problems and
          simplifying experiences. By focusing on core user needs, I craft
          solutions that are clear, effective, and leave a lasting impact.
          <strong className="text-6xl md:text-8xl font-khula absolute -top-4 -left-4 text-cool">
            I
          </strong>
        </Paragraph>
      </div>
      <LightbulbImage className="relative z-10 max-w-full w-96 md:w-auto md:max-w-[700px]" />
    </article>
  );
};

export default Design;
