import { motion, useReducedMotion } from "motion/react";
import { PaperPlaneFigure } from "./LineArt";

/**
 * The hero artifact: a paper plane held on the right with its fluid trailing
 * away to the left, behind everything else.
 *
 * This is deliberately NOT an animation. It is a composition that resolves
 * once, about half a second after load, and then holds still — the earlier
 * scroll-driven version flew the plane across the screen, which was the wrong
 * reading of the reference.
 *
 * Rules this has to keep:
 *   - the plane stays on the right and stays visible
 *   - the fluid starts behind the plane and spreads left, never right
 *   - the fluid is fully transparent before it reaches the centre column, so
 *     the headline and the product card in the middle stay clean
 *   - it sits at z-0; the hero content is z-10 and the product card is a later
 *     sibling, so both paint over the fluid
 *
 * The layers are blurred gradients rather than SVG so the falloff stays smooth
 * at any width. Every colour is a brand token — no imported palette.
 */

/* Each layer is positioned from the RIGHT edge of the group, so the dense end
   sits under the plane and the tail runs left. */
const LAYERS = [
  {
    /* broad lilac haze — the body of the trail */
    w: 820,
    h: 230,
    right: 54,
    top: 58,
    rotate: -7,
    blur: 48,
    background:
      "linear-gradient(to left, rgb(var(--tile-lilac) / 0.62) 0%, rgb(var(--tile-lilac) / 0.30) 34%, rgb(var(--tile-lilac) / 0) 76%)",
  },
  {
    /* amber core — brighter, narrower, reads as the exhaust itself */
    w: 610,
    h: 104,
    right: 86,
    top: 132,
    rotate: -5,
    blur: 30,
    background:
      "linear-gradient(to left, rgb(var(--mark) / 0.70) 0%, rgb(var(--mark) / 0.28) 38%, rgb(var(--mark) / 0) 78%)",
  },
  {
    /* hot spot directly behind the plane */
    w: 240,
    h: 150,
    right: 74,
    top: 104,
    rotate: 0,
    blur: 30,
    background:
      "radial-gradient(50% 50% at 62% 50%, rgb(var(--mark) / 0.62) 0%, rgb(var(--mark) / 0) 72%)",
  },
  {
    /* cool underside, keeps the trail from reading as one flat colour */
    w: 470,
    h: 96,
    right: 140,
    top: 194,
    rotate: -3,
    blur: 36,
    background:
      "linear-gradient(to left, rgb(var(--tile-sky) / 0.52) 0%, rgb(var(--tile-sky) / 0) 74%)",
  },
];

/** The drawn curl in the trail, echoing the hand-made line work elsewhere. */
const Curl = () => (
  <svg
    viewBox="0 0 260 90"
    className="absolute"
    style={{ right: 150, top: 150, width: 260 }}
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M254 36 C206 20 160 16 120 30 C86 42 74 70 92 80 C108 89 128 74 120 56 C110 34 74 30 36 44 C22 49 10 56 2 64"
      stroke="rgb(var(--ink) / 0.26)"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const HeroArtifact = () => {
  const reduced = useReducedMotion() ?? false;
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden md:block"
      aria-hidden="true"
    >
      {/* Sits low enough that the plane is level with the top of the centre
          card rather than beside the headline, which is where the reference
          anchors it. */}
      <div className="absolute right-[-5%] top-[24%] h-[370px] w-[880px] lg:right-[-2%] lg:top-[26%] xl:right-[1%]">
        {LAYERS.map((l, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: l.w,
              height: l.h,
              right: l.right,
              top: l.top,
              background: l.background,
              filter: `blur(${l.blur}px)`,
              rotate: `${l.rotate}deg`,
            }}
            initial={reduced ? false : { opacity: 0, x: 44, scaleX: 0.9 }}
            animate={{ opacity: 1, x: 0, scaleX: 1 }}
            transition={{ duration: 0.55, delay: 0.08 + i * 0.05, ease }}
          />
        ))}

        <motion.div
          initial={reduced ? false : { opacity: 0, x: 26 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.26, ease }}
        >
          <Curl />
        </motion.div>

        <motion.div
          className="absolute right-4 top-[86px] w-[186px] text-navy-dark lg:w-[212px]"
          style={{ rotate: "-14deg" }}
          initial={reduced ? false : { opacity: 0, x: 34, scale: 0.94 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.16, ease }}
        >
          <PaperPlaneFigure className="h-auto w-full" />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroArtifact;
