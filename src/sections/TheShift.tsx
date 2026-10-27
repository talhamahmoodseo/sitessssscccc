import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  ChevronDown,
  Link2,
  MessageCircle,
  Mic,
  Plus,
  Search,
  Sparkles,
} from "lucide-react";
import Accent from "@/components/Accent";
import { asset } from "@/lib/booking";
import { COLOURS, GrainBlob } from "@/components/Grain";
import { AiOverviewMark } from "@/components/PlatformMarks";

/**
 * The Shift. One idea: buyers ask one question in three kinds of places, and
 * all three lean on what trusted sites say about you.
 *
 * The three places are named accurately: classic search results, AI answers
 * inside search, and AI assistants. ChatGPT and Claude are both assistants, so
 * they sit together rather than next to Google as if they were peers.
 */

const QUERY = "best CRM for a small sales team?";

const Brand = ({
  children = "YourBrand",
  on,
}: {
  children?: ReactNode;
  on: boolean;
}) => (
  <span
    className="-mx-[2px] rounded-[3px] px-[2px] font-semibold text-navy-dark transition-[background-size] duration-700"
    style={{
      backgroundImage:
        "linear-gradient(rgb(var(--mark) / 0.8), rgb(var(--mark) / 0.8))",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "0 90%",
      backgroundSize: on ? "100% 70%" : "0% 70%",
    }}
  >
    {children}
  </span>
);

/* ---------- what each place actually shows, drawn like the real thing ---------- */

const GOOGLE_FONT = { fontFamily: "Arial, Helvetica, sans-serif" };

/** Google's coloured wordmark, set in type so it stays crisp at any size. */
const GoogleWord = () => (
  <span
    className="text-[15px] font-bold tracking-[-0.02em]"
    style={GOOGLE_FONT}
    aria-label="Google"
  >
    <span className="text-[#4285F4]">G</span>
    <span className="text-[#EA4335]">o</span>
    <span className="text-[#FBBC05]">o</span>
    <span className="text-[#4285F4]">g</span>
    <span className="text-[#34A853]">l</span>
    <span className="text-[#EA4335]">e</span>
  </span>
);

/** A site's favicon: a small round tile with its initial. */
const Fav = ({ l, c }: { l: string; c: string }) => (
  <span
    className="flex h-[18px] w-[18px] flex-none items-center justify-center rounded-full text-[9px] font-bold text-white"
    style={{ background: c }}
    aria-hidden="true"
  >
    {l}
  </span>
);

const RESULTS = [
  {
    site: "TechRadar",
    url: "https://www.techradar.com › best › crm",
    title: "Best CRM software for small business in 2026",
    fav: ["T", "#1f2937"],
  },
  {
    site: "YourBrand",
    url: "https://yourbrand.com › small-teams",
    title: "YourBrand: the CRM built for small sales teams",
    fav: ["Y", "#7c5cf6"],
    ours: true,
  },
  {
    site: "BigCRM",
    url: "https://www.bigcrm.com › pricing",
    title: "CRM for growing companies | BigCRM",
    fav: ["B", "#0b7a5a"],
  },
];

