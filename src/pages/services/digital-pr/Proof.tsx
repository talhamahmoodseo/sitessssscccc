import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { digitalPr as C } from "../content/digitalPr";
import { DarkGlow, Eyebrow, H2, Soft, ease, rise } from "../kit";
import { SampleNote } from "../common";

const KIND_TINT: Record<string, string> = {
  "Data study": "bg-sky text-navy-dark",
  Feature: "bg-mint text-navy-dark",
  "Expert quote": "bg-butter text-navy-dark",
  Opinion: "bg-lilac text-navy-dark",
  Roundup: "bg-blush text-navy-dark",
  Pickup: "bg-white/[0.14] text-white ring-1 ring-white/20",
};

const MONTHS = [0, 1, 2, 3, 4, 5, 6];

/* referring-domains line, drawn on a 0–6 month x axis */
const linePath = (data: number[], w: number, h: number) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  return data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - 6 - ((v - min) / (max - min)) * (h - 12);
      return `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
};

/**
 * The campaign, laid out month by month: every placement drops into the month
 * it ran, coloured by type, and the referring-domains line climbs underneath.
 * Shows the compounding (pickups and repeat editors) without a paragraph.
 */
const Proof = () => {
  const P = C.proof;
  const byMonth = MONTHS.map((m) => P.placements.filter((p) => p[0] === m));

  return (
    <section className="relative overflow-hidden bg-navy-dark py-24 lg:py-32">
      <DarkGlow className="-left-60 top-10 h-[480px] w-[700px] opacity-50" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <motion.div {...rise()}>
            <Eyebrow dark className="mb-4">
              {P.eyebrow}
            </Eyebrow>
            <H2 dark>
              {P.h2a}
              <br />
              <Soft dark>{P.h2b}</Soft>
            </H2>
          </motion.div>
          <motion.div {...rise(0.08)}>
            <p className="text-[13px] font-semibold text-white/75">
              {P.client}
            </p>
            <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-4">
              {P.facts.map((f) => (
                <div key={f.k} className="bg-navy-dark px-4 py-3.5">
                  <dt className="text-[11.5px] text-white/70">{f.k}</dt>
                  <dd className="mt-1 text-[22px] font-semibold tracking-[-0.03em] text-white">
                    {f.v}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>

        <motion.div
          className="rounded-3xl bg-white/[0.04] p-5 ring-1 ring-white/10 sm:p-8"
          {...rise(0.1)}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-[13px] font-semibold text-white">
              Placements, by the month they ran
            </p>
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {Object.keys(KIND_TINT).map((k) => (
                <li
                  key={k}
                  className="inline-flex items-center gap-1.5 text-[11.5px] text-white/75"
                >
                  <span className={`h-2.5 w-2.5 rounded-sm ${KIND_TINT[k]}`} />
                  {k}
                </li>
              ))}
            </ul>
          </div>

          {/* stacks */}
          <div className="mt-8 grid grid-cols-7 items-end gap-1.5 sm:gap-3">
            {byMonth.map((list, m) => (
              <div
                key={m}
                className="flex min-h-[150px] min-w-0 flex-col-reverse gap-1.5"
              >
                {list.length === 0 && (
                  <span className="text-center text-[11px] text-white/60">
                    Study launched
                  </span>
                )}
                {list.map((p, n) => (
                  <motion.span
                    key={`${p[1]}-${n}`}
                    title={`${p[1]} · ${p[2]} · DR ${p[3]}`}
                    className={`block min-w-0 truncate rounded-md px-1.5 py-1 text-[10.5px] font-semibold sm:px-2.5 sm:py-1.5 ${KIND_TINT[p[2]]}`}
                    initial={{ opacity: 0, y: -18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.4,
                      delay: 0.3 + m * 0.22 + n * 0.08,
                      ease,
                    }}
                  >
                    <span className="hidden lg:inline">{p[1]}</span>
                    <span className="lg:hidden">{p[3]}</span>
                  </motion.span>
                ))}
              </div>
            ))}
          </div>

          {/* referring domains line, same x axis */}
          <div className="mt-6 border-t border-white/10 pt-5">
            <div className="flex items-baseline justify-between">
              <p className="text-[12px] text-white/70">{P.seriesLabel}</p>
              <p className="text-[12px] text-white/70">
                <span className="text-[15px] font-semibold text-white">
                  {P.series[0]}
                </span>
                {" → "}
                <span className="text-[15px] font-semibold text-white">
                  {P.series[P.series.length - 1]}
                </span>
              </p>
            </div>
            <div className="mt-3 px-[7%]">
              <svg
                viewBox="0 0 600 90"
                preserveAspectRatio="none"
                className="h-24 w-full"
                aria-hidden="true"
              >
                <motion.path
                  d={linePath(P.series, 600, 90)}
                  fill="none"
                  stroke="rgb(var(--mint))"
                  strokeWidth={2.5}
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, delay: 0.4, ease }}
                />
              </svg>
            </div>
            <div className="mt-2 grid grid-cols-7 text-center">
              {MONTHS.map((m) => (
                <span key={m} className="text-[11px] text-white/60">
                  {m === 0 ? "Start" : `M${m}`}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <motion.p
            className="text-[17px] leading-relaxed text-white/80"
            {...rise()}
          >
            {P.takeaway}
          </motion.p>
          <motion.figure
            className="rounded-3xl bg-white/[0.06] p-6 ring-1 ring-white/10 sm:p-7"
            {...rise(0.08)}
          >
            <blockquote className="text-[18px] font-medium leading-snug tracking-[-0.01em] text-white">
              “{P.quote.text}”
            </blockquote>
            <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <span className="text-[13px] text-white/70">{P.quote.who}</span>
              <Link
                to={P.caseHref}
                className="group inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
              >
                Read the case study
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </figcaption>
          </motion.figure>
        </div>
        <SampleNote dark className="mt-8">
          Sample figures until client sign-off
        </SampleNote>
      </div>
    </section>
  );
};

export default Proof;
