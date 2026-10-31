import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  MapPin,
  Minus,
  Quote,
  Star,
  X,
} from "lucide-react";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";
import { GuaranteeChips } from "@/components/Guarantees";
import { asset, openBooking } from "@/lib/booking";
import { caseBySlug } from "@/lib/cases";
import { PER_LINK, PLANS, TRIAL_PRICE, orderUrl, planPrice, usd } from "@/lib/pricing";
import { CARD, DarkGlow, Eyebrow, GlowPanel, H2, Soft, ease, rise } from "../services/kit";
import { ServiceFaq } from "../services/common";

/**
 * /industries/home-services (round 9 rewrite). Link building for roofers,
 * plumbers, HVAC, electricians and remodelers, and the agencies that market
 * them. Linked from the footer only, not the header.
 *
 * Story: the problem in an owner's words → how Google ranks local
 * businesses (its own published factors) → the links that work for each
 * trade → our site check through a local lens → timing around the busy
 * season → proof → the visitor's own numbers → agencies and fit → pricing
 * and guarantees → questions. No industry statistics we can't source.
 */

const TRADES = [
  "Roofing",
  "Plumbing",
  "HVAC",
  "Electrical",
  "Remodeling",
  "Landscaping",
  "Pest control",
  "Cleaning",
  "Garage doors",
  "Solar",
  "Pools",
  "Movers",
];

/* -------------------------------- hero card ------------------------------- */

const RESULTS = [
  { n: "Northside Roofing & Gutters", d: "northside•••roofing.com" },
  { n: "Find a Roofer (lead site)", d: "find•••pros.com" },
  { n: "Metro Roof Pros", d: "metro•••roofs.com" },
  { n: "City business directory", d: "local•••listings.com" },
  { n: "Your business", d: "yourroofing.com", you: true },
];

/** The order of RESULTS at each frame: your business climbs to the top. */
const FRAMES = [
  [0, 1, 2, 3, 4],
  [0, 1, 4, 2, 3],
  [4, 0, 1, 2, 3],
];
const FRAME_LABEL = ["Month 1", "Month 3", "Month 5"];

const ClimbCard = () => {
  const [f, setF] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setF((x) => (x + 1) % FRAMES.length), 2400);
    return () => clearInterval(id);
  }, []);
  return (
    <div className={`${CARD} overflow-hidden`}>
      <div className="flex items-center gap-3 border-b border-line px-5 py-3.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-mist">
          <MapPin className="h-3.5 w-3.5 text-navy-dark" />
        </span>
        <span className="truncate text-[13px] font-semibold text-navy-dark">
          roof replacement near me
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={f}
            className="ml-auto flex-none rounded-full bg-navy-dark px-2.5 py-1 text-[11px] font-semibold text-white"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.25 }}
          >
            {FRAME_LABEL[f]}
          </motion.span>
        </AnimatePresence>
      </div>
      <ol className="relative">
        {FRAMES[f].map((ri, pos) => {
          const r = RESULTS[ri];
          return (
            <motion.li
              key={r.n}
              layout
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className={`flex items-center gap-3 border-b border-line px-5 py-3 last:border-0 ${
                r.you ? "bg-butter/50" : "bg-white"
              }`}
            >
              <span className="w-5 text-[12px] font-bold tabular-nums text-navy-dark/55">
                {pos + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[11px] text-navy-dark/55">{r.d}</span>
                <span
                  className={`block truncate text-[14px] font-semibold ${r.you ? "text-navy-dark" : "text-[#1a0dab]/80"}`}
                >
                  {r.n}
                </span>
              </span>
              {r.you && (
                <span className="flex-none rounded-full bg-[linear-gradient(90deg,rgb(var(--plume-warm)),rgb(var(--plume-cool)))] px-2.5 py-1 text-[11px] font-semibold text-white">
                  {pos === 0 ? "Top spot" : "Climbing"}
                </span>
              )}
            </motion.li>
          );
        })}
      </ol>
      <p className="border-t border-line bg-mist px-5 py-2.5 text-[11.5px] text-navy-dark/60">
        Illustration of how local authority moves a service page up the
        results.
      </p>
    </div>
  );
};

/* ------------------------------ the problem ------------------------------ */

const PAINS = [
  {
    q: "I paid for the lead, and four other companies called that homeowner before I'd finished my coffee.",
    t: "Lead sites",
    d: "Shared leads are sold to several contractors at once. You're paying to enter a race.",
  },
  {
    q: "Our cost per click went up again this spring. Same jobs, bigger bill.",
    t: "Paid ads",
    d: "Ad prices are set by whoever bids most this week, and they stop working the day you stop paying.",
  },
  {
    q: "I searched for our own service in our own town, and a directory came up above us.",
    t: "Directories",
    d: "Big directories and lead sites have years of links. Your site has your phone number and a few reviews.",
  },
];

/* ---------------------------- google's factors ---------------------------- */

const FACTORS = [
  {
    k: "Relevance",
    d: "How well your business matches the search: your categories, your services and the pages on your site.",
    us: false,
  },
  {
    k: "Distance",
    d: "How far you are from the person searching. You can't change this one.",
    us: false,
  },
  {
    k: "Prominence",
    d: "How well known you are, including links, articles and reviews from across the web. This is the part we build.",
    us: true,
  },
];

