"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { Fragment } from "react";

const LAYERS = [
  { color: "bg-red-300", delay: 0.1 },
  { color: "bg-cool-red", delay: 0.2 },
  { color: "bg-primary", delay: 0.3 },
];

const STRIPES = 4;

const LanguageAnimation = () => {
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <Fragment>
      {LAYERS.map((layer, layerIndex) => (
        <div key={layerIndex} className="fixed inset-0 z-40">
          {[...Array(STRIPES)].map((_, index) => (
            <motion.div
              key={index}
              initial={{
                x: isRTL ? "100%" : "-100%",
                top: `${(index / STRIPES) * 100}%`,
                height: `${100 / STRIPES}%`,
              }}
              animate={{ x: isRTL ? "-100%" : "100%" }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
                delay: layer.delay + index * 0.1,
              }}
              className={`absolute w-full ${layer.color}`}
            />
          ))}
        </div>
      ))}
    </Fragment>
  );
};

export default LanguageAnimation;
