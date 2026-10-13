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
  const reduced = useReducedMotion();
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

/** Three turning points on one line, and the rule that held through all of
 *  them. */
export const Chapters = () => {
  const C = A.chapters;
  return (
    <section className="bg-mist py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="mb-14 max-w-3xl" {...rise()}>
          <Eyebrow className="mb-4">{C.eyebrow}</Eyebrow>
          <H2>
            {C.h2a}
            <br />
            <Soft>{C.h2b}</Soft>
          </H2>
        </motion.div>

        <div className="relative">
          <motion.span
            className="absolute left-0 right-0 top-[11px] hidden h-px origin-left bg-navy-dark/25 md:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.4, ease }}
            aria-hidden="true"
          />
          <ol className="grid gap-5 md:grid-cols-3">
            {C.items.map((c, n) => (
              <motion.li key={c.y} {...rise(0.15 + n * 0.12)}>
                <span className="relative z-10 hidden h-[23px] w-[23px] items-center justify-center rounded-full bg-mist md:flex">
                  <span className="h-[11px] w-[11px] rounded-full bg-navy-dark" />
                </span>
                <div className="mt-0 rounded-3xl bg-white p-7 ring-1 ring-line md:mt-6">
                  <span
                    className={`inline-flex rounded-full ${c.tint} px-3 py-1 text-[13px] font-bold text-navy-dark`}
                  >
                    {c.y}
                  </span>
                  <h3 className="mt-5 text-[1.35rem] font-semibold tracking-[-0.03em] text-navy-dark">
                    {c.t}
                  </h3>
                  <p className="mt-2.5 text-[15.5px] leading-relaxed text-navy-dark/75">
                    {c.d}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <motion.p
          className="mt-10 rounded-2xl bg-navy-dark px-6 py-5 text-[16px] font-semibold text-white sm:px-8"
          {...rise(0.1)}
        >
          {C.rule}
        </motion.p>
      </div>
    </section>
  );
};
