"use client";

import { useCallback, useRef, useState } from "react";
import ParticleCanvas from "./ParticleCanvas";
import MouseMagic from "./MouseMagic";
import HeartPulse from "./HeartPulse";

type UserName = "Tara" | "Ahmad";

export default function LockScreen({
  onUnlock,
}: {
  onUnlock: (name: UserName) => void;
}) {
  const [password, setPassword] = useState("");
  const [shake, setShake] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleLogin = useCallback(() => {
    // Identify the person from the entered password.
    const person: UserName | null =
      password === "2005/6/6"
        ? "Tara"
        : password === "2026/2/14"
        ? "Ahmad"
        : null;

    if (person) {
      setUnlocking(true);
      localStorage.setItem("access", "true");
      localStorage.setItem("our-memories-user", person);
      setTimeout(() => onUnlock(person), 900);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setPassword("");
    }
  }, [password, onUnlock]);

  return (
    <div className={`lock-screen ${unlocking ? "lock-exit" : "lock-enter"}`}>
      <ParticleCanvas count={100} />
      <MouseMagic />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="orb orb-4" />

      {/* Animated grid lines */}
      <div className="grid-lines" aria-hidden>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="grid-line"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </div>

      <div className="lock-card">
        <div className="deco-hearts" aria-hidden>
          {["♥", "♡", "♥", "♡", "♥", "♡"].map((h, i) => (
            <span key={i} className={`deco-h deco-h-${i}`}>
              {h}
            </span>
          ))}
        </div>

        <div className="logo-wrap">
          <div className="logo-ring logo-ring-outer" />
          <div className="logo-ring logo-ring-mid" />
          <div className="logo-ring logo-ring-inner" />
          <div className="logo-heart">
            <HeartPulse />
          </div>
        </div>

        <p className="lock-eyebrow">
          ✦ &nbsp; P R I V A T E &nbsp; S A N C T U A R Y &nbsp; ✦
        </p>
        <h1 className="lock-title">
          Our Little
          <br />
          World
        </h1>
        <p className="lock-sub">
          The key is hidden in the day the stars first learned her name.
        </p>

        <div className={`input-wrap ${shake ? "shake" : ""}`}>
          <input
            ref={inputRef}
            type="password"
            placeholder="Enter our special date…"
            className="lock-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
          <div className="input-shimmer" />
          <div className="input-border-glow" />
        </div>

        <button onClick={handleLogin} className="lock-btn">
          <span className="lock-btn-text">
            {unlocking ? "Opening…" : "Enter Our World"}
          </span>
          <span className="lock-btn-arrow">→</span>
          <div className="lock-btn-ripple" />
          <div className="lock-btn-glow" />
        </button>

        <p className="lock-hint">Made with ♥ just for us</p>
      </div>

      <LockStyles />
    </div>
  );
}

