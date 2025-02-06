"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import Paragraph from "../ui/Paragraph";
import Title from "../ui/Title";
import TitleAccent from "../ui/TitleAccent";

const Design = () => {
  const t = useTranslations("home.expertise");
  const containerRef = useRef<HTMLDivElement>(null);

  const easing = [0.22, 1, 0.36, 1];

  // Container animation with staggered children
  const containerVariants = {
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
  };

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easing,
      },
    },
  };

  // Image container variants
  const imageContainerVariants = {
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
  };

  // Floating images variants
  const floatingImageVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.8,
        ease: easing,
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-200px" }}
      className="relative w-full flex flex-col lg:flex-row justify-start items-start lg:items-center gap-20"
    >
      {/* Left image composition */}
      <div
        className="relative w-full lg:w-1/2
        flex flex-col items-center justify-center
        order-1 lg:-order-1"
      >
        <motion.div
          variants={imageContainerVariants}
          className="relative w-full h-full"
        >
          {/* Main image container */}
          <motion.div
            variants={imageContainerVariants}
            className="relative w-[80%] aspect-[4/3] bg-neutral-200 z-20 mx-auto"
          >
            {/* Main image */}
            <Image
              src="/img/design.jpg"
              alt="Design process"
              fill
              className="object-cover"
            />

            {/* Dot */}
            <div
              className="absolute rounded-full bg-primary
              -top-6 -right-6 w-12 h-12 z-30"
            />
          </motion.div>

          {/* Left image */}
          <motion.div
            variants={floatingImageVariants}
            className="absolute 
              -bottom-10 sm:-bottom-16 lg:-bottom-20 left-0
              w-[60%] aspect-[4/3] bg-neutral-200 z-10"
          >
            <Image
              src="/img/notes.jpg"
              alt="Design detail"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Right image */}
          <motion.div
            variants={floatingImageVariants}
            className="absolute 
              -bottom-10 sm:-bottom-16 lg:-bottom-20 
              right-0 
              w-24 sm:w-28 lg:w-32 
              h-24 sm:h-28 lg:h-32 
              bg-neutral-200 flex items-center justify-center z-30"
          >
            <Image
              src="/img/plants.jpg"
              alt="Design detail"
              fill
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Background dot */}
      <div className="absolute bottom-[calc(50%_-_8rem)] rounded-full right-0 w-64 h-64 bg-neutral-200 z-0" />
      <div className="space-y-6 relative z-50">
        <motion.div variants={textVariants}>
          <Title>
            {t.rich("designTitle", {
              br: () => <br />,
              accent: (chunks) => <TitleAccent>{chunks}</TitleAccent>,
            })}
          </Title>
        </motion.div>

        <motion.div
          variants={{
            hidden: textVariants.hidden,
            visible: {
              ...textVariants.visible,
              transition: {
                ...textVariants.visible.transition,
                delay: 0.4,
              },
            },
          }}
        >
          <Paragraph>
            {t.rich("designDescription", {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </Paragraph>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Design;
