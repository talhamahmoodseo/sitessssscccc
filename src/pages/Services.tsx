import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FigSplitSearch } from "@/components/LineArt";
import { SERVICES } from "./services/shared";
import AgencyBlocks from "@/components/AgencyBlocks";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";
import { openBooking } from "@/lib/booking";

const SERVICE_LADDER = [
  {
    n: "01",
    t: "Start with links",
    d: "Authority is the base layer. Without it, nothing else compounds.",
  },
  {
    n: "02",
    t: "Add press & quotes",
    d: "Digital PR and HARO turn authority into credibility a buyer can see.",
  },
  {
    n: "03",
    t: "Finish with mentions",
    d: "Brand mentions convert that footprint into AI answers.",
  },
];

const Services = () => (
  <PageLayout>
    <Seo
      title="Services"
      description="Editorial link building, digital PR, HARO expert quotes and AI brand mentions — one authority programme, four ways in."
    />
    <div className="relative bg-mist overflow-hidden pt-28 pb-16 lg:pt-32">
      <div className="pointer-events-none absolute -left-24 top-6 w-[520px] h-[380px] rounded-full blur-[80px] opacity-50 bg-butter" />
      <div className="pointer-events-none absolute -right-20 top-28 w-[440px] h-[340px] rounded-full blur-[80px] opacity-45 bg-lilac" />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.p
          className="text-[11px] font-semibold tracking-[0.18em] text-navy-dark/70 uppercase mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Services
        </motion.p>
        <motion.h1
          className="text-[2.5rem] sm:text-5xl lg:text-[3.5rem] font-semibold text-navy-dark leading-[1.03] tracking-[-0.035em] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.05 }}
        >
          {"Four ways to build "}
          <span className="text-navy-dark/65">the same thing</span>: authority.
        </motion.h1>
        <motion.p
          className="text-[17px] text-navy-dark/70 leading-relaxed max-w-xl mx-auto mb-9"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
        >
          Most clients run two or three together. Start wherever the gap is
          biggest — we will tell you honestly which one that is.
        </motion.p>
        <motion.button
          onClick={openBooking}
          className="inline-flex items-center gap-2 bg-navy-dark hover:bg-black text-white rounded-xl px-7 py-3.5 text-[14px] font-semibold transition-colors duration-300"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {"Book a strategy call "}
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
    <div className="relative bg-mist pb-24">
      <motion.div
        className="hidden xl:block absolute -left-2 top-24 text-navy-dark/80"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <FigSplitSearch className="w-24 h-auto" />
      </motion.div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 gap-5">
        {SERVICES.map((e, s) => (
          <motion.div
            key={e.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: (s % 2) * 0.08 }}
          >
            <Link
              to={`/services/${e.slug}`}
              className="group block h-full rounded-3xl border border-line bg-white overflow-hidden hover:shadow-lift transition-shadow duration-500"
            >
              <div className={`${e.tint} px-8 py-7`}>
                <p className="text-[11px] font-semibold tracking-[0.16em] text-navy-dark/70 uppercase mb-2">
                  0{s + 1}
                </p>
                <h2 className="text-[1.7rem] font-semibold text-navy-dark tracking-[-0.025em] leading-tight">
                  {e.nav}
                </h2>
              </div>
              <div className="px-8 py-7">
                <p className="text-[14.5px] text-navy-dark/70 leading-relaxed mb-6">
                  {e.sub}
                </p>
                <ul className="space-y-2 mb-7">
                  {e.deliverables.slice(0, 3).map((a) => (
                    <li
                      key={a.t}
                      className="text-[13.5px] text-navy-dark/75 flex gap-2.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-navy-dark/30 flex-none mt-2" />
                      {a.t}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-navy-dark group-hover:gap-2.5 transition-all duration-300">
                  {"Explore "}
                  {e.nav} <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
    <AgencyBlocks />
    <div className="bg-white py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-[2rem] sm:text-[2.6rem] font-semibold leading-[1.06] tracking-[-0.035em] text-navy-dark text-center mb-14"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {"The order we'd "}
          <span className="text-navy-dark/65">recommend</span>
        </motion.h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {SERVICE_LADDER.map((e, s) => (
            <motion.div
              key={e.n}
              className="rounded-2xl bg-mist p-7"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: s * 0.08 }}
            >
              <span className="text-[11px] font-semibold tracking-[0.16em] text-navy-dark/65">
                {e.n}
              </span>
              <h3 className="text-[19px] font-semibold text-navy-dark mt-3 mb-2.5">
                {e.t}
              </h3>
              <p className="text-[14px] text-navy-dark/70 leading-relaxed">
                {e.d}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </PageLayout>
);

export default Services;
