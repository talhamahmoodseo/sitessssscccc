import { motion } from "motion/react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { GrowthChart, IndexationReport, SourcingNotes } from "./case-depth";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";
import { asset, openBooking } from "@/lib/booking";
import { CASE_STUDIES } from "@/lib/content";

/**
 * /case-studies/:slug — the published case file.
 *
 * Identity: this page reads like a file, not a sales page. Figures are set as
 * display numerals, ledgers are carried on hairline rules rather than in boxes,
 * and the cover plate interlocks the hero with the opening narrative.
 *
 * Surface ladder, in order:
 *   stone → mist → navy-dark → white → clay → mark → espresso → stone →
 *   navy-dark → mist
 *
 * Seven distinct surfaces, two darks, one amber band (the result), and never
 * more than two consecutive light sections.
 *
 * Register: the agency reporting its own work. Credibility comes from the named
 * methodology (AuthorityOS™) and from the figures, so nothing here is defined
 * against anybody else. Sourcing appears once, as a note inside the reporting
 * section, because some clients review every candidate domain and others leave
 * sourcing to us — it is part of the process, not the product.
 */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.55, delay, ease: EASE },
});

const find = (slug?: string) => CASE_STUDIES.find((c) => c.slug === slug);

/** The pastel the case carries, softened so it can sit behind the cover plate
 *  without competing with the amber band. Literal classes so Tailwind sees them. */
const PLATE: Record<string, string> = {
  "bg-butter": "bg-butter/40",
  "bg-mint": "bg-mint/40",
  "bg-lilac": "bg-lilac/40",
  "bg-blush": "bg-blush/40",
  "bg-sky": "bg-sky/40",
};

/** Eyebrow + a two-part headline: the second line turns the first. */
const Head = ({
  eyebrow,
  pre,
  em,
  dark = false,
  className = "",
}: {
  eyebrow: string;
  pre: string;
  em: string;
  dark?: boolean;
  className?: string;
}) => (
  <motion.div className={className} {...rise()}>
    <p
      className={`mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] ${
        dark ? "text-white/70" : "text-navy-dark/70"
      }`}
    >
      {eyebrow}
    </p>
    <h2
      className={`text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[2.4rem] ${
        dark ? "text-white" : "text-navy-dark"
      }`}
    >
      {pre}{" "}
      <span className={dark ? "text-white/70" : "text-navy-dark/65"}>{em}</span>
    </h2>
  </motion.div>
);

/* --------------------------- derived from the file -------------------------- */

/** The month the curve turned hardest, read straight off the series. */
const steepest = (series: number[]) => {
  let month = 1;
  let best = -Infinity;
  for (let i = 1; i < series.length; i++) {
    const d = series[i] / series[i - 1] - 1;
    if (d > best) {
      best = d;
      month = i;
    }
  }
  return { month, pct: Math.round(best * 100) };
};

