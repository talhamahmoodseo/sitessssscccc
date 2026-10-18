import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { Check, X } from "lucide-react";
import { brandMentions as C } from "../content/brandMentions";
import { DarkGlow, Eyebrow, H2, Soft, ease, rise } from "../kit";
import { EngineMark } from "./Engine";

/**
 * The page's signature interaction: the same buyer question, asked at month 0
 * and at month 6. Flip between them and watch who gets named, and which
 * sources changed underneath. Flips itself once when it comes into view.
 */
const BeforeAfter = () => {
  const B = C.beforeAfter;
  const [i, setI] = useState(0);
  const [touched, setTouched] = useState(false);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-160px" });
  const s = B.states[i];
  const after = i === 1;

  useEffect(() => {
    if (!inView || touched || reduced) return;
    const t = setTimeout(() => setI(1), 2600);
    return () => clearTimeout(t);
  }, [inView, touched, reduced]);

  const pick = (n: number) => {
    setI(n);
    setTouched(true);
  };

  return (
    <section className="relative overflow-hidden bg-navy-dark py-24 lg:py-32">
      <DarkGlow className="-right-40 top-0 h-[520px] w-[760px] opacity-60" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="mx-auto max-w-3xl text-center" {...rise()}>
          <Eyebrow dark className="mb-4">
            {B.eyebrow}
          </Eyebrow>
          <H2 dark>
            {B.h2a}
            <br />
            <Soft dark>{B.h2b}</Soft>
          </H2>
        </motion.div>

        {/* month toggle */}
        <div ref={ref} className="mt-10 flex justify-center">
          <div
            className="relative inline-flex rounded-full bg-white/[0.08] p-1 ring-1 ring-white/15"
            role="tablist"
          >
            {B.states.map((st, n) => (
              <button
                key={st.k}
                role="tab"
                aria-selected={i === n}
                onClick={() => pick(n)}
                className={`relative rounded-full px-6 py-2.5 text-[14px] font-semibold transition-colors ${
                  i === n ? "text-navy-dark" : "text-white/80 hover:text-white"
                }`}
              >
                {i === n && (
                  <motion.span
                    layoutId="bm-month"
                    className="absolute inset-0 rounded-full bg-white"
                    transition={{ duration: 0.4, ease }}
                  />
                )}
                <span className="relative">{st.k}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          {/* the answer */}
          <div className="overflow-hidden rounded-3xl bg-white">
            <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
              {["ChatGPT", "Perplexity", "AI Overviews"].map((e) => (
                <EngineMark key={e} name={e} className="h-4 w-4" />
              ))}
              <span className="ml-1 text-[12px] font-semibold text-navy-dark/75">
                Same answer pattern across tools
              </span>
            </div>
            <div className="p-5 sm:p-7">
              <div className="flex justify-end">
                <p className="rounded-2xl rounded-br-md bg-linen px-4 py-2.5 text-[14px] text-navy-dark">
                  {B.question}
                </p>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={s.k}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease }}
                >
                  <p className="mt-5 text-[16px] leading-relaxed text-navy-dark/85 sm:text-[17px]">
                    {s.answer.split(/(YourBrand)/).map((t, n) =>
                      t === "YourBrand" ? (
                        <span
                          key={n}
                          className="rounded bg-lilac px-1 font-semibold text-navy-dark"
                        >
                          {t}
                        </span>
                      ) : (
                        <span key={n}>{t}</span>
                      ),
                    )}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-dark/70">
                      Named
                    </span>
                    {s.named.map((nm) => (
                      <span
                        key={nm}
                        className={`rounded-full px-3 py-1 text-[12.5px] font-semibold ${
                          nm === "YourBrand"
                            ? "bg-lilac text-navy-dark"
                            : "bg-mist text-navy-dark/80 ring-1 ring-line"
                        }`}
                      >
                        {nm}
                      </span>
                    ))}
                    {!after && (
                      <span className="rounded-full px-3 py-1 text-[12.5px] font-semibold border border-dashed border-gap/60 text-gap">
                        YourBrand: missing
                      </span>
                    )}
                  </div>

                  <div className="mt-6 rounded-2xl bg-mist p-3 ring-1 ring-line">
                    <p className="px-1 pb-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-navy-dark/70">
                      Sources behind this answer
                    </p>
                    <ul className="space-y-1">
                      {s.sources.map((src) => (
                        <li
                          key={src.d}
                          className="flex flex-wrap items-center gap-2.5 rounded-lg bg-white px-3 py-2 ring-1 ring-line"
                        >
                          <span className="min-w-0 flex-1 truncate font-mono text-[12px] text-navy-dark/80">
                            {src.d}
                          </span>
                          {src.you ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-lilac px-2 py-0.5 text-[10.5px] font-bold text-navy-dark">
                              <Check className="h-2.5 w-2.5" />
                              Mentions you · {src.note}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-navy-dark/70">
                              <X className="h-2.5 w-2.5" />
                              Doesn’t mention you
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* the scoreboard */}
          <div className="flex flex-col gap-5">
            <div className="rounded-3xl bg-white/[0.06] p-6 ring-1 ring-white/10">
              <p className="text-[12px] text-white/70">
                Buyer questions naming YourBrand
              </p>
              <p className="mt-2 flex items-baseline gap-2">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={s.share}
                    className="text-[3.4rem] font-semibold leading-none tracking-[-0.05em] text-white tabular-nums"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35 }}
                  >
                    {s.share}
                  </motion.span>
                </AnimatePresence>
                <span className="text-[15px] text-white/70">of {B.total}</span>
              </p>
              <div
                className="mt-5 grid grid-cols-[repeat(14,minmax(0,1fr))] gap-1"
                aria-hidden="true"
              >
                {Array.from({ length: B.total }).map((_, n) => (
                  <motion.span
                    key={n}
                    className="aspect-square rounded-full"
                    animate={{
                      backgroundColor:
                        n < s.share
                          ? "rgb(209 204 248)"
                          : "rgba(255,255,255,0.12)",
                    }}
                    transition={{ duration: 0.3, delay: after ? n * 0.025 : 0 }}
                  />
                ))}
              </div>
            </div>
            <div className="rounded-3xl bg-white/[0.06] p-6 ring-1 ring-white/10">
              <p className="text-[12px] text-white/70">
                AI tools naming YourBrand
              </p>
              <p className="mt-2 text-[2.2rem] font-semibold leading-none tracking-[-0.04em] text-white tabular-nums">
                {s.engines}{" "}
                <span className="text-[15px] font-medium text-white/70">
                  of 4
                </span>
              </p>
            </div>
            <div
              className={`flex items-center gap-3 rounded-3xl p-5 ${
                after ? "bg-lilac text-navy-dark" : "bg-gap/[0.18] text-white"
              }`}
            >
              {after ? (
                <Check className="h-5 w-5 flex-none" />
              ) : (
                <X className="h-5 w-5 flex-none" />
              )}
              <span className="text-[15px] font-semibold">{s.verdict}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
