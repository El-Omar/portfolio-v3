"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type ParallaxTitleSectionProps = {
  title: ReactNode;
  children?: ReactNode;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
};

const ParallaxTitleSection = ({
  title,
  children,
  className = "",
  titleClassName = "",
  contentClassName = "",
}: ParallaxTitleSectionProps) => {
  const [isSticky, setIsSticky] = useState(false);
  const [reachedBottom, setReachedBottom] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) {
        return;
      }

      const containerRect = containerRef.current.getBoundingClientRect();

      // Check if we should stick the title
      const shouldStick = containerRect.top <= 0;
      const reachedBottom = containerRect.bottom <= window.innerHeight / 2;

      setReachedBottom(reachedBottom);

      // Check if we should stick the title
      setIsSticky(shouldStick && !reachedBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className={twMerge(`relative min-h-screen w-full`, className)}
    >
      <div
        className={twMerge(
          `pointer-events-none h-[50vh] flex items-center justify-center relative ${
            isSticky && !reachedBottom
              ? "fixed top-0 left-0 right-0"
              : ""
          } ${reachedBottom ? "absolute top-auto bottom-0 left-0 right-0" : ""} ${titleClassName}`
        )}
      >
        {title}
      </div>

      {/* Spacer div when title is sticky */}
      {(isSticky || reachedBottom) && <div className="w-full h-[50vh]" />}

      {/* Content area */}
      <div className={`relative ${contentClassName}`}>{children}</div>
    </section>
  );
};

export default ParallaxTitleSection;
