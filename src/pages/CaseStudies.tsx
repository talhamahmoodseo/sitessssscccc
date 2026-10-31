import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, CalendarDays, Check, X } from "lucide-react";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";
import { Avatar, ProofChip, ResultCard, SiteShot } from "@/components/proof";
import { ClientMark } from "@/components/brand";
import { openBooking } from "@/lib/booking";
import { CASES, CASE_TOTALS, caseBySlug, type CaseStudy } from "@/lib/cases";
import { TRIAL_PRICE, usd } from "@/lib/pricing";
import { STORIES } from "@/lib/stories";
import { LogoStrip } from "@/sections/ClientLogos";
import { ReviewWall } from "@/sections/Testimonials";
import { Eyebrow, H2, Soft, ease, rise } from "./services/kit";
import { SECTIONS } from "./results/CaseSections";

/**
 * /case-studies, round 13, after uSERP's /results (the owner's brief): one
 * client result featured large, the rest as cards with each client's own
 * homepage on top, filterable by service, then their reviews and how we
 * report. Every figure comes from lib/cases.ts; the screenshots are the
 * clients' sites and their own Google results.
 *
 * Kept from round 9: the totals across all cases, "what we count / what we
 * leave out", and the eight parts every case file follows.
 */

const FEATURED = "smiletutor";

type Filter = "all" | CaseStudy["tags"][number];
const FILTERS: { k: Filter; t: string }[] = [
  { k: "all", t: "All" },
  { k: "link-building", t: "Link building" },
  { k: "brand-mentions", t: "Brand mentions" },
  { k: "digital-pr", t: "Digital PR" },
  { k: "agency", t: "White label" },
];

const SECTION_NOTES: Record<string, string> = {
  overview: "Who the client is and what they came to us for",
  challenge: "Where they started, and what was in the way",
  objectives: "What we agreed to, and what happened",
  strategy: "The plan, and why",
  work: "Month by month, what we actually did",
  links: "Every type of placement, the authority spread and anchor mix",
  results: "Before-and-after data, charts and keywords",
  outcomes: "Business impact, lessons and what’s next",
};

const COUNTS = [
  { v: `${CASE_TOTALS.placements}+`, l: "placements in these write-ups" },
  { v: `${CASE_TOTALS.reviewed}+`, l: "sites reviewed by hand" },
  { v: `${CASE_TOTALS.rejected}`, l: "sites turned down" },
  {
    v: `${CASE_TOTALS.objectives} / ${CASE_TOTALS.objectives}`,
    l: "objectives met",
  },
];

const COUNTED = [
  "Rankings on the searches the client actually cares about",
  "Traffic from people who didn't already know the brand",
  "Indexation, because an unindexed link is not a link",
  "The placements themselves, so you can open them",
  "Screenshots from the client's own tools, with dates",
];
const LEFT_OUT = [
  "Total backlinks, with no note on how many Google indexed",
  "Domain Rating as the headline, when DR moves without revenue moving",
  "Keyword counts padded with terms nobody searches",
  "Impressions, which grow whenever a page is shown and ignored",
];

/* --------------------------------------------------------------- the hero */

