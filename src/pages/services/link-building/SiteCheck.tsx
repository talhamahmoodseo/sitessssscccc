import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { ArrowRight, Check, ShieldCheck, X } from "lucide-react";
import { openBooking } from "@/lib/booking";
import { linkBuilding as LB } from "../content/linkBuilding";
import { CARD, Eyebrow, GlowPanel, H2, ease, rise, sparkPath } from "../kit";

const M = LB.method;

/* ------------------------------------------------------------------ */
/* One pass example and one fail example per check.                    */
/* ------------------------------------------------------------------ */

const Bar = ({
  label,
  value,
  pct,
  bad = false,
  ghost = false,
}: {
  label: string;
  value: string;
  pct: number;
  bad?: boolean;
  ghost?: boolean;
}) => (
  <div>
    <div className="flex items-baseline justify-between text-[12px]">
      <span className="text-navy-dark/75">{label}</span>
      <span
        className={`font-semibold tabular-nums ${bad ? "text-gap" : "text-navy-dark"}`}
      >
        {value}
      </span>
    </div>
    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-navy-dark/[0.07]">
      <motion.div
        className={`h-full rounded-full ${
          ghost
            ? "bg-[repeating-linear-gradient(135deg,rgb(var(--ink)/0.25)_0_4px,transparent_4px_8px)]"
            : bad
              ? "bg-gap"
              : "bg-navy-dark"
        }`}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.8, ease }}
      />
    </div>
  </div>
);

const Kw = ({
  k,
  pos,
  bad = false,
}: {
  k: string;
  pos: number;
  bad?: boolean;
}) => (
  <div className="flex items-center gap-3 py-1">
    <span className="w-7 flex-none text-[11.5px] font-semibold tabular-nums text-navy-dark/70">
      #{pos}
    </span>
    <span
      className={`truncate text-[12.5px] ${bad ? "text-gap" : "text-navy-dark/85"}`}
    >
      {k}
    </span>
  </div>
);

const Out = ({ d, bad = false }: { d: string; bad?: boolean }) => (
  <div className="flex items-center gap-2.5 py-1">
    {bad ? (
      <X className="h-3.5 w-3.5 flex-none text-gap" />
    ) : (
      <Check className="h-3.5 w-3.5 flex-none text-verified" />
    )}
    <span
      className={`truncate font-mono text-[12px] ${bad ? "text-gap" : "text-navy-dark/85"}`}
    >
      {d}
    </span>
  </div>
);

/** one labelled fact: name on the left, value on the right */
const Fact = ({
  k,
  v,
  bad = false,
}: {
  k: string;
  v: string;
  bad?: boolean;
}) => (
  <div className="flex items-baseline justify-between gap-3 border-b border-navy-dark/[0.06] py-1.5 last:border-0">
    <span className="text-[12px] text-navy-dark/70">{k}</span>
    <span
      className={`text-right text-[12.5px] font-semibold ${bad ? "text-gap" : "text-navy-dark"}`}
    >
      {v}
    </span>
  </div>
);

const STEADY = [12, 13, 13, 15, 16, 16, 18, 19, 21, 22, 24, 25];
const CLIFF = [14, 22, 13, 25, 18, 27, 24, 26, 11, 10, 9, 10];

const Spark = ({ data, bad }: { data: number[]; bad?: boolean }) => (
  <svg
    viewBox="0 0 220 56"
    className="h-14 w-full"
    fill="none"
    aria-hidden="true"
  >
    <motion.path
      d={sparkPath(data, 220, 56, 5)}
      stroke={bad ? "rgb(var(--gap))" : "rgb(var(--ink))"}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, ease }}
    />
    {bad && (
      <line
        x1={(8 / 11) * 220}
        x2={(8 / 11) * 220}
        y1="2"
        y2="54"
        stroke="rgb(var(--gap))"
        strokeDasharray="3 3"
        strokeOpacity="0.6"
      />
    )}
  </svg>
);

