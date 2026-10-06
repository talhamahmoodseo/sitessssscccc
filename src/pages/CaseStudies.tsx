import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, X } from "lucide-react";
import CountUp from "@/components/CountUp";
import { Seo } from "@/components/MotionKit";
import PageHero from "@/components/PageHero";
import PageLayout from "@/components/PageLayout";
import { CASE_STUDIES } from "@/lib/content";

/**
 * /case-studies — the archive.
 *
 * Identity: a numbered case-file index. Rules instead of cards, tabular
 * numbers, inline sparklines. Deliberately *not* the homepage's pastel-block
 * card grid (<Results />) — that section now appears on the homepage only, so
 * landing here does not feel like scrolling the home page twice.
 */

/* ------------------------------ sparkline ------------------------------ */

const Spark = ({
  series,
  className = "",
  stroke = "currentColor",
}: {
  series: number[];
  className?: string;
  stroke?: string;
}) => {
  const W = 120;
  const H = 34;
  const lo = Math.min(...series);
  const hi = Math.max(...series);
  const span = hi - lo || 1;
  const pts = series.map((v, i) => [
    (i / (series.length - 1)) * W,
    H - ((v - lo) / span) * (H - 4) - 2,
  ]);
  const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0]},${p[1]}`).join(" ");

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <motion.path
        d={d}
        stroke={stroke}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: "easeInOut" }}
      />
      <circle
        cx={pts[pts.length - 1][0]}
        cy={pts[pts.length - 1][1]}
        r="2.6"
        fill={stroke}
      />
    </svg>
  );
};

/* ------------------------------ the index ------------------------------ */

const FileIndex = () => (
  <div className="bg-white py-24 lg:py-32">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mb-4 flex items-baseline justify-between border-b border-navy-dark pb-4">
        <h2 className="text-[13px] font-bold uppercase tracking-[0.16em] text-navy-dark">
          The index
        </h2>
        <span className="text-[12px] font-semibold tabular-nums text-navy-dark/70">
          {CASE_STUDIES.length} files
        </span>
      </div>

      <ol>
        {CASE_STUDIES.map((c, i) => (
          <motion.li
            key={c.slug}
            className="border-b border-line"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
          >
            <Link
              to={`/case-studies/${c.slug}`}
              className="group grid gap-6 py-9 lg:grid-cols-[auto_1fr_auto_auto] lg:items-center lg:gap-10 lg:py-10"
            >
              <span className="text-[13px] font-bold tabular-nums text-navy-dark/40 lg:w-10">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-dark/70">
                  {c.industry}
                  {" · "}
                  {c.duration}
                </p>
                <h3 className="max-w-md text-[22px] font-semibold leading-[1.15] tracking-[-0.025em] text-navy-dark lg:text-[26px]">
                  {c.title}
                </h3>
                <p className="mt-2.5 max-w-lg text-[14px] leading-relaxed text-navy-dark/75">
                  {c.line}
                </p>
                <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                  {c.stats.map((s) => (
                    <div key={s[1]}>
                      <dt className="text-[15px] font-semibold tabular-nums text-navy-dark">
                        {s[0]}
                      </dt>
                      <dd className="text-[11.5px] text-navy-dark/70">
                        {s[1]}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="lg:w-40">
                <Spark
                  series={c.series}
                  className="h-10 w-full text-navy-dark/70"
                />
                <p className="mt-2 text-[10.5px] leading-snug text-navy-dark/70">
                  {c.seriesLabel}
                </p>
              </div>

              <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-navy-dark">
                Open the file
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </motion.li>
        ))}
      </ol>
    </div>
  </div>
);

/* --------------------------- aggregate ledger --------------------------- */

const LEDGER = [
  { v: 1400, suffix: "+", label: "Links and mentions placed" },
  { custom: "DR 28 → 65", label: "Authority range moved" },
  { v: 212, prefix: "+", suffix: "%", label: "Best organic-clicks lift" },
  { v: 96, suffix: "%", label: "Indexation rate, 12 months" },
  { v: 31, label: "Domains rejected on one engagement" },
];

const Ledger = () => (
  <div className="bg-navy-dark py-24 lg:py-32">
    <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
          Across every engagement
        </p>
        <h2 className="text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-white">
          The numbers we will
          <br />
          <span className="text-white/70">put in writing</span>
        </h2>
        <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/70">
          Three published files, and the totals behind them. Every figure here
          traces back to a placement list you can open.
        </p>
      </motion.div>

      <dl>
        {LEDGER.map((e, i) => (
          <motion.div
            key={e.label}
            className={`flex items-baseline justify-between gap-6 py-5 ${
              i ? "border-t border-white/10" : ""
            }`}
            initial={{ opacity: 0, x: 14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
          >
            <dt className="text-[14.5px] leading-snug text-white/70">
              {e.label}
            </dt>
            <dd className="shrink-0 text-[1.9rem] font-semibold leading-none tracking-[-0.03em] text-white tabular-nums lg:text-[2.2rem]">
              {"custom" in e && e.custom ? (
                e.custom
              ) : (
                <CountUp to={e.v!} prefix={e.prefix} suffix={e.suffix} />
              )}
            </dd>
          </motion.div>
        ))}
      </dl>
    </div>
  </div>
);

/* ---------------------------- what's inside ---------------------------- */

const CONTENTS = [
  {
    t: "The growth chart",
    d: "Organic clicks month by month from the day we started, pulled from their Search Console rather than a tool estimate.",
  },
  {
    t: "Every placement",
    d: "The full list with Domain Rating, placement type and target page. Publication names are masked because they are still live client assets.",
  },
  {
    t: "The indexation report",
    d: "Which links Google indexed, how long each took, and what we did about the ones that stalled.",
  },
  {
    t: "The domains we rejected",
    d: "On one engagement we turned down 31 sites. The reasons are in the file, because what we refused is as telling as what we placed.",
  },
  {
    t: "The month-by-month timeline",
    d: "What happened when, including the stretch in month three where nothing moved and we had to explain why.",
  },
];

const Contents = () => (
  <div className="bg-linen py-24 lg:py-32">
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <motion.div
        className="mb-12 max-w-2xl"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/70">
          The format
        </p>
        <h2 className="text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-navy-dark">
          Five things in every file,
          <br />
          <span className="text-navy-dark/65">including the bad months</span>
        </h2>
      </motion.div>

      <div className="grid gap-x-12 gap-y-9 sm:grid-cols-2">
        {CONTENTS.map((c, i) => (
          <motion.div
            key={c.t}
            className={`${i === 4 ? "sm:col-span-2 sm:max-w-xl" : ""}`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy-dark text-[11px] font-bold text-white tabular-nums">
                {i + 1}
              </span>
              <h3 className="text-[17px] font-semibold text-navy-dark">
                {c.t}
              </h3>
            </div>
            <p className="text-[14px] leading-relaxed text-navy-dark/75">
              {c.d}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

/* ----------------------------- how we count ----------------------------- */

const DONT = [
  "Total backlinks acquired, with no note on how many Google indexed.",
  "Domain Rating as the headline result, when DR moves without revenue moving.",
  "Keyword counts in the top 100 — a number that rises on terms nobody searches.",
  "Impressions, which grow whenever a page is shown and ignored.",
];
const DO = [
  "Organic clicks on the specific pages we pointed authority at.",
  "Position change on the keyword set agreed before any outreach started.",
  "Indexation rate, because an unindexed link is not a link.",
  "Where the brand gets named in AI answers, measured on a fixed prompt set.",
];

const HowWeCount = () => (
  <div className="bg-white py-24 lg:py-32">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/70">
            How we count
          </p>
          <h2 className="text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-navy-dark">
            Most reports are
            <br />
            <span className="text-navy-dark/65">built to look good</span>
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-navy-dark/75">
            It is easy to produce a chart that climbs. Pick a metric that only
            goes up, start the axis late, and every month is a win. The files
            below use the four measures that can go down.
          </p>

          <figure className="mt-8 border-t border-line pt-6">
            <blockquote className="text-[15.5px] leading-[1.5] text-navy-dark">
              {
                "“The case file format sold us before the call did. Charts, placements, indexation — everything an SEO lead needs to defend the budget internally.”"
              }
            </blockquote>
            <figcaption className="mt-3 text-[12.5px] font-semibold text-navy-dark/70">
              {"Priya Raghunathan · VP Marketing, Ocuco"}
            </figcaption>
          </figure>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2">
          {[
            { head: "What we leave out", items: DONT, bad: true },
            { head: "What we report", items: DO, bad: false },
          ].map((col, ci) => (
            <motion.div
              key={col.head}
              className={`rounded-3xl border p-7 ${
                col.bad ? "border-line bg-mist" : "border-navy-dark/15 bg-linen"
              }`}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: ci * 0.1 }}
            >
              <h3 className="mb-5 text-[12px] font-bold uppercase tracking-[0.14em] text-navy-dark">
                {col.head}
              </h3>
              <ul className="space-y-4">
                {col.items.map((t) => (
                  <li key={t} className="flex gap-3">
                    {col.bad ? (
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-gap" />
                    ) : (
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-navy-dark" />
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
  </div>
);

/* ------------------------------ the pattern ------------------------------ */

const PATTERN = [
  {
    k: "Authority went to two pages, not eight",
    v: "In all three engagements the budget concentrated on the pages already sitting in positions 5–20. Spreading the same links across a whole site moved nothing in the one account where we tried it.",
  },
  {
    k: "Nothing moved in month one",
    v: "Indexation alone took two to six weeks per placement. Every chart in the index is flat at the start, and any agency showing you a month-one spike is showing you something else.",
  },
  {
    k: "The rejections did the work",
    v: "Across the three files we reviewed 94 domains and placed on 41. The engagements that went best are the ones where we said no the most.",
  },
];

const Pattern = () => (
  <div className="bg-mist py-24 lg:py-32">
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <motion.div
        className="mb-12 max-w-2xl"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/70">
          What the three have in common
        </p>
        <h2 className="text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-navy-dark">
          Different industries,
          <br />
          <span className="text-navy-dark/65">the same three lessons</span>
        </h2>
      </motion.div>

      <dl className="space-y-0">
        {PATTERN.map((p, i) => (
          <motion.div
            key={p.k}
            className="grid gap-3 border-t border-line py-7 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <dt className="text-[17px] font-semibold leading-snug tracking-[-0.02em] text-navy-dark">
              {p.k}
            </dt>
            <dd className="text-[14.5px] leading-relaxed text-navy-dark/75">
              {p.v}
            </dd>
          </motion.div>
        ))}
      </dl>
    </div>
  </div>
);

/* --------------------------------- page --------------------------------- */

const CaseStudies = () => (
  <PageLayout>
    <Seo
      title="Case Studies"
      description="Three published case files: growth charts, every placement, the indexation report, and the domains we rejected."
    />
    <PageHero
      compact={true}
      eyebrow="Results"
      title={
        <>
          {"Proof, "}
          <span className="text-navy-dark/65">not promises</span>.
        </>
      }
      sub="Three engagements, published in full. Each file carries the growth chart, every placement with its Domain Rating, the indexation report, and the domains we turned down on the client's behalf."
    />
    <FileIndex />
    <Ledger />
    <Contents />
    <HowWeCount />
    <Pattern />
  </PageLayout>
);

export default CaseStudies;
