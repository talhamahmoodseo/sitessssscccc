import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  ArrowRight,
  Check,
  FileSearch,
  LineChart,
  Loader2,
  Map,
  MousePointer2,
  PenLine,
  ShieldCheck,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GlowPanel, Soft, ease } from "@/pages/services/kit";

/**
 * The process, pinned while the reader scrolls through five steps (restored
 * from round 7 and rebuilt in round 9). Left: the steps on a progress rail.
 * Right: a large gradient panel with a realistic screen of what that step
 * produces, swapping as you scroll. Small screens get a timeline with each
 * screen under its step. Domains in the screens are masked examples.
 */

type Tone = "warm" | "cool" | "fresh" | "rose" | "dusk";

const STEPS: {
  Icon: LucideIcon;
  t: string;
  when: string;
  d: string;
  get: string;
  tone: Tone;
}[] = [
  {
    Icon: FileSearch,
    t: "Audit",
    when: "Days 1–3",
    d: "We map where you stand: your backlinks, the sites linking to your competitors but not to you, your rankings, and whether AI answers mention you at all. The gaps become the plan.",
    get: "A backlink gap audit",
    tone: "cool",
  },
  {
    Icon: Map,
    t: "Plan",
    when: "Week 1",
    d: "We pick the pages to push, the keywords, and the mix of links, PR and mentions for each one. You see the whole plan, and nothing starts until you approve it.",
    get: "A campaign plan you sign off",
    tone: "warm",
  },
  {
    Icon: ShieldCheck,
    t: "Vet",
    when: "Weeks 1–2",
    d: "Every site goes through our 7-point check by hand, relevance first. About one in five fails, however good its DR looks.",
    get: "A shortlist you can review",
    tone: "fresh",
  },
  {
    Icon: PenLine,
    t: "Place",
    when: "Weeks 2–4",
    d: "Our writers create the content, editors publish it, and your link sits inside the article where a reader would actually click it.",
    get: "Live, indexed placements",
    tone: "rose",
  },
  {
    Icon: LineChart,
    t: "Report",
    when: "Every month",
    d: "We confirm every link is live and indexed, track your target pages, and show you what moved. One report, written for humans.",
    get: "A monthly report",
    tone: "cool",
  },
];

/* --------------------------- animation plumbing --------------------------- */

/** "mount": animate when the screen appears (pinned desktop view).
 *  "view": animate when scrolled into view (mobile timeline). */
const Mode = createContext<"mount" | "view">("mount");

const useAnim = () => {
  const mode = useContext(Mode);
  return (i = 0, base = 0.12) => {
    const t = { duration: 0.45, delay: base + i * 0.07, ease };
    return mode === "mount"
      ? { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: t }
      : {
          initial: { opacity: 0, y: 8 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-40px" },
          transition: t,
        };
  };
};

/** true once the screen should start its timed sequence */
const useStarted = () => {
  const mode = useContext(Mode);
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "-60px" });
  return [ref, mode === "mount" || seen] as const;
};

/* ------------------------------ app chrome ------------------------------ */

const AppWindow = ({
  Icon,
  title,
  crumb,
  right,
  children,
}: {
  Icon: LucideIcon;
  title: string;
  crumb: string;
  right?: ReactNode;
  children: ReactNode;
}) => (
  <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-navy-dark/[0.07] shadow-[0_1px_0_rgba(14,14,14,0.03),0_40px_80px_-40px_rgba(14,14,14,0.45)]">
    <div className="flex items-center gap-3 border-b border-line px-4 py-3 sm:px-5">
      <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-navy-dark">
        <Icon className="h-3.5 w-3.5 text-white" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] font-semibold text-navy-dark">
          {title}
        </span>
        <span className="block truncate text-[11px] text-navy-dark/60">
          {crumb}
        </span>
      </span>
      {right}
      <span className="hidden h-7 w-7 flex-none items-center justify-center rounded-full bg-lilac text-[10.5px] font-bold text-navy-dark sm:flex">
        EH
      </span>
    </div>
    <div className="p-4 sm:p-5">{children}</div>
  </div>
);

