"use client";
export default function AppStyles() {
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
      .hidden {
        display: none !important;
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

      html {
        scroll-behavior: auto;
      }
      .app-root {
        min-height: 100vh;
        font-family: "DM Sans", sans-serif;
        background: radial-gradient(
          ellipse at 20% 10%,
          #2a0018 0%,
          #0d0005 55%
        );
        color: #fff;
        position: relative;
        overflow-x: hidden;
        overflow-y: visible;
        opacity: 1;
        transform: none;
      }
      .app-enter {
        opacity: 1;
        transform: none;
      }
      .app-visible {
        opacity: 1;
      }
      @keyframes appIn {
        from {
          opacity: 0;
          transform: scale(0.98);
        }
        to {
          opacity: 1;
          transform: none;
        }
      }

      /* Orbs */
      .orb {
        position: fixed;
        border-radius: 9999px;
        filter: blur(90px);
        pointer-events: none;
        z-index: 0;
      }
      .orb-1 {
        width: 800px;
        height: 800px;
        background: radial-gradient(
          circle,
          rgba(201, 24, 74, 0.18),
          transparent 70%
        );
        top: -350px;
        left: -250px;
        animation: orbFloat1 16s ease-in-out infinite;
      }
      .orb-2 {
        width: 600px;
        height: 600px;
        background: radial-gradient(
          circle,
          rgba(255, 105, 150, 0.14),
          transparent 70%
        );
        bottom: -200px;
        right: -150px;
        animation: orbFloat2 20s ease-in-out infinite;
      }
      .orb-3 {
        width: 400px;
        height: 400px;
        background: radial-gradient(
          circle,
          rgba(180, 0, 60, 0.1),
          transparent 70%
        );
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: orbFloat3 25s ease-in-out infinite;
      }
      @keyframes orbFloat1 {
        0%,
        100% {
          transform: translate(0, 0);
        }
        50% {
          transform: translate(80px, 100px);
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
          transform: translate(-50%, -50%) scale(1);
        }
        50% {
          transform: translate(-50%, -50%) scale(1.3);
        }
      }

      /* ── HEADER ── */
      .app-header {
        position: sticky;
        top: 0;
        z-index: 50;
        background: rgba(13, 0, 5, 0.8);
        backdrop-filter: blur(30px);
        border-bottom: 1px solid rgba(255, 130, 160, 0.1);
        padding: 1.25rem 1.5rem 0;
      }
      .header-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.25rem;
        max-width: 1100px;
        margin-inline: auto;
      }
      .header-brand {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      .mini-heart {
        width: 42px;
        height: 42px;
        filter: drop-shadow(0 0 12px rgba(255, 77, 109, 0.5));
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
      .header-eyebrow {
        font-size: 0.58rem;
        letter-spacing: 0.22em;
        color: rgba(255, 130, 160, 0.55);
      }
      .header-title {
        font-family: "Cormorant Garamond", serif;
        font-size: 2.1rem;
        font-weight: 400;
        line-height: 1;
        color: #fff;
      }

      .lock-back-btn {
        display: flex;
        align-items: center;
        gap: 0.45rem;
        padding: 0.55rem 1.1rem;
        border-radius: 14px;
        border: 1px solid rgba(255, 130, 160, 0.18);
        background: rgba(255, 255, 255, 0.04);
        color: rgba(255, 200, 220, 0.6);
        font-family: "DM Sans", sans-serif;
        font-size: 0.8rem;
        cursor: pointer;
        transition: all 0.25s;
      }
      .lock-back-btn:hover {
        background: rgba(255, 130, 160, 0.08);
        border-color: rgba(255, 130, 160, 0.35);
        color: #fff;
        transform: translateY(-1px);
      }

      /* Tab nav */
      .tab-nav {
        display: flex;
        gap: 0.2rem;
        max-width: 1100px;
        margin-inline: auto;
        overflow-x: auto;
      }
      .tab-btn {
        position: relative;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.7rem 1.3rem;
        border: none;
        background: transparent;
        font-family: "DM Sans", sans-serif;
        font-size: 0.85rem;
        font-weight: 400;
        color: rgba(255, 200, 220, 0.45);
        cursor: pointer;
        white-space: nowrap;
        border-radius: 12px 12px 0 0;
        transition: color 0.2s, background 0.2s;
      }
      .tab-btn:hover {
        color: rgba(255, 200, 220, 0.85);
        background: rgba(255, 255, 255, 0.04);
      }
      .tab-active {
        color: #fff !important;
        background: rgba(255, 255, 255, 0.07) !important;
      }
      .tab-icon {
        display: flex;
        align-items: center;
        opacity: 0.8;
      }
      .tab-active .tab-icon {
        opacity: 1;
        color: #ff4d6d;
      }
      .tab-pip {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 28px;
        height: 2px;
        border-radius: 2px;
        background: linear-gradient(90deg, #c9184a, #ff4d6d);
        animation: pipIn 0.25s ease both;
        box-shadow: 0 0 8px rgba(255, 77, 109, 0.6);
      }
      @keyframes pipIn {
        from {
          width: 0;
          opacity: 0;
        }
        to {
          width: 28px;
          opacity: 1;
        }
      }

      /* ── MAIN ── */
      .app-main {
        position: relative;
        z-index: 10;
        max-width: 1100px;
        margin: 0 auto;
        padding: 2.5rem 1.5rem 5rem;
      }

      /* Fade up */
      .fade-up {
        opacity: 1;
        transform: none;
      }
      @keyframes fadeUp {
        from {
          opacity: 0;
          transform: translateY(24px);
        }
        to {
          opacity: 1;
          transform: none;
        }
      }

      /* ── HOME ── */
      .home-hero {
        text-align: center;
        padding: 3rem 1rem 2rem;
      }
      .home-hero-heart {
        width: 90px;
        height: 90px;
        margin: 0 auto 1.75rem;
        filter: drop-shadow(0 0 30px rgba(255, 77, 109, 0.5));
        animation: heroHeartFloat 4s ease-in-out infinite;
      }
      @keyframes heroHeartFloat {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-8px);
        }
      }
      .home-hero-title {
        font-family: "Cormorant Garamond", serif;
        font-size: clamp(2.4rem, 5vw, 3.8rem);
        font-weight: 300;
        color: #fff;
        margin-bottom: 1rem;
        line-height: 1.1;
        text-shadow: 0 0 80px rgba(255, 100, 140, 0.3);
        animation: titleReveal 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
      }
      @keyframes titleReveal {
        from {
          opacity: 0;
          transform: translateY(20px);
          letter-spacing: 0.1em;
        }
        to {
          opacity: 1;
          transform: none;
          letter-spacing: normal;
        }
      }
      .home-hero-sub {
        color: rgba(255, 200, 220, 0.5);
        font-size: 0.95rem;
        line-height: 1.9;
        max-width: 520px;
        margin: 0 auto;
        animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
      }
      .hero-line {
        width: 60px;
        height: 1px;
        margin: 2rem auto 0;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 77, 109, 0.6),
          transparent
        );
        animation: heroLineGrow 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both;
      }
      @keyframes heroLineGrow {
        from {
          width: 0;
          opacity: 0;
        }
        to {
          width: 60px;
          opacity: 1;
        }
      }

      /* Feature grid */
      .feature-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.2rem;
        margin-top: 3rem;
      }
      .feature-card {
        position: relative;
        overflow: hidden;
        padding: 2rem;
        border-radius: 28px;
        cursor: pointer;
        background: rgba(255, 255, 255, 0.035);
        border: 1px solid rgba(255, 130, 160, 0.1);
        backdrop-filter: blur(16px);
        transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
          box-shadow 0.35s;
        animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
      }
      .feature-card:hover {
        transform: translateY(-10px) scale(1.01);
        box-shadow: 0 30px 70px rgba(201, 24, 74, 0.25);
      }
      .feature-card:hover .feature-border-glow {
        opacity: 1;
      }
      .feature-card:hover .feature-arrow {
        transform: translateX(4px);
        opacity: 1;
      }
      .feature-card:hover .feature-icon-wrap {
        transform: scale(1.15) rotate(-5deg);
        color: #ff4d6d;
      }
      .feature-card:active {
        transform: translateY(-6px) scale(0.99);
      }

      .feature-icon-wrap {
        color: rgba(255, 130, 160, 0.7);
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        transition: transform 0.3s, color 0.3s;
      }
      .feature-title {
        font-family: "Cormorant Garamond", serif;
        font-size: 1.5rem;
        font-weight: 400;
        color: #fff;
        margin-bottom: 0.5rem;
      }
      .feature-desc {
        font-size: 0.83rem;
        color: rgba(255, 200, 220, 0.45);
        line-height: 1.75;
      }
      .feature-arrow {
        margin-top: 1.25rem;
        font-size: 1rem;
        color: rgba(255, 77, 109, 0.7);
        opacity: 0;
        transition: all 0.3s;
      }
      .feature-shine {
        position: absolute;
        inset: 0;
        pointer-events: none;
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.06) 0%,
          transparent 50%
        );
      }
      .feature-border-glow {
        position: absolute;
        inset: -1px;
        border-radius: 29px;
        background: linear-gradient(
          135deg,
          rgba(255, 77, 109, 0.3),
          transparent 60%,
          rgba(201, 24, 74, 0.2)
        );
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.35s;
        z-index: -1;
      }

      /* Home recent sections */
      .home-recent {
        margin-top: 3.5rem;
      }
      .home-section-header {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        margin-bottom: 1.2rem;
      }
      .home-section-title {
        font-family: "Cormorant Garamond", serif;
        font-size: 1.6rem;
        font-weight: 300;
        color: #fff;
      }
      .home-section-link {
        font-size: 0.78rem;
        color: rgba(255, 77, 109, 0.7);
        background: none;
        border: none;
        cursor: pointer;
        font-family: "DM Sans", sans-serif;
        transition: color 0.2s, transform 0.2s;
      }
      .home-section-link:hover {
        color: #ff4d6d;
        transform: translateX(3px);
      }

      /* Memory thumbnails */
      .home-memories-strip {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1rem;
      }
      .home-memory-thumb {
        position: relative;
        border-radius: 20px;
        overflow: hidden;
        height: 180px;
        cursor: pointer;
        border: 1px solid rgba(255, 130, 160, 0.1);
        animation: fadeUp 0.5s ease both;
        transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
          box-shadow 0.35s;
      }
      .home-memory-thumb:hover {
        transform: translateY(-6px) scale(1.02);
        box-shadow: 0 24px 60px rgba(201, 24, 74, 0.3);
      }
      .home-memory-thumb:hover .home-thumb-overlay {
        opacity: 1;
      }
      .home-memory-thumb:hover .home-thumb-img {
        transform: none;
      }
      .home-memory-thumb:hover .home-thumb-shimmer {
        animation: shimmerMove 0.8s ease forwards;
      }

      .home-thumb-img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
        background: rgba(0, 0, 0, 0.35);
        transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .home-thumb-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          to top,
          rgba(13, 0, 5, 0.85) 0%,
          transparent 50%
        );
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        padding: 1rem;
        opacity: 0.7;
        transition: opacity 0.3s;
      }
      .home-thumb-title {
        font-family: "Cormorant Garamond", serif;
        font-size: 1rem;
        color: #fff;
        font-weight: 300;
      }
      .home-thumb-expand {
        color: rgba(255, 200, 220, 0.7);
        display: flex;
        align-items: center;
        transition: transform 0.2s;
      }
      .home-memory-thumb:hover .home-thumb-expand {
        transform: scale(1.3);
      }
      .home-thumb-shimmer {
        position: absolute;
        inset: 0;
        pointer-events: none;
        background: linear-gradient(
          105deg,
          transparent 40%,
          rgba(255, 255, 255, 0.06) 50%,
          transparent 60%
        );
        background-size: 200% 100%;
        background-position: -200%;
      }
      @keyframes shimmerMove {
        to {
          background-position: 200%;
        }
      }

      /* Notes strip */
      .home-notes-strip {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 1rem;
      }
      .home-note-preview {
        position: relative;
        padding: 1.5rem 1.5rem 1.25rem;
        border-radius: 20px;
        cursor: pointer;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 130, 160, 0.1);
        animation: fadeUp 0.5s ease both;
        transition: transform 0.3s, box-shadow 0.3s;
        overflow: hidden;
      }
      .home-note-preview:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 50px rgba(201, 24, 74, 0.18);
      }
      .home-note-quote {
        font-family: "Cormorant Garamond", serif;
        font-size: 5rem;
        line-height: 0.8;
        color: rgba(255, 77, 109, 0.15);
        position: absolute;
        top: 0.2rem;
        left: 1rem;
      }
      .home-note-text {
        font-family: "Cormorant Garamond", serif;
        font-size: 1rem;
        font-style: italic;
        color: rgba(255, 220, 230, 0.75);
        line-height: 1.75;
        padding-top: 1.25rem;
      }
      .home-note-date {
        font-size: 0.72rem;
        color: rgba(255, 130, 160, 0.4);
        margin-top: 0.75rem;
        letter-spacing: 0.04em;
      }

      /* Plans strip */
      .home-plans-strip {
        display: flex;
        flex-direction: column;
        gap: 0.7rem;
      }
      .home-plan-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1.1rem 1.4rem;
        border-radius: 16px;
        cursor: pointer;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 130, 160, 0.08);
        animation: fadeUp 0.5s ease both;
        transition: transform 0.3s, box-shadow 0.3s, background 0.3s;
      }
      .home-plan-item:hover {
        background: rgba(255, 255, 255, 0.05);
        transform: translateX(6px);
        box-shadow: 0 8px 30px rgba(201, 24, 74, 0.12);
      }
      .home-plan-item:hover .home-plan-arrow {
        opacity: 1;
        transform: translateX(4px);
      }
      .home-plan-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        flex-shrink: 0;
        background: linear-gradient(135deg, #c9184a, #ff4d6d);
        box-shadow: 0 0 10px rgba(255, 77, 109, 0.6);
        animation: planDotPulse 2s ease-in-out infinite;
      }
      @keyframes planDotPulse {
        0%,
        100% {
          box-shadow: 0 0 10px rgba(255, 77, 109, 0.6);
        }
        50% {
          box-shadow: 0 0 20px rgba(255, 77, 109, 0.9);
        }
      }
      .home-plan-title {
        font-family: "Cormorant Garamond", serif;
        font-size: 1.05rem;
        color: #fff;
        margin-bottom: 0.15rem;
      }
      .home-plan-date {
        font-size: 0.72rem;
        color: rgba(255, 130, 160, 0.45);
      }
      .home-plan-arrow {
        margin-left: auto;
        color: rgba(255, 77, 109, 0.5);
        opacity: 0;
        transition: all 0.3s;
        font-size: 1rem;
      }

      /* Stats */
      .stats-row {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 3rem;
        flex-wrap: wrap;
      }
      .stat-pill {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
        padding: 1.2rem 2.5rem;
        border-radius: 24px;
        background: rgba(201, 24, 74, 0.1);
        border: 1px solid rgba(201, 24, 74, 0.2);
        min-width: 110px;
        overflow: hidden;
        transition: transform 0.3s, box-shadow 0.3s;
        animation: statAppear 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
      }
      .stat-pill:hover {
        transform: translateY(-4px);
        box-shadow: 0 16px 40px rgba(201, 24, 74, 0.25);
      }
      .stat-value {
        font-family: "Cormorant Garamond", serif;
        font-size: 2.4rem;
        font-weight: 300;
        color: #ff4d6d;
        line-height: 1;
        text-shadow: 0 0 30px rgba(255, 77, 109, 0.4);
      }
      .stat-label {
        font-size: 0.7rem;
        color: rgba(255, 200, 220, 0.45);
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }
      .stat-glow {
        position: absolute;
        inset: 0;
        pointer-events: none;
        background: radial-gradient(
          circle at 50% 0%,
          rgba(255, 77, 109, 0.15),
          transparent 70%
        );
        animation: statGlowPulse 3s ease-in-out infinite;
      }
      @keyframes statGlowPulse {
        0%,
        100% {
          opacity: 0.5;
        }
        50% {
          opacity: 1;
        }
      }
      @keyframes statAppear {
        from {
          opacity: 0;
          transform: translateY(20px) scale(0.9);
        }
        to {
          opacity: 1;
          transform: none;
        }
      }

      /* ── TAB PANEL ── */
      .tab-panel {
        display: grid;
        grid-template-columns: 360px 1fr;
        gap: 1.75rem;
      }
      @media (max-width: 860px) {
        .tab-panel {
          grid-template-columns: 1fr;
        }
      }

      /* Form card */
      .form-card {
        padding: 2.25rem;
        border-radius: 32px;
        background: rgba(255, 255, 255, 0.035);
        border: 1px solid rgba(255, 130, 160, 0.12);
        backdrop-filter: blur(24px);
        height: fit-content;
        position: sticky;
        top: 120px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: formCardIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
      }
      @keyframes formCardIn {
        from {
          opacity: 0;
          transform: translateX(-20px);
        }
        to {
          opacity: 1;
          transform: none;
        }
      }
      .form-title {
        font-family: "Cormorant Garamond", serif;
        font-size: 1.6rem;
        font-weight: 300;
        color: #fff;
        margin-bottom: 1.5rem;
      }

      .field {
        width: 100%;
        margin-bottom: 0.85rem;
        padding: 0.95rem 1.2rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 130, 160, 0.18);
        border-radius: 16px;
        color: #fff;
        font-family: "DM Sans", sans-serif;
        font-size: 0.88rem;
        outline: none;
        resize: none;
        transition: border-color 0.3s, box-shadow 0.3s, background 0.3s;
      }
      .field::placeholder {
        color: rgba(255, 180, 200, 0.3);
      }
      .field:focus {
        border-color: rgba(255, 77, 109, 0.55);
        box-shadow: 0 0 0 3px rgba(201, 24, 74, 0.1),
          0 0 20px rgba(201, 24, 74, 0.08);
        background: rgba(255, 255, 255, 0.07);
      }
      .field-ta {
        min-height: 120px;
      }
      .tall {
        min-height: 190px;
      }
      .field[type="date"] {
        color-scheme: dark;
      }

      .file-label {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 0.85rem;
        padding: 0.95rem 1.2rem;
        background: rgba(255, 255, 255, 0.04);
        border: 1px dashed rgba(255, 130, 160, 0.22);
        border-radius: 16px;
        cursor: pointer;
        font-size: 0.84rem;
        color: rgba(255, 180, 200, 0.45);
        transition: all 0.3s;
      }
      .file-label:hover {
        border-color: rgba(255, 77, 109, 0.45);
        color: rgba(255, 200, 220, 0.75);
        background: rgba(255, 255, 255, 0.06);
      }
      .file-label-icon {
        flex-shrink: 0;
        opacity: 0.6;
      }

      .submit-btn {
        width: 100%;
        padding: 1rem;
        background: linear-gradient(135deg, #c9184a, #ff4d6d);
        border: none;
        border-radius: 16px;
        cursor: pointer;
        font-family: "DM Sans", sans-serif;
        font-size: 0.9rem;
        font-weight: 500;
        color: #fff;
        transition: transform 0.25s, box-shadow 0.25s;
        box-shadow: 0 8px 28px rgba(201, 24, 74, 0.38);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        letter-spacing: 0.02em;
      }
      .submit-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 36px rgba(201, 24, 74, 0.48);
      }
      .submit-btn:active {
        transform: translateY(0);
      }
      .submit-btn:disabled {
        opacity: 0.5;
        transform: none;
      }
      .spinner {
        width: 18px;
        height: 18px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top-color: #fff;
        border-radius: 50%;
        animation: spin 0.7s linear infinite;
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      /* ── MEMORY CARDS ── */
      .cards-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1.2rem;
        align-content: start;
      }
      .memory-card {
        position: relative;
        border-radius: 26px;
        overflow: hidden;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 130, 160, 0.1);
        transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
          box-shadow 0.35s;
        animation: fadeUp 0.5s ease both;
      }
      .memory-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 28px 60px rgba(201, 24, 74, 0.25);
      }
      .memory-card:hover .memory-card-glow {
        opacity: 1;
      }
      .memory-img-wrap {
        position: relative;
        height: 280px;
        overflow: hidden;
        cursor: pointer;
        background: rgba(0, 0, 0, 0.35);
      }
      .memory-img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
        transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .memory-card:hover .memory-img {
        transform: none;
      }
      .memory-img-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          to top,
          rgba(13, 0, 5, 0.65),
          transparent 55%
        );
        transition: opacity 0.3s;
      }
      .memory-expand-hint {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        color: rgba(255, 255, 255, 0.9);
        font-size: 0.82rem;
        background: rgba(13, 0, 5, 0.45);
        opacity: 0;
        transition: opacity 0.3s;
        backdrop-filter: blur(2px);
      }
      .memory-img-wrap:hover .memory-expand-hint {
        opacity: 1;
      }
      .memory-body {
        padding: 1.25rem;
      }
      .memory-title {
        font-family: "Cormorant Garamond", serif;
        font-size: 1.2rem;
        font-weight: 400;
        color: #fff;
        margin-bottom: 0.35rem;
      }
      .memory-desc {
        font-size: 0.81rem;
        color: rgba(255, 200, 220, 0.45);
        line-height: 1.65;
        margin-bottom: 0.5rem;
      }
      .memory-date {
        font-size: 0.72rem;
        color: rgba(255, 130, 160, 0.45);
        margin-bottom: 0.85rem;
        letter-spacing: 0.03em;
      }
      .memory-card-glow {
        position: absolute;
        inset: 0;
        pointer-events: none;
        border-radius: 26px;
        background: linear-gradient(
          135deg,
          rgba(255, 77, 109, 0.06),
          transparent 60%
        );
        opacity: 0;
        transition: opacity 0.3s;
      }

      /* ── NOTES ── */
      .notes-list {
        display: flex;
        flex-direction: column;
        gap: 1.1rem;
        align-content: start;
      }
      .note-card {
        position: relative;
        padding: 1.9rem;
        border-radius: 26px;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 130, 160, 0.1);
        animation: fadeUp 0.5s ease both;
        transition: box-shadow 0.3s, transform 0.3s;
        overflow: hidden;
      }
      .note-card:hover {
        box-shadow: 0 16px 50px rgba(201, 24, 74, 0.18);
        transform: translateY(-3px);
      }
      .note-card:hover .note-line-accent {
        width: 100%;
      }
      .note-quote-mark {
        font-family: "Cormorant Garamond", serif;
        font-size: 5rem;
        line-height: 0.8;
        color: rgba(255, 77, 109, 0.15);
        position: absolute;
        top: 0.3rem;
        left: 1.2rem;
      }
      .note-text {
        font-family: "Cormorant Garamond", serif;
        font-size: 1.12rem;
        font-style: italic;
        line-height: 1.85;
        color: rgba(255, 220, 230, 0.82);
        padding-top: 1rem;
      }
      .note-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 1.1rem;
      }
      .note-date {
        font-size: 0.72rem;
        color: rgba(255, 130, 160, 0.38);
        letter-spacing: 0.05em;
      }
      .note-line-accent {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 1px;
        width: 30px;
        background: linear-gradient(90deg, #c9184a, #ff4d6d, transparent);
        transition: width 0.5s ease;
      }

      /* ── PLANS ── */
      .plans-list {
        display: flex;
        flex-direction: column;
        gap: 0.85rem;
        align-content: start;
      }
      .plan-card {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.35rem 1.6rem;
        border-radius: 22px;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 130, 160, 0.1);
        animation: fadeUp 0.5s ease both;
        transition: box-shadow 0.3s, transform 0.3s, background 0.3s;
      }
      .plan-card:hover {
        box-shadow: 0 12px 40px rgba(201, 24, 74, 0.18);
        transform: translateX(6px);
        background: rgba(255, 255, 255, 0.055);
      }
      .plan-left {
        display: flex;
        align-items: center;
        gap: 1.1rem;
      }
      .plan-dot {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        flex-shrink: 0;
        background: linear-gradient(135deg, #c9184a, #ff4d6d);
        box-shadow: 0 0 12px rgba(255, 77, 109, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        animation: planDotPulse 2s ease-in-out infinite;
      }
      .plan-dot-inner {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
      }
      @keyframes planDotPulse {
        0%,
        100% {
          box-shadow: 0 0 12px rgba(255, 77, 109, 0.7);
        }
        50% {
          box-shadow: 0 0 24px rgba(255, 77, 109, 1),
            0 0 40px rgba(201, 24, 74, 0.4);
        }
      }
      .plan-title {
        font-family: "Cormorant Garamond", serif;
        font-size: 1.12rem;
        font-weight: 400;
        color: #fff;
        margin-bottom: 0.15rem;
      }
      .plan-date {
        font-size: 0.75rem;
        color: rgba(255, 130, 160, 0.45);
      }

      /* Delete button */
      .delete-btn {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.4rem 0.9rem;
        border-radius: 12px;
        border: 1px solid rgba(255, 80, 80, 0.22);
        background: rgba(255, 80, 80, 0.05);
        color: rgba(255, 120, 120, 0.65);
        font-family: "DM Sans", sans-serif;
        font-size: 0.75rem;
        cursor: pointer;
        transition: all 0.22s;
        flex-shrink: 0;
      }
      .delete-btn:hover {
        background: rgba(255, 80, 80, 0.14);
        border-color: rgba(255, 80, 80, 0.45);
        color: #ff8080;
        transform: scale(1.05);
      }

      @keyframes shimmer {
        0% {
          background-position: -200%;
        }
        100% {
          background-position: 200%;
        }
      }

      /* FIX CONTENT STARTING BELOW THE SCREEN */

      html,
      body {
        margin: 0 !important;
        padding: 0 !important;
        scroll-behavior: auto !important;
      }

      .app-root {
        position: relative !important;
        min-height: 100dvh !important;
        height: auto !important;
        margin-top: 0 !important;
        padding-top: 0 !important;
        transform: none !important;
      }

      .app-header {
        position: relative !important;
        top: 0 !important;
      }

      .app-main {
        position: relative !important;
        margin-top: 0 !important;
        padding-top: 24px !important;
        transform: none !important;
      }

      .home-panel,
      .tab-panel {
        margin-top: 0 !important;
        transform: none !important;
      }

      .app-enter,
      .app-visible {
        animation: none !important;
        transform: none !important;
      }

      .fade-up {
        animation: none !important;
        transform: none !important;
      }
    `}</style>
  );
}
