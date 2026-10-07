import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check, Minus } from "lucide-react";
import { FigSpreadsheet } from "@/components/LineArt";
import { AccentDot, type Accent } from "@/components/brand";
import { FaqList } from "@/components/AgencyBlocks";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";
import { openBooking } from "@/lib/booking";

/**
 * /pricing — the spec sheet.
 *
 * Identity: a published price, then the arithmetic behind it. A driver ledger
 * set in oversized numerals, the stacked cost-allocation bar (this page's
 * signature visual — nothing else on the site uses it), a worked example from
 * a real engagement, the four routes to buying authority priced side by side,
 * and the terms in writing.
 *
 * Register, per the approved linkBuilding.ts standard:
 *   - the agency describes its own work, pricing and results; it never
 *     characterises anyone else's
 *   - exactly one comparison, aimed at four *routes* to buying authority and
 *     framed as cost and capability, not as a verdict on the vendors
 *   - credibility comes from AuthorityOS™ explained openly, and from concrete
 *     figures — never from claiming to be the honest one
 *   - domain approval is one passing clause in one FAQ answer. It is part of
 *     the process, not the product
 *
 * Surface ladder (DESIGN.md):
 *   mist → stone → white → espresso → clay → mark → navy-dark → clay → stone
 *   7 distinct surfaces, 2 dark, 1 amber, longest light run 3, no repeats
 *   adjacent. CTABand (navy-dark) follows the closing stone section.
 *
 * Depth: overlapping tier cards interlocking hero and stone, white cards with
 * shadow-lift on tinted ground, oversized numerals as ledger structure,
 * hairline rules carrying two layouts, a mint feature panel behind the worked
 * example, an amber band for the price promise, bordered inset panels on clay.
 */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.6, delay, ease: EASE },
});

/* ============================== tier cards ============================== */

const PRICING_TIERS = [
  {
    accent: "butter" as Accent,
    id: "starter",
    name: "Starter",
    tag: "Testing the water",
    price: 997,
    unit: "/month",
    blurb: "For a single site that needs consistent, relevant authority.",
    cta: "Start with Starter",
    featured: false,
    includes: [
      "4–6 editorial placements a month",
      "DR 40–60 publications",
      "AuthorityOS™ research and target mapping",
      "Indexation checks + 90-day replacement",
      "Monthly report with live URLs",
    ],
  },
  {
    accent: "lilac" as Accent,
    id: "growth",
    name: "Growth",
    tag: "Most chosen",
    price: 2497,
    unit: "/month",
    blurb: "Links, digital PR and AI mentions running as one campaign.",
    cta: "Start with Growth",
    featured: true,
    includes: [
      "10–14 placements a month",
      "DR 50–75 publications",
      "HARO expert quotes included",
      "Brand mentions for AI answers",
      "AI citation tracking, 3 surfaces",
      "Anchor & target strategy",
      "Senior strategist on call",
    ],
  },
  {
    accent: "sky" as Accent,
    id: "authority",
    name: "Authority",
    tag: "Category leaders",
    price: 4997,
    unit: "/month",
    blurb: "Aggressive pace for competitive niches and multi-site brands.",
    cta: "Talk about Authority",
    featured: false,
    includes: [
      "20+ placements a month",
      "DR 60–80, incl. Gulf business press",
      "Full digital PR programme",
      "Multi-site / multi-market support",
      "Competitor gap monitoring",
      "Slack channel + weekly check-ins",
    ],
  },
];

/* ================================ drivers ================================ */

