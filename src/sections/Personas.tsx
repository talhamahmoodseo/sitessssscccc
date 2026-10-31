import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Accent from "@/components/Accent";
import { Annotation } from "@/components/brand";
import { COLOURS, GrainBlob } from "@/components/Grain";
import {
  FigAgency,
  FigFounder,
  FigInspector,
  FigLocal,
  FigShopper,
} from "@/components/PersonaFigures";

/** Who we work with. Each audience gets one promise, two specifics and the
 *  services that usually fit them, so the section shows the agency's range. */
const PERSONAS = [
  {
    id: "agencies",
    tab: "Agencies",
    Fig: FigAgency,
    title: "White-label authority, under your brand",
    lede: "Add links, PR and brand mentions to what you sell, without hiring a team to deliver them.",
    services: ["Link building", "Brand mentions", "White-label reports"],
    cta: { label: "How we work with agencies", to: "/case-studies/agency-partner" },
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
    Fig: FigFounder,
    title: "Show up when buyers compare tools",
    lede: "On Google for your category, and in the AI answers buyers read before they ever book a demo.",
    services: ["Link building", "Brand mentions", "Digital PR"],
    cta: {
      label: "See the Ocuco case study",
      to: "/case-studies/ocuco",
    },
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
    Fig: FigInspector,
    title: "A link partner you don't have to babysit",
    lede: "Clean placements, clear reporting, and nothing to fix when you audit our work.",
    services: ["Link building", "Expert quotes"],
    cta: { label: "Explore link building", to: "/services/link-building" },
    points: [
      {
        h: "Links that survive an audit",
        d: "Real editorial sites with real audiences, and nothing you would be uncomfortable showing a client.",
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
    Fig: FigShopper,
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
        d: "Coverage in every country you sell in, for brands that sell in more than one.",
      },
    ],
  },
  {
    id: "local",
    tab: "Local Services",
    Fig: FigLocal,
    title: "Win the searches that make the phone ring",
    lede: "Beat the national directories on Google, and get named when people ask AI for someone local.",
    services: ["Link building", "Digital PR", "Brand mentions"],
    cta: {
      label: "Link building for home services",
      to: "/industries/home-services",
    },
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

/** Small pencil sparks either side of the accent word, like a margin doodle. */
const Sparks = ({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) => (
  <svg
    viewBox="0 0 24 24"
    className={`pointer-events-none absolute h-6 w-6 text-navy-dark/70 ${flip ? "-scale-x-100" : ""} ${className}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M4 14 L9 12" />
    <path d="M7 5 L11 9" />
    <path d="M15 2 L15.5 7.5" />
  </svg>
);

const Personas = () => {
  const [active, setActive] = useState(0);
  const p = PERSONAS[active];

  return (
    <div className="bg-mist py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/70">
            Who it's for
          </p>
          <h2 className="text-[2.5rem] font-medium leading-[1.02] tracking-[-0.045em] text-navy-dark sm:text-[3.6rem]">
            Built for the teams
            <br />
            that need{" "}
            <span className="relative inline-block">
              <Sparks className="-left-7 top-1" />
              <Accent className="italic">authority</Accent>
              <Sparks flip className="-right-7 top-1" />
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-[17px] leading-relaxed text-navy-dark/75">
            Five kinds of teams we work with most. Pick yours to see where we'd
            start.
          </p>
        </motion.div>

        <div className="relative mt-14 rounded-[28px] bg-white/70 p-3 ring-1 ring-navy-dark/[0.06] sm:p-4">
          <Annotation className="-left-36 -top-4 hidden w-[130px] xl:block">
            pick your corner
          </Annotation>
          <div
            role="tablist"
            aria-label="Who we work with"
            className="-mx-3 flex snap-x gap-3 overflow-x-auto px-3 pb-1 sm:mx-0 sm:grid sm:grid-cols-5 sm:overflow-visible sm:px-0 sm:pb-0"
          >
            {PERSONAS.map((item, i) => {
              const on = i === active;
              return (
                <button
                  key={item.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(i)}
                  className={`group relative w-[148px] flex-none snap-start overflow-hidden rounded-[18px] px-3 pb-2 pt-4 text-center ring-1 transition-colors duration-300 sm:w-auto ${
                    on
                      ? "bg-white ring-navy-dark/15"
                      : "bg-[#F3F2EF] ring-navy-dark/[0.05] hover:bg-white/80"
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
                        className="-bottom-20 left-1/2 h-36 w-52 -translate-x-1/2 opacity-90"
                        drift={6}
                      />
                      <GrainBlob
                        color={COLOURS.butter}
                        className="-bottom-24 left-[12%] h-32 w-32"
                        drift={5}
                      />
                    </motion.span>
                  )}
                  <span
                    className={`relative block text-[14.5px] font-medium transition-colors duration-300 ${
                      on ? "text-navy-dark" : "text-navy-dark/70"
                    }`}
                  >
                    {item.tab}
                  </span>
                  <span className="relative mt-2 block h-[168px]">
                    <item.Fig
                      className={`mx-auto h-full w-auto transition-colors duration-500 ${
                        on
                          ? "text-navy-dark"
                          : "text-navy-dark/40 group-hover:text-navy-dark/65"
                      }`}
                    />
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-3 border-t border-navy-dark/[0.07] sm:mt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={p.id}
                className="grid gap-10 px-3 pb-6 pt-9 sm:px-8 sm:pt-12 lg:grid-cols-2 lg:gap-16"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              >
                <div>
                  <h3 className="text-[1.9rem] font-medium leading-[1.08] tracking-[-0.035em] text-navy-dark sm:text-[2.3rem]">
                    {p.title}
                  </h3>
                  <p className="mt-4 max-w-md text-[16px] leading-relaxed text-navy-dark/75">
                    {p.lede}
                  </p>
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
                    className="group mt-8 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[14px] font-semibold text-navy-dark ring-1 ring-navy-dark/25 transition-shadow duration-300 hover:ring-navy-dark/60"
                  >
                    {p.cta.label}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>

                <div className="divide-y divide-navy-dark/[0.08]">
                  {p.points.map((pt) => (
                    <div key={pt.h} className="py-6 first:pt-0 last:pb-0">
                      <h4 className="text-[19px] font-medium tracking-[-0.02em] text-navy-dark">
                        {pt.h}
                      </h4>
                      <p className="mt-2 text-[15px] leading-relaxed text-navy-dark/75">
                        {pt.d}
                      </p>
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
