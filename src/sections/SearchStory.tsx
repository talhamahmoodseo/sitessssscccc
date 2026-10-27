import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { Check, RotateCcw, Search } from "lucide-react";
import { AiOverviewMark, GoogleMark } from "@/components/PlatformMarks";

/**
 * Homepage hero: the headline, shown happening.
 *
 * One Google results page for one buyer search. Editorial links go live on
 * the left; with each one, the client's result climbs a place on the right,
 * from #4 to #1; then Google's AI Overview starts naming the brand. Three
 * captions underneath say what's happening. It plays once when it comes
 * into view, holds the final frame, and can be replayed.
 *
 * Every company and publication here is made up: it's an illustration of
 * how a campaign works, not a client result (those are on /case-studies).
 *
 * Cost: one state change every couple of seconds. Everything that moves is
 * a CSS transition on transform or opacity, so the browser never lays the
 * page out again while it plays. The first render (step 0) is what the
 * prerendered HTML shows, so hydration matches.
 */

const QUERY = "best crm for small teams";

type Result = { id: string; site: string; url: string; title: string; text: string; mark: string; tint: string };

const OTHERS: Result[] = [
  {
    id: "a",
    site: "CRM Review",
    url: "crmreview.io › best-crm-small-teams",
    title: "The 9 best CRMs for small teams in 2026",
    text: "We tested 30 CRMs with teams of 2 to 20 people. Here's what we'd pick…",
    mark: "C",
    tint: "bg-sky",
  },
  {
    id: "b",
    site: "Teamstack",
    url: "teamstack.com",
    title: "Teamstack: the CRM small teams actually use",
    text: "Free for two users. Pipelines, email sync and reminders in one place…",
    mark: "T",
    tint: "bg-blush",
  },
  {
    id: "c",
    site: "Sales Weekly",
    url: "salesweekly.com › reviews",
    title: "Best CRM for startups and small teams, compared",
    text: "Pricing, setup time and support for the ten tools teams ask about most…",
    mark: "S",
    tint: "bg-linen",
  },
];

const YOURS: Result = {
  id: "you",
  site: "YourBrand",
  url: "yourbrand.com",
  title: "YourBrand CRM: set up in an afternoon",
  text: "Built for teams under ten. Pipelines, reminders and reports, no consultant…",
  mark: "Y",
  tint: "bg-navy-dark text-white",
};

const LINKS = [
  { pub: "Growth Weekly", kind: "Guest post", dr: 64, mark: "G", tint: "bg-lilac" },
  { pub: "The Business Desk", kind: "PR feature", dr: 78, mark: "B", tint: "bg-mint" },
  { pub: "Founders Journal", kind: "Expert quote", dr: 66, mark: "F", tint: "bg-butter" },
];

const SOURCES = ["crmreview.io", "salesweekly.com", "softwarelist.co"];

const CAPTIONS = [
  "Editorial links go live",
  "Your page climbs Google",
  "AI answers start citing you",
];

