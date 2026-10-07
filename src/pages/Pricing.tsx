import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check, Minus } from "lucide-react";
import { FigSpreadsheet } from "@/components/LineArt";
import { FaqList } from "@/components/AgencyBlocks";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";
import { openBooking } from "@/lib/booking";

/**
 * Pricing-page depth sections.
 *
 * Identity: the spec sheet. A driver ledger, a stacked allocation bar showing
 * where a retainer actually goes, an honest comparison against the cheaper
 * options, and the terms in writing. The allocation bar is this page's
 * signature visual — nothing else on the site uses it.
 */

const DRIVERS = [
  {
    k: "Authority range",
    v: "A DR 70+ placement costs several times a DR 45 one. The editorial bar is higher, the publication has more to lose, and fewer people can get you in.",
    d: "Largest single factor",
  },
  {
    k: "Volume per month",
    v: "Four placements a month is a different pipeline to twelve. Rate per placement improves with volume because the prospecting is already done.",
    d: "Improves with scale",
  },
  {
    k: "Market and language",
    v: "Gulf and non-English placements need different relationships, different writers, and longer lead times than US or UK publications.",
    d: "Adds 15–30%",
  },
  {
    k: "Who writes the content",
    v: "We write to the publication's standard by default. If your team supplies drafts to our spec, the rate drops and the timeline shortens.",
    d: "Reduces the rate",
  },
  {
    k: "Target page readiness",
    v: "If the pages you want to rank need content work first, that is a separate scope. We will tell you in the audit rather than quietly billing links at a page that cannot hold them.",
    d: "May delay the start",
  },
];

const Drivers = () => (
  <div className="bg-white py-24 lg:py-32">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.div
        className="mb-12 max-w-2xl"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/70">
          What moves the number
        </p>
        <h2 className="text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-navy-dark">
          Five things change the price.
          <br />
          <span className="text-navy-dark/65">None of them is your logo.</span>
        </h2>
      </motion.div>

      <dl>
        {DRIVERS.map((d, i) => (
          <motion.div
            key={d.k}
            className="grid gap-x-10 gap-y-2 border-t border-line py-7 lg:grid-cols-[0.55fr_1.45fr_auto]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <dt className="text-[17px] font-semibold leading-snug tracking-[-0.02em] text-navy-dark">
              {d.k}
            </dt>
            <dd className="text-[14.5px] leading-relaxed text-navy-dark/75">
              {d.v}
            </dd>
            <dd className="shrink-0 self-start lg:pl-4">
              <span className="inline-flex whitespace-nowrap rounded-full bg-linen px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-navy-dark/70">
                {d.d}
              </span>
            </dd>
          </motion.div>
        ))}
      </dl>
    </div>
  </div>
);

const ALLOCATION = [
  {
    k: "Publisher and editorial fees",
    pct: 46,
    tone: "bg-navy-dark",
    d: "Paid directly to the publication for editorial time. It is the largest line, and we itemise it so you can see where the retainer goes.",
  },
  {
    k: "Writing and editing",
    pct: 22,
    tone: "bg-navy-dark/70",
    d: "A writer who knows your sector, plus an edit pass against the publication's house style before anything is pitched.",
  },
  {
    k: "Vetting and prospecting",
    pct: 18,
    tone: "bg-navy-dark/45",
    d: "Traffic checks, outbound-profile reads, relevance scoring. On one engagement this meant reviewing 31 domains to place on 14.",
  },
  {
    k: "Reporting and indexation chasing",
    pct: 14,
    tone: "bg-navy-dark/25",
    d: "Tracking every placement until Google indexes it, and going back to the publisher when it does not.",
  },
];

