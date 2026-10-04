import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import {
  FigAiAnswers,
  FigCategoryClimb,
  FigCleanAudit,
  FigLocalMap,
  FigWhiteLabel,
} from "@/components/LineArt";

const PERSONAS = [
  {
    id: "agencies",
    tab: "Agencies",
    Fig: FigWhiteLabel,
    title: "White-label authority, on your brand",
    href: "/services/link-building",
    points: [
      {
        h: "Fulfilment you can resell",
        d: "Vetted placements delivered under your logo, with reports your client can read without you translating them.",
      },
      {
        h: "No inventory surprises",
        d: "Every domain disclosed before placement, so you never defend a link you have not seen.",
      },
    ],
  },
  {
    id: "saas",
    tab: "SaaS Founders",
    Fig: FigAiAnswers,
    title: "Get named when buyers ask AI",
    href: "/services/brand-mentions",
    points: [
      {
        h: "Mentions on cited sources",
        d: "We place contextual references on the exact publications ChatGPT, Claude and AI Overviews already quote.",
      },
      {
        h: "Tracked every month",
        d: "Four answer surfaces checked and screenshotted, so the trend is visible instead of theoretical.",
      },
    ],
  },
  {
    id: "seo",
    tab: "SEO Leads",
    Fig: FigCleanAudit,
    title: "Links that survive an audit",
    href: "/services/link-building",
    points: [
      {
        h: "Real editorial, real traffic",
        d: "DR 40–75 publications with organic audiences — no PBNs, no high-DR shells.",
      },
      {
        h: "Indexation is the deliverable",
        d: "96% indexation over the last twelve months, with free replacement inside 90 days.",
      },
    ],
  },
  {
    id: "ecom",
    tab: "E-commerce",
    Fig: FigCategoryClimb,
    title: "Category pages that climb",
    href: "/case-studies",
    points: [
      {
        h: "Money pages first",
        d: "Anchor and target planning built around the pages that actually convert, not the blog.",
      },
      {
        h: "Seasonal pacing",
        d: "Placement pace mapped to your buying season so authority lands before demand does.",
      },
    ],
  },
  {
    id: "local",
    tab: "Local Services",
    Fig: FigLocalMap,
    title: "Own the map and the answer",
    href: "/services/digital-pr",
    points: [
      {
        h: "Local press that counts",
        d: "Regional publications and roundups that feed both the local pack and AI recommendations.",
      },
      {
        h: "Proof for the phone test",
        d: "Clients judge on calls, not dashboards — we report placements against ranking movement.",
      },
    ],
  },
];

const Personas = () => {
  const [e, s] = useState(0),
    a = PERSONAS[e];
  return (
    <div className="bg-linen py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl sm:text-5xl font-semibold text-navy-dark text-center tracking-[-0.03em] leading-[1.06] mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          {"Built to "}
          <span className="text-navy-dark/65">power</span>
          <br />
          the people who need authority
        </motion.h2>
        <div className="bg-white rounded-3xl border border-line p-4 sm:p-6">
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {PERSONAS.map((r, c) => {
              const u = c === e;
              return (
                <button
                  key={r.id}
                  onClick={() => s(c)}
                  className={`relative rounded-2xl border p-3 pt-2.5 text-left overflow-hidden transition-colors duration-300 ${u ? "border-navy-dark/25 bg-white" : "border-line bg-white hover:border-navy-dark/15"}`}
                >
                  <span
                    className={`block text-[11.5px] font-semibold mb-1 transition-colors duration-300 ${u ? "text-navy-dark" : "text-navy-dark/65"}`}
                  >
                    {r.tab}
                  </span>
                  <span
                    className={`block transition-opacity duration-300 ${u ? "text-navy-dark opacity-100" : "text-navy-dark opacity-35"}`}
                  >
                    <r.Fig className="w-full h-24" />
                  </span>
                  {u && (
                    <motion.span
                      layoutId="persona-glow"
                      className="absolute inset-x-2 bottom-0 h-10 rounded-full blur-xl"
                      style={{
                        background:
                          "linear-gradient(90deg, rgb(var(--lilac)), rgb(var(--blush)), rgb(var(--butter)))",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
          <motion.div
            key={a.id}
            className="grid lg:grid-cols-2 gap-10 lg:gap-16 px-3 sm:px-6 pt-10 pb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div>
              <h3 className="text-2xl sm:text-[1.9rem] font-semibold text-navy-dark leading-[1.15] tracking-[-0.02em] mb-6">
                {a.title}
              </h3>
              <a
                href={a.href}
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-[13.5px] font-semibold text-navy-dark hover:border-navy-dark transition-colors duration-300"
              >
                Explore this
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="space-y-6">
              {a.points.map((r, c) => (
                <div
                  key={r.h}
                  className={c === 0 ? "pb-6 border-b border-line" : ""}
                >
                  <p className="text-[15.5px] font-semibold text-navy-dark mb-1.5">
                    {r.h}
                  </p>
                  <p className="text-[14px] text-navy-dark/70 leading-relaxed">
                    {r.d}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Personas;
