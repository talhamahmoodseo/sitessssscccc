import { motion, useReducedMotion } from "motion/react";
import { CraftFigure } from "./LineArt";

/**
 * The hero artifact: a sketched craft held on the right, with coloured fluid
 * flowing out from behind it and spreading left across the page.
 *
 * This is a composition that resolves once, roughly half a second after load,
 * and then holds. It is not a loop and nothing travels across the screen.
 *
 * What the reference actually does, and what this reproduces:
 *   - the craft sits on the right and stays there
 *   - the fluid starts behind it and spreads leftward, never right
 *   - the fluid SHIFTS HUE along its length — violet behind the craft,
 *     through pink, to warm amber at the far left edge
 *   - it reads as smoke, not as a gradient: every shape is pushed through a
 *     turbulence + displacement filter so the edges break up organically,
 *     with a grain pass over the top
 *   - the middle of the page stays clear. Colour is concentrated in the left
 *     quarter and the right quarter, with only a whisper across the centre,
 *     so the headline and the product card read cleanly
 *
 * It sits at z-0; hero content is z-10 and the product card is a later
 * sibling, so both paint over it.
 *
 * Replaces the old HeroAtmosphere blob field, which drifted continuously and
 * was a separate system from the craft.
 */

const VB_W = 1440;
const VB_H = 900;

/** Fluid bodies, right (behind the craft) to left (far edge). The hue walks
 *  lilac → blush → mark as it travels, which is the colour change in the
 *  reference. Opacity is tuned so the centre band stays near-paper. */
const BODIES = [
  // --- trail behind the craft, violet
  { cx: 1310, cy: 300, rx: 170, ry: 130, c: "--tile-lilac", o: 0.72, r: -8 },
  { cx: 1140, cy: 330, rx: 300, ry: 120, c: "--tile-lilac", o: 0.6, r: -10 },
  { cx: 980, cy: 352, rx: 250, ry: 96, c: "--tile-blush", o: 0.4, r: -8 },

  // --- the whisper across the middle, keeps it reading as one body
  { cx: 720, cy: 380, rx: 300, ry: 110, c: "--tile-blush", o: 0.16, r: -6 },

  // --- the left field, where the colour has fully turned
  { cx: 300, cy: 400, rx: 290, ry: 200, c: "--tile-blush", o: 0.42, r: 0 },
  { cx: 120, cy: 236, rx: 330, ry: 230, c: "--mark", o: 0.6, r: 0 },
  { cx: 40, cy: 452, rx: 300, ry: 250, c: "--tile-blush", o: 0.62, r: 0 },
  { cx: 140, cy: 672, rx: 340, ry: 240, c: "--tile-lilac", o: 0.66, r: 0 },
  { cx: -40, cy: 560, rx: 240, ry: 300, c: "--mark", o: 0.34, r: 0 },
];

const HeroArtifact = () => {
  const reduced = useReducedMotion() ?? false;
  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <motion.svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.55, delay: 0.05, ease }}
      >
        <defs>
          {/* Breaks each body's edge into smoke. Displacement does the
              billowing, the blur afterwards keeps it soft rather than noisy. */}
          <filter
            id="ha-smoke"
            x="-35%"
            y="-45%"
            width="180%"
            height="200%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.009 0.016"
              numOctaves="3"
              seed="7"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="190"
              xChannelSelector="R"
              yChannelSelector="G"
            />
            <feGaussianBlur stdDeviation="34" />
          </filter>

          {/* Film grain, the way the reference image is visibly grainy. */}
          <filter
            id="ha-grain"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="2"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>

        <g filter="url(#ha-smoke)">
          {BODIES.map((b, i) => (
            <ellipse
              key={i}
              cx={b.cx}
              cy={b.cy}
              rx={b.rx}
              ry={b.ry}
              fill={`rgb(var(${b.c}))`}
              opacity={b.o}
              transform={b.r ? `rotate(${b.r} ${b.cx} ${b.cy})` : undefined}
            />
          ))}
        </g>

        <rect
          width={VB_W}
          height={VB_H}
          filter="url(#ha-grain)"
          opacity="0.14"
          style={{ mixBlendMode: "multiply" }}
        />
      </motion.svg>

      {/* The craft, held on the right. */}
      <motion.div
        className="absolute right-[2%] top-[20%] hidden w-[188px] text-navy-dark md:block lg:right-[4%] lg:w-[214px]"
        initial={reduced ? false : { opacity: 0, x: 30, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.18, ease }}
      >
        <CraftFigure className="h-auto w-full" />
      </motion.div>
    </div>
  );
};

export default HeroArtifact;
