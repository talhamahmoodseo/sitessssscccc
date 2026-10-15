import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { digitalPr as C } from "../content/digitalPr";
import { Eyebrow, H2, Soft, ease, rise } from "../kit";
import Clipping from "./Clipping";

/* one release, copied onto a wall of syndication sites, then fading out */
const ClonePile = () => (
  <div className="relative h-[220px] overflow-hidden rounded-2xl bg-white/70 p-4 ring-1 ring-line">
    <div className="grid grid-cols-6 gap-2" aria-hidden="true">
      {Array.from({ length: 30 }).map((_, n) => (
        <motion.span
          key={n}
          className="block rounded-[5px] bg-white p-1.5 ring-1 ring-navy-dark/10"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: [0, 1, 1, 0.28], scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            opacity: {
              duration: 3.2,
              times: [0, 0.12, 0.6, 1],
              delay: n * 0.035,
            },
            scale: { duration: 0.35, delay: n * 0.035 },
          }}
        >
          <span className="block h-[3px] w-2/3 rounded-full bg-navy-dark/30" />
          <span className="mt-1 block h-[3px] w-full rounded-full bg-navy-dark/10" />
          <span className="mt-[3px] block h-[3px] w-5/6 rounded-full bg-navy-dark/10" />
        </motion.span>
      ))}
    </div>
    <motion.div
      className="absolute inset-x-4 bottom-4 rounded-xl bg-navy-dark px-4 py-3 text-center"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: 2.6, ease }}
    >
      <p className="text-[13px] font-semibold text-white">
        Same text on 200 sites. Most gone from Google in weeks.
      </p>
    </motion.div>
  </div>
);

const PICKUPS = [
  { t: "Picked up", d: "trade title", cls: "left-3 top-5" },
  { t: "Quoted", d: "regional daily", cls: "right-3 top-12" },
  { t: "Linked", d: "buying guide", cls: "bottom-5 left-8" },
];

/* one story, run once, then travelling on its own */
const StoryRipple = () => (
  <div className="relative flex h-[220px] items-center justify-center overflow-hidden rounded-2xl bg-mint/40 ring-1 ring-mint">
    {[0, 1, 2].map((n) => (
      <motion.span
        key={n}
        className="absolute h-40 w-40 rounded-full border border-navy-dark/20"
        aria-hidden="true"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: [0.6, 2.2], opacity: [0.7, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: n * 1.3,
          ease: "easeOut",
        }}
      />
    ))}
    <motion.div
      className="relative z-10 w-[220px]"
      initial={{ opacity: 0, y: 14, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: -2 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease }}
    >
      <Clipping
        compact
        c={{
          outlet: "Khaleej Times",
          desk: "Business",
          head: "Why UAE shoppers won’t wait past tomorrow",
        }}
      />
    </motion.div>
    {PICKUPS.map((p, n) => (
      <motion.span
        key={p.t}
        className={`absolute z-20 hidden rounded-full bg-white px-3 py-1.5 text-[11px] shadow-[0_10px_24px_-14px_rgba(14,14,14,0.5)] ring-1 ring-line sm:block ${p.cls}`}
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4, delay: 1 + n * 0.45 }}
      >
        <span className="font-semibold text-navy-dark">{p.t}</span>
        <span className="text-navy-dark/70"> · {p.d}</span>
      </motion.span>
    ))}
  </div>
);

const Panel = ({
  side,
  visual,
  strong,
  delay,
}: {
  side: typeof C.release.release;
  visual: React.ReactNode;
  strong: boolean;
  delay: number;
}) => (
  <motion.div
    className={`flex flex-col rounded-3xl p-6 sm:p-8 ${
      strong
        ? "bg-white ring-1 ring-navy-dark/[0.08] shadow-[0_40px_80px_-50px_rgba(14,14,14,0.5)]"
        : "bg-linen/70 ring-1 ring-line"
    }`}
    {...rise(delay)}
  >
    <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-navy-dark/75">
      {side.label}
    </p>
    <ol className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[13.5px] text-navy-dark/80">
      {side.path.map((p, n) => (
        <li key={p} className="inline-flex items-center gap-2">
          {n > 0 && <ArrowRight className="h-3.5 w-3.5 text-navy-dark/45" />}
          <span className={strong ? "font-semibold text-navy-dark" : ""}>
            {p}
          </span>
        </li>
      ))}
    </ol>
    <div className="mt-6">{visual}</div>
    <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line ring-1 ring-line">
      {side.stats.map((s) => (
        <div
          key={s.k}
          className={`${strong ? "bg-white" : "bg-mist"} px-4 py-3.5`}
        >
          <dt className="text-[11.5px] text-navy-dark/70">{s.k}</dt>
          <dd className="mt-1 text-[17px] font-semibold tracking-[-0.02em] text-navy-dark">
            {s.v}
          </dd>
        </div>
      ))}
    </dl>
    <p
      className={`mt-6 text-[15px] ${
        strong ? "font-semibold text-navy-dark" : "italic text-navy-dark/75"
      }`}
    >
      {side.tag}
    </p>
  </motion.div>
);

/** The problem, told as a side-by-side: what a press release actually buys
 *  you, against what one real story does. */
const ReleaseVsStory = () => {
  const R = C.release;
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
          <motion.div {...rise()}>
            <Eyebrow className="mb-4">{R.eyebrow}</Eyebrow>
            <H2>
              {R.h2a}
              <br />
              <Soft>{R.h2b}</Soft>
            </H2>
          </motion.div>
          <motion.p
            className="text-[17px] leading-relaxed text-navy-dark/75"
            {...rise(0.08)}
          >
            {R.lead}
          </motion.p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <Panel
            side={R.release}
            visual={<ClonePile />}
            strong={false}
            delay={0}
          />
          <Panel side={R.story} visual={<StoryRipple />} strong delay={0.1} />
        </div>
      </div>
    </section>
  );
};

export default ReleaseVsStory;
