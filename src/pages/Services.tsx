import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FigSplitSearch } from "@/components/LineArt";
import { SERVICES } from "./services/shared";
import { Matrix, Pairings, SharedStandard, Sequence } from "./services-depth";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";
import { openBooking } from "@/lib/booking";

/**
 * /services — the hub.
 *
 * This page routes; it does not sell. Four cards say what each service is for,
 * the matrix answers "which one", the pairings answer "how many", the ladder
 * answers "in what order". Everything persuasive lives on the four service
 * pages.
 *
 * Surface rhythm: mist → stone → white → navy-dark → mark → clay, then the
 * shared dark CTA band. Three lights at most in a row, one amber moment (the
 * pairings), and the card grid is pulled up across the mist/stone boundary so
 * the two surfaces interlock.
 */

/** Hub-level framing for each service: who it is for, and one figure. */
const ROUTE: Record<
  string,
  { best: string; items: string[]; figure: string; figureLabel: string }
> = {
  "link-building": {
    best: "Commercial pages that are close to the top but will not move.",
    items: [
      "Editorial placements",
      "Niche edits",
      "Anchor and target strategy",
    ],
    figure: "96%",
    figureLabel: "indexed, last 12 months",
  },
  "digital-pr": {
    best: "Brands that need to be written about, not only linked to.",
    items: ["Press features", "Expert commentary", "Category roundups"],
    figure: "DR 74",
    figureLabel: "highest regular outlet",
  },
  "brand-mentions": {
    best: "Categories where AI answers keep naming somebody else.",
    items: [
      "Contextual mentions",
      "Already-cited source targeting",
      "Monthly citation tracking",
    ],
    figure: "3",
    figureLabel: "answer surfaces tracked",
  },
  "haro-links": {
    best: "Founders and specialists with a view worth quoting.",
    items: [
      "Quote placements",
      "Direct journalist pitching",
      "Drafted in your voice",
    ],
    figure: "48h",
    figureLabel: "median pitch to quote",
  },
};

const HERO_FACTS = [
  { v: "4", k: "services" },
  { v: "2", k: "in a typical engagement" },
  { v: "1", k: "report you can forward" },
];

const Hero = () => (
  <div className="relative overflow-hidden bg-mist pb-36 pt-28 lg:pb-44 lg:pt-32">
    <div className="pointer-events-none absolute -left-24 top-6 h-[380px] w-[520px] rounded-full bg-butter opacity-50 blur-[80px]" />
    <div className="pointer-events-none absolute -right-20 top-28 h-[340px] w-[440px] rounded-full bg-lilac opacity-45 blur-[80px]" />
    <motion.div
      className="absolute -left-2 top-40 hidden text-navy-dark/80 xl:block"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <FigSplitSearch className="h-auto w-24" />
    </motion.div>

    <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
      <motion.p
        className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Services
      </motion.p>
      <motion.h1
        className="text-balance mb-6 text-[2.5rem] font-semibold leading-[1.03] tracking-[-0.035em] text-navy-dark sm:text-5xl lg:text-[3.5rem]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.05 }}
      >
        Four Services.
        <span className="text-navy-dark/65">One Thing They All Build.</span>
      </motion.h1>
      <motion.p
        className="mx-auto mb-9 max-w-xl text-[17px] leading-relaxed text-navy-dark/70"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.12 }}
      >
        Link building, digital PR, brand mentions and expert quotes all do one
        job: get your brand referenced where Google and the AI engines are
        already looking. Most engagements run two of them.
      </motion.p>
      <motion.div
        className="flex flex-wrap items-center justify-center gap-4"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <button
          onClick={openBooking}
          className="group inline-flex items-center gap-2 rounded-xl bg-navy-dark px-7 py-3.5 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-black"
        >
          Book a strategy call
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
        <a
          href="#choose"
          className="inline-flex items-center gap-2 rounded-xl border border-navy-dark/20 px-7 py-3.5 text-[14px] font-semibold text-navy-dark transition-colors duration-300 hover:border-navy-dark"
        >
          Find your situation
        </a>
      </motion.div>

      <motion.dl
        className="mx-auto mt-11 flex max-w-lg justify-center divide-x divide-navy-dark/15"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {HERO_FACTS.map((f) => (
          <div key={f.k} className="px-5 text-center sm:px-7">
            <dt className="text-[1.6rem] font-semibold leading-none tracking-[-0.03em] tabular-nums text-navy-dark">
              {f.v}
            </dt>
            <dd className="mt-1.5 text-[11.5px] leading-snug text-navy-dark/70">
              {f.k}
            </dd>
          </div>
        ))}
      </motion.dl>
    </div>
  </div>
);

/** The four routes. White cards pulled up across the mist/stone boundary. */
const Routes = () => (
  <div className="bg-white pb-24 lg:pb-28">
    <div className="relative z-10 mx-auto -mt-24 max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
        {SERVICES.map((e, s) => {
          const r = ROUTE[e.slug];
          if (!r) return null;
          return (
            <motion.div
              key={e.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (s % 2) * 0.08 }}
            >
              <Link
                to={`/services/${e.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-lift transition-all duration-500 hover:-translate-y-1 hover:shadow-deep"
              >
                <div
                  className={`${e.tint} flex items-baseline justify-between gap-4 px-7 py-6 lg:px-8`}
                >
                  <h2 className="text-balance text-[1.6rem] font-semibold leading-tight tracking-[-0.025em] text-navy-dark">
                    {e.nav}
                  </h2>
                  <span className="text-[2rem] font-semibold leading-none tracking-[-0.04em] tabular-nums text-navy-dark/60">
                    {s + 1}
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-7 py-7 lg:px-8">
                  <p className="mb-2 text-[10.5px] font-bold uppercase tracking-[0.14em] text-navy-dark/70">
                    Best when
                  </p>
                  <p className="text-[15px] leading-relaxed text-navy-dark">
                    {r.best}
                  </p>

                  <ul className="my-7 divide-y divide-line border-y border-line">
                    {r.items.map((a) => (
                      <li
                        key={a}
                        className="py-2.5 text-[13.5px] text-navy-dark/75"
                      >
                        {a}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex items-end justify-between gap-5">
                    <span className="block">
                      <span className="block text-[1.7rem] font-semibold leading-none tracking-[-0.03em] tabular-nums text-navy-dark">
                        {r.figure}
                      </span>
                      <span className="mt-1.5 block text-[11.5px] leading-snug text-navy-dark/70">
                        {r.figureLabel}
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-navy-dark transition-all duration-300 group-hover:gap-2.5">
                      {"Explore "}
                      {e.nav}
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-navy-dark/15 pt-8 sm:flex-row sm:items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-[15px] text-navy-dark/80">
          Not sure which one you need? The table further down is the short
          version of the call.
        </p>
        <a
          href="#choose"
          className="inline-flex shrink-0 items-center gap-1.5 text-[13.5px] font-semibold text-navy-dark"
        >
          Jump to the decision table
          <ArrowRight className="h-4 w-4" />
        </a>
      </motion.div>
    </div>
  </div>
);

const Services = () => (
  <PageLayout>
    <Seo
      title="Services"
      description="Editorial link building, digital PR, brand mentions and HARO expert quotes — one authority programme, four ways in. Find the one your situation calls for."
    />
    <Hero />
    <Routes />
    <SharedStandard />
    <Matrix />
    <Pairings />
    <Sequence />
  </PageLayout>
);

export default Services;
