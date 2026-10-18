import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUp, Check, X } from "lucide-react";
import { openBooking } from "@/lib/booking";
import { CLIENTS } from "@/lib/clients";
import { linkBuilding as LB } from "../content/linkBuilding";
import { CARD, GlowPanel, ease, sparkPath } from "../kit";

/** short names for the 8-Point Site Check, in the content's order */
const CHECK_NAMES = [
  "Relevance",
  "Traffic",
  "Keywords",
  "Trend",
  "Audience",
  "Authority",
  "Indexed",
  "Editorial",
];
const CYCLE_MS = 5600;

/** The hero's proof-in-five-seconds: a site being inspected, flagged and
 *  either passed or rejected, then the next one. */
const SiteCheckCard = () => {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const site = LB.heroChecks[i];
  const results = site.checks;

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(
      () => setI((n) => (n + 1) % LB.heroChecks.length),
      CYCLE_MS,
    );
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <div className={`${CARD} overflow-hidden`}>
      <div className="flex items-center gap-3 border-b border-line px-5 py-3.5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-verified/50" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-verified" />
        </span>
        <span className="text-[12px] font-semibold text-navy-dark">
          Site check
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={site.domain}
            className="ml-auto rounded-full bg-linen px-3 py-1 font-mono text-[11.5px] text-navy-dark/80"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
          >
            {site.domain}
          </motion.span>
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* metrics */}
          <div className="grid grid-cols-[auto_auto_1fr] items-end gap-6 px-5 pt-5">
            <div>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-navy-dark/70">
                DR
              </p>
              <p className="mt-1 text-[26px] font-semibold leading-none tracking-[-0.03em] text-navy-dark tabular-nums">
                {site.dr}
              </p>
            </div>
            <div>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-navy-dark/70">
                Organic / mo
              </p>
              <p
                className={`mt-1 text-[26px] font-semibold leading-none tracking-[-0.03em] tabular-nums ${
                  site.pass ? "text-navy-dark" : "text-gap"
                }`}
              >
                {site.traffic}
              </p>
            </div>
            <svg
              viewBox="0 0 160 40"
              className="h-10 w-full"
              fill="none"
              aria-hidden="true"
            >
              <motion.path
                d={sparkPath(site.trend, 160, 40)}
                stroke={site.pass ? "rgb(var(--ink))" : "rgb(var(--gap))"}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, delay: 0.15, ease }}
              />
            </svg>
          </div>

          {/* keywords */}
          <div className="px-5 pt-5">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-navy-dark/70">
              Top keywords
            </p>
            <ul className="mt-2.5 space-y-1.5">
              {site.keywords.map((k, n) => (
                <motion.li
                  key={k.k}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                    k.ok ? "bg-mist" : "bg-gap/[0.07]"
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + n * 0.22 }}
                >
                  <span className="truncate text-[12.5px] text-navy-dark/85">
                    {k.k}
                  </span>
                  <span className="ml-auto flex-none rounded bg-white px-1.5 py-0.5 text-[9.5px] font-bold text-navy-dark/70 ring-1 ring-line">
                    {k.geo}
                  </span>
                  <motion.span
                    className={`flex h-4 w-4 flex-none items-center justify-center rounded-full ${
                      k.ok ? "bg-verified/15" : "bg-gap/15"
                    }`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.8 + n * 0.22,
                      type: "spring",
                      stiffness: 380,
                      damping: 18,
                    }}
                  >
                    {k.ok ? (
                      <Check className="h-2.5 w-2.5 text-verified" />
                    ) : (
                      <X className="h-2.5 w-2.5 text-gap" />
                    )}
                  </motion.span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* the eight checks */}
          <div className="flex flex-wrap gap-1.5 px-5 pt-4">
            {CHECK_NAMES.map((c, n) => (
              <motion.span
                key={c}
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10.5px] font-semibold ${
                  results[n]
                    ? "bg-verified/10 text-verified"
                    : "bg-gap/10 text-gap"
                }`}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 1.5 + n * 0.08 }}
              >
                {results[n] ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <X className="h-3 w-3" />
                )}
                {c}
              </motion.span>
            ))}
          </div>

          {/* verdict */}
          <div className="p-5 pt-4">
            <motion.div
              className={`flex items-center gap-2.5 rounded-xl px-4 py-3 ${
                site.pass ? "bg-navy-dark text-white" : "bg-gap/10 text-gap"
              }`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 2.3, ease }}
            >
              {site.pass ? (
                <Check className="h-4 w-4 flex-none" />
              ) : (
                <X className="h-4 w-4 flex-none" />
              )}
              <span className="text-[13px] font-semibold">{site.verdict}</span>
              {site.pass && (
                <span className="ml-auto hidden text-[11px] text-white/70 sm:inline">
                  Added to shortlist
                </span>
              )}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const Floating = ({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className: string;
  delay?: number;
}) => (
  <motion.div
    className={`absolute z-10 hidden sm:block ${className}`}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: [0, -6, 0] }}
    transition={{
      opacity: { duration: 0.6, delay },
      y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay },
    }}
  >
    {children}
  </motion.div>
);

const Hero = () => (
  <section className="relative overflow-hidden bg-mist pt-28 pb-16 lg:pt-36 lg:pb-24">
    <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1.02fr] lg:gap-16 lg:px-8">
      <div>
        <h1>
          <motion.span
            className="mb-7 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[12.5px] font-semibold text-navy-dark ring-1 ring-line"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-mark-deep" />
            {LB.hero.eyebrow}
          </motion.span>
          <motion.span
            className="block text-[2.7rem] font-semibold leading-[0.98] tracking-[-0.045em] text-navy-dark sm:text-[3.6rem] lg:text-[4.3rem]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease }}
          >
            {LB.hero.h1a}
          </motion.span>
          <motion.span
            className="mt-1 block text-[2.7rem] font-semibold leading-[0.98] tracking-[-0.045em] pb-[0.06em] sm:text-[3.6rem] lg:text-[4.3rem]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.14, ease }}
          >
            <span className="accent-ink">{LB.hero.h1b}</span>
          </motion.span>
        </h1>
        <motion.p
          className="mt-7 max-w-[34rem] text-[17px] leading-relaxed text-navy-dark/75 sm:text-[18px]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
        >
          {LB.hero.lead}
        </motion.p>
        <motion.div
          className="mt-9 flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease }}
        >
          <button
            onClick={openBooking}
            className="group inline-flex items-center gap-2 rounded-full bg-navy-dark px-7 py-3.5 text-[14.5px] font-semibold text-white transition-colors duration-300 hover:bg-black"
          >
            {LB.hero.primary}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
          <Link
            to="/pricing"
            className="inline-flex items-center rounded-full bg-white px-7 py-3.5 text-[14.5px] font-semibold text-navy-dark ring-1 ring-navy-dark/15 transition-shadow duration-300 hover:ring-navy-dark/40"
          >
            {LB.hero.secondary}
          </Link>
        </motion.div>
        <motion.div
          className="mt-7 flex items-center gap-2.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <span className="text-[13px] text-navy-dark/75">
            {LB.hero.rating}
          </span>
        </motion.div>
      </div>

      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 34, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease }}
      >
        <GlowPanel tone="warm" className="p-5 sm:p-10 lg:p-12">
          <div className="mx-auto max-w-[460px]">
            <SiteCheckCard />
          </div>
        </GlowPanel>
        <Floating className="-left-4 -top-6 lg:-left-8" delay={1}>
          <div className={`${CARD} flex items-center gap-2.5 px-3.5 py-2.5`}>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-verified/15">
              <Check className="h-3.5 w-3.5 text-verified" />
            </span>
            <span>
              <span className="block text-[12px] font-semibold text-navy-dark">
                Indexed by Google
              </span>
              <span className="block text-[11px] text-navy-dark/70">
                Day 9 after publishing
              </span>
            </span>
          </div>
        </Floating>
        <Floating className="-bottom-7 -right-3 lg:-right-6" delay={1.4}>
          <div className={`${CARD} px-3.5 py-2.5`}>
            <span className="block text-[11px] text-navy-dark/70">
              &ldquo;crm for startups&rdquo;
            </span>
            <span className="mt-0.5 flex items-center gap-1.5 text-[15px] font-semibold tabular-nums text-navy-dark">
              #14
              <ArrowRight className="h-3.5 w-3.5 text-navy-dark/70" />
              #4
              <span className="ml-1 inline-flex items-center rounded-full bg-verified/[0.12] px-1.5 py-0.5 text-[10px] font-bold text-verified">
                <ArrowUp className="h-2.5 w-2.5" />
                10
              </span>
            </span>
          </div>
        </Floating>
      </motion.div>
    </div>

    {/* trust strip */}
    <motion.div
      className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:mt-24 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.7 }}
    >
      <div className="flex flex-col gap-6 border-t border-line pt-8 lg:flex-row lg:items-center lg:gap-10">
        <p className="flex-none text-[12.5px] font-medium text-navy-dark/70 lg:max-w-[11rem]">
          {LB.trust.label}
        </p>
        <ul className="flex flex-1 flex-wrap items-center gap-x-9 gap-y-3">
          {CLIENTS.map((c) => (
            <li
              key={c.name}
              className="text-[18px] font-semibold tracking-[-0.03em] text-navy-dark/75"
            >
              {c.name}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  </section>
);

export default Hero;
