type FigProps = { className?: string };

/** Shared stroke setup for every hand-drawn figure in this file. */
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.1,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export const PaperPlaneFigure = ({ className = "" }: FigProps) => (
  <svg viewBox="0 0 130 92" className={className} aria-hidden="true">
    {/* The dart is drawn as two folded surfaces so it reads three-dimensional
        at small sizes: the underside carries the brand highlight, the top face
        is paper. Outline last, so the strokes sit over both fills. */}
    <path d="M122 46 L38 46 L8 86 Z" fill="rgb(var(--mark) / 0.6)" />
    <path d="M122 46 L8 6 L38 46 Z" fill="rgb(var(--paper))" />
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M122 46 L8 6 L38 46 L8 86 Z" />
      <path d="M38 46 L122 46" />
    </g>
  </svg>
);

export const FigWhiteLabel = ({ className = "" }: FigProps) => (
  <svg viewBox="0 0 120 150" className={className} aria-hidden="true">
    <g {...stroke}>
      <circle cx="60" cy="30" r="13" />
      <path d="M60 43 l0 40" />
      <path d="M60 52 l-26 -10" />
      <path d="M34 42 l-8 -12" />
      <path d="M60 52 l26 -6" />
      <path d="M86 46 l10 -14" />
      <path d="M60 83 l-16 34" />
      <path d="M60 83 l18 32" />
      <path d="M44 117 l-12 6" />
      <path d="M78 115 l12 8" />
      <rect x="20" y="24" width="16" height="12" rx="2" />
    </g>
  </svg>
);

export const FigCleanAudit = ({ className = "" }: FigProps) => (
  <svg viewBox="0 0 120 150" className={className} aria-hidden="true">
    <g {...stroke}>
      <circle cx="54" cy="32" r="13" />
      <path d="M54 45 l0 42" />
      <path d="M54 56 l24 -12" />
      <path d="M78 44 l18 -8 -4 18 z" />
      <path d="M54 56 l-22 8" />
      <path d="M54 87 l-14 32" />
      <path d="M54 87 l16 30" />
      <path d="M40 119 l-12 5" />
      <path d="M70 117 l13 7" />
    </g>
  </svg>
);

export const FigAiAnswers = ({ className = "" }: FigProps) => (
  <svg viewBox="0 0 120 150" className={className} aria-hidden="true">
    <g {...stroke}>
      <path d="M14 128 l24 0 0 -20 24 0 0 -20 24 0 0 -20 24 0" />
      <circle cx="66" cy="46" r="12" />
      <path d="M66 58 l-6 30" />
      <path d="M62 66 l-20 6" />
      <path d="M66 62 l22 -10" />
      <path d="M60 88 l-16 22" />
      <path d="M60 88 l14 20" />
    </g>
  </svg>
);

export const FigCategoryClimb = ({ className = "" }: FigProps) => (
  <svg viewBox="0 0 120 150" className={className} aria-hidden="true">
    <g {...stroke}>
      <circle cx="60" cy="34" r="13" />
      <path d="M60 47 l0 40" />
      <path d="M60 56 l-28 -6" />
      <path d="M60 56 l28 -6" />
      <rect x="14" y="34" width="20" height="16" rx="2" />
      <rect x="86" y="34" width="20" height="16" rx="2" />
      <path d="M60 87 l-15 32" />
      <path d="M60 87 l16 31" />
    </g>
  </svg>
);

export const FigLocalMap = ({ className = "" }: FigProps) => (
  <svg viewBox="0 0 120 150" className={className} aria-hidden="true">
    <g {...stroke}>
      <circle cx="48" cy="40" r="13" />
      <path d="M48 53 l4 36" />
      <path d="M50 62 l26 -12" />
      <path d="M76 42 l24 -10 0 30 -24 -12 z" />
      <path d="M50 62 l-20 10" />
      <path d="M52 89 l-14 30" />
      <path d="M52 89 l16 28" />
    </g>
  </svg>
);

export const FigTrendline = ({ className = "" }: FigProps) => (
  <svg viewBox="0 0 120 80" className={className} aria-hidden="true">
    <g {...stroke} strokeWidth={1.6}>
      <path d="M6 8 c26 2 44 16 48 34 3 14-6 26-16 24-9-2-10-16 2-22 16-8 40-4 56 14" />
      <path d="M88 52 l8 8 -12 4" />
    </g>
  </svg>
);

export const FigFounder = ({ className = "" }: FigProps) => (
  <svg viewBox="0 0 140 190" className={className} aria-hidden="true">
    <g {...stroke}>
      <circle cx="70" cy="34" r="16" />
      <path d="M70 50 l0 52" />
      <path d="M70 62 l-30 14" />
      <path d="M40 76 l-14 -6" />
      <path d="M70 62 l28 -18" />
      <path d="M98 44 l10 -22" />
      <path d="M104 16 l6 10 8 -8" />
      <path d="M70 102 l-18 44" />
      <path d="M70 102 l20 42" />
      <path d="M52 146 l-16 8" />
      <path d="M90 144 l17 10" />
    </g>
  </svg>
);

export const FigSplitSearch = ({ className = "" }: FigProps) => (
  <svg viewBox="0 0 150 180" className={className} aria-hidden="true">
    <g {...stroke}>
      <circle cx="52" cy="36" r="15" />
      <path d="M52 51 l4 50" />
      <path d="M54 64 l34 -6" />
      <path d="M88 58 l26 -4" />
      <path d="M112 48 l14 6 -14 8" />
      <path d="M54 64 l-24 12" />
      <path d="M56 101 l-16 42" />
      <path d="M56 101 l18 40" />
      <path d="M40 143 l-16 8" />
      <path d="M74 141 l18 9" />
    </g>
  </svg>
);

export const FigSpreadsheet = ({ className = "" }: FigProps) => (
  <svg viewBox="0 0 150 180" className={className} aria-hidden="true">
    <g {...stroke}>
      <circle cx="66" cy="40" r="15" />
      <path d="M66 55 l0 48" />
      <path d="M66 66 l22 -8" />
      <path d="M88 58 l-4 -18" />
      <path d="M84 40 l-6 -8" />
      <path d="M66 66 l-24 10" />
      <path d="M66 103 l-16 42" />
      <path d="M66 103 l18 40" />
      <path d="M50 145 l-16 8" />
      <path d="M84 143 l18 9" />
      <circle cx="104" cy="26" r="4" />
      <circle cx="116" cy="14" r="2.6" />
    </g>
  </svg>
);

export const FigNetwork = ({ className = "" }: FigProps) => (
  <svg viewBox="0 0 160 180" className={className} aria-hidden="true">
    <g {...stroke}>
      <path d="M12 156 l30 0 0 -26 30 0 0 -26 30 0 0 -26 34 0" />
      <circle cx="94" cy="46" r="14" />
      <path d="M92 60 l-6 38" />
      <path d="M90 72 l-24 8" />
      <path d="M92 66 l26 -14" />
      <path d="M86 98 l-18 26" />
      <path d="M86 98 l16 24" />
    </g>
  </svg>
);
