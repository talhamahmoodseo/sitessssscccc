import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, Minus } from "lucide-react";
import { FigCategoryClimb } from "@/components/LineArt";
import { AccentDot, type Accent, Wordmark } from "@/components/brand";
import { openBooking } from "@/lib/booking";

/**
 * Services hub depth sections.
 *
 * The hub's job is routing, not selling — the four service pages do that. So
 * it carries the standards that hold on all four, the decision matrix, the
 * pairings most engagements actually run, and the default order.
 *
 * The matrix is this page's signature visual; no other page uses a grid read
 * in two directions. It is navigable (every column header is a route) and it
 * reflows into stacked decision cards on small screens rather than becoming a
 * horizontal scroll.
 *
 * Surfaces here, in page order: white → navy-dark → mark (the page's single
 * amber moment) → clay.
 */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.55, delay, ease: EASE },
});

/* ----------------------------- shared standard ----------------------------- */

const STANDARD = [
  {
    t: "Research comes before outreach",
    d: "Every engagement opens by mapping which of your pages sit closest to moving and which publications carry weight in your category. The plan follows the research.",
  },
  {
    t: "Relevance decides scope",
    d: "Placements are earned on publications with real readership on your subject. Scope follows what a page needs to move, measured against the keyword set agreed at the start.",
  },
  {
    t: "Indexation is the definition of done",
    d: "A placement counts once Google has indexed it and recorded it against the target page. Anything still unindexed at 60 days is replaced at no charge.",
  },
  {
    t: "Reporting you can forward",
    d: "One live document per engagement: every placement, its metrics, the page it supports and its indexation status — ready to send to a client or a board without editing.",
  },
];

const FACTS = [
  { v: "96%", k: "of placements indexed, last 12 months" },
  { v: "60", k: "day replacement window on any that are not" },
  { v: "40+", k: "brands served across the four services" },
];

