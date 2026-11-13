import { motion } from "motion/react";
import { digitalPr as C } from "../content/digitalPr";
import { Eyebrow, H2, Soft, ease, rise } from "../kit";

/**
 * Two lanes per step: what we do, what you do. The "you" lane is deliberately
 * small, because that's the point: a PR campaign shouldn't need your week.
 */
const Process = () => {
  const P = C.process;
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="mb-14 max-w-3xl" {...rise()}>
          <Eyebrow className="mb-4">{P.eyebrow}</Eyebrow>
          <H2>
            {P.h2a}
            <br />
            <Soft>{P.h2b}</Soft>
          </H2>
        </motion.div>

        {/* desktop: a five-column board with two lanes */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-[72px_repeat(5,1fr)] gap-3">
            <span />
            {P.steps.map((s, n) => (
              <motion.div
                key={s.t}
                className="relative pb-5"
                {...rise(n * 0.07)}
              >
                <p className="text-[12px] font-semibold text-navy-dark/70">
                  {s.when}
                </p>
                <p className="mt-1 text-[18px] font-semibold tracking-[-0.02em] text-navy-dark">
                  {s.t}
                </p>
              </motion.div>
            ))}

            {/* progress rule under the headers */}
            <span />
            <div className="relative col-span-5 h-px bg-line">
              <motion.span
                className="absolute inset-y-0 left-0 bg-navy-dark"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.8, ease }}
              />
            </div>

            <p className="pt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-dark/70">
              Us
            </p>
            {P.steps.map((s, n) => (
              <motion.p
                key={`us-${s.t}`}
                className="mt-5 rounded-2xl bg-mist p-5 text-[14.5px] leading-relaxed text-navy-dark/85 ring-1 ring-line"
                {...rise(0.15 + n * 0.07)}
              >
                {s.us}
              </motion.p>
            ))}

            <p className="pt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-dark/70">
              You
            </p>
            {P.steps.map((s, n) => (
              <motion.p
                key={`you-${s.t}`}
                className="self-start rounded-2xl bg-mint/60 px-5 py-4 text-[14px] leading-snug text-navy-dark"
                {...rise(0.3 + n * 0.07)}
              >
                {s.you}
              </motion.p>
            ))}
          </div>
        </div>

        {/* mobile and tablet: one card per step */}
        <ol className="space-y-4 lg:hidden">
          {P.steps.map((s, n) => (
            <motion.li
              key={s.t}
              className="rounded-3xl bg-mist p-6 ring-1 ring-line"
              {...rise(n * 0.05)}
            >
              <p className="text-[12px] font-semibold text-navy-dark/70">
                {String(n + 1).padStart(2, "0")} · {s.when}
              </p>
              <p className="mt-1 text-[18px] font-semibold text-navy-dark">
                {s.t}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-navy-dark/80">
                <span className="font-semibold text-navy-dark">Us: </span>
                {s.us}
              </p>
              <p className="mt-3 rounded-xl bg-mint/60 px-4 py-3 text-[14px] leading-snug text-navy-dark">
                <span className="font-semibold">You: </span>
                {s.you}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Process;
