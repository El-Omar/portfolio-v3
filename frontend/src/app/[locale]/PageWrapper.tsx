"use client";

import { LenisRef, ReactLenis } from "lenis/react";
import { cancelFrame, frame } from "motion/react";
import { ReactElement, ReactNode, useEffect, useRef } from "react";
import PageTransition from "./PageTransition";
import Footer from "@/components/layout/Footer";
import InteractiveCursor from "@/components/layout/InteractiveCursor";
import Navigation from "@/components/layout/Navigation";
import { usePathname } from "@/i18n/routing";

type Props = {
  children: ReactNode;
};

const PageWrapper = ({ children }: Props): ReactElement => {
  const lenisRef = useRef<LenisRef>(null);
  const pathname = usePathname();

  useEffect(() => {
    const update = (data: { timestamp: number }) => {
      const { timestamp } = data;
      lenisRef.current?.lenis?.raf(timestamp);
    };

    frame.update(update, true);

    return () => cancelFrame(update);
  }, []);

  useEffect(() => {
    lenisRef.current?.lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
      <div className="relative w-full flex flex-col justify-between min-h-screen items-center">
        <InteractiveCursor />
        <Navigation />
        <div className="z-10 relative pt-12 w-full flex flex-col items-center shadow-md rounded-b-2xl">
          <PageTransition>{children}</PageTransition>
        </div>
        <Footer />
      </div>
    </ReactLenis>
  );
};

export default PageWrapper;
