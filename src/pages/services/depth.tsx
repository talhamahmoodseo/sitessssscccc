import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Minus, X } from "lucide-react";
import { SectionHead } from "./shared";

/**
 * Depth sections for the service pages.
 *
 * Each page gets a different *layout* for the same job, so Digital PR, Brand
 * Mentions and HARO stay visually distinct from one another and from Link
 * Building. Shared code, separate identities — the opposite of one template
 * stamped across four pages.
 */

type Rejection = { site: string; metric: string; reason: string };
type Step = { n: string; t: string; d: string; you: string };
type Example = {
  label: string;
  headline: string;
  facts: { k: string; v: string }[];
  series: number[];
  seriesLabel: string;
  takeaway: string;
  caseHref: string;
};

/* ============================ rejections ============================ */

/** Variant A — a filmstrip of rejected candidates. */
export const RejectStrip = ({
  items,
  eyebrow,
  title,
  lede,
}: {
  items: Rejection[];
  eyebrow: string;
  title: React.ReactNode;
  lede: string;
}) => (
  <div className="bg-navy-dark py-24 lg:py-32">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.div
        className="mb-12 max-w-2xl"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
          {eyebrow}
        </p>
        <h2 className="text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-[2.9rem]">
          {title}
        </h2>
        <p className="mt-5 text-[15.5px] leading-relaxed text-white/70">
          {lede}
        </p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-3">
        {items.map((r, i) => (
          <motion.article
            key={r.site}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
          >
            <span className="absolute right-5 top-5 text-[11px] font-bold tabular-nums text-white/70">
              {r.metric}
            </span>
            <X className="mb-4 h-5 w-5 text-gap" />
            <h3 className="pr-16 text-[16px] font-semibold leading-snug text-white">
              {r.site}
            </h3>
            <p className="mt-2.5 text-[13.5px] leading-relaxed text-white/70">
              {r.reason}
            </p>
          </motion.article>
        ))}
      </div>
    </div>
  </div>
);

