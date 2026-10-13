import { motion } from "motion/react";
import { Check, MessageSquareReply, Repeat2, Star } from "lucide-react";
import { digitalPr as C } from "../content/digitalPr";
import { CARD, GlowPanel, ease } from "../kit";
import { HeroButtons, HeroChip, SampleNote } from "../common";
import Clipping from "./Clipping";

/* where each clipping lands on the table, and how it's turned */
const LAY = [
  { rot: -4, y: 26, from: -60, cls: "lg:mt-10" },
  { rot: 1.5, y: 0, from: -90, cls: "" },
  { rot: 4, y: 34, from: -70, cls: "lg:mt-16" },
];

const Floating = ({
  children,
  className,
  delay,
}: {
  children: React.ReactNode;
  className: string;
  delay: number;
}) => (
  <motion.div
    className={`absolute z-20 hidden md:block ${className}`}
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

/**
 * Centred editorial headline over a "press table": three sample clippings
 * (a feature, an expert quote, a roundup) laid down one after another.
 * Different from the Link Building hero on purpose: this page sells stories,
 * so the first thing you see is coverage, not a tool.
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
            className="mt-1 block text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.045em] text-navy-dark/60 sm:text-[3.6rem] lg:text-[4.3rem]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.14, ease }}
          >
            {H.h1b}
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

      {/* the press table */}
      <motion.div
        className="relative mx-auto mt-16 max-w-6xl px-4 sm:px-6 lg:mt-20 lg:px-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease }}
      >
        <GlowPanel
          tone="fresh"
          className="px-5 pb-10 pt-8 sm:px-10 lg:px-14 lg:pb-16 lg:pt-12"
        >
          <div className="grid gap-5 md:grid-cols-3 md:gap-0">
            {H.clippings.map((c, n) => (
              <motion.div
                key={c.outlet}
                className={`relative md:-mx-2 ${LAY[n].cls}`}
                style={{ zIndex: n === 1 ? 3 : 1 }}
                initial={{ opacity: 0, y: LAY[n].from, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate: LAY[n].rot }}
                transition={{ duration: 0.9, delay: 0.55 + n * 0.18, ease }}
                whileHover={{
                  rotate: 0,
                  y: -8,
                  zIndex: 5,
                  transition: { duration: 0.3 },
                }}
              >
                <Clipping c={c} />
              </motion.div>
            ))}
          </div>
          <SampleNote className="mt-10 text-center">
            Sample clippings
          </SampleNote>
        </GlowPanel>

        <Floating className="-left-1 top-10 lg:-left-4" delay={1.4}>
          <div className={`${CARD} flex items-center gap-2.5 px-3.5 py-2.5`}>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-mint">
              <MessageSquareReply className="h-3.5 w-3.5 text-navy-dark" />
            </span>
            <span className="text-left">
              <span className="block text-[12px] font-semibold text-navy-dark">
                {H.chips.a.t}
              </span>
              <span className="block text-[11px] text-navy-dark/70">
                {H.chips.a.d}
              </span>
            </span>
          </div>
        </Floating>
        <Floating className="-right-1 bottom-12 lg:-right-4" delay={1.8}>
          <div className={`${CARD} flex items-center gap-2.5 px-3.5 py-2.5`}>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-butter">
              <Repeat2 className="h-3.5 w-3.5 text-navy-dark" />
            </span>
            <span className="text-left">
              <span className="flex items-center gap-1 text-[12px] font-semibold text-navy-dark">
                {H.chips.b.t}
                <Check className="h-3 w-3 text-verified" />
              </span>
              <span className="block text-[11px] text-navy-dark/70">
                {H.chips.b.d}
              </span>
            </span>
          </div>
        </Floating>
      </motion.div>
    </section>
  );
};

export default Hero;
