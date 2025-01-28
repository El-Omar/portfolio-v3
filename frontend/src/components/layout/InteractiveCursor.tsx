import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  trailSmoothingFactor: 4,
  disableTrailClasses: ["no-trail", "disable-trail"],

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

  const [position, setPosition] = useState<Position>({
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
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const pointsRef = useRef<Point[]>([]);
  const requestRef = useRef<number>();
  const [ripples, setRipples] = useState<Point[]>([]);

  const handleRippleClick = useCallback(
    (e: MouseEvent) => {
      if (hoverState.isHovering) {
        return;
      }

      const newRipple: Point = {
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now(),
      };

      setRipples((prev) => [...prev, newRipple]);
    },
    [hoverState.isHovering],
  );

  useEffect(() => {
    window.addEventListener("click", handleRippleClick);

    return () => {
      window.removeEventListener("click", handleRippleClick);
    };
  }, [handleRippleClick]);

  // Remove ripples
  useEffect(() => {
    ripples.forEach((ripple) => {
      const timeoutId = setTimeout(() => {
        setRipples((currentRipples) =>
          currentRipples.filter((r) => r.timestamp !== ripple.timestamp),
        );
      }, 400); // Match this with CSS animation duration

      return () => clearTimeout(timeoutId);
    });
  }, [ripples]);

  useEffect(() => {
    if (canvasRef.current) {
      ctxRef.current = canvasRef.current.getContext("2d");
    }
  }, []);

  const handleElementInteraction = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      let interactiveElement = null;

      const isTrailDisabled = target.closest(
        config.disableTrailClasses.map((c) => `.${c}`).join(","),
      );

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
          isHovering: !!isTrailDisabled,
          elementType: null,
          attraction: { x: 0, y: 0 },
        });
        setCursorScale(1);
      }
    },
    [
      config.magneticStrength,
      config.cursorHoverScale,
      config.disableTrailClasses,
    ],
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
      // Smooth the points using a moving average
      const smoothPoints = [];
      const smoothingFactor = config.trailSmoothingFactor;

      for (let i = 0; i < pointsRef.current.length; i++) {
        let avgX = 0;
        let avgY = 0;
        let count = 0;

        // Calculate weighted average of nearby points
        for (
          let j = Math.max(0, i - smoothingFactor);
          j < Math.min(pointsRef.current.length, i + smoothingFactor + 1);
          j++
        ) {
          const weight = 1 - Math.abs(i - j) / (smoothingFactor + 1);
          avgX += pointsRef.current[j].x * weight;
          avgY += pointsRef.current[j].y * weight;
          count += weight;
        }

        smoothPoints.push({
          x: avgX / count,
          y: avgY / count,
          timestamp: pointsRef.current[i].timestamp,
        });
      }

      // Start a new path for the trail
      ctx.beginPath();
      ctx.moveTo(smoothPoints[0].x, smoothPoints[0].y);

      // Create gradient for the trail using smoothed points
      const gradient = ctx.createLinearGradient(
        smoothPoints[0].x,
        smoothPoints[0].y,
        smoothPoints[smoothPoints.length - 1].x,
        smoothPoints[smoothPoints.length - 1].y,
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

      // Draw smooth curve through points
      for (let i = 1; i < smoothPoints.length - 2; i++) {
        const xc = (smoothPoints[i].x + smoothPoints[i + 1].x) / 2;
        const yc = (smoothPoints[i].y + smoothPoints[i + 1].y) / 2;

        const progress = i / smoothPoints.length;
        ctx.lineWidth = Math.max(
          config.trailMaxWidth * (1 - progress),
          config.trailMinWidth,
        );

        // Use quadratic curves for smoother lines
        ctx.quadraticCurveTo(smoothPoints[i].x, smoothPoints[i].y, xc, yc);
      }

      // Handle the last two points
      if (smoothPoints.length > 2) {
        const last = smoothPoints.length - 1;
        const secondLast = smoothPoints.length - 2;
        ctx.quadraticCurveTo(
          smoothPoints[secondLast].x,
          smoothPoints[secondLast].y,
          smoothPoints[last].x,
          smoothPoints[last].y,
        );
      }

      ctx.stroke();

      // Clean up old points
      const now = Date.now();
      pointsRef.current = pointsRef.current
        .filter((point) => now - point.timestamp < config.trailLifetime)
        .slice(0, config.trailMaxPoints);

      if (pointsRef.current.length > 0) {
        requestRef.current = requestAnimationFrame(animate);
      }
    }
    // Continue animation if we have points and not hovering
    else if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = undefined;
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
        className="pointer-events-none fixed inset-0 overflow-hidden"
        style={{ zIndex: config.zIndex }}
      >
        {ripples.map((ripple) => (
          <div
            key={ripple.timestamp}
            className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cool-red opacity-50"
            style={{
              left: ripple.x,
              top: ripple.y,
              animation: "ripple 0.4s ease-out forwards",
              zIndex: config.zIndex,
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
