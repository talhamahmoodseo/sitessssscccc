import type { ComponentType } from "react";
import { motion, useReducedMotion } from "motion/react";
import { BookOpen } from "lucide-react";
import { AiOverviewMark, GoogleMark } from "@/components/PlatformMarks";
import { home } from "./content";
import { CARD, Head, ease, rise } from "./kit";

const E = home.engine;

const MARKS: Record<string, ComponentType<{ className?: string }>> = {
  google: GoogleMark,
  ai: AiOverviewMark,
  reader: ({ className }) => (
    <span className={`flex items-center justify-center rounded-full bg-mint ${className}`}>
      <BookOpen className="h-3 w-3 text-navy-dark" />
    </span>
  ),
};

const DOTS = ["bg-butter", "bg-mint", "bg-lilac"];

/** The published piece everything flows from. */
const Source = () => (
  <div className={`${CARD} overflow-hidden`}>
    <div className="flex items-center justify-between border-b border-line px-5 py-3">
      <span className="font-serif text-[16px] font-semibold text-navy-dark">{E.source.pub}</span>
      <span className="rounded-full bg-verified/[0.12] px-2 py-0.5 text-[10.5px] font-semibold text-verified">
        Indexed
      </span>
    </div>
    <div className="px-5 py-5">
      <p className="font-serif text-[19px] leading-[1.22] text-navy-dark">{E.source.title}</p>
      <div className="mt-4 space-y-1.5" aria-hidden="true">
        <span className="block h-[7px] w-full rounded-full bg-navy-dark/[0.06]" />
        <span className="block h-[7px] w-[80%] rounded-full bg-navy-dark/[0.06]" />
      </div>
      <p className="mt-4 text-[13.5px] leading-[1.7] text-navy-dark/80">
        …the answer is rarely headcount. More often it's{" "}
        <span
          className="font-semibold text-navy-dark underline decoration-navy-dark/40 decoration-2 underline-offset-[3px]"
          style={{ background: "linear-gradient(transparent 55%, rgb(var(--mark) / 0.7) 55%)" }}
        >
          {E.source.link}
        </span>
        …
      </p>
    </div>
  </div>
);

/** Three curved lines from the source to the outcomes, with a dot of
 *  "authority" travelling along each. Drawn in a 120 x 600 box that stretches
 *  to the column height, so the ends land on the card centres. */
const Connectors = () => {
  const reduced = useReducedMotion();
  const ends = [100, 300, 500];
  return (
    <svg
      viewBox="0 0 120 600"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
      fill="none"
      aria-hidden="true"
    >
      {ends.map((y, n) => {
        const d = `M0 300 C 60 300, 60 ${y}, 120 ${y}`;
        return (
          <g key={y}>
            <motion.path
              d={d}
              stroke="rgb(var(--ink))"
              strokeOpacity="0.25"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 1, delay: 0.3 + n * 0.2, ease }}
            />
            {!reduced && (
              <circle r="4" fill="rgb(var(--mark-deep))">
                <animateMotion dur="3.2s" begin={`${1.4 + n * 0.5}s`} repeatCount="indefinite" path={d} />
              </circle>
            )}
          </g>
        );
      })}
    </svg>
  );
};

const Engine = () => (
  <section className="bg-white py-24 lg:py-36">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <Head eyebrow={E.eyebrow} title={E.h2} lead={E.lead} center />

      <div className="mt-16 grid gap-8 lg:mt-20 lg:grid-cols-[0.95fr_120px_1.15fr] lg:items-stretch lg:gap-0">
        <motion.div className="lg:self-center" {...rise()}>
          <Source />
        </motion.div>

        {/* desktop: curved connectors. small screens: a short dashed drop */}
        <div className="relative hidden h-full min-h-[420px] lg:block">
          <Connectors />
        </div>
        <div className="mx-auto h-10 w-px border-l border-dashed border-navy-dark/30 lg:hidden" aria-hidden="true" />

        <ul className="flex flex-col gap-4 lg:h-full">
          {E.outcomes.map((o, n) => {
            const Mark = MARKS[o.mark];
            return (
              <motion.li
                key={o.k}
                className="flex gap-4 rounded-[20px] bg-mist p-5 ring-1 ring-line sm:p-6 lg:flex-1"
                {...rise(0.15 + n * 0.12)}
              >
                <Mark className="mt-0.5 h-6 w-6 flex-none" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-navy-dark/70">
                      <span className={`h-2 w-2 rounded-full ${DOTS[n]}`} />
                      {o.k}
                    </span>
                    <span className="ml-auto rounded-full bg-white px-2.5 py-1 text-[11.5px] font-semibold tabular-nums text-navy-dark ring-1 ring-line">
                      {o.tag}
                    </span>
                  </div>
                  <h3 className="mt-2 text-[20px] font-medium tracking-[-0.025em] text-navy-dark">{o.t}</h3>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-navy-dark/75">{o.d}</p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>

      <motion.p
        className="mt-14 text-center font-hand text-[26px] leading-tight text-navy-dark/80"
        initial={{ opacity: 0, rotate: -2 }}
        whileInView={{ opacity: 1, rotate: -1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {E.footnote}
      </motion.p>
    </div>
  </section>
);

export default Engine;
