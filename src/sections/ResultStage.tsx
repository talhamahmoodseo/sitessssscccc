import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, BadgeCheck, Link2, Pause, Play } from "lucide-react";
import { asset } from "@/lib/booking";
import { STORIES, type Story } from "@/lib/stories";
import { Avatar, ProofChip, SiteShot } from "@/components/proof";
import { Annotation } from "@/components/brand";

/**
 * Homepage hero, round 13: "the results stage". Instead of explaining how
 * link building works, it shows what clients got. One card at a time, set
 * like a post from a real client: their words, their homepage with the
 * result pinned on it, three figures, and two pieces of evidence beside it.
 * Small tiles travel in along faint lines from the left: the links that
 * went into each result.
 *
 * The cards cycle every DURATION ms. The tab's progress bar is a CSS
 * animation and its `animationend` moves to the next client, so hovering,
 * keyboard focus or scrolling the stage away pauses everything at once (the
 * `ehq-paused` class). People who prefer reduced motion get no autoplay and
 * no travelling tiles; the tabs still work.
 *
 * Hydration: the first render is always SmileTutor; nothing reads the
 * screen, storage or clock during render. The prerender never advances.
 */

const DURATION = 7000;
const ease = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------- link lines */

/** the lines live in a fixed 380×440 box whose right edge sits under the
 *  card, drawn 1:1 so the tiles (CSS transforms) follow the same points */
const BOX_W = 380;
const BOX_H = 440;
const END: [number, number] = [BOX_W, 220];
const TRACKS: [number, number][][] = [
  [[0, 30], [95, 46], [190, 92], [280, 158], [345, 204], END],
  [[0, 130], [95, 136], [190, 160], [280, 192], [345, 213], END],
  [[0, 232], [95, 230], [190, 226], [280, 223], [345, 221], END],
  [[0, 330], [95, 318], [190, 290], [280, 252], [345, 229], END],
  [[0, 425], [95, 405], [190, 352], [280, 284], [345, 236], END],
];

/** a smooth curve through the points (Catmull-Rom, as cubic Béziers) */
const curve = (p: [number, number][]) => {
  let d = `M${p[0][0]} ${p[0][1]}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${p2[0]} ${p2[1]}`;
  }
  return d;
};

const trackVars = (t: [number, number][]) =>
  Object.fromEntries(
    t.flatMap(([x, y], i) => [
      [`--x${i}`, `${x}px`],
      [`--y${i}`, `${y}px`],
    ]),
  ) as CSSProperties;

const Lines = ({ tiles }: { tiles: string[] }) => (
  <div
    className="pointer-events-none absolute right-[calc(50%+282px)] top-[78px] hidden lg:block"
    style={{
      width: BOX_W,
      height: BOX_H,
      maskImage: "linear-gradient(90deg, transparent, #000 38%)",
      WebkitMaskImage: "linear-gradient(90deg, transparent, #000 38%)",
    }}
    aria-hidden="true"
  >
    <svg width={BOX_W} height={BOX_H} className="absolute inset-0 overflow-visible">
      {TRACKS.map((t, i) => (
        <path
          key={i}
          d={curve(t)}
          fill="none"
          stroke="rgb(var(--ink) / 0.14)"
          strokeWidth="1.2"
        />
      ))}
    </svg>
    {tiles.slice(0, 3).map((label, i) => (
      <span
        key={`${label}-${i}`}
        className="ehq-travel absolute left-0 top-0"
        style={{
          ...trackVars(TRACKS[[0, 2, 4][i]]),
          animationDelay: `${-i * 2.3}s`,
        }}
      >
        <span className="flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-navy-dark shadow-[0_6px_16px_-6px_rgb(var(--ink)/0.35)] ring-1 ring-navy-dark/10">
          <Link2 className="h-3 w-3 text-navy-dark/60" />
          {label}
        </span>
      </span>
    ))}
  </div>
);

/* ------------------------------------------------------------------- card */

