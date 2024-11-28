import { ReactElement } from "react";

import Paragraph from "../ui/Paragraph";
import DevelopImage from "@/components/assets/control-panel-bro.svg";
import Title from "../ui/Title";

const Develop = (): ReactElement => {
  return (
    <article className="flex bg-white flex-col justify-center gap-2 relative md:flex-row items-center md:gap-4 shadow- rounded-3xl p-4 md:p-8">
      <div
        className="rounded-3xl absolute bottom-0 w-full h-1/3 bg-gradient-to-r from-red-50 to-neutral-300"
        style={{ clipPath: "url('#wave2')" }}
      ></div>
      <svg viewBox="0 0 1440 328" width="0" className="">
        <defs>
          <clipPath
            id="wave2"
            clipPathUnits="objectBoundingBox"
            transform="scale(0.00139444444, 0.00504878048)"
          >
            <path d="M504.452 27.7002C163.193 -42.9551 25.9595 38.071 0 87.4161V328H1440V27.7002C1270.34 57.14 845.711 98.3556 504.452 27.7002Z" />
          </clipPath>
        </defs>
      </svg>
      <DevelopImage className="relative z-10 max-w-full w-96 md:w-auto md:max-w-[700px]" />
      <div className="content z-10 pb-2">
        <Title>Develop with precision</Title>
        <Paragraph className="lg:mt-4">
          Balancing <strong>quality</strong> and{" "}
          <strong>time efficiency</strong> isn't easy, but finding the optimal
          solution is where I excel. I bring a methodical approach to every
          project, ensuring both excellence and timely delivery. (And no, my
          workspace doesn't actually look like this)
          {/* <strong className="text-6xl md:text-7xl absolute font-baskerville -top-16 -right-5 text-cool">
            and
          </strong> */}
        </Paragraph>
      </div>
    </article>
  );
};

export default Develop;
