import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check, RotateCcw, X } from "lucide-react";
import { linkBuilding as LB } from "../content/linkBuilding";
import { DarkGlow, Eyebrow, H2, ease, rise } from "./kit";

const G = LB.gap;
type Card = (typeof G.cards)[number];

const FACE =
  "col-start-1 row-start-1 flex flex-col rounded-3xl p-7 [backface-visibility:hidden] [-webkit-backface-visibility:hidden]";

/** Front: what the tools said. Back: what we found when we looked. Both faces
 *  share one grid cell, so the card is always as tall as its longer side. */
const FlipCard = ({ card, index }: { card: Card; index: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div className="h-full [perspective:1400px]" {...rise(index * 0.1)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-pressed={open}
        aria-label={`${card.site}: ${open ? "show what the tools said" : "show what we found"}`}
        className="group block h-full w-full text-left focus-visible:outline-none"
      >
        <motion.span
          className="grid h-full [transform-style:preserve-3d]"
          animate={{ rotateY: open ? 180 : 0 }}
          transition={{ duration: 0.75, ease }}
        >
          {/* front */}
          <span
            className={`${FACE} border border-white/[0.12] bg-white/[0.05] transition-colors duration-300 group-hover:border-white/25 group-focus-visible:border-white/50`}
            aria-hidden={open}
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
              What the tools said
            </span>
            <span className="mt-5 block text-[21px] font-semibold leading-snug tracking-[-0.02em] text-white">
              {card.site}
            </span>
            <span className="mt-5 block space-y-2.5">
              {card.looks.map((l) => (
                <span key={l} className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-white/10">
                    <Check className="h-3 w-3 text-white" />
                  </span>
                  <span className="text-[14.5px] text-white/85">{l}</span>
                </span>
              ))}
            </span>
            <span className="mt-auto flex items-center justify-between gap-3 pt-10">
              <span className="text-[13px] text-white/70">
                Looks like a good buy
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-[12.5px] font-semibold text-navy-dark">
                See what we found
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </span>
          </span>

          {/* back */}
          <span
            className={`${FACE} bg-white [transform:rotateY(180deg)]`}
            aria-hidden={!open}
          >
            <span className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-dark/70">
                What we found
              </span>
              <span className="rounded-full bg-gap/[0.12] px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.1em] text-gap">
                Rejected
              </span>
            </span>
            <span className="mt-5 block space-y-3">
              {card.found.map((f) => (
                <span key={f} className="flex gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-gap/[0.12]">
                    <X className="h-3 w-3 text-gap" />
                  </span>
                  <span className="text-[14px] leading-snug text-navy-dark/80">
                    {f}
                  </span>
                </span>
              ))}
            </span>
            <span className="mt-auto flex items-end justify-between gap-3 pt-8">
              <span className="text-[19px] font-semibold leading-tight tracking-[-0.02em] text-navy-dark">
                {card.verdict}
              </span>
              <RotateCcw className="h-4 w-4 flex-none text-navy-dark/60" />
            </span>
          </span>
        </motion.span>
      </button>
    </motion.div>
  );
};

const FakeMetrics = () => (
  <section className="relative overflow-hidden bg-navy-dark py-24 lg:py-36">
    <DarkGlow className="-right-40 -top-24 h-[460px] w-[680px] opacity-40" />
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div className="max-w-3xl" {...rise()}>
        <Eyebrow dark className="mb-4">
          {G.eyebrow}
        </Eyebrow>
        <H2 dark>{G.h2}</H2>
        <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/70">
          {G.lead}
        </p>
      </motion.div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {G.cards.map((c, n) => (
          <FlipCard key={c.site} card={c} index={n} />
        ))}
      </div>

      <motion.div
        className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center"
        {...rise(0.1)}
      >
        <span className="flex gap-1.5" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((n) => (
            <motion.span
              key={n}
              className={`h-3.5 w-3.5 rounded-[4px] ${
                n === 4 ? "bg-gap" : "bg-white/80"
              }`}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + n * 0.08, duration: 0.3 }}
            />
          ))}
        </span>
        <p className="text-[15px] text-white/75">{G.footer}</p>
      </motion.div>
    </div>
  </section>
);

export default FakeMetrics;
