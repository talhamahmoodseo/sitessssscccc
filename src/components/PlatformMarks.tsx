type MarkProps = { className?: string };

/** Inline brand glyphs for the answer engines we report on. Drawn by hand so
 *  they stay crisp at 14px and need no network request. */

export const AiOverviewMark = ({ className = "w-4 h-4" }: MarkProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="gAIMarkGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4285F4" />
        <stop offset="55%" stopColor="#9B72CB" />
        <stop offset="100%" stopColor="#D96570" />
      </linearGradient>
    </defs>
    <path
      d="M12 1.8c.55 5.6 4.6 9.65 10.2 10.2-5.6.55-9.65 4.6-10.2 10.2C11.45 16.6 7.4 12.55 1.8 12 7.4 11.45 11.45 7.4 12 1.8z"
      fill="url(#gAIMarkGrad)"
    />
  </svg>
);

export const ChatGptMark = ({ className = "w-4 h-4" }: MarkProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="11" fill="#10a37f" />
    <g stroke="#ffffff" strokeWidth="1.5" fill="none" strokeLinejoin="round">
      <path d="M12 5.6 16.9 8.4 16.9 14.1 12 16.9 7.1 14.1 7.1 8.4 Z" />
      <path
        d="M12 8.3 14.5 9.75 14.5 12.65 12 14.1 9.5 12.65 9.5 9.75 Z"
        opacity="0.8"
      />
    </g>
  </svg>
);

export const ClaudeMark = ({ className = "w-4 h-4" }: MarkProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="11" fill="#d97757" />
    <g stroke="#ffffff" strokeWidth="1.9" strokeLinecap="round">
      <line x1="15.2" y1="12" x2="18.8" y2="12" />
      <line x1="14.26" y1="14.26" x2="16.8" y2="16.8" />
      <line x1="12" y1="15.2" x2="12" y2="18.8" />
      <line x1="9.74" y1="14.26" x2="7.2" y2="16.8" />
      <line x1="8.8" y1="12" x2="5.2" y2="12" />
      <line x1="9.74" y1="9.74" x2="7.2" y2="7.2" />
      <line x1="12" y1="8.8" x2="12" y2="5.2" />
      <line x1="14.26" y1="9.74" x2="16.8" y2="7.2" />
    </g>
  </svg>
);

export const GoogleMark = ({ className = "w-4 h-4" }: MarkProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <circle
      cx="12"
      cy="12"
      r="11"
      fill="#ffffff"
      stroke="#dfe1e5"
      strokeWidth="1.2"
    />
    <text
      x="12"
      y="16.6"
      textAnchor="middle"
      fontSize="13.5"
      fontWeight="700"
      fill="#4285F4"
      fontFamily="Arial, Helvetica, sans-serif"
    >
      G
    </text>
  </svg>
);

export const PerplexityMark = ({ className = "w-4 h-4" }: MarkProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="11" fill="#20808D" />
    <g
      stroke="#ffffff"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5.5v13" />
      <path d="M7 8.2 12 11.6 17 8.2" />
      <path d="M7 8.2v6.4l5-3M17 8.2v6.4l-5-3" />
    </g>
  </svg>
);
