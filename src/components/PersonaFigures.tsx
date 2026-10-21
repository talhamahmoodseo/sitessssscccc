import { useId, type ReactNode } from "react";

/**
 * Persona illustrations for the homepage "who it's for" tabs. Pencil-sketch
 * figures in the same hand as the hero rocket.
 *
 * Each body is a set of limbs drawn twice: a thick ink stroke, then a slightly
 * thinner paper stroke on top. Overlapping limbs fuse into one outlined
 * silhouette, which reads like a drawn figure rather than a stick man. A
 * pencil filter wobbles the line, and a few hatches add shading.
 *
 * Colour comes from `currentColor`, so a tab can fade an inactive figure.
 */

const PAPER = "#FFFEFB";

type Limb = { d: string; w: number };
type FigProps = { className?: string };

/** short diagonal hatches along a line, just inside one edge of a limb */
const hatch = (x1: number, y1: number, x2: number, y2: number, n: number) =>
  Array.from({ length: n }, (_, i) => {
    const t = (i + 0.5) / n;
    const x = x1 + (x2 - x1) * t;
    const y = y1 + (y2 - y1) * t;
    return `M${(x - 1.6).toFixed(1)} ${(y - 1.6).toFixed(1)} L${(x + 2).toFixed(1)} ${(y + 2).toFixed(1)}`;
  }).join(" ");

const Sketch = ({
  className = "",
  children,
}: {
  className?: string;
  children: (filter: string) => ReactNode;
}) => {
  const id = `pf${useId().replace(/:/g, "")}`;
  return (
    <svg
      viewBox="0 0 160 200"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <filter id={id} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04"
            numOctaves="2"
            seed="4"
            result="wob"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="wob"
            scale="2.2"
            xChannelSelector="R"
            yChannelSelector="G"
            result="drawn"
          />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.2"
            numOctaves="1"
            seed="9"
            result="grain"
          />
          <feColorMatrix
            in="grain"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.2 1.3"
            result="speckle"
          />
          <feComposite in="drawn" in2="speckle" operator="in" />
        </filter>
      </defs>
      {children(`url(#${id})`)}
    </svg>
  );
};

/** the fused, outlined body: ink pass, then paper pass, then the head */
const Body = ({
  limbs,
  head,
  hatches = "",
}: {
  limbs: Limb[];
  head: [number, number];
  hatches?: string;
}) => {
  const [hx, hy] = head;
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      {limbs.map((l, i) => (
        <path
          key={`o${i}`}
          d={l.d}
          stroke="currentColor"
          strokeWidth={l.w + 3.2}
        />
      ))}
      <circle cx={hx} cy={hy} r={11.6} fill="currentColor" />
      {limbs.map((l, i) => (
        <path key={`i${i}`} d={l.d} stroke={PAPER} strokeWidth={l.w} />
      ))}
      <circle cx={hx} cy={hy} r={10} fill={PAPER} />
      {/* a face, barely there */}
      <circle cx={hx - 3.2} cy={hy - 1} r={0.9} fill="currentColor" />
      <circle cx={hx + 3.2} cy={hy - 1} r={0.9} fill="currentColor" />
      <path
        d={`M${hx - 3} ${hy + 3.2} Q ${hx} ${hy + 5.6} ${hx + 3} ${hy + 3.2}`}
        stroke="currentColor"
        strokeWidth="1.1"
      />
      {hatches && (
        <path
          d={hatches}
          stroke="currentColor"
          strokeOpacity="0.5"
          strokeWidth="0.9"
        />
      )}
    </g>
  );
};

const Ground = ({ d = "M28 191 Q 80 187 140 191" }: { d?: string }) => (
  <path
    d={d}
    stroke="currentColor"
    strokeOpacity="0.45"
    strokeWidth="1.1"
    strokeLinecap="round"
  />
);

const OUTLINE = {
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinejoin: "round" as const,
};

/* ------------------------------- agencies ------------------------------- */

