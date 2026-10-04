import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Check, Clock, X } from "lucide-react";
import {
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

const HARO_REQUESTS = [
  {
    outlet: "Business daily",
    ask: "Need an HVAC expert on emergency call-out pricing",
    dr: "DR 66",
    mins: 41,
    fit: true,
  },
  {
    outlet: "Trade weekly",
    ask: "Sources: how small firms compete with national directories",
    dr: "DR 58",
    mins: 96,
    fit: true,
  },
  {
    outlet: "Lifestyle blog",
    ask: "Looking for crypto commentary",
    dr: "DR 34",
    mins: 12,
    fit: false,
  },
  {
    outlet: "Regional news",
    ask: "Comment on winter service demand",
    dr: "DR 61",
    mins: 173,
    fit: true,
  },
];

const RequestTicker = () => {
  const [e, s] = useState(0);
  return (
    useEffect(() => {
      const a = setInterval(() => s((r) => r + 1), 1000);
      return () => clearInterval(a);
    }, []),
    (
      <div className="bg-white rounded-3xl border border-line shadow-lift overflow-hidden">
        <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-line bg-linen">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute h-full w-full rounded-full bg-verified opacity-60" />
            <span className="relative rounded-full h-2 w-2 bg-verified" />
          </span>
          <span className="text-[11px] font-semibold tracking-[0.14em] text-navy-dark/70 uppercase">
            Source requests · live
          </span>
          <span className="ml-auto text-[11px] font-semibold text-navy-dark/70">
            3 fits today
          </span>
        </div>
        {HARO_REQUESTS.map((a, r) => {
          const c = Math.max(0, a.mins - Math.floor(e / 4));
          return (
            <motion.div
              key={a.outlet}
              className={`flex items-start gap-3.5 px-5 py-4 ${r ? "border-t border-line" : ""} ${a.fit ? "" : "opacity-45"}`}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: a.fit ? 1 : 0.45, x: 0 }}
              transition={{ duration: 0.45, delay: 0.3 + r * 0.12 }}
            >
              <span
                className={`flex-none w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${a.fit ? "bg-verified/15" : "bg-navy-dark/8"}`}
              >
                {a.fit ? (
                  <Check className="w-3 h-3 text-verified" />
                ) : (
                  <X className="w-3 h-3 text-navy-dark/65" />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="text-[12.5px] font-semibold text-navy-dark">
                    {a.outlet}
                  </span>
                  <span className="text-[9.5px] font-bold text-navy-dark/70 border border-line rounded px-1.5 py-0.5">
                    {a.dr}
                  </span>
                </span>
                <span className="block text-[12.5px] text-navy-dark/65 mt-1 leading-snug">
                  {a.ask}
                </span>
              </span>
              <span
                className={`flex-none inline-flex items-center gap-1 text-[10px] font-bold tabular-nums rounded-full px-2 py-1 ${c < 60 ? "text-gap bg-gap/10" : "text-navy-dark/70 bg-linen"}`}
              >
                <Clock className="w-2.5 h-2.5" />
                {c}m
              </span>
            </motion.div>
          );
        })}
        <p className="px-5 py-3.5 text-[10.5px] text-navy-dark/65 bg-linen/60">
          Requests die in hours. We answer the ones that fit, fast.
        </p>
      </div>
    )
  );
};

const HARO_STEPS = [
  {
    t: "Request matched",
    d: "Filtered against your expertise profile — not sprayed at every query.",
    tint: "bg-blush",
  },
  {
    t: "Draft in your voice",
    d: "Our editor writes it with your data and credentials attached.",
    tint: "bg-butter",
  },
  {
    t: "You approve",
    d: "Nothing is sent until you have read the exact wording.",
    tint: "bg-mint",
  },
  {
    t: "It prints",
    d: "Quoted, usually linked, verified live and logged in your report.",
    tint: "bg-lilac",
  },
];

const HaroQuotes = () => {
  const e = getService("haro-links");
  return (
    <PageLayout>
      <Seo title="HARO & Expert Quotes" description={e.sub} />
      <div className="relative bg-mist overflow-hidden pt-28 pb-20 lg:pt-32">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.05fr] gap-12 items-center">
          <div>
            <SectionLabel>HARO & Expert Placements</SectionLabel>
            <SectionTitle>
              {"Your expertise, "}
              <span className="text-navy-dark/65">quoted everywhere</span>.
            </SectionTitle>
            <SectionLead className="max-w-lg">{e.sub}</SectionLead>
            <HeroActions label="Get me quoted" />
            <RatingRow />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <RequestTicker />
          </motion.div>
        </div>
      </div>
      <div className="bg-white py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead eyebrow="The problem" center={true}>
            {"HARO became "}
            <span className="text-navy-dark/65">a lottery</span>
          </SectionHead>
          <div className="grid sm:grid-cols-2 gap-5">
            <motion.div
              className="rounded-3xl border border-line p-8"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <p className="text-[11px] font-semibold tracking-[0.16em] text-gap uppercase mb-5">
                How most vendors run it
              </p>
              <ul className="space-y-3.5">
                {[
                  "Spray generic quotes at every query",
                  "Bill you for attempts, not placements",
                  "Filler answers editors never print",
                  "You see the wording after it publishes",
                ].map((s) => (
                  <li
                    key={s}
                    className="flex gap-3 text-[14.5px] text-navy-dark/70"
                  >
                    <X className="w-4 h-4 text-gap flex-none mt-0.5" />
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              className="rounded-3xl bg-blush p-8"
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <p className="text-[11px] font-semibold tracking-[0.16em] text-navy-dark/70 uppercase mb-5">
                How we run it
              </p>
              <ul className="space-y-3.5">
                {[
                  "Matched to your real expertise profile",
                  "Scoped on delivered placements",
                  "Specific data journalists actually print",
                  "You approve every word before it is sent",
                ].map((s) => (
                  <li
                    key={s}
                    className="flex gap-3 text-[14.5px] text-navy-dark/85"
                  >
                    <Check className="w-4 h-4 text-navy-dark flex-none mt-0.5" />
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="bg-mist py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <SectionHead eyebrow="Step zero">
              We build your expertise profile first
            </SectionHead>
            <p className="text-[16.5px] text-navy-dark/75 leading-[1.75] max-w-md mb-6">
              Speed only wins if there is something ready to send. Before any
              pitching starts, we document what you can credibly speak to — and
              the numbers only you have.
            </p>
            <ul className="space-y-3">
              {[
                "Credentials and licences worth citing",
                "Proprietary data from your own operations",
                "Three angles you can defend in any interview",
                "Boundaries — topics we will never pitch you for",
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
          <motion.div
            className="bg-white rounded-3xl border border-line p-7 shadow-soft"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] font-semibold tracking-[0.16em] text-navy-dark/70 uppercase mb-5">
              Expertise profile · sample
            </p>
            {[
              [
                "Speaks to",
                "Emergency response, dispatch logistics, licensing",
              ],
              [
                "Owns data on",
                "12,000 annual call-outs, response-time benchmarks",
              ],
              ["Credential", "Licensed contractor, 14 years in the field"],
              ["Never pitch", "Crypto, politics, anything outside the trade"],
            ].map(([s, a], r) => (
              <div
                key={s}
                className={`py-3.5 ${r ? "border-t border-line" : ""}`}
              >
                <p className="text-[11px] font-semibold tracking-[0.12em] text-navy-dark/65 uppercase mb-1">
                  {s}
                </p>
                <p className="text-[14px] text-navy-dark/80">{a}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="bg-linen py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead eyebrow="The workflow" center={true}>
            {"Request to print, "}
            <span className="text-navy-dark/65">with your sign-off</span>
          </SectionHead>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HARO_STEPS.map((s, a) => (
              <motion.div
                key={s.t}
                className={`${s.tint} rounded-2xl p-7 min-h-[190px] flex flex-col`}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: a * 0.09 }}
              >
                <span className="text-[11px] font-bold tracking-[0.16em] text-navy-dark/70 mb-4">
                  0{a + 1}
                </span>
                <h3 className="text-[18px] font-semibold text-navy-dark mb-2.5">
                  {s.t}
                </h3>
                <p className="text-[13.5px] text-navy-dark/70 leading-relaxed mt-auto">
                  {s.d}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead eyebrow="The result" center={true}>
            {"What it looks like "}
            <span className="text-navy-dark/65">in print</span>
          </SectionHead>
          <motion.div
            className="bg-mist rounded-3xl border border-line p-8 sm:p-12"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[13px] font-semibold text-navy-dark/70 mb-1">
              The Industry Journal
            </p>
            <p className="text-[11px] text-navy-dark/65 mb-7">
              Industry analysis · 1,400 words
            </p>
            <span className="block h-1.5 rounded-full bg-navy-dark/8 w-full mb-2" />
            <span className="block h-1.5 rounded-full bg-navy-dark/8 w-11/12 mb-7" />
            <p className="text-[19px] sm:text-[21px] text-navy-dark/85 leading-[1.65] mb-4">
              “
              <span className="bg-butter rounded px-1.5 font-semibold">
                Response time beats price in emergencies — 71% of callers book
                the first company that answers
              </span>
              {",\u201d says the founder of "}
              <span className="font-semibold underline decoration-navy-dark/25 underline-offset-4">
                YourBrand
              </span>
              .
            </p>
            <span className="block h-1.5 rounded-full bg-navy-dark/8 w-10/12 mb-2" />
            <span className="block h-1.5 rounded-full bg-navy-dark/8 w-9/12 mb-7" />
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-verified bg-verified/10 border border-verified/25 rounded-full px-2.5 py-1">
                <Check className="w-2.5 h-2.5" />
                {" QUOTED + LINKED"}
              </span>
              <span className="text-[10px] font-bold tracking-wider text-navy-dark/70 bg-white border border-line rounded-full px-2.5 py-1">
                DR 66
              </span>
              <span className="text-[10px] font-bold tracking-wider text-navy-dark/70 bg-white border border-line rounded-full px-2.5 py-1">
                INDEXED · 4 DAYS
              </span>
            </div>
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
              <p className="text-[12.5px] text-white/55 mt-2.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-mist py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead>
            {"What's "}
            <span className="text-navy-dark/65">included</span>
          </SectionHead>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
            {e.deliverables.map((s, a) => (
              <motion.div
                key={s.t}
                className="flex gap-4 pb-8 border-b border-line"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: (a % 2) * 0.08 }}
              >
                <span className="text-[13px] font-bold text-navy-dark/30 pt-0.5">
                  0{a + 1}
                </span>
                <div>
                  <h3 className="text-[17px] font-semibold text-navy-dark mb-1.5">
                    {s.t}
                  </h3>
                  <p className="text-[14px] text-navy-dark/70 leading-relaxed">
                    {s.d}
                  </p>
                </div>
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
      <OtherServices current="haro-links" />
    </PageLayout>
  );
};

export default HaroQuotes;
