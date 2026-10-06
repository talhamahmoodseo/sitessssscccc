import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, Minus, X } from "lucide-react";
import { linkBuilding as LB } from "./content/linkBuilding";
import { OtherServices } from "./shared";
import { FaqList } from "@/components/AgencyBlocks";
import { Wordmark } from "@/components/brand";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";
import { CLIENTS } from "@/lib/clients";
import { openBooking } from "@/lib/booking";

/**
 * /services/link-building — the flagship page.
 *
 * Rebuilt content-first. The structural ideas come from how
 * dofollow.com/visibility-plus is *built*, not from what it says:
 *
 *   - a split hero carrying one concrete artefact that embodies the pitch
 *     (theirs: a buyer prompt with the brand missing; ours: the approval
 *     sheet, because that is the thing no other vendor will show you)
 *   - prose is never left alone — every block is paired with a data object
 *   - one section exists purely to say what we are not
 *   - one section argues against our own product, which is what makes the
 *     rest of the page credible
 *   - proof is distributed down the page rather than pooled into one
 *     testimonial wall: logos under the hero, a quote after the problem,
 *     numbers in the movement band, a quote after the comparison, a quote
 *     after fit
 *
 * Layout is specific to this page — the split hero, logo band, step cards,
 * comparison columns and snapshot close appear on no other service page.
 *
 * Surface rhythm: D m w l D w l w m w l w m l D m — no two adjacent sections
 * share a tone.
 */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.6, delay, ease: EASE },
});

/** Eyebrow + two-line headline — the page's repeating type unit. */
const Head = ({
  eyebrow,
  pre,
  em,
  dark = false,
  className = "",
}: {
  eyebrow: string;
  pre: string;
  em: string;
  dark?: boolean;
  className?: string;
}) => (
  <motion.div className={className} {...rise()}>
    <p
      className={`mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] ${
        dark ? "text-white/70" : "text-navy-dark/70"
      }`}
    >
      {eyebrow}
    </p>
    <h2
      className={`text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[2.6rem] ${
        dark ? "text-white" : "text-navy-dark"
      }`}
    >
      {pre}
      <br />
      <span className={dark ? "text-white/70" : "text-navy-dark/65"}>{em}</span>
    </h2>
  </motion.div>
);

/** Inline client proof. Used three times, each directly under the claim it
 *  supports, rather than collected into one band. */
const PullQuote = ({
  text,
  who,
  tone,
}: {
  text: string;
  who: string;
  tone: "linen" | "mist";
}) => (
  <div className={`${tone === "linen" ? "bg-linen" : "bg-mist"} py-16 lg:py-20`}>
    <motion.figure
      className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8"
      {...rise()}
    >
      <blockquote className="text-[1.3rem] leading-[1.45] tracking-[-0.02em] text-navy-dark sm:text-[1.55rem]">
        {"“"}
        {text}
        {"”"}
      </blockquote>
      <figcaption className="mt-5 text-[12.5px] font-semibold uppercase tracking-[0.12em] text-navy-dark/70">
        {who}
      </figcaption>
    </motion.figure>
  </div>
);

/* ================================= hero ================================= */

