import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Check, Lock, X } from "lucide-react";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";
import { casesFor } from "@/lib/cases";
import { PER_LINK } from "@/lib/pricing";
import { ClientWork } from "../results/CaseParts";
import { CARD, Eyebrow, GlowPanel, H2, Soft, ease, rise } from "./kit";
import {
  FitPrice,
  HeroButtons,
  HeroChip,
  PairsWith,
  ServiceClose,
  ServiceFaq,
} from "./common";
import { STANDARDS, type Offer, type OfferVisual } from "./content/offers";

/**
 * One template for the link building offer pages (guest posting, niche edits,
 * white label link building). Each page brings its own copy, keywords and
 * hero visual from content/offers.ts.
 *
 * Story: what you get → what's included → how it works → where the links go
 * (the site check, with a real rejected site) → which kind of link → client
 * work → fit and price → questions → related pages → the ask.
 */

/* ------------------------------ hero visuals ------------------------------ */

const ArticleVisual = ({ v }: { v: Extract<OfferVisual, { kind: "article" }> }) => (
  <div className={`${CARD} overflow-hidden text-left`}>
    <div className="flex items-center gap-2 border-b border-line px-4 py-3">
      <span className="flex gap-1.5" aria-hidden="true">
        {[0, 1, 2].map((n) => (
          <span key={n} className="h-2.5 w-2.5 rounded-full bg-navy-dark/[0.12]" />
        ))}
      </span>
      <span className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-linen px-3.5 py-1 font-mono text-[11px] text-navy-dark/75">
        <Lock className="h-2.5 w-2.5" />
        {v.site}
      </span>
      <span className="w-10" />
    </div>
    <div className="px-6 pb-8 pt-6 sm:px-9">
      <span className="inline-flex rounded-full bg-navy-dark/[0.06] px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.1em] text-navy-dark/75">
        {v.tag}
      </span>
      <p className="mt-4 text-[20px] font-semibold leading-snug tracking-[-0.02em] text-navy-dark sm:text-[22px]">
        {v.title}
      </p>
      <div className="mt-5 space-y-2" aria-hidden="true">
        <span className="block h-2 w-full rounded-full bg-navy-dark/[0.06]" />
        <span className="block h-2 w-[86%] rounded-full bg-navy-dark/[0.06]" />
      </div>
      <p className="mt-5 text-[15px] leading-[1.75] text-navy-dark/80">
        {v.before}
        <span
          className="font-semibold text-navy-dark underline decoration-navy-dark/40 decoration-2 underline-offset-4"
          style={{
            backgroundImage:
              "linear-gradient(rgb(var(--mark) / 0.75), rgb(var(--mark) / 0.75))",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "0 85%",
            backgroundSize: "100% 100%",
          }}
        >
          {v.link}
        </span>
        {v.after}
      </p>
      <div className="mt-5 space-y-2" aria-hidden="true">
        <span className="block h-2 w-[88%] rounded-full bg-navy-dark/[0.06]" />
        <span className="block h-2 w-[60%] rounded-full bg-navy-dark/[0.06]" />
      </div>
      <p className="mt-6 flex items-center gap-2 font-hand text-[22px] leading-none text-navy-dark/80">
        <svg width="34" height="22" viewBox="0 0 34 22" fill="none" aria-hidden="true">
          <path d="M2 18 C 10 18, 20 14, 28 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M22 5 L 28.5 4.5 L 27 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {v.note}
      </p>
    </div>
  </div>
);

