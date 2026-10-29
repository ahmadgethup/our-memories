export default function StatPill({ value, label }: { value: number; label: string }) {
  return (
    <div className="stat-pill">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
      <div className="stat-glow" />
    </div>
  );
}
