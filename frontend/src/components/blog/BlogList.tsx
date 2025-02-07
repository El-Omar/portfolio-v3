"use client";

import { BlogResponse } from "@portfolio-v3/shared";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ReactElement, useMemo, useRef } from "react";
import BlogCard from "./BlogCard";
import { Button } from "../ui/Button";
import Container from "../ui/Container";
import Paragraph from "../ui/Paragraph";
import Title from "../ui/Title";
import TitleAccent from "../ui/TitleAccent";
import { Link } from "@/i18n/routing";

type Props = {
  blogs: BlogResponse[];
};

const BlogList = ({ blogs }: Props): ReactElement => {
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
            staggerChildren: 0.1,
            duration: 0.8,
            ease: easing,
          },
        },
      },

      titleVariants: {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: easing,
          },
        },
      },

      buttonVariants: {
        hidden: { opacity: 0, x: 20 },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.6,
            ease: easing,
            delay: 0.3,
          },
        },
      },

      cardVariants: {
        hidden: { opacity: 0, y: 40 },
        visible: (index: number) => ({
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: easing,
            delay: 0.4 + index * 0.1,
          },
        }),
      },
    };
  }, []);

  return (
    <Container>
      <motion.article
        ref={containerRef}
        variants={animations.containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full py-32"
      >
        <div className="px-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-20 mb-16">
            <motion.div
              variants={animations.titleVariants}
              className="flex-1 space-y-6"
            >
              <Title>
                Writing about <br />
                <TitleAccent>nothing & everything</TitleAccent>
              </Title>
              <Paragraph className="text-neutral-600 dark:text-neutral-400 max-w-xl">
                Here&apos;s where I explore storytelling and share some
                fragments of random thoughts; sometimes about tech, mostly about
                life.
              </Paragraph>
            </motion.div>

            <motion.div
              variants={animations.buttonVariants}
              className="flex-1 flex justify-end"
            >
              <Button variant="fancy" asChild>
                <Link href="/blog">
                  View all posts <ArrowRight />
                </Link>
              </Button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                variants={animations.cardVariants}
                custom={index}
                className="h-full"
              >
                <BlogCard blog={blog} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.article>
    </Container>
  );
};

export default BlogList;
