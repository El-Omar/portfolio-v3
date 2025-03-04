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
};

const CursorWithDot = (): ReactElement => {
  const cursorRef = useRef<CursorRef>({
    element: null,
    position: { x: useMotionValue(-200), y: useMotionValue(-200) },
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

    cursorSize = 36;
    cursor.element?.classList.add("hovered");
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
    <div className="fixed inset-0 h-screen w-screen z-[9999] pointer-events-none">
      <motion.div
        ref={(el) => {
          cursorRef.current.element = el;
        }}
        style={{
          left: animatedMouse.x,
          top: animatedMouse.y,
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
              group-[.hovered]:opacity-30 group-[.hovered]:bg-gold group-[.hovered]:w-12`}
        ></div>
      </motion.div>
    </div>
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