/* --------------------------- links for each trade -------------------------- */

type Idea = { where: string; t: string; kind: string };
const PLAYBOOK: {
  trade: string;
  ideas: Idea[];
  pages: string[];
  searches: string[];
}[] = [
  {
    trade: "Roofing",
    ideas: [
      { where: "Local news site", t: "A storm-season guide to checking your roof, with you quoted as the local expert", kind: "Expert quote" },
      { where: "Home improvement site", t: "“How long does a roof really last?”, linking to your roof replacement page", kind: "Guest post" },
      { where: "Real estate blog", t: "What buyers should check on a roof before they make an offer", kind: "Guest post" },
      { where: "Manufacturer directory", t: "Your listing in a shingle maker's certified contractor finder", kind: "Partner listing" },
    ],
    pages: ["/roof-replacement", "/storm-damage-repair", "/roofing-[your-city]"],
    searches: ["roofer near me", "roof replacement cost", "storm damage roof repair", "metal roofing contractor"],
  },
  {
    trade: "HVAC",
    ideas: [
      { where: "Local news site", t: "Heat wave tips for keeping your AC running, quoting your lead technician", kind: "Expert quote" },
      { where: "Home energy site", t: "“Heat pump or furnace: which one saves more?”, linking to your installation page", kind: "Guest post" },
      { where: "Property management blog", t: "Planning HVAC maintenance across rental units", kind: "Guest post" },
      { where: "Equipment brand", t: "Your listing in the brand's dealer locator", kind: "Partner listing" },
    ],
    pages: ["/ac-repair", "/furnace-installation", "/hvac-[your-city]"],
    searches: ["ac repair near me", "furnace replacement cost", "heat pump installation", "hvac company [city]"],
  },
  {
    trade: "Plumbing",
    ideas: [
      { where: "Local news site", t: "Before the freeze: five ways to stop your pipes bursting", kind: "Expert quote" },
      { where: "Home maintenance site", t: "“What to do in the first ten minutes of a leak”, linking to your emergency page", kind: "Guest post" },
      { where: "Real estate blog", t: "Plumbing checks before you buy an older home", kind: "Niche edit" },
      { where: "Water heater brand", t: "Your listing in the brand's installer directory", kind: "Partner listing" },
    ],
    pages: ["/emergency-plumber", "/water-heater-installation", "/plumber-[your-city]"],
    searches: ["emergency plumber", "water heater replacement", "burst pipe repair", "drain cleaning near me"],
  },
  {
    trade: "Electrical",
    ideas: [
      { where: "Local news site", t: "Is your home ready for an EV charger? A local electrician explains", kind: "Expert quote" },
      { where: "Home tech site", t: "“Smart electrical panels, explained”, linking to your panel upgrade page", kind: "Guest post" },
      { where: "Real estate blog", t: "Old wiring red flags every home buyer should know", kind: "Niche edit" },
      { where: "EV charger brand", t: "Your listing in the brand's certified installer network", kind: "Partner listing" },
    ],
    pages: ["/ev-charger-installation", "/panel-upgrade", "/electrician-[your-city]"],
    searches: ["electrician near me", "ev charger installation", "panel upgrade cost", "house rewiring"],
  },
  {
    trade: "Remodeling",
    ideas: [
      { where: "City lifestyle magazine", t: "Kitchen trends local homeowners are choosing this year, featuring your work", kind: "Feature" },
      { where: "Home design site", t: "“What a bathroom remodel really costs”, linking to your pricing page", kind: "Guest post" },
      { where: "Real estate blog", t: "The remodels that add value before you sell", kind: "Guest post" },
      { where: "Showroom partner", t: "Your page on a cabinet or countertop supplier's installer list", kind: "Partner listing" },
    ],
    pages: ["/kitchen-remodeling", "/bathroom-remodel-cost", "/remodeling-[your-city]"],
    searches: ["kitchen remodel near me", "bathroom remodel cost", "home addition contractor", "remodeling company [city]"],
  },
];