function LockStyles() {
  return (
    <style jsx global>{`
      @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap");

      *,
      *::before,
      *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      body {
        background: #0d0005;
      }

      @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
          animation-duration: 0.001ms !important;
          animation-delay: 0s !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.001ms !important;
        }
      }

      .lock-screen {
        position: fixed;
        inset: 0;
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
        background: radial-gradient(
          ellipse at 30% 20%,
          #2a0018 0%,
          #0d0005 60%
        );
        font-family: "DM Sans", sans-serif;
        overflow: hidden;
      }

      .lock-enter {
        animation: lockEnter 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      .lock-exit {
        animation: lockExit 0.9s cubic-bezier(0.7, 0, 0.84, 0) forwards;
      }

      @keyframes lockEnter {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      @keyframes lockExit {
        from {
          opacity: 1;
          transform: scale(1);
        }
        to {
          opacity: 0;
          transform: scale(1.08);
        }
      }

      /* Grid lines */
      .grid-lines {
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 1;
        display: flex;
        gap: 12.5%;
      }
      .grid-line {
        flex: 1;
        background: linear-gradient(
          to bottom,
          transparent,
          rgba(255, 130, 160, 0.03) 50%,
          transparent
        );
        animation: gridPulse 4s ease-in-out infinite;
      }
      @keyframes gridPulse {
        0%,
        100% {
          opacity: 0.3;
        }
        50% {
          opacity: 0.8;
        }
      }

      .orb {
        position: fixed;
        border-radius: 9999px;
        filter: blur(90px);
        pointer-events: none;
        z-index: 0;
      }
      .orb-1 {
        width: 700px;
        height: 700px;
        background: radial-gradient(
          circle,
          rgba(201, 24, 74, 0.3),
          transparent 70%
        );
        top: -300px;
        left: -250px;
        animation: orbFloat1 14s ease-in-out infinite;
      }
      .orb-2 {
        width: 600px;
        height: 600px;
        background: radial-gradient(
          circle,
          rgba(255, 105, 150, 0.2),
          transparent 70%
        );
        bottom: -200px;
        right: -200px;
        animation: orbFloat2 18s ease-in-out infinite;
      }
      .orb-3 {
        width: 400px;
        height: 400px;
        background: radial-gradient(
          circle,
          rgba(255, 20, 90, 0.15),
          transparent 70%
        );
        bottom: 100px;
        left: 100px;
        animation: orbFloat3 22s ease-in-out infinite;
      }
      .orb-4 {
        width: 300px;
        height: 300px;
        background: radial-gradient(
          circle,
          rgba(180, 0, 80, 0.1),
          transparent 70%
        );
        top: 30%;
        right: 10%;
        animation: orbFloat1 26s ease-in-out infinite reverse;
      }

      @keyframes orbFloat1 {
        0%,
        100% {
          transform: translate(0, 0);
        }
        50% {
          transform: translate(60px, 80px);
        }
      }
      @keyframes orbFloat2 {
        0%,
        100% {
          transform: translate(0, 0);
        }
        50% {
          transform: translate(-80px, -60px);
        }
      }
      @keyframes orbFloat3 {
        0%,
        100% {
          transform: translate(0, 0);
        }
        50% {
          transform: translate(40px, -70px);
        }
      }

      .lock-card {
        position: relative;
        z-index: 10;
        width: 100%;
        max-width: 460px;
        margin: 1rem;
        padding: 3.5rem 3rem;
        background: rgba(255, 255, 255, 0.025);
        border: 1px solid rgba(255, 130, 160, 0.15);
        border-radius: 36px;
        backdrop-filter: blur(60px);
        box-shadow: 0 0 100px rgba(201, 24, 74, 0.2),
          0 60px 100px rgba(0, 0, 0, 0.6),
          inset 0 1px 0 rgba(255, 255, 255, 0.06);
        text-align: center;
        animation: cardRise 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
      }
      @keyframes cardRise {
        from {
          opacity: 0;
          transform: translateY(50px) scale(0.94);
        }
        to {
          opacity: 1;
          transform: none;
        }
      }

      .deco-hearts {
        position: absolute;
        inset: 0;
        pointer-events: none;
        overflow: hidden;
        border-radius: 36px;
      }
      .deco-h {
        position: absolute;
        color: rgba(255, 100, 140, 0.2);
        animation: floatH 6s ease-in-out infinite;
      }
      .deco-h-0 {
        top: 10%;
        left: 6%;
        font-size: 1.2rem;
        animation-delay: 0s;
      }
      .deco-h-1 {
        top: 18%;
        right: 8%;
        font-size: 0.8rem;
        animation-delay: 1s;
      }
      .deco-h-2 {
        bottom: 20%;
        left: 10%;
        font-size: 1.5rem;
        animation-delay: 2s;
      }
      .deco-h-3 {
        bottom: 12%;
        right: 6%;
        font-size: 0.9rem;
        animation-delay: 0.5s;
      }
      .deco-h-4 {
        top: 45%;
        left: 4%;
        font-size: 0.7rem;
        animation-delay: 3s;
      }
      .deco-h-5 {
        top: 55%;
        right: 4%;
        font-size: 1rem;
        animation-delay: 1.5s;
      }
      @keyframes floatH {
        0%,
        100% {
          transform: translateY(0) rotate(-5deg);
        }
        50% {
          transform: translateY(-14px) rotate(8deg);
        }
      }

      .logo-wrap {
        position: relative;
        width: 100px;
        height: 100px;
        margin: 0 auto 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .logo-ring {
        position: absolute;
        inset: 0;
        border-radius: 50%;
        border: 1px solid rgba(255, 130, 160, 0.25);
        animation: ringPulse 3s ease-in-out infinite;
      }
      .logo-ring-outer {
        animation-delay: 0s;
      }
      .logo-ring-mid {
        inset: 10px;
        animation-delay: 0.6s;
        border-color: rgba(255, 130, 160, 0.4);
      }
      .logo-ring-inner {
        inset: 20px;
        animation-delay: 1.2s;
        border-color: rgba(255, 130, 160, 0.6);
      }
      @keyframes ringPulse {
        0%,
        100% {
          transform: scale(1);
          opacity: 0.5;
        }
        50% {
          transform: scale(1.1);
          opacity: 1;
        }
      }

      .logo-heart {
        width: 54px;
        height: 54px;
        z-index: 1;
      }
      .heart-beat {
        animation: hb 1.4s ease-in-out infinite;
        transform-origin: center;
      }
      @keyframes hb {
        0%,
        100% {
          transform: scale(1);
        }
        14% {
          transform: scale(1.18);
        }
        28% {
          transform: scale(1);
        }
        42% {
          transform: scale(1.1);
        }
        70% {
          transform: scale(1);
        }
      }

      .lock-eyebrow {
        font-family: "DM Sans", sans-serif;
        font-size: 0.6rem;
        letter-spacing: 0.22em;
        color: rgba(255, 130, 160, 0.6);
        margin-bottom: 0.8rem;
      }
      .lock-title {
        font-family: "Cormorant Garamond", serif;
        font-size: 3.4rem;
        font-weight: 300;
        color: #fff;
        line-height: 1.05;
        margin-bottom: 1rem;
        text-shadow: 0 0 60px rgba(255, 100, 140, 0.3);
      }
      .lock-sub {
        font-family: "DM Sans", sans-serif;
        font-size: 0.85rem;
        color: rgba(255, 200, 220, 0.5);
        line-height: 1.8;
        margin-bottom: 2.2rem;
      }

      .input-wrap {
        position: relative;
        margin-bottom: 1rem;
      }
      .lock-input {
        width: 100%;
        padding: 1.1rem 1.5rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 130, 160, 0.2);
        border-radius: 18px;
        color: #fff;
        font-family: "DM Sans", sans-serif;
        font-size: 0.9rem;
        outline: none;
        transition: border-color 0.3s, box-shadow 0.3s;
      }
      .lock-input::placeholder {
        color: rgba(255, 180, 200, 0.35);
      }
      .lock-input:focus {
        border-color: rgba(255, 130, 160, 0.6);
        box-shadow: 0 0 0 4px rgba(201, 24, 74, 0.12),
          0 0 30px rgba(201, 24, 74, 0.1);
      }
      .input-shimmer {
        position: absolute;
        inset: 0;
        border-radius: 18px;
        pointer-events: none;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.04),
          transparent
        );
        background-size: 200% 100%;
        animation: shimmer 3s ease-in-out infinite;
      }
      .input-border-glow {
        position: absolute;
        inset: -1px;
        border-radius: 19px;
        pointer-events: none;
        background: linear-gradient(
          135deg,
          rgba(255, 77, 109, 0.2),
          transparent,
          rgba(201, 24, 74, 0.2)
        );
        opacity: 0;
        transition: opacity 0.3s;
      }
      .input-wrap:focus-within .input-border-glow {
        opacity: 1;
      }
      @keyframes shimmer {
        0% {
          background-position: -200%;
        }
        100% {
          background-position: 200%;
        }
      }

      .shake {
        animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97);
      }
      @keyframes shake {
        10%,
        90% {
          transform: translateX(-2px);
        }
        20%,
        80% {
          transform: translateX(4px);
        }
        30%,
        50%,
        70% {
          transform: translateX(-5px);
        }
        40%,
        60% {
          transform: translateX(5px);
        }
      }

      .lock-btn {
        position: relative;
        width: 100%;
        padding: 1.1rem 1.5rem;
        overflow: hidden;
        background: linear-gradient(
          135deg,
          #c9184a 0%,
          #ff4d6d 50%,
          #c9184a 100%
        );
        background-size: 200% 100%;
        border: none;
        border-radius: 18px;
        cursor: pointer;
        font-family: "DM Sans", sans-serif;
        font-size: 0.92rem;
        font-weight: 500;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: transform 0.25s, box-shadow 0.25s;
        box-shadow: 0 8px 40px rgba(201, 24, 74, 0.45),
          0 2px 8px rgba(0, 0, 0, 0.3);
        animation: btnShift 4s ease-in-out infinite;
        margin-bottom: 1.75rem;
      }
      .lock-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 14px 50px rgba(201, 24, 74, 0.55),
          0 4px 16px rgba(0, 0, 0, 0.4);
      }
      @keyframes btnShift {
        0%,
        100% {
          background-position: 0%;
        }
        50% {
          background-position: 100%;
        }
      }
      .lock-btn-arrow {
        font-size: 1.2rem;
        transition: transform 0.3s;
      }
      .lock-btn:hover .lock-btn-arrow {
        transform: translateX(4px);
      }
      .lock-btn-ripple {
        position: absolute;
        inset: 0;
        pointer-events: none;
        background: radial-gradient(
          circle at var(--x, 50%) var(--y, 50%),
          rgba(255, 255, 255, 0.15) 0%,
          transparent 60%
        );
        opacity: 0;
        transition: opacity 0.3s;
      }
      .lock-btn:hover .lock-btn-ripple {
        opacity: 1;
      }
      .lock-btn-glow {
        position: absolute;
        inset: -2px;
        border-radius: 20px;
        background: linear-gradient(
          135deg,
          rgba(255, 77, 109, 0.4),
          transparent
        );
        opacity: 0;
        transition: opacity 0.3s;
        pointer-events: none;
      }
      .lock-btn:hover .lock-btn-glow {
        opacity: 1;
      }

      .lock-hint {
        font-size: 0.75rem;
        color: rgba(255, 180, 200, 0.3);
      }

      .splash {
        position: fixed;
        inset: 0;
        background: #0d0005;
      }
    `}</style>
  );
}
