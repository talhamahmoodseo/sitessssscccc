import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, Minus } from "lucide-react";
import { linkBuilding as LB } from "./content/linkBuilding";
import { OtherServices } from "./shared";
import { FaqList } from "@/components/AgencyBlocks";
import { Wordmark } from "@/components/brand";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";
import { CLIENTS } from "@/lib/clients";
import { openBooking } from "@/lib/booking";

/**
 * /services/link-building — the flagship page.
 *
 * Follows the structure and register of dofollow.com/visibility-plus:
 * situation → problem → framework → results → named methodology →
 * one category-level comparison → the right-move section → context → close.
 *
 * Tone rules this page holds to:
 *   - lead with the client's outcome, never with what other agencies do wrong
 *   - the credibility comes from a named methodology (AuthorityOS™) that is
 *     explained openly, not from positioning as the honest exception
 *   - exactly one comparison, aimed at a category of approach rather than at
 *     agencies, framed as a capability difference
 *
 * Domain approval is no longer a section. It is one FAQ answer, because some
 * clients review every domain and others leave sourcing to us.
 *
 * Surface rhythm: D m w l D w l w m w l m w D m — no two adjacent sections
 * share a tone.
 */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.6, delay, ease: EASE },
});

/** Eyebrow + two-line headline — the page's repeating type unit. */
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
      className={`text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[2.6rem] ${
        dark ? "text-white" : "text-navy-dark"
      }`}
    >
      {pre}{" "}
      <span className={dark ? "text-white/70" : "text-navy-dark/65"}>{em}</span>
    </h2>
  </motion.div>
);

/** Client proof, placed under the claim it supports rather than pooled into
 *  one testimonial wall. */
const QUOTE_TONE = {
  mist: { bg: "bg-mist", quote: "text-navy-dark", cite: "text-navy-dark/70" },
  stone: { bg: "bg-stone", quote: "text-navy-dark", cite: "text-navy-dark/70" },
  white: { bg: "bg-white", quote: "text-navy-dark", cite: "text-navy-dark/70" },
} as const;

const PullQuote = ({
  text,
  who,
  tone,
}: {
  text: string;
  who: string;
  tone: keyof typeof QUOTE_TONE;
}) => {
  const t = QUOTE_TONE[tone];
  return (
    <div className={`${t.bg} py-16 lg:py-20`}>
      <motion.figure
        className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8"
        {...rise()}
      >
        <blockquote
          className={`text-[1.3rem] leading-[1.45] tracking-[-0.02em] sm:text-[1.55rem] ${t.quote}`}
        >
          {"“"}
          {text}
          {"”"}
        </blockquote>
        <figcaption
          className={`mt-5 text-[12.5px] font-semibold uppercase tracking-[0.12em] ${t.cite}`}
        >
          {who}
        </figcaption>
      </motion.figure>
    </div>
  );
};

/* ================================= hero ================================= */

const GapCard = () => {
  const g = LB.gapCard;
  return (
    <motion.div
      className="rounded-[1.4rem] border border-white/10 bg-white p-6 shadow-deep lg:p-7"
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
    >
      <p className="mb-5 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-navy-dark/70">
        {g.label}
        {": "}
        <span className="text-navy-dark">{g.category}</span>
      </p>

      <ul className="space-y-2.5">
        {g.rows.map((r, i) => (
          <motion.li
            key={r.name}
            className={`flex items-center justify-between gap-4 rounded-xl px-4 py-3.5 ${
              r.you ? "bg-mark/25" : "bg-mist"
            }`}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.45 + i * 0.1, ease: EASE }}
          >
            <span className="min-w-0">
              <span className="block truncate text-[13.5px] font-semibold text-navy-dark">
                {r.name}
              </span>
              <span className="mt-0.5 block text-[11.5px] tabular-nums text-navy-dark/70">
                {r.meta}
              </span>
            </span>
            <span
              className={`shrink-0 text-[11px] font-bold uppercase tracking-[0.08em] ${
                r.you ? "text-navy-dark" : "text-navy-dark/70"
              }`}
            >
              {r.status}
            </span>
          </motion.li>
        ))}
      </ul>

      <motion.div
        className="mt-5 rounded-xl border border-line bg-linen p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.85 }}
      >
        <p className="mb-1.5 text-[10.5px] font-bold uppercase tracking-[0.12em] text-navy-dark">
          {g.calloutLabel}
        </p>
        <p className="text-[13px] leading-relaxed text-navy-dark/80">
          {g.callout}
        </p>
      </motion.div>
    </motion.div>
  );
};

