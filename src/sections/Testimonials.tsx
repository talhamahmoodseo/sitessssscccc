import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { asset } from "@/lib/booking";
import { CASES, caseBySlug, clientQuotes } from "@/lib/cases";
import { liveProfiles, type ReviewProfile } from "@/lib/reviews";
import { COLOURS, GrainBlob } from "@/components/Grain";

/**
 * Client reviews, used twice on the homepage with different jobs:
 *  - FeaturedReview: one voice, set large, early on (SmileTutor).
 *  - ReviewWall: every client voice, late on, with the Clutch and
 *    Trustpilot badges, showing breadth.
 */

/* --------------------------------- badges --------------------------------- */

const CLUTCH_RED = "#EF4335";
const TRUST_GREEN = "#00B67A";

const Stars = ({ platform }: { platform: ReviewProfile["platform"] }) =>
  platform === "Trustpilot" ? (
    <span className="flex gap-[2px]" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="flex h-[15px] w-[15px] items-center justify-center"
          style={{ background: TRUST_GREEN }}
        >
          <Star className="h-[10px] w-[10px] fill-white text-white" />
        </span>
      ))}
    </span>
  ) : (
    <span className="flex gap-[1px]" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className="h-[14px] w-[14px]"
          style={{ fill: CLUTCH_RED, color: CLUTCH_RED }}
        />
      ))}
    </span>
  );

const PlatformMark = ({ platform, dark }: { platform: ReviewProfile["platform"]; dark: boolean }) =>
  platform === "Trustpilot" ? (
    <span className={`flex items-center gap-1 text-[16px] font-bold tracking-[-0.02em] ${dark ? "text-white" : "text-navy-dark"}`}>
      <Star className="h-[17px] w-[17px]" style={{ fill: TRUST_GREEN, color: TRUST_GREEN }} />
      Trustpilot
    </span>
  ) : (
    <span className={`text-[17px] font-bold tracking-[-0.03em] ${dark ? "text-white" : "text-navy-dark"}`}>
      Clutch
      <span style={{ color: CLUTCH_RED }}>.</span>
    </span>
  );

