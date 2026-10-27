import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Check, X } from "lucide-react";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";
import { CASES, CASE_TOTALS, type CaseStudy } from "@/lib/cases";
import { Eyebrow, H2, Soft, ease, rise } from "./services/kit";
import { SECTIONS } from "./results/CaseSections";
import { LogoChip } from "./results/CaseParts";

/* ------------------------------- case cards ------------------------------- */

const CaseCard = ({
  c,
  large = false,
  delay = 0,
}: {
  c: CaseStudy;
  large?: boolean;
  delay?: number;
}) => (
  <motion.div {...rise(delay)} className={large ? "lg:col-span-2" : ""}>
    <Link
      to={`/case-studies/${c.slug}`}
      className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] ${c.tint} p-6 transition-transform duration-500 hover:-translate-y-1 sm:p-9`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <LogoChip c={c} size="sm" />
        <span className="rounded-full bg-white/80 px-3 py-1 text-[12px] font-semibold text-navy-dark">
          {c.client}
        </span>
        <span className="rounded-full bg-white/50 px-3 py-1 text-[12px] font-semibold text-navy-dark/85">
          {c.sector}
        </span>
        <span className="hidden rounded-full bg-white/50 px-3 py-1 text-[12px] font-semibold text-navy-dark/85 sm:inline">
          {c.market}
        </span>
      </div>

      <div
        className={
          large ? "mt-8 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end" : "mt-8"
        }
      >
        <div>
          <h2
            className={`font-semibold leading-[1.08] tracking-[-0.035em] text-navy-dark ${
              large
                ? "text-[2rem] sm:text-[2.6rem]"
                : "text-[1.6rem] sm:text-[1.9rem]"
            }`}
          >
            {c.card}
          </h2>
          <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-navy-dark/80">
            {c.summary}
          </p>
          <p className="mt-5 flex flex-wrap gap-1.5">
            {c.services.map((s) => (
              <span
                key={s}
                className="rounded-md bg-navy-dark/[0.07] px-2 py-1 text-[11.5px] font-semibold text-navy-dark/85"
              >
                {s}
              </span>
            ))}
          </p>
        </div>

        <div className={`grid grid-cols-2 gap-2.5 ${large ? "" : "mt-8"}`}>
          {c.headline.slice(0, large ? 4 : 2).map((h) => (
            <div
              key={h.l}
              className="rounded-2xl bg-white/70 p-4 backdrop-blur"
            >
              <p className="text-[1.5rem] font-semibold leading-none tracking-[-0.04em] text-navy-dark sm:text-[1.9rem]">
                {h.v}
              </p>
              <p className="mt-2 text-[12.5px] leading-snug text-navy-dark/75">
                {h.l}
              </p>
            </div>
          ))}
        </div>
      </div>

      <span className="mt-auto inline-flex items-center gap-2 pt-8 text-[14px] font-semibold text-navy-dark">
        Read the case study
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  </motion.div>
);

/* ---------------------------------- page ---------------------------------- */

const COUNTS = [
  { v: `${CASE_TOTALS.placements}+`, l: "placements in these write-ups" },
  { v: `${CASE_TOTALS.reviewed}+`, l: "sites reviewed by hand" },
  { v: `${CASE_TOTALS.rejected}`, l: "sites turned down" },
  {
    v: `${CASE_TOTALS.objectives} / ${CASE_TOTALS.objectives}`,
    l: "objectives met",
  },
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

const CaseStudies = () => {
  const [first, ...rest] = CASES;
  return (
    <PageLayout>
      <Seo
        title="Case Studies: Link Building & Digital PR Results"
        description="Real client work from Editorial HQ: SmileTutor to number one for “tuition” in Singapore, CryptoDesk to #1 in Dubai in five months, plus Ocuco, CapCut, Defender and an agency partner."
      />

      {/* hero */}
      <section className="bg-mist pb-14 pt-32 lg:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
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
                  className="block text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.045em] text-navy-dark sm:text-[3.8rem] lg:text-[4.4rem]"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease }}
                >
                  The work, the data,
                </motion.span>
                <motion.span
                  className="block pb-[0.06em] text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-[3.8rem] lg:text-[4.4rem]"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease }}
                >
                  <span className="accent-ink">and what it changed.</span>
                </motion.span>
              </h1>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
            >
              <p className="text-[17px] leading-relaxed text-navy-dark/75">
                Six clients, from a tuition agency in Singapore to a crypto
                desk in Dubai. Each one written up the same way: where they
                started, the plan, the placements, and what changed.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* the cases */}
      <section className="bg-mist pb-24">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <CaseCard c={first} large />
          {rest.map((c, i) => (
            <CaseCard key={c.slug} c={c} delay={0.08 * (i + 1)} />
          ))}
        </div>
      </section>

      {/* totals */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="mb-10 text-center text-[13px] font-semibold text-navy-dark/75">
            Across these six projects
          </p>
          <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
            {COUNTS.map((n, i) => (
              <motion.div
                key={n.l}
                className={`flex flex-col-reverse px-4 text-center ${i ? "lg:border-l lg:border-line" : ""} ${i % 2 ? "border-l border-line" : ""}`}
                {...rise(i * 0.06)}
              >
                <dt className="mt-3 text-[14px] text-navy-dark/75">{n.l}</dt>
                <dd className="text-[2.6rem] font-semibold leading-none tracking-[-0.05em] text-navy-dark sm:text-[3.2rem]">
                  {n.v}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </section>

      {/* what every case study covers */}
      <section className="bg-mist py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div className="mb-12 max-w-3xl" {...rise()}>
            <Eyebrow className="mb-4">How we write them up</Eyebrow>
            <H2>
              Eight sections, every time.
              <br />
              <Soft>Including the slow months.</Soft>
            </H2>
          </motion.div>
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SECTIONS.map((s, i) => (
              <motion.li
                key={s.id}
                className="rounded-2xl bg-white p-5 ring-1 ring-line"
                {...rise((i % 4) * 0.05)}
              >
                <span className="text-[12px] font-semibold tabular-nums text-navy-dark/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 text-[16px] font-semibold tracking-[-0.02em] text-navy-dark">
                  {s.t}
                </p>
                <p className="mt-1.5 text-[13.5px] leading-snug text-navy-dark/75">
                  {SECTION_NOTES[s.id]}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* how we report */}
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
          <div className="grid gap-5 md:grid-cols-2">
            <motion.div
              className="rounded-3xl bg-mist p-7 ring-1 ring-line sm:p-9"
              {...rise()}
            >
              <p className="flex items-center gap-2.5 text-[15px] font-semibold text-navy-dark">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-verified/[0.12]">
                  <Check className="h-4 w-4 text-verified" />
                </span>
                What we count
              </p>
              <ul className="mt-6 space-y-3.5">
                {COUNTED.map((t) => (
                  <li
                    key={t}
                    className="border-b border-line pb-3.5 text-[15px] leading-relaxed text-navy-dark/85 last:border-0"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              className="rounded-3xl bg-white p-7 ring-1 ring-line sm:p-9"
              {...rise(0.08)}
            >
              <p className="flex items-center gap-2.5 text-[15px] font-semibold text-navy-dark">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gap/[0.12]">
                  <X className="h-4 w-4 text-gap" />
                </span>
                What we leave out
              </p>
              <ul className="mt-6 space-y-3.5">
                {LEFT_OUT.map((t) => (
                  <li
                    key={t}
                    className="border-b border-line pb-3.5 text-[15px] leading-relaxed text-navy-dark/85 last:border-0"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CaseStudies;
