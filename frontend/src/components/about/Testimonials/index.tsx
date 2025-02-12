"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ReactElement, useMemo, useRef } from "react";
import TestimonialCard from "./TestimonialCard";
import { testimonials } from "./TestimonialList";
import Title from "../../ui/Title";
import TitleAccent from "../../ui/TitleAccent";
import MasonryLayout from "@/components/ui/MasonryLayout";

const Testimonials = (): ReactElement => {
  const t = useTranslations("about.testimonials");
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
            staggerChildren: 0.15,
            duration: 0.8,
            ease: easing,
          },
        },
      },

      titleVariants: {
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

      cardVariants: {
        hidden: { opacity: 0, y: 40 },
        visible: (index: number) => ({
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: easing,
            delay: 0.2 + index * 0.1,
          },
        }),
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
      className="relative w-full py-10 lg:py-20"
    >
      <div className="relative">
        {/* Background dot */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 rounded-full w-64 h-64 bg-neutral-200 dark:bg-neutral-800 -z-10" />

        <motion.div
          variants={animations.titleVariants}
          className="mb-16 relative"
        >
          <Title className="md:leading-tight text-center">
            {t.rich("title", {
              accent: (chunk) => <TitleAccent>{chunk}</TitleAccent>,
              br: () => <br />,
            })}
          </Title>
        </motion.div>

        <div className="relative">
          <MasonryLayout columns={{ default: 2, md: 2 }}>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                variants={animations.cardVariants}
                custom={index}
              >
                <TestimonialCard {...testimonial} />
              </motion.div>
            ))}
          </MasonryLayout>
        </div>
      </div>
    </motion.section>
  );
};

export default Testimonials;
