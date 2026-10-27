import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Check, Quote } from "lucide-react";
import { asset } from "@/lib/booking";
import type { CaseStudy } from "@/lib/cases";
import { Eyebrow, H2, ease, rise } from "../services/kit";

/**
 * The parts of a case study page. Built around evidence the client can
 * recognise: their own site, real screenshots, before/after numbers from
 * their reports, and the placements themselves. Sections only render when
 * the case has the data for them.
 */

/** A browser frame around a screenshot of the client's own site. */
export const BrowserFrame = ({
  src,
  domain,
  className = "",
}: {
  src: string;
  domain: string;
  className?: string;
}) => (
  <div
    className={`overflow-hidden rounded-2xl bg-white shadow-deep ring-1 ring-line ${className}`}
  >
    <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
      <span className="flex gap-1.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-navy-dark/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-navy-dark/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-navy-dark/15" />
      </span>
      {domain && (
        <span className="ml-2 truncate rounded-md bg-mist px-2.5 py-1 font-mono text-[11px] text-navy-dark/70">
          {domain}
        </span>
      )}
    </div>
    <img
      src={asset(src)}
      alt={`${domain} homepage`}
      className="block w-full"
      loading="eager"
    />
  </div>
);

/* --------------------------------- header -------------------------------- */

export const CaseHeader = ({ c }: { c: CaseStudy }) => (
  <section className="relative overflow-hidden bg-mist pb-16 pt-28 lg:pb-24 lg:pt-36">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.nav
        className="mb-8 flex items-center gap-2 text-[13px] text-navy-dark/70"
        aria-label="Breadcrumb"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/case-studies" className="hover:text-navy-dark">
          Case studies
        </Link>
        <span aria-hidden="true">/</span>
        <span className="font-semibold text-navy-dark">{c.client}</span>
      </motion.nav>

      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
        <div>
          <motion.p
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="rounded-full bg-white px-3 py-1 text-[12px] font-semibold text-navy-dark ring-1 ring-line">
              {c.sector}
            </span>
            <span className="rounded-full bg-white px-3 py-1 text-[12px] font-semibold text-navy-dark/80 ring-1 ring-line">
              {c.market}
            </span>
          </motion.p>
          <motion.h1
            className="mt-6 text-[2.3rem] font-semibold leading-[1.02] tracking-[-0.045em] text-navy-dark sm:text-[3.1rem] lg:text-[3.5rem]"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease }}
          >
            {c.title}
          </motion.h1>
          <motion.p
            className="mt-6 max-w-xl text-[17px] leading-relaxed text-navy-dark/75"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
          >
            {c.summary}
          </motion.p>
          <motion.div
            className="mt-7 flex flex-wrap items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            {c.services.map((s) => (
              <span
                key={s}
                className="rounded-md bg-navy-dark px-2.5 py-1 text-[12px] font-semibold text-white"
              >
                {s}
              </span>
            ))}
            {c.url && (
              <a
                href={c.url}
                target="_blank"
                rel="noopener"
                className="ml-1 inline-flex items-center gap-1 text-[13px] font-semibold text-navy-dark/75 hover:text-navy-dark"
              >
                {c.domain}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </motion.div>
        </div>

        {c.site && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
          >
            <BrowserFrame src={c.site} domain={c.domain} />
          </motion.div>
        )}
      </div>

      {c.headline.length > 0 && (
        <dl className="mt-14 grid gap-3 sm:grid-cols-3">
          {c.headline.map((h, i) => (
            <motion.div
              key={h.l}
              className="rounded-3xl bg-white p-6 ring-1 ring-line"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease }}
            >
              <dd className="accent-ink text-[2.6rem] font-semibold leading-none tracking-[-0.05em]">
                {h.v}
              </dd>
              <dt className="mt-3 text-[14px] leading-snug text-navy-dark/75">
                {h.l}
              </dt>
            </motion.div>
          ))}
        </dl>
      )}
    </div>
  </section>
);

/* ------------------------------ body sections ----------------------------- */

const Section = ({
  id,
  n,
  title,
  children,
}: {
  id: string;
  n: string;
  title: string;
  children: React.ReactNode;
}) => (
  <motion.section id={id} className="scroll-mt-28" {...rise()}>
    <Eyebrow className="mb-3">{n}</Eyebrow>
    <h2 className="text-[1.9rem] font-semibold leading-[1.08] tracking-[-0.04em] text-navy-dark sm:text-[2.3rem]">
      {title}
    </h2>
    <div className="mt-6">{children}</div>
  </motion.section>
);

