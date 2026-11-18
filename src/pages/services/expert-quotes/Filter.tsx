import { motion } from "motion/react";
import { Check, X } from "lucide-react";
import { haroQuotes as C } from "../content/haroQuotes";
import { DarkGlow, Eyebrow, H2, Soft, ease, rise } from "../kit";

/**
 * A sample week of requests, sorted in front of you: each one lands, then gets
 * its verdict and the reason. Most say skip, which is the whole point.
 */
const Filter = () => {
  const F = C.filter;
  return (
    <section className="relative overflow-hidden bg-navy-dark py-24 lg:py-32">
      <DarkGlow className="-left-56 bottom-0 h-[520px] w-[760px] opacity-55" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <motion.div {...rise()}>
            <Eyebrow dark className="mb-4">
              {F.eyebrow}
            </Eyebrow>
            <H2 dark>
              {F.h2a}
              <br />
              <Soft dark>{F.h2b}</Soft>
            </H2>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/75">
              {F.lead}
            </p>
          </motion.div>
          <motion.div className="flex gap-3 lg:justify-end" {...rise(0.1)}>
            <span className="rounded-2xl bg-mint px-5 py-4">
              <span className="block text-[2rem] font-semibold leading-none tracking-[-0.04em] text-navy-dark">
                {F.tally.answered.split(" ")[0]}
              </span>
              <span className="mt-1 block text-[12px] font-semibold text-navy-dark/80">
                answered
              </span>
            </span>
            <span className="rounded-2xl bg-white/[0.08] px-5 py-4 ring-1 ring-white/15">
              <span className="block text-[2rem] font-semibold leading-none tracking-[-0.04em] text-white">
                {F.tally.skipped.split(" ")[0]}
              </span>
              <span className="mt-1 block text-[12px] font-semibold text-white/75">
                skipped {F.tally.note}
              </span>
            </span>
          </motion.div>
        </div>

        <ul className="space-y-2">
          {F.requests.map((r, n) => (
            <motion.li
              key={r.ask}
              className={`grid items-center gap-x-6 gap-y-2 rounded-2xl px-5 py-4 ring-1 sm:grid-cols-[1.15fr_1fr_96px] ${
                r.ok
                  ? "bg-white/[0.09] ring-white/20"
                  : "bg-white/[0.03] ring-white/10"
              }`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: n * 0.09, ease }}
            >
              <span className="min-w-0">
                <span
                  className={`block text-[15px] font-semibold ${r.ok ? "text-white" : "text-white/80"}`}
                >
                  {r.ask}
                </span>
                <span className="mt-0.5 block text-[12px] text-white/60">
                  {r.outlet}
                </span>
              </span>
              <motion.span
                className="text-[13.5px] leading-snug text-white/75"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: 0.5 + n * 0.09 }}
              >
                {r.why}
              </motion.span>
              <motion.span
                className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-bold sm:justify-self-end ${
                  r.ok ? "bg-mint text-navy-dark" : "bg-white/10 text-white/80"
                }`}
                initial={{ opacity: 0, scale: 1.3 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.3,
                  delay: 0.6 + n * 0.09,
                  type: "spring",
                  stiffness: 320,
                  damping: 18,
                }}
              >
                {r.ok ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <X className="h-3.5 w-3.5" />
                )}
                {r.ok ? "Answer" : "Skip"}
              </motion.span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Filter;
