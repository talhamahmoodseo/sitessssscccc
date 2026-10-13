import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { BadgeCheck, Clock, Link2, Send, Star } from "lucide-react";
import { haroQuotes as C } from "../content/haroQuotes";
import { CARD, GlowPanel, ease } from "../kit";
import { HeroButtons, HeroChip } from "../common";

/* the request's deadline ticks down live, from 3h 12m */
const Countdown = () => {
  const reduced = useReducedMotion();
  const [s, setS] = useState(3 * 3600 + 12 * 60);
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setS((x) => Math.max(0, x - 1)), 1000);
    return () => clearInterval(t);
  }, [reduced]);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gap/[0.1] px-2.5 py-1 text-[11px] font-bold tabular-nums text-gap">
      <Clock className="h-3 w-3" />
      Closes in {h}h {String(m).padStart(2, "0")}m{" "}
      {String(sec).padStart(2, "0")}s
    </span>
  );
};

const Step = ({
  children,
  delay,
  className = "",
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) => (
  <motion.div
    className={`relative ${className}`}
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay, ease }}
  >
    {children}
  </motion.div>
);

/**
 * Request → your quote → published, as three cards that arrive in order on a
 * blush glow. The thing being sold is a quote that gets printed, so the hero
 * shows one from start to finish.
 */
const Hero = () => {
  const H = C.hero;
  return (
    <section className="relative overflow-hidden bg-mist pt-28 pb-20 lg:pt-36 lg:pb-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:px-8">
        <div className="min-w-0">
          <h1>
            <HeroChip>{H.eyebrow}</HeroChip>
            <motion.span
              className="block text-[2.7rem] font-semibold leading-[0.98] tracking-[-0.045em] text-navy-dark sm:text-[3.6rem] lg:text-[3.3rem] xl:text-[3.5rem]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.05, ease }}
            >
              {H.h1a}
            </motion.span>
            <motion.span
              className="mt-1 block text-[2.7rem] font-semibold leading-[0.98] tracking-[-0.045em] text-navy-dark/60 sm:text-[3.6rem] lg:text-[3.3rem] xl:text-[3.5rem]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.14, ease }}
            >
              {H.h1b}
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
            <span className="flex gap-0.5">
              {[...Array(5)].map((_, n) => (
                <Star
                  key={n}
                  className="h-3.5 w-3.5 fill-navy-dark text-navy-dark"
                />
              ))}
            </span>
            <span className="text-[13px] text-navy-dark/75">
              Top Rated on Upwork &amp; Fiverr · 40+ brands served
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 34, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
        >
          <GlowPanel tone="rose" className="p-5 sm:p-8">
            <div className="relative mx-auto max-w-[470px] space-y-4">
              {/* the thread joining the three cards */}
              <motion.span
                className="absolute bottom-10 left-7 top-10 w-px origin-top border-l border-dashed border-navy-dark/30"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.6, delay: 0.8, ease }}
                aria-hidden="true"
              />

              <Step delay={0.5} className="sm:mr-10">
                <div className={`${CARD} p-5`}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-dark/70">
                      {H.request.label}
                    </span>
                    <Countdown />
                  </div>
                  <p className="mt-3 text-[15px] font-semibold leading-snug text-navy-dark">
                    {H.request.ask}
                  </p>
                  <p className="mt-2 text-[12px] text-navy-dark/70">
                    {H.request.outlet}
                  </p>
                </div>
              </Step>

              <Step delay={1.2} className="sm:ml-10">
                <div className={`${CARD} p-5`}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-dark/70">
                      {H.draft.label}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-verified/[0.12] px-2.5 py-1 text-[11px] font-bold text-verified">
                      <BadgeCheck className="h-3 w-3" />
                      {H.draft.status}
                    </span>
                  </div>
                  <p className="mt-3 text-[14px] leading-relaxed text-navy-dark/85">
                    {H.draft.text}
                  </p>
                  <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-butter px-2.5 py-1 text-[11px] font-semibold text-navy-dark">
                    <Send className="h-3 w-3" />
                    {H.draft.sent}
                  </p>
                </div>
              </Step>

              <Step delay={1.9} className="sm:mr-6">
                <article className="rounded-2xl bg-[#FFFEFB] p-5 ring-1 ring-navy-dark/[0.08] shadow-[0_30px_60px_-34px_rgba(14,14,14,0.45)]">
                  <header className="flex items-baseline justify-between">
                    <span className="font-news text-[16px] font-semibold text-navy-dark">
                      {H.published.outlet}
                    </span>
                    <span className="text-[9.5px] font-bold uppercase tracking-[0.16em] text-navy-dark/70">
                      {H.published.desk}
                    </span>
                  </header>
                  <span
                    className="mt-2 block h-[4px] border-y border-navy-dark/70"
                    aria-hidden="true"
                  />
                  <h3 className="mt-3 font-news text-[18px] font-semibold leading-[1.15] text-navy-dark">
                    {H.published.head}
                  </h3>
                  <p className="mt-2.5 text-[12.5px] leading-snug text-navy-dark/80">
                    “…before it’s late, not after,” says{" "}
                    <span className="box-decoration-clone rounded-[3px] bg-mark/60 px-1 font-semibold text-navy-dark">
                      {H.published.who}
                    </span>
                    .
                  </p>
                  <footer className="mt-4 flex flex-wrap gap-1.5">
                    {H.published.badges.map((b, n) => (
                      <span
                        key={b}
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10.5px] font-semibold ${
                          n === 0
                            ? "bg-verified/[0.12] text-verified"
                            : "bg-linen text-navy-dark/85"
                        }`}
                      >
                        {n === 0 && <Link2 className="h-3 w-3" />}
                        {b}
                      </span>
                    ))}
                  </footer>
                </article>
              </Step>
            </div>
          </GlowPanel>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
