import { useState, type ComponentType } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Clock3, Link2, Quote } from "lucide-react";
import Accent from "@/components/Accent";
import { ChatGptMark, PerplexityMark } from "@/components/PlatformMarks";
import Clipping from "@/pages/services/digital-pr/Clipping";
import { CARD, GlowPanel } from "@/pages/services/kit";

/**
 * The four core services, one at a time. Pick a service on the left; the
 * panel on the right shows the thing that service actually produces (a
 * placement, a clipping, an AI answer, a quote), in the same colours its own
 * page uses. On small screens the artefact opens under the chosen service.
 * The artefacts are examples of the format.
 */

/* ------------------------------ the artefacts ------------------------------ */

const Placement = () => (
  <div className="relative mx-auto w-full max-w-[380px]">
    <div className={`${CARD} p-5`}>
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-dark text-[12px] font-bold text-white">
          G
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13.5px] font-semibold text-navy-dark">
            growthdesk•••.com
          </span>
          <span className="block text-[11.5px] text-navy-dark/70">
            Sales &amp; marketing publication
          </span>
        </span>
        <span className="rounded-full bg-linen px-2.5 py-1 text-[11px] font-semibold text-navy-dark">
          DR 62
        </span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        {[
          ["2.1K", "keywords"],
          ["71%", "US & UK"],
          ["Rising", "12-mo trend"],
        ].map(([v, l]) => (
          <div key={l} className="rounded-xl bg-mist px-2 py-2.5">
            <p className="text-[14px] font-semibold text-navy-dark">{v}</p>
            <p className="text-[10.5px] text-navy-dark/70">{l}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[13.5px] font-semibold leading-snug text-navy-dark">
        Why small sales teams are switching to lighter CRMs
      </p>
      <p className="mt-1.5 text-[12.5px] leading-relaxed text-navy-dark/75">
        …teams under ten told us setup time mattered more than features, which
        is why{" "}
        <span className="font-medium text-[#1a0dab] underline decoration-[#1a0dab]/40 underline-offset-2">
          a CRM built for small teams
        </span>{" "}
        tends to win…
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-line pt-3.5">
        {["Live", "Indexed", "Dofollow"].map((t) => (
          <span
            key={t}
            className="inline-flex items-center gap-1 rounded-full bg-verified/[0.1] px-2.5 py-1 text-[11px] font-semibold text-verified"
          >
            <Check className="h-3 w-3" />
            {t}
          </span>
        ))}
      </div>
    </div>
    <span className="absolute -right-3 -top-4 rotate-[4deg] rounded-full bg-navy-dark px-3 py-1.5 text-[11.5px] font-semibold text-white shadow-lg sm:-right-6">
      Passed 7 of 7 site checks
    </span>
  </div>
);

const Coverage = () => (
  <div className="relative mx-auto w-full max-w-[400px]">
    <div className="absolute inset-x-6 -top-5 h-full rotate-[-3deg] rounded-[14px] bg-[#FFFEFB]/70 ring-1 ring-navy-dark/[0.06]" />
    <Clipping
      className="relative"
      c={{
        outlet: "The Business Desk",
        desk: "Retail",
        head: "Shoppers are quietly switching to refill packs, new data shows",
        stand:
          "Sales of refills rose 38% in a year, according to figures shared with us.",
        mention:
          "…according to new figures from YourBrand, which tracked 1.2m orders.",
        kind: "Data story",
        dr: "DR 78",
        status: "Linked",
      }}
    />
  </div>
);

const Answer = () => (
  <div className="mx-auto w-full max-w-[400px] space-y-3">
    <div className={`${CARD} p-5`}>
      <p className="flex items-center gap-2 text-[12px] font-semibold text-navy-dark/80">
        <ChatGptMark className="h-4 w-4" />
        <PerplexityMark className="h-4 w-4" />
        Buyer question
      </p>
      <p className="mt-2 text-[14px] font-semibold text-navy-dark">
        What's the best invoicing tool for freelancers?
      </p>
      <p className="mt-2.5 text-[13px] leading-relaxed text-navy-dark/80">
        Most freelancers do well with something simple.{" "}
        <span className="rounded-[3px] bg-mark/70 px-1 font-semibold text-navy-dark">
          YourBrand
        </span>{" "}
        comes up often for its quick setup and fair pricing, alongside a couple
        of bigger names.
      </p>
      <p className="mt-3 flex flex-wrap gap-1.5">
        {["freelancer•••.com", "smallbiz•••.co.uk"].map((s) => (
          <span
            key={s}
            className="rounded-full bg-mist px-2.5 py-1 text-[11px] text-navy-dark/75 ring-1 ring-line"
          >
            {s}
          </span>
        ))}
      </p>
    </div>
    <div className={`${CARD} p-5`}>
      <div className="flex items-baseline justify-between">
        <p className="text-[12.5px] font-semibold text-navy-dark">
          Named in AI answers
        </p>
        <p className="text-[12.5px] text-navy-dark/70">42 buyer questions</p>
      </div>
      <div className="mt-3 flex items-end gap-1.5" aria-hidden="true">
        {[4, 7, 9, 14, 19, 26].map((v, n) => (
          <span key={n} className="flex flex-1 flex-col items-center gap-1">
            <span
              className={`w-full rounded-md ${n === 5 ? "bg-[rgb(var(--plume-cool))]" : "bg-[rgb(var(--plume-cool)/0.3)]"}`}
              style={{ height: `${(v / 26) * 64}px` }}
            />
            <span className="text-[10px] text-navy-dark/70">M{n + 1}</span>
          </span>
        ))}
      </div>
      <p className="mt-3 text-[13px] text-navy-dark/80">
        <span className="font-semibold text-navy-dark">4 → 26</span> answers
        naming the brand in six months
      </p>
    </div>
  </div>
);

const Quoted = () => (
  <div className="relative mx-auto w-full max-w-[400px]">
    <span className="absolute -top-4 left-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11.5px] font-semibold text-navy-dark shadow-md ring-1 ring-line">
      <Clock3 className="h-3.5 w-3.5" />
      Request: retail ops experts · closes in 3h
    </span>
    <article className="rounded-[14px] bg-[#FFFEFB] p-6 pt-8 ring-1 ring-navy-dark/[0.08] shadow-[0_1px_0_rgba(14,14,14,0.04),0_30px_60px_-34px_rgba(14,14,14,0.45)]">
      <p className="font-news text-[17px] font-semibold text-navy-dark">
        Retail Weekly
      </p>
      <span
        className="mt-2 block h-[4px] border-y border-navy-dark/70"
        aria-hidden="true"
      />
      <p className="mt-3 text-[12.5px] font-semibold leading-snug text-navy-dark/80">
        Why refunds keep rising, and what the best operators do about it
      </p>
      <blockquote className="mt-4 border-l-2 border-[rgb(var(--plume-warm))] pl-4">
        <Quote
          className="h-4 w-4 text-[rgb(var(--plume-warm))]"
          aria-hidden="true"
        />
        <p className="mt-1 font-news text-[19px] leading-snug text-navy-dark">
          Most refunds start as a delivery problem, not a product problem. Fix
          the first week and the returns fall with it.
        </p>
        <footer className="mt-3 text-[12.5px] text-navy-dark/75">
          <span className="font-semibold text-navy-dark">Sara Malik</span>, Head
          of Operations at YourBrand
        </footer>
      </blockquote>
      <p className="mt-5 flex flex-wrap gap-1.5">
        <span className="rounded-full bg-linen px-2.5 py-1 text-[10.5px] font-semibold text-navy-dark/85">
          Expert quote
        </span>
        <span className="rounded-full px-2.5 py-1 text-[10.5px] font-semibold text-navy-dark/80 ring-1 ring-line">
          DR 81
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-verified/[0.12] px-2.5 py-1 text-[10.5px] font-semibold text-verified">
          <Link2 className="h-3 w-3" />
          Linked
        </span>
      </p>
    </article>
  </div>
);

/* ------------------------------- the services ------------------------------- */

type Service = {
  n: string;
  name: string;
  line: string;
  d: string;
  points: string[];
  to: string;
  tone: "warm" | "fresh" | "cool" | "rose";
  Art: ComponentType;
};

const SERVICES: Service[] = [
  {
    n: "01",
    name: "Link Building",
    line: "Editorial links on real, relevant sites.",
    d: "Guest posts and niche edits on publications we've checked by hand, aimed at the pages you need to rank.",
    points: [
      "Every site passes a 7-point check. No PBNs, ever",
      "Articles written to each publication's standard",
      "Lifetime link guarantee and 100% money back",
    ],
    to: "/services/link-building",
    tone: "warm",
    Art: Placement,
  },
  {
    n: "02",
    name: "Digital PR",
    line: "Stories that earn coverage on their own.",
    d: "We find the story in your data or your expertise and pitch it to the desks that cover your industry.",
    points: [
      "Data stories, expert commentary and reactive news",
      "Coverage on news and trade sites, most of it linked",
      "Business and trade press in the markets you sell in",
    ],
    to: "/services/digital-pr",
    tone: "fresh",
    Art: Coverage,
  },
  {
    n: "03",
    name: "Brand Mentions",
    line: "Get named when buyers ask AI.",
    d: "We find the sources ChatGPT, Perplexity and AI Overviews lean on for your category, and get you mentioned there.",
    points: [
      "Your category's buyer questions, tracked every month",
      "Mentions on the sources AI tools actually cite",
      "Share of answers reported against competitors",
    ],
    to: "/services/brand-mentions",
    tone: "cool",
    Art: Answer,
  },
  {
    n: "04",
    name: "HARO & Expert Quotes",
    line: "Your expertise, quoted by journalists.",
    d: "We answer journalist requests in your name with quotes worth printing. You approve every word before it goes.",
    points: [
      "Requests matched to what you can genuinely speak to",
      "Quotes drafted with you, sent before the deadline",
      "Links and mentions from the articles that run",
    ],
    to: "/services/haro-links",
    tone: "rose",
    Art: Quoted,
  },
];

const Detail = ({ s }: { s: Service }) => (
  <div className="pb-1 pt-3">
    <p className="text-[15px] leading-relaxed text-navy-dark/75">{s.d}</p>
    <ul className="mt-4 space-y-2">
      {s.points.map((p) => (
        <li
          key={p}
          className="flex gap-2.5 text-[14px] leading-snug text-navy-dark/85"
        >
          <Check className="mt-0.5 h-4 w-4 flex-none text-verified" />
          {p}
        </li>
      ))}
    </ul>
    <Link
      to={s.to}
      className="group mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-navy-dark"
    >
      Explore {s.name}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  </div>
);

const ServicesSection = () => {
  const [active, setActive] = useState(0);
  const cur = SERVICES[active];

  return (
    <div className="bg-linen py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/70">
              Solutions
            </p>
            <h2 className="text-[2.3rem] font-semibold leading-[1.04] tracking-[-0.04em] text-navy-dark sm:text-[3.2rem]">
              Four services.
              <br />
              <Accent>One footprint</Accent> search trusts.
            </h2>
          </div>
          <p className="max-w-md text-[16.5px] leading-relaxed text-navy-dark/75 lg:pb-2">
            Most clients start with one and add a second once it's working. All
            four build the same thing: what trusted sites say about you.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          {/* the list */}
          <div className="border-t border-navy-dark/10">
            {SERVICES.map((s, i) => {
              const on = i === active;
              return (
                <div key={s.n} className="border-b border-navy-dark/10">
                  <button
                    aria-expanded={on}
                    onClick={() => setActive(i)}
                    className="group flex w-full items-baseline gap-5 py-6 text-left"
                  >
                    <span
                      className={`w-7 flex-none text-[13px] font-semibold tabular-nums transition-colors ${
                        on ? "text-navy-dark" : "text-navy-dark/70"
                      }`}
                    >
                      {s.n}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={`block text-[1.6rem] font-semibold tracking-[-0.03em] transition-colors sm:text-[1.9rem] ${
                          on
                            ? "text-navy-dark"
                            : "text-navy-dark/45 group-hover:text-navy-dark/75"
                        }`}
                      >
                        {s.name}
                      </span>
                      <span
                        className={`mt-1 block text-[14.5px] transition-colors ${
                          on ? "text-navy-dark/80" : "text-navy-dark/60"
                        }`}
                      >
                        {s.line}
                      </span>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        key="detail"
                        className="overflow-hidden pl-12"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Detail s={s} />
                        {/* small screens: the artefact sits right here */}
                        <GlowPanel
                          tone={s.tone}
                          className="mb-6 mt-6 lg:hidden"
                        >
                          <div className="px-4 py-10 sm:px-8">
                            <s.Art />
                          </div>
                        </GlowPanel>
                        <div className="h-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* the panel */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <GlowPanel tone={cur.tone} className="min-h-[560px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={cur.n}
                    className="flex min-h-[560px] items-center px-10 py-14"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <cur.Art />
                  </motion.div>
                </AnimatePresence>
              </GlowPanel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
