import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Check,
  CircleAlert,
  Quote,
  X,
} from "lucide-react";
import { asset } from "@/lib/booking";
import type { CaseStudy } from "@/lib/cases";
import { CARD, GlowPanel, ease, rise } from "../services/kit";
import { BrowserFrame, LogoChip } from "./CaseParts";
import { Columns, GrowthChart, Positions, StackBar } from "./charts";

/**
 * The case study report (restored from round 7 and extended in round 9):
 * header with the headline numbers, a visual band made for each client,
 * then numbered sections with a sticky contents rail. A section only
 * renders when the case has the data for it, and the numbering follows.
 */

/** every section a write-up can have, in order (also used on the index) */
export const SECTIONS = [
  { id: "overview", t: "Overview" },
  { id: "challenge", t: "The challenge" },
  { id: "objectives", t: "Objectives" },
  { id: "strategy", t: "Strategy" },
  { id: "work", t: "Work performed" },
  { id: "links", t: "Link building" },
  { id: "results", t: "Results" },
  { id: "outcomes", t: "Outcomes" },
] as const;

type Id = (typeof SECTIONS)[number]["id"];

export const sectionsFor = (c: CaseStudy) =>
  SECTIONS.filter((s) => {
    if (s.id === "objectives") return !!c.objectives?.length;
    if (s.id === "work") return !!c.work?.length;
    if (s.id === "links") return !!c.links;
    if (s.id === "results") return !!c.results;
    return true;
  });

const num = (c: CaseStudy, id: Id) =>
  sectionsFor(c).findIndex((s) => s.id === id) + 1;

/* ---------------------------------- bits ---------------------------------- */

const Section = ({
  id,
  c,
  title,
  children,
}: {
  id: Id;
  c: CaseStudy;
  title: string;
  children: ReactNode;
}) => (
  <section
    id={id}
    className="scroll-mt-28 border-t border-line pt-12 first:border-0 first:pt-0"
  >
    <motion.div {...rise()}>
      <p className="text-[12px] font-semibold tabular-nums text-navy-dark/70">
        {String(num(c, id)).padStart(2, "0")}
      </p>
      <h2 className="mt-2 text-[1.9rem] font-semibold leading-tight tracking-[-0.035em] text-navy-dark sm:text-[2.3rem]">
        {title}
      </h2>
    </motion.div>
    <div className="mt-8">{children}</div>
  </section>
);

const P = ({ children }: { children: ReactNode }) => (
  <p className="max-w-3xl text-[16.5px] leading-[1.75] text-navy-dark/80">
    {children}
  </p>
);