const Chip = ({
  tone = "mute",
  children,
}: {
  tone?: "ok" | "bad" | "mute" | "ink" | "accent";
  children: ReactNode;
}) => {
  const c = {
    ok: "bg-verified/[0.12] text-verified",
    bad: "bg-gap/[0.12] text-gap",
    mute: "bg-mist text-navy-dark/75 ring-1 ring-line",
    ink: "bg-navy-dark text-white",
    accent:
      "bg-[linear-gradient(90deg,rgb(var(--plume-warm)),rgb(var(--plume-cool)))] text-white",
  }[tone];
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${c}`}
    >
      {children}
    </span>
  );
};

const Mark = ({ ok }: { ok: boolean }) =>
  ok ? (
    <span className="mx-auto flex h-4 w-4 items-center justify-center rounded-full bg-verified/[0.14]">
      <Check className="h-2.5 w-2.5 text-verified" strokeWidth={3} />
    </span>
  ) : (
    <span className="mx-auto block h-px w-2.5 bg-navy-dark/25" />
  );

const Kpi = ({
  k,
  v,
  tone,
  i,
}: {
  k: string;
  v: string;
  tone?: "accent" | "bad";
  i: number;
}) => {
  const a = useAnim();
  return (
    <motion.div className="rounded-xl bg-mist px-3 py-2.5 ring-1 ring-line" {...a(i, 0.05)}>
      <p className="text-[10.5px] leading-tight text-navy-dark/65">{k}</p>
      <p
        className={`mt-0.5 text-[19px] font-semibold leading-none tracking-[-0.03em] tabular-nums ${
          tone === "accent" ? "accent-ink" : tone === "bad" ? "text-gap" : "text-navy-dark"
        }`}
      >
        {v}
      </p>
    </motion.div>
  );
};

/* -------------------------------- screens -------------------------------- */

const GAP: [string, number, boolean[], "win" | "have" | "skip"][] = [
  ["saas•••weekly.com", 61, [false, true, true, true], "win"],
  ["cx•••today.com", 66, [false, true, true, false], "win"],
  ["the•••journal.com", 71, [false, true, false, true], "win"],
  ["growth•••hub.io", 54, [true, true, true, true], "have"],
  ["deals•••blog.net", 64, [false, true, false, false], "skip"],
  ["b2b•••digest.com", 63, [false, true, true, false], "win"],
];

const AuditScreen = () => {
  const a = useAnim();
  return (
    <AppWindow
      Icon={FileSearch}
      title="Backlink gap"
      crumb="yourbrand.com against 3 competitors"
      right={<Chip tone="mute">Updated today</Chip>}
    >
      <div className="grid grid-cols-3 gap-2">
        <Kpi i={0} k="Your referring domains" v="140" />
        <Kpi i={1} k="Link to rivals, not you" v="212" tone="accent" />
        <Kpi i={2} k="AI answers naming you" v="0 / 20" tone="bad" />
      </div>
      <table className="mt-4 w-full text-left">
        <thead>
          <tr className="text-[10px] font-semibold uppercase tracking-[0.08em] text-navy-dark/55">
            <th className="pb-2 font-semibold">Referring domain</th>
            <th className="pb-2 text-center font-semibold">DR</th>
            <th className="pb-2 text-center font-semibold">You</th>
            <th className="hidden pb-2 text-center font-semibold sm:table-cell">Rival A</th>
            <th className="hidden pb-2 text-center font-semibold sm:table-cell">Rival B</th>
            <th className="hidden pb-2 text-center font-semibold md:table-cell">Rival C</th>
            <th className="pb-2 text-right font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {GAP.map(([d, dr, has, st], i) => (
            <motion.tr key={d} className="border-t border-line" {...a(i, 0.3)}>
              <td className="py-2 text-[12px] font-medium text-navy-dark">{d}</td>
              <td className="py-2 text-center text-[12px] font-semibold tabular-nums text-navy-dark">
                {dr}
              </td>
              <td className="py-2"><Mark ok={has[0]} /></td>
              <td className="hidden py-2 sm:table-cell"><Mark ok={has[1]} /></td>
              <td className="hidden py-2 sm:table-cell"><Mark ok={has[2]} /></td>
              <td className="hidden py-2 md:table-cell"><Mark ok={has[3]} /></td>
              <td className="py-2 text-right">
                {st === "win" ? (
                  <Chip tone="accent">Winnable</Chip>
                ) : st === "have" ? (
                  <Chip tone="mute">Have it</Chip>
                ) : (
                  <Chip tone="bad">Skip · spam</Chip>
                )}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </AppWindow>
  );
};

const PLAN: [string, string, string, string, string][] = [
  ["/pricing", "crm for small business", "#14", "Top 5", "4 links"],
  ["/features/automation", "sales automation tool", "#22", "Top 10", "3 links"],
  ["/integrations/hubspot", "hubspot crm integration", "#9", "Top 3", "2 links"],
  ["Brand", "best crm for startups", "Not named", "AI answers", "5 mentions"],
];

const MONTHS: [string, number[]][] = [
  ["Month 1", [2, 1, 1]],
  ["Month 2", [2, 2, 1]],
  ["Month 3", [1, 2, 2]],
];
const MIX = ["bg-navy-dark", "bg-[rgb(var(--plume-cool))]", "bg-[rgb(var(--plume-warm))]"];

const PlanScreen = () => {
  const a = useAnim();
  const [ref, started] = useStarted();
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setOk(true), 1900);
    return () => clearTimeout(t);
  }, [started]);
  return (
    <div ref={ref}>
      <AppWindow
        Icon={Map}
        title="Campaign plan"
        crumb="First 90 days · 14 placements"
        right={ok ? <Chip tone="ok"><Check className="h-3 w-3" />Approved</Chip> : <Chip tone="mute">Waiting for you</Chip>}
      >
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] font-semibold uppercase tracking-[0.08em] text-navy-dark/55">
              <th className="pb-2 font-semibold">Target</th>
              <th className="hidden pb-2 font-semibold sm:table-cell">Keyword</th>
              <th className="pb-2 text-center font-semibold">Now</th>
              <th className="pb-2 text-center font-semibold">Goal</th>
              <th className="pb-2 text-right font-semibold">Plan</th>
            </tr>
          </thead>
          <tbody>
            {PLAN.map(([p, k, now, goal, n], i) => (
              <motion.tr key={p} className="border-t border-line" {...a(i, 0.15)}>
                <td className="py-2 text-[12px] font-semibold text-navy-dark">{p}</td>
                <td className="hidden py-2 text-[12px] text-navy-dark/75 sm:table-cell">{k}</td>
                <td className="py-2 text-center text-[11.5px] tabular-nums text-navy-dark/70">{now}</td>
                <td className="py-2 text-center"><Chip tone="mute">{goal}</Chip></td>
                <td className="py-2 text-right text-[12px] font-semibold text-navy-dark">{n}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        <motion.div className="mt-4 rounded-xl bg-mist p-3.5 ring-1 ring-line" {...a(4, 0.2)}>
          <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
            <p className="text-[11.5px] font-semibold text-navy-dark">Placements by month</p>
            <span className="flex gap-3 text-[10.5px] text-navy-dark/65">
              {["Guest post", "Niche edit", "Mention"].map((l, i) => (
                <span key={l} className="flex items-center gap-1">
                  <span className={`h-2 w-2 rounded-[2px] ${MIX[i]}`} />
                  {l}
                </span>
              ))}
            </span>
          </div>
          <div className="space-y-1.5">
            {MONTHS.map(([m, parts], i) => (
              <div key={m} className="flex items-center gap-3">
                <span className="w-14 text-[11px] text-navy-dark/65">{m}</span>
                <div className="flex flex-1 gap-1">
                  {parts.flatMap((n, j) =>
                    Array.from({ length: n }, (_, x) => (
                      <motion.span
                        key={`${j}-${x}`}
                        className={`h-3.5 flex-1 rounded-[4px] ${MIX[j]}`}
                        initial={{ scaleX: 0 }}
                        animate={started ? { scaleX: 1 } : undefined}
                        style={{ originX: 0 }}
                        transition={{ duration: 0.35, delay: 0.5 + i * 0.15 + (j * 2 + x) * 0.04 }}
                      />
                    )),
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="relative mt-4 flex items-center justify-end gap-2">
          <span className="rounded-lg px-3 py-1.5 text-[12px] font-semibold text-navy-dark/70 ring-1 ring-line">
            Suggest changes
          </span>
          <motion.span
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold text-white ${ok ? "bg-verified" : "bg-navy-dark"}`}
            animate={ok ? { scale: [1, 0.94, 1] } : undefined}
            transition={{ duration: 0.3 }}
          >
            {ok ? (<><Check className="h-3.5 w-3.5" />Plan approved</>) : "Approve plan"}
          </motion.span>
          {started && (
            <motion.span
              className="pointer-events-none absolute"
              initial={{ x: -120, y: 40, opacity: 0 }}
              animate={{ x: -24, y: 14, opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.9, times: [0, 0.2, 0.85, 1], ease }}
              aria-hidden="true"
            >
              <MousePointer2 className="h-5 w-5 fill-white text-navy-dark" />
            </motion.span>
          )}
        </div>
      </AppWindow>
    </div>
  );
};

