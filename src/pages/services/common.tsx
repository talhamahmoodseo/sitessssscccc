import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Mail,
  Minus,
  Plus,
} from "lucide-react";
import { openBooking } from "@/lib/booking";
import { DarkGlow, Eyebrow, H2, Soft, ease, rise } from "./kit";

/**
 * Utility sections shared by the Digital PR, Brand Mentions and Expert Quotes
 * pages. These are the parts a visitor should find in the same place on every
 * service page (fit and price, questions, related services, the closing ask).
 * The copy is always the page's own; only the layout is shared.
 */

export const EMAIL = "contact@editorialhq.com";

/* ---------------------------- fit + price ---------------------------- */

export type FitPriceContent = {
  eyebrow: string;
  h2a: string;
  h2b: string;
  good: string[];
  bad: string[];
  price: {
    label: string;
    from: string;
    unit: string;
    plan: string;
    note: string;
    points: string[];
  };
};

export const FitPrice = ({
  c,
  tint,
  bg = "bg-mist",
}: {
  c: FitPriceContent;
  /** pastel used on the price card, e.g. "bg-mint" */
  tint: string;
  bg?: string;
}) => (
  <section className={`${bg} py-24 lg:py-32`}>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div className="mb-12 max-w-3xl" {...rise()}>
        <Eyebrow className="mb-4">{c.eyebrow}</Eyebrow>
        <H2>
          {c.h2a}
          <br />
          <Soft>{c.h2b}</Soft>
        </H2>
      </motion.div>

      <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
        <motion.div
          className="grid overflow-hidden rounded-3xl bg-white ring-1 ring-line md:grid-cols-2"
          {...rise(0.05)}
        >
          <div className="p-7 sm:p-9">
            <p className="flex items-center gap-2.5 text-[15px] font-semibold text-navy-dark">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-verified/[0.12]">
                <Check className="h-4 w-4 text-verified" />
              </span>
              A good fit if
            </p>
            <ul className="mt-6 space-y-4">
              {c.good.map((g) => (
                <li
                  key={g}
                  className="border-b border-line pb-4 text-[15px] leading-relaxed text-navy-dark/80 last:border-0 last:pb-0"
                >
                  {g}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-line bg-linen/60 p-7 sm:p-9 md:border-l md:border-t-0">
            <p className="flex items-center gap-2.5 text-[15px] font-semibold text-navy-dark">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy-dark/[0.08]">
                <Minus className="h-4 w-4 text-navy-dark" />
              </span>
              Probably not if
            </p>
            <ul className="mt-6 space-y-4">
              {c.bad.map((b) => (
                <li
                  key={b}
                  className="border-b border-line pb-4 text-[15px] leading-relaxed text-navy-dark/80 last:border-0 last:pb-0"
                >
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          className={`relative flex flex-col overflow-hidden rounded-3xl ${tint} p-7 sm:p-9`}
          {...rise(0.12)}
        >
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-navy-dark/75">
            {c.price.label}
          </p>
          <p className="mt-5 flex items-baseline gap-2">
            <span className="text-[13px] text-navy-dark/75">from</span>
            <span className="text-[3.2rem] font-semibold leading-none tracking-[-0.045em] text-navy-dark tabular-nums">
              {c.price.from}
            </span>
            <span className="text-[14px] text-navy-dark/75">
              {c.price.unit}
            </span>
          </p>
          <p className="mt-2 text-[14px] font-semibold text-navy-dark">
            {c.price.plan}
          </p>
          <ul className="mt-6 space-y-2.5">
            {c.price.points.map((p) => (
              <li
                key={p}
                className="flex gap-2.5 text-[14.5px] leading-snug text-navy-dark/85"
              >
                <Check className="mt-0.5 h-4 w-4 flex-none text-navy-dark" />
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[13.5px] leading-relaxed text-navy-dark/75">
            {c.price.note}
          </p>
          <div className="mt-auto flex flex-wrap gap-2.5 pt-8">
            <Link
              to="/pricing"
              className="group inline-flex items-center gap-2 rounded-full bg-navy-dark px-6 py-3 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-black"
            >
              See all plans
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <button
              onClick={openBooking}
              className="inline-flex items-center rounded-full bg-white/70 px-6 py-3 text-[14px] font-semibold text-navy-dark ring-1 ring-navy-dark/15 transition-colors duration-300 hover:bg-white"
            >
              Get a quote
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

/* -------------------------------- faq -------------------------------- */

const FaqItem = ({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) => (
  <div className="border-b border-line">
    <h3>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full items-start gap-5 py-6 text-left"
      >
        <span className="flex-1 text-[17px] font-semibold leading-snug text-navy-dark">
          {q}
        </span>
        <motion.span
          className={`flex h-8 w-8 flex-none items-center justify-center rounded-full ring-1 transition-colors duration-300 ${
            open
              ? "bg-navy-dark text-white ring-navy-dark"
              : "text-navy-dark ring-navy-dark/20 group-hover:ring-navy-dark/50"
          }`}
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Plus className="h-4 w-4" />
        </motion.span>
      </button>
    </h3>
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          className="overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease }}
        >
          <p className="max-w-2xl pb-7 pr-2 text-[15.5px] leading-[1.75] text-navy-dark/75 sm:pr-12">
            {a}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export const ServiceFaq = ({
  eyebrow,
  h2a,
  h2b,
  side,
  faqs,
  bg = "bg-white",
}: {
  eyebrow: string;
  h2a: string;
  h2b: string;
  side: string;
  faqs: { q: string; a: string }[];
  bg?: string;
}) => {
  const [open, setOpen] = useState(0);
  return (
    <section className={`${bg} py-24 lg:py-32`}>
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20 lg:px-8">
        <div>
          <motion.div className="lg:sticky lg:top-28" {...rise()}>
            <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
            <h2 className="text-[2.1rem] font-semibold leading-[1.04] tracking-[-0.04em] text-navy-dark sm:text-[2.6rem]">
              {h2a}
              <br />
              <Soft>{h2b}</Soft>
            </h2>
            <div
              className={`mt-8 rounded-3xl ${bg === "bg-mist" ? "bg-white" : "bg-mist"} p-6 ring-1 ring-line`}
            >
              <p className="text-[16px] font-semibold text-navy-dark">
                Still not sure?
              </p>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-navy-dark/75">
                {side}
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <button
                  onClick={openBooking}
                  className="group inline-flex items-center gap-2 rounded-full bg-navy-dark px-5 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-black"
                >
                  Book a 30-minute call
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13.5px] font-semibold text-navy-dark ring-1 ring-navy-dark/20 transition-shadow hover:ring-navy-dark/50"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Email us
                </a>
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div className="border-t border-line" {...rise(0.08)}>
          {faqs.map((f, n) => (
            <FaqItem
              key={f.q}
              q={f.q}
              a={f.a}
              open={open === n}
              onToggle={() => setOpen(open === n ? -1 : n)}
            />
          ))}
        </motion.div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </section>
  );
};

/* ---------------------------- pairs well with ---------------------------- */

export const PairsWith = ({
  h2,
  items,
  bg = "bg-mist",
}: {
  h2: string;
  items: { to: string; t: string; d: string }[];
  bg?: string;
}) => (
  <section className={`border-t border-line ${bg} pb-24 pt-16 lg:pb-28`}>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-[1.4rem] font-semibold tracking-[-0.02em] text-navy-dark">
        {h2}
      </h2>
      <ul className="mt-7 grid gap-3 md:grid-cols-3">
        {items.map((l) => (
          <li key={l.to}>
            <Link
              to={l.to}
              className={`group flex h-full flex-col justify-between gap-6 rounded-2xl ${bg === "bg-white" ? "bg-mist" : "bg-white"} p-6 ring-1 ring-line transition-all duration-300 hover:-translate-y-0.5 hover:ring-navy-dark/30`}
            >
              <span>
                <span className="flex items-center justify-between text-[16px] font-semibold text-navy-dark">
                  {l.t}
                  <ArrowUpRight className="h-4 w-4 flex-none text-navy-dark/40 transition-colors duration-300 group-hover:text-navy-dark" />
                </span>
                <span className="mt-2 block text-[14px] leading-relaxed text-navy-dark/75">
                  {l.d}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

/* ------------------------------- the close ------------------------------- */

export const ServiceClose = ({
  eyebrow,
  h2a,
  h2b,
  d,
  primary,
  subject,
  children,
}: {
  eyebrow: string;
  h2a: string;
  h2b: string;
  d: string;
  primary: string;
  subject: string;
  /** replaces the default buttons, e.g. with a small form */
  children?: ReactNode;
}) => (
  <section className="relative overflow-hidden border-b border-white/10 bg-navy-dark py-28 lg:py-40">
    <DarkGlow className="-left-40 top-0 h-[520px] w-[760px] opacity-70" />
    <DarkGlow className="-right-56 bottom-[-10rem] h-[480px] w-[700px] opacity-60" />
    <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
      <motion.div {...rise()}>
        <Eyebrow dark className="mb-6">
          {eyebrow}
        </Eyebrow>
        <h2 className="text-[2.5rem] font-semibold leading-[1] tracking-[-0.045em] text-white sm:text-[3.6rem] lg:text-[4.4rem]">
          {h2a}
          <br />
          <Soft dark>{h2b}</Soft>
        </h2>
        <p className="mx-auto mt-7 max-w-2xl text-[17px] leading-relaxed text-white/75 sm:text-[18.5px]">
          {d}
        </p>
      </motion.div>
      <motion.div
        className="mt-10"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15, ease }}
      >
        {children ?? (
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={openBooking}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-[15px] font-semibold text-navy-dark transition-colors duration-300 hover:bg-mark"
            >
              {primary}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
            <a
              href={`mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`}
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-[15px] font-semibold text-white ring-1 ring-white/25 transition-shadow duration-300 hover:ring-white/60"
            >
              <Mail className="h-4 w-4" />
              Email us instead
            </a>
          </div>
        )}
      </motion.div>
    </div>
  </section>
);

/* --------------------------- small shared bits --------------------------- */

/** The hero's pill eyebrow, same on every service page. */
export const HeroChip = ({ children }: { children: ReactNode }) => (
  <motion.span
    className="mb-7 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[12.5px] font-semibold text-navy-dark ring-1 ring-line"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <span className="h-1.5 w-1.5 rounded-full bg-mark-deep" />
    {children}
  </motion.span>
);

/** Hero buttons: book a call, or go to pricing. */
export const HeroButtons = ({
  primary,
  className = "",
}: {
  primary: string;
  className?: string;
}) => (
  <motion.div
    className={`mt-9 flex flex-wrap items-center gap-3 ${className}`}
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.35, ease }}
  >
    <button
      onClick={openBooking}
      className="group inline-flex items-center gap-2 rounded-full bg-navy-dark px-7 py-3.5 text-[14.5px] font-semibold text-white transition-colors duration-300 hover:bg-black"
    >
      {primary}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
    </button>
    <Link
      to="/pricing"
      className="inline-flex items-center rounded-full bg-white px-7 py-3.5 text-[14.5px] font-semibold text-navy-dark ring-1 ring-navy-dark/15 transition-shadow duration-300 hover:ring-navy-dark/40"
    >
      See starting prices
    </Link>
  </motion.div>
);
