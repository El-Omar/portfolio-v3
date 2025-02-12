"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ReactElement, useMemo, useRef } from "react";
import Paragraph from "../ui/Paragraph";
import Title from "../ui/Title";
import TitleAccent from "../ui/TitleAccent";

const Design = (): ReactElement => {
  const t = useTranslations("about.design");
  const containerRef = useRef<HTMLDivElement>(null);

  const animations = useMemo(() => {
    const easing = [0.22, 1, 0.36, 1];

    return {
      containerVariants: {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            when: "beforeChildren",
            staggerChildren: 0.2,
            duration: 0.8,
            ease: easing,
          },
        },
      },

      textVariants: {
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            ease: easing,
          },
        },
      },

      imageContainerVariants: {
        hidden: {
          opacity: 0,
          x: -20,
        },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            delay: 0.2,
            duration: 1.2,
            ease: easing,
          },
        },
      },
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      variants={animations.containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-200px" }}
      className="relative w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 lg:gap-20"
    >
      {/* Background dot */}
      <div className="absolute bottom-[calc(50%_-_8rem)] rounded-full right-0 w-64 h-64 bg-neutral-200 dark:bg-neutral-800 z-0" />

      {/* Left image */}
      <motion.div
        variants={animations.imageContainerVariants}
        className="relative w-full lg:w-1/2 flex flex-col items-center justify-center order-1 lg:order-none"
      >
        <div className="relative w-[100%] aspect-[4/3] bg-neutral-100 dark:bg-neutral-800 rounded-xl overflow-hidden">
          <Image
            src="/img/design.svg"
            alt="Design"
            fill
            className="object-contain p-8"
          />
        </div>
      </motion.div>

      {/* Right content */}
      <div className="space-y-6 relative z-50 lg:w-1/2">
        <motion.div variants={animations.textVariants}>
          <Title>
            {t.rich("title", {
              accent: (chunk) => <TitleAccent>{chunk}</TitleAccent>,
            })}
          </Title>
        </motion.div>

        <motion.div variants={animations.textVariants}>
          <Paragraph className="md:text-lg md:leading-relaxed">
            {t("description")}
          </Paragraph>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Design;