const ApprovalSheet = () => {
  const s = LB.approvalSheet;
  return (
    <motion.div
      className="rounded-[1.4rem] border border-white/10 bg-white p-6 lg:p-7"
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
    >
      <div className="mb-5 flex items-baseline justify-between">
        <p className="text-[14px] font-bold text-navy-dark">{s.label}</p>
        <span className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-navy-dark/70">
          {s.period}
        </span>
      </div>

      <ul className="space-y-2.5">
        {s.rows.map((r, i) => (
          <motion.li
            key={r.domain}
            className="flex items-center justify-between gap-4 rounded-xl bg-mist px-4 py-3.5"
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.45 + i * 0.1, ease: EASE }}
          >
            <span className="min-w-0">
              <span className="block truncate text-[13.5px] font-semibold text-navy-dark">
                {r.domain}
              </span>
              <span className="mt-0.5 block text-[11.5px] tabular-nums text-navy-dark/70">
                {r.meta}
              </span>
            </span>
            <span
              className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] ${
                r.status === "approved"
                  ? "bg-verified/12 text-verified"
                  : "bg-gap/12 text-gap"
              }`}
            >
              {r.status}
            </span>
          </motion.li>
        ))}
      </ul>

      <motion.div
        className="mt-5 rounded-xl bg-mark/25 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.85 }}
      >
        <p className="mb-1.5 text-[10.5px] font-bold uppercase tracking-[0.12em] text-navy-dark">
          {s.calloutLabel}
        </p>
        <p className="text-[13px] leading-relaxed text-navy-dark/80">
          {s.callout}
        </p>
      </motion.div>
    </motion.div>
  );
};

const Hero = () => (
  <div className="relative overflow-hidden bg-navy-dark pb-20 pt-32 lg:pb-28 lg:pt-40">
    <div
      className="pointer-events-none absolute -left-32 top-10 h-[460px] w-[620px] rounded-full opacity-[0.20] blur-[90px]"
      style={{ background: "rgb(var(--mark))" }}
      aria-hidden="true"
    />
    <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-8">
      <div>
        <motion.p
          className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {LB.eyebrow}
        </motion.p>
        <motion.h1
          className="text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.035em] text-white sm:text-[3.2rem] lg:text-[3.5rem]"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        >
          {LB.h1.pre}
          <br />
          <span className="text-white/70">{LB.h1.em}</span>
        </motion.h1>
        <motion.p
          className="mt-7 max-w-xl text-[16.5px] leading-[1.6] text-white/75"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
        >
          {LB.sub}
        </motion.p>
        <motion.div
          className="mt-9 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
        >
          <button
            onClick={openBooking}
            className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-[14px] font-semibold text-navy-dark transition-colors duration-300 hover:bg-white/90"
          >
            Request pricing
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-white/80 transition-colors duration-300 hover:text-white"
          >
            See a case file
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
        <motion.p
          className="mt-8 text-[12.5px] italic leading-relaxed text-white/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          {LB.credit}
        </motion.p>
      </div>

      <ApprovalSheet />
    </div>
  </div>
);

/* ============================== logo band ============================== */

const LogoBand = () => (
  <div className="bg-mist py-14">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.p
        className="mb-8 text-center text-[12.5px] text-navy-dark/70"
        {...rise()}
      >
        {LB.logosLabel}
      </motion.p>
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 lg:gap-x-16">
        {CLIENTS.map((c, i) => (
          <motion.span
            key={c.name}
            className="text-[19px] text-navy-dark/70 transition-colors duration-300 hover:text-navy-dark"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
          >
            <Wordmark name={c.name} />
          </motion.span>
        ))}
      </div>
    </div>
  </div>
);

/* =============================== problem =============================== */

const CollapseChart = () => {
  const c = LB.problem.chart;
  const W = 420;
  const H = 150;
  const hi = Math.max(...c.series);
  const x = (i: number) => (i / (c.series.length - 1)) * W;
  const y = (v: number) => H - (v / hi) * (H - 12) - 6;
  const line = c.series
    .map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v)}`)
    .join(" ");

  return (
    <motion.div
      className="rounded-3xl border border-line bg-white p-7"
      {...rise(0.1)}
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <span className="truncate text-[13.5px] font-semibold text-navy-dark">
          {c.domain}
        </span>
        <span className="shrink-0 rounded-full bg-linen px-2.5 py-1 text-[11px] font-bold text-navy-dark/70">
          {c.badge}
        </span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
        <motion.path
          d={`${line} L${W},${H} L0,${H} Z`}
          fill="rgb(var(--gap) / 0.10)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke="rgb(var(--gap))"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </svg>

      <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-navy-dark/70">
        {c.axis}
      </p>
      <p className="mt-5 border-t border-line pt-5 text-[13.5px] leading-relaxed text-navy-dark/80">
        {c.verdict}
      </p>
    </motion.div>
  );
};