const CaseStudy = () => {
  const { slug } = useParams();
  const s = find(slug);
  if (!s) return <Navigate to="/case-studies" replace={true} />;

  const others = CASE_STUDIES.filter((c) => c.slug !== s.slug);
  const placed = Number(s.indexation.rate.split("/")[0].trim());
  const shipped = s.work.filter((row) => !/reject/i.test(row[0]));
  const topDR = Math.max(
    ...s.placements.map((p) => Number(String(p[1]).replace(/\D/g, "")) || 0),
  );
  const turn = steepest(s.series);
  const startClicks = s.series[0].toLocaleString();
  const endClicks = s.series[s.series.length - 1].toLocaleString();

  return (
    <PageLayout>
      <Seo title={`${s.title} — case study`} description={s.line} />

      {/* ───────────────────────── 1 · hero — stone ───────────────────────── */}
      <div className="bg-stone pb-0 pt-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/case-studies"
            className="mb-8 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-navy-dark/70 transition-colors duration-300 hover:text-navy-dark"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {" All case studies"}
          </Link>
          <motion.p
            className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {s.industry}
            {" · "}
            {s.duration}
          </motion.p>
          <motion.h1
            className="text-balance mb-6 max-w-3xl text-[2.4rem] font-semibold leading-[1.03] tracking-[-0.035em] text-navy-dark sm:text-5xl lg:text-[3.4rem]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05, ease: EASE }}
          >
            {s.title}
          </motion.h1>
          <motion.p
            className="max-w-2xl text-[18px] leading-relaxed text-navy-dark/75"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
          >
            {s.line}
          </motion.p>

          {/* outcome ledger — display numerals on hairline rules, no box */}
          <motion.dl
            className="mt-12 grid gap-y-9 border-t border-navy-dark/20 pt-9 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-navy-dark/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          >
            {s.outcome.map(([value, label], i) => (
              <div
                key={label}
                className={`flex flex-col-reverse ${i ? "lg:pl-7" : ""}`}
              >
                <dt className="mt-2 text-[12.5px] leading-snug text-navy-dark/70">
                  {label}
                </dt>
                <dd className="text-[2.5rem] font-semibold leading-none tracking-[-0.04em] text-navy-dark tabular-nums sm:text-[2.9rem]">
                  {value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* cover plate — a pastel panel pulled down so hero and narrative interlock */}
        <div className="relative z-10 mx-auto -mb-20 mt-14 max-w-5xl px-4 sm:px-6 lg:-mb-28 lg:px-8">
          <motion.figure
            className={`${PLATE[s.bg] ?? "bg-butter/40"} rounded-[1.75rem] p-3 shadow-deep sm:p-4`}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
          >
            <img
              src={asset(s.cover)}
              alt={`${s.client} — ${s.title}`}
              className="aspect-[16/8] w-full rounded-[1.3rem] object-cover"
            />
          </motion.figure>
        </div>
      </div>

      {/* ─────────────────────── 2 · the situation — mist ─────────────────── */}
      <div className="bg-mist pb-24 pt-40 lg:pb-28 lg:pt-48">
        <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-[1.06fr_0.94fr] lg:gap-16 lg:px-8">
          <div>
            <Head
              eyebrow="The situation"
              pre="The Demand Was There."
              em="The Authority Wasn't."
            />
            {s.situation.map((p, i) => (
              <motion.p
                key={i}
                className="mt-5 text-[16px] leading-[1.72] text-navy-dark/75"
                {...rise(0.05 + i * 0.05)}
              >
                {p}
              </motion.p>
            ))}
            <motion.p
              className="mt-5 text-[16px] leading-[1.72] text-navy-dark/75"
              {...rise(0.15)}
            >
              {`The engagement opened with research rather than outreach. AuthorityOS™ mapped how Google was categorising the site, which publications its category results were being assembled from, and which of its pages already sat close enough to respond to authority. That map set the order of everything that followed.`}
            </motion.p>
            <motion.p
              className="mt-5 text-[16px] leading-[1.72] text-navy-dark/75"
              {...rise(0.2)}
            >
              {`Two numbers frame the engagement: ${startClicks} organic clicks a month at the start, ${endClicks} by the end of the reporting window. Everything between those two figures is published below — the pages we chose, the placements that ran, when Google indexed each one, and the month the curve turned.`}
            </motion.p>
          </div>

          <div className="space-y-5 lg:pt-4">
            {/* fact sheet — a white card floating on the tinted ground */}
            <motion.dl
              className="rounded-2xl bg-white p-7 shadow-lift"
              {...rise(0.1)}
            >
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-dark/70">
                The file
              </p>
              {[
                ["Client", s.client],
                ["Sector", s.industry],
                ["Engagement", s.duration],
                ["Clicks at month 0", startClicks],
              ].map(([k, v], i) => (
                <div
                  key={k}
                  className={`flex items-baseline justify-between gap-6 py-3 ${
                    i ? "border-t border-line" : ""
                  }`}
                >
                  <dt className="text-[13.5px] text-navy-dark/70">{k}</dt>
                  <dd className="text-right text-[14px] font-semibold tabular-nums text-navy-dark">
                    {v}
                  </dd>
                </div>
              ))}
            </motion.dl>

            {/* bordered inset panel on the tinted ground */}
            <motion.div
              className="rounded-2xl border border-line p-7"
              {...rise(0.15)}
            >
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-dark/70">
                What was holding the pages back
              </p>
              <ol>
                {s.blockers.map((b, i) => (
                  <li
                    key={b}
                    className={`flex gap-4 py-4 ${i ? "border-t border-line" : ""}`}
                  >
                    <span className="flex-none text-[13px] font-bold tabular-nums text-navy-dark/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[14.5px] leading-relaxed text-navy-dark/75">
                      {b}
                    </span>
                  </li>
                ))}
              </ol>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ──────────────────── 3 · the strategy — navy-dark ───────────────── */}
      <div className="bg-navy-dark py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Head
            eyebrow="The strategy"
            pre="Research First."
            em="Then the Order It Gets Built In."
            dark={true}
            className="max-w-2xl"
          />
          <motion.p
            className="mt-6 max-w-2xl text-[15.5px] leading-[1.7] text-white/75"
            {...rise(0.05)}
          >
            Knowing a site needs authority is the straightforward part. The
            useful questions are which pages should receive it first, which
            publications are capable of moving those pages, and at what pace.
            AuthorityOS™ answered the first two. The plan below answered the
            third.
          </motion.p>

          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            {s.strategy.map((step, i) => (
              <motion.article
                key={step.t}
                className="flex flex-col rounded-2xl bg-white p-7 shadow-deep"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.09, ease: EASE }}
              >
                <p className="mb-5 text-[2.4rem] font-semibold leading-none tracking-[-0.045em] text-navy-dark/55 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mb-2.5 text-[17px] font-semibold leading-snug tracking-[-0.02em] text-navy-dark">
                  {step.t}
                </h3>
                <p className="text-[14px] leading-relaxed text-navy-dark/75">
                  {step.d}
                </p>
              </motion.article>
            ))}
          </div>

          {/* bordered inset panel — the plan compressed to one line */}
          <motion.div
            className="mt-5 rounded-2xl border border-white/15 bg-white/[0.04] px-7 py-7 lg:flex lg:items-center lg:justify-between lg:gap-10"
            {...rise(0.1)}
          >
            <p className="text-[16.5px] font-semibold leading-snug tracking-[-0.01em] text-white sm:text-[18px]">
              {`${placed} placements over ${s.duration.toLowerCase()}, concentrated on the pages already closest to the positions worth having.`}
            </p>
            <dl className="mt-6 flex shrink-0 gap-8 lg:mt-0">
              {[
                ["Placements", String(placed)],
                ["Top placement", `DR ${topDR}`],
                ["Phases", String(s.timeline.length)],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/70">
                    {k}
                  </dt>
                  <dd className="mt-1.5 text-[1.3rem] font-semibold leading-none tabular-nums text-white">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>

      {/* ───────────────────────── 4 · the work — white ──────────────────── */}
      <div className="bg-white py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Head
            eyebrow="The work"
            pre="Every Placement."
            em="Line by Line."
            className="max-w-2xl"
          />

          <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* ledgers carried on hairline rules rather than in boxes */}
            <motion.div {...rise(0.05)}>
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-dark/70">
                What shipped
              </p>
              <dl className="border-t border-line">
                {shipped.map(([label, count]) => (
                  <div
                    key={label}
                    className="flex items-baseline justify-between gap-6 border-b border-line py-4"
                  >
                    <dt className="text-[14.5px] text-navy-dark/80">{label}</dt>
                    <dd className="text-[1.25rem] font-semibold leading-none tabular-nums text-navy-dark">
                      {count}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>

            <motion.div {...rise(0.1)}>
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-dark/70">
                Sample placements
              </p>
              <ul className="border-t border-line">
                {s.placements.map(([site, dr, kind]) => (
                  <li
                    key={site}
                    className="flex items-center gap-3 border-b border-line py-4"
                  >
                    <span className="flex-1 truncate text-[14px] font-medium text-navy-dark/85">
                      {site}
                    </span>
                    <span className="flex-none text-[11px] font-bold tabular-nums text-navy-dark/70">
                      {dr}
                    </span>
                    <span className="flex-none rounded border border-line px-2 py-1 text-[9.5px] font-bold tracking-wider text-navy-dark/80">
                      {kind}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.figure
            className="mt-16 overflow-hidden rounded-2xl border border-line"
            {...rise(0.1)}
          >
            <img
              src={asset(s.shot)}
              alt={`Sample placement from the ${s.client} campaign`}
              className="aspect-[16/7] w-full object-cover"
            />
            <figcaption className="border-t border-line bg-mist px-5 py-3.5 text-[12.5px] text-navy-dark/70">
              Sample placement from this campaign · representative image
            </figcaption>
          </motion.figure>
        </div>
      </div>

      {/* ──────────────────────── 5 · the growth — clay ──────────────────── */}
      <div className="bg-mist py-24 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Head
            eyebrow="The growth"
            pre="Authority Compounds."
            em="The Curve Shows When."
            className="mb-12 max-w-2xl"
          />
          <GrowthChart series={s.series} seriesLabel={s.seriesLabel} />
          <motion.p
            className="mt-7 max-w-3xl text-[15px] leading-[1.7] text-navy-dark/75"
            {...rise(0.1)}
          >
            {`The steepest month was month ${turn.month}, ${turn.pct}% above the one before it — far enough in for the earliest placements to have been indexed long enough to count. Authority arrives on a publication's schedule, so the first two months of a programme are usually the flattest part of any curve we publish.`}
          </motion.p>
        </div>
      </div>

      {/* ─────────────────── 6 · the result — amber, once ────────────────── */}
      <div className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <motion.div {...rise()}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/75">
                The result
              </p>
              <p className="mt-3 text-[4.2rem] font-semibold leading-[0.88] tracking-[-0.05em] text-navy-dark tabular-nums sm:text-[5rem]">
                {s.headline}
              </p>
              <p className="mt-3 text-[13px] font-bold uppercase tracking-[0.14em] text-navy-dark/75">
                {s.metric}
              </p>
            </motion.div>

            <motion.div {...rise(0.08)}>
              <p className="text-[1.25rem] font-semibold leading-[1.38] tracking-[-0.02em] text-navy-dark sm:text-[1.5rem]">
                {`${placed} editorial placements over ${s.duration.toLowerCase()}, pointed at a short list of pages rather than spread across the site. That is what the curve is made of.`}
              </p>
              <dl className="mt-7 flex flex-wrap gap-x-12 gap-y-5 border-t border-navy-dark/20 pt-6">
                {[
                  ["Indexed", s.indexation.rate],
                  ["Median time to index", s.indexation.median],
                  ["Engagement", s.duration],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-navy-dark/75">
                      {k}
                    </dt>
                    <dd className="mt-1.5 text-[1.2rem] font-semibold leading-none tabular-nums text-navy-dark">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ────────────────── 7 · the reporting — espresso ─────────────────── */}
      <div className="bg-navy-dark py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Head
            eyebrow="The reporting"
            pre="Every Link,"
            em="and When Google Took It."
            dark={true}
            className="mb-14 max-w-2xl"
          />
          <IndexationReport data={s.indexation} dark={true} />
          <div className="mt-16 border-t border-white/12 pt-14">
            <SourcingNotes
              items={s.rejected}
              reviewed={s.reviewed}
              placed={placed}
              dark={true}
            />
          </div>
        </div>
      </div>

      {/* ─────────────────────── 8 · the timeline — stone ────────────────── */}
      <div className="bg-stone py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Head
            eyebrow="The timeline"
            pre="Month by Month."
            em="What Changed When."
            className="mb-12 max-w-2xl"
          />
          <div className="relative">
            {/* hairline rail carrying the layout */}
            <span
              className="absolute left-2 right-2 top-[7px] hidden h-px bg-navy-dark/20 lg:block"
              aria-hidden="true"
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {s.timeline.map((phase, i) => (
                <motion.div
                  key={phase.m}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.07, ease: EASE }}
                >
                  <span
                    className="relative z-10 mb-7 ml-2 hidden h-[15px] w-[15px] rounded-full border-[3px] border-stone bg-navy-dark lg:block"
                    aria-hidden="true"
                  />
                  <div className="rounded-2xl bg-white p-6 shadow-lift">
                    <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-dark/70">
                      {phase.m}
                    </p>
                    <h3 className="mb-2 text-[15.5px] font-semibold text-navy-dark">
                      {phase.t}
                    </h3>
                    <p className="text-[13.5px] leading-relaxed text-navy-dark/75">
                      {phase.d}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ──────────────── 9 · the client's words — navy-dark ─────────────── */}
      <div className="bg-navy-dark py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <motion.blockquote
            className="text-[1.6rem] leading-[1.35] tracking-[-0.02em] text-white sm:text-[2rem]"
            {...rise()}
          >
            {"“"}
            {s.quote.text}
            {"”"}
          </motion.blockquote>
          <motion.p
            className="mt-6 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/70"
            {...rise(0.05)}
          >
            {s.quote.who}
            {" · sample"}
          </motion.p>
          <motion.div className="mt-10" {...rise(0.1)}>
            <button
              onClick={openBooking}
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-[14.5px] font-semibold text-navy-dark transition-colors duration-300 hover:bg-white/90"
            >
              Get a plan like this for your site
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </motion.div>
          <motion.p
            className="mt-5 flex items-center justify-center gap-2 text-[12.5px] text-white/70"
            {...rise(0.15)}
          >
            <Check className="h-3.5 w-3.5" />
            {" Free visibility audit within 48 hours"}
          </motion.p>
        </div>
      </div>

      {/* ───────────────────── 10 · more campaigns — mist ────────────────── */}
      <div className="bg-mist py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-balance mb-7 text-2xl font-semibold tracking-[-0.02em] text-navy-dark">
            More campaigns
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {others.map((c) => (
              <Link
                key={c.slug}
                to={`/case-studies/${c.slug}`}
                className="group flex items-stretch overflow-hidden rounded-2xl bg-white shadow-soft transition-shadow duration-500 hover:shadow-lift"
              >
                <span
                  className={`${c.bg} flex w-32 flex-none items-center justify-center`}
                >
                  <span className="text-[1.6rem] font-semibold tracking-[-0.03em] text-navy-dark">
                    {c.headline}
                  </span>
                </span>
                <span className="p-5">
                  <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-dark/70">
                    {c.industry}
                  </span>
                  <span className="block text-[15.5px] font-semibold leading-snug text-navy-dark group-hover:underline">
                    {c.title}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CaseStudy;
