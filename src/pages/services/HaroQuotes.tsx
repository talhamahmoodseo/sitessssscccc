import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  Minus,
  Star,
  X,
} from "lucide-react";
import { haroQuotes as H } from "./content/haroQuotes";
import { Glow, OtherServices } from "./shared";
import { FaqList } from "@/components/AgencyBlocks";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";
import { openBooking } from "@/lib/booking";

/**
 * /services/haro-links — expert quotes and source placements.
 *
 * Identity of this page: the request window. Everything is built around the
 * fact that a journalist's question is open for hours, so the shapes are a live
 * request queue, a timeline of the window, a dossier of prepared expertise, a
 * printed clipping, and a count of what we did not answer.
 *
 * Tone rules it holds to (see content/haroQuotes.ts):
 *   - describes our own work, experience and results; never what others do wrong
 *   - credibility from AuthorityOS™, explained openly, and from concrete figures
 *   - exactly one comparison, aimed at a category of approach, and it sits in
 *     the process section
 *   - honest about the limits: modest volume, a third of quotes unlinked
 *
 * Surface rhythm: espresso → stone → mist → white → MARK → navy-dark → clay →
 * stone → mist → espresso → stone → clay. Seven distinct surfaces, two darks,
 * one amber, no adjacent repeats, never more than three lights in a row.
 */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.6, delay, ease: EASE },
});

/** Eyebrow sitting on a hairline, then a two-line headline whose second line
 *  turns the first. The page's repeating type unit. */
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
      className={`mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] ${
        dark ? "text-white/70" : "text-navy-dark/70"
      }`}
    >
      <span
        className={`h-px w-8 ${dark ? "bg-white/45" : "bg-navy-dark/35"}`}
        aria-hidden="true"
      />
      {eyebrow}
    </p>
    <h2
      className={`text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[2.5rem] ${
        dark ? "text-white" : "text-navy-dark"
      }`}
    >
      {pre}
      <br />
      <span className={dark ? "text-white/70" : "text-navy-dark/65"}>{em}</span>
    </h2>
  </motion.div>
);

/* ================================= hero ================================= */

/** The live request queue. One row is a deliberate skip, which is the whole
 *  argument of the page stated as an object rather than a sentence. */
