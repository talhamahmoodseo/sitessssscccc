import { useId, useRef } from "react";
import { motion, useInView } from "motion/react";
import { ease } from "../services/kit";

/**
 * Small, honest charts for the case studies: no 3D, no gradients on data,
 * labelled axes, and the numbers written on the marks where they matter.
 * Ink for the series that matters, pastels for context.
 */

const fmt = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K` : `${n}`;

/* ------------------------------- line + area ------------------------------- */

export const LineArea = ({
  series,
  labels,
  notes = [],
  height = 260,
  dark = false,
  compare,
}: {
  series: number[];
  labels: string[];
  notes?: { at: number; t: string }[];
  height?: number;
  dark?: boolean;
  /** an earlier period, drawn as a dashed line underneath */
  compare?: number[];
}) => {
  const W = 600;
  const H = height;
  const pad = { t: 18, b: 10 };
  const max = Math.max(...series, ...(compare ?? [])) * 1.08;
  const clip = `reveal-${useId().replace(/:/g, "")}`;
  const box = useRef<HTMLDivElement>(null);
  const seen = useInView(box, { once: true, margin: "-60px" });
  const peak = series.indexOf(Math.max(...series));
  const min = 0;
  const x = (i: number) => (i / (series.length - 1)) * W;
  const y = (v: number) =>
    pad.t + (1 - (v - min) / (max - min)) * (H - pad.t - pad.b);
  const line = series
    .map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`)
    .join(" ");
  const area = `${line} L${W},${H} L0,${H} Z`;
  const before = compare
    ?.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`)
    .join(" ");
  const ink = dark ? "255,255,255" : "14,14,14";
  const grid = [0.25, 0.5, 0.75].map((f) => max * f);

  return (
    <div ref={box}>
      <div className="relative" style={{ height: H }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <clipPath id={clip}>
              <motion.rect
                x={0}
                y={0}
                height={H}
                initial={{ width: 0 }}
                animate={{ width: seen ? W : 0 }}
                transition={{ duration: 1.6, ease }}
              />
            </clipPath>
          </defs>
          {grid.map((g) => (
            <line
              key={g}
              x1={0}
              x2={W}
              y1={y(g)}
              y2={y(g)}
              stroke={`rgba(${ink},0.08)`}
              strokeDasharray="4 6"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {before && (
            <motion.path
              d={before}
              fill="none"
              stroke="rgb(var(--plume-cool))"
              strokeWidth={2}
              strokeDasharray="5 6"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          )}
          <g clipPath={`url(#${clip})`}>
            <path d={area} fill={`rgba(${ink},0.06)`} />
            <path
              d={line}
              fill="none"
              stroke={`rgb(${ink})`}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        </svg>

        {/* points and value labels as HTML, so text never stretches */}
        {series.map((v, i) => (
          <span
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${(x(i) / W) * 100}%`, top: y(v) }}
          >
            <span
              className={`block h-2.5 w-2.5 rounded-full ring-2 ${dark ? "bg-white ring-navy-dark" : "bg-navy-dark ring-white"}`}
            />
            {(i === 0 || i === series.length - 1 || (compare && i === peak)) && (
              <span
                className={`absolute whitespace-nowrap rounded-md px-1.5 py-0.5 text-[11px] font-bold tabular-nums ${
                  i === 0 ? "bottom-4 left-0" : i === series.length - 1 ? "bottom-4 right-0" : "left-4 top-[-6px]"
                } ${dark ? "bg-white text-navy-dark" : "bg-navy-dark text-white"}`}
              >
                {v.toLocaleString()}
              </span>
            )}
          </span>
        ))}

        {notes.map((n) => {
          const edge =
            n.at === series.length - 1 ? "right" : n.at === 0 ? "left" : "mid";
          return (
            <span
              key={n.t}
              className={`absolute hidden sm:flex sm:flex-col ${
                edge === "right"
                  ? "-translate-x-full items-end"
                  : edge === "left"
                    ? "items-start"
                    : "-translate-x-1/2 items-center"
              }`}
              style={{
                left: `${(x(n.at) / W) * 100}%`,
                top: y(series[n.at]) + 18,
              }}
            >
              <span
                className={`block h-6 w-px ${edge === "right" ? "mr-[5px]" : edge === "left" ? "ml-[5px]" : ""} ${dark ? "bg-white/30" : "bg-navy-dark/25"}`}
              />
              <span
                className={`block whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  dark
                    ? "bg-white/10 text-white ring-1 ring-white/20"
                    : "bg-white text-navy-dark ring-1 ring-line"
                }`}
              >
                {n.t}
              </span>
            </span>
          );
        })}
      </div>
      <div className="mt-3 flex justify-between">
        {labels.map((l) => (
          <span
            key={l}
            className={`text-[11px] ${dark ? "text-white/70" : "text-navy-dark/70"}`}
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
};

/* --------------------------------- columns --------------------------------- */

export const Columns = ({
  data,
  height = 180,
  tint = "bg-lilac",
}: {
  data: { k: string; v: number }[];
  height?: number;
  tint?: string;
}) => {
  const max = Math.max(...data.map((d) => d.v)) || 1;
  return (
    <div>
      <div className="flex items-end gap-2 sm:gap-3" style={{ height }}>
        {data.map((d, i) => (
          <div
            key={d.k}
            className="flex h-full min-w-0 flex-1 flex-col justify-end"
          >
            <span className="mb-1.5 text-center text-[12px] font-bold tabular-nums text-navy-dark">
              {fmt(d.v)}
            </span>
            <motion.span
              className={`block w-full rounded-t-lg ${i === data.length - 1 ? "bg-navy-dark" : tint}`}
              initial={{ height: 0 }}
              whileInView={{ height: `${Math.max(3, (d.v / max) * 100)}%` }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.07, ease }}
              style={{ maxHeight: `calc(100% - 22px)` }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-2 sm:gap-3">
        {data.map((d) => (
          <span
            key={d.k}
            className="min-w-0 flex-1 truncate text-center text-[11px] text-navy-dark/70"
          >
            {d.k}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ------------------------------ stacked 100% bar ------------------------------ */

const STACK = [
  "bg-navy-dark",
  "bg-lilac",
  "bg-mint",
  "bg-butter",
  "bg-blush",
  "bg-sky",
];

export const StackBar = ({
  parts,
  unit = "",
}: {
  parts: { k: string; v: number }[];
  unit?: string;
}) => {
  const total = parts.reduce((a, p) => a + p.v, 0);
  return (
    <div>
      <div className="flex h-10 overflow-hidden rounded-xl">
        {parts.map((p, i) => (
          <motion.span
            key={p.k}
            className={`flex items-center justify-center ${STACK[i % STACK.length]}`}
            initial={{ width: 0 }}
            whileInView={{ width: `${(p.v / total) * 100}%` }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: i * 0.08, ease }}
          >
            {(p.v / total) * 100 >= 9 && (
              <span
                className={`text-[12px] font-bold tabular-nums ${i === 0 ? "text-white" : "text-navy-dark"}`}
              >
                {p.v}
                {unit}
              </span>
            )}
          </motion.span>
        ))}
      </div>
      <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
        {parts.map((p, i) => (
          <li
            key={p.k}
            className="flex items-center gap-2.5 text-[13.5px] text-navy-dark/80"
          >
            <span
              className={`h-3 w-3 flex-none rounded-[3px] ${STACK[i % STACK.length]}`}
            />
            <span className="flex-1">{p.k}</span>
            <span className="font-semibold tabular-nums text-navy-dark">
              {p.v}
              {unit}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

/* ------------------------- ranking spread over time ------------------------- */

export const Positions = ({
  data,
}: {
  data: { m: string; top3: number; top10: number; top20: number }[];
}) => {
  const max = Math.max(...data.map((d) => d.top20)) || 1;
  const H = 200;
  return (
    <div>
      <div className="flex items-end gap-3 sm:gap-6" style={{ height: H }}>
        {data.map((d, i) => (
          <div
            key={d.m}
            className="flex h-full min-w-0 flex-1 flex-col justify-end"
          >
            <span className="mb-1.5 text-center text-[12px] font-bold tabular-nums text-navy-dark">
              {d.top20}
            </span>
            <motion.div
              className="flex w-full flex-col-reverse overflow-hidden rounded-t-lg"
              initial={{ height: 0 }}
              whileInView={{ height: `${(d.top20 / max) * 100}%` }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease }}
              style={{ maxHeight: "calc(100% - 22px)" }}
            >
              <span
                className="block bg-navy-dark"
                style={{ height: `${(d.top3 / d.top20) * 100}%` }}
              />
              <span
                className="block bg-lilac"
                style={{ height: `${((d.top10 - d.top3) / d.top20) * 100}%` }}
              />
              <span className="block flex-1 bg-linen" />
            </motion.div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-3 sm:gap-6">
        {data.map((d) => (
          <span
            key={d.m}
            className="min-w-0 flex-1 text-center text-[11px] text-navy-dark/70"
          >
            {d.m}
          </span>
        ))}
      </div>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        {[
          ["bg-navy-dark", "Top 3"],
          ["bg-lilac", "Positions 4–10"],
          ["bg-linen ring-1 ring-line", "Positions 11–20"],
        ].map(([c, l]) => (
          <li
            key={l}
            className="flex items-center gap-2 text-[12.5px] text-navy-dark/80"
          >
            <span className={`h-3 w-3 rounded-[3px] ${c}`} />
            {l}
          </li>
        ))}
      </ul>
    </div>
  );
};

/* --------------------------- growth: before, after --------------------------- */

/** 14,300 -> "14.3K": one decimal, the way Semrush shows it */
const k1 = (n: number) => `${(n / 1000).toFixed(1)}K`;

/**
 * Traffic growth drawn so the size of the change is the size you see: every
 * bar starts at zero, the same scale is used throughout, and the two numbers
 * that matter (the month the work started and the latest month) are written
 * on the bars. Built for SmileTutor's Semrush data (2024 against 2026).
 */
export const GrowthChart = ({
  labels,
  now,
  then,
  nowLabel,
  thenLabel,
  change,
}: {
  labels: string[];
  /** this year, month by month */
  now: number[];
  /** the same months two years earlier */
  then: number[];
  nowLabel: string;
  thenLabel: string;
  change: string;
}) => {
  const last = labels.length - 1;
  const start = then[last];
  const end = now[last];
  const peak = now.indexOf(Math.max(...now));
  const step = 25000;
  const top = Math.ceil(Math.max(...now, ...then) / step) * step;
  const ticks = Array.from({ length: top / step + 1 }, (_, i) => i * step);
  const grow = (delay: number) => ({
    initial: { scaleY: 0 },
    whileInView: { scaleY: 1 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.8, delay, ease },
  });

  return (
    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.6fr] lg:gap-12">
      {/* the headline comparison */}
      <div>
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-navy-dark/60">
          {labels[last]} {thenLabel} vs {labels[last]} {nowLabel}
        </p>
        <div className="mt-5 flex h-[230px] items-end gap-5 border-b border-navy-dark/15 sm:h-[260px]">
          {[
            { v: start, k: `${labels[last]} ${thenLabel}`, ink: false },
            { v: end, k: `${labels[last]} ${nowLabel}`, ink: true },
          ].map((b, i) => (
            <div key={b.k} className="flex h-full flex-1 flex-col justify-end">
              <span className="mb-2 text-[1.6rem] font-semibold leading-none tracking-[-0.03em] tabular-nums text-navy-dark sm:text-[1.9rem]">
                {k1(b.v)}
              </span>
              <motion.span
                className={`block w-full rounded-t-xl ${b.ink ? "bg-navy-dark" : "bg-[rgb(var(--plume-cool)/0.45)]"}`}
                style={{ height: `${(b.v / end) * 82}%`, transformOrigin: "bottom" }}
                {...grow(0.1 + i * 0.25)}
              />
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-5">
          <span className="flex-1 text-[12px] leading-snug text-navy-dark/70">
            {labels[last]} {thenLabel}
            <br />
            when the work started
          </span>
          <span className="flex-1 text-[12px] leading-snug text-navy-dark/70">
            {labels[last]} {nowLabel}
            <br />
            two years later
          </span>
        </div>
        <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-mint px-3.5 py-1.5 text-[13px] font-semibold text-navy-dark">
          {change} organic traffic, {(end / start).toFixed(1)}× the visits
        </p>
      </div>

      {/* every month, both years */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-navy-dark/60">
            Month by month
          </p>
          <div className="flex items-center gap-4 text-[12px] text-navy-dark/80">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-[3px] bg-[rgb(var(--plume-cool)/0.45)]" />
              {thenLabel}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-[3px] bg-navy-dark" />
              {nowLabel}
            </span>
          </div>
        </div>
        <div className="mt-5 flex gap-3">
          {/* y axis */}
          <div className="relative h-[230px] w-8 flex-none sm:h-[260px]">
            {ticks.map((t) => (
              <span
                key={t}
                className="absolute right-0 translate-y-1/2 text-[10.5px] tabular-nums text-navy-dark/55"
                style={{ bottom: `${(t / top) * 100}%` }}
              >
                {t ? `${t / 1000}K` : "0"}
              </span>
            ))}
          </div>
          <div className="relative h-[230px] flex-1 sm:h-[260px]">
            {ticks.map((t) => (
              <span
                key={t}
                className={`absolute inset-x-0 border-t ${t ? "border-dashed border-navy-dark/10" : "border-navy-dark/20"}`}
                style={{ bottom: `${(t / top) * 100}%` }}
              />
            ))}
            <div className="absolute inset-0 flex items-end gap-1.5 sm:gap-3">
              {labels.map((l, i) => (
                <div
                  key={l}
                  className="relative flex h-full flex-1 items-end justify-center gap-[2px] sm:gap-1"
                  title={`${l}: ${then[i].toLocaleString()} in ${thenLabel}, ${now[i].toLocaleString()} in ${nowLabel}`}
                >
                  <motion.span
                    className="block w-[42%] max-w-[18px] rounded-t-[4px] bg-[rgb(var(--plume-cool)/0.45)]"
                    style={{ height: `${(then[i] / top) * 100}%`, transformOrigin: "bottom" }}
                    {...grow(i * 0.04)}
                  />
                  <motion.span
                    className="block w-[42%] max-w-[18px] rounded-t-[4px] bg-navy-dark"
                    style={{ height: `${(now[i] / top) * 100}%`, transformOrigin: "bottom" }}
                    {...grow(0.15 + i * 0.04)}
                  />
                  {(i === peak || i === last) && (
                    <span
                      className={`absolute whitespace-nowrap rounded-md bg-navy-dark px-1.5 py-0.5 text-[10.5px] font-bold tabular-nums text-white ${i === last ? "right-0" : "left-1/2 -translate-x-1/2"}`}
                      style={{ bottom: `calc(${(now[i] / top) * 100}% + 6px)` }}
                    >
                      {k1(now[i])}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-2 flex gap-3">
          <span className="w-8 flex-none" />
          <div className="flex flex-1 gap-1.5 sm:gap-3">
            {labels.map((l) => (
              <span key={l} className="flex-1 text-center text-[10.5px] text-navy-dark/65 sm:text-[11px]">
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