/** Variant B — a ledger table, one row per rejected candidate. */
export const RejectLedger = ({
  items,
  eyebrow,
  title,
  lede,
}: {
  items: Rejection[];
  eyebrow: string;
  title: React.ReactNode;
  lede: string;
}) => (
  <div className="bg-linen py-24 lg:py-32">
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <SectionHead eyebrow={eyebrow}>{title}</SectionHead>
      <p className="-mt-6 mb-10 max-w-2xl text-[15.5px] leading-relaxed text-navy-dark/75">
        {lede}
      </p>

      <div className="overflow-hidden rounded-3xl border border-line bg-white">
        {items.map((r, i) => (
          <motion.div
            key={r.site}
            className={`grid gap-4 p-6 sm:grid-cols-[1fr_auto] sm:items-start lg:p-7 ${
              i ? "border-t border-line" : ""
            }`}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
          >
            <div>
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center rounded-full bg-gap/12 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.1em] text-gap">
                  Rejected
                </span>
                <h3 className="text-[16px] font-semibold text-navy-dark">
                  {r.site}
                </h3>
              </div>
              <p className="mt-2.5 max-w-2xl text-[14px] leading-relaxed text-navy-dark/75">
                {r.reason}
              </p>
            </div>
            <span className="text-[13px] font-bold tabular-nums text-navy-dark/70 sm:pt-1">
              {r.metric}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

/* ============================== process ============================== */

/** Variant A — alternating rail, steps stepping down the page. */
export const ProcessRail = ({
  steps,
  eyebrow,
  title,
}: {
  steps: Step[];
  eyebrow: string;
  title: React.ReactNode;
}) => (
  <div className="bg-white py-24 lg:py-32">
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <SectionHead eyebrow={eyebrow}>{title}</SectionHead>

      <div className="relative">
        <div
          className="absolute left-[21px] top-3 bottom-3 w-px bg-line md:left-1/2"
          aria-hidden="true"
        />
        <ol className="space-y-6">
          {steps.map((s, i) => (
            <motion.li
              key={s.n}
              className={`relative md:flex md:items-start md:gap-8 ${
                i % 2 ? "md:flex-row-reverse" : ""
              }`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <span className="absolute left-0 top-1 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-navy-dark text-[14px] font-bold text-white md:left-1/2 md:-translate-x-1/2">
                {s.n}
              </span>
              <div
                className={`ml-16 rounded-2xl border border-line bg-mist p-6 md:ml-0 md:w-[calc(50%-2.75rem)] ${
                  i % 2 ? "" : "md:text-right"
                }`}
              >
                <h3 className="text-[17px] font-semibold text-navy-dark">
                  {s.t}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-navy-dark/75">
                  {s.d}
                </p>
                <p className="mt-3 text-[12.5px] font-medium text-navy-dark/70">
                  Your part — {s.you}
                </p>
              </div>
              <span className="hidden md:block md:w-[calc(50%-2.75rem)]" />
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  </div>
);

/** Variant B — a funnel: each step narrows toward the placement. */
export const ProcessFunnel = ({
  steps,
  eyebrow,
  title,
}: {
  steps: Step[];
  eyebrow: string;
  title: React.ReactNode;
}) => (
  <div className="bg-white py-24 lg:py-32">
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <SectionHead eyebrow={eyebrow}>{title}</SectionHead>

      <ol className="space-y-3">
        {steps.map((s, i) => (
          <motion.li
            key={s.n}
            className="mx-auto rounded-2xl border border-line bg-mist p-6 lg:p-7"
            style={{ width: `${100 - i * 7}%` }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <div className="flex items-baseline gap-3">
              <span className="text-[13px] font-bold tabular-nums text-navy-dark/40">
                {s.n}
              </span>
              <h3 className="text-[17px] font-semibold text-navy-dark">
                {s.t}
              </h3>
            </div>
            <p className="mt-2 text-[14px] leading-relaxed text-navy-dark/75">
              {s.d}
            </p>
            <p className="mt-3 inline-flex items-center gap-2 text-[12.5px] font-medium text-navy-dark/70">
              <span className="h-1.5 w-1.5 rounded-full bg-verified" />
              Your part — {s.you}
            </p>
          </motion.li>
        ))}
      </ol>
    </div>
  </div>
);

/* =============================== proof =============================== */

export const ProofPanel = ({
  example,
  quote,
  eyebrow,
  title,
  tone = "mist",
}: {
  example: Example;
  quote: { text: string; who: string };
  eyebrow: string;
  title: React.ReactNode;
  tone?: "mist" | "linen";
}) => {
  const w = 620;
  const h = 190;
  const max = Math.max(...example.series);
  const min = Math.min(...example.series);
  const pts = example.series.map((v, i) => {
    const x = (i / (example.series.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * (h - 24) - 12;
    return [x, y] as const;
  });
  const line = pts
    .map(([x, y], i) => (i ? "L" : "M") + x.toFixed(1) + "," + y.toFixed(1))
    .join(" ");

  return (
    <div
      className={`${tone === "linen" ? "bg-linen" : "bg-mist"} py-24 lg:py-32`}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHead eyebrow={eyebrow}>{title}</SectionHead>

        <div className="grid gap-8 rounded-3xl border border-line bg-white p-7 lg:grid-cols-[0.82fr_1.18fr] lg:p-10">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-dark/70">
              {example.label}
            </p>
            <dl className="mt-6">
              {example.facts.map((f) => (
                <div
                  key={f.k}
                  className="flex items-baseline justify-between gap-4 border-b border-line py-3 last:border-0"
                >
                  <dt className="text-[13.5px] text-navy-dark/70">{f.k}</dt>
                  <dd className="text-[15px] font-semibold tabular-nums text-navy-dark">
                    {f.v}
                  </dd>
                </div>
              ))}
            </dl>
            <Link
              to={example.caseHref}
              className="mt-7 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-navy-dark underline decoration-navy-dark/25 underline-offset-4 hover:decoration-navy-dark"
            >
              Open the full case file
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="rounded-2xl bg-mist p-6 lg:p-8">
            <p className="text-[12.5px] font-medium text-navy-dark/70">
              {example.seriesLabel}
            </p>
            <svg
              viewBox={`0 0 ${w} ${h}`}
              className="mt-5 h-auto w-full"
              fill="none"
              role="img"
              aria-label={example.seriesLabel}
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
                  r={i === pts.length - 1 ? 5 : 3}
                  fill={i === pts.length - 1 ? "rgb(var(--ink))" : "#fff"}
                  stroke="rgb(var(--ink))"
                  strokeWidth={1.6}
                />
              ))}
            </svg>
            <p className="mt-5 text-[13.5px] leading-relaxed text-navy-dark/75">
              {example.takeaway}
            </p>

            {/* the voice sits with the evidence, not in its own band */}
            <figure className="mt-7 border-t border-line pt-6">
              <blockquote className="text-[15.5px] leading-[1.5] text-navy-dark">
                “{quote.text}”
              </blockquote>
              <figcaption className="mt-3 text-[12.5px] font-semibold text-navy-dark/70">
                {quote.who}
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================================ fit ================================ */

export const FitPair = ({
  good,
  bad,
  eyebrow,
  title,
  tone = "white",
}: {
  good: string[];
  bad: string[];
  eyebrow: string;
  title: React.ReactNode;
  tone?: "white" | "linen" | "mist";
}) => (
  <div
    className={`${
      tone === "linen" ? "bg-linen" : tone === "mist" ? "bg-mist" : "bg-white"
    } py-24 lg:py-32`}
  >
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <SectionHead eyebrow={eyebrow}>{title}</SectionHead>

      <div className="grid gap-4 md:grid-cols-2">
        <motion.div
          className="rounded-3xl border border-line bg-white p-8"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.55 }}
        >
          <h3 className="text-[16px] font-semibold text-navy-dark">
            Worth a call if…
          </h3>
          <ul className="mt-5 space-y-3.5">
            {good.map((g) => (
              <li key={g} className="flex gap-3">
                <Check className="mt-0.5 h-4 w-4 flex-none text-verified" />
                <span className="text-[14px] leading-relaxed text-navy-dark/75">
                  {g}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="rounded-3xl border border-line bg-mist p-8"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          <h3 className="text-[16px] font-semibold text-navy-dark">
            We will say no if…
          </h3>
          <ul className="mt-5 space-y-3.5">
            {bad.map((b) => (
              <li key={b} className="flex gap-3">
                <Minus className="mt-0.5 h-4 w-4 flex-none text-navy-dark/45" />
                <span className="text-[14px] leading-relaxed text-navy-dark/75">
                  {b}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[13px] leading-relaxed text-navy-dark/70">
            If it is not a fit we say so on the call and point you somewhere
            better. That costs us a deal and saves you a quarter.
          </p>
        </motion.div>
      </div>
    </div>
  </div>
);
