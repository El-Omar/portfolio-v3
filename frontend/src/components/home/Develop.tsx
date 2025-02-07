"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useMemo, useRef } from "react";
import { Button } from "../ui/Button";
import Paragraph from "../ui/Paragraph";
import Title from "../ui/Title";
import TitleAccent from "../ui/TitleAccent";
import { Link } from "@/i18n/routing";

const Develop = () => {
  const t = useTranslations("home.expertise");
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
          x: 20,
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

      floatingImageVariants: {
        hidden: {
          opacity: 0,
          y: 40,
        },
        visible: {
          opacity: 1,
          y: 0,
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
      className="relative w-full flex flex-col lg:flex-row justify-start items-start lg:items-center gap-20"
    >
      {/* Background dot */}
      <div className="absolute bottom-[calc(50%_-_8rem)] rounded-full left-0 w-64 h-64 bg-neutral-200 z-0" />

      {/* Left content */}
      <div className="space-y-6 relative z-50">
        <motion.div variants={animations.textVariants}>
          <Title>
            {t.rich("developTitle", {
              br: () => <br />,
              accent: (chunks) => <TitleAccent>{chunks}</TitleAccent>,
            })}
          </Title>
        </motion.div>

        <motion.div
          variants={{
            hidden: animations.textVariants.hidden,
            visible: {
              ...animations.textVariants.visible,
              transition: {
                ...animations.textVariants.visible.transition,
                delay: 0.2,
              },
            },
          }}
        >
          <Paragraph>
            {t.rich("developDescription", {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </Paragraph>
        </motion.div>

        <motion.div
          variants={{
            hidden: animations.textVariants.hidden,
            visible: {
              ...animations.textVariants.visible,
              transition: {
                ...animations.textVariants.visible.transition,
                delay: 0.3,
              },
            },
          }}
        >
          <Link href="/about" className="">
            <Button variant="fancy">
              {t("readMore")} <ArrowRight />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Right image composition */}
      <div className="relative w-full lg:w-1/2 flex flex-col items-center justify-center">
        <motion.div
          variants={animations.imageContainerVariants}
          className="relative w-full h-full"
        >
          {/* Main image container */}
          <motion.div
            variants={animations.imageContainerVariants}
            className="relative w-[80%] aspect-[4/3] bg-neutral-200 z-20 mx-auto"
          >
            {/* Main image */}
            <Image
              src="/img/develop.jpeg"
              alt="Development process"
              fill
              className="object-cover"
            />

            {/* Dot */}
            <div className="absolute rounded-full bg-primary -top-6 -right-6 w-12 h-12 z-30" />
          </motion.div>

          {/* Right bottom image */}
          <motion.div
            variants={animations.floatingImageVariants}
            className="absolute right-0 -bottom-10 sm:-bottom-16 lg:-bottom-20 w-[60%] aspect-[4/3] bg-neutral-200 z-10"
          >
            <Image
              src="/img/wireframes.jpeg"
              alt="Development detail"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Left bottom image */}
          <motion.div
            variants={animations.floatingImageVariants}
            className="absolute left-0 -bottom-12 sm:-bottom-16 lg:-bottom-24 w-24 sm:w-28 lg:w-32 h-24 sm:h-28 lg:h-32 bg-neutral-200 flex items-center justify-center z-30"
          >
            <Image
              src="/img/plants2.jpg"
              alt="Development detail"
              fill
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Develop;
