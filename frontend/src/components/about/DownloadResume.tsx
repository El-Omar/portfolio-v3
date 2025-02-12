"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { ReactElement, useMemo, useRef } from "react";
import Paragraph from "../ui/Paragraph";
import Title from "../ui/Title";
import TitleAccent from "../ui/TitleAccent";

const DownloadResume = (): ReactElement => {
  const t = useTranslations("about.resume");
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

      buttonVariants: {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            delay: 0.4,
            duration: 0.6,
            ease: easing,
          },
        },
      },
    };
  }, []);

  return (
    <motion.section
      ref={containerRef}
      variants={animations.containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative w-full py-20 px-8 lg:p-20 bg-gradient-to-r from-cool-red/5 via-cool-red/5 to-neutral-100 dark:from-red-950 dark:via-red-950/50 dark:to-transparent rounded-2xl"
    >
      <div className="relative flex flex-col lg:flex-row gap-10 items-center justify-between">
        <motion.div
          variants={animations.textVariants}
          className="text-center lg:text-left"
        >
          <Title className="md:leading-tight">
            {t.rich("title", {
              accent: (chunk) => <TitleAccent>{chunk}</TitleAccent>,
            })}
          </Title>
          <Paragraph className="ml-0 lg:ml-1 md:text-lg mt-4">
            {t("description")}
          </Paragraph>
          <Paragraph className="ml-0 lg:ml-1 md:text-sm text-neutral-500 dark:text-neutral-400 mt-2">
            {t("lastUpdate")}
          </Paragraph>
        </motion.div>

        <motion.div variants={animations.buttonVariants}>
          <a
            href="/Web_Resume-Elomar_Sami-Dec_2024.pdf"
            className="group px-8 py-4 bg-primary text-white rounded-xl hover:bg-cool-red/90 transition-colors flex items-center gap-2 text-sm"
            download
          >
            {t("download")}
            <Download
              size={20}
              className="transition-transform group-hover:translate-y-0.5"
            />
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default DownloadResume;
