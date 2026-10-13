import { useState } from "react";
import type { ComponentType } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Linkedin } from "lucide-react";
import { asset, openBooking } from "@/lib/booking";
import {
  FigCategoryClimb,
  FigCleanAudit,
  FigFounder,
  FigLocalMap,
  FigNetwork,
  FigSplitSearch,
  FigSpreadsheet,
  FigTrendline,
  FigWhiteLabel,
} from "@/components/LineArt";
import { LINKEDIN_URL, home } from "./content";
import { Accent, COLOURS, Eyebrow, GrainBlob, Head, Title, ease, rise } from "./kit";

const FIGS: Record<string, ComponentType<{ className?: string }>> = {
  audit: FigCleanAudit,
  write: FigFounder,
  report: FigSpreadsheet,
  people: FigNetwork,
  whitelabel: FigWhiteLabel,
  climb: FigCategoryClimb,
  seo: FigSplitSearch,
  trend: FigTrendline,
  local: FigLocalMap,
};

/* ------------------------------- how we work ------------------------------- */

export const Approach = () => {
  const A = home.approach;
  return (
    <section className="bg-mist py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Head eyebrow={A.eyebrow} title={A.h2} lead={A.lead} />
        <ol className="mt-16 grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {A.items.map((it, n) => {
            const Fig = FIGS[it.fig];
            return (
              <motion.li
                key={it.t}
                className={`sm:px-7 ${n % 2 ? "sm:border-l sm:border-line" : "sm:pl-0"} ${
                  n === 2 ? "lg:border-l lg:pl-7" : ""
                } ${n === 0 ? "lg:pl-0" : ""}`}
                {...rise(n * 0.08)}
              >
                <Fig className="h-24 w-auto text-navy-dark" />
                <span className="mt-6 block text-[12.5px] font-semibold tabular-nums text-navy-dark/70">
                  0{n + 1}
                </span>
                <h3 className="mt-2 text-[20px] font-medium leading-snug tracking-[-0.025em] text-navy-dark">
                  {it.t}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-navy-dark/75">{it.d}</p>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

/* ------------------------------ who we work with ------------------------------ */

export const Personas = () => {
  const P = home.personas;
  const [id, setId] = useState(P.items[0].id);
  const it = P.items.find((p) => p.id === id)!;

  return (
    <section className="bg-mist pb-24 lg:pb-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Head eyebrow={P.eyebrow} title={P.h2} center />

        <div
          className="-mx-4 mt-14 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-5 sm:overflow-visible sm:px-0"
          role="tablist"
          aria-label="Who we work with"
        >
          {P.items.map((p) => {
            const on = p.id === id;
            const Fig = FIGS[p.fig];
            return (
              <button
                key={p.id}
                role="tab"
                aria-selected={on}
                onClick={() => setId(p.id)}
                className={`relative w-[150px] flex-none snap-start overflow-hidden rounded-[20px] bg-white px-3 pb-3 pt-4 text-center transition-shadow sm:w-auto ${
                  on ? "ring-2 ring-navy-dark" : "ring-1 ring-line hover:ring-navy-dark/30"
                }`}
              >
                {on && (
                  <motion.span layoutId="persona-glow" className="absolute inset-0" transition={{ duration: 0.4, ease }}>
                    <GrainBlob color={COLOURS.lavender} className="-bottom-24 left-1/2 h-40 w-56 -translate-x-1/2" drift={6} />
                    <GrainBlob color={COLOURS.butter} className="-bottom-28 left-[30%] h-32 w-32" drift={5} />
                  </motion.span>
                )}
                <span className={`relative block text-[13.5px] font-semibold ${on ? "text-navy-dark" : "text-navy-dark/75"}`}>
                  {p.tab}
                </span>
                <Fig className="relative mx-auto mt-3 h-24 w-auto text-navy-dark" />
              </button>
            );
          })}
        </div>

        <div className="mt-4 overflow-hidden rounded-[28px] bg-white ring-1 ring-line">
          <AnimatePresence mode="wait">
            <motion.div
              key={it.id}
              className="grid gap-10 p-7 sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease }}
            >
              <div>
                <h3 className="text-[1.8rem] font-medium leading-[1.1] tracking-[-0.04em] text-navy-dark sm:text-[2.2rem]">
                  {it.title}
                </h3>
                <Link
                  to={it.cta.to}
                  className="group mt-7 inline-flex items-center gap-2 rounded-full px-5 py-3 text-[14px] font-semibold text-navy-dark ring-1 ring-navy-dark/20 transition-shadow hover:ring-navy-dark/50"
                >
                  {it.cta.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
              <ul className="divide-y divide-line">
                {it.points.map(([t, d]) => (
                  <li key={t} className="py-5 first:pt-0 last:pb-0">
                    <p className="text-[18px] font-medium tracking-[-0.02em] text-navy-dark">{t}</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-navy-dark/75">{d}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

/* --------------------------------- founder --------------------------------- */

export const Founder = () => {
  const F = home.founder;
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-8">
        <motion.div className="relative mx-auto w-full max-w-[400px]" {...rise()}>
          <GrainBlob color={COLOURS.orange} className="-left-24 -top-16 h-[300px] w-[300px] opacity-70" duration={20} />
          <GrainBlob color={COLOURS.lavender} className="-bottom-20 -right-20 h-[320px] w-[320px] opacity-80" duration={24} />
          <img
            src={asset(F.photo)}
            alt="Talha Mahmood, founder"
            className="relative aspect-[4/5] w-full rounded-[28px] object-cover ring-1 ring-navy-dark/10"
            loading="lazy"
          />
        </motion.div>

        <motion.div {...rise(0.1)}>
          <Eyebrow className="mb-5">{F.eyebrow}</Eyebrow>
          <Title>
            <Accent parts={F.h2} />
          </Title>
          <div className="mt-8 max-w-xl space-y-5">
            {F.paras.map((p, n) => (
              <p
                key={n}
                className={
                  n === F.paras.length - 1
                    ? "text-[18px] font-medium text-navy-dark"
                    : "text-[16.5px] leading-[1.75] text-navy-dark/75"
                }
              >
                {p}
              </p>
            ))}
          </div>
          <p className="mt-7 font-hand text-[44px] leading-none text-navy-dark">{F.sign}</p>
          <p className="mt-1 text-[13px] text-navy-dark/70">{F.role}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <button
              onClick={openBooking}
              className="group inline-flex items-center gap-2 rounded-full bg-navy-dark px-7 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-black"
            >
              {F.primary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[14.5px] font-semibold text-navy-dark ring-1 ring-navy-dark/15 transition-shadow hover:ring-navy-dark/40"
            >
              <Linkedin className="h-4 w-4" />
              {F.secondary}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