const Paras = ({ paras }: { paras: string[] }) => (
  <div className="max-w-2xl space-y-4">
    {paras.map((p) => (
      <p key={p} className="text-[17px] leading-[1.75] text-navy-dark/80">
        {p}
      </p>
    ))}
  </div>
);

export const tocFor = (c: CaseStudy) =>
  [
    ["client", "The client"],
    ["challenge", "The challenge"],
    ["approach", "What we did"],
    c.placements?.length ? ["placements", "Placements"] : null,
    c.results ? ["results", "Results"] : null,
    c.evidence?.length ? ["evidence", "The evidence"] : null,
  ].filter(Boolean) as [string, string][];

export const Toc = ({ c }: { c: CaseStudy }) => (
  <nav className="sticky top-28 hidden lg:block" aria-label="On this page">
    <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-dark/70">
      On this page
    </p>
    <ol className="space-y-2.5 border-l border-line">
      {tocFor(c).map(([id, t], i) => (
        <li key={id}>
          <a
            href={`#${id}`}
            className="-ml-px block border-l border-transparent pl-4 text-[14px] text-navy-dark/70 transition-colors hover:border-navy-dark hover:text-navy-dark"
          >
            <span className="mr-2 tabular-nums text-navy-dark/45">
              {String(i + 1).padStart(2, "0")}
            </span>
            {t}
          </a>
        </li>
      ))}
    </ol>
  </nav>
);

