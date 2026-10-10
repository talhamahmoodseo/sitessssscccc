import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Search, Star } from "lucide-react";
import {
  AiOverviewMark,
  ChatGptMark,
  ClaudeMark,
  GoogleMark,
} from "@/components/PlatformMarks";
import HeroAtmosphere from "@/components/HeroAtmosphere";
import PlaneFlight from "@/components/PlaneFlight";

const SCENE_MS = 6400;

const DEMO_QUERY = "best emergency hvac service in fresno";

const useElapsed = (e) => {
  const [s, a] = useState(0);
  return (
    useEffect(() => {
      if (!e) {
        a(999999);
        return;
      }
      let r = 0;
      const c = performance.now(),
        u = (d) => {
          (a(d - c), (r = requestAnimationFrame(u)));
        };
      return ((r = requestAnimationFrame(u)), () => cancelAnimationFrame(r));
    }, [e]),
    s
  );
};

const typeSlice = (e, s, a, r = 40) =>
  s < a ? "" : e.slice(0, Math.floor(((s - a) / 1000) * r));

const typeEnd = (e, s, a = 40) => s + (e.length / a) * 1000;

const Caret = ({ show, className = "bg-navy-dark" }) => (
  <span
    className={`inline-block w-[2px] h-[1em] align-[-0.12em] ml-[1px] ${className} ${show ? "animate-pulse" : "opacity-0"}`}
  />
);

const Highlight = ({ show, dark = false }) => (
  <motion.span
    className="relative inline-block font-bold rounded px-1 mx-[1px] whitespace-nowrap text-navy-dark"
    initial={false}
    animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
    transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
  >
    {/* a real highlighter sweep — the old grey wash read as faded */}
    <motion.span
      className={`absolute inset-x-0 bottom-0 top-[18%] rounded-[3px] -z-0 ${dark ? "bg-mark/85" : "bg-mark/90"}`}
      initial={false}
      animate={show ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      style={{ originX: 0 }}
    />
    <span className="relative">YourBrand</span>
  </motion.span>
);

const ThinkingDots = ({ show, dark = false }) =>
  show ? (
    <span className="inline-flex items-center gap-1 ml-0.5">
      {[0, 1, 2].map((a) => (
        <motion.span
          key={a}
          className={`w-1.5 h-1.5 rounded-full ${dark ? "bg-white/40" : "bg-navy-dark/30"}`}
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: a * 0.15 }}
        />
      ))}
    </span>
  ) : null;

const FadeInLine = ({ show, delay, children, dark = false }) => (
  <motion.div
    initial={false}
    animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
    transition={{
      duration: 0.45,
      delay: show ? delay : 0,
      ease: [0.4, 0, 0.2, 1],
    }}
    className={`rounded-lg border px-2.5 py-2 ${dark ? "bg-white/[0.06] border-white/12" : "bg-white border-line shadow-sm"}`}
  >
    {children}
  </motion.div>
);

