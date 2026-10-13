import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Clock, User } from "lucide-react";
import { linkBuilding as LB } from "../content/linkBuilding";
import { Eyebrow, H2, rise } from "./kit";

const PR = LB.process;

/** Four stops on one line. The line fills as the section scrolls past, so the
 *  reader feels the month move. */
const Timeline = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <section className="bg-mist py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="max-w-3xl" {...rise()}>
          <Eyebrow className="mb-4">{PR.eyebrow}</Eyebrow>
          <H2>{PR.h2}</H2>
        </motion.div>

        <div ref={ref} className="relative mt-16">
          {/* the line: horizontal on desktop, vertical on small screens */}
          <div
            className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-navy-dark/10 lg:left-0 lg:right-0 lg:top-[11px] lg:bottom-auto lg:h-[2px] lg:w-auto"
            aria-hidden="true"
          >
            <motion.div
              className="h-full w-full origin-top bg-navy-dark lg:hidden"
              style={{ scaleY: fill }}
            />
            <motion.div
              className="hidden h-full w-full origin-left bg-navy-dark lg:block"
              style={{ scaleX: fill }}
            />
          </div>

          <ol className="grid gap-12 lg:grid-cols-4 lg:gap-8">
            {PR.steps.map((s, n) => (
              <motion.li
                key={s.t}
                className="relative pl-12 lg:pl-0 lg:pt-14"
                {...rise(n * 0.1)}
              >
                <span className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-navy-dark ring-[6px] ring-mist">
                  <span className="h-2 w-2 rounded-full bg-mark" />
                </span>
                <span className="inline-flex rounded-full bg-white px-3 py-1 text-[11.5px] font-semibold text-navy-dark ring-1 ring-line">
                  {s.when}
                </span>
                <h3 className="mt-4 text-[20px] font-semibold tracking-[-0.02em] text-navy-dark">
                  {s.t}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.7] text-navy-dark/75">
                  {s.d}
                </p>
                <p className="mt-5 flex items-start gap-2.5 border-t border-line pt-4">
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-white ring-1 ring-line">
                    <User className="h-3 w-3 text-navy-dark/75" />
                  </span>
                  <span className="text-[13px] leading-snug text-navy-dark/80">
                    <span className="font-semibold text-navy-dark">You: </span>
                    {s.you}
                  </span>
                </p>
              </motion.li>
            ))}
          </ol>
        </div>

        <motion.div
          className="mt-16 flex items-center gap-4 rounded-2xl bg-white px-6 py-5 ring-1 ring-line sm:inline-flex"
          {...rise()}
        >
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-mark">
            <Clock className="h-5 w-5 text-navy-dark" />
          </span>
          <span className="text-[17px] font-semibold tracking-[-0.02em] text-navy-dark">
            {PR.total}
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;
