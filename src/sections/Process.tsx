import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

const PROCESS_STEPS = [
  {
    title: "Audit",
    description:
      "AuthorityOS™ maps your current footprint — link profile, rankings, and where you do or do not appear across Google, AI Overviews, ChatGPT and Claude. The gaps become the plan.",
    deliverable: "Visibility gap analysis & anchor plan",
  },
  {
    title: "Map",
    description:
      "Competitor backlink and citation analysis across the publications that shape your category, finding the niche-relevant sources both rankings and AI answers are built on.",
    deliverable: "Vetted prospect list with metrics",
  },
  {
    title: "Prioritise",
    description:
      "We rank the pages closest to moving and decide which receives authority first, which anchors it takes, and at what pace. You see the plan, with its reasoning, before anything is placed.",
    deliverable: "Ranked target-page plan",
  },
  {
    title: "Place",
    description:
      "Links, brand mentions and PR features earned inside real editorial content, each one written to the publication's standard and sitting in a sentence that stands on its own.",
    deliverable: "Live placement URLs",
  },
  {
    title: "Verify",
    description:
      "Every link checked for indexation and monitored for 90 days. Rankings tracked against the agreed keyword set, AI citations checked monthly, and anything that drops replaced free.",
    deliverable: "Indexation-verified report + citation tracking",
  },
];

const RollingDigit = ({ digit }) => (
  <span
    className="relative inline-block overflow-hidden align-top"
    style={{ height: "1em" }}
  >
    <motion.span
      className="flex flex-col"
      animate={{ y: `${-digit}em` }}
      transition={{ type: "spring", stiffness: 80, damping: 16, mass: 0.9 }}
    >
      {Array.from({ length: 10 }, (s, a) => (
        <span
          key={a}
          className="block"
          style={{ height: "1em", lineHeight: "1em" }}
        >
          {a}
        </span>
      ))}
    </motion.span>
  </span>
);

