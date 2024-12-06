import { useEffect, useState } from "react";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobileRegex =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;

      const userAgent = navigator.userAgent.toLowerCase();

      const isMobileViewport = window.matchMedia("(max-width: 768px)").matches;

      setIsMobile(mobileRegex.test(userAgent) && isMobileViewport);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};
