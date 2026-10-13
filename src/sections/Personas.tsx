import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Annotation, SectionTitle } from "@/components/brand";
import { COLOURS, GrainBlob } from "@/components/Grain";
import {
  FigAiAnswers,
  FigCategoryClimb,
  FigCleanAudit,
  FigLocalMap,
  FigWhiteLabel,
} from "@/components/LineArt";

/** Who we work with. Each audience gets one promise, two specifics and the
 *  services that usually fit them, so the section shows the agency's range. */
const PERSONAS = [
  {
    id: "agencies",
    tab: "Agencies",
    Fig: FigWhiteLabel,
    title: "White-label authority, under your brand",
    lede: "Add links, PR and brand mentions to what you sell, without hiring a team to deliver them.",
    services: ["Link building", "Brand mentions", "White-label reports"],
    cta: { label: "Talk to us about white label", to: "/contact" },
    points: [
      {
        h: "Fulfilment you can resell",
        d: "Vetted placements delivered under your logo, with reports your client can read without you translating them.",
      },
      {
        h: "Nothing awkward in a client audit",
        d: "Every publication is checked by hand before we use it, so you never have to defend a placement.",
      },
    ],
  },
  {
    id: "saas",
    tab: "SaaS Founders",
    Fig: FigAiAnswers,
    title: "Show up when buyers compare tools",
    lede: "On Google for your category, and in the AI answers buyers read before they ever book a demo.",
    services: ["Link building", "Brand mentions", "Digital PR"],
    cta: { label: "See a SaaS case study", to: "/case-studies/b2b-saas-ai-visibility" },
    points: [
      {
        h: "Category pages that climb",
        d: "Links aimed at the pages already close to page one, not just your homepage.",
      },
      {
        h: "Named in AI comparisons",
        d: "Mentions on the publications AI tools quote when someone asks for the best tool in your space.",
      },
    ],
  },
  {
    id: "seo",
    tab: "SEO Leads",
    Fig: FigCleanAudit,
    title: "A link partner you don't have to babysit",
    lede: "Clean placements, honest reporting, and no surprises when you check our work.",
    services: ["Link building", "Expert quotes"],
    cta: { label: "Explore link building", to: "/services/link-building" },
    points: [
      {
        h: "Links that survive an audit",
        d: "Real editorial sites with organic audiences. No PBNs, no high-DR shells with nobody reading them.",
      },
      {
        h: "Reports you can forward",
        d: "Every link, metric, anchor and indexation status in one sheet, every month.",
      },
    ],
  },
  {
    id: "ecom",
    tab: "E-commerce",
    Fig: FigCategoryClimb,
    title: "Rank the category pages that actually sell",
    lede: "Authority aimed at the pages that convert, timed so it lands before your buying season does.",
    services: ["Link building", "Digital PR"],
    cta: { label: "Explore digital PR", to: "/services/digital-pr" },
    points: [
      {
        h: "Money pages first",
        d: "Anchor and target planning built around category and collection pages, not the blog.",
      },
      {
        h: "Press across markets",
        d: "UK, US and Gulf coverage for brands that sell in more than one country.",
      },
    ],
  },
  {
    id: "local",
    tab: "Local Services",
    Fig: FigLocalMap,
    title: "Win the searches that make the phone ring",
    lede: "Beat the national directories on Google, and get named when people ask AI for someone local.",
    services: ["Link building", "Digital PR", "Brand mentions"],
    cta: { label: "See a local case study", to: "/case-studies/home-services-local-pack" },
    points: [
      {
        h: "Local press that counts",
        d: "Regional publications and roundups that feed both the map pack and AI recommendations.",
      },
      {
        h: "Measured on enquiries",
        d: "We report placements against rankings and the calls they bring in, not just a link count.",
      },
    ],
  },
];

const Personas = () => {
  const [active, setActive] = useState(0);
  const p = PERSONAS[active];

  return (
    <div className="bg-mist py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <Annotation className="-top-2 left-0 hidden w-[140px] xl:block">pick your corner</Annotation>
          <SectionTitle
            align="center"
            eyebrow="Who it's for"
            sub="Five kinds of teams we work with most. Pick yours and see what we'd focus on."
          >
            Built for the people who need authority
          </SectionTitle>
        </div>

        <div className="rounded-[2rem] bg-white/70 p-3 ring-1 ring-navy-dark/[0.06] sm:p-4">
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
                    on ? "bg-white ring-1 ring-navy-dark/15" : "bg-transparent hover:bg-white/60"
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="persona-glow"
                      className="absolute inset-0"
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <GrainBlob
                        color={COLOURS.lavender}
                        className="-bottom-24 left-1/2 h-40 w-56 -translate-x-1/2 opacity-90"
                        drift={6}
                      />
                      <GrainBlob color={COLOURS.butter} className="-bottom-28 left-[22%] h-32 w-32" drift={5} />
                    </motion.span>
                  )}
                  <span
                    className={`relative block text-[13px] font-semibold transition-colors duration-300 ${
                      on ? "text-navy-dark" : "text-navy-dark/70"
                    }`}
                  >
                    {item.tab}
                  </span>
                  <span className="relative mt-3 block h-[104px]">
                    <item.Fig
                      className={`relative mx-auto h-full w-auto transition-all duration-500 ${
                        on ? "text-navy-dark" : "text-navy-dark/30 group-hover:text-navy-dark/50"
                      }`}
                    />
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-3 border-t border-navy-dark/[0.07] pt-8 sm:mt-4 sm:pt-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={p.id}
                className="grid gap-10 px-2 pb-4 sm:px-4 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              >
                <div>
                  <h3 className="text-[1.9rem] font-semibold leading-[1.08] tracking-[-0.03em] text-navy-dark sm:text-[2.2rem]">
                    {p.title}
                  </h3>
                  <p className="mt-4 max-w-md text-[16px] leading-relaxed text-navy-dark/75">{p.lede}</p>
                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    <span className="mr-1 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-navy-dark/70">
                      Usually fits
                    </span>
                    {p.services.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-mist px-3 py-1 text-[12.5px] font-medium text-navy-dark ring-1 ring-line"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={p.cta.to}
                    className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-navy-dark px-5 py-3 text-[13.5px] font-semibold text-white transition-colors duration-300 hover:bg-black"
                  >
                    {p.cta.label}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>

                <div className="divide-y divide-navy-dark/[0.08]">
                  {p.points.map((pt) => (
                    <div key={pt.h} className="py-5 first:pt-0 last:pb-0">
                      <h4 className="text-[17px] font-semibold text-navy-dark">{pt.h}</h4>
                      <p className="mt-2 text-[15px] leading-relaxed text-navy-dark/75">{pt.d}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personas;