const RequestQueue = () => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="overflow-hidden rounded-[1.4rem] bg-white shadow-deep">
      <div className="flex items-center gap-2.5 border-b border-line bg-stone px-5 py-3.5">
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute h-full w-full animate-ping rounded-full bg-verified opacity-60" />
          <span className="relative h-2 w-2 rounded-full bg-verified" />
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-dark/70">
          {H.queue.label}
        </span>
        <span className="ml-auto text-[11px] font-semibold text-navy-dark">
          {H.queue.meta}
        </span>
      </div>

      <ul>
        {H.queue.rows.map((r, i) => {
          const left = Math.max(0, r.mins - Math.floor(tick / 4));
          return (
            <motion.li
              key={r.outlet}
              className={`flex items-start gap-3.5 px-5 py-4 ${
                i ? "border-t border-line" : ""
              }`}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.3 + i * 0.12 }}
            >
              <span
                className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full ${
                  r.fit ? "bg-verified/15" : "bg-gap/12"
                }`}
              >
                {r.fit ? (
                  <Check className="h-3 w-3 text-verified" aria-hidden="true" />
                ) : (
                  <X className="h-3 w-3 text-gap" aria-hidden="true" />
                )}
                {r.fit && <span className="sr-only">Fit</span>}
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span
                    className={`text-[12.5px] font-semibold ${
                      r.fit ? "text-navy-dark" : "text-navy-dark/75"
                    }`}
                  >
                    {r.outlet}
                  </span>
                  <span className="rounded border border-line px-1.5 py-0.5 text-[9.5px] font-bold tabular-nums text-navy-dark/75">
                    {r.dr}
                  </span>
                </span>
                <span className="mt-1 block text-[12.5px] leading-snug text-navy-dark/75">
                  {r.ask}
                </span>
              </span>

              {r.fit ? (
                <span
                  className={`inline-flex flex-none items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold tabular-nums ${
                    left < 60
                      ? "bg-mark/40 text-navy-dark"
                      : "bg-stone text-navy-dark/80"
                  }`}
                >
                  <Clock className="h-2.5 w-2.5" aria-hidden="true" />
                  {left}m
                </span>
              ) : (
                <span className="inline-flex flex-none items-center rounded-full border border-line px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-navy-dark/75">
                  {H.queue.skipLabel}
                </span>
              )}
            </motion.li>
          );
        })}
      </ul>

      <p className="border-t border-line bg-stone/60 px-5 py-4 text-[11.5px] leading-relaxed text-navy-dark/75">
        {H.queue.foot}
      </p>
    </div>
  );
};

const Hero = () => (
  <div className="relative overflow-hidden bg-espresso pb-20 pt-32 lg:pb-28 lg:pt-40">
    <Glow
      tint="bg-blush"
      className="-right-24 top-4 h-[400px] w-[540px] opacity-[0.16]"
    />
    <Glow
      tint="bg-butter"
      className="-left-28 top-52 h-[320px] w-[420px] opacity-[0.12]"
    />
    <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1.02fr] lg:gap-20 lg:px-8">
      <div>
        <motion.p
          className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {H.eyebrow}
        </motion.p>
        <motion.h1
          className="text-[2.35rem] font-semibold leading-[1.06] tracking-[-0.035em] text-white sm:text-[2.9rem] lg:text-[3.2rem]"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        >
          {H.h1.pre}
          <br />
          <span className="text-white/70">{H.h1.em}</span>
        </motion.h1>
        <motion.p
          className="mt-7 max-w-xl text-[16.5px] leading-[1.6] text-white/75"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
        >
          {H.sub}
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
            Get Me Quoted
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-7 py-4 text-[14px] font-semibold text-white/85 transition-colors duration-300 hover:border-white hover:text-white"
          >
            See pricing
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <motion.div
          className="mt-8 flex flex-wrap items-center gap-2.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.42 }}
        >
          <span className="flex gap-0.5" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-white text-white" />
            ))}
          </span>
          <span className="text-[12.5px] text-white/70">
            Top rated on Upwork &amp; Fiverr · 40+ brands served
          </span>
        </motion.div>

        <motion.p
          className="mt-5 text-[12.5px] italic leading-relaxed text-white/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {H.credit}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.25, ease: EASE }}
      >
        <RequestQueue />
      </motion.div>
    </div>
  </div>
);

/* ============================== figures band ============================== */

const Numbers = () => (
  <div className="bg-stone py-16 lg:py-20">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.p
        className="mb-10 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/70"
        {...rise()}
      >
        {H.numbers.label}
      </motion.p>
      <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {H.numbers.items.map((n, i) => (
          <motion.div
            key={n.label}
            className="border-t border-navy-dark/15 pt-6 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0 lg:first:border-l-0 lg:first:pl-0"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
          >
            <dd className="text-[2.6rem] font-semibold leading-none tracking-[-0.04em] text-navy-dark tabular-nums sm:text-[3rem]">
              {n.fig}
            </dd>
            <dt className="mt-3 max-w-[14rem] text-[12.5px] leading-snug text-navy-dark/75">
              {n.label}
            </dt>
          </motion.div>
        ))}
      </dl>
    </div>
  </div>
);

/* =============================== the window =============================== */

const Problem = () => (
  <div className="bg-mist py-24 lg:py-32">
    <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:gap-20 lg:px-8">
      <div>
        <Head
          eyebrow={H.problem.eyebrow}
          pre={H.problem.heading.pre}
          em={H.problem.heading.em}
        />
        {H.problem.paras.map((p, i) => (
          <motion.p
            key={i}
            className={
              i === H.problem.paras.length - 1
                ? "mt-6 text-[16px] font-semibold leading-snug text-navy-dark"
                : "mt-5 text-[15.5px] leading-[1.65] text-navy-dark/75"
            }
            {...rise(0.05 + i * 0.05)}
          >
            {p}
          </motion.p>
        ))}
      </div>

      {/* pastel feature panel carrying the timeline figure */}
      <motion.figure
        className="rounded-3xl border border-line bg-sky/40 p-7 shadow-lift lg:p-9"
        {...rise(0.1)}
      >
        <figcaption className="mb-7 text-[11px] font-bold uppercase tracking-[0.14em] text-navy-dark/75">
          {H.problem.window.label}
        </figcaption>

        <ol>
          {H.problem.window.marks.map((m, i) => (
            <motion.li
              key={m.t}
              className="flex items-stretch gap-4"
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
            >
              <span className="w-[46px] flex-none text-right text-[13px] font-bold tabular-nums text-navy-dark">
                {m.t}
              </span>
              <span
                className="flex w-3.5 flex-none flex-col items-center"
                aria-hidden="true"
              >
                <span
                  className={`mt-1 h-3.5 w-3.5 flex-none rounded-full ${
                    m.ours
                      ? "bg-navy-dark ring-[3px] ring-mark"
                      : "border-2 border-navy-dark/45 bg-white"
                  }`}
                />
                {i < H.problem.window.marks.length - 1 && (
                  <span className="w-px flex-1 bg-navy-dark/25" />
                )}
              </span>
              <span
                className={`text-[14px] leading-snug ${
                  i < H.problem.window.marks.length - 1 ? "pb-7" : ""
                } ${m.ours ? "font-bold text-navy-dark" : "text-navy-dark/80"}`}
              >
                {m.d}
              </span>
            </motion.li>
          ))}
        </ol>

        <p className="mt-7 border-t border-navy-dark/15 pt-5 text-[12px] text-navy-dark/75">
          {H.problem.window.note}
        </p>
      </motion.figure>
    </div>
  </div>
);

/* ============================ expertise profile ============================ */

const Profile = () => (
  <div className="bg-white py-24 lg:py-32">
    <div className="mx-auto grid max-w-6xl items-start gap-14 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 lg:px-8">
      <div className="lg:pt-6">
        <Head
          eyebrow={H.profile.eyebrow}
          pre={H.profile.heading.pre}
          em={H.profile.heading.em}
        />
        <motion.p
          className="mt-5 text-[15.5px] leading-[1.65] text-navy-dark/75"
          {...rise(0.05)}
        >
          {H.profile.lede}
        </motion.p>
        <motion.p
          className="mt-6 border-l-2 border-mark pl-5 text-[15px] font-semibold leading-snug text-navy-dark"
          {...rise(0.1)}
        >
          {H.profile.note}
        </motion.p>
      </div>

      {/* bordered inset dossier on a deeper ground than the section */}
      <motion.div
        className="rounded-3xl border border-line bg-stone p-7 lg:p-9"
        {...rise(0.1)}
      >
        <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.14em] text-navy-dark/75">
          {H.profile.caption}
        </p>
        <dl>
          {H.profile.rows.map((r, i) => (
            <motion.div
              key={r.k}
              className={`grid gap-1 py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-5 ${
                i ? "border-t border-navy-dark/15" : "pt-0"
              }`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
            >
              <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-navy-dark/75">
                {r.k}
              </dt>
              <dd className="text-[14.5px] leading-snug text-navy-dark">
                {r.v}
              </dd>
            </motion.div>
          ))}
        </dl>
      </motion.div>
    </div>
  </div>
);

/* ============================== the amber band ============================== */

/** The one saturated moment on the page: the ratio the whole service turns on. */
const Ratio = () => (
  <div className="bg-mark py-20 lg:py-24">
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <motion.p
        className="mb-10 text-[11px] font-bold uppercase tracking-[0.18em] text-navy-dark/80"
        {...rise()}
      >
        {H.ratio.label}
      </motion.p>

      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
        <div className="flex items-end gap-8">
          {[H.ratio.answered, H.ratio.skipped].map((f, i) => (
            <motion.div
              key={f.k}
              className={i ? "border-l border-navy-dark/25 pl-8" : ""}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
            >
              <p className="text-[3.4rem] font-semibold leading-[0.85] tracking-[-0.045em] text-navy-dark tabular-nums sm:text-[4.4rem]">
                {f.v}
              </p>
              <p className="mt-3 text-[12px] font-bold uppercase tracking-[0.12em] text-navy-dark/80">
                {f.k}
              </p>
            </motion.div>
          ))}
        </div>

        <div>
          <motion.p
            className="text-[1.5rem] font-semibold leading-[1.15] tracking-[-0.03em] text-navy-dark sm:text-[1.8rem]"
            {...rise(0.1)}
          >
            {H.ratio.line}
          </motion.p>
          <motion.p
            className="mt-4 text-[14.5px] leading-[1.6] text-navy-dark/80"
            {...rise(0.15)}
          >
            {H.ratio.body}
          </motion.p>
        </div>
      </div>
    </div>
  </div>
);

/* =============================== methodology =============================== */

const Methodology = () => (
  <div className="bg-navy-dark py-24 lg:py-32">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <Head
        eyebrow={H.methodology.eyebrow}
        pre={H.methodology.heading.pre}
        em={H.methodology.heading.em}
        dark={true}
        className="max-w-2xl"
      />
      <motion.p
        className="mt-5 max-w-2xl text-[15.5px] leading-relaxed text-white/70"
        {...rise(0.05)}
      >
        {H.methodology.lede}
      </motion.p>

      {/* hairline rules carrying the layout instead of four more cards */}
      <dl className="mt-14">
        {H.methodology.rows.map((r, i) => (
          <motion.div
            key={r.label}
            className="grid gap-3 border-t border-white/15 py-8 lg:grid-cols-[7rem_1fr_1.35fr] lg:items-baseline lg:gap-10"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
          >
            <p className="flex items-baseline gap-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white/70">
              <span className="text-[1.6rem] font-semibold leading-none tracking-[-0.03em] text-white/35 tabular-nums">
                {`0${i + 1}`}
              </span>
              {r.label}
            </p>
            <dt className="text-[18px] font-semibold leading-snug tracking-[-0.02em] text-white">
              {r.q}
            </dt>
            <dd className="text-[14.5px] leading-relaxed text-white/70">
              {r.d}
            </dd>
          </motion.div>
        ))}
      </dl>

      <motion.p
        className="mt-10 rounded-2xl border border-white/20 bg-white/[0.05] px-7 py-7 text-center text-[17px] font-semibold tracking-[-0.01em] text-white sm:text-[19px]"
        {...rise(0.1)}
      >
        {H.methodology.emphasis}
      </motion.p>
    </div>
  </div>
);

/* ================================= process ================================= */

const Process = () => (
  <div className="bg-clay pb-36 pt-24 lg:pb-52 lg:pt-32">
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <Head
        eyebrow={H.process.eyebrow}
        pre={H.process.heading.pre}
        em={H.process.heading.em}
      />

      <ol className="mt-14">
        {H.process.steps.map((s, i) => (
          <motion.li
            key={s.n}
            className="grid gap-4 border-t border-navy-dark/20 py-7 sm:grid-cols-[4.5rem_1fr] sm:gap-7 lg:grid-cols-[4.5rem_1.2fr_0.85fr] lg:items-start lg:gap-10"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
          >
            <p className="text-[2.4rem] font-semibold leading-none tracking-[-0.04em] text-navy-dark/55 tabular-nums">
              {s.n}
            </p>
            <div>
              <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-navy-dark">
                {s.t}
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-navy-dark/75">
                {s.d}
              </p>
            </div>
            <p className="inline-flex items-start gap-2.5 rounded-xl bg-white px-4 py-3 text-[12.5px] leading-snug text-navy-dark shadow-soft lg:mt-1">
              <span
                className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-verified"
                aria-hidden="true"
              />
              <span>
                <span className="font-bold">Your part — </span>
                {s.you}
              </span>
            </p>
          </motion.li>
        ))}
      </ol>

      {/* the page's single comparison, aimed at a category of approach */}
      <motion.p
        className="mt-12 rounded-2xl border border-navy-dark/25 px-7 py-7 text-center text-[17px] font-semibold tracking-[-0.01em] text-navy-dark sm:text-[19px]"
        {...rise(0.1)}
      >
        {H.positioning.line}
      </motion.p>
    </div>
  </div>
);

/* ================================ clipping ================================ */

/** The right column interlocks with the section above it — the clipping is
 *  pulled up over the boundary so the two surfaces overlap. */
const Clipping = () => (
  <div className="bg-stone pb-24 pt-24 lg:pb-32 lg:pt-32">
    <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
      <div className="lg:pt-4">
        <Head
          eyebrow={H.clipping.eyebrow}
          pre={H.clipping.heading.pre}
          em={H.clipping.heading.em}
        />

        {/* honest about the limit, in the same column as the claim */}
        <motion.div
          className="mt-10 rounded-2xl border border-navy-dark/20 p-6 sm:p-7"
          {...rise(0.1)}
        >
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-navy-dark/25 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-navy-dark/80">
              {H.clipping.alt.badge}
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-navy-dark/70">
              {H.clipping.alt.label}
            </span>
          </div>
          <p className="text-[13.5px] leading-relaxed text-navy-dark/80">
            {H.clipping.alt.note}
          </p>
        </motion.div>
      </div>

      <div className="relative z-10 lg:-mt-56">
        <motion.figure
          className="rounded-[1.6rem] bg-white p-8 shadow-deep sm:p-11"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <p className="text-[13px] font-semibold text-navy-dark">
            {H.clipping.main.outlet}
          </p>
          <p className="mb-7 text-[11px] text-navy-dark/70">
            {H.clipping.main.meta}
          </p>

          <span
            className="mb-2 block h-1.5 w-full rounded-full bg-navy-dark/10"
            aria-hidden="true"
          />
          <span
            className="mb-7 block h-1.5 w-11/12 rounded-full bg-navy-dark/10"
            aria-hidden="true"
          />

          <blockquote className="mb-4 text-[19px] leading-[1.6] text-navy-dark sm:text-[21px]">
            {"“"}
            <span className="rounded bg-butter px-1.5 font-semibold">
              {H.clipping.main.quote}
            </span>
            {`,” ${H.clipping.main.attribution} `}
            <span className="font-semibold underline decoration-navy-dark/30 underline-offset-4">
              {H.clipping.main.brand}
            </span>
            .
          </blockquote>

          <span
            className="mb-2 block h-1.5 w-10/12 rounded-full bg-navy-dark/10"
            aria-hidden="true"
          />
          <span
            className="mb-7 block h-1.5 w-9/12 rounded-full bg-navy-dark/10"
            aria-hidden="true"
          />

          <div className="flex flex-wrap gap-2">
            {H.clipping.main.badges.map((b, i) => (
              <span
                key={b}
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] ${
                  i === 0
                    ? "border border-verified/30 bg-verified/10 text-verified"
                    : "border border-line bg-mist text-navy-dark/75"
                }`}
              >
                {i === 0 && (
                  <Check className="h-2.5 w-2.5" aria-hidden="true" />
                )}
                {b}
              </span>
            ))}
          </div>

          <figcaption className="mt-7 border-t border-line pt-6 text-[13.5px] leading-relaxed text-navy-dark/75">
            {H.clipping.main.why}
          </figcaption>
        </motion.figure>
      </div>
    </div>
  </div>
);

