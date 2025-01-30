import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useIsMobile } from "@/lib/hooks/useIsMobile";

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

const coolRed = "rgb(240, 87, 74)";

// Default configuration values
const defaultConfig = {
  // Cursor properties
  cursorSize: 20,
  cursorColor: "rgb(17, 24, 39)",
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
  ringWidth: 1,
  ringBaseOpacity: 0.7,
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const pointsRef = useRef<Point[]>([]);
  const requestRef = useRef<number>();
  const blobRef = useRef<HTMLDivElement>(null);
  const ripplesRef = useRef<Point[]>([]);
  const lastMoveTimestamp = useRef(0);
  const mousePositionRef = useRef<Position>({
    x: -100,
    y: -100,
  });

  const [hoverState, setHoverState] = useState<HoverState>({
    isHovering: false,
    elementType: null,
    attraction: { x: 0, y: 0 },
    cursorScale: 1,
  });

  const config: ConfigType = useMemo(() => {
    return { ...defaultConfig, ...userConfig };
  }, [userConfig]);

  const gradientCache = useMemo(() => {
    return {
      colors: {
        start: config.cursorColor
          .replace("rgb", "rgba")
          .replace(")", `, ${config.trailStartOpacity})`),
        end: config.cursorColor
          .replace("rgb", "rgba")
          .replace(")", `, ${config.trailEndOpacity})`),
      },
      gradient: null as CanvasGradient | null,
      lastPoints: new Float32Array(4), // Store last points used for gradient
    };
  }, [config]);

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

      ripplesRef.current.push(newRipple);
    },
    [hoverState.isHovering],
  );

  const handleElementInteraction = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const selector = [
        "a",
        "button",
        "input",
        ".magnetic",
        ...config.disableTrailClasses.map((c) => `.${c}`),
      ].join(",");

      const interactiveElement = target.closest(selector);

      if (!interactiveElement) {
        setHoverState({
          isHovering: false,
          elementType: null,
          attraction: { x: 0, y: 0 },
          cursorScale: 1,
        });

        return;
      }

      const isTrailDisabled = config.disableTrailClasses.some((c) =>
        interactiveElement.classList.contains(c),
      );

      if (isTrailDisabled) {
        setHoverState({
          isHovering: false,
          elementType: null,
          attraction: { x: 0, y: 0 },
          cursorScale: 1,
        });
        return;
      }

      const rect = interactiveElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const attraction = {
        x: (centerX - e.clientX) * config.magneticStrength,
        y: (centerY - e.clientY) * config.magneticStrength,
      };

      setHoverState({
        isHovering: true,
        elementType: interactiveElement.classList.contains("magnetic")
          ? "magnetic"
          : interactiveElement.tagName.toLowerCase(),
        attraction,
        cursorScale: config.cursorHoverScale,
      });
    },
    [
      config.disableTrailClasses,
      config.magneticStrength,
      config.cursorHoverScale,
    ],
  );

  const stopAnimation = useCallback(() => {
    cancelAnimationFrame(requestRef.current!);
    requestRef.current = undefined;
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!ctx || !canvas) {
      return;
    }

    if (Date.now() - lastMoveTimestamp.current > 100) {
      stopAnimation();
      return;
    }

    console.log(pointsRef.current.length);
    if (pointsRef.current.length === 0) {
      stopAnimation();
      return;
    }

    requestRef.current = requestAnimationFrame(animate);

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

      // Create gradient for the trail using smoothed points
      gradientCache.gradient = ctx.createLinearGradient(
        smoothPoints[0].x,
        smoothPoints[0].y,
        smoothPoints[smoothPoints.length - 1].x,
        smoothPoints[smoothPoints.length - 1].y,
      );

      gradientCache.gradient.addColorStop(0, gradientCache.colors.start);
      gradientCache.gradient.addColorStop(1, gradientCache.colors.end);

      ctx.beginPath();
      ctx.strokeStyle = gradientCache.gradient!;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.moveTo(smoothPoints[0].x, smoothPoints[0].y);

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
    }
    // Continue animation if we have points and not hovering
    else if (requestRef.current) {
      stopAnimation();
    }
  }, [
    config.trailMaxWidth,
    config.trailMinWidth,
    config.trailSmoothingFactor,
    gradientCache,
    hoverState.isHovering,
    stopAnimation,
  ]);

  const startAnimation = useCallback(
    () => requestAnimationFrame(animate),
    [animate],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      lastMoveTimestamp.current = Date.now();

      startAnimation();
      handleElementInteraction(e);

      const currentX = e.clientX;
      const currentY = e.clientY;

      const currentPos = {
        x: currentX + hoverState.attraction.x,
        y: currentY + hoverState.attraction.y,
      };

      mousePositionRef.current = { x: currentX, y: currentY };

      // TODO: updateCursor comment do

      if (blobRef.current) {
        blobRef.current.animate(
          {
            left: `${currentX}px`,
            top: `${currentY}px`,
          },
          { duration: 3000, fill: "forwards" },
        );
      }

      const newPoint: Point = {
        x: currentPos.x,
        y: currentPos.y,
        timestamp: Date.now(),
      };

      pointsRef.current.unshift(newPoint);

      if (pointsRef.current.length > config.trailMaxPoints) {
        pointsRef.current.pop();
      }
    },
    [
      handleElementInteraction,
      hoverState.attraction.x,
      hoverState.attraction.y,
      config.trailMaxPoints,
      startAnimation,
    ],
  );

  // Remove ripples
  useEffect(() => {
    ripplesRef.current.forEach((ripple) => {
      const timeoutId = setTimeout(() => {
        ripplesRef.current = ripplesRef.current.filter(
          (r) => r.timestamp !== ripple.timestamp,
        );
      }, 600);

      return () => clearTimeout(timeoutId);
    });
  }, [ripplesRef]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    ctxRef.current = canvasRef.current.getContext("2d");

    const handleResize = () => {
      canvasRef.current!.width = window.innerWidth;
      canvasRef.current!.height = window.innerHeight;
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleRippleClick);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleRippleClick);
      stopAnimation();
    };
  }, [handleMouseMove, handleRippleClick, stopAnimation]);

  console.log(hoverState.isHovering);

  return (
    <>
      <style jsx global>{`
        #blob {
          background-color: white;
          height: 34vmax;
          aspect-ratio: 1;
          position: absolute;
          left: 50%;
          top: 50%;
          translate: -50% -50%;
          border-radius: 50%;
          background: linear-gradient(to right, #ffc100, ${coolRed});
          animation: rotate 20s infinite;
          opacity: 0.1;
        }
        #blur {
          height: 100%;
          width: 100%;
          position: absolute;
          z-index: 2;
          backdrop-filter: blur(12vmax);
        }

        @keyframes rotate {
          from {
            rotate: 0deg;
          }

          50% {
            scale: 1 1.5;
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
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 pointer-events-none ${className || ""}`}
        style={{ zIndex: config.zIndex }}
      />
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        style={{ zIndex: config.zIndex }}
      >
        {ripplesRef.current.map((ripple) => (
          <div
            key={ripple.timestamp}
            className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary opacity-50"
            style={{
              left: ripple.x,
              top: ripple.y,
              animation: "ripple 0.6s ease-out forwards",
              zIndex: config.zIndex,
            }}
          />
        ))}
      </div>
      <div
        className="fixed pointer-events-none"
        style={{
          zIndex: config.zIndex,
          left: mousePositionRef.current.x,
          top: mousePositionRef.current.y,
          transform: `translate(-50%, -50%) scale(${hoverState.cursorScale})`,
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
          {hoverState.isHovering && (
            <>
              {/* Main cursor dot */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  backgroundColor: config.cursorColor,
                  opacity: config.cursorBaseOpacity,
                  transition: `all ${config.magneticTransitionDuration}s ease`,
                }}
              />
              {/* Inner ring */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: `${config.ringWidth}px solid ${config.cursorColor}`,
                  opacity: config.ringHoverOpacity,
                  transform: `scale(${config.ringHoverScale})`,
                  transition: `all ${config.magneticTransitionDuration}s ease`,
                }}
              />
            </>
          )}
        </div>
      </div>
      <div className="fixed inset-0 h-screen w-screen">
        <div id="blob" ref={blobRef} />
        <div id="blur" />
      </div>
    </>
  );
};

const Wrapper = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return null;
  }

  return <CursorWithTrail />;
};

export default Wrapper;
