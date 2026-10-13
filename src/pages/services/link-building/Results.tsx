import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { asset, openBooking } from "@/lib/booking";
import { linkBuilding as LB } from "../content/linkBuilding";
import { DarkGlow, Eyebrow, H2, ease, rise } from "./kit";

const R = LB.proof;

const W = 640;
const H = 240;

/** Organic clicks over the campaign, drawn in as it scrolls into view. */
const ClicksChart = () => {
  const max = Math.max(...R.series) * 1.08;
  const pts = R.series.map((v, i) => {
    const x = (i / (R.series.length - 1)) * W;
    const y = H - (v / max) * H;
    return [x, y] as const;
  });
  // smooth the line with a simple cubic through each midpoint
  const line = pts.reduce((d, [x, y], i) => {
    if (!i) return `M${x},${y}`;
    const [px, py] = pts[i - 1];
    const cx = (px + x) / 2;
    return `${d} C${cx},${py} ${cx},${y} ${x},${y}`;
  }, "");
  const area = `${line} L${W},${H} L0,${H} Z`;
  const [lx, ly] = pts[pts.length - 1];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full overflow-visible"
      fill="none"
      role="img"
      aria-label={`${R.seriesLabel}: from ${R.series[0].toLocaleString()} to ${R.series[R.series.length - 1].toLocaleString()}`}
    >
      <defs>
        <linearGradient id="lb-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgb(var(--mark))" stopOpacity="0.38" />
          <stop offset="100%" stopColor="rgb(var(--mark))" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((g) => (
        <line
          key={g}
          x1="0"
          x2={W}
          y1={H * g}
          y2={H * g}
          stroke="white"
          strokeOpacity="0.08"
        />
      ))}
      <motion.path
        d={area}
        fill="url(#lb-area)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.9 }}
      />
      <motion.path
        d={line}
        stroke="rgb(var(--mark))"
        strokeWidth={3}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease }}
      />
      <motion.g
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5, duration: 0.4 }}
        style={{ transformOrigin: `${lx}px ${ly}px` }}
      >
        <circle cx={lx} cy={ly} r="11" fill="rgb(var(--mark))" fillOpacity="0.25" />
        <circle cx={lx} cy={ly} r="5.5" fill="rgb(var(--mark))" />
      </motion.g>
    </svg>
  );
};

const Results = () => (
  <section className="relative overflow-hidden bg-navy-dark py-24 lg:py-36">
    <DarkGlow className="-left-48 top-1/3 h-[520px] w-[720px] opacity-30" />
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div className="max-w-3xl" {...rise()}>
        <Eyebrow dark className="mb-4">
          {R.eyebrow}
        </Eyebrow>
        <H2 dark>{R.h2}</H2>
      </motion.div>

      <div className="mt-14 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <motion.div
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-9"
          {...rise()}
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/70">
                {R.label}
              </p>
              <p className="mt-2 text-[14px] text-white/70">{R.seriesLabel}</p>
            </div>
            <p className="text-right">
              <span className="block text-[2.4rem] font-semibold leading-none tracking-[-0.04em] text-white tabular-nums">
                {R.series[R.series.length - 1].toLocaleString()}
              </span>
              <span className="mt-1 block text-[12px] text-white/70">
                clicks a month, up from {R.series[0].toLocaleString()}
              </span>
            </p>
          </div>
          <div className="mt-8">
            <ClicksChart />
            <div className="mt-3 flex justify-between text-[11.5px] text-white/60" aria-hidden="true">
              {R.series.map((_, i) => (
                <span key={i}>{i === 0 ? "Start" : `M${i}`}</span>
              ))}
            </div>
          </div>
          <p className="mt-7 max-w-2xl border-t border-white/10 pt-6 text-[15px] leading-relaxed text-white/75">
            {R.takeaway}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 lg:gap-4">
          {R.stats.map((s, n) => (
            <motion.div
              key={s.k}
              className={`flex flex-col justify-between rounded-3xl p-5 sm:p-6 ${s.tile}`}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1 + n * 0.08, ease }}
            >
              <span className="text-[12px] font-semibold text-navy-dark/75">
                {s.k}
              </span>
              <span className="mt-8 block whitespace-nowrap text-[1.6rem] font-semibold leading-none tracking-[-0.04em] text-navy-dark tabular-nums sm:text-[1.9rem]">
                {s.v}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <motion.figure
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-9"
          {...rise()}
        >
          <blockquote className="text-[1.3rem] leading-[1.45] tracking-[-0.015em] text-white sm:text-[1.5rem]">
            &ldquo;{R.quote.text}&rdquo;
          </blockquote>
          <figcaption className="mt-7 flex items-center gap-3.5">
            <img
              src={asset(R.quote.avatar)}
              alt=""
              className="h-11 w-11 rounded-full object-cover ring-2 ring-white/15"
              loading="lazy"
            />
            <span>
              <span className="block text-[14.5px] font-semibold text-white">
                {R.quote.name}
              </span>
              <span className="block text-[13px] text-white/70">
                {R.quote.role}
              </span>
            </span>
          </figcaption>
        </motion.figure>

        <motion.div
          className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-7"
          {...rise(0.08)}
        >
          <ul className="space-y-4">
            {R.more.map((m) => (
              <li key={m.k} className="border-b border-white/10 pb-4 last:border-0">
                <span className="block text-[12px] text-white/70">{m.k}</span>
                <span className="mt-1 block text-[15.5px] font-semibold text-white">
                  {m.v}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-3 pt-6">
            <button
              onClick={openBooking}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[14px] font-semibold text-navy-dark transition-colors duration-300 hover:bg-mark"
            >
              Book a strategy call
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
            <Link
              to={R.caseHref}
              className="inline-flex items-center justify-center gap-1.5 text-[13.5px] font-semibold text-white/75 transition-colors duration-300 hover:text-white"
            >
              Read the full case study
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default Results;
