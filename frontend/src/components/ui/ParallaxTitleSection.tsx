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
  const [blur, setBlur] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [isSticky, setIsSticky] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const titleHeight = titleRef.current?.offsetHeight;

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !titleRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();

      // Calculate the scroll progress within the container
      const scrollProgress = 1 - containerRect.bottom / containerRect.height;

      // Apply blur based on scroll position
      const maxBlur = 10;
      const blurValue = Math.min(maxBlur * scrollProgress, maxBlur);
      setBlur(blurValue);

      // Calculate opacity
      const opacityValue = Math.max(1 - scrollProgress * 3, 0.2);
      setOpacity(opacityValue);

      // Check if we should stick the title
      const shouldStick = containerRect.top <= 0;

      // Check if we've reached the bottom of the container minus title height
      const reachedBottom = containerRect.bottom <= (titleHeight || 120) + 70;

      // Check if we should stick the title
      setIsSticky(shouldStick && !reachedBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [titleHeight]);

  return (
    <section
      ref={containerRef}
      className={twMerge(`relative min-h-screen w-full ${className}`)}
    >
      <div
        ref={titleRef}
        className={`text-4xl md:text-6xl h-[120px] font-dm-sans transition-all duration-75 ${
          isSticky
            ? "fixed top-36 left-0 right-0 z-10 px-4 py-6 backdrop-blur-sm"
            : "relative"
        } ${titleClassName}`}
        style={{
          filter: `blur(${blur}px)`,
          opacity,
        }}
      >
        {title}
      </div>

      {/* Spacer div when title is sticky */}
      {isSticky && titleHeight && <div className={`h-[${titleHeight}px]`} />}

      {/* Content area */}
      <div className={`relative mt-8 ${contentClassName}`}>{children}</div>
    </section>
  );
};

export default ParallaxTitleSection;
