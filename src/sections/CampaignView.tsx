import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { ArrowUp, Check, CircleDashed } from "lucide-react";
import { ChatGptMark } from "@/components/PlatformMarks";

/**
 * Homepage hero panel: what a month of an Editorial HQ campaign looks like.
 * Placements go live one by one (publication, type, DR, indexed), one is
 * opened to show what it moved, and a strip sums up the month.
 *
 * Motion is cheap on purpose: one timer that steps through placements every
 * few seconds, plus transform/opacity transitions. Reduced motion shows the
 * finished month.
 */

const ease = [0.22, 1, 0.36, 1] as const;

type Placement = {
  pub: string;
  initial: string;
  tint: string;
  type: string;
  dr: number;
  topic: string;
  keyword: string;
  from: number;
  to: number;
  ai: string;
};

const PLACEMENTS: Placement[] = [
  {
    pub: "SaaS Growth Weekly",
    initial: "S",
    tint: "bg-lilac",
    type: "Guest post",
    dr: 62,
    topic: "Sales software",
    keyword: "best crm for small teams",
    from: 14,
    to: 4,
    ai: "ChatGPT now lists YourBrand among the CRMs it recommends for teams under ten.",
  },
  {
    pub: "The Business Desk",
    initial: "B",
    tint: "bg-mint",
    type: "PR feature",
    dr: 78,
    topic: "Business news",
    keyword: "crm pricing comparison",
    from: 22,
    to: 7,
    ai: "Google's AI Overview cites the feature when buyers compare CRM pricing.",
  },
  {
    pub: "Founders Journal",
    initial: "F",
    tint: "bg-butter",
    type: "Expert quote",
    dr: 66,
    topic: "Startups",
    keyword: "sales pipeline template",
    from: 31,
    to: 9,
    ai: "Your Head of Sales is quoted in answers about building a first pipeline.",
  },
  {
    pub: "Revenue Review",
    initial: "R",
    tint: "bg-blush",
    type: "Brand mention",
    dr: 58,
    topic: "Revenue teams",
    keyword: "crm for startups",
    from: 18,
    to: 6,
    ai: "Perplexity names YourBrand in its shortlist, citing Revenue Review.",
  },
];

const STEP_MS = 3400;

const Bar = ({ from, to, run }: { from: number; to: number; run: boolean }) => {
  // position 1 at the top: lower is better, so the bar grows as rank improves
  const pct = (p: number) => Math.max(6, 100 - (p - 1) * 3);
  return (
    <div className="mt-3 h-2 overflow-hidden rounded-full bg-navy-dark/[0.07]">
      <motion.div
        className="h-full rounded-full bg-[linear-gradient(90deg,rgb(var(--plume-warm)),rgb(var(--plume-cool)))]"
        initial={{ width: `${pct(from)}%` }}
        animate={{ width: `${pct(run ? to : from)}%` }}
        transition={{ duration: 1.1, ease, delay: 0.25 }}
      />
    </div>
  );
};

