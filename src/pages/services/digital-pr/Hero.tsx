import { motion } from "motion/react";
import { digitalPr as C } from "../content/digitalPr";
import { ease } from "../kit";
import { HeroButtons, HeroChip } from "../common";

/* the fan: tint and turn for each of the three press previews */
const FAN = [
  { rot: -7, tint: "bg-mint" },
  { rot: 0, tint: "bg-white" },
  { rot: 7, tint: "bg-blush" },
];

/** Three small, paper-like previews of the coverage, fanned out like
 *  clippings on a desk. Lift and straighten on hover. */
const PlacementFan = () => (
  <div className="relative flex items-end justify-center py-4">
    {C.hero.clippings.map((c, n) => {
      const f = FAN[n];
      return (
        <motion.div
          key={c.outlet}
          className={`${f.tint} -mx-5 w-[150px] rounded-2xl border border-line p-4 shadow-lift sm:-mx-4 sm:w-56 sm:p-5`}
          style={{ zIndex: f.rot === 0 ? 3 : 1 }}
          initial={{ opacity: 0, y: 40, rotate: 0 }}
          animate={{ opacity: 1, y: f.rot === 0 ? 0 : 20, rotate: f.rot }}
          transition={{ duration: 0.7, delay: 0.3 + n * 0.14, ease }}
          whileHover={{
            y: -10,
            rotate: 0,
            zIndex: 5,
            transition: { duration: 0.3 },
          }}
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="text-[11.5px] font-semibold leading-tight text-navy-dark sm:truncate sm:text-[12.5px]">
              {c.outlet}
            </p>
            <span className="hidden flex-none rounded border border-navy-dark/15 px-1.5 py-0.5 text-[9px] font-bold text-navy-dark/70 sm:inline">
              {c.dr}
            </span>
          </div>
          <p className="mb-4 text-[12px] font-medium leading-snug text-navy-dark/85 sm:text-[13px]">
            {c.head}
          </p>
          <span className="mb-1.5 block h-1 w-full rounded-full bg-navy-dark/10" />
          <span className="mb-4 block h-1 w-4/5 rounded-full bg-navy-dark/10" />
          <span className="rounded-full border border-navy-dark/10 bg-white/70 px-2.5 py-1 text-[8.5px] font-bold uppercase tracking-[0.14em] text-navy-dark/75">
            {c.kind}
          </span>
        </motion.div>
      );
    })}
  </div>
);

/**
 * Centred editorial headline over three small press previews (a feature, an
 * expert quote, a roundup), fanned out. This page sells stories, so the first
 * thing you see is coverage, not a tool.
 */
const Hero = () => {
  const H = C.hero;
  return (
    <section className="relative overflow-hidden bg-mist pt-28 pb-16 lg:pt-36 lg:pb-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h1>
          <HeroChip>{H.eyebrow}</HeroChip>
          <motion.span
            className="block text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.045em] text-navy-dark sm:text-[3.6rem] lg:text-[4.3rem]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease }}
          >
            {H.h1a}
          </motion.span>
          <motion.span
            className="mt-1 block text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.045em] pb-[0.06em] sm:text-[3.6rem] lg:text-[4.3rem]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.14, ease }}
          >
            <span className="accent-ink">{H.h1b}</span>
          </motion.span>
        </h1>
        <motion.p
          className="mx-auto mt-7 max-w-2xl text-[17px] leading-relaxed text-navy-dark/75 sm:text-[18px]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
        >
          {H.lead}
        </motion.p>
        <HeroButtons primary={H.primary} className="justify-center" />
        <motion.div
          className="mt-7 flex items-center justify-center gap-2.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <span className="text-[13px] text-navy-dark/75">
            Trusted by CapCut, SmileTutor, Ocuco and Defender
          </span>
        </motion.div>
      </div>

      {/* the coverage, fanned out */}
      <div className="relative mx-auto mt-14 max-w-3xl px-4 lg:mt-16">
        <div
          className="pointer-events-none absolute -right-10 top-0 h-[300px] w-[420px] rounded-full bg-mint/60 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-10 top-10 h-[260px] w-[360px] rounded-full bg-blush/50 blur-3xl"
          aria-hidden="true"
        />
        <PlacementFan />
      </div>
    </section>
  );
};

export default Hero;
