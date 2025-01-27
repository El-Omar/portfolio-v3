"use client";

import { useEffect } from "react";
import { Observer } from "tailwindcss-intersect";

const IntersectObserverProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        Observer.start();
      } catch (error) {
        console.error("Failed to start intersection observer:", error);
      }
    }
  }, []);

  return <>{children}</>;
};

export default IntersectObserverProvider;