/** One pass and one fail example per check, in the content's order. */
const VISUALS: {
  pass: ReactNode;
  passNote: string;
  fail: ReactNode;
  failNote: string;
}[] = [
  {
    pass: (
      <div>
        <Fact k="Site covers" v="B2B software" />
        <Fact k="Section" v="Sales & CRM, weekly" />
        <Fact k="Article" v="Choosing a CRM for small teams" />
      </div>
    ),
    passNote: "Same subject from site to page to link",
    fail: (
      <div>
        <Fact k="Site covers" v="Crypto & betting" bad />
        <Fact k="Section" v="None for software" bad />
        <Fact k="Article" v="'Top 10 CRMs' (one-off)" bad />
      </div>
    ),
    failNote: "No reason for this site to link to you",
  },
  {
    pass: (
      <div className="space-y-3">
        <Bar label="Ahrefs" value="14.2K" pct={74} />
        <Bar label="Semrush" value="12.8K" pct={67} />
      </div>
    ),
    passNote: "Real, and both tools agree",
    fail: (
      <div className="space-y-3">
        <Bar label="Seller's sheet" value="95K" pct={96} ghost />
        <Bar label="Ahrefs" value="1.4K" pct={4} bad />
      </div>
    ),
    failNote: "The sheet was 68× higher",
  },
  {
    pass: (
      <div>
        <Kw k="best crm for startups" pos={3} />
        <Kw k="sales pipeline template" pos={6} />
        <Kw k="b2b lead scoring" pos={9} />
      </div>
    ),
    passNote: "On-topic keywords your buyers search",
    fail: (
      <div>
        <Kw k="free movie download hd" pos={2} bad />
        <Kw k="casino bonus codes" pos={5} bad />
        <Kw k="celebrity net worth" pos={8} bad />
      </div>
    ),
    failNote: "Traffic with nothing to do with the topic",
  },
  {
    pass: <Spark data={STEADY} />,
    passNote: "+38% over 12 months, no spikes",
    fail: <Spark data={CLIFF} bad />,
    failNote: "Core update: lost 60% overnight",
  },
  {
    pass: (
      <div className="space-y-2.5">
        <Bar label="United States" value="64%" pct={64} />
        <Bar label="United Kingdom" value="14%" pct={14} />
        <Bar label="Canada" value="8%" pct={8} />
      </div>
    ),
    passNote: "Readers where the client sells",
    fail: (
      <div className="space-y-2.5">
        <Bar label="Markets the client sells in" value="18%" pct={18} />
        <Bar label="Markets it doesn't" value="82%" pct={82} bad />
      </div>
    ),
    failNote: "Authority on paper only",
  },
  {
    pass: (
      <div>
        <Fact k="Domain Rating" v="52" />
        <Fact k="Organic traffic" v="18.6K / month" />
        <Fact k="Referring domains" v="Mostly editorial" />
      </div>
    ),
    passNote: "Authority backed by real readers",
    fail: (
      <div>
        <Fact k="dsnews.co.uk · DR" v="~70" />
        <Fact k="Organic traffic" v="1–2K / month" bad />
        <Fact k="Graph" v="Unstable" bad />
      </div>
    ),
    failNote: "High DR, almost no readers",
  },
  {
    pass: (
      <div>
        <Fact k="Recent posts indexed" v="20 of 20" />
        <Fact k="Time to index" v="2–5 days" />
        <Fact k="Pages in Google" v="4,100+" />
      </div>
    ),
    passNote: "Google crawls and trusts it",
    fail: (
      <div>
        <Fact k="Recent posts indexed" v="12 of 20" bad />
        <Fact k="Time to index" v="Never, for 8" bad />
        <Fact k="Pages in Google" v="Falling" bad />
      </div>
    ),
    failNote: "A link Google may never see",
  },
  {
    pass: (
      <div>
        <Out d="hubspot.com" />
        <Out d="g2.com" />
        <Out d="nytimes.com" />
      </div>
    ),
    passNote: "Links out like a real publication",
    fail: (
      <div>
        <Out d="casino-bonus•••.com" bad />
        <Out d="cbd-oil•••.shop" bad />
        <Out d="Write for us: $80 per post" bad />
      </div>
    ),
    failNote: "Sells to anyone who pays",
  },
];

/* ------------------------------------------------------------------ */