const DRIVERS = [
  {
    n: "01",
    k: "Authority range",
    v: "A DR 70+ placement costs several times a DR 45 one. The editorial bar is higher, the publication has more to lose, and fewer people can get you in.",
    d: "Largest single factor",
  },
  {
    n: "02",
    k: "Volume per month",
    v: "Four placements a month is a different pipeline to twelve. The rate per placement improves with volume because the prospecting is already done.",
    d: "Improves with scale",
  },
  {
    n: "03",
    k: "Market and language",
    v: "Gulf and non-English placements need different relationships, different writers, and longer lead times than US or UK publications.",
    d: "Adds 15–30%",
  },
  {
    n: "04",
    k: "Who writes the content",
    v: "We write to the publication's standard by default. If your team supplies drafts to our spec, the rate drops and the timeline shortens.",
    d: "Reduces the rate",
  },
  {
    n: "05",
    k: "Target page readiness",
    v: "If a page needs depth before it can hold a position, that is separate scope. The audit says so up front, because authority works best pointed at a page ready to receive it.",
    d: "May delay the start",
  },
];

const Drivers = () => (
  <div className="bg-navy-dark py-24 lg:py-32">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.div className="max-w-2xl" {...rise()}>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
          What moves the number
        </p>
        <h2 className="text-balance text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-[2.6rem]">
          Five inputs set the price.
          <span className="text-white/70">All five are in the proposal.</span>
        </h2>
        <p className="mt-5 text-[15.5px] leading-relaxed text-white/75">
          Every quote is built from the same five inputs, in the same order. The
          proposal shows which way each one moved your number and by how much.
        </p>
      </motion.div>

      <dl className="mt-14">
        {DRIVERS.map((d, i) => (
          <motion.div
            key={d.k}
            className="grid items-baseline gap-x-8 gap-y-2.5 border-t border-white/15 py-8 lg:grid-cols-[auto_0.6fr_1.5fr_auto]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
          >
            <span className="text-[2.4rem] font-semibold leading-none tracking-[-0.04em] text-white/35 tabular-nums lg:text-[3rem]">
              {d.n}
            </span>
            <dt className="text-[17px] font-semibold leading-snug tracking-[-0.02em] text-white">
              {d.k}
            </dt>
            <dd className="text-[14.5px] leading-relaxed text-white/75">
              {d.v}
            </dd>
            <dd className="shrink-0 self-start lg:pl-2">
              <span className="inline-flex whitespace-nowrap rounded-full border border-white/25 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-white/80">
                {d.d}
              </span>
            </dd>
          </motion.div>
        ))}
      </dl>
    </div>
  </div>
);

/* ============================== allocation ============================== */

const ALLOCATION = [
  {
    k: "Publisher and editorial fees",
    pct: 46,
    tone: "bg-navy-dark",
    d: "Paid to the publication for editorial time. It is the largest line, and it is itemised in the monthly report rather than folded into a single number.",
  },
  {
    k: "Writing and editing",
    pct: 22,
    tone: "bg-navy-dark/70",
    d: "A writer who knows your sector, plus an edit pass against the publication's house style before anything is pitched.",
  },
  {
    k: "AuthorityOS™ research and vetting",
    pct: 18,
    tone: "bg-navy-dark/50",
    d: "Topical overlap, traffic checks, relevance scoring. On one engagement that meant reviewing 31 domains to place on 14.",
  },
  {
    k: "Reporting and indexation chasing",
    pct: 14,
    tone: "bg-navy-dark/25",
    d: "Tracking every placement until Google indexes it, and going back to the publisher when it does not.",
  },
];

const WORKED = [
  { k: "Retainer", v: "$2,497 / mo" },
  { k: "Placements delivered", v: "71" },
  { k: "Indexed and verified", v: "69" },
  { k: "Cost per indexed placement", v: "$217" },
  { k: "Domain Rating", v: "35 → 65" },
];