const SearchResults = ({ on }: { on: boolean }) => (
  <div className="text-[#4d5156]" style={GOOGLE_FONT}>
    <div className="flex items-center gap-2.5 px-3 pt-3">
      <GoogleWord />
      <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-full px-3 py-1.5 shadow-[0_1px_4px_rgba(32,33,36,0.22)]">
        <span className="min-w-0 flex-1 truncate text-[11px] text-[#202124]">
          {QUERY.replace("?", "")}
        </span>
        <Search className="h-3 w-3 flex-none text-[#4285F4]" />
      </div>
    </div>
    <div className="mt-2 flex gap-3.5 border-b border-[#ebebeb] px-3 text-[10.5px]">
      {["All", "Images", "News", "Videos", "Shopping"].map((t, n) => (
        <span
          key={t}
          className={`pb-1.5 ${n === 0 ? "border-b-2 border-[#1a73e8] font-semibold text-[#1a73e8]" : "text-[#5f6368]"}`}
        >
          {t}
        </span>
      ))}
    </div>
    <div className="space-y-0.5 px-1.5 py-1.5">
      {RESULTS.map((r) => (
        <div
          key={r.site}
          className={`rounded-lg px-1.5 py-1 ring-1 transition-colors duration-500 ${
            r.ours && on ? "bg-mark/20 ring-mark/60" : "ring-transparent"
          }`}
        >
          <div className="flex items-center gap-1.5">
            <Fav l={r.fav[0]} c={r.fav[1]} />
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-[10.5px] text-[#202124]">
                {r.site}
              </span>
              <span className="block truncate text-[9.5px]">{r.url}</span>
            </span>
          </div>
          <p className="mt-0.5 truncate text-[12.5px] leading-snug text-[#1a0dab]">
            {r.title}
          </p>
        </div>
      ))}
    </div>
  </div>
);

const AiAnswer = ({ on }: { on: boolean }) => (
  <div className="px-3.5 py-3 text-[#1f1f1f]" style={GOOGLE_FONT}>
    <p className="flex items-center gap-1.5 text-[11.5px] font-semibold">
      <AiOverviewMark className="h-3.5 w-3.5" />
      AI Overview
    </p>
    <p className="mt-2 text-[11.5px] leading-[1.55]">
      For a small sales team, the best CRM is usually the one that's quickest to
      set up. <Brand on={on} /> is a frequent pick for teams under ten
      <Link2
        className="ml-1 inline h-3 w-3 -translate-y-px text-[#1a73e8]"
        aria-hidden="true"
      />
    </p>
    <ul className="mt-1.5 space-y-1 text-[11.5px] leading-[1.45]">
      <li className="flex gap-1.5">
        <span className="mt-[7px] h-1 w-1 flex-none rounded-full bg-[#1f1f1f]" />
        <span>
          <b className="font-semibold">Simple setup:</b> live in a day, no admin
          needed.
        </span>
      </li>
      <li className="flex gap-1.5">
        <span className="mt-[7px] h-1 w-1 flex-none rounded-full bg-[#1f1f1f]" />
        <span>
          <b className="font-semibold">Fair pricing:</b> per seat, with a free
          tier.
        </span>
      </li>
    </ul>
    <div className="mt-2.5 grid grid-cols-2 gap-1.5">
      {[
        ["S", "#d0573a", "saasweekly.com", "Best CRMs for small teams"],
        ["F", "#2563eb", "founderstack.io", "The CRMs we'd pick in 2026"],
      ].map(([l, c, d, t]) => (
        <div key={d} className="min-w-0 rounded-lg bg-[#f3f6fc] px-2 py-1.5">
          <p className="truncate text-[10.5px] font-semibold leading-snug text-[#1f1f1f]">
            {t}
          </p>
          <p className="mt-0.5 flex items-center gap-1 text-[9.5px] text-[#5f6368]">
            <Fav l={l} c={c} />
            <span className="truncate">{d}</span>
          </p>
        </div>
      ))}
    </div>
  </div>
);

const Assistant = ({ on }: { on: boolean }) => (
  <div
    className="flex h-full flex-col px-3 py-2.5 text-[#0d0d0d]"
    style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
  >
    <p className="flex items-center gap-1 text-[12px] font-semibold">
      ChatGPT <ChevronDown className="h-3 w-3 text-[#8f8f8f]" />
    </p>
    <p className="ml-auto mt-2 w-fit max-w-[85%] rounded-[16px] bg-[#f4f4f4] px-3 py-1.5 text-[11.5px] leading-snug">
      Which CRM should a five-person sales team use?
    </p>
    <div className="mt-2.5 text-[11.5px] leading-[1.5]">
      <p>For a team of five, I'd shortlist two:</p>
      <ol className="mt-1 space-y-1">
        <li>
          1. <Brand on={on} />: simple setup, built for small teams.{" "}
          <span className="whitespace-nowrap rounded-full bg-[#f0f0f0] px-1.5 py-px text-[9.5px] text-[#5d5d5d]">
            saasweekly
          </span>
        </li>
        <li>
          2. <b className="font-semibold">BigCRM</b>: better if you need
          forecasting.
        </li>
      </ol>
    </div>
    <div className="mt-auto flex items-center gap-2 rounded-full px-3 py-1.5 pt-1.5 ring-1 ring-[#e5e5e5]">
      <Plus className="h-3 w-3 text-[#5d5d5d]" />
      <span className="flex-1 text-[11px] text-[#666]">Ask anything</span>
      <Mic className="h-3 w-3 text-[#5d5d5d]" />
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-black">
        <ArrowUp className="h-2.5 w-2.5 text-white" />
      </span>
    </div>
  </div>
);

const PLACES = [
  {
    name: "Search results",
    where: "Google · Bing",
    Icon: Search,
    get: "a ranking",
    Body: SearchResults,
  },
  {
    name: "AI answers in search",
    where: "Google AI Overviews · Perplexity",
    Icon: Sparkles,
    get: "a citation",
    Body: AiAnswer,
  },
  {
    name: "AI assistants",
    where: "ChatGPT · Claude · Gemini",
    Icon: MessageCircle,
    get: "a recommendation",
    Body: Assistant,
  },
];

/* ------------------------------ the diagram ------------------------------ */

/** Lines from the question to the three places, and from the three places to
 *  what they all lean on. Stretched to the row, so strokes stay non-scaling. */
const Fan = ({ up = false, draw }: { up?: boolean; draw: boolean }) => {
  const reduced = useReducedMotion();
  const xs = [166.7, 500, 833.3];
  return (
    <svg
      viewBox="0 0 1000 70"
      preserveAspectRatio="none"
      className="hidden h-[70px] w-full lg:block"
      fill="none"
      aria-hidden="true"
    >
      {xs.map((x, n) => {
        const d = up
          ? `M${x} 0 C ${x} 40, 500 30, 500 70`
          : `M500 0 C 500 40, ${x} 30, ${x} 70`;
        return (
          <motion.path
            key={x}
            d={d}
            stroke={up ? "rgb(var(--mark))" : "white"}
            strokeOpacity={up ? 0.75 : 0.3}
            strokeWidth="1.6"
            strokeDasharray="5 7"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, strokeDashoffset: 0 }}
            animate={
              draw
                ? {
                    pathLength: 1,
                    strokeDashoffset: reduced ? 0 : up ? [0, 24] : [0, -24],
                  }
                : { pathLength: 0 }
            }
            transition={{
              pathLength: {
                duration: 0.9,
                delay: (up ? 0.9 : 0.35) + n * 0.12,
              },
              strokeDashoffset: {
                duration: 1.4,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          />
        );
      })}
    </svg>
  );
};

const Diagram = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const reduced = useReducedMotion();
  const [typed, setTyped] = useState(0);
  const [active, setActive] = useState(0);

  // type the question once it scrolls in
  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setTyped(QUERY.length);
      return;
    }
    const t = setInterval(
      () => setTyped((n) => (n >= QUERY.length ? n : n + 1)),
      38,
    );
    return () => clearInterval(t);
  }, [inView, reduced]);

  // then the three places take turns
  useEffect(() => {
    if (!inView || reduced) return;
    const t = setInterval(
      () => setActive((n) => (n + 1) % PLACES.length),
      3200,
    );
    return () => clearInterval(t);
  }, [inView, reduced]);

  return (
    <div
      ref={ref}
      className="rounded-[28px] bg-white/[0.03] p-5 ring-1 ring-white/10 sm:p-8 lg:p-10"
    >
      {/* the question */}
      <div className="flex justify-center">
        <div className="inline-flex w-full max-w-md items-center gap-3 rounded-full bg-white px-5 py-3.5 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.6)]">
          <Search className="h-4 w-4 flex-none text-navy-dark/70" />
          <span className="min-w-0 truncate text-[15px] text-navy-dark">
            {QUERY.slice(0, typed)}
            <span className="ml-0.5 inline-block h-4 w-[1.5px] translate-y-0.5 animate-pulse bg-navy-dark" />
          </span>
        </div>
      </div>

      <Fan draw={inView} />
      <div
        className="mx-auto my-4 h-8 w-px border-l border-dashed border-white/30 lg:hidden"
        aria-hidden="true"
      />

      {/* the three places */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {PLACES.map((p, n) => {
          const on = active === n;
          return (
            <motion.div
              key={p.name}
              className={`flex min-w-0 flex-col rounded-[20px] p-4 transition-[box-shadow,background-color] duration-500 sm:p-5 ${
                on
                  ? "bg-white/[0.09] ring-2 ring-mark/60"
                  : "bg-white/[0.04] ring-1 ring-white/10"
              }`}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + n * 0.12 }}
              onMouseEnter={() => setActive(n)}
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
                  <p.Icon className="h-4 w-4 text-white" />
                </span>
                <span>
                  <span className="block text-[14.5px] font-semibold text-white">
                    {p.name}
                  </span>
                  <span className="block text-[12px] text-white/70">
                    {p.where}
                  </span>
                </span>
              </div>
              <div className="mt-4 flex h-[244px] min-w-0 flex-col overflow-hidden rounded-2xl bg-white shadow-[0_18px_40px_-24px_rgba(0,0,0,0.7)]">
                <p.Body on={on} />
              </div>
              <p className="mt-3.5 text-[13px] text-white/75">
                What you get here:{" "}
                <span className="font-semibold text-white">{p.get}</span>
              </p>
            </motion.div>
          );
        })}
      </div>

      <Fan up draw={inView} />
      <div
        className="mx-auto my-4 h-8 w-px border-l border-dashed border-mark/60 lg:hidden"
        aria-hidden="true"
      />

      {/* what all three lean on */}
      <motion.div
        className="rounded-2xl px-6 py-5 text-center ring-1 ring-mark/50"
        style={{ background: "rgb(var(--mark) / 0.08)" }}
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.3 }}
      >
        <p className="text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-mark">
          Authority links &amp; mentions
        </p>
        <p className="mt-1 text-[13.5px] text-white/75">
          on the publications all three already trust
        </p>
      </motion.div>
    </div>
  );
};

