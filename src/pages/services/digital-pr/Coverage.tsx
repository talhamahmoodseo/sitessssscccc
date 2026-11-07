import { motion } from "motion/react";
import { BadgeCheck, Globe2, X } from "lucide-react";
import { AiOverviewMark, GoogleMark } from "@/components/PlatformMarks";
import { digitalPr as C } from "../content/digitalPr";
import { Eyebrow, H2, Soft, ease, rise } from "../kit";
import Clipping from "./Clipping";

/* ------------------------------ the tiers ------------------------------ */

/** Three kinds of publication, each with the one job it does for you, plus
 *  the Gulf strip and what we won't pitch. */
export const Tiers = () => {
  const T = C.tiers;
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="mb-14 max-w-3xl" {...rise()}>
          <Eyebrow className="mb-4">{T.eyebrow}</Eyebrow>
          <H2>
            {T.h2a}
            <br />
            <Soft>{T.h2b}</Soft>
          </H2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {T.items.map((t, n) => (
            <motion.article
              key={t.k}
              className="flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-line"
              {...rise(n * 0.08)}
            >
              <div className={`${t.tint} px-6 pb-6 pt-5 sm:px-7`}>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-dark/75">
                    The job
                  </span>
                  <span className="rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-semibold text-navy-dark/85">
                    {t.dr}
                  </span>
                </div>
                <p className="mt-6 text-[2.6rem] font-semibold leading-none tracking-[-0.045em] text-navy-dark">
                  {t.job}
                </p>
              </div>
              <div className="flex flex-1 flex-col px-6 pb-7 pt-6 sm:px-7">
                <h3 className="text-[18px] font-semibold text-navy-dark">
                  {t.k}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-navy-dark/75">
                  {t.d}
                </p>
                <ul className="mt-6 space-y-0 border-t border-line">
                  {t.outlets.map((o) => (
                    <li
                      key={o}
                      className="border-b border-line py-2.5 font-news text-[16px] font-semibold text-navy-dark"
                    >
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.25fr_1fr]">
          <motion.div
            className="relative overflow-hidden rounded-3xl bg-navy-dark p-7 sm:p-9"
            {...rise(0.05)}
          >
            <Globe2
              className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 text-white/[0.06]"
              strokeWidth={1}
              aria-hidden="true"
            />
            <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/75">
              <BadgeCheck className="h-4 w-4" />
              Where we’re strongest
            </p>
            <h3 className="mt-4 text-[1.7rem] font-semibold tracking-[-0.03em] text-white">
              {T.gulf.t}
            </h3>
            <p className="mt-3 max-w-xl text-[15.5px] leading-relaxed text-white/75">
              {T.gulf.d}
            </p>
          </motion.div>
          <motion.div
            className="rounded-3xl bg-linen/70 p-7 ring-1 ring-line sm:p-9"
            {...rise(0.1)}
          >
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-navy-dark/75">
              {T.skip.t}
            </p>
            <ul className="mt-5 space-y-3">
              {T.skip.items.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-3 text-[15px] text-navy-dark/85"
                >
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-gap/[0.12]">
                    <X className="h-3 w-3 text-gap" />
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------ three returns ------------------------------ */

const SalesMark = ({ className = "" }: { className?: string }) => (
  <BadgeCheck className={`${className} text-navy-dark`} aria-hidden="true" />
);

const MARKS = [GoogleMark, AiOverviewMark, SalesMark];

/** One clipping on the left; a spine carries it to the three things it keeps
 *  doing. The lines draw in, then a pulse runs along each. */
export const Returns = () => {
  const R = C.returns;
  return (
    <section className="overflow-hidden bg-mist py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="mx-auto mb-14 max-w-3xl text-center" {...rise()}>
          <Eyebrow className="mb-4">{R.eyebrow}</Eyebrow>
          <H2>
            {R.h2a}
            <br />
            <Soft>{R.h2b}</Soft>
          </H2>
        </motion.div>

        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_auto_1.15fr] lg:gap-0">
          <motion.div
            className="mx-auto w-full max-w-[400px] lg:mr-0"
            initial={{ opacity: 0, x: -20, rotate: 0 }}
            whileInView={{ opacity: 1, x: 0, rotate: -1.5 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
          >
            <Clipping c={C.hero.clippings[0]} />
          </motion.div>

          {/* connector from the clipping to the spine */}
          <motion.span
            className="hidden h-px w-16 origin-left bg-navy-dark/30 lg:block xl:w-24"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.5 }}
            aria-hidden="true"
          />

          <div className="relative lg:pl-10">
            {/* the spine */}
            <motion.span
              className="absolute bottom-[16%] left-0 top-[16%] hidden w-px origin-top bg-navy-dark/30 lg:block"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.8 }}
              aria-hidden="true"
            />
            <ul className="space-y-4">
              {R.items.map((r, n) => {
                const Mark = MARKS[n];
                return (
                  <motion.li
                    key={r.k}
                    className="relative"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.55, delay: 1 + n * 0.15, ease }}
                  >
                    <span
                      className="absolute -left-10 top-1/2 hidden h-px w-10 bg-navy-dark/30 lg:block"
                      aria-hidden="true"
                    >
                      <motion.span
                        className="absolute -top-[2px] h-[5px] w-[5px] rounded-full bg-navy-dark"
                        animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }}
                        transition={{
                          duration: 1.6,
                          repeat: Infinity,
                          repeatDelay: 1.2,
                          delay: 1.8 + n * 0.4,
                        }}
                      />
                    </span>
                    <div className="flex gap-5 rounded-2xl bg-white p-6 ring-1 ring-line">
                      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-mist ring-1 ring-line">
                        <Mark className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-dark/70">
                          {r.k}
                        </span>
                        <span className="mt-1 block text-[18px] font-semibold tracking-[-0.02em] text-navy-dark">
                          {r.t}
                        </span>
                        <span className="mt-1.5 block text-[15px] leading-relaxed text-navy-dark/75">
                          {r.d}
                        </span>
                      </span>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>

        <motion.p
          className="mx-auto mt-14 max-w-2xl text-center text-[16px] leading-relaxed text-navy-dark/75"
          {...rise(0.1)}
        >
          {R.note}
        </motion.p>
      </div>
    </section>
  );
};
