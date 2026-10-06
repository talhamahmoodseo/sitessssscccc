import { motion } from "motion/react";
import { ArrowRight, Check, Search } from "lucide-react";
import {
  FigFounder,
  FigNetwork,
  FigSplitSearch,
  FigSpreadsheet,
  FigTrendline,
} from "@/components/LineArt";
import AgencyBlocks from "@/components/AgencyBlocks";
import { Letter, Network, Refusals } from "./about-depth";
import CountUp from "@/components/CountUp";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";
import { asset, openBooking } from "@/lib/booking";

const TIMELINE = [
  {
    year: "2023",
    head: "It started with a spreadsheet and a lot of rejections",
    body: 'One freelancer, two marketplaces, and a fast education in which publications are real and which are shells with good numbers. The lesson that stuck: almost everything sold as a "link" is inventory nobody vetted.',
    Fig: FigSpreadsheet,
    tint: "bg-butter",
  },
  {
    year: "2024",
    head: "We stopped reselling and started building the network",
    body: "Direct relationships with editors and site owners, one at a time. That is the year approval-first became the rule — every domain shown to the client, with metrics, before a single placement. Roughly one in five gets rejected. We kept the rule anyway.",
    Fig: FigNetwork,
    tint: "bg-mint",
  },
  {
    year: "2026",
    head: "Search split in two, so the work did too",
    body: "Buyers now ask ChatGPT and AI Overviews what they used to type into Google. The same publications feed both — so we build links for rankings and mentions for answers, and report them side by side.",
    Fig: FigSplitSearch,
    tint: "bg-lilac",
  },
];

const PRINCIPLES = [
  {
    t: "Show the domain first",
    d: "You see every site, with real metrics, before anything is placed. No mystery inventory.",
  },
  {
    t: "Your veto is the feature",
    d: "Reject anything for any reason. It is your link profile — you should hold the pen.",
  },
  {
    t: "Indexation is the deliverable",
    d: "A link Google never renders is an invoice. We verify, and replace drops free for 90 days.",
  },
  {
    t: "Say the honest number",
    d: "No guaranteed rankings, no guaranteed AI citations. Ranges we can defend, and reports that show the truth.",
  },
];

const TEAM_NOTES = [
  {
    name: "Talha Mahmood",
    role: "Founder & Strategy",
    desc: "Sets campaign strategy and reviews every audit before it ships.",
    photo: asset("/images/talha-avatar.jpg"),
    tint: "",
  },
  {
    role: "Outreach & Partnerships",
    desc: "Maintains the publisher network and keeps the prospect pipeline full.",
    initials: "OP",
    tint: "bg-mint",
  },
  {
    role: "Editorial",
    desc: "Writes to each publication’s standard — accepted first pass.",
    initials: "ED",
    tint: "bg-blush",
  },
  {
    role: "QA & Reporting",
    desc: "Verifies indexation, runs citation checks, ships plain-language reports.",
    initials: "QA",
    tint: "bg-sky",
  },
];

const ABOUT_STATS = [
  { v: 1400, suffix: "+", label: "Links & mentions placed" },
  { v: 800, suffix: "+", label: "Vetted publications" },
  { v: 40, suffix: "+", label: "Brands served" },
  { v: 8, suffix: "+", label: "Countries" },
];

