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

      /* ── OUR SOUNDTRACK ── */
      .soundtrack-page { display: flex; flex-direction: column; gap: 1.5rem; }
      .soundtrack-hero {
        min-height: 225px; position: relative; overflow: hidden; display: flex;
        align-items: center; justify-content: space-between; padding: 2.4rem 3rem;
        border-radius: 30px; border: 1px solid rgba(255, 190, 166, .16);
        background: radial-gradient(ellipse at 76% 45%, rgba(228, 116, 113, .22), transparent 38%),
          linear-gradient(118deg, rgba(57, 19, 34, .96), rgba(32, 13, 29, .94) 55%, rgba(72, 31, 39, .96));
        box-shadow: inset 0 1px rgba(255,255,255,.04), 0 24px 70px rgba(0,0,0,.19);
      }
      .soundtrack-hero-copy { position: relative; z-index: 2; max-width: 500px; }
      .soundtrack-kicker { display: block; color: rgba(255, 190, 166, .7); font-size: .64rem; letter-spacing: .2em; }
      .soundtrack-hero h2 { color: #fff3ea; font: 300 clamp(2.3rem, 5vw, 3.5rem)/1.05 "Cormorant Garamond", serif; margin: .65rem 0 .55rem; }
      .soundtrack-hero-copy p { color: rgba(255, 226, 214, .68); font-size: .88rem; }
      .soundtrack-hero-note { position: absolute; bottom: 1.25rem; left: 3rem; color: rgba(255, 202, 182, .54); font: italic 1rem "Cormorant Garamond", serif; letter-spacing: .04em; }
      .soundtrack-hero-note span { color: #ff8e9e; }
      .soundtrack-disc { width: 162px; height: 162px; flex: 0 0 auto; position: relative; z-index: 2; margin-right: 2.6rem; border-radius: 50%; display: grid; place-items: center; background: repeating-radial-gradient(circle, #311323 0 8px, #492037 9px 10px, #2d1121 11px 18px); box-shadow: 0 0 0 8px rgba(255,255,255,.025), 0 22px 48px rgba(0,0,0,.45); animation: soundtrackSpin 18s linear infinite; }
      .soundtrack-disc::after { content: ""; position: absolute; inset: 0; border-radius: inherit; background: linear-gradient(135deg, rgba(255,255,255,.13), transparent 44%, rgba(255,160,180,.1)); }
      .soundtrack-disc-label { width: 57px; height: 57px; display: grid; place-items: center; color: #fff1df; background: radial-gradient(circle at 35% 30%, #bd7381, #6e344c 70%); border: 4px solid #33182a; border-radius: 50%; }
      .soundtrack-disc-groove { position: absolute; inset: 17px; border: 1px solid rgba(255,211,195,.16); border-radius: 50%; }
      .soundtrack-orbit { position: absolute; border: 1px solid rgba(255,197,173,.1); border-radius: 50%; pointer-events: none; }
      .soundtrack-orbit-one { width: 300px; height: 300px; right: -40px; top: -90px; }
      .soundtrack-orbit-two { width: 230px; height: 230px; right: -7px; top: -55px; }
      @keyframes soundtrackSpin { to { transform: rotate(360deg); } }
      .soundtrack-layout { display: grid; grid-template-columns: minmax(0, 1.12fr) minmax(300px, .88fr); gap: 1.25rem; align-items: start; }
      .soundtrack-player-card, .soundtrack-add-card, .soundtrack-collection { border: 1px solid rgba(255, 174, 181, .12); border-radius: 26px; background: linear-gradient(145deg, rgba(255,255,255,.045), rgba(255,255,255,.018)); box-shadow: 0 18px 48px rgba(0,0,0,.18); }
      .soundtrack-player-card, .soundtrack-add-card { padding: 1.55rem; }
      .soundtrack-section-heading { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1.25rem; }
      .soundtrack-section-heading h3 { color: #fff1e9; font: 400 1.6rem/1.15 "Cormorant Garamond", serif; margin-top: .35rem; }
      .soundtrack-section-heading h3 span { font: 400 .9rem "DM Sans", sans-serif; color: rgba(255,195,185,.5); }
      .soundtrack-live-dot { width: 9px; height: 9px; flex: 0 0 auto; border-radius: 50%; background: #f68da1; box-shadow: 0 0 13px rgba(246,141,161,.8); animation: soundtrackPulse 2s ease-in-out infinite; }
      @keyframes soundtrackPulse { 50% { opacity: .45; box-shadow: 0 0 4px rgba(246,141,161,.5); } }
      .soundtrack-now-title { color: #ffe9de; font: italic 1.35rem "Cormorant Garamond", serif; margin: .1rem 0 .2rem; }
      .soundtrack-picked-by { color: rgba(255,202,195,.58); font-size: .72rem; margin-bottom: 1rem; }
      .soundtrack-spotify-player { display: block; border: 0; border-radius: 13px; background: rgba(0,0,0,.15); }
      .soundtrack-together-hint { margin-top: .8rem; color: rgba(255,216,206,.47); font-size: .7rem; line-height: 1.6; }
      .soundtrack-empty-player { min-height: 204px; border: 1px dashed rgba(255,186,184,.16); border-radius: 18px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 1.4rem; }
      .soundtrack-empty-note { display: grid; place-items: center; width: 54px; height: 54px; border-radius: 50%; margin-bottom: .8rem; color: #ffb0b8; background: rgba(255,150,169,.1); font-size: 1.5rem; }
      .soundtrack-empty-player h4 { color: #ffe9e0; font: 400 1.25rem "Cormorant Garamond", serif; margin-bottom: .35rem; }
      .soundtrack-empty-player p { color: rgba(255,216,206,.5); font-size: .75rem; }
      .soundtrack-add-heart { color: #ff9da9; font: 2rem "Cormorant Garamond", serif; }
      .soundtrack-setup-notice { display: flex; flex-direction: column; gap: .35rem; padding: 1rem 1.2rem; border: 1px solid rgba(255,192,135,.22); border-radius: 16px; background: rgba(120,70,35,.13); color: rgba(255,224,195,.72); font-size: .78rem; line-height: 1.6; }
      .soundtrack-setup-notice strong { color: #ffe5c7; font-weight: 500; }
      .soundtrack-setup-notice code { color: #ffd8b1; font-size: .72rem; overflow-wrap: anywhere; }
      .soundtrack-label { display: block; color: rgba(255,218,210,.67); font-size: .72rem; margin: .8rem 0 .42rem; }
      .soundtrack-provider-switch { display: flex; gap: .35rem; padding: .3rem; margin-bottom: .25rem; border: 1px solid rgba(255,174,181,.12); border-radius: 14px; background: rgba(0,0,0,.12); }
      .soundtrack-provider-switch button { flex: 1; padding: .65rem .8rem; border: 1px solid transparent; border-radius: 10px; background: transparent; color: rgba(255,218,210,.52); font: 400 .78rem "DM Sans", sans-serif; cursor: pointer; transition: all .2s; }
      .soundtrack-provider-switch button:hover { color: #fff; background: rgba(255,255,255,.04); }
      .soundtrack-provider-switch button.soundtrack-provider-active { color: #fff1e9; border-color: rgba(255,174,181,.16); background: rgba(215,104,131,.16); box-shadow: inset 0 1px rgba(255,255,255,.05); }
      .soundtrack-provider-pill { flex: 0 0 auto; padding: .28rem .48rem; border: 1px solid rgba(77,202,147,.16); border-radius: 999px; color: rgba(142,226,189,.75); background: rgba(40,125,90,.08); font-size: .59rem; letter-spacing: .03em; }
      .soundtrack-provider-youtube { color: rgba(255,151,157,.8); border-color: rgba(255,123,133,.17); background: rgba(160,55,65,.1); }
      .soundtrack-add-card .field { margin-bottom: .25rem; }
      .soundtrack-dedication { min-height: 76px; }
      .soundtrack-add-card .submit-btn { margin-top: .75rem; background: linear-gradient(135deg, #8f365b, #d36378); box-shadow: 0 8px 28px rgba(152,53,87,.26); }
      .soundtrack-added-as { margin-top: .7rem; text-align: center; color: rgba(255,208,201,.4); font-size: .65rem; }
      .soundtrack-collection { padding: 1.55rem; }
      .soundtrack-feedback-card { padding: 1.6rem; border: 1px solid rgba(255,174,181,.14); border-radius: 26px; background: radial-gradient(ellipse at 100% 0%, rgba(219,114,143,.08), transparent 42%), linear-gradient(145deg, rgba(255,255,255,.045), rgba(255,255,255,.018)); box-shadow: 0 18px 48px rgba(0,0,0,.16); }
      .soundtrack-combined-rating { display: flex; flex-direction: column; align-items: flex-end; gap: .2rem; }
      .soundtrack-combined-rating > span { color: rgba(255,196,181,.48); font-size: .58rem; letter-spacing: .14em; }
      .soundtrack-combined-rating strong { color: #ffd395; font-size: 1rem; }
      .soundtrack-combined-rating small { color: rgba(255,220,197,.45); font-size: .7rem; font-weight: 400; }
      .soundtrack-rating-pair { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: .8rem; }
      .soundtrack-person-rating { display: grid; grid-template-columns: 1fr auto; align-items: center; gap: .4rem .8rem; padding: .85rem 1rem; border: 1px solid rgba(255,174,181,.1); border-radius: 16px; background: rgba(0,0,0,.11); }
      .soundtrack-person-rating > span:first-child { color: rgba(255,228,218,.75); font-size: .78rem; }
      .soundtrack-rating-stars { display: flex; gap: .12rem; color: rgba(255,212,169,.18); font-size: .86rem; }
      .soundtrack-rating-stars .soundtrack-star-filled { color: #ffd18d; }
      .soundtrack-person-rating small { grid-column: 1 / -1; color: rgba(255,209,195,.39); font-size: .65rem; }
      .soundtrack-your-rating { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1.1rem .2rem .9rem; }
      .soundtrack-your-rating > span { color: rgba(255,224,214,.65); font-size: .76rem; }
      .soundtrack-rating-picker { display: flex; align-items: center; gap: .25rem; }
      .soundtrack-rating-picker button { padding: .1rem .22rem; border: 0; background: transparent; color: rgba(255,212,169,.24); font-size: 1.55rem; line-height: 1; cursor: pointer; transition: color .18s, transform .18s; }
      .soundtrack-rating-picker button:hover:not(:disabled) { color: #ffe0a5; transform: scale(1.15); }
      .soundtrack-rating-picker button.soundtrack-star-filled { color: #ffd18d; filter: drop-shadow(0 0 5px rgba(255,198,126,.24)); }
      .soundtrack-rating-picker button:disabled { cursor: default; opacity: .45; }
      .soundtrack-comments-area { padding-top: 1rem; border-top: 1px solid rgba(255,174,181,.09); }
      .soundtrack-comment-compose { display: grid; grid-template-columns: 1fr 190px; align-items: stretch; gap: .75rem; }
      .soundtrack-comment-compose .field-ta { min-height: 74px; margin: 0; }
      .soundtrack-comment-compose .submit-btn { align-self: stretch; padding: .7rem; font-size: .78rem; }
      .soundtrack-comment-list { display: flex; flex-direction: column; gap: .55rem; margin-top: .9rem; }
      .soundtrack-comment { padding: .8rem 1rem; border-left: 2px solid rgba(230,132,151,.35); border-radius: 0 14px 14px 0; background: rgba(255,255,255,.025); }
      .soundtrack-comment-meta { display: flex; align-items: center; justify-content: space-between; gap: .8rem; margin-bottom: .3rem; }
      .soundtrack-comment-meta strong { color: #ffc8c4; font-size: .7rem; font-weight: 500; }
      .soundtrack-comment-meta time { color: rgba(255,204,196,.35); font-size: .61rem; }
      .soundtrack-comment p { color: rgba(255,232,221,.74); font: italic 1rem/1.45 "Cormorant Garamond", serif; overflow-wrap: anywhere; }
      .soundtrack-no-comments { padding: .75rem 0; color: rgba(255,216,206,.44); font: italic .95rem "Cormorant Garamond", serif; }
      .soundtrack-collection-heading { margin-bottom: .9rem; }
      .soundtrack-collection-caption { color: rgba(255,208,201,.4); font: italic .9rem "Cormorant Garamond", serif; }
      .soundtrack-song-list { display: flex; flex-direction: column; gap: .48rem; }
      .soundtrack-song-row { display: flex; align-items: center; gap: .6rem; padding: .35rem .45rem; border: 1px solid transparent; border-radius: 16px; transition: background .2s, border-color .2s; }
      .soundtrack-song-row:hover { background: rgba(255,255,255,.035); }
      .soundtrack-song-selected { background: rgba(216,104,131,.075); border-color: rgba(255,170,185,.12); }
      .soundtrack-song-main { min-width: 0; flex: 1; display: flex; align-items: flex-start; gap: .85rem; padding: .6rem .45rem; text-align: left; border: 0; background: none; cursor: pointer; color: inherit; }
      .soundtrack-song-number { color: rgba(255,205,200,.34); font-size: .68rem; font-variant-numeric: tabular-nums; }
      .soundtrack-song-play { width: 29px; height: 29px; flex: 0 0 auto; display: grid; place-items: center; border-radius: 50%; color: #ffc5ca; background: rgba(240,135,157,.1); font-size: .68rem; }
      .soundtrack-song-selected .soundtrack-song-play { color: #fff; background: linear-gradient(135deg,#a94b6d,#dc758a); box-shadow: 0 0 14px rgba(220,117,138,.25); }
      .soundtrack-song-text { min-width: 0; display: flex; flex: 1; flex-direction: column; gap: .22rem; }
      .soundtrack-song-text strong { color: #ffede7; font-size: .82rem; font-weight: 500; line-height: 1.4; overflow-wrap: anywhere; }
      .soundtrack-song-text > span { color: rgba(255,203,197,.56); font: italic .9rem/1.45 "Cormorant Garamond", serif; white-space: normal; overflow-wrap: anywhere; }
      .soundtrack-song-by { color: rgba(255,201,194,.37); font-size: .65rem; white-space: nowrap; }
      .soundtrack-delete { padding: .4rem .55rem; }
      .soundtrack-empty-list { padding: 1.4rem; border-radius: 16px; color: rgba(255,216,206,.55); background: rgba(255,255,255,.025); font: italic 1rem/1.6 "Cormorant Garamond", serif; text-align: center; }
      @media (max-width: 760px) {
        .soundtrack-hero { min-height: 200px; padding: 2rem 1.35rem; }
        .soundtrack-hero h2 { font-size: 2.4rem; }
        .soundtrack-disc { width: 104px; height: 104px; margin-right: .15rem; }
        .soundtrack-disc-label { width: 43px; height: 43px; }
        .soundtrack-hero-note { left: 1.35rem; bottom: 1rem; }
        .soundtrack-layout { grid-template-columns: 1fr; }
        .soundtrack-player-card, .soundtrack-add-card, .soundtrack-collection { padding: 1.15rem; }
        .soundtrack-feedback-card { padding: 1.15rem; }
        .soundtrack-person-rating { padding: .7rem; }
        .soundtrack-person-rating .soundtrack-rating-stars { font-size: .7rem; }
        .soundtrack-comment-compose { grid-template-columns: 1fr; }
        .soundtrack-song-by { display: none; }
        .soundtrack-collection-caption { display: none; }
      }
    `}</style>
  );
}