const ReportVisual = ({ v }: { v: Extract<OfferVisual, { kind: "report" }> }) => (
  <div className={`${CARD} overflow-hidden text-left`}>
    <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 sm:px-7">
      <p className="text-[14px] font-semibold text-navy-dark">{v.title}</p>
      <span className="rounded-lg border border-dashed border-navy-dark/30 px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.12em] text-navy-dark/60">
        Your logo
      </span>
    </div>
    <div className="px-5 py-2 sm:px-7">
      <div className="grid grid-cols-[1fr_auto_auto] gap-3 border-b border-line py-2.5 text-[10.5px] font-bold uppercase tracking-[0.12em] text-navy-dark/55 sm:grid-cols-[1.2fr_0.5fr_1fr_0.9fr]">
        <span>Site</span>
        <span>DR</span>
        <span className="hidden sm:block">Anchor</span>
        <span className="text-right">Status</span>
      </div>
      {v.rows.map((r) => (
        <div
          key={r.site}
          className="grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b border-line py-3 text-[13px] last:border-0 sm:grid-cols-[1.2fr_0.5fr_1fr_0.9fr]"
        >
          <span className="truncate font-mono text-[12px] text-navy-dark/80">{r.site}</span>
          <span className="font-semibold tabular-nums text-navy-dark">{r.dr}</span>
          <span className="hidden truncate text-navy-dark/75 sm:block">{r.anchor}</span>
          <span
            className={`justify-self-end rounded-full px-2.5 py-1 text-[11px] font-semibold ${
              r.status.startsWith("Live")
                ? "bg-verified/[0.12] text-verified"
                : "bg-navy-dark/[0.06] text-navy-dark/70"
            }`}
          >
            {r.status}
          </span>
        </div>
      ))}
    </div>
    <p className="flex items-center gap-2 border-t border-line px-5 py-4 font-hand text-[22px] leading-none text-navy-dark/80 sm:px-7">
      <svg width="34" height="22" viewBox="0 0 34 22" fill="none" aria-hidden="true">
        <path d="M2 18 C 10 18, 20 14, 28 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M22 5 L 28.5 4.5 L 27 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {v.note}
    </p>
  </div>
);

/* --------------------------------- hero --------------------------------- */

const Hero = ({ o }: { o: Offer }) => {
  const H = o.hero;
  return (
    <section className="relative overflow-hidden bg-mist pb-16 pt-28 lg:pb-24 lg:pt-36">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h1>
          <HeroChip>{H.eyebrow}</HeroChip>
          <motion.span
            className="block text-[2.5rem] font-semibold leading-[0.98] tracking-[-0.045em] text-navy-dark sm:text-[3.6rem] lg:text-[4.3rem]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease }}
          >
            {H.h1a}
          </motion.span>
          <motion.span
            className="mt-1 block pb-[0.06em] text-[2.5rem] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-[3.6rem] lg:text-[4.3rem]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.14, ease }}
          >
            <span className="accent-ink">{H.h1b}</span>
          </motion.span>
        </h1>
        <motion.p
          className="mx-auto mt-7 max-w-2xl text-[17px] leading-relaxed text-navy-dark/75 sm:text-[18px]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
        >
          {H.lead}
        </motion.p>
        <HeroButtons primary={H.primary} className="justify-center" />
        <motion.p
          className="mt-7 text-[13px] text-navy-dark/75"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {H.proof}
        </motion.p>
      </div>

      <div className="relative mx-auto mt-14 max-w-2xl px-4 lg:mt-16">
        <div
          className="pointer-events-none absolute -right-10 top-0 h-[300px] w-[420px] max-w-full rounded-full bg-mint/60 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-10 top-16 h-[260px] w-[360px] max-w-full rounded-full bg-blush/50 blur-3xl"
          aria-hidden="true"
        />
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
        >
          {H.visual.kind === "article" ? (
            <ArticleVisual v={H.visual} />
          ) : (
            <ReportVisual v={H.visual} />
          )}
        </motion.div>
      </div>
    </section>
  );
};

/* ------------------------------- included ------------------------------- */