const Allocation = () => (
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
          Where the money goes
        </p>
        <h2 className="text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-navy-dark">
          A retainer, broken
          <br />
          <span className="text-navy-dark/65">into its four parts</span>
        </h2>
        <p className="mt-5 text-[15.5px] leading-relaxed text-navy-dark/75">
          Rough averages across current engagements. The split shifts with
          authority range, but the shape holds: most of your money reaches the
          publication rather than our overhead.
        </p>
      </motion.div>

      <motion.div
        className="mb-10 flex h-14 overflow-hidden rounded-xl"
        initial={{ opacity: 0, scaleX: 0.94 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
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

      <dl className="grid gap-x-12 gap-y-7 sm:grid-cols-2">
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
    </div>
  </div>
);

const ALTERNATIVES = [
  {
    t: "A $60 marketplace link",
    price: "$60",
    unit: "per link",
    real: "You are buying inventory resold at markup, usually on a site with no organic traffic. At a 30% indexation rate the working cost per indexed link is about $200 — and the ones that do index sit on domains you would not want in a disclosure.",
  },
  {
    t: "A junior hire in-house",
    price: "$4,200",
    unit: "per month, loaded",
    real: "Salary plus tools plus your time training them. Month one to four goes on learning outreach; the publisher relationships start from zero and leave when they do.",
  },
  {
    t: "A full-service SEO agency",
    price: "$8,000",
    unit: "per month, typical",
    real: "Links are one line in a retainer covering technical, content and reporting. Useful if you need all of it. Expensive if what you actually need is authority on four pages.",
  },
];

const Alternatives = () => (
  <div className="bg-navy-dark py-24 lg:py-32">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.div
        className="mb-14 max-w-2xl"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
          How the options compare
        </p>
        <h2 className="text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-white">
          Three ways to spend less,
          <br />
          <span className="text-white/70">and what each one costs you</span>
        </h2>
        <p className="mt-5 text-[15.5px] leading-relaxed text-white/70">
          Editorial link building is not the lowest-cost option available. Here
          is what each alternative costs, and what it gets you.
        </p>
      </motion.div>

      <div className="grid gap-5 md:grid-cols-3">
        {ALTERNATIVES.map((a, i) => (
          <motion.article
            key={a.t}
            className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-7"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
          >
            <h3 className="mb-4 text-[16px] font-semibold text-white">{a.t}</h3>
            <p className="mb-5 flex items-baseline gap-1.5 border-b border-white/10 pb-5">
              <span className="text-[2.2rem] font-semibold leading-none tracking-[-0.03em] text-white tabular-nums">
                {a.price}
              </span>
              <span className="text-[12.5px] text-white/70">{a.unit}</span>
            </p>
            <p className="text-[13.5px] leading-relaxed text-white/70">
              {a.real}
            </p>
          </motion.article>
        ))}
      </div>
    </div>
  </div>
);

const TERMS = [
  {
    t: "Three-month minimum, then month to month",
    d: "Indexation alone takes two to six weeks per placement, so a shorter term cannot show a result. After month three you can stop with 30 days' notice.",
  },
  {
    t: "No setup fee, ever",
    d: "The audit, the target mapping and the first prospect list are part of the retainer, not a separate onboarding invoice.",
  },
  {
    t: "Twelve months of link monitoring",
    d: "If a publisher removes or nofollows a placement inside twelve months, we replace it on an equivalent domain at no charge.",
  },
  {
    t: "Nothing is placed without your yes",
    d: "Every candidate domain reaches you with its metrics before outreach becomes a placement. Strike anything, for any reason, without explaining why.",
  },
  {
    t: "You keep everything if you leave",
    d: "The placement list, the approval sheets and the reporting are yours. No part of the work is held hostage behind our dashboard.",
  },
];

const Terms = () => (
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
          The terms
        </p>
        <h2 className="text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-navy-dark">
          Five commitments,
          <br />
          <span className="text-navy-dark/65">in the contract</span>
        </h2>
      </motion.div>

      <ul className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
        {TERMS.map((t, i) => (
          <motion.li
            key={t.t}
            className={i === 4 ? "sm:col-span-2 sm:max-w-xl" : ""}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
          >
            <div className="mb-2.5 flex gap-3">
              <Check className="mt-1 h-4 w-4 shrink-0 text-verified" />
              <h3 className="text-[16.5px] font-semibold leading-snug text-navy-dark">
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

const PRICING_TIERS = [
  {
    id: "starter",
    name: "Starter",
    tag: "Testing the water",
    price: 997,
    unit: "/month",
    blurb: "For a single site that needs consistent, safe authority.",
    cta: "Start with Starter",
    featured: false,
    accent: "bg-white",
    includes: [
      "4–6 editorial placements a month",
      "DR 40–60 publications",
      "Every domain approved by you",
      "Indexation checks + 90-day replacement",
      "Monthly report with live URLs",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tag: "Most chosen",
    price: 2497,
    unit: "/month",
    blurb: "Links, digital PR and AI mentions running as one campaign.",
    cta: "Start with Growth",
    featured: true,
    accent: "bg-butter",
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
    id: "authority",
    name: "Authority",
    tag: "Category leaders",
    price: 4997,
    unit: "/month",
    blurb: "Aggressive pace for competitive niches and multi-site brands.",
    cta: "Talk about Authority",
    featured: false,
    accent: "bg-white",
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

const COMPARE_ROWS = [
  { label: "Editorial placements / month", s: "4–6", g: "10–14", a: "20+" },
  { label: "Authority range", s: "DR 40–60", g: "DR 50–75", a: "DR 60–80" },
  { label: "Domain approval before placement", s: true, g: true, a: true },
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

const PRICING_FAQS = [
  {
    q: "Is there a contract or lock-in?",
    a: "No. Everything is month to month. Authority work compounds, so most clients stay six months or longer — but that should be because the reports justify it, not because a contract traps them.",
  },
  {
    q: "What if I need something between two plans?",
    a: "Then we scope it. These are starting points, not boxes. Tell us the target pages, the competition and the pace you want, and you get a quote against that.",
  },
  {
    q: "Do you charge per link or per month?",
    a: "Per month, with a placement range rather than a hard count — because a DR 72 feature and a DR 45 guest post are not the same unit of work. The range is what we commit to; the report shows what landed.",
  },
  {
    q: "What is not included?",
    a: "On-page SEO, technical audits, content for your own site, and paid media. We do off-page authority — links, press, and mentions — and we would rather refer you to a specialist than pretend otherwise.",
  },
  {
    q: "Do you work white-label for agencies?",
    a: "Yes, on Growth and Authority as standard, and on Starter by request. Same vetting, your branding on every deliverable.",
  },
  {
    q: "How fast can we start?",
    a: "The audit and first prospect list usually land within a week of kickoff. Placements begin as soon as you approve the first domains.",
  },
];

const FeatureCell = ({ v }) =>
  v === true ? (
    <Check className="w-4 h-4 text-verified mx-auto" />
  ) : v === false ? (
    <Minus className="w-4 h-4 text-navy-dark/25 mx-auto" />
  ) : (
    <span className="text-[13px] text-navy-dark/75">{v}</span>
  );

const Pricing = () => {
  const [e, s] = useState(false),
    a = (r) => (e ? Math.round(r * 0.85) : r);
  return (
    <PageLayout>
      <Seo
        title="Pricing"
        description="Transparent monthly pricing for editorial link building, digital PR, HARO placements and AI brand mentions. No lock-in, no contact-sales wall."
      />
      <div className="bg-mist pt-32 pb-16 lg:pt-40 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="text-[2.6rem] sm:text-5xl lg:text-[3.6rem] font-semibold text-navy-dark leading-[1.03] tracking-[-0.035em] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {"Plans with "}
            <span className="text-navy-dark/65">actual prices</span>
            {" on them."}
          </motion.h1>
          <motion.p
            className="text-[17px] text-navy-dark/70 leading-relaxed max-w-xl mx-auto mb-9"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            No “contact sales” wall, no annual lock-in. Pick a pace, approve
            every site, and stop whenever the reports stop earning it.
          </motion.p>
          <motion.div
            className="inline-flex items-center gap-3 bg-white border border-line rounded-full p-1.5"
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
                  className={`relative rounded-full px-5 py-2 text-[13px] font-semibold transition-colors duration-300 ${u ? "text-white" : "text-navy-dark/70 hover:text-navy-dark"}`}
                >
                  {u && (
                    <motion.span
                      layoutId="price-pill"
                      className="absolute inset-0 bg-navy-dark rounded-full"
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
        </div>
      </div>
      <div className="bg-mist pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-5 items-start">
          {PRICING_TIERS.map((r, c) => (
            <motion.div
              key={r.id}
              className={`${r.accent} rounded-3xl border p-8 ${r.featured ? "border-navy-dark/15 lg:-mt-4 lg:pb-10 shadow-lift" : "border-line"}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: c * 0.08 }}
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[19px] font-semibold text-navy-dark">
                  {r.name}
                </h2>
                <span
                  className={`text-[10px] font-bold tracking-[0.12em] uppercase rounded-full px-2.5 py-1 ${r.featured ? "bg-navy-dark text-white" : "bg-linen text-navy-dark/70"}`}
                >
                  {r.tag}
                </span>
              </div>
              <p className="flex items-baseline gap-1 mb-3">
                <span className="text-[3rem] font-semibold text-navy-dark tracking-[-0.03em] leading-none">
                  ${a(r.price).toLocaleString()}
                </span>
                <span className="text-[14px] text-navy-dark/70">{r.unit}</span>
              </p>
              <p className="text-[14px] text-navy-dark/70 leading-relaxed mb-7 min-h-[42px]">
                {r.blurb}
              </p>
              <button
                onClick={openBooking}
                className={`w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-[14px] font-semibold transition-colors duration-300 mb-7 ${r.featured ? "bg-navy-dark hover:bg-black text-white" : "border border-navy-dark/20 text-navy-dark hover:border-navy-dark"}`}
              >
                {r.cta}
                <ArrowRight className="w-4 h-4" />
              </button>
              <ul className="space-y-3">
                {r.includes.map((u) => (
                  <li
                    key={u}
                    className="flex gap-2.5 text-[13.5px] text-navy-dark/80 leading-relaxed"
                  >
                    <Check className="w-4 h-4 text-verified flex-none mt-0.5" />
                    {u}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
      <Drivers />
      <Allocation />
      <Alternatives />
      <div className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[2rem] sm:text-[2.6rem] font-semibold leading-[1.06] tracking-[-0.035em] text-navy-dark mb-10 text-center">
            {"Compare the "}
            <span className="text-navy-dark/65">detail</span>
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr className="border-b border-line">
                  <th className="text-left py-4 text-[12px] font-semibold tracking-[0.12em] text-navy-dark/70 uppercase">
                    What you get
                  </th>
                  {PRICING_TIERS.map((r) => (
                    <th
                      key={r.id}
                      className="py-4 text-center text-[13.5px] font-semibold text-navy-dark w-[150px]"
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
                    <td className="py-3.5 text-[13.5px] text-navy-dark/80 pr-4">
                      {r.label}
                    </td>
                    <td className="py-3.5 text-center">
                      <FeatureCell v={r.s} />
                    </td>
                    <td className="py-3.5 text-center bg-linen/50">
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
      <Terms />
      <div className="relative bg-mist py-24">
        <div className="hidden xl:block absolute left-10 top-32 text-navy-dark/70">
          <FigSpreadsheet className="w-24 h-auto" />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[2rem] sm:text-[2.6rem] font-semibold leading-[1.06] tracking-[-0.035em] text-navy-dark mb-10 text-center">
            {"Pricing "}
            <span className="text-navy-dark/65">questions</span>
          </h2>
          <FaqList faqs={PRICING_FAQS} />
        </div>
      </div>
    </PageLayout>
  );
};

export default Pricing;
