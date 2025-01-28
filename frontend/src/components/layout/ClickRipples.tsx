"use client";

import { ReactElement, useCallback, useEffect, useState } from "react";

type Ripple = {
  x: number;
  y: number;
  id: number;
};

const ClickRipples = (): ReactElement => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = useCallback((e: MouseEvent) => {
    const newRipple: Ripple = {
      x: e.clientX,
      y: e.clientY,
      id: Date.now(),
    };

    setRipples((prev) => [...prev, newRipple]);
  }, []);

  useEffect(() => {
    // Add global click listener
    window.addEventListener("click", handleClick);

    return () => {
      // Clean up
      window.removeEventListener("click", handleClick);
    };
  }, [handleClick]);

  useEffect(() => {
    // Remove ripples after animation completes
    ripples.forEach((ripple) => {
      const timeoutId = setTimeout(() => {
        setRipples((currentRipples) =>
          currentRipples.filter((r) => r.id !== ripple.id),
        );
      }, 1000); // Match this with CSS animation duration

      return () => clearTimeout(timeoutId);
    });
  }, [ripples]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-[100]">
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cool-red opacity-50"
          style={{
            left: ripple.x,
            top: ripple.y,
            animation: "ripple 0.4s ease-out forwards",
          }}
        />
      ))}
      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: translate(-50%, -50%) scale(0.1);
            opacity: 0.5;
          }
          100% {
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ClickRipples;
