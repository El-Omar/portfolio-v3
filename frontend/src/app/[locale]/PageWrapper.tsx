"use client";

import { useLocale } from "next-intl";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import Footer from "@/components/layout/Footer";
import LanguageAnimation from "@/components/layout/LanguageSwitcher/LanguageAnimation";
import Navigation from "@/components/layout/Navigation";
import BlobShape from "@/components/ui/BlobShape";

type Props = {
  children: ReactNode;
};

const PageWrapper = ({ children }: Props): ReactElement => {
  const [isAnimating, setIsAnimating] = useState(false);
  const locale = useLocale();

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
    <>
      {isAnimating && <LanguageAnimation />}
      <BlobShape />
      <Navigation isAnimating={isAnimating} setIsAnimating={setIsAnimating} />
      {children}
      <Footer />
    </>
  );
};

export default PageWrapper;
