import { motion } from "motion/react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";
import { openBooking } from "@/lib/booking";
import { CASE_STUDIES } from "@/lib/content";

const GB = (e) => CASE_STUDIES.find((s) => s.slug === e);

const Block = ({ eyebrow, title, children, tone = "paper" }) => (
  <div
    className={`${tone === "white" ? "bg-white" : "bg-mist"} py-20 lg:py-24`}
  >
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.p
        className="text-[11px] font-semibold tracking-[0.18em] text-navy-dark/70 uppercase mb-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        className="text-3xl sm:text-[2.4rem] font-semibold text-navy-dark tracking-[-0.03em] leading-[1.1] mb-8"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-70px" }}
        transition={{ duration: 0.55 }}
      >
        {title}
      </motion.h2>
      {children}
    </div>
  </div>
);

const CaseStudy = () => {
  const { slug: e } = useParams(),
    s = GB(e);
  if (!s) return <Navigate to="/case-studies" replace={true} />;
  const a = CASE_STUDIES.filter((r) => r.slug !== s.slug);
  return (
    <PageLayout>
      <Seo title={`${s.title} — case study`} description={s.line} />
      <div className="bg-mist pt-28 pb-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-navy-dark/70 hover:text-navy-dark transition-colors duration-300 mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {" All case studies"}
          </Link>
          <motion.p
            className="text-[11px] font-semibold tracking-[0.18em] text-navy-dark/70 uppercase mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {s.industry}
            {" \u00b7 "}
            {s.duration}
          </motion.p>
          <motion.h1
            className="text-[2.4rem] sm:text-5xl lg:text-[3.4rem] font-semibold text-navy-dark leading-[1.03] tracking-[-0.035em] max-w-3xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05 }}
          >
            {s.title}
          </motion.h1>
          <motion.p
            className="text-[18px] text-navy-dark/70 leading-relaxed max-w-2xl mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            {s.line}
          </motion.p>
        </div>
        <motion.div
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div
            className={`${s.bg} rounded-3xl p-8 sm:p-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-8`}
          >
            {s.outcome.map(([r, c]) => (
              <div key={c}>
                <p className="text-[2.6rem] sm:text-[3rem] font-semibold text-navy-dark leading-none tracking-[-0.04em]">
                  {r}
                </p>
                <p className="text-[13px] text-navy-dark/70 mt-2">{c}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <div className="h-20" />
      </div>
      <Block
        eyebrow="The situation"
        title={
          <>
            {"Where they "}
            <span className="text-navy-dark/65">started</span>
          </>
        }
        tone="white"
      >
        <div className="space-y-5 mb-10">
          {s.situation.map((r, c) => (
            <motion.p
              key={c}
              className="text-[16.5px] text-navy-dark/75 leading-[1.75]"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: c * 0.08 }}
            >
              {r}
            </motion.p>
          ))}
        </div>
        <div className="rounded-2xl border border-line p-7">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-navy-dark/70 uppercase mb-4">
            What was blocking them
          </p>
          <ul className="space-y-3">
            {s.blockers.map((r) => (
              <li
                key={r}
                className="flex gap-3 text-[14.5px] text-navy-dark/75 leading-relaxed"
              >
                <span className="flex-none w-1.5 h-1.5 rounded-full bg-gap mt-2.5" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </Block>
      <Block
        eyebrow="The strategy"
        title={
          <>
            {"How we "}
            <span className="text-navy-dark/65">approached it</span>
          </>
        }
      >
        <div className="grid sm:grid-cols-3 gap-4">
          {s.strategy.map((r, c) => (
            <motion.div
              key={r.t}
              className="bg-white rounded-2xl border border-line p-7"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: c * 0.08 }}
            >
              <span className="inline-flex w-8 h-8 rounded-full bg-navy-dark text-white text-[12px] font-bold items-center justify-center mb-4">
                {c + 1}
              </span>
              <h3 className="text-[17px] font-semibold text-navy-dark mb-2.5">
                {r.t}
              </h3>
              <p className="text-[14px] text-navy-dark/70 leading-relaxed">
                {r.d}
              </p>
            </motion.div>
          ))}
        </div>
      </Block>
      <Block
        eyebrow="The work"
        title={
          <>
            {"What we "}
            <span className="text-navy-dark/65">actually shipped</span>
          </>
        }
        tone="white"
      >
        <div className="grid lg:grid-cols-2 gap-5">
          <div className="rounded-2xl border border-line overflow-hidden">
            {s.work.map(([r, c], u) => (
              <div
                key={r}
                className={`flex items-center justify-between px-6 py-4 ${u ? "border-t border-line" : ""}`}
              >
                <span className="text-[14.5px] text-navy-dark/80">{r}</span>
                <span className="text-[16px] font-semibold text-navy-dark">
                  {c}
                </span>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-line overflow-hidden">
            <p className="px-6 py-3.5 text-[11px] font-semibold tracking-[0.16em] text-navy-dark/70 uppercase bg-linen">
              Sample placements
            </p>
            {s.placements.map(([r, c, u]) => (
              <div
                key={r}
                className="flex items-center gap-3 px-6 py-4 border-t border-line"
              >
                <span className="text-[13.5px] font-medium text-navy-dark/85 flex-1 truncate">
                  {r}
                </span>
                <span className="text-[10.5px] font-bold text-navy-dark/70 border border-line rounded px-2 py-0.5">
                  {c}
                </span>
                <span className="text-[9.5px] font-bold tracking-wider text-navy-dark/70 bg-linen rounded px-2 py-1">
                  {u}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Block>
      <Block
        eyebrow="The timeline"
        title={
          <>
            {"How it "}
            <span className="text-navy-dark/65">unfolded</span>
          </>
        }
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {s.timeline.map((r, c) => (
            <motion.div
              key={r.m}
              className="bg-white rounded-2xl border border-line p-6"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: c * 0.07 }}
            >
              <p className="text-[11px] font-semibold tracking-[0.14em] text-navy-dark/70 uppercase mb-3">
                {r.m}
              </p>
              <h3 className="text-[15.5px] font-semibold text-navy-dark mb-2">
                {r.t}
              </h3>
              <p className="text-[13px] text-navy-dark/70 leading-relaxed">
                {r.d}
              </p>
            </motion.div>
          ))}
        </div>
      </Block>
      <div className="bg-navy-dark py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[1.6rem] sm:text-[2rem] text-white leading-[1.35] tracking-[-0.02em] mb-6">
            “{s.quote.text}”
          </p>
          <p className="text-[12px] font-semibold tracking-[0.16em] text-white/50 uppercase mb-10">
            {s.quote.who}
            {" \u00b7 sample"}
          </p>
          <button
            onClick={openBooking}
            className="inline-flex items-center gap-2 bg-white text-navy-dark hover:bg-white/90 rounded-xl px-8 py-4 text-[14.5px] font-semibold transition-colors duration-300"
          >
            Get a plan like this for your site
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="mt-5 text-[12.5px] text-white/50 flex items-center justify-center gap-2">
            <Check className="w-3.5 h-3.5" />
            {" Free visibility audit within 48 hours"}
          </p>
        </div>
      </div>
      <div className="bg-mist py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-navy-dark tracking-[-0.02em] mb-7">
            More campaigns
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {a.map((r) => (
              <Link
                key={r.slug}
                to={`/case-studies/${r.slug}`}
                className="group flex items-stretch rounded-2xl border border-line overflow-hidden bg-white hover:shadow-lift transition-shadow duration-500"
              >
                <span
                  className={`${r.bg} w-32 flex-none flex items-center justify-center`}
                >
                  <span className="text-[1.6rem] font-semibold text-navy-dark tracking-[-0.03em]">
                    {r.headline}
                  </span>
                </span>
                <span className="p-5">
                  <span className="block text-[11px] font-semibold tracking-[0.14em] text-navy-dark/70 uppercase mb-1.5">
                    {r.industry}
                  </span>
                  <span className="block text-[15.5px] font-semibold text-navy-dark leading-snug group-hover:underline">
                    {r.title}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CaseStudy;
