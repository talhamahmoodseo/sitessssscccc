import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Check, Search, TrendingDown, X } from "lucide-react";
import {
  Glow,
  HeroActions,
  OtherServices,
  RatingRow,
  SectionHead,
  SectionLabel,
  SectionLead,
  SectionTitle,
  getService,
} from "./shared";
import AgencyBlocks, { FaqList, Testimonial } from "@/components/AgencyBlocks";
import CountUp from "@/components/CountUp";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";

const RankClimbMock = () => {
  const e = [
      {
        id: "a",
        d: "bigcompetitor.com",
        t: "Emergency HVAC services — fast local repair",
      },
      {
        id: "b",
        d: "directory-site.com",
        t: "Top 10 HVAC companies near you (2026)",
      },
      {
        id: "c",
        d: "localpages.com",
        t: "HVAC contractors — verified listings",
      },
      {
        id: "you",
        d: "yourbrand.com",
        t: "YourBrand — 24/7 emergency HVAC, Fresno",
        you: true,
      },
    ],
    [s, a] = useState(e);
  return (
    useEffect(() => {
      const r = setInterval(() => {
        a((c) => {
          const u = c.findIndex((h) => h.you);
          if (u === 0) return e;
          const d = [...c];
          return (([d[u - 1], d[u]] = [d[u], d[u - 1]]), d);
        });
      }, 1900);
      return () => clearInterval(r);
    }, []),
    (
      <div className="bg-white rounded-3xl border border-line shadow-lift overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3 border-b border-line">
          <span className="flex gap-1.5">
            {["#ff5f57", "#febc2e", "#28c840"].map((r) => (
              <span
                key={r}
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: r, opacity: 0.6 }}
              />
            ))}
          </span>
          <span className="mx-auto inline-flex items-center gap-2 text-[11px] text-navy-dark/60 bg-linen rounded-full px-3.5 py-1">
            <Search className="w-3 h-3" />
            {" emergency hvac fresno"}
          </span>
          <span className="w-10" />
        </div>
        <div className="p-4 space-y-2.5">
          {s.map((r, c) => (
            <motion.div
              key={r.id}
              layout={true}
              transition={{ type: "spring", stiffness: 340, damping: 30 }}
              className={`flex items-center gap-3 rounded-xl border px-3.5 py-3 ${r.you ? "border-navy-dark/20 bg-butter" : "border-line"}`}
            >
              <span
                className={`flex-none w-7 h-7 rounded-lg text-[12px] font-bold flex items-center justify-center ${r.you ? "bg-navy-dark text-white" : "bg-linen text-navy-dark/45"}`}
              >
                {c + 1}
              </span>
              <span className="min-w-0">
                <span
                  className={`block text-[9.5px] font-bold ${r.you ? "text-navy-dark/70" : "text-verified/70"}`}
                >
                  {r.d}
                </span>
                <span
                  className={`block text-[12.5px] truncate ${r.you ? "font-semibold text-navy-dark" : "text-navy-dark/60"}`}
                >
                  {r.t}
                </span>
              </span>
              {r.you && (
                <span className="ml-auto flex-none text-[8.5px] font-bold tracking-wider bg-navy-dark text-white rounded-full px-2 py-1">
                  ↑ CLIMBING
                </span>
              )}
            </motion.div>
          ))}
        </div>
        <p className="px-5 pb-4 text-center text-[10px] font-semibold tracking-[0.14em] text-navy-dark/40 uppercase">
          12 editorial links · 7 months · illustrative
        </p>
      </div>
    )
  );
};

const VETTING_CHECKS = [
  { label: "Real organic traffic in Ahrefs", pass: true },
  { label: "Clean outbound profile", pass: true },
  { label: "Named editorial team", pass: true },
  { label: "Topical fit with your niche", pass: true },
  { label: "Traffic from one lucky viral post", pass: false },
  { label: "Writes for casinos and CBD too", pass: false },
  { label: "DR 78, audience of nobody", pass: false },
];

const VettingTable = () => (
  <div className="rounded-3xl border border-line bg-white overflow-hidden">
    <div className="px-6 py-4 border-b border-line flex items-center justify-between">
      <span className="text-[11px] font-semibold tracking-[0.16em] text-navy-dark/50 uppercase">
        Domain vetting
      </span>
      <span className="text-[11px] font-semibold text-navy-dark/60">
        4 pass · 3 rejected
      </span>
    </div>
    {VETTING_CHECKS.map((e, s) => (
      <motion.div
        key={e.label}
        className={`flex items-center gap-3 px-6 py-3.5 ${s ? "border-t border-line" : ""} ${e.pass ? "" : "bg-linen/60"}`}
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: s * 0.07 }}
      >
        <span
          className={`flex-none w-5 h-5 rounded-full flex items-center justify-center ${e.pass ? "bg-verified/15" : "bg-gap/12"}`}
        >
          {e.pass ? (
            <Check className="w-3 h-3 text-verified" />
          ) : (
            <X className="w-3 h-3 text-gap" />
          )}
        </span>
        <span
          className={`text-[14px] ${e.pass ? "text-navy-dark/80" : "text-navy-dark/45 line-through"}`}
        >
          {e.label}
        </span>
      </motion.div>
    ))}
  </div>
);

