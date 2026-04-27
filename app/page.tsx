"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { supabase } from "./lib/supabase";

type Memory = {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  created_at: string;
};

type Note = {
  id: string;
  content: string;
  created_at: string;
};

type Plan = {
  id: string;
  title: string;
  plan_date: string | null;
  created_at: string;
};

/* ─── SVG Icons (no emojis) ────────────────────────────────────── */
function IconMemories({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function IconNotes({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="17" x2="12" y2="17" />
    </svg>
  );
}

function IconPlans({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <polyline points="9 16 11 18 15 14" />
    </svg>
  );
}

function IconHome({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function IconLock({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function IconClose({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function IconUpload({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 16 12 12 8 16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
  );
}

function IconTrash({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

function IconExpand({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 3 21 3 21 9" />
      <polyline points="9 21 3 21 3 15" />
      <line x1="21" y1="3" x2="14" y2="10" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  );
}

/* ─── Particle Canvas ──────────────────────────────────────────── */
function ParticleCanvas({ count = 60 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.3,
      dy: -Math.random() * 0.4 - 0.1,
      opacity: Math.random() * 0.5 + 0.1,
      hue: Math.random() * 40 + 330,
      pulse: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.pulse += 0.02;
        const r = p.r + Math.sin(p.pulse) * 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 75%, ${
          p.opacity + Math.sin(p.pulse) * 0.1
        })`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.y < -10) {
          p.y = window.innerHeight + 10;
          p.x = Math.random() * window.innerWidth;
        }
        if (p.x < -10 || p.x > window.innerWidth + 10) {
          p.x = Math.random() * window.innerWidth;
        }
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

/* ─── Heartbeat SVG ────────────────────────────────────────────── */
function HeartPulse() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="hg" cx="50%" cy="40%">
          <stop offset="0%" stopColor="#ff8fab" />
          <stop offset="100%" stopColor="#c9184a" />
        </radialGradient>
        <filter id="hglow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M50 80 C20 55, 5 40, 5 27 C5 14, 15 8, 27 8 C37 8, 44 14, 50 21 C56 14, 63 8, 73 8 C85 8, 95 14, 95 27 C95 40, 80 55, 50 80Z"
        fill="url(#hg)"
        filter="url(#hglow)"
        className="heart-beat"
      />
    </svg>
  );
}

/* ─── Memory Lightbox ──────────────────────────────────────────── */
function MemoryLightbox({
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

/* ─── Lock Screen ──────────────────────────────────────────────── */
function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState("");
  const [shake, setShake] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleLogin = useCallback(() => {
    const appPassword = process.env.NEXT_PUBLIC_APP_PASSWORD || "";
    if (password === appPassword) {
      setUnlocking(true);
      localStorage.setItem("access", "true");
      setTimeout(onUnlock, 900);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setPassword("");
    }
  }, [password, onUnlock]);

  return (
    <div className={`lock-screen ${unlocking ? "lock-exit" : "lock-enter"}`}>
      <ParticleCanvas count={100} />
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

/* ─── Main App ─────────────────────────────────────────────────── */
export default function Home() {
  const [access, setAccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [entering, setEntering] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  const [memories, setMemories] = useState<Memory[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [lightboxMemory, setLightboxMemory] = useState<Memory | null>(null);

  const [memoryTitle, setMemoryTitle] = useState("");
  const [memoryDescription, setMemoryDescription] = useState("");
  const [memoryImage, setMemoryImage] = useState<File | null>(null);
  const [noteContent, setNoteContent] = useState("");
  const [planTitle, setPlanTitle] = useState("");
  const [planDate, setPlanDate] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const [{ data: memoriesData }, { data: notesData }, { data: plansData }] =
      await Promise.all([
        supabase
          .from("memories")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("notes")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("plans")
          .select("*")
          .order("created_at", { ascending: false }),
      ]);
    setMemories(memoriesData || []);
    setNotes(notesData || []);
    setPlans(plansData || []);
  };

  useEffect(() => {
    const t = setTimeout(() => {
      const saved = localStorage.getItem("access");
      if (saved === "true") {
        setAccess(true);
        fetchData();
      }
      setMounted(true);
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const handleUnlock = () => {
    setEntering(true);
    setTimeout(() => {
      setAccess(true);
      fetchData();
      setEntering(false);
    }, 950);
  };

  const addMemory = async () => {
    if (!memoryTitle || !memoryImage) {
      alert("Please add a title and image");
      return;
    }
    setLoading(true);
    const fileName = `${Date.now()}-${memoryImage.name}`;
    const { error: uploadError } = await supabase.storage
      .from("memories")
      .upload(fileName, memoryImage);
    if (uploadError) {
      alert(uploadError.message);
      setLoading(false);
      return;
    }
    const { data: publicUrlData } = supabase.storage
      .from("memories")
      .getPublicUrl(fileName);
    const { error: insertError } = await supabase.from("memories").insert({
      title: memoryTitle,
      description: memoryDescription,
      image_url: publicUrlData.publicUrl,
    });
    if (insertError) {
      alert(insertError.message);
      setLoading(false);
      return;
    }
    setMemoryTitle("");
    setMemoryDescription("");
    setMemoryImage(null);
    await fetchData();
    setLoading(false);
  };

  const addNote = async () => {
    if (!noteContent) {
      alert("Please write a note");
      return;
    }
    const { error } = await supabase
      .from("notes")
      .insert({ content: noteContent });
    if (error) {
      alert(error.message);
      return;
    }
    setNoteContent("");
    await fetchData();
  };

  const addPlan = async () => {
    if (!planTitle) {
      alert("Please write a plan title");
      return;
    }
    const { error } = await supabase
      .from("plans")
      .insert({ title: planTitle, plan_date: planDate || null });
    if (error) {
      alert(error.message);
      return;
    }
    setPlanTitle("");
    setPlanDate("");
    await fetchData();
  };

  const deleteMemory = async (id: string) => {
    await supabase.from("memories").delete().eq("id", id);
    await fetchData();
  };
  const deleteNote = async (id: string) => {
    await supabase.from("notes").delete().eq("id", id);
    await fetchData();
  };
  const deletePlan = async (id: string) => {
    await supabase.from("plans").delete().eq("id", id);
    await fetchData();
  };

  if (!mounted) return <div className="splash" />;
  if (!access) return <LockScreen onUnlock={handleUnlock} />;

  const tabs = [
    { id: "home", icon: <IconHome />, label: "Home" },
    { id: "memories", icon: <IconMemories />, label: "Memories" },
    { id: "notes", icon: <IconNotes />, label: "Notes" },
    { id: "plans", icon: <IconPlans />, label: "Plans" },
  ];

  return (
    <div className={`app-root ${entering ? "app-enter" : "app-visible"}`}>
      <ParticleCanvas count={70} />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* ── Lightbox ── */}
      {lightboxMemory && (
        <MemoryLightbox
          memory={lightboxMemory}
          onClose={() => setLightboxMemory(null)}
        />
      )}

      {/* ── Header ── */}
      <header className="app-header">
        <div className="header-inner">
          <div className="header-brand">
            <div className="mini-heart">
              <HeartPulse />
            </div>
            <div>
              <p className="header-eyebrow">
                ✦ &nbsp; O U R &nbsp; P R I V A T E &nbsp; S P A C E &nbsp; ✦
              </p>
              <h1 className="header-title">Our Memories</h1>
            </div>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("access");
              setAccess(false);
            }}
            className="lock-back-btn"
          >
            <IconLock size={14} />
            <span>Lock</span>
          </button>
        </div>

        <nav className="tab-nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-btn ${activeTab === tab.id ? "tab-active" : ""}`}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span>{tab.label}</span>
              {activeTab === tab.id && <span className="tab-pip" />}
            </button>
          ))}
        </nav>
      </header>

      {/* ── Content ── */}
      <main className="app-main">
        {/* HOME TAB */}
        {activeTab === "home" && (
          <div className="home-panel fade-up">
            <div className="home-hero">
              <div className="home-hero-heart">
                <HeartPulse />
              </div>
              <h2 className="home-hero-title">This is our private place</h2>
              <p className="home-hero-sub">
                Here we save our favourite photos, write love notes, and keep
                our future plans — all in one beautiful corner of the internet.
              </p>
              <div className="hero-line" />
            </div>

            {/* Feature cards — clicking navigates to tab */}
            <div className="feature-grid">
              <FeatureCard
                icon={<IconMemories size={28} />}
                title="Memories"
                desc="Capture photos and precious moments, preserved forever in our shared gallery."
                delay="0"
                onClick={() => setActiveTab("memories")}
              />
              <FeatureCard
                icon={<IconNotes size={28} />}
                title="Notes"
                desc="Write letters and thoughts straight from the heart, from one soul to another."
                delay="80"
                onClick={() => setActiveTab("notes")}
              />
              <FeatureCard
                icon={<IconPlans size={28} />}
                title="Plans"
                desc="Dream together and remember every future date we have planned."
                delay="160"
                onClick={() => setActiveTab("plans")}
              />
            </div>

            {/* Recent memories preview on homepage */}
            {memories.length > 0 && (
              <div className="home-recent">
                <div className="home-section-header">
                  <h3 className="home-section-title">Recent Memories</h3>
                  <button
                    className="home-section-link"
                    onClick={() => setActiveTab("memories")}
                  >
                    View all →
                  </button>
                </div>
                <div className="home-memories-strip">
                  {memories.slice(0, 4).map((m, i) => (
                    <div
                      key={m.id}
                      className="home-memory-thumb"
                      style={{ animationDelay: `${i * 80}ms` }}
                      onClick={() => setLightboxMemory(m)}
                      title={m.title}
                    >
                      <img
                        src={m.image_url}
                        alt={m.title}
                        className="home-thumb-img"
                      />
                      <div className="home-thumb-overlay">
                        <span className="home-thumb-title">{m.title}</span>
                        <span className="home-thumb-expand">
                          <IconExpand size={14} />
                        </span>
                      </div>
                      <div className="home-thumb-shimmer" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent notes preview on homepage */}
            {notes.length > 0 && (
              <div className="home-recent">
                <div className="home-section-header">
                  <h3 className="home-section-title">Recent Notes</h3>
                  <button
                    className="home-section-link"
                    onClick={() => setActiveTab("notes")}
                  >
                    View all →
                  </button>
                </div>
                <div className="home-notes-strip">
                  {notes.slice(0, 2).map((n, i) => (
                    <div
                      key={n.id}
                      className="home-note-preview"
                      style={{ animationDelay: `${i * 80}ms` }}
                      onClick={() => setActiveTab("notes")}
                    >
                      <div className="home-note-quote"></div>
                      <p className="home-note-text">
                        {n.content.length > 120
                          ? n.content.slice(0, 120) + "…"
                          : n.content}
                      </p>
                      <p className="home-note-date">
                        {new Date(n.created_at).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent plans preview on homepage */}
            {plans.length > 0 && (
              <div className="home-recent">
                <div className="home-section-header">
                  <h3 className="home-section-title">Upcoming Plans</h3>
                  <button
                    className="home-section-link"
                    onClick={() => setActiveTab("plans")}
                  >
                    View all →
                  </button>
                </div>
                <div className="home-plans-strip">
                  {plans.slice(0, 3).map((p, i) => (
                    <div
                      key={p.id}
                      className="home-plan-item"
                      style={{ animationDelay: `${i * 60}ms` }}
                      onClick={() => setActiveTab("plans")}
                    >
                      <div className="home-plan-dot" />
                      <div>
                        <p className="home-plan-title">{p.title}</p>
                        <p className="home-plan-date">
                          {p.plan_date
                            ? new Date(p.plan_date).toLocaleDateString(
                                "en-US",
                                {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )
                            : "No date set"}
                        </p>
                      </div>
                      <span className="home-plan-arrow">→</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="stats-row">
              <StatPill value={memories.length} label="Memories" />
              <StatPill value={notes.length} label="Notes" />
              <StatPill value={plans.length} label="Plans" />
            </div>
          </div>
        )}

        {/* MEMORIES TAB */}
        {activeTab === "memories" && (
          <div className="tab-panel fade-up">
            <div className="form-card">
              <h2 className="form-title">Add a Memory</h2>
              <input
                type="text"
                placeholder="Memory title…"
                className="field"
                value={memoryTitle}
                onChange={(e) => setMemoryTitle(e.target.value)}
              />
              <textarea
                placeholder="A small description…"
                className="field field-ta"
                value={memoryDescription}
                onChange={(e) => setMemoryDescription(e.target.value)}
              />
              <label className="file-label">
                <span className="file-label-icon">
                  <IconUpload size={18} />
                </span>
                <span>
                  {memoryImage ? memoryImage.name : "Choose a photo…"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setMemoryImage(e.target.files?.[0] || null)}
                />
              </label>
              <button
                onClick={addMemory}
                disabled={loading}
                className="submit-btn"
              >
                {loading ? <span className="spinner" /> : "Save Memory"}
              </button>
            </div>

            <div className="cards-grid">
              {memories.map((m, i) => (
                <div
                  key={m.id}
                  className="memory-card"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div
                    className="memory-img-wrap"
                    onClick={() => setLightboxMemory(m)}
                  >
                    <img
                      src={m.image_url}
                      alt={m.title}
                      className="memory-img"
                    />
                    <div className="memory-img-overlay" />
                    <div className="memory-expand-hint">
                      <IconExpand size={18} />
                      <span>View full</span>
                    </div>
                  </div>
                  <div className="memory-body">
                    <h3 className="memory-title">{m.title}</h3>
                    {m.description && (
                      <p className="memory-desc">{m.description}</p>
                    )}
                    <p className="memory-date">
                      {new Date(m.created_at).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <button
                      onClick={() => deleteMemory(m.id)}
                      className="delete-btn"
                    >
                      <IconTrash size={12} /> Delete
                    </button>
                  </div>
                  <div className="memory-card-glow" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NOTES TAB */}
        {activeTab === "notes" && (
          <div className="tab-panel fade-up">
            <div className="form-card">
              <h2 className="form-title">Write a Note</h2>
              <textarea
                placeholder="Write something beautiful…"
                className="field field-ta tall"
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
              />
              <button onClick={addNote} className="submit-btn">
                Save Note
              </button>
            </div>

            <div className="notes-list">
              {notes.map((n, i) => (
                <div
                  key={n.id}
                  className="note-card"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="note-quote-mark"></div>
                  <p className="note-text">{n.content}</p>
                  <div className="note-footer">
                    <span className="note-date">
                      {new Date(n.created_at).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <button
                      onClick={() => deleteNote(n.id)}
                      className="delete-btn"
                    >
                      <IconTrash size={12} /> Delete
                    </button>
                  </div>
                  <div className="note-line-accent" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PLANS TAB */}
        {activeTab === "plans" && (
          <div className="tab-panel fade-up">
            <div className="form-card">
              <h2 className="form-title">Add a Plan</h2>
              <input
                type="text"
                placeholder="What are we planning?…"
                className="field"
                value={planTitle}
                onChange={(e) => setPlanTitle(e.target.value)}
              />
              <input
                type="date"
                className="field"
                value={planDate}
                onChange={(e) => setPlanDate(e.target.value)}
              />
              <button onClick={addPlan} className="submit-btn">
                Save Plan
              </button>
            </div>

            <div className="plans-list">
              {plans.map((p, i) => (
                <div
                  key={p.id}
                  className="plan-card"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="plan-left">
                    <div className="plan-dot">
                      <div className="plan-dot-inner" />
                    </div>
                    <div>
                      <h3 className="plan-title">{p.title}</h3>
                      <p className="plan-date">
                        {p.plan_date
                          ? new Date(p.plan_date).toLocaleDateString("en-US", {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "No date set"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => deletePlan(p.id)}
                    className="delete-btn"
                  >
                    <IconTrash size={12} /> Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <AppStyles />
    </div>
  );
}

/* ─── Feature Card ─────────────────────────────────────────────── */
function FeatureCard({
  icon,
  title,
  desc,
  delay,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  delay: string;
  onClick: () => void;
}) {
  return (
    <div
      className="feature-card"
      style={{ animationDelay: `${delay}ms` }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      <div className="feature-icon-wrap">{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-desc">{desc}</p>
      <div className="feature-arrow">→</div>
      <div className="feature-shine" />
      <div className="feature-border-glow" />
    </div>
  );
}

/* ─── Stat Pill ────────────────────────────────────────────────── */
function StatPill({ value, label }: { value: number; label: string }) {
  return (
    <div className="stat-pill">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
      <div className="stat-glow" />
    </div>
  );
}

/* ─── Lightbox Styles ──────────────────────────────────────────── */
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

/* ─── Lock Screen Styles ───────────────────────────────────────── */
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

/* ─── App Styles ───────────────────────────────────────────────── */
function AppStyles() {
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
      }
      .app-enter {
        animation: appIn 0.8s ease both;
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
        animation: fadeUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
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
    `}</style>
  );
}