/* ------------------------------ the evidence ------------------------------ */

/**
 * Three data points, each checked against its source page (Oct 2026), in
 * the source's own numbers. Bars are drawn to scale within each card.
 */
const DATA = [
  {
    source: "Ahrefs",
    logo: "/images/sources/ahrefs.webp",
    big: "0.664",
    title:
      "An Analysis of AI Overview Brand Visibility Factors (75K Brands Studied)",
    url: "https://ahrefs.com/blog/ai-overview-brand-correlation/",
    summary:
      "Across 75,000 brands, web mentions had the strongest correlation with showing up in Google’s AI Overviews. Backlinks came in far lower.",
    bars: [
      { l: "Brand web mentions", v: "0.664", w: 66.4, tone: "cool" },
      { l: "Number of backlinks", v: "0.218", w: 21.8, tone: "dim" },
    ],
  },
  {
    source: "Semrush",
    logo: "/images/sources/semrush.webp",
    big: "4.4×",
    title: "We Studied the Impact of AI Search on SEO Traffic",
    url: "https://www.semrush.com/blog/ai-search-seo-traffic-study/",
    summary:
      "The average visitor from AI search, such as ChatGPT, is worth 4.4 times the average organic search visitor, measured by conversion rate.",
    bars: [
      { l: "AI search visitor", v: "4.4×", w: 100, tone: "cool" },
      { l: "Organic search visitor", v: "1×", w: 22.7, tone: "dim" },
    ],
  },
  {
    source: "Neil Patel",
    photo: "/images/sources/neil-patel.webp",
    role: "Co-founder, NP Digital",
    big: "−61%",
    title: "AI Overview Expansion Is Cutting Organic CTR by Up to 61%",
    url: "https://neilpatel.com/marketing-stats/ai-overview-expansion-organic-ctr-decline/",
    summary:
      "When an AI Overview shows, click-through on informational searches drops 61%. On branded searches it rises 18.7%. Data aggregated from four research sources.",
    bars: [
      { l: "Informational searches", v: "−61% CTR", w: 61, tone: "warm" },
      { l: "Branded searches", v: "+18.7% CTR", w: 18.7, tone: "cool" },
    ],
  },
] as const;

