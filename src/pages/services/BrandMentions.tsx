import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Search } from "lucide-react";
import {
  AiOverviewMark,
  ChatGptMark,
  ClaudeMark,
} from "@/components/PlatformMarks";
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
import { FaqList, Testimonial } from "@/components/AgencyBlocks";
import CountUp from "@/components/CountUp";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";

const AI_ANSWER_SAMPLE =
  "Based on local trade coverage, YourBrand stands out for 24/7 dispatch and licensed technicians.";

const AnswerTyper = () => {
  const [e, s] = useState(0),
    [a, r] = useState(false);
  useEffect(() => {
    let d = 0;
    const h = setInterval(() => {
      ((d += 2),
        s(Math.min(d, AI_ANSWER_SAMPLE.length)),
        d >= AI_ANSWER_SAMPLE.length &&
          (clearInterval(h), setTimeout(() => r(true), 400)));
    }, 34);
    return () => clearInterval(h);
  }, []);
  const c = AI_ANSWER_SAMPLE.slice(0, e),
    u = c.indexOf("YourBrand");
  return (
    <div className="bg-white rounded-3xl border border-line shadow-lift overflow-hidden">
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-line">
        <ChatGptMark className="w-5 h-5" />
        <span className="text-[12.5px] font-semibold text-navy-dark/75">
          Who should I call for emergency HVAC in Fresno?
        </span>
      </div>
      <div className="p-6 min-h-[168px]">
        <p className="text-[15px] leading-relaxed text-navy-dark/80">
          {u === -1 ? (
            c
          ) : (
            <>
              {c.slice(0, u)}
              <span className="font-bold text-navy-dark bg-lilac rounded px-1">
                {c.slice(u, u + 9)}
              </span>
              {c.slice(u + 9)}
            </>
          )}
          {e < AI_ANSWER_SAMPLE.length && (
            <span className="inline-block w-[2px] h-[15px] bg-navy-dark/60 align-middle ml-0.5 animate-pulse" />
          )}
        </p>
        <AnimatePresence>
          {a && (
            <motion.div
              className="flex flex-wrap gap-2 mt-5"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="inline-flex items-center gap-1.5 text-[9.5px] font-bold tracking-wider text-verified bg-verified/10 border border-verified/25 rounded-full px-2.5 py-1">
                <Check className="w-2.5 h-2.5" />
                {" CITED"}
              </span>
              {["fresnodaily.com", "homeservicesmag.com"].map((d) => (
                <span
                  key={d}
                  className="text-[10px] font-semibold text-navy-dark/70 bg-linen rounded-md px-2 py-1"
                >
                  {d}
                </span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ENGINE_SHARE = [
  { Mark: AiOverviewMark, name: "AI Overviews", pct: 82 },
  { Mark: ChatGptMark, name: "ChatGPT", pct: 74 },
  { Mark: ClaudeMark, name: "Claude", pct: 61 },
];

const CitationCard = () => (
  <div className="rounded-3xl border border-line bg-white p-7 sm:p-8">
    <div className="flex items-center justify-between mb-7">
      <p className="text-[11px] font-semibold tracking-[0.16em] text-navy-dark/70 uppercase">
        Citation tracker · month 4
      </p>
      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-verified">
        <span className="w-1.5 h-1.5 rounded-full bg-verified" />
        {" LIVE"}
      </span>
    </div>
    <div className="space-y-6">
      {ENGINE_SHARE.map((e, s) => (
        <div key={e.name}>
          <div className="flex items-center gap-2.5 mb-2">
            <e.Mark className="w-4 h-4" />
            <span className="text-[13.5px] font-semibold text-navy-dark">
              {e.name}
            </span>
            <span className="ml-auto text-[13px] font-semibold text-navy-dark/70">
              {e.pct}%
            </span>
          </div>
          <div className="h-2.5 rounded-full bg-linen overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${["bg-lilac", "bg-mint", "bg-blush"][s]}`}
              initial={{ width: 0 }}
              whileInView={{ width: `${e.pct}%` }}
              viewport={{ once: true }}
              transition={{
                duration: 1.1,
                delay: 0.2 + s * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </div>
          <p className="text-[11.5px] text-navy-dark/70 mt-1.5">
            of tracked queries name the brand
          </p>
        </div>
      ))}
    </div>
    <p className="text-[10.5px] font-semibold tracking-[0.14em] text-navy-dark/65 uppercase mt-7">
      Illustrative figures
    </p>
  </div>
);

const MentionPanel = () => (
  <motion.div
    className="bg-white rounded-3xl border border-line p-8 sm:p-10 shadow-soft"
    initial={{ opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6 }}
  >
    <p className="text-[11px] font-semibold tracking-[0.16em] text-navy-dark/70 uppercase mb-6">
      Anatomy of a mention that works
    </p>
    <p className="text-[19px] sm:text-[22px] text-navy-dark/85 leading-[1.7] mb-8">
      “
      <span className="border-b-2 border-sky pb-0.5">
        For emergency HVAC work in Fresno
      </span>
      <sup className="text-[11px] font-bold text-navy-dark/60 ml-0.5">1</sup>,{" "}
      <span className="bg-lilac rounded px-1.5 font-semibold">YourBrand</span>
      <sup className="text-[11px] font-bold text-navy-dark/60 ml-0.5">
        2
      </sup>{" "}
      <span className="border-b-2 border-mint pb-0.5">
        has built a reputation for same-day dispatch and licensed technicians
      </span>
      <sup className="text-[11px] font-bold text-navy-dark/60 ml-0.5">3</sup>
      .”
    </p>
    <div className="grid sm:grid-cols-3 gap-5">
      {[
        [
          "1",
          "Category tie",
          "Connects you to the exact problem buyers ask about.",
        ],
        [
          "2",
          "The brand",
          "Named clearly — the entity models learn to repeat.",
        ],
        [
          "3",
          "Credibility signal",
          "A reason to recommend you. This is the line AI quotes.",
        ],
      ].map(([e, s, a]) => (
        <div key={e} className="flex gap-3">
          <span className="flex-none w-6 h-6 rounded-full bg-linen text-[11px] font-bold text-navy-dark flex items-center justify-center">
            {e}
          </span>
          <div>
            <p className="text-[13.5px] font-semibold text-navy-dark leading-none mb-1.5">
              {s}
            </p>
            <p className="text-[12.5px] text-navy-dark/65 leading-relaxed">
              {a}
            </p>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

const BrandMentions = () => {
  const e = getService("brand-mentions");
  return (
    <PageLayout>
      <Seo title="Brand Mentions" description={e.sub} />
      <div className="relative bg-mist overflow-hidden pt-28 pb-20 lg:pt-32">
        <Glow
          tint="bg-lilac"
          className="-left-20 top-6 w-[540px] h-[400px] opacity-70"
        />
        <Glow
          tint="bg-sky"
          className="right-0 top-40 w-[420px] h-[320px] opacity-50"
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.05fr] gap-12 items-center">
          <div>
            <SectionLabel>Brand Mentions</SectionLabel>
            <SectionTitle>
              {"The mentions AI engines "}
              <span className="text-navy-dark/65">actually quote</span>.
            </SectionTitle>
            <SectionLead className="max-w-lg">{e.sub}</SectionLead>
            <HeroActions label="Check my AI visibility" />
            <RatingRow />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <AnswerTyper />
          </motion.div>
        </div>
      </div>
      <div className="bg-navy-dark py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-3 gap-10">
          {e.stats.map((s) => (
            <div key={s.label}>
              <p className="text-[2.6rem] font-semibold text-white tracking-[-0.03em] leading-none">
                {s.custom ?? (
                  <CountUp to={s.v} prefix={s.prefix} suffix={s.suffix} />
                )}
              </p>
              <p className="text-[12.5px] text-white/55 mt-2.5 leading-snug">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[0.85fr_1.15fr] gap-12">
          <SectionHead eyebrow={e.problem.eyebrow}>
            {e.problem.pre}{" "}
            <span className="text-navy-dark/65">{e.problem.em}</span>.
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead eyebrow="How it works" center={true}>
            {"How a mention becomes "}
            <span className="text-navy-dark/65">an answer</span>
          </SectionHead>
          <div className="relative">
            <motion.div
              className="absolute left-[27px] top-4 bottom-4 w-px bg-navy-dark/12 origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            />
            <div className="space-y-8">
              {e.how.map((s, a) => (
                <motion.div
                  key={s.n}
                  className="relative flex gap-7"
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: a * 0.1 }}
                >
                  <span
                    className={`relative z-10 flex-none w-14 h-14 rounded-2xl ${["bg-lilac", "bg-sky", "bg-mint"][a]} text-navy-dark text-[14px] font-bold flex items-center justify-center`}
                  >
                    {s.n}
                  </span>
                  <div className="bg-white rounded-2xl border border-line p-6 flex-1">
                    <h3 className="text-[18px] font-semibold text-navy-dark mb-2">
                      {s.t}
                    </h3>
                    <p className="text-[14.5px] text-navy-dark/70 leading-relaxed">
                      {s.d}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-navy-dark py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-white/70 uppercase mb-3">
              What we track
            </p>
            <h2 className="text-4xl sm:text-[2.9rem] font-semibold text-white tracking-[-0.03em] leading-[1.08]">
              Your buyers' actual questions
            </h2>
          </div>
          <div className="space-y-2.5">
            {[
              ["best {category} for small teams", "comparison intent"],
              [
                "who should I hire for {service} in {city}",
                "local buying intent",
              ],
              ["{competitor} alternatives", "switching intent"],
              ["is {your brand} any good", "brand due diligence"],
            ].map(([s, a], r) => (
              <motion.div
                key={s}
                className="flex flex-wrap items-center gap-3 rounded-2xl bg-white/[0.05] border border-white/10 px-5 py-4"
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: r * 0.08 }}
              >
                <span className="text-[10px] font-bold text-white/70">
                  Q{r + 1}
                </span>
                <span className="text-[15px] text-white font-medium flex-1">
                  “{s}”
                </span>
                <span className="text-[11px] font-semibold text-white/50 bg-white/[0.06] rounded-full px-3 py-1">
                  {a}
                </span>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-[14px] text-white/55 mt-8 max-w-lg mx-auto leading-relaxed">
            We agree 10–20 of these with you at kickoff and keep the set fixed,
            so month-to-month movement means something.
          </p>
        </div>
      </div>
      <div className="bg-white py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead eyebrow="The craft" center={true}>
            {"Not a name-drop. "}
            <span className="text-navy-dark/65">A sentence.</span>
          </SectionHead>
          <MentionPanel />
        </div>
      </div>
      <div className="bg-mist py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <SectionHead eyebrow="Reporting">
              {"AI visibility has no Search Console. "}
              <span className="text-navy-dark/65">So we built the report.</span>
            </SectionHead>
            <p className="text-[16.5px] text-navy-dark/75 leading-[1.75] max-w-md mb-6">
              Every month we run your buyer queries across all three surfaces,
              log whether you were named and cited, and screenshot the wins.
            </p>
            <ul className="space-y-3">
              {[
                "Fixed query set, so the trend is honest",
                "Screenshots when you appear in a live answer",
                "The sources feeding each answer — your next targets",
              ].map((s) => (
                <li
                  key={s}
                  className="flex gap-3 text-[14.5px] text-navy-dark/75"
                >
                  <Check className="w-4 h-4 text-verified flex-none mt-1" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <CitationCard />
        </div>
      </div>
      <div className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead>
            {"What's "}
            <span className="text-navy-dark/65">included</span>
          </SectionHead>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {e.deliverables.map((s, a) => (
              <motion.div
                key={s.t}
                className={`rounded-2xl p-7 ${a % 4 === 0 ? "bg-lilac" : "border border-line"}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (a % 3) * 0.08 }}
              >
                <h3 className="text-[17px] font-semibold text-navy-dark mb-2">
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
            <span className="text-navy-dark/65">answers</span>
          </SectionHead>
          <FaqList faqs={e.faqs} />
        </div>
      </div>
      <OtherServices current="brand-mentions" />
    </PageLayout>
  );
};

export default BrandMentions;