const StoryCard = ({ s, first }: { s: Story; first: boolean }) => (
  <motion.div
    key={s.slug}
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.42, ease }}
  >
    <header className="flex items-center gap-3">
      <Avatar name={s.who} photo={s.photo} logo={s.logo} size={42} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14.5px] font-semibold text-navy-dark">{s.who}</p>
        <p className="truncate text-[12.5px] text-navy-dark/65">{s.role}</p>
      </div>
      <span className="hidden flex-none items-center gap-1.5 rounded-full bg-mist px-2.5 py-1 text-[11.5px] font-semibold text-navy-dark/75 sm:inline-flex">
        <BadgeCheck className="h-3.5 w-3.5 text-verified" aria-hidden="true" />
        Client
      </span>
    </header>

    <p className="mt-4 text-[15px] leading-[1.55] text-navy-dark/85 sm:min-h-[4.65em] sm:text-[15.5px]">
      &ldquo;{s.quote}&rdquo;
    </p>

    <SiteShot
      src={s.media.src}
      domain={s.media.domain}
      alt={s.media.alt}
      pos={s.media.pos}
      eager={first}
      className="mt-4"
    >
      <span
        className={`absolute right-3 ${s.pinAt === "top" ? "top-3" : "bottom-3"} max-w-[88%] truncate rounded-full bg-navy-dark px-3 py-1.5 text-[12px] font-semibold text-white shadow-[0_8px_20px_-8px_rgb(0_0_0/0.6)]`}
      >
        {s.pin}
      </span>
    </SiteShot>

    <ul className="mt-3 grid grid-cols-3 gap-2">
      {s.facts.map((f, i) => (
        <motion.li
          key={f.l}
          className="rounded-2xl bg-mist px-3 py-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 + i * 0.12, ease }}
        >
          <p className="text-[1.2rem] font-semibold leading-none tracking-[-0.035em] text-navy-dark sm:text-[1.45rem]">
            {f.v}
          </p>
          <p className="mt-1.5 text-[11px] leading-snug text-navy-dark/70 sm:text-[11.5px]">
            {f.l}
          </p>
        </motion.li>
      ))}
    </ul>

    <Link
      to={`/case-studies/${s.slug}`}
      className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-navy-dark transition-[gap] duration-300 hover:gap-2.5"
    >
      How we did it for {s.client}
      <ArrowRight className="h-3.5 w-3.5" />
    </Link>
  </motion.div>
);

/* ------------------------------------------------------------------ stage */