const ProcessRail = () => {
  const e = useRef<any>(null),
    s = useRef<any>(null);
  return (
    useAnimationFrame((a) => {
      const r = e.current,
        c = s.current;
      if (!r || !c) return;
      const u = r.getTotalLength(),
        d = (a / 3600) % 1,
        h = r.getPointAtLength(d * u);
      (c.setAttribute("transform", `translate(${h.x}, ${h.y})`),
        c.setAttribute("opacity", d < 0.04 || d > 0.96 ? "0" : "1"));
    }),
    (
      <div className="rounded-[1.6rem] border border-line bg-sky/40 p-3">
        <div className="bg-white rounded-2xl px-5 pt-5 pb-2 shadow-lift">
          <div className="text-[10px] font-bold tracking-[0.22em] text-navy-dark/70 uppercase text-center mb-1">
            How a link travels
          </div>
          <svg
            viewBox="0 0 460 132"
            className="w-full"
            role="img"
            aria-label="A link travels from a publisher site to your site"
          >
            <motion.path
              ref={e}
              d="M104,66 C 185,16 275,116 356,66"
              stroke="#1a1f2e"
              strokeOpacity="0.28"
              strokeWidth="1.6"
              fill="none"
              strokeDasharray="6 6"
              animate={{ strokeDashoffset: [0, -12] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
            />
            <rect
              x="16"
              y="41"
              width="88"
              height="50"
              rx="10"
              fill="#ffffff"
              stroke="#1a1f2e"
              strokeOpacity="0.15"
              strokeWidth="1.4"
            />
            <text
              x="60"
              y="63"
              textAnchor="middle"
              fontSize="8.5"
              fontWeight="700"
              letterSpacing="1.5"
              fill="#1a1f2e"
              fillOpacity="0.55"
              fontFamily="Plus Jakarta Sans, sans-serif"
            >
              PUBLISHER
            </text>
            <text
              x="60"
              y="78"
              textAnchor="middle"
              fontSize="8"
              fontWeight="700"
              fill="#1a1f2e"
              fontFamily="Plus Jakarta Sans, sans-serif"
            >
              DR 62
            </text>
            <rect
              x="356"
              y="41"
              width="88"
              height="50"
              rx="10"
              className="fill-navy-dark"
            />
            <text
              x="400"
              y="63"
              textAnchor="middle"
              fontSize="8.5"
              fontWeight="700"
              letterSpacing="1.5"
              fill="#ffffff"
              fillOpacity="0.8"
              fontFamily="Plus Jakarta Sans, sans-serif"
            >
              YOUR SITE
            </text>
            <text
              x="400"
              y="78"
              textAnchor="middle"
              fontSize="8"
              fontWeight="700"
              className="fill-verified"
              fontFamily="Plus Jakarta Sans, sans-serif"
            >
              ▲ AUTHORITY
            </text>
            <g ref={s}>
              <circle r="12" className="fill-navy-dark" />
              <text
                y="3"
                textAnchor="middle"
                fontSize="6.5"
                fontWeight="800"
                fill="#ffffff"
                fontFamily="Plus Jakarta Sans, sans-serif"
              >
                LINK
              </text>
            </g>
          </svg>
        </div>
      </div>
    )
  );
};

const Process = () => {
  const e = useRef<any>(null),
    [s, a] = useState(0),
    { scrollYProgress: r } = useScroll({
      target: e,
      offset: ["start start", "end end"],
    }),
    c = useSpring(r, { stiffness: 90, damping: 24, mass: 0.4 }),
    u = useTransform(c, [0, 1], ["0%", "100%"]);
  useEffect(() => {
    const x = r.on("change", (m) => {
      const g = Math.min(
        Math.floor(m * PROCESS_STEPS.length),
        PROCESS_STEPS.length - 1,
      );
      a(g);
    });
    return () => x();
  }, [r]);
  const d = (x) => {
      const m = e.current;
      if (!m) return;
      const g = m.offsetTop,
        y = m.offsetHeight - window.innerHeight;
      window.scrollTo({
        top: g + ((x + 0.5) / PROCESS_STEPS.length) * y,
        behavior: "smooth",
      });
    },
    h = s + 1;
  return (
    <div className="bg-mist" ref={e}>
      <div className="hidden lg:block">
        <div className="sticky top-0 min-h-screen flex items-center py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              className="mb-12 flex flex-wrap items-end justify-between gap-x-12 gap-y-6 border-b border-navy-dark/15 pb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <p className="text-[11px] font-semibold tracking-[0.18em] text-navy-dark/70 uppercase mb-4">
                  The Process
                </p>
                <h2 className="text-balance text-[2rem] sm:text-[2.6rem] font-semibold leading-[1.06] tracking-[-0.035em] text-navy-dark">
                  Five steps.
                  <span className="text-navy-dark/65">
                    The research decides the order.
                  </span>
                </h2>
              </div>
              <p className="max-w-sm text-[14.5px] leading-relaxed text-navy-dark/75">
                {
                  "Knowing you need more authority is not useful on its own. AuthorityOS\u2122 tells us which page needs it, where it should come from, and what to do next once it lands."
                }
              </p>
            </motion.div>
            <div className="grid lg:grid-cols-[44px_1fr_1.05fr] gap-8 lg:gap-12 items-start">
              <div className="relative h-[420px] flex justify-center">
                <div className="relative w-px bg-navy-dark/20 h-full">
                  <motion.div
                    className="absolute top-0 left-0 w-full bg-verified origin-top"
                    style={{ height: u }}
                  />
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-verified border-[3px] border-clay shadow-[0_0_0_1px_rgb(var(--verified)/0.45)]"
                    style={{ top: u }}
                  />
                </div>
                {PROCESS_STEPS.map((x, m) => (
                  <button
                    key={x.title}
                    onClick={() => d(m)}
                    aria-label={`Go to step ${m + 1}: ${x.title}`}
                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center group"
                    style={{
                      top: `${((m + 0.5) / PROCESS_STEPS.length) * 100}%`,
                    }}
                  >
                    <span
                      className={`block rounded-full transition-all duration-500 ${m <= s ? "w-2 h-2 bg-verified" : "w-1.5 h-1.5 bg-navy-dark/30 group-hover:bg-navy-dark/55"}`}
                    />
                  </button>
                ))}
              </div>
              <div>
                <div
                  className="text-[150px] xl:text-[190px] font-semibold text-navy-dark tracking-[-0.02em] select-none"
                  style={{
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                    lineHeight: 1,
                  }}
                >
                  <RollingDigit digit={0} />
                  <RollingDigit digit={h} />
                  <span
                    className="inline-block align-top text-mark-deep"
                    style={{ height: "1em", lineHeight: "1em" }}
                  >
                    .
                  </span>
                </div>
                <div className="mt-8 max-w-[440px]">
                  <ProcessRail />
                </div>
              </div>
              <div className="relative min-h-[340px] pt-4">
                {PROCESS_STEPS.map((x, m) => {
                  const g = s === m,
                    y = m > s ? 24 : -24;
                  return (
                    <motion.div
                      key={x.title}
                      className="absolute top-0 left-0 right-0"
                      initial={false}
                      animate={{
                        opacity: g ? 1 : 0,
                        y: g ? 0 : y,
                        filter: g ? "blur(0px)" : "blur(5px)",
                        pointerEvents: g ? "auto" : "none",
                      }}
                      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <p className="text-sm font-bold tracking-[0.2em] text-navy-dark/70 uppercase mb-4">
                        {"Step "}
                        {m + 1}
                        {" of "}
                        {PROCESS_STEPS.length}
                      </p>
                      <h3 className="text-3xl xl:text-4xl font-bold text-navy-dark mb-5">
                        {x.title}
                      </h3>
                      <p className="text-navy-dark/70 leading-relaxed text-lg mb-7 max-w-md">
                        {x.description}
                      </p>
                      <div className="inline-flex items-center gap-2.5 bg-white rounded-full pl-3 pr-4 py-2 shadow-lift">
                        <span className="w-1.5 h-1.5 rounded-full bg-verified" />
                        <span className="text-[11px] font-bold tracking-wider text-navy-dark/70 uppercase">
                          Deliverable
                        </span>
                        <span className="text-[13px] font-semibold text-navy-dark">
                          {x.deliverable}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            <div className="flex gap-2.5 mt-12 pl-[44px] lg:pl-[56px]">
              {PROCESS_STEPS.map((x, m) => (
                <button
                  key={x.title}
                  onClick={() => d(m)}
                  aria-label={`Step ${m + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 ${s === m ? "bg-verified w-8" : "bg-navy-dark/25 w-1.5 hover:bg-navy-dark/45"}`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="h-[260vh]" />
      </div>
      <div className="lg:hidden py-20 px-4 sm:px-6">
        <div className="max-w-xl mx-auto">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] font-semibold tracking-[0.18em] text-navy-dark/70 uppercase mb-3">
              The Process
            </p>
            <h2 className="text-balance text-[2rem] sm:text-[2.6rem] font-semibold leading-[1.06] tracking-[-0.035em] text-navy-dark">
              Five steps.
              <span className="text-navy-dark/65">
                The research decides the order.
              </span>
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-navy-dark/75">
              {
                "AuthorityOS\u2122 tells us which page needs authority, where it should come from, and what to do next once it lands."
              }
            </p>
          </motion.div>
          <div className="relative border-l border-navy-dark/20 pl-7 space-y-12">
            {PROCESS_STEPS.map((x, m) => (
              <motion.div
                key={x.title}
                className="relative"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
              >
                <span className="absolute -left-[33px] top-1 w-3 h-3 rounded-full bg-verified border-[3px] border-clay" />
                <p
                  className="text-4xl font-extrabold text-navy-dark/55 tracking-tighter mb-2"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  0{m + 1}.
                </p>
                <h3 className="text-2xl font-bold text-navy-dark mb-3">
                  {x.title}
                </h3>
                <p className="text-navy-dark/70 leading-relaxed mb-4">
                  {x.description}
                </p>
                <div className="inline-flex items-center gap-2 bg-white rounded-full px-3.5 py-1.5 shadow-soft">
                  <span className="w-1.5 h-1.5 rounded-full bg-verified" />
                  <span className="text-[12px] font-semibold text-navy-dark">
                    {x.deliverable}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-12">
            <ProcessRail />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;