const SceneGoogle = ({ t }) => {
  const a = typeEnd(DEMO_QUERY, 300, 36),
    r = a + 400,
    c = r + 1200,
    u = [
      ["bigcompetitor.com", "Emergency HVAC Services — Fast Local Repair"],
      ["directory-site.com", "Top 10 HVAC Companies Near You (2026)"],
    ];
  return (
    <div className="absolute inset-0 bg-white p-5 sm:p-6">
      <div className="flex items-center gap-3 border border-line rounded-full px-4 py-2.5 shadow-[0_1px_6px_rgba(32,33,36,0.12)] mb-4">
        <Search className="w-4 h-4 text-navy-dark/70 flex-none" />
        <span className="text-[13px] text-navy-dark/85 truncate">
          {typeSlice(DEMO_QUERY, t, 300, 36)}
          <Caret show={t >= 300 && t < a} />
        </span>
      </div>
      <div className="space-y-2.5">
        <motion.div
          initial={false}
          animate={t >= r ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          className="rounded-xl border border-gold/50 bg-gold/[0.06] p-3.5 shadow-[0_0_22px_-8px_rgba(201,139,160,0.5)]"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold text-verified">
              yourbrand.com
            </span>
            <motion.span
              initial={false}
              animate={
                t >= c ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
              }
              transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
              className="ml-auto inline-flex items-center text-[8.5px] font-extrabold tracking-wider text-verified bg-verified/10 border border-verified/25 rounded-full px-2 py-0.5"
            >
              RANKED #1
            </motion.span>
          </div>
          <p className="text-[13.5px] font-semibold text-blue-accent leading-snug">
            <Highlight show={t >= r + 300} />
            {" \u2014 24/7 Emergency HVAC, Fresno"}
          </p>
          <span className="block h-1.5 rounded-full bg-linen w-11/12 mt-2" />
        </motion.div>
        {u.map(([d, h], x) => (
          <motion.div
            key={d}
            initial={false}
            animate={
              t >= r + 280 * (x + 1)
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 14 }
            }
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            className="rounded-xl border border-line p-3"
          >
            <p className="text-[10px] font-bold text-verified mb-0.5">{d}</p>
            <p className="text-[12.5px] font-medium text-navy-dark/85 leading-snug truncate">
              {h}
            </p>
            <span className="block h-1.5 rounded-full bg-linen w-3/4 mt-1.5" />
          </motion.div>
        ))}
      </div>
      <motion.p
        initial={false}
        animate={t >= c + 300 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center text-[9px] font-extrabold tracking-[0.16em] text-navy-dark/70 uppercase mt-3"
      >
        12 editorial links behind this position · illustrative
      </motion.p>
    </div>
  );
};

const SceneAiOverview = ({ t }) => {
  const a = typeEnd(DEMO_QUERY, 300, 36),
    r = a + 430,
    c = "For urgent HVAC repairs in Fresno, ",
    u =
      " is consistently recommended for fast response times and verified local reviews.",
    h = typeEnd(c, r, 52) + 90,
    x = h + 280,
    m = typeEnd(u, x, 52),
    g = m + 200,
    y = g + 520,
    w = [
      ["fresnodaily.com", "Fresno’s fastest emergency services"],
      ["valleybiz.org", "Top-rated local HVAC providers"],
      ["homeservicesmag.com", "2026 emergency repair guide"],
    ];
  return (
    <div className="absolute inset-0 bg-white p-5 sm:p-6">
      <div className="flex items-center gap-3 border border-line rounded-full px-4 py-2.5 shadow-[0_1px_6px_rgba(32,33,36,0.12)] mb-5">
        <Search className="w-4 h-4 text-navy-dark/70 flex-none" />
        <span className="text-[13px] text-navy-dark/85 truncate">
          {typeSlice(DEMO_QUERY, t, 300, 36)}
          <Caret show={t >= 300 && t < a} />
        </span>
        <span className="ml-auto flex gap-2 flex-none">
          <span className="w-3.5 h-3.5 rounded-full bg-blue-accent/20" />
          <span className="w-3.5 h-3.5 rounded-full bg-gold/25" />
        </span>
      </div>
      <motion.div
        initial={false}
        animate={t >= a ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="rounded-2xl border border-blue-accent/25 bg-gradient-to-br from-blue-accent/[0.06] to-purple-200/25 p-4"
      >
        <div className="flex items-center gap-2 mb-2.5">
          <AiOverviewMark className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold tracking-[0.16em] text-blue-accent uppercase">
            AI Overview
          </span>
          <ThinkingDots show={t >= a && t < r} />
        </div>
        <p className="text-[13px] leading-relaxed text-navy-dark/80 min-h-[58px]">
          {typeSlice(c, t, r, 52)}
          <Highlight show={t >= h} />
          {typeSlice(u, t, x, 52)}
          <Caret show={t >= r && t < m} />
        </p>
        <div className="grid grid-cols-3 gap-2 mt-3">
          {w.map(([j, N], k) => (
            <FadeInLine key={j} show={t >= g} delay={k * 0.13}>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-accent to-purple-400 flex-none" />
                <span className="text-[9px] font-bold text-navy-dark/70 truncate">
                  {j}
                </span>
              </div>
              <p className="text-[9px] text-navy-dark/70 leading-snug line-clamp-2">
                {N}
              </p>
            </FadeInLine>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={false}
        animate={t >= y ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="mt-4"
      >
        <p className="text-[8.5px] font-extrabold tracking-[0.18em] text-navy-dark/70 uppercase mb-2">
          Search results
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 rounded-xl border border-gold/50 bg-gold/[0.07] px-3 py-2">
            <span className="flex-none w-5 h-5 rounded-md bg-gold text-navy-dark text-[10px] font-extrabold flex items-center justify-center">
              1
            </span>
            <div className="min-w-0">
              <p className="text-[9px] font-bold text-blue-accent leading-none">
                yourbrand.com
              </p>
              <p className="text-[11px] font-semibold text-navy-dark truncate mt-0.5">
                YourBrand — 24/7 emergency HVAC, Fresno
              </p>
            </div>
            <span className="ml-auto flex-none text-[7.5px] font-extrabold tracking-wider text-blue-accent bg-blue-accent/10 border border-blue-accent/25 rounded-full px-2 py-0.5">
              12 EDITORIAL LINKS
            </span>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl border border-line px-3 py-2">
            <span className="flex-none w-5 h-5 rounded-md bg-linen text-navy-dark/70 text-[10px] font-extrabold flex items-center justify-center">
              2
            </span>
            <div className="min-w-0">
              <p className="text-[9px] font-bold text-verified leading-none">
                bigcompetitor.com
              </p>
              <p className="text-[11px] font-semibold text-navy-dark/70 truncate mt-0.5">
                Emergency HVAC services — fast local repair
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const SceneChatGpt = ({ t }) => {
  const a = `Who should I call for ${DEMO_QUERY.replace("best ", "")}?`,
    r = typeEnd(a, 300, 40),
    c = r + 430,
    u = "If you need emergency HVAC service in Fresno, ",
    d =
      " stands out — frequently cited in local trade coverage for 24/7 dispatch and licensed technicians.",
    x = typeEnd(u, c, 52) + 90,
    m = x + 280,
    g = typeEnd(d, m, 52),
    y = g + 200;
  return (
    <div className="absolute inset-0 bg-white p-5 sm:p-6">
      <div className="flex items-center gap-2 pb-3 mb-4 border-b border-line">
        <ChatGptMark className="w-5 h-5" />
        <span className="text-[12px] font-bold text-navy-dark/80">ChatGPT</span>
        <span className="text-[10px] text-navy-dark/70 font-medium">5</span>
      </div>
      <div className="flex justify-end mb-4">
        <div className="bg-linen rounded-2xl rounded-br-md px-4 py-2.5 max-w-[85%]">
          <span className="text-[12.5px] text-navy-dark/85">
            {typeSlice(a, t, 300, 40)}
            <Caret show={t >= 300 && t < r} />
          </span>
        </div>
      </div>
      <motion.div
        initial={false}
        animate={t >= r ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="flex gap-2.5"
      >
        <span className="flex-none mt-0.5">
          <ChatGptMark className="w-6 h-6" />
        </span>
        <div className="min-w-0">
          <p className="text-[13px] leading-relaxed text-navy-dark/80 min-h-[78px]">
            <ThinkingDots show={t >= r && t < c} />
            {typeSlice(u, t, c, 52)}
            <Highlight show={t >= x} />
            {typeSlice(d, t, m, 52)}
            <Caret show={t >= c && t < g} />
          </p>
          <div className="flex flex-wrap gap-2 mt-2.5">
            <FadeInLine show={t >= y} delay={0}>
              <span className="text-[9.5px] font-bold text-blue-accent">
                yourbrand.com
              </span>
            </FadeInLine>
            <FadeInLine show={t >= y} delay={0.13}>
              <span className="text-[9.5px] font-bold text-navy-dark/70">
                homeservicesmag.com
              </span>
            </FadeInLine>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const SceneClaude = ({ t }) => {
  const a = `Which company is best for ${DEMO_QUERY.replace("best ", "")}?`,
    r = typeEnd(a, 300, 40),
    c = r + 430,
    u = "Based on coverage in industry publications, ",
    d =
      " is the most consistently mentioned provider for emergency HVAC work in the Fresno area.",
    x = typeEnd(u, c, 52) + 90,
    m = x + 280,
    g = typeEnd(d, m, 52),
    y = g + 200;
  return (
    <div className="absolute inset-0 bg-[#f5f0e8] p-5 sm:p-6">
      <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#d97757]/15">
        <ClaudeMark className="w-5 h-5" />
        <span
          className="text-[12px] font-bold text-navy-dark/80"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Claude
        </span>
      </div>
      <div className="flex justify-end mb-4">
        <div className="bg-[#d97757]/[0.1] border border-[#d97757]/15 rounded-2xl rounded-br-md px-4 py-2.5 max-w-[85%]">
          <span className="text-[12.5px] text-navy-dark/85">
            {typeSlice(a, t, 300, 40)}
            <Caret show={t >= 300 && t < r} />
          </span>
        </div>
      </div>
      <motion.div
        initial={false}
        animate={t >= r ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="flex gap-2.5"
      >
        <span className="flex-none mt-0.5">
          <ClaudeMark className="w-6 h-6" />
        </span>
        <div className="min-w-0">
          <p className="text-[13px] leading-relaxed text-navy-dark/80 min-h-[78px]">
            <ThinkingDots show={t >= r && t < c} />
            {typeSlice(u, t, c, 52)}
            <Highlight show={t >= x} />
            {typeSlice(d, t, m, 52)}
            <Caret show={t >= c && t < g} />
          </p>
          <div className="flex flex-wrap gap-2 mt-2.5">
            <FadeInLine show={t >= y} delay={0}>
              <span className="text-[9.5px] font-bold text-[#c05f3e]">
                homeservicesmag.com
              </span>
            </FadeInLine>
            <FadeInLine show={t >= y} delay={0.13}>
              <span className="text-[9.5px] font-bold text-navy-dark/70">
                fresnodaily.com
              </span>
            </FadeInLine>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const PLATFORMS = [
  { name: "Google", url: "google.com/search", Mark: GoogleMark },
  {
    name: "AI Overview",
    url: "google.com · AI Overview",
    Mark: AiOverviewMark,
  },
  { name: "ChatGPT", url: "chatgpt.com", Mark: ChatGptMark },
  { name: "Claude", url: "claude.ai", Mark: ClaudeMark },
];

const Scene = ({ scene, t }) => {
  switch (scene) {
    case 0:
      return <SceneGoogle t={t} />;
    case 1:
      return <SceneAiOverview t={t} />;
    case 2:
      return <SceneChatGpt t={t} />;
    case 3:
      return <SceneClaude t={t} />;
    default:
      return <SceneClaude t={t} />;
  }
};

const SceneHost = ({ scene, animate }) => {
  const a = useElapsed(animate);
  return <Scene scene={scene} t={a} />;
};

const SearchTheatre = () => {
  const e = useReducedMotion(),
    [s, a] = useState(0),
    r = useRef(false);
  return (
    useEffect(() => {
      if (e) return;
      const c = setInterval(() => {
        !r.current && !document.hidden && a((u) => (u + 1) % PLATFORMS.length);
      }, SCENE_MS);
      return () => clearInterval(c);
    }, [e]),
    (
      <div
        className="bg-white/80 backdrop-blur-xl border border-white/90 rounded-3xl shadow-[0_30px_80px_-24px_rgba(15,17,23,0.4)] overflow-hidden"
        onMouseEnter={() => (r.current = true)}
        onMouseLeave={() => (r.current = false)}
      >
        <div className="flex items-center gap-3 px-5 py-3 border-b border-line">
          <div className="flex gap-1.5 flex-none">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]/70" />
          </div>
          <div className="flex-1 flex justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={s}
                className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold text-navy-dark/70 bg-linen rounded-full px-3.5 py-1"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                {PLATFORMS[s].url}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="flex-none w-12" aria-hidden="true" />
        </div>
        <div className="relative h-[416px] sm:h-[404px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={s}
              className="absolute inset-0"
              initial={{ opacity: 0, x: 36, filter: "blur(6px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -36, filter: "blur(6px)" }}
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            >
              <SceneHost scene={s} animate={!e} />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex items-stretch gap-4 sm:gap-6 px-6 py-4 border-t border-line bg-navy-dark/[0.02]">
          {PLATFORMS.map((c, u) => {
            const d = u === s,
              h = u < s;
            return (
              <button
                key={c.name}
                onClick={() => a(u)}
                className="flex-1 min-w-0 text-left group py-1.5 min-h-[44px]"
                aria-label={`Show ${c.name} scene`}
              >
                <span className="flex items-center gap-1.5 mb-2">
                  <c.Mark
                    className={`w-3.5 h-3.5 flex-none transition-all duration-300 ${d ? "" : "grayscale opacity-45 group-hover:opacity-90 group-hover:grayscale-0"}`}
                  />
                  <span
                    className={`text-[9px] font-extrabold tracking-[0.12em] uppercase truncate transition-colors duration-300 ${d ? "text-navy-dark/85" : "text-navy-dark/70 group-hover:text-navy-dark/75"}`}
                  >
                    {c.name}
                  </span>
                </span>
                <span className="block h-1 rounded-full bg-navy-dark/[0.08] overflow-hidden">
                  {d && !e && (
                    <motion.span
                      key={`bar-${s}`}
                      className="block h-full bg-blue-accent origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: SCENE_MS / 1000, ease: "linear" }}
                    />
                  )}
                  {(h || (d && e)) && (
                    <span className="block h-full bg-blue-accent/60" />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    )
  );
};

const Hero = () => {
  const [e, s] = useState(""),
    a = () => {
      const r = "contact@talhamahmood.com",
        c = encodeURIComponent("Free visibility audit request"),
        u = encodeURIComponent(`Website / email: ${e}

Please send me a free visibility audit.`);
      window.location.href = `mailto:${r}?subject=${c}&body=${u}`;
    };
  return (
    <div className="relative bg-mist overflow-hidden pt-24 pb-20 lg:pt-28 lg:pb-24">
      <HeroAtmosphere />
      <PlaneFlight />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.a
          href="/services/brand-mentions"
          className="inline-flex items-center gap-2.5 bg-white border border-line rounded-full pl-1.5 pr-4 py-1.5 mb-7 hover:border-navy-dark/30 transition-colors duration-300"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <span className="bg-navy-dark text-white text-[10px] font-bold tracking-wide rounded-full px-2.5 py-1">
            NEW
          </span>
          <span className="text-[13px] font-medium text-navy-dark">
            Brand mentions for AI search
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-navy-dark/70" />
        </motion.a>
        <motion.h1
          className="text-[2.75rem] sm:text-6xl lg:text-[4.1rem] font-semibold text-navy-dark leading-[1.02] tracking-[-0.035em] mb-6"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          Rank on Google.
          <br />
          {"Get "}
          <span className="italic font-medium pr-[0.14em]">cited</span> by AI.
        </motion.h1>
        <motion.p
          className="text-[17px] sm:text-[19px] text-navy-dark/70 leading-relaxed max-w-xl mx-auto mb-9"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          Editorial backlinks, HARO quotes and brand mentions on real
          publications — the footprint that wins page one and the AI answer.
        </motion.p>
        <motion.div
          className="max-w-lg mx-auto"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <div className="flex items-center gap-2 bg-white border border-line rounded-2xl p-2 pl-5 shadow-soft">
            <input
              value={e}
              onChange={(r) => s(r.target.value)}
              onKeyDown={(r) => r.key === "Enter" && a()}
              placeholder="Enter your website or email"
              className="flex-1 min-w-0 bg-transparent text-[14.5px] text-navy-dark placeholder:text-navy-dark/65 focus:outline-none"
            />
            <button
              onClick={a}
              className="flex-none bg-navy-dark hover:bg-black text-white rounded-xl px-5 py-3 text-[13.5px] font-semibold transition-colors duration-300"
            >
              Get a free audit
            </button>
          </div>
          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="flex gap-0.5">
              {[...Array(5)].map((r, c) => (
                <Star
                  key={c}
                  className="w-3.5 h-3.5 fill-navy-dark text-navy-dark"
                />
              ))}
            </span>
            <span className="text-[12.5px] text-navy-dark/70">
              Top Rated on Upwork & Fiverr · 40+ brands served
            </span>
          </div>
        </motion.div>
      </div>
      <motion.div
        className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="rounded-[1.4rem] border border-line bg-white p-2 shadow-deep">
          <SearchTheatre />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
