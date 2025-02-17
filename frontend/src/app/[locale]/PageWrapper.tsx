"use client";

import { LenisRef, ReactLenis } from "lenis/react";
import { cancelFrame, frame } from "motion/react";
import { ReactElement, ReactNode, useEffect, useRef } from "react";
import Footer from "@/components/layout/Footer";
import InteractiveCursor from "@/components/layout/InteractiveCursor";
import LanguageAnimation from "@/components/layout/LanguageSwitcher/LanguageAnimation";
import Navigation from "@/components/layout/Navigation";

type Props = {
  children: ReactNode;
};

const PageWrapper = ({ children }: Props): ReactElement => {
  const lenisRef = useRef<LenisRef>(null);

  const isAnimating = false;

  useEffect(() => {
    const update = (data: { timestamp: number }) => {
      const { timestamp } = data;
      lenisRef.current?.lenis?.raf(timestamp);
    };

    frame.update(update, true);

    return () => cancelFrame(update);
  }, []);

  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
      <div className="flex flex-col justify-between min-h-screen">
        <div
          className="relative w-full
            flex flex-col items-center"
        >
          <InteractiveCursor />
          {isAnimating && <LanguageAnimation />}
          <Navigation />
          <div className="z-10 relative pt-12 w-full flex flex-col items-center shadow-md rounded-b-2xl">
            {children}
          </div>
        </div>
        <Footer />
      </div>
    </ReactLenis>
  );
};

export default PageWrapper;
