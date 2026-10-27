import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  Handshake,
  Home,
  MapPin,
  Minus,
  Newspaper,
  Star,
  Trophy,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";
import { GuaranteeChips } from "@/components/Guarantees";
import { openBooking } from "@/lib/booking";
import { CARD, DarkGlow, Eyebrow, GlowPanel, H2, Soft, ease, rise } from "../services/kit";
import { ServiceFaq } from "../services/common";

/**
 * /industries/home-services. Link building for roofers, plumbers, HVAC,
 * electricians and other home service businesses, and the agencies that
 * market them. Built on one verifiable fact (Google's local ranking
 * factors: relevance, distance, prominence) and the visitor's own numbers
 * (the job-value calculator), not on industry statistics we can't source.
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

const FACTORS = [
  {
    k: "Relevance",
    d: "How well your business matches the search. Your categories, services and pages.",
    us: false,
  },
  {
    k: "Distance",
    d: "How far you are from the person searching. You can't change it.",
    us: false,
  },
  {
    k: "Prominence",
    d: "How well known you are, including links, articles and reviews from across the web. This is the one we build.",
    us: true,
  },
];

const SOURCES: { Icon: LucideIcon; t: string; d: string }[] = [
  {
    Icon: Newspaper,
    t: "Local news and community sites",
    d: "Coverage and features in the publications people in your service area actually read.",
  },
  {
    Icon: Home,
    t: "Home and property publications",
    d: "Articles about repairs, renovation and home care, where a homeowner researches before calling anyone.",
  },
  {
    Icon: Trophy,
    t: "“Best in your city” roundups",
    d: "The lists people read when they're choosing a company, and the pages AI assistants quote.",
  },
  {
    Icon: Handshake,
    t: "Supplier and partner pages",
    d: "Manufacturers, distributors and certification bodies that list the contractors they work with.",
  },
  {
    Icon: Building2,
    t: "Trade and industry sites",
    d: "Blogs and associations in your trade, which tell Google what kind of business you are.",
  },
  {
    Icon: MapPin,
    t: "Links to your service-area pages",
    d: "Authority pointed at the city and service pages that need to rank, not just your homepage.",
  },
];

const GOOD = [
  "You're an established business with crews to keep busy",
  "Your site has real service and location pages",
  "You'd rather own your rankings than keep renting leads",
  "You can plan a season ahead, not a week ahead",
];
const NOT = [
  "You need the phone to ring this week",
  "Your Google Business Profile hasn't been set up yet",
  "You're after the cheapest links you can find",
];

const FAQS = [
  {
    q: "Do links actually help a local business?",
    a: "Yes. Google says local results are based on relevance, distance and prominence, and that prominence includes what it knows about your business from links, articles and directories across the web. Links from local and industry sites are one of the clearest prominence signals you can build.",
  },
  {
    q: "Will this get me into the map pack?",
    a: "Links help, but nobody can promise a map pack position. Your Google Business Profile, your reviews and your distance from the searcher all matter too. We'll tell you on the first call where links will make the biggest difference for you.",
  },
  {
    q: "How long until it works?",
    a: "Links usually get indexed within two to six weeks, and rankings tend to move over the following months. That's why we suggest starting before your busy season, not during it.",
  },
  {
    q: "We serve several towns. Can you help with each one?",
    a: "Yes. We point links at your city and service-area pages, so each location builds its own authority instead of everything going to the homepage.",
  },
  {
    q: "We're an agency with home services clients. Can you work white label?",
    a: "Yes. We deliver under your brand, with unbranded reports, and we never contact your clients.",
  },
  {
    q: "What does it cost?",
    a: "Placements are $150 each on orders of three or more. To test us first, a single trial placement is $170. Every order has a 100% money-back guarantee and free link replacement.",
  },
];

/* ----------------------------- hero visual ----------------------------- */

const LISTINGS = [
  { n: "Northside Plumbing Co.", r: "4.6", c: "212" },
  { n: "Your business", r: "4.9", c: "148", you: true },
  { n: "QuickFix Plumbers", r: "4.4", c: "96" },
];

