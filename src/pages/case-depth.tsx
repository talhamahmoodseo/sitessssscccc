import { motion } from "motion/react";
import { X } from "lucide-react";

/**
 * The three artefacts the case-studies index promises are in "every file":
 * the growth chart, the indexation report, and the domains we turned down.
 *
 * They were missing from the detail pages, so the index was advertising
 * something the files did not contain. These close that gap.
 */

type Indexation = {
  rate: string;
  median: string;
  slowest: string;
  note: string;
};

type Rejection = { site: string; metric: string; reason: string };

/* ---------------------------- the growth chart ---------------------------- */

export const GrowthChart = ({
  series,
  seriesLabel,
}: {
  series: number[];
  seriesLabel: string;
}) => {
  const W = 760;
  const H = 240;
  const PAD_L = 8;
  const PAD_B = 26;
  const lo = 0;
  const hi = Math.max(...series);
  const x = (i: number) => PAD_L + (i / (series.length - 1)) * (W - PAD_L * 2);
  const y = (v: number) =>
    H - PAD_B - ((v - lo) / (hi - lo)) * (H - PAD_B - 14);
  const line = series
    .map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v)}`)
    .join(" ");
  const area = `${line} L${x(series.length - 1)},${H - PAD_B} L${x(0)},${H - PAD_B} Z`;
  const lift = Math.round(
    ((series[series.length - 1] - series[0]) / series[0]) * 100,
  );

  return (
    <div className="rounded-3xl border border-line bg-white p-7 lg:p-9">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-dark/70">
            {seriesLabel}
          </p>
          <p className="mt-2 text-[2.4rem] font-semibold leading-none tracking-[-0.03em] text-navy-dark tabular-nums">
            {series[series.length - 1].toLocaleString()}
          </p>
        </div>
        <p className="text-[13px] font-semibold text-navy-dark/70">
          {"from "}
          <span className="tabular-nums">{series[0].toLocaleString()}</span>
          {" · "}
          <span className="font-bold text-navy-dark tabular-nums">
            +{lift}%
          </span>
        </p>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label={`${seriesLabel}: ${series[0].toLocaleString()} rising to ${series[series.length - 1].toLocaleString()}`}
      >
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <line
            key={f}
            x1={PAD_L}
            x2={W - PAD_L}
            y1={y(hi * f)}
            y2={y(hi * f)}
            stroke="rgb(var(--ink) / 0.08)"
            strokeWidth="1"
          />
        ))}

        <motion.path
          d={area}
          fill="rgb(var(--mark) / 0.22)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke="rgb(var(--ink))"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: "easeInOut" }}
        />

        {series.map((v, i) => (
          <motion.circle
            key={i}
            cx={x(i)}
            cy={y(v)}
            r="3.4"
            fill="rgb(var(--ink))"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: 0.45 + i * 0.09 }}
          />
        ))}

        {series.map((_, i) => (
          <text
            key={i}
            x={x(i)}
            y={H - 6}
            textAnchor="middle"
            className="fill-navy-dark/70"
            style={{ fontSize: 11, fontWeight: 600 }}
          >
            {i === 0 ? "start" : `m${i}`}
          </text>
        ))}
      </svg>
    </div>
  );
};

/* -------------------------- the indexation report -------------------------- */

export const IndexationReport = ({ data }: { data: Indexation }) => (
  <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
    <dl className="grid grid-cols-3 gap-4 self-start lg:grid-cols-1">
      {[
        { k: "Indexed", v: data.rate },
        { k: "Median time", v: data.median },
        { k: "Slowest", v: data.slowest },
      ].map((e, i) => (
        <motion.div
          key={e.k}
          className={`rounded-2xl border border-line bg-white p-5 lg:flex lg:items-baseline lg:justify-between lg:gap-6 lg:p-6`}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: i * 0.08 }}
        >
          <dt className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-navy-dark/70 lg:text-[13px] lg:normal-case lg:tracking-normal">
            {e.k}
          </dt>
          <dd className="mt-2 text-[1.4rem] font-semibold leading-none tracking-[-0.03em] text-navy-dark tabular-nums lg:mt-0 lg:text-[1.7rem]">
            {e.v}
          </dd>
        </motion.div>
      ))}
    </dl>

    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-dark/70">
        What went wrong, and what we did
      </p>
      <p className="mt-4 text-[15.5px] leading-[1.65] text-navy-dark/80">
        {data.note}
      </p>
    </motion.div>
  </div>
);

/* ---------------------------- what we rejected ---------------------------- */

export const RejectedHere = ({
  items,
  reviewed,
  placed,
}: {
  items: Rejection[];
  reviewed: number;
  placed: number;
}) => (
  <>
    <motion.p
      className="mb-9 max-w-2xl text-[15.5px] leading-relaxed text-navy-dark/75"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {`We reviewed ${reviewed} domains on this engagement and placed on ${placed}. Three of the rejections are below, with the reason, because what we refused says more about the work than what we ran.`}
    </motion.p>

    <div className="overflow-hidden rounded-3xl border border-line bg-white">
      {items.map((r, i) => (
        <motion.div
          key={r.site}
          className={`grid gap-4 p-6 sm:grid-cols-[1fr_auto] sm:items-start lg:p-7 ${
            i ? "border-t border-line" : ""
          }`}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.45, delay: i * 0.08 }}
        >
          <div>
            <div className="flex items-center gap-2.5">
              <X className="h-4 w-4 shrink-0 text-gap" aria-hidden="true" />
              <h3 className="text-[16px] font-semibold text-navy-dark">
                {r.site}
              </h3>
            </div>
            <p className="mt-2.5 max-w-2xl pl-[26px] text-[14px] leading-relaxed text-navy-dark/75">
              {r.reason}
            </p>
          </div>
          <span className="shrink-0 text-[13px] font-bold tabular-nums text-navy-dark/70 sm:pt-1">
            {r.metric}
          </span>
        </motion.div>
      ))}
    </div>
  </>
);
