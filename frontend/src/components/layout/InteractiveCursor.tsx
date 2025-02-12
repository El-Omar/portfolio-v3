import { MousePointer } from "lucide-react";
import { motion, MotionValue, useMotionValue, useSpring } from "motion/react";
import { ReactElement, useCallback, useEffect, useRef } from "react";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import throttle from "@/lib/utils/throttle";

type FramerPoint = {
  x: MotionValue<number>;
  y: MotionValue<number>;
};

type CursorRef = {
  element: HTMLDivElement | null;
  position: FramerPoint;
  rotation: MotionValue<number>;
};

const CursorWithDot = (): ReactElement => {
  const cursorRef = useRef<CursorRef>({
    element: null,
    position: { x: useMotionValue(0), y: useMotionValue(0) },
    rotation: useMotionValue(0),
  });

  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };

  const animatedMouse = {
    x: useSpring(cursorRef.current.position.x, smoothOptions),
    y: useSpring(cursorRef.current.position.y, smoothOptions),
  };

  const handleElementInteraction = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const selector = ["a", "button", "input", ".magnetic"].join(",");
    const interactiveElement = target.closest(selector);

    const cursor = cursorRef.current;
    let cursorSize = 16;

    if (!interactiveElement) {
      cursor.element?.classList.remove("hovered");
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

    // So for future me that will be confused, the -45 is
    // to offset the svg pointer icon's default rotation
    const angle = Math.atan2(distance.y, distance.x) * (180 / Math.PI) - 45;

    cursorSize = 36;
    cursor.element?.classList.add("hovered");
    cursor.rotation.set(angle);
    cursor.position.x.set(e.clientX - cursorSize / 2);
    cursor.position.y.set(e.clientY - cursorSize / 2);
  }, []);

  const throttledMouseMove = useRef(
    throttle((e: MouseEvent) => {
      handleElementInteraction(e);
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
          from {
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
          }
        }
      `}</style>
      {/* Cursor */}
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
          className="absolute
            group w-4 aspect-square [&.hovered]:w-9
            origin-center bg-transparent flex items-center justify-center"
        >
          <div
            className={`
              flex items-center justify-center
              pointer-events-none absolute rounded-full bg-primary
              w-4 aspect-square transition-all duration-200	ease-[cubic-bezier(0.25,0.1,0.25,1)]
              group-[.hovered]:opacity-70 group-[.hovered]:w-9`}
          >
            <MousePointer
              size={16}
              className="hidden group-[.hovered]:block stroke-gold fill-gold"
            />
          </div>
        </motion.div>
      </div>
      {/* Blob */}
      <div className="fixed inset-0 h-screen w-screen">
        <motion.div
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
            opacity-[0.075]`}
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
