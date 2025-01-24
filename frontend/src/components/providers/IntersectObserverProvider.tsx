"use client";

import { Observer } from "tailwindcss-intersect";
import { useEffect } from "react";

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
}

export default IntersectObserverProvider;