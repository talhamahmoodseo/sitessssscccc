import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { asset, openBooking } from "@/lib/booking";
import { linkBuilding as LB } from "../content/linkBuilding";
import { DarkGlow, Eyebrow, H2, ease, rise } from "../kit";

const R = LB.proof;

const W = 1000;
const H = 260;
const LAST = R.series.length - 1;

const point = (i: number) => {
  const max = Math.max(...R.series) * 1.12;
  return [(i / LAST) * W, H - (R.series[i] / max) * H] as const;
};

/** Organic clicks over the campaign, with the three moments that mattered
 *  pinned to the line. Labels are HTML so they stay readable at any width. */
const ClicksChart = () => {
  const pts = R.series.map((_, i) => point(i));
  const line = pts.reduce((d, [x, y], i) => {
    if (!i) return `M${x},${y}`;
    const [px, py] = pts[i - 1];
    const cx = (px + x) / 2;
    return `${d} C${cx},${py} ${cx},${y} ${x},${y}`;
  }, "");
  const area = `${line} L${W},${H} L0,${H} Z`;

  return (
    <div>
      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="block h-[200px] w-full sm:h-[240px]"
          fill="none"
          role="img"
          aria-label={`${R.seriesLabel}: from ${R.series[0].toLocaleString()} to ${R.series[LAST].toLocaleString()}`}
        >
          <defs>
            <linearGradient id="lb-area" x1="0" x2="0" y1="0" y2="1">
              <stop
                offset="0%"
                stopColor="rgb(var(--mark))"
                stopOpacity="0.26"
              />
              <stop
                offset="100%"
                stopColor="rgb(var(--mark))"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75, 1].map((g) => (
            <line
              key={g}
              x1="0"
              x2={W}
              y1={H * g - 0.5}
              y2={H * g - 0.5}
              stroke="white"
              strokeOpacity={g === 1 ? 0.14 : 0.06}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          <motion.path
            d={area}
            fill="url(#lb-area)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
          />
          <motion.path
            d={line}
            stroke="rgb(var(--mark))"
            strokeWidth={2.5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease }}
          />
        </svg>

        {/* milestone pins, positioned in percentages over the chart */}
        {R.milestones.map((m, n) => {
          const [x, y] = point(m.at);
          const left = (x / W) * 100;
          const top = (y / H) * 100;
          const end = m.at === LAST;
          return (
            <motion.div
              key={m.t}
              className="absolute"
              style={{ left: `${left}%`, top: `${top}%` }}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.6 + n * 0.35 }}
            >
              <span className="absolute -left-[5px] -top-[5px] h-[10px] w-[10px] rounded-full bg-mark ring-4 ring-mark/20" />
              <span
                className={`absolute bottom-3 hidden whitespace-nowrap rounded-full bg-white/[0.08] px-2.5 py-1 text-[11.5px] font-medium text-white/85 ring-1 ring-white/10 backdrop-blur sm:block ${
                  end ? "right-0" : "-translate-x-1/2"
                }`}
              >
                {m.t}
              </span>
            </motion.div>
          );
        })}
      </div>

      <div
        className="mt-3 flex justify-between text-[11.5px] text-white/60"
        aria-hidden="true"
      >
        {R.series.map((_, i) => (
          <span key={i}>{i === 0 ? "Start" : `M${i}`}</span>
        ))}
      </div>
    </div>
  );
};

const Results = () => (
  <section className="relative overflow-hidden bg-navy-dark py-24 lg:py-36">
    <DarkGlow className="-left-48 top-1/4 h-[520px] w-[720px] opacity-25" />
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <motion.div className="max-w-3xl" {...rise()}>
          <Eyebrow dark className="mb-4">
            {R.eyebrow}
          </Eyebrow>
          <H2 dark>{R.h2}</H2>
        </motion.div>
        <motion.div className="flex-none" {...rise(0.1)}>
          <span className="inline-flex rounded-full bg-white/[0.06] px-3.5 py-1.5 text-[12.5px] font-medium text-white/80 ring-1 ring-white/10">
            {R.label}
          </span>
        </motion.div>
      </div>

      <motion.div
        className="mt-12 overflow-hidden rounded-[28px] bg-white/[0.035] ring-1 ring-white/10"
        {...rise(0.05)}
      >
        {/* the numbers */}
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {R.stats.map((s, n) => (
            <div
              key={s.k}
              className={`p-6 sm:p-8 ${n % 2 ? "border-l border-white/10" : ""} ${
                n > 1 ? "border-t border-white/10 lg:border-t-0" : ""
              } ${n === 2 ? "lg:border-l" : ""}`}
            >
              <dt className="flex items-center gap-2 text-[12.5px] font-medium text-white/70">
                <span className={`h-2 w-2 rounded-full ${s.dot}`} />
                {s.k}
              </dt>
              <dd className="mt-4 text-[1.9rem] font-semibold leading-none tracking-[-0.04em] text-white tabular-nums sm:text-[2.4rem]">
                {s.v}
              </dd>
              <dd className="mt-2.5 text-[12.5px] text-white/60">{s.sub}</dd>
            </div>
          ))}
        </dl>

        {/* the curve */}
        <div className="border-t border-white/10 px-6 pb-7 pt-8 sm:px-8 lg:px-10">
          <div className="mb-10 flex items-baseline justify-between gap-4">
            <p className="text-[13.5px] font-medium text-white/80">
              {R.seriesLabel}
            </p>
            <p className="text-[12.5px] text-white/60 tabular-nums">
              {R.series[0].toLocaleString()} →{" "}
              <span className="font-semibold text-white">
                {R.series[LAST].toLocaleString()}
              </span>
            </p>
          </div>
          <ClicksChart />
        </div>

        {/* the voice and the reason */}
        <div className="grid border-t border-white/10 lg:grid-cols-[1.15fr_0.85fr]">
          <figure className="p-6 sm:p-8 lg:p-10">
            <blockquote className="text-[1.15rem] leading-[1.55] tracking-[-0.01em] text-white sm:text-[1.3rem]">
              &ldquo;{R.quote.text}&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <img
                src={asset(R.quote.avatar)}
                alt=""
                className="h-10 w-10 rounded-full object-cover ring-2 ring-white/15"
                loading="lazy"
              />
              <span>
                <span className="block text-[14px] font-semibold text-white">
                  {R.quote.name}
                </span>
                <span className="block text-[12.5px] text-white/70">
                  {R.quote.role}
                </span>
              </span>
            </figcaption>
          </figure>
          <div className="flex flex-col border-t border-white/10 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
              Why it worked
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-white/80">
              {R.takeaway}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 lg:mt-auto lg:pt-7">
              <button
                onClick={openBooking}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[14px] font-semibold text-navy-dark transition-colors duration-300 hover:bg-mark"
              >
                Book a strategy call
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
              <Link
                to={R.caseHref}
                className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-white/75 transition-colors duration-300 hover:text-white"
              >
                Read the case study
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* more from the case files */}
      <motion.div
        className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8"
        {...rise(0.1)}
      >
        <span className="text-[12.5px] text-white/60">More results</span>
        {R.more.map((m) => (
          <Link
            key={m.k}
            to={m.to}
            className="group inline-flex items-center gap-2 text-[14px] text-white/80 transition-colors duration-300 hover:text-white"
          >
            <span className="text-white/60">{m.k}:</span>
            <span className="font-semibold">{m.v}</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-white/50 transition-colors group-hover:text-white" />
          </Link>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Results;