const ResultStage = () => {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(false);
  const [offscreen, setOffscreen] = useState(false);
  const [still, setStill] = useState(false);
  const [stopped, setStopped] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const s = STORIES[active];

  // reduced motion: no autoplay, no travelling tiles
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(m.matches);
    sync();
    m.addEventListener("change", sync);
    return () => m.removeEventListener("change", sync);
  }, []);

  // pause while the stage is off screen
  useEffect(() => {
    const el = root.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setOffscreen(!e.isIntersecting), {
      threshold: 0.1,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // fetch the next client's screenshot before it's needed
  useEffect(() => {
    const n = STORIES[(active + 1) % STORIES.length];
    const img = new Image();
    img.src = asset(n.media.src);
  }, [active]);

  const next = () => {
    if ((window as unknown as { __PRERENDER__?: boolean }).__PRERENDER__) return;
    setActive((a) => (a + 1) % STORIES.length);
  };

  const paused = hover || offscreen || stopped;
  const auto = !still && !stopped;

  return (
    <div
      ref={root}
      className={`relative ${paused ? "ehq-paused" : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setHover(false);
      }}
    >
      {/* each client's colour, faded in behind its card */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-24 -top-24" aria-hidden="true">
        {STORIES.map((st, i) => (
          <div
            key={st.slug}
            className="absolute inset-0 transition-opacity duration-[1400ms] ease-out"
            style={{
              opacity: i === active ? 1 : 0,
              background: `radial-gradient(46% 56% at 50% 50%, rgb(var(--${st.tint}) / 0.9), transparent 70%)`,
            }}
          />
        ))}
      </div>

      <div className="relative">
        {!still && <Lines key={s.slug} tiles={s.tiles} />}

        <div className="relative mx-auto w-full max-w-[600px]">
          <Annotation className="-top-[58px] left-[calc(100%+18px)] hidden w-[190px] xl:block" flip>
            real clients, real numbers
          </Annotation>

          {/* evidence beside the card, on wide screens */}
          <AnimatePresence initial={false}>
            <motion.div
              key={`${s.slug}-l`}
              className="absolute right-[calc(100%-14px)] top-[30px] z-10 hidden w-[262px] xl:block"
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.5, delay: 0.15, ease }}
            >
              <div className="-rotate-2">
                <ProofChip chip={s.left} />
              </div>
            </motion.div>
            <motion.div
              key={`${s.slug}-r`}
              className="absolute left-[calc(100%-14px)] top-[300px] z-10 hidden w-[262px] xl:block"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.5, delay: 0.3, ease }}
            >
              <div className="rotate-[1.5deg]">
                <ProofChip chip={s.right} />
              </div>
            </motion.div>
          </AnimatePresence>

          <article
            id="result-panel"
            role="tabpanel"
            aria-labelledby={`result-tab-${s.slug}`}
            className="relative rounded-[28px] bg-white p-5 text-left ring-1 ring-navy-dark/[0.07] shadow-[0_44px_90px_-44px_rgb(var(--ink)/0.5)] sm:p-6"
          >
            <AnimatePresence mode="wait" initial={false}>
              <StoryCard key={s.slug} s={s} first={active === 0} />
            </AnimatePresence>
          </article>
        </div>

        {/* the tabs: pick a client, or watch them cycle */}
        <div className="relative mx-auto mt-7 flex max-w-[1010px] items-center gap-2">
          <div
            role="tablist"
            aria-label="Client results"
            className="-ml-4 flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1 pl-4 pr-1 sm:ml-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
          >
            {STORIES.map((st, i) => {
              const on = i === active;
              return (
                <button
                  key={st.slug}
                  role="tab"
                  id={`result-tab-${st.slug}`}
                  aria-selected={on}
                  aria-controls="result-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => {
                    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                    const n = (i + (e.key === "ArrowRight" ? 1 : -1) + STORIES.length) % STORIES.length;
                    setActive(n);
                    document.getElementById(`result-tab-${STORIES[n].slug}`)?.focus();
                  }}
                  className={`relative flex flex-none items-center gap-2 overflow-hidden rounded-full px-3.5 py-2 text-[12.5px] font-semibold transition-colors duration-300 ${
                    on
                      ? "bg-navy-dark text-white"
                      : "bg-white/80 text-navy-dark ring-1 ring-navy-dark/10 hover:bg-white"
                  }`}
                >
                  <span
                    className="h-2 w-2 flex-none rounded-full"
                    style={{ background: `rgb(var(--${st.tint}))` }}
                    aria-hidden="true"
                  />
                  {st.client}
                  <span className={on ? "font-medium text-white/65" : "font-medium text-navy-dark/55"}>
                    {st.field}
                  </span>
                  {on && auto && (
                    <span
                      key={`bar-${active}`}
                      className="ehq-progress absolute inset-x-3 bottom-[3px] h-[2px] origin-left rounded-full bg-white/70"
                      style={{ animationDuration: `${DURATION}ms` }}
                      onAnimationEnd={(e) => e.animationName === "ehq-progress" && next()}
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => setStopped((v) => !v)}
            className={`${still ? "hidden" : "flex"} h-9 w-9 flex-none items-center justify-center rounded-full bg-white/80 text-navy-dark ring-1 ring-navy-dark/10 transition-colors hover:bg-white`}
            aria-label={stopped ? "Play the client stories" : "Pause the client stories"}
          >
            {stopped ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultStage;