const Allocation = () => (
  <div className="bg-mist py-24 lg:py-32">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.div className="mb-12 max-w-2xl" {...rise()}>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/70">
          Where the money goes
        </p>
        <h2 className="text-balance text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.03em] text-navy-dark sm:text-[2.6rem]">
          You pay for a month of work.
          <span className="text-navy-dark/65">Here are its four parts.</span>
        </h2>
        <p className="mt-5 text-[15.5px] leading-relaxed text-navy-dark/75">
          Rough averages across current engagements. The split moves with
          authority range and volume, but the shape holds: editorial fees first,
          the research that decides where to place second.
        </p>
      </motion.div>

      {/* signature visual: the stacked cost-allocation bar */}
      <motion.div
        className="mb-12 flex h-16 overflow-hidden rounded-xl shadow-lift ring-1 ring-navy-dark/10"
        initial={{ opacity: 0, scaleX: 0.94 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {ALLOCATION.map((a, i) => (
          <motion.div
            key={a.k}
            className={`flex items-center justify-center ${a.tone}`}
            style={{ width: `${a.pct}%` }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 + i * 0.1 }}
          >
            <span
              className={`text-[13px] font-bold tabular-nums ${
                i < 2 ? "text-white" : "text-navy-dark"
              }`}
            >
              {a.pct}%
            </span>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid gap-x-14 gap-y-12 lg:grid-cols-[1.3fr_0.95fr]">
        <dl className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
          {ALLOCATION.map((a, i) => (
            <motion.div
              key={a.k}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
            >
              <dt className="mb-2 flex items-center gap-2.5">
                <span
                  className={`h-3 w-3 shrink-0 rounded-sm ${a.tone}`}
                  aria-hidden="true"
                />
                <span className="text-[15.5px] font-semibold text-navy-dark">
                  {a.k}
                </span>
              </dt>
              <dd className="text-[13.5px] leading-relaxed text-navy-dark/75">
                {a.d}
              </dd>
            </motion.div>
          ))}
        </dl>

        {/* pastel feature panel: the same month, costed on a real engagement */}
        <motion.div
          className="self-start rounded-3xl border border-navy-dark/10 bg-white p-7 shadow-lift"
          {...rise(0.1)}
        >
          <p className="mb-6 text-[10.5px] font-bold uppercase tracking-[0.14em] text-navy-dark/70">
            Worked example · Ocuco, months 1–6
          </p>
          <dl className="divide-y divide-navy-dark/12">
            {WORKED.map((w) => (
              <div
                key={w.k}
                className="flex items-baseline justify-between gap-4 py-3 first:pt-0"
              >
                <dt className="text-[13.5px] text-navy-dark/80">{w.k}</dt>
                <dd className="shrink-0 text-[15px] font-bold tabular-nums text-navy-dark">
                  {w.v}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-[12.5px] leading-relaxed text-navy-dark/80">
            Two placements never indexed. Both were replaced on equivalent
            domains inside the retainer.
          </p>
        </motion.div>
      </div>
    </div>
  </div>
);

/* ============================ the price promise ============================ */

const PROMISE_FACTS = [
  { k: "Setup or onboarding fees", v: "$0" },
  { k: "Notice period after month three", v: "30 days" },
  { k: "Link monitoring included", v: "12 months" },
];

const PricePromise = () => (
  <div className="bg-white py-20 lg:py-24">
    <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
      <motion.p
        className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/70"
        {...rise()}
      >
        Pricing, in writing
      </motion.p>
      <motion.h2
        className="text-balance text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-navy-dark sm:text-[2.5rem]"
        {...rise(0.05)}
      >
        The number in the proposal
        <span className="text-navy-dark/70">is the number on the invoice.</span>
      </motion.h2>
      <motion.p
        className="mx-auto mt-6 max-w-2xl text-[15.5px] leading-relaxed text-navy-dark/80"
        {...rise(0.1)}
      >
        Rates hold for the agreed term. If volume, authority range or market
        changes, a revised proposal goes out before anything is invoiced.
      </motion.p>

      <motion.dl
        className="mx-auto mt-11 grid max-w-3xl divide-y divide-navy-dark/20 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
        {...rise(0.15)}
      >
        {PROMISE_FACTS.map((f) => (
          <div key={f.k} className="px-5 py-5 sm:py-1">
            <dd className="text-[2rem] font-semibold leading-none tracking-[-0.03em] text-navy-dark tabular-nums">
              {f.v}
            </dd>
            <dt className="mt-2.5 text-[12.5px] leading-snug text-navy-dark/80">
              {f.k}
            </dt>
          </div>
        ))}
      </motion.dl>
    </div>
  </div>
);

/* ================================ routes ================================ */

const ROUTES = [
  {
    t: "Marketplace inventory",
    price: "$60–$250",
    unit: "per link",
    d: "A catalogue of sites with a price beside each one. You pick from what is listed and publish quickly. Relevance and indexation vary site by site, so the figure to budget against is the cost per indexed link rather than the cost per order.",
  },
  {
    t: "An in-house hire",
    price: "$4,200",
    unit: "per month, loaded",
    d: "Salary, tools and your time. The relationships sit inside your team, which is the real advantage. The first months go into building a publisher list from scratch, and that list leaves when the person does.",
  },
  {
    t: "A full-service retainer",
    price: "$8,000",
    unit: "per month, typical",
    d: "Technical, content, reporting and links in one engagement. The right call when you need all four. More than you need when the gap is authority on a handful of pages.",
  },
  {
    t: "This programme",
    price: "$997–$4,997",
    unit: "per month",
    d: "Off-page authority only, scoped to the pages closest to moving. AuthorityOS™ research, editorial placements, indexation verification and reporting, priced against a placement range rather than per link.",
    ours: true,
  },
];

const Routes = () => (
  <div className="bg-navy-dark py-24 lg:py-32">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.div className="mb-14 max-w-2xl" {...rise()}>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
          How the options compare
        </p>
        <h2 className="text-balance text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-[2.6rem]">
          There are four ways to buy authority.
          <span className="text-white/70">Each one prices differently.</span>
        </h2>
        <p className="mt-5 text-[15.5px] leading-relaxed text-white/70">
          Four routes, four price shapes. Here is what each one costs, and what
          the spend covers.
        </p>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {ROUTES.map((a, i) => (
          <motion.article
            key={a.t}
            className={`flex flex-col rounded-2xl p-7 ${
              a.ours
                ? "bg-white/[0.09] ring-1 ring-white/30"
                : "border border-white/10 bg-white/[0.04]"
            }`}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.09, ease: EASE }}
          >
            <h3 className="mb-4 text-[16px] font-semibold leading-snug text-white">
              {a.t}
            </h3>
            <p className="mb-5 flex flex-wrap items-baseline gap-x-1.5 border-b border-white/15 pb-5">
              <span className="text-[1.9rem] font-semibold leading-none tracking-[-0.03em] text-white tabular-nums">
                {a.price}
              </span>
              <span className="text-[12.5px] text-white/70">{a.unit}</span>
            </p>
            <p className="text-[13.5px] leading-relaxed text-white/75">{a.d}</p>
          </motion.article>
        ))}
      </div>

      <motion.p
        className="mx-auto mt-12 max-w-2xl text-center text-[16px] font-semibold leading-snug tracking-[-0.01em] text-white sm:text-[17px]"
        {...rise(0.1)}
      >
        All four are real ways to spend the budget. Which one fits depends on
        how much of your problem is authority, and how much of it is everything
        else.
      </motion.p>
    </div>
  </div>
);

/* ================================= terms ================================= */

const TERMS = [
  {
    t: "Three-month minimum, then month to month",
    d: "Indexation alone takes two to six weeks per placement, so a shorter term cannot show a result. After month three, 30 days' notice ends it.",
  },
  {
    t: "No setup or onboarding fee",
    d: "The audit, the AuthorityOS™ target mapping and the first prospect list sit inside the retainer rather than on a separate invoice.",
  },
  {
    t: "Twelve months of link monitoring",
    d: "If a publisher removes or nofollows a placement inside twelve months, we replace it on an equivalent domain at no charge.",
  },
  {
    t: "Rates hold for the term",
    d: "If volume, authority range or market changes, you get a revised proposal to approve before anything is invoiced.",
  },
  {
    t: "The work is yours to take",
    d: "The placement list, the reporting and the AuthorityOS™ research outputs export in full at any point, including after the last invoice.",
  },
];

const Terms = () => (
  <div className="bg-mist py-24 lg:py-32">
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <motion.div className="mb-12 max-w-2xl" {...rise()}>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/70">
          The terms
        </p>
        <h2 className="text-balance text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.03em] text-navy-dark sm:text-[2.6rem]">
          Five commitments.
          <span className="text-navy-dark/65">All five in the contract.</span>
        </h2>
      </motion.div>

      <ul className="grid gap-4 sm:grid-cols-2">
        {TERMS.map((t, i) => (
          <motion.li
            key={t.t}
            className={`rounded-2xl border border-navy-dark/12 bg-mist p-6 ${
              i === 4 ? "sm:col-span-2" : ""
            }`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
          >
            <div className="mb-2.5 flex gap-3">
              <Check className="mt-1 h-4 w-4 shrink-0 text-verified" />
              <h3 className="text-[16.5px] font-semibold leading-snug tracking-[-0.02em] text-navy-dark">
                {t.t}
              </h3>
            </div>
            <p className="pl-7 text-[14px] leading-relaxed text-navy-dark/75">
              {t.d}
            </p>
          </motion.li>
        ))}
      </ul>
    </div>
  </div>
);

/* ================================ compare ================================ */

const COMPARE_ROWS = [
  { label: "Editorial placements / month", s: "4–6", g: "10–14", a: "20+" },
  { label: "Authority range", s: "DR 40–60", g: "DR 50–75", a: "DR 60–80" },
  {
    label: "AuthorityOS™ research refresh",
    s: "At kickoff",
    g: "Quarterly",
    a: "Monthly",
  },
  { label: "Indexation verification", s: true, g: true, a: true },
  { label: "90-day replacement guarantee", s: true, g: true, a: true },
  { label: "HARO / expert quotes", s: false, g: true, a: true },
  { label: "Brand mentions for AI answers", s: false, g: true, a: true },
  {
    label: "AI citation tracking",
    s: false,
    g: "3 surfaces",
    a: "3 surfaces + screenshots",
  },
  { label: "Gulf & international press", s: false, g: "On request", a: true },
  { label: "Competitor gap monitoring", s: false, g: false, a: true },
  { label: "White-label reporting", s: "On request", g: true, a: true },
  { label: "Response time", s: "48 hours", g: "24 hours", a: "Same day" },
];

const FeatureCell = ({ v }) =>
  v === true ? (
    <Check className="mx-auto h-4 w-4 text-verified" />
  ) : v === false ? (
    <Minus className="mx-auto h-4 w-4 text-navy-dark/50" />
  ) : (
    <span className="text-[13px] text-navy-dark/80">{v}</span>
  );

/* ================================== faq ================================== */

const PRICING_FAQS = [
  {
    q: "Is there a contract or lock-in?",
    a: "A three-month minimum, then month to month with 30 days' notice. Authority compounds, so most clients stay six months or longer — the reports are what should make that decision.",
  },
  {
    q: "What if I need something between two plans?",
    a: "Then we scope it. These are starting points rather than boxes. Tell us the target pages, the competition and the pace you want, and the quote comes back against that.",
  },
  {
    q: "Do you charge per link or per month?",
    a: "Per month, against a placement range rather than a hard count — a DR 72 feature and a DR 45 guest post are not the same unit of work. The range is what we commit to; the report shows what landed, with live URLs.",
  },
  {
    q: "What does AuthorityOS™ have to do with the price?",
    a: "AuthorityOS™ is the research methodology behind the work: how Google categorises your site, which publications carry weight in your category, where competitors are earning references you are not, and which of your pages will respond fastest. It is not a line item you buy. It is what decides how many placements you actually need, which is usually what decides the plan.",
  },
  {
    q: "What is not included?",
    a: "On-page SEO, technical audits, content for your own site, and paid media. We do off-page authority — editorial links, digital PR and brand mentions — and for the rest we will point you at a specialist we trust.",
  },
  {
    q: "Do you work white-label for agencies?",
    a: "Yes, on Growth and Authority as standard, and on Starter by request. Same research, same vetting, your branding on every deliverable.",
  },
  {
    q: "How fast can we start?",
    a: "The audit and the first target list usually land within a week of kickoff. Placements begin once the targets are agreed — some clients review each candidate domain and its metrics first, others leave sourcing to us and read the monthly report.",
  },
];

/* ================================== page ================================== */

const Pricing = () => {
  const [e, s] = useState(false),
    a = (r) => (e ? Math.round(r * 0.85) : r);
  return (
    <PageLayout>
      <Seo
        title="Pricing"
        description="Published monthly pricing for editorial link building, digital PR, HARO placements and AI brand mentions. Three starting points, the five inputs that set the number, and the terms in writing."
      />

      {/* 1 · mist — hero */}
      <div className="bg-mist pb-36 pt-32 text-center lg:pt-40">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="text-balance mb-6 text-[2.6rem] font-semibold leading-[1.03] tracking-[-0.035em] text-navy-dark sm:text-5xl lg:text-[3.6rem]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            The prices are on this page.
            <span className="text-navy-dark/65">So is what moves them.</span>
          </motion.h1>
          <motion.p
            className="mx-auto mb-9 max-w-xl text-[17px] leading-relaxed text-navy-dark/75"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            Three starting points for off-page authority work, the five inputs
            that set the number, and where a retainer actually goes. Every quote
            is scoped against your target pages.
          </motion.p>
          <motion.div
            className="inline-flex items-center gap-3 rounded-full border border-line bg-white p-1.5 shadow-soft"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {["Monthly", "Pay 6 months −15%"].map((r, c) => {
              const u = (c === 1) === e;
              return (
                <button
                  key={r}
                  onClick={() => s(c === 1)}
                  className={`relative rounded-full px-5 py-2 text-[13px] font-semibold transition-colors duration-300 ${u ? "text-white" : "text-navy-dark/75 hover:text-navy-dark"}`}
                >
                  {u && (
                    <motion.span
                      layoutId="price-pill"
                      className="absolute inset-0 rounded-full bg-navy-dark"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 32,
                      }}
                    />
                  )}
                  <span className="relative">{r}</span>
                </button>
              );
            })}
          </motion.div>

          <motion.dl
            className="mx-auto mt-10 flex max-w-xl flex-wrap items-center justify-center divide-navy-dark/15 sm:divide-x"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.32 }}
          >
            {[
              { k: "Entry retainer", v: "$997 / mo" },
              { k: "Placements a month", v: "4 – 20+" },
              { k: "Minimum term", v: "3 months" },
            ].map((f) => (
              <div key={f.k} className="px-6 py-1.5">
                <dd className="text-[15.5px] font-bold tabular-nums text-navy-dark">
                  {f.v}
                </dd>
                <dt className="mt-0.5 text-[12px] text-navy-dark/70">{f.k}</dt>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>

      {/* 2 · stone — tier cards, pulled up so they interlock with the hero */}
      <div className="bg-white pb-24 lg:pb-28">
        <div className="mx-auto -mt-24 grid max-w-6xl grid-cols-1 items-start gap-5 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {PRICING_TIERS.map((r, c) => (
            <motion.div
              key={r.id}
              className={`rounded-3xl border bg-white p-8 ${r.featured ? "border-navy-dark/15 shadow-deep lg:-mt-6 lg:pb-10" : "border-line shadow-lift"}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: c * 0.08, ease: EASE }}
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="text-balance flex items-center gap-2.5 text-[19px] font-semibold text-navy-dark">
                  <AccentDot accent={r.accent} />
                  {r.name}
                </h2>
                <span
                  className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${r.featured ? "bg-navy-dark text-white" : "bg-mist text-navy-dark/75"}`}
                >
                  {r.tag}
                </span>
              </div>
              <p className="mb-3 flex items-baseline gap-1">
                <span className="text-[3rem] font-semibold leading-none tracking-[-0.03em] text-navy-dark tabular-nums">
                  ${a(r.price).toLocaleString()}
                </span>
                <span className="text-[14px] text-navy-dark/70">{r.unit}</span>
              </p>
              <p className="mb-7 min-h-[42px] text-[14px] leading-relaxed text-navy-dark/75">
                {r.blurb}
              </p>
              <button
                onClick={openBooking}
                className={`mb-7 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-[14px] font-semibold transition-colors duration-300 ${r.featured ? "bg-navy-dark text-white hover:bg-black" : "border border-navy-dark/20 text-navy-dark hover:border-navy-dark"}`}
              >
                {r.cta}
                <ArrowRight className="h-4 w-4" />
              </button>
              <ul className="space-y-3">
                {r.includes.map((u) => (
                  <li
                    key={u}
                    className="flex gap-2.5 text-[13.5px] leading-relaxed text-navy-dark/80"
                  >
                    <Check className="mt-0.5 h-4 w-4 flex-none text-verified" />
                    {u}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3 · white — the detail table, carried on hairline rules */}
      <div className="bg-white py-24 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-balance mb-12 text-center text-[2rem] font-semibold leading-[1.08] tracking-[-0.035em] text-navy-dark sm:text-[2.5rem]"
            {...rise()}
          >
            Three paces, one method.
            <span className="text-navy-dark/65">Line by line.</span>
          </motion.h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr className="border-b border-navy-dark/20">
                  <th className="py-4 text-left text-[12px] font-semibold uppercase tracking-[0.12em] text-navy-dark/75">
                    What you get
                  </th>
                  {PRICING_TIERS.map((r) => (
                    <th
                      key={r.id}
                      className="w-[150px] py-4 text-center text-[13.5px] font-semibold text-navy-dark"
                    >
                      {r.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((r) => (
                  <tr
                    key={r.label}
                    className="border-b border-line last:border-0"
                  >
                    <td className="py-3.5 pr-4 text-[13.5px] text-navy-dark/80">
                      {r.label}
                    </td>
                    <td className="py-3.5 text-center">
                      <FeatureCell v={r.s} />
                    </td>
                    <td className="bg-mist py-3.5 text-center">
                      <FeatureCell v={r.g} />
                    </td>
                    <td className="py-3.5 text-center">
                      <FeatureCell v={r.a} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 4 · espresso · 5 · clay · 6 · mark · 7 · navy-dark · 8 · clay */}
      <Drivers />
      <Allocation />
      <PricePromise />
      <Routes />
      <Terms />

      {/* 9 · stone — pricing FAQ (white cards on a tinted ground) */}
      <div className="relative bg-white py-24 lg:py-28">
        <div className="absolute left-10 top-32 hidden text-navy-dark/70 xl:block">
          <FigSpreadsheet className="h-auto w-24" />
        </div>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-balance mb-10 text-center text-[2rem] font-semibold leading-[1.08] tracking-[-0.035em] text-navy-dark sm:text-[2.5rem]"
            {...rise()}
          >
            {"Pricing "}
            <span className="text-navy-dark/65">questions</span>
          </motion.h2>
          <FaqList faqs={PRICING_FAQS} />
        </div>
      </div>
    </PageLayout>
  );
};

export default Pricing;
