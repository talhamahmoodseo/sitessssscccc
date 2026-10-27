import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FigNetwork, FigTrendline } from "@/components/LineArt";
import { CASES } from "@/lib/cases";
import { LogoChip } from "@/pages/results/CaseParts";

/** Homepage case studies: the three projects with the strongest numbers. */
const ROWS = ["smiletutor", "cryptodesk", "ocuco"]
  .map((s) => CASES.find((c) => c.slug === s)!)
  .filter(Boolean);

const Results = () => (
  <div className="bg-white py-24 lg:py-32">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="relative mb-14 flex items-end justify-center">
        <div className="absolute bottom-1 left-4 hidden text-navy-dark/70 lg:block">
          <span className="block font-hand text-[23px] leading-tight">
            real campaigns,
            <br />
            real numbers
          </span>
          <FigTrendline className="-mt-1 ml-10 h-14 w-24" />
        </div>
        <motion.h2
          className="text-center text-[2rem] font-semibold leading-[1.06] tracking-[-0.035em] text-navy-dark sm:text-[2.6rem]"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          The work, and what
          <br />
          {"it "}
          <span className="accent-ink">actually did</span>
        </motion.h2>
      </div>
      <div className="space-y-5">
        {ROWS.map((c, a) => {
          const [lead, ...rest] = c.headline;
          return (
            <motion.article
              key={c.slug}
              className="group grid gap-0 overflow-hidden rounded-3xl border border-line bg-white transition-shadow duration-500 hover:shadow-lift lg:grid-cols-[0.9fr_1.1fr]"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: a * 0.08 }}
            >
              <div
                className={`${c.tint} flex min-h-[240px] flex-col justify-between gap-8 p-8 sm:p-10`}
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-dark/70">
                    {c.sector}
                    {" · "}
                    {c.market}
                  </p>
                  <LogoChip c={c} size="sm" />
                </div>
                <div>
                  <p className="text-[4rem] font-semibold leading-[0.95] tracking-[-0.04em] text-navy-dark sm:text-[4.6rem]">
                    {lead.v}
                  </p>
                  <p className="mt-2 max-w-xs text-[14px] text-navy-dark/75">
                    {lead.l}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-between p-8 sm:p-10">
                <div>
                  <p className="mb-2 text-[13px] font-semibold text-navy-dark/70">
                    {c.client}
                  </p>
                  <h3 className="mb-3 text-[1.5rem] font-semibold leading-[1.15] tracking-[-0.02em] text-navy-dark sm:text-[1.75rem]">
                    {c.card}
                  </h3>
                  <p className="max-w-md text-[14.5px] leading-relaxed text-navy-dark/75">
                    {c.summary}
                  </p>
                </div>
                <div className="mt-7 flex flex-wrap items-end gap-x-8 gap-y-4 border-t border-line pt-6">
                  {rest.slice(0, 2).map((h) => (
                    <span key={h.l} className="max-w-[11rem]">
                      <span className="block text-[19px] font-semibold leading-none text-navy-dark">
                        {h.v}
                      </span>
                      <span className="mt-1.5 block text-[11.5px] leading-snug text-navy-dark/70">
                        {h.l}
                      </span>
                    </span>
                  ))}
                  <Link
                    to={`/case-studies/${c.slug}`}
                    className="ml-auto inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-navy-dark transition-all duration-300 group-hover:gap-2.5"
                  >
                    Open the case file
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
      <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
        <div className="hidden text-navy-dark/70 sm:block">
          <FigNetwork className="h-auto w-24" />
        </div>
        <Link
          to="/case-studies"
          className="inline-flex items-center gap-2 rounded-xl bg-navy-dark px-7 py-3.5 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-black"
        >
          See all six case studies
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  </div>
);

export default Results;