/* ================================== proof ================================== */

const MAX_DOTS = Math.max(...H.example.monthly);

const Proof = () => (
  <div className="bg-mist py-24 lg:py-32">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <Head
        eyebrow={H.example.eyebrow}
        pre={H.example.heading.pre}
        em={H.example.heading.em}
        className="mb-12 max-w-2xl"
      />

      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <motion.div
          className="rounded-3xl bg-white p-7 shadow-lift lg:p-8"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-navy-dark/70">
            {H.example.label}
          </p>
          <dl className="mt-6">
            {H.example.facts.map((f) => (
              <div
                key={f.k}
                className="flex items-baseline justify-between gap-4 border-b border-line py-3.5 last:border-0"
              >
                <dt className="text-[13.5px] text-navy-dark/75">{f.k}</dt>
                <dd className="text-[15px] font-semibold tabular-nums text-navy-dark">
                  {f.v}
                </dd>
              </div>
            ))}
          </dl>
          <Link
            to={H.example.caseHref}
            className="mt-7 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-navy-dark underline decoration-navy-dark/30 underline-offset-4 transition-colors hover:decoration-navy-dark"
          >
            {H.example.ctaLabel}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>

        <motion.div
          className="rounded-3xl border border-line bg-butter/40 p-7 lg:p-9"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-navy-dark/75">
            {H.example.seriesLabel}
          </p>

          {/* one dot per published quote — the figure is the count itself */}
          <ul className="mt-6 space-y-2.5">
            {H.example.monthly.map((count, month) => (
              <li key={month} className="flex items-center gap-4">
                <span className="w-14 flex-none text-[11.5px] font-bold uppercase tracking-[0.1em] text-navy-dark/75">
                  {`Mo ${month}`}
                </span>
                <span className="flex items-center gap-1.5">
                  {Array.from({ length: MAX_DOTS }).map((_, slot) => (
                    <motion.span
                      key={slot}
                      className={`h-3.5 w-3.5 rounded-full ${
                        slot < count
                          ? "bg-navy-dark"
                          : "border border-navy-dark/25"
                      }`}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.35,
                        delay: 0.2 + month * 0.12 + slot * 0.05,
                      }}
                    />
                  ))}
                </span>
                <span className="text-[12.5px] font-semibold tabular-nums text-navy-dark">
                  {count === 0 ? "—" : count}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-7 border-t border-navy-dark/15 pt-6 text-[13.5px] leading-relaxed text-navy-dark/80">
            {H.example.takeaway}
          </p>

          <figure className="mt-7 border-t border-navy-dark/15 pt-6">
            <blockquote className="text-[15.5px] leading-[1.5] text-navy-dark">
              {`“${H.quote.text}”`}
            </blockquote>
            <figcaption className="mt-3 text-[12.5px] font-semibold text-navy-dark/75">
              {H.quote.who}
            </figcaption>
          </figure>
        </motion.div>
      </div>
    </div>
  </div>
);

/* ================================= skipped ================================= */

const Skipped = () => (
  <div className="bg-espresso py-24 lg:py-32">
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <Head
        eyebrow={H.skipped.eyebrow}
        pre={H.skipped.heading.pre}
        em={H.skipped.heading.em}
        dark={true}
        className="max-w-2xl"
      />
      <motion.p
        className="mt-5 max-w-2xl text-[15.5px] leading-relaxed text-white/70"
        {...rise(0.05)}
      >
        {H.skipped.lede}
      </motion.p>

      <ul className="mt-12">
        {H.skipped.items.map((r, i) => (
          <motion.li
            key={r.site}
            className="grid gap-4 border-t border-white/15 py-7 sm:grid-cols-[1fr_auto] sm:gap-8 lg:py-8"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
          >
            <div>
              <h3 className="text-[17px] font-semibold leading-snug text-white">
                {r.site}
              </h3>
              <p className="mt-2.5 max-w-2xl text-[14px] leading-relaxed text-white/70">
                {r.reason}
              </p>
            </div>
            <div className="flex items-start gap-3 sm:flex-col sm:items-end">
              <span className="text-[13px] font-bold tabular-nums text-white/75">
                {r.metric}
              </span>
              <span className="rounded-full border border-white/25 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-white/75">
                Skipped
              </span>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  </div>
);

/* =================================== fit =================================== */

const Fit = () => (
  <div className="bg-stone py-24 lg:py-32">
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <Head
        eyebrow={H.fit.eyebrow}
        pre={H.fit.heading.pre}
        em={H.fit.heading.em}
        className="max-w-2xl"
      />

      <div className="mt-12 grid gap-12 sm:grid-cols-2 sm:gap-10">
        {[
          { title: "Worth a call if…", items: H.fit.good, good: true },
          { title: "Probably not if…", items: H.fit.bad, good: false },
        ].map((col, i) => (
          <motion.div
            key={col.title}
            className={i ? "sm:border-l sm:border-navy-dark/20 sm:pl-10" : ""}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
          >
            <h3 className="text-[16px] font-bold text-navy-dark">
              {col.title}
            </h3>
            <ul className="mt-5">
              {col.items.map((t) => (
                <li
                  key={t}
                  className="flex gap-3 border-t border-navy-dark/15 py-4"
                >
                  {col.good ? (
                    <Check
                      className="mt-0.5 h-4 w-4 flex-none text-verified"
                      aria-hidden="true"
                    />
                  ) : (
                    <Minus
                      className="mt-0.5 h-4 w-4 flex-none text-navy-dark/60"
                      aria-hidden="true"
                    />
                  )}
                  <span className="text-[14px] leading-relaxed text-navy-dark/80">
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-12 flex flex-col items-start gap-6 border-t border-navy-dark/20 pt-10 sm:flex-row sm:items-center sm:justify-between"
        {...rise(0.1)}
      >
        <p className="max-w-xl text-[14.5px] leading-relaxed text-navy-dark/80">
          {H.fit.note}
        </p>
        <button
          onClick={openBooking}
          className="group inline-flex flex-none items-center gap-2 rounded-xl bg-navy-dark px-7 py-4 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-black"
        >
          {H.fit.ctaLabel}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
      </motion.div>
    </div>
  </div>
);

/* =================================== page =================================== */

const HaroQuotes = () => (
  <PageLayout>
    <Seo title="HARO & Expert Quotes" description={H.sub} />
    <Hero />
    <Numbers />
    <Problem />
    <Profile />
    <Ratio />
    <Methodology />
    <Process />
    <Clipping />
    <Proof />
    <Skipped />
    <Fit />
    <div className="bg-clay py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="mb-10 text-center text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] text-navy-dark sm:text-[2.4rem]"
          {...rise()}
        >
          {"Straight "}
          <span className="text-navy-dark/65">answers</span>
        </motion.h2>
        <FaqList faqs={H.faqs} />
      </div>
    </div>
    <OtherServices current="haro-links" />
  </PageLayout>
);

export default HaroQuotes;
