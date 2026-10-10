import { useState } from "react";
import { motion } from "motion/react";
import { FitPair, ProofPanel, ProcessRail, RejectStrip } from "./depth";
import { digitalPr as C } from "./content/digitalPr";

import { ArrowUpRight, Mail } from "lucide-react";
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
import { FaqList } from "@/components/AgencyBlocks";
import CountUp from "@/components/CountUp";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";

const PR_PLACEMENTS = [
  {
    outlet: "Khaleej Times",
    dr: "DR 74",
    head: "How response time became the new local moat",
    kind: "FEATURE",
    rot: -7,
    tint: "bg-mint",
  },
  {
    outlet: "The Industry Journal",
    dr: "DR 71",
    head: "Founders on the systems behind 24/7 service",
    kind: "EXPERT QUOTE",
    rot: 0,
    tint: "bg-white",
  },
  {
    outlet: "Home Services Digest",
    dr: "DR 64",
    head: "2026 buyer’s guide: who the pros recommend",
    kind: "ROUNDUP",
    rot: 7,
    tint: "bg-blush",
  },
];

const PlacementFan = () => (
  <div className="relative flex justify-center items-end py-4">
    {PR_PLACEMENTS.map((e, s) => (
      <motion.div
        key={e.outlet}
        className={`${e.tint} w-52 sm:w-56 rounded-2xl border border-line shadow-lift p-5 -mx-4`}
        style={{ zIndex: e.rot === 0 ? 3 : 1 }}
        initial={{ opacity: 0, y: 40, rotate: 0 }}
        animate={{ opacity: 1, y: e.rot === 0 ? 0 : 20, rotate: e.rot }}
        transition={{
          duration: 0.7,
          delay: 0.3 + s * 0.14,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{
          y: -10,
          rotate: 0,
          zIndex: 5,
          transition: { duration: 0.3 },
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <p className="text-[12.5px] font-semibold text-navy-dark">
            {e.outlet}
          </p>
          <span className="text-[9px] font-bold text-navy-dark/60 border border-navy-dark/15 rounded px-1.5 py-0.5">
            {e.dr}
          </span>
        </div>
        <p className="text-[13px] font-medium text-navy-dark/80 leading-snug mb-4">
          {e.head}
        </p>
        <span className="block h-1 rounded-full bg-navy-dark/10 w-full mb-1.5" />
        <span className="block h-1 rounded-full bg-navy-dark/10 w-4/5 mb-4" />
        <span className="text-[8.5px] font-bold tracking-[0.14em] text-navy-dark/70 bg-white/70 border border-navy-dark/10 rounded-full px-2.5 py-1">
          {e.kind}
        </span>
      </motion.div>
    ))}
  </div>
);

const PITCH_STEPS = [
  {
    n: "1",
    label: "A subject line about their readers",
    d: "Not your brand. The idea an editor could headline tomorrow.",
  },
  {
    n: "2",
    label: "Evidence in the first line",
    d: "A number or field observation that makes the story printable.",
  },
  {
    n: "3",
    label: "An easy yes",
    d: "Draft offered, quote ready, deadline respected. No chasing.",
  },
];

const PitchPanel = () => (
  <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
    <motion.div
      className="bg-white rounded-3xl border border-line shadow-soft overflow-hidden"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-2.5 px-6 py-3.5 border-b border-line bg-linen">
        <Mail className="w-4 h-4 text-navy-dark/70" />
        <span className="text-[12px] font-semibold text-navy-dark/70">
          To: features desk
        </span>
        <span className="ml-auto text-[10px] font-bold tracking-wider text-verified bg-verified/10 border border-verified/25 rounded-full px-2 py-1">
          OPENED · REPLIED 31H
        </span>
      </div>
      <div className="p-6 sm:p-8">
        <p className="text-[17px] font-semibold text-navy-dark leading-snug mb-4">
          <span className="bg-mint rounded px-1">
            Response time is the new local moat
          </span>
          <sup className="text-[10px] font-bold text-navy-dark/60 ml-1">1</sup>
        </p>
        <p className="text-[14.5px] text-navy-dark/75 leading-relaxed mb-3">
          <span className="border-b-2 border-blush">
            Dispatch data from 40 service firms shows 71% of callers book
            whoever answers first
          </span>
          <sup className="text-[10px] font-bold text-navy-dark/60 ml-0.5">
            2
          </sup>
          {" \u2014 happy to share the full set."}
        </p>
        <p className="text-[14.5px] text-navy-dark/75 leading-relaxed">
          <span className="border-b-2 border-lilac">
            Draft ready if useful, or a 200-word quote by Thursday
          </span>
          <sup className="text-[10px] font-bold text-navy-dark/60 ml-0.5">
            3
          </sup>
          .
        </p>
      </div>
    </motion.div>
    <div className="space-y-5">
      {PITCH_STEPS.map((e, s) => (
        <motion.div
          key={e.n}
          className="flex gap-4"
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: s * 0.1 }}
        >
          <span className="flex-none w-7 h-7 rounded-full bg-navy-dark text-white text-[12px] font-bold flex items-center justify-center">
            {e.n}
          </span>
          <div>
            <p className="text-[15.5px] font-semibold text-navy-dark mb-1">
              {e.label}
            </p>
            <p className="text-[13.5px] text-navy-dark/70 leading-relaxed">
              {e.d}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const PLACEMENT_ROWS = [
  ["Khaleej Times", "Feature · business desk", "DR 74", "bg-mint"],
  ["Arabian Business", "Expert quote", "DR 72", "bg-lilac"],
  ["The Industry Journal", "Feature", "DR 71", "bg-butter"],
  ["Home Services Digest", "Buyer’s guide roundup", "DR 64", "bg-blush"],
  ["Gulf Business Review", "Feature", "DR 61", "bg-sky"],
];

const DigitalPR = () => {
  const e = getService("digital-pr"),
    [s, a] = useState(0),
    r = [
      {
        t: "Data you already have",
        d: "Dispatch times, order values, seasonal patterns — internal numbers become a story no competitor can copy.",
      },
      {
        t: "A contrarian read",
        d: "The thing your market believes that your experience says is wrong. Editors love a defensible disagreement.",
      },
      {
        t: "A moment worth covering",
        d: "Expansion, a hire, a regional first. Small news, framed for the reader rather than the press release.",
      },
    ];
  return (
    <PageLayout>
      <Seo title="Digital PR" description={e.sub} />
      <div className="relative bg-mist overflow-hidden pt-28 pb-8 lg:pt-32">
        <Glow
          tint="bg-mint"
          className="-right-24 top-8 w-[520px] h-[380px] opacity-60"
        />
        <Glow
          tint="bg-blush"
          className="-left-20 top-32 w-[420px] h-[320px] opacity-50"
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionLabel>Digital PR</SectionLabel>
          <SectionTitle>
            {"Coverage that makes you "}
            <span className="text-navy-dark/65">the one they quote</span>.
          </SectionTitle>
          <SectionLead className="max-w-xl mx-auto">{e.sub}</SectionLead>
          <div className="flex justify-center">
            <HeroActions label="Pitch my story" />
          </div>
          <div className="flex justify-center">
            <RatingRow />
          </div>
        </div>
        <div className="relative max-w-3xl mx-auto px-4 mt-12">
          <PlacementFan />
        </div>
      </div>
      <div className="bg-navy-dark py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[11px] font-semibold tracking-[0.18em] text-white/70 uppercase mb-8">
            Recent placements
          </p>
          <div className="space-y-2.5">
            {PLACEMENT_ROWS.map(([c, u, d, h], x) => (
              <motion.div
                key={c}
                className="flex items-center gap-4 rounded-2xl bg-white/[0.05] border border-white/10 px-5 py-4"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: x * 0.08 }}
              >
                <span className={`w-2.5 h-2.5 rounded-full flex-none ${h}`} />
                <span className="text-[15px] font-semibold text-white flex-1 truncate">
                  {c}
                </span>
                <span className="hidden sm:block text-[12.5px] text-white/55">
                  {u}
                </span>
                <span className="text-[10.5px] font-bold text-white/70 border border-white/20 rounded px-2 py-0.5">
                  {d}
                </span>
                <ArrowUpRight className="w-4 h-4 text-white/70" />
              </motion.div>
            ))}
          </div>
          <p className="text-center text-[10px] font-semibold tracking-[0.14em] text-white/70 uppercase mt-8">
            Sample coverage · real client list shared on the call
          </p>
        </div>
      </div>
      <div className="bg-white py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[0.85fr_1.15fr] gap-12">
          <SectionHead eyebrow={e.problem.eyebrow}>
            {e.problem.pre}{" "}
            <span className="text-navy-dark/65">{e.problem.em}</span>.
          </SectionHead>
          <div className="space-y-6">
            {e.problem.paras.map((c, u) => (
              <motion.p
                key={u}
                className="text-[16.5px] text-navy-dark/75 leading-[1.75]"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: u * 0.08 }}
              >
                {c}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-linen py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead eyebrow="The craft" center={true}>
            {"Anatomy of a pitch "}
            <span className="text-navy-dark/65">editors open</span>
          </SectionHead>
          <PitchPanel />
        </div>
      </div>
      <div className="bg-white py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead eyebrow="Where stories come from" center={true}>
            {"Three places we "}
            <span className="text-navy-dark/65">find the angle</span>
          </SectionHead>
          <div className="flex flex-wrap justify-center gap-2.5 mb-8">
            {r.map((c, u) => (
              <button
                key={c.t}
                onClick={() => a(u)}
                className={`rounded-full px-5 py-2.5 text-[13px] font-semibold border transition-colors duration-300 ${s === u ? "bg-navy-dark text-white border-navy-dark" : "border-line text-navy-dark/60 hover:text-navy-dark"}`}
              >
                {c.t}
              </button>
            ))}
          </div>
          <motion.div
            key={s}
            className="bg-mist rounded-3xl p-8 sm:p-10 text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <p className="text-[18px] text-navy-dark/80 leading-relaxed max-w-2xl mx-auto">
              {r[s].d}
            </p>
          </motion.div>
        </div>
      </div>
      <div className="bg-linen py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead eyebrow="Where you can land" center={true}>
            Three tiers of coverage
          </SectionHead>
          <div className="rounded-3xl border border-line bg-white overflow-hidden">
            {[
              [
                "Tier 1",
                "National & regional business press",
                "DR 70–80",
                "Khaleej Times, Arabian Business",
                "bg-mint",
              ],
              [
                "Tier 2",
                "Trade and industry publications",
                "DR 55–70",
                "Sector journals your buyers read weekly",
                "bg-blush",
              ],
              [
                "Tier 3",
                "Niche blogs and roundups",
                "DR 40–55",
                "Where comparison and “best of” searches land",
                "bg-sky",
              ],
            ].map(([c, u, d, h, x], m) => (
              <motion.div
                key={c}
                className={`grid sm:grid-cols-[100px_1fr_110px] gap-4 items-center px-6 py-6 ${m ? "border-t border-line" : ""}`}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: m * 0.09 }}
              >
                <span
                  className={`${x} rounded-xl px-3 py-2 text-[12.5px] font-bold text-navy-dark text-center w-fit sm:w-auto`}
                >
                  {c}
                </span>
                <span>
                  <span className="block text-[15.5px] font-semibold text-navy-dark">
                    {u}
                  </span>
                  <span className="block text-[13px] text-navy-dark/60 mt-1">
                    {h}
                  </span>
                </span>
                <span className="text-[13px] font-semibold text-navy-dark/70 sm:text-right">
                  {d}
                </span>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-[13.5px] text-navy-dark/60 mt-6">
            Most campaigns mix all three. Tier 1 builds the “as seen in” bar;
            tier 3 wins the comparison searches.
          </p>
        </div>
      </div>
      <div className="bg-mist py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-3 gap-4">
          {e.stats.map((c, u) => (
            <motion.div
              key={c.label}
              className={`${["bg-mint", "bg-blush", "bg-sky"][u % 3]} rounded-2xl p-7`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: u * 0.08 }}
            >
              <p className="text-[2.6rem] font-semibold text-navy-dark tracking-[-0.03em] leading-none">
                {c.custom ?? (
                  <CountUp to={c.v} prefix={c.prefix} suffix={c.suffix} />
                )}
              </p>
              <p className="text-[13px] text-navy-dark/70 mt-2.5">{c.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <RejectStrip
        items={C.ledger.rejections}
        eyebrow="Not every outlet earns the pitch"
        title={
          <>
            Three we turned down
            <br />
            <span className="text-white/70">last quarter</span>
          </>
        }
        lede="Coverage is only worth having if the publication is. These cleared the authority filter and still failed."
      />
      <ProcessRail
        steps={C.process}
        eyebrow="How a campaign runs"
        title={
          <>
            Five steps, and you are{" "}
            <span className="text-navy-dark/65">in the loop at three</span>
          </>
        }
      />
      <ProofPanel
        example={C.example}
        quote={C.quote}
        eyebrow="One campaign, in full"
        title={
          <>
            Gulf trade coverage rebuilt a{" "}
            <span className="text-navy-dark/65">thin profile</span>
          </>
        }
        tone="mist"
      />
      <div className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead>
            {"What's "}
            <span className="text-navy-dark/65">included</span>
          </SectionHead>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
            {e.deliverables.map((c, u) => (
              <motion.div
                key={c.t}
                className="flex gap-4 pb-8 border-b border-line"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: (u % 2) * 0.08 }}
              >
                <span className="text-[13px] font-bold text-navy-dark/30 pt-0.5">
                  0{u + 1}
                </span>
                <div>
                  <h3 className="text-[17px] font-semibold text-navy-dark mb-1.5">
                    {c.t}
                  </h3>
                  <p className="text-[14px] text-navy-dark/70 leading-relaxed">
                    {c.d}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <FitPair
        good={C.fit.good}
        bad={C.fit.bad}
        eyebrow="Fit"
        title={
          <>
            Digital PR is{" "}
            <span className="text-navy-dark/65">not right for everyone</span>
          </>
        }
        tone="linen"
      />
      <div className="bg-white py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead center={true}>
            {"Straight "}
            <span className="text-navy-dark/65">answers</span>
          </SectionHead>
          <FaqList faqs={e.faqs} />
        </div>
      </div>
      <OtherServices current="digital-pr" />
    </PageLayout>
  );
};

export default DigitalPR;
