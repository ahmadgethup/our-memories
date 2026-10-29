"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type MouseSpark = {
  id: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  size: number;
  rotate: number;
  duration: number;
  symbol: string;
};

export default function MouseMagic() {
  const [sparks, setSparks] = useState<MouseSpark[]>([]);
  const lastSparkRef = useRef(0);
  const sparkIdRef = useRef(0);

  useEffect(() => {
    const root = document.documentElement;
    const symbols = ["♥", "♡", "✦", "•"];

    const createSpark = (x: number, y: number) => {
      const id = sparkIdRef.current++;
      const duration = 850 + Math.random() * 500;
      const spark: MouseSpark = {
        id,
        x,
        y,
        tx: (Math.random() - 0.5) * 90,
        ty: -35 - Math.random() * 70,
        size: 9 + Math.random() * 13,
        rotate: (Math.random() - 0.5) * 120,
        duration,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
      };

      setSparks((prev) => [...prev.slice(-26), spark]);
      window.setTimeout(() => {
        setSparks((prev) => prev.filter((item) => item.id !== id));
      }, duration);
    };

    const onMove = (e: MouseEvent) => {
      root.style.setProperty("--mouse-x", `${e.clientX}px`);
      root.style.setProperty("--mouse-y", `${e.clientY}px`);
      root.style.setProperty("--mouse-active", "1");

      const now = performance.now();
      if (now - lastSparkRef.current > 38) {
        lastSparkRef.current = now;
        createSpark(e.clientX, e.clientY);
      }
    };

    const onLeave = () => {
      root.style.setProperty("--mouse-active", "0");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      root.style.removeProperty("--mouse-x");
      root.style.removeProperty("--mouse-y");
      root.style.removeProperty("--mouse-active");
    };
  }, []);

  return (
    <>
      <div className="mouse-spotlight" aria-hidden />
      <div className="mouse-glow" aria-hidden />
      <div className="mouse-ring" aria-hidden />
      <div className="mouse-magic-layer" aria-hidden>
        {sparks.map((spark) => (
          <span
            key={spark.id}
            className="mouse-spark"
            style={
              {
                left: spark.x,
                top: spark.y,
                fontSize: `${spark.size}px`,
                "--float-x": `${spark.tx}px`,
                "--float-y": `${spark.ty}px`,
                "--spark-rotate": `${spark.rotate}deg`,
                "--spark-duration": `${spark.duration}ms`,
              } as CSSProperties
            }
          >
            {spark.symbol}
          </span>
        ))}
      </div>
      <MouseMagicStyles />
    </>
  );
}

function MouseMagicStyles() {
  return (
    <style jsx global>{`
      :root {
        --mouse-x: 50vw;
        --mouse-y: 50vh;
        --mouse-active: 0;
      }

      .mouse-spotlight {
        position: fixed;
        inset: 0;
        z-index: 2;
        pointer-events: none;
        opacity: var(--mouse-active);
        transition: opacity 0.35s ease;
        background: radial-gradient(
          520px circle at var(--mouse-x) var(--mouse-y),
          rgba(255, 77, 109, 0.17),
          rgba(255, 143, 171, 0.07) 26%,
          transparent 58%
        );
        mix-blend-mode: screen;
      }

      .mouse-glow,
      .mouse-ring {
        position: fixed;
        left: var(--mouse-x);
        top: var(--mouse-y);
        pointer-events: none;
        z-index: 260;
        opacity: var(--mouse-active);
        transform: translate(-50%, -50%);
        transition: opacity 0.2s ease;
      }

      .mouse-glow {
        width: 34px;
        height: 34px;
        border-radius: 9999px;
        background: radial-gradient(
          circle,
          rgba(255, 225, 235, 0.95),
          rgba(255, 77, 109, 0.38) 38%,
          transparent 70%
        );
        filter: blur(1px);
        box-shadow: 0 0 24px rgba(255, 77, 109, 0.75),
          0 0 70px rgba(201, 24, 74, 0.45);
        animation: cursorBreath 1.7s ease-in-out infinite;
        mix-blend-mode: screen;
      }

      .mouse-ring {
        width: 52px;
        height: 52px;
        border-radius: 9999px;
        border: 1px solid rgba(255, 180, 205, 0.38);
        box-shadow: inset 0 0 18px rgba(255, 77, 109, 0.12),
          0 0 22px rgba(255, 77, 109, 0.18);
        animation: cursorRing 1.15s ease-in-out infinite;
      }

      .mouse-magic-layer {
        position: fixed;
        inset: 0;
        z-index: 255;
        pointer-events: none;
        overflow: hidden;
      }

      .mouse-spark {
        position: fixed;
        transform: translate(-50%, -50%);
        color: rgba(255, 205, 220, 0.95);
        text-shadow: 0 0 12px rgba(255, 77, 109, 0.95),
          0 0 30px rgba(201, 24, 74, 0.55);
        animation: sparkFloat var(--spark-duration)
          cubic-bezier(0.16, 1, 0.3, 1) forwards;
        will-change: transform, opacity, filter;
      }

      @keyframes cursorBreath {
        0%,
        100% {
          transform: translate(-50%, -50%) scale(0.86);
        }
        50% {
          transform: translate(-50%, -50%) scale(1.12);
        }
      }

      @keyframes cursorRing {
        0% {
          transform: translate(-50%, -50%) scale(0.65);
          opacity: calc(var(--mouse-active) * 0.9);
        }
        100% {
          transform: translate(-50%, -50%) scale(1.25);
          opacity: 0;
        }
      }

      @keyframes sparkFloat {
        0% {
          opacity: 0;
          filter: blur(1px);
          transform: translate(-50%, -50%) scale(0.25) rotate(0deg);
        }
        12% {
          opacity: 1;
          filter: blur(0);
        }
        100% {
          opacity: 0;
          filter: blur(1px);
          transform: translate(
              calc(-50% + var(--float-x)),
              calc(-50% + var(--float-y))
            )
            scale(1.15) rotate(var(--spark-rotate));
        }
      }

      @media (hover: none), (prefers-reduced-motion: reduce) {
        .mouse-spotlight,
        .mouse-glow,
        .mouse-ring,
        .mouse-magic-layer {
          display: none;
        }
      }
    `}</style>
  );
}
