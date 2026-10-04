import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Check, Minus, X } from "lucide-react";

import CountUp from "@/components/CountUp";
import { openBooking } from "@/lib/booking";
import { SectionHead } from "./shared";

/* Shared building blocks for the long-form service pages. Every section here
   exists to do one job from SERVICE-PAGES-PLAN.md — none are decorative. */

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] as const },
};

export const Section = ({
  children,
  tone = "paper",
  id,
}: {
  children: ReactNode;
  tone?: "paper" | "white" | "ink";
  id?: string;
}) => (
  <section
    id={id}
    className={
      tone === "ink"
        ? "bg-navy-dark py-20 lg:py-28"
        : tone === "white"
          ? "bg-white py-20 lg:py-28"
          : "bg-mist py-20 lg:py-28"
    }
  >
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">{children}</div>
  </section>
);

/* ---------- 2. proof strip: hard numbers before any claim ---------- */
export const ProofStrip = ({
  items,
}: {
  items: {
    v?: number;
    prefix?: string;
    suffix?: string;
    custom?: string;
    label: string;
  }[];
}) => (
  <div className="bg-navy-dark py-14">
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-y-9 px-4 sm:grid-cols-3 sm:gap-x-8 sm:px-6 lg:px-8">
      {items.map((s, i) => (
        <motion.div
          key={s.label}
          className="text-center sm:border-l sm:border-white/10 sm:first:border-l-0"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
        >
          <div className="text-3xl font-semibold leading-none tracking-[-0.02em] text-white lg:text-[2.5rem]">
            {s.custom ?? (
              <CountUp to={s.v} prefix={s.prefix} suffix={s.suffix} />
            )}
          </div>
          <div className="mx-auto mt-3 max-w-[22ch] text-[12px] font-medium leading-snug text-white/65">
            {s.label}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

/* ---------- 4. what you actually get ---------- */
export const DeliverableGrid = ({
  items,
}: {
  items: { t: string; d: string }[];
}) => (
  <div className="grid gap-4 sm:grid-cols-2">
    {items.map((d, i) => (
      <motion.div
        key={d.t}
        className="rounded-2xl border border-line bg-white p-6"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: i * 0.06 }}
      >
        <h3 className="text-[16.5px] font-semibold text-navy-dark">{d.t}</h3>
        <p className="mt-2 text-[14px] leading-relaxed text-navy-dark/70">
          {d.d}
        </p>
      </motion.div>
    ))}
  </div>
);

/* ---------- 5. the ledger: our vetting standard, and what it rejects ---------- */
export const LedgerPanel = ({
  standards,
  rejections,
}: {
  standards: { label: string; detail: string }[];
  rejections: { site: string; metric: string; reason: string }[];
}) => (
  <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
    <motion.div
      className="rounded-3xl border border-line bg-white p-7"
      {...reveal}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/65">
        Every domain must clear
      </p>
      <ul className="mt-5 space-y-4">
        {standards.map((s) => (
          <li key={s.label} className="flex gap-3">
            <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full border border-verified/30 bg-verified/10">
              <Check className="h-3 w-3 text-verified" />
            </span>
            <span>
              <span className="block text-[14.5px] font-semibold text-navy-dark">
                {s.label}
              </span>
              <span className="mt-0.5 block text-[13.5px] leading-relaxed text-navy-dark/70">
                {s.detail}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </motion.div>

    <motion.div
      className="rounded-3xl bg-navy-dark p-7 text-white"
      {...reveal}
      transition={{ ...reveal.transition, delay: 0.1 }}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
        Recently rejected
      </p>
      <p className="mt-2 text-[13.5px] leading-relaxed text-white/70">
        Roughly one in five sites we source fails vetting. You see these too —
        rejections are part of your report, not hidden from it.
      </p>
      <ul className="mt-6 space-y-3.5">
        {rejections.map((r) => (
          <li
            key={r.site}
            className="rounded-xl border border-white/12 bg-white/[0.05] p-4"
          >
            <div className="flex items-center gap-2">
              <X className="h-3.5 w-3.5 flex-none text-gap" />
              <span className="text-[13.5px] font-semibold">{r.site}</span>
              <span className="ml-auto rounded-md bg-white/10 px-2 py-0.5 text-[10.5px] font-bold tabular-nums">
                {r.metric}
              </span>
            </div>
            <p className="mt-1.5 text-[13px] leading-relaxed text-white/65">
              {r.reason}
            </p>
          </li>
        ))}
      </ul>
    </motion.div>
  </div>
);

/* ---------- 6. process, with the split of who does what ---------- */
export const ProcessTimeline = ({
  steps,
}: {
  steps: { n: string; t: string; d: string; you: string }[];
}) => (
  <div className="relative">
    <div
      className="absolute left-[19px] top-2 bottom-2 w-px bg-line sm:left-[23px]"
      aria-hidden="true"
    />
    <ol className="space-y-7">
      {steps.map((s, i) => (
        <motion.li
          key={s.n}
          className="relative flex gap-5"
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.07 }}
        >
          <span className="relative z-10 flex h-10 w-10 flex-none items-center justify-center rounded-full bg-navy-dark text-[13px] font-bold text-white sm:h-12 sm:w-12 sm:text-[15px]">
            {s.n}
          </span>
          <div className="pt-1.5">
            <h3 className="text-[17px] font-semibold text-navy-dark">{s.t}</h3>
            <p className="mt-1.5 text-[14px] leading-relaxed text-navy-dark/70">
              {s.d}
            </p>
            <p className="mt-2 inline-flex rounded-lg bg-butter/35 px-2.5 py-1 text-[12.5px] font-medium text-navy-dark">
              Your part: {s.you}
            </p>
          </div>
        </motion.li>
      ))}
    </ol>
  </div>
);

/* ---------- 7. worked example, with a real chart ---------- */
export const WorkedExample = ({
  label,
  headline,
  facts,
  series,
  seriesLabel,
  takeaway,
  caseHref,
}: {
  label: string;
  headline: string;
  facts: { k: string; v: string }[];
  series: number[];
  seriesLabel: string;
  takeaway: string;
  caseHref: string;
}) => {
  const w = 560;
  const h = 170;
  const max = Math.max(...series);
  const min = Math.min(...series);
  const pts = series.map((v, i) => {
    const x = (i / (series.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * (h - 18) - 9;
    return [x, y] as const;
  });
  const line = pts
    .map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;

  return (
    <motion.div
      className="overflow-hidden rounded-3xl border border-line bg-white"
      {...reveal}
    >
      <div className="grid lg:grid-cols-[1fr_1.15fr]">
        <div className="border-b border-line p-7 lg:border-b-0 lg:border-r">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/65">
            {label}
          </p>
          <h3 className="mt-3 text-[22px] font-semibold leading-tight tracking-[-0.02em] text-navy-dark">
            {headline}
          </h3>
          <dl className="mt-6 space-y-3">
            {facts.map((f) => (
              <div
                key={f.k}
                className="flex items-baseline justify-between gap-4 border-b border-line pb-3 last:border-0"
              >
                <dt className="text-[13px] text-navy-dark/65">{f.k}</dt>
                <dd className="text-[14.5px] font-semibold tabular-nums text-navy-dark">
                  {f.v}
                </dd>
              </div>
            ))}
          </dl>
          <Link
            to={caseHref}
            className="mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-navy-dark underline decoration-navy-dark/25 underline-offset-4 hover:decoration-navy-dark"
          >
            Read the full case study
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="p-7">
          <p className="text-[12.5px] font-medium text-navy-dark/70">
            {seriesLabel}
          </p>
          <svg
            viewBox={`0 0 ${w} ${h}`}
            className="mt-4 h-auto w-full"
            role="img"
            aria-label={`${seriesLabel}: rising from ${min.toLocaleString()} to ${max.toLocaleString()}`}
          >
            <defs>
              <linearGradient id="weFill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="rgb(var(--ink))"
                  stopOpacity="0.14"
                />
                <stop
                  offset="100%"
                  stopColor="rgb(var(--ink))"
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>
            <path d={area} fill="url(#weFill)" />
            <motion.path
              d={line}
              fill="none"
              stroke="rgb(var(--ink))"
              strokeWidth={2.25}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.3, ease: [0.4, 0, 0.2, 1] }}
            />
            {pts.map(([x, y], i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={i === pts.length - 1 ? 4.5 : 2.5}
                fill={i === pts.length - 1 ? "rgb(var(--ink))" : "#fff"}
                stroke="rgb(var(--ink))"
                strokeWidth={1.5}
              />
            ))}
          </svg>
          <p className="mt-4 text-[13.5px] leading-relaxed text-navy-dark/70">
            {takeaway}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

/* ---------- 8. qualify: who this is for, and who it is not ---------- */
export const FitPanel = ({ good, bad }: { good: string[]; bad: string[] }) => (
  <div className="grid gap-4 sm:grid-cols-2">
    <motion.div
      className="rounded-2xl border border-line bg-white p-6"
      {...reveal}
    >
      <h3 className="text-[15.5px] font-semibold text-navy-dark">
        A good fit if…
      </h3>
      <ul className="mt-4 space-y-3">
        {good.map((g) => (
          <li key={g} className="flex gap-2.5">
            <Check className="mt-0.5 h-4 w-4 flex-none text-verified" />
            <span className="text-[13.5px] leading-relaxed text-navy-dark/75">
              {g}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>

    <motion.div
      className="rounded-2xl border border-line bg-linen p-6"
      {...reveal}
      transition={{ ...reveal.transition, delay: 0.08 }}
    >
      <h3 className="text-[15.5px] font-semibold text-navy-dark">
        Probably not if…
      </h3>
      <ul className="mt-4 space-y-3">
        {bad.map((b) => (
          <li key={b} className="flex gap-2.5">
            <Minus className="mt-0.5 h-4 w-4 flex-none text-navy-dark/45" />
            <span className="text-[13.5px] leading-relaxed text-navy-dark/75">
              {b}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-[12.5px] leading-relaxed text-navy-dark/70">
        If it is not a fit we will say so on the call and point you somewhere
        better. That costs us a deal and saves you a quarter.
      </p>
    </motion.div>
  </div>
);

/* ---------- 9. pricing context, before they go hunting ---------- */
export const PricingContext = ({
  from,
  unit,
  note,
  drivers,
}: {
  from: string;
  unit: string;
  note: string;
  drivers: { k: string; v: string }[];
}) => (
  <motion.div
    className="rounded-3xl border border-line bg-white p-7 sm:p-9"
    {...reveal}
  >
    <div className="flex flex-wrap items-end gap-x-6 gap-y-2">
      <span className="text-[44px] font-semibold leading-none tracking-[-0.03em] text-navy-dark">
        {from}
      </span>
      <span className="pb-1 text-[14px] text-navy-dark/65">{unit}</span>
    </div>
    <p className="mt-4 max-w-2xl text-[14.5px] leading-relaxed text-navy-dark/70">
      {note}
    </p>

    <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/65">
      What moves the number
    </p>
    <div className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
      {drivers.map((d) => (
        <div key={d.k} className="border-t border-line pt-3">
          <span className="block text-[13.5px] font-semibold text-navy-dark">
            {d.k}
          </span>
          <span className="mt-1 block text-[13px] leading-relaxed text-navy-dark/70">
            {d.v}
          </span>
        </div>
      ))}
    </div>

    <div className="mt-8 flex flex-wrap gap-3">
      <button
        onClick={openBooking}
        className="inline-flex items-center gap-2 rounded-xl bg-navy-dark px-6 py-3.5 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-black"
      >
        Get a scoped quote
        <ArrowRight className="h-4 w-4" />
      </button>
      <Link
        to="/pricing"
        className="inline-flex items-center rounded-xl border border-navy-dark/20 px-6 py-3.5 text-[14px] font-semibold text-navy-dark transition-colors duration-300 hover:border-navy-dark"
      >
        See all pricing
      </Link>
    </div>
  </motion.div>
);

/* ---------- 12. inline CTA, used between heavy sections ---------- */
export const InlineCta = ({
  title,
  body,
  primary = "Book a 15-minute call",
}: {
  title: string;
  body: string;
  primary?: string;
}) => (
  <motion.div
    className="rounded-3xl bg-navy-dark px-7 py-9 text-center sm:px-10"
    {...reveal}
  >
    <h2 className="mx-auto max-w-2xl text-[24px] font-semibold leading-tight tracking-[-0.02em] text-white sm:text-[30px]">
      {title}
    </h2>
    <p className="mx-auto mt-3 max-w-xl text-[14.5px] leading-relaxed text-white/70">
      {body}
    </p>
    <div className="mt-7 flex flex-wrap justify-center gap-3">
      <button
        onClick={openBooking}
        className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-[14px] font-semibold text-navy-dark transition-colors duration-300 hover:bg-white/90"
      >
        {primary}
        <ArrowRight className="h-4 w-4" />
      </button>
      <Link
        to="/contact"
        className="inline-flex items-center rounded-xl border border-white/25 px-6 py-3.5 text-[14px] font-semibold text-white transition-colors duration-300 hover:border-white"
      >
        Get a free teardown
      </Link>
    </div>
  </motion.div>
);

/* ---------- 10. objection FAQ + FAQPage schema ---------- */
export const ObjectionFaq = ({
  faqs,
}: {
  faqs: { q: string; a: string }[];
}) => (
  <>
    <div className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white">
      {faqs.map((f) => (
        <details key={f.q} className="group px-6 py-5 open:bg-mist/60">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
            <span className="text-[15.5px] font-semibold text-navy-dark">
              {f.q}
            </span>
            <span className="mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full border border-navy-dark/20 text-navy-dark transition-transform duration-300 group-open:rotate-45">
              <span className="text-[14px] leading-none">+</span>
            </span>
          </summary>
          <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-navy-dark/70">
            {f.a}
          </p>
        </details>
      ))}
    </div>

    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      }}
    />
  </>
);

export { SectionHead };