/** holding up a sign with a blank space for someone else's logo */
export const FigAgency = ({ className = "" }: FigProps) => (
  <Sketch className={className}>
    {(f) => (
      <g filter={f}>
        <Ground />
        <rect
          x="28"
          y="12"
          width="104"
          height="36"
          rx="8"
          fill={PAPER}
          {...OUTLINE}
        />
        <rect
          x="34"
          y="18"
          width="92"
          height="24"
          rx="5"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <text
          x="80"
          y="35.5"
          textAnchor="middle"
          fontFamily="Caveat, cursive"
          fontSize="16"
          fill="currentColor"
        >
          your logo
        </text>
        <Body
          head={[80, 72]}
          limbs={[
            { d: "M80 82 L80 87", w: 6 },
            { d: "M80 89 C 79 104, 81 116, 80 128", w: 17 },
            { d: "M74 93 L 61 74 L 55 49", w: 8.5 },
            { d: "M86 93 L 99 74 L 105 49", w: 8.5 },
            { d: "M77 126 L 70 158 L 66 186", w: 11.5 },
            { d: "M83 126 L 91 158 L 95 186", w: 11.5 },
            { d: "M66 186 L 56 187", w: 7 },
            { d: "M95 186 L 105 187", w: 7 },
          ]}
          hatches={hatch(84, 96, 84, 124, 6) + " " + hatch(92, 160, 94, 182, 4)}
        />
      </g>
    )}
  </Sketch>
);

/* ------------------------------ saas founders ------------------------------ */

/** stepping up a bar chart towards a flag */
export const FigFounder = ({ className = "" }: FigProps) => (
  <Sketch className={className}>
    {(f) => (
      <g filter={f}>
        <Ground d="M24 191 Q 90 188 152 191" />
        <rect x="60" y="160" width="28" height="31" fill={PAPER} {...OUTLINE} />
        <rect x="88" y="128" width="28" height="63" fill={PAPER} {...OUTLINE} />
        <rect x="116" y="92" width="30" height="99" fill={PAPER} {...OUTLINE} />
        <path
          d={hatch(140, 100, 140, 186, 12)}
          stroke="currentColor"
          strokeOpacity="0.45"
          strokeWidth="0.9"
        />
        <path
          d={hatch(111, 136, 111, 186, 7)}
          stroke="currentColor"
          strokeOpacity="0.45"
          strokeWidth="0.9"
        />
        <path
          d="M138 92 L138 60"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M138 60 L156 66 L138 73 Z"
          fill="rgb(var(--mark))"
          {...OUTLINE}
          strokeWidth={1.5}
        />
        <Body
          head={[82, 48]}
          limbs={[
            { d: "M82 58 L83 62", w: 6 },
            { d: "M83 64 C 84 80, 84 94, 83 108", w: 16 },
            { d: "M86 70 L 102 58 L 116 44", w: 8 },
            { d: "M80 70 L 68 84 L 62 96", w: 8 },
            { d: "M81 106 L 72 134 L 72 159", w: 11 },
            { d: "M86 106 L 102 112 L 102 127", w: 11 },
            { d: "M72 159 L 63 160", w: 6.5 },
            { d: "M102 127 L 111 127", w: 6.5 },
          ]}
          hatches={hatch(87, 70, 87, 104, 5)}
        />
      </g>
    )}
  </Sketch>
);

/* -------------------------------- seo leads -------------------------------- */

/** checking a link through a magnifying glass */
export const FigInspector = ({ className = "" }: FigProps) => (
  <Sketch className={className}>
    {(f) => (
      <g filter={f}>
        <Ground />
        {/* the glass: handle first, so the hand closes over it */}
        <g strokeLinecap="round">
          <path d="M96 98 L109 85" stroke="currentColor" strokeWidth="8.6" />
          <path d="M96 98 L109 85" stroke={PAPER} strokeWidth="5.8" />
        </g>
        <circle
          cx="122"
          cy="72"
          r="19"
          fill={PAPER}
          stroke="currentColor"
          strokeWidth="2.4"
        />
        <circle
          cx="122"
          cy="72"
          r="14.5"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="1"
        />
        <g
          transform="translate(122 72) rotate(-35)"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <rect x="-11" y="-4" width="12" height="8" rx="4" />
          <rect x="-1" y="-4" width="12" height="8" rx="4" />
        </g>
        <path
          d="M110 62 Q 113 57 119 56"
          stroke="currentColor"
          strokeOpacity="0.5"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <Body
          head={[60, 56]}
          limbs={[
            { d: "M60 66 L61 70", w: 6 },
            { d: "M61 72 C 63 88, 64 102, 63 118", w: 16 },
            { d: "M64 80 L 82 88 L 96 98", w: 8 },
            { d: "M58 80 L 46 94 L 54 106", w: 8 },
            { d: "M60 116 L 54 150 L 50 186", w: 11.5 },
            { d: "M66 116 L 74 150 L 78 186", w: 11.5 },
            { d: "M50 186 L 40 187", w: 7 },
            { d: "M78 186 L 88 187", w: 7 },
          ]}
          hatches={hatch(67, 80, 67, 114, 6) + " " + hatch(76, 154, 79, 182, 4)}
        />
      </g>
    )}
  </Sketch>
);

