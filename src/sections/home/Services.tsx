import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { home } from "./content";
import { CARD, COLOURS, GrainBlob, Head, rise } from "./kit";

const SV = home.services;

const TAG_DOT: Record<string, string> = {
  Found: "bg-butter",
  Mentioned: "bg-mint",
  Recommended: "bg-lilac",
  "Found + mentioned": "bg-butter",
};

const Highlight = ({ children }: { children: ReactNode }) => (
  <span
    className="font-semibold text-navy-dark underline decoration-navy-dark/40 decoration-2 underline-offset-[3px]"
    style={{ background: "linear-gradient(transparent 55%, rgb(var(--mark) / 0.7) 55%)" }}
  >
    {children}
  </span>
);

/** A real placement, so the core service is shown rather than described. */
const Placement = () => (
  <div className={`${CARD} overflow-hidden`}>
    <div className="flex items-center justify-between border-b border-line px-6 py-3.5">
      <span className="text-[16px] font-bold tracking-[-0.03em] text-navy-dark">growth•••weekly</span>
      <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-navy-dark/70">SaaS</span>
    </div>
    <div className="px-6 py-5">
      <p className="text-[19px] font-semibold leading-snug tracking-[-0.02em] text-navy-dark">
        How small SaaS teams are rethinking their sales pipeline
      </p>
      <div className="mt-4 space-y-1.5" aria-hidden="true">
        <span className="block h-[7px] w-full rounded-full bg-navy-dark/[0.06]" />
        <span className="block h-[7px] w-[84%] rounded-full bg-navy-dark/[0.06]" />
      </div>
      <p className="mt-4 text-[14px] leading-[1.7] text-navy-dark/80">
        Most early-stage teams start with a spreadsheet, and that works until the third
        salesperson joins. At that point, <Highlight>a simple CRM built for small teams</Highlight>{" "}
        saves more time than any new hire.
      </p>
    </div>
    <div className="flex flex-wrap items-center gap-2 border-t border-line bg-mist/60 px-6 py-3 text-[11.5px] font-semibold text-navy-dark">
      <span className="rounded-full bg-white px-2.5 py-1 ring-1 ring-line">Guest post</span>
      <span className="rounded-full bg-white px-2.5 py-1 ring-1 ring-line">DR 62</span>
      <span className="rounded-full bg-white px-2.5 py-1 ring-1 ring-line">18.6K organic / mo</span>
      <span className="ml-auto inline-flex items-center gap-1 text-verified">
        <Check className="h-3.5 w-3.5" /> Indexed
      </span>
    </div>
  </div>
);

const Services = () => {
  const F = SV.featured;
  return (
    <section className="bg-mist py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Head eyebrow={SV.eyebrow} title={SV.h2} lead={SV.lead} />

        {/* the core service, shown large */}
        <motion.div
          className="mt-14 overflow-hidden rounded-[32px] bg-white ring-1 ring-line lg:mt-16"
          {...rise()}
        >
          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
            <div className="flex flex-col p-7 sm:p-10 lg:p-14">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-navy-dark px-3 py-1.5 text-[11.5px] font-semibold text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-mark" />
                {F.label}
              </span>
              <h3 className="mt-6 text-[2.4rem] font-medium leading-none tracking-[-0.05em] text-navy-dark sm:text-[3rem]">
                {F.name}
              </h3>
              <p className="mt-5 max-w-md text-[16.5px] leading-relaxed text-navy-dark/75">{F.line}</p>
              <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
                {F.facts.map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[12px] text-navy-dark/70">{k}</dt>
                    <dd className="mt-1 text-[15px] font-semibold leading-snug text-navy-dark">{v}</dd>
                  </div>
                ))}
              </dl>
              <Link
                to={F.to}
                className="group mt-9 inline-flex w-fit items-center gap-2 rounded-full bg-navy-dark px-7 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-black lg:mt-auto"
              >
                {F.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="relative overflow-hidden bg-[#EFEBE6] p-5 sm:p-10 lg:p-12">
              <GrainBlob color={COLOURS.peach} className="-right-24 -top-28 h-[360px] w-[400px] opacity-80" duration={20} />
              <GrainBlob color={COLOURS.lavender} className="-bottom-32 -left-24 h-[340px] w-[400px] opacity-80" duration={24} />
              <div className="relative flex h-full items-center">
                <Placement />
              </div>
            </div>
          </div>
        </motion.div>

        {/* everything that amplifies it */}
        <ul className="mt-4 grid gap-4 md:grid-cols-3">
          {SV.more.map((s, n) => (
            <motion.li key={s.name} {...rise(0.08 + n * 0.08)}>
              <Link
                to={s.to}
                className="group flex h-full flex-col rounded-[24px] bg-white p-7 ring-1 ring-line transition-all duration-300 hover:-translate-y-0.5 hover:ring-navy-dark/25"
              >
                <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-navy-dark/70">
                  <span className={`h-2 w-2 rounded-full ${TAG_DOT[s.tag]}`} />
                  {s.tag}
                </span>
                <span className="mt-4 text-[1.5rem] font-medium leading-tight tracking-[-0.04em] text-navy-dark">
                  {s.name}
                </span>
                <span className="mt-3 text-[15px] leading-relaxed text-navy-dark/75">{s.line}</span>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[13.5px] font-semibold text-navy-dark">
                  Learn more
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Services;