const Playbook = () => {
  const [i, setI] = useState(0);
  const P = PLAYBOOK[i];
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16"
          {...rise()}
        >
          <div>
            <Eyebrow className="mb-4">What we'd build for you</Eyebrow>
            <H2>
              The links that work
              <br />
              <Soft>for your trade.</Soft>
            </H2>
          </div>
          <p className="text-[17px] leading-relaxed text-navy-dark/75">
            A link from a local paper or a home improvement site tells Google
            far more about a roofer than a link from a random tech blog. Pick
            your trade to see the kind of plan we'd put together.
          </p>
        </motion.div>

        <div className="mb-6" role="tablist" aria-label="Trades">
          <div className="flex flex-wrap gap-2">
            {PLAYBOOK.map((p, n) => (
              <button
                key={p.trade}
                role="tab"
                aria-selected={n === i}
                onClick={() => setI(n)}
                className={`rounded-full px-5 py-2.5 text-[14px] font-semibold transition-colors ${
                  n === i
                    ? "bg-navy-dark text-white"
                    : "bg-mist text-navy-dark/75 ring-1 ring-line hover:text-navy-dark"
                }`}
              >
                {p.trade}
              </button>
            ))}
          </div>
        </div>

        <GlowPanel tone={(["warm", "cool", "fresh", "rose", "warm"] as const)[i]} className="p-4 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={P.trade}
              className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease }}
            >
              <div className={`${CARD} p-5 sm:p-6`}>
                <p className="text-[13px] font-semibold text-navy-dark">
                  Where we'd look for placements
                </p>
                <ul className="mt-4 divide-y divide-line">
                  {P.ideas.map((x, n) => (
                    <motion.li
                      key={x.t}
                      className="grid gap-2 py-3.5 sm:grid-cols-[150px_1fr_auto] sm:items-center sm:gap-4"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.1 + n * 0.07 }}
                    >
                      <span className="text-[12.5px] font-semibold text-navy-dark/65">{x.where}</span>
                      <span className="text-[14.5px] leading-snug text-navy-dark">{x.t}</span>
                      <span className="w-fit rounded-full bg-mist px-2.5 py-1 text-[11.5px] font-semibold text-navy-dark/80 ring-1 ring-line">
                        {x.kind}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="grid gap-4">
                <div className={`${CARD} p-5 sm:p-6`}>
                  <p className="text-[13px] font-semibold text-navy-dark">Pages we'd push</p>
                  <ul className="mt-3 space-y-2">
                    {P.pages.map((p) => (
                      <li key={p} className="flex items-center gap-2 rounded-lg bg-mist px-3 py-2 text-[13px] font-medium text-navy-dark ring-1 ring-line">
                        <ArrowUpRight className="h-3.5 w-3.5 text-navy-dark/50" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`${CARD} p-5 sm:p-6`}>
                  <p className="text-[13px] font-semibold text-navy-dark">Searches we'd go after</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {P.searches.map((s) => (
                      <li key={s} className="rounded-full bg-[linear-gradient(90deg,rgb(var(--plume-warm)/0.12),rgb(var(--plume-cool)/0.12))] px-3 py-1 text-[12.5px] font-medium text-navy-dark">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </GlowPanel>
        <p className="mt-4 text-[13px] text-navy-dark/65">
          Examples of the placements we'd look for. Every real site still has
          to pass our site check before we use it.
        </p>
      </div>
    </section>
  );
};

/* ---------------------------- site check, local ---------------------------- */

const LOCAL_CHECKS: [string, string][] = [
  ["Relevance", "Is it about homes, your trade or your area?"],
  ["Keywords", "Does it rank for things homeowners actually search?"],
  ["Trend", "Steady rankings, not a site that crashed after an update"],
  ["Audience", "Readers in your country, ideally your region"],
  ["Authority", "DR 40+, from real links"],
  ["Indexed", "Its pages are in Google"],
  ["Editorial", "A real editor, not a “submit your business” form"],
];

const SiteCheck = () => (
  <section className="bg-mist py-24 lg:py-32">
    <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:px-8">
      <motion.div {...rise()}>
        <Eyebrow className="mb-4">Our site check, local edition</Eyebrow>
        <H2>
          Seven checks on every site.
          <br />
          <Soft>About one in five fails.</Soft>
        </H2>
        <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-navy-dark/75">
          Home services is full of paid directories and “best contractors”
          sites that sell a spot to anyone. They look fine in a tool and do
          nothing for you. We check every site by hand before it gets near
          your business.
        </p>
        <ol className="mt-8 space-y-2.5">
          {LOCAL_CHECKS.map(([k, d], i) => (
            <li key={k} className="flex gap-3">
              <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-navy-dark text-[11px] font-semibold text-white">
                {i + 1}
              </span>
              <span className="text-[15px] leading-snug text-navy-dark/80">
                <span className="font-semibold text-navy-dark">{k}.</span> {d}
              </span>
            </li>
          ))}
        </ol>
      </motion.div>
      <motion.div {...rise(0.1)}>
        <GlowPanel tone="fresh" className="p-4 sm:p-8">
          <div className="grid gap-4">
            {[
              {
                d: "springfield•••news.com",
                meta: "Local news · DR 54",
                ok: true,
                v: "Passed all 7 checks",
                notes: ["Covers homes and the local area", "Readers in your region", "Real editor and bylines"],
              },
              {
                d: "best•••contractors-hub.net",
                meta: "“Best contractors” directory · DR 61",
                ok: false,
                v: "Rejected · sells listings to anyone",
                notes: ["Ranks for nothing homeowners search", "A public price list for spots", "Most pages not indexed"],
              },
            ].map((s, n) => (
              <motion.div
                key={s.d}
                className={`${CARD} p-5 sm:p-6`}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.15 + n * 0.15, ease }}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span>
                    <span className="block text-[15px] font-semibold text-navy-dark">{s.d}</span>
                    <span className="block text-[12px] text-navy-dark/60">{s.meta}</span>
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-bold ${
                      s.ok ? "bg-verified/[0.12] text-verified" : "bg-gap/[0.12] text-gap"
                    }`}
                  >
                    {s.ok ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                    {s.v}
                  </span>
                </div>
                <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                  {s.notes.map((x) => (
                    <li key={x} className="rounded-xl bg-mist px-3 py-2 text-[12.5px] leading-snug text-navy-dark/75 ring-1 ring-line">
                      {x}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </GlowPanel>
      </motion.div>
    </div>
  </section>
);

/* --------------------------------- timing --------------------------------- */

const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
/** build months, busy months (0 = January). Northern hemisphere, typical. */
const SEASONS: [string, number[], number[]][] = [
  ["Air conditioning", [2, 3, 4], [5, 6, 7]],
  ["Heating", [7, 8, 9], [10, 11, 0, 1]],
  ["Roofing", [0, 1, 2], [3, 4, 5, 6, 7, 8, 9]],
  ["Frozen pipes", [8, 9, 10], [11, 0, 1]],
  ["Landscaping", [0, 1, 2], [3, 4, 5, 6, 7, 8]],
];

const Timing = () => (
  <section className="bg-white py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
        <motion.div {...rise()}>
          <Eyebrow className="mb-4">How it runs</Eyebrow>
          <H2>
            Build before the rush,
            <br />
            <Soft>not during it.</Soft>
          </H2>
          <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-navy-dark/75">
            Links take a few weeks to be picked up, and rankings take a few
            months to settle. So we plan your placements backwards from your
            busy season. When the calls start, the authority is already there.
          </p>
          <ol className="mt-8 space-y-3">
            {[
              ["Week 1", "A free audit: your links, your competitors' links, your pages"],
              ["Weeks 1–4", "Placements on local, home and trade sites"],
              ["Weeks 2–6", "Google finds and indexes them"],
              ["Months 2–4", "Your service and city pages start to move"],
            ].map(([w, t]) => (
              <li key={w} className="flex items-center gap-5 rounded-2xl bg-mist p-4 ring-1 ring-line">
                <span className="w-24 flex-none text-[12.5px] font-semibold uppercase tracking-[0.08em] text-navy-dark/60">
                  {w}
                </span>
                <span className="text-[15px] font-semibold text-navy-dark">{t}</span>
              </li>
            ))}
          </ol>
        </motion.div>

        <motion.div {...rise(0.1)}>
          <GlowPanel tone="warm" className="p-4 sm:p-8">
            <div className={`${CARD} overflow-x-auto p-5 sm:p-6`}>
              <div className="min-w-[520px]">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-[14px] font-semibold text-navy-dark">When to build, by season</p>
                  <span className="flex gap-4 text-[12px] text-navy-dark/70">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2.5 w-4 rounded-sm bg-[linear-gradient(90deg,rgb(var(--plume-warm)),rgb(var(--plume-cool)))]" />
                      Build links
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2.5 w-4 rounded-sm bg-navy-dark" />
                      Busy season
                    </span>
                  </span>
                </div>
                <div className="grid grid-cols-[120px_repeat(12,1fr)] gap-1">
                  <span />
                  {MONTHS.map((m, i) => (
                    <span key={i} className="text-center text-[11px] font-semibold text-navy-dark/50">
                      {m}
                    </span>
                  ))}
                  {SEASONS.map(([name, build, busy], r) => (
                    <div key={name} className="contents">
                      <span className="flex items-center text-[12.5px] font-semibold text-navy-dark">{name}</span>
                      {MONTHS.map((_, m) => (
                        <motion.span
                          key={m}
                          className={`h-7 rounded-md ${
                            build.includes(m)
                              ? "bg-[linear-gradient(90deg,rgb(var(--plume-warm)),rgb(var(--plume-cool)))]"
                              : busy.includes(m)
                                ? "bg-navy-dark"
                                : "bg-mist ring-1 ring-line"
                          }`}
                          initial={{ opacity: 0, scale: 0.6 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.2 + r * 0.08 + m * 0.02 }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-[12px] text-navy-dark/60">
                  Typical seasons in the northern hemisphere. Yours depend on
                  your region and trade, and we plan around them.
                </p>
              </div>
            </div>
          </GlowPanel>
        </motion.div>
      </div>
    </div>
  </section>
);

/* --------------------------------- proof --------------------------------- */

const Proof = () => {
  const st = caseBySlug("smiletutor")!;
  const df = caseBySlug("defender")!;
  return (
    <section className="bg-mist py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
          {...rise()}
        >
          <div className="max-w-3xl">
            <Eyebrow className="mb-4">Proof</Eyebrow>
            <H2>
              Proof from businesses
              <br />
              <Soft>that work in people's homes.</Soft>
            </H2>
          </div>
          <Link to="/case-studies" className="inline-flex flex-none items-center gap-2 text-[14.5px] font-semibold text-navy-dark">
            All case studies
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div {...rise()}>
            <Link
              to="/case-studies/smiletutor"
              className="group flex h-full flex-col rounded-[28px] bg-butter p-7 transition-transform duration-500 hover:-translate-y-1 sm:p-9"
            >
              <p className="text-[12.5px] font-semibold text-navy-dark/75">
                SmileTutor · a home tuition service, competing city-wide
              </p>
              <h3 className="mt-4 max-w-xl text-[1.9rem] font-semibold leading-[1.1] tracking-[-0.035em] text-navy-dark sm:text-[2.3rem]">
                Number one for “tuition” in the most crowded local market in Singapore
              </h3>
              <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-navy-dark/80">
                Like a plumber or a roofer, SmileTutor sends people into
                customers' homes, and it competes with directories and lead
                sites for the same searches. The same playbook took it to the
                top.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-2.5">
                {st.headline.slice(0, 3).map((h) => (
                  <div key={h.l} className="rounded-2xl bg-white/75 p-4">
                    <p className="text-[1.6rem] font-semibold leading-none tracking-[-0.04em] text-navy-dark sm:text-[2rem]">{h.v}</p>
                    <p className="mt-1.5 text-[12px] leading-snug text-navy-dark/75">{h.l}</p>
                  </div>
                ))}
              </div>
              <span className="mt-auto inline-flex items-center gap-2 pt-8 text-[14px] font-semibold text-navy-dark">
                Read the case study
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </motion.div>
          <motion.div {...rise(0.08)}>
            <Link
              to="/case-studies/defender"
              className="group flex h-full flex-col rounded-[28px] bg-navy-dark p-7 text-white transition-transform duration-500 hover:-translate-y-1 sm:p-9"
            >
              <p className="text-[12.5px] font-semibold text-white/70">Defender · home security cameras</p>
              <h3 className="mt-4 text-[1.7rem] font-semibold leading-[1.12] tracking-[-0.035em]">
                A new camera into the buyer's guides homeowners read
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-white/75">
                {df.headline[0].v} roundup and review placements for a product
                launch, on the “best security camera” lists people check
                before they buy.
              </p>
              {df.testimonial?.text && (
                <figure className="mt-6 rounded-2xl bg-white/[0.07] p-5 ring-1 ring-white/10">
                  <Quote className="h-5 w-5 text-mark" />
                  <blockquote className="mt-3 text-[15px] leading-relaxed text-white/90">
                    “{df.testimonial.text}”
                  </blockquote>
                  <figcaption className="mt-3 text-[12.5px] text-white/60">{df.testimonial.who}, {df.testimonial.role.toLowerCase()}</figcaption>
                </figure>
              )}
              <span className="mt-auto inline-flex items-center gap-2 pt-8 text-[14px] font-semibold text-white">
                Read the case study
                <ArrowRight className="h-4 w-4 text-mark transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------ calculator ----------------------------- */

const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

const Field = ({
  label,
  value,
  onChange,
  prefix,
  hint,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  prefix?: string;
  hint: string;
}) => (
  <label className="block">
    <span className="text-[13px] font-semibold text-white">{label}</span>
    <span className="mt-2 flex items-center rounded-xl bg-white/[0.08] px-4 ring-1 ring-white/15 focus-within:ring-white/50">
      {prefix && <span className="text-[16px] text-white/60">{prefix}</span>}
      <input
        type="number"
        min={0}
        inputMode="numeric"
        value={Number.isFinite(value) ? value : 0}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
        className="w-full bg-transparent px-1.5 py-3 text-[17px] font-semibold text-white focus:outline-none"
      />
    </span>
    <span className="mt-1.5 block text-[12px] text-white/55">{hint}</span>
  </label>
);

const Calculator = () => {
  const [job, setJob] = useState(1500);
  const [extra, setExtra] = useState(2);
  const [links, setLinks] = useState(5);
  const year = job * extra * 12;
  const cost = links * PER_LINK;
  const breakEven = job > 0 ? Math.max(1, Math.ceil(cost / job)) : 0;

  return (
    <section className="relative overflow-hidden bg-navy-dark py-24 lg:py-28">
      <DarkGlow className="-left-48 top-0 h-[520px] w-[760px] opacity-50" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:px-8">
        <motion.div {...rise()}>
          <Eyebrow dark className="mb-4">
            Run your own numbers
          </Eyebrow>
          <H2 dark>
            What one more job
            <br />
            <Soft dark>a month is worth.</Soft>
          </H2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-white/75">
            Put in your own figures. This isn't a forecast, and nobody can
            honestly promise how many calls a ranking brings. It shows how
            little extra work it takes for links to pay for themselves.
          </p>
        </motion.div>

        <motion.div
          className="rounded-[28px] bg-white/[0.05] p-6 ring-1 ring-white/[0.12] sm:p-8"
          {...rise(0.1)}
        >
          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Average job value" value={job} onChange={setJob} prefix="$" hint="What a typical job brings in" />
            <Field label="Extra jobs a month" value={extra} onChange={setExtra} hint="From ranking higher" />
            <Field label="Placements" value={links} onChange={setLinks} hint={`At ${usd(PER_LINK)} each`} />
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-5 text-navy-dark sm:col-span-2">
              <p className="text-[13px] text-navy-dark/70">Extra revenue in a year</p>
              <p className="accent-ink mt-1 text-[2.6rem] font-semibold leading-none tracking-[-0.05em] tabular-nums">
                {money(year)}
              </p>
            </div>
            <div className="rounded-2xl bg-white/[0.08] p-5 ring-1 ring-white/15">
              <p className="text-[13px] text-white/70">Cost of the links</p>
              <p className="mt-1 text-[1.9rem] font-semibold leading-none tracking-[-0.04em] text-white tabular-nums">
                {money(cost)}
              </p>
            </div>
          </div>
          <p className="mt-5 text-[14px] leading-relaxed text-white/75">
            {job > 0 && cost > 0 ? (
              <>
                At these figures, the links pay for themselves after{" "}
                <span className="font-semibold text-white">
                  {breakEven} {breakEven === 1 ? "job" : "jobs"}
                </span>
                , and they keep working after they're paid for.
              </>
            ) : (
              "Enter a job value and a number of placements to see the result."
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

/* ------------------------------ agencies + fit ------------------------------ */

const GOOD = [
  "You're an established business with crews to keep busy",
  "Your site has real service and location pages",
  "You'd rather own your rankings than keep renting leads",
  "You can plan a season ahead, not a week ahead",
];
const NOT = [
  "You need the phone to ring this week",
  "Your Google Business Profile isn't set up yet",
  "You're after the cheapest links you can find",
];

const Agencies = () => {
  const t = caseBySlug("agency-partner")?.testimonial;
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div className="relative overflow-hidden rounded-[28px] bg-navy-dark p-7 text-white sm:p-10" {...rise()}>
            <DarkGlow className="-right-40 -top-24 h-[360px] w-[520px] opacity-40" />
            <div className="relative">
              <Eyebrow dark className="mb-4">For agencies</Eyebrow>
              <h3 className="text-[2rem] font-semibold leading-[1.06] tracking-[-0.035em] sm:text-[2.4rem]">
                Got home services clients?
                <br />
                <span className="accent-ink-dark">We can be your link team.</span>
              </h3>
              <ul className="mt-7 space-y-3">
                {[
                  "One brief per client: trade, service area, target pages",
                  "Sites matched to each client's trade and region",
                  "Unbranded reports you can send as your own",
                  "We never contact your clients. NDA on request",
                ].map((x) => (
                  <li key={x} className="flex gap-2.5 text-[15px] leading-snug text-white/85">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-mark" />
                    {x}
                  </li>
                ))}
              </ul>
              {t?.text && (
                <figure className="mt-8 flex gap-4 rounded-2xl bg-white/[0.06] p-5 ring-1 ring-white/10">
                  {t.photo && <img src={asset(t.photo)} alt={t.who} loading="lazy" className="h-11 w-11 flex-none rounded-full object-cover" />}
                  <span>
                    <blockquote className="text-[14.5px] leading-relaxed text-white/90">“{t.text}”</blockquote>
                    <figcaption className="mt-2 text-[12.5px] text-white/60">{t.who}, {t.role.toLowerCase()}</figcaption>
                  </span>
                </figure>
              )}
              <Link to="/case-studies/agency-partner" className="mt-7 inline-flex items-center gap-2 text-[14px] font-semibold text-white">
                How we work with agencies
                <ArrowUpRight className="h-4 w-4 text-mark" />
              </Link>
            </div>
          </motion.div>
          <div className="grid gap-4">
            <motion.div className="rounded-[28px] bg-mist p-7 ring-1 ring-line sm:p-8" {...rise(0.06)}>
              <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-verified">A good fit if</p>
              <ul className="mt-5 space-y-3">
                {GOOD.map((x) => (
                  <li key={x} className="flex gap-2.5 text-[15px] leading-snug text-navy-dark/85">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-verified" />
                    {x}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div className="rounded-[28px] bg-mist p-7 ring-1 ring-line sm:p-8" {...rise(0.12)}>
              <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-navy-dark/70">Probably not yet if</p>
              <ul className="mt-5 space-y-3">
                {NOT.map((x) => (
                  <li key={x} className="flex gap-2.5 text-[15px] leading-snug text-navy-dark/75">
                    <Minus className="mt-0.5 h-4 w-4 flex-none text-navy-dark/40" />
                    {x}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[14px] leading-relaxed text-navy-dark/70">
                If that's you, we'll say so on the call and point you to what
                will help first.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* --------------------------------- pricing -------------------------------- */

const PricingSummary = () => (
  <section className="bg-mist py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div
        className="mb-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16"
        {...rise()}
      >
        <div>
          <Eyebrow className="mb-4">Pricing</Eyebrow>
          <H2>
            {usd(PER_LINK)} a placement.
            <br />
            <Soft>No contract, no setup fee.</Soft>
          </H2>
        </div>
        <p className="text-[17px] leading-relaxed text-navy-dark/75">
          Same prices for every trade. Try a single {usd(TRIAL_PRICE)} trial
          link first, or pick a package. Order once or every month.
        </p>
      </motion.div>
      <div className="grid gap-4 md:grid-cols-3">
        {PLANS.map((p, i) => (
          <motion.div
            key={p.id}
            className={`flex flex-col rounded-[24px] p-7 ${p.featured ? "bg-navy-dark text-white" : "bg-white ring-1 ring-line"}`}
            {...rise(i * 0.06)}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-[18px] font-semibold tracking-[-0.02em]">{p.name}</p>
              {p.featured && (
                <span className="rounded-full bg-butter px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-navy-dark">
                  {p.tag}
                </span>
              )}
            </div>
            <p className="mt-4 text-[2.5rem] font-semibold leading-none tracking-[-0.045em] tabular-nums">{planPrice(p)}</p>
            <p className={`mt-2 text-[14px] ${p.featured ? "text-white/70" : "text-navy-dark/70"}`}>
              {p.links} placements · average {p.traffic} visits a month per site
            </p>
            <Link
              to={orderUrl(p.id)}
              className={`group mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[14px] font-semibold transition-colors ${
                p.featured ? "bg-white text-navy-dark hover:bg-mark" : "bg-navy-dark text-white hover:bg-black"
              }`}
            >
              Order {p.name}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 flex flex-col gap-5 rounded-[24px] bg-white p-6 ring-1 ring-line sm:p-7 lg:flex-row lg:items-center lg:justify-between">
        <GuaranteeChips />
        <span className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] font-semibold text-navy-dark">
          <Link to={orderUrl("trial")} className="inline-flex items-center gap-1.5 hover:underline">
            Order a {usd(TRIAL_PRICE)} trial link
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/pricing" className="inline-flex items-center gap-1.5 hover:underline">
            Full pricing and terms
            <ArrowRight className="h-4 w-4" />
          </Link>
        </span>
      </div>
    </div>
  </section>
);

/* ----------------------------------- faq ---------------------------------- */

const FAQS = [
  {
    q: "Do links actually help a local business?",
    a: "Yes. Google says local results are based on relevance, distance and prominence, and that prominence includes what it knows about your business from links, articles and directories across the web. Links from local and industry sites are one of the clearest prominence signals you can build.",
  },
  {
    q: "Will this get me into the map pack?",
    a: "Links help, but nobody can honestly promise a map pack position. Your Google Business Profile, your reviews and your distance from the searcher all matter too. On the first call we'll tell you where links will make the biggest difference for you.",
  },
  {
    q: "How long until it works?",
    a: "Links usually get indexed within two to six weeks, and rankings tend to move over the following months. That's why we suggest starting two or three months before your busy season, not during it.",
  },
  {
    q: "We serve several towns. Can you help with each one?",
    a: "Yes. We point links at your city and service-area pages, so each location builds its own authority instead of everything going to the homepage.",
  },
  {
    q: "Do you build citations and directory listings?",
    a: "No, and you don't need an agency for that. Your main listings (Google, Bing, Apple, Yelp and your trade bodies) are worth setting up yourself. We build the editorial links and mentions that are much harder to get.",
  },
  {
    q: "We're an agency with home services clients. Can you work white label?",
    a: "Yes. We deliver under your brand, with unbranded reports, and we never contact your clients.",
  },
  {
    q: "What does it cost?",
    a: `Placements are ${usd(PER_LINK)} each, in packages of 3, 5 or 10 links. To test us first, a single trial placement is ${usd(TRIAL_PRICE)}. Every order has a 100% money-back guarantee and free link replacement.`,
  },
];

/* --------------------------------- page --------------------------------- */

const HomeServices = () => (
  <PageLayout>
    <Seo
      title="Link Building for Home Services Businesses"
      description="Link building for roofers, plumbers, HVAC firms and electricians, and the agencies that market them: local and industry links that help Google rank you."
      schema={{
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Link building for home services businesses",
        serviceType: "Link building",
        provider: { "@type": "Organization", name: "Editorial HQ" },
        audience: { "@type": "BusinessAudience", name: "Home service businesses and their agencies" },
        areaServed: "Worldwide",
        offers: { "@type": "Offer", price: String(PER_LINK), priceCurrency: "USD" },
      }}
    />

    {/* hero */}
    <section className="relative overflow-hidden bg-mist pb-16 pt-28 lg:pb-24 lg:pt-36">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:gap-16 lg:px-8">
        <div>
          <motion.span
            className="mb-7 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[12.5px] font-semibold text-navy-dark ring-1 ring-line"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-mark-deep" />
            Link building for home services
          </motion.span>
          <h1>
            <motion.span
              className="block text-[2.7rem] font-semibold leading-[0.98] tracking-[-0.045em] text-navy-dark sm:text-[3.6rem] lg:text-[4.1rem]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.05, ease }}
            >
              Win the local searches
            </motion.span>
            <motion.span
              className="mt-1 block pb-[0.06em] text-[2.7rem] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-[3.6rem] lg:text-[4.1rem]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.14, ease }}
            >
              <span className="accent-ink">that book the jobs.</span>
            </motion.span>
          </h1>
          <motion.p
            className="mt-7 max-w-[34rem] text-[17px] leading-relaxed text-navy-dark/75 sm:text-[18px]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
          >
            When a pipe bursts or a roof leaks, people call one of the first
            three names they see. We build the local and industry links that
            put yours there, for your own business or for the home service
            clients your agency looks after.
          </motion.p>
          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease }}
          >
            <button
              onClick={openBooking}
              className="group inline-flex items-center gap-2 rounded-full bg-navy-dark px-7 py-3.5 text-[14.5px] font-semibold text-white transition-colors duration-300 hover:bg-black"
            >
              Get a free plan for your area
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
            <Link
              to="/pricing"
              className="inline-flex items-center rounded-full bg-white px-7 py-3.5 text-[14.5px] font-semibold text-navy-dark ring-1 ring-navy-dark/15 transition-shadow duration-300 hover:ring-navy-dark/40"
            >
              See packages
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}>
            <GuaranteeChips compact className="mt-7" />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 34, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
        >
          <GlowPanel tone="warm" className="p-5 sm:p-10">
            <div className="mx-auto max-w-[460px]">
              <ClimbCard />
            </div>
          </GlowPanel>
        </motion.div>
      </div>

      <motion.ul
        className="mx-auto mt-16 flex max-w-7xl flex-wrap gap-2 px-4 sm:px-6 lg:mt-20 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        aria-label="Trades we work with"
      >
        {TRADES.map((t) => (
          <li key={t} className="rounded-full bg-white px-3.5 py-1.5 text-[13px] font-semibold text-navy-dark/80 ring-1 ring-line">
            {t}
          </li>
        ))}
      </motion.ul>
    </section>

    {/* the problem, in an owner's words */}
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="mb-12 max-w-3xl" {...rise()}>
          <Eyebrow className="mb-4">Sound familiar?</Eyebrow>
          <H2>
            You're good at the work.
            <br />
            <Soft>The internet just doesn't know it yet.</Soft>
          </H2>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-navy-dark/75">
            We hear some version of these from almost every home service owner
            we talk to. None of them are your fault. They're what happens when
            your phone depends on platforms you rent.
          </p>
        </motion.div>
        <div className="grid gap-4 md:grid-cols-3">
          {PAINS.map((p, i) => (
            <motion.figure key={p.t} className="flex flex-col rounded-[24px] bg-mist p-7 ring-1 ring-line" {...rise(i * 0.07)}>
              <Quote className="h-6 w-6 text-navy-dark/25" />
              <blockquote className="mt-4 text-[19px] font-medium leading-snug tracking-[-0.02em] text-navy-dark">
                “{p.q}”
              </blockquote>
              <figcaption className="mt-auto pt-6">
                <span className="block text-[12px] font-semibold uppercase tracking-[0.12em] text-navy-dark/60">{p.t}</span>
                <span className="mt-1.5 block text-[14.5px] leading-relaxed text-navy-dark/75">{p.d}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <motion.div className="rounded-[24px] bg-white p-7 ring-1 ring-line sm:p-9" {...rise()}>
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-navy-dark/60">Rented</p>
            <h3 className="mt-3 text-[1.6rem] font-semibold tracking-[-0.03em] text-navy-dark">Lead sites and paid clicks</h3>
            <ul className="mt-6 space-y-3">
              {[
                "Shared leads, sold to several companies at once",
                "Ad prices set by whoever bids most this week",
                "Nothing left when the budget ends",
              ].map((x) => (
                <li key={x} className="flex gap-2.5 text-[15px] leading-snug text-navy-dark/75">
                  <Minus className="mt-0.5 h-4 w-4 flex-none text-navy-dark/40" />
                  {x}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div className="rounded-[24px] bg-navy-dark p-7 text-white sm:p-9" {...rise(0.08)}>
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/60">Owned</p>
            <h3 className="mt-3 text-[1.6rem] font-semibold tracking-[-0.03em]">
              <span className="accent-ink-dark">Rankings you've earned</span>
            </h3>
            <ul className="mt-6 space-y-3">
              {[
                "Homeowners who found you, not a list of five contractors",
                "Positions that hold between busy seasons",
                "Links that keep working long after they're paid for",
              ].map((x) => (
                <li key={x} className="flex gap-2.5 text-[15px] leading-snug text-white/85">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-mark" />
                  {x}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>

    {/* how Google ranks a local business */}
    <section className="bg-mist py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="mb-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16" {...rise()}>
          <div>
            <Eyebrow className="mb-4">How local rankings work</Eyebrow>
            <H2>
              Google publishes the formula.
              <br />
              <Soft>Most contractors ignore a third of it.</Soft>
            </H2>
          </div>
          <p className="text-[17px] leading-relaxed text-navy-dark/75">
            Google says local results depend on three things. You can't move
            closer to every customer, but you can become more prominent, and
            links are a big part of that.
          </p>
        </motion.div>
        <div className="grid gap-4 md:grid-cols-3">
          {FACTORS.map((f, i) => (
            <motion.div
              key={f.k}
              className={`rounded-3xl p-7 sm:p-8 ${f.us ? "bg-navy-dark text-white" : "bg-white text-navy-dark ring-1 ring-line"}`}
              {...rise(i * 0.08)}
            >
              <p className="flex items-center justify-between">
                <span className="text-[13px] font-semibold uppercase tracking-[0.14em] opacity-70">0{i + 1}</span>
                {f.us && (
                  <span className="rounded-full bg-mark px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.06em] text-navy-dark">
                    What we build
                  </span>
                )}
              </p>
              <h3 className={`mt-6 text-[1.9rem] font-semibold tracking-[-0.04em] ${f.us ? "accent-ink-dark" : ""}`}>{f.k}</h3>
              <p className={`mt-3 text-[15.5px] leading-relaxed ${f.us ? "text-white/75" : "text-navy-dark/75"}`}>{f.d}</p>
            </motion.div>
          ))}
        </div>
        <p className="mt-5 text-[13px] text-navy-dark/65">
          Source:{" "}
          <a
            href="https://support.google.com/business/answer/7091"
            target="_blank"
            rel="noopener"
            className="underline decoration-navy-dark/25 underline-offset-2 hover:decoration-navy-dark"
          >
            Google Business Profile Help, “How to improve your local ranking on Google”
          </a>
          .
        </p>
      </div>
    </section>

    <Playbook />
    <SiteCheck />
    <Timing />
    <Proof />
    <Calculator />
    <Agencies />
    <PricingSummary />

    <ServiceFaq
      eyebrow="FAQ"
      h2a="Questions from"
      h2b="home service businesses."
      side="Tell us your trade and your service area, and we'll tell you where links would help most."
      faqs={FAQS}
      bg="bg-white"
    />
  </PageLayout>
);

export default HomeServices;