const IndexSteps = () => (
  <div className="grid sm:grid-cols-3 gap-3">
    {["Crawled", "Rendered", "Indexed"].map((e, s) => (
      <motion.div
        key={e}
        className={`rounded-2xl p-6 ${s === 2 ? "bg-butter" : "bg-white border border-line"}`}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: s * 0.22 }}
      >
        <motion.span
          className="flex w-9 h-9 rounded-full bg-verified/15 items-center justify-center mb-4"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.25 + s * 0.22,
            type: "spring",
            stiffness: 300,
            damping: 16,
          }}
        >
          <Check className="w-4 h-4 text-verified" />
        </motion.span>
        <p className="text-[16px] font-semibold text-navy-dark">{e}</p>
        <p className="text-[13px] text-navy-dark/65 mt-1.5">
          {s === 0
            ? "Googlebot fetched the page."
            : s === 1
              ? "The link exists in rendered HTML."
              : "It counts. Logged in your report."}
        </p>
      </motion.div>
    ))}
  </div>
);

const LinkBuilding = () => {
  const e = getService("link-building");
  return (
    <PageLayout>
      <Seo title="Link Building" description={e.sub} />
      <div className="relative bg-mist overflow-hidden pt-28 pb-20 lg:pt-32">
        <Glow
          tint="bg-butter"
          className="-left-24 top-4 w-[520px] h-[380px] opacity-60"
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.05fr] gap-12 items-center">
          <div>
            <SectionLabel>Link Building</SectionLabel>
            <SectionTitle>
              {"Links that move rankings, "}
              <span className="text-navy-dark/45">not just reports</span>.
            </SectionTitle>
            <SectionLead className="max-w-lg">{e.sub}</SectionLead>
            <HeroActions />
            <RatingRow />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <RankClimbMock />
          </motion.div>
        </div>
      </div>
      <div className="bg-navy-dark py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-3 gap-8 text-center sm:text-left">
          {e.stats.map((s) => (
            <div key={s.label}>
              <p className="text-[2.4rem] font-semibold text-white tracking-[-0.03em] leading-none">
                {s.custom ?? (
                  <CountUp to={s.v} prefix={s.prefix} suffix={s.suffix} />
                )}
              </p>
              <p className="text-[12.5px] text-white/55 mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[0.85fr_1.15fr] gap-12">
          <SectionHead eyebrow={e.problem.eyebrow}>
            {e.problem.pre}{" "}
            <span className="text-navy-dark/45">{e.problem.em}</span>.
          </SectionHead>
          <div className="space-y-6">
            {e.problem.paras.map((s, a) => (
              <motion.p
                key={a}
                className="text-[16.5px] text-navy-dark/75 leading-[1.75]"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: a * 0.08 }}
              >
                {s}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-linen py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <SectionHead eyebrow="The gate">
              {"Four in five prospects "}
              <span className="text-navy-dark/45">never make it</span>
            </SectionHead>
            <p className="text-[16.5px] text-navy-dark/75 leading-[1.75] max-w-md">
              Every domain runs the same checks before it reaches your approval
              sheet. High DR is not a pass — an audience is. You see what
              survived and what we killed, every month.
            </p>
          </div>
          <VettingTable />
        </div>
      </div>
      <AgencyBlocks />
      <div className="bg-white py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead eyebrow="The part vendors skip" center={true}>
            {"A link Google never renders "}
            <span className="text-navy-dark/45">is an invoice</span>
          </SectionHead>
          <IndexSteps />
        </div>
      </div>
      <div className="bg-navy-dark py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] font-semibold tracking-[0.18em] text-white/45 uppercase mb-3">
              The maths nobody shows you
            </p>
            <h2 className="text-4xl sm:text-[2.9rem] font-semibold text-white tracking-[-0.03em] leading-[1.08]">
              What a $60 link
              <br />
              really costs
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              ["$60", "The invoice", "What you paid for the placement."],
              [
                "$0",
                "The return",
                "No traffic, no crawl, no ranking movement. The site exists to sell links.",
              ],
              [
                "4–6 months",
                "The real cost",
                "Time lost before you find out — plus the clean-up when an audit flags the profile.",
              ],
            ].map(([s, a, r], c) => (
              <motion.div
                key={a}
                className="rounded-2xl bg-white/[0.05] border border-white/10 p-7"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: c * 0.09 }}
              >
                <TrendingDown className="w-5 h-5 text-white/40 mb-4" />
                <p className="text-[2.2rem] font-semibold text-white tracking-[-0.03em] leading-none mb-2">
                  {s}
                </p>
                <p className="text-[12.5px] font-semibold text-white/70 mb-2">
                  {a}
                </p>
                <p className="text-[13px] text-white/50 leading-relaxed">{r}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-[14.5px] text-white/60 mt-10 max-w-xl mx-auto leading-relaxed">
            Cheap links are not cheap. They are a slower, more expensive way of
            arriving at the same place you started.
          </p>
        </div>
      </div>
      <div className="bg-mist py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead>
            {"What's "}
            <span className="text-navy-dark/45">included</span>
          </SectionHead>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {e.deliverables.map((s, a) => (
              <motion.div
                key={s.t}
                className="bg-white rounded-2xl border border-line p-7 hover:-translate-y-1 hover:shadow-lift transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (a % 3) * 0.08 }}
              >
                <span className="text-[11px] font-semibold tracking-[0.16em] text-navy-dark/40">
                  0{a + 1}
                </span>
                <h3 className="text-[17px] font-semibold text-navy-dark mt-3 mb-2">
                  {s.t}
                </h3>
                <p className="text-[14px] text-navy-dark/70 leading-relaxed">
                  {s.d}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Testimonial text={e.quote.text} who={e.quote.who} />
      <div className="bg-white py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead center={true}>
            {"Straight "}
            <span className="text-navy-dark/45">answers</span>
          </SectionHead>
          <FaqList faqs={e.faqs} />
        </div>
      </div>
      <OtherServices current="link-building" />
    </PageLayout>
  );
};

export default LinkBuilding;
