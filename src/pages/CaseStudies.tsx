import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Minus } from "lucide-react";
import CountUp from "@/components/CountUp";
import { Seo } from "@/components/MotionKit";
import PageHero from "@/components/PageHero";
import PageLayout from "@/components/PageLayout";
import { CASE_STUDIES } from "@/lib/content";
import { asset } from "@/lib/booking";

/**
 * /case-studies — the archive.
 *
 * Identity: a numbered case-file index. Rules instead of cards, tabular
 * numbers, inline sparklines. Deliberately *not* the homepage's pastel-block
 * card grid (<Results />) — that section appears on the homepage only, so
 * landing here does not feel like scrolling the home page twice.
 *
 * The index now reads on ink rather than paper. PageHero closes with a dark
 * fade, so the file list absorbs it instead of fighting it, and the pastel
 * cover tiles and sparklines carry the page instead of sitting flat on white.
 *
 * Surface rhythm: stone (hero) → navy-dark → mark → mist → espresso → stone
 * → clay → navy-dark (CTABand). Six surfaces of this page's own, no two
 * adjacent alike, longest light run two, one amber ground.
 *
 * Register: the files report what happened, including the flat months. What
 * did not pass sourcing is a line inside the format list, not a boast.
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
      className={`text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[2.5rem] ${
        dark ? "text-white" : "text-navy-dark"
      }`}
    >
      {pre}{" "}
      <span className={dark ? "text-white/70" : "text-navy-dark/65"}>{em}</span>
    </h2>
  </motion.div>
);

const FIRST = CASE_STUDIES[0];

/* ------------------------------ sparkline ------------------------------ */

const Spark = ({
  series,
  className = "",
  stroke = "currentColor",
  dot,
}: {
  series: number[];
  className?: string;
  stroke?: string;
  /** end-point marker; defaults to the line colour */
  dot?: string;
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
        fill={dot ?? stroke}
      />
    </svg>
  );
};

/* ------------------------------ the index ------------------------------ */

