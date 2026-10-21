import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Eyebrow, H2, Soft, ease, rise } from "../services/kit";
import { about as A } from "./content";

const Word = ({
  p,
  from,
  to,
  children,
}: {
  p: MotionValue<number>;
  from: number;
  to: number;
  children: string;
}) => {
  const opacity = useTransform(p, [from, to], [0.16, 1]);
  return <motion.span style={{ opacity }}>{children} </motion.span>;
};

/* one line of the manifesto: its words go from grey to ink as it scrolls up */
const Line = ({ text }: { text: string }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  // plain text for reduced motion, and in the prerendered HTML (fully legible
  // before JavaScript runs)
  const reduced =
    useReducedMotion() ||
    (typeof window !== "undefined" && (window as any).__PRERENDER__);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"],
  });
  const words = text.split(" ");
  return (
    <p
      ref={ref}
      className="text-[1.6rem] font-medium leading-[1.3] tracking-[-0.03em] text-navy-dark sm:text-[2.2rem] lg:text-[2.5rem]"
    >
      {reduced
        ? text
        : words.map((w, i) => (
            <Word
              key={i}
              p={scrollYProgress}
              from={i / words.length}
              to={(i + 1) / words.length}
            >
              {w}
            </Word>
          ))}
    </p>
  );
};

/** Why we exist, told as a manifesto that reveals itself as you read. */
export const Manifesto = () => (
  <section className="bg-white py-28 lg:py-40">
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <Eyebrow className="mb-10">{A.story.eyebrow}</Eyebrow>
      <div className="space-y-10 lg:space-y-14">
        {A.story.lines.map((l) => (
          <Line key={l} text={l} />
        ))}
      </div>
    </div>
  </section>
);

/** What we believe: four short convictions, then the one rule under all of
 *  them. */
export const Beliefs = () => {
  const B = A.beliefs;
  return (
    <section className="bg-mist py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="mb-14 max-w-3xl" {...rise()}>
          <Eyebrow className="mb-4">{B.eyebrow}</Eyebrow>
          <H2>
            {B.h2a}
            <br />
            <Soft>{B.h2b}</Soft>
          </H2>
        </motion.div>

        <ol className="grid gap-5 md:grid-cols-2">
          {B.items.map((b, n) => (
            <motion.li
              key={b.n}
              className="flex gap-5 rounded-3xl bg-white p-7 ring-1 ring-line sm:gap-7 sm:p-9"
              {...rise(0.1 + n * 0.08)}
            >
              <span
                className={`flex h-12 w-12 flex-none items-center justify-center rounded-2xl ${b.tint} text-[15px] font-bold tabular-nums text-navy-dark`}
              >
                {b.n}
              </span>
              <span>
                <h3 className="text-[1.3rem] font-semibold leading-snug tracking-[-0.03em] text-navy-dark sm:text-[1.45rem]">
                  {b.t}
                </h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-navy-dark/75">
                  {b.d}
                </p>
              </span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};
