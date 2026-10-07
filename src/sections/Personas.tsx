import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Annotation, SectionTitle } from "@/components/brand";
import { GLOW_SETS, GrainGlow } from "@/components/GrainGlow";
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
        h: "Senior delivery on your cycle",
        d: "One strategist assigned across your accounts, working to your reporting dates, so you can promise a month and hold it. Roughly a third of our work runs white-label.",
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
        d: "DR 40–75 publications with verified organic audiences, a clean outbound profile and editors who run a genuine review process.",
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
  const [active, setActive] = useState(0);
  const p = PERSONAS[active];

  return (
    <div className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <Annotation className="-top-2 left-0 hidden w-[140px] xl:block">
            pick your corner
          </Annotation>
          <SectionTitle align="center" eyebrow="Who it's for">
            Built for the people who need authority
          </SectionTitle>
        </div>

        <div className="rounded-[2rem] bg-white/70 p-3 shadow-deep sm:p-4">
          {/* persona selector — each card carries its own line-art figure */}
          <div
            role="tablist"
            aria-label="Who we work with"
            className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5"
          >
            {PERSONAS.map((item, i) => {
              const on = i === active;
              return (
                <button
                  key={item.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(i)}
                  className={`group relative overflow-hidden rounded-2xl px-3 pb-3 pt-4 text-center transition-all duration-300 ${
                    on
                      ? "bg-white shadow-lift ring-1 ring-navy-dark/10"
                      : "bg-white/55 hover:bg-white"
                  }`}
                >
                  <span
                    className={`block text-[13px] font-semibold transition-colors duration-300 ${
                      on ? "text-navy-dark" : "text-navy-dark/70"
                    }`}
                  >
                    {item.tab}
                  </span>

                  <span className="relative mt-3 block h-[104px]">
                    {/* the reference's grainy multi-hue bloom: three colours
                        mixed, displaced and grained, and a different mix for
                        every tab so moving across the strip changes the colour */}
                    <GrainGlow
                      hues={GLOW_SETS[i % GLOW_SETS.length]}
                      seed={i + 2}
                      show={on}
                      className="pointer-events-none absolute -inset-x-2 -bottom-3 -top-1 h-[120%] w-[116%] -translate-x-[7%]"
                    />
                    <item.Fig
                      className={`relative mx-auto h-full w-auto transition-all duration-500 ${
                        on
                          ? "text-navy-dark/80"
                          : "text-navy-dark/35 group-hover:text-navy-dark/55"
                      }`}
                    />
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-3 border-t border-navy-dark/15 pt-8 sm:mt-4 sm:pt-10">
            <motion.div
              key={p.id}
              className="grid gap-10 px-2 pb-4 sm:px-4 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            >
              <div>
                <h3 className="text-[1.9rem] font-semibold leading-[1.08] tracking-[-0.03em] text-navy-dark sm:text-[2.2rem]">
                  {p.title}
                </h3>
                <Link
                  to={p.href}
                  className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-[13.5px] font-semibold text-navy-dark shadow-soft transition-shadow duration-300 hover:shadow-lift"
                >
                  Explore {p.tab.toLowerCase()} solutions
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="divide-y divide-navy-dark/15">
                {p.points.map((pt) => (
                  <div key={pt.h} className="py-5 first:pt-0 last:pb-0">
                    <h4 className="text-[16.5px] font-semibold text-navy-dark">
                      {pt.h}
                    </h4>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-navy-dark/65">
                      {pt.d}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personas;
