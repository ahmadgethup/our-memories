"use client";

import { useEffect } from "react";
import type { Memory } from "../types";
import { IconClose } from "./icons";

export default function MemoryLightbox({
  memory,
  onClose,
}: {
  memory: Memory;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose}>
          <IconClose size={20} />
        </button>
        <div className="lightbox-img-wrap">
          <img
            src={memory.image_url}
            alt={memory.title}
            className="lightbox-img"
          />
          <div className="lightbox-img-glow" />
        </div>
        <div className="lightbox-info">
          <h2 className="lightbox-title">{memory.title}</h2>
          {memory.description && (
            <p className="lightbox-desc">{memory.description}</p>
          )}
          <p className="lightbox-date">
            {new Date(memory.created_at).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
      <LightboxStyles />
    </div>
  );
}

function LightboxStyles() {
  return (
    <style jsx global>{`
      .lightbox-overlay {
        position: fixed;
        inset: 0;
        z-index: 200;
        background: rgba(5, 0, 10, 0.92);
        backdrop-filter: blur(20px);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1.5rem;
        animation: lbIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) both;
      }
      @keyframes lbIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      .lightbox-inner {
        position: relative;
        max-width: 900px;
        width: 100%;
        max-height: 92vh;
        display: flex;
        flex-direction: column;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 130, 160, 0.2);
        border-radius: 28px;
        overflow: hidden;
        animation: lbScale 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
        box-shadow: 0 0 120px rgba(201, 24, 74, 0.25),
          0 60px 120px rgba(0, 0, 0, 0.6);
      }
      @keyframes lbScale {
        from {
          transform: scale(0.9) translateY(30px);
          opacity: 0;
        }
        to {
          transform: none;
          opacity: 1;
        }
      }
      .lightbox-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        z-index: 10;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid rgba(255, 130, 160, 0.3);
        background: rgba(13, 0, 5, 0.7);
        color: rgba(255, 200, 220, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s;
        backdrop-filter: blur(10px);
      }
      .lightbox-close:hover {
        background: rgba(201, 24, 74, 0.3);
        border-color: rgba(255, 77, 109, 0.6);
        color: #fff;
        transform: rotate(90deg);
      }
      .lightbox-img-wrap {
        position: relative;
        flex: 1;
        min-height: 0;
        max-height: 75vh;
        overflow: hidden;
        background: rgba(0, 0, 0, 0.35);
      }
      .lightbox-img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
        display: block;
        background: rgba(0, 0, 0, 0.3);
      }
      .lightbox-img-glow {
        position: absolute;
        inset: 0;
        pointer-events: none;
        background: radial-gradient(
          ellipse at center,
          transparent 60%,
          rgba(201, 24, 74, 0.08)
        );
      }
      .lightbox-info {
        padding: 1.5rem 2rem;
        border-top: 1px solid rgba(255, 130, 160, 0.1);
        background: rgba(13, 0, 5, 0.5);
      }
      .lightbox-title {
        font-family: "Cormorant Garamond", serif;
        font-size: 1.8rem;
        font-weight: 300;
        color: #fff;
        margin-bottom: 0.4rem;
      }
      .lightbox-desc {
        font-size: 0.88rem;
        color: rgba(255, 200, 220, 0.6);
        line-height: 1.7;
        margin-bottom: 0.5rem;
      }
      .lightbox-date {
        font-size: 0.75rem;
        color: rgba(255, 130, 160, 0.5);
        letter-spacing: 0.05em;
      }
    `}</style>
  );
}
