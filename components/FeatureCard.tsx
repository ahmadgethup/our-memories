import type React from "react";

export default function FeatureCard({
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
