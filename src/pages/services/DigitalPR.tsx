import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, Mail, Minus } from "lucide-react";
import { digitalPr as PR } from "./content/digitalPr";
import { Glow, HeroActions, OtherServices, RatingRow } from "./shared";
import { FaqList } from "@/components/AgencyBlocks";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";

/**
 * /services/digital-pr
 *
 * Identity: a newsroom. The repeating devices are clippings, a pitch rendered
 * as the email it actually is, a masthead tier table, and a kicker rule above
 * every section label. Nothing here is borrowed from the link-building page's
 * stacked-flow vocabulary, and the page sources all of its copy from
 * content/digitalPr.ts rather than the shared SERVICES register.
 *
 * Surface ladder, in order:
 *   stone → navy-dark → mist → clay → stone → espresso → mist → clay →
 *   white → MARK → stone → mist → espresso → (mist, OtherServices)
 *
 *   7 distinct surfaces · 2 darks · 1 amber · longest light run 3.
 *
 * Depth techniques: overlapping composition (the clipping fan hangs out of the
 * hero over the dark band), cards floating on clay/stone with shadow-lift and
 * shadow-deep, bordered inset panels, oversized numerals as structure, hairline
 * rules carrying the process and the ledgers, a sky pastel panel behind the
 * our research diagram, and the amber band on the campaign result.
 */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.6, delay, ease: EASE },
});

