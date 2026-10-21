import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Check,
  X,
} from "lucide-react";
import type { CaseStudy } from "@/lib/cases";
import { CARD, GlowPanel, ease, rise } from "../services/kit";
import { Columns, LineArea, Positions, StackBar } from "./charts";

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

/* ---------------------------------- bits ---------------------------------- */

const Section = ({
  id,
  n,
  title,
  children,
}: {
  id: string;
  n: number;
  title: string;
  children: ReactNode;
}) => (
  <section
    id={id}
    className="scroll-mt-28 border-t border-line pt-12 first:border-0 first:pt-0"
  >
    <motion.div {...rise()}>
      <p className="text-[12px] font-semibold tabular-nums text-navy-dark/70">
        {String(n).padStart(2, "0")}
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
          {head.map((h) => (
            <th
              key={h}
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
            {r.map((c, j) => (
              <td
                key={j}
                className={`px-4 py-3.5 text-[14.5px] ${j ? "text-navy-dark/85" : "font-semibold text-navy-dark"}`}
              >
                {c}
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
          <p className="text-[13px] font-semibold text-navy-dark/75">
            {c.client} · {c.sector}
          </p>
          <h1 className="mt-4 text-[2.4rem] font-semibold leading-[1.02] tracking-[-0.045em] text-navy-dark sm:text-[3.2rem] lg:text-[3.6rem]">
            {c.title}
          </h1>
          <p className="mt-6 max-w-2xl text-[17.5px] leading-relaxed text-navy-dark/75">
            {c.summary}
          </p>
        </motion.div>
        <motion.dl
          className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line ring-1 ring-line"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          {[
            ["Market", c.market],
            ["Duration", c.duration],
            ["Services", c.services.join(", ")],
            ["Plan", c.plan],
          ].map(([k, v]) => (
            <div key={k} className="bg-white px-4 py-3.5">
              <dt className="text-[11.5px] text-navy-dark/70">{k}</dt>
              <dd className="mt-1 text-[14px] font-semibold leading-snug text-navy-dark">
                {v}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {c.headline.map((h, i) => (
          <motion.div
            key={h.l}
            className={`${i === 0 ? c.tint : "bg-white ring-1 ring-line"} rounded-2xl p-5 sm:p-6`}
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

/* ----------------------------- hero chart band ----------------------------- */

export const HeroChart = ({ c }: { c: CaseStudy }) => {
  const s = c.results.main;
  const labels = s.series.map((_, i) => (i === 0 ? "Start" : `M${i}`));
  return (
    <div className="bg-white pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <GlowPanel
          tone={
            c.tint === "bg-mint"
              ? "fresh"
              : c.tint === "bg-butter"
                ? "warm"
                : "cool"
          }
          className="p-4 sm:p-8"
        >
          <div className={`${CARD} p-5 sm:p-8`}>
            <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
              <p className="text-[15px] font-semibold text-navy-dark">
                {s.label}
              </p>
              <p className="text-[12px] text-navy-dark/70">
                Monthly, from the start of the engagement
              </p>
            </div>
            <LineArea
              series={s.series}
              labels={labels}
              notes={s.notes}
              height={280}
            />
          </div>
        </GlowPanel>
      </div>
    </div>
  );
};

/* ----------------------------------- toc ----------------------------------- */

export const Toc = () => {
  const [active, setActive] = useState<string>(SECTIONS[0].id);
  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      Boolean,
    ) as HTMLElement[];
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
  }, []);
  return (
    <nav
      className="sticky top-28 hidden lg:block"
      aria-label="Case study sections"
    >
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-dark/70">
        Contents
      </p>
      <ol className="space-y-1 border-l border-line">
        {SECTIONS.map((s, i) => (
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
    </nav>
  );
};

/* -------------------------------- sections -------------------------------- */

export const Overview = ({ c }: { c: CaseStudy }) => (
  <Section id="overview" n={1} title="Client and project overview">
    <div className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-5">
        {c.overview.paras.map((p) => (
          <P key={p}>{p}</P>
        ))}
      </div>
      <dl className="self-start rounded-2xl bg-mist p-5 ring-1 ring-line">
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
    </div>
  </Section>
);

export const Challenge = ({ c }: { c: CaseStudy }) => (
  <Section id="challenge" n={2} title="The challenge">
    <div className="space-y-5">
      {c.challenge.paras.map((p) => (
        <P key={p}>{p}</P>
      ))}
    </div>
    <div className="mt-8 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
      <ul className="space-y-3">
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
      <motion.div
        className="self-start rounded-2xl bg-navy-dark p-6"
        {...rise(0.08)}
      >
        <p className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-white/70">
          Starting point
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
    </div>
  </Section>
);

export const Objectives = ({ c }: { c: CaseStudy }) => (
  <Section id="objectives" n={3} title="Objectives, and how they turned out">
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
);

export const Strategy = ({ c }: { c: CaseStudy }) => (
  <Section id="strategy" n={4} title="Strategy and approach">
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

export const Work = ({ c }: { c: CaseStudy }) => (
  <Section id="work" n={5} title="Work performed">
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
);

export const Links = ({ c }: { c: CaseStudy }) => {
  const L = c.links;
  const total = L.mix.reduce((a, m) => a + m.n, 0);
  return (
    <Section id="links" n={6} title="Link-building activity">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line ring-1 ring-line md:grid-cols-4">
        {[
          [String(total), "placements"],
          [String(L.reviewed), "sites reviewed"],
          [String(L.rejected), "rejected at vetting"],
          [L.indexed, "indexed"],
        ].map(([v, l]) => (
          <div key={l} className="bg-white px-5 py-4">
            <p className="text-[1.6rem] font-semibold leading-none tracking-[-0.04em] text-navy-dark">
              {v}
            </p>
            <p className="mt-1.5 text-[13px] text-navy-dark/70">{l}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Panel title="Placements by type" note={`${total} total`}>
          <StackBar parts={L.mix.map((m) => ({ k: m.k, v: m.n }))} />
        </Panel>
        <Panel title="Authority of the sites" note="Ahrefs Domain Rating">
          <Columns data={L.dr.map((d) => ({ k: d.k, v: d.n }))} height={170} />
        </Panel>
      </div>

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

      <div className="mt-8">
        <p className="mb-3 text-[15px] font-semibold text-navy-dark">
          Placements
        </p>
        <Table
          head={["Site", "DR", "Type", "Points to", "Indexed"]}
          rows={L.samples.map((s) => [
            <span className="font-mono text-[13.5px]">{s.site}</span>,
            s.dr,
            s.type,
            <span className="font-mono text-[13px]">{s.target}</span>,
            s.indexed,
          ])}
        />
        <p className="mt-3 text-[12.5px] text-navy-dark/70">
          Domains are masked on the public version. Clients see every URL in
          their report.
        </p>
      </div>

      <div className="mt-8">
        <p className="mb-3 text-[15px] font-semibold text-navy-dark">
          Sites we turned down ({L.rejected} of {L.reviewed}). Three examples:
        </p>
        <div className="grid gap-3 md:grid-cols-3">
          {L.turnedDown.map((t) => (
            <motion.div
              key={t.site}
              className="rounded-2xl bg-mist p-5 ring-1 ring-line"
              {...rise()}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[14.5px] font-semibold text-navy-dark">
                  {t.site}
                </span>
                <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-navy-dark/80 ring-1 ring-line">
                  {t.dr}
                </span>
              </div>
              <p className="mt-2 text-[14px] leading-relaxed text-navy-dark/75">
                {t.why}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
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
  const labels2 = R.second.series.map((_, i) => (i === 0 ? "Start" : `M${i}`));
  return (
    <Section id="results" n={7} title="Results and supporting data">
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

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Panel title={R.second.label} note="Monthly">
          {R.second.kind === "bars" ? (
            <Columns
              data={R.second.series.map((v, i) => ({ k: labels2[i], v }))}
              height={190}
            />
          ) : (
            <LineArea series={R.second.series} labels={labels2} height={190} />
          )}
        </Panel>
        <Panel title="Ranking keywords by position" note="Tracked set">
          <Positions data={R.positions} />
        </Panel>
      </div>

      <div className="mt-8">
        <p className="mb-3 text-[15px] font-semibold text-navy-dark">
          Target keywords
        </p>
        <Table
          head={["Keyword", "Monthly searches", "Before", "After", ""]}
          rows={R.keywords.map((k) => [
            <span className="font-mono text-[13.5px] font-normal">{k.k}</span>,
            k.vol,
            k.before === "—" ? "Not ranking" : `#${k.before}`,
            <span className="font-semibold text-navy-dark">#{k.after}</span>,
            <Delta before={k.before} after={k.after} />,
          ])}
        />
      </div>
    </Section>
  );
};

export const Outcomes = ({ c }: { c: CaseStudy }) => {
  const O = c.outcomes;
  return (
    <Section id="outcomes" n={8} title="Key outcomes and takeaways">
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

      <motion.figure
        className="mt-10 rounded-3xl bg-navy-dark p-7 sm:p-10"
        {...rise()}
      >
        <blockquote className="text-[1.45rem] font-medium leading-snug tracking-[-0.025em] text-white sm:text-[1.8rem]">
          “{O.quote.text}”
        </blockquote>
        <figcaption className="mt-6 flex flex-wrap items-center justify-between gap-3 text-[13.5px] text-white/75">
          <span>{O.quote.who}</span>
        </figcaption>
      </motion.figure>

      <p className="mt-8 rounded-2xl bg-mist px-5 py-4 text-[15px] leading-relaxed text-navy-dark/80 ring-1 ring-line">
        <span className="font-semibold text-navy-dark">What’s next: </span>
        {O.next}
      </p>
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
          <span className="block text-[13px] font-semibold text-navy-dark/75">
            {next.client} · {next.sector}
          </span>
          <span className="mt-3 block max-w-2xl text-[1.7rem] font-semibold leading-tight tracking-[-0.035em] text-navy-dark sm:text-[2.2rem]">
            {next.card}
          </span>
        </span>
        <span className="inline-flex flex-none items-center gap-2 rounded-full bg-navy-dark px-6 py-3 text-[14px] font-semibold text-white">
          Read the case study
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>
    </div>
  </section>
);