const Problem = () => (
  <div className="bg-white py-24 lg:py-32">
    <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
      <div>
        <Head
          eyebrow={LB.problem.eyebrow}
          pre={LB.problem.heading.pre}
          em={LB.problem.heading.em}
        />
        {LB.problem.paras.map((p, i) => (
          <motion.p
            key={i}
            className="mt-5 text-[15.5px] leading-[1.65] text-navy-dark/75"
            {...rise(0.05 + i * 0.05)}
          >
            {p}
          </motion.p>
        ))}
        <motion.p
          className="mt-6 text-[16px] font-semibold leading-snug text-navy-dark"
          {...rise(0.2)}
        >
          {LB.problem.bold}
        </motion.p>
      </div>
      <CollapseChart />
    </div>
  </div>
);

/* ================================ steps ================================ */

const Steps = () => (
  <div className="bg-navy-dark py-24 lg:py-32">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <Head
        eyebrow={LB.steps.eyebrow}
        pre={LB.steps.heading.pre}
        em={LB.steps.heading.em}
        dark={true}
        className="max-w-2xl"
      />
      <motion.p
        className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-white/70"
        {...rise(0.05)}
      >
        {LB.steps.lede}
      </motion.p>

      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {LB.steps.items.map((s, i) => (
          <motion.article
            key={s.n}
            className="flex flex-col rounded-2xl bg-white p-6 lg:p-7"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.09, ease: EASE }}
          >
            <p className="mb-4 text-[10.5px] font-bold uppercase tracking-[0.14em] text-navy-dark/70">
              {s.n}
              {" / "}
              {s.label}
            </p>
            <h3 className="mb-2.5 text-[17px] font-semibold leading-snug tracking-[-0.02em] text-navy-dark">
              {s.t}
            </h3>
            <p className="mb-6 text-[13.5px] leading-relaxed text-navy-dark/75">
              {s.d}
            </p>
            <p className="mt-auto rounded-lg bg-mist px-3.5 py-2.5 text-[12px] font-semibold text-navy-dark/80">
              {s.chip}
            </p>
          </motion.article>
        ))}
      </div>

      <motion.p
        className="mt-5 rounded-2xl bg-white px-7 py-6 text-center text-[16px] font-bold tracking-[-0.01em] text-navy-dark sm:text-[18px]"
        {...rise(0.1)}
      >
        {LB.steps.emphasis}
      </motion.p>
    </div>
  </div>
);

/* ============================== movement ============================== */

