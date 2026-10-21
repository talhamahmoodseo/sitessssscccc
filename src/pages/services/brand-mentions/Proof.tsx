import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { brandMentions as C } from "../content/brandMentions";
import { Eyebrow, H2, Soft, rise } from "../kit";

const STEP_MS = 900;

/**
 * 42 dots, one per buyer question. A month scrubber fills them in as the
 * campaign goes; it plays once on its own, then it's the visitor's.
 */
const Proof = () => {
  const P = C.proof;
  const last = P.series.length - 1;
  const reduced = useReducedMotion();
  const [m, setM] = useState(reduced ? last : 0);
  const [touched, setTouched] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-140px" });
  const named = P.series[m];

  useEffect(() => {
    if (!inView || touched || reduced || m >= last) return;
    const t = setTimeout(() => setM((x) => x + 1), STEP_MS);
    return () => clearTimeout(t);
  }, [inView, touched, reduced, m, last]);

  return (
    <section className="bg-mist py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20 lg:px-8">
        <motion.div {...rise()}>
          <Eyebrow className="mb-4">{P.eyebrow}</Eyebrow>
          <H2>
            {P.h2a}
            <br />
            <Soft>{P.h2b}</Soft>
          </H2>
          <p className="mt-6 text-[13px] font-semibold text-navy-dark/75">
            {P.client}
          </p>
          <dl className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-line ring-1 ring-line">
            {P.facts.map((f) => (
              <div key={f.k} className="bg-white px-4 py-3.5">
                <dt className="text-[11.5px] leading-snug text-navy-dark/70">
                  {f.k}
                </dt>
                <dd className="mt-1 text-[22px] font-semibold tracking-[-0.03em] text-navy-dark">
                  {f.v}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-7 text-[16.5px] leading-relaxed text-navy-dark/80">
            {P.takeaway}
          </p>
          <figure className="mt-7 border-l-2 border-lilac pl-5">
            <blockquote className="text-[17px] font-medium leading-snug text-navy-dark">
              “{P.quote.text}”
            </blockquote>
            <figcaption className="mt-2 text-[13px] text-navy-dark/70">
              {P.quote.who}
            </figcaption>
          </figure>
          <Link
            to={P.caseHref}
            className="group mt-7 inline-flex items-center gap-1.5 text-[14px] font-semibold text-navy-dark underline decoration-navy-dark/30 underline-offset-4 hover:decoration-navy-dark"
          >
            Read the case study
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        <motion.div
          ref={ref}
          className="rounded-[28px] bg-white p-6 ring-1 ring-line sm:p-9"
          {...rise(0.1)}
        >
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[12px] text-navy-dark/70">
                Buyer questions where AI names them
              </p>
              <p className="mt-1 flex items-baseline gap-2">
                <span className="text-[4rem] font-semibold leading-none tracking-[-0.05em] text-navy-dark tabular-nums">
                  {named}
                </span>
                <span className="text-[16px] text-navy-dark/70">
                  of {P.total}
                </span>
              </p>
            </div>
            <p className="rounded-full bg-lilac px-3 py-1.5 text-[12px] font-bold text-navy-dark">
              {m === 0 ? "Start" : `Month ${m}`}
            </p>
          </div>

          <div
            className="mt-8 grid grid-cols-[repeat(14,minmax(0,1fr))] gap-1.5 sm:gap-2.5"
            aria-hidden="true"
          >
            {Array.from({ length: P.total }).map((_, n) => (
              <motion.span
                key={n}
                className="aspect-square rounded-full"
                animate={{
                  backgroundColor:
                    n < named ? "rgb(14 14 14)" : "rgb(240 239 236)",
                  scale: n < named ? 1 : 0.86,
                }}
                transition={{
                  duration: 0.35,
                  delay: n < named ? (n % 14) * 0.02 : 0,
                }}
              />
            ))}
          </div>

          {/* month scrubber */}
          <div className="mt-8">
            <div
              className="grid grid-cols-7 gap-1"
              role="tablist"
              aria-label="Campaign month"
            >
              {P.series.map((v, k) => (
                <button
                  key={k}
                  role="tab"
                  aria-selected={m === k}
                  onClick={() => {
                    setM(k);
                    setTouched(true);
                  }}
                  className="group flex flex-col items-center gap-2"
                >
                  <span
                    className={`h-1.5 w-full rounded-full transition-colors duration-300 ${
                      k <= m
                        ? "bg-navy-dark"
                        : "bg-navy-dark/15 group-hover:bg-navy-dark/30"
                    }`}
                  />
                  <span
                    className={`text-[11px] font-semibold ${k === m ? "text-navy-dark" : "text-navy-dark/70"}`}
                  >
                    {k === 0 ? "Start" : `M${k}`}
                  </span>
                  <span className="text-[10.5px] tabular-nums text-navy-dark/70">
                    {v}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Proof;
