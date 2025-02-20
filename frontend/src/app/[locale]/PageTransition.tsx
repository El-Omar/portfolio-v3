"use client";

import { motion } from "framer-motion";
import { ReactElement, ReactNode } from "react";
import { usePathname } from "@/i18n/routing";

type Props = {
  children: ReactNode;
};

const PageTransition = ({ children }: Props): ReactElement => {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{
        opacity: 0,
        filter: "blur(3px) grayscale(100%)",
      }}
      animate={{
        opacity: 1,
        filter: "blur(0px) grayscale(0%)",
        transition: {
          duration: 0.3,
          ease: "easeOut",
        },
      }}
      exit={{
        opacity: 0,
        filter: "blur(3px) grayscale(100%)",
        transition: {
          duration: 0.2,
          ease: "easeIn",
        },
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
