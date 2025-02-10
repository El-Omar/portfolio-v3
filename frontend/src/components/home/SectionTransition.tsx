"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ReactNode, useRef } from "react";
import { twMerge } from "tailwind-merge";

type SectionTransitionProps = {
  title: ReactNode;
  titleAccent?: ReactNode;
  subtitle?: ReactNode;
  subtitleAccent?: ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
};

const SectionTransition = ({
  title,
  titleAccent,
  subtitle,
  subtitleAccent,
  className = "",
  align = "left",
}: SectionTransitionProps) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: titleRef,
    offset: ["start end", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 300,
    mass: 1.2,
  });

  const firstLineProgress = useTransform(
    smoothProgress,
    [0, 0.5],
    ["100%", "0%"],
  );

  const firstLineAnimation = useTransform(
    firstLineProgress,
    (value) => `inset(0 ${value} -50% 0)`,
  );

  const secondLineProgress = useTransform(
    smoothProgress,
    [0.5, 1],
    ["100%", "0%"],
  );

  const secondLineAnimation = useTransform(
    secondLineProgress,
    (value) => `inset(0 ${value} -50% 0)`,
  );

  const dotProgress = useTransform(smoothProgress, [0.3, 0.5], [0, 1]);

  const baseClassName =
    "tracking-tight font-dm-sans md:leading-tight text-3xl md:text-4xl lg:text-5xl";

  return (
    <div className={twMerge(`w-full py-16 lg:py-40 ${className}`)}>
      <div
        ref={titleRef}
        className={`space-y-2 flex flex-col ${align === "right" ? "lg:text-right" : align === "center" ? "lg:text-center items-center" : ""}`}
      >
        <div className="relative flex flex-col items-start">
          <h2 className={`${baseClassName} text-neutral-300 relative`}>
            <motion.div
              style={{
                scale: dotProgress,
              }}
              className="absolute -right-10 -top-10 w-36 h-36 -translate-y-1/2 bg-cool-red/80 rounded-full"
            />
            {title} {titleAccent}
          </h2>
          <motion.h2
            className={`${baseClassName} absolute top-0 left-0 text-neutral-800`}
            style={{
              clipPath: firstLineAnimation,
            }}
          >
            {title} {titleAccent}
          </motion.h2>
        </div>
        <div className="relative">
          <h2 className={`${baseClassName} text-neutral-300`}>
            {subtitle} {subtitleAccent}
          </h2>
          <motion.h2
            className={`${baseClassName} absolute top-0 left-0 text-neutral-500`}
            style={{
              clipPath: secondLineAnimation,
            }}
          >
            {subtitle} {subtitleAccent}
          </motion.h2>
        </div>
      </div>
    </div>
  );
};

export default SectionTransition;
