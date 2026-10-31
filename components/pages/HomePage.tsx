"use client";

import type { Memory, Note, Plan, Tab, UserName } from "../../types";
import FeatureCard from "../FeatureCard";
import HeartPulse from "../HeartPulse";
import StatPill from "../StatPill";
import {
  IconMemories,
  IconNotes,
  IconPlans,
  IconWedding,
  IconMusic,
  IconExpand,
} from "../icons";

type Props = {
  memories: Memory[];
  notes: Note[];
  plans: Plan[];
  currentUser: UserName | null;
  setActiveTab: (tab: Tab) => void;
  setLightboxMemory: (memory: Memory) => void;
};

export default function HomePage({
  memories,
  notes,
  plans,
  currentUser,
  setActiveTab,
  setLightboxMemory,
}: Props) {
  return (
    <div className="home-panel fade-up">
      <div className="home-hero">
        <div className="home-hero-heart">
          <HeartPulse />
        </div>

        <h2 className="home-hero-title">
          {currentUser ? `Hi, ${currentUser} ❤️` : "This is our private place"}
        </h2>

        <p className="home-hero-sub">
          Here we save our favourite photos, write love notes, and keep our
          future plans — all in one beautiful corner of the internet.
        </p>

        <div className="hero-line" />
      </div>

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

        <FeatureCard
          icon={<IconMusic size={28} />}
          title="Our Soundtrack"
          desc="Add the songs that hold our little moments, and press play whenever we want to feel close."
          delay="200"
          onClick={() => setActiveTab("music")}
        />

        <FeatureCard
          icon={<IconWedding size={28} />}
          title="Our Wedding"
          desc="Watch the days until our forever, with a little music-box serenade."
          delay="280"
          onClick={() => setActiveTab("wedding")}
        />
      </div>

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
                <div className="home-note-quote" />
                <p className="home-note-text">
                  {n.content.length > 120
                    ? n.content.slice(0, 120) + "…"
                    : n.content}
                </p>
                <p className="home-note-date">
                  {n.created_by ? `${n.created_by} · ` : ""}
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
                      ? new Date(p.plan_date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })
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
  );
}
