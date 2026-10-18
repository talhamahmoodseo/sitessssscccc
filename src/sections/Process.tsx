import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowRight, Check, X } from "lucide-react";

/**
 * The process, pinned while the reader scrolls through five steps. The steps
 * fit every service we run (links, PR, mentions, quotes), and each one shows a
 * small picture of what that step actually produces.
 */

const PROCESS_STEPS = [
  {
    title: "Audit",
    description:
      "We map where you stand today: your backlinks, your rankings, and whether AI answers mention you at all. The gaps become the plan.",
    deliverable: "Visibility audit",
  },
  {
    title: "Plan",
    description:
      "We pick the pages to push and the mix that fits them: link building, digital PR, brand mentions or expert quotes. You see the plan before we start.",
    deliverable: "Campaign plan and targets",
  },
  {
    title: "Vet",
    description:
      "Every publication goes through our 8-point check, starting with relevance: is it about your industry? Then real traffic, the keywords behind it, the trend, the audience, authority, indexing and editorial standards. Roughly one in five fails.",
    deliverable: "Vetted publication list",
  },
  {
    title: "Create & place",
    description:
      "Our writers and PR team create the content: guest posts, data stories, expert quotes. Editors publish it with your link or mention inside the story.",
    deliverable: "Live placements",
  },
  {
    title: "Track & report",
    description:
      "We confirm every link is indexed, track rankings on your target pages and record where AI answers mention you. One clear report every month.",
    deliverable: "Monthly visibility report",
  },
];

/* ------------------------- what each step produces ------------------------- */

const Card = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-navy-dark/[0.07] shadow-[0_24px_50px_-30px_rgba(14,14,14,0.35)]">
    <div className="flex items-center justify-between border-b border-line px-5 py-3">
      <span className="text-[12px] font-semibold text-navy-dark">{title}</span>
      <span className="flex gap-1" aria-hidden="true">
        {[0, 1, 2].map((n) => (
          <span key={n} className="h-1.5 w-1.5 rounded-full bg-navy-dark/15" />
        ))}
      </span>
    </div>
    <div className="px-5 py-4">{children}</div>
  </div>
);

const Meter = ({
  k,
  v,
  pct,
  bad,
}: {
  k: string;
  v: string;
  pct: number;
  bad?: boolean;
}) => (
  <div>
    <div className="flex items-baseline justify-between text-[12.5px]">
      <span className="text-navy-dark/75">{k}</span>
      <span
        className={`font-semibold tabular-nums ${bad ? "text-gap" : "text-navy-dark"}`}
      >
        {v}
      </span>
    </div>
    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-navy-dark/[0.07]">
      <motion.div
        className={`h-full rounded-full ${bad ? "bg-gap" : "bg-navy-dark"}`}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.8, delay: 0.15 }}
      />
    </div>
  </div>
);

const Row = ({
  ok,
  children,
  note,
}: {
  ok: boolean;
  children: ReactNode;
  note?: string;
}) => (
  <div className="flex items-center gap-3 py-1.5">
    <span
      className={`flex h-5 w-5 flex-none items-center justify-center rounded-full ${
        ok ? "bg-verified/[0.12]" : "bg-gap/[0.12]"
      }`}
    >
      {ok ? (
        <Check className="h-3 w-3 text-verified" />
      ) : (
        <X className="h-3 w-3 text-gap" />
      )}
    </span>
    <span className="min-w-0 flex-1 truncate text-[12.5px] text-navy-dark/85">
      {children}
    </span>
    {note && (
      <span className="flex-none text-[11.5px] text-navy-dark/70">{note}</span>
    )}
  </div>
);

