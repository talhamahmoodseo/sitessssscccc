import { motion } from "motion/react";
import { Clock } from "lucide-react";
import { haroQuotes as C } from "../content/haroQuotes";
import { Eyebrow, H2, Soft, ease, rise } from "../kit";

/**
 * How it runs, measured in the one thing a busy expert cares about: their
 * own time. Our side of each step on the left, yours on the right with a bar
 * scaled to the minutes it takes.
 */
const Time = () => {
  const T = C.time;
  const max = Math.max(...T.steps.map((s) => s.w));
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="mb-12 max-w-3xl" {...rise()}>
          <Eyebrow className="mb-4">{T.eyebrow}</Eyebrow>
          <H2>
            {T.h2a}
            <br />
            <Soft>{T.h2b}</Soft>
          </H2>
        </motion.div>

        <motion.div
          className="overflow-hidden rounded-3xl ring-1 ring-line"
          {...rise(0.05)}
        >
          <div className="hidden grid-cols-[48px_1fr_1.1fr_1fr] gap-6 border-b border-line bg-mist px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-dark/70 md:grid">
            <span>#</span>
            <span>Step</span>
            <span>What we do</span>
            <span>Your time</span>
          </div>
          <ol>
            {T.steps.map((s, n) => (
              <li
                key={s.t}
                className={`grid gap-x-6 gap-y-2 px-6 py-5 md:grid-cols-[48px_1fr_1.1fr_1fr] md:items-center ${
                  n ? "border-t border-line" : ""
                }`}
              >
                <span className="text-[13px] font-semibold tabular-nums text-navy-dark/70">
                  {String(n + 1).padStart(2, "0")}
                </span>
                <span className="text-[17px] font-semibold text-navy-dark">
                  {s.t}
                </span>
                <span className="text-[14.5px] leading-snug text-navy-dark/75">
                  {s.us}
                </span>
                <span className="flex items-center gap-3">
                  <span className="relative h-2.5 w-28 flex-none overflow-hidden rounded-full bg-linen sm:w-36">
                    <motion.span
                      className="absolute inset-y-0 left-0 rounded-full bg-blush"
                      initial={{ width: 0 }}
                      whileInView={{
                        width: s.w
                          ? `${Math.max(6, (s.w / max) * 100)}%`
                          : "0%",
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.2 + n * 0.1, ease }}
                    />
                  </span>
                  <span
                    className={`text-[14px] font-semibold ${s.w ? "text-navy-dark" : "text-verified"}`}
                  >
                    {s.you}
                  </span>
                </span>
              </li>
            ))}
          </ol>
          <div className="flex items-center gap-3 bg-navy-dark px-6 py-5">
            <Clock className="h-5 w-5 flex-none text-white" />
            <p className="text-[16px] font-semibold text-white">{T.total}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Time;