const Hero = () => (
  <div className="relative overflow-hidden bg-navy-dark pb-20 pt-32 lg:pb-28 lg:pt-40">
    <div
      className="pointer-events-none absolute -left-32 top-10 h-[460px] w-[620px] rounded-full opacity-[0.20] blur-[90px]"
      style={{ background: "rgb(var(--mark))" }}
      aria-hidden="true"
    />
    <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-8">
      <div>
        <motion.p
          className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {LB.eyebrow}
        </motion.p>
        <motion.h1
          className="text-balance text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-[3.1rem] lg:text-[3.4rem]"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        >
          {LB.h1.pre} <span className="text-white/70">{LB.h1.em}</span>
        </motion.h1>
        <motion.p
          className="mt-7 max-w-xl text-[16.5px] leading-[1.6] text-white/75"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
        >
          {LB.sub}
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
            Request Pricing
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
          <Link
            to="/case-studies"
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
          {LB.credit}
        </motion.p>
      </div>

      <GapCard />
    </div>
  </div>
);

/* ============================== logo band ============================== */

const LogoBand = () => (
  <div className="bg-stone py-14">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.p
        className="mb-8 text-center text-[12.5px] text-navy-dark/70"
        {...rise()}
      >
        {LB.logosLabel}
      </motion.p>
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 lg:gap-x-16">
        {CLIENTS.map((c, i) => (
          <motion.span
            key={c.name}
            className="text-[19px] text-navy-dark/70 transition-colors duration-300 hover:text-navy-dark"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
          >
            <Wordmark name={c.name} />
          </motion.span>
        ))}
      </div>
    </div>
  </div>
);

/* =============================== problem =============================== */

const Problem = () => (
  <div className="bg-white py-24 lg:py-32">
    <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
      <div>
        <Head
          eyebrow={LB.problem.eyebrow}
          pre={LB.problem.heading.pre}
          em={LB.problem.heading.em}
        />
        {LB.problem.paras.map((p, i) => (
          <motion.p
            key={i}
            className="mt-5 text-[15.5px] leading-[1.65] text-navy-dark/75"
            {...rise(0.05 + i * 0.05)}
          >
            {p}
          </motion.p>
        ))}
      </div>

      <motion.div
        className="rounded-3xl border border-line bg-white p-8 text-center shadow-lift lg:p-10"
        {...rise(0.1)}
      >
        <div className="grid grid-cols-2 gap-3">
          {LB.problem.flow.inputs.map((t, i) => (
            <motion.p
              key={t}
              className="rounded-xl bg-white px-4 py-4 text-[13px] font-semibold text-navy-dark shadow-soft"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.07 }}
            >
              {t}
            </motion.p>
          ))}
        </div>
        <ArrowRight
          className="mx-auto my-5 h-5 w-5 rotate-90 text-navy-dark/50"
          aria-hidden="true"
        />
        <p className="inline-block rounded-xl bg-navy-dark px-8 py-4 text-[13px] font-bold uppercase tracking-[0.12em] text-white">
          {LB.problem.flow.mid}
        </p>
        <ArrowRight
          className="mx-auto my-5 h-5 w-5 rotate-90 text-navy-dark/50"
          aria-hidden="true"
        />
        <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-navy-dark/70">
          {LB.problem.flow.out}
        </p>
      </motion.div>
    </div>
  </div>
);

/* ============================== framework ============================== */

const Framework = () => (
  <div className="bg-navy-dark py-24 lg:py-32">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <Head
        eyebrow={LB.framework.eyebrow}
        pre={LB.framework.heading.pre}
        em={LB.framework.heading.em}
        dark={true}
        className="max-w-2xl"
      />
      <motion.p
        className="mt-5 max-w-2xl text-[15.5px] leading-relaxed text-white/70"
        {...rise(0.05)}
      >
        {LB.framework.lede}
      </motion.p>

      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {LB.framework.items.map((s, i) => (
          <motion.article
            key={s.n}
            className="flex flex-col rounded-2xl bg-white p-6 shadow-deep lg:p-7"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.09, ease: EASE }}
          >
            <p className="mb-4 text-[10.5px] font-bold uppercase tracking-[0.14em] text-navy-dark/70">
              {s.n}
              {" / "}
              {s.label}
            </p>
            <h3 className="mb-2.5 text-[17px] font-semibold leading-snug tracking-[-0.02em] text-navy-dark">
              {s.t}
            </h3>
            <p className="mb-6 text-[13.5px] leading-relaxed text-navy-dark/75">
              {s.d}
            </p>
            <p className="mt-auto rounded-lg bg-mist px-3.5 py-2.5 text-[12px] font-semibold text-navy-dark/80">
              {s.chip}
            </p>
          </motion.article>
        ))}
      </div>

      <motion.p
        className="mt-5 rounded-2xl bg-mark px-7 py-7 text-center text-[17px] font-bold tracking-[-0.01em] text-navy-dark sm:text-[19px]"
        {...rise(0.1)}
      >
        {LB.framework.emphasis}
      </motion.p>
    </div>
  </div>
);