const CHECKS: [string, string][] = [
  ["Relevance", "Writes about SaaS, sales and small business"],
  ["Keywords", "Ranks for 2.4K real searches in your niche"],
  ["Trend", "Rankings steady for two years, no sudden drops"],
  ["Audience", "Most readers in the US and UK, your market"],
  ["Authority", "DR 58, from 1.2K real referring domains"],
  ["Indexed", "Recent posts are all in Google"],
  ["Editorial", "A real editor, no public price list"],
];

const VetScreen = () => {
  const [ref, started] = useStarted();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!started) return;
    const id = setInterval(() => setN((x) => (x >= CHECKS.length ? x : x + 1)), 300);
    return () => clearInterval(id);
  }, [started]);
  const done = n >= CHECKS.length;
  return (
    <div ref={ref}>
      <AppWindow
        Icon={ShieldCheck}
        title="Site check"
        crumb="techgrowth•••.com · guest post"
        right={<Chip tone="mute">{Math.min(n, 7)} of 7</Chip>}
      >
        <div className="grid gap-4 md:grid-cols-[1.45fr_1fr]">
          <ul className="space-y-1">
            {CHECKS.map(([k, d], i) => {
              const state = i < n ? "ok" : i === n ? "run" : "wait";
              return (
                <li
                  key={k}
                  className={`flex items-start gap-2.5 rounded-lg px-2 py-1.5 transition-colors duration-300 ${state === "run" ? "bg-mist" : ""}`}
                >
                  <span className="mt-px flex h-4 w-4 flex-none items-center justify-center">
                    {state === "ok" ? (
                      <motion.span
                        className="flex h-4 w-4 items-center justify-center rounded-full bg-verified"
                        initial={{ scale: 0.4 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 22 }}
                      >
                        <Check className="h-2.5 w-2.5 text-white" strokeWidth={3.5} />
                      </motion.span>
                    ) : state === "run" ? (
                      <Loader2 className="h-4 w-4 animate-spin text-navy-dark/50" />
                    ) : (
                      <span className="h-3.5 w-3.5 rounded-full border border-navy-dark/20" />
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className={`block text-[12px] font-semibold ${state === "wait" ? "text-navy-dark/40" : "text-navy-dark"}`}>
                      {k}
                    </span>
                    <span className={`block text-[11px] leading-snug ${state === "wait" ? "text-navy-dark/30" : "text-navy-dark/65"}`}>
                      {d}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="flex flex-col gap-2.5">
            <div className="rounded-xl bg-mist p-3 ring-1 ring-line">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-navy-dark/55">
                Today's queue
              </p>
              <div className="mt-2 grid grid-cols-3 gap-1 text-center">
                {[
                  ["14", "reviewed"],
                  ["11", "approved"],
                  ["3", "rejected"],
                ].map(([v, l], i) => (
                  <span key={l}>
                    <span className={`block text-[17px] font-semibold tabular-nums ${i === 2 ? "text-gap" : "text-navy-dark"}`}>
                      {v}
                    </span>
                    <span className="block text-[10px] text-navy-dark/60">{l}</span>
                  </span>
                ))}
              </div>
            </div>
            {[
              ["deals•••hub.net", "DR 64, ranks for nothing relevant"],
              ["crypto•••bets.io", "Off-topic for your niche"],
            ].map(([d, why]) => (
              <div key={d} className="flex items-start gap-2 rounded-xl bg-white p-2.5 ring-1 ring-line">
                <span className="mt-px flex h-4 w-4 flex-none items-center justify-center rounded-full bg-gap/[0.12]">
                  <X className="h-2.5 w-2.5 text-gap" strokeWidth={3} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[11.5px] font-semibold text-navy-dark">{d}</span>
                  <span className="block text-[10.5px] leading-snug text-navy-dark/60">{why}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
        <AnimatePresence>
          {done && (
            <motion.div
              className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-verified/[0.1] px-3.5 py-2.5"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease }}
            >
              <span className="flex items-center gap-2 text-[12.5px] font-semibold text-verified">
                <Check className="h-4 w-4" strokeWidth={3} />
                Passed all 7 checks
              </span>
              <span className="text-[11.5px] font-medium text-navy-dark/70">Added to your shortlist</span>
            </motion.div>
          )}
        </AnimatePresence>
      </AppWindow>
    </div>
  );
};

const PlaceScreen = () => {
  const a = useAnim();
  const [ref, started] = useStarted();
  return (
    <div ref={ref} className="overflow-hidden rounded-2xl bg-white ring-1 ring-navy-dark/[0.07] shadow-[0_1px_0_rgba(14,14,14,0.03),0_40px_80px_-40px_rgba(14,14,14,0.45)]">
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2.5 w-2.5 rounded-full bg-navy-dark/15" />
          ))}
        </span>
        <span className="ml-2 truncate rounded-md bg-mist px-2.5 py-1 text-[11px] text-navy-dark/65">
          thegrowth•••review.com/small-sales-teams
        </span>
      </div>
      <div className="flex items-center justify-between border-b border-line px-5 py-3 sm:px-7">
        <span className="font-news text-[17px] font-semibold tracking-[-0.01em] text-navy-dark">
          The Growth Review
        </span>
        <span className="hidden gap-4 text-[11px] text-navy-dark/55 sm:flex">
          <span>Sales</span>
          <span>Marketing</span>
          <span>Tools</span>
        </span>
      </div>
      <div className="px-5 pb-6 pt-5 sm:px-7">
        <motion.p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[rgb(var(--plume-warm))]" {...a(0)}>
          Sales
        </motion.p>
        <motion.h4 className="mt-1.5 font-news text-[22px] font-semibold leading-[1.15] tracking-[-0.01em] text-navy-dark sm:text-[25px]" {...a(1)}>
          Seven ways small sales teams win back their week
        </motion.h4>
        <motion.div className="mt-3 flex items-center gap-2" {...a(2)}>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-butter text-[9px] font-bold text-navy-dark ring-1 ring-line">
            SL
          </span>
          <span className="text-[11px] text-navy-dark/60">Sarah Lin · 6 min read · October 12</span>
        </motion.div>
        <motion.p className="mt-4 text-[13px] leading-[1.7] text-navy-dark/75" {...a(3)}>
          Most small teams don't lose deals to competitors. They lose them to
          busywork: copying notes between tools, chasing replies, forgetting
          to follow up.
        </motion.p>
        <motion.p className="relative mt-3 text-[13px] leading-[1.7] text-navy-dark/75" {...a(4)}>
          The fix is rarely another hire. For most teams it starts with a{" "}
          <span className="relative font-semibold text-navy-dark">
            <motion.span
              className="absolute inset-x-[-2px] bottom-[1px] top-[55%] -z-0 origin-left rounded-[2px] bg-[rgb(var(--mark)/0.75)]"
              initial={{ scaleX: 0 }}
              animate={started ? { scaleX: 1 } : undefined}
              transition={{ duration: 0.6, delay: 0.9, ease }}
              aria-hidden="true"
            />
            <span className="relative underline decoration-navy-dark/40 underline-offset-2">
              CRM built for small businesses
            </span>
          </span>{" "}
          that logs calls and emails on its own.
          <motion.span
            className="absolute right-0 top-full z-10 mt-2 flex items-center gap-2.5 rounded-xl bg-navy-dark px-3 py-2 text-[11px] text-white shadow-deep sm:right-6"
            initial={{ opacity: 0, y: -4 }}
            animate={started ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.4, delay: 1.5, ease }}
          >
            <span className="font-semibold">yourbrand.com/pricing</span>
            <span className="text-white/60">dofollow</span>
            <span className="flex items-center gap-1 text-[#86efac]">
              <Check className="h-3 w-3" strokeWidth={3} />
              Indexed in 4 days
            </span>
          </motion.span>
        </motion.p>
        <motion.div className="mt-12 space-y-2" {...a(5)} aria-hidden="true">
          {[100, 96, 88, 60].map((w) => (
            <span key={w} className="block h-2 rounded-full bg-navy-dark/[0.07]" style={{ width: `${w}%` }} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const RANKS = [14, 12, 11, 8, 6, 4];

const ReportScreen = () => {
  const a = useAnim();
  const [ref, started] = useStarted();
  const W = 560;
  const H = 130;
  const x = (i: number) => (i / (RANKS.length - 1)) * W;
  const y = (r: number) => ((r - 1) / 15) * (H - 34) + 10;
  const d = RANKS.map((r, i) => `${i ? "L" : "M"}${x(i)},${y(r)}`).join(" ");
  return (
    <div ref={ref}>
      <AppWindow
        Icon={LineChart}
        title="Monthly report"
        crumb="October · yourbrand.com"
        right={<Chip tone="mute">PDF · shared</Chip>}
      >
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Kpi i={0} k="Placements live" v="14 / 14" />
          <Kpi i={1} k="Indexed by Google" v="14 / 14" />
          <Kpi i={2} k="Average DR" v="61" />
          <Kpi i={3} k="Pages in the top 10" v="5 / 6" tone="accent" />
        </div>
        <motion.div className="mt-4 rounded-xl ring-1 ring-line" {...a(4, 0.15)}>
          <div className="flex items-baseline justify-between gap-2 px-3.5 pt-3">
            <p className="text-[11.5px] font-semibold text-navy-dark">
              /pricing · “crm for small business”
            </p>
            <Chip tone="ok">#14 → #4</Chip>
          </div>
          <svg viewBox={`-32 0 ${W + 44} ${H}`} className="block h-auto w-full" aria-hidden="true">
            {[1, 5, 10, 15].map((r) => (
              <g key={r}>
                <line x1={0} x2={W} y1={y(r)} y2={y(r)} stroke="rgba(14,14,14,0.07)" strokeDasharray="3 5" />
                <text x={-8} y={y(r) + 3.5} fontSize="10" textAnchor="end" fill="rgba(14,14,14,0.45)">
                  #{r}
                </text>
              </g>
            ))}
            <motion.path
              d={d}
              fill="none"
              stroke="url(#rep)"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={started ? { pathLength: 1 } : undefined}
              transition={{ duration: 1.3, delay: 0.4, ease }}
            />
            <defs>
              <linearGradient id="rep" x1="0" x2="1">
                <stop offset="0" stopColor="rgb(var(--plume-warm))" />
                <stop offset="1" stopColor="rgb(var(--plume-cool))" />
              </linearGradient>
            </defs>
            {RANKS.map((r, i) => (
              <motion.circle
                key={i}
                cx={x(i)}
                cy={y(r)}
                r={4}
                fill="white"
                stroke="rgb(var(--ink))"
                strokeWidth={1.5}
                initial={{ opacity: 0 }}
                animate={started ? { opacity: 1 } : undefined}
                transition={{ delay: 0.4 + i * 0.2 }}
              />
            ))}
            {["May", "Jun", "Jul", "Aug", "Sep", "Oct"].map((m, i) => (
              <text key={m} x={x(i)} y={H - 4} fontSize="10" textAnchor="middle" fill="rgba(14,14,14,0.5)">
                {m}
              </text>
            ))}
          </svg>
        </motion.div>
        <motion.div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-mist px-3.5 py-2.5 ring-1 ring-line" {...a(5, 0.2)}>
          <span className="text-[11.5px] text-navy-dark/75">AI answers that name you</span>
          <span className="text-[12.5px] font-semibold text-navy-dark">
            7 of 20 <span className="font-normal text-navy-dark/55">(was 0)</span>
          </span>
        </motion.div>
      </AppWindow>
    </div>
  );
};

const SCREENS = [AuditScreen, PlanScreen, VetScreen, PlaceScreen, ReportScreen];

/* --------------------------------- pieces --------------------------------- */

const Heading = () => (
  <h2 className="text-[2rem] font-semibold leading-[1.06] tracking-[-0.035em] text-navy-dark sm:text-[2.6rem]">
    How every campaign runs,
    <br />
    <Soft>from first audit to monthly report.</Soft>
  </h2>
);

const GetChip = ({ children }: { children: ReactNode }) => (
  <span className="inline-flex items-center gap-2 rounded-full bg-white py-1.5 pl-2 pr-3.5 ring-1 ring-line">
    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[linear-gradient(90deg,rgb(var(--plume-warm)),rgb(var(--plume-cool)))]">
      <Check className="h-3 w-3 text-white" strokeWidth={3} />
    </span>
    <span className="text-[11px] font-bold uppercase tracking-wider text-navy-dark/60">
      You get
    </span>
    <span className="text-[13px] font-semibold text-navy-dark">{children}</span>
  </span>
);

/* --------------------------------- section --------------------------------- */

const Process = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  // the rail fills a little ahead of the active step
  const fill = useTransform(smooth, [0, 0.9], [0.1, 1]);

  useEffect(
    () =>
      scrollYProgress.on("change", (v) =>
        setStep(Math.min(Math.floor(v * STEPS.length), STEPS.length - 1)),
      ),
    [scrollYProgress],
  );

  const goTo = (n: number) => {
    const el = ref.current;
    if (!el) return;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: el.offsetTop + ((n + 0.5) / STEPS.length) * travel,
      behavior: "smooth",
    });
  };

  const Screen = SCREENS[step];

  return (
    <div className="bg-linen" ref={ref}>
      {/* desktop: pinned while the five steps scroll past */}
      <div className="relative hidden lg:block lg:h-[340vh]">
        <div className="sticky top-0 flex h-screen items-center pb-6 pt-[84px]">
          <div className="mx-auto w-full max-w-7xl px-8">
            <motion.div
              className="mb-8 flex items-end justify-between gap-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="max-w-2xl">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/70">
                  The process
                </p>
                <Heading />
              </div>
              <p className="max-w-xs pb-1 text-[14.5px] leading-relaxed text-navy-dark/75">
                The same five steps whether you hire us for links, PR or
                mentions. Your part is one call and a look at each report.
              </p>
            </motion.div>

            <div className="grid grid-cols-[0.8fr_1.2fr] items-center gap-12 xl:gap-16">
              {/* the steps on a rail */}
              <ol className="relative">
                <span className="absolute bottom-5 left-[19px] top-5 w-px bg-navy-dark/10" aria-hidden="true" />
                <motion.span
                  className="absolute bottom-5 left-[19px] top-5 w-px origin-top bg-[linear-gradient(180deg,rgb(var(--plume-warm)),rgb(var(--plume-cool)))]"
                  style={{ scaleY: fill }}
                  aria-hidden="true"
                />
                {STEPS.map((s, i) => {
                  const on = i === step;
                  const past = i < step;
                  return (
                    <li key={s.t} className="relative">
                      <button
                        onClick={() => goTo(i)}
                        className="group flex w-full items-start gap-5 py-2.5 text-left"
                        aria-current={on ? "step" : undefined}
                      >
                        <span
                          className={`relative z-10 flex h-10 w-10 flex-none items-center justify-center rounded-full text-[13px] font-semibold ring-[5px] ring-linen transition-colors duration-500 ${
                            on
                              ? "bg-navy-dark text-white"
                              : past
                                ? "bg-white text-navy-dark ring-linen"
                                : "bg-white text-navy-dark/45"
                          }`}
                        >
                          {past ? <Check className="h-4 w-4" strokeWidth={2.5} /> : `0${i + 1}`}
                        </span>
                        <span className="min-w-0 flex-1 pt-2">
                          <span className="flex items-baseline justify-between gap-3">
                            <span
                              className={`text-[19px] font-semibold tracking-[-0.02em] transition-colors duration-500 ${
                                on ? "text-navy-dark" : "text-navy-dark/45 group-hover:text-navy-dark/70"
                              }`}
                            >
                              {s.t}
                            </span>
                            <span className={`text-[11.5px] font-semibold uppercase tracking-[0.1em] ${on ? "text-navy-dark/65" : "text-navy-dark/35"}`}>
                              {s.when}
                            </span>
                          </span>
                          <AnimatePresence initial={false}>
                            {on && (
                              <motion.span
                                className="block overflow-hidden"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.45, ease }}
                              >
                                <span className="mt-2 block max-w-md text-[15px] leading-relaxed text-navy-dark/75">
                                  {s.d}
                                </span>
                                <span className="mt-4 block pb-1">
                                  <GetChip>{s.get}</GetChip>
                                </span>
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>

              {/* what this step produces */}
              <GlowPanel tone={STEPS[step].tone} className="p-7 xl:p-9">
                <div className="relative h-[min(470px,calc(100vh-380px))] min-h-[340px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      className="absolute inset-0"
                      initial={{ opacity: 0, y: 18, scale: 0.985 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -12, scale: 0.985 }}
                      transition={{ duration: 0.4, ease }}
                    >
                      <Mode.Provider value="mount">
                        <Screen />
                      </Mode.Provider>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    {STEPS.map((s, i) => (
                      <button
                        key={s.t}
                        onClick={() => goTo(i)}
                        aria-label={`Step ${i + 1}: ${s.t}`}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          i === step ? "w-8 bg-navy-dark" : "w-1.5 bg-navy-dark/25 hover:bg-navy-dark/45"
                        }`}
                      />
                    ))}
                  </span>
                  <span className="text-[12.5px] text-navy-dark/70">
                    {step < STEPS.length - 1 ? (
                      <>
                        Next: <span className="font-semibold text-navy-dark">{STEPS[step + 1].t}</span>
                      </>
                    ) : (
                      <a href="#contact" className="inline-flex items-center gap-1.5 font-semibold text-navy-dark">
                        Start with a free audit
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </span>
                </div>
              </GlowPanel>
            </div>
          </div>
        </div>
      </div>

      {/* small screens: a timeline, each step with its screen */}
      <div className="px-4 py-20 sm:px-6 lg:hidden">
        <div className="mx-auto max-w-2xl">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/70">
              The process
            </p>
            <Heading />
          </motion.div>
          <Mode.Provider value="view">
            <ol className="relative space-y-14">
              {STEPS.map((s, i) => {
                const S = SCREENS[i];
                return (
                  <motion.li
                    key={s.t}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.55, ease }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-dark text-[12.5px] font-semibold text-white">
                        0{i + 1}
                      </span>
                      <span className="text-[11.5px] font-semibold uppercase tracking-[0.1em] text-navy-dark/60">
                        {s.when}
                      </span>
                    </div>
                    <h3 className="mt-4 text-[24px] font-semibold tracking-[-0.02em] text-navy-dark">
                      {s.t}
                    </h3>
                    <p className="mt-2 text-[15.5px] leading-relaxed text-navy-dark/75">{s.d}</p>
                    <div className="mt-4">
                      <GetChip>{s.get}</GetChip>
                    </div>
                    <GlowPanel tone={s.tone} className="mt-6 p-3 sm:p-6">
                      <S />
                    </GlowPanel>
                  </motion.li>
                );
              })}
            </ol>
          </Mode.Provider>
        </div>
      </div>
    </div>
  );
};

export default Process;