/** step 0 = before; 1–3 = a link goes live and you climb; 4 = AI cites you */
const LAST = 4;
const DELAYS = [1200, 2100, 2100, 2300];
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const SearchStory = () => {
  // start when the results list is on screen, so the climb is never missed
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (reduced) {
      setStep(LAST);
      return;
    }
    if (!seen || step >= LAST) return;
    const t = setTimeout(() => setStep((s) => s + 1), DELAYS[step]);
    return () => clearTimeout(t);
  }, [seen, step, reduced, run]);

  const links = Math.min(step, 3);
  const cited = step >= LAST;
  // you start fourth and move up one place per link
  const yourPlace = 3 - links;
  const order = [...OTHERS];
  order.splice(yourPlace, 0, YOURS);
  const placeOf = (id: string) => order.findIndex((r) => r.id === id);
  const done = [step >= 1, step >= 3, step >= LAST];

  const replay = () => {
    setStep(0);
    setRun((n) => n + 1);
  };

  return (
    <div>
      <div
        role="img"
        aria-label={`Illustration: three editorial links go live, a page climbs from fourth to first on Google for "${QUERY}", and Google's AI Overview starts naming the brand.`}
        className="overflow-hidden rounded-[26px] bg-white text-left shadow-[0_1px_2px_rgba(14,14,14,0.05),0_40px_90px_-40px_rgba(14,14,14,0.42)] ring-1 ring-navy-dark/[0.07]"
      >
        <div aria-hidden="true" className="grid lg:grid-cols-[300px_1fr]">
          {/* links going live */}
          <div className="flex flex-col border-b border-line bg-mist/70 p-4 sm:p-5 lg:border-b-0 lg:border-r lg:p-6">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-navy-dark/60">
                Links placed
              </span>
              <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-navy-dark px-2 text-[12px] font-bold tabular-nums text-white">
                {links}
              </span>
            </div>
            <div className="relative mt-3 h-[60px] overflow-hidden [--frow:68px] lg:mt-4 lg:h-[220px] lg:overflow-visible lg:[--frow:76px]">
              {links === 0 && (
                <div className="absolute inset-0 flex items-center rounded-2xl border border-dashed border-navy-dark/15 px-4 text-[12.5px] text-navy-dark/55 lg:h-[60px]">
                  Finding sites your buyers read…
                </div>
              )}
              {LINKS.map((l, i) => {
                const live = i < links;
                // newest on top
                const pos = live ? links - 1 - i : 0;
                return (
                  <div
                    key={l.pub}
                    className="absolute inset-x-0 top-0 flex h-[60px] items-center gap-3 rounded-2xl bg-white px-3 ring-1 ring-line"
                    style={{
                      transform: `translateY(calc(${pos} * var(--frow) + ${live ? 0 : -10}px))`,
                      opacity: live ? 1 : 0,
                      transition: `transform 700ms ${EASE}, opacity 500ms ease`,
                    }}
                  >
                    <span className={`flex h-9 w-9 flex-none items-center justify-center rounded-xl text-[14px] font-bold text-navy-dark ${l.tint}`}>
                      {l.mark}
                    </span>
                    <span className="min-w-0 flex-1 leading-tight">
                      <span className="block truncate text-[13.5px] font-semibold text-navy-dark">{l.pub}</span>
                      <span className="mt-1 flex items-center gap-1.5 whitespace-nowrap text-[12px] text-navy-dark/65">
                        {l.kind} · DR {l.dr}
                        <span className="inline-flex items-center gap-0.5 font-semibold text-[rgb(var(--verified))]">
                          <Check className="h-3 w-3" strokeWidth={3} />
                          Indexed
                        </span>
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-auto hidden rounded-2xl bg-white p-4 ring-1 ring-line lg:block">
              <span className="block text-[12px] font-semibold uppercase tracking-[0.12em] text-navy-dark/60">
                Your Google position
              </span>
              <span className="mt-1 block truncate text-[12px] text-navy-dark/60">“{QUERY}”</span>
              <span className="mt-3 flex items-end gap-2">
                <span className="text-[2.6rem] font-semibold leading-none tracking-[-0.04em] tabular-nums text-navy-dark">
                  #{yourPlace + 1}
                </span>
                <span
                  className="mb-1 text-[12.5px] font-semibold text-[rgb(var(--verified))]"
                  style={{ opacity: links ? 1 : 0, transition: "opacity 400ms ease 900ms" }}
                >
                  up from #4
                </span>
              </span>
            </div>
          </div>

          {/* the results page */}
          <div className="p-4 sm:p-6 lg:p-7">
            <div className="flex h-11 items-center gap-3 rounded-full px-4 ring-1 ring-line">
              <GoogleMark className="h-[18px] w-[18px] flex-none" />
              <span className="min-w-0 flex-1 truncate text-[14px] text-navy-dark">{QUERY}</span>
              <Search className="h-4 w-4 flex-none text-navy-dark/50" />
            </div>

            {/* AI Overview */}
            <div className="mt-4 rounded-2xl bg-[linear-gradient(120deg,rgb(var(--plume-cool)/0.07),rgb(var(--plume-warm)/0.05))] p-4 ring-1 ring-[rgb(var(--plume-cool)/0.12)]">
              <div className="flex items-center gap-2 text-[12.5px] font-semibold text-navy-dark">
                <AiOverviewMark className="h-4 w-4" />
                AI Overview
              </div>
              <p className="mt-2 text-[13.5px] leading-relaxed text-navy-dark/80 sm:text-[14px]">
                For small teams, reviewers mostly recommend CRMs that are quick to
                set up and priced per seat. The names that come up most are
                Teamstack, Northdesk and{" "}
                <span className="relative inline-grid align-baseline">
                  <span
                    className="col-start-1 row-start-1 my-auto h-[0.95em] rounded bg-navy-dark/10"
                    style={{ opacity: cited ? 0 : 1, transition: "opacity 400ms ease" }}
                  />
                  <span
                    className="col-start-1 row-start-1 font-semibold text-navy-dark underline decoration-[rgb(var(--plume-cool))] decoration-2 underline-offset-[3px]"
                    style={{ opacity: cited ? 1 : 0, transition: "opacity 500ms ease 150ms" }}
                  >
                    YourBrand
                  </span>
                </span>
                .
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {SOURCES.map((s) => (
                  <span key={s} className="rounded-full bg-white px-2.5 py-1 text-[11px] text-navy-dark/70 ring-1 ring-line">
                    {s}
                  </span>
                ))}
                <span className="relative inline-grid">
                  <span
                    className="col-start-1 row-start-1 rounded-full border border-dashed border-navy-dark/20 px-2.5 py-1 text-[11px] text-transparent"
                    style={{ opacity: cited ? 0 : 1, transition: "opacity 400ms ease" }}
                  >
                    yourbrand.com
                  </span>
                  <span
                    className="col-start-1 row-start-1 rounded-full bg-navy-dark px-2.5 py-1 text-[11px] font-semibold text-white"
                    style={{
                      opacity: cited ? 1 : 0,
                      transform: cited ? "none" : "scale(0.85)",
                      transition: `opacity 400ms ease 350ms, transform 600ms ${EASE} 350ms`,
                    }}
                  >
                    yourbrand.com
                  </span>
                </span>
              </div>
            </div>

            {/* organic results */}
            <div ref={ref} className="relative mt-3 h-[calc(4*var(--row))] [--row:80px] sm:[--row:86px]">
              {[...OTHERS, YOURS].map((r) => {
                const you = r.id === "you";
                const place = placeOf(r.id);
                return (
                  <div
                    key={r.id}
                    className="absolute inset-x-0 top-0 flex h-[var(--row)] items-center gap-3 rounded-2xl px-2 sm:px-3"
                    style={{
                      transform: `translateY(calc(${place} * var(--row)))`,
                      transition: `transform 900ms ${EASE} ${you ? 450 : 520}ms`,
                      zIndex: you ? 2 : 1,
                    }}
                  >
                    {you && (
                      <span
                        className="absolute inset-0 rounded-2xl bg-[rgb(var(--plume-cool)/0.06)] ring-1 ring-[rgb(var(--plume-cool)/0.22)]"
                        style={{ opacity: links ? 1 : 0, transition: "opacity 500ms ease" }}
                      />
                    )}
                    <span className="relative w-5 flex-none text-center text-[12px] font-semibold tabular-nums text-navy-dark/55">
                      {place + 1}
                    </span>
                    <span className={`relative flex h-8 w-8 flex-none items-center justify-center rounded-full text-[13px] font-bold ${r.tint} ${you ? "" : "text-navy-dark"}`}>
                      {r.mark}
                    </span>
                    <span className="relative min-w-0 flex-1 leading-tight">
                      <span className="block truncate text-[11.5px] text-navy-dark/60">
                        <span className="font-semibold text-navy-dark/80">{r.site}</span>
                        {" · "}
                        {r.url}
                      </span>
                      <span className="mt-1 line-clamp-2 text-[14px] font-semibold leading-snug tracking-[-0.01em] text-navy-dark sm:line-clamp-1 sm:text-[16px]">
                        {r.title}
                      </span>
                      <span className="mt-1 hidden truncate text-[12.5px] text-navy-dark/60 sm:block">
                        {r.text}
                      </span>
                    </span>
                    {you && (
                      <span className="relative flex flex-none flex-col items-end gap-1">
                        <span
                          key={links}
                          className="rounded-full bg-navy-dark px-2 py-0.5 text-[10.5px] font-bold text-white"
                          style={{ animation: links ? "ehq-pop 1.6s ease forwards" : "none", opacity: 0 }}
                        >
                          +1 link
                        </span>
                        <span
                          className="rounded-full bg-mint px-2 py-0.5 text-[11px] font-bold tabular-nums text-navy-dark"
                          style={{ opacity: links ? 1 : 0, transition: "opacity 400ms ease" }}
                        >
                          ↑ {links}
                          <span className="hidden sm:inline"> {links === 1 ? "place" : "places"}</span>
                        </span>
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* what's happening, in words */}
      <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6">
        <ol className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {CAPTIONS.map((c, i) => (
            <li
              key={c}
              className="flex items-center gap-2 text-[13px] font-medium transition-colors duration-500"
              style={{ color: done[i] ? "rgb(var(--ink))" : "rgb(var(--ink) / 0.62)" }}
            >
              <span
                className="flex h-5 w-5 items-center justify-center rounded-full text-[10.5px] font-bold transition-colors duration-500"
                style={{
                  background: done[i] ? "rgb(var(--ink))" : "rgb(var(--ink) / 0.08)",
                  color: done[i] ? "#fff" : "rgb(var(--ink) / 0.7)",
                }}
              >
                {done[i] ? <Check className="h-3 w-3" strokeWidth={3} /> : i + 1}
              </span>
              {c}
            </li>
          ))}
        </ol>
        <button
          type="button"
          onClick={replay}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] font-semibold text-navy-dark/70 ring-1 ring-line transition-opacity duration-500 hover:text-navy-dark"
          style={{ opacity: step >= LAST ? 1 : 0, pointerEvents: step >= LAST ? "auto" : "none" }}
          tabIndex={step >= LAST ? 0 : -1}
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Replay
        </button>
      </div>
    </div>
  );
};

export default SearchStory;
