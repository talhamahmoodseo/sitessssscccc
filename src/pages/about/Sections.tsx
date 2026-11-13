import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  BarChart3,
  Network,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import Accent from "@/components/Accent";
import { DarkGlow, Eyebrow, H2, Soft, ease, rise } from "../services/kit";
import { about as A } from "./content";

const ICON: Record<string, LucideIcon> = {
  network: Network,
  check: ShieldCheck,
  chart: BarChart3,
};

/* -------------------------------- numbers -------------------------------- */

export const Numbers = () => (
  <section className="bg-white py-16 lg:py-20">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
        {A.numbers.map((n, i) => (
          <motion.div
            key={n.l}
            className={`flex flex-col-reverse px-4 text-center ${i ? "lg:border-l lg:border-line" : ""} ${i % 2 ? "border-l border-line lg:border-l" : ""}`}
            {...rise(i * 0.06)}
          >
            <dt className="mt-3 text-[14px] text-navy-dark/75">{n.l}</dt>
            <dd className="text-[2.6rem] font-semibold leading-none tracking-[-0.05em] text-navy-dark sm:text-[3.2rem]">
              {n.v}
            </dd>
          </motion.div>
        ))}
      </dl>
    </div>
  </section>
);

/* ------------------------------ what we focus on ------------------------------ */

export const Focus = () => {
  const F = A.focus;
  return (
    <section className="bg-mist py-24 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
        <motion.div {...rise()}>
          <Eyebrow className="mb-4">{F.eyebrow}</Eyebrow>
          <H2>
            {F.h2a}
            <br />
            <Soft>{F.h2b}</Soft>
          </H2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-navy-dark/75">
            {F.lead}
          </p>
        </motion.div>
        <motion.ul
          className="divide-y divide-line border-y border-line"
          {...rise(0.08)}
        >
          {F.items.map((it) => (
            <li key={it.to}>
              <Link
                to={it.to}
                className="group flex items-center justify-between gap-6 py-6"
              >
                <span>
                  <span className="block text-[1.35rem] font-semibold tracking-[-0.03em] text-navy-dark">
                    {it.t}
                  </span>
                  <span className="mt-1 block text-[15px] text-navy-dark/75">
                    {it.d}
                  </span>
                </span>
                <ArrowUpRight className="h-5 w-5 flex-none text-navy-dark/40 transition-colors group-hover:text-navy-dark" />
              </Link>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

/* ---------------------------- what sets us apart ---------------------------- */

export const Apart = () => (
  <section className="relative overflow-hidden bg-navy-dark py-24 lg:py-32">
    <DarkGlow className="-right-40 -top-20 h-[460px] w-[700px] opacity-50" />
    <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.div className="text-center" {...rise()}>
        <Eyebrow dark className="mb-4">
          {A.apart.eyebrow}
        </Eyebrow>
        <H2 dark>
          {A.apart.h2a} <Accent dark>{A.apart.h2b}</Accent>
        </H2>
      </motion.div>
      <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-0">
        {A.apart.items.map((it, n) => {
          const Icon = ICON[it.icon];
          return (
            <motion.div
              key={it.t}
              className={`md:px-8 ${n ? "md:border-l md:border-white/10" : "md:pl-0"}`}
              {...rise(n * 0.1)}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.08] ring-1 ring-white/15">
                <Icon className="h-5 w-5 text-white" />
              </span>
              <h3 className="mt-6 text-[1.3rem] font-semibold tracking-[-0.025em] text-white">
                {it.t}
              </h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-white/75">
                {it.d}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

/* ---------------------------------- quote ---------------------------------- */

export const Quote = () => (
  <section className="bg-white py-24 lg:py-32">
    <motion.figure
      className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"
      {...rise()}
    >
      <blockquote className="text-[1.8rem] font-medium leading-[1.25] tracking-[-0.035em] text-navy-dark sm:text-[2.4rem] lg:text-[2.7rem]">
        “{A.quote.text}”
      </blockquote>
      <figcaption className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
        <span>
          <span className="block text-[15px] font-semibold text-navy-dark">
            {A.quote.who}
          </span>
          <span className="block text-[13.5px] text-navy-dark/70">
            {A.quote.org}
          </span>
        </span>
      </figcaption>
    </motion.figure>
  </section>
);

/* --------------------------------- explore --------------------------------- */

export const Explore = () => (
  <section className="border-t border-line bg-mist py-20 lg:py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.h2
        className="text-[1.6rem] font-semibold tracking-[-0.03em] text-navy-dark"
        {...rise()}
      >
        {A.explore.h2}
      </motion.h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {A.explore.items.map((e, n) => (
          <motion.div key={e.to} {...rise(n * 0.07)}>
            <Link
              to={e.to}
              className="group flex h-full flex-col rounded-3xl bg-white p-7 ring-1 ring-line transition-all duration-300 hover:-translate-y-0.5 hover:ring-navy-dark/30"
            >
              <span className="text-[19px] font-semibold tracking-[-0.02em] text-navy-dark">
                {e.t}
              </span>
              <span className="mt-2 text-[15px] leading-relaxed text-navy-dark/75">
                {e.d}
              </span>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-7 text-[14px] font-semibold text-navy-dark">
                {e.cta}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