const FileIndex = () => (
  <div className="bg-navy-dark py-20 lg:py-28">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.div
        className="mb-2 flex flex-wrap items-end justify-between gap-6 border-b border-white/25 pb-5"
        {...rise()}
      >
        <div>
          <h2 className="text-balance text-[13px] font-bold uppercase tracking-[0.16em] text-white">
            The index
          </h2>
          <p className="mt-2.5 max-w-xl text-[14px] leading-relaxed text-white/70">
            Three programmes, three industries. Every figure in a file traces
            back to the export or the placement it came from.
          </p>
        </div>
        <span className="text-[12px] font-semibold uppercase tracking-[0.12em] tabular-nums text-white/70">
          {String(CASE_STUDIES.length).padStart(2, "0")} files
        </span>
      </motion.div>

      <ol>
        {CASE_STUDIES.map((c, i) => (
          <motion.li
            key={c.slug}
            className="border-b border-white/15"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
          >
            <Link
              to={`/case-studies/${c.slug}`}
              className="group grid gap-6 py-9 lg:grid-cols-[auto_190px_1fr_auto] lg:items-center lg:gap-10 lg:py-11"
            >
              <span className="text-[2rem] font-semibold leading-none tabular-nums text-white/40 transition-colors duration-500 group-hover:text-white/70 lg:w-14 lg:text-[2.6rem]">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div
                className={`${c.bg} overflow-hidden rounded-2xl border border-white/10`}
              >
                <img
                  src={asset(c.cover)}
                  alt=""
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover mix-blend-luminosity opacity-90 transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>

              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
                  {c.industry}
                  {" · "}
                  {c.duration}
                </p>
                <h3 className="max-w-md text-[22px] font-semibold leading-[1.15] tracking-[-0.025em] text-white lg:text-[26px]">
                  {c.title}
                </h3>
                <p className="mt-2.5 max-w-lg text-[14px] leading-relaxed text-white/70">
                  {c.line}
                </p>
                <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                  {c.stats.map((s) => (
                    <div key={s[1]}>
                      <dt className="text-[15px] font-semibold tabular-nums text-white">
                        {s[0]}
                      </dt>
                      <dd className="text-[11.5px] uppercase tracking-[0.08em] text-white/70">
                        {s[1]}
                      </dd>
                    </div>
                  ))}
                </dl>
                <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-white">
                  Open the file
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>

              <div className="lg:w-40">
                <Spark
                  series={c.series}
                  className="h-10 w-full text-white/70"
                  dot="rgb(var(--mark))"
                />
                <p className="mt-2 text-[10.5px] leading-snug text-white/70">
                  {c.seriesLabel}
                </p>
              </div>
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
  { v: 212, prefix: "+", suffix: "%", label: "Largest organic-clicks lift" },
  { v: 96, suffix: "%", label: "Indexation rate, twelve months" },
  { custom: "19 days", label: "Median time to indexation" },
];

/** The page's one amber ground: the totals, and the methodology that produced
 *  them. Extra bottom padding leaves room for the card that overlaps it. */
const Ledger = () => (
  <div className="bg-white pb-36 pt-24 lg:pb-48 lg:pt-32">
    <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
      <div>
        <Head
          eyebrow="Across the three files"
          pre="Three Files."
          em="One Set of Totals."
        />
        <motion.p
          className="mt-5 max-w-sm text-[15px] leading-relaxed text-navy-dark/75"
          {...rise(0.05)}
        >
          Published work only. Where a figure comes from one engagement rather
          than all three, the file it came from says so.
        </motion.p>

        <motion.div
          className="mt-8 max-w-sm rounded-2xl border border-navy-dark/20 bg-white p-5 shadow-lift"
          {...rise(0.1)}
        >
          <p className="mb-2 text-[10.5px] font-bold uppercase tracking-[0.14em] text-navy-dark/70">
            The same four steps each time
          </p>
          <p className="text-[13.5px] leading-relaxed text-navy-dark/80">
            Every programme here ran on our research: map the authority gap,
            pick the pages closest to moving, earn the placements that reach
            them, then measure the position change rather than the activity.
          </p>
        </motion.div>
      </div>

      <dl>
        {LEDGER.map((e, i) => (
          <motion.div
            key={e.label}
            className={`flex items-baseline justify-between gap-6 py-5 ${
              i ? "border-t border-navy-dark/20" : ""
            }`}
            initial={{ opacity: 0, x: 14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
          >
            <dt className="text-[14.5px] leading-snug text-navy-dark/75">
              {e.label}
            </dt>
            <dd className="shrink-0 text-[2rem] font-semibold leading-none tracking-[-0.03em] text-navy-dark tabular-nums lg:text-[2.4rem]">
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

const ANATOMY: [string, string, string][] = [
  ["01", "Situation", "Where the site stood"],
  ["02", "What blocked it", "The profile we inherited"],
  ["03", "Strategy", "Target pages, in order"],
  ["04", "The work", "Placements by type"],
  ["05", "Indexation", "What Google picked up"],
  ["06", "Timeline", "Month by month"],
];

const CONTENTS = [
  {
    t: "The growth chart",
    d: "Organic clicks month by month from the day we started, pulled from the client's Search Console rather than a tool estimate.",
  },
  {
    t: "Every placement",
    d: "What was placed, by type, with the pages each link points at. Publication names are masked where they are still live client assets, and the domains that did not pass sourcing are listed too.",
  },
  {
    t: "The indexation record",
    d: "Which links Google indexed, how long each took, and what we did about the ones that stalled.",
  },
  {
    t: "The target-page map",
    d: "Which pages received authority first, which anchors they took, and why the budget concentrated on two pages instead of eight.",
  },
  {
    t: "The month-by-month timeline",
    d: "What happened when, including the stretch in month three where nothing moved and we had to explain why.",
  },
];

const Contents = () => (
  <div className="bg-mist pb-24 lg:pb-32">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      {/* overlaps the amber band above */}
      <motion.div
        className="relative z-10 -mt-24 grid gap-10 rounded-[1.6rem] bg-white p-7 shadow-deep lg:-mt-32 lg:grid-cols-[1fr_0.85fr] lg:gap-14 lg:p-10"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: EASE }}
      >
        <div>
          <p className="mb-5 text-[10.5px] font-bold uppercase tracking-[0.14em] text-navy-dark/70">
            Inside a file
          </p>
          <ul>
            {ANATOMY.map(([n, t, d], i) => (
              <motion.li
                key={n}
                className={`flex items-baseline justify-between gap-6 py-3 ${
                  i ? "border-t border-line" : ""
                }`}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.05 }}
              >
                <span className="flex items-baseline gap-4">
                  <span className="text-[12px] font-bold tabular-nums text-navy-dark/65">
                    {n}
                  </span>
                  <span className="text-[15px] font-semibold text-navy-dark">
                    {t}
                  </span>
                </span>
                <span className="hidden shrink-0 text-right text-[12px] text-navy-dark/70 sm:block">
                  {d}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* pastel feature panel behind the figure */}
        <figure className="self-center rounded-2xl bg-white p-6 lg:p-7">
          <figcaption className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-navy-dark/70">
            Figure one · the growth chart
          </figcaption>
          <Spark
            series={FIRST.series}
            className="mt-5 h-20 w-full text-navy-dark"
          />
          <p className="mt-3 text-[11.5px] text-navy-dark/75">
            {FIRST.seriesLabel}
          </p>
          <dl className="mt-5 flex gap-8 border-t border-navy-dark/15 pt-4">
            <div>
              <dt className="text-[1.45rem] font-semibold leading-none tabular-nums text-navy-dark">
                {FIRST.headline}
              </dt>
              <dd className="mt-1.5 text-[11.5px] text-navy-dark/75">
                {FIRST.metric}
              </dd>
            </div>
            <div>
              <dt className="text-[1.45rem] font-semibold leading-none tabular-nums text-navy-dark">
                {FIRST.stats[0][0]}
              </dt>
              <dd className="mt-1.5 text-[11.5px] text-navy-dark/75">
                {FIRST.stats[0][1]}
              </dd>
            </div>
          </dl>
        </figure>
      </motion.div>

      <div className="mt-20 grid gap-12 lg:mt-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Head
          eyebrow="The format"
          pre="Five Things in Every File."
          em="Including the Flat Months."
          className="lg:sticky lg:top-28 lg:self-start"
        />

        <dl>
          {CONTENTS.map((c, i) => (
            <motion.div
              key={c.t}
              className="grid gap-2 border-t border-line py-6 sm:grid-cols-[auto_1fr] sm:gap-6"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <dt className="flex items-baseline gap-4 sm:w-56">
                <span className="text-[12px] font-bold tabular-nums text-navy-dark/65">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[16px] font-semibold leading-snug tracking-[-0.02em] text-navy-dark">
                  {c.t}
                </span>
              </dt>
              <dd className="text-[14.5px] leading-relaxed text-navy-dark/75 sm:pl-2">
                {c.d}
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </div>
  </div>
);

/* ----------------------------- client voice ----------------------------- */

const VOICE_FACTS = [
  { k: "Programme length", v: "9 months" },
  { k: "Pages into the top five", v: "3" },
  { k: "Reporting cadence", v: "Monthly" },
];

const Voice = () => (
  <div className="bg-navy-dark py-20 lg:py-24">
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <motion.figure className="text-center" {...rise()}>
        <blockquote className="text-[1.3rem] leading-[1.45] tracking-[-0.02em] text-white sm:text-[1.6rem]">
          {
            "“The case file format sold us before the call did. Charts, placements, indexation — everything an SEO lead needs to defend the budget internally.”"
          }
        </blockquote>
        <figcaption className="mt-5 text-[12.5px] font-semibold uppercase tracking-[0.12em] text-white/70">
          {"Priya Raghunathan · VP Marketing, Ocuco"}
        </figcaption>
      </motion.figure>

      <motion.dl
        className="mx-auto mt-10 grid max-w-2xl divide-y divide-white/15 rounded-2xl border border-white/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
        {...rise(0.1)}
      >
        {VOICE_FACTS.map((f) => (
          <div key={f.k} className="px-6 py-5 text-center">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/70">
              {f.k}
            </dt>
            <dd className="mt-2 text-[1.35rem] font-semibold leading-none tabular-nums text-white">
              {f.v}
            </dd>
          </div>
        ))}
      </motion.dl>
    </div>
  </div>
);

/* ----------------------------- how we count ----------------------------- */

const OUTPUT = [
  "Total links acquired",
  "Domain Rating on its own",
  "Keyword counts inside the top 100",
  "Impressions",
];
const MOVEMENT = [
  "Organic clicks on the pages we pointed authority at",
  "Position change on the keyword set agreed before outreach started",
  "Indexation rate, because an unindexed link is not a link",
  "Where the brand gets named in AI answers, on a fixed prompt set",
];

const HowWeCount = () => (
  <div className="bg-white py-24 lg:py-32">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <Head
            eyebrow="How we count"
            pre="Two Sets of Numbers."
            em="These Files Lead With Movement."
          />
          <motion.p
            className="mt-5 text-[15.5px] leading-[1.65] text-navy-dark/75"
            {...rise(0.05)}
          >
            Output answers a useful question: what was done this month. It is
            not the same question as whether the pages moved, and a figure that
            only rises cannot answer the second one.
          </motion.p>
          <motion.p
            className="mt-5 text-[15.5px] leading-[1.65] text-navy-dark/75"
            {...rise(0.1)}
          >
            So every chart in these files runs on four measures that can fall as
            well as rise, fixed with the client before any outreach begins.
          </motion.p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {[
            {
              head: "Output metrics",
              note: "Worth tracking. They move for reasons a revenue line does not follow.",
              items: OUTPUT,
              good: false,
            },
            {
              head: "Movement metrics",
              note: "Slower to move, and the only set that shows whether the work paid for itself.",
              items: MOVEMENT,
              good: true,
            },
          ].map((col, ci) => (
            <motion.div
              key={col.head}
              className={`rounded-3xl bg-white p-7 ${
                col.good
                  ? "border border-navy-dark/15 shadow-deep"
                  : "border border-line shadow-lift"
              }`}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: ci * 0.1, ease: EASE }}
            >
              <h3 className="mb-5 text-[12px] font-bold uppercase tracking-[0.14em] text-navy-dark">
                {col.head}
              </h3>
              <ul className="space-y-4">
                {col.items.map((t) => (
                  <li key={t} className="flex gap-3">
                    {col.good ? (
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-verified" />
                    ) : (
                      <Minus className="mt-0.5 h-4 w-4 shrink-0 text-navy-dark/50" />
                    )}
                    <span className="text-[13.5px] leading-relaxed text-navy-dark/80">
                      {t}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-line pt-4 text-[12.5px] leading-relaxed text-navy-dark/70">
                {col.note}
              </p>
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
    fig: "2",
    figLabel: "pages, not eight",
    k: "Authority went to a short list of pages",
    v: "In all three programmes the budget concentrated on pages already sitting in positions 5–20. On the one account where we spread the same placements across the whole site, the positions stayed where they were.",
  },
  {
    fig: "2–6",
    figLabel: "weeks to index",
    k: "Nothing moved in month one",
    v: "Indexation alone takes two to six weeks per placement, which is why every chart in the index is flat at the start. Movement on pages already in positions 5–20 showed up between months two and four.",
  },
  {
    fig: "3/3",
    figLabel: "files, same finding",
    k: "Relevance beat Domain Rating",
    v: "The placements that shifted positions were not always the highest-DR ones. In every file, the clearest movement followed links from sites already ranking for the same subject.",
  },
];

const Pattern = () => (
  <div className="bg-mist py-24 lg:py-32">
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <Head
        eyebrow="What the three have in common"
        pre="Different Industries."
        em="The Same Three Lessons."
        className="mb-12 max-w-2xl"
      />

      <dl>
        {PATTERN.map((p, i) => (
          <motion.div
            key={p.k}
            className="grid gap-4 border-t border-navy-dark/20 py-8 lg:grid-cols-[0.45fr_1.55fr] lg:gap-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <div>
              <p className="text-[2.6rem] font-semibold leading-none tracking-[-0.04em] text-navy-dark tabular-nums lg:text-[3rem]">
                {p.fig}
              </p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-navy-dark/70">
                {p.figLabel}
              </p>
            </div>
            <div>
              <dt className="text-[17px] font-semibold leading-snug tracking-[-0.02em] text-navy-dark">
                {p.k}
              </dt>
              <dd className="mt-2.5 text-[14.5px] leading-relaxed text-navy-dark/75">
                {p.v}
              </dd>
            </div>
          </motion.div>
        ))}
      </dl>

      <motion.div
        className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-navy-dark/20 pt-10"
        {...rise(0.1)}
      >
        <p className="max-w-md text-[16px] font-semibold leading-snug tracking-[-0.01em] text-navy-dark">
          Three files are the long version. The short one is that the research
          decides where the authority goes.
        </p>
        <Link
          to={`/case-studies/${FIRST.slug}`}
          className="group inline-flex items-center gap-2 rounded-xl border border-navy-dark/25 px-7 py-3.5 text-[14px] font-semibold text-navy-dark transition-colors duration-300 hover:border-navy-dark"
        >
          Open the first file
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </motion.div>
    </div>
  </div>
);

/* --------------------------------- page --------------------------------- */

const CaseStudies = () => (
  <PageLayout>
    <Seo
      title="Case Studies"
      description="Three published case files: the growth chart from the client's own Search Console, every placement with its target page, the indexation record, and the months where nothing moved."
    />
    <PageHero
      compact={true}
      eyebrow="Case files"
      title={
        <>
          {"Three engagements. "}
          <span className="text-navy-dark/65">Published in full</span>.
        </>
      }
      sub="Each file carries the growth chart from the client's own Search Console, what was placed and where it points, the indexation record, and the months where nothing moved."
    />
    <FileIndex />
    <Ledger />
    <Contents />
    <Voice />
    <HowWeCount />
    <Pattern />
  </PageLayout>
);

export default CaseStudies;
