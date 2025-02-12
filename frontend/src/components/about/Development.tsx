"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ReactElement, useMemo, useRef } from "react";
import Paragraph from "../ui/Paragraph";
import Title from "../ui/Title";
import TitleAccent from "../ui/TitleAccent";

const Development = (): ReactElement => {
  const t = useTranslations("about.development");
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
          scale: 0.95,
        },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            delay: 0.3,
            duration: 1,
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
      className="relative w-full py-10 lg:py-20"
    >
      {/* Background section */}
      <div className="absolute h-[120%] w-[200vw] -left-[50vh] bg-gradient-to-b from-neutral-100 via-neutral-100 to-transparent dark:from-neutral-800 dark:via-neutral-800 top-0 -z-10" />

      {/* Content */}
      <div className="relative max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20">
          {/* Left side */}
          <div className="space-y-8">
            <motion.div variants={animations.textVariants}>
              <Title>
                {t.rich("title", {
                  accent: (chunk) => <TitleAccent>{chunk}</TitleAccent>,
                  br: () => <br />,
                })}
              </Title>
            </motion.div>

            <motion.div variants={animations.textVariants}>
              <Paragraph className="md:text-lg md:leading-relaxed">
                {t.rich("description", {
                  br: () => <br />,
                })}
              </Paragraph>
            </motion.div>
          </div>

          {/* Right side - Image */}
          <motion.div
            variants={animations.imageContainerVariants}
            className="relative"
          >
            <div className="relative aspect-[4/3] lg:aspect-[3/4] bg-white/50 dark:bg-white/5 rounded-xl overflow-hidden backdrop-blur-sm">
              <Image
                src="/img/coding.jpg"
                alt="Development"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Development;