const Glance = () => {
  const st = caseBySlug("smiletutor")!;
  const cd = caseBySlug("cryptodesk")!;
  const tiles = [
    { v: st.headline[0].v, l: "on Google for “tuition” in Singapore", c: st.client, tint: "bg-butter" },
    { v: st.headline[1].v, l: "organic traffic in two years", c: st.client, tint: "bg-mint" },
    { v: cd.headline[1].v, l: "from the first link to #1 in Dubai", c: cd.client, tint: "bg-lilac" },
    { v: `${CASE_TOTALS.placements}+`, l: "placements across these case files", c: "Six clients", tint: "bg-sky" },
  ];
  return (
    <div className="rounded-[28px] bg-white p-5 ring-1 ring-line shadow-[0_40px_80px_-50px_rgb(var(--ink)/0.45)] sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-dark/60">
          Results at a glance
        </p>
        <span className="rounded-full bg-mist px-2.5 py-1 text-[11.5px] font-semibold text-navy-dark/75">
          {CASES.length} case files
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        {tiles.map((t) => (
          <div key={t.l} className={`flex flex-col justify-between rounded-2xl p-4 ${t.tint}`}>
            <p className="text-[1.9rem] font-semibold leading-none tracking-[-0.045em] text-navy-dark sm:text-[2.2rem]">
              {t.v}
            </p>
            <p className="mt-2 text-[12.5px] leading-snug text-navy-dark/75">
              {t.l}
              <span className="mt-2 block text-[11.5px] font-semibold text-navy-dark">{t.c}</span>
            </p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[12px] leading-relaxed text-navy-dark/65">
        From the clients' own Semrush data and Google screenshots, kept
        inside each case file.
      </p>
    </div>
  );
};

/* -------------------------------------------------------- featured result */

const Featured = () => {
  const c = caseBySlug(FEATURED)!;
  const t = c.testimonial!;
  const story = STORIES.find((s) => s.slug === FEATURED)!;
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="max-w-3xl" {...rise()}>
          <Eyebrow className="mb-4">Featured result</Eyebrow>
          <H2>
            Number one on Google
            <br />
            <Soft>for “tuition” in Singapore.</Soft>
          </H2>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-navy-dark/75">
            {c.summary}
          </p>
        </motion.div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14">
          {/* their site, their Google result, their AI Overview */}
          <motion.div className="relative pb-16 sm:pb-20" {...rise(0.05)}>
            <div className={`rounded-[30px] p-4 sm:p-6 ${c.tint}`}>
              <SiteShot
                src={c.site!}
                domain={c.domain}
                alt="SmileTutor's homepage"
                ratio="aspect-[16/10]"
                className="shadow-[0_30px_60px_-30px_rgb(var(--ink)/0.45)]"
              />
            </div>
            <div className="absolute -bottom-2 left-3 w-[78%] max-w-[320px] -rotate-[1.5deg] sm:left-8">
              <ProofChip chip={story.left} />
            </div>
            <div className="absolute -right-3 -top-8 hidden w-[44%] rotate-[2deg] sm:block lg:-right-6">
              <ProofChip chip={story.right} />
            </div>
          </motion.div>

          {/* the owner, in his own words */}
          <motion.div {...rise(0.12)}>
            <figure className="rounded-[28px] bg-mist p-7 ring-1 ring-line sm:p-8">
              <blockquote className="text-[1.25rem] font-medium leading-[1.4] tracking-[-0.02em] text-navy-dark">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center justify-between gap-4">
                <span className="flex items-center gap-3">
                  <Avatar name={t.who} photo={t.photo} size={44} />
                  <span>
                    <span className="block text-[14.5px] font-semibold text-navy-dark">{t.who}</span>
                    <span className="block text-[13px] text-navy-dark/70">{t.role}</span>
                  </span>
                </span>
                <ClientMark client={c.client} logo={c.logo} h={26} />
              </figcaption>
            </figure>
            <div className="mt-3 grid grid-cols-3 gap-2.5">
              {c.headline.slice(1, 4).map((h) => (
                <div key={h.l} className="rounded-2xl bg-white p-4 ring-1 ring-line">
                  <p className="text-[1.5rem] font-semibold leading-none tracking-[-0.04em] text-navy-dark">
                    {h.v}
                  </p>
                  <p className="mt-2 text-[12px] leading-snug text-navy-dark/70">{h.l}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                to={`/case-studies/${c.slug}`}
                className="group inline-flex items-center gap-2 rounded-full bg-navy-dark px-6 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-black"
              >
                Read the SmileTutor case study
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <span className="text-[12.5px] text-navy-dark/65">
                Semrush, October 2026 against October 2024
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------ the others */

const NextCard = () => (
  <motion.div className="h-full" {...rise(0.1)}>
    <div className="flex h-full flex-col justify-between rounded-[26px] bg-navy-dark p-7 text-white sm:p-8">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
          Your site next
        </p>
        <p className="mt-4 text-[1.6rem] font-semibold leading-[1.15] tracking-[-0.03em]">
          See what we'd do for your site, one link at a time.
        </p>
        <p className="mt-4 text-[14.5px] leading-relaxed text-white/75">
          Start with one pilot link for {usd(TRIAL_PRICE)}, on a page you
          choose. If it isn't what we promised, you get your money back.
        </p>
      </div>
      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          to="/pilot"
          className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[14px] font-semibold text-navy-dark transition-colors hover:bg-mark"
        >
          See the pilot
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <button
          onClick={openBooking}
          className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[14px] font-semibold text-white ring-1 ring-white/25 transition-colors hover:bg-white/10"
        >
          <CalendarDays className="h-4 w-4" />
          Book a call
        </button>
      </div>
    </div>
  </motion.div>
);

const MoreResults = () => {
  const [f, setF] = useState<Filter>("all");
  const others = CASES.filter((c) => c.slug !== FEATURED);
  const shown = f === "all" ? others : others.filter((c) => c.tags.includes(f));
  const count = (k: Filter) =>
    k === "all" ? others.length : others.filter((c) => c.tags.includes(k)).length;
  return (
    <section className="bg-mist py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16"
          {...rise()}
        >
          <div>
            <Eyebrow className="mb-4">More client results</Eyebrow>
            <H2>
              Different businesses,
              <br />
              <Soft>different problems.</Soft>
            </H2>
          </div>
          <p className="text-[17px] leading-relaxed text-navy-dark/75">
            A crypto desk up against Binance, software for opticians, an
            editor used by millions, a camera launch and an agency's clients.
            Each card opens the full case file.
          </p>
        </motion.div>

        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter by service">
          {FILTERS.map((x) => {
            const on = f === x.k;
            return (
              <button
                key={x.k}
                onClick={() => setF(x.k)}
                aria-pressed={on}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
                  on
                    ? "bg-navy-dark text-white"
                    : "bg-white text-navy-dark ring-1 ring-line hover:ring-navy-dark/25"
                }`}
              >
                {x.t}
                <span
                  className={`rounded-full px-1.5 text-[11px] tabular-nums ${
                    on ? "bg-white/15 text-white" : "bg-mist text-navy-dark/70"
                  }`}
                >
                  {count(x.k)}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((c, i) => (
            <ResultCard key={c.slug} c={c} delay={(i % 3) * 0.07} />
          ))}
          <NextCard />
        </div>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------- how we report */

const HowWeReport = () => (
  <section className="bg-white py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div className="mb-12 max-w-4xl" {...rise()}>
        <Eyebrow className="mb-4">How we report results</Eyebrow>
        <H2>
          Most reports are built to look good.
          <br />
          <Soft>Ours are built to be checked.</Soft>
        </H2>
      </motion.div>

      <dl className="mb-12 grid grid-cols-2 gap-y-8 rounded-3xl bg-mist py-8 ring-1 ring-line lg:grid-cols-4">
        {COUNTS.map((n, i) => (
          <motion.div
            key={n.l}
            className={`flex flex-col-reverse px-4 text-center ${i ? "lg:border-l lg:border-line" : ""} ${i % 2 ? "border-l border-line" : ""}`}
            {...rise(i * 0.06)}
          >
            <dt className="mt-2 text-[13.5px] text-navy-dark/75">{n.l}</dt>
            <dd className="text-[2.2rem] font-semibold leading-none tracking-[-0.05em] text-navy-dark sm:text-[2.7rem]">
              {n.v}
            </dd>
          </motion.div>
        ))}
      </dl>

      <div className="grid gap-5 md:grid-cols-2">
        <motion.div className="rounded-3xl bg-mist p-7 ring-1 ring-line sm:p-9" {...rise()}>
          <p className="flex items-center gap-2.5 text-[15px] font-semibold text-navy-dark">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-verified/[0.12]">
              <Check className="h-4 w-4 text-verified" />
            </span>
            What we count
          </p>
          <ul className="mt-6 space-y-3.5">
            {COUNTED.map((t) => (
              <li key={t} className="border-b border-line pb-3.5 text-[15px] leading-relaxed text-navy-dark/85 last:border-0">
                {t}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div className="rounded-3xl bg-white p-7 ring-1 ring-line sm:p-9" {...rise(0.08)}>
          <p className="flex items-center gap-2.5 text-[15px] font-semibold text-navy-dark">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gap/[0.12]">
              <X className="h-4 w-4 text-gap" />
            </span>
            What we leave out
          </p>
          <ul className="mt-6 space-y-3.5">
            {LEFT_OUT.map((t) => (
              <li key={t} className="border-b border-line pb-3.5 text-[15px] leading-relaxed text-navy-dark/85 last:border-0">
                {t}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div className="mt-12" {...rise()}>
        <p className="text-[14px] font-semibold text-navy-dark">
          Every case file follows the same eight parts, slow months included:
        </p>
        <ol className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {SECTIONS.map((s, i) => (
            <li key={s.id} className="rounded-2xl bg-mist px-4 py-3.5 ring-1 ring-line">
              <span className="text-[11.5px] font-semibold tabular-nums text-navy-dark/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="ml-2 text-[14.5px] font-semibold text-navy-dark">{s.t}</span>
              <span className="mt-1 block text-[12.5px] leading-snug text-navy-dark/70">
                {SECTION_NOTES[s.id]}
              </span>
            </li>
          ))}
        </ol>
      </motion.div>
    </div>
  </section>
);

/* ---------------------------------------------------------------- the page */

const CaseStudies = () => (
  <PageLayout>
    <Seo
      title="Case Studies: Link Building & PR Results"
      description="Real client work: SmileTutor to #1 for “tuition” in Singapore, CryptoDesk to #1 in Dubai in five months, plus Ocuco, CapCut, Defender and an agency partner."
    />

    {/* hero: what it changed, at a glance */}
    <section className="bg-mist pb-16 pt-32 lg:pb-20 lg:pt-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <div>
            <motion.p
              className="text-[12px] font-semibold uppercase tracking-[0.2em] text-navy-dark/70"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Case studies
            </motion.p>
            <h1 className="mt-5">
              <motion.span
                className="block text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.045em] text-navy-dark sm:text-[3.8rem] lg:text-[4.2rem]"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease }}
              >
                Real businesses,
              </motion.span>
              <motion.span
                className="block pb-[0.06em] text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-[3.8rem] lg:text-[4.2rem]"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease }}
              >
                <span className="accent-ink">and what changed.</span>
              </motion.span>
            </h1>
            <motion.p
              className="mt-6 max-w-xl text-[17px] leading-relaxed text-navy-dark/75"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
            >
              A tuition agency in Singapore, a crypto desk in Dubai, software
              for opticians, a video editor, a camera brand and an SEO agency.
              Here's where each one started, what we built, and what it did,
              with the screenshots to check it.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease }}
            >
              <Link
                to="/pilot"
                className="group inline-flex items-center gap-2 rounded-full bg-navy-dark px-6 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-black"
              >
                Start with a {usd(TRIAL_PRICE)} pilot link
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <button
                onClick={openBooking}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[14.5px] font-semibold text-navy-dark ring-1 ring-line transition-colors hover:ring-navy-dark/30"
              >
                <CalendarDays className="h-4 w-4" />
                Book a call
              </button>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
          >
            <Glance />
          </motion.div>
        </div>

        <div className="mt-16 border-t border-line pt-10">
          <p className="mb-7 text-center text-[13px] font-medium text-navy-dark/70">
            Every logo opens its case file
          </p>
          <LogoStrip />
        </div>
      </div>
    </section>

    <Featured />
    <MoreResults />

    {/* in their words */}
    <ReviewWall />

    <HowWeReport />
  </PageLayout>
);

export default CaseStudies;
