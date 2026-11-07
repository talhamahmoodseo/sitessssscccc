import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { RotateCw } from "lucide-react";
import { brandMentions as C } from "../content/brandMentions";
import { Eyebrow, H2, Soft, ease, rise } from "../kit";

const SIZE = 360;
const R = 128;
const STEP_MS = 4200;

/**
 * The process as what it is: a loop that runs every month. Five nodes on a
 * ring, the active one travels round on its own; click any node to read it.
 */
const Loop = () => {
  const L = C.loop;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-120px" });
  const step = L.steps[i];
  const n = L.steps.length;

  useEffect(() => {
    if (paused || reduced || !inView) return;
    const t = setTimeout(() => setI((x) => (x + 1) % n), STEP_MS);
    return () => clearTimeout(t);
  }, [i, paused, reduced, inView, n]);

  const pos = (k: number) => {
    const a = (k / n) * Math.PI * 2 - Math.PI / 2;
    return { x: SIZE / 2 + R * Math.cos(a), y: SIZE / 2 + R * Math.sin(a) };
  };

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="max-w-3xl" {...rise()}>
          <Eyebrow className="mb-4">{L.eyebrow}</Eyebrow>
          <H2>
            {L.h2a}
            <br />
            <Soft>{L.h2b}</Soft>
          </H2>
        </motion.div>

        <div
          ref={ref}
          className="mt-12 grid items-center gap-10 lg:grid-cols-[360px_1fr] lg:gap-20"
        >
          {/* the ring */}
          <div className="relative mx-auto aspect-square w-[min(100%,360px)]">
            <svg
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <circle
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={R}
                fill="none"
                stroke="rgb(var(--line))"
                strokeWidth={2}
              />
              <motion.circle
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={R}
                fill="none"
                stroke="rgb(var(--ink))"
                strokeWidth={2}
                strokeLinecap="round"
                style={{ rotate: -90, transformOrigin: "50% 50%" }}
                animate={{ pathLength: (i + 1) / n }}
                transition={{ duration: 0.8, ease }}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <RotateCw className="h-5 w-5 text-navy-dark/60" />
              <p className="mt-2 text-[13px] font-semibold text-navy-dark">
                Every month
              </p>
              <p className="text-[12px] text-navy-dark/70">
                same questions, same tools
              </p>
            </div>

            {L.steps.map((s, k) => {
              const p = pos(k);
              const active = k === i;
              return (
                <button
                  key={s.k}
                  onClick={() => {
                    setI(k);
                    setPaused(true);
                  }}
                  aria-pressed={active}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${(p.x / SIZE) * 100}%`,
                    top: `${(p.y / SIZE) * 100}%`,
                  }}
                >
                  <motion.span
                    className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-semibold ring-1 transition-colors duration-300 ${
                      active
                        ? "bg-navy-dark text-white ring-navy-dark"
                        : "bg-white text-navy-dark ring-line hover:ring-navy-dark/40"
                    }`}
                    animate={{ scale: active ? 1.08 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span
                      className={`text-[10.5px] tabular-nums ${active ? "text-white/70" : "text-navy-dark/60"}`}
                    >
                      {String(k + 1).padStart(2, "0")}
                    </span>
                    {s.k}
                  </motion.span>
                </button>
              );
            })}
          </div>

          {/* the detail */}
          <div className="min-h-[260px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease }}
              >
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-navy-dark/70">
                  Step {i + 1} of {n}
                </p>
                <h3 className="mt-3 text-[2rem] font-semibold leading-tight tracking-[-0.035em] text-navy-dark sm:text-[2.4rem]">
                  {step.t}
                </h3>
                <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-navy-dark/75">
                  {step.d}
                </p>
                <p className="mt-6 inline-flex max-w-xl rounded-2xl bg-lilac/60 px-5 py-3.5 text-[14.5px] leading-snug text-navy-dark">
                  <span className="mr-1.5 font-semibold">Your part:</span>
                  {step.you}
                </p>
              </motion.div>
            </AnimatePresence>
            <div className="mt-8 flex gap-1.5">
              {L.steps.map((s, k) => (
                <button
                  key={s.k}
                  onClick={() => {
                    setI(k);
                    setPaused(true);
                  }}
                  aria-label={`Show step ${k + 1}: ${s.t}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    k === i
                      ? "w-8 bg-navy-dark"
                      : "w-4 bg-navy-dark/20 hover:bg-navy-dark/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Loop;
