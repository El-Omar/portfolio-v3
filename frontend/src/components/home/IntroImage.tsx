"use client";

import Image from "next/image";
import React from "react";

const IntroImage = () => {
  return (
    <>
      <style jsx global>{`
        .intro__image {
          object-fit: cover;
          clip-path: path("M0 0 H460 V230 A230 230 0 0 1 0 230 Z");
        }

        @media (max-width: 1280px) {
          .intro__image {
            clip-path: path("M0 0 H300 V150 A150 150 0 0 1 0 150 Z");
          }
        }

        // @media (max-width: 768px) {
        //   .intro__image {
        //     clip-path: path("M0 0 H224 V112 A112 112 0 0 1 0 112 Z");
        //   }
        }
      `}</style>

      <Image
        src="/img/elomar-orange.png"
        alt="Elomar"
        className="intro__image absolute -top-10 scale-105"
        fill
      />
      <Image
        src="/img/elomar@2x.png"
        alt="Elomar"
        className="intro__image absolute -top-8 w-300"
        fill
      />
    </>
  );
};

export default IntroImage;
