import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { Check, X } from "lucide-react";
import { linkBuilding as LB } from "../content/linkBuilding";
import { CARD, Eyebrow, H2, Soft, ease, rise } from "./kit";

const P = LB.problem;

/** The same six links, read two ways. Flips to "what Google sees" on its own
 *  the first time it scrolls into view, then the reader can flip it back. */
const LinkTable = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-35% 0px" });
  const [real, setReal] = useState(false);
  const touched = useRef(false);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => {
      if (!touched.current) setReal(true);
    }, 1400);
    return () => clearTimeout(t);
  }, [inView]);

  const pick = (v: boolean) => {
    touched.current = true;
    setReal(v);
  };

  return (
    <div ref={ref} className={`${CARD} overflow-hidden`}>
      <div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="pl-1 text-[12px] font-semibold text-navy-dark">
          Monthly link report
        </span>
        <div
          className="relative grid grid-cols-2 rounded-full bg-linen p-1"
          role="tablist"
          aria-label="Report view"
        >
          {P.toggle.map((label, n) => {
            const on = (n === 1) === real;
            return (
              <button
                key={label}
                role="tab"
                aria-selected={on}
                onClick={() => pick(n === 1)}
                className={`relative rounded-full px-4 py-2 text-[12.5px] font-semibold transition-colors duration-300 ${
                  on ? "text-white" : "text-navy-dark/70 hover:text-navy-dark"
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="rvr-pill"
                    className="absolute inset-0 rounded-full bg-navy-dark"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <ul>
        {P.rows.map((r, n) => {
          const bad = real && !r.ok;
          return (
            <li
              key={r.site}
              className={`flex items-center gap-4 border-b border-line px-5 py-3.5 transition-colors duration-500 last:border-0 ${
                bad ? "bg-gap/[0.06]" : ""
              }`}
            >
              <span className="min-w-0 flex-1">
                <span className="block truncate font-mono text-[12.5px] text-navy-dark">
                  {r.site}
                </span>
                <span className="mt-0.5 block text-[11.5px] text-navy-dark/70">
                  DR {r.dr}
                </span>
              </span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={real ? "real" : "report"}
                  className="flex flex-none items-center gap-3 text-right"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, delay: n * 0.05 }}
                >
                  <span>
                    <span
                      className={`block text-[13px] font-semibold tabular-nums ${
                        bad ? "text-gap" : "text-navy-dark"
                      }`}
                    >
                      {real ? r.real : `${r.traffic} traffic`}
                    </span>
                    <span className="mt-0.5 block text-[11.5px] text-navy-dark/70">
                      {real ? r.note : "Delivered"}
                    </span>
                  </span>
                  <span
                    className={`flex h-6 w-6 flex-none items-center justify-center rounded-full ${
                      bad ? "bg-gap/15" : "bg-verified/15"
                    }`}
                  >
                    {bad ? (
                      <X className="h-3.5 w-3.5 text-gap" />
                    ) : (
                      <Check className="h-3.5 w-3.5 text-verified" />
                    )}
                  </span>
                </motion.span>
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      <div
        className={`flex items-center justify-between gap-3 px-5 py-4 transition-colors duration-500 ${
          real ? "bg-navy-dark" : "bg-linen"
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={real ? "r" : "p"}
            className={`text-[13px] font-semibold ${
              real ? "text-white" : "text-navy-dark"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {real ? P.realitySummary : P.reportSummary}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

const ReportVsReality = () => (
  <section className="bg-white py-24 lg:py-36">
    <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 lg:px-8">
      <div className="lg:pt-6">
        <motion.div {...rise()}>
          <Eyebrow className="mb-4">{P.eyebrow}</Eyebrow>
          <H2>
            {P.h2a}
            <br />
            <Soft>{P.h2b}</Soft>
          </H2>
        </motion.div>
        <motion.div className="mt-8 max-w-xl space-y-5" {...rise(0.08)}>
          <p className="text-[16.5px] leading-[1.75] text-navy-dark/75">
            {P.paras[0]}
          </p>
          <p className="text-[21px] font-semibold leading-snug tracking-[-0.02em] text-navy-dark">
            {P.paras[1]}
          </p>
          <p className="text-[16.5px] leading-[1.75] text-navy-dark/75">
            {P.paras[2]}
          </p>
        </motion.div>
        <motion.p
          className="mt-9 max-w-xl border-l-2 border-navy-dark pl-5 text-[17px] font-medium leading-relaxed text-navy-dark"
          {...rise(0.12)}
        >
          {P.kicker}
        </motion.p>
      </div>
      <motion.div {...rise(0.1)} transition={{ duration: 0.8, delay: 0.1, ease }}>
        <LinkTable />
        <p className="mt-4 text-center text-[12px] text-navy-dark/70">
          Illustrative: a typical marketplace report, and what it hid.
        </p>
      </motion.div>
    </div>
  </section>
);

export default ReportVsReality;
