import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { digitalPr as C } from "../content/digitalPr";
import { CARD, Eyebrow, H2, Soft, ease, rise } from "../kit";
import Clipping from "./Clipping";

const CYCLE_MS = 9000;

const Arrow = ({ delay }: { delay: number }) => (
  <motion.span
    className="flex items-center justify-center text-navy-dark/45"
    initial={{ opacity: 0, scale: 0.6 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.35, delay }}
    aria-hidden="true"
  >
    <ArrowRight className="hidden h-5 w-5 lg:block" />
    <ArrowDown className="h-5 w-5 lg:hidden" />
  </motion.span>
);

/**
 * Story Lab: the craft of PR, shown rather than claimed. Pick a kind of raw
 * material and watch it become an angle, then a headline. Auto-advances until
 * the visitor picks a tab themselves.
 */
const StoryLab = () => {
  const L = C.lab;
  const [i, setI] = useState(0);
  const [touched, setTouched] = useState(false);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-120px" });
  const tab = L.tabs[i];

  useEffect(() => {
    if (touched || reduced || !inView) return;
    const t = setTimeout(() => setI((n) => (n + 1) % L.tabs.length), CYCLE_MS);
    return () => clearTimeout(t);
  }, [i, touched, reduced, inView, L.tabs.length]);

  return (
    <section className="bg-mist py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="mx-auto max-w-3xl text-center" {...rise()}>
          <Eyebrow className="mb-4">{L.eyebrow}</Eyebrow>
          <H2>
            {L.h2a}
            <br />
            <Soft>{L.h2b}</Soft>
          </H2>
          <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-navy-dark/75">
            {L.lead}
          </p>
        </motion.div>

        <div
          ref={ref}
          className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2"
          role="tablist"
          aria-label="Kinds of raw material"
        >
          {L.tabs.map((t, n) => (
            <button
              key={t.t}
              role="tab"
              aria-selected={i === n}
              onClick={() => {
                setI(n);
                setTouched(true);
              }}
              className={`relative overflow-hidden rounded-full px-5 py-2.5 text-[14px] font-semibold transition-colors duration-300 ${
                i === n
                  ? "bg-navy-dark text-white"
                  : "bg-white text-navy-dark/80 ring-1 ring-line hover:text-navy-dark hover:ring-navy-dark/30"
              }`}
            >
              {t.t}
              {i === n && !touched && !reduced && (
                <motion.span
                  key={`bar-${i}`}
                  className="absolute bottom-0 left-0 h-[2px] bg-mark"
                  initial={{ width: "0%" }}
                  animate={{ width: inView ? "100%" : "0%" }}
                  transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="mt-10">
          <div className="mb-4 hidden grid-cols-[1fr_auto_1fr_auto_1fr] gap-5 lg:grid">
            {L.steps.map((s, n) => (
              <p
                key={s}
                className={`text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-dark/70 ${
                  n === 1 ? "col-start-3" : n === 2 ? "col-start-5" : ""
                }`}
              >
                {s}
              </p>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              className="grid items-stretch gap-5 lg:grid-cols-[1fr_auto_1fr_auto_1fr]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {/* the raw note, as it came to us */}
              <motion.div
                className="relative flex flex-col rounded-2xl bg-butter/70 p-6 shadow-[0_24px_40px_-30px_rgba(14,14,14,0.45)]"
                initial={{ opacity: 0, y: 16, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate: -1.2 }}
                transition={{ duration: 0.5, ease }}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-dark/75 lg:hidden">
                  {L.steps[0]}
                </p>
                <p className="mt-2 font-hand text-[23px] leading-[1.25] text-navy-dark lg:mt-0">
                  “{tab.note}”
                </p>
                <p className="mt-auto pt-6 text-[12px] font-semibold text-navy-dark/75">
                  From the story audit call
                </p>
              </motion.div>

              <Arrow delay={0.45} />

              {/* the angle */}
              <motion.div
                className={`${CARD} flex flex-col p-6`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55, ease }}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-dark/75 lg:hidden">
                  {L.steps[1]}
                </p>
                <p className="mt-2 text-[20px] font-semibold leading-[1.25] tracking-[-0.02em] text-navy-dark lg:mt-0">
                  {tab.angle}
                </p>
                <p className="mt-auto border-t border-line pt-4 text-[13.5px] leading-relaxed text-navy-dark/75">
                  <span className="font-semibold text-navy-dark">
                    Why it works:{" "}
                  </span>
                  {tab.why}
                </p>
              </motion.div>

              <Arrow delay={1} />

              {/* what ran */}
              <motion.div
                initial={{ opacity: 0, y: -24, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate: 1 }}
                transition={{ duration: 0.6, delay: 1.1, ease }}
              >
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-dark/75 lg:hidden">
                  {L.steps[2]}
                </p>
                <Clipping
                  className="h-full"
                  c={{
                    outlet: tab.ran.outlet,
                    desk: tab.ran.desk,
                    head: tab.ran.head,
                    mention: tab.ran.mention,
                    kind: tab.ran.kind,
                  }}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default StoryLab;
