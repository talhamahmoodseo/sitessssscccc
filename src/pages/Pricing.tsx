import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";
import {
  GuaranteeBand,
  GuaranteeChips,
  GuaranteeTerms,
} from "@/components/Guarantees";
import { DarkGlow, Eyebrow, H2, Soft, ease, rise } from "./services/kit";
import { ServiceFaq } from "./services/common";

/**
 * /pricing. Round 7: priced per placement, like the agencies buyers compare
 * us with. A one-link trial to test quality, packs from five links, a price
 * list by authority, three ordering steps, then the guarantees and their
 * terms. Prices are the owner's (approved round 7); change them here, in
 * content/linkBuilding.ts (pricing strip + FAQ), sections/FAQ.tsx and the
 * package list in Contact.tsx together.
 */

const order = (pkg: string) => `/contact?package=${pkg}`;

const TRIAL = {
  price: "$129",
  includes: [
    "1 placement on a relevant DR 40+ site",
    "Article written for you",
    "Dofollow link in the body of the article",
    "Report with the live URL",
  ],
};

const PACKS = [
  {
    id: "starter",
    name: "Starter",
    links: 5,
    dr: "DR 40+",
    price: "$695",
    each: "$139",
    blurb: "A first batch of links for one site and a few key pages.",
    featured: false,
  },
  {
    id: "growth",
    name: "Growth",
    links: 10,
    dr: "DR 40+",
    price: "$1,290",
    each: "$129",
    blurb: "Enough links to move a set of pages, at our lowest rate per link.",
    featured: true,
  },
  {
    id: "authority",
    name: "Authority",
    links: 10,
    dr: "DR 50+",
    price: "$2,190",
    each: "$219",
    blurb: "Stronger sites for competitive pages and tougher keywords.",
    featured: false,
  },
];

const PACK_INCLUDES = [
  "Articles written for you",
  "Dofollow links in the body of the article",
  "A different site for every link",
  "Every site through the 7-Point Site Check",
  "White-label report with live URLs",
  "Most links live in 2–4 weeks",
];

/** single placements, by authority. Keys match PACKAGES in Contact.tsx. */
const PRICE_LIST = [
  { id: "dr30", dr: "DR 30+", price: "$110", use: "New sites and supporting blog posts" },
  {
    id: "dr40",
    dr: "DR 40+",
    price: "$150",
    use: "Most service pages and blog content",
    popular: true,
  },
  { id: "dr50", dr: "DR 50+", price: "$240", use: "Competitive service pages" },
  { id: "dr60", dr: "DR 60+", price: "$349", use: "Category pages and tougher keywords" },
  { id: "dr70", dr: "DR 70+", price: "$499", from: true, use: "Homepage and head terms" },
];

/** the side panel next to the price grid: what every placement comes with */
const EVERY_LINK = [
  "Live in 2–4 weeks",
  "DR guaranteed at the tier you order",
  "Article written by our team",
  "1 anchor and 1 target URL",
  "Dofollow, in the body of the article",
  "No duplicate domains",
  "White-label report",
  "Lifetime link guarantee",
  "100% money-back guarantee",
];

