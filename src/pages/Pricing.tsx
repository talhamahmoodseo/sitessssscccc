import { Fragment } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  Minus,
  SlidersHorizontal,
} from "lucide-react";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";
import {
  GuaranteeBand,
  GuaranteeChips,
  GuaranteeTerms,
} from "@/components/Guarantees";
import { asset, openBooking } from "@/lib/booking";
import { caseBySlug } from "@/lib/cases";
import {
  PER_LINK,
  PLANS,
  TRIAL_PRICE,
  orderUrl,
  planPrice,
  usd,
} from "@/lib/pricing";
import { ReviewBadges } from "@/sections/Testimonials";
import { DarkGlow, Eyebrow, H2, Soft, ease, rise } from "./services/kit";
import { ServiceFaq } from "./services/common";

/**
 * /pricing (round 9: the round 6 layout restored, with the owner's prices).
 * Dark stage with the trial band and the four packages, then how ordering
 * works, the full comparison, the guarantees explained, other services,
 * the terms in plain words, what moves a custom quote, a client voice and
 * questions. Prices come from lib/pricing.ts.
 */

const TRIAL_INCLUDES = [
  "One editorial placement on a relevant DR 40+ site",
  "The article written for you",
  "A dofollow link in the body of the article",
  "The same 7-point site check and report",
];

const PLAN_INCLUDES = [
  "DR 40+ sites, relevant to your niche",
  "Every site checked by hand first",
  "Articles written for you",
  "Dofollow links in the article body",
  "Report with every live URL",
];

const CUSTOM_INCLUDES = [
  "More than 10 links, or a monthly plan",
  "Higher traffic or DR targets",
  "A specific niche or country",
  "Links plus PR and brand mentions",
];

const STEPS = [
  {
    n: "1",
    t: "Pick a package",
    d: "Send your site, the pages you want to rank and any anchor text preferences. Not sure which package? Tell us your goal and we'll suggest one.",
  },
  {
    n: "2",
    t: "We find, write and publish",
    d: "We shortlist relevant sites, check each one by hand, write the articles and get them published with your links inside.",
  },
  {
    n: "3",
    t: "You get the report",
    d: "Every live link with its details, indexed and ready to share. Unbranded, if you're an agency passing it to a client.",
  },
];

type Cell = boolean | string;
const COMPARE: { group: string; note?: string; rows: { label: string; v: Cell[] }[] }[] = [
  {
    group: "Price",
    rows: [
      { label: "Package price", v: [...PLANS.map(planPrice), "Quoted"] },
      { label: "Price per placement", v: [...PLANS.map(() => usd(PER_LINK)), "Depends on the mix"] },
      { label: "Setup fee", v: ["None", "None", "None", "None"] },
      { label: "Commitment", v: ["None", "None", "None", "None"] },
      { label: "Order once or every month", v: [true, true, true, true] },
    ],
  },
  {
    group: "Placements",
    rows: [
      { label: "Editorial placements", v: [...PLANS.map((p) => String(p.links)), "Your call"] },
      { label: "Minimum order", v: ["3 placements", "3 placements", "3 placements", "3 placements"] },
      { label: "Average organic traffic per site", v: [...PLANS.map((p) => `${p.traffic} / mo`), "To your brief"] },
      { label: "Authority (Ahrefs DR)", v: ["40+", "40+", "40+", "To your brief"] },
      { label: "Relevant to your niche", v: [true, true, true, true] },
      { label: "Dofollow link in the article body", v: [true, true, true, true] },
      { label: "Article written for you", v: [true, true, true, true] },
      { label: "7-point site check, by hand", v: [true, true, true, true] },
    ],
  },
  {
    group: "Delivery and reporting",
    rows: [
      { label: "Links live in", v: ["2–4 weeks", "2–4 weeks", "2–4 weeks", "Agreed per plan"] },
      { label: "Approve the sites before publishing", v: ["On request", "On request", "On request", "On request"] },
      { label: "Report with every live URL", v: [true, true, true, true] },
      { label: "White label for agencies", v: [true, true, true, true] },
      { label: "PR and brand mentions", v: [false, false, false, true] },
    ],
  },
  {
    group: "Guarantees",
    rows: [
      { label: "100% money-back guarantee", v: [true, true, true, true] },
      { label: "Free link replacement, no time limit", v: [true, true, true, true] },
    ],
  },
];