const About = () => (
  <PageLayout>
    <Seo
      title="About"
      description="A founder-led link building and digital PR agency: our own publisher network, approval-first placements, and verified indexation."
    />
    <div className="relative bg-mist overflow-hidden pt-28 pb-20 lg:pt-32">
      <div className="pointer-events-none absolute -left-24 top-10 w-[500px] h-[360px] rounded-full blur-[80px] opacity-55 bg-butter" />
      <div className="pointer-events-none absolute -right-16 top-32 w-[420px] h-[320px] rounded-full blur-[80px] opacity-45 bg-lilac" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.p
          className="text-[11px] font-semibold tracking-[0.18em] text-navy-dark/70 uppercase mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          About us
        </motion.p>
        <motion.h1
          className="text-[2.6rem] sm:text-5xl lg:text-[3.6rem] font-semibold text-navy-dark leading-[1.03] tracking-[-0.035em] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.05 }}
        >
          We place the links other
          <br />
          agencies won't show you.
        </motion.h1>
        <motion.p
          className="text-[18px] text-navy-dark/70 leading-relaxed max-w-xl mx-auto mb-9"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
        >
          A small, founder-led agency building editorial authority for brands
          across the US, UK and Gulf — one approved publication at a time.
        </motion.p>
        <motion.button
          onClick={openBooking}
          className="inline-flex items-center gap-2 bg-navy-dark hover:bg-black text-white rounded-xl px-7 py-3.5 text-[14px] font-semibold transition-colors duration-300"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {"Talk to the founder "}
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
      <motion.div
        className="relative max-w-4xl mx-auto px-4 mt-14 flex justify-center text-navy-dark"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35 }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <FigFounder className="w-28 h-auto" />
        </motion.div>
      </motion.div>
    </div>
    <div className="bg-navy-dark py-24 lg:py-28">
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-[11px] font-semibold tracking-[0.18em] text-white/70 uppercase mb-7">
          Why we exist
        </p>
        <p className="text-[1.7rem] sm:text-[2.3rem] text-white leading-[1.4] tracking-[-0.02em]">
          {
            "Off-page SEO became an industry of mystery inventory and vanity reports. We run it the other way \u2014 "
          }
          <span className="text-butter">disclosed, approved, verified</span>.
        </p>
      </motion.div>
    </div>
    <div className="bg-white py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-end justify-center mb-16">
          <div className="hidden lg:block absolute left-0 bottom-1 text-navy-dark/70">
            <span className="font-hand text-[22px] leading-tight block">
              how we
              <br />
              got here
            </span>
            <FigTrendline className="w-20 h-12 ml-8 -mt-1" />
          </div>
          <motion.h2
            className="text-[2rem] sm:text-[2.6rem] font-semibold leading-[1.06] tracking-[-0.035em] text-navy-dark text-center"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Three years, three
            <br />
            turning points
          </motion.h2>
        </div>
        <div className="space-y-6">
          {TIMELINE.map((e, s) => {
            const a = s % 2 === 1,
              r = (
                <div
                  className={`${e.tint} p-8 flex flex-col justify-between min-h-[230px]`}
                >
                  <span className="text-[13px] font-bold tracking-[0.14em] text-navy-dark/70">
                    {e.year}
                  </span>
                  <span className="text-navy-dark self-center">
                    <e.Fig className="w-24 h-auto" />
                  </span>
                </div>
              ),
              c = (
                <div className="p-8 sm:p-10 flex flex-col justify-center">
                  <h3 className="text-[1.5rem] sm:text-[1.75rem] font-semibold text-navy-dark leading-[1.18] tracking-[-0.02em] mb-4">
                    {e.head}
                  </h3>
                  <p className="text-[16px] text-navy-dark/70 leading-[1.75] max-w-xl">
                    {e.body}
                  </p>
                </div>
              );
            return (
              <motion.article
                key={e.year}
                className={`grid ${a ? "lg:grid-cols-[1fr_0.42fr]" : "lg:grid-cols-[0.42fr_1fr]"} rounded-3xl overflow-hidden border border-line`}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: s * 0.08 }}
              >
                {a ? c : r}
                {a ? r : c}
              </motion.article>
            );
          })}
        </div>
      </div>
    </div>
    <AgencyBlocks label="Our network places clients on publications like" />
    <div className="bg-linen py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-[2rem] sm:text-[2.6rem] font-semibold leading-[1.06] tracking-[-0.035em] text-navy-dark mb-12"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Four rules we
          <br />
          don't break
        </motion.h2>
        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-9">
          {PRINCIPLES.map((e, s) => (
            <motion.div
              key={e.t}
              className="flex gap-4 pb-9 border-b border-navy-dark/10"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (s % 2) * 0.08 }}
            >
              <span className="flex-none w-7 h-7 rounded-full bg-white flex items-center justify-center mt-0.5">
                <Check className="w-3.5 h-3.5 text-verified" />
              </span>
              <div>
                <h3 className="text-[17.5px] font-semibold text-navy-dark mb-1.5">
                  {e.t}
                </h3>
                <p className="text-[14.5px] text-navy-dark/70 leading-relaxed">
                  {e.d}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    <Refusals />
    <Network />
    <div className="bg-white py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-wrap items-end justify-between gap-6 mb-12"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[2rem] sm:text-[2.6rem] font-semibold leading-[1.06] tracking-[-0.035em] text-navy-dark">
            Small team,
            <br />
            senior hands
          </h2>
          <p className="text-[14px] text-navy-dark/70 max-w-xs">
            No account managers between you and the work. Four people, each
            accountable for one part of the pipeline.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TEAM_NOTES.map((e, s) => (
            <motion.div
              key={e.role}
              className="rounded-2xl border border-line overflow-hidden"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: s * 0.08 }}
            >
              <div
                className={`${e.tint || "bg-linen"} aspect-[4/3] flex items-center justify-center`}
              >
                {e.photo ? (
                  <img
                    src={e.photo}
                    alt={e.name}
                    className="w-20 h-20 rounded-full object-cover ring-4 ring-white"
                  />
                ) : (
                  <span className="text-[26px] font-bold text-navy-dark/70">
                    {e.initials}
                  </span>
                )}
              </div>
              <div className="p-6">
                {e.name && (
                  <p className="text-[15.5px] font-semibold text-navy-dark leading-none mb-1.5">
                    {e.name}
                  </p>
                )}
                <p className="text-[11px] font-semibold tracking-[0.14em] text-navy-dark/70 uppercase mb-2.5">
                  {e.role}
                </p>
                <p className="text-[13.5px] text-navy-dark/70 leading-relaxed">
                  {e.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    <div className="bg-mist py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {ABOUT_STATS.map((e, s) => (
          <motion.div
            key={e.label}
            className={`${["bg-butter", "bg-mint", "bg-lilac", "bg-blush"][s]} rounded-2xl p-7`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: s * 0.07 }}
          >
            <p className="text-[2.4rem] font-semibold text-navy-dark tracking-[-0.03em] leading-none">
              <CountUp to={e.v} suffix={e.suffix} />
            </p>
            <p className="text-[12.5px] text-navy-dark/70 mt-2.5">{e.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
    <Letter />
  </PageLayout>
);

export default About;
