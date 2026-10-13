import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight, MessageCircle, Search, Sparkles } from "lucide-react";
import { COLOURS, GrainBlob } from "@/components/Grain";

/**
 * The Shift. One idea: buyers ask one question in three kinds of places, and
 * all three lean on what trusted sites say about you.
 *
 * The three places are named accurately: classic search results, AI answers
 * inside search, and AI assistants. ChatGPT and Claude are both assistants, so
 * they sit together rather than next to Google as if they were peers.
 */

const QUERY = "best CRM for a small sales team?";

const Brand = ({ children = "YourBrand", on }: { children?: ReactNode; on: boolean }) => (
  <span
    className="rounded px-0.5 font-semibold text-navy-dark transition-[background-size] duration-700"
    style={{
      backgroundImage: "linear-gradient(rgb(var(--mark) / 0.8), rgb(var(--mark) / 0.8))",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "0 90%",
      backgroundSize: on ? "100% 70%" : "0% 70%",
    }}
  >
    {children}
  </span>
);

/* ---------- what each place actually shows, written the way it reads ---------- */

const SearchResults = ({ on }: { on: boolean }) => (
  <div className="space-y-2">
    {[
      ["bigcrm.com", "Enterprise CRM software for growing companies"],
      ["reviews•••hub.com", "The 10 best CRMs for small businesses in 2026"],
    ].map(([d, t], n) => (
      <div key={d} className="rounded-lg px-3 py-2">
        <p className="text-[10.5px] font-medium text-verified">{d}</p>
        <p className="truncate text-[12.5px] text-navy-dark/75">
          <span className="mr-1 font-semibold text-navy-dark/70">{n + 1}.</span>
          {t}
        </p>
      </div>
    ))}
    <div
      className={`rounded-lg px-3 py-2 ring-1 transition-colors duration-500 ${
        on ? "bg-mark/15 ring-mark/50" : "ring-line"
      }`}
    >
      <p className="text-[10.5px] font-medium text-verified">yourbrand.com</p>
      <p className="truncate text-[12.5px] text-navy-dark">
        <span className="mr-1 font-semibold">3.</span>
        <Brand on={on} /> — the CRM built for small teams
      </p>
    </div>
  </div>
);

const AiAnswer = ({ on }: { on: boolean }) => (
  <div>
    <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-navy-dark/70">
      <Sparkles className="h-3.5 w-3.5" /> AI Overview
    </p>
    <p className="mt-2 text-[13px] leading-relaxed text-navy-dark/85">
      For a small sales team, <Brand on={on} /> is a popular pick. It's quick to set up and
      priced for teams of under ten.
    </p>
    <div className="mt-3 flex flex-wrap gap-1.5">
      {["saas•••weekly.com", "techreview•••.com"].map((s) => (
        <span
          key={s}
          className="rounded-full bg-mist px-2 py-0.5 text-[10.5px] font-medium text-navy-dark/80 ring-1 ring-line"
        >
          {s}
        </span>
      ))}
    </div>
  </div>
);

const Assistant = ({ on }: { on: boolean }) => (
  <div className="space-y-2.5">
    <p className="ml-auto w-fit max-w-[88%] rounded-2xl rounded-br-md bg-linen px-3 py-2 text-[12.5px] text-navy-dark">
      Which CRM should a five-person sales team use?
    </p>
    <p className="w-fit max-w-[94%] rounded-2xl rounded-bl-md bg-mist px-3 py-2 text-[12.5px] leading-relaxed text-navy-dark/85 ring-1 ring-line">
      I'd start with <Brand on={on} />. It's simple to set up and it's built for small teams
      like yours.
    </p>
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
              pathLength: { duration: 0.9, delay: (up ? 0.9 : 0.35) + n * 0.12 },
              strokeDashoffset: { duration: 1.4, repeat: Infinity, ease: "linear" },
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
    const t = setInterval(() => setActive((n) => (n + 1) % PLACES.length), 3200);
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
                  <span className="block text-[12px] text-white/70">{p.where}</span>
                </span>
              </div>
              <div className="mt-4 min-h-[148px] min-w-0 overflow-hidden rounded-2xl bg-white p-3.5">
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

/* -------------------------------- section -------------------------------- */

const SOURCE =
  "https://neilpatel.com/marketing-stats/ai-overview-expansion-organic-ctr-decline/";

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
          <h2 className="text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-[3.4rem]">
            One question.
            <br />
            <span className="font-medium text-white/85">
              Three places it gets answered.
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
            Your buyers still search on Google. But more often now, they read the
            AI Overview at the top and stop there. Or they skip search completely
            and ask ChatGPT.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-white/75">
            Three places, three different kinds of answer. Here's the part most
            agencies miss: all three lean on the same thing,{" "}
            <span className="font-semibold text-white">
              what trusted, authoritative sites say about you
            </span>
            . That's exactly what we build.
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

      {/* the evidence, in numbers and in the source's own words */}
      <motion.figure
        className="mt-14 grid gap-10 border-t border-white/10 pt-12 lg:mt-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        <div>
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
            What the data says
          </p>
          <dl className="grid grid-cols-2 gap-6">
            <div>
              <dd className="text-[3rem] font-semibold leading-none tracking-[-0.04em] text-white tabular-nums sm:text-[3.6rem]">
                −61%
              </dd>
              <dt className="mt-3 text-[13.5px] leading-snug text-white/75">
                click-through rate on informational content
              </dt>
            </div>
            <div>
              <dd className="text-[3rem] font-semibold leading-none tracking-[-0.04em] text-mark tabular-nums sm:text-[3.6rem]">
                +18.7%
              </dd>
              <dt className="mt-3 text-[13.5px] leading-snug text-white/75">
                growth in branded search queries
              </dt>
            </div>
          </dl>
          <p className="mt-6 text-[13.5px] leading-relaxed text-white/70">
            Fewer clicks on generic answers. More people searching for brands by
            name. Being the brand people already know is now the advantage.
          </p>
        </div>
        <div>
          <blockquote cite={SOURCE}>
            <p className="text-[1.1rem] leading-[1.65] text-white/85 sm:text-[1.2rem]">
              &ldquo;Informational content is down 61 percent on CTR. Branded
              queries are up 18.7 percent. That divergence is the most important
              signal in organic search right now. The teams that respond by
              shifting production toward commercial and branded content while
              optimizing informational content for AI citation rather than direct
              CTR are the ones who will navigate the AI Overview transition with
              the least revenue impact.&rdquo;
            </p>
          </blockquote>
          <figcaption className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <span className="flex items-center gap-3">
              <span
                className="flex h-10 w-10 flex-none items-center justify-center rounded-full text-[12px] font-bold text-white ring-1 ring-white/25"
                aria-hidden="true"
              >
                NP
              </span>
              <span>
                <span className="block text-[14.5px] font-semibold text-white">
                  Neil Patel
                </span>
                <span className="block text-[12.5px] text-white/70">
                  Co-founder, Neil Patel Digital
                </span>
              </span>
            </span>
            <a
              href={SOURCE}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-[12.5px] font-semibold text-white/75 transition-colors hover:text-white sm:border-l sm:border-white/15 sm:pl-8"
            >
              Source: neilpatel.com
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </figcaption>
        </div>
      </motion.figure>
    </div>
  </div>
);

export default TheShift;
