import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FigNetwork, FigTrendline } from "@/components/LineArt";
import { CASE_STUDIES } from "@/lib/content";

const Results = ({ standalone = false }) => (
  <div className="bg-white py-24 lg:py-32">
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
            className="text-4xl sm:text-5xl font-semibold text-navy-dark text-center tracking-[-0.03em] leading-[1.06]"
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
            className="group grid lg:grid-cols-[0.9fr_1.1fr] gap-0 rounded-3xl border border-line overflow-hidden bg-white hover:shadow-lift transition-shadow duration-500"
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
                <p className="text-[14px] text-navy-dark/70 mt-1">{s.metric}</p>
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
);

export default Results;