/** Clutch / Trustpilot ratings, set the way review platforms badge them. */
export const ReviewBadges = ({
  dark = false,
  className = "",
}: {
  dark?: boolean;
  className?: string;
}) => {
  const profiles = liveProfiles();
  if (!profiles.length) return null;
  return (
    <ul className={`flex flex-wrap gap-3 ${className}`}>
      {profiles.map((p) => {
        const inner = (
          <>
            <PlatformMark platform={p.platform} dark={dark} />
            <span className={`h-8 w-px ${dark ? "bg-white/15" : "bg-line"}`} aria-hidden="true" />
            <span className="flex flex-col gap-1">
              <Stars platform={p.platform} />
              <span className={`text-[12px] leading-none ${dark ? "text-white/75" : "text-navy-dark/70"}`}>
                <span className={`font-bold ${dark ? "text-white" : "text-navy-dark"}`}>{p.rating}</span>
                {" / 5 · "}
                {p.count} reviews
              </span>
            </span>
            {p.url && <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />}
          </>
        );
        const cls = `flex items-center gap-3.5 rounded-2xl px-4 py-3 transition-colors ${
          dark
            ? "bg-white/[0.07] ring-1 ring-white/15 hover:bg-white/[0.12]"
            : "bg-white ring-1 ring-line hover:ring-navy-dark/25"
        }`;
        return (
          <li key={p.platform}>
            {p.url ? (
              <a href={p.url} target="_blank" rel="noopener" className={cls} aria-label={`${p.rating} out of 5 on ${p.platform}, ${p.count} reviews`}>
                {inner}
              </a>
            ) : (
              <span className={cls} aria-label={`${p.rating} out of 5 on ${p.platform}, ${p.count} reviews`}>
                {inner}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
};

/* ------------------------------ featured review ------------------------------ */

export const FeaturedReview = () => {
  const c = caseBySlug("smiletutor")!;
  const t = c.testimonial!;
  return (
    <div className="bg-white py-24 lg:py-32">
      <motion.figure
        className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-9 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-butter px-3.5 py-1.5 text-[13px] font-semibold text-navy-dark">
            #1 on Google for “tuition” in Singapore
          </span>
          <span className="text-[13px] text-navy-dark/65">
            Semrush, October 2026
          </span>
        </div>
        <blockquote className="text-[1.6rem] font-medium leading-[1.28] tracking-[-0.03em] text-navy-dark sm:text-[2.1rem] lg:text-[2.4rem]">
          &ldquo;{t.text}&rdquo;
        </blockquote>
        <div
          className="mt-9 h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, rgb(var(--ink) / 0.35), rgb(var(--ink) / 0.04))",
          }}
          aria-hidden="true"
        />
        <figcaption className="mt-6 flex flex-wrap items-center justify-between gap-6">
          <span className="flex items-center gap-3.5">
            {t.photo && (
              <img
                src={asset(t.photo)}
                alt={t.who}
                className="h-12 w-12 rounded-full object-cover"
                loading="lazy"
              />
            )}
            <span>
              <span className="block text-[15px] font-semibold text-navy-dark">
                {t.who}
              </span>
              <span className="block text-[13.5px] text-navy-dark/70">
                {t.role}
              </span>
            </span>
          </span>
          <span className="flex items-center gap-6">
            {c.logo && (
              <img
                src={asset(c.logo)}
                alt="SmileTutor"
                loading="lazy"
                className="h-9 w-auto"
              />
            )}
            <Link
              to="/case-studies/smiletutor"
              className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-navy-dark hover:gap-2.5 transition-all"
            >
              Read the case study
              <ArrowRight className="h-4 w-4" />
            </Link>
          </span>
        </figcaption>
      </motion.figure>
    </div>
  );
};

/* -------------------------------- review wall -------------------------------- */

type Review = ReturnType<typeof clientQuotes>[number];

const via = (slug: string) => CASES.find((c) => c.slug === slug)?.services[0] ?? "";

const ReviewCard = ({ r }: { r: Review }) => (
  <figure className="rounded-[20px] bg-white/[0.05] p-6 ring-1 ring-white/10">
    <figcaption className="flex items-center justify-between gap-3">
      <span className="flex min-w-0 items-center gap-3">
        {r.photo ? (
          <img
            src={asset(r.photo)}
            alt=""
            loading="lazy"
            className="h-10 w-10 flex-none rounded-full object-cover ring-1 ring-white/20"
          />
        ) : r.logo ? (
          <span className="flex h-10 w-10 flex-none items-center justify-center overflow-hidden rounded-full bg-white p-1.5">
            <img src={asset(r.logo)} alt="" loading="lazy" className="max-h-full w-auto object-contain" />
          </span>
        ) : (
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white/10 text-[14px] font-semibold text-white">
            {r.client[0]}
          </span>
        )}
        <span className="min-w-0">
          <span className="block truncate text-[14px] font-semibold text-white">
            {r.who}
          </span>
          <span className="block truncate text-[12.5px] text-white/70">{r.role}</span>
        </span>
      </span>
      <span className="flex-none rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/80">
        {via(r.slug)}
      </span>
    </figcaption>
    <blockquote className="mt-4 text-[15.5px] leading-[1.6] text-white/85">
      {r.text}
    </blockquote>
    <Link
      to={`/case-studies/${r.slug}`}
      className="mt-4 inline-flex items-center gap-1 text-[12.5px] font-semibold text-white/70 hover:text-white"
    >
      {r.client} case study
      <ArrowUpRight className="h-3.5 w-3.5" />
    </Link>
  </figure>
);

/**
 * A column that drifts slowly. When it loops, the content is doubled so the
 * loop is seamless; the copies are hidden from screen readers and can't take
 * focus (`inert`). The drift is a CSS animation of transform only, so it runs
 * on the compositor, not the main thread.
 */
const Column = ({
  items,
  duration,
  reverse,
  loop,
}: {
  items: Review[];
  duration: number;
  reverse?: boolean;
  loop: boolean;
}) => {
  // short columns repeat so the loop never shows an empty gap
  const base = loop && items.length < 4 ? [...items, ...items] : items;
  const all = loop ? [...base, ...base] : base;
  return (
    <div className="overflow-hidden">
      <div
        className={loop ? "ehq-scroll space-y-4" : "space-y-4"}
        style={
          loop
            ? { animation: `${reverse ? "ehq-scroll-down" : "ehq-scroll-up"} ${duration}s linear infinite` }
            : undefined
        }
      >
        {all.map((r, n) =>
          n < items.length ? (
            <div key={n}>
              <ReviewCard r={r} />
            </div>
          ) : (
            <div key={n} aria-hidden="true" inert>
              <ReviewCard r={r} />
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export const ReviewWall = () => {
  const wall = clientQuotes();
  // 0 on the first render: every quote once, standing still. That's the
  // prerendered HTML too, so the page ships each quote once instead of six
  // times. In the browser it then builds the columns for this screen size.
  const [cols, setCols] = useState(0);
  useEffect(() => {
    if ((window as any).__PRERENDER__) return;
    const lg = window.matchMedia("(min-width: 1024px)");
    const sm = window.matchMedia("(min-width: 640px)");
    const pick = () => setCols(lg.matches ? 3 : sm.matches ? 2 : 1);
    pick();
    lg.addEventListener("change", pick);
    sm.addEventListener("change", pick);
    return () => {
      lg.removeEventListener("change", pick);
      sm.removeEventListener("change", pick);
    };
  }, []);
  const split = (k: number) =>
    Array.from({ length: k }, (_, c) => wall.filter((_, n) => n % k === c));
  const DURATION: Record<number, number[]> = { 1: [70], 2: [52, 58], 3: [44, 49, 54] };
  return (
    <div className="relative overflow-hidden bg-navy-dark py-24 lg:py-32">
      <GrainBlob
        color={COLOURS.violet}
        className="-left-[320px] top-0 h-[560px] w-[640px] opacity-30"
        duration={30}
      />
      <GrainBlob
        color={COLOURS.orange}
        className="-right-[360px] bottom-[-200px] h-[520px] w-[620px] opacity-20"
        duration={34}
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
            Client reviews
          </p>
          <h2 className="text-[2rem] font-semibold leading-[1.06] tracking-[-0.035em] text-white sm:text-[2.6rem]">
            {"Trusted by teams who "}
            <span className="accent-ink-dark">answer for the numbers</span>
          </h2>
          <ReviewBadges dark className="mt-8 justify-center" />
        </motion.div>
        <div
          className="relative mt-14 grid h-[620px] gap-4 overflow-hidden sm:grid-cols-2 lg:grid-cols-3"
          style={{
            WebkitMaskImage:
              "linear-gradient(transparent, #000 14%, #000 84%, transparent)",
            maskImage:
              "linear-gradient(transparent, #000 14%, #000 84%, transparent)",
          }}
        >
          {cols === 0
            ? split(3).map((col, i) => (
                <div key={i} className={i === 0 ? "" : i === 1 ? "hidden sm:block" : "hidden lg:block"}>
                  <Column items={col} duration={0} loop={false} />
                </div>
              ))
            : split(cols).map((col, i) => (
                <div key={`${cols}-${i}`}>
                  <Column items={col} duration={DURATION[cols][i]} reverse={i === 1} loop />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};