const LocalCard = () => (
  <div className={`${CARD} overflow-hidden`}>
    <div className="flex items-center gap-3 border-b border-line px-5 py-3.5">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-mist">
        <MapPin className="h-3.5 w-3.5 text-navy-dark" />
      </span>
      <span className="truncate text-[13px] font-semibold text-navy-dark">
        emergency plumber near me
      </span>
      <span className="ml-auto rounded-full bg-mist px-2.5 py-1 text-[11px] font-semibold text-navy-dark/70 ring-1 ring-line">
        Illustration
      </span>
    </div>
    {/* a stylised map */}
    <div className="relative h-36 overflow-hidden bg-[linear-gradient(135deg,#eef1f4,#e4e8ec)]">
      <svg viewBox="0 0 400 144" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d="M0 96 C80 80 120 120 200 100 S320 60 400 80" stroke="#fff" strokeWidth="10" fill="none" />
        <path d="M120 0 C140 50 110 90 150 144" stroke="#fff" strokeWidth="8" fill="none" />
        <path d="M290 0 C270 40 300 100 270 144" stroke="#fff" strokeWidth="6" fill="none" />
      </svg>
      {[
        [22, 30],
        [52, 58],
        [76, 34],
      ].map(([x, y], i) => (
        <motion.span
          key={i}
          className={`absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[11px] font-bold text-white shadow-soft ${
            i === 1
              ? "bg-[linear-gradient(135deg,rgb(var(--plume-warm)),rgb(var(--plume-cool)))]"
              : "bg-navy-dark/70"
          }`}
          style={{ left: `${x}%`, top: `${y}%` }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6 + i * 0.15, type: "spring", stiffness: 300, damping: 18 }}
        >
          {String.fromCharCode(65 + i)}
        </motion.span>
      ))}
    </div>
    <ul className="divide-y divide-line">
      {LISTINGS.map((l, i) => (
        <motion.li
          key={l.n}
          className={`flex items-center gap-3 px-5 py-3.5 ${l.you ? "bg-butter/40" : ""}`}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 + i * 0.12, duration: 0.4 }}
        >
          <span className="text-[12px] font-bold tabular-nums text-navy-dark/60">
            {String.fromCharCode(65 + i)}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[14px] font-semibold text-navy-dark">
              {l.n}
            </span>
            <span className="flex items-center gap-1 text-[12px] text-navy-dark/70">
              <Star className="h-3 w-3 fill-mark text-mark" />
              {l.r} · {l.c} reviews
            </span>
          </span>
          {l.you && (
            <span className="rounded-full bg-navy-dark px-2.5 py-1 text-[11px] font-semibold text-white">
              Top three
            </span>
          )}
        </motion.li>
      ))}
    </ul>
  </div>
);

/* ------------------------------ calculator ----------------------------- */

const money = (n: number) =>
  `$${Math.round(n).toLocaleString("en-US")}`;

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
  const [links, setLinks] = useState(6);
  const year = job * extra * 12;
  const cost = links * 150;
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
            promise how many calls a ranking brings. It shows how little extra
            work it takes for links to pay for themselves.
          </p>
        </motion.div>

        <motion.div
          className="rounded-[28px] bg-white/[0.05] p-6 ring-1 ring-white/[0.12] sm:p-8"
          {...rise(0.1)}
        >
          <div className="grid gap-5 sm:grid-cols-3">
            <Field
              label="Average job value"
              value={job}
              onChange={setJob}
              prefix="$"
              hint="What a typical job brings in"
            />
            <Field
              label="Extra jobs a month"
              value={extra}
              onChange={setExtra}
              hint="From ranking higher"
            />
            <Field
              label="Placements"
              value={links}
              onChange={setLinks}
              hint="At $150 each"
            />
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-5 text-navy-dark sm:col-span-2">
              <p className="text-[13px] text-navy-dark/70">
                Extra revenue in a year
              </p>
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
                , and links keep working after they're paid for.
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

/* --------------------------------- page --------------------------------- */