const Movement = () => (
  <div className="bg-white py-24 lg:py-32">
    <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
      <motion.p
        className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/70"
        {...rise()}
      >
        {LB.movement.eyebrow}
      </motion.p>
      <motion.h2
        className="text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.03em] text-navy-dark sm:text-[2.6rem]"
        {...rise(0.05)}
      >
        {LB.movement.heading.pre}
        <br />
        <span className="text-navy-dark/65">{LB.movement.heading.em}</span>
      </motion.h2>
      <motion.p className="mt-6 text-[13px] text-navy-dark/70" {...rise(0.1)}>
        {LB.movement.context}
      </motion.p>

      <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
        {LB.movement.tiles.map((t, i) => (
          <motion.div
            key={t.label}
            className="rounded-2xl bg-navy-dark px-6 py-9"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
          >
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
              {t.label}
            </p>
            <p className="text-[2.4rem] font-semibold leading-none tracking-[-0.03em] text-white tabular-nums sm:text-[2.8rem]">
              {t.value}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="mx-auto mt-8 max-w-2xl text-[14.5px] leading-relaxed text-navy-dark/75"
        {...rise(0.1)}
      >
        {LB.movement.note}
      </motion.p>

      <motion.div className="mt-9" {...rise(0.15)}>
        <Link
          to={LB.movement.ctaHref}
          className="group inline-flex items-center gap-2 rounded-xl border border-navy-dark/20 px-7 py-3.5 text-[14px] font-semibold text-navy-dark transition-colors duration-300 hover:border-navy-dark"
        >
          {LB.movement.ctaLabel}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </motion.div>
    </div>
  </div>
);

/* ================================ gate ================================ */

const Gate = () => (
  <div className="bg-linen py-24 lg:py-32">
    <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
      <Head
        eyebrow={LB.gate.eyebrow}
        pre={LB.gate.heading.pre}
        em={LB.gate.heading.em}
        className="mx-auto max-w-2xl"
      />
      <motion.p
        className="mx-auto mt-6 max-w-2xl text-[15.5px] leading-relaxed text-navy-dark/75"
        {...rise(0.05)}
      >
        {LB.gate.lede}
      </motion.p>

      <div className="mt-14 grid gap-x-10 gap-y-10 text-left sm:grid-cols-2 lg:grid-cols-4">
        {LB.gate.columns.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
          >
            <p className="mb-3 text-[10.5px] font-bold uppercase tracking-[0.14em] text-navy-dark/70">
              {c.label}
            </p>
            <h3 className="mb-3 text-[17px] font-semibold leading-snug tracking-[-0.02em] text-navy-dark">
              {c.q}
            </h3>
            <p className="text-[13.5px] leading-relaxed text-navy-dark/75">
              {c.d}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
        {...rise(0.1)}
      >
        <div className="text-left">
          <p className="text-[15.5px] font-bold text-navy-dark">
            {LB.gate.flowFrom.t}
          </p>
          <p className="text-[13px] text-navy-dark/70">{LB.gate.flowFrom.d}</p>
        </div>
        <ArrowRight
          className="h-5 w-5 shrink-0 rotate-90 text-navy-dark/50 sm:rotate-0"
          aria-hidden="true"
        />
        <div className="rounded-2xl bg-mark/30 px-7 py-5 text-left">
          <p className="text-[15.5px] font-bold text-navy-dark">
            {LB.gate.flowTo.t}
          </p>
          <p className="text-[13px] text-navy-dark/80">{LB.gate.flowTo.d}</p>
        </div>
      </motion.div>
    </div>
  </div>
);

/* ============================= comparison ============================= */

const Comparison = () => (
  <div className="bg-white py-24 lg:py-32">
    <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
      <Head
        eyebrow={LB.comparison.eyebrow}
        pre={LB.comparison.heading.pre}
        em={LB.comparison.heading.em}
        className="mx-auto max-w-2xl"
      />
      <motion.p
        className="mx-auto mt-6 max-w-xl text-[15.5px] leading-relaxed text-navy-dark/75"
        {...rise(0.05)}
      >
        {LB.comparison.lede}
      </motion.p>

      <div className="mt-12 grid gap-5 text-left sm:grid-cols-2">
        {[
          { ...LB.comparison.them, good: false },
          { ...LB.comparison.us, good: true },
        ].map((col, i) => (
          <motion.div
            key={col.label}
            className={`rounded-3xl p-7 lg:p-8 ${
              col.good
                ? "border-2 border-navy-dark bg-white"
                : "border border-line bg-mist"
            }`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
          >
            <p
              className={`mb-6 text-[11px] font-bold uppercase tracking-[0.14em] ${
                col.good ? "text-navy-dark" : "text-navy-dark/70"
              }`}
            >
              {col.label}
            </p>
            <ul className="space-y-4">
              {col.items.map((t) => (
                <li key={t} className="flex gap-3">
                  {col.good ? (
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-verified" />
                  ) : (
                    <Minus className="mt-0.5 h-4 w-4 shrink-0 text-navy-dark/60" />
                  )}
                  <span
                    className={`text-[14.5px] leading-relaxed ${
                      col.good ? "text-navy-dark" : "text-navy-dark/75"
                    }`}
                  >
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="mt-10 text-[16px] font-bold tracking-[-0.01em] text-navy-dark sm:text-[17px]"
        {...rise(0.1)}
      >
        {LB.comparison.line}
      </motion.p>
    </div>
  </div>
);

/* ============================== diagnosis ============================== */

const Diagnosis = () => (
  <div className="bg-white py-24 lg:py-32">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <Head
            eyebrow={LB.diagnosis.eyebrow}
            pre={LB.diagnosis.heading.pre}
            em={LB.diagnosis.heading.em}
          />
          {LB.diagnosis.paras.map((p, i) => (
            <motion.p
              key={i}
              className="mt-5 text-[15.5px] leading-[1.65] text-navy-dark/75"
              {...rise(0.05 + i * 0.05)}
            >
              {p}
            </motion.p>
          ))}
          <motion.p
            className="mt-6 text-[16px] font-semibold leading-snug text-navy-dark"
            {...rise(0.2)}
          >
            {LB.diagnosis.bold}
          </motion.p>
        </div>

        <div className="space-y-3 self-start">
          {LB.diagnosis.map.map((m, i) => (
            <motion.div
              key={m.gap}
              className="flex items-center justify-between gap-5 rounded-xl bg-mist px-5 py-4"
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
            >
              <span className="text-[14.5px] text-navy-dark/75">{m.gap}</span>
              <span className="flex shrink-0 items-center gap-2 text-[14px] font-bold text-navy-dark">
                <ArrowRight
                  className="h-3.5 w-3.5 text-navy-dark/60"
                  aria-hidden="true"
                />
                {m.move}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <dl className="mt-16 grid gap-x-12 gap-y-7 border-t border-line pt-12 sm:grid-cols-2">
        {LB.diagnosis.defs.map((d, i) => (
          <motion.div
            key={d.t}
            className="sm:grid sm:grid-cols-[0.5fr_1fr] sm:gap-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
          >
            <dt className="mb-1.5 text-[14.5px] font-bold text-navy-dark sm:mb-0">
              {d.t}
            </dt>
            <dd className="text-[13.5px] leading-relaxed text-navy-dark/75">
              {d.d}
            </dd>
          </motion.div>
        ))}
      </dl>
    </div>
  </div>
);

/* ============================ fundamentals ============================ */

const Fundamentals = () => (
  <div className="bg-linen py-24 lg:py-32">
    <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
      <div>
        <Head
          eyebrow={LB.fundamentals.eyebrow}
          pre={LB.fundamentals.heading.pre}
          em={LB.fundamentals.heading.em}
        />
        {LB.fundamentals.paras.map((p, i) => (
          <motion.p
            key={i}
            className="mt-5 text-[15.5px] leading-[1.65] text-navy-dark/75"
            {...rise(0.05 + i * 0.05)}
          >
            {p}
          </motion.p>
        ))}
        <motion.p
          className="mt-6 text-[16px] font-semibold leading-snug text-navy-dark"
          {...rise(0.2)}
        >
          {LB.fundamentals.bold}
        </motion.p>
      </div>

      <motion.div className="text-center" {...rise(0.1)}>
        <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-navy-dark/70">
          {LB.fundamentals.flow.top}
        </p>
        <ArrowRight
          className="mx-auto my-4 h-5 w-5 rotate-90 text-navy-dark/50"
          aria-hidden="true"
        />
        <p className="inline-block rounded-xl bg-navy-dark px-8 py-4 text-[14px] font-bold uppercase tracking-[0.12em] text-white">
          {LB.fundamentals.flow.mid}
        </p>
        <ArrowRight
          className="mx-auto my-4 h-5 w-5 rotate-90 text-navy-dark/50"
          aria-hidden="true"
        />
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {LB.fundamentals.flow.out.map((o) => (
            <span
              key={o}
              className="text-[12px] font-bold uppercase tracking-[0.14em] text-navy-dark/70"
            >
              {o}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);

/* ================================= fit ================================= */

const Fit = () => (
  <div className="bg-white py-24 lg:py-32">
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <Head
        eyebrow={LB.fit.eyebrow}
        pre={LB.fit.heading.pre}
        em={LB.fit.heading.em}
        className="mb-12 max-w-2xl"
      />
      <div className="grid gap-5 sm:grid-cols-2">
        {[
          { items: LB.fit.good, good: true, label: "Worth doing if" },
          { items: LB.fit.bad, good: false, label: "Skip it if" },
        ].map((col, i) => (
          <motion.div
            key={col.label}
            className={`rounded-3xl border p-7 ${
              col.good ? "border-navy-dark/15 bg-linen" : "border-line bg-mist"
            }`}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
          >
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.14em] text-navy-dark">
              {col.label}
            </p>
            <ul className="space-y-4">
              {col.items.map((t) => (
                <li key={t} className="flex gap-3">
                  {col.good ? (
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-verified" />
                  ) : (
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-gap" />
                  )}
                  <span className="text-[13.5px] leading-relaxed text-navy-dark/80">
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

/* ================================ close ================================ */

const Close = () => (
  <div className="relative overflow-hidden bg-navy-dark py-24 lg:py-32">
    <div
      className="pointer-events-none absolute -right-24 bottom-0 h-[420px] w-[560px] rounded-full opacity-[0.16] blur-[90px]"
      style={{ background: "rgb(var(--mark))" }}
      aria-hidden="true"
    />
    <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-8">
      <div>
        <motion.h2
          className="text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-[2.7rem]"
          {...rise()}
        >
          {LB.close.heading.pre}
          <br />
          <span className="text-white/70">{LB.close.heading.em}</span>
        </motion.h2>
        <motion.p
          className="mt-6 max-w-lg text-[15.5px] leading-[1.6] text-white/75"
          {...rise(0.05)}
        >
          {LB.close.lede}
        </motion.p>
        <motion.div className="mt-9" {...rise(0.1)}>
          <button
            onClick={openBooking}
            className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-[14px] font-semibold text-navy-dark transition-colors duration-300 hover:bg-white/90"
          >
            {LB.close.ctaLabel}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </motion.div>
      </div>

      <motion.div
        className="rounded-[1.4rem] bg-white p-7"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <p className="mb-6 text-[10.5px] font-bold uppercase tracking-[0.14em] text-navy-dark/70">
          {LB.close.snapshot.label}
        </p>
        {LB.close.snapshot.bars.map((b, i) => (
          <div key={b.k} className="mb-5">
            <div className="mb-2 flex items-baseline justify-between">
              <span className="text-[13.5px] text-navy-dark/80">{b.k}</span>
              <span className="text-[13.5px] font-bold tabular-nums text-navy-dark">
                {b.v}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-mist">
              <motion.div
                className={`h-full rounded-full ${
                  i === 0 ? "bg-navy-dark" : "bg-navy-dark/40"
                }`}
                initial={{ width: 0 }}
                whileInView={{ width: `${(b.v / b.max) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease: EASE }}
              />
            </div>
          </div>
        ))}
        <dl className="mt-6 flex gap-8 border-t border-line pt-5">
          {LB.close.snapshot.facts.map((f) => (
            <div key={f.k}>
              <dt className="text-[11.5px] leading-snug text-navy-dark/70">
                {f.k}
              </dt>
              <dd className="mt-1 text-[1.3rem] font-semibold leading-none text-navy-dark tabular-nums">
                {f.v}
              </dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </div>
  </div>
);

/* ================================= page ================================= */

const LinkBuilding = () => (
  <PageLayout>
    <Seo title="Link Building" description={LB.sub} />
    <Hero />
    <LogoBand />
    <Problem />
    <PullQuote {...LB.quotes.afterProblem} tone="linen" />
    <Steps />
    <Movement />
    <Gate />
    <Comparison />
    <PullQuote {...LB.quotes.afterComparison} tone="mist" />
    <Diagnosis />
    <Fundamentals />
    <Fit />
    <PullQuote {...LB.quotes.atFit} tone="mist" />
    <div className="bg-linen py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="mb-10 text-center text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-navy-dark sm:text-[2.4rem]"
          {...rise()}
        >
          {"Straight "}
          <span className="text-navy-dark/65">answers</span>
        </motion.h2>
        <FaqList faqs={LB.faqs} />
      </div>
    </div>
    <Close />
    <OtherServices current="link-building" />
  </PageLayout>
);

export default LinkBuilding;
