import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, Minus, X } from "lucide-react";
import { brandMentions as BM } from "./content/brandMentions";
import { OtherServices } from "./shared";
import {
  AiOverviewMark,
  ChatGptMark,
  ClaudeMark,
} from "@/components/PlatformMarks";
import { FaqList } from "@/components/AgencyBlocks";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";
import { openBooking } from "@/lib/booking";

/**
 * /services/brand-mentions — the answer-surface page.
 *
 * Identity: this page is built out of *answers*. A typed answer card in the
 * hero, an annotated answer sentence, a prompt ledger, engine-share bars, and
 * a share-of-answer figure. Nothing here repeats Link Building's gap card and
 * arrow flows, Digital PR's outlet strip or HARO's request queue.
 *
 * Register follows content/brandMentions.ts and the approved Link Building
 * register: established agency describing its own method and results, named
 * methodology (AuthorityOS™) carrying the credibility, exactly one comparison
 * aimed at a category of approach, honest limits without remarks about anyone.
 *
 * Surface ladder (14 sections, no two adjacent alike, longest light run 3):
 *   espresso · stone · mist · clay · navy-dark · mist · stone · clay ·
 *   MARK · mist · stone · espresso · clay · mist
 */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.6, delay, ease: EASE },
});

/** Eyebrow + two-line headline. Short, declarative, second line turns the first. */
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
        dark ? "text-white/70" : "text-navy-dark/75"
      }`}
    >
      {eyebrow}
    </p>
    <h2
      className={`text-[2.05rem] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[2.5rem] ${
        dark ? "text-white" : "text-navy-dark"
      }`}
    >
      {pre}{" "}
      <span className={dark ? "text-white/70" : "text-navy-dark/65"}>{em}</span>
    </h2>
  </motion.div>
);

/** Perplexity glyph — the fourth engine, which PlatformMarks does not carry. */
const PerplexityMark = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      d="M12 3v18M12 7.5 5.5 3.5v7.5h13V3.5L12 7.5Zm0 9L5.5 20.5V13h13v7.5L12 16.5Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ENGINE_MARKS: Record<
  string,
  (p: { className?: string }) => React.ReactElement
> = {
  "AI Overviews": AiOverviewMark,
  ChatGPT: ChatGptMark,
  Claude: ClaudeMark,
  Perplexity: PerplexityMark,
};

/* ============================ hero: the answer ============================ */

const AnswerCard = () => {
  const a = BM.answer;
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const h = setInterval(() => {
      i += 2;
      setN(Math.min(i, a.text.length));
      if (i >= a.text.length) {
        clearInterval(h);
        setTimeout(() => setDone(true), 350);
      }
    }, 30);
    return () => clearInterval(h);
  }, [a.text.length]);

  const shown = a.text.slice(0, n);
  const at = shown.indexOf(a.brand);

  return (
    <motion.div
      className="overflow-hidden rounded-[1.4rem] bg-white shadow-deep"
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
    >
      <div className="flex items-center gap-2.5 border-b border-line px-5 py-3.5">
        <ChatGptMark className="h-4 w-4" />
        <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-navy-dark/75">
          {a.engine}
        </span>
      </div>

      <div className="px-6 pb-6 pt-5">
        <p className="mb-5 text-[13.5px] font-semibold leading-snug text-navy-dark">
          {a.prompt}
        </p>
        <p className="min-h-[108px] text-[15.5px] leading-[1.6] text-navy-dark/80">
          {at === -1 ? (
            shown
          ) : (
            <>
              {shown.slice(0, at)}
              <span className="rounded bg-lilac px-1 font-bold text-navy-dark">
                {shown.slice(at, at + a.brand.length)}
              </span>
              {shown.slice(at + a.brand.length)}
            </>
          )}
          {n < a.text.length && (
            <span className="ml-0.5 inline-block h-[15px] w-[2px] animate-pulse bg-navy-dark/60 align-middle" />
          )}
        </p>

        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-verified/30 bg-verified/10 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.1em] text-verified">
                  <Check className="h-2.5 w-2.5" />
                  {a.citedLabel}
                </span>
                {a.sources.map((s) => (
                  <span
                    key={s}
                    className="rounded-md bg-stone px-2 py-1 text-[10.5px] font-semibold text-navy-dark/75"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <p className="mt-4 border-t border-line pt-4 text-[12.5px] leading-relaxed text-navy-dark/75">
                {a.note}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

/* 1 — espresso */
const Hero = () => (
  <div className="relative overflow-hidden bg-navy-dark pb-36 pt-32 lg:pb-44 lg:pt-40">
    <div
      className="pointer-events-none absolute -right-28 top-0 h-[420px] w-[560px] rounded-full opacity-[0.17] blur-[90px]"
      style={{ background: "rgb(var(--lilac))" }}
      aria-hidden="true"
    />
    <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1.02fr] lg:gap-20 lg:px-8">
      <div>
        <motion.p
          className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {BM.eyebrow}
        </motion.p>
        <motion.h1
          className="text-balance text-[2.45rem] font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-[3rem] lg:text-[3.3rem]"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        >
          {BM.h1.pre} <span className="text-white/70">{BM.h1.em}</span>
        </motion.h1>
        <motion.p
          className="mt-7 max-w-xl text-[16.5px] leading-[1.6] text-white/75"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
        >
          {BM.sub}
        </motion.p>
        <motion.div
          className="mt-9 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
        >
          <button
            onClick={openBooking}
            className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-[14px] font-semibold text-navy-dark transition-colors duration-300 hover:bg-white/90"
          >
            Check my AI visibility
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
          <Link
            to="/case-studies/b2b-saas-ai-visibility"
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-white/80 transition-colors duration-300 hover:text-white"
          >
            See the results
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
        <motion.p
          className="mt-8 text-[12.5px] italic leading-relaxed text-white/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          {BM.credit}
        </motion.p>
      </div>

      <AnswerCard />
    </div>
  </div>
);

/* 2 — stone, with the figure panel overlapping the espresso boundary */
const Proof = () => (
  <div className="bg-stone pb-20 lg:pb-24">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.div
        className="relative z-10 -mt-20 grid rounded-3xl bg-white shadow-deep sm:grid-cols-3 lg:-mt-24"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {BM.proof.figures.map((f, i) => (
          <div
            key={f.label}
            className={`p-7 lg:p-8 ${
              i ? "border-t border-line sm:border-l sm:border-t-0" : ""
            }`}
          >
            <p className="text-[2.5rem] font-semibold leading-none tracking-[-0.04em] text-navy-dark tabular-nums sm:text-[2.9rem]">
              {f.v}
            </p>
            <p className="mt-4 text-[13.5px] font-semibold leading-snug text-navy-dark">
              {f.label}
            </p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-navy-dark/75">
              {f.d}
            </p>
          </div>
        ))}
      </motion.div>

      {/* hairline rules carrying the layout, no boxes */}
      <dl className="mt-14 border-t border-navy-dark/15">
        {BM.proof.rows.map((r, i) => (
          <motion.div
            key={r.k}
            className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-navy-dark/15 py-4"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
          >
            <dt className="text-[13.5px] font-semibold uppercase tracking-[0.1em] text-navy-dark/75">
              {r.k}
            </dt>
            <dd className="text-[15px] font-semibold text-navy-dark">{r.v}</dd>
          </motion.div>
        ))}
      </dl>
    </div>
  </div>
);

/* 3 — mist */
const Shift = () => (
  <div className="bg-mist py-24 lg:py-32">
    <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_0.92fr] lg:gap-20 lg:px-8">
      <div>
        <Head
          eyebrow={BM.shift.eyebrow}
          pre={BM.shift.heading.pre}
          em={BM.shift.heading.em}
        />
        {BM.shift.paras.map((p, i) => (
          <motion.p
            key={i}
            className="mt-5 text-[15.5px] leading-[1.65] text-navy-dark/75"
            {...rise(0.05 + i * 0.05)}
          >
            {p}
          </motion.p>
        ))}
      </div>

      {/* pastel feature panel behind the diagram */}
      <motion.div
        className="rounded-3xl border border-line bg-white p-6 shadow-lift lg:p-8"
        {...rise(0.1)}
      >
        {BM.shift.lanes.map((lane, li) => (
          <div
            key={lane.label}
            className={li ? "mt-6 border-t border-navy-dark/15 pt-6" : ""}
          >
            <p className="mb-4 text-[10.5px] font-bold uppercase tracking-[0.14em] text-navy-dark/75">
              {lane.label}
            </p>
            <ol className="space-y-2">
              {lane.steps.map((s, si) => (
                <motion.li
                  key={s}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-[13px] font-semibold ${
                    lane.live && si === 1
                      ? "bg-navy-dark text-white shadow-soft"
                      : "bg-white text-navy-dark shadow-soft"
                  }`}
                  initial={{ opacity: 0, x: 14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: li * 0.15 + si * 0.08 }}
                >
                  <span
                    className={`text-[10.5px] font-bold tabular-nums ${
                      lane.live && si === 1
                        ? "text-white/70"
                        : "text-navy-dark/60"
                    }`}
                  >
                    {si + 1}
                  </span>
                  {s}
                </motion.li>
              ))}
            </ol>
            <p className="mt-3 text-[12.5px] leading-relaxed text-navy-dark/75">
              {lane.note}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  </div>
);