const STEPS = [
  {
    n: "1",
    t: "Place your order",
    d: "Pick a package and send us your target pages and anchor text. Not sure which to pick? Tell us your site and we'll suggest one.",
  },
  {
    n: "2",
    t: "We find the site and publish",
    d: "We pick a relevant site that passes our 7-Point Site Check, write the article and get it published with your link inside.",
  },
  {
    n: "3",
    t: "You get the report",
    d: "The live URL, the DR on the day it went live and whether Google has indexed it. Unbranded, if you're an agency.",
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

const FAQS = [
  {
    q: "Why start with a trial link?",
    a: "Because it's the easiest way to judge us. For $129 you get one DR 40+ placement, written and published, with the same guarantees as a big order. If you like what you see, order a pack. One trial per new client.",
  },
  {
    q: "How do I place an order?",
    a: "Choose a package and send us your target pages and anchors through the order form, or by email. We confirm the details and send an invoice. Work starts as soon as it's paid.",
  },
  {
    q: "Can I approve the sites first?",
    a: "Yes. Tell us when you order and we'll send the shortlist before anything is published. If you'd rather not, we pick the sites for you. That's what most clients do.",
  },
  {
    q: "What happens if a link gets removed?",
    a: "Every link has a lifetime guarantee. If a publisher removes it or turns it nofollow, at any point, we replace it on a site of the same or higher DR, free. The full terms are above.",
  },
  {
    q: "Do you guarantee rankings?",
    a: "No, and be wary of anyone who does. Nobody controls Google. We guarantee what we can control: the placements you order, at the authority you order, live for good, or your money back.",
  },
  {
    q: "Do you work white label for agencies?",
    a: "Yes, a lot of our orders come from agencies. Outreach under a neutral identity, unbranded reports and no contact with your clients. Ordering 20+ links a month? Ask about volume pricing.",
  },
  {
    q: "Do you run monthly campaigns?",
    a: "Yes. For ongoing link building, digital PR or brand mentions we run monthly campaigns, priced to your goals. Book a call and we'll put a plan together.",
  },
  {
    q: "Are there niches you don't take?",
    a: "We don't take adult, gambling or similar niches. If you're unsure about yours, ask before you order and we'll tell you honestly.",
  },
];

/* ---------------------------------- page ---------------------------------- */

const Pricing = () => (
  <PageLayout>
    <Seo
      title="Link Building Pricing: Trial Link & Packages"
      description="Link building priced per placement. Try one DR 40+ link for $129, or order packs from 5 links. 100% money-back guarantee, lifetime link guarantee, no PBNs."
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
              Simple pricing.
            </motion.span>
            <motion.span
              className="block text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.045em] text-white/60 sm:text-[3.8rem] lg:text-[4.2rem]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
            >
              Every link guaranteed.
            </motion.span>
          </h1>
          <motion.p
            className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-white/75"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            You pay per placement. Try one link first, then order in packs. If
            we can't deliver what you ordered, you get your money back.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <GuaranteeChips dark className="mt-8 justify-center" />
          </motion.div>
        </div>

        {/* the trial: one link, the low-risk first step */}
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
                {TRIAL.price}
              </span>
              <span className="text-[14px] text-white/70">one link</span>
            </p>
            <p className="mt-2 text-[13.5px] text-white/75">
              Test our quality before a bigger order. One per new client.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {TRIAL.includes.map((x) => (
              <li
                key={x}
                className="flex gap-2.5 text-[14.5px] leading-snug text-white/85"
              >
                <Check className="mt-0.5 h-4 w-4 flex-none text-mark" />
                {x}
              </li>
            ))}
          </ul>
          <Link
            to={order("trial")}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[14.5px] font-semibold text-navy-dark transition-colors hover:bg-mark"
          >
            Order a trial link
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* packs */}
        <div
          id="packs"
          className="mt-4 grid scroll-mt-24 items-stretch gap-4 lg:grid-cols-3"
        >
          {PACKS.map((p, i) => (
            <motion.div
              key={p.id}
              className={`flex flex-col rounded-[24px] p-7 sm:p-8 ${
                p.featured
                  ? "bg-white text-navy-dark"
                  : "bg-white/[0.05] text-white ring-1 ring-white/[0.12]"
              }`}
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 + i * 0.08, ease }}
            >
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-[20px] font-semibold tracking-[-0.02em]">
                  {p.name}
                </h2>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] ${
                    p.featured
                      ? "bg-butter text-navy-dark"
                      : "bg-white/10 text-white/80"
                  }`}
                >
                  {p.featured ? "Most popular" : `${p.links} links`}
                </span>
              </div>
              <p
                className={`mt-2 min-h-[44px] text-[14.5px] leading-snug ${p.featured ? "text-navy-dark/75" : "text-white/75"}`}
              >
                {p.blurb}
              </p>

              {/* what you get, in one line */}
              <p
                className={`mt-6 text-[15px] font-semibold ${p.featured ? "text-navy-dark" : "text-white"}`}
              >
                {p.links} placements · {p.dr}
              </p>
              <p className="mt-2 flex items-baseline gap-2">
                <span className="text-[3rem] font-semibold leading-none tracking-[-0.045em] tabular-nums">
                  {p.price}
                </span>
                <span
                  className={`text-[14px] ${p.featured ? "text-navy-dark/70" : "text-white/70"}`}
                >
                  {p.each} per link
                </span>
              </p>

              <Link
                to={order(p.id)}
                className={`group mt-7 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[14.5px] font-semibold transition-colors ${
                  p.featured
                    ? "bg-navy-dark text-white hover:bg-black"
                    : "bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/15"
                }`}
              >
                Order {p.name}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <ul
                className={`mt-7 space-y-3 border-t pt-7 ${p.featured ? "border-line" : "border-white/10"}`}
              >
                {PACK_INCLUDES.map((x) => (
                  <li
                    key={x}
                    className={`flex gap-2.5 text-[14.5px] leading-snug ${p.featured ? "text-navy-dark/85" : "text-white/85"}`}
                  >
                    <Check
                      className={`mt-0.5 h-4 w-4 flex-none ${p.featured ? "text-verified" : "text-white"}`}
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
          Prices in USD · no contract · no setup fee · single links from $110,
          priced by authority below
        </motion.p>
      </div>
    </section>

    {/* single placements: one card per authority tier, like the price grids
        buyers know from other agencies, with what every link includes */}
    <section className="bg-mist py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16"
          {...rise()}
        >
          <div>
            <Eyebrow className="mb-4">Single placements</Eyebrow>
            <H2>
              Pick your authority.
              <br />
              <Soft>Pay per placement.</Soft>
            </H2>
          </div>
          <p className="text-[17px] leading-relaxed text-navy-dark/75">
            Any quantity, any mix. Every link gets the same content, site check,
            report and guarantees as a pack.
          </p>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRICE_LIST.map((r, i) => (
              <motion.li
                key={r.id}
                className={`relative flex flex-col overflow-hidden rounded-3xl ${
                  r.popular
                    ? "bg-navy-dark text-white"
                    : "bg-white text-navy-dark ring-1 ring-line"
                }`}
                {...rise(i * 0.04)}
              >
                {r.popular && (
                  <span className="absolute right-4 top-4 rounded-full bg-mark px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.08em] text-navy-dark">
                    Most popular
                  </span>
                )}
                <div
                  className={`px-6 pb-5 pt-6 ${r.popular ? "bg-white/[0.06]" : "bg-mist/60"}`}
                >
                  <p className="text-[22px] font-semibold tracking-[-0.03em]">
                    {r.dr}
                  </p>
                  <p
                    className={`mt-1 min-h-[40px] text-[13.5px] leading-snug ${r.popular ? "text-white/70" : "text-navy-dark/70"}`}
                  >
                    {r.use}
                  </p>
                </div>
                <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
                  <p className="flex items-baseline gap-1.5">
                    {r.from && (
                      <span
                        className={`text-[13px] ${r.popular ? "text-white/70" : "text-navy-dark/70"}`}
                      >
                        from
                      </span>
                    )}
                    <span className="text-[2.2rem] font-semibold leading-none tracking-[-0.045em] tabular-nums">
                      {r.price}
                    </span>
                    <span
                      className={`text-[13.5px] ${r.popular ? "text-white/70" : "text-navy-dark/70"}`}
                    >
                      / placement
                    </span>
                  </p>
                  <Link
                    to={order(r.id)}
                    className={`mt-5 inline-flex items-center justify-center rounded-full px-5 py-3 text-[14px] font-semibold transition-colors ${
                      r.popular
                        ? "bg-mark text-navy-dark hover:bg-white"
                        : "ring-1 ring-navy-dark/20 hover:bg-navy-dark hover:text-white"
                    }`}
                  >
                    Order now
                  </Link>
                </div>
              </motion.li>
            ))}
            {/* sixth tile: point bigger orders at the packs */}
            <motion.li
              className="flex flex-col justify-between rounded-3xl bg-butter p-6"
              {...rise(0.2)}
            >
              <div>
                <p className="text-[22px] font-semibold tracking-[-0.03em] text-navy-dark">
                  5 links or more?
                </p>
                <p className="mt-2 text-[14px] leading-relaxed text-navy-dark/80">
                  Packs bring a DR 40+ link down to $129. Save up to 14% per
                  link.
                </p>
              </div>
              <a
                href="#packs"
                className="group mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-navy-dark"
              >
                See the packs
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </motion.li>
          </ul>

          {/* what's included */}
          <motion.aside
            className="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-7"
            {...rise(0.1)}
          >
            <p className="text-[18px] font-semibold tracking-[-0.02em] text-navy-dark">
              What every link includes
            </p>
            <ul className="mt-5 space-y-3">
              {EVERY_LINK.map((x) => (
                <li
                  key={x}
                  className="flex gap-2.5 text-[14.5px] leading-snug text-navy-dark/85"
                >
                  <Check className="mt-0.5 h-4 w-4 flex-none text-verified" />
                  {x}
                </li>
              ))}
            </ul>
            <a
              href="#guarantee-terms"
              className="group mt-6 inline-flex items-center gap-2 border-t border-line pt-5 text-[14px] font-semibold text-navy-dark"
            >
              Read the guarantee terms
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </motion.aside>
        </div>

        {/* bulk buyers */}
        <motion.div
          className="mt-4 flex flex-col items-start justify-between gap-4 rounded-3xl bg-white px-6 py-5 ring-1 ring-line sm:flex-row sm:items-center sm:px-8"
          {...rise(0.1)}
        >
          <p className="text-[15.5px] font-semibold text-navy-dark">
            Agency or bulk buyer? Ordering 20+ links a month gets you volume
            pricing.
          </p>
          <Link
            to={order("custom")}
            className="group inline-flex flex-none items-center gap-2 rounded-full bg-navy-dark px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-black"
          >
            Ask for volume pricing
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
        <p className="mt-5 text-[13.5px] text-navy-dark/70">
          DR is Ahrefs' Domain Rating, recorded on the day your link goes live.
        </p>
      </div>
    </section>

    {/* how ordering works */}
    <section className="bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="mb-12 max-w-3xl" {...rise()}>
          <Eyebrow className="mb-4">How ordering works</Eyebrow>
          <H2>
            Three steps.
            <br />
            <Soft>That's the whole process.</Soft>
          </H2>
        </motion.div>
        <ol className="grid gap-4 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <motion.li
              key={s.n}
              className="rounded-3xl bg-mist p-7 ring-1 ring-line"
              {...rise(i * 0.06)}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-dark text-[15px] font-semibold text-white">
                {s.n}
              </span>
              <h3 className="mt-6 text-[19px] font-semibold tracking-[-0.02em] text-navy-dark">
                {s.t}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-navy-dark/75">
                {s.d}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>

    <GuaranteeBand terms={false} />
    <GuaranteeTerms />

    {/* other services */}
    <section className="bg-mist py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="mb-12 max-w-3xl" {...rise()}>
          <Eyebrow className="mb-4">Beyond link building</Eyebrow>
          <H2>
            Need PR or AI visibility?
            <br />
            <Soft>These run as campaigns.</Soft>
          </H2>
        </motion.div>
        <motion.ul
          className="overflow-hidden rounded-3xl bg-white ring-1 ring-line"
          {...rise(0.05)}
        >
          {OTHER.map((s, i) => (
            <li key={s.t} className={i ? "border-t border-line" : ""}>
              <Link
                to={s.to}
                className="group grid gap-3 px-6 py-6 transition-colors hover:bg-mist sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8 sm:px-8"
              >
                <span>
                  <span className="block text-[18px] font-semibold tracking-[-0.02em] text-navy-dark">
                    {s.t}
                  </span>
                  <span className="mt-1 block text-[14.5px] text-navy-dark/75">
                    {s.d}
                  </span>
                </span>
                <span className="flex items-center gap-4 sm:justify-end">
                  <span className="flex items-baseline gap-1.5">
                    <span className="text-[12.5px] text-navy-dark/70">
                      from
                    </span>
                    <span className="text-[1.6rem] font-semibold leading-none tracking-[-0.04em] text-navy-dark tabular-nums">
                      {s.from}
                    </span>
                    <span className="text-[12.5px] text-navy-dark/70">
                      {s.per}
                    </span>
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
      side="Not sure which package fits? Send us your site and we'll suggest one. No obligation."
      faqs={FAQS}
      bg="bg-white"
    />
  </PageLayout>
);

export default Pricing;
