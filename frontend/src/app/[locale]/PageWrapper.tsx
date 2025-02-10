"use client";

import { LenisRef, ReactLenis } from "lenis/react";
import { cancelFrame, frame } from "motion/react";
import { useLocale } from "next-intl";
import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import Footer from "@/components/layout/Footer";
import InteractiveCursor from "@/components/layout/InteractiveCursor";
import LanguageAnimation from "@/components/layout/LanguageSwitcher/LanguageAnimation";
import Navigation from "@/components/layout/Navigation";
import BlobShape from "@/components/ui/BlobShape";

type Props = {
  children: ReactNode;
};

const PageWrapper = ({ children }: Props): ReactElement => {
  const [isAnimating, setIsAnimating] = useState(false);
  const locale = useLocale();
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const update = (data: { timestamp: number }) => {
      const { timestamp } = data;
      lenisRef.current?.lenis?.raf(timestamp);
    };

    frame.update(update, true);

    return () => cancelFrame(update);
  }, []);

  // TODO: fix this
  // Reset animation state after it completes
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isAnimating, locale]);

  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
      <div className="flex flex-col justify-between min-h-screen">
        <div className="relative w-full flex flex-col items-center">
          <InteractiveCursor />
          {isAnimating && <LanguageAnimation />}
          <BlobShape />
          <Navigation
            isAnimating={isAnimating}
            setIsAnimating={setIsAnimating}
          />
          <div className="z-10 relative pt-24 w-full flex flex-col items-center shadow-md rounded-b-2xl">
            {children}
          </div>
        </div>
        <Footer />
      </div>
    </ReactLenis>
  );
};

export default PageWrapper;
