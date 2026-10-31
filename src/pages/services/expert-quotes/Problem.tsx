import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { Handshake, Inbox, Trash2 } from "lucide-react";
import { haroQuotes as C } from "../content/haroQuotes";
import { Eyebrow, H2, Soft, ease, rise } from "../kit";

/* counts up to 300+ when the pile comes into view. The first render shows
   the final number (it's in the prerendered HTML), then it resets to 0. */
const Counter = ({ to }: { to: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const [v, setV] = useState(to);
  const started = useRef(false);
  useEffect(() => {
    if (!reduced && !started.current) setV(0);
  }, [reduced]);
  useEffect(() => {
    if (!inView || reduced) return;
    started.current = true;
    const c = animate(0, to, {
      duration: 2.2,
      ease: "easeOut",
      onUpdate: (x) => setV(Math.round(x)),
    });
    return () => c.stop();
  }, [inView, reduced, to]);
  return (
    <span ref={ref} className="tabular-nums">
      {v}
      {v >= to ? "+" : ""}
    </span>
  );
};

/** One request, buried under a pile of near-identical replies. */
const Pile = () => {
  const P = C.problem.pile;
  const cards = Array.from({ length: 9 }).map(
    (_, n) => P.lines[n % P.lines.length],
  );
  return (
    <div className="relative h-[420px] overflow-hidden rounded-[28px] bg-linen/70 ring-1 ring-line">
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between border-b border-line bg-white/80 px-5 py-3.5 backdrop-blur">
        <span className="flex items-center gap-2 text-[12.5px] font-semibold text-navy-dark">
          <Inbox className="h-4 w-4" />
          Journalist’s inbox
        </span>
        <span className="text-[12.5px] text-navy-dark/75">
          <span className="text-[15px] font-semibold text-navy-dark">
            <Counter to={P.count} />
          </span>{" "}
          {P.label}
        </span>
      </div>

      <div className="absolute inset-x-5 top-16 space-y-2">
        {cards.map((line, n) => (
          <motion.div
            key={n}
            className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 ring-1 ring-navy-dark/[0.06]"
            initial={{ opacity: 0, y: -24 }}
            whileInView={{ opacity: 1 - n * 0.07, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: 0.2 + n * 0.12, ease }}
          >
            <span className="h-7 w-7 flex-none rounded-full bg-navy-dark/[0.08]" />
            <span className="min-w-0 flex-1">
              <span className="block h-[5px] w-24 rounded-full bg-navy-dark/20" />
              <span className="mt-1.5 block truncate text-[12.5px] text-navy-dark/70">
                {line}
              </span>
            </span>
          </motion.div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-linen via-linen/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-6 z-20 flex justify-center">
        <motion.p
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl border-2 border-gap bg-white/70 px-4 py-2 text-[14px] font-bold uppercase tracking-[0.08em] text-gap"
          initial={{ opacity: 0, scale: 1.4, rotate: -3 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -3 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.35,
            delay: 1.8,
            type: "spring",
            stiffness: 300,
            damping: 18,
          }}
        >
          <Trash2 className="h-4 w-4" />
          {P.foot}
        </motion.p>
      </div>
    </div>
  );
};

const ICONS = [Handshake, Inbox];

/** What broke HARO, then the two ways we land quotes instead. */
const Problem = () => {
  const P = C.problem;
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <motion.div {...rise()}>
            <Eyebrow className="mb-4">{P.eyebrow}</Eyebrow>
            <H2>
              {P.h2a}
              <br />
              <Soft>{P.h2b}</Soft>
            </H2>
            <div className="mt-7 space-y-5">
              {P.paras.map((p) => (
                <p
                  key={p}
                  className="text-[17px] leading-relaxed text-navy-dark/75"
                >
                  {p}
                </p>
              ))}
            </div>
          </motion.div>
          <motion.div {...rise(0.1)}>
            <Pile />
          </motion.div>
        </div>

        <motion.p
          className="mt-20 text-[12px] font-semibold uppercase tracking-[0.14em] text-navy-dark/75"
          {...rise()}
        >
          {P.ways.t}
        </motion.p>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {P.ways.items.map((w, n) => {
            const Icon = ICONS[n];
            return (
              <motion.div
                key={w.k}
                className={`rounded-3xl p-7 sm:p-9 ${n === 0 ? "bg-blush/70" : "bg-butter/60"}`}
                {...rise(n * 0.08)}
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/80">
                    <Icon className="h-5 w-5 text-navy-dark" />
                  </span>
                  <span className="rounded-full bg-white/80 px-3 py-1 text-[11.5px] font-semibold text-navy-dark/85">
                    {w.tag}
                  </span>
                </div>
                <h3 className="mt-6 text-[1.45rem] font-semibold tracking-[-0.03em] text-navy-dark">
                  {w.k}
                </h3>
                <p className="mt-2 max-w-lg text-[16px] leading-relaxed text-navy-dark/80">
                  {w.d}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Problem;
