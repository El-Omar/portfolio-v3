import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import throttle from "@/lib/utils/throttle";

type Point = {
  x: number;
  y: number;
  timestamp: number;
};

type CursorPosition = {
  x: number;
  y: number;
};

type HoverState = {
  isHovering: boolean;
  elementType: string | null;
  attraction: {
    x: number;
    y: number;
  };
};

// Default configuration values
const defaultConfig = {
  // Cursor properties
  cursorSize: 20,
  cursorColor: "rgb(240, 87, 74)",
  cursorHoverScale: 1.5,
  cursorBaseOpacity: 0.6,

  // Trail properties
  trailMaxPoints: 50,
  trailMaxWidth: 24,
  trailMinWidth: 6,
  trailLifetime: 150, // milliseconds
  trailStartOpacity: 0.8,
  trailEndOpacity: 0,

  // Magnetic properties
  magneticStrength: 0.3,
  magneticTransitionDuration: 0.3, // seconds

  // Glow properties
  glowSize: 1.5,
  glowHoverSize: 2,
  glowOpacity: 0.2,

  // Ring properties
  ringWidth: 2,
  ringBaseOpacity: 0.5,
  ringHoverOpacity: 0.8,
  ringHoverScale: 1.2,

  // Z-index and general
  zIndex: 9999,
} as const;

type ConfigType = typeof defaultConfig;

type Props = {
  className?: string;
} & Partial<ConfigType>;

const CursorWithTrail: React.FC<Props> = ({ className, ...userConfig }) => {
  const config: ConfigType = useMemo(() => {
    return { ...defaultConfig, ...userConfig };
  }, [userConfig]);

  const [position, setPosition] = useState<CursorPosition>({
    x: -100,
    y: -100,
  });
  const [cursorScale, setCursorScale] = useState(1);
  const [hoverState, setHoverState] = useState<HoverState>({
    isHovering: false,
    elementType: null,
    attraction: { x: 0, y: 0 },
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const requestRef = useRef<number>();

  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      ctxRef.current = canvasRef.current.getContext("2d");
    }
  }, []);

  const handleElementInteraction = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      let interactiveElement = null;

      const isLink = target.closest("a");
      const isButton = target.closest("button");
      const isInput = target.closest("input");
      const isMagnetic = target.closest(".magnetic");

      if (isLink || isButton || isInput || isMagnetic) {
        interactiveElement = isLink || isButton || isInput || isMagnetic;
      }

      if (interactiveElement) {
        const rect = interactiveElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const attraction = {
          x: (centerX - e.clientX) * config.magneticStrength,
          y: (centerY - e.clientY) * config.magneticStrength,
        };

        setHoverState({
          isHovering: true,
          elementType: isMagnetic
            ? "magnetic"
            : isLink
              ? "link"
              : isButton
                ? "button"
                : "input",
          attraction,
        });
        setCursorScale(config.cursorHoverScale);
      } else {
        setHoverState({
          isHovering: false,
          elementType: null,
          attraction: { x: 0, y: 0 },
        });
        setCursorScale(1);
      }
    },
    [config.magneticStrength, config.cursorHoverScale],
  );

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;

    if (!ctx || !canvas) {
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Check if we have enough points and not hovering
    if (pointsRef.current.length > 1 && !hoverState.isHovering) {
      // Start a new path for the trail
      ctx.beginPath();
      ctx.moveTo(pointsRef.current[0].x, pointsRef.current[0].y);

      // Create gradient for the trail
      const gradient = ctx.createLinearGradient(
        pointsRef.current[0].x,
        pointsRef.current[0].y,
        pointsRef.current[pointsRef.current.length - 1].x,
        pointsRef.current[pointsRef.current.length - 1].y,
      );

      gradient.addColorStop(
        0,
        `${config.cursorColor.replace("rgb", "rgba").replace(")", `, ${config.trailStartOpacity})`)}`,
      );
      gradient.addColorStop(
        1,
        `${config.cursorColor.replace("rgb", "rgba").replace(")", `, ${config.trailEndOpacity})`)}`,
      );

      ctx.strokeStyle = gradient;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Draw the trail with varying width
      for (let i = 1; i < pointsRef.current.length; i++) {
        const point = pointsRef.current[i];
        const progress = i / pointsRef.current.length;

        // Calculate line width based on position in trail
        ctx.lineWidth = Math.max(
          config.trailMaxWidth * (1 - progress),
          config.trailMinWidth,
        );

        ctx.lineTo(point.x, point.y);
      }

      ctx.stroke();

      // Clean up old points
      const now = Date.now();
      pointsRef.current = pointsRef.current
        .filter((point) => now - point.timestamp < config.trailLifetime)
        .slice(0, config.trailMaxPoints);
    }

    // Continue animation if we have points and not hovering
    if (pointsRef.current.length > 0 && !hoverState.isHovering) {
      requestRef.current = requestAnimationFrame(animate);
    }
  }, [config, hoverState.isHovering]);

  const startAnimation = useCallback(() => {
    requestAnimationFrame(animate);
  }, [animate]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      handleElementInteraction(e);

      const currentPos = {
        x: e.clientX + hoverState.attraction.x,
        y: e.clientY + hoverState.attraction.y,
      };

      const newPoint: Point = {
        x: currentPos.x,
        y: currentPos.y,
        timestamp: Date.now(),
      };

      pointsRef.current.unshift(newPoint);
      setPosition(currentPos);
      startAnimation();
    },
    [handleElementInteraction, hoverState.attraction, startAnimation],
  );

  const throttledMouseMove = useMemo(
    () => throttle(handleMouseMove, 16),
    [handleMouseMove],
  );

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const dpr = window.devicePixelRatio || 1;
        canvasRef.current.width = window.innerWidth * dpr;
        canvasRef.current.height = window.innerHeight * dpr;

        const ctx = ctxRef.current;
        if (ctx) {
          ctx.scale(dpr, dpr);
        }
      }
    };

    handleResize();
    window.addEventListener("mousemove", throttledMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", throttledMouseMove);
      window.removeEventListener("resize", handleResize);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [throttledMouseMove]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 pointer-events-none ${className || ""}`}
        style={{ zIndex: config.zIndex }}
      />
      <div
        className="fixed pointer-events-none"
        style={{
          zIndex: config.zIndex,
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${cursorScale})`,
          transition: `transform ${config.magneticTransitionDuration}s ease`,
        }}
      >
        <div
          className="relative"
          style={{
            width: config.cursorSize,
            height: config.cursorSize,
          }}
        >
          {/* Main cursor dot */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              backgroundColor: hoverState.isHovering
                ? "transparent"
                : config.cursorColor,
              opacity: config.cursorBaseOpacity,
              transition: `all ${config.magneticTransitionDuration}s ease`,
            }}
          />
          {/* Outer glow */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              transform: `scale(${hoverState.isHovering ? config.glowHoverSize : config.glowSize})`,
              background: `radial-gradient(circle, ${config.cursorColor.replace("rgb", "rgba").replace(")", `, ${config.glowOpacity})`)} 0%, transparent 70%)`,
              transition: `all ${config.magneticTransitionDuration}s ease`,
            }}
          />
          {/* Inner ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: `${config.ringWidth}px solid ${config.cursorColor}`,
              opacity: hoverState.isHovering
                ? config.ringHoverOpacity
                : config.ringBaseOpacity,
              transform: `scale(${hoverState.isHovering ? config.ringHoverScale : 1})`,
              transition: `all ${config.magneticTransitionDuration}s ease`,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CursorWithTrail;