export const SharedStandard = () => (
  <section className="bg-white py-24 lg:py-32">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.div className="max-w-2xl" {...rise()}>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/70">
          True of all four
        </p>
        <h2 className="text-balance text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-navy-dark sm:text-[2.5rem]">
          Four Different Services.
          <span className="text-navy-dark/65">The Same Four Rules.</span>
        </h2>
        <p className="mt-5 text-[15.5px] leading-relaxed text-navy-dark/75">
          Whichever one you start with, the engagement is run the same way. The
          four below are the part of the work that does not change.
        </p>
      </motion.div>

      <div className="mt-14 grid border-t border-line sm:grid-cols-2">
        {STANDARD.map((s, i) => (
          <motion.div
            key={s.t}
            className={`flex gap-5 border-b border-line py-9 sm:gap-7 sm:py-10 ${
              i % 2 === 0 ? "sm:border-r sm:pr-10" : "sm:pl-10"
            }`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
          >
            <span className="shrink-0 text-[2.4rem] font-semibold leading-[0.85] tracking-[-0.04em] tabular-nums text-navy-dark/60 sm:text-[3rem]">
              {i + 1}
            </span>
            <div>
              <h3 className="mb-2 text-[17px] font-semibold leading-snug tracking-[-0.015em] text-navy-dark">
                {s.t}
              </h3>
              <p className="text-[14px] leading-relaxed text-navy-dark/75">
                {s.d}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-14 grid items-center gap-10 rounded-3xl border border-line bg-butter/35 p-8 lg:grid-cols-[1.5fr_1fr] lg:p-10"
        {...rise(0.05)}
      >
        <dl className="grid gap-7 sm:grid-cols-3">
          {FACTS.map((f, i) => (
            <div
              key={f.k}
              className={
                i > 0 ? "sm:border-l sm:border-navy-dark/15 sm:pl-6" : ""
              }
            >
              <dt className="text-[1.9rem] font-semibold leading-none tracking-[-0.03em] tabular-nums text-navy-dark">
                {f.v}
              </dt>
              <dd className="mt-2 text-[12.5px] leading-snug text-navy-dark/80">
                {f.k}
              </dd>
            </div>
          ))}
        </dl>
        <div className="lg:border-l lg:border-navy-dark/15 lg:pl-10">
          <p className="mb-3 text-[10.5px] font-bold uppercase tracking-[0.14em] text-navy-dark/80">
            Recent programmes
          </p>
          <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1.5 text-[16.5px] text-navy-dark">
            {["CapCut", "Ocuco", "Khaleej Times"].map((n) => (
              <Wordmark key={n} name={n} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

/* ------------------------------- the matrix ------------------------------- */

const COLS: { label: string; slug: string; accent: Accent }[] = [
  { label: "Link Building", slug: "link-building", accent: "butter" },
  { label: "Digital PR", slug: "digital-pr", accent: "mint" },
  { label: "Brand Mentions", slug: "brand-mentions", accent: "lilac" },
  { label: "Expert Quotes", slug: "haro-links", accent: "blush" },
];

/** 2 = where we would start, 1 = useful alongside, 0 = not the first move. */
const ROWS: { s: string; note: string; v: number[] }[] = [
  {
    s: "Pages ranking 5–20 that will not move",
    note: "Authority is the missing input. The page is already close enough that references are what decide it.",
    v: [2, 1, 0, 1],
  },
  {
    s: "Competitors get named in AI answers, you do not",
    note: "Engines assemble answers from a narrow set of sources. You need to be described on the ones they already read.",
    v: [1, 1, 2, 1],
  },
  {
    s: "A new brand nobody has written about yet",
    note: "There is no footprint to build on, so the first job is being covered at all.",
    v: [1, 2, 1, 2],
  },
  {
    s: "Credibility needed before a raise or a sale",
    note: "Named coverage and attributed quotes are the proof a buyer or an investor can check for themselves.",
    v: [0, 2, 1, 2],
  },
  {
    s: "Entering a market where you are unknown",
    note: "Regional publications, regional relationships, longer lead times and far less competition for them.",
    v: [2, 2, 1, 0],
  },
  {
    s: "An agency that needs fulfilment under its own brand",
    note: "White-label across all four, with reporting you can forward without editing.",
    v: [2, 1, 1, 1],
  },
];

const Cell = ({ v }: { v: number }) => {
  if (v === 2)
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.08em] text-navy-dark shadow-soft">
        <Check className="h-3 w-3" aria-hidden="true" />
        Start
      </span>
    );
  if (v === 1)
    return (
      <span className="text-[11.5px] font-semibold text-white/75">
        Alongside
      </span>
    );
  return (
    <>
      <Minus className="mx-auto h-3.5 w-3.5 text-white/50" aria-hidden="true" />
      <span className="sr-only">Not the first move</span>
    </>
  );
};

const CELL_FILL: Record<Accent, string> = {
  butter: "bg-butter",
  mint: "bg-mint",
  lilac: "bg-lilac",
  blush: "bg-blush",
  sky: "bg-sky",
};

export const Matrix = () => (
  <section id="choose" className="scroll-mt-24 bg-mist py-24 lg:py-32">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.div className="max-w-2xl" {...rise()}>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/70">
          Which one do you need
        </p>
        <h2 className="text-balance text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-navy-dark sm:text-[2.5rem]">
          Find your situation.{" "}
          <span className="text-navy-dark/65">Read across.</span>
        </h2>
        <p className="mt-5 text-[15.5px] leading-relaxed text-navy-dark/75">
          Six situations we are asked about most. The marked column is where we
          would put the first month of work; the rest usually come in behind it.
        </p>
      </motion.div>

      {/* legend — the four services, each with its own accent, each a link */}
      <motion.div
        className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3"
        {...rise(0.05)}
      >
        {COLS.map((c) => (
          <Link
            key={c.slug}
            to={`/services/${c.slug}`}
            className="group inline-flex items-center gap-2.5 text-[13.5px] font-semibold text-navy-dark"
          >
            <AccentDot accent={c.accent} />
            {c.label}
            <ArrowUpRight className="h-3.5 w-3.5 text-navy-dark/40 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        ))}
      </motion.div>

      {/* one card per situation; the marked service carries the colour */}
      <div className="mt-8 space-y-3">
        {ROWS.map((r, i) => (
          <motion.div
            key={r.s}
            className="grid gap-5 rounded-[22px] border border-line bg-white p-6 shadow-soft lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-10 lg:p-7"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
          >
            <span className="text-[1.6rem] font-semibold leading-none tabular-nums text-navy-dark/25 lg:w-12">
              {String(i + 1).padStart(2, "0")}
            </span>

            <div>
              <h3 className="text-[17px] font-semibold leading-snug tracking-[-0.015em] text-navy-dark">
                {r.s}
              </h3>
              <p className="mt-1.5 max-w-xl text-[13.5px] leading-relaxed text-navy-dark/70">
                {r.note}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 lg:justify-end">
              {COLS.map((c, j) =>
                r.v[j] === 2 ? (
                  <Link
                    key={c.slug}
                    to={`/services/${c.slug}`}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[11.5px] font-bold text-navy-dark transition-transform duration-300 hover:-translate-y-0.5 ${CELL_FILL[c.accent]}`}
                  >
                    <Check className="h-3 w-3" aria-hidden="true" />
                    {c.label}
                  </Link>
                ) : null,
              )}
              {COLS.map((c, j) =>
                r.v[j] === 1 ? (
                  <Link
                    key={c.slug}
                    to={`/services/${c.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-2 text-[11.5px] font-semibold text-navy-dark/70 transition-colors duration-300 hover:border-navy-dark/30 hover:text-navy-dark"
                  >
                    <AccentDot accent={c.accent} className="h-1.5 w-1.5" />
                    {c.label}
                  </Link>
                ) : null,
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12.5px] text-navy-dark/70"
        {...rise(0.1)}
      >
        <span className="inline-flex items-center gap-2">
          <span className="inline-flex h-4 w-7 items-center justify-center rounded-full bg-butter" />
          Where we would start
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-flex h-4 w-7 items-center justify-center rounded-full border border-line" />
          Usually comes in behind it
        </span>
      </motion.p>
    </div>
  </section>
);

const PAIRS: {
  share: string;
  t: string;
  d: string;
  routes: { label: string; slug: string }[];
}[] = [
  {
    share: "45%",
    t: "Link Building + Digital PR",
    d: "When the commercial pages and the brand both need to move. PR earns the references other publications notice; link building points that authority at the pages that convert.",
    routes: [
      { label: "Link Building", slug: "link-building" },
      { label: "Digital PR", slug: "digital-pr" },
    ],
  },
  {
    share: "25%",
    t: "Link Building + Brand Mentions",
    d: "When rankings and AI answers matter equally. One research pass feeds both, and where the editorial allows it a single placement carries the link Google counts and the sentence a model repeats.",
    routes: [
      { label: "Link Building", slug: "link-building" },
      { label: "Brand Mentions", slug: "brand-mentions" },
    ],
  },
  {
    share: "15%",
    t: "Digital PR + Expert Quotes",
    d: "When credibility has a deadline. Features carry the story; attributed quotes keep you in journalists' copy between them. Both produce something a buyer can check.",
    routes: [
      { label: "Digital PR", slug: "digital-pr" },
      { label: "Expert Quotes", slug: "haro-links" },
    ],
  },
];

export const Pairings = () => (
  <section className="bg-white py-24 lg:py-28">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.div className="max-w-2xl" {...rise()}>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/80">
          How they combine
        </p>
        <h2 className="text-balance text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-navy-dark sm:text-[2.5rem]">
          Most Engagements Run Two.
          <span className="text-navy-dark/70">Very Few Run Four.</span>
        </h2>
        <p className="mt-5 text-[15.5px] leading-relaxed text-navy-dark/80">
          Three pairings cover most of what we run. Each shares one research
          pass, one plan and one report, so the second service asks far less of
          your week than the first did.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {PAIRS.map((p, i) => (
          <motion.article
            key={p.t}
            className="flex flex-col rounded-2xl bg-white p-7 shadow-lift lg:p-8"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.09, ease: EASE }}
          >
            <p className="flex items-baseline gap-2.5">
              <span className="text-[2.1rem] font-semibold leading-none tracking-[-0.03em] tabular-nums text-navy-dark">
                {p.share}
              </span>
              <span className="text-[12px] leading-snug text-navy-dark/70">
                of current
                <br />
                engagements
              </span>
            </p>
            <h3 className="mt-6 text-[17.5px] font-semibold leading-snug tracking-[-0.02em] text-navy-dark">
              {p.t}
            </h3>
            <p className="mt-2.5 text-[14px] leading-relaxed text-navy-dark/75">
              {p.d}
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-5">
              {p.routes.map((r) => (
                <Link
                  key={r.slug}
                  to={`/services/${r.slug}`}
                  className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-navy-dark"
                >
                  {r.label}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                </Link>
              ))}
            </div>
          </motion.article>
        ))}
      </div>

      <motion.p
        className="mt-12 text-center text-[1.15rem] font-bold tracking-[-0.015em] text-navy-dark sm:text-[1.3rem]"
        {...rise(0.1)}
      >
        Start where the gap is biggest. The rest is sequencing.
      </motion.p>
    </div>
  </section>
);

/* ------------------------------- the sequence ------------------------------- */

const LADDER = [
  {
    t: "Authority first",
    d: "Editorial links are the base layer. Until the pages Google already likes carry the references to back them, everything built on top compounds slowly.",
  },
  {
    t: "Then the coverage it earns",
    d: "Digital PR and expert quotes turn that authority into something a buyer can see: named features, attributed commentary, a story with your name on it.",
  },
  {
    t: "Then the answers",
    d: "Brand mentions convert the same footprint into the third-party sources AI engines quote when someone asks who to hire.",
  },
];

const SHAPE = [
  { when: "Months 1–3", what: "Link building" },
  { when: "Months 3–6", what: "+ Digital PR" },
  { when: "Month 6 on", what: "+ Brand mentions" },
];

export const Sequence = () => (
  <section className="bg-mist py-24 lg:py-32">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-14 lg:grid-cols-[1fr_0.75fr] lg:gap-20">
        <div>
          <motion.div {...rise()}>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/75">
              If you are starting from nothing
            </p>
            <h2 className="text-balance text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-navy-dark sm:text-[2.5rem]">
              Authority First.
              <span className="text-navy-dark/65">Then What It Earns.</span>
            </h2>
          </motion.div>

          <div className="mt-10 border-t border-navy-dark/15">
            {LADDER.map((l, i) => (
              <motion.div
                key={l.t}
                className="flex gap-5 border-b border-navy-dark/15 py-7 sm:gap-7"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <span className="shrink-0 text-[2.4rem] font-semibold leading-[0.85] tracking-[-0.04em] tabular-nums text-navy-dark/60 sm:text-[2.9rem]">
                  {i + 1}
                </span>
                <div>
                  <h3 className="mb-2 text-[17px] font-semibold leading-snug tracking-[-0.015em] text-navy-dark">
                    {l.t}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-navy-dark/80">
                    {l.d}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="self-start rounded-3xl border border-line bg-mint/40 p-8"
          {...rise(0.08)}
        >
          <p className="mb-6 text-[10.5px] font-bold uppercase tracking-[0.14em] text-navy-dark/80">
            A typical nine months
          </p>
          <ol className="space-y-3">
            {SHAPE.map((s, i) => (
              <li key={s.when}>
                <div className="rounded-xl bg-white px-5 py-4 shadow-soft">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-navy-dark/70">
                    {s.when}
                  </p>
                  <p className="mt-1 text-[14.5px] font-bold text-navy-dark">
                    {s.what}
                  </p>
                </div>
                {i < SHAPE.length - 1 && (
                  <ArrowRight
                    className="mx-auto mt-3 h-4 w-4 rotate-90 text-navy-dark/60"
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ol>
          <FigCategoryClimb className="mx-auto mt-8 h-auto w-20 text-navy-dark/70" />
        </motion.div>
      </div>

      <motion.div
        className="mt-14 flex flex-col items-start justify-between gap-7 border-t border-navy-dark/15 pt-10 sm:flex-row sm:items-center"
        {...rise(0.05)}
      >
        <p className="max-w-xl text-[15.5px] leading-relaxed text-navy-dark/80">
          That is the default order, not a rule. If the table above points
          somewhere else for your situation, we start there instead — and say so
          on the first call.
        </p>
        <button
          onClick={openBooking}
          className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-navy-dark px-7 py-3.5 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-black"
        >
          Book a strategy call
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
      </motion.div>
    </div>
  </section>
);