const CampaignView = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-60px" });
  const reduced = useReducedMotion();
  const total = PLACEMENTS.length;
  // one counter drives everything: rows go live one by one, then the opened
  // row keeps cycling. Clicking a live row opens it.
  const [step, setStep] = useState(reduced ? total - 1 : 0);
  const [picked, setPicked] = useState<number | null>(null);
  const live = Math.min(total, step + 1);
  const open = picked ?? step % total;

  useEffect(() => {
    if (reduced || !inView || picked !== null) return;
    const t = setInterval(() => setStep((n) => n + 1), STEP_MS);
    return () => clearInterval(t);
  }, [reduced, inView, picked]);

  const p = PLACEMENTS[open];

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-[1.1rem] bg-white text-left"
    >
      {/* window bar */}
      <div className="flex items-center gap-3 border-b border-line px-4 py-3 sm:px-5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-navy-dark/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-navy-dark/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-navy-dark/15" />
        </span>
        <span className="text-[12.5px] font-semibold text-navy-dark">
          YourBrand · Link building &amp; PR
        </span>
        <span className="ml-auto rounded-full bg-mist px-2.5 py-1 text-[11px] font-semibold text-navy-dark/80 ring-1 ring-line">
          Month 3
        </span>
      </div>

      <div className="grid md:grid-cols-[1.15fr_1fr]">
        {/* placements */}
        <div className="border-b border-line p-4 sm:p-5 md:border-b-0 md:border-r">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-dark/70">
            Placements this month
          </p>
          <ul className="mt-3 space-y-2">
            {PLACEMENTS.map((pl, n) => {
              const isLive = n < live;
              const isOpen = n === open && isLive;
              return (
                <li key={pl.pub}>
                  <button
                    type="button"
                    disabled={!isLive}
                    onClick={() => setPicked(n)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-300 ${
                      isOpen
                        ? "bg-mist ring-1 ring-navy-dark/15"
                        : "hover:bg-mist/70"
                    } ${isLive ? "" : "opacity-45"}`}
                  >
                    <span
                      className={`flex h-8 w-8 flex-none items-center justify-center rounded-lg ${pl.tint} text-[13px] font-bold text-navy-dark`}
                    >
                      {pl.initial}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13.5px] font-semibold text-navy-dark">
                        {pl.pub}
                      </span>
                      <span className="block truncate text-[11.5px] text-navy-dark/70">
                        {pl.type} · DR {pl.dr} · {pl.topic}
                      </span>
                    </span>
                    <AnimatePresence mode="wait" initial={false}>
                      {isLive ? (
                        <motion.span
                          key="live"
                          className="inline-flex flex-none items-center gap-1 rounded-full bg-verified/[0.12] px-2 py-1 text-[10.5px] font-semibold text-verified"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.35, ease }}
                        >
                          <Check className="h-3 w-3" />
                          Indexed
                        </motion.span>
                      ) : (
                        <motion.span
                          key="wait"
                          className="inline-flex flex-none items-center gap-1 rounded-full bg-navy-dark/[0.06] px-2 py-1 text-[10.5px] font-semibold text-navy-dark/70"
                          exit={{ opacity: 0 }}
                        >
                          <CircleDashed className="h-3 w-3" />
                          In review
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* what it moved */}
        <div className="p-4 sm:p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-dark/70">
            What it moved
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={open}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease }}
            >
              <div className="mt-3 rounded-xl bg-mist p-4 ring-1 ring-line">
                <p className="text-[11.5px] text-navy-dark/70">
                  Google ranking
                </p>
                <p className="mt-1 truncate text-[13.5px] font-semibold text-navy-dark">
                  “{p.keyword}”
                </p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-[13px] text-navy-dark/70 tabular-nums">
                    #{p.from}
                  </span>
                  <span className="text-navy-dark/40">→</span>
                  <span className="text-[26px] font-semibold leading-none tracking-[-0.03em] text-navy-dark tabular-nums">
                    #{p.to}
                  </span>
                  <span className="ml-auto inline-flex items-center gap-0.5 text-[12px] font-semibold text-verified">
                    <ArrowUp className="h-3.5 w-3.5" />
                    {p.from - p.to}
                  </span>
                </div>
                <Bar from={p.from} to={p.to} run={inView || !!reduced} />
              </div>
              <div className="mt-3 rounded-xl bg-white p-4 ring-1 ring-line">
                <p className="flex items-center gap-1.5 text-[11.5px] text-navy-dark/70">
                  <ChatGptMark className="h-3.5 w-3.5" />
                  AI answers
                </p>
                <p className="mt-1.5 text-[13px] leading-snug text-navy-dark/85">
                  {p.ai}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* the month in numbers */}
      <div className="grid grid-cols-2 border-t border-line sm:grid-cols-4">
        {[
          ["Placements", `${live} of 8`],
          ["Indexed", `${live} of ${live}`],
          ["Top-10 keywords", "9  (+4)"],
          ["AI answers naming you", "14 of 42"],
        ].map(([k, v], n) => (
          <div
            key={k}
            className={`px-4 py-3 sm:px-5 ${n % 2 ? "border-l border-line" : ""} ${
              n > 1 ? "border-t border-line sm:border-t-0" : ""
            } ${n === 2 ? "sm:border-l" : ""}`}
          >
            <p className="text-[11px] text-navy-dark/70">{k}</p>
            <p className="mt-0.5 text-[15px] font-semibold tabular-nums text-navy-dark">
              {v}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignView;
