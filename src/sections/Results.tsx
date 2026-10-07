import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FigNetwork, FigTrendline } from "@/components/LineArt";
import { CASE_STUDIES } from "@/lib/content";

/**
 * The page's one amber moment. DESIGN.md allows a single saturated band per
 * page, spent on the figure most worth remembering — here, the indexation
 * rate, because it is the number that decides whether anything else counted.
 */
const IndexationBand = () => (
  <div className="bg-mark py-16 lg:py-20">
    <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[auto_1fr] lg:gap-16 lg:px-8">
      <motion.p
        className="text-[5.5rem] font-semibold leading-[0.82] tracking-[-0.05em] text-navy-dark tabular-nums sm:text-[7rem]"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
      >
        96%
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-navy-dark/75">
          Last twelve months
        </p>
        <p className="mt-3 max-w-xl text-[19px] font-semibold leading-snug tracking-[-0.015em] text-navy-dark sm:text-[21px]">
          of placements were indexed by Google. The ones that were not, we went
          back to the publisher for — or replaced.
        </p>
        <dl className="mt-7 flex flex-wrap gap-x-12 gap-y-5 border-t border-navy-dark/20 pt-6">
          {[
            ["19 days", "median time to index"],
            ["90 days", "replacement window"],
            ["1 in 5", "sourced sites rejected at vetting"],
          ].map(([v, k]) => (
            <div key={k}>
              <dt className="text-[1.4rem] font-semibold leading-none tracking-[-0.02em] text-navy-dark tabular-nums">
                {v}
              </dt>
              <dd className="mt-1.5 max-w-[11rem] text-[12px] leading-snug text-navy-dark/75">
                {k}
              </dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </div>
  </div>
);

const Results = ({ standalone = false }) => (
  <>
    <div className={`${standalone ? "bg-white" : "bg-clay"} py-24 lg:py-32`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {!standalone && (
          <div className="relative flex items-end justify-center mb-14">
            <div className="hidden lg:block absolute left-4 bottom-1 text-navy-dark/70">
              <span className="font-hand text-[23px] leading-tight block">
                real campaigns,
                <br />
                real numbers
              </span>
              <FigTrendline className="w-24 h-14 ml-10 -mt-1" />
            </div>
            <motion.h2
              className="text-[2rem] sm:text-[2.6rem] font-semibold leading-[1.06] tracking-[-0.035em] text-navy-dark text-center"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              The work, and what
              <br />
              {"it "}
              <span className="text-navy-dark/65">actually did</span>
            </motion.h2>
          </div>
        )}
        <div className="space-y-5">
          {CASE_STUDIES.map((s, a) => (
            <motion.article
              key={s.slug}
              className="group grid lg:grid-cols-[0.9fr_1.1fr] gap-0 rounded-3xl overflow-hidden bg-white shadow-lift hover:shadow-deep transition-shadow duration-500"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: a * 0.08 }}
            >
              <div
                className={`${s.bg} p-8 sm:p-10 flex flex-col justify-between min-h-[220px]`}
              >
                <p className="text-[11px] font-semibold tracking-[0.14em] text-navy-dark/70 uppercase">
                  {s.industry}
                  {" \u00b7 "}
                  {s.duration}
                </p>
                <div>
                  <p className="text-[4rem] sm:text-[4.6rem] font-semibold text-navy-dark leading-[0.95] tracking-[-0.04em]">
                    {s.headline}
                  </p>
                  <p className="text-[14px] text-navy-dark/70 mt-1">
                    {s.metric}
                  </p>
                </div>
              </div>
              <div className="p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  <h3 className="text-[1.5rem] sm:text-[1.75rem] font-semibold text-navy-dark leading-[1.15] tracking-[-0.02em] mb-3">
                    {s.title}
                  </h3>
                  <p className="text-[14.5px] text-navy-dark/70 leading-relaxed max-w-md">
                    {s.line}
                  </p>
                </div>
                <div className="flex flex-wrap items-end gap-x-8 gap-y-4 mt-7 pt-6 border-t border-line">
                  {s.stats.map(([r, c]) => (
                    <span key={c}>
                      <span className="block text-[19px] font-semibold text-navy-dark leading-none">
                        {r}
                      </span>
                      <span className="block text-[11px] text-navy-dark/70 mt-1.5">
                        {c}
                      </span>
                    </span>
                  ))}
                  <Link
                    to={`/case-studies/${s.slug}`}
                    className="ml-auto inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-navy-dark group-hover:gap-2.5 transition-all duration-300"
                  >
                    Open the case file
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        {!standalone && (
          <div className="flex flex-wrap items-center justify-center gap-5 mt-12">
            <div className="hidden sm:block text-navy-dark/70">
              <FigNetwork className="w-24 h-auto" />
            </div>
            <a
              href="/case-studies"
              className="inline-flex items-center gap-2 bg-navy-dark hover:bg-black text-white rounded-xl px-7 py-3.5 text-[14px] font-semibold transition-colors duration-300"
            >
              See all case studies
              <ArrowRight className="w-4 h-4" />
            </a>
            <span className="text-[13px] text-navy-dark/70">
              Sample data — real client files shared on the call.
            </span>
          </div>
        )}
      </div>
    </div>
    {!standalone && <IndexationBand />}
  </>
);

export default Results;
