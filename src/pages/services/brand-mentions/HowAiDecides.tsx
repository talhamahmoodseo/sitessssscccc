import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { brandMentions as C } from "../content/brandMentions";
import { CARD, Eyebrow, GlowPanel, H2, Soft, ease, rise } from "../kit";

const ROW = 64; // source card height
const GAP = 12;
const FLOW_W = 110;

/**
 * Sources on the left, the answer on the right, and the lines between them
 * drawn at the weight each source carries. Your own website is the thinnest
 * line. Next to it, the Ahrefs data that backs the picture up.
 */
const HowAiDecides = () => {
  const H = C.how;
  const total = H.sources.length * ROW + (H.sources.length - 1) * GAP;
  const mid = total / 2;

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
          <motion.div {...rise()}>
            <Eyebrow className="mb-4">{H.eyebrow}</Eyebrow>
            <H2>
              {H.h2a}
              <br />
              <Soft>{H.h2b}</Soft>
            </H2>
          </motion.div>
          <motion.p
            className="text-[17px] leading-relaxed text-navy-dark/75"
            {...rise(0.08)}
          >
            {H.lead}
          </motion.p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
          {/* the flow */}
          <motion.div {...rise(0.05)}>
            <GlowPanel tone="cool" className="h-full p-5 sm:p-8 lg:p-10">
              <div className="flex flex-col items-stretch gap-4 lg:flex-row lg:items-center lg:gap-0">
                <ul className="flex-1 space-y-3" style={{ minWidth: 0 }}>
                  {H.sources.map((s, n) => (
                    <motion.li
                      key={s.k}
                      className={`flex flex-col justify-center rounded-xl px-4 ring-1 ${
                        s.own
                          ? "bg-white/50 ring-navy-dark/10"
                          : "bg-white ring-navy-dark/[0.07] shadow-[0_14px_30px_-22px_rgba(14,14,14,0.5)]"
                      }`}
                      style={{ height: ROW }}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.5, delay: n * 0.08, ease }}
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span className="text-[12.5px] font-semibold text-navy-dark">
                          {s.k}
                        </span>
                        <span
                          className="flex gap-0.5"
                          aria-label={`Weight ${s.w} of 4`}
                        >
                          {[1, 2, 3, 4].map((d) => (
                            <span
                              key={d}
                              className={`h-1.5 w-3 rounded-full ${d <= s.w ? "bg-navy-dark" : "bg-navy-dark/15"}`}
                            />
                          ))}
                        </span>
                      </span>
                      <span className="mt-1 truncate text-[12px] italic text-navy-dark/75">
                        {s.d}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* converging lines, desktop only */}
                <svg
                  width={FLOW_W}
                  height={total}
                  viewBox={`0 0 ${FLOW_W} ${total}`}
                  className="hidden flex-none lg:block"
                  fill="none"
                  aria-hidden="true"
                >
                  {H.sources.map((s, n) => {
                    const y = n * (ROW + GAP) + ROW / 2;
                    const d = `M0 ${y} C ${FLOW_W * 0.55} ${y}, ${FLOW_W * 0.45} ${mid}, ${FLOW_W} ${mid}`;
                    return (
                      <g key={s.k}>
                        <motion.path
                          d={d}
                          stroke="rgb(var(--ink))"
                          strokeOpacity={s.own ? 0.2 : 0.55}
                          strokeWidth={s.w * 1.1}
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.9,
                            delay: 0.4 + n * 0.1,
                            ease,
                          }}
                        />
                        {!s.own && (
                          <motion.path
                            d={d}
                            stroke="rgb(var(--lilac))"
                            strokeWidth={s.w * 1.1}
                            strokeLinecap="round"
                            strokeDasharray="6 26"
                            animate={{ strokeDashoffset: [0, -64] }}
                            transition={{
                              duration: 1.6,
                              repeat: Infinity,
                              ease: "linear",
                              delay: n * 0.2,
                            }}
                          />
                        )}
                      </g>
                    );
                  })}
                </svg>

                <ArrowDown
                  className="mx-auto h-5 w-5 text-navy-dark/45 lg:hidden"
                  aria-hidden="true"
                />

                <motion.div
                  className={`${CARD} p-5 lg:w-[220px] lg:flex-none`}
                  initial={{ opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.9, ease }}
                >
                  <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-dark/70">
                    <Sparkles className="h-3.5 w-3.5" />
                    The answer
                  </p>
                  <p className="mt-3 text-[14px] leading-relaxed text-navy-dark/85">
                    “Small teams usually pick Replyhub or{" "}
                    <span className="rounded bg-lilac px-1 font-semibold text-navy-dark">
                      YourBrand
                    </span>
                    …”
                  </p>
                  <p className="mt-3 border-t border-line pt-3 text-[12px] leading-snug text-navy-dark/70">
                    Built from what the sources say. Your homepage barely
                    counts.
                  </p>
                </motion.div>
              </div>
            </GlowPanel>
          </motion.div>

          {/* the data */}
          <motion.figure
            className="flex flex-col rounded-[28px] bg-white p-6 ring-1 ring-line sm:p-8"
            {...rise(0.12)}
          >
            <Eyebrow>{H.data.eyebrow}</Eyebrow>
            <p className="mt-4 text-[17px] font-semibold leading-snug tracking-[-0.01em] text-navy-dark">
              {H.data.t}
            </p>
            <ul className="mt-6 space-y-3.5">
              {H.data.rows.map((r, n) => (
                <li key={r.k}>
                  <span className="flex items-baseline justify-between text-[13px]">
                    <span
                      className={
                        n === 0
                          ? "font-semibold text-navy-dark"
                          : "text-navy-dark/80"
                      }
                    >
                      {r.k}
                    </span>
                    <span className="font-semibold tabular-nums text-navy-dark">
                      {r.v.toFixed(3)}
                    </span>
                  </span>
                  <span className="mt-1.5 block h-2 overflow-hidden rounded-full bg-linen">
                    <motion.span
                      className={`block h-full rounded-full ${n === 0 ? "bg-navy-dark" : "bg-lilac"}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(r.v / 0.7) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 + n * 0.1, ease }}
                    />
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11.5px] text-navy-dark/70">
              {H.data.unit}
            </p>
            <p className="mt-5 text-[14px] leading-relaxed text-navy-dark/75">
              {H.data.caveat}
            </p>
            <a
              href={H.data.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-1 pt-5 text-[13px] font-semibold text-navy-dark underline decoration-navy-dark/30 underline-offset-4 hover:decoration-navy-dark"
            >
              Source: {H.data.source}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </motion.figure>
        </div>
      </div>
    </section>
  );
};

export default HowAiDecides;