export const About = ({ c }: { c: CaseStudy }) => (
  <Section id="client" n="01" title={`About ${c.client}`}>
    <div className="grid gap-8 xl:grid-cols-[1fr_300px]">
      <Paras paras={c.about.paras} />
      <aside className="h-fit rounded-3xl bg-mist p-6 ring-1 ring-line">
        <dl className="space-y-3">
          {c.about.facts.map(([k, v]) => (
            <div key={k} className="border-b border-line pb-3 last:border-0 last:pb-0">
              <dt className="text-[12px] text-navy-dark/70">{k}</dt>
              <dd className="mt-0.5 text-[15px] font-semibold text-navy-dark">
                {v}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-[12px] text-navy-dark/60">{c.about.source}</p>
      </aside>
    </div>
  </Section>
);

export const Challenge = ({ c }: { c: CaseStudy }) => (
  <Section id="challenge" n="02" title="The challenge">
    <Paras paras={c.challenge.paras} />
    <ul className="mt-8 grid gap-3 md:grid-cols-3">
      {c.challenge.points.map((p) => (
        <li
          key={p}
          className="rounded-2xl bg-white p-5 text-[15px] leading-snug text-navy-dark/85 ring-1 ring-line"
        >
          <span className="mb-3 block h-1 w-8 rounded-full bg-[linear-gradient(90deg,rgb(var(--plume-warm)),rgb(var(--plume-cool)))]" />
          {p}
        </li>
      ))}
    </ul>
  </Section>
);

export const Approach = ({ c }: { c: CaseStudy }) => (
  <Section id="approach" n="03" title="What we did">
    <p className="max-w-2xl text-[17px] leading-[1.75] text-navy-dark/80">
      {c.approach.lead}
    </p>
    <ol className="mt-8 space-y-3">
      {c.approach.steps.map((s, i) => (
        <li
          key={s.t}
          className="grid gap-4 rounded-3xl bg-mist p-6 ring-1 ring-line sm:grid-cols-[56px_1fr] sm:p-7"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-dark text-[15px] font-semibold text-white">
            {i + 1}
          </span>
          <span>
            <span className="block text-[18px] font-semibold tracking-[-0.02em] text-navy-dark">
              {s.t}
            </span>
            <span className="mt-2 block text-[15.5px] leading-relaxed text-navy-dark/75">
              {s.d}
            </span>
          </span>
        </li>
      ))}
    </ol>
  </Section>
);

export const Placements = ({ c }: { c: CaseStudy }) =>
  c.placements?.length ? (
    <Section id="placements" n="04" title="Where the work lives">
      <ul className="divide-y divide-line overflow-hidden rounded-3xl ring-1 ring-line">
        {c.placements.map((p) => (
          <li key={p.site} className="bg-white p-6 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-[18px] font-semibold tracking-[-0.02em] text-navy-dark">
                {p.site}
              </span>
              <span className="rounded-full bg-mist px-3 py-1 text-[12px] font-semibold text-navy-dark/80 ring-1 ring-line">
                {p.kind}
              </span>
            </div>
            <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-navy-dark/75">
              {p.note}
            </p>
            {p.url && (
              <a
                href={p.url}
                target="_blank"
                rel="noopener"
                className="mt-3 inline-flex items-center gap-1 text-[14px] font-semibold text-navy-dark"
              >
                Read the article
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </li>
        ))}
      </ul>
    </Section>
  ) : null;

/** before/after bars that grow into view */
const Bars = ({
  bars,
}: {
  bars: NonNullable<CaseStudy["results"]>["bars"];
}) => (
  <div className="grid gap-4 md:grid-cols-3">
    {bars!.map((b, i) => {
      const fromPct = (b.from / b.to) * 100;
      return (
        <motion.div
          key={b.label}
          className="rounded-3xl bg-navy-dark p-6 text-white"
          {...rise(i * 0.08)}
        >
          <p className="text-[13.5px] leading-snug text-white/70">{b.label}</p>
          <p className="mt-3 flex items-baseline gap-2">
            <span className="text-[2.2rem] font-semibold leading-none tracking-[-0.045em]">
              {b.toL}
            </span>
            <span className="text-[13px] text-white/60">from {b.fromL}</span>
          </p>
          <div className="mt-6 space-y-2.5">
            <div>
              <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-white/35"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${fromPct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease, delay: 0.2 }}
                />
              </div>
              <p className="mt-1 text-[11.5px] text-white/55">Before</p>
            </div>
            <div>
              <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-[linear-gradient(90deg,rgb(var(--plume-warm)),rgb(var(--plume-cool)))]"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.3, ease, delay: 0.35 }}
                />
              </div>
              <p className="mt-1 text-[11.5px] text-white/55">After</p>
            </div>
          </div>
        </motion.div>
      );
    })}
  </div>
);

export const Results = ({ c, n }: { c: CaseStudy; n: string }) =>
  c.results ? (
    <Section id="results" n={n} title="The results">
      <p className="max-w-2xl text-[17px] leading-[1.75] text-navy-dark/80">
        {c.results.lead}
      </p>
      {c.results.bars && (
        <div className="mt-8">
          <Bars bars={c.results.bars} />
        </div>
      )}
      {c.results.rankings && (
        <div className="mt-6 overflow-hidden rounded-3xl bg-white ring-1 ring-line">
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-line bg-mist px-6 py-3 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-navy-dark/70">
            <span>Keyword</span>
            <span className="w-24 text-right">Searches / mo</span>
            <span className="w-16 text-right">Position</span>
          </div>
          <ul>
            {c.results.rankings.map((r, i) => (
              <motion.li
                key={r.k}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-line px-6 py-3.5 last:border-0"
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <span className="truncate text-[15px] text-navy-dark">
                  {r.k}
                </span>
                <span className="w-24 text-right text-[14px] tabular-nums text-navy-dark/70">
                  {r.vol}
                </span>
                <span className="flex w-16 justify-end">
                  <span className="inline-flex h-8 min-w-[2.5rem] items-center justify-center rounded-full bg-[linear-gradient(90deg,rgb(var(--plume-warm)),rgb(var(--plume-cool)))] px-2 text-[13px] font-bold text-white">
                    #{r.pos}
                  </span>
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-8">
        <Paras paras={c.results.paras} />
      </div>
      <p className="mt-5 text-[12.5px] text-navy-dark/60">
        Source: {c.results.source}
      </p>
    </Section>
  ) : null;

export const Evidence = ({ c, n }: { c: CaseStudy; n: string }) =>
  c.evidence?.length ? (
    <Section id="evidence" n={n} title="The evidence">
      <div className="grid gap-5 md:grid-cols-2">
        {c.evidence.map((e) => (
          <figure key={e.src}>
            <a
              href={asset(e.src)}
              target="_blank"
              rel="noopener"
              className="block overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-line transition-transform duration-500 hover:-translate-y-1"
            >
              <img
                src={asset(e.src)}
                alt={e.alt}
                loading="lazy"
                className="block aspect-[4/3] w-full object-cover object-top"
              />
            </a>
            <figcaption className="mt-3 text-[13.5px] leading-snug text-navy-dark/75">
              {e.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  ) : null;

/** Only approved wording ever reaches the page. */
export const Testimonial = ({ c }: { c: CaseStudy }) => {
  const t = c.testimonial;
  if (!t?.approved || !t.text) return null;
  return (
    <motion.figure
      className="relative overflow-hidden rounded-[28px] bg-navy-dark px-7 py-10 text-white sm:px-12 sm:py-14"
      {...rise()}
    >
      <Quote className="h-8 w-8 text-mark" />
      <blockquote className="mt-6 max-w-3xl text-[1.5rem] font-medium leading-[1.3] tracking-[-0.03em] sm:text-[1.9rem]">
        “{t.text}”
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-3">
        {t.photo && (
          <img
            src={asset(t.photo)}
            alt={t.who}
            className="h-11 w-11 rounded-full object-cover ring-2 ring-mark/50"
          />
        )}
        <span className="text-[14px] text-white/75">
          <span className="block font-semibold text-white">{t.who}</span>
          {t.role}
        </span>
      </figcaption>
    </motion.figure>
  );
};

/* ------------------------------- next case ------------------------------- */

export const NextCase = ({ next }: { next: CaseStudy }) => (
  <section className="bg-mist py-16 lg:py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Link
        to={`/case-studies/${next.slug}`}
        className="group flex flex-col justify-between gap-6 rounded-[28px] bg-white p-7 ring-1 ring-line transition-shadow hover:shadow-soft sm:flex-row sm:items-center sm:p-10"
      >
        <span>
          <span className="block text-[12px] font-semibold uppercase tracking-[0.16em] text-navy-dark/70">
            Next case study · {next.client}
          </span>
          <span className="mt-2 block text-[1.6rem] font-semibold leading-tight tracking-[-0.035em] text-navy-dark sm:text-[2rem]">
            {next.card}
          </span>
        </span>
        <span className="inline-flex flex-none items-center gap-2 rounded-full bg-navy-dark px-6 py-3 text-[14px] font-semibold text-white">
          Read it
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>
    </div>
  </section>
);

/* ------------------------------ shared cards ----------------------------- */

/** A case study card, used on the index, homepage and service pages. */
export const CaseCard = ({
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
      className={`group flex h-full flex-col overflow-hidden rounded-[28px] ${c.tint} transition-transform duration-500 hover:-translate-y-1`}
    >
      <div
        className={`flex flex-1 flex-col p-6 sm:p-8 ${large ? "lg:grid lg:grid-cols-[1fr_1fr] lg:gap-10" : ""}`}
      >
        <div className="flex flex-1 flex-col">
          <p className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white/80 px-3 py-1 text-[12px] font-semibold text-navy-dark">
              {c.client}
            </span>
            <span className="rounded-full bg-white/45 px-3 py-1 text-[12px] font-semibold text-navy-dark/85">
              {c.sector}
            </span>
          </p>
          <h3
            className={`mt-6 font-semibold leading-[1.08] tracking-[-0.035em] text-navy-dark ${
              large ? "text-[2rem] sm:text-[2.5rem]" : "text-[1.45rem] sm:text-[1.65rem]"
            }`}
          >
            {c.card}
          </h3>
          {large && (
            <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-navy-dark/80">
              {c.summary}
            </p>
          )}
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
          <span className="mt-auto inline-flex items-center gap-2 pt-7 text-[14px] font-semibold text-navy-dark">
            Read the case study
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
        {large && c.headline.length > 0 && (
          <div className="mt-8 grid gap-2.5 lg:mt-0 lg:content-end">
            {c.headline.map((h) => (
              <div key={h.l} className="rounded-2xl bg-white/75 p-4 backdrop-blur">
                <p className="text-[1.9rem] font-semibold leading-none tracking-[-0.045em] text-navy-dark">
                  {h.v}
                </p>
                <p className="mt-1.5 text-[13px] leading-snug text-navy-dark/75">
                  {h.l}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Link>
  </motion.div>
);

/** A row of real client work, for service pages and the homepage. */
export const ClientWork = ({
  cases,
  eyebrow = "Client work",
  title,
  soft,
}: {
  cases: CaseStudy[];
  eyebrow?: string;
  title: string;
  soft?: string;
}) => {
  const [first, ...rest] = cases;
  if (!first) return null;
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
          {...rise()}
        >
          <div className="max-w-3xl">
            <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
            <H2>
              {title}
              {soft && (
                <>
                  <br />
                  <span className="accent-ink">{soft}</span>
                </>
              )}
            </H2>
          </div>
          <Link
            to="/case-studies"
            className="inline-flex flex-none items-center gap-2 text-[14.5px] font-semibold text-navy-dark"
          >
            All case studies
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
        <div className="grid gap-4 lg:grid-cols-2">
          <CaseCard c={first} large />
          {rest.slice(0, 2).map((c, i) => (
            <CaseCard key={c.slug} c={c} delay={0.06 * (i + 1)} />
          ))}
        </div>
      </div>
    </section>
  );
};

/** small check list used on the index */
export const Checks = ({ items }: { items: string[] }) => (
  <ul className="space-y-3">
    {items.map((x) => (
      <li key={x} className="flex gap-2.5 text-[15px] leading-snug text-navy-dark/85">
        <Check className="mt-0.5 h-4 w-4 flex-none text-verified" />
        {x}
      </li>
    ))}
  </ul>
);
