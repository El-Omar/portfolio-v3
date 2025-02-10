"use client";
import { motion, useScroll, useSpring } from "motion/react";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

const PageScrollProgress = ({ className }: Props) => {
  const { scrollYProgress } = useScroll();

  const smoothScroll = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 300,
    mass: 1.2,
  });

  return (
    <motion.div
      className={twMerge(
        "h-1 bg-cool-red w-full z-[9999] origin-left rtl:origin-right",
        className,
      )}
      style={{ scaleX: smoothScroll }}
    />
  );
};

export default PageScrollProgress;