/** Kicker: a short hairline rule, then the label. The page's type signature. */
const Kicker = ({ children, dark }: { children: string; dark?: boolean }) => (
  <span className="mb-4 flex items-center gap-3">
    <span
      className={`h-px w-8 ${dark ? "bg-white/40" : "bg-navy-dark/30"}`}
      aria-hidden="true"
    />
    <span
      className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${
        dark ? "text-white/70" : "text-navy-dark/70"
      }`}
    >
      {children}
    </span>
  </span>
);

/** Eyebrow + two-line headline where the second line turns the first. */
const Head = ({
  eyebrow,
  pre,
  em,
  dark = false,
  center = false,
  className = "",
}: {
  eyebrow: string;
  pre: string;
  em: string;
  dark?: boolean;
  center?: boolean;
  className?: string;
}) => (
  <motion.div
    className={`${center ? "flex flex-col items-center text-center" : ""} ${className}`}
    {...rise()}
  >
    <Kicker dark={dark}>{eyebrow}</Kicker>
    <h2
      className={`text-[2rem] font-semibold leading-[1.07] tracking-[-0.035em] sm:text-[2.5rem] ${
        dark ? "text-white" : "text-navy-dark"
      }`}
    >
      {pre}{" "}
      <span className={dark ? "text-white/70" : "text-navy-dark/65"}>{em}</span>
    </h2>
  </motion.div>
);

/* ============================ 1 · hero (stone) ============================ */

/** Three clippings, fanned, hanging over the section boundary below. */
const ClippingFan = () => (
  <div className="relative flex items-end justify-center py-4">
    {PR.fan.map((e, i) => (
      <motion.div
        key={e.outlet}
        className={`${e.tint} -mx-4 w-52 rounded-2xl border border-line p-5 shadow-lift sm:w-56`}
        style={{ zIndex: e.rot === 0 ? 3 : 1 }}
        initial={{ opacity: 0, y: 40, rotate: 0 }}
        animate={{ opacity: 1, y: e.rot === 0 ? 0 : 20, rotate: e.rot }}
        transition={{ duration: 0.7, delay: 0.3 + i * 0.14, ease: EASE }}
        whileHover={{
          y: -10,
          rotate: 0,
          zIndex: 5,
          transition: { duration: 0.3 },
        }}
      >
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[12.5px] font-semibold text-navy-dark">
            {e.outlet}
          </p>
          <span className="rounded border border-navy-dark/20 px-1.5 py-0.5 text-[9px] font-bold text-navy-dark/70">
            {e.dr}
          </span>
        </div>
        <p className="mb-4 text-[13px] font-medium leading-snug text-navy-dark/80">
          {e.head}
        </p>
        <span className="mb-1.5 block h-1 w-full rounded-full bg-navy-dark/15" />
        <span className="mb-4 block h-1 w-4/5 rounded-full bg-navy-dark/15" />
        <span className="rounded-full border border-navy-dark/15 bg-white/70 px-2.5 py-1 text-[8.5px] font-bold tracking-[0.14em] text-navy-dark/75">
          {e.kind}
        </span>
      </motion.div>
    ))}
  </div>
);

const Hero = () => (
  <div className="relative bg-white pt-28 lg:pt-32">
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <Glow
        tint="bg-mint"
        className="-right-24 top-8 h-[380px] w-[520px] opacity-50"
      />
      <Glow
        tint="bg-blush"
        className="-left-20 top-40 h-[320px] w-[420px] opacity-40"
      />
    </div>

    <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
      <motion.p
        className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-navy-dark/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {PR.eyebrow}
      </motion.p>
      <motion.h1
        className="text-balance text-[2.4rem] font-semibold leading-[1.04] tracking-[-0.035em] text-navy-dark sm:text-[3rem] lg:text-[3.3rem]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.05, ease: EASE }}
      >
        {PR.h1.pre} <span className="text-navy-dark/65">{PR.h1.em}</span>
      </motion.h1>
      <motion.p
        className="mx-auto mt-7 max-w-xl text-[16.5px] leading-[1.6] text-navy-dark/75"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
      >
        {PR.sub}
      </motion.p>
      <div className="mt-9 flex justify-center">
        <HeroActions label="Pitch my story" />
      </div>
      <div className="flex justify-center">
        <RatingRow />
      </div>
      <motion.p
        className="mt-7 text-[12.5px] italic text-navy-dark/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.45 }}
      >
        {PR.credit}
      </motion.p>
    </div>

    {/* the overlap: the fan leaves the stone and sits on the dark band */}
    <div className="relative z-10 mx-auto -mb-20 max-w-3xl px-4 pt-14 sm:-mb-24">
      <ClippingFan />
    </div>
  </div>
);

/* ======================= 2 · coverage band (navy-dark) ======================= */

const CoverageBand = () => (
  <div className="bg-navy-dark pb-20 pt-32 lg:pt-36">
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
        {PR.coverage.label}
      </p>

      <div className="space-y-2.5">
        {PR.coverage.rows.map((r, i) => (
          <motion.div
            key={r.outlet}
            className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
          >
            <span className={`h-2.5 w-2.5 flex-none rounded-full ${r.tint}`} />
            <span className="flex-1 truncate text-[15px] font-semibold text-white">
              {r.outlet}
            </span>
            <span className="hidden text-[12.5px] text-white/70 sm:block">
              {r.kind}
            </span>
            <span className="rounded border border-white/25 px-2 py-0.5 text-[10.5px] font-bold tabular-nums text-white/80">
              {r.dr}
            </span>
            <ArrowUpRight
              className="h-4 w-4 text-white/70"
              aria-hidden="true"
            />
          </motion.div>
        ))}
      </div>

      <p className="mt-7 text-center text-[11.5px] text-white/70">
        {PR.coverage.note}
      </p>

      <div className="mt-14 grid gap-x-10 gap-y-8 border-t border-white/15 pt-12 sm:grid-cols-3">
        {PR.coverage.figures.map((f, i) => (
          <motion.figure key={f.k} {...rise(i * 0.08)}>
            <p className="text-[2.6rem] font-semibold leading-none tracking-[-0.04em] text-white tabular-nums">
              {f.v}
            </p>
            <figcaption className="mt-3 text-[12.5px] leading-snug text-white/70">
              {f.k}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  </div>
);

/* ========================== 3 · problem (mist) ========================== */

const Problem = () => (
  <div className="bg-mist py-24 lg:py-32">
    <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20 lg:px-8">
      <div>
        <Head
          eyebrow={PR.problem.eyebrow}
          pre={PR.problem.heading.pre}
          em={PR.problem.heading.em}
        />
        {PR.problem.paras.map((p, i) => (
          <motion.p
            key={i}
            className="mt-5 text-[15.5px] leading-[1.68] text-navy-dark/75"
            {...rise(0.05 + i * 0.05)}
          >
            {p}
          </motion.p>
        ))}

        {/* the page's single comparison, carried on a hairline, not a box */}
        <motion.p
          className="mt-9 border-l-2 border-navy-dark/25 pl-5 text-[17px] font-semibold leading-snug tracking-[-0.015em] text-navy-dark sm:text-[18px]"
          {...rise(0.2)}
        >
          {PR.problem.compare}
        </motion.p>
      </div>

      <motion.aside
        className="self-start rounded-3xl border border-line bg-white p-7 shadow-lift lg:p-8"
        {...rise(0.1)}
      >
        <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-navy-dark/70">
          {PR.problem.desk.label}
        </p>
        <dl className="mt-6">
          {PR.problem.desk.rows.map((r) => (
            <div
              key={r.k}
              className="flex items-baseline justify-between gap-5 border-b border-line py-4 last:border-0"
            >
              <dt className="text-[13.5px] text-navy-dark/75">{r.k}</dt>
              <dd className="text-[1.55rem] font-semibold leading-none tracking-[-0.03em] text-navy-dark tabular-nums">
                {r.v}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-[13px] leading-relaxed text-navy-dark/75">
          {PR.problem.desk.foot}
        </p>
      </motion.aside>
    </div>
  </div>
);

/* =========================== 4 · pitch (clay) =========================== */

const Pitch = () => (
  <div className="bg-mist py-24 lg:py-32">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <Head
        eyebrow={PR.pitch.eyebrow}
        pre={PR.pitch.heading.pre}
        em={PR.pitch.heading.em}
        center={true}
        className="mb-14"
      />

      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          className="overflow-hidden rounded-3xl bg-white shadow-deep"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="flex items-center gap-2.5 border-b border-line bg-mist px-6 py-3.5">
            <Mail className="h-4 w-4 text-navy-dark/70" aria-hidden="true" />
            <span className="text-[12px] font-semibold text-navy-dark/75">
              {PR.pitch.mailTo}
            </span>
            <span className="ml-auto rounded-full border border-verified/30 bg-verified/10 px-2 py-1 text-[10px] font-bold tracking-wider text-verified">
              {PR.pitch.mailStatus}
            </span>
          </div>
          <div className="p-6 sm:p-8">
            <p className="mb-4 text-[17px] font-semibold leading-snug text-navy-dark">
              <span className="rounded bg-mint px-1">{PR.pitch.subject}</span>
              <sup className="ml-1 text-[10px] font-bold text-navy-dark/70">
                1
              </sup>
            </p>
            <p className="mb-3 text-[14.5px] leading-relaxed text-navy-dark/80">
              <span className="border-b-2 border-blush">
                {PR.pitch.evidence}
              </span>
              <sup className="ml-0.5 text-[10px] font-bold text-navy-dark/70">
                2
              </sup>
              {PR.pitch.evidenceTail}
            </p>
            <p className="text-[14.5px] leading-relaxed text-navy-dark/80">
              <span className="border-b-2 border-lilac">{PR.pitch.offer}</span>
              <sup className="ml-0.5 text-[10px] font-bold text-navy-dark/70">
                3
              </sup>
              .
            </p>
          </div>
        </motion.div>

        <ol className="space-y-6">
          {PR.pitch.steps.map((e, i) => (
            <motion.li
              key={e.n}
              className="flex gap-4"
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
            >
              <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-navy-dark text-[12px] font-bold text-white">
                {e.n}
              </span>
              <div>
                <p className="mb-1 text-[15.5px] font-semibold text-navy-dark">
                  {e.label}
                </p>
                <p className="text-[13.5px] leading-relaxed text-navy-dark/75">
                  {e.d}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  </div>
);

/* ========================== 5 · angles (stone) ========================== */

const Angles = () => {
  const [open, setOpen] = useState(0);
  const a = PR.angles.items[open];
  return (
    <div className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Head
          eyebrow={PR.angles.eyebrow}
          pre={PR.angles.heading.pre}
          em={PR.angles.heading.em}
          center={true}
        />
        <motion.p
          className="mx-auto mt-6 max-w-xl text-center text-[15.5px] leading-relaxed text-navy-dark/75"
          {...rise(0.05)}
        >
          {PR.angles.lede}
        </motion.p>

        <div className="mb-8 mt-10 flex flex-wrap justify-center gap-2.5">
          {PR.angles.items.map((c, i) => (
            <button
              key={c.t}
              onClick={() => setOpen(i)}
              aria-pressed={open === i}
              className={`rounded-full border px-5 py-2.5 text-[13px] font-semibold transition-colors duration-300 ${
                open === i
                  ? "border-navy-dark bg-navy-dark text-white"
                  : "border-navy-dark/25 text-navy-dark/75 hover:text-navy-dark"
              }`}
            >
              {c.t}
            </button>
          ))}
        </div>

        <motion.div
          key={open}
          className="rounded-3xl bg-white p-8 shadow-lift sm:p-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <p className="text-[16.5px] leading-[1.65] text-navy-dark/80">
            {a.d}
          </p>
          <figure className="mt-7 border-t border-line pt-6">
            <blockquote className="text-[15.5px] font-medium leading-snug text-navy-dark">
              {a.example}
            </blockquote>
            <figcaption className="mt-4 inline-block rounded-lg bg-mist px-3.5 py-2 text-[11.5px] font-bold uppercase tracking-[0.1em] text-navy-dark/75">
              {a.chip}
            </figcaption>
          </figure>
        </motion.div>
      </div>
    </div>
  );
};

/* ========================= 6 · tiers (espresso) ========================= */

const Tiers = () => (
  <div className="bg-navy-dark py-24 lg:py-32">
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <Head
        eyebrow={PR.tiers.eyebrow}
        pre={PR.tiers.heading.pre}
        em={PR.tiers.heading.em}
        dark={true}
        center={true}
        className="mb-14"
      />

      <div className="overflow-hidden rounded-3xl border border-white/15">
        {PR.tiers.rows.map((r, i) => (
          <motion.div
            key={r.tier}
            className={`grid items-center gap-4 px-6 py-7 sm:grid-cols-[104px_1fr_112px] ${
              i ? "border-t border-white/15" : ""
            }`}
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.09 }}
          >
            <span
              className={`${r.tint} w-fit rounded-xl px-3 py-2 text-center text-[12.5px] font-bold text-navy-dark sm:w-auto`}
            >
              {r.tier}
            </span>
            <span>
              <span className="block text-[15.5px] font-semibold text-white">
                {r.name}
              </span>
              <span className="mt-1 block text-[13px] text-white/70">
                {r.detail}
              </span>
            </span>
            <span className="text-[13px] font-semibold tabular-nums text-white/80 sm:text-right">
              {r.dr}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="mx-auto mt-8 max-w-2xl text-center text-[13.5px] leading-relaxed text-white/70"
        {...rise(0.1)}
      >
        {PR.tiers.note}
      </motion.p>
    </div>
  </div>
);

/* ======================= 7 · methodology (mist) ======================= */

const Methodology = () => (
  <div className="bg-mist py-24 lg:py-32">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <Head
            eyebrow={PR.methodology.eyebrow}
            pre={PR.methodology.heading.pre}
            em={PR.methodology.heading.em}
          />
          <motion.p
            className="mt-6 text-[15.5px] leading-[1.68] text-navy-dark/75"
            {...rise(0.05)}
          >
            {PR.methodology.lede}
          </motion.p>

          {/* pastel feature panel behind the diagram */}
          <motion.div
            className="mt-10 rounded-3xl border border-line bg-white p-7"
            {...rise(0.12)}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
              <div className="flex-1">
                <p className="text-[15.5px] font-bold text-navy-dark">
                  {PR.methodology.flowFrom.t}
                </p>
                <p className="text-[13px] text-navy-dark/75">
                  {PR.methodology.flowFrom.d}
                </p>
              </div>
              <ArrowRight
                className="h-5 w-5 shrink-0 rotate-90 text-navy-dark/60 sm:rotate-0"
                aria-hidden="true"
              />
              <div className="flex-1 rounded-2xl bg-white px-5 py-4 shadow-soft">
                <p className="text-[15.5px] font-bold text-navy-dark">
                  {PR.methodology.flowTo.t}
                </p>
                <p className="text-[13px] text-navy-dark/75">
                  {PR.methodology.flowTo.d}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* hairline-ruled register, no boxes */}
        <dl className="divide-y divide-line border-t border-line">
          {PR.methodology.columns.map((c, i) => (
            <motion.div
              key={c.label}
              className="py-7 sm:grid sm:grid-cols-[112px_1fr] sm:gap-7"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <dt className="mb-2 text-[10.5px] font-bold uppercase tracking-[0.16em] text-navy-dark/70 sm:mb-0 sm:pt-1">
                {c.label}
              </dt>
              <dd>
                <p className="text-[16.5px] font-semibold leading-snug tracking-[-0.015em] text-navy-dark">
                  {c.q}
                </p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-navy-dark/75">
                  {c.d}
                </p>
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </div>
  </div>
);

/* ======================== 8 · judgement (clay) ======================== */

const Judgement = () => (
  <div className="bg-mist py-24 lg:py-32">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[1fr_0.82fr] lg:gap-16">
        <div>
          <Head
            eyebrow={PR.judgement.eyebrow}
            pre={PR.judgement.heading.pre}
            em={PR.judgement.heading.em}
          />
          <motion.p
            className="mt-6 max-w-xl text-[15.5px] leading-[1.68] text-navy-dark/75"
            {...rise(0.05)}
          >
            {PR.judgement.lede}
          </motion.p>
        </div>

        <motion.div
          className="self-start rounded-2xl border border-navy-dark/15 p-7"
          {...rise(0.1)}
        >
          <p className="mb-5 text-[10.5px] font-bold uppercase tracking-[0.14em] text-navy-dark/75">
            What we check first
          </p>
          <dl>
            {PR.judgement.checks.map((c) => (
              <div
                key={c.label}
                className="border-t border-navy-dark/12 py-3.5"
              >
                <dt className="text-[14px] font-bold text-navy-dark">
                  {c.label}
                </dt>
                <dd className="mt-1 text-[13px] leading-relaxed text-navy-dark/75">
                  {c.detail}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {PR.judgement.cases.map((c, i) => (
          <motion.article
            key={c.site}
            className="flex flex-col rounded-2xl bg-white p-6 shadow-lift"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
          >
            <div className="mb-4 flex items-baseline justify-between gap-3">
              <h3 className="text-[15.5px] font-semibold leading-snug text-navy-dark">
                {c.site}
              </h3>
              <span className="shrink-0 text-[12px] font-bold tabular-nums text-navy-dark/70">
                {c.metric}
              </span>
            </div>
            <p className="text-[13.5px] leading-relaxed text-navy-dark/75">
              {c.read}
            </p>
            <p className="mt-5 flex gap-2.5 border-t border-line pt-4 text-[13px] font-semibold text-navy-dark">
              <ArrowRight
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-navy-dark/60"
                aria-hidden="true"
              />
              {c.move}
            </p>
          </motion.article>
        ))}
      </div>
    </div>
  </div>
);

/* ========================= 9 · process (white) ========================= */

const Process = () => (
  <div className="bg-white py-24 lg:py-32">
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <Head
        eyebrow={PR.process.eyebrow}
        pre={PR.process.heading.pre}
        em={PR.process.heading.em}
        className="mb-12"
      />

      <ol className="divide-y divide-line border-y border-line">
        {PR.process.steps.map((s, i) => (
          <motion.li
            key={s.n}
            className="grid gap-x-8 gap-y-3 py-8 md:grid-cols-[auto_1fr_15rem] md:items-start"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <span
              className="text-[3rem] font-semibold leading-[0.8] tracking-[-0.045em] text-navy-dark/55 tabular-nums md:text-[3.6rem]"
              aria-hidden="true"
            >
              {s.n}
            </span>
            <div>
              <h3 className="text-[18px] font-semibold tracking-[-0.015em] text-navy-dark">
                {s.t}
              </h3>
              <p className="mt-2 max-w-xl text-[14.5px] leading-relaxed text-navy-dark/75">
                {s.d}
              </p>
            </div>
            <p className="text-[12.5px] leading-relaxed text-navy-dark/75 md:border-l md:border-line md:pl-6">
              <span className="block font-bold uppercase tracking-[0.12em] text-navy-dark/70">
                Your part
              </span>
              {s.you}
            </p>
          </motion.li>
        ))}
      </ol>
    </div>
  </div>
);

/* ================== 10 · the amber moment (bg-mark) ================== */

const CampaignBand = () => {
  const w = 620;
  const h = 150;
  const max = Math.max(...PR.example.series);
  const min = Math.min(...PR.example.series);
  const pts = PR.example.series.map((v, i) => {
    const x = (i / (PR.example.series.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * (h - 22) - 11;
    return [x, y] as const;
  });
  const line = pts
    .map(([x, y], i) => (i ? "L" : "M") + x.toFixed(1) + "," + y.toFixed(1))
    .join(" ");

  return (
    <div className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Head
          eyebrow={PR.example.eyebrow}
          pre={PR.example.heading.pre}
          em={PR.example.heading.em}
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-navy-dark/75">
              {PR.example.label}
            </p>
            <motion.p
              className="mt-6 text-[5.5rem] font-semibold leading-[0.82] tracking-[-0.05em] text-navy-dark tabular-nums sm:text-[6.5rem]"
              {...rise(0.05)}
            >
              {PR.example.hero.v}
            </motion.p>
            <p className="mt-2 text-[14px] font-semibold text-navy-dark/80">
              {PR.example.hero.k}
            </p>
            <dl className="mt-8">
              {PR.example.facts.map((f) => (
                <div
                  key={f.k}
                  className="flex items-baseline justify-between gap-4 border-t border-navy-dark/20 py-3"
                >
                  <dt className="text-[13.5px] text-navy-dark/80">{f.k}</dt>
                  <dd className="text-[15px] font-bold tabular-nums text-navy-dark">
                    {f.v}
                  </dd>
                </div>
              ))}
            </dl>
            <Link
              to={PR.example.caseHref}
              className="group mt-8 inline-flex items-center gap-2 rounded-xl border border-navy-dark/30 px-6 py-3.5 text-[14px] font-semibold text-navy-dark transition-colors duration-300 hover:border-navy-dark"
            >
              {PR.example.ctaLabel}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div>
            <p className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-navy-dark/75">
              {PR.example.seriesLabel}
            </p>
            <svg
              viewBox={`0 0 ${w} ${h}`}
              className="mt-5 h-auto w-full"
              fill="none"
              role="img"
              aria-label={PR.example.seriesLabel}
            >
              <motion.path
                d={line}
                stroke="rgb(var(--ink))"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
              />
              {pts.map(([x, y], i) => (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={i === pts.length - 1 ? 6 : 3.5}
                  fill={
                    i === pts.length - 1
                      ? "rgb(var(--ink))"
                      : "rgb(var(--mark))"
                  }
                  stroke="rgb(var(--ink))"
                  strokeWidth={1.8}
                />
              ))}
            </svg>
            <p className="mt-6 max-w-xl text-[14.5px] leading-[1.65] text-navy-dark/80">
              {PR.example.takeaway}
            </p>
            <figure className="mt-8 border-t border-navy-dark/20 pt-7">
              <blockquote className="text-[1.2rem] leading-[1.45] tracking-[-0.015em] text-navy-dark sm:text-[1.35rem]">
                {"“"}
                {PR.example.quote.text}
                {"”"}
              </blockquote>
              <figcaption className="mt-4 text-[12.5px] font-bold uppercase tracking-[0.12em] text-navy-dark/75">
                {PR.example.quote.who}
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ====================== 11 · deliverables (stone) ====================== */

const Deliverables = () => (
  <div className="bg-white py-24 lg:py-32">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <Head
        eyebrow={PR.deliverables.eyebrow}
        pre={PR.deliverables.heading.pre}
        em={PR.deliverables.heading.em}
        className="mb-12"
      />
      <div className="grid gap-x-12 gap-y-9 sm:grid-cols-2">
        {PR.deliverables.items.map((c, i) => (
          <motion.div
            key={c.t}
            className="flex gap-5 border-t border-navy-dark/15 pt-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: (i % 2) * 0.08 }}
          >
            <span
              className="text-[2rem] font-semibold leading-none tracking-[-0.04em] text-navy-dark/65 tabular-nums"
              aria-hidden="true"
            >
              {"0"}
              {i + 1}
            </span>
            <div>
              <h3 className="mb-1.5 text-[17px] font-semibold tracking-[-0.015em] text-navy-dark">
                {c.t}
              </h3>
              <p className="text-[14px] leading-relaxed text-navy-dark/75">
                {c.d}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

/* =========================== 12 · fit (mist) =========================== */

const Fit = () => (
  <div className="bg-mist py-24 lg:py-32">
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <Head
        eyebrow={PR.fit.eyebrow}
        pre={PR.fit.heading.pre}
        em={PR.fit.heading.em}
        className="mb-12"
      />
      <div className="grid gap-4 md:grid-cols-2">
        <motion.div
          className="rounded-3xl border border-line bg-white p-8 shadow-lift"
          {...rise()}
        >
          <h3 className="text-[16px] font-semibold text-navy-dark">
            Worth a call if…
          </h3>
          <ul className="mt-5 space-y-3.5">
            {PR.fit.good.map((g) => (
              <li key={g} className="flex gap-3">
                <Check
                  className="mt-0.5 h-4 w-4 flex-none text-verified"
                  aria-hidden="true"
                />
                <span className="text-[14px] leading-relaxed text-navy-dark/75">
                  {g}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="rounded-3xl border border-line bg-mist p-8"
          {...rise(0.08)}
        >
          <h3 className="text-[16px] font-semibold text-navy-dark">
            Link building first if…
          </h3>
          <ul className="mt-5 space-y-3.5">
            {PR.fit.bad.map((b) => (
              <li key={b} className="flex gap-3">
                <Minus
                  className="mt-0.5 h-4 w-4 flex-none text-navy-dark/60"
                  aria-hidden="true"
                />
                <span className="text-[14px] leading-relaxed text-navy-dark/75">
                  {b}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-line pt-5 text-[13px] leading-relaxed text-navy-dark/75">
            {PR.fit.foot}
          </p>
        </motion.div>
      </div>
    </div>
  </div>
);

/* ========================= 13 · faq (espresso) ========================= */

const Faq = () => (
  <div className="bg-navy-dark py-24 lg:py-32">
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <motion.h2
        className="text-balance mb-10 text-center text-[2rem] font-semibold leading-[1.07] tracking-[-0.035em] text-white sm:text-[2.4rem]"
        {...rise()}
      >
        {"Straight "}
        <span className="text-white/70">answers</span>
      </motion.h2>
      <FaqList faqs={PR.faqs} />
    </div>
  </div>
);

/* ================================= page ================================= */

const DigitalPR = () => (
  <PageLayout>
    <Seo title="Digital PR" description={PR.sub} />
    <Hero />
    <CoverageBand />
    <Problem />
    <Pitch />
    <Angles />
    <Tiers />
    <Methodology />
    <Judgement />
    <Process />
    <CampaignBand />
    <Deliverables />
    <Fit />
    <Faq />
    <OtherServices current="digital-pr" />
  </PageLayout>
);

export default DigitalPR;