/* 4 — clay */
const Pathway = () => (
  <div className="bg-mist py-24 lg:py-32">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <Head
        eyebrow={BM.pathway.eyebrow}
        pre={BM.pathway.heading.pre}
        em={BM.pathway.heading.em}
        className="max-w-2xl"
      />
      <motion.p
        className="mt-5 max-w-2xl text-[15.5px] leading-relaxed text-navy-dark/75"
        {...rise(0.05)}
      >
        {BM.pathway.lede}
      </motion.p>

      {/* staircase: each card steps down, so the section reads as a descent */}
      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {BM.pathway.steps.map((s, i) => (
          <motion.article
            key={s.n}
            className={`flex flex-col rounded-2xl bg-white p-7 shadow-lift ${
              ["lg:mt-0", "lg:mt-10", "lg:mt-20"][i]
            }`}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
          >
            <p className="mb-4 text-[2.6rem] font-semibold leading-none tracking-[-0.04em] text-navy-dark/45 tabular-nums">
              {s.n}
            </p>
            <h3 className="mb-2.5 text-[17.5px] font-semibold leading-snug tracking-[-0.02em] text-navy-dark">
              {s.t}
            </h3>
            <p className="mb-6 text-[13.5px] leading-relaxed text-navy-dark/75">
              {s.d}
            </p>
            <p className="mt-auto inline-flex self-start rounded-lg bg-mint px-3.5 py-2 text-[11.5px] font-bold uppercase tracking-[0.1em] text-navy-dark">
              {s.chip}
            </p>
          </motion.article>
        ))}
      </div>
    </div>
  </div>
);

