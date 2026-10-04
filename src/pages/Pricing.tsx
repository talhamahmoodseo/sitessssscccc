import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check, Minus } from "lucide-react";
import { FigSpreadsheet } from "@/components/LineArt";
import { FaqList } from "@/components/AgencyBlocks";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";
import { openBooking } from "@/lib/booking";

const PRICING_TIERS = [
  {
    id: "starter",
    name: "Starter",
    tag: "Testing the water",
    price: 997,
    unit: "/month",
    blurb: "For a single site that needs consistent, safe authority.",
    cta: "Start with Starter",
    featured: false,
    accent: "bg-white",
    includes: [
      "4–6 editorial placements a month",
      "DR 40–60 publications",
      "Every domain approved by you",
      "Indexation checks + 90-day replacement",
      "Monthly report with live URLs",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tag: "Most chosen",
    price: 2497,
    unit: "/month",
    blurb: "Links, digital PR and AI mentions running as one campaign.",
    cta: "Start with Growth",
    featured: true,
    accent: "bg-butter",
    includes: [
      "10–14 placements a month",
      "DR 50–75 publications",
      "HARO expert quotes included",
      "Brand mentions for AI answers",
      "AI citation tracking, 3 surfaces",
      "Anchor & target strategy",
      "Senior strategist on call",
    ],
  },
  {
    id: "authority",
    name: "Authority",
    tag: "Category leaders",
    price: 4997,
    unit: "/month",
    blurb: "Aggressive pace for competitive niches and multi-site brands.",
    cta: "Talk about Authority",
    featured: false,
    accent: "bg-white",
    includes: [
      "20+ placements a month",
      "DR 60–80, incl. Gulf business press",
      "Full digital PR programme",
      "Multi-site / multi-market support",
      "Competitor gap monitoring",
      "Slack channel + weekly check-ins",
    ],
  },
];

const COMPARE_ROWS = [
  { label: "Editorial placements / month", s: "4–6", g: "10–14", a: "20+" },
  { label: "Authority range", s: "DR 40–60", g: "DR 50–75", a: "DR 60–80" },
  { label: "Domain approval before placement", s: true, g: true, a: true },
  { label: "Indexation verification", s: true, g: true, a: true },
  { label: "90-day replacement guarantee", s: true, g: true, a: true },
  { label: "HARO / expert quotes", s: false, g: true, a: true },
  { label: "Brand mentions for AI answers", s: false, g: true, a: true },
  {
    label: "AI citation tracking",
    s: false,
    g: "3 surfaces",
    a: "3 surfaces + screenshots",
  },
  { label: "Gulf & international press", s: false, g: "On request", a: true },
  { label: "Competitor gap monitoring", s: false, g: false, a: true },
  { label: "White-label reporting", s: "On request", g: true, a: true },
  { label: "Response time", s: "48 hours", g: "24 hours", a: "Same day" },
];

const PRICING_FAQS = [
  {
    q: "Is there a contract or lock-in?",
    a: "No. Everything is month to month. Authority work compounds, so most clients stay six months or longer — but that should be because the reports justify it, not because a contract traps them.",
  },
  {
    q: "What if I need something between two plans?",
    a: "Then we scope it. These are starting points, not boxes. Tell us the target pages, the competition and the pace you want, and you get a quote against that.",
  },
  {
    q: "Do you charge per link or per month?",
    a: "Per month, with a placement range rather than a hard count — because a DR 72 feature and a DR 45 guest post are not the same unit of work. The range is what we commit to; the report shows what landed.",
  },
  {
    q: "What is not included?",
    a: "On-page SEO, technical audits, content for your own site, and paid media. We do off-page authority — links, press, and mentions — and we would rather refer you to a specialist than pretend otherwise.",
  },
  {
    q: "Do you work white-label for agencies?",
    a: "Yes, on Growth and Authority as standard, and on Starter by request. Same vetting, your branding on every deliverable.",
  },
  {
    q: "How fast can we start?",
    a: "The audit and first prospect list usually land within a week of kickoff. Placements begin as soon as you approve the first domains.",
  },
];

const FeatureCell = ({ v }) =>
  v === true ? (
    <Check className="w-4 h-4 text-verified mx-auto" />
  ) : v === false ? (
    <Minus className="w-4 h-4 text-navy-dark/25 mx-auto" />
  ) : (
    <span className="text-[13px] text-navy-dark/75">{v}</span>
  );

const Pricing = () => {
  const [e, s] = useState(false),
    a = (r) => (e ? Math.round(r * 0.85) : r);
  return (
    <PageLayout>
      <Seo
        title="Pricing"
        description="Transparent monthly pricing for editorial link building, digital PR, HARO placements and AI brand mentions. No lock-in, no contact-sales wall."
      />
      <div className="bg-mist pt-32 pb-16 lg:pt-40 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="text-[2.6rem] sm:text-5xl lg:text-[3.6rem] font-semibold text-navy-dark leading-[1.03] tracking-[-0.035em] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {"Plans with "}
            <span className="text-navy-dark/65">actual prices</span>
            {" on them."}
          </motion.h1>
          <motion.p
            className="text-[17px] text-navy-dark/70 leading-relaxed max-w-xl mx-auto mb-9"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            No “contact sales” wall, no annual lock-in. Pick a pace, approve
            every site, and stop whenever the reports stop earning it.
          </motion.p>
          <motion.div
            className="inline-flex items-center gap-3 bg-white border border-line rounded-full p-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {["Monthly", "Pay 6 months −15%"].map((r, c) => {
              const u = (c === 1) === e;
              return (
                <button
                  key={r}
                  onClick={() => s(c === 1)}
                  className={`relative rounded-full px-5 py-2 text-[13px] font-semibold transition-colors duration-300 ${u ? "text-white" : "text-navy-dark/70 hover:text-navy-dark"}`}
                >
                  {u && (
                    <motion.span
                      layoutId="price-pill"
                      className="absolute inset-0 bg-navy-dark rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 32,
                      }}
                    />
                  )}
                  <span className="relative">{r}</span>
                </button>
              );
            })}
          </motion.div>
        </div>
      </div>
      <div className="bg-mist pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-5 items-start">
          {PRICING_TIERS.map((r, c) => (
            <motion.div
              key={r.id}
              className={`${r.accent} rounded-3xl border p-8 ${r.featured ? "border-navy-dark/15 lg:-mt-4 lg:pb-10 shadow-lift" : "border-line"}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: c * 0.08 }}
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[19px] font-semibold text-navy-dark">
                  {r.name}
                </h2>
                <span
                  className={`text-[10px] font-bold tracking-[0.12em] uppercase rounded-full px-2.5 py-1 ${r.featured ? "bg-navy-dark text-white" : "bg-linen text-navy-dark/70"}`}
                >
                  {r.tag}
                </span>
              </div>
              <p className="flex items-baseline gap-1 mb-3">
                <span className="text-[3rem] font-semibold text-navy-dark tracking-[-0.03em] leading-none">
                  ${a(r.price).toLocaleString()}
                </span>
                <span className="text-[14px] text-navy-dark/70">{r.unit}</span>
              </p>
              <p className="text-[14px] text-navy-dark/70 leading-relaxed mb-7 min-h-[42px]">
                {r.blurb}
              </p>
              <button
                onClick={openBooking}
                className={`w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-[14px] font-semibold transition-colors duration-300 mb-7 ${r.featured ? "bg-navy-dark hover:bg-black text-white" : "border border-navy-dark/20 text-navy-dark hover:border-navy-dark"}`}
              >
                {r.cta}
                <ArrowRight className="w-4 h-4" />
              </button>
              <ul className="space-y-3">
                {r.includes.map((u) => (
                  <li
                    key={u}
                    className="flex gap-2.5 text-[13.5px] text-navy-dark/80 leading-relaxed"
                  >
                    <Check className="w-4 h-4 text-verified flex-none mt-0.5" />
                    {u}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-[11px] font-semibold tracking-[0.14em] text-navy-dark/65 uppercase mt-8">
          Placeholder rates · confirm your real pricing before launch
        </p>
      </div>
      <div className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[2rem] sm:text-[2.6rem] font-semibold leading-[1.06] tracking-[-0.035em] text-navy-dark mb-10 text-center">
            {"Compare the "}
            <span className="text-navy-dark/65">detail</span>
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr className="border-b border-line">
                  <th className="text-left py-4 text-[12px] font-semibold tracking-[0.12em] text-navy-dark/70 uppercase">
                    What you get
                  </th>
                  {PRICING_TIERS.map((r) => (
                    <th
                      key={r.id}
                      className="py-4 text-center text-[13.5px] font-semibold text-navy-dark w-[150px]"
                    >
                      {r.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((r) => (
                  <tr
                    key={r.label}
                    className="border-b border-line last:border-0"
                  >
                    <td className="py-3.5 text-[13.5px] text-navy-dark/80 pr-4">
                      {r.label}
                    </td>
                    <td className="py-3.5 text-center">
                      <FeatureCell v={r.s} />
                    </td>
                    <td className="py-3.5 text-center bg-linen/50">
                      <FeatureCell v={r.g} />
                    </td>
                    <td className="py-3.5 text-center">
                      <FeatureCell v={r.a} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="relative bg-mist py-24">
        <div className="hidden xl:block absolute left-10 top-32 text-navy-dark/70">
          <FigSpreadsheet className="w-24 h-auto" />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[2rem] sm:text-[2.6rem] font-semibold leading-[1.06] tracking-[-0.035em] text-navy-dark mb-10 text-center">
            {"Pricing "}
            <span className="text-navy-dark/65">questions</span>
          </h2>
          <FaqList faqs={PRICING_FAQS} />
        </div>
      </div>
    </PageLayout>
  );
};

export default Pricing;
