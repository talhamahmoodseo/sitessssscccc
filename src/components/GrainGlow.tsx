import { useId } from "react";

/**
 * The grainy multi-hue glow.
 *
 * This is the reference's signature colour device and the one we were missing.
 * It is never a flat tint: three or four hues overlap, get pushed through a
 * turbulence + displacement filter so the edges break apart, then take a grain
 * pass. That is what makes it read as a printed/airbrushed artifact rather
 * than a CSS blur.
 *
 * It exists to sit BEHIND something — a line-art figure, a numeral, an icon —
 * and to change hue when the thing it sits behind changes. Each instance gets
 * its own filter ids via useId, so several can live on a page without their
 * filters colliding.
 */

type Hue = string; // a CSS colour, usually rgb(var(--tile-x))

export const GrainGlow = ({
  hues,
  className = "",
  /** 0 hides it; the glow fades and re-blooms when this flips */
  show = true,
  seed = 3,
}: {
  hues: Hue[];
  className?: string;
  show?: boolean;
  seed?: number;
}) => {
  const uid = useId().replace(/:/g, "");
  const blobId = `gg-blob-${uid}`;
  const grainId = `gg-grain-${uid}`;

  /* three overlapping bodies, spread so the hues mix rather than stack */
  const spots = [
    { cx: 118, cy: 54, rx: 54, ry: 44 },
    { cx: 72, cy: 86, rx: 50, ry: 40 },
    { cx: 140, cy: 96, rx: 44, ry: 36 },
    { cx: 96, cy: 62, rx: 38, ry: 34 },
  ];

  /* The fade is a CSS transition rather than a Framer tween on purpose: it is
     a hover/select state that must respond even when the JS animation loop is
     throttled, and it costs nothing to run. */
  return (
    <svg
      viewBox="0 0 200 150"
      className={`transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        show ? "scale-100 opacity-100" : "scale-[0.86] opacity-0"
      } ${className}`}
      aria-hidden="true"
    >
      <defs>
        <filter
          id={blobId}
          x="-40%"
          y="-45%"
          width="190%"
          height="200%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.022 0.032"
            numOctaves="3"
            seed={seed}
            result="n"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="n"
            scale="52"
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <feGaussianBlur stdDeviation="11" />
        </filter>

        <filter
          id={grainId}
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>

      <g filter={`url(#${blobId})`}>
        {spots.map((s, i) => (
          <ellipse
            key={i}
            cx={s.cx}
            cy={s.cy}
            rx={s.rx}
            ry={s.ry}
            fill={hues[i % hues.length]}
            opacity={0.85}
          />
        ))}
      </g>

      <rect
        width="200"
        height="150"
        filter={`url(#${grainId})`}
        opacity="0.17"
        style={{ mixBlendMode: "multiply" }}
      />
    </svg>
  );
};

/** Hue sets, one per position in a tab strip. Each is a genuine mix rather
 *  than one colour at different opacities — that mixing is the whole point. */
export const GLOW_SETS: string[][] = [
  ["rgb(var(--tile-butter))", "rgb(var(--gap))", "rgb(var(--tile-blush))"],
  ["rgb(var(--tile-mint))", "rgb(var(--tile-sky))", "rgb(var(--tile-butter))"],
  ["rgb(var(--tile-lilac))", "rgb(var(--tile-blush))", "rgb(var(--tile-sky))"],
  ["rgb(var(--tile-blush))", "rgb(var(--gap))", "rgb(var(--tile-lilac))"],
  ["rgb(var(--tile-sky))", "rgb(var(--tile-mint))", "rgb(var(--tile-lilac))"],
];

export default GrainGlow;