type Data = (typeof DATA)[number];

/** Who the number comes from: the publisher's logo, or the person. */
const SourceHead = ({ d }: { d: Data }) =>
  "photo" in d ? (
    <div className="flex items-center gap-3">
      <img
        src={asset(d.photo)}
        alt={d.source}
        width={40}
        height={40}
        loading="lazy"
        className="h-10 w-10 rounded-full object-cover ring-2 ring-white/20"
      />
      <span>
        <span className="block text-[14px] font-semibold text-white">
          {d.source}
        </span>
        <span className="block text-[12px] text-white/70">{d.role}</span>
      </span>
    </div>
  ) : (
    <span className="inline-flex h-11 w-fit items-center self-start rounded-xl bg-white px-3.5">
      <img
        src={asset(d.logo)}
        alt={d.source}
        loading="lazy"
        className={d.source === "Semrush" ? "h-8 w-auto" : "h-5 w-auto"}
      />
    </span>
  );

const TONE = {
  warm: "bg-[rgb(var(--plume-warm-light))]",
  cool: "bg-[rgb(var(--plume-cool-light))]",
  dim: "bg-white/25",
};

const Evidence = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div
      ref={ref}
      className="mt-14 border-t border-white/10 pt-12 lg:mt-16 lg:pt-16"
    >
      <motion.div
        className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
            What the data says
          </p>
          <h3 className="max-w-2xl text-[1.9rem] font-semibold leading-[1.1] tracking-[-0.035em] text-white sm:text-[2.4rem]">
            Fewer clicks for generic answers.{" "}
            <Accent dark>More weight on brands people mention.</Accent>
          </h3>
        </div>
      </motion.div>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {DATA.map((d, n) => (
          <motion.article
            key={d.source}
            className="flex flex-col rounded-[22px] bg-white/[0.04] p-6 ring-1 ring-white/10 sm:p-7"
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12 + n * 0.1 }}
          >
            <SourceHead d={d} />
            <p className="mt-4 text-[3rem] font-semibold leading-none tracking-[-0.045em] text-white tabular-nums">
              {d.big}
            </p>
            <div className="mt-6 space-y-3">
              {d.bars.map((b, k) => (
                <div key={b.l}>
                  <div className="flex items-baseline justify-between gap-3 text-[12.5px]">
                    <span className="text-white/75">{b.l}</span>
                    <span className="font-semibold tabular-nums text-white">
                      {b.v}
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/[0.08]">
                    <motion.div
                      className={`h-full origin-left rounded-full ${TONE[b.tone]}`}
                      style={{ width: `${b.w}%` }}
                      initial={{ scaleX: 0 }}
                      animate={inView ? { scaleX: 1 } : {}}
                      transition={{
                        duration: 1,
                        delay: 0.35 + n * 0.1 + k * 0.12,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="mb-6 mt-6 text-[14px] leading-relaxed text-white/75">
              {d.summary}
            </p>
            <a
              href={d.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-auto flex items-start justify-between gap-3 border-t border-white/10 pt-4 text-[12.5px] text-white/70 transition-colors hover:text-white"
            >
              <span>
                <span className="font-semibold text-white/85">Source:</span>{" "}
                {d.title}
              </span>
              <ArrowUpRight className="h-4 w-4 flex-none transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

/* -------------------------------- section -------------------------------- */

const TheShift = () => (
  <div className="relative overflow-hidden bg-navy-dark py-24 lg:py-32">
    <GrainBlob
      color={COLOURS.violet}
      className="-right-[320px] -top-[200px] h-[640px] w-[720px] opacity-25"
      duration={32}
    />
    <GrainBlob
      color={COLOURS.orange}
      className="-left-[360px] top-[45%] h-[600px] w-[640px] opacity-20"
      duration={36}
    />

    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
            The Shift
          </p>
          <h2 className="text-4xl font-semibold leading-[1.06] tracking-[-0.04em] text-white sm:text-5xl lg:text-[3.4rem]">
            One question.
            <br />
            <span className="font-medium">
              <Accent dark>Three places</Accent>
              <span className="text-white/85"> it gets answered.</span>
            </span>
          </h2>
        </motion.div>
        <motion.div
          className="lg:pt-9"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="text-lg leading-relaxed text-white/75">
            Your buyers still search on Google. But more often now, they read
            the AI Overview at the top and stop there. Or they skip search
            completely and ask ChatGPT.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-white/75">
            Three places, three kinds of answer. All three lean on the same
            thing:{" "}
            <span className="font-semibold text-white">
              what trusted sites say about you
            </span>
            . That's what we build.
          </p>
          <a
            href="#process"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white/85 transition-colors duration-300 hover:text-white"
          >
            See how we build it
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>

      <motion.div
        className="mt-14 lg:mt-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <Diagram />
      </motion.div>

      <Evidence />
    </div>
  </div>
);

export default TheShift;
