import { Fragment, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";
import {
  GuaranteeBand,
  GuaranteeChips,
  GuaranteeTerms,
} from "@/components/Guarantees";
import { Avatar } from "@/components/proof";
import { openBooking } from "@/lib/booking";
import { caseBySlug } from "@/lib/cases";
import {
  PER_LINK,
  PLANS,
  TRIAL_PRICE,
  orderUrl,
  planPrice,
  usd,
  type Plan,
} from "@/lib/pricing";
import { LogoStrip } from "@/sections/ClientLogos";
import ProofGrid from "@/sections/ProofGrid";
import { ReviewBadges, ReviewWall } from "@/sections/Testimonials";
import { DarkGlow, Eyebrow, H2, Soft, ease, rise } from "./services/kit";
import { ServiceFaq } from "./services/common";

/**
 * /pricing, round 13, on Amplemarket's pricing structure (the owner's
 * brief, 31 Oct 2026):
 *   1. short package cards on a dark stage, with ticks and crosses and the
 *      guarantees as highlights; the $200 trial link as a slim bar above them;
 *   2. one client quote, under the client logos;
 *   3. the comparison, line by line;
 *   4. real results (the homepage bento);
 *   5. client reviews (the homepage review wall).
 * Then the guarantees in full (#guarantee-terms, linked from /terms), the
 * services priced separately, and questions.
 *
 * Round 9's "three steps", "the terms in plain words" and "five things move
 * a custom quote" now live in the FAQ, word for word where possible, so the
 * page reads faster without losing anything. Prices come from lib/pricing.ts.
 */

/* --------------------------------------------------------------- the cards */

/** one line under each package name */
const TAGLINE: Record<Plan["id"] | "custom", string> = {
  starter: "See the quality for yourself, on one or two key pages.",
  growth: "Steady authority for a handful of pages.",
  authority: "High-traffic sites for keywords where competitors are strong.",
  custom: "Your mix of links, PR and mentions, built around a goal.",
};

type Line = { t: string; no?: boolean };
type Group = { t: string; dot: string; lines: Line[] };

const DOT = {
  links: "rgb(var(--plume-warm))",
  work: "rgb(var(--plume-cool))",
  safe: "rgb(var(--verified))",
  out: "rgb(255 255 255 / 0.35)",
};

const planGroups = (p: Plan): Group[] => [
  {
    t: "The links",
    dot: DOT.links,
    lines: [
      { t: `${p.links} editorial placements` },
      { t: "DR 40+, relevant to your niche" },
      { t: `Sites averaging ${p.traffic} visits a month` },
    ],
  },
  {
    t: "Done for you",
    dot: DOT.work,
    lines: [
      { t: "Every site checked by hand" },
      { t: "Articles written and published" },
      { t: "Report with every live URL" },
    ],
  },
  {
    t: "Guaranteed",
    dot: DOT.safe,
    lines: [{ t: "100% money-back guarantee" }, { t: "Free link replacement" }],
  },
  {
    t: "Not in packages",
    dot: DOT.out,
    lines: [{ t: "PR and brand mentions", no: true }],
  },
];

const CUSTOM_GROUPS: Group[] = [
  {
    t: "Your mix",
    dot: DOT.links,
    lines: [
      { t: "More than 10 links, or a monthly plan" },
      { t: "Higher traffic or DR targets" },
      { t: "A specific niche or country" },
      { t: "Links plus PR and brand mentions" },
    ],
  },
  {
    t: "Guaranteed",
    dot: DOT.safe,
    lines: [{ t: "100% money-back guarantee" }, { t: "Free link replacement" }],
  },
];

const Diamond = ({ color }: { color: string }) => (
  <span
    className="h-2 w-2 flex-none rotate-45 rounded-[1px]"
    style={{ background: color }}
    aria-hidden="true"
  />
);

const Groups = ({ groups, light }: { groups: Group[]; light: boolean }) => (
  <div className="space-y-4">
    {groups.map((g) => (
      <div key={g.t}>
        <p
          className={`flex items-center gap-2 text-[13px] font-semibold ${
            light ? "text-navy-dark" : "text-white"
          }`}
        >
          <Diamond color={light && g.dot === DOT.out ? "rgb(var(--ink) / 0.3)" : g.dot} />
          {g.t}
        </p>
        <ul className="mt-2 space-y-1.5 pl-4">
          {g.lines.map((l) => (
            <li
              key={l.t}
              className={`flex items-start gap-2 text-[13.5px] leading-snug ${
                l.no
                  ? light
                    ? "text-navy-dark/45"
                    : "text-white/45"
                  : light
                    ? "text-navy-dark/80"
                    : "text-white/80"
              }`}
            >
              {l.no ? (
                <X className="mt-[2px] h-3.5 w-3.5 flex-none" aria-label="Not included" />
              ) : (
                <Check
                  className={`mt-[2px] h-3.5 w-3.5 flex-none ${light ? "text-verified" : "text-white/70"}`}
                  aria-hidden="true"
                />
              )}
              {l.t}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const Card = ({
  name,
  tag,
  tagline,
  price,
  sub,
  featured = false,
  custom = false,
  groups,
  cta,
  delay,
}: {
  name: string;
  tag?: string;
  tagline: string;
  price: string;
  sub: ReactNode;
  featured?: boolean;
  custom?: boolean;
  groups: Group[];
  cta: ReactNode;
  delay: number;
}) => (
  <motion.div
    className={`flex flex-col rounded-[24px] p-6 sm:p-7 ${
      featured
        ? "bg-white text-navy-dark shadow-[0_40px_80px_-40px_rgb(0_0_0/0.8)]"
        : custom
          ? "bg-[linear-gradient(160deg,rgb(var(--plume-warm)/0.2),rgb(var(--plume-cool)/0.22))] text-white ring-1 ring-white/[0.14]"
          : "bg-white/[0.04] text-white ring-1 ring-white/[0.1]"
    }`}
    initial={{ opacity: 0, y: 26 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay, ease }}
  >
    <div className="flex items-center gap-2.5">
      <h2 className="text-[19px] font-semibold tracking-[-0.02em]">{name}</h2>
      {tag && (
        <span
          className={`rounded-md px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.08em] ${
            featured ? "bg-butter text-navy-dark" : "bg-white/10 text-white/80"
          }`}
        >
          {tag}
        </span>
      )}
    </div>
    <p
      className={`mt-2 text-[14px] leading-snug lg:min-h-[2.8em] ${
        featured ? "text-navy-dark/70" : "text-white/70"
      }`}
    >
      {tagline}
    </p>
    <div className={`mt-5 border-t pt-5 ${featured ? "border-line" : "border-white/10"}`}>
      <p className="text-[2.6rem] font-semibold leading-none tracking-[-0.045em] tabular-nums">
        {price}
      </p>
      <div className={`mt-2.5 text-[13px] ${featured ? "text-navy-dark/70" : "text-white/70"}`}>
        {sub}
      </div>
    </div>
    <div className="mt-6">
      <Groups groups={groups} light={featured} />
    </div>
    <div className="mt-auto pt-8">{cta}</div>
  </motion.div>
);

/* ------------------------------------------------------------ comparison */

type Cell = boolean | string;
const COMPARE: { group: string; dot: string; rows: { label: string; v: Cell[] }[] }[] = [
  {
    group: "Price",
    dot: "rgb(var(--plume-warm))",
    rows: [
      { label: "Package price", v: [...PLANS.map(planPrice), "Quoted"] },
      { label: "Price per placement", v: [...PLANS.map(() => usd(PER_LINK)), "Depends on the mix"] },
      { label: "Setup fee", v: ["None", "None", "None", "None"] },
      { label: "Contract", v: ["None", "None", "None", "None"] },
      { label: "Order once or every month", v: [true, true, true, true] },
    ],
  },
  {
    group: "Placements",
    dot: "rgb(var(--plume-cool))",
    rows: [
      { label: "Editorial placements", v: [...PLANS.map((p) => String(p.links)), "Your call"] },
      { label: "Average organic traffic per site", v: [...PLANS.map((p) => `${p.traffic} / mo`), "To your brief"] },
      { label: "Authority (Ahrefs DR)", v: ["40+", "40+", "40+", "To your brief"] },
      { label: "Relevant to your niche", v: [true, true, true, true] },
      { label: "Dofollow link in the article body", v: [true, true, true, true] },
      { label: "Article written for you", v: [true, true, true, true] },
      { label: "7-point site check, by hand", v: [true, true, true, true] },
      { label: "PR and brand mentions", v: [false, false, false, true] },
    ],
  },
  {
    group: "Delivery and reporting",
    dot: "rgb(var(--mark))",
    rows: [
      { label: "Links live in", v: ["2–4 weeks", "2–4 weeks", "2–4 weeks", "Agreed per plan"] },
      { label: "Approve the sites before publishing", v: ["On request", "On request", "On request", "On request"] },
      { label: "Report with every live URL", v: [true, true, true, true] },
      { label: "White label for agencies", v: [true, true, true, true] },
      { label: "You keep the links and reports", v: [true, true, true, true] },
    ],
  },
  {
    group: "Guarantees",
    dot: "rgb(var(--verified))",
    rows: [
      { label: "100% money-back guarantee", v: [true, true, true, true] },
      { label: "Free link replacement, no time limit", v: [true, true, true, true] },
    ],
  },
];

const COLS = [
  ...PLANS.map((p) => ({ id: p.id, n: p.name, s: planPrice(p), f: !!p.featured })),
  { id: "custom", n: "Custom", s: "Quoted", f: false },
];

const CellView = ({ v }: { v: Cell }) =>
  v === true ? (
    <Check className="mx-auto h-4 w-4 text-navy-dark" aria-label="Included" />
  ) : v === false ? (
    <X className="mx-auto h-4 w-4 text-navy-dark/30" aria-label="Not included" />
  ) : (
    <span className="text-[13.5px] text-navy-dark/85">{v}</span>
  );

/* ------------------------------------------------------------ other offers */

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

/* --------------------------------------------------------------- questions */

const FAQS = [
  {
    q: "Why does the trial cost more than a standard placement?",
    a: `The trial is one link for new clients who want to see our work before a bigger order. It's the same placement with no minimum, priced a little higher (${usd(TRIAL_PRICE)}) on purpose so it can't be used as a repeat discount. One trial per company. After that, every placement is ${usd(PER_LINK)}.`,
  },
  {
    q: `What do I get for ${usd(PER_LINK)} a placement?`,
    a: "An editorial link on a relevant DR 40+ site, the article written by our team, the site checked by hand before we use it, and a report with the live URL. If the link is ever removed, we replace it free.",
  },
  {
    q: "How does ordering work?",
    a: "Pick a package and send your site, the pages you want to rank and any anchor text preferences. Not sure which package? Tell us your goal and we'll suggest one. We shortlist relevant sites, check each one by hand, write the articles and get them published with your links inside. Then you get the report: every live link with its details, indexed and ready to share. Unbranded, if you're an agency passing it to a client.",
  },
  {
    q: "Are the packages monthly or one-off?",
    a: "Either. Order a package once, or repeat it every month. There's no contract and no setup fee. If you want a fixed monthly plan with a different number of links, ask for a custom package.",
  },
  {
    q: "What's included in every package?",
    a: "No contract: order once or every month, and stop whenever you like. No setup fee: choosing the pages, the anchors and the first shortlist of sites is part of the order. Every site checked by hand: relevance first, then keywords, trend, audience, authority, indexing and editorial standards, and about one in five fails. Free link replacement if a publisher ever removes your link or turns it nofollow. And you keep everything: every placement and report is yours, with nothing behind a dashboard you lose access to.",
  },
  {
    q: "What does “average organic traffic per site” mean?",
    a: "It's the estimated monthly organic traffic of the sites in your package, from Ahrefs, averaged across the package. Some sites will be above it and some below, but the package as a whole meets it. Traffic estimates change over time, so we record them on the day your links go live.",
  },
  {
    q: "What changes the price of a custom package?",
    a: "Five things. Traffic and authority, the biggest factor: sites with 100,000+ visits a month or DR 70+ cost more to place on than the package averages. Volume: twenty or more links a month, or a plan across several clients, gets volume pricing. Niche: finance, health and crypto have fewer good sites willing to publish, which can raise the price. The mix: adding digital PR or brand mentions to links changes the scope, and the quote. Page readiness: thin target pages need work first, and we'll tell you before you pay, not after. A custom quote shows how each of these applies to you before you pay anything.",
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

/* ---------------------------------------------------------------- the page */

const btn = {
  light:
    "group flex w-full items-center justify-center gap-2 rounded-xl bg-navy-dark px-5 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-black",
  dark:
    "group flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-5 py-3.5 text-[14.5px] font-semibold text-white ring-1 ring-white/20 transition-colors hover:bg-white/15",
  white:
    "group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-[14.5px] font-semibold text-navy-dark transition-colors hover:bg-mark",
};

const Pricing = () => {
  const q = caseBySlug("agency-partner")?.testimonial;
  return (
    <PageLayout navOnDark>
      <Seo
        title="Link Building Pricing & Packages"
        description={`Packages of 3, 5 and 10 editorial links at ${usd(PER_LINK)} a link, a ${usd(TRIAL_PRICE)} trial link, or a custom package. No contract, no setup fee, 100% money-back guarantee.`}
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

      {/* 1. the packages, on a dark stage */}
      <section className="relative overflow-hidden bg-navy-dark pb-20 pt-32 lg:pb-28 lg:pt-40">
        <DarkGlow className="-left-40 top-10 h-[520px] w-[760px] opacity-55" />
        <DarkGlow className="-right-56 top-[900px] h-[460px] w-[700px] opacity-40" />
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
              relevant site, checked by hand, written and published for you.
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

          {/* the trial: one link first */}
          <motion.div
            className="mx-auto mt-14 flex max-w-5xl flex-col gap-4 rounded-2xl bg-white/[0.06] px-5 py-4 ring-1 ring-white/10 sm:px-6 md:flex-row md:items-center md:justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease }}
          >
            <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px] text-white/80">
              <span className="rounded-md bg-mark px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.08em] text-navy-dark">
                Trial
              </span>
              <span>
                Not ready for a package? Try one link first:{" "}
                <span className="font-semibold text-white">{usd(TRIAL_PRICE)}</span>, on a
                page you choose.
              </span>
            </p>
            <div className="flex flex-none flex-wrap gap-2">
              <Link
                to={orderUrl("trial")}
                className="group inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-[13.5px] font-semibold text-navy-dark transition-colors hover:bg-mark"
              >
                Order a trial link
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>

          {/* the packages, plus custom */}
          <div className="mt-4 grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-4">
            {PLANS.map((p, i) => (
              <Card
                key={p.id}
                name={p.name}
                tag={p.tag}
                tagline={TAGLINE[p.id]}
                price={planPrice(p)}
                sub={
                  <>
                    {p.links} placements · {usd(PER_LINK)} each
                  </>
                }
                featured={p.featured}
                groups={planGroups(p)}
                delay={0.25 + i * 0.08}
                cta={
                  <Link to={orderUrl(p.id)} className={p.featured ? btn.light : btn.dark}>
                    Order {p.name}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                }
              />
            ))}
            <Card
              name="Custom"
              tag="Your mix"
              tagline={TAGLINE.custom}
              price="Let's talk"
              sub="Quoted on a short call or by email"
              custom
              groups={CUSTOM_GROUPS}
              delay={0.49}
              cta={
                <div className="space-y-2">
                  <Link to={orderUrl("custom")} className={btn.white}>
                    <SlidersHorizontal className="h-4 w-4" />
                    Customize a package
                  </Link>
                  <button
                    onClick={openBooking}
                    className="flex w-full items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-[14px] font-semibold text-white ring-1 ring-white/25 transition-colors hover:bg-white/10"
                  >
                    <CalendarDays className="h-4 w-4" />
                    Or book a call
                  </button>
                </div>
              }
            />
          </div>

          <motion.p
            className="mt-8 text-center text-[13.5px] text-white/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Every package: order once or every month · no setup fee · no contract
          </motion.p>

          {/* 2. who orders, and one of them in her own words */}
          <div className="mt-20 border-t border-white/10 pt-14 lg:mt-24">
            <p className="text-center text-[13px] font-medium text-white/70">
              Brands and agencies that order from us
            </p>
            <LogoStrip dark className="mt-8" />
            {q && (
              <motion.figure className="mx-auto mt-16 max-w-3xl text-center" {...rise()}>
                <blockquote className="text-[1.5rem] font-medium leading-[1.3] tracking-[-0.03em] text-white sm:text-[1.95rem]">
                  &ldquo;{q.text}&rdquo;
                </blockquote>
                <figcaption className="mt-7 flex items-center justify-center gap-3">
                  <Avatar name={q.who} photo={q.photo} size={44} />
                  <span className="text-left text-[14px] text-white/70">
                    <span className="block font-semibold text-white">{q.who}</span>
                    {q.role}, white-label partner
                  </span>
                </figcaption>
              </motion.figure>
            )}
          </div>
        </div>
      </section>

      {/* 3. the comparison */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16"
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

          <motion.div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0" {...rise(0.05)}>
            <table className="w-full min-w-[720px] border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="sticky left-0 z-10 bg-white pb-6 pr-3 text-left align-bottom text-[12px] font-semibold uppercase tracking-[0.12em] text-navy-dark/60">
                    What you get
                  </th>
                  {COLS.map((c) => (
                    <th key={c.id} className="w-[142px] px-2 pb-6 text-center align-bottom">
                      <span className="block text-[15px] font-semibold text-navy-dark">{c.n}</span>
                      <span className="mt-0.5 block text-[12.5px] font-normal text-navy-dark/65">{c.s}</span>
                      <Link
                        to={orderUrl(c.id)}
                        className={`mt-3 inline-flex rounded-lg px-3.5 py-1.5 text-[12px] font-semibold transition-colors ${
                          c.f
                            ? "bg-navy-dark text-white hover:bg-black"
                            : "bg-mist text-navy-dark ring-1 ring-line hover:ring-navy-dark/30"
                        }`}
                      >
                        {c.id === "custom" ? "Ask us" : "Order"}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((g, gi) => (
                  <Fragment key={g.group}>
                    <tr>
                      <td colSpan={5} className={`pb-3 ${gi ? "pt-9" : "pt-2"}`}>
                        <span className="sticky left-0 flex w-fit items-center gap-2.5 bg-white pr-3 text-[17px] font-semibold tracking-[-0.01em] text-navy-dark">
                          <Diamond color={g.dot} />
                          {g.group}
                        </span>
                      </td>
                    </tr>
                    {g.rows.map((r, ri) => {
                      const band = ri % 2 === 0 ? "bg-mist" : "";
                      return (
                        <tr key={r.label}>
                          <td className={`sticky left-0 z-10 rounded-l-xl px-4 py-3.5 text-[14px] text-navy-dark/85 sm:px-5 sm:text-[14.5px] ${band || "bg-white"}`}>
                            {r.label}
                          </td>
                          {r.v.map((v, i) => (
                            <td
                              key={i}
                              className={`px-2 py-3.5 text-center ${band} ${i === r.v.length - 1 ? "rounded-r-xl" : ""}`}
                            >
                              <CellView v={v} />
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </motion.div>
          <p className="mt-6 text-[13px] leading-relaxed text-navy-dark/70">
            Traffic is the estimated monthly organic traffic from Ahrefs,
            averaged across the sites in your package and recorded on the day
            your links go live. DR is Ahrefs Domain Rating on the same day.
          </p>
        </div>
      </section>

      {/* every package carries the same four promises */}
      <GuaranteeBand />

      {/* 4. real results, then 5. reviews: the same proof as the homepage */}
      <ProofGrid />
      <ReviewWall />

      {/* the guarantees, in full */}
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

      <ServiceFaq
        eyebrow="FAQ"
        h2a="Questions"
        h2b="about pricing."
        side="Not sure which package fits? Send us your site and we'll tell you honestly."
        faqs={FAQS}
        bg="bg-white"
      />
    </PageLayout>
  );
};

export default Pricing;
