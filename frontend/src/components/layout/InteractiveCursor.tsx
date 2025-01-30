import { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import throttle from "@/lib/utils/throttle";

type Position = {
  x: number;
  y: number;
};

type Point = Position & {
  timestamp: number;
};

type HoverState = {
  isHovering: boolean;
  elementType: string | null;
  attraction: {
    x: number;
    y: number;
  };
  cursorScale: number;
};

const config = {
  magneticStrength: 0.3,
  cursorHoverScale: 1.5,
};

const CursorWithDot = (): ReactElement => {
  const blobRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<number[]>([]);
  const [ripples, setRipples] = useState<Point[]>([]);

  const hoverStateRef = useRef<HoverState>({
    isHovering: false,
    elementType: null,
    attraction: { x: 0, y: 0 },
    cursorScale: 1,
  });

  const handleRippleClick = useCallback((e: MouseEvent) => {
    if (hoverStateRef.current.isHovering) {
      return;
    }

    const newRipple: Point = {
      x: e.clientX,
      y: e.clientY,
      timestamp: Date.now(),
    };

    setRipples((prevRipples) => [...prevRipples, newRipple]);
  }, []);

  const handleElementInteraction = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const selector = ["a", "button", "input", ".magnetic"].join(",");

    const interactiveElement = target.closest(selector);

    if (!interactiveElement) {
      if (cursorRef.current) {
        cursorRef.current.classList.remove("hovered");
      }

      hoverStateRef.current = {
        isHovering: false,
        elementType: null,
        attraction: { x: 0, y: 0 },
        cursorScale: 1,
      };

      return;
    }

    const rect = interactiveElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const attraction = {
      x: (centerX - e.clientX) * config.magneticStrength,
      y: (centerY - e.clientY) * config.magneticStrength,
    };

    if (cursorRef.current) {
      cursorRef.current.classList.add("hovered");
    }

    hoverStateRef.current = {
      isHovering: true,
      elementType: interactiveElement.classList.contains("magnetic")
        ? "magnetic"
        : interactiveElement.tagName.toLowerCase(),
      attraction,
      cursorScale: config.cursorHoverScale,
    };
  }, []);

  const throttledMouseMove = useRef(
    throttle((e: MouseEvent) => {
      handleElementInteraction(e);
      const currentX = e.clientX;
      const currentY = e.clientY;

      if (blobRef.current) {
        blobRef.current.animate(
          {
            left: `${currentX}px`,
            top: `${currentY}px`,
          },
          { duration: 3000, fill: "forwards" },
        );
      }

      if (cursorRef.current) {
        cursorRef.current.animate(
          {
            left: `${currentX}px`,
            top: `${currentY}px`,
            transform: `translate(-50%, -50%) scale(${hoverStateRef.current.cursorScale})`,
          },
          { duration: 3000, fill: "forwards" },
        );
      }
    }, 16),
  );

  const handleMouseMove = useCallback((e: MouseEvent) => {
    throttledMouseMove.current(e);
  }, []);

  // Remove ripples
  useEffect(() => {
    ripples.forEach((ripple) => {
      const timeoutId = window.setTimeout(() => {
        setRipples((prevRipples) =>
          prevRipples.filter((r) => r.timestamp !== ripple.timestamp),
        );
      }, 600);
      timeoutsRef.current.push(timeoutId);
    });

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [ripples]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleRippleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleRippleClick);
    };
  }, [handleMouseMove, handleRippleClick]);

  return (
    <>
      <style jsx>{`
        .ripple {
          animation: ripple 0.6s ease-out forwards;
        }
        @keyframes rotate {
          from {
            rotate: 0deg;
          }

          50% {
            scale: 1 1.25;
          }

          to {
            rotate: 360deg;
          }
        }
        @keyframes ripple {
          0% {
            transform: translate(-50%, -50%) scale(0.1);
            opacity: 0.5;
          }
          100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }
      `}</style>
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-[9999]">
        {ripples.map((ripple) => (
          <div
            key={ripple.timestamp}
            className={`absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 
              rounded-full bg-primary opacity-50 ripple
              `}
            style={{
              left: ripple.x,
              top: ripple.y,
            }}
          />
        ))}
      </div>
      <div
        ref={cursorRef}
        className={`
          z-[9999]
          fixed pointer-events-none group transition-all duration-300
          opacity-80 group-[.hovered]:opacity-100
          -translate-x-1/2 -translate-y-1/2 scale-100 group-[.hovered]:scale-125`}
      >
        <div className="relative w-5 h-5">
          {/* Main cursor dot */}
          <div
            className={`
              absolute inset-0 rounded-full
              transition-all duration-300
              bg-primary group-[.hovered]:bg-cool-red
              opacity-100 group-[.hovered]:opacity-60
              `}
          />
          {/* Inner ring */}
          <div
            className={`
              absolute inset-0 rounded-full 
              border border-primary group-[.hovered]:border-cool-red
              transition-all duration-300
              opacity-70 group-[.hovered]:opacity-100
              transform scale-100 group-[.hovered]:scale-125`}
          />
        </div>
      </div>
      <div className="fixed inset-0 h-screen w-screen">
        <div
          ref={blobRef}
          className={`
          bg-white
          h-[34vmax]
          aspect-square
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-gradient-to-r from-[#ffc100] to-[rgb(240,87,74)]
          animate-[rotate_20s_infinite]
          opacity-10`}
        />
        <div className="h-full w-full absolute z-[2] backdrop-blur-[12vmax]" />
      </div>
    </>
  );
};

const InteractiveCursor = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return null;
  }

  return <CursorWithDot />;
};

export default InteractiveCursor;
