import { Fragment } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Check, Minus } from "lucide-react";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";
import { openBooking } from "@/lib/booking";
import { DarkGlow, Eyebrow, H2, Soft, ease, rise } from "./services/kit";
import { ServiceFaq } from "./services/common";

/**
 * /pricing. Plan: PAGES-REDESIGN-2.md §5.
 *
 * Plans on a dark stage, then: price by service, the full comparison, what
 * every plan includes, what changes a quote, one client voice, questions.
 * Terms are stated once and match the service pages: month to month, and
 * 12 months of link monitoring with free replacement.
 */

const TIERS = [
  {
    id: "starter",
    name: "Starter",
    tag: "Testing the water",
    price: "$997",
    blurb: "For one site that needs steady, safe authority.",
    cta: "Start with Starter",
    featured: false,
    includes: [
      "4–6 editorial placements a month",
      "DR 40–60 publications",
      "Every site checked by hand",
      "Indexation checks and 12-month link monitoring",
      "Monthly report with live URLs",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tag: "Most chosen",
    price: "$2,497",
    blurb: "Links, expert quotes and AI mentions running as one campaign.",
    cta: "Start with Growth",
    featured: true,
    includes: [
      "10–14 placements a month",
      "DR 50–75 publications",
      "HARO and expert quotes included",
      "Brand mentions for AI answers",
      "AI visibility tracking",
      "Anchor and target-page strategy",
      "A senior strategist on every call",
    ],
  },
  {
    id: "authority",
    name: "Authority",
    tag: "Category leaders",
    price: "$4,997",
    blurb: "Full pace for competitive niches and multi-market brands.",
    cta: "Talk about Authority",
    featured: false,
    includes: [
      "20+ placements a month",
      "DR 60–80, Gulf business press included",
      "Full digital PR programme",
      "Multi-site and multi-market support",
      "Competitor gap monitoring",
      "Slack channel and weekly check-ins",
    ],
  },
];

const BY_SERVICE = [
  {
    to: "/services/link-building",
    t: "Link Building",
    d: "Editorial guest posts, niche edits and authority placements.",
    from: "$997",
    where: "Every plan",
  },
  {
    to: "/services/haro-links",
    t: "HARO & Expert Quotes",
    d: "Your experts quoted in stories that are already being written.",
    from: "$2,497",
    where:
      "Growth and Authority. Quotes-only is scoped on delivered placements.",
  },
  {
    to: "/services/brand-mentions",
    t: "Brand Mentions & AI visibility",
    d: "Mentions on the sources AI answers trust, tracked every month.",
    from: "$2,497",
    where: "Growth and Authority",
  },
  {
    to: "/services/digital-pr",
    t: "Digital PR",
    d: "Story-led campaigns on business and trade publications.",
    from: "$4,997",
    where: "Authority. Single campaigns quoted on a call.",
  },
  {
    to: "/contact",
    t: "White label for agencies",
    d: "Any of the above under your brand, with volume pricing.",
    from: "Custom",
    where: "Quoted per client volume",
  },
];

type Cell = boolean | string;
const COMPARE: {
  group: string;
  rows: { label: string; s: Cell; g: Cell; a: Cell }[];
}[] = [
  {
    group: "Placements",
    rows: [
      { label: "Editorial placements a month", s: "4–6", g: "10–14", a: "20+" },
      { label: "Authority range", s: "DR 40–60", g: "DR 50–75", a: "DR 60–80" },
      { label: "Every site checked by hand", s: true, g: true, a: true },
      { label: "Indexation checks", s: true, g: true, a: true },
      {
        label: "12-month link monitoring and free replacement",
        s: true,
        g: true,
        a: true,
      },
    ],
  },
  {
    group: "Services",
    rows: [
      { label: "HARO and expert quotes", s: false, g: true, a: true },
      { label: "Brand mentions for AI answers", s: false, g: true, a: true },
      { label: "Digital PR campaigns", s: false, g: "On request", a: true },
      {
        label: "Gulf and international press",
        s: false,
        g: "On request",
        a: true,
      },
    ],
  },
  {
    group: "Reporting",
    rows: [
      { label: "Monthly report with live URLs", s: true, g: true, a: true },
      {
        label: "AI visibility tracking",
        s: false,
        g: "Monthly",
        a: "Monthly + screenshots",
      },
      { label: "Competitor gap monitoring", s: false, g: false, a: true },
      { label: "White-label reports", s: "On request", g: true, a: true },
    ],
  },
  {
    group: "Support",
    rows: [
      { label: "Reply time", s: "48 hours", g: "24 hours", a: "Same day" },
      { label: "Senior strategist on calls", s: false, g: true, a: true },
      { label: "Slack channel", s: false, g: false, a: true },
    ],
  },
];

const INCLUDED = [
  {
    t: "Month to month",
    d: "No long contract. We suggest three months to judge results, then stay because the reports justify it.",
  },
  {
    t: "No setup fee",
    d: "The audit, target pages and first site shortlist are part of the plan, not a separate invoice.",
  },
  {
    t: "Every site checked by hand",
    d: "Real traffic, the keywords behind it, a steady graph and clean outbound links. About one in five fails.",
  },
  {
    t: "12 months of link monitoring",
    d: "If a link is removed or turned nofollow within 12 months, we replace it on a similar site for free.",
  },
  {
    t: "You keep everything",
    d: "Every placement and report is yours if you leave. Nothing sits behind our dashboard.",
  },
];

const DRIVERS = [
  {
    k: "Authority range",
    d: "A DR 70+ placement costs several times a DR 45 one.",
    e: "Biggest factor",
  },
  {
    k: "Volume",
    d: "More placements a month lowers the cost of each one.",
    e: "Cheaper per link",
  },
  {
    k: "Market and language",
    d: "Gulf and non-English placements need different writers and relationships.",
    e: "Adds 15–30%",
  },
  {
    k: "Who writes",
    d: "If your team supplies drafts to our brief, the rate drops.",
    e: "Lowers the rate",
  },
  {
    k: "Page readiness",
    d: "Thin target pages need work first. The audit tells you before you pay.",
    e: "May delay the start",
  },
];

const FAQS = [
  {
    q: "Is there a contract or lock-in?",
    a: "No. Plans run month to month. We suggest giving it three months, because links take a few weeks to index and pages take time to move, but you’re free to stop at any point.",
  },
  {
    q: "What if I need something between two plans?",
    a: "Then we scope it. These are starting prices, not boxes. Tell us the target pages, the competition and the pace you want, and you get a quote against that.",
  },
  {
    q: "Do you charge per link or per month?",
    a: "Per month, with a placement range rather than a hard count, because a DR 72 feature and a DR 45 guest post are not the same amount of work. The range is what we commit to; the report shows what landed.",
  },
  {
    q: "What happens if a link disappears?",
    a: "We monitor every link for 12 months. If a publisher removes it or turns it nofollow in that time, we replace it on a similar site at no cost.",
  },
  {
    q: "What isn’t included?",
    a: "On-page SEO, technical audits, content for your own site and paid ads. We do off-page authority: links, PR and mentions. If you need the rest, we’ll point you to a specialist.",
  },
  {
    q: "Do you work white label for agencies?",
    a: "Yes. Growth and Authority include white-label reports as standard, and Starter can on request. Same vetting, your branding on everything.",
  },
  {
    q: "How fast can we start?",
    a: "The audit and first site shortlist usually land within a week of kickoff. First placements usually go live in weeks two to four.",
  },
];

const CellView = ({ v, featured = false }: { v: Cell; featured?: boolean }) =>
  v === true ? (
    <Check
      className={`mx-auto h-4 w-4 ${featured ? "text-navy-dark" : "text-verified"}`}
      aria-label="Included"
    />
  ) : v === false ? (
    <Minus
      className="mx-auto h-4 w-4 text-navy-dark/30"
      aria-label="Not included"
    />
  ) : (
    <span className="text-[13.5px] text-navy-dark/85">{v}</span>
  );

/* ---------------------------------- page ---------------------------------- */

const Pricing = () => (
  <PageLayout>
    <Seo
      title="Pricing: Link Building, Digital PR & AI Visibility Plans"
      description="Starting prices for link building, digital PR, brand mentions and expert quotes. Month to month, no setup fee, 12 months of link monitoring."
    />

    {/* plans, on a dark stage */}
    <section className="relative overflow-hidden bg-navy-dark pb-24 pt-32 lg:pb-28 lg:pt-40">
      <DarkGlow className="-left-40 top-10 h-[520px] w-[760px] opacity-55" />
      <DarkGlow className="-right-56 bottom-0 h-[460px] w-[700px] opacity-45" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/70"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Pricing
          </motion.p>
          <h1 className="mt-5">
            <motion.span
              className="block text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.045em] text-white sm:text-[3.8rem] lg:text-[4.2rem]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
            >
              Starting prices,
            </motion.span>
            <motion.span
              className="block text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.045em] text-white/60 sm:text-[3.8rem] lg:text-[4.2rem]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
            >
              out in the open.
            </motion.span>
          </h1>
          <motion.p
            className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-white/75"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            Every plan starts from the price below. The final number depends on
            the sites, the volume and your niche, and we confirm it on a short
            call before you pay anything.
          </motion.p>
        </div>

        <div className="mt-14 grid items-stretch gap-4 lg:grid-cols-3">
          {TIERS.map((t, i) => (
            <motion.div
              key={t.id}
              className={`flex flex-col rounded-[24px] p-7 sm:p-8 ${
                t.featured
                  ? "bg-white text-navy-dark"
                  : "bg-white/[0.05] text-white ring-1 ring-white/[0.12]"
              }`}
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 + i * 0.08, ease }}
            >
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-[20px] font-semibold tracking-[-0.02em]">
                  {t.name}
                </h2>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] ${
                    t.featured
                      ? "bg-butter text-navy-dark"
                      : "bg-white/10 text-white/80"
                  }`}
                >
                  {t.tag}
                </span>
              </div>
              <p
                className={`mt-2 min-h-[44px] text-[14.5px] leading-snug ${t.featured ? "text-navy-dark/75" : "text-white/75"}`}
              >
                {t.blurb}
              </p>
              <p className="mt-6 flex items-baseline gap-2">
                <span
                  className={`text-[13px] ${t.featured ? "text-navy-dark/70" : "text-white/70"}`}
                >
                  from
                </span>
                <span className="text-[3rem] font-semibold leading-none tracking-[-0.045em] tabular-nums">
                  {t.price}
                </span>
                <span
                  className={`text-[14px] ${t.featured ? "text-navy-dark/70" : "text-white/70"}`}
                >
                  /month
                </span>
              </p>
              <button
                onClick={openBooking}
                className={`group mt-7 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[14.5px] font-semibold transition-colors ${
                  t.featured
                    ? "bg-navy-dark text-white hover:bg-black"
                    : "bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/15"
                }`}
              >
                {t.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <ul
                className={`mt-7 space-y-3 border-t pt-7 ${t.featured ? "border-line" : "border-white/10"}`}
              >
                {t.includes.map((x) => (
                  <li
                    key={x}
                    className={`flex gap-2.5 text-[14.5px] leading-snug ${t.featured ? "text-navy-dark/85" : "text-white/85"}`}
                  >
                    <Check
                      className={`mt-0.5 h-4 w-4 flex-none ${t.featured ? "text-verified" : "text-white"}`}
                    />
                    {x}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="mt-8 text-center text-[13.5px] text-white/75"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Every plan: month to month · no setup fee · 12 months of link
          monitoring
        </motion.p>
      </div>
    </section>

    {/* price by service */}
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16"
          {...rise()}
        >
          <div>
            <Eyebrow className="mb-4">By service</Eyebrow>
            <H2>
              Only need one thing?
              <br />
              <Soft>Here’s where it starts.</Soft>
            </H2>
          </div>
          <p className="text-[17px] leading-relaxed text-navy-dark/75">
            Services aren’t sold as add-ons. Each one starts in the plan that
            has room for it.
          </p>
        </motion.div>
        <motion.ul
          className="overflow-hidden rounded-3xl ring-1 ring-line"
          {...rise(0.05)}
        >
          {BY_SERVICE.map((s, i) => (
            <li key={s.t} className={i ? "border-t border-line" : ""}>
              <Link
                to={s.to}
                className="group grid gap-3 px-6 py-6 transition-colors hover:bg-mist sm:grid-cols-[1.1fr_1.1fr_auto] sm:items-center sm:gap-8 sm:px-8"
              >
                <span>
                  <span className="block text-[18px] font-semibold tracking-[-0.02em] text-navy-dark">
                    {s.t}
                  </span>
                  <span className="mt-1 block text-[14.5px] text-navy-dark/75">
                    {s.d}
                  </span>
                </span>
                <span className="text-[14px] text-navy-dark/75">{s.where}</span>
                <span className="flex items-center gap-4 sm:justify-end">
                  <span className="flex items-baseline gap-1.5">
                    {s.from !== "Custom" && (
                      <span className="text-[12.5px] text-navy-dark/70">
                        from
                      </span>
                    )}
                    <span className="text-[1.6rem] font-semibold leading-none tracking-[-0.04em] text-navy-dark tabular-nums">
                      {s.from}
                    </span>
                    {s.from !== "Custom" && (
                      <span className="text-[12.5px] text-navy-dark/70">
                        /mo
                      </span>
                    )}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-navy-dark/40 transition-colors group-hover:text-navy-dark" />
                </span>
              </Link>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>

    {/* full comparison */}
    <section className="bg-mist py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div className="mb-10" {...rise()}>
          <Eyebrow className="mb-4">Compare plans</Eyebrow>
          <H2>Everything in each plan</H2>
        </motion.div>
        <motion.div
          className="overflow-x-auto rounded-3xl bg-white ring-1 ring-line"
          {...rise(0.05)}
        >
          <table className="w-full min-w-[680px] border-collapse">
            <thead>
              <tr className="border-b border-line">
                <th className="px-6 py-5 text-left text-[12px] font-semibold uppercase tracking-[0.12em] text-navy-dark/70">
                  What you get
                </th>
                {TIERS.map((t) => (
                  <th
                    key={t.id}
                    className={`w-[170px] px-3 py-5 text-center ${t.featured ? "bg-butter/40" : ""}`}
                  >
                    <span className="block text-[15px] font-semibold text-navy-dark">
                      {t.name}
                    </span>
                    <span className="mt-0.5 block text-[12.5px] font-normal text-navy-dark/70">
                      from {t.price}/mo
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((g) => (
                <Fragment key={g.group}>
                  <tr>
                    <td
                      colSpan={4}
                      className="bg-mist/70 px-6 py-3 text-[12.5px] font-semibold uppercase tracking-[0.1em] text-navy-dark"
                    >
                      {g.group}
                    </td>
                  </tr>
                  {g.rows.map((r) => (
                    <tr key={r.label} className="border-t border-line">
                      <td className="px-6 py-3.5 text-[14.5px] text-navy-dark/85">
                        {r.label}
                      </td>
                      <td className="px-3 py-3.5 text-center">
                        <CellView v={r.s} />
                      </td>
                      <td className="bg-butter/40 px-3 py-3.5 text-center">
                        <CellView v={r.g} featured />
                      </td>
                      <td className="px-3 py-3.5 text-center">
                        <CellView v={r.a} />
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>

    {/* included in every plan */}
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="mb-12 max-w-3xl" {...rise()}>
          <Eyebrow className="mb-4">In every plan</Eyebrow>
          <H2>
            The terms,
            <br />
            <Soft>in plain words.</Soft>
          </H2>
        </motion.div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {INCLUDED.map((x, i) => (
            <motion.li
              key={x.t}
              className="rounded-3xl bg-mist p-6 ring-1 ring-line"
              {...rise(i * 0.06)}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-verified/[0.12]">
                <Check className="h-4 w-4 text-verified" />
              </span>
              <h3 className="mt-5 text-[17px] font-semibold tracking-[-0.02em] text-navy-dark">
                {x.t}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-navy-dark/75">
                {x.d}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>

    {/* what changes the quote */}
    <section className="bg-mist py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16"
          {...rise()}
        >
          <div>
            <Eyebrow className="mb-4">Your quote</Eyebrow>
            <H2>
              Five things move the number.
              <br />
              <Soft>We’ll show you which.</Soft>
            </H2>
          </div>
          <p className="text-[17px] leading-relaxed text-navy-dark/75">
            The starting price assumes a typical niche and mid-range authority.
            Your quote shows how each of these applies to you.
          </p>
        </motion.div>
        <ul className="divide-y divide-line overflow-hidden rounded-3xl bg-white ring-1 ring-line">
          {DRIVERS.map((d, i) => (
            <motion.li
              key={d.k}
              className="grid gap-2 px-6 py-5 sm:grid-cols-[0.6fr_1.4fr_auto] sm:items-center sm:gap-8 sm:px-8"
              {...rise(i * 0.04)}
            >
              <span className="text-[17px] font-semibold tracking-[-0.02em] text-navy-dark">
                {d.k}
              </span>
              <span className="text-[15px] leading-relaxed text-navy-dark/75">
                {d.d}
              </span>
              <span className="w-fit rounded-full bg-mist px-3 py-1.5 text-[12.5px] font-semibold text-navy-dark ring-1 ring-line">
                {d.e}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>

    {/* one client voice */}
    <section className="bg-white py-24">
      <motion.figure
        className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8"
        {...rise()}
      >
        <blockquote className="text-[1.7rem] font-medium leading-[1.25] tracking-[-0.035em] text-navy-dark sm:text-[2.3rem]">
          “Theirs was the only quote that explained what drives the price. No
          surprises on an invoice since.”
        </blockquote>
        <figcaption className="mt-6 text-[14px] text-navy-dark/70">
          Marketing Manager, e-commerce brand ·{" "}
          <span className="font-semibold uppercase tracking-[0.1em] text-[11.5px]">
            Sample quote
          </span>
        </figcaption>
      </motion.figure>
    </section>

    <ServiceFaq
      eyebrow="FAQ"
      h2a="Questions"
      h2b="about pricing."
      side="Tell us your site and goals, and we’ll give you a quote with the reasoning behind every number."
      faqs={FAQS}
      bg="bg-mist"
    />
  </PageLayout>
);

export default Pricing;
