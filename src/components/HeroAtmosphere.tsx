import { motion, useReducedMotion } from "motion/react";

/** Slow-drifting coloured blobs behind the hero. Each one has its own size,
 *  anchor, drift path and period so the field never visibly loops. */
const blobs = [
  {
    size: [720, 520],
    pos: { left: "-14%", top: "2%" },
    color:
      "radial-gradient(50% 50% at 50% 50%, rgba(226,88,42,0.72) 0%, rgba(226,88,42,0.34) 45%, rgba(226,88,42,0) 72%)",
    dur: 19,
    drift: { x: [-30, 40, -30], y: [0, 34, 0], s: [1, 1.16, 1] },
    blur: 70,
    opacity: 0.95,
  },
  {
    size: [560, 480],
    pos: { left: "-6%", top: "26%" },
    color:
      "radial-gradient(50% 50% at 50% 50%, rgba(167,139,250,0.78) 0%, rgba(167,139,250,0.34) 48%, rgba(167,139,250,0) 74%)",
    dur: 23,
    drift: { x: [20, -34, 20], y: [10, -30, 10], s: [1.08, 0.92, 1.08] },
    blur: 76,
    opacity: 0.9,
  },
  {
    size: [460, 380],
    pos: { left: "6%", top: "10%" },
    color:
      "radial-gradient(50% 50% at 50% 50%, rgba(247,166,94,0.62) 0%, rgba(247,166,94,0) 70%)",
    dur: 16,
    drift: { x: [-18, 28, -18], y: [16, -18, 16], s: [0.95, 1.18, 0.95] },
    blur: 64,
    opacity: 0.75,
  },
  {
    size: [380, 340],
    pos: { left: "-2%", top: "46%" },
    color:
      "radial-gradient(50% 50% at 50% 50%, rgba(247,233,107,0.42) 0%, rgba(247,233,107,0) 70%)",
    dur: 27,
    drift: { x: [12, -22, 12], y: [-14, 22, -14], s: [1.1, 0.95, 1.1] },
    blur: 70,
    opacity: 0.6,
  },
  {
    size: [520, 300],
    pos: { left: "14%", top: "34%" },
    color:
      "radial-gradient(50% 50% at 50% 50%, rgba(196,181,253,0.45) 0%, rgba(196,181,253,0) 72%)",
    dur: 21,
    drift: { x: [26, -18, 26], y: [-8, 18, -8], s: [0.9, 1.12, 0.9] },
    blur: 72,
    opacity: 0.65,
  },
];

const HeroAtmosphere = () => {
  const reduced = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden z-0"
      aria-hidden="true"
    >
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.size[0],
            height: b.size[1],
            ...b.pos,
            background: b.color,
            filter: `blur(${b.blur}px)`,
            opacity: b.opacity,
          }}
          animate={
            reduced
              ? {}
              : {
                  x: b.drift.x,
                  y: b.drift.y,
                  scale: b.drift.s,
                  opacity: [b.opacity * 0.8, b.opacity, b.opacity * 0.8],
                }
          }
          transition={{
            duration: b.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.6,
          }}
        />
      ))}
    </div>
  );
};

export default HeroAtmosphere;