const VISUALS: ReactNode[] = [
  <Card key="audit" title="Visibility audit · yourbrand.com">
    <div className="space-y-3.5">
      <Meter k="Backlinks worth keeping" v="42 of 60" pct={70} />
      <Meter k="Pages sitting on page two" v="12" pct={48} />
      <Meter k="AI tools that mention you" v="0 of 3" pct={3} bad />
    </div>
  </Card>,
  <Card key="plan" title="Campaign plan · first 90 days">
    <div className="divide-y divide-line">
      {[
        ["/pricing", "Link building"],
        ["/features/crm", "Link building"],
        ["Brand story", "Digital PR"],
        ["Category comparisons", "Brand mentions"],
        ["Your team's expertise", "Expert quotes"],
      ].map(([page, svc]) => (
        <div
          key={page}
          className="flex items-center justify-between gap-3 py-1.5"
        >
          <span className="truncate font-mono text-[11.5px] text-navy-dark/80">
            {page}
          </span>
          <span className="flex-none rounded-full bg-mist px-2 py-0.5 text-[11px] font-semibold text-navy-dark ring-1 ring-line">
            {svc}
          </span>
        </div>
      ))}
    </div>
  </Card>,
  <Card key="vet" title="Publication check">
    <Row ok note="relevant · 41K">
      saas•••insider.com
    </Row>
    <Row ok={false} note="off-topic">
      crypto•••bets.io
    </Row>
    <Row ok note="relevant · 18K">
      growth•••weekly.com
    </Row>
    <Row ok={false} note="sells links">
      fin•••daily.com
    </Row>
  </Card>,
  <Card key="place" title="Published · The Business Review">
    <p className="font-serif text-[16px] leading-snug text-navy-dark">
      The quiet tools behind the fastest-growing support teams
    </p>
    <p className="mt-2.5 text-[12.5px] leading-relaxed text-navy-dark/80">
      …more often it's{" "}
      <span
        className="font-semibold text-navy-dark underline decoration-navy-dark/40 underline-offset-2"
        style={{
          background:
            "linear-gradient(transparent 55%, rgb(var(--mark) / 0.7) 55%)",
        }}
      >
        better customer support software
      </span>{" "}
      that routes the easy questions away.
    </p>
    <div className="mt-3 flex flex-wrap gap-1.5">
      {["Guest post", "PR feature", "Expert quote"].map((t, n) => (
        <span
          key={t}
          className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${
            n === 0
              ? "bg-navy-dark text-white ring-navy-dark"
              : "bg-mist text-navy-dark ring-line"
          }`}
        >
          {t}
        </span>
      ))}
    </div>
  </Card>,
  <Card key="report" title="Monthly report · October">
    <Row ok note="14 of 14">
      Links indexed by Google
    </Row>
    <Row ok note="#14 → #4">
      /pricing ranking
    </Row>
    <Row ok note="2 of 3">
      AI tools now mentioning you
    </Row>
    <Row ok note="+22%">
      Branded searches
    </Row>
  </Card>,
];

/* --------------------------------- pieces --------------------------------- */

const RollingDigit = ({ digit }: { digit: number }) => (
  <span
    className="relative inline-block overflow-hidden align-top"
    style={{ height: "1em" }}
  >
    <motion.span
      className="flex flex-col"
      animate={{ y: `${-digit}em` }}
      transition={{ type: "spring", stiffness: 80, damping: 16, mass: 0.9 }}
    >
      {Array.from({ length: 10 }, (_, a) => (
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

const Deliverable = ({ children }: { children: ReactNode }) => (
  <div className="inline-flex items-center gap-2.5 rounded-full bg-white py-2 pl-3 pr-4 ring-1 ring-line">
    <span className="h-1.5 w-1.5 rounded-full bg-mark-deep" />
    <span className="text-[11px] font-bold uppercase tracking-wider text-navy-dark/70">
      You get
    </span>
    <span className="text-[13px] font-semibold text-navy-dark">{children}</span>
  </div>
);

const Heading = () => (
  <h2 className="text-[2rem] font-semibold leading-[1.06] tracking-[-0.035em] text-navy-dark sm:text-[2.6rem]">
    {"How every campaign runs, "}
    <span className="text-navy-dark/65">
      from first audit to monthly report.
    </span>
  </h2>
);

/* --------------------------------- section --------------------------------- */

const Process = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });
  const fill = useTransform(smooth, [0, 1], ["0%", "100%"]);

  useEffect(
    () =>
      scrollYProgress.on("change", (v) =>
        setStep(
          Math.min(
            Math.floor(v * PROCESS_STEPS.length),
            PROCESS_STEPS.length - 1,
          ),
        ),
      ),
    [scrollYProgress],
  );

  const goTo = (n: number) => {
    const el = ref.current;
    if (!el) return;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: el.offsetTop + ((n + 0.5) / PROCESS_STEPS.length) * travel,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-linen" ref={ref}>
      {/* desktop: pinned while the five steps scroll past */}
      <div className="hidden lg:block">
        <div className="sticky top-0 flex min-h-screen items-center py-24">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="mb-14 flex items-end justify-between gap-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="max-w-2xl">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/70">
                  The Process
                </p>
                <Heading />
              </div>
              <p className="max-w-xs pb-1 text-[14.5px] leading-relaxed text-navy-dark/75">
                The same five steps whether you hire us for links, PR, mentions
                or all of it.
              </p>
            </motion.div>

            <div className="grid grid-cols-[44px_1fr_1.05fr] items-start gap-12">
              {/* the rail */}
              <div className="relative flex h-[420px] justify-center">
                <div className="relative h-full w-px bg-navy-dark/10">
                  <motion.div
                    className="absolute left-0 top-0 w-full origin-top bg-navy-dark"
                    style={{ height: fill }}
                  />
                  <motion.div
                    className="absolute left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-linen bg-mark-deep shadow-[0_0_0_1px_rgba(14,14,14,0.25)]"
                    style={{ top: fill }}
                  />
                </div>
                {PROCESS_STEPS.map((x, m) => (
                  <button
                    key={x.title}
                    onClick={() => goTo(m)}
                    aria-label={`Go to step ${m + 1}: ${x.title}`}
                    className="group absolute left-1/2 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                    style={{
                      top: `${((m + 0.5) / PROCESS_STEPS.length) * 100}%`,
                    }}
                  >
                    <span
                      className={`block rounded-full transition-all duration-500 ${
                        m <= step
                          ? "h-2 w-2 bg-navy-dark"
                          : "h-1.5 w-1.5 bg-navy-dark/25 group-hover:bg-navy-dark/50"
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* the number and what this step produces */}
              <div>
                <div
                  className="select-none text-[150px] font-semibold tracking-[-0.04em] text-navy-dark xl:text-[180px]"
                  style={{ lineHeight: 1 }}
                >
                  <RollingDigit digit={0} />
                  <RollingDigit digit={step + 1} />
                  <span
                    className="inline-block align-top text-navy-dark"
                    style={{ height: "1em", lineHeight: "1em" }}
                  >
                    .
                  </span>
                </div>
                <div className="mt-8 max-w-[440px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, y: 14, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.98 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {VISUALS[step]}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* the words */}
              <div className="relative min-h-[340px] pt-4">
                {PROCESS_STEPS.map((x, m) => {
                  const on = step === m;
                  return (
                    <motion.div
                      key={x.title}
                      className="absolute left-0 right-0 top-0"
                      initial={false}
                      animate={{
                        opacity: on ? 1 : 0,
                        y: on ? 0 : m > step ? 24 : -24,
                        filter: on ? "blur(0px)" : "blur(5px)",
                        pointerEvents: on ? "auto" : "none",
                      }}
                      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                      aria-hidden={!on}
                    >
                      <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-navy-dark/70">
                        Step {m + 1} of {PROCESS_STEPS.length}
                      </p>
                      <h3 className="mb-5 text-3xl font-bold text-navy-dark xl:text-4xl">
                        {x.title}
                      </h3>
                      <p className="mb-7 max-w-md text-lg leading-relaxed text-navy-dark/75">
                        {x.description}
                      </p>
                      <Deliverable>{x.deliverable}</Deliverable>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="mt-12 flex items-center gap-2.5 pl-[56px]">
              {PROCESS_STEPS.map((x, m) => (
                <button
                  key={x.title}
                  onClick={() => goTo(m)}
                  aria-label={`Step ${m + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    step === m
                      ? "w-8 bg-navy-dark"
                      : "w-1.5 bg-navy-dark/20 hover:bg-navy-dark/40"
                  }`}
                />
              ))}
              <span className="ml-4 text-[13px] text-navy-dark/70">
                {step < PROCESS_STEPS.length - 1 ? (
                  <>
                    Next:{" "}
                    <span className="font-semibold text-navy-dark">
                      {PROCESS_STEPS[step + 1].title}
                    </span>
                  </>
                ) : (
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 font-semibold text-navy-dark"
                  >
                    Start with a free audit{" "}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="h-[260vh]" />
      </div>

      {/* small screens: a simple timeline, each step with its picture */}
      <div className="px-4 py-20 sm:px-6 lg:hidden">
        <div className="mx-auto max-w-xl">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/70">
              The Process
            </p>
            <Heading />
          </motion.div>
          <div className="relative space-y-14 border-l border-navy-dark/15 pl-7">
            {PROCESS_STEPS.map((x, m) => (
              <motion.div
                key={x.title}
                className="relative"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
              >
                <span className="absolute -left-[34px] top-1.5 h-3.5 w-3.5 rounded-full border-[3px] border-linen bg-mark-deep" />
                <p className="mb-2 text-[15px] font-semibold tabular-nums text-navy-dark/70">
                  Step 0{m + 1}
                </p>
                <h3 className="mb-3 text-2xl font-bold text-navy-dark">
                  {x.title}
                </h3>
                <p className="mb-4 leading-relaxed text-navy-dark/75">
                  {x.description}
                </p>
                <Deliverable>{x.deliverable}</Deliverable>
                <div className="mt-6">{VISUALS[m]}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;
