"use client";
import { motion, useScroll } from "motion/react";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

const PageScrollProgress = ({ className }: Props) => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className={twMerge(
        "h-1 bg-cool-red w-full z-[9999] origin-left rtl:origin-right",
        className,
      )}
      style={{ scaleX: scrollYProgress }}
    />
  );
};

export default PageScrollProgress;