/* -------------------------------- e-commerce -------------------------------- */

/** walking out with full shopping bags */
export const FigShopper = ({ className = "" }: FigProps) => (
  <Sketch className={className}>
    {(f) => (
      <g filter={f}>
        <Ground d="M22 191 Q 80 187 142 191" />
        <Body
          head={[80, 46]}
          limbs={[
            { d: "M80 56 L80 60", w: 6 },
            { d: "M80 62 C 80 78, 81 92, 80 106", w: 16 },
            { d: "M75 70 L 60 90 L 50 108", w: 8 },
            { d: "M85 70 L 100 90 L 112 108", w: 8 },
            { d: "M78 104 L 66 140 L 58 178", w: 11.5 },
            { d: "M83 104 L 94 140 L 102 178", w: 11.5 },
            { d: "M58 178 L 48 180", w: 7 },
            { d: "M102 178 L 112 177", w: 7 },
          ]}
          hatches={hatch(84, 68, 84, 102, 6)}
        />
        {/* the bags, in front of the legs */}
        <path
          d="M44 116 C 44 103, 56 103, 56 116"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M34 114 L 64 114 L 68 152 L 30 152 Z"
          fill={PAPER}
          {...OUTLINE}
        />
        <path
          d={hatch(60, 120, 63, 148, 5)}
          stroke="currentColor"
          strokeOpacity="0.45"
          strokeWidth="0.9"
        />
        <path
          d="M106 116 C 106 103, 120 103, 120 116"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M98 114 L 128 114 L 133 154 L 93 154 Z"
          fill="rgb(var(--mark))"
          {...OUTLINE}
        />
        <path
          d="M102 144 L 110 136 L 116 140 L 125 128"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M120 128 L 125 128 L 125 133"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    )}
  </Sketch>
);

/* ------------------------------ local services ------------------------------ */

/** pointing out the pin on the map */
export const FigLocal = ({ className = "" }: FigProps) => (
  <Sketch className={className}>
    {(f) => (
      <g filter={f}>
        <Ground d="M24 191 Q 80 187 150 191" />
        <ellipse
          cx="120"
          cy="104"
          rx="22"
          ry="4.5"
          stroke="currentColor"
          strokeOpacity="0.45"
          strokeWidth="1.1"
          strokeDasharray="3 3"
        />
        <path
          d="M120 22 C 99 22, 91 40, 97 56 L 120 102 L 143 56 C 149 40, 141 22, 120 22 Z"
          fill={PAPER}
          {...OUTLINE}
          strokeWidth={2.2}
        />
        <circle
          cx="120"
          cy="46"
          r="8.5"
          fill="rgb(var(--mark))"
          {...OUTLINE}
          strokeWidth={1.6}
        />
        <path
          d={hatch(136, 50, 124, 86, 7)}
          stroke="currentColor"
          strokeOpacity="0.45"
          strokeWidth="0.9"
        />
        <Body
          head={[58, 62]}
          limbs={[
            { d: "M58 72 L58 76", w: 6 },
            { d: "M58 78 C 58 94, 59 108, 58 122", w: 16 },
            { d: "M61 86 L 80 78 L 98 70", w: 8 },
            { d: "M55 86 L 42 72 L 38 54", w: 8 },
            { d: "M56 120 L 50 154 L 46 186", w: 11.5 },
            { d: "M61 120 L 67 154 L 70 186", w: 11.5 },
            { d: "M46 186 L 36 187", w: 7 },
            { d: "M70 186 L 80 187", w: 7 },
          ]}
          hatches={hatch(62, 88, 62, 118, 5) + " " + hatch(68, 158, 70, 182, 4)}
        />
      </g>
    )}
  </Sketch>
);
