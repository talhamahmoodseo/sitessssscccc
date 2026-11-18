import { motion } from "motion/react";
import { brandMentions as C } from "../content/brandMentions";
import { CARD, Eyebrow, H2, Soft, ease, rise } from "../kit";

/**
 * Our own baseline, told straight: four AI tools, 28 buyer questions each,
 * Editorial HQ named 0 times. The point is the reason (other sites name the
 * agencies AI recommends) and that we run the same work on ourselves.
 * Source: Muse's AI check, 17–18 Nov 2026 (research kit, tab 3).
 */
const OwnCheck = () => {
  const O = C.own;
  return (
    <section className="bg-mist py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16 lg:px-8">
        <motion.div {...rise()}>
          <Eyebrow className="mb-4">{O.eyebrow}</Eyebrow>
          <H2>
            {O.h2a}
            <br />
            <Soft>{O.h2b}</Soft>
          </H2>
          <p className="mt-6 text-[17px] leading-relaxed text-navy-dark/75">
            {O.lead}
          </p>
          <ul className="mt-8 space-y-4 border-t border-line pt-6">
            {O.points.map((p) => (
              <li
                key={p}
                className="text-[15.5px] leading-relaxed text-navy-dark/80"
              >
                {p}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div className={`${CARD} p-6 sm:p-8`} {...rise(0.1)}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-dark/60">
            Editorial HQ recommended
          </p>
          <ul className="mt-5 divide-y divide-line">
            {O.tools.map((t, i) => (
              <li key={t.k} className="py-4">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[15px] font-semibold text-navy-dark">
                    {t.k}
                  </span>
                  <span className="font-semibold tabular-nums text-navy-dark">
                    {t.v}
                    <span className="text-navy-dark/50"> / {t.of}</span>
                  </span>
                </div>
                <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-navy-dark/[0.07]">
                  <motion.span
                    className="block h-full w-[2%] origin-left rounded-full bg-navy-dark/40"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 * i, ease }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex items-baseline justify-between gap-4 rounded-xl bg-mist px-4 py-3.5">
            <span className="text-[14px] font-semibold text-navy-dark">
              All four tools
            </span>
            <span className="text-[1.6rem] font-semibold leading-none tracking-[-0.03em] text-navy-dark tabular-nums">
              0 / 112
            </span>
          </div>
          <p className="mt-4 text-[12.5px] leading-relaxed text-navy-dark/60">
            {O.note}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default OwnCheck;