/* ============================== movement ============================== */

const Movement = () => (
  <div className="bg-mist py-24 lg:py-32">
    <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
      <motion.p
        className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/70"
        {...rise()}
      >
        {LB.movement.eyebrow}
      </motion.p>
      <motion.h2
        className="text-balance text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.03em] text-navy-dark sm:text-[2.6rem]"
        {...rise(0.05)}
      >
        {LB.movement.heading.pre}{" "}
        <span className="text-navy-dark/65">{LB.movement.heading.em}</span>
      </motion.h2>
      <motion.p className="mt-6 text-[13px] text-navy-dark/70" {...rise(0.1)}>
        {LB.movement.context}
      </motion.p>

      <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
        {LB.movement.tiles.map((t, i) => (
          <motion.div
            key={t.label}
            className="rounded-2xl bg-navy-dark px-6 py-9 shadow-deep"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
          >
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
              {t.label}
            </p>
            <p className="text-[2.4rem] font-semibold leading-none tracking-[-0.03em] text-white tabular-nums sm:text-[2.8rem]">
              {t.value}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="mx-auto mt-8 max-w-2xl text-[14.5px] leading-relaxed text-navy-dark/75"
        {...rise(0.1)}
      >
        {LB.movement.note}
      </motion.p>

      <motion.div className="mt-9" {...rise(0.15)}>
        <Link
          to={LB.movement.ctaHref}
          className="group inline-flex items-center gap-2 rounded-xl border border-navy-dark/20 px-7 py-3.5 text-[14px] font-semibold text-navy-dark transition-colors duration-300 hover:border-navy-dark"
        >
          {LB.movement.ctaLabel}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </motion.div>
    </div>
  </div>
);

/* ============================= methodology ============================= */

const Methodology = () => (
  <div className="bg-stone py-24 lg:py-32">
    <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
      <Head
        eyebrow={LB.methodology.eyebrow}
        pre={LB.methodology.heading.pre}
        em={LB.methodology.heading.em}
        className="mx-auto max-w-2xl"
      />
      <motion.p
        className="mx-auto mt-6 max-w-2xl text-[15.5px] leading-relaxed text-navy-dark/75"
        {...rise(0.05)}
      >
        {LB.methodology.lede}
      </motion.p>

      <div className="mt-14 grid gap-x-10 gap-y-10 text-left sm:grid-cols-2 lg:grid-cols-4">
        {LB.methodology.columns.map((c, i) => (
          <motion.div
            key={c.label}
            className="rounded-2xl border border-line bg-white p-6 shadow-lift"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
          >
            <p className="mb-3 text-[10.5px] font-bold uppercase tracking-[0.14em] text-navy-dark/70">
              {c.label}
            </p>
            <h3 className="mb-3 text-[17px] font-semibold leading-snug tracking-[-0.02em] text-navy-dark">
              {c.q}
            </h3>
            <p className="text-[13.5px] leading-relaxed text-navy-dark/75">
              {c.d}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
        {...rise(0.1)}
      >
        <div className="text-left">
          <p className="text-[15.5px] font-bold text-navy-dark">
            {LB.methodology.flowFrom.t}
          </p>
          <p className="text-[13px] text-navy-dark/70">
            {LB.methodology.flowFrom.d}
          </p>
        </div>
        <ArrowRight
          className="h-5 w-5 shrink-0 rotate-90 text-navy-dark/50 sm:rotate-0"
          aria-hidden="true"
        />
        <div className="rounded-2xl bg-mark/30 px-7 py-5 text-left">
          <p className="text-[15.5px] font-bold text-navy-dark">
            {LB.methodology.flowTo.t}
          </p>
          <p className="text-[13px] text-navy-dark/80">
            {LB.methodology.flowTo.d}
          </p>
        </div>
      </motion.div>
    </div>
  </div>
);

/* ============================= positioning ============================= */

const Positioning = () => (
  <div className="bg-navy-dark py-24 lg:py-32">
    <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
      <Head
        eyebrow={LB.positioning.eyebrow}
        pre={LB.positioning.heading.pre}
        em={LB.positioning.heading.em}
        dark={true}
        className="mx-auto max-w-3xl"
      />
      <motion.p
        className="mx-auto mt-6 max-w-xl text-[15.5px] leading-relaxed text-white/70"
        {...rise(0.05)}
      >
        {LB.positioning.lede}
      </motion.p>

      <div className="mt-12 grid gap-5 text-left sm:grid-cols-2">
        {[
          { ...LB.positioning.them, good: false },
          { ...LB.positioning.us, good: true },
        ].map((col, i) => (
          <motion.div
            key={col.label}
            className={`rounded-3xl p-7 lg:p-8 ${
              col.good
                ? "border border-mark/40 bg-white shadow-deep"
                : "border border-white/12 bg-white/[0.05]"
            }`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
          >
            <p
              className={`mb-6 text-[11px] font-bold uppercase tracking-[0.14em] ${
                col.good ? "text-navy-dark" : "text-white/70"
              }`}
            >
              {col.label}
            </p>
            <ul className="space-y-4">
              {col.items.map((t) => (
                <li key={t} className="flex gap-3">
                  {col.good ? (
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-verified" />
                  ) : (
                    <Minus className="mt-0.5 h-4 w-4 shrink-0 text-white/50" />
                  )}
                  <span
                    className={`text-[14.5px] leading-relaxed ${
                      col.good ? "text-navy-dark" : "text-white/75"
                    }`}
                  >
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="mt-10 text-[16px] font-bold tracking-[-0.01em] text-white sm:text-[17px]"
        {...rise(0.1)}
      >
        {LB.positioning.line}
      </motion.p>

      <motion.div className="mt-8" {...rise(0.15)}>
        <button
          onClick={openBooking}
          className="group inline-flex items-center gap-2 rounded-xl bg-mark px-8 py-4 text-[14px] font-semibold text-navy-dark transition-colors duration-300 hover:bg-mark/90"
        >
          {LB.positioning.ctaLabel}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
      </motion.div>
    </div>
  </div>
);

/* ================================ moves ================================ */

const Moves = () => (
  <div className="bg-mist py-24 lg:py-32">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <Head
            eyebrow={LB.moves.eyebrow}
            pre={LB.moves.heading.pre}
            em={LB.moves.heading.em}
          />
          {LB.moves.paras.map((p, i) => (
            <motion.p
              key={i}
              className={
                i === LB.moves.paras.length - 1
                  ? "mt-6 text-[16px] font-semibold leading-snug text-navy-dark"
                  : "mt-5 text-[15.5px] leading-[1.65] text-navy-dark/75"
              }
              {...rise(0.05 + i * 0.05)}
            >
              {p}
            </motion.p>
          ))}
        </div>

        <div className="space-y-3 self-start">
          {LB.moves.map.map((m, i) => (
            <motion.div
              key={m.gap}
              className="flex items-center justify-between gap-5 rounded-xl bg-white px-5 py-4 shadow-soft"
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
            >
              <span className="text-[14.5px] text-navy-dark/75">{m.gap}</span>
              <span className="flex shrink-0 items-center gap-2 text-[14px] font-bold text-navy-dark">
                <ArrowRight
                  className="h-3.5 w-3.5 text-navy-dark/60"
                  aria-hidden="true"
                />
                {m.move}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <dl className="mt-16 grid gap-x-12 gap-y-7 border-t border-line pt-12 sm:grid-cols-2">
        {LB.moves.defs.map((d, i) => (
          <motion.div
            key={d.t}
            className="sm:grid sm:grid-cols-[0.55fr_1fr] sm:gap-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
          >
            <dt className="mb-1.5 text-[14.5px] font-bold text-navy-dark sm:mb-0">
              {d.t}
            </dt>
            <dd className="text-[13.5px] leading-relaxed text-navy-dark/75">
              {d.d}
            </dd>
          </motion.div>
        ))}
      </dl>

      <motion.p
        className="mt-12 text-center text-[16px] font-bold tracking-[-0.01em] text-navy-dark sm:text-[17px]"
        {...rise(0.1)}
      >
        {LB.moves.closing}
      </motion.p>
    </div>
  </div>
);

/* =============================== context =============================== */

const Context = () => (
  <div className="bg-white py-24 lg:py-32">
    <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
      <div>
        <Head
          eyebrow={LB.context.eyebrow}
          pre={LB.context.heading.pre}
          em={LB.context.heading.em}
        />
        {LB.context.paras.map((p, i) => (
          <motion.p
            key={i}
            className="mt-5 text-[15.5px] leading-[1.65] text-navy-dark/75"
            {...rise(0.05 + i * 0.05)}
          >
            {p}
          </motion.p>
        ))}
      </div>

      <motion.div className="text-center" {...rise(0.1)}>
        <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-navy-dark/70">
          {LB.context.flow.top}
        </p>
        <ArrowRight
          className="mx-auto my-4 h-5 w-5 rotate-90 text-navy-dark/50"
          aria-hidden="true"
        />
        <p className="inline-block rounded-xl bg-navy-dark px-8 py-4 text-[14px] font-bold uppercase tracking-[0.12em] text-white">
          {LB.context.flow.mid}
        </p>
        <ArrowRight
          className="mx-auto my-4 h-5 w-5 rotate-90 text-navy-dark/50"
          aria-hidden="true"
        />
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {LB.context.flow.out.map((o) => (
            <span
              key={o}
              className="text-[12px] font-bold uppercase tracking-[0.14em] text-navy-dark/70"
            >
              {o}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);

/* ================================ close ================================ */

const Close = () => (
  <div className="relative overflow-hidden bg-navy-dark py-24 lg:py-32">
    <div
      className="pointer-events-none absolute -right-24 bottom-0 h-[420px] w-[560px] rounded-full opacity-[0.16] blur-[90px]"
      style={{ background: "rgb(var(--mark))" }}
      aria-hidden="true"
    />
    <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-8">
      <div>
        <motion.h2
          className="text-balance text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-[2.7rem]"
          {...rise()}
        >
          {LB.close.heading.pre}{" "}
          <span className="text-white/70">{LB.close.heading.em}</span>
        </motion.h2>
        <motion.p
          className="mt-6 max-w-lg text-[15.5px] leading-[1.6] text-white/75"
          {...rise(0.05)}
        >
          {LB.close.lede}
        </motion.p>
        <motion.div className="mt-9" {...rise(0.1)}>
          <button
            onClick={openBooking}
            className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-[14px] font-semibold text-navy-dark transition-colors duration-300 hover:bg-white/90"
          >
            {LB.close.ctaLabel}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </motion.div>
      </div>

      <motion.div
        className="rounded-[1.4rem] bg-white p-7 shadow-deep"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <p className="mb-6 text-[10.5px] font-bold uppercase tracking-[0.14em] text-navy-dark/70">
          {LB.close.snapshot.label}
        </p>
        {LB.close.snapshot.bars.map((b, i) => (
          <div key={b.k} className="mb-5">
            <div className="mb-2 flex items-baseline justify-between">
              <span className="text-[13.5px] text-navy-dark/80">{b.k}</span>
              <span className="text-[13.5px] font-bold tabular-nums text-navy-dark">
                {b.v}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-mist">
              <motion.div
                className={`h-full rounded-full ${
                  i === 0 ? "bg-navy-dark" : "bg-navy-dark/40"
                }`}
                initial={{ width: 0 }}
                whileInView={{ width: `${(b.v / b.max) * 100}%` }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.9,
                  delay: 0.3 + i * 0.12,
                  ease: EASE,
                }}
              />
            </div>
          </div>
        ))}
        <dl className="mt-6 flex gap-8 border-t border-line pt-5">
          {LB.close.snapshot.facts.map((f) => (
            <div key={f.k}>
              <dt className="text-[11.5px] leading-snug text-navy-dark/70">
                {f.k}
              </dt>
              <dd className="mt-1 text-[1.3rem] font-semibold leading-none text-navy-dark tabular-nums">
                {f.v}
              </dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </div>
  </div>
);

/* ================================= page ================================= */

const LinkBuilding = () => (
  <PageLayout>
    <Seo title="Link Building" description={LB.sub} />
    <Hero />
    <LogoBand />
    <Problem />
    <PullQuote {...LB.quotes.afterProblem} tone="mist" />
    <Framework />
    <Movement />
    <Methodology />
    <Positioning />
    <PullQuote {...LB.quotes.afterComparison} tone="stone" />
    <Moves />
    <Context />
    <PullQuote {...LB.quotes.beforeClose} tone="white" />
    <div className="bg-stone py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-balance mb-10 text-center text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-navy-dark sm:text-[2.4rem]"
          {...rise()}
        >
          {"Common "}
          <span className="text-navy-dark/65">questions</span>
        </motion.h2>
        <FaqList faqs={LB.faqs} />
      </div>
    </div>
    <Close />
    <OtherServices current="link-building" />
  </PageLayout>
);

export default LinkBuilding;
