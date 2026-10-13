import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Lock } from "lucide-react";
import { linkBuilding as LB } from "../content/linkBuilding";
import { CARD, Eyebrow, GlowPanel, H2, Soft, ease, rise } from "./kit";

const T = LB.types;
type Tab = (typeof T.tabs)[number];

/** A mock article with the client's link sitting where it would really sit. */
const ArticleMock = ({ tab }: { tab: Tab }) => {
  const a = tab.article;
  return (
    <div className={`${CARD} overflow-hidden`}>
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          {[0, 1, 2].map((n) => (
            <span key={n} className="h-2.5 w-2.5 rounded-full bg-navy-dark/[0.12]" />
          ))}
        </span>
        <span className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-linen px-3.5 py-1 font-mono text-[11px] text-navy-dark/75">
          <Lock className="h-2.5 w-2.5" />
          {a.site}
        </span>
        <span className="w-10" />
      </div>
      <div className="px-6 pb-8 pt-6 sm:px-9">
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.1em] ${
            tab.id === "edit"
              ? "bg-mark/50 text-navy-dark"
              : "bg-navy-dark/[0.06] text-navy-dark/75"
          }`}
        >
          {a.tag}
        </span>
        <p
          className={`mt-4 text-navy-dark ${
            tab.id === "authority"
              ? "font-serif text-[26px] leading-[1.15] tracking-[-0.01em]"
              : "text-[22px] font-semibold leading-snug tracking-[-0.02em]"
          }`}
        >
          {a.title}
        </p>
        <div className="mt-5 space-y-2" aria-hidden="true">
          <span className="block h-2 w-full rounded-full bg-navy-dark/[0.06]" />
          <span className="block h-2 w-[92%] rounded-full bg-navy-dark/[0.06]" />
          <span className="block h-2 w-[76%] rounded-full bg-navy-dark/[0.06]" />
        </div>
        <p className="relative mt-5 text-[15px] leading-[1.75] text-navy-dark/80">
          {a.before}
          <motion.a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="relative font-semibold text-navy-dark underline decoration-navy-dark/40 decoration-2 underline-offset-4"
            initial={{ backgroundSize: "0% 100%" }}
            animate={{ backgroundSize: "100% 100%" }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
            style={{
              backgroundImage:
                "linear-gradient(rgb(var(--mark) / 0.75), rgb(var(--mark) / 0.75))",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "0 85%",
            }}
          >
            {a.link}
          </motion.a>
          {a.after}
        </p>
        <div className="mt-5 space-y-2" aria-hidden="true">
          <span className="block h-2 w-[88%] rounded-full bg-navy-dark/[0.06]" />
          <span className="block h-2 w-[64%] rounded-full bg-navy-dark/[0.06]" />
        </div>
        <motion.p
          className="mt-6 flex items-center gap-2 font-hand text-[22px] leading-none text-navy-dark/80"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <svg width="34" height="22" viewBox="0 0 34 22" fill="none" aria-hidden="true">
            <path
              d="M2 18 C 10 18, 20 14, 28 5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="M22 5 L 28.5 4.5 L 27 11"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          your link, in the body of the story
        </motion.p>
      </div>
    </div>
  );
};

const LinkTypes = () => {
  const [id, setId] = useState(T.tabs[0].id);
  const tab = T.tabs.find((t) => t.id === id)!;

  return (
    <section className="bg-white py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <motion.div className="max-w-2xl" {...rise()}>
            <Eyebrow className="mb-4">{T.eyebrow}</Eyebrow>
            <H2>
              {T.h2a}
              <br />
              <Soft>{T.h2b}</Soft>
            </H2>
            <p className="mt-6 text-[17px] leading-relaxed text-navy-dark/75">
              {T.lead}
            </p>
          </motion.div>
          <motion.div
            className="grid w-full grid-cols-3 gap-1 rounded-[22px] bg-linen p-1 sm:rounded-full lg:flex lg:w-auto"
            role="tablist"
            aria-label="Types of backlinks"
            {...rise(0.1)}
          >
            {T.tabs.map((t) => {
              const on = t.id === id;
              return (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setId(t.id)}
                  className={`relative rounded-[18px] px-2 py-2.5 text-[12.5px] font-semibold leading-tight transition-colors duration-300 sm:rounded-full sm:px-5 sm:text-[13.5px] lg:whitespace-nowrap ${
                    on ? "text-white" : "text-navy-dark/70 hover:text-navy-dark"
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="lt-pill"
                      className="absolute inset-0 rounded-[18px] bg-navy-dark sm:rounded-full"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">{t.name}</span>
                </button>
              );
            })}
          </motion.div>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease }}
            >
              <h3 className="text-[1.9rem] font-semibold tracking-[-0.03em] text-navy-dark">
                {tab.name}
              </h3>
              <p className="mt-4 text-[16.5px] leading-[1.75] text-navy-dark/75">
                {tab.d}
              </p>
              <dl className="mt-8 border-t border-line">
                {[
                  ["Best for", tab.best],
                  ["Typical authority", tab.dr],
                  ["Live in", tab.live],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-baseline justify-between gap-6 border-b border-line py-3.5"
                  >
                    <dt className="text-[13px] text-navy-dark/70">{k}</dt>
                    <dd className="text-right text-[14.5px] font-semibold text-navy-dark">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </AnimatePresence>

          <motion.div {...rise(0.1)}>
            <GlowPanel tone="cool" className="p-4 sm:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, y: 18, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <ArticleMock tab={tab} />
                </motion.div>
              </AnimatePresence>
            </GlowPanel>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 flex flex-col gap-4 rounded-2xl bg-mist px-6 py-5 sm:flex-row sm:items-center sm:gap-8"
          {...rise()}
        >
          <span className="flex-none text-[12px] font-semibold uppercase tracking-[0.14em] text-navy-dark/70">
            With every link
          </span>
          <ul className="flex flex-wrap gap-x-7 gap-y-2.5">
            {T.included.map((x) => (
              <li
                key={x}
                className="flex items-center gap-2 text-[14px] font-medium text-navy-dark"
              >
                <Check className="h-4 w-4 text-verified" />
                {x}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default LinkTypes;
