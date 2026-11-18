import { motion } from "motion/react";
import { Check } from "lucide-react";
import { brandMentions as C } from "../content/brandMentions";
import { CARD, Eyebrow, H2, Soft, ease, rise } from "../kit";
import { EngineMark } from "./Engine";

/* 2 = named and recommended, 1 = mentioned, 0 = not named */
const Cell = ({ v, delay }: { v: number; delay: number }) => (
  <motion.span
    className="flex items-center justify-center"
    initial={{ opacity: 0, scale: 0.4 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.3, delay }}
  >
    {v === 2 ? (
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-navy-dark sm:h-6 sm:w-6">
        <Check className="h-3.5 w-3.5 text-white" />
      </span>
    ) : v === 1 ? (
      <span className="h-5 w-5 rounded-full bg-lilac ring-1 ring-navy-dark/20 sm:h-6 sm:w-6" />
    ) : (
      <span className="h-5 w-5 rounded-full border border-dashed border-navy-dark/30 sm:h-6 sm:w-6" />
    )}
  </motion.span>
);

const LegendDot = ({ v }: { v: number }) =>
  v === 2 ? (
    <span className="h-3 w-3 rounded-full bg-navy-dark" />
  ) : v === 1 ? (
    <span className="h-3 w-3 rounded-full bg-lilac ring-1 ring-navy-dark/20" />
  ) : (
    <span className="h-3 w-3 rounded-full border border-dashed border-navy-dark/40" />
  );

/**
 * The monthly report, as a product: buyer questions down the side, AI tools
 * across the top, a mark in every cell. Under it, share of answers against
 * named competitors.
 */
const Report = () => {
  const R = C.report;
  return (
    <section className="bg-mist py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
          <motion.div {...rise()}>
            <Eyebrow className="mb-4">{R.eyebrow}</Eyebrow>
            <H2>
              {R.h2a}
              <br />
              <Soft>{R.h2b}</Soft>
            </H2>
          </motion.div>
          <motion.p
            className="text-[17px] leading-relaxed text-navy-dark/75"
            {...rise(0.08)}
          >
            {R.lead}
          </motion.p>
        </div>
        <div className="grid gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:gap-14">
          <motion.ul className="space-y-3 self-start" {...rise(0.05)}>
            {R.points.map((p, n) => (
              <li
                key={p}
                className="flex gap-3 rounded-2xl bg-white p-5 text-[15px] leading-snug text-navy-dark/85 ring-1 ring-line"
              >
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-lilac text-[11px] font-bold text-navy-dark">
                  {n + 1}
                </span>
                {p}
              </li>
            ))}
          </motion.ul>

          <motion.div className={`${CARD} overflow-hidden`} {...rise(0.1)}>
            <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-6">
              <p className="text-[13px] font-semibold text-navy-dark">
                AI visibility report · Month 6
              </p>
              <span className="rounded-full bg-lilac px-2.5 py-1 text-[11px] font-bold text-navy-dark">
                42 questions tracked
              </span>
            </div>

            {/* matrix */}
            <div className="px-4 pt-5 sm:px-6">
              <table className="w-full table-fixed border-separate border-spacing-y-1.5 text-left">
                <thead>
                  <tr>
                    <th className="pb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-navy-dark/70">
                      Buyer question
                    </th>
                    {R.engines.map((e) => (
                      <th
                        key={e}
                        className="w-[38px] pb-2 text-center sm:w-[72px]"
                      >
                        <span className="inline-flex flex-col items-center gap-1">
                          <EngineMark name={e} className="h-4 w-4" />
                          <span className="sr-only text-[10px] font-semibold text-navy-dark/75 sm:not-sr-only">
                            {e}
                          </span>
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {R.questions.map((q, r) => (
                    <tr key={q.q} className="bg-mist">
                      <td className="rounded-l-lg px-3 py-2.5 font-mono text-[11.5px] leading-snug text-navy-dark/85 sm:text-[12px]">
                        {q.q}
                      </td>
                      {q.r.map((v, c) => (
                        <td
                          key={c}
                          className={`py-2 ${c === q.r.length - 1 ? "rounded-r-lg" : ""}`}
                        >
                          <Cell v={v} delay={0.2 + r * 0.08 + c * 0.05} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 pb-5">
                {R.legend.map((l, n) => (
                  <li
                    key={l}
                    className="inline-flex items-center gap-1.5 text-[11.5px] text-navy-dark/75"
                  >
                    <LegendDot v={2 - n} />
                    {l}
                  </li>
                ))}
              </ul>
            </div>

            {/* share of answers */}
            <div className="border-t border-line bg-white px-5 py-5 sm:px-6">
              <p className="text-[12px] font-semibold text-navy-dark">
                Share of answers, against competitors
              </p>
              <ul className="mt-4 space-y-2.5">
                {R.share.map((s, n) => (
                  <li
                    key={s.k}
                    className="grid grid-cols-[88px_1fr_40px] items-center gap-3"
                  >
                    <span
                      className={`text-[12.5px] ${s.you ? "font-bold text-navy-dark" : "text-navy-dark/80"}`}
                    >
                      {s.k}
                    </span>
                    <span className="h-2.5 overflow-hidden rounded-full bg-linen">
                      <motion.span
                        className={`block h-full rounded-full ${s.you ? "bg-navy-dark" : "bg-navy-dark/25"}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.v}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4 + n * 0.1, ease }}
                      />
                    </span>
                    <span className="text-right text-[12.5px] font-semibold tabular-nums text-navy-dark">
                      {s.v}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Report;
