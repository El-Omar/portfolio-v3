import {
  motion,
  MotionValue,
  transform,
  useMotionValue,
  useSpring,
} from "motion/react";
import { ReactElement, useCallback, useEffect, useRef } from "react";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import throttle from "@/lib/utils/throttle";

type FramerPoint = {
  x: MotionValue<number>;
  y: MotionValue<number>;
};

type CursorRef = {
  element: HTMLDivElement | null;
  scale: FramerPoint;
  position: FramerPoint;
  rotation: MotionValue<number>;
};

const CursorWithDot = (): ReactElement => {
  // const blobRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<CursorRef>({
    element: null,
    scale: { x: useMotionValue(1), y: useMotionValue(1) },
    position: { x: useMotionValue(0), y: useMotionValue(0) },
    rotation: useMotionValue(0),
  });

  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };

  const animatedMouse = {
    x: useSpring(cursorRef.current.position.x, smoothOptions),
    y: useSpring(cursorRef.current.position.y, smoothOptions),
  };

  const handleElementInteraction = useCallback((e: MouseEvent) => {
    let cursorSize = 16;
    const target = e.target as HTMLElement;
    const selector = ["a", "button", "input", ".magnetic"].join(",");

    const cursor = cursorRef.current;
    const interactiveElement = target.closest(selector);

    if (!interactiveElement) {
      cursor.element?.classList.remove("hovered");
      cursor.scale.x.set(1);
      cursor.scale.y.set(1);
      cursor.position.x.set(e.clientX - cursorSize / 2);
      cursor.position.y.set(e.clientY - cursorSize / 2);
      return;
    }

    const { width, height, left, top } =
      interactiveElement.getBoundingClientRect();

    const interactiveElementCenter = {
      x: left + width / 2,
      y: top + height / 2,
    };

    const distance = {
      x: e.clientX - interactiveElementCenter.x,
      y: e.clientY - interactiveElementCenter.y,
    };

    const angle = Math.atan2(distance.y, distance.x) * (180 / Math.PI);
    const absDistance = Math.max(Math.abs(distance.x), Math.abs(distance.y));

    const stretchPercentage = 0.06;
    const scaleX = transform(absDistance, [0, 100], [1, 1 + stretchPercentage]);
    const scaleY = transform(absDistance, [0, 100], [1, 1 - stretchPercentage]);

    cursorSize = 48;
    cursor.element?.classList.add("hovered");
    cursor.scale.x.set(scaleX);
    cursor.scale.y.set(scaleY);
    cursor.rotation.set(angle);

    cursor.position.x.set(interactiveElementCenter.x - cursorSize / 2);
    cursor.position.y.set(interactiveElementCenter.y - cursorSize / 2);
  }, []);

  const throttledMouseMove = useRef(
    throttle((e: MouseEvent) => {
      handleElementInteraction(e);
      // const cursor = cursorRef.current;
      // const currentX = e.clientX;
      // const currentY = e.clientY;

      // blobRef.current?.animate(
      //   {
      //     left: `${currentX}px`,
      //     top: `${currentY}px`,
      //   },
      //   { duration: 1000, fill: "forwards" }
      // );

      // if (cursor.element) {
      //   cursor.element.animate(
      //     {
      //       left: `${currentX}px`,
      //       top: `${currentY}px`,
      //       transform: `translate(-50%, -50%) scale(${cursor.scale.x}, ${cursor.scale.y})`,
      //     },
      //     { duration: 1000, fill: "forwards" },
      //   );
      // }
    }, 16),
  );

  const handleMouseMove = useCallback((e: MouseEvent) => {
    throttledMouseMove.current(e);
  }, []);
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <>
      <style jsx>{`
        @keyframes rotate {
          /* from {
            scale: 1 1;
            rotate: 0deg;
          }

          50% {
            scale: 1 1.05;
            rotate: 360deg;
          }

          to {
            scale: 1 1;
            rotate: 0deg;
          } */
        }
      `}</style>
      {/* Cursor */}
      {/* <div
        ref={(ref) => {
          cursorRef.current.element = ref;
        }}
        className={`
          z-[9999]
          fixed pointer-events-none group transition-all duration-300 group-[.hovered]:opacity-100
          -translate-x-1/2 -translate-y-1/2 scale-100 group-[.hovered]:scale-125`}
      >
        <div className="relative w-3 h-3">
          <div
            className={`
              absolute inset-0 rounded-full
              transition-all duration-300
              bg-primary group-[.hovered]:bg-cool-red
              opacity-100 group-[.hovered]:opacity-60
              `}
          />
          <div
            className={`
              absolute inset-0 rounded-full 
              border border-primary group-[.hovered]:border-cool-red
              transition-all duration-300
              opacity-70 group-[.hovered]:opacity-100
              transform scale-100 group-[.hovered]:scale-125`}
          />
        </div>
      </div> */}
      {/* Experimental */}
      <div className="fixed inset-0 h-screen w-screen z-[9999] pointer-events-none">
        <motion.div
          ref={(el) => {
            cursorRef.current.element = el;
          }}
          style={{
            left: animatedMouse.x,
            top: animatedMouse.y,
            rotate: cursorRef.current.rotation,
          }}
          className="absolute w-6 h-6 group
            origin-center bg-transparent flex items-center justify-center"
        >
          <motion.div
            style={{
              scaleX: cursorRef.current.scale.x,
              scaleY: cursorRef.current.scale.y,
            }}
            animate={
              {
                // width: cursorRef.current.size,
                // height: cursorRef.current.size,
                // backgroundColor: cursorRef.current.hovering ? "#e98d37" : "#000",
              }
            }
            className={`
              pointer-events-none absolute rounded-full w-4 aspect-square
              bg-primary transition-all duration-300	
              group-[.hovered]:bg-gradient-to-r from-[#ffc100] to-[rgb(240,87,74)] 
              group-[.hovered]:opacity-50 group-[.hovered]:w-12`}
          />
        </motion.div>
      </div>
      {/* Blob */}
      {/* <div className="fixed inset-0 h-screen w-screen">
        <motion.div
          ref={blobRef}
          style={{
            left: animatedMouse.x,
            top: animatedMouse.y,
          }}
          className={`
            h-[34vmax]
            aspect-square
            absolute
            -translate-x-1/2
            -translate-y-1/2
            origin-top-left
            rounded-full
            bg-gradient-to-r from-[#ffc100] to-[rgb(240,87,74)]
            animate-[rotate_5s_infinite]
            opacity-50`}
        />

        <div className="h-full w-full absolute z-[2] backdrop-blur-[12vmax]" />
      </div> */}
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
