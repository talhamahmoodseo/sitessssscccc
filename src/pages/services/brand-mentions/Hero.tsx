import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { brandMentions as C } from "../content/brandMentions";
import { CARD, GlowPanel, ease } from "../kit";
import { HeroButtons, HeroChip } from "../common";
import { EngineMark } from "./Engine";

const CHARS_PER_TICK = 2;
const TICK_MS = 28;
const HOLD_MS = 4200;

/**
 * The hero's proof: a buyer's question, the AI's answer typing out with the
 * brand named in it, then the sources behind the answer, two of them marked
 * as ones we placed. Cycles through three engines.
 */
const AnswerCard = () => {
  const H = C.hero;
  const reduced = useReducedMotion();
  const full = useMemo(() => H.answer.map((s) => s.t).join(""), [H.answer]);
  const [engine, setEngine] = useState(0);
  const [shown, setShown] = useState(reduced ? full.length : 0);
  const done = shown >= full.length;

  useEffect(() => {
    if (reduced) return;
    setShown(0);
    let n = 0;
    const t = setInterval(() => {
      n += CHARS_PER_TICK;
      setShown(Math.min(n, full.length));
      if (n >= full.length) clearInterval(t);
    }, TICK_MS);
    return () => clearInterval(t);
  }, [engine, full.length, reduced]);

  useEffect(() => {
    if (reduced || !done) return;
    const t = setTimeout(
      () => setEngine((e) => (e + 1) % H.engines.length),
      HOLD_MS,
    );
    return () => clearTimeout(t);
  }, [done, reduced, H.engines.length]);

  /* render the typed prefix, keeping the brand and citation styling */
  let left = shown;
  const parts = H.answer.map((s, n) => {
    const text = s.t.slice(0, Math.max(0, left));
    left -= s.t.length;
    if (!text) return null;
    if (s.brand)
      return (
        <span
          key={n}
          className="rounded bg-lilac px-1 font-semibold text-navy-dark"
        >
          {text}
        </span>
      );
    if (s.cite)
      return (
        <sup
          key={n}
          className="ml-0.5 rounded bg-sky px-1 text-[10px] font-bold text-navy-dark"
        >
          {text.replace(/[[\]]/g, "")}
        </sup>
      );
    return <span key={n}>{text}</span>;
  });

  return (
    <div className={`${CARD} overflow-hidden`}>
      <div
        className="flex items-center gap-1 overflow-x-auto border-b border-line px-3 py-3 sm:gap-1.5 sm:px-4"
        role="tablist"
        aria-label="AI tools"
      >
        {H.engines.map((e, n) => (
          <button
            key={e}
            role="tab"
            aria-selected={engine === n}
            onClick={() => setEngine(n)}
            className={`relative inline-flex flex-none items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[12px] font-semibold transition-colors sm:px-3 ${
              engine === n
                ? "text-navy-dark"
                : "text-navy-dark/70 hover:text-navy-dark"
            }`}
          >
            {engine === n && (
              <motion.span
                layoutId="bm-engine"
                className="absolute inset-0 rounded-full bg-mist ring-1 ring-line"
                transition={{ duration: 0.35, ease }}
              />
            )}
            <span className="relative">
              <EngineMark name={e} className="h-3.5 w-3.5" />
            </span>
            <span className="relative">{e}</span>
          </button>
        ))}
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        <div className="flex justify-end">
          <p className="max-w-[85%] rounded-2xl rounded-br-md bg-linen px-4 py-3 text-[13.5px] leading-snug text-navy-dark">
            {H.question}
          </p>
        </div>

        <div className="flex gap-3">
          <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-mist ring-1 ring-line">
            <EngineMark name={H.engines[engine]} className="h-4 w-4" />
          </span>
          <p
            className="min-h-[96px] text-[14.5px] leading-relaxed text-navy-dark/85"
            aria-live="polite"
          >
            {parts}
            {!done && (
              <span className="ml-0.5 inline-block h-[15px] w-[2px] animate-pulse bg-navy-dark/60 align-middle" />
            )}
          </p>
        </div>

        {/* always rendered, so the card never changes height while typing */}
        <motion.div
          className="rounded-2xl bg-mist p-3 ring-1 ring-line"
          animate={{ opacity: done ? 1 : 0, y: done ? 0 : 8 }}
          transition={{ duration: 0.4, ease }}
          aria-hidden={!done}
        >
          <p className="px-1 pb-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-navy-dark/70">
            Sources
          </p>
          <ul className="space-y-1">
            {H.sources.map((s, n) => (
              <motion.li
                key={`${engine}-${s.d}`}
                className="flex items-center gap-2.5 rounded-lg bg-white px-3 py-2 ring-1 ring-line"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: done ? 1 : 0, x: done ? 0 : -8 }}
                transition={{
                  duration: 0.3,
                  delay: done ? 0.15 + n * 0.12 : 0,
                }}
              >
                <span className="flex h-4 w-4 flex-none items-center justify-center rounded bg-sky text-[9.5px] font-bold text-navy-dark">
                  {s.n}
                </span>
                <span className="min-w-0 flex-1 truncate font-mono text-[11.5px] text-navy-dark/80">
                  {s.d}
                </span>
                {s.ours && (
                  <span className="inline-flex flex-none items-center gap-1 rounded-full bg-lilac px-2 py-0.5 text-[10px] font-bold text-navy-dark">
                    <Check className="h-2.5 w-2.5" />
                    Placed by us
                  </span>
                )}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

const Hero = () => {
  const H = C.hero;
  return (
    <section className="relative overflow-hidden bg-mist pt-28 pb-20 lg:pt-36 lg:pb-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:px-8">
        <div className="min-w-0">
          <h1>
            <HeroChip>{H.eyebrow}</HeroChip>
            <motion.span
              className="block text-[2.35rem] font-semibold leading-[0.98] tracking-[-0.045em] text-navy-dark sm:text-[3.6rem] lg:text-[3.75rem] xl:text-[4rem]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.05, ease }}
            >
              {H.h1a}
            </motion.span>
            <motion.span
              className="mt-1 block text-[2.35rem] font-semibold leading-[0.98] tracking-[-0.045em] pb-[0.06em] sm:text-[3.6rem] lg:text-[3.75rem] xl:text-[4rem]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.14, ease }}
            >
              <span className="accent-ink">{H.h1b}</span>
            </motion.span>
          </h1>
          <motion.p
            className="mt-7 max-w-[34rem] text-[17px] leading-relaxed text-navy-dark/75 sm:text-[18px]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
          >
            {H.lead}
          </motion.p>
          <HeroButtons primary={H.primary} />
          <motion.div
            className="mt-7 flex items-center gap-2.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <span className="text-[13px] text-navy-dark/75">
              10,000+ backlinks delivered for brands and agencies worldwide
            </span>
          </motion.div>
        </div>

        <motion.div
          className="relative min-w-0"
          initial={{ opacity: 0, y: 34, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
        >
          <GlowPanel tone="cool" className="p-5 sm:p-10 lg:p-12">
            <div className="mx-auto max-w-[480px]">
              <AnswerCard />
            </div>
          </GlowPanel>
          <motion.div
            className={`${CARD} absolute -bottom-7 -left-3 z-10 hidden px-4 py-3 sm:block lg:-left-8`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: [0, -6, 0] }}
            transition={{
              opacity: { duration: 0.6, delay: 1.2 },
              y: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.2,
              },
            }}
          >
            <span className="block text-[11px] text-navy-dark/70">
              Buyer questions naming you
            </span>
            <span className="mt-0.5 block text-[18px] font-semibold tabular-nums tracking-[-0.02em] text-navy-dark">
              0 → 26{" "}
              <span className="text-[13px] font-medium text-navy-dark/70">
                of 42
              </span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
