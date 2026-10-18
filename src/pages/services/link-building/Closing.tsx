import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Check, Mail, Minus } from "lucide-react";
import { openBooking } from "@/lib/booking";
import { ObjectionFaq } from "../sections";
import { linkBuilding as LB } from "../content/linkBuilding";
import { DarkGlow, Eyebrow, H2, Soft, ease, rise } from "../kit";

/* ------------------------------- fit ------------------------------- */

export const Fit = () => {
  const F = LB.fit;
  return (
    <section className="bg-mist py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="mb-12 max-w-3xl" {...rise()}>
          <Eyebrow className="mb-4">{F.eyebrow}</Eyebrow>
          <H2>{F.h2}</H2>
        </motion.div>

        <motion.div
          className="overflow-hidden rounded-3xl bg-white ring-1 ring-line"
          {...rise(0.05)}
        >
          <div className="grid md:grid-cols-2">
            <div className="p-7 sm:p-10">
              <p className="flex items-center gap-2.5 text-[15px] font-semibold text-navy-dark">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-verified/[0.12]">
                  <Check className="h-4 w-4 text-verified" />
                </span>
                A good fit if
              </p>
              <ul className="mt-6 space-y-4">
                {F.good.map((g) => (
                  <li
                    key={g}
                    className="border-b border-line pb-4 text-[15px] leading-relaxed text-navy-dark/80 last:border-0"
                  >
                    {g}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-line bg-linen/60 p-7 sm:p-10 md:border-l md:border-t-0">
              <p className="flex items-center gap-2.5 text-[15px] font-semibold text-navy-dark">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy-dark/[0.08]">
                  <Minus className="h-4 w-4 text-navy-dark" />
                </span>
                Probably not a fit if
              </p>
              <ul className="mt-6 space-y-4">
                {F.bad.map((b) => (
                  <li
                    key={b}
                    className="border-b border-line pb-4 text-[15px] leading-relaxed text-navy-dark/80 last:border-0"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-4 bg-navy-dark px-7 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
            <p className="text-[15px] leading-relaxed text-white/75">
              <span className="font-semibold text-white">{F.agency.t} </span>
              {F.agency.d}
            </p>
            <button
              onClick={openBooking}
              className="inline-flex flex-none items-center gap-1.5 text-[14px] font-semibold text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white"
            >
              Talk white label
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ----------------------------- pricing ----------------------------- */

export const PricingStrip = () => {
  const P = LB.pricing;
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <motion.div {...rise()}>
            <Eyebrow className="mb-4">{P.eyebrow}</Eyebrow>
            <H2>{P.h2}</H2>
            <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-navy-dark/75">
              {P.d}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/pricing"
                className="group inline-flex items-center gap-2 rounded-full bg-navy-dark px-7 py-3.5 text-[14.5px] font-semibold text-white transition-colors duration-300 hover:bg-black"
              >
                See all plans
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <button
                onClick={openBooking}
                className="inline-flex items-center rounded-full bg-white px-7 py-3.5 text-[14.5px] font-semibold text-navy-dark ring-1 ring-navy-dark/15 transition-shadow duration-300 hover:ring-navy-dark/40"
              >
                Get a quote on a call
              </button>
            </div>
          </motion.div>

          <motion.ul
            className="overflow-hidden rounded-3xl ring-1 ring-line"
            {...rise(0.1)}
          >
            {P.plans.map((p, n) => (
              <li key={p.name}>
                <Link
                  to="/pricing"
                  className={`group flex items-center justify-between gap-4 px-5 py-6 sm:gap-6 sm:px-7 transition-colors duration-300 hover:bg-mist ${
                    n ? "border-t border-line" : ""
                  } ${n === 1 ? "bg-butter/60 hover:bg-butter" : ""}`}
                >
                  <span>
                    <span className="flex flex-wrap items-center gap-2 text-[17px] font-semibold text-navy-dark">
                      {p.name}
                      {n === 1 && (
                        <span className="rounded-full bg-navy-dark px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white">
                          Most chosen
                        </span>
                      )}
                    </span>
                    <span className="mt-1 block text-[13.5px] text-navy-dark/70">
                      {p.note}
                    </span>
                  </span>
                  <span className="flex items-baseline gap-1.5 text-right">
                    {n === 2 && (
                      <span className="hidden text-[12px] text-navy-dark/70 sm:inline">
                        from
                      </span>
                    )}
                    <span className="text-[1.9rem] font-semibold leading-none tracking-[-0.04em] text-navy-dark tabular-nums">
                      {p.price}
                    </span>
                    <span className="text-[12px] text-navy-dark/70">/mo</span>
                    <ArrowUpRight className="ml-2 hidden h-4 w-4 self-center text-navy-dark/40 transition-colors duration-300 group-hover:text-navy-dark sm:block" />
                  </span>
                </Link>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------- faq ------------------------------- */

export const Faq = () => {
  const H = LB.faqHead;
  return (
    <section className="bg-mist py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20 lg:px-8">
        <div>
          <motion.div className="lg:sticky lg:top-28" {...rise()}>
            <Eyebrow className="mb-4">{H.eyebrow}</Eyebrow>
            <H2>{H.h2}</H2>
            <div className="mt-8 rounded-3xl bg-white p-6 ring-1 ring-line">
              <p className="text-[14.5px] leading-relaxed text-navy-dark/75">
                {H.side}
              </p>
              <button
                onClick={openBooking}
                className="group mt-5 inline-flex items-center gap-2 rounded-full bg-navy-dark px-5 py-3 text-[13.5px] font-semibold text-white transition-colors duration-300 hover:bg-black"
              >
                Book a 15-minute call
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </div>
          </motion.div>
        </div>
        <motion.div {...rise(0.08)}>
          <ObjectionFaq faqs={LB.faqs} />
        </motion.div>
      </div>
    </section>
  );
};

/* ----------------------------- related ----------------------------- */

export const Related = () => {
  const R = LB.related;
  return (
    <section className="border-t border-line bg-mist pb-24 pt-16 lg:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-[1.4rem] font-semibold tracking-[-0.02em] text-navy-dark">
          {R.h2}
        </h2>
        <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {R.links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="group flex h-full items-center justify-between gap-4 rounded-2xl bg-white p-5 ring-1 ring-line transition-all duration-300 hover:-translate-y-0.5 hover:ring-navy-dark/30 lg:flex-col lg:items-start lg:gap-6"
              >
                <span>
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-dark/70">
                    {l.k}
                  </span>
                  <span className="mt-2 block text-[15px] font-semibold leading-snug text-navy-dark">
                    {l.t}
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 flex-none text-navy-dark/40 transition-colors duration-300 group-hover:text-navy-dark" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

/* ---------------------------- final cta ---------------------------- */

export const FinalCta = () => {
  const F = LB.final;
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-navy-dark py-28 lg:py-40">
      <DarkGlow className="-left-40 top-0 h-[520px] w-[760px] opacity-70" />
      <DarkGlow className="-right-56 bottom-[-10rem] h-[480px] w-[700px] opacity-60" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div {...rise()}>
          <Eyebrow dark className="mb-6">
            {F.eyebrow}
          </Eyebrow>
          <h2 className="text-[2.6rem] font-semibold leading-[1] tracking-[-0.045em] text-white sm:text-[3.6rem] lg:text-[4.4rem]">
            {F.h2a}
            <br />
            <Soft dark>{F.h2b}</Soft>
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-[17px] leading-relaxed text-white/70 sm:text-[18.5px]">
            {F.d}
          </p>
        </motion.div>
        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
        >
          <button
            onClick={openBooking}
            className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-[15px] font-semibold text-navy-dark transition-colors duration-300 hover:bg-mark"
          >
            {F.primary}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
          <a
            href={`mailto:${F.email}?subject=${encodeURIComponent("Link building enquiry")}`}
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-[15px] font-semibold text-white ring-1 ring-white/25 transition-shadow duration-300 hover:ring-white/60"
          >
            <Mail className="h-4 w-4" />
            {F.secondary}
          </a>
        </motion.div>
      </div>
    </section>
  );
};
