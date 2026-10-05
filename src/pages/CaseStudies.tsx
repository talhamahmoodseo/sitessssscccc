import { motion } from "motion/react";
import { Testimonial } from "@/components/AgencyBlocks";
import CountUp from "@/components/CountUp";
import { Seo } from "@/components/MotionKit";
import PageHero from "@/components/PageHero";
import PageLayout from "@/components/PageLayout";
import Results from "@/sections/Results";

const CASE_STATS = [
  { v: 1400, suffix: "+", label: "Links & mentions placed" },
  { custom: "DR 28→65", label: "Authority range moved" },
  { v: 212, prefix: "+", suffix: "%", label: "Best organic-clicks lift" },
  { v: 96, suffix: "%", label: "Indexation rate" },
];

const CaseStudies = () => (
  <PageLayout>
    <Seo
      title="Case Studies"
      description="Real campaign breakdowns: growth charts, sample placements, and indexation reports for link building and digital PR clients."
    />
    <PageHero
      compact={true}
      eyebrow="Results"
      title={
        <>
          {"Proof, "}
          <span className="text-navy-dark/65">not promises</span>.
        </>
      }
      sub="Open any campaign below — every one comes with the full file: growth chart, sample placement, indexation report, and the work behind it."
    />
    <div className="bg-navy-dark py-16 border-b border-white/[0.05]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-y-10 lg:divide-x lg:divide-white/[0.07]">
        {CASE_STATS.map((e, s) => (
          <motion.div
            key={e.label}
            className="text-center px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: s * 0.08 }}
          >
            <div className="text-3xl lg:text-[2.6rem] font-semibold text-white tracking-[-0.02em] leading-none">
              {"custom" in e && e.custom ? (
                e.custom
              ) : (
                <CountUp to={e.v} prefix={e.prefix} suffix={e.suffix} />
              )}
            </div>
            <div className="mt-3 text-[10.5px] font-bold tracking-[0.12em] text-white/60 uppercase leading-snug">
              {e.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    <Results standalone={true} />
    <Testimonial
      text="The case file format sold us before the call did. Charts, placements, indexation — everything an SEO lead needs to defend the budget internally."
      who="VP Marketing, SaaS"
    />
  </PageLayout>
);

export default CaseStudies;