const OTHER = [
  {
    to: "/services/haro-links",
    t: "HARO & Expert Quotes",
    d: "Your experts quoted in stories that are already being written.",
    from: "$997",
    per: "/mo",
  },
  {
    to: "/services/brand-mentions",
    t: "Brand Mentions & AI visibility",
    d: "Mentions on the sources AI answers trust, tracked every month.",
    from: "$2,497",
    per: "/mo",
  },
  {
    to: "/services/digital-pr",
    t: "Digital PR",
    d: "Story-led campaigns on business and trade publications.",
    from: "$2,497",
    per: "/campaign",
  },
];

const INCLUDED = [
  {
    t: "No contract",
    d: "Order a package once, or the same one every month. Stop whenever you like.",
  },
  {
    t: "No setup fee",
    d: "Choosing the pages, the anchors and the first shortlist of sites is part of the order.",
  },
  {
    t: "Every site checked by hand",
    d: "Relevance first, then keywords, trend, audience, authority, indexing and editorial standards. About one in five fails.",
  },
  {
    t: "Free link replacement",
    d: "If a publisher ever removes your link or turns it nofollow, we replace it on a similar site for free.",
  },
  {
    t: "You keep everything",
    d: "Every placement and report is yours. Nothing sits behind a dashboard you lose access to.",
  },
];

const DRIVERS = [
  {
    k: "Traffic and authority",
    d: "Sites with 100,000+ visits a month or DR 70+ cost more to place on than the package averages.",
    e: "Biggest factor",
  },
  {
    k: "Volume",
    d: "Twenty or more links a month, or a plan across several clients, gets volume pricing.",
    e: "Cheaper per link",
  },
  {
    k: "Niche",
    d: "Finance, health and crypto have fewer good sites willing to publish, which can raise the price.",
    e: "Can add cost",
  },
  {
    k: "The mix",
    d: "Adding digital PR or brand mentions to links changes the scope, and the quote.",
    e: "Quoted together",
  },
  {
    k: "Page readiness",
    d: "Thin target pages need work first. We'll tell you before you pay, not after.",
    e: "May delay the start",
  },
];

const FAQS = [
  {
    q: "Why does the trial cost more than a standard placement?",
    a: `The trial is for new clients who want to see our work before a bigger order. It's the same placement with no minimum, priced a little higher (${usd(TRIAL_PRICE)}) on purpose so it can't be used as a repeat discount. One trial per company. After that, every placement is ${usd(PER_LINK)}.`,
  },
  {
    q: `What do I get for ${usd(PER_LINK)} a placement?`,
    a: "An editorial link on a relevant DR 40+ site, the article written by our team, the site checked by hand before we use it, and a report with the live URL. If the link is ever removed, we replace it free.",
  },
  {
    q: "Are the packages monthly or one-off?",
    a: "Either. Order a package once, or repeat it every month. There's no contract and no setup fee. If you want a fixed monthly plan with a different number of links, ask for a custom package.",
  },
  {
    q: "What does “average organic traffic per site” mean?",
    a: "It's the estimated monthly organic traffic of the sites in your package, from Ahrefs, averaged across the package. Some sites will be above it and some below, but the package as a whole meets it. Traffic estimates change over time, so we record them on the day your links go live.",
  },
  {
    q: "Can I approve the sites first?",
    a: "Yes. Tell us when you order and we'll send the shortlist before anything is published. If you'd rather not, we choose the sites for you.",
  },
  {
    q: "How long does it take?",
    a: "Most links go live within two to four weeks of your order.",
  },
  {
    q: "Do you guarantee rankings?",
    a: "No, and be careful with anyone who does. Nobody controls Google. We guarantee the work itself: placements that match what you ordered, or your money back, and a free replacement if a link is ever removed.",
  },
  {
    q: "Do you work with agencies?",
    a: "Yes, as well as brands. Everything can be delivered white label, with unbranded reports and no contact with your clients. If you need 20 or more links a month, ask us about volume pricing.",
  },
  {
    q: "Are there niches you don't take?",
    a: "We don't take adult, gambling or similar niches. If you're unsure about yours, ask before you order.",
  },
];