/* 5 — navy-dark */
const Tracked = () => (
  <div className="bg-navy-dark py-24 lg:py-32">
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <Head
        eyebrow={BM.tracked.eyebrow}
        pre={BM.tracked.heading.pre}
        em={BM.tracked.heading.em}
        dark={true}
        className="max-w-2xl"
      />

      <div className="mt-12 space-y-2.5">
        {BM.tracked.rows.map((r, i) => (
          <motion.div
            key={r.q}
            className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4"
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
          >
            <span className="text-[10.5px] font-bold tabular-nums text-white/70">
              Q{i + 1}
            </span>
            <span className="flex-1 text-[15px] font-medium text-white">
              {"“"}
              {r.q}
              {"”"}
            </span>
            <span className="rounded-full bg-white/[0.08] px-3 py-1 text-[11px] font-semibold text-white/70">
              {r.intent}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="mx-auto mt-8 max-w-2xl text-center text-[14.5px] leading-relaxed text-white/70"
        {...rise(0.1)}
      >
        {BM.tracked.note}
      </motion.p>

      <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-3">
        {BM.tracked.figures.map((f) => (
          <div key={f.k} className="bg-navy-dark p-6">
            <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/70">
              {f.k}
            </dt>
            <dd className="mt-2 text-[15px] font-semibold leading-snug text-white">
              {f.v}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </div>
);

/* 6 — mist */
const Anatomy = () => {
  const s = BM.anatomy.sentence;
  const sup = (n: string) => (
    <sup className="ml-0.5 text-[11px] font-bold text-navy-dark/70">{n}</sup>
  );
  return (
    <div className="bg-mist py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Head
          eyebrow={BM.anatomy.eyebrow}
          pre={BM.anatomy.heading.pre}
          em={BM.anatomy.heading.em}
          className="mb-8"
        />
        <motion.p
          className="mb-10 max-w-2xl text-[15.5px] leading-relaxed text-navy-dark/75"
          {...rise(0.05)}
        >
          {BM.anatomy.lede}
        </motion.p>

        <motion.div
          className="rounded-3xl border border-line bg-white p-8 shadow-deep lg:p-10"
          {...rise(0.1)}
        >
          <p className="mb-8 text-[19px] leading-[1.7] text-navy-dark/85 sm:text-[22px]">
            {"“"}
            <span className="border-b-2 border-sky pb-0.5">{s.tie}</span>
            {sup("1")}
            {", "}
            <span className="rounded bg-lilac px-1.5 font-semibold">
              {s.brand}
            </span>
            {sup("2")}{" "}
            <span className="border-b-2 border-mint pb-0.5">
              {s.credibility}
            </span>
            {sup("3")}
            {".”"}
          </p>

          <div className="grid gap-5 border-t border-line pt-7 sm:grid-cols-3">
            {BM.anatomy.notes.map((n) => (
              <div key={n.n} className="flex gap-3">
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-stone text-[11px] font-bold text-navy-dark">
                  {n.n}
                </span>
                <div>
                  <p className="mb-1.5 text-[13.5px] font-semibold leading-none text-navy-dark">
                    {n.t}
                  </p>
                  <p className="text-[12.5px] leading-relaxed text-navy-dark/75">
                    {n.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.p
          className="mt-5 rounded-2xl bg-white px-7 py-6 text-[15px] font-semibold leading-snug text-navy-dark"
          {...rise(0.15)}
        >
          {BM.anatomy.aside}
        </motion.p>
      </div>
    </div>
  );
};

/* 7 — stone */
const Reporting = () => {
  const t = BM.reporting.tracker;
  return (
    <div className="bg-stone py-24 lg:py-32">
      <div className="mx-auto grid max-w-6xl items-start gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <div>
          <Head
            eyebrow={BM.reporting.eyebrow}
            pre={BM.reporting.heading.pre}
            em={BM.reporting.heading.em}
          />
          <motion.p
            className="mt-5 max-w-md text-[15.5px] leading-[1.65] text-navy-dark/75"
            {...rise(0.05)}
          >
            {BM.reporting.lede}
          </motion.p>
          <ul className="mt-7 space-y-3.5">
            {BM.reporting.checks.map((c, i) => (
              <motion.li
                key={c}
                className="flex gap-3 text-[14.5px] leading-relaxed text-navy-dark/80"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
              >
                <Check className="mt-1 h-4 w-4 flex-none text-verified" />
                {c}
              </motion.li>
            ))}
          </ul>

          <motion.figure
            className="mt-9 border-t border-navy-dark/20 pt-7"
            {...rise(0.1)}
          >
            <blockquote className="text-[16px] leading-[1.5] tracking-[-0.01em] text-navy-dark">
              {"“"}
              {BM.reporting.quote.text}
              {"”"}
            </blockquote>
            <figcaption className="mt-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-navy-dark/75">
              {BM.reporting.quote.who}
            </figcaption>
          </motion.figure>
        </div>

        <motion.div
          className="rounded-3xl border border-line bg-white p-7 shadow-lift sm:p-8"
          {...rise(0.1)}
        >
          <div className="mb-7 flex items-center justify-between gap-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-dark/75">
              {t.label}
            </p>
            <span className="inline-flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.1em] text-verified">
              <span className="h-1.5 w-1.5 rounded-full bg-verified" />
              {t.liveLab}
            </span>
          </div>

          <div className="space-y-6">
            {t.engines.map((e, i) => {
              const Mark = ENGINE_MARKS[e.name];
              return (
                <div key={e.name}>
                  <div className="mb-2 flex items-center gap-2.5">
                    <span className="text-navy-dark/80">
                      <Mark className="h-4 w-4" />
                    </span>
                    <span className="text-[13.5px] font-semibold text-navy-dark">
                      {e.name}
                    </span>
                    <span className="ml-auto text-[13px] font-bold tabular-nums text-navy-dark">
                      {e.pct}%
                    </span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-stone">
                    <motion.div
                      className={`h-full rounded-full ${
                        [
                          "bg-navy-dark",
                          "bg-navy-dark/80",
                          "bg-navy-dark/65",
                          "bg-navy-dark/50",
                        ][i]
                      }`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${e.pct}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1,
                        delay: 0.2 + i * 0.12,
                        ease: EASE,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-6 border-t border-line pt-5 text-[12px] leading-relaxed text-navy-dark/75">
            {t.unit}
          </p>
          <p className="mt-3 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-navy-dark/75">
            {t.footnote}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

/* 8 — clay */
const Sources = () => (
  <div className="bg-mist py-24 lg:py-32">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div>
          <Head
            eyebrow={BM.sources.eyebrow}
            pre={BM.sources.heading.pre}
            em={BM.sources.heading.em}
          />
          <motion.p
            className="mt-5 text-[15.5px] leading-[1.65] text-navy-dark/75"
            {...rise(0.05)}
          >
            {BM.sources.lede}
          </motion.p>
          <motion.p
            className="mt-7 border-l-2 border-navy-dark pl-5 text-[16.5px] font-semibold leading-snug tracking-[-0.01em] text-navy-dark"
            {...rise(0.1)}
          >
            {BM.sources.comparison}
          </motion.p>
        </div>

        {/* bordered inset panels on a contrasting ground */}
        <dl className="self-start">
          {BM.sources.standards.map((s, i) => (
            <motion.div
              key={s.label}
              className="border-t border-navy-dark/20 py-5 last:border-b sm:grid sm:grid-cols-[0.5fr_1fr] sm:gap-6"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <dt className="mb-1.5 text-[14px] font-bold text-navy-dark sm:mb-0">
                {s.label}
              </dt>
              <dd className="text-[13.5px] leading-relaxed text-navy-dark/75">
                {s.detail}
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>

      <div className="mt-16 grid gap-4 md:grid-cols-3">
        {BM.sources.rejections.map((r, i) => (
          <motion.article
            key={r.site}
            className="relative rounded-2xl border border-line p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <span className="absolute right-5 top-6 text-[11.5px] font-bold tabular-nums text-navy-dark/75">
              {r.metric}
            </span>
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-gap/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-navy-dark">
              <X className="h-2.5 w-2.5 text-gap" />
              {BM.sources.rejectLabel}
            </span>
            <h3 className="pr-14 text-[15.5px] font-semibold leading-snug text-navy-dark">
              {r.site}
            </h3>
            <p className="mt-2.5 text-[13px] leading-relaxed text-navy-dark/75">
              {r.reason}
            </p>
          </motion.article>
        ))}
      </div>
    </div>
  </div>
);

/* 9 — MARK. The page's one amber band: the result worth remembering. */
const Result = () => {
  const r = BM.result;
  const w = 600;
  const h = 150;
  const max = Math.max(...r.series);
  const min = Math.min(...r.series);
  const pts = r.series.map((v, i) => {
    const x = (i / (r.series.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * (h - 22) - 11;
    return [x, y] as const;
  });
  const line = pts
    .map(([x, y], i) => (i ? "L" : "M") + x.toFixed(1) + "," + y.toFixed(1))
    .join(" ");

  return (
    <div className="bg-white py-24 lg:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
        <div>
          <motion.p
            className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/75"
            {...rise()}
          >
            {r.eyebrow}
          </motion.p>
          <motion.p
            className="text-[4.4rem] font-semibold leading-[0.92] tracking-[-0.045em] text-navy-dark tabular-nums sm:text-[5.2rem]"
            {...rise(0.05)}
          >
            {r.figure}
          </motion.p>
          <motion.p
            className="mt-4 max-w-sm text-[15.5px] font-semibold leading-snug text-navy-dark"
            {...rise(0.1)}
          >
            {r.figureLabel}
          </motion.p>
          <motion.p
            className="mt-6 max-w-md text-[14.5px] leading-relaxed text-navy-dark/80"
            {...rise(0.15)}
          >
            {r.takeaway}
          </motion.p>
          <motion.div className="mt-8" {...rise(0.2)}>
            <Link
              to={r.caseHref}
              className="group inline-flex items-center gap-2 rounded-xl bg-navy-dark px-7 py-3.5 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-black"
            >
              {r.ctaLabel}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="rounded-[1.4rem] bg-white p-7 shadow-deep lg:p-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-dark/75">
            {r.label}
          </p>
          <p className="mt-5 text-[12.5px] font-medium text-navy-dark/75">
            {r.seriesLabel}
          </p>
          <svg
            viewBox={`0 0 ${w} ${h}`}
            className="mt-4 h-auto w-full"
            fill="none"
            role="img"
            aria-label={r.seriesLabel}
          >
            <motion.path
              d={line}
              stroke="rgb(var(--ink))"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.3, ease: [0.4, 0, 0.2, 1] }}
            />
            {pts.map(([x, y], i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={i === pts.length - 1 ? 6 : 3}
                fill={i === pts.length - 1 ? "rgb(var(--mark))" : "#fff"}
                stroke="rgb(var(--ink))"
                strokeWidth={2}
              />
            ))}
          </svg>

          <dl className="mt-6 grid gap-x-8 gap-y-4 border-t border-line pt-6 sm:grid-cols-3">
            {r.facts.map((f) => (
              <div key={f.k}>
                <dt className="text-[11.5px] leading-snug text-navy-dark/75">
                  {f.k}
                </dt>
                <dd className="mt-1 text-[1.25rem] font-semibold leading-none text-navy-dark tabular-nums">
                  {f.v}
                </dd>
              </div>
            ))}
          </dl>

          <figure className="mt-7 border-t border-line pt-6">
            <blockquote className="text-[15px] leading-[1.5] text-navy-dark">
              {"“"}
              {r.quote.text}
              {"”"}
            </blockquote>
            <figcaption className="mt-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-navy-dark/75">
              {r.quote.who}
            </figcaption>
          </figure>
        </motion.div>
      </div>
    </div>
  );
};

/* 10 — mist */
const Process = () => (
  <div className="bg-mist py-24 lg:py-32">
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <Head
        eyebrow={BM.process.eyebrow}
        pre={BM.process.heading.pre}
        em={BM.process.heading.em}
        className="mb-12"
      />

      <ol className="border-t border-navy-dark/15">
        {BM.process.steps.map((s, i) => (
          <motion.li
            key={s.n}
            className="grid gap-4 border-b border-navy-dark/15 py-7 sm:grid-cols-[auto_1fr] sm:gap-9"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <span className="text-[2.4rem] font-semibold leading-none tracking-[-0.04em] text-navy-dark/50 tabular-nums sm:w-20">
              {s.n}
            </span>
            <div>
              <h3 className="text-[17.5px] font-semibold tracking-[-0.02em] text-navy-dark">
                {s.t}
              </h3>
              <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-navy-dark/75">
                {s.d}
              </p>
              <p className="mt-3.5 inline-flex items-center gap-2 rounded-lg bg-stone px-3.5 py-2 text-[12.5px] font-semibold text-navy-dark">
                <span className="h-1.5 w-1.5 rounded-full bg-verified" />
                Your part — {s.you}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>

      <motion.figure
        className="mx-auto mt-12 max-w-2xl text-center"
        {...rise(0.1)}
      >
        <blockquote className="text-[1.2rem] leading-[1.45] tracking-[-0.02em] text-navy-dark sm:text-[1.4rem]">
          {"“"}
          {BM.process.quote.text}
          {"”"}
        </blockquote>
        <figcaption className="mt-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-navy-dark/75">
          {BM.process.quote.who}
        </figcaption>
      </motion.figure>
    </div>
  </div>
);

/* 11 — stone */
const Included = () => (
  <div className="bg-stone py-24 lg:py-32">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <Head
        eyebrow={BM.included.eyebrow}
        pre={BM.included.heading.pre}
        em={BM.included.heading.em}
        className="mb-12"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {BM.included.items.map((d, i) => (
          <motion.div
            key={d.t}
            className={`rounded-2xl p-7 shadow-lift ${
              i === 0 ? "bg-lilac" : "bg-white"
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
          >
            <h3 className="mb-2 text-[16.5px] font-semibold tracking-[-0.02em] text-navy-dark">
              {d.t}
            </h3>
            <p className="text-[13.5px] leading-relaxed text-navy-dark/75">
              {d.d}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

/* 12 — espresso */
const Fit = () => (
  <div className="bg-navy-dark py-24 lg:py-32">
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <Head
        eyebrow={BM.fit.eyebrow}
        pre={BM.fit.heading.pre}
        em={BM.fit.heading.em}
        dark={true}
        className="mb-12"
      />
      <div className="grid gap-4 md:grid-cols-2">
        {[
          { title: "Worth a call if…", items: BM.fit.good, good: true },
          { title: "We will say no if…", items: BM.fit.bad, good: false },
        ].map((col, i) => (
          <motion.div
            key={col.title}
            className={`rounded-3xl p-8 ${
              col.good
                ? "border border-mark/40 bg-white/[0.07]"
                : "border border-white/12 bg-white/[0.03]"
            }`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
          >
            <h3 className="text-[16px] font-semibold text-white">
              {col.title}
            </h3>
            <ul className="mt-5 space-y-3.5">
              {col.items.map((t) => (
                <li key={t} className="flex gap-3">
                  {col.good ? (
                    <Check className="mt-0.5 h-4 w-4 flex-none text-mark" />
                  ) : (
                    <Minus className="mt-0.5 h-4 w-4 flex-none text-white/55" />
                  )}
                  <span className="text-[14px] leading-relaxed text-white/75">
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <motion.p
        className="mt-8 text-center text-[14.5px] text-white/75"
        {...rise(0.1)}
      >
        {BM.fit.note}
      </motion.p>
    </div>
  </div>
);

/* ================================= page ================================= */

const BrandMentions = () => (
  <PageLayout>
    <Seo title="Brand Mentions" description={BM.sub} />
    <Hero />
    <Proof />
    <Shift />
    <Pathway />
    <Tracked />
    <Anatomy />
    <Reporting />
    <Sources />
    <Result />
    <Process />
    <Included />
    <Fit />
    {/* 13 — clay */}
    <div className="bg-mist py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-balance mb-10 text-center text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-navy-dark sm:text-[2.4rem]"
          {...rise()}
        >
          {"Straight "}
          <span className="text-navy-dark/65">answers</span>
        </motion.h2>
        <FaqList faqs={BM.faqs} />
      </div>
    </div>
    {/* 14 — mist */}
    <OtherServices current="brand-mentions" />
  </PageLayout>
);

export default BrandMentions;