const Table = ({ head, rows }: { head: string[]; rows: ReactNode[][] }) => (
  <div className="overflow-x-auto rounded-2xl ring-1 ring-line">
    <table className="w-full min-w-[520px] text-left">
      <thead className="bg-mist">
        <tr>
          {head.map((h, i) => (
            <th
              key={`${h}-${i}`}
              className="px-4 py-3 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-navy-dark/70"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className="border-t border-line">
            {r.map((cell, j) => (
              <td
                key={j}
                className={`px-4 py-3.5 text-[14.5px] ${j ? "text-navy-dark/85" : "font-semibold text-navy-dark"}`}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Panel = ({
  title,
  note,
  children,
  className = "",
}: {
  title: string;
  note?: string;
  children: ReactNode;
  className?: string;
}) => (
  <motion.div
    className={`rounded-3xl bg-white p-6 ring-1 ring-line sm:p-7 ${className}`}
    {...rise()}
  >
    <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
      <p className="text-[15px] font-semibold text-navy-dark">{title}</p>
      {note && <p className="text-[12px] text-navy-dark/70">{note}</p>}
    </div>
    {children}
  </motion.div>
);

const Pos = ({ n }: { n: string }) => (
  <span className="inline-flex h-7 min-w-[2.3rem] items-center justify-center rounded-full bg-[linear-gradient(90deg,rgb(var(--plume-warm)),rgb(var(--plume-cool)))] px-2 text-[12.5px] font-bold text-white">
    #{n}
  </span>
);

const HEAD_COLS: Record<number, string> = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

/* --------------------------------- header --------------------------------- */

export const CaseHeader = ({ c }: { c: CaseStudy }) => (
  <header className="bg-mist pb-14 pt-32 lg:pt-36">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Link
        to="/case-studies"
        className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-navy-dark/80 hover:text-navy-dark"
      >
        <ArrowLeft className="h-4 w-4" />
        All case studies
      </Link>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <div className="flex flex-wrap items-center gap-3">
            <LogoChip c={c} />
            <p className="text-[13px] font-semibold text-navy-dark/75">
              {c.client} · {c.sector}
            </p>
          </div>
          <h1 className="mt-5 text-[2.4rem] font-semibold leading-[1.02] tracking-[-0.045em] text-navy-dark sm:text-[3.2rem] lg:text-[3.6rem]">
            {c.title}
          </h1>
          <p className="mt-6 max-w-2xl text-[17.5px] leading-relaxed text-navy-dark/75">
            {c.summary}
          </p>
          {c.url && (
            <a
              href={c.url}
              target="_blank"
              rel="noopener"
              className="mt-5 inline-flex items-center gap-1 text-[13.5px] font-semibold text-navy-dark/75 hover:text-navy-dark"
            >
              {c.domain}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </motion.div>
        <motion.dl
          className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line ring-1 ring-line"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          {c.facts.map(([k, v]) => (
            <div key={k} className="bg-white px-4 py-3.5">
              <dt className="text-[11.5px] text-navy-dark/70">{k}</dt>
              <dd className="mt-1 text-[14px] font-semibold leading-snug text-navy-dark">
                {v}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      {c.status && (
        <p className="mt-8 flex max-w-3xl items-start gap-2.5 rounded-2xl bg-white px-4 py-3 text-[14px] leading-snug text-navy-dark/80 ring-1 ring-line">
          <CircleAlert className="mt-0.5 h-4 w-4 flex-none text-navy-dark/60" />
          {c.status}
        </p>
      )}

      <div
        className={`mt-10 grid grid-cols-2 gap-3 ${HEAD_COLS[c.headline.length] ?? "lg:grid-cols-4"}`}
      >
        {c.headline.map((h, i) => (
          <motion.div
            key={h.l}
            className={`${i === 0 ? c.tint : "bg-white ring-1 ring-line"} rounded-2xl p-5 sm:p-6 ${c.headline.length === 3 && i === 2 ? "col-span-2 lg:col-span-1" : ""}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.07, ease }}
          >
            <p className="text-[1.7rem] font-semibold leading-none tracking-[-0.045em] text-navy-dark sm:text-[2.3rem]">
              {h.v}
            </p>
            <p className="mt-2 text-[13.5px] text-navy-dark/75">{h.l}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </header>
);

/* ----------------------------- the visual band ----------------------------- */

const TONE: Record<string, "warm" | "cool" | "fresh" | "rose"> = {
  "bg-butter": "warm",
  "bg-mint": "fresh",
  "bg-blush": "rose",
};

/** SmileTutor: the real Semrush numbers, drawn from zero so the growth looks
 *  as big as it is. The headline pair is the month the work started against
 *  the latest month; the bars underneath are every month of both years. */
const TrafficBand = ({ c }: { c: CaseStudy }) => {
  const m = c.results!.main!;
  const change = c.results!.kpis?.[0]?.change ?? "";
  return (
    <div className={`${CARD} p-5 sm:p-8`}>
      <div className="mb-8">
        <p className="text-[15px] font-semibold text-navy-dark">{m.label}</p>
        <p className="mt-1 text-[12px] text-navy-dark/70">{m.note}</p>
      </div>
      {m.compare ? (
        <GrowthChart
          labels={m.labels}
          now={m.series}
          then={m.compare.series}
          nowLabel={m.seriesLabel ?? ""}
          thenLabel={m.compare.label}
          change={change}
        />
      ) : null}
      <p className="mt-8 text-[11.5px] text-navy-dark/60">
        Source: {c.results!.source}
      </p>
    </div>
  );
};

const Shot = ({
  s,
  className = "",
  aspect = "aspect-[16/11]",
}: {
  s: NonNullable<CaseStudy["evidence"]>[number];
  className?: string;
  aspect?: string;
}) => (
  <figure className={className}>
    <a
      href={asset(s.src)}
      target="_blank"
      rel="noopener"
      className={`${CARD} block overflow-hidden transition-transform duration-500 hover:-translate-y-1`}
    >
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-navy-dark/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-navy-dark/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-navy-dark/15" />
        </span>
        {s.domain && (
          <span className="ml-2 truncate rounded-md bg-mist px-2.5 py-1 text-[11.5px] text-navy-dark/70">
            {s.domain}
          </span>
        )}
      </div>
      <img
        src={asset(s.src)}
        alt={s.alt}
        loading="lazy"
        className={`block w-full object-cover object-top ${aspect}`}
      />
    </a>
    <figcaption className="mt-3 text-[13px] leading-snug text-navy-dark/75">
      {s.caption}
    </figcaption>
  </figure>
);

/** CryptoDesk: the two Google screenshots, and where the press came from */
const SerpBand = ({ c }: { c: CaseStudy }) => (
  <div>
    <div className="grid gap-5 md:grid-cols-2">
      {c.evidence!.slice(0, 2).map((s, i) => (
        <motion.div key={s.src} {...rise(i * 0.08)}>
          <Shot s={s} aspect="aspect-[3/2]" />
        </motion.div>
      ))}
    </div>
    {c.links?.alsoIn && (
      <div className={`${CARD} mt-5 flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7`}>
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-navy-dark/70">
          Also covered by
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {["Cointelegraph", "Investing.com", ...c.links.alsoIn].map((n) => (
            <li key={n} className="font-news text-[17px] font-semibold tracking-[-0.01em] text-navy-dark/85">
              {n}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

/** Ocuco: the live placement, and where a reader goes from it */
const FlowBand = ({ c }: { c: CaseStudy }) => (
  <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
    <motion.div {...rise()}>
      <Shot s={c.evidence![0]} aspect="aspect-[890/540]" />
    </motion.div>
    <motion.ol className={`${CARD} p-6 sm:p-7`} {...rise(0.1)}>
      <p className="mb-5 text-[15px] font-semibold text-navy-dark">
        From the article to a demo
      </p>
      {c.flow!.map((f, i) => (
        <li key={f.t} className="relative flex gap-4 pb-6 last:pb-0">
          {i < c.flow!.length - 1 && (
            <span className="absolute left-[15px] top-8 bottom-0 w-px bg-[linear-gradient(180deg,rgb(var(--plume-warm)),rgb(var(--plume-cool)))]" aria-hidden="true" />
          )}
          <span className="relative z-10 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-navy-dark text-[12.5px] font-semibold text-white">
            {i + 1}
          </span>
          <span>
            <span className="block text-[15px] font-semibold text-navy-dark">{f.t}</span>
            <span className="mt-0.5 block text-[13.5px] leading-snug text-navy-dark/75">{f.d}</span>
          </span>
        </li>
      ))}
    </motion.ol>
  </div>
);

/** CapCut, Defender: their site, next to what we built for it */
const SiteBand = ({ c }: { c: CaseStudy }) => {
  const L = c.links!;
  return (
    <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
      <motion.div {...rise()}>
        <BrowserFrame src={c.site!} domain={c.domain} />
      </motion.div>
      <motion.div className={`${CARD} p-6 sm:p-7`} {...rise(0.1)}>
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-navy-dark/70">
          What we built
        </p>
        <p className="mt-2 text-[2.4rem] font-semibold leading-none tracking-[-0.05em] text-navy-dark">
          {L.total}
          <span className="ml-2 text-[15px] font-medium tracking-normal text-navy-dark/70">
            placements
          </span>
        </p>
        {L.mix && (
          <div className="mt-6">
            <StackBar parts={L.mix.map((m) => ({ k: m.k, v: m.n }))} />
          </div>
        )}
        {L.pages && (
          <div className="mt-6 border-t border-line pt-5">
            <p className="mb-3 text-[13px] font-semibold text-navy-dark">
              {c.slug === "defender" ? "Searches we went after" : "Pages we pointed links at"}
            </p>
            <ul className="flex flex-wrap gap-1.5">
              {L.pages.slice(0, 6).map((p) => (
                <li key={p.page} className="rounded-full bg-mist px-3 py-1 text-[12.5px] font-medium text-navy-dark ring-1 ring-line">
                  {p.page}
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </div>
  );
};

/** Agency partner: what her clients receive, unbranded */
const REPORT_ROWS = [
  ["tech•••review.com", 64, "Guest post", "Indexed"],
  ["the•••ledger.com", 71, "Niche edit", "Indexed"],
  ["home•••guide.com", 58, "Guest post", "Indexed"],
  ["law•••today.com", 66, "Guest post", "Live"],
  ["biz•••insight.com", 62, "Niche edit", "Live"],
] as const;

const ReportBand = ({ c }: { c: CaseStudy }) => (
  <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr] lg:items-stretch">
    <motion.div className={`${CARD} overflow-hidden`} {...rise()}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-7">
        <span className="flex items-center gap-3">
          <span className="flex h-9 items-center rounded-lg border border-dashed border-navy-dark/25 px-3 text-[11.5px] font-semibold text-navy-dark/60">
            Your agency logo
          </span>
          <span className="text-[14px] font-semibold text-navy-dark">
            Monthly link report
          </span>
        </span>
        <span className="rounded-full bg-mist px-3 py-1 text-[12px] font-semibold text-navy-dark/80 ring-1 ring-line">
          Client: your client
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[460px] text-left">
          <thead>
            <tr className="text-[11px] font-semibold uppercase tracking-[0.1em] text-navy-dark/60">
              <th className="px-5 py-3 sm:px-7">Site</th>
              <th className="px-3 py-3">DR</th>
              <th className="px-3 py-3">Type</th>
              <th className="px-5 py-3 text-right sm:px-7">Status</th>
            </tr>
          </thead>
          <tbody>
            {REPORT_ROWS.map(([site, dr, type, st], i) => (
              <motion.tr
                key={site}
                className="border-t border-line"
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
              >
                <td className="px-5 py-3 text-[13.5px] font-medium text-navy-dark sm:px-7">{site}</td>
                <td className="px-3 py-3 text-[13.5px] font-semibold tabular-nums text-navy-dark">{dr}</td>
                <td className="px-3 py-3 text-[13.5px] text-navy-dark/80">{type}</td>
                <td className="px-5 py-3 text-right sm:px-7">
                  <span className="inline-flex items-center gap-1 rounded-full bg-verified/[0.12] px-2.5 py-0.5 text-[12px] font-bold text-verified">
                    <Check className="h-3 w-3" />
                    {st}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-line px-5 py-3 text-[11.5px] text-navy-dark/60 sm:px-7">
        Illustration of the report format. Domains masked here; her clients see every URL.
      </p>
    </motion.div>
    <motion.div className={`${CARD} flex flex-col p-6 sm:p-7`} {...rise(0.1)}>
      <p className="text-[15px] font-semibold text-navy-dark">Placements per month</p>
      <p className="mt-1 text-[12px] text-navy-dark/70">Across all her clients</p>
      <div className="mt-auto pt-6">
        <Columns data={c.links!.monthly!} height={180} tint="bg-lilac" />
      </div>
    </motion.div>
  </div>
);

export const CaseVisual = ({ c }: { c: CaseStudy }) => {
  const body =
    c.visual === "traffic" && c.results?.main ? (
      <TrafficBand c={c} />
    ) : c.visual === "serps" && c.evidence?.length ? (
      <SerpBand c={c} />
    ) : c.visual === "flow" && c.flow && c.evidence?.length ? (
      <FlowBand c={c} />
    ) : c.visual === "report" && c.links?.monthly ? (
      <ReportBand c={c} />
    ) : c.site && c.links ? (
      <SiteBand c={c} />
    ) : null;
  if (!body) return null;
  return (
    <div className="bg-white pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <GlowPanel tone={TONE[c.tint] ?? "cool"} className="p-4 sm:p-8">
          {body}
        </GlowPanel>
      </div>
    </div>
  );
};

/* ----------------------------------- toc ----------------------------------- */

export const Toc = ({ c }: { c: CaseStudy }) => {
  const list = sectionsFor(c);
  const [active, setActive] = useState<string>(list[0].id);
  useEffect(() => {
    const els = list
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [c.slug]);
  return (
    <nav
      className="sticky top-28 hidden lg:block"
      aria-label="Case study sections"
    >
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-dark/70">
        Contents
      </p>
      <ol className="space-y-1 border-l border-line">
        {list.map((s, i) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`-ml-px flex items-center gap-3 border-l-2 py-1.5 pl-4 text-[13.5px] transition-colors ${
                active === s.id
                  ? "border-navy-dark font-semibold text-navy-dark"
                  : "border-transparent text-navy-dark/70 hover:text-navy-dark"
              }`}
            >
              <span className="w-5 text-[11px] tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              {s.t}
            </a>
          </li>
        ))}
      </ol>
      <Link
        to="/contact"
        className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-navy-dark px-4 py-2 text-[13px] font-semibold text-white"
      >
        Get a plan like this
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </nav>
  );
};

/* -------------------------------- sections -------------------------------- */

export const Overview = ({ c }: { c: CaseStudy }) => (
  <Section id="overview" c={c} title="Client and project overview">
    <div className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-5">
        {c.overview.paras.map((p) => (
          <P key={p}>{p}</P>
        ))}
      </div>
      <div className="self-start">
        <dl className="rounded-2xl bg-mist p-5 ring-1 ring-line">
          <p className="mb-2 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-navy-dark/70">
            At a glance
          </p>
          {c.overview.glance.map(([k, v]) => (
            <div
              key={k}
              className="flex justify-between gap-4 border-t border-line py-2.5 first-of-type:border-0"
            >
              <dt className="text-[13.5px] text-navy-dark/70">{k}</dt>
              <dd className="text-right text-[13.5px] font-semibold text-navy-dark">
                {v}
              </dd>
            </div>
          ))}
        </dl>
        {c.overview.source && (
          <p className="mt-3 px-1 text-[12px] text-navy-dark/60">
            {c.overview.source}
          </p>
        )}
      </div>
    </div>
  </Section>
);

export const Challenge = ({ c }: { c: CaseStudy }) => (
  <Section id="challenge" c={c} title="The challenge">
    <div className="space-y-5">
      {c.challenge.paras.map((p) => (
        <P key={p}>{p}</P>
      ))}
    </div>
    <div
      className={`mt-8 grid gap-5 ${c.challenge.baseline ? "xl:grid-cols-[1.1fr_0.9fr]" : ""}`}
    >
      <ul className={`grid gap-3 ${c.challenge.baseline ? "" : "md:grid-cols-2"}`}>
        {c.challenge.points.map((p) => (
          <motion.li
            key={p}
            className="flex gap-3 rounded-2xl bg-white p-4 ring-1 ring-line"
            {...rise()}
          >
            <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-gap/[0.12]">
              <X className="h-3 w-3 text-gap" />
            </span>
            <span className="text-[15px] leading-snug text-navy-dark/85">
              {p}
            </span>
          </motion.li>
        ))}
      </ul>
      {c.challenge.baseline && (
        <motion.div
          className="self-start rounded-2xl bg-navy-dark p-6"
          {...rise(0.08)}
        >
          <p className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-white/70">
            Starting point (October 2024)
          </p>
          <dl className="mt-3">
            {c.challenge.baseline.map(([k, v]) => (
              <div
                key={k}
                className="flex items-baseline justify-between gap-4 border-t border-white/10 py-3 first-of-type:border-0"
              >
                <dt className="text-[14px] text-white/75">{k}</dt>
                <dd className="text-[18px] font-semibold tabular-nums text-white">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      )}
    </div>
  </Section>
);

export const Objectives = ({ c }: { c: CaseStudy }) =>
  c.objectives?.length ? (
    <Section id="objectives" c={c} title="Objectives, and how they turned out">
      <Table
        head={["Objective", "Target", "Result", ""]}
        rows={c.objectives.map((o) => [
          o.t,
          o.target,
          <span className="font-semibold text-navy-dark">{o.result}</span>,
          <span className="inline-flex items-center gap-1 rounded-full bg-verified/[0.12] px-2.5 py-1 text-[12px] font-bold text-verified">
            <Check className="h-3 w-3" />
            Met
          </span>,
        ])}
      />
    </Section>
  ) : null;

export const Strategy = ({ c }: { c: CaseStudy }) => (
  <Section id="strategy" c={c} title="Strategy and approach">
    <P>{c.strategy.lead}</P>
    <div className="mt-8 grid gap-4 md:grid-cols-3">
      {c.strategy.pillars.map((p, i) => (
        <motion.div
          key={p.t}
          className="rounded-2xl bg-mist p-6 ring-1 ring-line"
          {...rise(i * 0.07)}
        >
          <span
            className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${c.tint} text-[13px] font-bold text-navy-dark`}
          >
            {i + 1}
          </span>
          <h3 className="mt-5 text-[17.5px] font-semibold tracking-[-0.02em] text-navy-dark">
            {p.t}
          </h3>
          <p className="mt-2 text-[14.5px] leading-relaxed text-navy-dark/75">
            {p.d}
          </p>
        </motion.div>
      ))}
    </div>
  </Section>
);

export const Work = ({ c }: { c: CaseStudy }) =>
  c.work?.length ? (
    <Section id="work" c={c} title="Work performed">
      <ol className="relative border-l border-line pl-8">
        {c.work.map((w, i) => (
          <motion.li
            key={w.t}
            className="relative pb-9 last:pb-0"
            {...rise(i * 0.06)}
          >
            <span className="absolute -left-[41px] top-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white ring-1 ring-line">
              <span className="h-2 w-2 rounded-full bg-navy-dark" />
            </span>
            <p className="text-[12.5px] font-semibold text-navy-dark/70">
              {w.when}
            </p>
            <h3 className="mt-1 text-[18px] font-semibold tracking-[-0.02em] text-navy-dark">
              {w.t}
            </h3>
            <ul className="mt-3 space-y-2">
              {w.items.map((it) => (
                <li
                  key={it}
                  className="flex gap-2.5 text-[15px] leading-snug text-navy-dark/80"
                >
                  <Check className="mt-0.5 h-4 w-4 flex-none text-verified" />
                  {it}
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ol>
    </Section>
  ) : null;

export const Links = ({ c }: { c: CaseStudy }) => {
  const L = c.links;
  if (!L) return null;
  const stats = [
    [L.total, "placements"],
    L.reviewed ? [String(L.reviewed), "sites reviewed by hand"] : null,
    L.rejected ? [String(L.rejected), "turned down at vetting"] : null,
    L.indexed ? [L.indexed, "indexed by Google"] : null,
    L.features ? [String(L.features.length), "press features"] : null,
    L.niches ? [String(L.niches.length), "client niches"] : null,
  ].filter(Boolean) as [string, string][];
  const pagesTitle =
    c.slug === "defender"
      ? "The buyer searches we went after"
      : c.slug === "capcut"
        ? "Tool pages we pointed links at"
        : "Where the links pointed";

  return (
    <Section id="links" c={c} title="Link-building activity">
      <div
        className={`grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line ring-1 ring-line ${stats.length >= 4 ? "md:grid-cols-4" : stats.length === 3 ? "md:grid-cols-3" : ""}`}
      >
        {stats.slice(0, 4).map(([v, l]) => (
          <div key={l} className="bg-white px-5 py-4">
            <p className="text-[1.6rem] font-semibold leading-none tracking-[-0.04em] text-navy-dark">
              {v}
            </p>
            <p className="mt-1.5 text-[13px] text-navy-dark/70">{l}</p>
          </div>
        ))}
      </div>

      {(L.mix || L.dr) && (
        <div className={`mt-5 grid gap-5 ${L.mix && L.dr ? "xl:grid-cols-2" : ""}`}>
          {L.mix && (
            <Panel
              title="Placements by type"
              note={`${L.mix.reduce((a, m) => a + m.n, 0)} total`}
            >
              <StackBar parts={L.mix.map((m) => ({ k: m.k, v: m.n }))} />
            </Panel>
          )}
          {L.dr && (
            <Panel title="Authority of the sites" note="Ahrefs Domain Rating">
              <Columns data={L.dr.map((d) => ({ k: d.k, v: d.n }))} height={170} />
            </Panel>
          )}
        </div>
      )}

      {L.anchors && (
        <Panel
          title="Anchor text mix"
          note="Links only, mentions excluded"
          className="mt-5"
        >
          <StackBar
            parts={L.anchors.map((a) => ({ k: a.k, v: a.pct }))}
            unit="%"
          />
        </Panel>
      )}

      {L.niches && (
        <Panel title="Client niches we've served for her" className="mt-5">
          <ul className="flex flex-wrap gap-2">
            {L.niches.map((n) => (
              <li
                key={n}
                className="rounded-full bg-mist px-3.5 py-1.5 text-[13.5px] font-medium text-navy-dark ring-1 ring-line"
              >
                {n}
              </li>
            ))}
          </ul>
        </Panel>
      )}

      {L.pages && (
        <div className="mt-8">
          <p className="mb-3 text-[15px] font-semibold text-navy-dark">
            {pagesTitle}
          </p>
          <Table
            head={[c.slug === "defender" ? "Search" : "Page", "Why it mattered"]}
            rows={L.pages.map((p) => [
              <span className="text-[14px] font-medium">{p.page}</span>,
              p.why,
            ])}
          />
        </div>
      )}

      {L.samples && (
        <div className="mt-8">
          <p className="mb-3 text-[15px] font-semibold text-navy-dark">
            Placements
          </p>
          <Table
            head={[
              "Site",
              ...(L.samples.some((s) => s.dr) ? ["DR"] : []),
              "Type",
              ...(L.samples.some((s) => s.target) ? ["Points to"] : []),
            ]}
            rows={L.samples.map((s) => [
              s.url ? (
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1 text-[14.5px] font-semibold hover:underline"
                >
                  {s.site}
                  <ArrowUpRight className="h-3.5 w-3.5 text-navy-dark/50" />
                </a>
              ) : (
                <span className="text-[14.5px]">{s.site}</span>
              ),
              ...(L.samples!.some((x) => x.dr) ? [s.dr ?? "—"] : []),
              s.type,
              ...(L.samples!.some((x) => x.target) ? [s.target ?? "—"] : []),
            ])}
          />
          {L.samplesNote && (
            <p className="mt-3 text-[12.5px] text-navy-dark/70">{L.samplesNote}</p>
          )}
        </div>
      )}

      {L.features && (
        <div className="mt-8">
          <p className="mb-3 text-[15px] font-semibold text-navy-dark">
            Press features
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {L.features.map((f, i) => (
              <motion.a
                key={f.url ?? f.t}
                href={f.url}
                target="_blank"
                rel="noopener"
                className="group flex flex-col rounded-2xl bg-mist p-5 ring-1 ring-line transition-shadow hover:shadow-soft"
                {...rise((i % 2) * 0.06)}
              >
                <span className="font-news text-[15px] font-semibold text-navy-dark/80">
                  {f.name}
                </span>
                <span className="mt-2 text-[15.5px] font-semibold leading-snug tracking-[-0.01em] text-navy-dark">
                  {f.t}
                </span>
                <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-navy-dark/70 group-hover:text-navy-dark">
                  Read it
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
};

const Delta = ({ before, after }: { before: string; after: string }) => {
  const b = parseFloat(before.replace(/[^0-9.]/g, ""));
  const a = parseFloat(after.replace(/[^0-9.]/g, ""));
  // positions: lower is better; "—" means not ranking
  const better =
    before === "—" || (!Number.isNaN(a) && !Number.isNaN(b) && a < b);
  return better ? (
    <span className="inline-flex items-center gap-1 rounded-full bg-verified/[0.12] px-2 py-0.5 text-[12px] font-bold text-verified">
      <ArrowUp className="h-3 w-3" />
      {before === "—" ? "new" : Math.round(b - a)}
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 rounded-full bg-gap/[0.12] px-2 py-0.5 text-[12px] font-bold text-gap">
      <ArrowDown className="h-3 w-3" />
    </span>
  );
};

export const Results = ({ c }: { c: CaseStudy }) => {
  const R = c.results;
  if (!R) return null;
  const kw = R.keywords;
  const hasVol = kw?.some((k) => k.vol);
  const hasBefore = kw?.some((k) => k.before);
  return (
    <Section id="results" c={c} title="Results and supporting data">
      <P>{R.lead}</P>

      {R.kpis && (
        <div className="mt-8">
          <Table
            head={["Metric", "Before", "After", "Change"]}
            rows={R.kpis.map((k) => [
              k.k,
              k.before,
              <span className="font-semibold text-navy-dark">{k.after}</span>,
              <span className="inline-flex rounded-full bg-mist px-2.5 py-1 text-[12.5px] font-bold text-navy-dark ring-1 ring-line">
                {k.change}
              </span>,
            ])}
          />
        </div>
      )}

      {(R.positions || kw) && (
        <div className={`mt-5 grid gap-5 ${R.positions && kw ? "xl:grid-cols-[0.8fr_1.2fr]" : ""}`}>
          {R.positions && (
            <Panel title="Ranking keywords by position" note="Semrush">
              <Positions data={R.positions} />
            </Panel>
          )}
          {kw && (
            <motion.div
              className="overflow-hidden rounded-3xl bg-white ring-1 ring-line"
              {...rise(0.06)}
            >
              <div className="flex items-baseline justify-between gap-3 border-b border-line px-6 py-4">
                <p className="text-[15px] font-semibold text-navy-dark">
                  Target keywords
                </p>
                <p className="text-[12px] text-navy-dark/70">Position on Google</p>
              </div>
              <ul>
                {kw.map((k) => (
                  <li
                    key={k.k}
                    className="flex items-center gap-4 border-b border-line px-6 py-3 last:border-0"
                  >
                    <span className="min-w-0 flex-1 truncate text-[15px] font-medium text-navy-dark">
                      {k.k}
                    </span>
                    {hasVol && (
                      <span className="hidden w-20 text-right text-[13px] tabular-nums text-navy-dark/70 sm:block">
                        {k.vol ? `${k.vol}/mo` : ""}
                      </span>
                    )}
                    {hasBefore && k.before && (
                      <span className="text-[13px] text-navy-dark/60">
                        {k.before === "—" ? "Not ranking" : `#${k.before}`}
                      </span>
                    )}
                    <Pos n={k.after} />
                    {hasBefore && k.before && <Delta before={k.before} after={k.after} />}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      )}

      {c.evidence && c.visual !== "serps" && c.visual !== "flow" && (
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {c.evidence.map((s) => (
            <Shot key={s.src} s={s} />
          ))}
        </div>
      )}

      <p className="mt-5 text-[12.5px] text-navy-dark/60">Source: {R.source}</p>
    </Section>
  );
};

export const CaseQuote = ({ c }: { c: CaseStudy }) => {
  const t = c.testimonial;
  if (!t?.text) return null;
  return (
    <motion.figure
      className="relative overflow-hidden rounded-3xl bg-navy-dark p-7 sm:p-10"
      {...rise()}
    >
      <Quote className="h-7 w-7 text-white/40" />
      <blockquote className="mt-5 text-[1.4rem] font-medium leading-snug tracking-[-0.025em] text-white sm:text-[1.75rem]">
        “{t.text}”
      </blockquote>
      <figcaption className="mt-7 flex flex-wrap items-center justify-between gap-4">
        <span className="flex items-center gap-3">
          {t.photo && (
            <img
              src={asset(t.photo)}
              alt={t.who}
              loading="lazy"
              className="h-11 w-11 rounded-full object-cover ring-2 ring-white/20"
            />
          )}
          <span className="text-[14px] text-white/75">
            <span className="block font-semibold text-white">{t.who}</span>
            {t.role}
          </span>
        </span>
        <LogoChip c={c} size="sm" />
      </figcaption>
    </motion.figure>
  );
};

export const Outcomes = ({ c }: { c: CaseStudy }) => {
  const O = c.outcomes;
  return (
    <Section id="outcomes" c={c} title="Key outcomes and takeaways">
      <div className="grid gap-3 md:grid-cols-3">
        {O.items.map((o, i) => (
          <motion.div
            key={o.l}
            className={`${i === 0 ? c.tint : "bg-mist ring-1 ring-line"} rounded-2xl p-6`}
            {...rise(i * 0.07)}
          >
            <p className="text-[2.2rem] font-semibold leading-none tracking-[-0.045em] text-navy-dark">
              {o.v}
            </p>
            <p className="mt-2 text-[14px] text-navy-dark/75">{o.l}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-10">
        <p className="mb-4 text-[15px] font-semibold text-navy-dark">
          What we learned
        </p>
        <ol className="divide-y divide-line border-y border-line">
          {O.takeaways.map((t, i) => (
            <motion.li
              key={t.t}
              className="grid gap-2 py-5 sm:grid-cols-[40px_0.8fr_1.2fr] sm:gap-6"
              {...rise(i * 0.05)}
            >
              <span className="text-[13px] font-semibold tabular-nums text-navy-dark/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[17px] font-semibold tracking-[-0.02em] text-navy-dark">
                {t.t}
              </span>
              <span className="text-[15px] leading-relaxed text-navy-dark/75">
                {t.d}
              </span>
            </motion.li>
          ))}
        </ol>
      </div>

      <div className="mt-10">
        <CaseQuote c={c} />
      </div>

      {O.next && (
        <p className="mt-8 rounded-2xl bg-mist px-5 py-4 text-[15px] leading-relaxed text-navy-dark/80 ring-1 ring-line">
          <span className="font-semibold text-navy-dark">What's next: </span>
          {O.next}
        </p>
      )}
    </Section>
  );
};

/* --------------------------------- next up --------------------------------- */

export const NextCase = ({ next }: { next: CaseStudy }) => (
  <section className="border-t border-line bg-mist py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-navy-dark/70">
        Next case study
      </p>
      <Link
        to={`/case-studies/${next.slug}`}
        className={`group mt-5 flex flex-col gap-6 rounded-3xl ${next.tint} p-7 transition-transform duration-300 hover:-translate-y-0.5 sm:p-10 lg:flex-row lg:items-end lg:justify-between`}
      >
        <span>
          <span className="flex items-center gap-3">
            <LogoChip c={next} size="sm" />
            <span className="text-[13px] font-semibold text-navy-dark/75">
              {next.client} · {next.sector}
            </span>
          </span>
          <span className="mt-4 block max-w-2xl text-[1.7rem] font-semibold leading-tight tracking-[-0.035em] text-navy-dark sm:text-[2.2rem]">
            {next.card}
          </span>
        </span>
        <span className="inline-flex flex-none items-center gap-2 self-start rounded-full bg-navy-dark px-6 py-3 text-[14px] font-semibold text-white lg:self-auto">
          Read the case study
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>
    </div>
  </section>
);
