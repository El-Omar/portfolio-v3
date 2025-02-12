"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { ReactElement, useMemo, useRef } from "react";
import SpaceInvaders from "./SpaceInvaders";
import { Button } from "../ui/Button";
import Paragraph from "../ui/Paragraph";
import Title from "../ui/Title";
import TitleAccent from "../ui/TitleAccent";

const ContactWithSpaceInvaders = (): ReactElement => {
  const t = useTranslations("home.contact");
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

      gameContainerVariants: {
        hidden: {
          opacity: 0,
          scale: 0.95,
          y: 20,
        },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: {
            delay: 0.3,
            duration: 0.8,
            ease: easing,
          },
        },
      },

      buttonVariants: {
        hidden: { opacity: 0, x: -20 },
        visible: {
          opacity: 1,
          x: 0,
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
    <motion.article
      ref={containerRef}
      variants={animations.containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="w-full py-16 lg:py-32 relative"
    >
      <div className="flex flex-col lg:flex-row items-center justify-between gap-20 mb-16">
        <div className="flex-1 space-y-6">
          <motion.div variants={animations.textVariants}>
            <Title>
              {t.rich("title", {
                br: () => <br />,
                accent: (chunks) => <TitleAccent>{chunks}</TitleAccent>,
              })}
            </Title>
          </motion.div>

          <motion.div variants={animations.textVariants}>
            <Paragraph className="text-neutral-600 dark:text-neutral-400 max-w-xl">
              {t("description")}
            </Paragraph>
          </motion.div>

          <motion.div
            variants={animations.buttonVariants}
            className="flex gap-4 items-center"
          >
            <Button variant="fancy" asChild>
              <a href="mailto:elomar.sami@gmail.com">
                {t("getInTouch")} <Send className="w-4 h-4" />
              </a>
            </Button>
          </motion.div>
        </div>

        <motion.div
          variants={animations.gameContainerVariants}
          className="flex-1 flex justify-center"
        >
          <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-sm">
            <SpaceInvaders />
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
};

export default ContactWithSpaceInvaders;