const Inspector = ({ active }: { active: number }) => {
  const step = M.steps[active];
  const v = VISUALS[active];
  return (
    <div className={`${CARD} overflow-hidden`}>
      <div className="border-b border-line px-5 py-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-dark/70">
            Check {step.n} of {String(M.steps.length).padStart(2, "0")}
          </span>
          <span className="flex gap-1">
            {M.steps.map((s, n) => (
              <span
                key={s.n}
                className={`h-1.5 w-6 rounded-full transition-colors duration-500 ${
                  n <= active ? "bg-navy-dark" : "bg-navy-dark/[0.12]"
                }`}
              />
            ))}
          </span>
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={step.n}
            className="mt-2 text-[17px] font-semibold tracking-[-0.02em] text-navy-dark"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
          >
            {step.t}
          </motion.p>
        </AnimatePresence>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={step.n}
          className="grid gap-3 p-4 sm:grid-cols-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease }}
        >
          <div className="rounded-xl bg-mist p-4">
            <p className="mb-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-verified">
              <Check className="h-3.5 w-3.5" /> Passes
            </p>
            {v.pass}
            <p className="mt-3 text-[12px] font-medium text-navy-dark/75">
              {v.passNote}
            </p>
          </div>
          <div className="rounded-xl bg-gap/[0.05] p-4 ring-1 ring-gap/10">
            <p className="mb-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-gap">
              <X className="h-3.5 w-3.5" /> Fails
            </p>
            {v.fail}
            <p className="mt-3 text-[12px] font-medium text-navy-dark/75">
              {v.failNote}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const Step = ({
  index,
  active,
  onActive,
}: {
  index: number;
  active: boolean;
  onActive: (n: number) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const centred = useInView(ref, { margin: "-48% 0px -48% 0px" });
  const s = M.steps[index];

  useEffect(() => {
    if (centred) onActive(index);
  }, [centred, index, onActive]);

  return (
    <div
      ref={ref}
      className={`relative py-10 transition-opacity duration-500 lg:flex lg:min-h-[42vh] lg:items-center lg:py-0 ${
        active ? "lg:opacity-100" : "lg:opacity-35"
      }`}
    >
      <div>
        <span className="text-[13px] font-semibold tabular-nums text-navy-dark/70">
          {s.n}
        </span>
        <h3 className="mt-2 text-[1.6rem] font-semibold leading-tight tracking-[-0.03em] text-navy-dark sm:text-[1.9rem]">
          {s.t}
        </h3>
        <p className="mt-4 max-w-md text-[16px] leading-[1.75] text-navy-dark/75">
          {s.d}
        </p>
        <p className="mt-5 inline-flex max-w-md items-start gap-2.5 rounded-xl bg-white px-4 py-3 ring-1 ring-line">
          <X className="mt-0.5 h-4 w-4 flex-none text-gap" />
          <span className="text-[13.5px] leading-snug text-navy-dark/80">
            <span className="font-semibold text-navy-dark">Red flag: </span>
            {s.flag}
          </span>
        </p>
        {/* small screens: the visual sits under its own step */}
        <div className="mt-7 lg:hidden">
          <GlowPanel tone="cool" className="p-3 sm:p-5">
            <Inspector active={index} />
          </GlowPanel>
        </div>
      </div>
    </div>
  );
};

const SiteCheck = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-mist py-24 lg:py-36" id="site-check">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="max-w-3xl" {...rise()}>
          <Eyebrow className="mb-5">{M.eyebrow}</Eyebrow>
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-navy-dark px-3.5 py-1.5 text-[12.5px] font-semibold text-white">
            <ShieldCheck className="h-3.5 w-3.5" />
            {M.badge}
          </span>
          <H2>{M.h2}</H2>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-navy-dark/75">
            {M.lead}
          </p>
        </motion.div>

        <div className="mt-10 grid gap-10 lg:mt-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="divide-y divide-line lg:divide-y-0">
            {M.steps.map((s, n) => (
              <Step
                key={s.n}
                index={n}
                active={active === n}
                onActive={setActive}
              />
            ))}
          </div>
          <div className="hidden lg:block">
            <div className="sticky top-[calc(50vh-215px)]">
              <GlowPanel tone="cool" className="p-8">
                <Inspector active={active} />
                <motion.p
                  className="mt-5 flex items-center justify-center gap-2 text-[13px] font-semibold text-navy-dark"
                  animate={{ opacity: active === 4 ? 1 : 0.0001 }}
                  transition={{ duration: 0.4 }}
                >
                  <ShieldCheck className="h-4 w-4 text-verified" />
                  {M.pass}
                </motion.p>
              </GlowPanel>
            </div>
          </div>
        </div>

        <motion.div
          className="relative mt-16 overflow-hidden rounded-3xl bg-navy-dark px-7 py-8 sm:px-10 lg:mt-20 lg:flex lg:items-center lg:justify-between lg:gap-10"
          {...rise()}
        >
          <div className="max-w-2xl">
            <p className="text-[20px] font-semibold tracking-[-0.02em] text-white">
              {M.cta.t}
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-white/70">
              {M.cta.d}
            </p>
          </div>
          <button
            onClick={openBooking}
            className="group mt-6 inline-flex flex-none items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[14px] font-semibold text-navy-dark transition-colors duration-300 hover:bg-mark lg:mt-0"
          >
            {M.cta.button}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default SiteCheck;