const CellView = ({ v, featured = false }: { v: Cell; featured?: boolean }) =>
  v === true ? (
    <Check
      className={`mx-auto h-4 w-4 ${featured ? "text-navy-dark" : "text-verified"}`}
      aria-label="Included"
    />
  ) : v === false ? (
    <Minus className="mx-auto h-4 w-4 text-navy-dark/30" aria-label="Not included" />
  ) : (
    <span className="text-[13.5px] text-navy-dark/85">{v}</span>
  );

const agencyQuote = () => caseBySlug("agency-partner")?.testimonial;

/* ---------------------------------- page ---------------------------------- */

const Pricing = () => {
  const q = agencyQuote();
  return (
    <PageLayout>
      <Seo
        title="Link Building Pricing & Packages"
        description={`Link building packages of 3, 5 and 10 editorial placements at ${usd(PER_LINK)} a link, a ${usd(TRIAL_PRICE)} trial placement, or a custom package. No contract, no setup fee, 100% money-back guarantee.`}
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Link building packages",
          provider: { "@type": "Organization", name: "Editorial HQ" },
          offers: [
            { "@type": "Offer", name: "Trial placement", price: String(TRIAL_PRICE), priceCurrency: "USD" },
            ...PLANS.map((p) => ({
              "@type": "Offer",
              name: `${p.name} package (${p.links} links)`,
              price: String(p.links * PER_LINK),
              priceCurrency: "USD",
            })),
          ],
        }}
      />

      {/* packages, on a dark stage */}
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
                Simple packages,
              </motion.span>
              <motion.span
                className="block pb-[0.06em] text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-[3.8rem] lg:text-[4.2rem]"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease }}
              >
                <span className="accent-ink-dark">out in the open.</span>
              </motion.span>
            </h1>
            <motion.p
              className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-white/75"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
            >
              Every placement is {usd(PER_LINK)}: an editorial link on a
              relevant site we've checked by hand, written and published for
              you. Try one first, pick a package, or build your own.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <GuaranteeChips dark className="mt-8 justify-center" />
              <ReviewBadges dark className="mt-4 justify-center" />
            </motion.div>
          </div>

          {/* the trial: the low-risk first step */}
          <motion.div
            className="mt-14 grid gap-6 rounded-[24px] bg-[rgb(var(--mark)/0.12)] p-7 ring-1 ring-mark/40 sm:p-8 lg:grid-cols-[1fr_1.3fr_auto] lg:items-center lg:gap-10"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease }}
          >
            <div>
              <span className="rounded-full bg-mark px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-navy-dark">
                Start here
              </span>
              <h2 className="mt-4 text-[22px] font-semibold tracking-[-0.02em] text-white">
                Trial placement
              </h2>
              <p className="mt-1 flex items-baseline gap-2">
                <span className="text-[2.6rem] font-semibold leading-none tracking-[-0.045em] text-white tabular-nums">
                  {usd(TRIAL_PRICE)}
                </span>
                <span className="text-[14px] text-white/70">one link</span>
              </p>
              <p className="mt-2 text-[13.5px] text-white/75">
                No minimum. One trial per company.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {TRIAL_INCLUDES.map((x) => (
                <li key={x} className="flex gap-2.5 text-[14.5px] leading-snug text-white/85">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-mark" />
                  {x}
                </li>
              ))}
            </ul>
            <Link
              to={orderUrl("trial")}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[14.5px] font-semibold text-navy-dark transition-colors hover:bg-mark"
            >
              Order a trial link
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          {/* the packages, plus custom */}
          <div className="mt-4 grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-4">
            {PLANS.map((p, i) => (
              <motion.div
                key={p.id}
                className={`flex flex-col rounded-[24px] p-7 ${
                  p.featured
                    ? "bg-white text-navy-dark"
                    : "bg-white/[0.05] text-white ring-1 ring-white/[0.12]"
                }`}
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 + i * 0.08, ease }}
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-[20px] font-semibold tracking-[-0.02em]">{p.name}</h2>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] ${
                      p.featured ? "bg-butter text-navy-dark" : "bg-white/10 text-white/80"
                    }`}
                  >
                    {p.tag}
                  </span>
                </div>
                <p className={`mt-2 min-h-[66px] text-[14px] leading-snug ${p.featured ? "text-navy-dark/75" : "text-white/75"}`}>
                  {p.blurb}
                </p>
                <p className="mt-5 flex items-baseline gap-2">
                  <span className="text-[2.9rem] font-semibold leading-none tracking-[-0.045em] tabular-nums">
                    {planPrice(p)}
                  </span>
                </p>
                <p className={`mt-2 text-[13.5px] ${p.featured ? "text-navy-dark/70" : "text-white/70"}`}>
                  {p.links} placements · {usd(PER_LINK)} each
                </p>
                <p
                  className={`mt-5 rounded-2xl px-4 py-3 text-[13px] leading-snug ${
                    p.featured ? "bg-mist text-navy-dark ring-1 ring-line" : "bg-white/[0.06] text-white/85"
                  }`}
                >
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] opacity-70">
                    Average traffic per site
                  </span>
                  <span className="mt-0.5 block text-[17px] font-semibold tabular-nums">
                    {p.traffic} visits / mo
                  </span>
                </p>
                <Link
                  to={orderUrl(p.id)}
                  className={`group mt-6 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[14.5px] font-semibold transition-colors ${
                    p.featured
                      ? "bg-navy-dark text-white hover:bg-black"
                      : "bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/15"
                  }`}
                >
                  Order {p.name}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <ul className={`mt-6 space-y-2.5 border-t pt-6 ${p.featured ? "border-line" : "border-white/10"}`}>
                  {[`${p.links} editorial placements`, ...PLAN_INCLUDES].map((x) => (
                    <li
                      key={x}
                      className={`flex gap-2.5 text-[14px] leading-snug ${p.featured ? "text-navy-dark/85" : "text-white/85"}`}
                    >
                      <Check className={`mt-0.5 h-4 w-4 flex-none ${p.featured ? "text-verified" : "text-white"}`} />
                      {x}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* custom */}
            <motion.div
              className="flex flex-col rounded-[24px] bg-[linear-gradient(160deg,rgb(var(--plume-warm)/0.22),rgb(var(--plume-cool)/0.22))] p-7 text-white ring-1 ring-white/[0.16]"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.49, ease }}
            >
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-[20px] font-semibold tracking-[-0.02em]">Custom</h2>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-white/80">
                  Your mix
                </span>
              </div>
              <p className="mt-2 min-h-[66px] text-[14px] leading-snug text-white/75">
                Need something the packages don't cover? Tell us what you
                need and we'll build the package around it.
              </p>
              <p className="mt-5 text-[2.9rem] font-semibold leading-none tracking-[-0.045em]">
                Let's talk
              </p>
              <p className="mt-2 text-[13.5px] text-white/70">Quoted on a short call or by email</p>
              <Link
                to={orderUrl("custom")}
                className="group mt-[4.75rem] inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[14.5px] font-semibold text-navy-dark transition-colors hover:bg-mark"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Customize package
              </Link>
              <button
                onClick={openBooking}
                className="mt-2.5 inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-[14px] font-semibold text-white ring-1 ring-white/25 transition-colors hover:bg-white/10"
              >
                <CalendarDays className="h-4 w-4" />
                Or book a call
              </button>
              <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-6">
                {CUSTOM_INCLUDES.map((x) => (
                  <li key={x} className="flex gap-2.5 text-[14px] leading-snug text-white/85">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-white" />
                    {x}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.p
            className="mt-8 text-center text-[13.5px] text-white/75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Every package: order once or every month · no setup fee · no
            contract · 100% money-back guarantee · free link replacement
          </motion.p>
        </div>
      </section>

      {/* how ordering works */}
      <section className="bg-white py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div className="mb-12 max-w-3xl" {...rise()}>
            <Eyebrow className="mb-4">How ordering works</Eyebrow>
            <H2>
              Three steps,
              <br />
              <Soft>most of them ours.</Soft>
            </H2>
          </motion.div>
          <ol className="grid gap-4 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <motion.li key={s.n} className="rounded-3xl bg-mist p-7 ring-1 ring-line" {...rise(i * 0.06)}>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-dark text-[15px] font-semibold text-white">
                  {s.n}
                </span>
                <h3 className="mt-6 text-[19px] font-semibold tracking-[-0.02em] text-navy-dark">{s.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-navy-dark/75">{s.d}</p>
              </motion.li>
            ))}
          </ol>
          <p className="mt-6 text-[14px] text-navy-dark/70">Most links go live within two to four weeks.</p>
        </div>
      </section>

      {/* full comparison */}
      <section className="bg-mist py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16"
            {...rise()}
          >
            <div>
              <Eyebrow className="mb-4">Compare packages</Eyebrow>
              <H2>
                Every package,
                <br />
                <Soft>side by side.</Soft>
              </H2>
            </div>
            <p className="text-[16px] leading-relaxed text-navy-dark/75">
              Same care in every package. What changes is how many links you
              get and how much traffic the sites bring in.
            </p>
          </motion.div>
          <motion.div className="overflow-x-auto rounded-3xl bg-white ring-1 ring-line" {...rise(0.05)}>
            <table className="w-full min-w-[760px] border-collapse">
              <thead>
                <tr className="border-b border-line">
                  <th className="px-6 py-5 text-left text-[12px] font-semibold uppercase tracking-[0.12em] text-navy-dark/70">
                    What you get
                  </th>
                  {[...PLANS.map((p) => ({ id: p.id, n: p.name, s: planPrice(p), f: p.featured })), { id: "custom", n: "Custom", s: "Quoted", f: false }].map((t) => (
                    <th key={t.id} className={`w-[150px] px-3 py-5 text-center ${t.f ? "bg-butter/40" : ""}`}>
                      <span className="block text-[15px] font-semibold text-navy-dark">{t.n}</span>
                      <span className="mt-0.5 block text-[12.5px] font-normal text-navy-dark/70">{t.s}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((g) => (
                  <Fragment key={g.group}>
                    <tr>
                      <td colSpan={5} className="bg-mist/70 px-6 py-3 text-[12.5px] font-semibold uppercase tracking-[0.1em] text-navy-dark">
                        {g.group}
                      </td>
                    </tr>
                    {g.rows.map((r) => (
                      <tr key={r.label} className="border-t border-line">
                        <td className="px-6 py-3.5 text-[14.5px] text-navy-dark/85">{r.label}</td>
                        {r.v.map((v, i) => (
                          <td key={i} className={`px-3 py-3.5 text-center ${PLANS[i]?.featured ? "bg-butter/40" : ""}`}>
                            <CellView v={v} featured={PLANS[i]?.featured} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </motion.div>
          <p className="mt-4 text-[13px] leading-relaxed text-navy-dark/70">
            Traffic is the estimated monthly organic traffic from Ahrefs,
            averaged across the sites in your package and recorded on the day
            your links go live. DR is Ahrefs Domain Rating on the same day.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to={orderUrl("growth")}
              className="group inline-flex items-center gap-2 rounded-full bg-navy-dark px-6 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-black"
            >
              Order Growth
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to={orderUrl("custom")}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[14.5px] font-semibold text-navy-dark ring-1 ring-line transition-colors hover:ring-navy-dark/30"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Customize a package
            </Link>
          </div>
        </div>
      </section>

      {/* the guarantees, explained */}
      <GuaranteeBand terms={false} />
      <GuaranteeTerms />

      {/* other services */}
      <section className="bg-mist py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16"
            {...rise()}
          >
            <div>
              <Eyebrow className="mb-4">Priced separately</Eyebrow>
              <H2>
                PR and AI visibility
                <br />
                <Soft>run as campaigns.</Soft>
              </H2>
            </div>
            <p className="text-[17px] leading-relaxed text-navy-dark/75">
              These aren't per-link services, so they're scoped to your goals.
              You can also combine them with links in a custom package.
            </p>
          </motion.div>
          <motion.ul className="overflow-hidden rounded-3xl bg-white ring-1 ring-line" {...rise(0.05)}>
            {OTHER.map((s, i) => (
              <li key={s.t} className={i ? "border-t border-line" : ""}>
                <Link
                  to={s.to}
                  className="group grid gap-3 px-6 py-6 transition-colors hover:bg-mist sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8 sm:px-8"
                >
                  <span>
                    <span className="block text-[18px] font-semibold tracking-[-0.02em] text-navy-dark">{s.t}</span>
                    <span className="mt-1 block text-[14.5px] text-navy-dark/75">{s.d}</span>
                  </span>
                  <span className="flex items-center gap-4 sm:justify-end">
                    <span className="flex items-baseline gap-1.5">
                      <span className="text-[12.5px] text-navy-dark/70">from</span>
                      <span className="text-[1.6rem] font-semibold leading-none tracking-[-0.04em] text-navy-dark tabular-nums">
                        {s.from}
                      </span>
                      <span className="text-[12.5px] text-navy-dark/70">{s.per}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-navy-dark/40 transition-colors group-hover:text-navy-dark" />
                  </span>
                </Link>
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* the terms, in plain words */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div className="mb-12 max-w-3xl" {...rise()}>
            <Eyebrow className="mb-4">In every package</Eyebrow>
            <H2>
              The terms,
              <br />
              <Soft>in plain words.</Soft>
            </H2>
          </motion.div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {INCLUDED.map((x, i) => (
              <motion.li key={x.t} className="rounded-3xl bg-mist p-6 ring-1 ring-line" {...rise(i * 0.06)}>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-verified/[0.12]">
                  <Check className="h-4 w-4 text-verified" />
                </span>
                <h3 className="mt-5 text-[17px] font-semibold tracking-[-0.02em] text-navy-dark">{x.t}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-navy-dark/75">{x.d}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* what moves a custom quote */}
      <section className="bg-mist py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16"
            {...rise()}
          >
            <div>
              <Eyebrow className="mb-4">Custom packages</Eyebrow>
              <H2>
                Five things move a custom quote.
                <br />
                <Soft>We'll show you which.</Soft>
              </H2>
            </div>
            <p className="text-[17px] leading-relaxed text-navy-dark/75">
              The packages above have fixed prices. A custom quote shows how
              each of these applies to you, before you pay anything.
            </p>
          </motion.div>
          <ul className="divide-y divide-line overflow-hidden rounded-3xl bg-white ring-1 ring-line">
            {DRIVERS.map((d, i) => (
              <motion.li
                key={d.k}
                className="grid gap-2 px-6 py-5 sm:grid-cols-[0.6fr_1.4fr_auto] sm:items-center sm:gap-8 sm:px-8"
                {...rise(i * 0.04)}
              >
                <span className="text-[17px] font-semibold tracking-[-0.02em] text-navy-dark">{d.k}</span>
                <span className="text-[15px] leading-relaxed text-navy-dark/75">{d.d}</span>
                <span className="w-fit rounded-full bg-mist px-3 py-1.5 text-[12.5px] font-semibold text-navy-dark ring-1 ring-line">
                  {d.e}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* one client voice */}
      {q && (
        <section className="bg-white py-24">
          <motion.figure className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8" {...rise()}>
            <blockquote className="text-[1.6rem] font-medium leading-[1.28] tracking-[-0.035em] text-navy-dark sm:text-[2.1rem]">
              “{q.text}”
            </blockquote>
            <figcaption className="mt-7 flex items-center justify-center gap-3">
              {q.photo && (
                <img src={asset(q.photo)} alt={q.who} loading="lazy" className="h-11 w-11 rounded-full object-cover" />
              )}
              <span className="text-left text-[14px] text-navy-dark/70">
                <span className="block font-semibold text-navy-dark">{q.who}</span>
                {q.role}
              </span>
            </figcaption>
          </motion.figure>
        </section>
      )}

      <ServiceFaq
        eyebrow="FAQ"
        h2a="Questions"
        h2b="about pricing."
        side="Not sure which package fits? Send us your site and we'll tell you honestly."
        faqs={FAQS}
        bg="bg-mist"
      />
    </PageLayout>
  );
};

export default Pricing;