const HomeServices = () => (
  <PageLayout>
    <Seo
      title="Link Building for Home Services Businesses"
      description="Link building for roofers, plumbers, HVAC, electricians and other home service companies, and the agencies that market them. Local and industry links that build the prominence Google uses to rank local businesses."
      schema={{
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Link building for home services businesses",
        serviceType: "Link building",
        provider: { "@type": "Organization", name: "Editorial HQ" },
        audience: { "@type": "BusinessAudience", name: "Home service businesses and their agencies" },
        areaServed: "Worldwide",
        offers: { "@type": "Offer", price: "150", priceCurrency: "USD" },
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
            Roofers, plumbers, HVAC and electrical companies win work on the
            first screen of Google. We build the local and industry links that
            get you there, for your own business or for the home service
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
              Get a plan for your market
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
            <Link
              to="/pricing"
              className="inline-flex items-center rounded-full bg-white px-7 py-3.5 text-[14.5px] font-semibold text-navy-dark ring-1 ring-navy-dark/15 transition-shadow duration-300 hover:ring-navy-dark/40"
            >
              See pricing
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <GuaranteeChips compact className="mt-7" />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 34, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
        >
          <GlowPanel tone="warm" className="p-5 sm:p-10">
            <div className="mx-auto max-w-[440px]">
              <LocalCard />
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
          <li
            key={t}
            className="rounded-full bg-white px-3.5 py-1.5 text-[13px] font-semibold text-navy-dark/80 ring-1 ring-line"
          >
            {t}
          </li>
        ))}
      </motion.ul>
    </section>

    {/* how Google ranks a local business */}
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16"
          {...rise()}
        >
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
              className={`rounded-3xl p-7 sm:p-8 ${
                f.us ? "bg-navy-dark text-white" : "bg-mist text-navy-dark ring-1 ring-line"
              }`}
              {...rise(i * 0.08)}
            >
              <p className="flex items-center justify-between">
                <span className="text-[13px] font-semibold uppercase tracking-[0.14em] opacity-70">
                  0{i + 1}
                </span>
                {f.us && (
                  <span className="rounded-full bg-mark px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.06em] text-navy-dark">
                    What we build
                  </span>
                )}
              </p>
              <h3
                className={`mt-6 text-[1.9rem] font-semibold tracking-[-0.04em] ${f.us ? "accent-ink-dark" : ""}`}
              >
                {f.k}
              </h3>
              <p
                className={`mt-3 text-[15.5px] leading-relaxed ${f.us ? "text-white/75" : "text-navy-dark/75"}`}
              >
                {f.d}
              </p>
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
            Google Business Profile Help, “How to improve your local ranking on
            Google”
          </a>
          .
        </p>
      </div>
    </section>

    {/* rented vs owned */}
    <section className="bg-mist py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="mb-12 max-w-3xl" {...rise()}>
          <Eyebrow className="mb-4">Why it's worth it</Eyebrow>
          <H2>
            Leads you buy stop
            <br />
            <Soft>the day you stop paying.</Soft>
          </H2>
        </motion.div>
        <div className="grid gap-4 lg:grid-cols-2">
          <motion.div className="rounded-3xl bg-white p-7 ring-1 ring-line sm:p-9" {...rise()}>
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-navy-dark/60">
              Rented
            </p>
            <h3 className="mt-3 text-[1.6rem] font-semibold tracking-[-0.03em] text-navy-dark">
              Lead sites and paid clicks
            </h3>
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
          <motion.div className="rounded-3xl bg-navy-dark p-7 text-white sm:p-9" {...rise(0.08)}>
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/60">
              Owned
            </p>
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

    {/* where the links come from */}
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16"
          {...rise()}
        >
          <div>
            <Eyebrow className="mb-4">What we build</Eyebrow>
            <H2>
              Links from the places
              <br />
              <Soft>your customers already look.</Soft>
            </H2>
          </div>
          <p className="text-[17px] leading-relaxed text-navy-dark/75">
            A link from a local paper or a home improvement site tells Google
            far more about a roofer than a link from a random tech blog. We
            choose every site for your trade and your area.
          </p>
        </motion.div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SOURCES.map(({ Icon, t, d }, i) => (
            <motion.li
              key={t}
              className="rounded-3xl bg-mist p-7 ring-1 ring-line"
              {...rise(i * 0.05)}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white ring-1 ring-line">
                <Icon className="h-5 w-5 text-navy-dark" />
              </span>
              <h3 className="mt-5 text-[18px] font-semibold tracking-[-0.02em] text-navy-dark">
                {t}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-navy-dark/75">
                {d}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>

    <Calculator />

    {/* timing */}
    <section className="bg-mist py-24 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20 lg:px-8">
        <motion.div {...rise()}>
          <Eyebrow className="mb-4">Timing</Eyebrow>
          <H2>
            Build before the rush,
            <br />
            <Soft>not during it.</Soft>
          </H2>
          <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-navy-dark/75">
            Links take a few weeks to be picked up and rankings take a few
            months to settle. Air conditioning in summer, heating in winter,
            roofs after a storm: we plan your placements so the authority is
            in place when the calls start.
          </p>
        </motion.div>
        <motion.ol className="space-y-3" {...rise(0.1)}>
          {[
            ["Weeks 1–4", "Links placed on local and trade sites"],
            ["Weeks 2–6", "Google finds and indexes them"],
            ["Months 2–4", "Rankings on your service and city pages move"],
            ["Your busy season", "The work is already in place"],
          ].map(([w, t], i) => (
            <li
              key={w}
              className={`flex items-center gap-5 rounded-2xl p-5 ring-1 ${
                i === 3 ? "bg-navy-dark text-white ring-navy-dark" : "bg-white ring-line"
              }`}
            >
              <span
                className={`w-32 flex-none text-[13px] font-semibold uppercase tracking-[0.08em] ${
                  i === 3 ? "text-mark" : "text-navy-dark/60"
                }`}
              >
                {w}
              </span>
              <span className={`text-[15.5px] font-semibold ${i === 3 ? "" : "text-navy-dark"}`}>
                {t}
              </span>
            </li>
          ))}
        </motion.ol>
      </div>
    </section>

    {/* agencies + fit */}
    <section className="bg-white py-24 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
        <motion.div className="rounded-3xl bg-mist p-7 ring-1 ring-line sm:p-8" {...rise()}>
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-verified">
            A good fit if
          </p>
          <ul className="mt-5 space-y-3">
            {GOOD.map((x) => (
              <li key={x} className="flex gap-2.5 text-[15px] leading-snug text-navy-dark/85">
                <Check className="mt-0.5 h-4 w-4 flex-none text-verified" />
                {x}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div className="rounded-3xl bg-mist p-7 ring-1 ring-line sm:p-8" {...rise(0.06)}>
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-navy-dark/70">
            Probably not yet if
          </p>
          <ul className="mt-5 space-y-3">
            {NOT.map((x) => (
              <li key={x} className="flex gap-2.5 text-[15px] leading-snug text-navy-dark/75">
                <Minus className="mt-0.5 h-4 w-4 flex-none text-navy-dark/40" />
                {x}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div className="flex flex-col rounded-3xl bg-navy-dark p-7 text-white sm:p-8" {...rise(0.12)}>
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-mark">
            For agencies
          </p>
          <h3 className="mt-4 text-[1.5rem] font-semibold leading-tight tracking-[-0.03em]">
            Home services clients? We can be your link team.
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-white/75">
            White label from start to finish: your brand on the reports, no
            contact with your clients, and the same checks on every site.
          </p>
          <Link
            to="/case-studies/agency-partner"
            className="group mt-auto inline-flex items-center gap-2 pt-6 text-[14px] font-semibold text-white"
          >
            How we work with agencies
            <ArrowUpRight className="h-4 w-4 text-mark" />
          </Link>
        </motion.div>
      </div>
    </section>

    <ServiceFaq
      eyebrow="FAQ"
      h2a="Questions from"
      h2b="home service businesses."
      side="Tell us your trade and your service area, and we'll tell you where links would help most."
      faqs={FAQS}
      bg="bg-mist"
    />
  </PageLayout>
);

export default HomeServices;