const Included = ({ o }: { o: Offer }) => {
  const I = o.included;
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="mb-12 max-w-3xl" {...rise()}>
          <Eyebrow className="mb-4">{I.eyebrow}</Eyebrow>
          <H2>
            {I.h2a}
            <br />
            <Soft>{I.h2b}</Soft>
          </H2>
          <p className="mt-6 text-[17px] leading-relaxed text-navy-dark/75">{I.lead}</p>
        </motion.div>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {I.items.map((it, n) => (
            <motion.li
              key={it.t}
              className="rounded-3xl bg-mist p-7 ring-1 ring-line"
              {...rise(0.04 * n)}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-dark text-white">
                <Check className="h-4 w-4" />
              </span>
              <h3 className="mt-5 text-[18px] font-semibold tracking-[-0.01em] text-navy-dark">
                {it.t}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-navy-dark/75">{it.d}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

/* -------------------------------- process -------------------------------- */

const Process = ({ o }: { o: Offer }) => {
  const P = o.process;
  return (
    <section className="bg-mist py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="mb-12 max-w-3xl" {...rise()}>
          <Eyebrow className="mb-4">{P.eyebrow}</Eyebrow>
          <H2>
            {P.h2a}
            <br />
            <Soft>{P.h2b}</Soft>
          </H2>
          <p className="mt-6 text-[17px] leading-relaxed text-navy-dark/75">{P.lead}</p>
        </motion.div>
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {P.steps.map((s, n) => (
            <motion.li
              key={s.t}
              className="flex flex-col rounded-3xl bg-white p-6 ring-1 ring-line"
              {...rise(0.05 * n)}
            >
              <span className="font-mono text-[12px] font-semibold text-navy-dark/55">
                {String(n + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-[18px] font-semibold tracking-[-0.01em] text-navy-dark">
                {s.t}
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-navy-dark/75">{s.d}</p>
            </motion.li>
          ))}
        </ol>
        <motion.p
          className="mt-8 text-[15px] font-semibold text-navy-dark"
          {...rise(0.1)}
        >
          {P.note}
        </motion.p>
      </div>
    </section>
  );
};

/* ---------------------- where the links go (site check) --------------------- */

const Standards = ({ o }: { o: Offer }) => {
  const S = o.standards;
  const E = STANDARDS.example;
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="max-w-3xl" {...rise()}>
          <Eyebrow className="mb-4">{S.eyebrow}</Eyebrow>
          <H2>
            {S.h2a}
            <br />
            <Soft>{S.h2b}</Soft>
          </H2>
        </motion.div>
      </div>
      <div className="mx-auto mt-10 grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-8">
        <motion.div {...rise(0.05)}>
          <p className="text-[17px] leading-relaxed text-navy-dark/75">
            {STANDARDS.lead}
          </p>
          <ol className="mt-8 border-t border-line">
            {STANDARDS.checks.map((c, n) => (
              <li
                key={c}
                className="flex items-baseline gap-4 border-b border-line py-3 text-[15px] text-navy-dark/85"
              >
                <span className="w-6 flex-none font-mono text-[12px] font-semibold text-navy-dark/50">
                  {String(n + 1).padStart(2, "0")}
                </span>
                {c}
              </li>
            ))}
          </ol>
          <Link
            to={STANDARDS.moreTo}
            className="group mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-navy-dark underline decoration-navy-dark/30 underline-offset-4 hover:decoration-navy-dark"
          >
            {STANDARDS.more}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        <motion.div {...rise(0.1)}>
          <GlowPanel tone="cool" className="p-5 sm:p-10">
            <div className={`${CARD} p-6 sm:p-8`}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-dark/60">
                {E.k}
              </p>
              <p className="mt-3 font-mono text-[17px] font-semibold text-navy-dark">
                {E.domain}
              </p>
              <dl className="mt-6 border-t border-line">
                {E.facts.map((f) => (
                  <div
                    key={f.k}
                    className="flex items-baseline justify-between gap-6 border-b border-line py-3.5"
                  >
                    <dt className="text-[13.5px] text-navy-dark/70">{f.k}</dt>
                    <dd
                      className={`text-right text-[14.5px] font-semibold ${
                        f.bad ? "text-gap" : "text-navy-dark"
                      }`}
                    >
                      {f.v}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 flex items-center gap-2.5 text-[15px] font-semibold text-navy-dark">
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-navy-dark text-white">
                  <X className="h-4 w-4" />
                </span>
                {E.verdict}
              </p>
            </div>
          </GlowPanel>
        </motion.div>
      </div>
    </section>
  );
};

/* -------------------------------- compare -------------------------------- */

const Compare = ({ o }: { o: Offer }) => {
  const C = o.compare;
  const cell = (i: 0 | 1) =>
    i === C.ours ? "bg-mark/25 font-semibold text-navy-dark" : "text-navy-dark/80";
  return (
    <section className="bg-mist py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="mb-12 max-w-3xl" {...rise()}>
          <Eyebrow className="mb-4">{C.eyebrow}</Eyebrow>
          <H2>
            {C.h2a}
            <br />
            <Soft>{C.h2b}</Soft>
          </H2>
          <p className="mt-6 text-[17px] leading-relaxed text-navy-dark/75">{C.lead}</p>
        </motion.div>
        <motion.div
          className="overflow-hidden rounded-3xl bg-white ring-1 ring-line"
          {...rise(0.08)}
        >
          <div className="grid grid-cols-2 border-b border-line md:grid-cols-[0.6fr_1fr_1fr]">
            <span className="hidden md:block" />
            {C.cols.map((c, i) => (
              <p
                key={c}
                className={`px-4 py-5 text-[15px] font-semibold text-navy-dark sm:px-6 ${
                  i === C.ours ? "bg-mark/25" : ""
                }`}
              >
                {c}
              </p>
            ))}
          </div>
          {C.rows.map((r) => (
            <div
              key={r.k}
              className="grid grid-cols-2 border-b border-line last:border-0 md:grid-cols-[0.6fr_1fr_1fr]"
            >
              <p className="col-span-2 px-4 pt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-dark/60 sm:px-6 md:col-span-1 md:py-5 md:text-[13px] md:normal-case md:tracking-normal md:text-navy-dark/70">
                {r.k}
              </p>
              <p className={`px-4 py-4 text-[14.5px] leading-snug sm:px-6 md:py-5 ${cell(0)}`}>
                {r.a}
              </p>
              <p className={`px-4 py-4 text-[14.5px] leading-snug sm:px-6 md:py-5 ${cell(1)}`}>
                {r.b}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* --------------------------------- page --------------------------------- */

const OfferPage = ({ o, tint }: { o: Offer; tint: string }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: o.schema.name,
    serviceType: o.schema.serviceType,
    description: o.seo.description,
    provider: { "@type": "Organization", name: "Editorial HQ" },
    areaServed: "Worldwide",
    offers: {
      "@type": "Offer",
      price: String(PER_LINK),
      priceCurrency: "USD",
      description: o.schema.offer,
    },
  };
  return (
    <PageLayout cta={false}>
      <Seo title={o.seo.title} description={o.seo.description} schema={schema} />
      <Hero o={o} />
      <Included o={o} />
      <Process o={o} />
      <Standards o={o} />
      <Compare o={o} />
      <ClientWork
        cases={casesFor(o.cases.tag)}
        eyebrow="Client work"
        title={o.cases.title}
        soft={o.cases.soft}
      />
      <FitPrice c={o.fit} tint={tint} />
      <ServiceFaq
        eyebrow={o.faqHead.eyebrow}
        h2a={o.faqHead.h2a}
        h2b={o.faqHead.h2b}
        side={o.faqHead.side}
        faqs={o.faqs}
      />
      <PairsWith h2={o.pairs.h2} items={o.pairs.items} />
      <ServiceClose {...o.close} />
    </PageLayout>
  );
};

export default OfferPage;
