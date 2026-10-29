export default function HeartPulse() {
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
