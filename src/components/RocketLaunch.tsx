import { motion, useReducedMotion } from "motion/react";
import { RocketFigure } from "./LineArt";

/** The rocket flies in from off-screen left, settles, then breathes up and
 *  down forever. Skipped entirely when the viewer prefers reduced motion. */
const RocketLaunch = () => {
  const reduced = useReducedMotion();
  const settled = { x: 0, opacity: 1, rotate: 0 };

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-[11rem] lg:top-[12rem] h-[470px] overflow-hidden z-0"
      aria-hidden="true"
    >
      <motion.div
        className="absolute right-[2%] xl:right-[5%] top-4 w-[380px] xl:w-[440px]"
        initial={reduced ? false : { x: "-125vw", opacity: 0, rotate: -18 }}
        animate={settled}
        transition={
          reduced
            ? { duration: 0 }
            : {
                x: { duration: 2.1, ease: [0.16, 1, 0.3, 1], delay: 0.25 },
                rotate: { duration: 2.1, ease: [0.16, 1, 0.3, 1], delay: 0.25 },
                opacity: { duration: 0.5, delay: 0.25 },
              }
        }
      >
        <motion.div
          className="relative text-navy-dark"
          animate={reduced ? {} : { y: [0, -14, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.4,
          }}
        >
          <RocketFigure className="w-full h-auto" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RocketLaunch;
